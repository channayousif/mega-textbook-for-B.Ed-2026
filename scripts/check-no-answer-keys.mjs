#!/usr/bin/env node
/**
 * T028 (FR-012, SC-010): guarantee no answer keys / private marking material leak into
 * public content. Scans content sources (docs/ + i18n/) and, when present, the built
 * output (build/) for forbidden front-matter fields and answer-key markers. Exits non-zero
 * on any hit. Complements the validator's schema-level rejection of answer-key fields.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const TARGETS = ['docs', 'i18n', 'build', 'specs/content'].map((d) => join(ROOT, d)).filter(existsSync);

// Forbidden front-matter keys (schema also rejects these) + answer-key content markers.
// Spec 006 FR-016d / research.md R5: `correct answer` and the `specs/content` target added so an
// accidentally force-added (despite .gitignore) staging worksheet is still caught.
const PATTERNS = [
  /^\s*answer_key\s*:/im,
  /^\s*answers\s*:/im,
  /^\s*marking_scheme\s*:/im,
  /^\s*rubric_answers\s*:/im,
  /\banswer\s*key\b/i,
  /\bmarking\s*scheme\b/i,
  /\bcorrect\s*answer\b/i,
];
const SCAN_EXT = new Set(['.md', '.mdx', '.html']);
// Spec 006: style-guide.md is the documented, human-reviewable home for these exact marker
// phrases (research.md R5's "kept here as the documented source") — it will always legitimately
// contain them, so it is excluded rather than perpetually flagged as a false positive.
const EXCLUDE = new Set([join(ROOT, 'specs', 'content', 'style-guide.md')]);
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (EXCLUDE.has(p)) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (SCAN_EXT.has(extname(p))) {
      const text = readFileSync(p, 'utf8');
      for (const re of PATTERNS) {
        const m = re.exec(text);
        if (m) hits.push(`${p.replace(ROOT + '/', '')}: matched /${re.source}/ ("${m[0].trim().slice(0, 40)}")`);
      }
    }
  }
}

for (const t of TARGETS) walk(t);

if (hits.length) {
  console.error(`\n✗ Answer-key / private material found in public content (${hits.length}):\n`);
  for (const h of hits) console.error(`  - ${h}`);
  process.exit(1);
} else {
  console.log(`✓ No answer keys / private marking material found (scanned: ${TARGETS.map((t) => t.replace(ROOT + '/', '')).join(', ')}).`);
}
