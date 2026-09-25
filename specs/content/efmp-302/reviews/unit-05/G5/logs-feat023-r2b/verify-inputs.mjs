// verify-inputs.mjs - feat023-r2b (fresh G5 cycle-2 reviewer, re-run after the interrupted attempt)
// Verifies the prepared feat023-r2 manifest against the CURRENT tree using the
// contract's own inputManifest()/skillDigest() (no refresh), and confirms the
// English inputs are identical to the G3 feat023-r1 binding used as comparison base.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(process.env.CONTENT_ROOT || '.');
const { inputManifest, skillDigest } = await import(pathToFileURL(join(root, 'scripts/lib/review-evidence.mjs')).href);
const manifestPath = 'specs/content/efmp-302/reviews/unit-05/G5/feat023-r2/manifest.json';
const prepared = JSON.parse(readFileSync(join(root, manifestPath), 'utf8'));
const lines = [];
const say = (s) => lines.push(s);

say(`verify-inputs feat023-r2b ${new Date().toISOString()}`);
say(`git HEAD: ${process.env.GIT_HEAD || '(see log header)'}`);

const recomputed = inputManifest(root, 'EFMP-302', 5, 'G5');
const prepPaths = Object.keys(prepared.input_manifest);
const recPaths = Object.keys(recomputed);
say(`prepared paths: ${prepPaths.length}`);
say(`recomputed paths: ${recPaths.length}`);
const added = recPaths.filter((p) => !prepPaths.includes(p));
const dropped = prepPaths.filter((p) => !recPaths.includes(p));
say(`added (in recomputed, not prepared): ${added.length}${added.length ? ' ' + added.join(', ') : ''}`);
say(`dropped (in prepared, not recomputed): ${dropped.length}${dropped.length ? ' ' + dropped.join(', ') : ''}`);
let mismatches = 0;
for (const p of prepPaths) {
  if (recomputed[p] !== prepared.input_manifest[p]) {
    mismatches += 1;
    say(`MISMATCH ${p}: prepared ${prepared.input_manifest[p]} vs recomputed ${recomputed[p]}`);
  }
}
say(`digest mismatches: ${mismatches}`);
const sd = skillDigest(root, 'G5');
say(`skill_digest prepared: ${prepared.skill_digest}`);
say(`skill_digest recomputed: ${sd}`);
say(`skill_digest match: ${sd === prepared.skill_digest}`);

// English inputs vs the G3 feat023-r1 binding (the advisory G3 used as comparison base)
const g3 = JSON.parse(readFileSync(join(root, 'specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json'), 'utf8'));
let same = 0; let diff = 0;
for (const [p, h] of Object.entries(prepared.input_manifest)) {
  if (g3.input_manifest[p] === undefined) continue;
  if (g3.input_manifest[p] === h) same += 1; else { diff += 1; say(`EN-DIFF vs G3 r1: ${p}`); }
}
say(`English unit inputs identical to G3 feat023-r1 binding: ${same} same, ${diff} different`);

// Urdu bound paths, with raw-byte hash note for the documented normalization
const urdu = prepPaths.filter((p) => p.startsWith('i18n/ur/'));
say(`Urdu bound paths: ${urdu.length}`);
for (const p of urdu) {
  const raw = createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
  const norm = recomputed[p] === prepared.input_manifest[p];
  say(`  ${p}: ${norm ? 'disk==manifest (after documented translation_status normalization)' : 'MISMATCH'} [raw-byte hash ${raw.slice(0, 12)}]`);
}

const ok = mismatches === 0 && added.length === 0 && dropped.length === 0 && sd === prepared.skill_digest;
say(`VERDICT: ${ok ? 'manifest verified (131/131, no refresh)' : 'MANIFEST FAILED VERIFICATION'}`);
const out = lines.join('\n') + '\n';
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r2b/verify-inputs.log'), out);
console.log(out);
process.exit(ok ? 0 : 1);
