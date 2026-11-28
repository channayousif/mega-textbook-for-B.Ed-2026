/**
 * Cloudflare Workers AI client (Feature 037, D-2026-0103): whisper for the QG2 transcription and text
 * models for drafts. Never images (owner ruling 2026-11-28).
 *
 * Free allowance only: Cloudflare gives 10,000 neurons a day, reset at 00:00 UTC, and this client keeps
 * its own ledger (~/.cache/mega-book/cfai-neurons.json) with a lower cap (CFAI_DAILY_CAP, default 9,000)
 * so a day's work never reaches the paid tier. A call is refused before it is sent when its estimate
 * would cross the cap; after it returns, the actual neurons (usage.neurons when the model reports it,
 * else the estimate) are recorded.
 *
 * Credentials: CF_ACCOUNT_ID and CF_AI_TOKEN from the environment or the host-local
 * ~/.config/mega-book/cloudflare-ai.env (mode 600, a token scoped to Workers AI only). Never in git.
 * Never import this file from a content gate (FR-018).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

export const CFAI_ENV_FILE = process.env.CFAI_ENV_FILE || join(homedir(), '.config', 'mega-book', 'cloudflare-ai.env');
export const CFAI_LEDGER = process.env.CFAI_LEDGER || join(homedir(), '.cache', 'mega-book', 'cfai-neurons.json');
export const DAILY_CAP = Number(process.env.CFAI_DAILY_CAP || 9000);
export const WHISPER = '@cf/openai/whisper-large-v3-turbo';
export const TEXT_MODEL = process.env.CFAI_TEXT_MODEL || '@cf/google/gemma-4-26b-a4b-it';
/** Published rates (developers.cloudflare.com/workers-ai/platform/pricing, 2026-11-28). */
export const RATES = { whisperPerMinute: 46.63, textInPerM: 9091, textOutPerM: 27273 };

/** A refusal the caller can act on: `quota` (cap or Cloudflare limit, until resetAt) or `unavailable`. */
export class CfaiError extends Error {
  constructor(status, message, resetAt = null) { super(message); this.status = status; this.resetAt = resetAt; }
}

/** CF_ACCOUNT_ID and CF_AI_TOKEN, or null when this host has none. */
export function credentials({ env = process.env, file = CFAI_ENV_FILE } = {}) {
  let id = env.CF_ACCOUNT_ID, token = env.CF_AI_TOKEN;
  if ((!id || !token) && existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*(CF_ACCOUNT_ID|CF_AI_TOKEN)\s*=\s*(.*?)\s*$/);
      if (m && m[1] === 'CF_ACCOUNT_ID') id ||= m[2];
      if (m && m[1] === 'CF_AI_TOKEN') token ||= m[2];
    }
  }
  return id && token ? { id, token } : null;
}

export const utcDay = (ms = Date.now()) => new Date(ms).toISOString().slice(0, 10);
export const nextUtcMidnight = (ms = Date.now()) => new Date(Date.parse(`${utcDay(ms)}T00:00:00Z`) + 86400e3).toISOString();

/** Neurons used today (UTC) from the ledger. */
export function usedToday(file = CFAI_LEDGER, ms = Date.now()) {
  try { const L = JSON.parse(readFileSync(file, 'utf8')); return L.day === utcDay(ms) ? Number(L.neurons) || 0 : 0; } catch { return 0; }
}

