#!/usr/bin/env node
// Metadata pack for a content pack (Feature 038, spec FR-003, FR-010, FR-011).
//
//   node scripts/media/pack/metadata.mjs draft <course> <unit> <topic> [--words long.en.words.json]
//   node scripts/media/pack/metadata.mjs check <metadata.json>
//   node scripts/media/pack/metadata.mjs youtube <metadata.json> --kind longform|short [--short short-01]
//
// draft builds specs/studio/packs/<course>/unit-NN/topic-NN/metadata.json from topic.json, the script's
// `## ` blocks (chapters, timed against the transcript when --words is given) and approved Shorts in
// highlights.json. Titles and captions come from the script's front matter, which Claude writes in the
// script stage; draft never invents them. check enforces the rules below; youtube prints the
// youtube-uploader payloads (always private, synthetic-media flag on). Do not import from any gate.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, specDir, parseTopic } from './paths.mjs';
import { locate } from './highlights.mjs';
import { SITE, SUBSCRIBE_URL, playlistFor } from '../brand.mjs';

export const DISCLOSURE = 'Created with AI-assisted tools; written and reviewed by textbook.com.pk teacher-education faculty.';
const LONG_DASH = /[\u2014\u2015\u2E3A\u2E3B]/;
const PLATFORMS = ['youtube', 'instagram', 'tiktok', 'facebook', 'linkedin'];

