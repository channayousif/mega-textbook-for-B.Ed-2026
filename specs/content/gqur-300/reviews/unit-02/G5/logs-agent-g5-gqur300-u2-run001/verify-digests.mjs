import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-02/G5/manifest.json', 'utf8'));

function normalized(path, bytes) {
  const s = bytes.toString('utf8');
  if (!path.endsWith('.mdx')) return bytes;
  const match = s.match(/^(﻿?---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
  if (!match) return bytes;
  if (!/^translation_status: (draft|reviewed)$/m.test(match[2])) return bytes;
  const front = match[2].replace(/^translation_status: (?:draft|reviewed)\r?$/gm, 'translation_status: lifecycle');
  return Buffer.from(match[1] + front + match[3] + s.slice(match[0].length), 'utf8');
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
