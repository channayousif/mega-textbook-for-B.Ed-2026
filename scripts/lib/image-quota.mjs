/**
 * Host-wide record of an exhausted image-generation quota (ADR-0029 producer: Gemini via agy).
 *
 * agy's image quota is separate from its text quota and resets at a stated time. Until
 * 2026-11-16 nothing remembered it between runs: the crew relaunched `illustrate` every hour,
 * agy wrote only a PHR, and ~25 PHR-only batch PRs merged in a day. scripts/generate-illustration.mjs
 * writes this file when agy reports QUOTA_EXHAUSTED and refuses to call agy again before the reset;
 * the crew reads it and holds `illustrate` jobs in the queue until then.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

export const IMAGE_QUOTA_FILE = process.env.MEGA_BOOK_IMAGE_QUOTA_FILE || join(homedir(), '.cache', 'mega-book', 'image-quota.json');

/** Used when agy says the quota is gone but gives no reset time. */
export const UNKNOWN_RESET_HOURS = 6;

/** The active record `{ resetAt, model, recordedAt }`, or null when none or already reset. */
export function activeImageQuota(file = IMAGE_QUOTA_FILE, nowMs = Date.now()) {
  try {
    if (!existsSync(file)) return null;
    const rec = JSON.parse(readFileSync(file, 'utf8'));
    const at = Date.parse(rec.resetAt);
    return Number.isFinite(at) && at > nowMs ? rec : null;
  } catch {
    return null;
  }
}

/** Record an exhausted quota. An unparseable reset time falls back to UNKNOWN_RESET_HOURS. */
export function recordImageQuota(resetAt, model = 'unreported', file = IMAGE_QUOTA_FILE, nowMs = Date.now()) {
  const parsed = Date.parse(resetAt);
  const at = Number.isFinite(parsed) && parsed > nowMs ? parsed : nowMs + UNKNOWN_RESET_HOURS * 3600e3;
  const rec = { resetAt: new Date(at).toISOString(), model, recordedAt: new Date(nowMs).toISOString() };
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(rec, null, 2)}\n`);
  return rec;
}

/** A successful generation proves the quota is back. */
export function clearImageQuota(file = IMAGE_QUOTA_FILE) {
  rmSync(file, { force: true });
}
