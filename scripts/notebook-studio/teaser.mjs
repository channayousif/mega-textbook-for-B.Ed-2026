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
//   node scripts/notebook-studio/teaser.mjs rehash <key>                   (new script hash while still scripted, after a revision)
//   node scripts/notebook-studio/teaser.mjs clipqa <key> <shot> <take> --json '<qa>'      (QG1/QG2 on a take)
//   node scripts/notebook-studio/teaser.mjs block  <key> "<reason>" | unblock <key>
//   node scripts/notebook-studio/teaser.mjs meta   <key>           metadata for upload_video
//   node scripts/notebook-studio/teaser.mjs sheet                  owner spot-check sheet
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { allLedgers, uploadsOn, DAILY_UPLOAD_LIMIT } from './media-ledger.mjs';
// Feature 030 (T011): brand constants and atomic, locked ledger writes come from the shared media core.
import { SITE, LONG_DASH, clean, CHANNEL_URL, SUBSCRIBE_URL, TEASER_PLAYLIST } from '../media/brand.mjs';
import { save as saveJson, withLock } from '../media/ledger.mjs';
import { recipeFor, recipeFindings } from '../media/recipes.mjs';
import { courseFacts, videoLinks, moreAbout, fitDescription, parseOverview } from './describe.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
/** Spoken words that fit an 8-second Veo shot at a natural pace (Urdu runs a little longer). Mirrors
 *  specs/studio/recipes/teaser@1.json; teaser@2 allows 18 Urdu words at 1.25x. */
export const WORD_BUDGET = { en: 18, ur: 22 };
export const MAX_RETAKES = 2;
export const TEASER_STATES = ['planned', 'scripted', 'script-approved', 'clips-generated', 'clips-qa',
  'assembled', 'qa-pass', 'uploaded-private', 'qa3-pass', 'approved', 'public'];
const REQUIRES = {
  scripted: ['script_sha256'],
  'script-approved': ['gates.script'],
  'clips-generated': [],
  'clips-qa': ['gates.clips'],
  assembled: ['encoded_file', 'thumbnail_file'],
  'qa-pass': ['gates.qa1'],
  'uploaded-private': ['youtube_id', 'uploaded_at'],
  'qa3-pass': ['gates.qa3'],
  approved: ['gates.owner'],
  public: ['published_at'],
};
const GATE_FOR = { 'script-approved': 'script', 'clips-qa': 'clips', 'qa-pass': 'qa1', 'qa3-pass': 'qa3', approved: 'owner' };
const OK = ['pass', 'pass-with-notes', 'approve'];
/** Gates only the owner may pass (FR-012/FR-013, Feature 030): the script before credits, the Short before public. */
const OWNER_GATES = { 'script-approved': 'script', approved: 'owner' };

export const scriptPath = (id, root = ROOT) => join(root, 'specs', 'studio', 'teasers', `${id}.json`);
export const ledgerPath = (root = ROOT) => join(root, 'specs', 'studio', 'teasers', 'media-teasers.json');
export const loadScript = (id, root = ROOT) => JSON.parse(readFileSync(scriptPath(id, root), 'utf8'));
/** sha256 of the script file as committed (what `sha256sum` prints): the identity the owner approves. */
export const scriptSha = (id, root = ROOT) => createHash('sha256').update(readFileSync(scriptPath(id, root))).digest('hex');

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
  // Feature 030 (T018): the script's recipe sets the word budget and, from teaser@2, requires a named
  // camera move in the action shots. A script without `recipe` is teaser@1 (WORD_BUDGET).
  let recipe;
  try { recipe = recipeFor(script, root); } catch (e) { f.push(e.message); }
  if (recipe) f.push(...recipeFindings(recipe, script));
  try { teaserRoute(script, root); } catch (e) { f.push(e.message); }
  if (script.kind === 'course') {
    const ov = join(root, 'docs', `semester-${script.semester}`, script.course_code.toLowerCase(), 'course-overview.mdx');
    const want = existsSync(ov) ? parseOverview(readFileSync(ov, 'utf8')).outcomes.length : null;
    for (const loc of ['en', 'ur'].filter((l) => script.locales[l]?.objectives)) {
      const got = script.locales[loc].objectives.length;
      if (want !== null && got !== want) f.push(`${loc} objectives: ${got}, but the course overview has ${want} learning outcomes`);
    }
  }
  return f;
}

