// G5: verify the prepared G5 manifest's 108 input digests against the current tree,
// using the same normalisation as scripts/lib/review-evidence.mjs (frontmatter
// translation_status lines normalised; content-spec.md sliced to the unit's section).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const m = JSON.parse(readFileSync('specs/content/efmp-301/reviews/unit-06/G5/manifest.json', 'utf8'));

function sliceSpec(text, unitNo) {
  if (!/^##\s+Unit\s+6\b/m.test(text)) return text;
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
  if (path === 'specs/content/efmp-301/content-spec.md') return Buffer.from(sliceSpec(bytes.toString('utf8'), 6));
  if (!path.endsWith('.mdx')) return bytes;
  const text = bytes.toString('utf8');
  const match = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!match) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + text.slice(match[0].length));
}

let ok = 0;
const bad = [];
const missing = [];
for (const [p, h] of Object.entries(m.input_manifest)) {
  try {
    const d = createHash('sha256').update(normalized(p, readFileSync(p))).digest('hex');
    if (d === h) ok++;
    else bad.push(`${p} expected ${h} got ${d}`);
  } catch {
    missing.push(p);
  }
}
console.log(`total: ${Object.keys(m.input_manifest).length} ok: ${ok} mismatched: ${bad.length} missing: ${missing.length}`);
if (bad.length) console.log('MISMATCHED:\n' + bad.join('\n'));
if (missing.length) console.log('MISSING:\n' + missing.join('\n'));
