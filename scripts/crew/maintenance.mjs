/**
 * Schedules and rules for the crew's self-maintenance (ops/crew/README.md, "Weekly maintenance"
 * and "Intelligence"): the 12-hourly harvest, the daily distill job, and the weekly survey that
 * refactors code, keeps the ADR register and docs current, and promotes intelligence into skills,
 * gates and rules.
 *
 * Every schedule is computed from the 15-minute tick in Asia/Karachi time (the owner's clock), so
 * no crontab entry and no daylight-saving handling is needed: the host's clock moves, Pakistan's
 * does not. Each slot runs once; a slot missed because the host was down runs at the next tick.
 *
 * Pure functions only, so tests/crew/ can exercise them without the dispatcher.
 */

export const TZ = 'Asia/Karachi';
export const HARVEST_HOURS = [0, 12];
export const DISTILL_HOUR = 3;
export const MAINTENANCE_WEEKDAY = 0; // Sunday
export const MAINTENANCE_HOUR = 2;
export const MAX_TASKS = 6;
export const AREAS = { code: 'maint_refactor', docs: 'maint_docs', adr: 'maint_adr', skill: 'maint_skill', artifacts: 'maint_docs' };

const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', weekday: 'short', hourCycle: 'h23' });
const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Karachi calendar parts of a date: { date: 'YYYY-MM-DD', hour, weekday (0 = Sunday) }. */
export function local(date) {
  const p = Object.fromEntries(fmt.formatToParts(date).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour), weekday: WEEKDAYS[p.weekday] };
}

/** ISO 8601 week of a Karachi calendar date, e.g. 2026-W43. */
export function weekId(date) {
  const { date: d } = local(date);
  const day = new Date(`${d}T00:00:00Z`);
  const dow = (day.getUTCDay() + 6) % 7; // Monday = 0
  day.setUTCDate(day.getUTCDate() - dow + 3); // the Thursday of this ISO week
  const year = day.getUTCFullYear();
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const week = 1 + Math.round(((day - jan4) / 864e5 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

/** The harvest slot a date falls in: 'YYYY-MM-DD-00' or 'YYYY-MM-DD-12' (Karachi). */
export function harvestSlot(date) {
  const { date: d, hour } = local(date);
  const h = [...HARVEST_HOURS].reverse().find((x) => hour >= x);
  return `${d}-${String(h).padStart(2, '0')}`;
}

/** Every harvest slot from the one containing `from` to the one containing `to`, in order. */
export function slotsBetween(from, to) {
  const out = [];
  const end = harvestSlot(to);
  for (let t = from.getTime(); out.at(-1) !== end && out.length < 2000; t += 6 * 36e5) {
    const s = harvestSlot(new Date(t));
    if (out.at(-1) !== s) out.push(s);
  }
  return out;
}

/** Due when this tick is in a harvest slot the last harvest did not cover. */
export function harvestDue(lastSlot, date) {
  return harvestSlot(date) !== lastSlot;
}

/** The day's distill: due once a Karachi day, from DISTILL_HOUR on. Returns the day or null. */
export function distillDue(lastDay, date) {
  const { date: d, hour } = local(date);
  return hour >= DISTILL_HOUR && lastDay !== d ? d : null;
}

/** The week's maintenance: due on Sunday from MAINTENANCE_HOUR on, once per ISO week. Returns the week or null. */
export function maintenanceDue(lastWeek, date) {
  const { weekday, hour } = local(date);
  if (weekday !== MAINTENANCE_WEEKDAY || hour < MAINTENANCE_HOUR) return null;
  const w = weekId(date);
  return lastWeek === w ? null : w;
}

/**
 * The task rows of a survey's tasks.md: a Markdown table whose header has at least
 * `id`, `area` and `title` (case-insensitive), plus optional `files`, `acceptance`, `risk`.
 * Rows with an unknown area are dropped; at most MAX_TASKS are kept, in table order.
 */
export function parseTasks(markdown) {
  const rows = String(markdown || '').split('\n').filter((l) => /^\s*\|/.test(l));
  const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const headerAt = rows.findIndex((l) => /\bid\b/i.test(l) && /\barea\b/i.test(l) && /\btitle\b/i.test(l));
  if (headerAt < 0) return [];
  const head = cells(rows[headerAt]).map((h) => h.toLowerCase().replace(/[^a-z]/g, ''));
  const out = [];
  for (const line of rows.slice(headerAt + 1)) {
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue; // the --- separator
    const row = Object.fromEntries(cells(line).map((v, i) => [head[i], v.replace(/`/g, '')]));
    const area = (row.area || '').toLowerCase();
    if (!row.id || !AREAS[area]) continue;
    out.push({ id: row.id, area, stage: AREAS[area], title: row.title || '', files: row.files || '', acceptance: row.acceptance || '', risk: row.risk || '' });
    if (out.length >= MAX_TASKS) break;
  }
  return out;
}

/** Course content belongs to the corpus crew; maintenance and intelligence jobs never touch it. */
export const CONTENT = [/^docs\//, /^licence\//, /^i18n\/[^/]+\/docusaurus-plugin-content-docs[^/]*\//, /^specs\/content\//, /^static\/img\/figures\//, /^glossary\.json$/];

export function contentFiles(files) {
  return files.filter((f) => CONTENT.some((re) => re.test(f)));
}

/**
 * What to do with a green-or-not maintenance PR: 'merge' (CI green, review passed, nothing
 * protected), 'ask' (would merge, but a protected file needs the owner), or 'wait'.
 */
export function maintenanceVerdict({ files, ciGreen, reviewPassed, protectedPatterns }) {
  if (!ciGreen || !reviewPassed) return 'wait';
  return files.some((f) => protectedPatterns.some((re) => re.test(f))) ? 'ask' : 'merge';
}

/** A reviewer's verdict line: `CREW-VERDICT: pass|revise` plus optional notes after it. */
export function parseVerdict(logText) {
  const m = [...String(logText || '').matchAll(/CREW-VERDICT:\s*(pass|revise)\b[ \t:-]*(.*)/gi)].at(-1);
  return m ? { verdict: m[1].toLowerCase(), note: m[2].trim() } : null;
}