// ---------- ledger ----------
export function loadLedger(root = ROOT) {
  const p = ledgerPath(root);
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : { items: [] };
}
export function saveLedger(ledger, root = ROOT) {
  saveJson(ledgerPath(root), ledger);
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
export function recordClip(ledger, key, shot, clip, now = new Date(), { currentSha } = {}) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (!['script-approved', 'clips-generated'].includes(item.state)) throw new Error(`${key}: clips are recorded only after script approval (state ${item.state})`);
  if (currentSha && item.script_sha256 !== currentSha) throw new Error(`${key}: the script changed after the owner approved it (sha ${item.script_sha256?.slice(0, 12)} approved, ${currentSha.slice(0, 12)} now); it needs a new approval`);
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

export function advanceTeaser(ledger, key, to, fields = {}, { now = new Date(), ledgers, currentSha } = {}) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (item.blocked) throw new Error(`${key} is blocked: ${item.blocked}`);
  const from = TEASER_STATES.indexOf(item.state);
  if (TEASER_STATES.indexOf(to) !== from + 1) throw new Error(`${key}: ${item.state} -> ${to} is not the next state (${TEASER_STATES[from + 1]})`);
  const next = { ...item, ...fields, gates: { ...item.gates, ...(fields.gates ?? {}) } };
  for (const f of REQUIRES[to] ?? []) if (get(next, f) == null) throw new Error(`${key}: entering ${to} needs ${f}`);
  const gate = GATE_FOR[to];
  if (gate && !OK.includes(get(next, `gates.${gate}.verdict`))) throw new Error(`${key}: gate ${gate} verdict is ${get(next, `gates.${gate}.verdict`) ?? 'missing'}, cannot enter ${to}`);
  if (OWNER_GATES[to] && get(next, `gates.${OWNER_GATES[to]}.by`) !== 'owner') throw new Error(`${key}: only the owner may pass gate ${OWNER_GATES[to]} (by is ${get(next, `gates.${OWNER_GATES[to]}.by`) ?? 'missing'})`);
  if (to === 'script-approved' && currentSha && next.script_sha256 !== currentSha) throw new Error(`${key}: the script file no longer matches the recorded hash; rehash and ask the owner again`);
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

export { CHANNEL_URL, SUBSCRIBE_URL, TEASER_PLAYLIST };
const hashTag = (s) => `#${String(s).replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}]+/gu, '')}`;
const englishTitle = (script) => clean(script.title.en.replace(/\s*\([^)]*\)\s*/g, ' '));
const urduTitle = (script) => clean(script.title.ur.replace(/\s*\([^)]*\)\s*/g, ' '));

/**
 * Search- and AI-ready description pieces for one teaser locale, built only from the script (the
 * narration the owner approved, the titles, the code, optional keywords). Shared by YouTube and the
 * other platforms.
 */
export function seoParts(script, locale, root = ROOT) {
  const ur = locale === 'ur';
  const L = script.locales[locale];
  if (!L) throw new Error(`${script.id} has no ${locale} locale`);
  const url = teaserUrl(script, locale, root);
  const code = script.course_code ?? (ur ? 'ٹیچنگ لائسنس' : 'Teaching licence');
  const en = englishTitle(script);
  const urt = urduTitle(script);
  const n = L.narration.map(clean);
  const beats = script.shots.map((x) => x.beat);
  const learn = n.filter((_, i) => beats[i] === 'learn' || beats[i] === 'why');
  const keywordLine = ur ? `${urt} | ${en} (${code}) | B.Ed مفت کورس اردو میں` : `${en} (${code}) | ${urt} | Free B.Ed course`;
  const summary = n.filter((_, i) => beats[i] === 'hook').concat(learn.slice(0, 1)).join(' ');
  const keywords = [...new Set([en, urt, code, 'B.Ed', ...(L.keywords ?? [])].map(clean).filter(Boolean))];
  const hashtags = [...new Set(['#BEd', hashTag(en), '#TeacherEducation', '#textbookcompk', ur ? '#اردو' : '#Pakistan', '#Shorts'])];
  return { ur, L, url, code, en, urt, keywordLine, summary, learn, keywords, hashtags };
}

