/**
 * Raster image producers for scripts/generate-illustration.mjs (ADR-0029). Only that script imports
 * this module; it stays the single repository entry point that calls an image service (point 4).
 *
 * Each producer writes one PNG at `png` and returns `{ model }`, or throws:
 * - QuotaError: the producer's quota is out (the caller records it and tries the next producer);
 * - UnavailableError: the producer cannot be reached now (skip it for this run, try the next);
 * - Error: this image failed (the caller counts a failure for the row).
 *
 * Producers: agy (Gemini via Antigravity), gflow (Nano Banana via Google Flow on the owner's PC,
 * over the SSH tunnel; owner ruling 2026-11-18 amending D-2026-0082), codex (built-in image_gen).
 */
import { existsSync, readFileSync, readdirSync, statSync, unlinkSync, copyFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import http from 'node:http';
import https from 'node:https';
import { QUOTA_RE, resetMinutes } from '../crew/workers.mjs';
import { GFLOW_MCP_URL, GFLOW_FILES_URL } from './image-quota.mjs';

export class QuotaError extends Error {
  constructor(producer, message, resetAt = null) {
    super(message);
    this.producer = producer;
    this.resetAt = resetAt;
  }
}
export class UnavailableError extends Error {
  constructor(producer, message) {
    super(message);
    this.producer = producer;
  }
}

/** The shared brief every producer receives, so their house style does not drift apart. */
export function sceneBrief(style, row, aspect) {
  return [`Style: ${style}`, `Scene: ${row.prompt}`, `Aspect ratio: ${aspect}.`].join('\n');
}

// ------------------------------------------------------------------ agy

/**
 * agy reports an exhausted image quota only in its own log, not in its JSON reply: read the newest
 * run log after a failed generation and return the reset stamp, or null when the quota is fine.
 */
export function agyQuotaReset(logDir = join(homedir(), '.gemini/antigravity-cli/log')) {
  try {
    const newest = readdirSync(logDir).filter((n) => n.startsWith('cli-')).sort().pop();
    const text = readFileSync(join(logDir, newest), 'utf8');
    if (!/QUOTA_EXHAUSTED/.test(text)) return null;
    const stamps = [...text.matchAll(/"quotaResetTimeStamp":\s*"([^"]+)"/g)].map((m) => m[1]).sort();
    return stamps.pop() || 'unknown';
  } catch {
    return null;
  }
}

export function agyProducer({ brief, png, stagingDir }) {
  const instruction = [
    'Use your generate_image tool exactly once to create this image.',
    brief,
    `Save the image as a PNG file at exactly this path: ${png}`,
    'Then reply with only the file path and the name of the image model you used.',
  ].join('\n');
  const res = spawnSync('agy', ['-p', instruction, '--add-dir', stagingDir, '--output-format', 'json', '--print-timeout', '10m'], {
    encoding: 'utf8',
    timeout: 11 * 60 * 1000,
  });
  let reply = '';
  try {
    reply = JSON.parse(res.stdout).response || '';
  } catch {
    reply = (res.stdout || '').slice(0, 400);
  }
  if (res.status !== 0 || !existsSync(png) || statSync(png).size === 0) {
    const reset = agyQuotaReset();
    if (reset) throw new QuotaError('agy', `agy image quota exhausted (QUOTA_EXHAUSTED); resets at ${reset}`, reset);
    throw new Error(`agy did not produce ${png} (exit ${res.status}): ${reply || res.stderr}`);
  }
  return { model: (reply.match(/(imagen[\w.-]*|gemini[\w.-]*image[\w.-]*)/i) || [])[0] || 'agy (model unreported)' };
}

// ------------------------------------------------------------------ gflow (MCP over HTTP)

/** POST a JSON body; resolve { status, headers, body }. No client timeout unless `ms` is set. */
function post(url, payload, headers = {}, ms = 0) {
  const u = new URL(url);
  const lib = u.protocol === 'https:' ? https : http;
  const data = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = lib.request(u, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', 'content-length': Buffer.byteLength(data), ...headers },
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    if (ms) req.setTimeout(ms, () => req.destroy(new Error(`timed out after ${ms} ms`)));
    req.end(data);
  });
}

/** A JSON-RPC reply from a plain JSON body or an SSE stream (`data: {...}` lines); the one with `id`. */
export function parseRpcBody(body, id) {
  const text = body.trim();
  const candidates = text.startsWith('{') ? [text] : text.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim());
  for (const c of candidates.reverse()) {
    try {
      const msg = JSON.parse(c);
      if (msg.id === id) return msg;
    } catch { /* keep looking */ }
  }
  throw new Error(`no JSON-RPC reply with id ${id} in: ${text.slice(0, 300)}`);
}

