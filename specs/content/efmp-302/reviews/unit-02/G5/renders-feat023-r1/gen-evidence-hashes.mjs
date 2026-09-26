#!/usr/bin/env node
/** Hash every evidence file under logs-feat023-r1 and renders-feat023-r1 into evidence-hashes.json. */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const base = join(root, 'specs/content/efmp-302/reviews/unit-02/G5');
const skip = new Set(['gen-report.mjs', 'gen-evidence-hashes.mjs', 'evidence-hashes.json']);
const out = {};
for (const dir of ['logs-feat023-r1', 'renders-feat023-r1']) {
  for (const name of readdirSync(join(base, dir)).sort()) {
    if (skip.has(name)) continue;
    const p = join(base, dir, name);
    if (!statSync(p).isFile()) continue;
    const rel = `specs/content/efmp-302/reviews/unit-02/G5/${dir}/${name}`;
    out[rel] = createHash('sha256').update(readFileSync(p)).digest('hex');
  }
}
writeFileSync(join(base, 'renders-feat023-r1/evidence-hashes.json'), `${JSON.stringify(out, null, 2)}\n`);
console.log(`hashed ${Object.keys(out).length} evidence files`);
