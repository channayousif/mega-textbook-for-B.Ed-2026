/**
 * Host-wide record of exhausted image-generation quotas, one per raster producer (ADR-0029).
 *
 * Producers, in the owner's order (2026-11-18): agy (Gemini via Antigravity), gflow (Nano Banana via
 * Google Flow on the owner's Windows PC, reached over the SSH tunnel) and codex (Codex's built-in
 * image_gen). Each has its own quota and reset time. scripts/generate-illustration.mjs records a
 * producer when it runs out and skips it until the reset; the crew holds `illustrate` jobs only when
 * every producer is out or unreachable. Until 2026-11-16 nothing remembered a quota between runs and
 * ~25 PHR-only batch PRs merged in a day.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

export const IMAGE_QUOTA_FILE = process.env.MEGA_BOOK_IMAGE_QUOTA_FILE || join(homedir(), '.cache', 'mega-book', 'image-quota.json');

/** Owner ruling 2026-11-18: agy first, then gflow while the tunnel is up, then Codex. Owner ruling
 * 2026-11-27 (Feature 036): agy2, the second Google account's Antigravity, right after agy. */
export const PRODUCERS = ['agy', 'agy2', 'gflow', 'gflow2', 'codex'];

/** Hold used when a producer says its quota is gone but names no reset time. gflow quotas are daily. */
export const FALLBACK_HOURS = { agy: 6, agy2: 6, gflow: 24, gflow2: 24, codex: 6 };
/** Kept for callers of the single-producer API. */
export const UNKNOWN_RESET_HOURS = FALLBACK_HOURS.agy;

export const GFLOW_MCP_URL = process.env.GFLOW_MCP_URL || 'http://127.0.0.1:18800/mcp';
export const GFLOW_FILES_URL = process.env.GFLOW_FILES_URL || 'http://127.0.0.1:18801/';

function readAll(file) {
  try {
    if (!existsSync(file)) return {};
    const raw = JSON.parse(readFileSync(file, 'utf8'));
    // The first version (PR #629) stored one agy record at the top level.
    if (raw && typeof raw.resetAt === 'string') return { agy: raw };
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}

function writeAll(all, file) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(all, null, 2)}\n`);
}

/** The producer's active record `{ resetAt, model, recordedAt }`, or null when none or already reset. */
export function activeImageQuota(producer = 'agy', file = IMAGE_QUOTA_FILE, nowMs = Date.now()) {
  const rec = readAll(file)[producer];
  const at = Date.parse(rec?.resetAt);
  return Number.isFinite(at) && at > nowMs ? rec : null;
}

/** Record an exhausted quota. An unparseable or past reset time falls back to FALLBACK_HOURS. */
export function recordImageQuota(producer, resetAt, model = 'unreported', file = IMAGE_QUOTA_FILE, nowMs = Date.now()) {
  const parsed = Date.parse(resetAt);
  const hours = FALLBACK_HOURS[producer] ?? UNKNOWN_RESET_HOURS;
  const at = Number.isFinite(parsed) && parsed > nowMs ? parsed : nowMs + hours * 3600e3;
  const rec = { resetAt: new Date(at).toISOString(), model, recordedAt: new Date(nowMs).toISOString() };
  const all = readAll(file);
  all[producer] = rec;
  writeAll(all, file);
  return rec;
}

/** A successful generation proves the producer's quota is back. */
export function clearImageQuota(producer, file = IMAGE_QUOTA_FILE) {
  const all = readAll(file);
  if (!(producer in all)) return;
  delete all[producer];
  writeAll(all, file);
}

/** Whether a TCP connection to the URL's host and port opens within `ms` (synchronous, for the crew tick). */
export function portOpen(url, ms = 3000) {
  try {
    const u = new URL(url);
    const port = Number(u.port || (u.protocol === 'https:' ? 443 : 80));
    if (!/^[\w.-]+$/.test(u.hostname) || !port) return false;
    const r = spawnSync('bash', ['-c', `exec 3<>/dev/tcp/${u.hostname}/${port}`], { timeout: ms, stdio: 'ignore' });
    return r.status === 0;
  } catch {
    return false;
  }
}

/** gflow runs on the owner's PC: usable only while both tunnel ends (MCP and file server) answer. */
export function gflowReachable() {
  return portOpen(GFLOW_MCP_URL) && portOpen(GFLOW_FILES_URL);
}

/**
 * Producers that can take a request now, in order: no active quota record and, for gflow, reachable.
 * `reachable` overrides the probe (tests, or a caller that already probed).
 */
export function availableProducers({ file = IMAGE_QUOTA_FILE, nowMs = Date.now(), reachable } = {}) {
  return PRODUCERS.filter((p) => {
    if (activeImageQuota(p, file, nowMs)) return false;
    if (p.startsWith('gflow')) return reachable ? reachable(p) : gflowReachable();
    return true;
  });
}

/** One line for BOARD.md and logs, e.g. "agy out until X · gflow offline · codex ok". */
export function producerStatus({ file = IMAGE_QUOTA_FILE, nowMs = Date.now(), reachable } = {}) {
  return PRODUCERS.map((p) => {
    const q = activeImageQuota(p, file, nowMs);
    if (q) return `${p} out until ${q.resetAt}`;
    if (p.startsWith('gflow') && !(reachable ? reachable(p) : gflowReachable())) return `${p} offline`;
    return `${p} ok`;
  }).join(' · ');
}
