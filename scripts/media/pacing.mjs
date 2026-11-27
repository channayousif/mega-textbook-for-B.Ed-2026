#!/usr/bin/env node
/**
 * Media pacing: proactive limits on every automated media call (owner ruling D-2026-0100).
 *
 * WHY. The producers' other guards are reactive: a quota is recorded only after a provider refuses
 * (producers/quota.mjs, producers/index.mjs). Nothing spaced requests out, so the crew could fire
 * Flow, Gemini, NotebookLM, YouTube and Meta calls back to back around the clock until a provider
 * stopped it, which is how accounts get flagged as automated misuse. Since 2026-11-24 Flow is
 * reachable 24/7 from davinci, so the risk is higher. This module makes every call look like one
 * person's rhythm: media hours only, a gap with random jitter between calls, and hourly and daily
 * caps. Veo spend also follows the owner's monthly budget.
 *
 * Media hours are 15:00-09:00 PKT: every hour EXCEPT 09:00-15:00, the owner's office hours (owner,
 * 2026-11-25: "I asked to set all the hours except 9am to 3pm"; the first build, 2026-11-24, read
 * "9 to 3 office hours" the other way round). A window whose start is after its end runs across
 * midnight.
 *
 * A producer calls `pace(channel, units)` right before it spends, and `paceRecord(channel, units)`
 * after the call succeeded. A short gap is slept; a cap or the media-hours window throws
 * `PaceHold` carrying `resetAt`, which callers map to their own "quota" status so the job is held
 * and retried later (no new failure path). Agent-driven steps (YouTube uploads through MCP) use the
 * CLI: `node scripts/media/pacing.mjs check youtube.upload` before, `record youtube.upload` after.
 *
 * Owner overrides: ~/.config/mega-book/media-limits.json, e.g.
 *   { "hours": { "start": 15, "end": 9 }, "cycleDay": 1, "channels": { "gflow.image": { "perDay": 30 } } }
 * Host-local and never committed. Do not import this file from any content gate (FR-018).
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { save, withLock } from './ledger.mjs';

export const LEDGER_FILE = () => process.env.MEGA_BOOK_MEDIA_PACING_FILE || join(homedir(), '.cache', 'mega-book', 'media-pacing.json');
export const LIMITS_FILE = () => process.env.MEGA_BOOK_MEDIA_LIMITS_FILE || join(homedir(), '.config', 'mega-book', 'media-limits.json');

/** Pakistan has no daylight saving: PKT is always UTC+5. */
const PKT_OFFSET_MS = 5 * 3600e3;
const MIN = 60e3;
const HOUR = 3600e3;
const KEEP_DAYS = 35;
/** Gaps longer than this become a hold instead of a sleep. */
export const MAX_SLEEP_MS = 10 * MIN;

/**
 * Defaults (D-2026-0100). `units` are clips/images/posts, except gflow.video where they are Flow
 * credits (veo_lite 10, veo_fast 20). Veo: 200 credits a day until `monthlyPool` credits are spent
 * in the billing cycle, then `afterPoolPerDay` until the cycle day.
 */
