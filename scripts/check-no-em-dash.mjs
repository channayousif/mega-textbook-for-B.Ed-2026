#!/usr/bin/env node
/**
 * Content guard: fail if an em dash reaches authored content.
 *
 * Constitution Art. III.9 (Punctuation) - student-facing content contains zero
 * em dash characters. Where a strong parenthetical break is wanted, the sentence
 * is restructured (comma, colon, parentheses, or two sentences) or a spaced
 * hyphen " - " is used. The en dash (U+2013) stays permitted for numeric ranges
 * ("5-8 items"), so it is NOT flagged here.
 *
 * Scanned roots: docs/, guides/, i18n/, specs/content/ - every published or
 * pipeline-authored content tree. history/ is exempt as an immutable record
 * (see the amendment PHR); .claude/skills/, src/, README.md and CLAUDE.md are
 * kept clean by convention but not gated here.
 *
 * Flagged characters (the em-dash class):
 *   U+2014 EM DASH               "—"
 *   U+2015 HORIZONTAL BAR        "―"
 *   U+2E3A TWO-EM DASH           "⸺"
 *   U+2E3B THREE-EM DASH         "⸻"
 *
 * Exit 1 on any hit. Wired into CI via `npm run check:no-em-dash`.
 *
 * Usage:
 *   node scripts/check-no-em-dash.mjs [--scan-dir <dir>]...
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DEFAULT_SCAN_DIRS = ['docs', 'guides', 'i18n', 'specs/content'];
const SCAN_EXTENSIONS = new Set(['.md', '.mdx', '.csv']);

const EM_DASH_RE = /[—―⸺⸻]/g;

const CHAR_NAMES = {
  '—': 'U+2014 EM DASH',
  '―': 'U+2015 HORIZONTAL BAR',
  '⸺': 'U+2E3A TWO-EM DASH',
  '⸻': 'U+2E3B THREE-EM DASH',
};

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return; // directory absent - nothing to scan
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SCAN_EXTENSIONS.has(extname(full))) yield full;
  }
}

function snippet(line, index) {
  const start = Math.max(0, index - 30);
  const end = Math.min(line.length, index + 30);
  return `${start > 0 ? '...' : ''}${line.slice(start, end).trim()}${end < line.length ? '...' : ''}`;
}

function scanFile(file) {
  const findings = [];
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    let match;
    EM_DASH_RE.lastIndex = 0;
    while ((match = EM_DASH_RE.exec(line)) !== null) {
      findings.push({
        file,
        line: i + 1,
        col: match.index + 1,
        name: CHAR_NAMES[match[0]] ?? 'em-dash-class character',
        snippet: snippet(line, match.index),
      });
    }
  });
  return findings;
}

const args = process.argv.slice(2);
const scanDirs = [];
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--scan-dir' && args[i + 1]) scanDirs.push(args[(i += 1)]);
}
const dirs = scanDirs.length > 0 ? scanDirs : DEFAULT_SCAN_DIRS;

const findings = dirs.flatMap((dir) => [...walk(dir)].flatMap(scanFile));

if (findings.length > 0) {
  console.error(`\n✖ Em dash found in authored content (${findings.length} occurrence(s)).\n`);
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}:${f.col}  ${f.name}`);
    console.error(`      ${f.snippet}`);
  }
  console.error(
    '\nConstitution Art. III.9: authored content contains zero em dash characters.\n' +
      'Restructure the sentence or use a spaced hyphen " - ". The en dash (U+2013)\n' +
      'is still allowed for numeric ranges. See specs/content/style-guide.md.\n'
  );
  process.exit(1);
}

console.log(`✓ no em dash in authored content (scanned: ${dirs.join(', ')})`);
