#!/usr/bin/env node
// Feature 029 studio-teaser (D-2026-0082): course and licence-track teaser Shorts made with Google
// Flow (Veo, spoken narration per locale) and published to YouTube Shorts.
//
// This module holds the pure parts the skill needs between MCP calls:
//   - teaserRoute(): the verified page a teaser links to (course overview, or /licence)
//   - checkScript(): QG0, run before the owner approves a script and before any credit is spent
//   - the teaser ledger (specs/studio/teasers/media-teasers.json): one item per teaser x locale,
//     forward-only states with evidence, at most two retakes per shot
//   - shortMeta(): YouTube metadata for the assembled Short
//
// CLI:
//   node scripts/notebook-studio/teaser.mjs check  <id>            QG0 for specs/studio/teasers/<id>.json
//   node scripts/notebook-studio/teaser.mjs status                 ledger overview
//   node scripts/notebook-studio/teaser.mjs plan   <id> <locale>   add the ledger item (state planned)
//   node scripts/notebook-studio/teaser.mjs advance <key> <state> [--json '<fields>']
//   node scripts/notebook-studio/teaser.mjs clip   <key> <shot> --json '<clip record>'   (record a take)
//   node scripts/notebook-studio/teaser.mjs clipqa <key> <shot> <take> --json '<qa>'      (QG1/QG2 on a take)
//   node scripts/notebook-studio/teaser.mjs block  <key> "<reason>" | unblock <key>
//   node scripts/notebook-studio/teaser.mjs meta   <key>           metadata for upload_video
//   node scripts/notebook-studio/teaser.mjs sheet                  owner spot-check sheet
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { allLedgers, uploadsOn, DAILY_UPLOAD_LIMIT } from './media-ledger.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://textbook.com.pk';
const LONG_DASH = /[\u2014\u2015\u2E3A\u2E3B]/;
/** Spoken words that fit an 8-second Veo shot at a natural pace (Urdu runs a little longer). */
export const WORD_BUDGET = { en: 18, ur: 22 };
export const MAX_RETAKES = 2;
export const TEASER_STATES = ['planned', 'scripted', 'script-approved', 'clips-generated', 'clips-qa',
  'assembled', 'qa-pass', 'uploaded-private', 'qa3-pass', 'approved', 'public'];
const REQUIRES = {
  scripted: ['script_sha256'],
  'script-approved': ['gates.script'],
  'clips-generated': [],
  'clips-qa': ['gates.clips'],
  assembled: ['encoded_file'],
  'qa-pass': ['gates.qa1'],
  'uploaded-private': ['youtube_id', 'uploaded_at'],
  'qa3-pass': ['gates.qa3'],
  approved: ['gates.owner'],
  public: ['published_at'],
};
const GATE_FOR = { 'script-approved': 'script', 'clips-qa': 'clips', 'qa-pass': 'qa1', 'qa3-pass': 'qa3', approved: 'owner' };
const OK = ['pass', 'pass-with-notes', 'approve'];

export const scriptPath = (id, root = ROOT) => join(root, 'specs', 'studio', 'teasers', `${id}.json`);
export const ledgerPath = (root = ROOT) => join(root, 'specs', 'studio', 'teasers', 'media-teasers.json');
export const loadScript = (id, root = ROOT) => JSON.parse(readFileSync(scriptPath(id, root), 'utf8'));

/** Course teasers link to the course overview; the licence teaser links to /licence/. Trailing slash
 *  included: the live site 301-redirects the bare path, and a video link should land directly. */
export function teaserRoute(script, root = ROOT) {
  if (script.kind === 'licence') {
    if (!existsSync(join(root, 'licence', 'index.mdx'))) throw new Error('licence/index.mdx not found');
    return '/licence/';
  }
  const code = script.course_code.toLowerCase();
  const file = join(root, 'docs', `semester-${script.semester}`, code, 'course-overview.mdx');
  if (!existsSync(file)) throw new Error(`no course overview at docs/semester-${script.semester}/${code}/course-overview.mdx`);
  return `/semester-${script.semester}/${code}/course-overview/`;
}
export const teaserUrl = (script, locale, root = ROOT) => `${SITE}${locale === 'ur' ? '/ur' : ''}${teaserRoute(script, root)}`;

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/** QG0: schema, sources exist, five shots in beat order, word budgets, no long dash, route resolves. */
export function checkScript(script, root = ROOT) {
  const f = [];
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(JSON.parse(readFileSync(join(root, 'specs', 'studio', 'teaser-script.schema.json'), 'utf8')));
  if (!validate(script)) return validate.errors.map((e) => `schema: ${e.instancePath || '/'} ${e.message}`);
  for (const s of script.sources) if (!existsSync(join(root, s))) f.push(`source missing: ${s}`);
  const ns = script.shots.map((s) => s.n);
  if (ns.join() !== '1,2,3,4,5') f.push(`shots must be numbered 1-5 in order (got ${ns.join()})`);
  if (script.shots[0].beat !== 'hook') f.push('shot 1 must be the hook');
  if (script.shots[4].beat !== 'cta') f.push('shot 5 must be the call to action');
  const text = JSON.stringify(script);
  if (LONG_DASH.test(text)) f.push('contains a long dash (use a spaced hyphen)');
  for (const loc of ['en', 'ur']) {
    script.locales[loc].narration.forEach((line, i) => {
      const n = words(line);
      if (n > WORD_BUDGET[loc]) f.push(`${loc} shot ${i + 1}: ${n} words, over the ${WORD_BUDGET[loc]}-word budget for 8 seconds`);
    });
  }
  try { teaserRoute(script, root); } catch (e) { f.push(e.message); }
  return f;
}

