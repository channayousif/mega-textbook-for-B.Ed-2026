// gflow.video: Veo clips through gflow-cli's MCP server on the owner's PC (Feature 030, T023/T024).
//
// Route (gflow-windows-route memory, studio-teaser skill): MCP on 127.0.0.1:18800 and the PC's
// Downloads\gflow-cli folder on 127.0.0.1:18801, both over the owner's SSH tunnel; gflow >= 0.102.1;
// Flow's classic composer (agent sidebar closed). Lessons from batches 2 and 3, kept here:
// - one fresh HTTP connection per request (`agent: false`, `connection: close`): a reused socket
//   through the tunnel ended in "socket hang up" / ECONNRESET;
// - 15 minutes per generate call; a timeout or reset is `unavailable`, never a retake;
// - veo_lite takes no `duration` argument on the classic composer (ConfigurationError);
// - one Flow project per teaser (gflow-projects.json);
// - gflow can report "Error executing tool" after Flow has billed the clip, so every submission is
//   journalled and recovered before any retake (FR-006): adopt the finished clip if it exists,
//   and hold for the owner while a charge is unexplained.
// Do not import this file from any content gate (FR-018).
import http from 'node:http';
import net from 'node:net';
import { createHash } from 'node:crypto';
import { createWriteStream, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { parseRpcBody, gflowPayload, gflowRelativePath, GFLOW_QUOTA_RE } from './image.mjs';
import { GFLOW_MCP_URL, GFLOW_FILES_URL } from './quota.mjs';
import { pace, paceRecord, PaceHold } from '../pacing.mjs';
import { save, withLock } from '../ledger.mjs';
import { buildPrompt } from '../recipes.mjs';

export const CLIP_CREDITS = { veo_lite: 10, veo_fast: 20, veo_quality: 100 };
export const CREDIT_FLOOR = 100;
export const CALL_TIMEOUT_MS = 15 * 60 * 1000;
const cache = (name, env) => process.env[env] || join(homedir(), '.cache', 'mega-book', name);
/** `n` is '' for the first Google account and '2' for the second (Feature 036): each account keeps
 * its own Flow projects and its own never-pay-twice journal. */
export const projectsFile = (n = '') => cache(`gflow-projects${n}.json`, `MEGA_BOOK_GFLOW${n}_PROJECTS_FILE`);
export const journalFile = (n = '') => cache(`gflow-video-journal${n}.json`, `MEGA_BOOK_GFLOW${n}_JOURNAL_FILE`);
const readJson = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return {}; } };

class Unavailable extends Error {}

/** One POST on a fresh connection. A timeout or socket error becomes Unavailable. */
function post(url, body, sid, ms) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: 'POST', agent: false,
      headers: { connection: 'close', 'content-type': 'application/json', accept: 'application/json, text/event-stream', ...(sid ? { 'mcp-session-id': sid } : {}) },
    }, (r) => {
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => resolve({ status: r.statusCode, sid: r.headers['mcp-session-id'] ?? sid, body: Buffer.concat(chunks).toString('utf8') }));
      r.on('error', (e) => reject(new Unavailable(`gflow reply broke: ${e.message}`)));
    });
    req.on('error', (e) => reject(new Unavailable(`gflow MCP: ${e.message}`)));
    req.setTimeout(ms, () => req.destroy(new Unavailable(`no reply from gflow in ${Math.round(ms / 1000)} s (tunnel down, or Flow is stuck)`)));
    req.end(JSON.stringify(body));
  });
}

/** Call one gflow tool in its own MCP session. Returns the payload; a tool error throws Error. */
export async function mcpCall(name, args, { url = GFLOW_MCP_URL, timeoutMs = CALL_TIMEOUT_MS } = {}) {
  const init = await post(url, { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'media-studio', version: '1' } } }, null, 30000);
  if (init.status >= 400) throw new Unavailable(`gflow MCP initialize HTTP ${init.status}`);
  await post(url, { jsonrpc: '2.0', method: 'notifications/initialized' }, init.sid, 30000);
  const res = await post(url, { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name, arguments: args } }, init.sid, timeoutMs);
  if (res.status >= 500) throw new Unavailable(`gflow MCP ${name} HTTP ${res.status}`);
  const msg = parseRpcBody(res.body, 2);
  if (msg.error) throw new Error(`${name}: ${msg.error.message}`);
  const payload = gflowPayload(msg.result);
  if (msg.result?.isError) throw new Error(`${name}: ${JSON.stringify(payload).slice(0, 600)}`);
  return payload;
}

