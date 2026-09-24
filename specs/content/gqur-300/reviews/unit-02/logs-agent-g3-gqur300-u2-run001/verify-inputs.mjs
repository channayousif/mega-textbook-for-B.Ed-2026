import { inputManifest, skillDigest, dirtyInputs } from '../../../../../../scripts/lib/review-evidence.mjs';
import { readFileSync } from 'node:fs';

const prepared = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-02/G3/manifest.json', 'utf8'));
const recomputed = inputManifest(process.cwd(), 'GQUR-300', 2, 'G3');
const pk = Object.keys(prepared.input_manifest).sort();
const rk = Object.keys(recomputed).sort();
const bad = [];
for (const k of new Set([...pk, ...rk])) if (prepared.input_manifest[k] !== recomputed[k]) bad.push(k);
console.log('prepared input count:', pk.length);
console.log('recomputed input count:', rk.length);
console.log('digest mismatches:', bad.length === 0 ? 'NONE' : bad.join(', '));
console.log('skill_digest match:', skillDigest(process.cwd(), 'G3') === prepared.skill_digest ? 'YES' : 'NO');
const dirty = dirtyInputs(process.cwd(), 'GQUR-300', 2, 'G3');
console.log('dirty bound inputs at review start:', dirty.length === 0 ? 'NONE' : JSON.stringify(dirty));
