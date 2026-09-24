// G5 reviewer digest verification for the prepared manifest (temporary, attempt-scoped).
// Recomputes the bound-input manifest with inputManifest() from the trusted library and
// compares it entry-by-entry against specs/content/gict-300/reviews/unit-06/G5/manifest.json.
import { readFileSync } from 'node:fs';
import { inputManifest } from '../../../../../../scripts/lib/review-evidence.mjs';

const root = process.cwd();
const prepared = JSON.parse(readFileSync('specs/content/gict-300/reviews/unit-06/G5/manifest.json', 'utf8'));
const recomputed = inputManifest(root, 'GICT-300', 6, 'G5');

const prepEntries = Object.entries(prepared.input_manifest).sort();
const newEntries = Object.entries(recomputed).sort();

const removed = [];
const mismatches = [];
for (const [path, digest] of prepEntries) {
  if (!(path in recomputed)) { removed.push(path); continue; }
  if (recomputed[path] !== digest) mismatches.push({ path, manifest: digest, current: recomputed[path] });
}
const added = newEntries.filter(([p]) => !(p in prepared.input_manifest)).map(([p]) => p);

console.log('prepared entries:', prepEntries.length);
console.log('recomputed entries:', newEntries.length);
console.log('removed:', removed.length);
console.log('digest mismatches:', mismatches.length);
console.log('added (in current, not in manifest):', added.length);
if (removed.length) console.log('REMOVED:', JSON.stringify(removed, null, 2));
if (mismatches.length) console.log('MISMATCHES:', JSON.stringify(mismatches, null, 2));
if (added.length) console.log('ADDED:', JSON.stringify(added, null, 2));
console.log('skill_digest match:', prepared.skill_digest === recomputed.skillDigest ? 'yes' : 'no');
