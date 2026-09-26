// G5 feat023-r2 manifest verification: recompute the contract's own input
// manifest for EFMP-302 unit 4 G5 and compare it entry by entry with the
// prepared feat023-r2 manifest.json. Also verifies skill_digest and that no
// bound input is dirty (modified/staged/untracked) in this worktree, and that
// the English unit inputs are byte-identical to the advisory G3 feat023-r1
// binding used as the comparison base.
import { readFileSync, writeFileSync } from 'node:fs';
import { inputManifest, skillDigest, dirtyInputs } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = new URL('../../../../../../../', import.meta.url).pathname;
const preparedPath = new URL('../feat023-r2/manifest.json', import.meta.url).pathname;
const prepared = JSON.parse(readFileSync(preparedPath, 'utf8'));

const lines = [];
const log = (s) => { lines.push(s); console.log(s); };

log(`root: ${root}`);
log(`prepared manifest: ${preparedPath}`);
log(`prepared: schema_version=${prepared.schema_version} course=${prepared.course_code} unit=${prepared.unit_no} stage=${prepared.stage}`);
log(`prepared bound inputs: ${Object.keys(prepared.input_manifest).length}`);
log(`prepared required_criteria: ${prepared.required_criteria.join(', ')}`);

const dirty = dirtyInputs(root, 'EFMP-302', 4, 'G5');
log(`dirty bound inputs (modified/staged/untracked): ${dirty.length}${dirty.length ? ' -> ' + dirty.join(', ') : ''}`);

const current = inputManifest(root, 'EFMP-302', 4, 'G5');
const preparedKeys = Object.keys(prepared.input_manifest).sort();
const currentKeys = Object.keys(current).sort();
log(`recomputed bound inputs: ${currentKeys.length}`);

const missing = preparedKeys.filter((k) => !(k in current));
const added = currentKeys.filter((k) => !(k in prepared.input_manifest));
const changed = preparedKeys.filter((k) => k in current && current[k] !== prepared.input_manifest[k]);
log(`missing from current tree: ${missing.length}${missing.length ? ' -> ' + missing.join(', ') : ''}`);
log(`added since prepare: ${added.length}${added.length ? ' -> ' + added.join(', ') : ''}`);
log(`digest mismatches: ${changed.length}${changed.length ? ' -> ' + changed.join(', ') : ''}`);

const sd = skillDigest(root, 'G5');
log(`skill_digest prepared=${prepared.skill_digest}`);
log(`skill_digest current =${sd}`);
log(`skill_digest match: ${sd === prepared.skill_digest}`);

// The English inputs must be byte-identical to what the advisory G3 pass
// reviewed: compare the English unit files' digests against the G3 report's
// own input_manifest entries.
const g3 = JSON.parse(readFileSync(new URL('../../G3/agent-g3-efmp302-u4-feat023-r1.json', import.meta.url).pathname, 'utf8'));
const enFiles = Object.keys(prepared.input_manifest).filter((p) => p.startsWith('docs/semester-1/efmp-302/unit-04/'));
let enSame = 0;
const enDiff = [];
for (const p of enFiles) {
  const g3Digest = g3.input_manifest[p];
  if (g3Digest && g3Digest === prepared.input_manifest[p]) enSame += 1;
  else enDiff.push(p);
}
log(`English unit inputs identical to the G3 feat023-r1 binding: ${enSame}/${enFiles.length}${enDiff.length ? ' DIFFERING: ' + enDiff.join(', ') : ''}`);
log(`g3_report disposition: ${g3.disposition} (reviewer ${g3.reviewer_id}, run ${g3.reviewer_run_id}, author ${g3.author_run_id}, unsigned advisory)`);

// Which Urdu files changed between the cycle-1 binding (commit c138103) and
// this one (a483c9e): the repair commit is expected to touch only Unit 4 Urdu.
const r1 = JSON.parse(readFileSync(new URL('../agent-g5-efmp302-u4-feat023-r1.json', import.meta.url).pathname, 'utf8'));
const urChanged = Object.keys(prepared.input_manifest).filter((p) => p.startsWith('i18n/ur/') && prepared.input_manifest[p] !== r1.input_manifest[p]);
const otherChanged = Object.keys(prepared.input_manifest).filter((p) => !p.startsWith('i18n/ur/') && prepared.input_manifest[p] !== r1.input_manifest[p]);
log(`Urdu inputs changed since cycle-1 binding: ${urChanged.length}`);
for (const p of urChanged) log(`  changed: ${p}`);
log(`non-Urdu inputs changed since cycle-1 binding: ${otherChanged.length}${otherChanged.length ? ' -> ' + otherChanged.join(', ') : ''}`);

const ok = dirty.length === 0 && missing.length === 0 && added.length === 0 && changed.length === 0 && sd === prepared.skill_digest;
log(`MANIFEST VERIFICATION: ${ok ? 'OK - all bound inputs match the prepared manifest' : 'MISMATCH'}`);

writeFileSync(new URL('manifest-verify.log', import.meta.url).pathname, lines.join('\n') + '\n');
process.exit(ok ? 0 : 1);
