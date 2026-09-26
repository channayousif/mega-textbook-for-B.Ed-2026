// G5 feat023-r2 input verification: recompute the current input manifest through
// the contract library and compare it to the parent-prepared feat023-r2 manifest.
// Run from the repository root (worktree).
import { readFileSync, writeFileSync } from 'node:fs';
import { inputManifest, skillDigest, CRITERIA } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = process.cwd();
const preparedPath = 'specs/content/efmp-302/reviews/unit-03/G5/feat023-r2/manifest.json';
const prepared = JSON.parse(readFileSync(preparedPath, 'utf8'));
const currentInputs = inputManifest(root, 'EFMP-302', 3, 'G5');

const preparedInputs = prepared.input_manifest;

const preparedPaths = Object.keys(preparedInputs);
const currentPaths = Object.keys(currentInputs);

const missing = preparedPaths.filter((p) => !(p in currentInputs));
const added = currentPaths.filter((p) => !(p in preparedInputs));
const changed = preparedPaths.filter((p) => p in currentInputs && currentInputs[p] !== preparedInputs[p]);

const lines = [];
lines.push(`verify-inputs (feat023-r2) ${new Date().toISOString()}`);
lines.push(`prepared manifest: ${preparedPath}`);
lines.push(`prepared paths: ${preparedPaths.length}`);
lines.push(`recomputed paths: ${currentPaths.length}`);
lines.push(`missing from current tree: ${missing.length}${missing.length ? ' -> ' + missing.join(', ') : ''}`);
lines.push(`added in current tree: ${added.length}${added.length ? ' -> ' + added.join(', ') : ''}`);
lines.push(`digest mismatches: ${changed.length}`);
for (const p of changed) {
  lines.push(`  MISMATCH ${p}`);
  lines.push(`    prepared: ${preparedInputs[p]}`);
  lines.push(`    current:  ${currentInputs[p]}`);
}
lines.push(`skill_digest prepared: ${prepared.skill_digest}`);
lines.push(`skill_digest current:  ${skillDigest(root, 'G5')}`);
lines.push(`skill_digest match: ${prepared.skill_digest === skillDigest(root, 'G5')}`);
lines.push(`required_criteria match: ${JSON.stringify(prepared.required_criteria) === JSON.stringify(CRITERIA.G5)}`);
const ok = missing.length === 0 && added.length === 0 && changed.length === 0 && prepared.skill_digest === skillDigest(root, 'G5');
lines.push(`RESULT: ${ok ? 'ALL 140 BOUND INPUTS DIGEST-VERIFIED AGAINST CURRENT BYTES' : 'MISMATCH - DO NOT PROCEED'}`);
const text = lines.join('\n') + '\n';
writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2/verify-inputs.log', text);
console.log(text);
process.exit(ok ? 0 : 1);
