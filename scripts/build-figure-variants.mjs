#!/usr/bin/env node
/**
 * Derives each figure's dark variant from its authored light source
 * (Spec 013, D3 / FR-009).
 *
 * Usage:
 *   node scripts/build-figure-variants.mjs           write <fig>.dark.svg
 *   node scripts/build-figure-variants.mjs --check   fail if any is stale
 *
 * WHY DERIVED AND NOT AUTHORED. Colour lives in exactly one `:root{...}` block
 * per file, so the light -> dark transform is a single deterministic block
 * swap. Hand-maintaining a second copy of every figure would reintroduce
 * precisely the drift this spec exists to remove.
 *
 * WHY COMMITTED AND NOT PREBUILT. The repo does gitignore its generated JSON
 * indexes, but those degrade a feature when missing; a missing `.dark.svg` is a
 * broken-image icon on every figure in dark mode. CI also runs `check:figures`
 * BEFORE `npm run build`, so a prebuild artifact could never be gated. `--check`
 * gives the same anti-drift guarantee as generating, plus a reviewable diff.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { LIGHT_TOKENS, DARK_TOKENS, rootBlock } from './lib/figure-palette.mjs';

const ROOT = process.env.FIGURE_ROOT || 'static/img/figures';
const LIGHT_ROOT = rootBlock(LIGHT_TOKENS);
const DARK_ROOT = rootBlock(DARK_TOKENS);

/** Every authored source: a .svg that is neither a .dark.svg nor generated. */
function sources(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) sources(p, acc);
    else if (entry.name.endsWith('.svg') && !entry.name.endsWith('.dark.svg')) acc.push(p);
  }
  return acc;
}

/** The transform. Deliberately the narrowest possible edit. */
export function deriveDark(svg) {
  if (!svg.includes(LIGHT_ROOT)) return null;
  return svg.split(LIGHT_ROOT).join(DARK_ROOT);
}

const check = process.argv.includes('--check');
const files = sources(ROOT);
let stale = 0;
let missingRoot = 0;
let written = 0;

for (const src of files) {
  const svg = readFileSync(src, 'utf8');
  const dark = deriveDark(svg);
  if (dark === null) {
    // Not yet migrated to tokens. check-figures.mjs is what reports this as an
    // error; here it is only a reason to skip, so a partial migration can still
    // regenerate the files that ARE ready.
    missingRoot += 1;
    continue;
  }
  const out = src.replace(/\.svg$/, '.dark.svg');
  const current = existsSync(out) ? readFileSync(out, 'utf8') : null;
  if (current === dark) continue;
  if (check) {
    console.error(`stale or missing: ${relative(process.cwd(), out)}`);
    stale += 1;
  } else {
    writeFileSync(out, dark);
    written += 1;
  }
}

if (check) {
  if (stale) {
    console.error(`\n${stale} dark variant(s) out of date. Run: npm run figures:variants`);
    process.exit(1);
  }
  console.log(`figures:variants --check OK (${files.length - missingRoot} figure(s))`);
} else {
  console.log(`Wrote ${written} dark variant(s); ${files.length - missingRoot} source(s) scanned.`);
}
if (missingRoot) console.log(`${missingRoot} source(s) have no token :root block yet and were skipped.`);
