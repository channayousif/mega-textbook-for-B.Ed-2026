#!/usr/bin/env node
// Feature 031 "Social Updates": a daily roundup of deployed work as branded image posts
// (owner, 2026-11-22). Two buckets per day:
//   content  new units, Urdu, courses, illustrations, revisions, reviews, public teasers: posts
//            automatically once `check` passes (after the pilot);
//   feature  user-facing feat(...) PRs: waits for the owner's `crew post <id>`.
// Only deployed work counts: content comes from the LIVE news feed (a merged PR whose main CI passed
// and that the deploy gate published), features from PRs whose merge commit the deploy log shows live.
//
//   node scripts/social/updates.mjs collect [--since <iso>] [--date YYYY-MM-DD] [--dry]
//   node scripts/social/updates.mjs check <id>
//   node scripts/social/updates.mjs render <id>
//   node scripts/social/updates.mjs approve <id> [--by owner|auto]
//   node scripts/social/updates.mjs reject <id> <note>
//   node scripts/social/updates.mjs copy <id> <n> --en "<line>" --ur "<line>" [--card-en "<short>" --card-ur "<short>"]
//                                    (feature line n, 1-based; the card line is at most 68 characters)
//   node scripts/social/updates.mjs publish <id> [--platforms facebook,instagram,linkedin]
//   node scripts/social/updates.mjs show [<id>]
//   node scripts/social/updates.mjs snapshot            (copy the host ledger to specs/social/updates.json)
//
// The working ledger lives on this host (`~/studio-media/social/updates.json`, beside the cards),
// because posting is a host action (the tokens are here) and crew branches merge in batches: a
// ledger kept only in git could repost yesterday's items before yesterday's batch merged. Each crew
// job commits a snapshot to `specs/social/updates.json` as the record.
//
// Nothing here is imported by a content gate (FR-018 pattern); tests: tests/unit/social-*.test.mjs.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { update } from '../media/ledger.mjs';
import { SITE, LONG_DASH, clean } from '../media/brand.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const LEDGER = process.env.SOCIAL_LEDGER ?? join(homedir(), 'studio-media', 'social', 'updates.json');
export const SNAPSHOT = join(ROOT, 'specs', 'social', 'updates.json');
export const PLATFORMS = ['facebook', 'instagram', 'linkedin'];
export const MAX_HIGHLIGHTS = 5;
// The card shows `card_en`/`card_ur` (or `en`/`ur` when no card line is given) in about 68
// characters; the caption explains in plain words for an ordinary reader (owner, 2026-11-23:
// "use full course titles with codes, use descriptive language for ordinary audience").
export const LIMITS = { headline: 60, card: 68, highlight: 320, instagram: 2200 };
export const HASHTAGS = '#BEd #TeacherEducation #textbookcompk #اردو';
const BURST_DAYS = 7;

/** Order highlights by what readers care about most. Provisional is not announced socially. */
const PRIORITY = ['course', 'unit', 'urdu', 'teaser', 'animation', 'figures', 'updated', 'review'];

// ---------- copy (pure) ----------

const unitLabel = (e) => `${e.course_code} Unit ${e.unit_no}`;
const unitLabelUr = (e) => `${e.course_code} یونٹ ${e.unit_no}`;

