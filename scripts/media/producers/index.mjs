// Producer contract and registry for every medium (Feature 030, FR-005/FR-006, T022).
//
// A producer is `async (job, part, ctx) => result`, where result is
//   { status: 'ok' | 'quota' | 'unavailable' | 'failed' | 'held', file?, resetAt?, reason, credits?, mediaId?, model?, source? }
// - ok:          the part was made; `file` is local, `credits` is what it cost.
// - quota:       the producer's quota is out until `resetAt`; recorded, next producer tried
//                (unless `paced: true`, our own pacing limit: recorded, no fallback).
// - unavailable: cannot be reached now (offline, expired cookies, timeout); skipped for this run
//                without spending an attempt, next producer tried.
// - failed:      this part failed; counts an attempt; no fallback (the cause is usually the prompt).
// - held:        stop and ask the owner (an unexplained charge, or a manual step is waiting); no
//                fallback, because the next route could spend credits again.
//
// Image producers keep their throwing form (image.mjs, ADR-0029) and their quota file; `fromThrowing`
// adapts them. Do not import this file from any content gate (FR-018).
import { existsSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { QuotaError, UnavailableError } from './image.mjs';
import { save } from '../ledger.mjs';

/** Producers per medium, in fallback order. */
export const REGISTRY = {
  image: ['agy', 'agy2', 'gflow', 'gflow2', 'codex'],
  clip: ['gflow.video', 'gflow2.video', 'manual.flow'],
  overview: ['nlm'],
  schematic: ['codex', 'claude'],
};
export const STATUSES = ['ok', 'quota', 'unavailable', 'failed', 'held'];

export const MEDIA_QUOTA_FILE = () => process.env.MEGA_BOOK_MEDIA_QUOTA_FILE
  || join(homedir(), '.cache', 'mega-book', 'media-quota.json');
const FALLBACK_HOURS = 24;

const readAll = (file) => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return {}; } };

/** The producer's quota record while it is still in force, else null. */
export function activeQuota(producer, file = MEDIA_QUOTA_FILE(), nowMs = Date.now()) {
  const rec = readAll(file)[producer];
  return rec && Date.parse(rec.resetAt) > nowMs ? rec : null;
}

export function recordQuota(producer, resetAt, reason = '', file = MEDIA_QUOTA_FILE(), nowMs = Date.now()) {
  const all = readAll(file);
  const at = resetAt && !Number.isNaN(Date.parse(resetAt)) ? new Date(resetAt).toISOString()
    : new Date(nowMs + FALLBACK_HOURS * 3600e3).toISOString();
  all[producer] = { resetAt: at, reason: String(reason).slice(0, 300), recordedAt: new Date(nowMs).toISOString() };
  mkdirSync(dirname(file), { recursive: true });
  save(file, all);
  return all[producer];
}

export function clearQuota(producer, file = MEDIA_QUOTA_FILE()) {
  if (!existsSync(file)) return;
  const all = readAll(file);
  if (!(producer in all)) return;
  delete all[producer];
  save(file, all);
}

/** Adapt an image-style producer (returns, or throws QuotaError / UnavailableError / Error). */
export const fromThrowing = (fn) => async (job, part, ctx) => {
  try {
    return { status: 'ok', reason: 'made', ...(await fn(job, part, ctx)) };
  } catch (e) {
    if (e instanceof QuotaError) return { status: 'quota', resetAt: e.resetAt, reason: e.message };
    if (e instanceof UnavailableError) return { status: 'unavailable', reason: e.message };
    return { status: 'failed', reason: e.message };
  }
};

/**
 * Make one part through the medium's producers in order. Returns the first ok, failed or held result
 * with `producer` and `tried` (every producer's status and reason), or, when every producer was out
 * or offline, the last of those with the earliest reset time.
 */
export async function produce(medium, job, part, { impls, order = REGISTRY[medium], quotaFile = MEDIA_QUOTA_FILE(), nowMs = Date.now(), ctx = {} } = {}) {
  if (!order) throw new Error(`unknown medium ${medium}`);
  const tried = [];
  let last = { status: 'unavailable', reason: `no ${medium} producer available` };
  for (const producer of order) {
    const q = activeQuota(producer, quotaFile, nowMs);
    if (q) { tried.push({ producer, status: 'quota', reason: `out until ${q.resetAt}` }); last = { status: 'quota', resetAt: q.resetAt, reason: q.reason }; continue; }
    const fn = impls?.[producer];
    if (!fn) { tried.push({ producer, status: 'unavailable', reason: 'not configured' }); continue; }
    let r;
    try { r = await fn(job, part, ctx); } catch (e) { r = { status: 'failed', reason: e.message }; }
    if (!STATUSES.includes(r?.status)) r = { status: 'failed', reason: `bad producer reply ${JSON.stringify(r).slice(0, 200)}` };
    tried.push({ producer, status: r.status, reason: r.reason });
    if (r.status === 'quota') {
      recordQuota(producer, r.resetAt, r.reason, quotaFile, nowMs);
      last = { ...r, resetAt: activeQuota(producer, quotaFile, nowMs)?.resetAt };
      // A pacing hold (scripts/media/pacing.mjs) is our own limit, not the provider's: wait for it,
      // never fall back (the next producer for clips is the owner making them by hand).
      if (r.paced) return { ...last, producer, tried };
      continue;
    }
    if (r.status === 'unavailable') { last = r; continue; }
    if (r.status === 'ok') clearQuota(producer, quotaFile);
    return { ...r, producer, tried };
  }
  const resets = tried.filter((t) => t.status === 'quota').map((t) => activeQuota(t.producer, quotaFile, nowMs)?.resetAt).filter(Boolean).sort();
  return { ...last, ...(resets.length ? { resetAt: resets[0] } : {}), producer: null, tried };
}
