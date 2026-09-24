// Compute the evidence_manifest (path -> SHA-256) for the G5 run 001 report.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const BASE = 'specs/content/gnas-301/reviews/unit-05/G5';
const dirs = [`${BASE}/logs-20260924T081245Z`, `${BASE}/renders-20260924T081245Z`];
const out = {};
for (const d of dirs) {
  for (const f of readdirSync(d)) {
    const p = `${d}/${f}`;
    if (statSync(p).isFile()) {
      out[p] = createHash('sha256').update(readFileSync(p)).digest('hex');
    }
  }
}
writeFileSync('/tmp/g5-evidence-manifest.json', JSON.stringify(out, null, 2));
console.log(`${Object.keys(out).length} evidence files hashed`);
for (const [p, h] of Object.entries(out)) console.log(h.slice(0, 16), p);
