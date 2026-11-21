// Shared ledger engine for every media kind (Feature 030, FR-001/FR-002, T006).
//
// A ledger is a JSON file `{ ..., items: [...] }`. Writes are atomic (temp file + rename) and
// `update()` holds an exclusive lock file across load -> change -> save, so two processes writing
// the same ledger cannot lose each other's changes (on 2026-11-20 a clip generator and a
// cross-poster wrote media-teasers.json at the same time).
// Do not import this file from any content gate (FR-018).
import { existsSync, readFileSync, writeFileSync, renameSync, openSync, closeSync, unlinkSync, statSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { pathFor, nextState, entryProblems } from './states.mjs';

/** Uploads per project per day are capped at 100 (YouTube Data API); keep headroom. */
export const DAILY_UPLOAD_LIMIT = 95;
const LOCK_WAIT_MS = 15000;
const LOCK_STALE_MS = 120000;

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

export function load(path, empty = { items: [] }) {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : structuredClone(empty);
}

/** Atomic write in the house format (one-space indent, trailing newline). */
export function save(path, ledger) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(ledger, null, 1)}\n`);
  renameSync(tmp, path);
}

/** Run `fn` while holding `<path>.lock`. A lock older than LOCK_STALE_MS is treated as abandoned. */
export function withLock(path, fn) {
  const lock = `${path}.lock`;
  mkdirSync(dirname(path), { recursive: true });
  const start = Date.now();
  let fd;
  for (;;) {
    try { fd = openSync(lock, 'wx'); break; } catch (e) {
      if (e.code !== 'EEXIST') throw e;
      try { if (Date.now() - statSync(lock).mtimeMs > LOCK_STALE_MS) { unlinkSync(lock); continue; } } catch { continue; }
      if (Date.now() - start > LOCK_WAIT_MS) throw new Error(`ledger busy: ${lock} held for over ${LOCK_WAIT_MS / 1000} s`);
      sleep(50);
    }
  }
  try { return fn(); } finally { closeSync(fd); try { unlinkSync(lock); } catch { /* already gone */ } }
}

/** Load, change and save one ledger under its lock. `fn(ledger)` mutates and may return a value. */
export function update(path, fn, empty) {
  return withLock(path, () => {
    const ledger = load(path, empty);
    const out = fn(ledger);
    save(path, ledger);
    return out;
  });
}

export function find(ledger, key) {
  const job = ledger.items.find((i) => i.key === key);
  if (!job) throw new Error(`no item ${key}`);
  return job;
}

/** Move a job one step along its kind's path. Refuses skips, blocked jobs and missing evidence. */
export function advance(ledger, key, to, fields = {}, { ledgers = [ledger], now = new Date() } = {}) {
  const job = find(ledger, key);
  if (job.blocked) throw new Error(`${key} is blocked: ${job.blocked}`);
  pathFor(job.kind);
  const want = nextState(job.kind, job.state);
  if (to !== want) throw new Error(`${key}: ${job.state} -> ${to} is not the next state (${want})`);
  const next = { ...job, ...fields, gates: { ...job.gates, ...(fields.gates ?? {}) }, outputs: { ...job.outputs, ...(fields.outputs ?? {}) } };
  const problems = entryProblems(next, to);
  if (problems.length) throw new Error(`${key}: ${problems.join('; ')}`);
  if (to === 'uploaded-private' && uploadsOn(ledgers, now) >= DAILY_UPLOAD_LIMIT) {
    throw new Error(`daily upload limit reached (${DAILY_UPLOAD_LIMIT}); stop until tomorrow (Pacific midnight)`);
  }
  Object.assign(job, next, { state: to });
  (job.history ??= []).push({ state: to, at: now.toISOString() });
  return job;
}

/** Add a take. A file identical (sha256) to another take anywhere in `ledgers` is refused. */
export function recordTake(ledger, key, take, { ledgers = [ledger], now = new Date() } = {}) {
  const job = find(ledger, key);
  for (const f of ['part', 'producer', 'source']) if (take[f] == null) throw new Error(`take needs ${f}`);
  if (take.sha256) {
    const dup = ledgers.flatMap((l) => l.items).flatMap((j) => (j.takes ?? []).map((t) => [j.key, t]))
      .find(([, t]) => t.sha256 === take.sha256);
    if (dup) throw new Error(`${key}: take is identical to a take of ${dup[0]} (sha256 ${take.sha256.slice(0, 12)})`);
  }
  const n = (job.takes ?? []).filter((t) => t.part === take.part).length + 1;
  const row = { take: n, at: now.toISOString(), ...take };
  (job.takes ??= []).push(row);
  return row;
}

/** Uploads counted per Pacific calendar day, because the YouTube quota resets at Pacific midnight. */
export const pacificDay = (d) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
export function uploadsOn(ledgers, when = new Date()) {
  const day = pacificDay(when);
  const at = (i) => i.uploaded_at ?? i.outputs?.uploaded_at;
  return ledgers.flatMap((l) => l.items).filter((i) => at(i) && pacificDay(at(i)) === day).length;
}
