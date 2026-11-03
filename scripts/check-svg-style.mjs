#!/usr/bin/env node
/**
 * Drawing-style gate for course figure SVGs (rules in scripts/lib/svg-style.mjs).
 *
 * RATCHET. The corpus predates these rules, so specs/content/svg-style-baseline.json
 * records each existing file's known violations. A file may keep those, but:
 *   - any violation NOT in its baseline entry fails (new files must be clean);
 *   - a baseline entry that no longer occurs fails as stale, so a fix is locked in
 *     (rerun with --write-baseline to shrink the baseline);
 *   - undefined classes and off-box markers are visible rendering bugs and are
 *     never baselined.
 * Dark variants are derived from their light file and are not checked separately.
 *
 * Usage: node scripts/check-svg-style.mjs [--write-baseline]
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svgStyleViolations, NEVER_BASELINED } from './lib/svg-style.mjs';

const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : resolve(fileURLToPath(new URL('..', import.meta.url)));
const FIG_DIR = join(ROOT, 'static', 'img', 'figures');
const BASELINE = join(ROOT, 'specs', 'content', 'svg-style-baseline.json');
const write = process.argv.includes('--write-baseline');

function svgs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return svgs(p);
    return n.endsWith('.svg') && !n.endsWith('.dark.svg') ? [p] : [];
  });
}

const found = {};
for (const file of svgs(FIG_DIR).sort()) {
  const rel = relative(ROOT, file);
  const v = svgStyleViolations(readFileSync(file, 'utf8'), { isUrdu: file.endsWith('.ur.svg') });
  if (v.length) found[rel] = v;
}

if (write) {
  const out = {};
  for (const [f, v] of Object.entries(found)) {
    const keep = v.filter((c) => !NEVER_BASELINED(c));
    if (keep.length) out[f] = keep;
  }
  writeFileSync(BASELINE, JSON.stringify(out, null, 1) + '\n');
  console.log(`svg-style: baseline written, ${Object.keys(out).length} file(s) grandfathered.`);
}

const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {};
const errors = [];
for (const [f, v] of Object.entries(found)) {
  const allowed = new Set(baseline[f] ?? []);
  for (const code of v) {
    if (NEVER_BASELINED(code) || !allowed.has(code)) errors.push(`${f}: ${code}`);
  }
}
for (const [f, codes] of Object.entries(baseline)) {
  const now = new Set(found[f] ?? []);
  const gone = codes.filter((c) => !now.has(c));
  if (gone.length) errors.push(`${f}: baseline lists fixed violation(s) ${gone.join(', ')} - run: node scripts/check-svg-style.mjs --write-baseline`);
}

if (errors.length) {
  console.error(`\n✗ svg-style: ${errors.length} problem(s). Rules: scripts/lib/svg-style.mjs, .claude/skills/generate-figures/references/svg-authoring.md\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ svg-style: ${svgs(FIG_DIR).length} figure(s) checked, ${Object.keys(baseline).length} grandfathered.`);