/** A minimal Streamable HTTP MCP client: initialize, then tools/call. */
export async function mcpSession(url = GFLOW_MCP_URL) {
  let nextId = 1;
  let session = null;
  const rpc = async (method, params, ms = 0) => {
    const id = nextId++;
    const res = await post(url, { jsonrpc: '2.0', id, method, params }, session ? { 'mcp-session-id': session } : {}, ms);
    if (res.headers['mcp-session-id']) session = res.headers['mcp-session-id'];
    if (res.status >= 400) throw new Error(`MCP ${method} HTTP ${res.status}: ${res.body.slice(0, 300)}`);
    const msg = parseRpcBody(res.body, id);
    if (msg.error) throw new Error(`MCP ${method} error ${msg.error.code}: ${msg.error.message}`);
    return msg.result;
  };
  await rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'generate-illustration', version: '1' } }, 15000);
  await post(url, { jsonrpc: '2.0', method: 'notifications/initialized' }, session ? { 'mcp-session-id': session } : {}, 15000);
  return { callTool: (name, args, ms = 0) => rpc('tools/call', { name, arguments: args }, ms) };
}

/** gflow's reply payload: structuredContent, or the JSON in its first text block. */
export function gflowPayload(result) {
  if (result?.structuredContent && typeof result.structuredContent === 'object') return result.structuredContent;
  const text = result?.content?.find((c) => c.type === 'text')?.text ?? '';
  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
}

/** gflow names a quota as RateLimitError / exit 21 "Daily or per-minute model quota reached". */
export const GFLOW_QUOTA_RE = /quota|rate.?limit|RateLimitError|exit[^\w]{0,3}21\b/i;

/** Path of a gflow output file relative to its output directory (served by the 18801 file server). */
export function gflowRelativePath(file) {
  const m = String(file).replace(/\\/g, '/').match(/gflow-cli\/(.+)$/i);
  return m ? m[1] : String(file).replace(/\\/g, '/').split('/').pop();
}

function download(url, ms = 120000) {
  const u = new URL(url);
  const lib = u.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.get(u, (res) => {
      if (res.statusCode !== 200) { res.resume(); reject(new Error(`GET ${url}: HTTP ${res.statusCode}`)); return; }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(ms, () => req.destroy(new Error(`download timed out after ${ms} ms`)));
  });
}

/**
 * One Flow project for many illustrations. Without a `project` id gflow creates a fresh Flow project
 * per call (`project_name` only titles a new one). Flow's agent chat keeps a project's history, so a
 * project is rotated after GFLOW_PROJECT_ROTATE images. GFLOW_PROJECT pins one project id instead.
 */
export const GFLOW_PROJECT_ROTATE = 50;
export const gflowProjectFile = () => process.env.MEGA_BOOK_GFLOW_PROJECT_FILE
  || join(homedir(), '.cache', 'mega-book', 'gflow-project.json');

export function gflowProjectArgs(file = gflowProjectFile(), now = new Date()) {
  if (process.env.GFLOW_PROJECT) return { project: process.env.GFLOW_PROJECT };
  let state = null;
  try { state = JSON.parse(readFileSync(file, 'utf8')); } catch { /* none yet */ }
  if (state?.project_id && (state.images ?? 0) < GFLOW_PROJECT_ROTATE) return { project: state.project_id };
  return { project_name: `textbook-illustrations ${now.toISOString().slice(0, 10)}` };
}

