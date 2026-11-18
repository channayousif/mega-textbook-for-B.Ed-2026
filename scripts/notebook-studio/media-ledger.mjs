#!/usr/bin/env node
// Feature 029 studio-media pipeline: the per-unit ledger at specs/studio/<course>/media-unit-NN.json.
//
// One item per audio/video artifact (topic x locale x kind x part). The ledger is the single record
// of where an item is, which gates it passed, and its YouTube id, so runs are resumable and an
// upload is never repeated (sha256 dedupe) or pushed past the daily quota.
//
// Usage (Claude runs these between MCP calls; the MCP results are pasted in as --json):
//   node scripts/notebook-studio/media-ledger.mjs status  <course> <unit>
//   node scripts/notebook-studio/media-ledger.mjs plan    <course> <unit> --json '<item>'
//   node scripts/notebook-studio/media-ledger.mjs advance <course> <unit> <key> <state> [--json '<fields>']
//   node scripts/notebook-studio/media-ledger.mjs block   <course> <unit> <key> "<reason>"
//   node scripts/notebook-studio/media-ledger.mjs unblock <course> <unit> <key>
//   node scripts/notebook-studio/media-ledger.mjs quota   [--date YYYY-MM-DD]
//   node scripts/notebook-studio/media-ledger.mjs sheet   <course> <unit>      (owner spot-check sheet)
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync, createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export const STATES = ['planned', 'generated', 'downloaded', 'qa1-pass', 'encoded', 'qa2-pass',
  'uploaded-private', 'qa3-pass', 'approved', 'public', 'placed'];
/** Uploads per project per day are capped at 100 (YouTube Data API, 2026-06-01); keep headroom. */
export const DAILY_UPLOAD_LIMIT = 95;
/** Fields a transition into a state must carry (on the item after the merge). */
const REQUIRES = {
  generated: ['artifact_id'],
  downloaded: ['file', 'sha256'],
  'qa1-pass': ['gates.qa1'],
  encoded: ['encoded_file', 'thumbnail_file'],
  'qa2-pass': ['gates.qa2'],
  'uploaded-private': ['youtube_id', 'uploaded_at'],
  'qa3-pass': ['gates.qa3'],
  approved: ['gates.owner'],
  public: ['published_at'],
};

export const itemKey = (i) => `t${i.topic}-${i.locale}-${i.kind}${i.part ? `-p${i.part}` : ''}`;
export const ledgerPath = (course, unit, root = ROOT) =>
  join(root, 'specs', 'studio', course, `media-unit-${String(unit).padStart(2, '0')}.json`);

export function loadLedger(course, unit, root = ROOT) {
  const p = ledgerPath(course, unit, root);
  if (!existsSync(p)) return { course, unit: Number(unit), items: [] };
  return JSON.parse(readFileSync(p, 'utf8'));
}
export function saveLedger(ledger, root = ROOT) {
  writeFileSync(ledgerPath(ledger.course, ledger.unit, root), `${JSON.stringify(ledger, null, 1)}\n`);
}
export function allLedgers(root = ROOT) {
  const base = join(root, 'specs', 'studio');
  if (!existsSync(base)) return [];
  const unit = readdirSync(base).filter((c) => statSync(join(base, c)).isDirectory()).flatMap((c) =>
    readdirSync(join(base, c)).filter((f) => /^media-unit-\d{2}\.json$/.test(f))
      .map((f) => JSON.parse(readFileSync(join(base, c, f), 'utf8'))));
  // Teaser Shorts (studio-teaser skill) share the same channel and daily upload quota.
  const teasers = join(base, 'teasers', 'media-teasers.json');
  return existsSync(teasers) ? [...unit, JSON.parse(readFileSync(teasers, 'utf8'))] : unit;
}

const get = (o, path) => path.split('.').reduce((v, k) => (v == null ? v : v[k]), o);

export function planItem(ledger, item, now = new Date()) {
  const full = { state: 'planned', gates: {}, history: [], ...item };
  full.key = itemKey(full);
  if (ledger.items.some((i) => i.key === full.key)) throw new Error(`${full.key} already in the ledger`);
  for (const f of ['topic', 'locale', 'kind', 'title', 'prompt_ref']) if (full[f] == null) throw new Error(`plan: ${f} is required`);
  if (!['audio', 'video'].includes(full.kind)) throw new Error('plan: kind must be audio or video');
  full.history.push({ state: 'planned', at: now.toISOString() });
  ledger.items.push(full);
  return full;
}

