#!/usr/bin/env node
/** Compare the G3 feat023-r2 manifest with the G5 feat023-r1 manifest: which shared (English) paths changed? */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const g3 = JSON.parse(readFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G3/feat023-r2/manifest.json'), 'utf8'));
const g5 = JSON.parse(readFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/feat023-r1/manifest.json'), 'utf8'));
const a = g3.input_manifest, b = g5.input_manifest;
const changed = [], onlyG3 = [], onlyG5 = [];
let same = 0;
for (const [p, h] of Object.entries(a)) {
  if (!(p in b)) onlyG3.push(p);
  else if (b[p] !== h) changed.push(p);
  else same++;
}
for (const p of Object.keys(b)) if (!(p in a)) onlyG5.push(p);
const lines = [
  `# manifest comparison: G3 feat023-r2 vs G5 feat023-r1`,
  `shared paths identical: ${same}`,
  `shared paths CHANGED (${changed.length}):`,
  ...changed.map((p) => `  ${p}\n    g3r2=${a[p]}\n    g5r1=${b[p]}`),
  `only in G3 r2 manifest (${onlyG3.length}):`,
  ...onlyG3.map((p) => `  ${p}`),
  `only in G5 r1 manifest (${onlyG5.length}):`,
  ...onlyG5.map((p) => `  ${p}`),
];
const text = lines.join('\n');
console.log(text);
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/manifest-comparison-g3r2-vs-g5r1.log'), `${text}\n`);