/** Remember the project an image landed in and count it towards rotation. */
export function recordGflowProject(projectId, file = gflowProjectFile(), now = new Date()) {
  if (!projectId || process.env.GFLOW_PROJECT) return;
  let state = null;
  try { state = JSON.parse(readFileSync(file, 'utf8')); } catch { /* none yet */ }
  const same = state?.project_id === projectId;
  const next = { project_id: projectId, images: same ? (state.images ?? 0) + 1 : 1, since: same ? state.since : now.toISOString() };
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(next, null, 1)}\n`);
}

export async function gflowProducer({ brief, png, aspect, mcpUrl = GFLOW_MCP_URL, filesUrl = GFLOW_FILES_URL, projectFile = gflowProjectFile() }) {
  let mcp;
  try {
    mcp = await mcpSession(mcpUrl);
  } catch (e) {
    throw new UnavailableError('gflow', `gflow MCP unreachable at ${mcpUrl}: ${e.message}`);
  }
  // No question may reach Flow's agent: gflow then waits 600 s and fails (studio-teaser skill).
  const prompt = `${brief}\nCreate this one image now. Do not ask any question.`;
  let result;
  try {
    result = await mcp.callTool('gflow_generate_image', {
      prompt,
      model: process.env.GFLOW_IMAGE_MODEL || 'nano2',
      aspect: aspect.startsWith('3:4') ? '3:4' : '16:9',
      count: 1,
      profile: process.env.GFLOW_PROFILE || 'a2ahs-alpha',
      ui_mode: 'classic',
      wait: true,
      ...gflowProjectArgs(projectFile),
    }, 11 * 60 * 1000);
  } catch (e) {
    if (GFLOW_QUOTA_RE.test(e.message)) throw new QuotaError('gflow', `gflow image quota reached: ${e.message}`);
    throw new UnavailableError('gflow', `gflow call failed: ${e.message}`);
  }
  const payload = gflowPayload(result);
  const files = Array.isArray(payload.files) ? payload.files : [];
  if (result?.isError || payload.status === 'failed' || Number(payload.status) >= 400 || !files.length) {
    const why = JSON.stringify(payload).slice(0, 400);
    if (GFLOW_QUOTA_RE.test(why)) throw new QuotaError('gflow', `gflow image quota reached: ${why}`);
    throw new Error(`gflow produced no image: ${why}`);
  }
  const url = new URL(gflowRelativePath(files[0]).split('/').map(encodeURIComponent).join('/'), filesUrl).href;
  let bytes;
  try {
    bytes = await download(url);
  } catch (e) {
    throw new UnavailableError('gflow', `gflow file server: ${e.message}`);
  }
  // Flow saves JPEG; the pipeline stages PNG.
  const sharp = (await import('sharp')).default;
  await sharp(bytes).png().toFile(png);
  recordGflowProject(payload.flow_project_id, projectFile);
  return { model: `${process.env.GFLOW_IMAGE_MODEL || 'nano2'} (Nano Banana via gflow)` };
}

// ------------------------------------------------------------------ codex

export const CODEX_IMAGES = join(process.env.CODEX_HOME || join(homedir(), '.codex'), 'generated_images');

/** The newest PNG under Codex's image folder written at or after `sinceMs`, or null. */
export function newestCodexImage(sinceMs, dir = CODEX_IMAGES) {
  if (!existsSync(dir)) return null;
  let best = null;
  for (const sub of readdirSync(dir)) {
    const subDir = join(dir, sub);
    let names;
    try { names = readdirSync(subDir); } catch { continue; }
    for (const n of names.filter((x) => x.endsWith('.png'))) {
      const p = join(subDir, n);
      const t = statSync(p).mtimeMs;
      if (t >= sinceMs && (!best || t > best.t)) best = { p, t };
    }
  }
  return best?.p ?? null;
}

export function codexProducer({ brief, png, stagingDir }) {
  const instruction = [
    'Use your built-in image_gen tool exactly once to create this image. Do not edit, create or delete any file and do not run any command.',
    brief,
    'When the image is generated, reply with the single word DONE.',
  ].join('\n');
  const started = Date.now() - 1000;
  const res = spawnSync('codex', ['exec', '--dangerously-bypass-approvals-and-sandbox', '--skip-git-repo-check', instruction], {
    cwd: stagingDir,
    encoding: 'utf8',
    timeout: 11 * 60 * 1000,
  });
  const made = newestCodexImage(started);
  if (!made) {
    const out = `${res.stdout || ''}\n${res.stderr || ''}`;
    if (QUOTA_RE.test(out.slice(-3000))) {
      const mins = resetMinutes(out);
      throw new QuotaError('codex', `codex image limit reached: ${out.trim().split('\n').pop()?.slice(0, 200)}`,
        mins ? new Date(Date.now() + mins * 60000).toISOString() : null);
    }
    throw new Error(`codex produced no image (exit ${res.status}): ${out.trim().slice(-300)}`);
  }
  copyFileSync(made, png);
  return { model: 'codex image_gen' };
}

export const PRODUCER_FNS = { agy: agyProducer, gflow: gflowProducer, codex: codexProducer };

/** Remove a stale staging file before a producer writes a new one. */
export function clearStaged(png) {
  if (existsSync(png)) unlinkSync(png);
}