export const DEFAULTS = {
  // 15:00 to 09:00 PKT, across midnight: never in the owner's 09:00-15:00 office hours.
  hours: { start: 15, end: 9 },
  cycleDay: 1,
  channels: {
    'gflow.video': { gapMs: 3 * MIN, jitterMs: 90e3, perHourCount: 8, perDayUnits: 200, monthlyPool: 1000, afterPoolPerDay: 50 },
    'gflow.image': { gapMs: 90e3, jitterMs: 60e3, perHourCount: 12, perDayCount: 40 },
    // Second Google account (Feature 036): its own Flow credits and NotebookLM quota, same rhythm.
    'gflow2.video': { gapMs: 3 * MIN, jitterMs: 90e3, perHourCount: 8, perDayUnits: 200, monthlyPool: 1000, afterPoolPerDay: 50 },
    'gflow2.image': { gapMs: 90e3, jitterMs: 60e3, perHourCount: 12, perDayCount: 40 },
    'nlm2.studio': { gapMs: 15 * MIN, jitterMs: 3 * MIN, perHourCount: 2, perDayCount: 6 },
    // Meta AI on the owner's Meta account (D-2026-0102): a person's rhythm, kept modest.
    'meta.image': { gapMs: 2 * MIN, jitterMs: 60e3, perHourCount: 10, perDayCount: 30 },
    'agy.image': { gapMs: 60e3, jitterMs: 45e3, perHourCount: 15, perDayCount: 50 },
    'agy2.image': { gapMs: 60e3, jitterMs: 45e3, perHourCount: 15, perDayCount: 50 },
    'codex.image': { gapMs: 2 * MIN, jitterMs: 30e3, perHourCount: 6, perDayCount: 15 },
    'nlm.studio': { gapMs: 15 * MIN, jitterMs: 3 * MIN, perHourCount: 2, perDayCount: 6 },
    'youtube.upload': { gapMs: 45 * MIN, jitterMs: 5 * MIN, perHourCount: 1, perDayCount: 4 },
    'social.facebook': { gapMs: 2 * HOUR, jitterMs: 10 * MIN, perHourCount: 1, perDayCount: 3 },
    'social.instagram': { gapMs: 2 * HOUR, jitterMs: 10 * MIN, perHourCount: 1, perDayCount: 3 },
    'social.linkedin': { gapMs: 2 * HOUR, jitterMs: 10 * MIN, perHourCount: 1, perDayCount: 3 },
    'social.tiktok': { gapMs: 2 * HOUR, jitterMs: 10 * MIN, perHourCount: 1, perDayCount: 3 },
  },
};
export const CHANNELS = Object.keys(DEFAULTS.channels);

/** Image producer names (producers/image.mjs) to pacing channels. */
export const IMAGE_CHANNEL = { agy: 'agy.image', agy2: 'agy2.image', gflow: 'gflow.image', gflow2: 'gflow2.image', codex: 'codex.image', meta: 'meta.image' };

export class PaceHold extends Error {
  constructor(channel, message, resetAt) {
    super(message);
    this.channel = channel;
    this.resetAt = resetAt;
  }
}

const readJson = (file, empty) => { try { return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : empty; } catch { return empty; } };

/** Defaults merged with the owner's override file (shallow per channel). */
export function limits(file = LIMITS_FILE()) {
  const o = readJson(file, {});
  const channels = { ...DEFAULTS.channels };
  for (const [k, v] of Object.entries(o.channels ?? {})) channels[k] = { ...(channels[k] ?? {}), ...v };
  return { hours: { ...DEFAULTS.hours, ...(o.hours ?? {}) }, cycleDay: o.cycleDay ?? DEFAULTS.cycleDay, channels };
}

// ------------------------------------------------------------------ PKT calendar

const pktParts = (ms) => { const d = new Date(ms + PKT_OFFSET_MS); return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours() }; };
/** The UTC instant of a PKT wall-clock time. */
const pktInstant = (y, m, d, h = 0) => Date.UTC(y, m, d, h) - PKT_OFFSET_MS;
const pktDayStart = (ms) => { const p = pktParts(ms); return pktInstant(p.y, p.m, p.d); };

/** Inside media hours? A window with start > end (15 -> 9) runs across midnight. */
export function withinHours(nowMs = Date.now(), hours = DEFAULTS.hours) {
  const { h } = pktParts(nowMs);
  if (hours.start === hours.end) return true; // a 24-hour window
  return hours.start < hours.end ? h >= hours.start && h < hours.end : h >= hours.start || h < hours.end;
}

/** The next instant the media-hours window opens (now, if already open). Closed hours lie
 * before today's start in both shapes, so the next opening is today's start or tomorrow's. */
export function nextOpen(nowMs = Date.now(), hours = DEFAULTS.hours) {
  if (withinHours(nowMs, hours)) return nowMs;
  const p = pktParts(nowMs);
  const today = pktInstant(p.y, p.m, p.d, hours.start);
  return nowMs < today ? today : pktInstant(p.y, p.m, p.d + 1, hours.start);
}