// Full course titles (owner, 2026-11-23: "use full course titles with codes"), from the catalogue.
let catalogTitles;
export function courseTitles(path = join(ROOT, 'catalog/courses.json')) {
  if (catalogTitles) return catalogTitles;
  catalogTitles = {};
  try {
    const c = JSON.parse(readFileSync(path, 'utf8'));
    for (const course of [...(c.semesters ?? []).flatMap((s) => s.courses ?? []), ...(c.tracks ?? []).flatMap((t) => t.courses ?? [])]) {
      if (course?.code) catalogTitles[course.code] = { en: course.title_en, ur: course.title_ur || course.title_en };
    }
  } catch { /* no catalogue: codes alone */ }
  return catalogTitles;
}
/** "GCCE-400 Civics and Community Engagement" (code alone when the title is unknown). */
export function courseName(code, lang = 'en', titles = courseTitles()) {
  const t = titles[code]?.[lang];
  return t ? `${code} ${t}` : code;
}
/** A card line in the room the card has; falls back to the shorter form when the long one does not fit. */
const fit = (long, short) => (long.length <= 68 ? long : short);
/** Up to `max` names, then "and N more" (EN) / "اور N مزید" (UR), kept under the caption limit. */
function listOf(names, lang, max = 4) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  const and = lang === 'ur' ? ' اور ' : ' and ';
  const tail = rest > 0 ? (lang === 'ur' ? `، اور ${rest} مزید` : `, and ${rest} more`) : '';
  if (rest > 0) return `${shown.join(lang === 'ur' ? '؛ ' : '; ')}${tail}`;
  return shown.length > 1 ? `${shown.slice(0, -1).join(lang === 'ur' ? '، ' : ', ')}${and}${shown.at(-1)}` : (shown[0] ?? '');
}

/**
 * One highlight for a group of same-kind items of one course (or one item). Deterministic copy:
 * `card_en`/`card_ur` is the short card line; `en`/`ur` explains it in plain words for an
 * ordinary reader, with the course's full title and code.
 */