export function shortMeta(script, locale, root = ROOT) {
  const P = seoParts(script, locale, root);
  const { ur, L, url } = P;
  let title = clean(`${L.youtube_title} #Shorts`);
  if (title.length > 100) title = `${title.slice(0, 92).replace(/\s+\S*$/, '')} #Shorts`;
  const facts = script.kind === 'course' ? courseFacts(script.course_code.toLowerCase(), locale, { overrides: L, root }) : null;
  const videos = facts ? videoLinks(facts.course, locale, { root, skipTeaserOf: script.id }) : [];
  const head = [
    P.keywordLine,
    P.summary,
    `${ur ? 'پورا کورس مفت پڑھیں' : 'Study the full course free'}: ${url}`,
    `${ur ? 'چینل سبسکرائب کریں، ہر کورس کی مختصر ویڈیو یہاں آئے گی' : 'Subscribe for a short on every course'}: ${SUBSCRIBE_URL}`,
  ];
  const tail = [
    ...(facts ? [] : [ur ? 'textbook.com.pk بی ایڈ اور ٹیچنگ لائسنس کی مفت آن لائن درسی کتاب ہے، انگریزی اور اردو میں، سرکاری اسکیم آف اسٹڈیز کے مطابق۔'
      : 'textbook.com.pk is a free online textbook for B.Ed and the teaching licence, in English and Urdu, following the official scheme of studies.']), // the why-study block says it when present
    // The keywords already go in the tags; the visible search line only when there is no course block.
    ...(facts ? [] : [`${ur ? 'تلاش' : 'Search terms'}: ${P.keywords.join(', ')}`]),
    ur ? 'یہ مختصر ویڈیو Google Flow (Veo) سے بنائی گئی ہے؛ مناظر اور آواز AI کے ہیں۔ متن textbook.com.pk کے کورس صفحات سے لیا گیا۔'
      : 'Made with Google Flow (Veo); visuals and voice are AI-generated. Script taken from the textbook.com.pk course pages.',
    P.hashtags.join(' '),
  ];
  const tidy = (x) => x.split('\n').map(clean).join('\n');
  const make = (level) => [...head, ...(facts ? [moreAbout(facts, { videos, playlistUrl: TEASER_PLAYLIST ? `https://www.youtube.com/playlist?list=${TEASER_PLAYLIST}` : null, level })] : []), ...tail].map(tidy).join('\n\n');
  const { description } = fitDescription(make);
  const tags = [];
  for (const t of [...P.keywords, 'teacher education', 'textbook.com.pk', 'Shorts', ur ? 'Urdu' : 'English']) {
    if ([...tags, t].join(',').length > 480) break;
    if (!tags.includes(t)) tags.push(t);
  }
  const pinned = ur ? `مکمل کورس یہاں پڑھیں: ${url}\nچینل سبسکرائب کریں: ${SUBSCRIBE_URL}`
    : `Study the full course here: ${url}\nSubscribe: ${SUBSCRIBE_URL}`;
  return {
    upload_video: {
      title, description, tags: tags.join(','),
      category_id: '27', video_language: locale, status: 'private', made_for_kids: false, contains_synthetic_media: true,
    },
    pinned_comment: pinned,
    url,
  };
}

export const PLATFORMS = ['youtube', 'tiktok', 'instagram', 'facebook', 'linkedin'];
export const CAPTION_LIMIT = { tiktok: 2200, instagram: 2200, facebook: 5000, linkedin: 3000 };

/**
 * Caption for a cross-post. TikTok and Instagram captions cannot carry a clickable link, so they
 * point to the bio; Facebook and LinkedIn carry the course link.
 */