export function record(neurons, { file = CFAI_LEDGER, ms = Date.now(), model = '' } = {}) {
  const day = utcDay(ms);
  let L = { day, neurons: 0, calls: 0, by: {} };
  try { const old = JSON.parse(readFileSync(file, 'utf8')); if (old.day === day) L = { by: {}, ...old }; } catch { /* new day */ }
  L.neurons = +(L.neurons + neurons).toFixed(2);
  L.calls += 1;
  if (model) L.by[model] = +((L.by[model] ?? 0) + neurons).toFixed(2);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(L, null, 1)}\n`);
  return L;
}

/** Throws CfaiError('quota') when `estimate` more neurons would cross the cap today. */
export function checkBudget(estimate, { file = CFAI_LEDGER, ms = Date.now(), cap = DAILY_CAP } = {}) {
  const used = usedToday(file, ms);
  if (used + estimate > cap) throw new CfaiError('quota', `Workers AI daily cap: ${Math.round(used)} + ~${Math.ceil(estimate)} neurons would pass ${cap} (free allowance 10,000)`, nextUtcMidnight(ms));
}

/** Map a failed Workers AI reply to unavailable (auth, network) or quota (limits); anything else throws as-is. */
export function classify(httpStatus, body, ms = Date.now()) {
  const errs = body?.errors ?? [];
  const text = errs.map((e) => `${e.code} ${e.message}`).join('; ') || `HTTP ${httpStatus}`;
  if (httpStatus === 401 || httpStatus === 403 || errs.some((e) => [10000, 9109, 5035].includes(e.code))) return new CfaiError('unavailable', `Workers AI refused the token or model: ${text}`);
  if (httpStatus === 429 || errs.some((e) => [3036, 3040, 4006].includes(e.code)) || /allocation|capacity|rate limit|neurons/i.test(text)) return new CfaiError('quota', `Workers AI limit: ${text}`, nextUtcMidnight(ms));
  // A server-side failure (HTTP 5xx, or AiError 8004 "Internal server error", seen 2026-11-28) is transient.
  if (httpStatus >= 500 || errs.some((e) => e.code === 8004) || /internal server error/i.test(text)) return new CfaiError('unavailable', `Workers AI server error: ${text}`);
  return new Error(`Workers AI error: ${text}`);
}

/**
 * One model run. `estimate` (neurons) is checked against the cap first; the recorded cost is the
 * model's usage.neurons when present, else the estimate.
 */
export async function run(model, body, { estimate, fetchImpl = fetch, creds = credentials(), ledger = CFAI_LEDGER, timeoutMs = 120000 } = {}) {
  if (!creds) throw new CfaiError('unavailable', 'no Workers AI credentials on this host (~/.config/mega-book/cloudflare-ai.env)');
  checkBudget(estimate, { file: ledger });
  let res, json;
  try {
    res = await fetchImpl(`https://api.cloudflare.com/client/v4/accounts/${creds.id}/ai/run/${model}`, {
      method: 'POST', headers: { Authorization: `Bearer ${creds.token}`, 'content-type': 'application/json' },
      body: JSON.stringify(body), signal: AbortSignal.timeout(timeoutMs),
    });
    json = await res.json();
  } catch (e) {
    throw new CfaiError('unavailable', `Workers AI unreachable: ${e.message}`);
  }
  if (!res.ok || !json.success) throw classify(res.status, json);
  record(json.result?.usage?.neurons ?? estimate, { file: ledger, model });
  return json.result;
}

/** Whisper transcript of an audio file (mp3 or wav bytes), with the neuron estimate from its length. */
export async function transcribeAudio(bytes, { seconds, language = 'ur', ...opts } = {}) {
  const estimate = Math.max(1, (seconds / 60) * RATES.whisperPerMinute);
  const r = await run(WHISPER, { audio: Buffer.from(bytes).toString('base64'), language, task: 'transcribe' }, { estimate, ...opts });
  return (r.text ?? '').trim();
}

/**
 * A text completion; returns the reply text. Thinking is off by default: with it on, Gemma spent about
 * 1,000 reasoning tokens (~140 neurons) per short draft and sometimes ran out before answering; off, the
 * same draft costs ~2 neurons (tested 2026-11-28).
 */
export async function complete(messages, { maxTokens = 600, think = false, ...opts } = {}) {
  const chars = messages.reduce((s, m) => s + m.content.length, 0);
  const estimate = (chars / 4) * RATES.textInPerM / 1e6 + maxTokens * RATES.textOutPerM / 1e6;
  const body = { messages, max_tokens: maxTokens, ...(think ? {} : { chat_template_kwargs: { enable_thinking: false } }) };
  const r = await run(TEXT_MODEL, body, { estimate, ...opts });
  return (r.choices?.[0]?.message?.content ?? r.response ?? '').trim();
}
