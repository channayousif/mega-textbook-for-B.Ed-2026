// G5 input verification for GNAS-301 Unit 5 (run agent-g5-gnas301-u5-run001).
// Replicates normalized() from scripts/lib/review-evidence.mjs so digests are
// compared exactly as the validator computes them. Read-only: reports, never repairs.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const digest = (b) => createHash('sha256').update(b).digest('hex');

function unitSectionLines(text, unitNo) {
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = /^##\s+Unit\s+(\d+)\b/.exec(lines[i]);
    if (m && Number(m[1]) === unitNo) return { start: i, heading: lines[i] };
  }
  return null;
}
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
function normalized(path, bytes, unitNo) {
  if (path.endsWith('specs/content/gnas-301/content-spec.md')) {
    return Buffer.from(sliceSpec(bytes.toString('utf8'), unitNo));
  }
  if (!path.endsWith('.mdx')) return bytes;
  const text = bytes.toString('utf8');
  const match = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!match) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + text.slice(match[0].length));
}

const unitNo = 5;
const m = JSON.parse(readFileSync('specs/content/gnas-301/reviews/unit-05/G5/manifest.json', 'utf8'));
const im = m.input_manifest;
const bad = [];
for (const [p, h] of Object.entries(im)) {
  let bytes;
  try { bytes = readFileSync(p); } catch { bad.push([p, 'MISSING']); continue; }
  if (digest(normalized(p, bytes, unitNo)) !== h) bad.push([p, 'MISMATCH']);
}
console.log(`G5 unit-05: ${Object.keys(im).length} inputs, ${bad.length} problems`);
for (const b of bad) console.log('  ', b[0], b[1]);
console.log('skill_digest in manifest:', m.skill_digest);
console.log('required_criteria:', JSON.stringify(m.required_criteria));
