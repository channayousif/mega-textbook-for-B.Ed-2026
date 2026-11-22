#!/usr/bin/env node
// Feature 031 "Social Updates": a daily roundup of deployed work as branded image posts
// (owner, 2026-11-22). Two buckets per day:
//   content  new units, Urdu, courses, illustrations, revisions, reviews, public teasers: posts
//            automatically once `check` passes (after the pilot);
//   feature  user-facing feat(...) PRs: waits for the owner's `crew post <id>`.
// Only deployed work counts: content comes from the LIVE news feed (a merged PR whose main CI passed
// and that the deploy gate published), features from PRs whose merge commit the deploy log shows live.
//
//   node scripts/social/updates.mjs collect [--since <iso>] [--date YYYY-MM-DD]
//   node scripts/social/updates.mjs check <id>
//   node scripts/social/updates.mjs render <id>
//   node scripts/social/updates.mjs approve <id> [--by owner|auto]
//   node scripts/social/updates.mjs reject <id> <note>
//   node scripts/social/updates.mjs publish <id> [--platforms facebook,instagram,linkedin]
//   node scripts/social/updates.mjs show [<id>]
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
export const LEDGER = join(ROOT, 'specs', 'social', 'updates.json');
export const PLATFORMS = ['facebook', 'instagram', 'linkedin'];
export const MAX_HIGHLIGHTS = 5;
export const LIMITS = { headline: 60, highlight: 90 };
export const HASHTAGS = '#BEd #TeacherEducation #textbookcompk #اردو';
const BURST_DAYS = 7;

/** Order highlights by what readers care about most. Provisional is not announced socially. */
const PRIORITY = ['course', 'unit', 'urdu', 'teaser', 'figures', 'updated', 'review'];

// ---------- copy (pure) ----------

const unitLabel = (e) => `${e.course_code} Unit ${e.unit_no}`;
const unitLabelUr = (e) => `${e.course_code} یونٹ ${e.unit_no}`;

/** One highlight for a group of same-kind items of one course (or one item). Deterministic copy. */
export function highlight(type, items) {
  const n = items.length;
  const e = items[0];
  const ids = items.map((i) => i.id);
  const link = n === 1 && e.permalink ? e.permalink : (e.permalink ?? '/').replace(/\/unit-\d+\/?$/, '/');
  const h = (en, ur) => ({ type, ids, en: clean(en), ur: clean(ur), link });
  switch (type) {
    case 'course': return h(`New course: ${e.title_en}`, `نیا کورس: ${e.title_ur || e.title_en}`);
    case 'unit': return n > 1 ? h(`${e.course_code}: ${n} new units`, `${e.course_code}: ${n} نئے یونٹ`)
      : h(`${unitLabel(e)}: ${e.title_en}`, `${unitLabelUr(e)}: ${e.title_ur || e.title_en}`);
    case 'urdu': return n > 1 ? h(`${e.course_code}: ${n} units now in Urdu`, `${e.course_code}: ${n} یونٹ اب اردو میں`)
      : h(`${unitLabel(e)} now in Urdu`, `${unitLabelUr(e)} اب اردو میں`);
    case 'figures': {
      const c = items.reduce((t, i) => t + (i.count ?? 1), 0);
      return h(`${e.course_code}: ${c} new illustrations and figures`, `${e.course_code}: ${c} نئی تصاویر اور خاکے`);
    }
    case 'updated': return n > 1 ? h(`${e.course_code}: ${n} units revised`, `${e.course_code}: ${n} یونٹ بہتر کیے گئے`)
      : h(`${unitLabel(e)} revised: ${e.title_en}`, `${unitLabelUr(e)} بہتر کیا گیا: ${e.title_ur || e.title_en}`);
    case 'review': return n > 1 ? h(`${e.course_code}: ${n} units reviewed`, `${e.course_code}: ${n} یونٹوں کی نظرثانی مکمل`)
      : h(`${unitLabel(e)}: review completed`, `${unitLabelUr(e)}: نظرثانی مکمل`);
    case 'teaser': return n > 1 ? h(`${n} new 30-second course teasers on YouTube`, `یوٹیوب پر ${n} نئے کورس تعارفی ویڈیو`)
      : h(`${e.course_code}: 30-second course teaser on YouTube`, `${e.course_code}: یوٹیوب پر 30 سیکنڈ کا تعارفی ویڈیو`);
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
    if (/certif|accredit|approved by|officially/i.test(h.en) && h.type !== 'review') f.push(`highlight ${i + 1}: certification wording without a review event`);
    if (h.link && !/^\/|^https:\/\/textbook\.com\.pk\//.test(h.link)) f.push(`highlight ${i + 1}: link outside textbook.com.pk`);
  });
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
  if (cmd === 'show') { const L = loadLedger(); out(id ? L.posts.find((p) => p.id === id) : L.posts.map((p) => ({ id: p.id, kind: p.kind, state: p.state }))); return; }
  if (cmd === 'check') { const p = loadLedger().posts.find((x) => x.id === id); if (!p) throw new Error(`no post ${id}`); const f = checkDraft(p); out(f.length ? f : 'pass'); process.exit(f.length ? 1 : 0); }
  if (cmd === 'approve') { out(update(LEDGER, (L) => approve(L, id, opt('--by') ?? 'owner'))); return; }
  if (cmd === 'reject') { out(update(LEDGER, (L) => reject(L, id, rest.filter((a) => !a.startsWith('--')).join(' ')))); return; }
  if (cmd === 'render') {
    const { renderCard } = await import('./card.mjs');
    const p = loadLedger().posts.find((x) => x.id === id);
    if (!p) throw new Error(`no post ${id}`);
    const f = checkDraft(p); if (f.length) throw new Error(`fails check: ${f.join('; ')}`);
    const dir = join(homedir(), 'studio-media', 'social'); mkdirSync(dir, { recursive: true });
    const file = join(dir, `${p.id}.jpg`);
    await renderCard(p, file);
    out(update(LEDGER, (L) => { const q = L.posts.find((x) => x.id === id); q.card = file.replace(homedir(), '~'); return { id, card: q.card }; }));
    return;
  }
  if (cmd === 'publish') {
    const { publishPost } = await import('./publish.mjs');
    const platforms = (opt('--platforms') ?? PLATFORMS.join(',')).split(',');
    out(await publishPost(id, platforms));
    return;
  }
  console.error('commands: collect [--since iso] [--date d] | show [id] | check id | render id | approve id [--by owner|auto] | reject id note | publish id [--platforms a,b]');
  process.exit(2);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => { console.error(e.message); process.exit(1); });
}
