#!/usr/bin/env node
// Feature 029 studio-media stage 6: the YouTube metadata for one ledger item, passed verbatim to
// the youtube-uploader MCP `upload_video` / `update_video` tools.
//
//   node scripts/notebook-studio/youtube-meta.mjs <course> <unit> <key> [--playlist <id>]
//
// Rules: title <= 100 chars, description <= 5000 bytes, no '<' or '>' (YouTube rejects them),
// no long dash, link to the verified lesson route on textbook.com.pk (from static/content-index.json,
// never a home-page fallback), AI disclosure line, category 27 (Education), not made for kids,
// contains_synthetic_media true (NotebookLM voices are synthetic).
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLedger } from './media-ledger.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = 'https://textbook.com.pk';
const LONG_DASH = /[\u2014\u2015\u2E3A\u2E3B]/g;

/** Pure lookup over a content index (static/content-index.json is generated at build time). */
export function routeFromIndex(idx, course, unit, topic) {
  const hit = idx.find((e) => e.course_code?.toLowerCase() === course && e.unit_no === unit && e.topic_no === topic && e.kind === 'topic' && !e.coming_soon);
  if (!hit?.permalink) throw new Error(`no published route for ${course} ${unit}.${topic} in static/content-index.json`);
  return hit.permalink;
}

export function lessonRoute(course, unit, topic, root = ROOT) {
  return routeFromIndex(JSON.parse(readFileSync(join(root, 'static', 'content-index.json'), 'utf8')), course, unit, topic);
}

const clean = (s) => String(s).replace(LONG_DASH, ' - ').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();

export function buildMeta(item, { course, unit, route, topicTitle, playlistId }) {
  const ur = item.locale === 'ur';
  const code = course.toUpperCase();
  const what = item.kind === 'video' ? (ur ? 'ویڈیو جائزہ' : 'Video overview') : item.part > 1 ? (ur ? `مزید تفصیل، حصہ ${item.part}` : `Go deeper, part ${item.part}`) : (ur ? 'آڈیو بریف' : 'Audio brief');
  let title = clean(`${item.title} | ${code} ${unit}.${item.topic} ${what}`);
  if (title.length > 100) title = `${title.slice(0, 99).replace(/\s+\S*$/, '')}…`;
  const url = `${SITE}${ur ? '/ur' : ''}${route}`;
  const description = clean(ur
    ? `${topicTitle ?? item.title}: بی ایڈ کورس ${code}، یونٹ ${unit}، موضوع ${unit}.${item.topic} کا ${what}۔`
    : `${what} for ${code}, Unit ${unit}, Topic ${unit}.${item.topic}: ${topicTitle ?? item.title}.`)
    + '\n\n' + (ur ? `مکمل سبق پڑھیں: ${url}` : `Read the full lesson: ${url}`)
    + '\n\n' + (ur
      ? 'یہ مواد Gemini Notebook نے صرف اسی درسی متن سے بنایا ہے اور آوازیں AI کی ہیں۔ اشاعت سے پہلے اسے متن سے ملا کر جانچا گیا۔'
      : 'Made with Gemini Notebook from this textbook text only; the voices are AI-generated. Checked against the text before publication.')
    + '\n\n#BEd #TeacherEducation #textbookcompk';
  if (Buffer.byteLength(description) > 5000) throw new Error('description over 5000 bytes');
  return {
    upload_video: {
      title, description,
      tags: ['B.Ed', 'teacher education', code, 'textbook.com.pk', ur ? 'Urdu' : 'English'],
      category_id: '27', default_language: item.locale, privacy_status: 'private', made_for_kids: false,
    },
    update_video: { ...(playlistId ? { playlist_id: playlistId } : {}), thumbnail_file: item.thumbnail_file, contains_synthetic_media: true },
    lesson_url: url,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const pi = a.indexOf('--playlist');
  const playlistId = pi >= 0 ? a.splice(pi, 2)[1] : undefined;
  const [course, unitArg, key] = a;
  const unit = Number(unitArg);
  try {
    const item = loadLedger(course, unit).items.find((i) => i.key === key);
    if (!item) throw new Error(`no item ${key}`);
    const route = lessonRoute(course, unit, item.topic);
    const topicTitle = JSON.parse(readFileSync(join(ROOT, 'static', 'content-index.json'), 'utf8'))
      .find((e) => e.permalink === route)?.title?.replace(/^Topic [\d.]+ - /, '');
    console.log(JSON.stringify(buildMeta(item, { course, unit, route, topicTitle: item.locale === 'en' ? topicTitle : undefined, playlistId }), null, 1));
  } catch (e) { console.error(`youtube-meta: ${e.message}`); process.exit(1); }
}