export function socialMeta(script, locale, platform, root = ROOT) {
  if (!CAPTION_LIMIT[platform]) throw new Error(`unknown cross-post platform ${platform}`);
  const P = seoParts(script, locale, root);
  const { ur, url } = P;
  const tags = P.hashtags.filter((h) => h !== '#Shorts');
  const follow = ur ? 'مزید کورسز کے لیے فالو کریں۔' : 'Follow for a short on every course.';
  const facts = script.kind === 'course' ? courseFacts(script.course_code.toLowerCase(), locale, { overrides: script.locales[locale], root }) : null;
  const objectives = facts?.objectives?.length ? `${ur ? '🎯 یہ کورس پڑھ کر آپ:' : '🎯 After this course you will:'}\n${facts.objectives.map((o) => `- ${o}`).join('\n')}` : null;
  const why = ur ? '✅ مفت، اردو اور انگریزی میں، ہر یونٹ میں 25 سوالات اور جوابات کی رہنمائی، پاکستانی کلاس روم کی مثالیں۔'
    : '✅ Free, in English and Urdu, 25 questions with marking guidance in every unit, Pakistani classroom examples.';
  const lines = {};
  const bio = ur ? 'پورا کورس مفت: لنک بائیو میں (textbook.com.pk)' : 'Full course free: link in bio (textbook.com.pk)';
  lines.tiktok = [P.summary, bio, follow, [...tags, '#fyp', '#LearnOnTikTok'].join(' ')];
  lines.instagram = [P.keywordLine, P.summary, bio, follow, [...tags, '#Reels', '#Education'].join(' ')];
  lines.facebook = [P.keywordLine, P.summary, ...(objectives ? [objectives] : []), why, `${ur ? 'پورا کورس مفت پڑھیں' : 'Study the full course free'}: ${url}`, ur ? 'پیج فالو کریں، ہر کورس کی مختصر ویڈیو یہاں آئے گی۔' : 'Follow the page for a short on every course.', tags.join(' ')];
  lines.linkedin = [
    ur ? `${P.urt} (${P.code}): بی ایڈ کا مکمل کورس، مفت اور اردو میں۔` : `${P.en} (${P.code}): the full B.Ed course, free, in English and Urdu.`,
    P.summary, ...(objectives ? [objectives] : []), `${ur ? 'کورس' : 'Course'}: ${url}`, ['#TeacherEducation', '#BEd', '#Pakistan'].join(' '),
  ];
  let caption = lines[platform].map((x) => x.split('\n').map(clean).join('\n')).join('\n\n');
  if (caption.length > CAPTION_LIMIT[platform]) caption = caption.slice(0, CAPTION_LIMIT[platform]);
  return { platform, caption, url, title: clean(script.locales[locale].youtube_title) };
}

/** Record a cross-post of a published teaser (only after the YouTube item is public, which carries owner approval). */
export function recordCrosspost(ledger, key, platform, fields, { now = new Date() } = {}) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (!CAPTION_LIMIT[platform]) throw new Error(`unknown cross-post platform ${platform}`);
  if (item.state !== 'public') throw new Error(`${key}: cross-post only after the YouTube Short is public (state ${item.state})`);
  if (!['draft', 'posted'].includes(fields.state)) throw new Error(`${key} ${platform}: state must be draft or posted`);
  if (!fields.post_id) throw new Error(`${key} ${platform}: post_id is required`);
  item.crossposts = { ...(item.crossposts ?? {}), [platform]: { ...fields, at: fields.at ?? now.toISOString() } };
  return item;
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

/**
 * A revised script (after an owner rejection) gets its new hash while it still waits for approval.
 * Only in `scripted`: after approval a changed script must go back through the owner.
 */
