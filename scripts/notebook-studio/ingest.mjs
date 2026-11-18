#!/usr/bin/env node
// Feature 029: turn reviewed Gemini Notebook downloads (.studio/, local only) into the small
// publishable text assets under static/studio/<course>/unit-NN/topic-NN/.
//
//   node scripts/notebook-studio/ingest.mjs <course> <unit> <topic>
//
// Inputs, all under .studio/<course>/unit-NN/ (written by the generation runs):
//   topic-NN.<loc>.report.md      practicum brief        -> brief.<loc>.md      (cleaned)
//   topic-NN.<loc>.studyguide.md  study guide            -> studyguide.<loc>.md (cleaned)
//   topic-NN.en.mindmap.json      Gemini mind map (EN)   -> mindmap.en.json / mindmap.ur.json
//   bakeoff/content.<loc>.json    poster content (A)     -> poster.<loc>.json
// plus specs/studio/<course>/unit-NN-topic-NN-mindmap-labels.json (EN fixes, UR labels).
// Audio, video and slides are hosted externally and only referenced by URL in the manifest.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanReport } from './postprocess-report.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const pad = (n) => String(n).padStart(2, '0');
const LONG_DASHES = / *[\u2014\u2015\u2E3A\u2E3B] */g;

/** Normalise Gemini's mind map into {label, children[]} with optional label overrides. */
export function normaliseMindMap(node, labels = {}) {
  const name = String(node.name ?? '').trim();
  return {
    label: (labels[name] ?? name).replace(LONG_DASHES, ' - '),
    children: (node.children ?? []).map((c) => normaliseMindMap(c, labels)),
  };
}

function translateTree(tree, map) {
  const label = map[tree.label];
  if (!label) throw new Error(`No Urdu label for mind map node: "${tree.label}"`);
  return { label, children: tree.children.map((c) => translateTree(c, map)) };
}

export function posterFrom(content) {
  const { title, tagline, poster } = content;
  return JSON.parse(JSON.stringify({ title, tagline, ...poster }).replace(LONG_DASHES, ' - '));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [course, unitArg, topicArg] = process.argv.slice(2);
  if (!course || !unitArg || !topicArg) {
    console.error('usage: ingest.mjs <course> <unit> <topic>');
    process.exit(2);
  }
  const u = pad(unitArg);
  const t = pad(topicArg);
  const src = join(ROOT, '.studio', course, `unit-${u}`);
  const out = join(ROOT, 'static', 'studio', course, `unit-${u}`, `topic-${t}`);
  mkdirSync(out, { recursive: true });
  const written = [];
  const put = (name, body) => { writeFileSync(join(out, name), body); written.push(name); };

  for (const loc of ['en', 'ur']) {
    for (const [from, to] of [[`report.md`, `brief.${loc}.md`], [`studyguide.md`, `studyguide.${loc}.md`]]) {
      const f = join(src, `topic-${t}.${loc}.${from}`);
      if (!existsSync(f)) continue;
      const { markdown, removedSections } = cleanReport(readFileSync(f, 'utf8'));
      put(to, markdown);
      if (removedSections) console.log(`  ${to}: removed ${removedSections} answer/rubric section(s)`);
    }
    const pc = join(src, 'bakeoff', `content.${loc}.json`);
    if (existsSync(pc)) put(`poster.${loc}.json`, `${JSON.stringify(posterFrom(JSON.parse(readFileSync(pc, 'utf8'))), null, 1)}\n`);
  }

  const mm = join(src, `topic-${t}.en.mindmap.json`);
  const lf = join(ROOT, 'specs', 'studio', course, `unit-${u}-topic-${t}-mindmap-labels.json`);
  if (existsSync(mm)) {
    const labels = existsSync(lf) ? JSON.parse(readFileSync(lf, 'utf8')) : { en_fix: {}, ur: null };
    const en = normaliseMindMap(JSON.parse(readFileSync(mm, 'utf8')), labels.en_fix);
    put('mindmap.en.json', `${JSON.stringify(en, null, 1)}\n`);
    if (labels.ur) put('mindmap.ur.json', `${JSON.stringify(translateTree(en, labels.ur), null, 1)}\n`);
  }
  console.log(`ingested ${course} ${u}.${t}: ${written.join(', ')}`);
}