export const ts = (sec) => { const s = Math.max(0, Math.floor(sec)); const h = Math.floor(s / 3600); const mm = String(Math.floor(s / 60) % 60).padStart(2, '0'); const ss = String(s % 60).padStart(2, '0'); return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`; };
export const tsSeconds = (t) => t.split(':').map(Number).reduce((a, v) => a * 60 + v, 0);

/** Front matter of script.md as an object (YAML subset: strings, string lists, nested `platform_captions`). */
export function scriptFrontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {}; let key = null; let sub = null;
  for (const line of m[1].split('\n')) {
    let x;
    if ((x = line.match(/^ {2}- (.*)$/)) && key) { (out[key] ??= []).push(x[1].replace(/^"(.*)"$/, '$1')); continue; }
    if ((x = line.match(/^ {2}([a-z_]+):\s*(.+)$/)) && sub) { out[sub][x[1]] = x[2].replace(/^"(.*)"$/, '$1'); continue; }
    if ((x = line.match(/^([a-z_]+):\s*(.*)$/))) {
      const v = x[2].trim();
      if (v === '') { key = x[1]; sub = x[1] === 'platform_captions' ? x[1] : null; if (sub) out[sub] = {}; else out[key] = []; }
      else { out[x[1]] = v.replace(/^"(.*)"$/, '$1'); key = null; sub = null; }
    }
  }
  return out;
}

/** Chapters from the script's `## ` blocks, timed by their opening words in the transcript. */
export function chaptersFrom(scriptMd, words = null) {
  const body = scriptMd.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const blocks = [...body.matchAll(/^## (.+)\n+([\s\S]*?)(?=^## |(?![\s\S]))/gm)].map((m) => {
    const opening = m[2].split('\n').find((l) => l.trim() && !/^(\[|#|>|\||!)/.test(l.trim())) ?? '';
    return { title: m[1].replace(/\[SHORT-CANDIDATE\].*$/, '').trim(), opening: opening.replace(/^[A-Z][A-Za-z]+:\s*/, '').trim() };
  });
  return blocks.map((b, i) => {
    const t = i === 0 ? 0 : words ? locate(words, b.opening) : null;
    return { t: t === null ? null : ts(t), title: b.title };
  });
}

export function buildDescription(meta) {
  const lines = [meta.summary, '', `Free notes, slide deck and mind map: ${meta.lesson_url}`, ''];
  if (meta.chapters?.every((c) => c.t)) lines.push('Chapters', ...meta.chapters.map((c) => `${c.t} ${c.title}`), '');
  if (meta.sources?.length) lines.push('Sources', ...meta.sources.map((s) => `- ${s}`), '');
  lines.push(`Subscribe: ${SUBSCRIBE_URL}`, '', DISCLOSURE);
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Every rule a metadata pack must meet before upload. Empty array = pass. */
export function checkMetadata(meta) {
  const p = [];
  const text = JSON.stringify(meta);
  if (LONG_DASH.test(text)) p.push('contains a long dash (use a spaced hyphen)');
  if (!Array.isArray(meta.titles) || meta.titles.length !== 3) p.push('needs exactly 3 title options');
  for (const t of meta.titles ?? []) {
    if (t.length > 60) p.push(`title over 60 characters: "${t}"`);
    if ((t.match(/\b[A-Z]{4,}\b/g) ?? []).some((w) => !/^(BED|MED|PGCE|SLO|CLO|ESL|EFL|STEM)$/.test(w))) p.push(`title shouts in capitals: "${t}"`);
  }
  if (!meta.summary || meta.summary.length < 40) p.push('summary missing or under 40 characters');
  if (!/^https:\/\/textbook\.com\.pk\//.test(meta.lesson_url ?? '')) p.push('lesson_url must be a textbook.com.pk page');
  const ch = meta.chapters ?? [];
  if (ch.length < 3) p.push('YouTube chapters need at least 3 entries');
  if (ch[0] && ch[0].t !== '00:00') p.push('first chapter must start at 00:00');
  if (ch.some((c) => !c.t)) p.push('a chapter has no time yet (time it against the transcript)');
  for (let i = 1; i < ch.length; i++) if (ch[i].t && ch[i - 1].t && tsSeconds(ch[i].t) - tsSeconds(ch[i - 1].t) < 10) p.push(`chapters ${i} and ${i + 1} are under 10 s apart`);
  if (!meta.sources?.length) p.push('sources list is empty (every claim must trace to the topic page or a source)');
  if (meta.disclosure !== DISCLOSURE) p.push('disclosure line is missing or changed');
  const tags = meta.tags ?? [];
  if (tags.join(',').length > 480) p.push('tags exceed YouTube\'s 500-character limit');
  if ((meta.thumbnail_text ?? []).some((t) => t.split(/\s+/).length > 4)) p.push('thumbnail text over 4 words');
  for (const k of PLATFORMS) if (!meta.platform_captions?.[k]) p.push(`platform caption missing: ${k}`);
  const desc = buildDescription(meta);
  if (Buffer.byteLength(desc) > 5000) p.push('description over 5000 bytes');
  for (const s of meta.shorts ?? []) {
    if (!s.hook) p.push(`${s.id}: hook missing`);
    if (!(s.end > s.start) || s.end - s.start > 60) p.push(`${s.id}: must be under 60 s`);
  }
  return p;
}

export function draft(course, unit, topic, { words = null, root = ROOT } = {}) {
  const dir = specDir(course, unit, topic, root);
  const t = JSON.parse(readFileSync(join(dir, 'topic.json'), 'utf8'));
  const scriptPath = join(dir, 'script.md');
  const script = existsSync(scriptPath) ? readFileSync(scriptPath, 'utf8') : '';
  const fm = scriptFrontMatter(script);
  const hl = existsSync(join(dir, 'highlights.json')) ? JSON.parse(readFileSync(join(dir, 'highlights.json'), 'utf8')).candidates : [];
  let route = null;
  try { route = JSON.parse(readFileSync(join(root, 'static', 'content-index.json'), 'utf8')).find((e) => e.course_code?.toLowerCase() === course && e.unit_no === unit && e.topic_no === topic && e.kind === 'topic')?.permalink ?? null; } catch { /* built at build time */ }
  return {
    course, unit, topic,
    titles: fm.titles ?? [],
    summary: fm.summary ?? t.description,
    lesson_url: route ? `${SITE}${route}` : null,
    chapters: script ? chaptersFrom(script, words) : [],
    tags: fm.tags ?? [],
    thumbnail_text: fm.thumbnail_text ?? [],
    pinned_comment: fm.pinned_comment ?? '',
    platform_captions: fm.platform_captions ?? {},
    sources: t.sources,
    disclosure: DISCLOSURE,
    subtitles: [{ locale: 'en', status: 'draft' }],
    audio_tracks: ['en'],
    shorts: hl.filter((h) => h.approved).map((h) => ({ id: h.id, hook: h.hook, start: h.start, end: h.end, related_video: null })),
  };
}

/** youtube-uploader payloads; uploads are always private first (owner gate, FR-016). */
export function youtubeArgs(meta, { kind = 'longform', shortId = null } = {}) {
  const tags = ['teacher education', 'B.Ed', 'teaching', ...meta.tags].slice(0, 15);
  if (kind === 'short') {
    const s = meta.shorts.find((x) => x.id === shortId);
    if (!s) throw new Error(`no approved short ${shortId}`);
    return {
      upload_video: { title: s.hook.slice(0, 95), description: [s.hook, '', meta.related_line ?? 'Full lesson linked above.', meta.lesson_url, '', DISCLOSURE].join('\n'), tags, category_id: '27', default_language: 'en', privacy_status: 'private', made_for_kids: false },
      update_video: { contains_synthetic_media: true, playlist_id: playlistFor('video.short', meta.course, 'en') ?? undefined },
      related_video: s.related_video,
    };
  }
  return {
    upload_video: { title: meta.titles[0], description: buildDescription(meta), tags, category_id: '27', default_language: 'en', privacy_status: 'private', made_for_kids: false },
    update_video: { contains_synthetic_media: true, playlist_id: playlistFor('video.longform', meta.course, 'en') ?? undefined },
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, ...a] = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  try {
    if (cmd === 'draft') {
      const wordsFile = opt('--words');
      const { course, unit, topic } = parseTopic(a);
      const words = wordsFile ? JSON.parse(readFileSync(resolve(wordsFile), 'utf8')).words : null;
      const meta = draft(course, unit, topic, { words });
      const out = join(specDir(course, unit, topic), 'metadata.json');
      writeFileSync(out, `${JSON.stringify(meta, null, 2)}\n`);
      const p = checkMetadata(meta);
      console.log(`wrote ${relative(ROOT, out)}${p.length ? `; still to do:\n- ${p.join('\n- ')}` : '; all checks pass'}`);
    } else if (cmd === 'check') {
      const p = checkMetadata(JSON.parse(readFileSync(resolve(a[0]), 'utf8')));
      if (p.length) { console.error(`metadata: ${p.length} problem(s)\n- ${p.join('\n- ')}`); process.exit(1); }
      console.log('metadata: all checks pass');
    } else if (cmd === 'youtube') {
      const kind = opt('--kind') ?? 'longform'; const shortId = opt('--short');
      const meta = JSON.parse(readFileSync(resolve(a[0]), 'utf8'));
      const p = checkMetadata(meta);
      if (p.length) { console.error(`refused: fix metadata first\n- ${p.join('\n- ')}`); process.exit(1); }
      console.log(JSON.stringify(youtubeArgs(meta, { kind, shortId }), null, 1));
    } else { console.error('usage: metadata.mjs draft <course> <unit> <topic> [--words f] | check <metadata.json> | youtube <metadata.json> --kind longform|short [--short id]'); process.exit(2); }
  } catch (e) { console.error(`metadata: ${e.message}`); process.exit(1); }
}
