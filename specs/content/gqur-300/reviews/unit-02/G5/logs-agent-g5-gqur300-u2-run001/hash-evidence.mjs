import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const base = 'specs/content/gqur-300/reviews/unit-02/G5';
const logsDir = `${base}/logs-agent-g5-gqur300-u2-run001`;
const rendersDir = `${base}/renders-agent-g5-gqur300-u2-run001`;
const manifest = {};
for (const dir of [logsDir, rendersDir]) {
  for (const f of readdirSync(dir).sort()) {
    const p = `${dir}/${f}`;
    if (statSync(p).isDirectory()) continue;
    manifest[p] = createHash('sha256').update(readFileSync(p)).digest('hex');
  }
}
writeFileSync('/tmp/evidence-hashes.json', JSON.stringify(manifest, null, 2));
console.log(`hashed ${Object.keys(manifest).length} evidence files`);