export function rehashScript(ledger, key, sha, root = ROOT, now = new Date()) {
  const item = ledger.items.find((i) => i.key === key);
  if (!item) throw new Error(`no item ${key}`);
  if (item.state !== 'scripted') throw new Error(`${key}: rehash only while scripted (state ${item.state})`);
  const f = checkScript(loadScript(item.id, root), root);
  if (f.length) throw new Error(`${key}: QG0 fails: ${f.join('; ')}`);
  item.script_sha256 = sha;
  item.history.push({ state: 'scripted', at: now.toISOString(), note: 'script revised and rehashed' });
  return { key, script_sha256: sha };
}
const shaFor = (L, key) => { const i = L.items.find((k) => k.key === key); return i && existsSync(scriptPath(i.id)) ? scriptSha(i.id) : undefined; };

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
      const m = shortMeta(loadScript(item.id), item.locale);
      // The upload step passes the assembled thumbnail to update_video (thumbnail_path).
      out({ ...m, update_video: { thumbnail_path: item.thumbnail_file ?? null, ...(TEASER_PLAYLIST ? { playlist_id: TEASER_PLAYLIST } : {}) } });
    } else if (cmd === 'social') {
      const L = loadLedger(); const item = L.items.find((i) => i.key === x);
      if (!item) throw new Error(`no item ${x}`);
      out(socialMeta(loadScript(item.id), item.locale, y));
    } else {
      // Writes hold the ledger lock across load -> change -> save, so parallel runs cannot lose updates.
      const WRITES = new Set(['plan', 'advance', 'clip', 'clipqa', 'block', 'unblock', 'crosspost', 'replace', 'thumb', 'rehash']);
      const run = () => {
      const L = loadLedger();
      if (cmd === 'status') out(L.items.map((i) => ({ key: i.key, state: i.state, takes: i.clips.length, blocked: i.blocked ?? null, youtube: i.youtube_id ?? null })));
      else if (cmd === 'plan') { out(planTeaser(L, x, y)); saveLedger(L); }
      else if (cmd === 'advance') { out(advanceTeaser(L, x, y, json, { currentSha: shaFor(L, x) })); saveLedger(L); }
      else if (cmd === 'clip') { out(recordClip(L, x, Number(y), json, new Date(), { currentSha: shaFor(L, x) })); saveLedger(L); }
      else if (cmd === 'rehash') { out(rehashScript(L, x, scriptSha(L.items.find((k) => k.key === x)?.id ?? x))); saveLedger(L); }
      else if (cmd === 'clipqa') { out(setClipQa(L, x, Number(y), Number(a[3]), json)); saveLedger(L); }
      else if (cmd === 'block') { const i = L.items.find((k) => k.key === x); if (!i) throw new Error(`no item ${x}`); i.blocked = y; saveLedger(L); out(i); }
      else if (cmd === 'unblock') { const i = L.items.find((k) => k.key === x); if (!i) throw new Error(`no item ${x}`); delete i.blocked; saveLedger(L); out(i); }
      else if (cmd === 'sheet') out(teaserSheet(L));
      else if (cmd === 'crosspost') { out(recordCrosspost(L, x, y, json)); saveLedger(L); }
      else if (cmd === 'replace') {
        // A public teaser replaced by a new upload (e.g. a re-render): keep the old IDs on record.
        const i = L.items.find((k) => k.key === x); if (!i) throw new Error(`no item ${x}`);
        if (i.state !== 'public' || !json.youtube_id || !json.reason) throw new Error('replace <key> --json {"youtube_id","reason"} on a public item');
        i.superseded_youtube_ids = [...new Set([...(i.superseded_youtube_ids ?? []), i.youtube_id])];
        i.youtube_id = json.youtube_id; i.replaced_at = new Date().toISOString(); i.replace_reason = json.reason;
        if (json.encoded_file) i.encoded_file = json.encoded_file;
        saveLedger(L); out({ key: i.key, youtube_id: i.youtube_id, superseded_youtube_ids: i.superseded_youtube_ids });
      }
      else if (cmd === 'thumb') { const i = L.items.find((k) => k.key === x); if (!i) throw new Error(`no item ${x}`); if (!y || !/\.jpe?g$/.test(y)) throw new Error('thumb <key> <file.jpg>'); i.thumbnail_file = y; saveLedger(L); out({ key: i.key, thumbnail_file: y }); }
      else { console.error('commands: check | status | plan | advance | clip | block | unblock | meta | social | crosspost | thumb | replace | sheet'); process.exit(2); }
      };
      if (WRITES.has(cmd)) withLock(ledgerPath(), run); else run();
    }
  } catch (e) { console.error(`teaser: ${e.message}`); process.exit(1); }
}