/** Start of the billing cycle containing `nowMs` (cycle day at 00:00 PKT). */
export function cycleStart(nowMs, cycleDay = DEFAULTS.cycleDay) {
  const p = pktParts(nowMs);
  const thisMonth = pktInstant(p.y, p.m, Math.min(cycleDay, 28));
  return nowMs >= thisMonth ? thisMonth : pktInstant(p.y, p.m - 1, Math.min(cycleDay, 28));
}
const nextCycle = (nowMs, cycleDay) => { const s = pktParts(cycleStart(nowMs, cycleDay)); return pktInstant(s.y, s.m + 1, Math.min(cycleDay, 28)); };

// ------------------------------------------------------------------ the decision

const sum = (events, since) => events.filter((e) => e.at >= since).reduce((n, e) => n + (e.units ?? 1), 0);
const count = (events, since) => events.filter((e) => e.at >= since).length;

/**
 * Whether `channel` may spend `units` now. Pure: `events` are the channel's `{ at, units }` (ms).
 * Returns { ok: true, waitMs } (sleep that long first) or { ok: false, resetAt, reason }.
 */
export function decide(channel, { units = 1, events = [], nowMs = Date.now(), lim = limits(), random = Math.random } = {}) {
  const c = lim.channels[channel];
  if (!c) throw new Error(`unknown pacing channel ${channel}`);
  const iso = (ms) => new Date(ms).toISOString();
  if (!withinHours(nowMs, lim.hours)) {
    const at = nextOpen(nowMs, lim.hours);
    return { ok: false, resetAt: iso(at), reason: `${channel}: outside media hours (${lim.hours.start}:00-${lim.hours.end}:00 PKT)` };
  }
  const dayStart = pktDayStart(nowMs);
  const tomorrow = nextOpen(dayStart + 24 * HOUR, lim.hours);
  if (c.perDayCount != null && count(events, dayStart) + 1 > c.perDayCount) {
    return { ok: false, resetAt: iso(tomorrow), reason: `${channel}: daily cap of ${c.perDayCount} reached` };
  }
  if (c.perDayUnits != null) {
    let cap = c.perDayUnits;
    if (c.monthlyPool != null) {
      const spent = sum(events, cycleStart(nowMs, lim.cycleDay));
      if (spent >= c.monthlyPool) cap = c.afterPoolPerDay;
    }
    const today = sum(events, dayStart);
    if (today + units > cap) {
      return { ok: false, resetAt: iso(tomorrow), reason: `${channel}: ${today} of ${cap} units spent today; ${units} more would pass the cap` };
    }
    if (c.monthlyPool != null && c.afterPoolPerDay != null) {
      const spent = sum(events, cycleStart(nowMs, lim.cycleDay));
      // Never let one day's spend run the month's pool far past its edge either.
      if (spent < c.monthlyPool && spent + units > c.monthlyPool + c.afterPoolPerDay) {
        return { ok: false, resetAt: iso(nextCycle(nowMs, lim.cycleDay)), reason: `${channel}: the month's ${c.monthlyPool}-unit pool is nearly spent` };
      }
    }
  }
  const last = Math.max(0, ...events.map((e) => e.at));
  const due = last + (c.gapMs ?? 0) + Math.floor(random() * (c.jitterMs ?? 0));
  if (c.perHourCount != null && count(events, nowMs - HOUR) + 1 > c.perHourCount) {
    // Report the later of the hourly window and the gap, so a retry at resetAt is actually allowed.
    const oldest = events.filter((e) => e.at >= nowMs - HOUR).map((e) => e.at).sort((a, b) => a - b)[0];
    return { ok: false, resetAt: iso(nextOpen(Math.max(oldest + HOUR, due), lim.hours)), reason: `${channel}: hourly cap of ${c.perHourCount} reached` };
  }
  const waitMs = Math.max(0, due - nowMs);
  if (waitMs > MAX_SLEEP_MS) return { ok: false, resetAt: iso(nextOpen(due, lim.hours)), reason: `${channel}: next call allowed at ${iso(due)}` };
  if (!withinHours(nowMs + waitMs, lim.hours)) return { ok: false, resetAt: iso(nextOpen(nowMs + waitMs, lim.hours)), reason: `${channel}: the gap runs past media hours` };
  return { ok: true, waitMs };
}