// ---------- ledger ----------
export function loadLedger(root = ROOT) {
  const p = ledgerPath(root);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : { items: [] };
}
export function saveLedger(ledger, root = ROOT) {
  mkdirSync(dirname(ledgerPath(root)), { recursive: true });
  writeFileSync(ledgerPath(root), `${JSON.stringify(ledger, null, 1)}\n`);
}
const get = (o, path) => path.split('.').reduce((v, k) => (v == null ? v : v[k]), o);
export const teaserKey = (id, locale) => `${id}-${locale}`;

export function planTeaser(ledger, id, locale, now = new Date()) {
  const key = teaserKey(id, locale);
  if (ledger.items.some((i) => i.key === key)) throw new Error(`${key} already in the ledger`);
  const item = { key, id, locale, kind: 'short', state: 'planned', gates: {}, clips: [], history: [{ state: 'planned', at: now.toISOString() }] };
  ledger.items.push(item);
  return item;
}

/** Record one Veo take for a shot; refuses a third retake (MAX_RETAKES after the first take). */
export function recordClip(ledger, key, shot, clip, now = new Date()) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (!['script-approved', 'clips-generated'].includes(item.state)) throw new Error(`${key}: clips are recorded only after script approval (state ${item.state})`);
  const takes = item.clips.filter((c) => c.shot === shot).length;
  if (takes > MAX_RETAKES) throw new Error(`${key} shot ${shot}: already ${takes} takes; the limit is ${MAX_RETAKES + 1} (first take + ${MAX_RETAKES} retakes)`);
  for (const f of ['artifact_id', 'model', 'credits']) if (clip[f] == null) throw new Error(`clip record needs ${f}`);
  const rec = { shot, take: takes + 1, at: now.toISOString(), ...clip };
  item.clips.push(rec);
  return rec;
}

/** Attach QG1/QG2 results to one take (file, technical metrics, transcript verdict). */
export function setClipQa(ledger, key, shot, take, qa) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  const c = item.clips.find((r) => r.shot === shot && r.take === take);
  if (!c) throw new Error(`${key}: no take ${take} for shot ${shot}`);
  if (!qa?.verdict || !qa.by) throw new Error('clip qa needs verdict and by');
  c.qa = qa;
  return c;
}

/** The take chosen for each shot: the latest take whose qa verdict passes. */
export function chosenTakes(item) {
  return [1, 2, 3, 4, 5].map((n) => item.clips.filter((c) => c.shot === n && OK.includes(c.qa?.verdict)).at(-1) ?? null);
}

export function advanceTeaser(ledger, key, to, fields = {}, { now = new Date(), ledgers } = {}) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (item.blocked) throw new Error(`${key} is blocked: ${item.blocked}`);
  const from = TEASER_STATES.indexOf(item.state);
  if (TEASER_STATES.indexOf(to) !== from + 1) throw new Error(`${key}: ${item.state} -> ${to} is not the next state (${TEASER_STATES[from + 1]})`);
  const next = { ...item, ...fields, gates: { ...item.gates, ...(fields.gates ?? {}) } };
  for (const f of REQUIRES[to] ?? []) if (get(next, f) == null) throw new Error(`${key}: entering ${to} needs ${f}`);
  const gate = GATE_FOR[to];
  if (gate && !OK.includes(get(next, `gates.${gate}.verdict`))) throw new Error(`${key}: gate ${gate} verdict is ${get(next, `gates.${gate}.verdict`) ?? 'missing'}, cannot enter ${to}`);
  if (to === 'clips-generated') {
    const missing = [1, 2, 3, 4, 5].filter((n) => !next.clips.some((c) => c.shot === n));
    if (missing.length) throw new Error(`${key}: no take yet for shot(s) ${missing.join(', ')}`);
  }
  if (to === 'clips-qa') {
    const missing = chosenTakes(next).map((c, i) => (c ? null : i + 1)).filter(Boolean);
    if (missing.length) throw new Error(`${key}: no passing take for shot(s) ${missing.join(', ')}`);
  }
  if (to === 'uploaded-private') {
    const all = [...(ledgers ?? allLedgers()), ledger];
    if (uploadsOn(all, now) >= DAILY_UPLOAD_LIMIT) throw new Error(`daily upload limit reached (${DAILY_UPLOAD_LIMIT})`);
  }
  Object.assign(item, next, { state: to });
  item.history.push({ state: to, at: now.toISOString() });
  return item;
}