/** Move one step forward. Refuses skips, blocked items, missing evidence and duplicate files. */
export function advance(ledger, key, to, fields = {}, { ledgers = [ledger], now = new Date() } = {}) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (item.blocked) throw new Error(`${key} is blocked: ${item.blocked}`);
  const from = STATES.indexOf(item.state);
  if (STATES.indexOf(to) !== from + 1) throw new Error(`${key}: ${item.state} -> ${to} is not the next state (${STATES[from + 1]})`);
  const next = { ...item, ...fields, gates: { ...item.gates, ...(fields.gates ?? {}) } };
  for (const f of REQUIRES[to] ?? []) if (get(next, f) == null) throw new Error(`${key}: entering ${to} needs ${f}`);
  if (to === 'downloaded') {
    const dup = ledgers.flatMap((l) => l.items).find((i) => i.key !== key && i.sha256 === next.sha256);
    if (dup) throw new Error(`${key}: file is identical to ${dup.key} (sha256 ${next.sha256.slice(0, 12)})`);
  }
  if (to === 'uploaded-private' && uploadsOn(ledgers, now) >= DAILY_UPLOAD_LIMIT) {
    throw new Error(`daily upload limit reached (${DAILY_UPLOAD_LIMIT}); stop until tomorrow (Pacific midnight)`);
  }
  for (const g of ['qa1', 'qa2', 'qa3', 'owner']) {
    const v = get(next, `gates.${g}.verdict`);
    if (to === { qa1: 'qa1-pass', qa2: 'qa2-pass', qa3: 'qa3-pass', owner: 'approved' }[g] && !['pass', 'pass-with-notes', 'approve'].includes(v)) {
      throw new Error(`${key}: gate ${g} verdict is ${v ?? 'missing'}, cannot enter ${to}`);
    }
  }
  Object.assign(item, next, { state: to });
  item.history.push({ state: to, at: now.toISOString() });
  return item;
}

export function block(ledger, key, reason) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  item.blocked = reason;
  return item;
}

/** Uploads counted per Pacific calendar day, because the YouTube quota resets at Pacific midnight. */
const pacificDay = (d) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
export function uploadsOn(ledgers, when = new Date()) {
  const day = pacificDay(when);
  return ledgers.flatMap((l) => l.items).filter((i) => i.uploaded_at && pacificDay(i.uploaded_at) === day).length;
}

export function sha256File(path) {
  return new Promise((ok, fail) => {
    const h = createHash('sha256');
    createReadStream(path).on('data', (b) => h.update(b)).on('end', () => ok(h.digest('hex'))).on('error', fail);
  });
}

/** Owner spot-check sample: first item per locale, plus every item with notes or a UR flag. */
export function spotCheckSheet(ledger) {
  const ready = ledger.items.filter((i) => i.state === 'qa3-pass');
  const seen = new Set();
  const rows = [];
  for (const i of [...ready].sort((a, b) => a.topic - b.topic || (a.part ?? 0) - (b.part ?? 0))) {
    const why = [];
    if (!seen.has(`${i.locale}-${i.kind}`)) { seen.add(`${i.locale}-${i.kind}`); why.push(`first ${i.locale} ${i.kind}`); }
    if (i.gates.qa2?.verdict === 'pass-with-notes') why.push(`QG2 notes: ${i.gates.qa2.notes ?? ''}`.trim());
    if (i.gates.qa2?.urdu_flag) why.push(`Urdu flag: ${i.gates.qa2.urdu_flag}`);
    if (why.length) rows.push({ key: i.key, title: i.title, url: `https://youtu.be/${i.youtube_id}`, why: why.join('; ') });
  }
  return { must_hear: rows, total_ready: ready.length, others: ready.length - rows.length };
}

// ---------- CLI ----------
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, ...rest] = process.argv.slice(2);
  const ji = rest.indexOf('--json');
  const json = ji >= 0 ? JSON.parse(rest.splice(ji, 2)[1]) : {};
  const di = rest.indexOf('--date');
  const date = di >= 0 ? new Date(`${rest.splice(di, 2)[1]}T12:00:00-08:00`) : new Date();
  const [course, unit, key, arg] = rest;
  const out = (v) => console.log(JSON.stringify(v, null, 1));
  try {
    if (cmd === 'quota') { out({ pacific_day: pacificDay(date), uploads: uploadsOn(allLedgers(), date), limit: DAILY_UPLOAD_LIMIT }); process.exit(0); }
    const ledger = loadLedger(course, unit);
    if (cmd === 'status') {
      out(ledger.items.map((i) => ({ key: i.key, state: i.state, blocked: i.blocked ?? null, youtube: i.youtube_id ?? null })));
    } else if (cmd === 'plan') { out(planItem(ledger, json)); saveLedger(ledger); }
    else if (cmd === 'advance') { out(advance(ledger, key, arg, json, { ledgers: [ledger, ...allLedgers().filter((l) => !(l.course === course && l.unit === Number(unit)))] })); saveLedger(ledger); }
    else if (cmd === 'block') { out(block(ledger, key, arg)); saveLedger(ledger); }
    else if (cmd === 'unblock') { const i = block(ledger, key, null); delete i.blocked; out(i); saveLedger(ledger); }
    else if (cmd === 'sheet') out(spotCheckSheet(ledger));
    else { console.error('commands: status | plan | advance | block | unblock | quota | sheet'); process.exit(2); }
  } catch (e) { console.error(`media-ledger: ${e.message}`); process.exit(1); }
}
