// G5 input-digest verification for GQUR-300 Unit 1, run001.
// Recomputes the full input manifest with the repository's own
// scripts/lib/review-evidence.mjs (same normalization prepare applies:
// translation_status lifecycle lines, ADR-0027 content-spec unit slicing)
// and compares it to the parent-prepared bundle manifest.json.
import { readFileSync } from 'node:fs';
import { inputManifest } from '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183/scripts/lib/review-evidence.mjs';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const manifestPath = `${root}/specs/content/gqur-300/reviews/unit-01/G5/manifest.json`;
const prepared = JSON.parse(readFileSync(manifestPath, 'utf8'));
const recomputed = inputManifest(root, 'GQUR-300', 1, 'G5');

const preparedKeys = Object.keys(prepared.input_manifest).sort();
const recomputedKeys = Object.keys(recomputed).sort();

let ok = 0;
const bad = [];
const missing = preparedKeys.filter((k) => !(k in recomputed));
const added = recomputedKeys.filter((k) => !(k in prepared.input_manifest));
for (const k of preparedKeys) {
  if (!(k in recomputed)) continue;
  if (prepared.input_manifest[k] === recomputed[k]) ok += 1;
  else bad.push(k);
}

console.log(`prepared=${preparedKeys.length} recomputed=${recomputedKeys.length}`);
console.log(`ok=${ok} mismatch=${bad.length} missing_from_recompute=${missing.length} added_by_recompute=${added.length}`);
if (bad.length) console.log('MISMATCHED:\n  ' + bad.join('\n  '));
if (missing.length) console.log('MISSING FROM RECOMPUTE:\n  ' + missing.join('\n  '));
if (added.length) console.log('ADDED BY RECOMPUTE:\n  ' + added.join('\n  '));
console.log(preparedKeys.length === recomputedKeys.length && bad.length === 0 && missing.length === 0 && added.length === 0
  ? 'RESULT: bundle manifest matches current inputs exactly'
  : 'RESULT: bundle manifest DOES NOT match current inputs');
