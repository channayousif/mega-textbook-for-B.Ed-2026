#!/usr/bin/env node
// Put a content pack on its topic page (Feature 038, ADR-0040 point 1).
//
//   node scripts/media/pack/embed.mjs <course> <unit> <topic> --links links.json [--notebook <id>] [--place --review-by "<role>"]
//
// No MDX is edited: the site's StudioPanel already renders every placed row of
// specs/studio/<course>/unit-NN.json on its topic page (src/theme/DocItem/Content.tsx). This writes
// one row per pack asset (longform, each short with its related_video, infographic, deck_pdf) from
// metadata.json plus a links file `{ longform, shorts: { "short-01": url }, infographic, deck_pdf }`,
// replacing earlier rows of the same kind for the topic. Rows are `reviewed` unless --place is given
// with the reviewer's role (never human initials for an agent result, ADR-0019). Validated against
// studio-manifest.schema.json before writing. Do not import this file from any content gate.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { ROOT, pad2, specDir, parseTopic } from './paths.mjs';
import { playlistFor } from '../brand.mjs';

export const PACK_KINDS = ['longform', 'short', 'infographic', 'deck_pdf'];
const PROMPT_REF = 'specs/studio/prompts/pack/script.md';

/** Manifest rows for one topic's pack. Pure. */
export function packRows({ course, topic, meta, links, status = 'reviewed', review = null, today = new Date().toISOString().slice(0, 10) }) {
  const base = { topic, locale: 'en', status, prompt_ref: PROMPT_REF, generated_at: today, ...(review ? { review } : {}) };
  const rows = [];
  if (links.longform) {
    rows.push({ ...base, kind: 'longform', title: meta.titles[0], alt: meta.summary, host_url: links.longform,
      ...(playlistFor('video.longform', course, 'en') ? { playlist: playlistFor('video.longform', course, 'en') } : {}),
      ...(meta.chapters?.every((c) => c.t) ? { chapters: meta.chapters } : {}),
      captions: meta.subtitles ?? [], audio_tracks: meta.audio_tracks ?? ['en'] });
  }
  for (const s of meta.shorts ?? []) {
    const url = links.shorts?.[s.id];
    if (!url) continue;
    rows.push({ ...base, kind: 'short', part: Number(s.id.replace(/\D/g, '')) || 1, title: s.hook, alt: s.hook, host_url: url,
      related_video: s.related_video ?? links.longform });
  }
  if (links.infographic) rows.push({ ...base, kind: 'infographic', title: `${meta.titles[0]}: overview`, alt: meta.infographic_alt ?? meta.summary, asset_path: links.infographic });
  if (links.deck_pdf) rows.push({ ...base, kind: 'deck_pdf', title: `${meta.titles[0]}: slides`, alt: meta.deck_alt ?? meta.summary, asset_path: links.deck_pdf });
  return rows;
}

/** Replace the topic's earlier pack rows with `rows`; other rows are kept in order. */
export function mergeRows(manifest, topic, rows) {
  const kinds = new Set(rows.map((r) => r.kind));
  return { ...manifest, artifacts: [...manifest.artifacts.filter((a) => !(a.topic === topic && a.locale === 'en' && kinds.has(a.kind))), ...rows] };
}

export function validator(root = ROOT) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv.compile(JSON.parse(readFileSync(join(root, 'specs', 'studio', 'studio-manifest.schema.json'), 'utf8')));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (n) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : undefined; };
  const flag = (n) => { const i = a.indexOf(n); if (i >= 0) a.splice(i, 1); return i >= 0; };
  try {
    const linksFile = opt('--links'); const notebook = opt('--notebook'); const reviewBy = opt('--review-by'); const place = flag('--place');
    const { course, unit, topic } = parseTopic(a);
    if (!linksFile) throw new Error('--links <file> is required');
    if (place && !reviewBy) throw new Error('--place needs --review-by "<role>"');
    const meta = JSON.parse(readFileSync(join(specDir(course, unit, topic), 'metadata.json'), 'utf8'));
    const links = JSON.parse(readFileSync(resolve(linksFile), 'utf8'));
    const file = join(ROOT, 'specs', 'studio', course, `unit-${pad2(unit)}.json`);
    const manifest = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { course, unit, notebook_id: notebook, artifacts: [] };
    if (!manifest.notebook_id) throw new Error('new manifest needs --notebook <NotebookLM notebook id>');
    const today = new Date().toISOString().slice(0, 10);
    const rows = packRows({ course, topic, meta, links, status: place ? 'placed' : 'reviewed', review: place ? { by: reviewBy, date: today, verdict: 'pass' } : null, today });
    const next = mergeRows(manifest, topic, rows);
    const validate = validator();
    if (!validate(next)) throw new Error(`manifest would be invalid:\n- ${validate.errors.map((e) => `${e.instancePath} ${e.message}`).join('\n- ')}`);
    writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`);
    console.log(`wrote ${relative(ROOT, file)}: ${rows.length} pack row(s) for topic ${topic} (${place ? 'placed' : 'reviewed, not yet on the site'})`);
  } catch (e) { console.error(`embed: ${e.message}`); process.exit(1); }
}
