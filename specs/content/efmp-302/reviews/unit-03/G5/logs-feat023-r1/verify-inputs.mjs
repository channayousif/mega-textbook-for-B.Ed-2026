// G5 feat023-r1 input-manifest verification (evidence artifact).
// Uses the contract library's own `inputManifest` (the same function
// `validateReport` recomputes), so the comparison is exact.
import { readFileSync } from 'node:fs';
import { inputManifest } from 'file:///home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ae2ddfdbf249be0f2/scripts/lib/review-evidence.mjs';

const manifestPath = 'specs/content/efmp-302/reviews/unit-03/G5/feat023-r1/manifest.json';
const prepared = JSON.parse(readFileSync(manifestPath, 'utf8'));
const current = inputManifest(process.cwd(), 'EFMP-302', 3, 'G5');

const preparedKeys = Object.keys(prepared.input_manifest).sort();
const currentKeys = Object.keys(current).sort();
let bad = 0;
for (const key of new Set([...preparedKeys, ...currentKeys])) {
  if (!(key in prepared.input_manifest)) { console.log('NOT-IN-PREPARED', key); bad += 1; continue; }
  if (!(key in current)) { console.log('NOT-IN-CURRENT', key); bad += 1; continue; }
  if (prepared.input_manifest[key] !== current[key]) { console.log('MISMATCH', key); bad += 1; }
}
console.log(`prepared paths: ${preparedKeys.length}; current paths: ${currentKeys.length}; divergent: ${bad}`);
console.log(`skill_digest (prepared): ${prepared.skill_digest}`);
console.log(bad === 0 ? 'INPUTS-VERIFIED' : 'INPUTS-DIVERGED');