/** Whether a TCP connection to the URL's port opens within `ms`. */
export function tcpOpen(url, ms = 3000) {
  const u = new URL(url);
  return new Promise((resolve) => {
    const s = net.connect({ host: u.hostname, port: Number(u.port || 80) });
    const done = (ok) => { s.destroy(); resolve(ok); };
    s.setTimeout(ms, () => done(false));
    s.once('connect', () => done(true));
    s.once('error', () => done(false));
  });
}

function request(url, method = 'GET', ms = 120000) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method, agent: false, headers: { connection: 'close' } }, resolve);
    req.on('error', (e) => reject(new Unavailable(`gflow file server: ${e.message}`)));
    req.setTimeout(ms, () => req.destroy(new Unavailable(`gflow file server: no reply in ${ms / 1000} s`)));
    req.end();
  });
}
const fileUrl = (filesUrl, rel) => new URL(rel.split('/').map(encodeURIComponent).join('/'), filesUrl).href;

/** Download one file from the PC's gflow-cli folder; returns its sha256. */
export async function fetchClip(rel, out, filesUrl = GFLOW_FILES_URL) {
  const r = await request(fileUrl(filesUrl, rel));
  if (r.statusCode !== 200) { r.resume(); throw new Unavailable(`fetch ${rel}: HTTP ${r.statusCode}`); }
  mkdirSync(dirname(out), { recursive: true });
  const hash = createHash('sha256');
  await new Promise((resolve, reject) => {
    const w = createWriteStream(out);
    r.on('data', (c) => hash.update(c));
    r.pipe(w);
    w.on('finish', resolve);
    w.on('error', reject);
    r.on('error', (e) => reject(new Unavailable(`fetch ${rel}: ${e.message}`)));
  });
  return hash.digest('hex');
}

