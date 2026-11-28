#!/usr/bin/env node
// NotebookLM login health (Feature 036 follow-up): both nlm profiles are checked every two hours from
// 14:00 PKT through media hours and refreshed from the davinci workspace Chromes when expired, so a
// Study Studio job never finds out by failing. On 2026-11-28 both logins expired about five hours after
// sign-in; the refresh from the Chromes took 16 s for both.
//
//   node scripts/media/nlm-health.mjs [--if-due] [--no-refresh] [--json]
//
// - Check: `nlm notebook list --profile <p>` (read-only).
// - Refresh: `nlm login --profile <p> --provider openclaw --cdp-url <url>` from the profile's Chrome:
//   default through the media tunnel (127.0.0.1:18802 -> davinci workspace-chrome:9222); second through a
//   one-off tunnel (127.0.0.1:18803 -> davinci workspace-chrome-2:9223), closed afterwards.
// - A profile whose refresh fails tells the owner once a day (crew notify; never from --no-refresh), and
//   the crew keeps that profile's notebook lane idle (laneHealthy below) until it passes again.
// State: ~/.cache/mega-book/nlm-health.json. `--if-due` runs when two hours have passed since the last
// run, from 14:00 PKT (an hour before media hours open at 15:00) until media hours close at 09:00.
// Do not import this file from any content gate (FR-018).
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const HEALTH_FILE = process.env.NLM_HEALTH_FILE || join(homedir(), '.cache', 'mega-book', 'nlm-health.json');
export const PROFILES = [
  { name: 'default', lane: 'notebook', cdp: 'http://127.0.0.1:18802', tunnel: null },
  { name: 'second', lane: 'notebook2', cdp: 'http://127.0.0.1:18803', tunnel: '127.0.0.1:18803:127.0.0.1:9223' },
];
const PKT = 5 * 3600e3;
export const pktDay = (ms) => new Date(ms + PKT).toISOString().slice(0, 10);
const pktHour = (ms) => new Date(ms + PKT).getUTCHours();

export const readHealth = (file = HEALTH_FILE) => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return { profiles: {} }; } };

/** Whether a run is due: two hours since the last one, from 14:00 PKT until media hours close at 09:00. */
export function due(state, nowMs = Date.now()) {
  const last = Date.parse(state.lastRun ?? 0) || 0;
  const h = pktHour(nowMs);
  return (h >= 14 || h < 9) && nowMs - last >= 2 * 3600e3;
}

/** A notebook lane may take work unless its profile's last check failed (no record counts as healthy). */
export function laneHealthy(lane, state = readHealth()) {
  const p = PROFILES.find((x) => x.lane === lane);
  return !p || state.profiles?.[p.name]?.ok !== false;
}

/** Read-only probe; ok when nlm lists notebooks without an auth error. */
export function probe(profile, run = spawnSync) {
  const r = run('nlm', ['notebook', 'list', '--profile', profile], { encoding: 'utf8', timeout: 120000 });
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;
  const authError = /authentication|expired|re-authenticate|nlm login|not logged in/i.test(out);
  return { ok: r.status === 0 && !authError, detail: authError ? 'login expired' : r.status === 0 ? 'ok' : out.trim().split('\n').slice(-1)[0]?.slice(0, 200) || `exit ${r.status}` };
}

function refresh(p, run = spawnSync) {
  let opened = false;
  try {
    if (p.tunnel) {
      const t = run('ssh', ['-o', 'BatchMode=yes', '-o', 'ExitOnForwardFailure=yes', '-f', '-N', '-L', p.tunnel, 'davinci'], { encoding: 'utf8', timeout: 30000 });
      opened = t.status === 0;
      if (!opened) return `tunnel failed: ${(t.stderr || '').trim().slice(0, 150)}`;
    }
    const r = run('nlm', ['login', '--profile', p.name, '--provider', 'openclaw', '--cdp-url', p.cdp], { encoding: 'utf8', timeout: 240000 });
    return r.status === 0 ? null : `nlm login exit ${r.status}: ${`${r.stdout}${r.stderr}`.trim().split('\n').slice(-1)[0]?.slice(0, 150)}`;
  } finally {
    // pgrep runs as its own process, so the pattern never matches this script (unlike a shell pkill).
    if (opened) for (const pid of (run('pgrep', ['-f', `${p.tunnel} davinci`], { encoding: 'utf8' }).stdout || '').split('\n').filter(Boolean)) run('kill', [pid]);
  }
}

/** Check every profile, refresh the expired ones, record the state; returns it. */
export function checkAll({ doRefresh = true, run = spawnSync, file = HEALTH_FILE, nowMs = Date.now(), notify = (msg) => run(process.execPath, [join(ROOT, 'scripts/crew/crew.mjs'), 'notify', msg], { encoding: 'utf8', timeout: 60000 }) } = {}) {
  const state = readHealth(file);
  state.profiles ??= {};
  for (const p of PROFILES) {
    let res = probe(p.name, run);
    let refreshed = null;
    if (!res.ok && doRefresh) {
      const why = refresh(p, run);
      res = probe(p.name, run);
      refreshed = why ? `failed: ${why}` : 'refreshed';
    }
    const prev = state.profiles[p.name] ?? {};
    const rec = { ok: res.ok, detail: res.detail, at: new Date(nowMs).toISOString(), ...(refreshed ? { refreshed } : {}) };
    if (!res.ok && doRefresh && prev.notifiedDay !== pktDay(nowMs)) {
      notify(`NotebookLM profile "${p.name}" (${p.lane}) cannot sign in (${res.detail}${refreshed ? `; ${refreshed}` : ''}). Its Study Studio lane waits. Sign in again in the davinci Chrome for that account; the crew retries every two hours.`);
      rec.notifiedDay = pktDay(nowMs);
    } else if (!res.ok) rec.notifiedDay = prev.notifiedDay;
    state.profiles[p.name] = rec;
  }
  state.lastRun = new Date(nowMs).toISOString();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(state, null, 1)}\n`);
  return state;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  if (a.includes('--if-due') && !due(readHealth())) process.exit(0);
  const state = checkAll({ doRefresh: !a.includes('--no-refresh') });
  if (a.includes('--json')) console.log(JSON.stringify(state));
  else for (const [name, p] of Object.entries(state.profiles)) console.log(`nlm ${name}: ${p.ok ? 'ok' : 'FAILING'} (${p.detail}${p.refreshed ? `; ${p.refreshed}` : ''})`);
}