// ---------- YouTube ----------
const clean = (s) => String(s).replace(/[\u2014\u2015\u2E3A\u2E3B]/g, ' - ').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();

export function shortMeta(script, locale, root = ROOT) {
  const ur = locale === 'ur';
  const L = script.locales[locale];
  const url = teaserUrl(script, locale, root);
  let title = clean(`${L.youtube_title} #Shorts`);
  if (title.length > 100) title = `${title.slice(0, 92).replace(/\s+\S*$/, '')} #Shorts`;
  const description = [
    clean(ur ? `${script.title.ur}: مکمل کورس مفت پڑھیں۔` : `${script.title.en}: study the full course free.`),
    `${ur ? 'لنک' : 'Link'}: ${url}`,
    ur ? 'یہ مختصر ویڈیو Google Flow (Veo) سے بنائی گئی ہے؛ مناظر اور آواز AI کے ہیں۔ متن textbook.com.pk کے کورس صفحات سے لیا گیا۔'
      : 'Made with Google Flow (Veo); visuals and voice are AI-generated. Script taken from the textbook.com.pk course pages.',
    '#BEd #TeacherEducation #textbookcompk #Shorts',
  ].join('\n\n');
  const pinned = ur ? `مکمل کورس یہاں پڑھیں: ${url}` : `Study the full course here: ${url}`;
  return {
    upload_video: {
      title, description,
      tags: ['B.Ed', 'teacher education', script.course_code ?? 'teacher licence', 'textbook.com.pk', 'Shorts', ur ? 'Urdu' : 'English'].join(','),
      category_id: '27', video_language: locale, status: 'private', made_for_kids: false, contains_synthetic_media: true,
    },
    pinned_comment: pinned,
    url,
  };
}

export function teaserSheet(ledger) {
  const ready = ledger.items.filter((i) => i.state === 'qa3-pass');
  const seen = new Set();
  const rows = [];
  for (const i of ready) {
    const why = [];
    if (!seen.has(i.locale)) { seen.add(i.locale); why.push(`first ${i.locale} teaser`); }
    if (i.gates.clips?.verdict === 'pass-with-notes') why.push(`clip notes: ${i.gates.clips.notes ?? ''}`);
    if (i.gates.clips?.urdu_flag) why.push(`Urdu flag: ${i.gates.clips.urdu_flag}`);
    if (why.length) rows.push({ key: i.key, url: `https://youtube.com/shorts/${i.youtube_id}`, why: why.join('; ') });
  }
  return { must_watch: rows, total_ready: ready.length, others: ready.length - rows.length };
}

// ---------- CLI ----------
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const ji = a.indexOf('--json');
  const json = ji >= 0 ? JSON.parse(a.splice(ji, 2)[1]) : {};
  const [cmd, x, y] = a;
  const out = (v) => console.log(JSON.stringify(v, null, 1));
  try {
    if (cmd === 'check') {
      const f = checkScript(loadScript(x));
      if (f.length) { console.error(`QG0 ${x}: ${f.length} finding(s)`); f.forEach((m) => console.error(`  - ${m}`)); process.exit(1); }
      console.log(`QG0 ${x}: pass`);
    } else if (cmd === 'meta') {
      const L = loadLedger(); const item = L.items.find((i) => i.key === x);
      if (!item) throw new Error(`no item ${x}`);
      out(shortMeta(loadScript(item.id), item.locale));
    } else {
      const L = loadLedger();
      if (cmd === 'status') out(L.items.map((i) => ({ key: i.key, state: i.state, takes: i.clips.length, blocked: i.blocked ?? null, youtube: i.youtube_id ?? null })));
      else if (cmd === 'plan') { out(planTeaser(L, x, y)); saveLedger(L); }
      else if (cmd === 'advance') { out(advanceTeaser(L, x, y, json)); saveLedger(L); }
      else if (cmd === 'clip') { out(recordClip(L, x, Number(y), json)); saveLedger(L); }
      else if (cmd === 'clipqa') { out(setClipQa(L, x, Number(y), Number(a[3]), json)); saveLedger(L); }
      else if (cmd === 'block') { const i = L.items.find((k) => k.key === x); if (!i) throw new Error(`no item ${x}`); i.blocked = y; saveLedger(L); out(i); }
      else if (cmd === 'unblock') { const i = L.items.find((k) => k.key === x); if (!i) throw new Error(`no item ${x}`); delete i.blocked; saveLedger(L); out(i); }
      else if (cmd === 'sheet') out(teaserSheet(L));
      else { console.error('commands: check | status | plan | advance | clip | block | unblock | meta | sheet'); process.exit(2); }
    }
  } catch (e) { console.error(`teaser: ${e.message}`); process.exit(1); }
}