/** The .mp4 files at the top of the PC folder, with their modification times (Last-Modified). */
export async function listPcClips(filesUrl = GFLOW_FILES_URL) {
  const r = await request(filesUrl);
  let html = '';
  for await (const c of r) html += c;
  const names = [...new Set([...html.matchAll(/href="([^"?#]+\.mp4)"/gi)].map((m) => decodeURIComponent(m[1])))];
  const out = [];
  for (const name of names) {
    const h = await request(fileUrl(filesUrl, name), 'HEAD', 15000);
    h.resume();
    out.push({ name, id: name.replace(/\.mp4$/i, ''), mtimeMs: Date.parse(h.headers['last-modified'] ?? '') || 0 });
  }
  return out;
}

const jkey = (key, part) => `${key}#${part}`;
function journalUpdate(file, fn) {
  return withLock(file, () => { const j = readJson(file); const out = fn(j); save(file, j); return out; });
}

/**
 * FR-006 recovery before (re)generating a part that has a journalled submission without a clip:
 * 1. the submission's flow_media_id, if gflow gave one: fetch it with gflow_download_media;
 * 2. else the oldest unclaimed .mp4 that landed on the PC between this submission and the next one;
 * 3. else compare the Flow balance: charged but no clip means hold for the owner; not charged means
 *    the submission never reached Flow, so drop it and generate.
 * Returns an ok/held result, or null to go ahead and generate.
 */
export async function recover({ key, part, call, claimed, out, filesUrl, journal, profile, cost }) {
  const j = readJson(journal);
  const pend = j[jkey(key, part)];
  if (!pend || pend.status !== 'submitted') return null;
  const adopt = async (rel, mediaId, how) => {
    const sha256 = await fetchClip(rel, out, filesUrl);
    journalUpdate(journal, (x) => { x[jkey(key, part)] = { ...pend, status: 'done', media_id: mediaId, done_at: new Date().toISOString(), recovered: how }; });
    return { status: 'ok', source: 'recovered', file: out, sha256, mediaId, credits: pend.credits ?? cost, model: pend.model, reason: `recovered a finished clip (${how}) instead of paying again` };
  };
  if (pend.media_id && !claimed.has(pend.media_id)) {
    try {
      const r = await call('gflow_download_media', { media_id: pend.media_id, profile });
      const f = (r.files ?? [r.file, r.path].filter(Boolean))[0];
      if (f) return await adopt(gflowRelativePath(f), pend.media_id, 'download_media');
    } catch (e) { if (e instanceof Unavailable) throw e; /* fall through to the folder */ }
  }
  const from = Date.parse(pend.at) - 60e3;
  const later = Object.values(j).map((e) => Date.parse(e.at)).filter((t) => t > Date.parse(pend.at)).sort((a, b) => a - b)[0] ?? Infinity;
  const clips = (await listPcClips(filesUrl)).filter((c) => !claimed.has(c.id) && c.mtimeMs >= from && c.mtimeMs < later).sort((a, b) => a.mtimeMs - b.mtimeMs);
  if (clips.length) return adopt(clips[0].name, clips[0].id, 'download folder');
  const { credits } = await call('gflow_get_credits', { profile });
  const spentSince = Object.values(j).filter((e) => e.status === 'done' && Date.parse(e.at) > Date.parse(pend.at)).reduce((s, e) => s + (e.credits ?? 0), 0);
  if (Number(credits) <= pend.before - (pend.credits ?? cost) - spentSince) {
    return { status: 'held', reason: `${key} part ${part}: Flow balance fell from ${pend.before} to ${credits} after the ${pend.at} submission but no clip arrived; find it in Flow (project ${pend.project ?? 'unknown'}) and save it to Downloads\\gflow-cli, or clear the journal entry once checked. No retake until then.` };
  }
  journalUpdate(journal, (x) => { delete x[jkey(key, part)]; });
  return null;
}

/**
 * The producer. `job`: { key, script, recipe, locale, outDir }; `part`: shot number;
 * `ctx`: { claimed: Set of clip ids already recorded in any ledger, take: take number for the file name }.
 */
export function gflowVideo({ mcpUrl = GFLOW_MCP_URL, filesUrl = GFLOW_FILES_URL, profile = process.env.GFLOW_PROFILE || 'a2ahs-alpha',
  projects = projectsFile(), journal = journalFile(), timeoutMs = CALL_TIMEOUT_MS, floor = CREDIT_FLOOR,
  channel = 'gflow.video', pace: paceFn = pace, record: recordFn = paceRecord } = {}) {
  const call = (name, args, ms) => mcpCall(name, args, { url: mcpUrl, timeoutMs: ms ?? 60000 });
  return async (job, part, ctx = {}) => {
    const { key, script, recipe, locale = 'ur', outDir } = job;
    const shot = script.shots.find((s) => s.n === part);
    if (!shot) return { status: 'failed', reason: `${key}: no shot ${part}` };
    const cost = CLIP_CREDITS[recipe.model] ?? 10;
    const out = join(outDir, `shot-${part}-t${ctx.take ?? 1}.mp4`);
    const claimed = ctx.claimed ?? new Set();
    if (!(await tcpOpen(mcpUrl)) || !(await tcpOpen(filesUrl))) return { status: 'unavailable', reason: 'gflow tunnel is down (18800 or 18801 closed)' };
    try {
      const rec = await recover({ key, part, call, claimed, out, filesUrl, journal, profile, cost });
      if (rec) return rec;
      const { credits: before } = await call('gflow_get_credits', { profile });
      if (Number(before) - cost < floor) return { status: 'held', reason: `Flow balance ${before} would fall under the ${floor}-credit floor` };
      try {
        await paceFn(channel, cost);
      } catch (e) {
        if (e instanceof PaceHold) return { status: 'quota', paced: true, resetAt: e.resetAt, reason: e.message };
        throw e;
      }
      // Flow charges on submission, so the spend is counted now (a clip recovered later after a
      // timeout is then counted once, and a refused submission errs on the safe side).
      recordFn(channel, cost);
      const proj = readJson(projects)[key];
      const at = new Date().toISOString();
      journalUpdate(journal, (x) => { x[jkey(key, part)] = { status: 'submitted', at, before: Number(before), credits: cost, model: recipe.model, project: proj ?? null }; });
      let r;
      try {
        r = await call('gflow_generate_video', {
          prompt: buildPrompt(recipe, script, shot, locale), mode: recipe.mode ?? 't2v', aspect: recipe.aspect ?? '9:16',
          model: recipe.model, count: 1, profile, wait: true, ...(proj ? { project: proj } : { project_name: `teaser ${key}` }),
        }, timeoutMs);
      } catch (e) {
        if (!(e instanceof Unavailable) && GFLOW_QUOTA_RE.test(e.message)) {
          journalUpdate(journal, (x) => { delete x[jkey(key, part)]; });
          return { status: 'quota', reason: e.message };
        }
        throw e; // the submission stays journalled: the next call recovers before any retake
      }
      if (r.flow_project_id && !proj) withLock(projects, () => { const p = readJson(projects); p[key] ??= r.flow_project_id; save(projects, p); });
      if (r.flow_media_id) journalUpdate(journal, (x) => { if (x[jkey(key, part)]) x[jkey(key, part)].media_id = r.flow_media_id; });
      if (r.status === 'failed' && r.flow_media_id) r = await call('gflow_download_media', { media_id: r.flow_media_id, profile }, 300000);
      const f = (r.files ?? [r.file, r.path].filter(Boolean))[0];
      if (!f) return { status: 'failed', reason: `gflow returned no file: ${JSON.stringify(r).slice(0, 300)}` };
      const rel = gflowRelativePath(f);
      const sha256 = await fetchClip(rel, out, filesUrl);
      const mediaId = r.flow_media_id ?? rel.split('/').pop().replace(/\.mp4$/i, '');
      journalUpdate(journal, (x) => { x[jkey(key, part)] = { ...x[jkey(key, part)], status: 'done', media_id: mediaId, done_at: new Date().toISOString() }; });
      return { status: 'ok', source: 'generated', file: out, sha256, mediaId, credits: cost, model: recipe.model, reason: 'generated' };
    } catch (e) {
      if (e instanceof Unavailable) return { status: 'unavailable', reason: e.message };
      return { status: 'failed', reason: e.message };
    }
  };
}

/** Drop a journalled submission after the owner checked Flow (CLI: `clear <key> <part>`). */
/** The second account's clip producer (Feature 036): same gflow server, profile a2ahs-beta. */
export const gflow2Video = (opts = {}) => gflowVideo({ profile: process.env.GFLOW2_PROFILE || 'a2ahs-beta', projects: projectsFile('2'), journal: journalFile('2'), channel: 'gflow2.video', ...opts });

export function clearSubmission(key, part, journal = journalFile()) {
  if (!existsSync(journal)) return false;
  return journalUpdate(journal, (x) => { const had = jkey(key, part) in x; delete x[jkey(key, part)]; return had; });
}

// CLI: node scripts/media/producers/gflow-video.mjs journal | clear <key> <part>
if (process.argv[1] && process.argv[1].endsWith('gflow-video.mjs')) {
  // --account 2: the second Google account's journal.
  const n = process.argv.includes('--account') ? process.argv[process.argv.indexOf('--account') + 1] === '2' ? '2' : '' : '';
  const [cmd, key, part] = process.argv.slice(2).filter((a, i, all) => a !== '--account' && all[i - 1] !== '--account');
  if (cmd === 'journal') console.log(JSON.stringify(readJson(journalFile(n)), null, 1));
  else if (cmd === 'clear' && key && part) console.log(clearSubmission(key, Number(part), journalFile(n)) ? `cleared ${key} part ${part}` : `no submission for ${key} part ${part}`);
  else { console.error('usage: gflow-video.mjs journal | clear <key> <part> [--account 2]'); process.exit(2); }
}
