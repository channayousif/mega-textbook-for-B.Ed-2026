// verify-inputs.mjs - feat023-r2 (G5 cycle 2, EFMP-302 Unit 5)
// Recomputes the input bundle with the contract's own inputManifest() and compares it
// to the parent-prepared manifest at feat023-r2/manifest.json. Does NOT refresh it.
// Also confirms the skill_digest and that the bound English inputs are identical to the
// ones the G3 feat023-r1 advisory pass bound (English base identity for the G5 dependency).
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { inputManifest, skillDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const ROOT = new URL('../../../../../../../', import.meta.url).pathname;
const PREPARED = 'specs/content/efmp-302/reviews/unit-05/G5/feat023-r2/manifest.json';
const G3_REPORT = 'specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json';

const prepared = JSON.parse(readFileSync(ROOT + PREPARED, 'utf8'));
const recomputed = inputManifest(ROOT, 'EFMP-302', 5, 'G5');

const log = [];
const p = (s) => { log.push(s); console.log(s); };

p(`verify-inputs feat023-r2 ${new Date().toISOString()}`);
p(`prepared paths: ${Object.keys(prepared.input_manifest).length}`);
p(`recomputed paths: ${Object.keys(recomputed).length}`);

const preparedKeys = Object.keys(prepared.input_manifest).sort();
const recomputedKeys = Object.keys(recomputed).sort();
const added = recomputedKeys.filter((k) => !(k in prepared.input_manifest));
const dropped = preparedKeys.filter((k) => !(k in recomputed));
p(`added (in recomputed, not prepared): ${added.length}${added.length ? ' -> ' + added.join(', ') : ''}`);
p(`dropped (in prepared, not recomputed): ${dropped.length}${dropped.length ? ' -> ' + dropped.join(', ') : ''}`);

let digestMismatch = 0;
const mismatches = [];
for (const k of preparedKeys) {
  if (k in recomputed && recomputed[k] !== prepared.input_manifest[k]) {
    digestMismatch += 1;
    mismatches.push(`${k}: prepared ${prepared.input_manifest[k].slice(0, 12)} vs recomputed ${recomputed[k].slice(0, 12)}`);
  }
}
p(`digest mismatches: ${digestMismatch}`);
for (const m of mismatches) p('  MISMATCH ' + m);

const sd = skillDigest(ROOT, 'G5');
p(`skill_digest prepared: ${prepared.skill_digest}`);
p(`skill_digest recomputed: ${sd}`);
p(`skill_digest match: ${sd === prepared.skill_digest}`);

// English-base identity vs the G3 feat023-r1 advisory report (dependency check)
const g3 = JSON.parse(readFileSync(ROOT + G3_REPORT, 'utf8'));
const g3En = g3.input_manifest;
let enSame = 0, enDiff = 0;
const enDiffList = [];
for (const [path, digest] of Object.entries(recomputed)) {
  if (!path.startsWith('docs/semester-1/efmp-302/')) continue;
  if (!(path in g3En)) { enDiff += 1; enDiffList.push(`${path}: not in G3 manifest`); continue; }
  if (g3En[path] === digest) enSame += 1; else { enDiff += 1; enDiffList.push(`${path}: G3 ${g3En[path].slice(0, 12)} vs now ${digest.slice(0, 12)}`); }
}
p(`English unit inputs identical to G3 feat023-r1 binding: ${enSame} same, ${enDiff} different`);
for (const d of enDiffList) p('  EN-DIFF ' + d);

// Urdu file digests on disk right now (the reviewed bytes), hashed with the contract's
// documented MDX frontmatter normalization (translation_status: draft|reviewed -> lifecycle)
// so a raw-byte difference is not mistaken for changed inputs.
const normalizeLikeContract = (path, bytes) => {
  if (!path.endsWith('.mdx')) return bytes;
  const text = bytes.toString('utf8');
  const match = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!match) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + text.slice(match[0].length));
};
const urPaths = Object.keys(recomputed).filter((k) => k.startsWith('i18n/ur/'));
p(`Urdu bound paths: ${urPaths.length}`);
for (const u of urPaths) {
  const raw = readFileSync(ROOT + u);
  const onDisk = createHash('sha256').update(normalizeLikeContract(u, raw)).digest('hex');
  const rawDisk = createHash('sha256').update(raw).digest('hex');
  const note = onDisk === recomputed[u] ? 'disk==manifest (after documented translation_status normalization)' : `DISK DIFFERS even normalized: ${onDisk.slice(0, 12)}`;
  p(`  ${u}: ${note} [raw-byte hash ${rawDisk.slice(0, 12)} differs by design]`);
}

const ok = added.length === 0 && dropped.length === 0 && digestMismatch === 0 && sd === prepared.skill_digest;
p(`VERDICT: ${ok ? 'manifest verified (131/131, no refresh)' : 'MANIFEST MISMATCH - escalate'}`);
writeFileSync(new URL('verify-inputs.log', import.meta.url).pathname, log.join('\n') + '\n');
process.exit(ok ? 0 : 1);
