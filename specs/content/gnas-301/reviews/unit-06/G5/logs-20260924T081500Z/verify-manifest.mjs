import { readFileSync } from 'node:fs';
import { inputManifest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = new URL('../../../../../../../', import.meta.url).pathname;
const prepared = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
const current = inputManifest(root, 'GNAS-301', 6, 'G5');
const prepKeys = Object.keys(prepared.input_manifest).sort();
const curKeys = Object.keys(current).sort();
const mismatches = [];
const missing = [];
const extra = [];
for (const k of prepKeys) {
  if (!(k in current)) { missing.push(k); continue; }
  if (current[k] !== prepared.input_manifest[k]) mismatches.push(k);
}
for (const k of curKeys) if (!(k in prepared.input_manifest)) extra.push(k);
console.log(`prepared entries: ${prepKeys.length}, current entries: ${curKeys.length}`);
console.log(`missing from current: ${missing.length}`);
for (const k of missing) console.log(`  MISSING ${k}`);
console.log(`extra in current: ${extra.length}`);
for (const k of extra) console.log(`  EXTRA ${k}`);
console.log(`digest mismatches: ${mismatches.length}`);
for (const k of mismatches) {
  console.log(`  MISMATCH ${k}`);
  console.log(`    prepared: ${prepared.input_manifest[k]}`);
  console.log(`    current:  ${current[k]}`);
}
console.log('required_criteria:', JSON.stringify(prepared.required_criteria));
console.log('skill_digest:', prepared.skill_digest);
