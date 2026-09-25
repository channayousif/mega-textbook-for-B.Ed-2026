// Verify the prepared feat023-r2 manifest against the current tree using the trusted library.
import { readFileSync } from 'node:fs';
import { inputManifest, dirtyInputs, skillDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = new URL('../../../../../../../', import.meta.url).pathname;
const manifestPath = new URL('../feat023-r2/manifest.json', import.meta.url).pathname;
const prepared = JSON.parse(readFileSync(manifestPath, 'utf8'));
const current = inputManifest(root, 'EFMP-302', 6, 'G5');

const preparedPaths = Object.keys(prepared.input_manifest);
const currentPaths = Object.keys(current);
const missing = preparedPaths.filter((p) => !currentPaths.includes(p));
const mismatches = preparedPaths.filter((p) => currentPaths.includes(p) && current[p] !== prepared.input_manifest[p]);
const extra = currentPaths.filter((p) => !preparedPaths.includes(p));

console.log('G5 r2 manifest verification (inputManifest from scripts/lib/review-evidence.mjs):');
console.log(`  bound paths in manifest: ${preparedPaths.length} | recomputed at HEAD: ${currentPaths.length}`);
console.log(`  missing from current tree: ${missing.length} ${JSON.stringify(missing)}`);
console.log(`  digest mismatches: ${mismatches.length} ${JSON.stringify(mismatches)}`);
console.log(`  paths in current not in manifest: ${extra.length} ${JSON.stringify(extra)}`);
console.log(`  skill_digest match: ${skillDigest(root, 'G5') === prepared.skill_digest}`);
console.log(`  dirtyInputs: ${JSON.stringify(dirtyInputs(root, 'EFMP-302', 6, 'G5'))}`);

// Base stability vs the r1 G5 report (the comparison base must be unchanged).
const r1 = JSON.parse(readFileSync(new URL('../agent-g5-efmp302-u6-feat023-r1.json', import.meta.url).pathname, 'utf8'));
const r1Paths = Object.keys(r1.input_manifest);
const shared = r1Paths.filter((p) => preparedPaths.includes(p));
const changed = shared.filter((p) => r1.input_manifest[p] !== prepared.input_manifest[p]);
console.log('Base stability vs the r1 G5 report:');
console.log(`  shared paths: ${shared.length} | digest changes since r1: ${changed.length} ${JSON.stringify(changed)}`);
