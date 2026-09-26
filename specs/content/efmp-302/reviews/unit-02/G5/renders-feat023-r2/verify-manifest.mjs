// G5 feat023-r2 input-manifest verification instrument.
// Replicates scripts/lib/review-evidence.mjs digest normalization exactly:
// sha256 over file bytes, except that within an .mdx YAML frontmatter block an exact
// top-level `translation_status: draft|reviewed` line is normalized to `lifecycle`.
// Verifies every path in the prepared r2 manifest against current bytes, then diffs
// the r2 manifest against the cycle-1 (r1) report input_manifest to isolate what
// changed since cycle 1.
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
// renders-feat023-r2 -> G5 -> unit-02 -> reviews -> efmp-302 -> content -> specs -> repo root
const repo = join(here, '..', '..', '..', '..', '..', '..', '..');

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');

function unitSectionLines(text, unitNo) {
  const lines = text.split(/\r?\n/);
  let found = null;
  for (const line of lines) {
    const m = /^##\s+Unit\s+(\d+)\b/.exec(line);
    if (m && Number(m[1]) === unitNo) { found = line; break; }
  }
  return found;
}

// Replicates sliceSpec (ADR-0027): other units' `## Unit N` sections collapse to a
// one-line placeholder so only this unit's spec section is bound.
function sliceSpec(text, unitNo) {
  const mine = unitSectionLines(text, unitNo);
  if (!mine) return text;
  const lines = text.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const other = /^##\s+Unit\s+(\d+)\b/.exec(lines[i]);
    if (other && Number(other[1]) !== unitNo) {
      out.push(`## Unit ${other[1]} (not bound to this unit's evidence - ADR-0027)`);
      i++;
      while (i < lines.length && !(/^##\s+/.test(lines[i]) && !/^###/.test(lines[i]))) i++;
      i--;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join('\n');
}

function normalized(path, bytes) {
  if (path === 'specs/content/efmp-302/content-spec.md') {
    return Buffer.from(sliceSpec(bytes.toString('utf8'), 2));
  }
  if (!path.endsWith('.mdx')) return bytes;
  const text = bytes.toString('utf8');
  const match = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!match) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + text.slice(match[0].length));
}

const r2 = JSON.parse(readFileSync(join(repo, 'specs/content/efmp-302/reviews/unit-02/G5/feat023-r2/manifest.json'), 'utf8'));
const r1 = JSON.parse(readFileSync(join(repo, 'specs/content/efmp-302/reviews/unit-02/G5/agent-g5-efmp302-u2-feat023-r1.json'), 'utf8'));

let ok = 0; const bad = [];
for (const [path, expected] of Object.entries(r2.input_manifest)) {
  const abs = join(repo, path);
  if (!existsSync(abs)) { bad.push(`MISSING ${path}`); continue; }
  const actual = digest(normalized(path, readFileSync(abs)));
  if (actual === expected) ok += 1;
  else bad.push(`MISMATCH ${path} expected ${expected} got ${actual}`);
}

console.log(`r2 manifest paths: ${Object.keys(r2.input_manifest).length}`);
console.log(`digests verified against current bytes: ${ok}`);
console.log(`failures: ${bad.length}`);
for (const line of bad) console.log(line);

const r1m = r1.input_manifest;
const r2m = r2.input_manifest;
const added = Object.keys(r2m).filter((k) => !(k in r1m));
const removed = Object.keys(r1m).filter((k) => !(k in r2m));
const changed = Object.keys(r2m).filter((k) => k in r1m && r1m[k] !== r2m[k]);
console.log('\nDiff r1 (cycle-1) -> r2 (current) input manifests:');
console.log(`added paths: ${added.length}`); for (const p of added) console.log(`  + ${p}`);
console.log(`removed paths: ${removed.length}`); for (const p of removed) console.log(`  - ${p}`);
console.log(`changed digests: ${changed.length}`); for (const p of changed) console.log(`  ~ ${p}\n      r1 ${r1m[p]}\n      r2 ${r2m[p]}`);

if (bad.length > 0) process.exit(1);
console.log('\nRESULT: all r2 manifest digests match current bytes');
