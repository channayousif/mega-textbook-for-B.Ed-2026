// Feature 029: shared "More about the course" description blocks for every Study Studio upload
// (owner, 2026-11-17). Used by teaser.mjs (course teaser Shorts) and youtube-meta.mjs (unit audio
// and video), so each future upload carries the same sections.
//
// Facts come only from the repository: the course overview (summary, learning outcomes), each
// unit's index frontmatter in the upload's locale (title, description, route), and the media
// ledgers (published videos). The persuasive "why study" lines are fixed templates that are true
// for every course. YouTube limits a description to 5,000 bytes (Urdu letters take two), so
// `fitDescription` drops the least important detail first.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allLedgers } from './media-ledger.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://textbook.com.pk';
export const DESCRIPTION_BYTES = 4900;
/** textbook.com.pk profiles (owner, 2026-11-18); every description ends its More-about block with them. */
export const SOCIAL = [
  ['YouTube', 'https://www.youtube.com/@textbookdotcomdotpk'],
  ['TikTok', 'https://www.tiktok.com/@textbook.com.pk'],
  ['Instagram', 'https://www.instagram.com/textbook.com.pk/'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=61596368444198'],
  ['LinkedIn', 'https://www.linkedin.com/company/textbook-com-pk'],
];
const clean = (s) => String(s ?? '').replace(/[\u2014\u2015\u2E3A\u2E3B]/g, ' - ').replace(/[<>]/g, '').replace(/[ \t]+/g, ' ').trim();
const pad = (n) => String(n).padStart(2, '0');

export function courseSemester(course, root = ROOT) {
  const docs = join(root, 'docs');
  const hit = readdirSync(docs).find((d) => /^semester-\d+$/.test(d) && existsSync(join(docs, d, course)));
  if (!hit) throw new Error(`no docs/semester-N/${course}`);
  return Number(hit.split('-')[1]);
}

/** title and description from an MDX frontmatter block (quoted or bare values). */
export function frontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split('\n')) {
    const kv = /^(title|description):\s*(.*)$/.exec(line);
    if (kv) out[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1').replace(/\\"/g, '"');
  }
  return out;
}

/** Summary paragraph and numbered learning outcomes of a course-overview.mdx. */
export function parseOverview(text) {
  const body = text.replace(/^---[\s\S]*?\n---\n/, '');
  const afterH1 = body.split(/(?:^|\n)# [^\n]*\n/)[1] ?? body;
  const summary = clean((afterH1.trim().split(/\n\s*\n/)[0] ?? '').replace(/\n/g, ' '));
  const sec = /## Course learning outcomes\n([\s\S]*?)(?:\n## |$)/.exec(body);
  const outcomes = sec ? [...sec[1].matchAll(/^\d+\.\s+(.+)$/gm)].map((x) => clean(x[1])) : [];
  return { summary, outcomes };
}

function unitDir(course, semester, locale, root) {
  if (locale === 'en') return join(root, 'docs', `semester-${semester}`, course);
  const base = join(root, 'i18n', 'ur');
  const plugin = existsSync(base) ? readdirSync(base).find((d) => d.startsWith('docusaurus-plugin-content-docs') && existsSync(join(base, d, 'current', `semester-${semester}`, course))) : null;
  return plugin ? join(base, plugin, 'current', `semester-${semester}`, course) : null;
}

/**
 * Everything the "More about" block needs for one course and locale. `overrides` carries the Urdu
 * course summary and objectives from a teaser script when the Urdu overview is not translated.
 */
export function courseFacts(course, locale, { overrides = {}, root = ROOT } = {}) {
  const semester = courseSemester(course, root);
  const ov = parseOverview(readFileSync(join(root, 'docs', `semester-${semester}`, course, 'course-overview.mdx'), 'utf8'));
  const ur = locale === 'ur';
  const prefix = `${SITE}${ur ? '/ur' : ''}/semester-${semester}/${course}`;
  const dir = unitDir(course, semester, locale, root);
  const units = [];
  for (let n = 1; n <= 20; n++) {
    const f = dir && join(dir, `unit-${pad(n)}`, 'index.mdx');
    const en = join(root, 'docs', `semester-${semester}`, course, `unit-${pad(n)}`, 'index.mdx');
    if (!existsSync(en)) continue;
    const fm = frontmatter(readFileSync(f && existsSync(f) ? f : en, 'utf8'));
    units.push({ n, title: clean(fm.title), description: clean(fm.description), url: `${prefix}/unit-${pad(n)}/` });
  }
  return {
    course, code: course.toUpperCase(), semester, locale,
    url: `${prefix}/course-overview/`,
    summary: ur ? clean(overrides.course_summary) || null : ov.summary,
    objectives: ur ? (overrides.objectives ?? []).map(clean) : ov.outcomes,
    outcome_count: ov.outcomes.length,
    units,
  };
}

const PUBLISHED = new Set(['public', 'placed']);
function teaserTitle(i, root) {
  const f = join(root, 'specs', 'studio', 'teasers', `${i.id}.json`);
  const t = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).locales?.[i.locale]?.youtube_title : null;
  return clean(t ?? `${String(i.id).toUpperCase()} #Shorts`);
}
/** Published videos to link: same course and locale first (video before audio), then other teasers. */
export function videoLinks(course, locale, { exclude = [], skipTeaserOf = null, teasers = true, max = 6, root = ROOT, ledgers } = {}) {
  const all = ledgers ?? allLedgers(root);
  const rows = [];
  for (const L of all) {
    for (const i of L.items ?? []) {
      if (!i.youtube_id || !PUBLISHED.has(i.state) || i.locale !== locale || exclude.includes(i.youtube_id)) continue;
      const isTeaser = !L.course;
      if (isTeaser && skipTeaserOf && i.id === skipTeaserOf) continue; // a teaser never links to itself
      if (isTeaser && !teasers) continue; // unit videos link the teaser playlist instead (stable when a teaser is replaced)
      const sameCourse = isTeaser ? i.id === course : L.course === course;
      const rank = (sameCourse ? 0 : 10) + (isTeaser ? 2 : i.kind === 'video' ? 0 : 1);
      const title = isTeaser ? teaserTitle(i, root) : clean(i.title);
      rows.push({ rank, title, url: `https://youtu.be/${i.youtube_id}` });
    }
  }
  return rows.sort((a, b) => a.rank - b.rank).slice(0, max);
}

