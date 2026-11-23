#!/usr/bin/env node
// Feature 032 phase C: which course introduced each glossary term, from `git blame glossary.json`
// (crew commit subjects name the job, e.g. "crew: gcce-400-u06-author"). Writes
// specs/studio/glossary-origin.json, which build-studio-index.mjs reads to keep each topic's
// flashcards to its own course's terms. Needs full git history, so it runs locally (never in a
// shallow CI clone); rerun after a batch of new units:  node scripts/build-glossary-origin.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blame = execFileSync('git', ['-C', ROOT, 'blame', '--line-porcelain', 'HEAD', '--', 'glossary.json'], { encoding: 'utf8', maxBuffer: 64 << 20 });
const origin = {};
let summary = '';
for (const line of blame.split('\n')) {
  if (line.startsWith('summary ')) summary = line.slice(8);
  else if (line.startsWith('\t')) {
    const t = line.match(/"term":\s*"([^"]+)"/);
    const c = summary.match(/\b([a-z]{4}-\d{3})\b/i);
    if (t && c) origin[t[1]] = c[1].toUpperCase();
  }
}
const sorted = Object.fromEntries(Object.entries(origin).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(join(ROOT, 'specs', 'studio', 'glossary-origin.json'), `${JSON.stringify(sorted, null, 1)}\n`);
console.log(`glossary-origin: ${Object.keys(sorted).length} term(s) attributed to a course`);