export function highlight(type, items, titles = courseTitles()) {
  const n = items.length;
  const e = items[0];
  const ids = items.map((i) => i.id);
  const link = n === 1 && e.permalink ? e.permalink : (e.permalink ?? '/').replace(/\/unit-\d+\/?$/, '/');
  const code = e.course_code;
  const nameEn = courseName(code, 'en', titles), nameUr = courseName(code, 'ur', titles);
  const h = (cardEn, cardUr, en, ur) => ({ type, ids, card_en: clean(cardEn), card_ur: clean(cardUr), en: clean(en), ur: clean(ur), link });
  const unitTitles = (lang) => items.slice().sort((a, b) => (a.unit_no ?? 0) - (b.unit_no ?? 0))
    .map((i) => (lang === 'ur' ? i.title_ur || i.title_en : i.title_en)).filter(Boolean);
  switch (type) {
    case 'course': {
      const en = e.title_en ? `${code} ${e.title_en}` : nameEn, ur = e.title_ur ? `${code} ${e.title_ur}` : nameUr;
      return h(fit(`New course: ${en}`, `New course: ${code}`), fit(`نیا کورس: ${ur}`, `نیا کورس: ${code}`),
        `New course: ${en}. It is free to read on textbook.com.pk, unit by unit, for anyone training to teach.`,
        `نیا کورس: ${ur}۔ یہ textbook.com.pk پر یونٹ وار مفت پڑھا جا سکتا ہے، ہر اس شخص کے لیے جو تدریس کی تربیت لے رہا ہے۔`);
    }
    case 'unit': {
      if (n === 1) {
        return h(fit(`${unitLabel(e)}: ${e.title_en}`, `${unitLabel(e)} is new`), fit(`${unitLabelUr(e)}: ${e.title_ur || e.title_en}`, `${unitLabelUr(e)} نیا`),
          `${nameEn}, Unit ${e.unit_no}: ${e.title_en}, is now free to read.`,
          `${nameUr}، یونٹ ${e.unit_no}: ${e.title_ur || e.title_en}، اب مفت پڑھا جا سکتا ہے۔`);
      }
      const te = unitTitles('en'), tu = unitTitles('ur');
      return h(fit(`${nameEn}: ${n} new units`, `${code}: ${n} new units`), fit(`${nameUr}: ${n} نئے یونٹ`, `${code}: ${n} نئے یونٹ`),
        te.length ? `${nameEn}: ${n} new units to read for free, on ${listOf(te, 'en')}.` : `${nameEn}: ${n} new units to read for free.`,
        tu.length ? `${nameUr}: ${n} نئے یونٹ مفت پڑھنے کے لیے، ان موضوعات پر: ${listOf(tu, 'ur')}۔` : `${nameUr}: ${n} نئے یونٹ مفت پڑھنے کے لیے۔`);
    }
    case 'urdu': return n > 1
      ? h(fit(`${nameEn}: ${n} units now in Urdu`, `${code}: ${n} units now in Urdu`), fit(`${nameUr}: ${n} یونٹ اب اردو میں`, `${code}: ${n} یونٹ اب اردو میں`),
        `${n} units of ${nameEn} can now be read in Urdu as well as English.`,
        `${nameUr} کے ${n} یونٹ اب انگریزی کے ساتھ اردو میں بھی پڑھے جا سکتے ہیں۔`)
      : h(fit(`${unitLabel(e)} now in Urdu`, `${code}: a unit now in Urdu`), fit(`${unitLabelUr(e)} اب اردو میں`, `${code}: ایک یونٹ اب اردو میں`),
        `${nameEn}, Unit ${e.unit_no}${e.title_en ? `: ${e.title_en}` : ''}, can now be read in Urdu as well as English.`,
        `${nameUr}، یونٹ ${e.unit_no}${e.title_ur || e.title_en ? `: ${e.title_ur || e.title_en}` : ''}، اب انگریزی کے ساتھ اردو میں بھی پڑھا جا سکتا ہے۔`);
    case 'figures': {
      const c = items.reduce((t, i) => t + (i.count ?? 1), 0);
      return h(fit(`${nameEn}: ${c} new diagrams`, `${code}: ${c} new diagrams and pictures`), fit(`${nameUr}: ${c} نئے خاکے`, `${code}: ${c} نئے خاکے اور تصاویر`),
        `${c} new pictures and diagrams in ${nameEn} make the ideas easier to see and understand.`,
        `${nameUr} میں ${c} نئی تصاویر اور خاکے بات کو دیکھ کر سمجھنا آسان بناتے ہیں۔`);
    }
    case 'updated': return n > 1
      ? h(fit(`${nameEn}: ${n} units improved`, `${code}: ${n} units improved`), fit(`${nameUr}: ${n} یونٹ بہتر`, `${code}: ${n} یونٹ بہتر`),
        `${n} units of ${nameEn} were revised and improved.`,
        `${nameUr} کے ${n} یونٹوں میں نظرثانی کر کے انہیں بہتر بنایا گیا۔`)
      : h(fit(`${unitLabel(e)} improved: ${e.title_en}`, `${unitLabel(e)} improved`), fit(`${unitLabelUr(e)} بہتر: ${e.title_ur || e.title_en}`, `${unitLabelUr(e)} بہتر`),
        `${nameEn}, Unit ${e.unit_no}: ${e.title_en}, was revised and improved.`,
        `${nameUr}، یونٹ ${e.unit_no}: ${e.title_ur || e.title_en}، میں نظرثانی کر کے اسے بہتر بنایا گیا۔`);
    case 'review': return n > 1
      ? h(fit(`${nameEn}: ${n} units reviewed`, `${code}: ${n} units reviewed`), fit(`${nameUr}: ${n} یونٹوں کی نظرثانی مکمل`, `${code}: ${n} یونٹوں کی نظرثانی مکمل`),
        `${n} units of ${nameEn} have completed their review.`,
        `${nameUr} کے ${n} یونٹوں کی نظرثانی مکمل ہو گئی ہے۔`)
      : h(fit(`${unitLabel(e)}: review completed`, `${code}: a unit reviewed`), fit(`${unitLabelUr(e)}: نظرثانی مکمل`, `${code}: ایک یونٹ کی نظرثانی مکمل`),
        `${nameEn}, Unit ${e.unit_no}${e.title_en ? `: ${e.title_en}` : ''}, has completed its review.`,
        `${nameUr}، یونٹ ${e.unit_no}${e.title_ur || e.title_en ? `: ${e.title_ur || e.title_en}` : ''}، کی نظرثانی مکمل ہو گئی ہے۔`);
    case 'teaser': {
      const ur = items.every((i) => (i.locale ?? (/-en$/.test(i.id ?? '') ? 'en' : 'ur')) === 'ur');
      const names = (lang) => items.map((i) => courseName(i.course_code, lang, titles));
      // Name as many courses as fit the caption limit (320), then "and N more".
      const fitList = (make, lang) => [8, 6, 4, 3, 2].map((m) => make(listOf(names(lang), lang, m))).find((t) => t.length <= 320) ?? make(listOf(names(lang), lang, 1));
      return n > 1
        ? h(`${n} new 30-second course videos${ur ? ' in Urdu' : ''}`, `${n} نئی 30 سیکنڈ کی کورس ویڈیوز${ur ? ' اردو میں' : ''}`,
          fitList((l) => `${n} new 30-second videos on YouTube${ur ? ', in Urdu,' : ''} introduce ${l}.`, 'en'),
          fitList((l) => `یوٹیوب پر${ur ? ' اردو میں' : ''} ${n} نئے 30 سیکنڈ کے تعارفی ویڈیو: ${l}۔`, 'ur'))
        : h(fit(`${nameEn}: a 30-second video`, `${code}: a 30-second course video`), fit(`${nameUr}: 30 سیکنڈ کی ویڈیو`, `${code}: 30 سیکنڈ کی کورس ویڈیو`),
          `A new 30-second video on YouTube${ur ? ', in Urdu,' : ''} shows what ${nameEn} is about.`,
          `یوٹیوب پر${ur ? ' اردو میں' : ''} 30 سیکنڈ کا نیا ویڈیو بتاتا ہے کہ ${nameUr} کس بارے میں ہے۔`);
    }
    case 'animation': {
      // Feature 032: approved, public animated versions of placed figures.
      const figs = new Set(items.map((i) => i.figure)).size;
      const both = new Set(items.map((i) => i.lang)).size > 1;
      const plural = figs === 1 ? 'diagram' : 'diagrams';
      return h(fit(`${nameEn}: ${figs} animated ${plural}`, `${code}: ${figs} animated ${plural}`), fit(`${nameUr}: ${figs} متحرک خاکے`, `${code}: ${figs} متحرک خاکے`),
        `${figs} ${plural} in ${nameEn} now play as short animations that build step by step, with captions${both ? ' in English and Urdu' : ''}. Watch them on YouTube or with the "Watch it animate" button under each diagram.`,
        `${nameUr} کے ${figs} خاکے اب مختصر متحرک ویڈیو کی صورت میں ہیں جو قدم بہ قدم بنتے ہیں، ساتھ تحریری وضاحت${both ? ' انگریزی اور اردو میں' : ''}۔ انہیں یوٹیوب پر یا ہر خاکے کے نیچے "متحرک دیکھیں" بٹن سے دیکھیں۔`);
    }
    default: throw new Error(`no copy for ${type}`);
  }
}

