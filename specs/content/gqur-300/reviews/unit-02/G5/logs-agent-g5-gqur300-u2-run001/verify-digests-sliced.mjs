import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-02/G5/manifest.json', 'utf8'));

function unitSectionLines(text, unitNo) {
  const re = /^##\s+Unit\s+(\d+)\b/m;
  const found = [];
  let m;
  const global = /^##\s+Unit\s+(\d+)\b/gm;
  while ((m = global.exec(text)) !== null) found.push(Number(m[1]));
  return found.includes(unitNo);
}

function sliceSpec(text, unitNo) {
  if (!unitSectionLines(text, unitNo)) return text;
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
  if (path === 'specs/content/gqur-300/content-spec.md') {
    return Buffer.from(sliceSpec(bytes.toString('utf8'), 2), 'utf8');
  }
  if (!path.endsWith('.mdx')) return bytes;
  const text = bytes.toString('utf8');
  const match = /^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(text);
  if (!match) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + text.slice(match[0].length), 'utf8');
}

const entries = Object.entries(manifest.input_manifest);
let ok = 0;
const bad = [];
for (const [path, expected] of entries) {
  try {
    const actual = createHash('sha256').update(normalized(path, readFileSync(path))).digest('hex');
    if (actual === expected) ok += 1;
    else bad.push(`${path} MISMATCH actual=${actual}`);
  } catch (e) {
    bad.push(`${path} MISSING ${e.code || e.message}`);
  }
}
console.log(`total=${entries.length} ok=${ok} bad=${bad.length}`);
for (const b of bad) console.log(b);