// ------------------------------------------------------------------ ledger

function readLedger(file) { return readJson(file, {}); }

export function events(channel, file = LEDGER_FILE()) {
  return (readLedger(file)[channel] ?? []).map((e) => ({ at: Date.parse(e.at), units: e.units ?? 1 }));
}

export function paceRecord(channel, units = 1, { file = LEDGER_FILE(), nowMs = Date.now() } = {}) {
  mkdirSync(dirname(file), { recursive: true });
  return withLock(file, () => {
    const all = readLedger(file);
    const keepFrom = nowMs - KEEP_DAYS * 24 * HOUR;
    for (const k of Object.keys(all)) all[k] = (all[k] ?? []).filter((e) => Date.parse(e.at) >= keepFrom);
    (all[channel] ??= []).push({ at: new Date(nowMs).toISOString(), units });
    save(file, all);
    return all[channel].length;
  });
}

/** Check, check the result, sleep a short gap. Throws PaceHold when the call must wait longer. */
export function paceCheck(channel, { units = 1, file = LEDGER_FILE(), nowMs = Date.now(), lim = limits(), random = Math.random } = {}) {
  return decide(channel, { units, events: events(channel, file), nowMs, lim, random });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function pace(channel, units = 1, opts = {}) {
  const d = paceCheck(channel, { units, ...opts });
  if (!d.ok) throw new PaceHold(channel, `paced: ${d.reason}; next at ${d.resetAt}`, d.resetAt);
  if (d.waitMs > 0) {
    console.error(`… paced: ${channel} waits ${Math.round(d.waitMs / 1000)} s`);
    await (opts.sleep ?? sleep)(d.waitMs);
  }
  return d;
}

/** One line per channel: use today, this hour and the next allowed time. */
export function statusLines({ file = LEDGER_FILE(), nowMs = Date.now(), lim = limits() } = {}) {
  const day = pktDayStart(nowMs);
  return CHANNELS.map((ch) => {
    const ev = events(ch, file);
    const c = lim.channels[ch];
    const d = decide(ch, { units: c.perDayUnits ? 10 : 1, events: ev, nowMs, lim, random: () => 0 });
    const used = c.perDayUnits != null ? `${sum(ev, day)}/${c.perDayUnits} credits today, ${sum(ev, cycleStart(nowMs, lim.cycleDay))}/${c.monthlyPool} this cycle` : `${count(ev, day)}/${c.perDayCount} today`;
    return `${ch.padEnd(17)} ${used.padEnd(42)} ${d.ok ? (d.waitMs ? `next in ${Math.round(d.waitMs / 1000)} s` : 'ready') : `held until ${d.resetAt}`}`;
  });
}

// ------------------------------------------------------------------ CLI

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, channel, unitsArg] = process.argv.slice(2);
  const units = unitsArg ? Number(unitsArg) : 1;
  if (cmd === 'status') {
    console.log(`media hours ${limits().hours.start}:00-${limits().hours.end}:00 PKT; now ${withinHours() ? 'open' : 'closed'}`);
    for (const l of statusLines()) console.log(l);
  } else if (cmd === 'check' && channel) {
    const d = paceCheck(channel, { units });
    if (d.ok) { console.log(d.waitMs ? `wait ${Math.ceil(d.waitMs / 1000)} s, then go` : 'go'); process.exit(0); }
    console.log(`hold: ${d.reason}; next at ${d.resetAt}`);
    process.exit(4);
  } else if (cmd === 'record' && channel) {
    if (!CHANNELS.includes(channel)) { console.error(`unknown channel ${channel}`); process.exit(2); }
    console.log(`recorded ${channel} (${paceRecord(channel, units)} in the ledger)`);
  } else {
    console.error(`usage: node scripts/media/pacing.mjs status | check <channel> [units] | record <channel> [units]\nchannels: ${CHANNELS.join(', ')}`);
    process.exit(2);
  }
}