/** Group items by kind and course (teasers by kind only), a week-long burst into one highlight. */
export function contentHighlights(items) {
  const buckets = new Map();
  for (const it of items) {
    if (!PRIORITY.includes(it.type)) continue;
    const k = it.type === 'teaser' || it.type === 'course' ? `${it.type}|${it.type === 'course' ? it.id : ''}` : `${it.type}|${it.course_code}`;
    buckets.set(k, [...(buckets.get(k) ?? []), it]);
  }
  const out = [];
  for (const group of buckets.values()) {
    const sorted = [...group].sort((a, b) => b.date.localeCompare(a.date));
    const newest = Date.parse(sorted[0].date);
    const burst = sorted.filter((i) => newest - Date.parse(i.date) <= BURST_DAYS * 86_400_000);
    out.push({ ...highlight(sorted[0].type, burst), date: sorted[0].date });
    const rest = sorted.filter((i) => !burst.includes(i));
    if (rest.length) out.push({ ...highlight(rest[0].type, rest), date: rest[0].date });
  }
  return out.sort((a, b) => PRIORITY.indexOf(a.type) - PRIORITY.indexOf(b.type) || b.date.localeCompare(a.date));
}

/** Public 16:9 animated figures from the Feature 032 ledger, approved after `since`. */
export function animationEvents(root, since, ledgerPath = join(root, 'specs/studio/animations/placed.json')) {
  if (!existsSync(ledgerPath)) return [];
  const L = JSON.parse(readFileSync(ledgerPath, 'utf8'));
  return (L.animations ?? []).filter((a) => a.status === 'public' && a.format === '16x9' && a.approved)
    .map((a) => {
      const m = a.figure.match(/^\/img\/figures\/([a-z0-9-]+)\/unit-(\d+)\//);
      return m && { id: `animation:${a.figure}:${a.lang}`, type: 'animation', date: `${a.approved}T12:00:00+05:00`,
        course_code: m[1].toUpperCase(), unit_no: Number(m[2]), figure: a.figure, lang: a.lang, permalink: '/' };
    })
    .filter((e) => e && Date.parse(e.date) > Date.parse(since));
}

/** A user-facing platform change: a feat(...) PR touching what visitors see. */
export function isFeature(pr) {
  if (!/^feat(\(.+\))?!?:/i.test(pr.title ?? '')) return false;
  if (/^crew[: ]|batch/i.test(pr.title) || /^crew\//.test(pr.headRefName ?? '')) return false;
  return (pr.files ?? []).some((f) => /^(src\/|static\/|docusaurus\.config\.ts$|i18n\/ur\/code\.json$)/.test(f));
}

/**
 * The day's drafts from already-filtered facts. `posted` holds every source id already in the
 * ledger, so nothing is announced twice. Feature items carry the PR title as a placeholder and
 * `needs_copy`, which `check` refuses until the worker writes the EN/UR sentence.
 */
export function buildDrafts({ date, events = [], teasers = [], prs = [], posted = new Set() }) {
  const fresh = (id) => !posted.has(id);
  const items = [...events.filter((e) => fresh(e.id)), ...teasers.filter((t) => fresh(t.id))];
  const drafts = [];
  const hl = contentHighlights(items);
  if (hl.length) {
    const shown = hl.slice(0, MAX_HIGHLIGHTS);
    const more = hl.slice(MAX_HIGHLIGHTS);
    drafts.push({
      id: `${date}-content`, kind: 'content', date, state: 'drafted',
      headline: { en: 'New on textbook.com.pk', ur: 'نیا مواد' },
      highlights: shown, more: more.length, items: hl.flatMap((h) => h.ids),
      link: shown.length === 1 ? shown[0].link : '/',
    });
  }
  const feats = prs.filter((p) => fresh(`pr:${p.number}`) && isFeature(p));
  if (feats.length) {
    drafts.push({
      id: `${date}-feature`, kind: 'feature', date, state: 'drafted',
      headline: { en: 'Platform update', ur: 'پلیٹ فارم اپ ڈیٹ' },
      highlights: feats.slice(0, MAX_HIGHLIGHTS).map((p) => ({ type: 'feature', ids: [`pr:${p.number}`], en: clean(p.title.replace(/^feat(\([^)]*\))?!?:\s*/i, '')), ur: '', link: '/', needs_copy: true, pr: p.number })),
      more: Math.max(0, feats.length - MAX_HIGHLIGHTS), items: feats.map((p) => `pr:${p.number}`), link: '/',
    });
  }
  return drafts;
}

/** Refusals for a draft; empty means it may be rendered and posted. */
export function checkDraft(d) {
  const f = [];
  const text = JSON.stringify(d);
  if (LONG_DASH.test(text)) f.push('contains a long dash');
  if (!d.highlights?.length) f.push('no highlights');
  for (const [k, v] of Object.entries(d.headline ?? {})) if ((v ?? '').length > LIMITS.headline) f.push(`headline ${k} over ${LIMITS.headline} characters`);
  if (!d.headline?.ur) f.push('no Urdu headline');
  (d.highlights ?? []).forEach((h, i) => {
    if (h.needs_copy) f.push(`highlight ${i + 1}: write the EN and UR sentence from PR #${h.pr} (social-updates skill)`);
    if (!h.ids?.length) f.push(`highlight ${i + 1}: no source id`);
    if (!h.ur) f.push(`highlight ${i + 1}: no Urdu`);
    for (const k of ['en', 'ur']) if ((h[k] ?? '').length > LIMITS.highlight) f.push(`highlight ${i + 1} ${k} over ${LIMITS.highlight} characters`);
    for (const k of ['en', 'ur']) {
      const line = h[`card_${k}`] ?? h[k] ?? '';
      if (line.length > LIMITS.card) f.push(`highlight ${i + 1} card ${k} over ${LIMITS.card} characters: add a shorter card_${k}`);
    }
    if (/certif|accredit|approved by|officially/i.test(h.en) && h.type !== 'review') f.push(`highlight ${i + 1}: certification wording without a review event`);
    if (h.link && !/^\/|^https:\/\/textbook\.com\.pk\//.test(h.link)) f.push(`highlight ${i + 1}: link outside textbook.com.pk`);
  });
  if (d.headline && d.highlights?.length && captionFor(d, 'instagram').length > LIMITS.instagram) f.push(`Instagram caption over ${LIMITS.instagram} characters`);
  return f;
}

const abs = (link) => (link?.startsWith('http') ? link : `${SITE}${link ?? '/'}`);

/** The post text for one platform: English, then Urdu, then the link and hashtags. */
export function captionFor(d, platform) {
  const more = (ur) => (d.more ? (ur ? `\n• اور ${d.more} مزید` : `\n• and ${d.more} more`) : '');
  const en = `${d.headline.en}\n${d.highlights.map((h) => `• ${h.en}`).join('\n')}${more(false)}`;
  const ur = `${d.headline.ur}\n${d.highlights.map((h) => `• ${h.ur}`).join('\n')}${more(true)}`;
  const link = platform === 'instagram' ? 'Link in bio: textbook.com.pk' : `Read free: ${abs(d.link)}`;
  return `${en}\n\n${ur}\n\n${link}\n\n${HASHTAGS}`;
}

/** Card alt text (LinkedIn and screen readers). */
export const altText = (d) => `${d.headline.en}: ${d.highlights.map((h) => h.en).join('; ')}`.slice(0, 300);

// ---------- ledger ----------

export function emptyLedger() { return { config: { pilot: true }, posts: [] }; }
export function loadLedger(path = LEDGER) { return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : emptyLedger(); }
export const postedIds = (L) => new Set(L.posts.filter((p) => p.state !== 'rejected').flatMap((p) => p.items ?? []));
export const lastRoundup = (L) => L.posts.map((p) => p.collected_at).filter(Boolean).sort().at(-1) ?? null;

/** What waits: drafts the owner must approve (features, and content during the pilot) and approved posts not yet posted everywhere. */
export function pending(L) {
  const awaitingOwner = L.posts.filter((p) => p.state === 'drafted' && (p.kind === 'feature' || L.config?.pilot) && checkDraft(p).length === 0 && p.card);
  const toPublish = L.posts.filter((p) => p.state === 'approved');
  return { awaitingOwner, toPublish };
}

/** States: drafted -> approved -> posted (or rejected). Content auto-approves after the pilot. */
export function approve(L, id, by = 'owner', now = new Date()) {
  const p = L.posts.find((x) => x.id === id);
  if (!p) throw new Error(`no post ${id}`);
  if (p.state !== 'drafted') throw new Error(`${id} is ${p.state}`);
  if (by !== 'owner' && (p.kind !== 'content' || L.config?.pilot)) throw new Error(`${id} needs the owner's approval (${p.kind === 'feature' ? 'feature post' : 'pilot'})`);
  const f = checkDraft(p);
  if (f.length) throw new Error(`${id} fails check: ${f.join('; ')}`);
  Object.assign(p, { state: 'approved', approved: { by, at: now.toISOString() } });
  return p;
}

/** Write the EN/UR line of feature highlight `n` (1-based); the draft must be re-checked and re-rendered. */
export function setCopy(L, id, n, en, ur, card = {}) {
  const p = L.posts.find((x) => x.id === id);
  if (!p) throw new Error(`no post ${id}`);
  if (p.state !== 'drafted') throw new Error(`${id} is ${p.state}`);
  const h = p.highlights[n - 1];
  if (!h) throw new Error(`${id} has no highlight ${n}`);
  if (!en?.trim() || !ur?.trim()) throw new Error('both --en and --ur are needed');
  Object.assign(h, { en: clean(en), ur: clean(ur), needs_copy: false });
  for (const k of ['en', 'ur']) if (card[k]?.trim()) h[`card_${k}`] = clean(card[k]);
  delete p.card; delete p.card_url;
  return h;
}

export function reject(L, id, note, now = new Date()) {
  const p = L.posts.find((x) => x.id === id);
  if (!p) throw new Error(`no post ${id}`);
  if (p.state === 'posted') throw new Error(`${id} is already posted`);
  Object.assign(p, { state: 'rejected', rejected: { note, at: now.toISOString() } });
  return p;
}

// ---------- I/O (collect, render, publish) ----------

function deployedSha() {
  const log = join(homedir(), 'deploy', 'deploy.log');
  if (!existsSync(log)) return null;
  const m = [...readFileSync(log, 'utf8').matchAll(/deployed ([0-9a-f]{40}) OK/g)].at(-1);
  return m?.[1] ?? null;
}

const isAncestor = (sha, head) => {
  try { execFileSync('git', ['-C', ROOT, 'merge-base', '--is-ancestor', sha, head], { stdio: 'ignore' }); return true; } catch { return false; }
};

async function collect({ since, date }) {
  const feed = await (await fetch(`${SITE}/news-feed.json`)).json();
  const events = (feed.events ?? []).filter((e) => e.date > since);
  const teaserLedger = JSON.parse(readFileSync(join(ROOT, 'specs/studio/teasers/media-teasers.json'), 'utf8'));
  const teasers = teaserLedger.items.filter((i) => i.state === 'public' && i.published_at > since).map((i) => {
    const s = JSON.parse(readFileSync(join(ROOT, 'specs/studio/teasers', `${i.id}.json`), 'utf8'));
    return { id: `teaser:${i.key}`, type: 'teaser', date: i.published_at, course_code: s.course_code ?? 'Licence', permalink: `https://youtube.com/shorts/${i.youtube_id}` };
  });
  events.push(...animationEvents(ROOT, since));
  const head = deployedSha();
  execFileSync('git', ['-C', ROOT, 'fetch', '-q', 'origin', 'main'], { stdio: 'ignore' });
  const raw = JSON.parse(execFileSync('gh', ['pr', 'list', '--state', 'merged', '--base', 'main', '--search', `merged:>=${since.slice(0, 10)}`,
    '--limit', '100', '--json', 'number,title,headRefName,mergedAt,mergeCommit,files'], { cwd: ROOT, encoding: 'utf8' }));
  const prs = raw.filter((p) => p.mergedAt > since && head && p.mergeCommit?.oid && isAncestor(p.mergeCommit.oid, head))
    .map((p) => ({ ...p, files: (p.files ?? []).map((f) => f.path) }));
  return { events, teasers, prs, date };
}

const pkDate = (d = new Date()) => new Date(d.getTime() + 5 * 3600_000).toISOString().slice(0, 10);

async function main(argv) {
  const [cmd, id, ...rest] = argv;
  const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined; };
  const out = (o) => console.log(JSON.stringify(o, null, 1));
  if (cmd === 'collect') {
    const L0 = loadLedger();
    const since = opt('--since') ?? lastRoundup(L0) ?? new Date(Date.now() - 86_400_000).toISOString();
    const facts = await collect({ since, date: opt('--date') ?? pkDate() });
    if (argv.includes('--dry')) {
      const drafts = buildDrafts({ ...facts, posted: postedIds(L0) });
      out({ since, drafts: drafts.map((d) => ({ id: d.id, kind: d.kind, highlights: d.highlights.length })) });
      return;
    }
    const now = new Date().toISOString();
    const made = update(LEDGER, (L) => {
      L.config ??= { pilot: true }; L.posts ??= [];
      const drafts = buildDrafts({ ...facts, posted: postedIds(L) });
      for (const d of drafts) {
        if (L.posts.some((p) => p.id === d.id)) { d.id = `${d.id}-${L.posts.filter((p) => p.id.startsWith(d.id)).length + 1}`; }
        L.posts.push({ ...d, collected_at: now, since });
      }
      return drafts.map((d) => ({ id: d.id, kind: d.kind, highlights: d.highlights.length, findings: checkDraft(d) }));
    }, emptyLedger());
    out(made.length ? made : 'nothing new since ' + since);
    return;
  }
  if (cmd === 'snapshot') { mkdirSync(dirname(SNAPSHOT), { recursive: true }); writeFileSync(SNAPSHOT, `${JSON.stringify(loadLedger(), null, 1)}\n`); out(`wrote ${SNAPSHOT.replace(ROOT + '/', '')}`); return; }
  if (cmd === 'show') { const L = loadLedger(); out(id ? L.posts.find((p) => p.id === id) : L.posts.map((p) => ({ id: p.id, kind: p.kind, state: p.state }))); return; }
  if (cmd === 'check') { const p = loadLedger().posts.find((x) => x.id === id); if (!p) throw new Error(`no post ${id}`); const f = checkDraft(p); out(f.length ? f : 'pass'); process.exit(f.length ? 1 : 0); }
  if (cmd === 'approve') { out(update(LEDGER, (L) => approve(L, id, opt('--by') ?? 'owner'))); return; }
  if (cmd === 'copy') { out(update(LEDGER, (L) => setCopy(L, id, Number(rest[0]), opt('--en'), opt('--ur'), { en: opt('--card-en'), ur: opt('--card-ur') }))); return; }
  if (cmd === 'reject') { out(update(LEDGER, (L) => reject(L, id, rest.filter((a) => !a.startsWith('--')).join(' ')))); return; }
  if (cmd === 'render') {
    const { renderCard } = await import('./card.mjs');
    const p = loadLedger().posts.find((x) => x.id === id);
    if (!p) throw new Error(`no post ${id}`);
    const f = checkDraft(p); if (f.length) throw new Error(`fails check: ${f.join('; ')}`);
    const dir = join(homedir(), 'studio-media', 'social'); mkdirSync(dir, { recursive: true });
    const file = join(dir, `${p.id}.jpg`);
    await renderCard(p, file);
    // Uploaded now, so the owner can open the card from the board or the digest before approving.
    const { uploadCard } = await import('./publish.mjs');
    const url = await uploadCard(file, p.id);
    out(update(LEDGER, (L) => { const q = L.posts.find((x) => x.id === id); q.card = file.replace(homedir(), '~'); q.card_url = url; return { id, card: q.card, card_url: url }; }));
    return;
  }
  if (cmd === 'publish') {
    const { publishPost } = await import('./publish.mjs');
    const platforms = (opt('--platforms') ?? PLATFORMS.join(',')).split(',');
    out(await publishPost(id, platforms));
    return;
  }
  console.error('commands: collect [--since iso] [--date d] [--dry] | show [id] | copy id n --en t --ur t | check id | render id | approve id [--by owner|auto] | reject id note | publish id [--platforms a,b] | snapshot');
  process.exit(2);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => { console.error(e.message); process.exit(1); });
}
