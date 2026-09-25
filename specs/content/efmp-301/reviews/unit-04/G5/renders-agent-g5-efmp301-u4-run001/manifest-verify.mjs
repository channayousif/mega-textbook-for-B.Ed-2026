// Evidence script for agent-g5-efmp301-u4-run001: verify the prepared G5 input
// manifest against the current tree using the repository's own hashing logic.
import { inputManifest, skillDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';
import { readFileSync } from 'node:fs';

const cur = inputManifest(process.cwd(), 'EFMP-301', 4, 'G5');
const prepared = JSON.parse(
  readFileSync('specs/content/efmp-301/reviews/unit-04/G5/manifest.json', 'utf8'),
);
const p = prepared.input_manifest;
const keys = new Set([...Object.keys(p), ...Object.keys(cur)]);
let mismatches = 0;
for (const k of [...keys].sort()) {
  if (p[k] !== cur[k]) {
    console.log('DIFF', k, 'prepared=' + (p[k] || 'MISSING'), 'current=' + (cur[k] || 'MISSING'));
    mismatches += 1;
  }
}
console.log('prepared inputs:', Object.keys(p).length, '| current inputs:', Object.keys(cur).length, '| mismatches:', mismatches);
const sd = skillDigest(process.cwd(), 'G5');
console.log('current G5 skill digest:', sd);
console.log('manifest skill_digest:  ', prepared.skill_digest);
console.log('skill digest match:', sd === prepared.skill_digest);