const T = {
  ur: {
    more: '📘 کورس کے بارے میں مزید', lessonMore: '📘 اس یونٹ کے بارے میں',
    objectives: '🎯 یہ کورس پڑھ کر آپ:', units: (n) => `📚 ${n} یونٹ، ہر ایک مفت:`, unit: (n) => `یونٹ ${n}`,
    why: '✅ یہ کورس کیوں پڑھیں؟',
    whyLines: ['پورا کورس مفت، اردو اور انگریزی دونوں میں', 'ہر یونٹ میں 25 سوالات اور جوابات کی رہنمائی: امتحان کی تیاری آسان', 'پاکستانی کلاس روم کی مثالیں، تاکہ پڑھا ہوا کلاس میں کام آئے', 'موبائل پر پڑھیں، جب اور جہاں چاہیں'],
    videos: '▶️ مزید ویڈیوز:', playlist: 'کورس ٹیزرز کی پلے لسٹ', follow: '📲 ہمیں فالو کریں:',
  },
  en: {
    more: '📘 More about the course', lessonMore: '📘 About this unit',
    objectives: '🎯 After this course you will:', units: (n) => `📚 ${n} units, each free:`, unit: (n) => `Unit ${n}`,
    why: '✅ Why study it here?',
    whyLines: ['The whole course is free, in English and Urdu', 'Every unit has 25 questions with marking guidance: exam preparation made easy', 'Pakistani classroom examples, so what you read works in class', 'Read on your phone, whenever and wherever you like'],
    videos: '▶️ More videos:', playlist: 'Course teasers playlist', follow: '📲 Follow textbook.com.pk:',
  },
};

/**
 * The "More about" sections as text, at a detail level: 0 = everything, 1 = no unit descriptions,
 * 2 = at most 3 videos, 3 = unit titles without links.
 */
export function moreAbout(facts, { videos = [], playlistUrl = null, lesson = null, level = 0 } = {}) {
  const t = T[facts.locale] ?? T.en;
  const out = [];
  if (lesson) out.push(`${t.lessonMore}\n${lesson}`);
  if (facts.summary) out.push(`${t.more}\n${facts.summary}`);
  if (facts.objectives?.length) out.push(`${t.objectives}\n${facts.objectives.map((o) => `- ${o}`).join('\n')}`);
  if (facts.units.length) {
    out.push(`${t.units(facts.units.length)}\n${facts.units.map((u) => {
      const head = `${t.unit(u.n)}: ${u.title}`;
      const link = level >= 3 ? '' : ` | ${u.url}`;
      const desc = level >= 1 || !u.description ? '' : `\n${u.description}`;
      return `${head}${link}${desc}`;
    }).join('\n')}`);
  }
  out.push(`${t.why}\n${t.whyLines.map((l) => `- ${l}`).join('\n')}`);
  const vids = level >= 2 ? videos.slice(0, 3) : videos;
  if (vids.length || playlistUrl) out.push(`${t.videos}\n${[...vids.map((v) => `${v.title} | ${v.url}`), ...(playlistUrl ? [`${t.playlist} | ${playlistUrl}`] : [])].join('\n')}`);
  out.push(`${t.follow}\n${SOCIAL.map(([n, u]) => `${n} | ${u}`).join('\n')}`);
  return out.join('\n\n');
}

/**
 * Build `head + moreAbout + tail`, lowering detail until it fits YouTube's byte limit. `make(level)`
 * returns the whole description for a detail level.
 */
export function fitDescription(make, limit = DESCRIPTION_BYTES) {
  for (let level = 0; level <= 3; level++) {
    const d = make(level);
    if (Buffer.byteLength(d) <= limit) return { description: d, level };
  }
  throw new Error(`description over ${limit} bytes even at the lowest detail`);
}
