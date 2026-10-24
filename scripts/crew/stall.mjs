/**
 * Launch stalls. From 2026-10-22 to 2026-10-24 the disk floor held every launch for about
 * 37 hours. The 6-hourly disk alert did reach the owner, but the board, `crew status` and the
 * daily digest never said that launches were held or for how long, and the memory floor had
 * no alert at all. One stall record now covers both floors: it remembers when the hold began,
 * alerts once it has lasted long enough (at once for disk, which never frees itself), repeats
 * every few hours, and says when launches resume.
 *
 * Pure functions only, so tests/crew/ can exercise them without running the dispatcher.
 */

/** Minutes a hold must last before the first alert. Memory dips are often momentary. */
export const STALL_ALERT_AFTER_MIN = { disk: 0, memory: Number(process.env.CREW_STALL_ALERT_AFTER_MIN || 60) };
/** Minutes between repeat alerts while the same hold lasts. */
export const STALL_REALERT_MIN = 6 * 60;

/** Record that launches are held; `since` survives while the reason is unchanged. */
export function noteStall(control, reason, detail, nowMs = Date.now()) {
  const prev = control.launchStall;
  control.launchStall = prev && prev.reason === reason
    ? { ...prev, detail }
    : { reason, detail, since: new Date(nowMs).toISOString() };
  delete control.diskAlertAt; // superseded by launchStall.alertedAt
  return control.launchStall;
}

/** Launches are flowing again; returns the stall that ended, or null. */
export function clearStall(control) {
  const was = control.launchStall || null;
  delete control.launchStall;
  return was;
}

/** True when the hold has lasted past its alert threshold and was not alerted recently. */
export function stallAlertDue(stall, nowMs = Date.now(), afterMin = STALL_ALERT_AFTER_MIN, reAlertMin = STALL_REALERT_MIN) {
  if (!stall) return false;
  if (nowMs - Date.parse(stall.since) < (afterMin[stall.reason] ?? 0) * 60e3) return false;
  return !stall.alertedAt || nowMs - Date.parse(stall.alertedAt) >= reAlertMin * 60e3;
}

/** "45m" under 90 minutes, otherwise whole hours. */
export function heldFor(stall, nowMs = Date.now()) {
  const m = Math.max(0, Math.round((nowMs - Date.parse(stall.since)) / 6e4));
  return m < 90 ? `${m}m` : `${Math.round(m / 60)}h`;
}

/** One line for the board, status and digest; empty when nothing is held. */
export function stallLine(stall, nowMs = Date.now()) {
  return stall ? `launches held ${heldFor(stall, nowMs)} (${stall.reason}: ${stall.detail})` : '';
}
