#!/usr/bin/env node
/**
 * Map provenance gate (ADR-0033).
 *
 * A map of real territory is built from sourced boundary data (Natural Earth, Pakistan point of
 * view, checked against the Survey of Pakistan) and signed off by the owner. It is never drawn
 * freehand or generated. This fails any rendered (`generated` / `placed`) `diagram` or
 * `illustration` manifest row that describes such a map but has no `Source:` note in its
 * Prompt cell.
 *
 * WHY A SEPARATE SCRIPT. check-figures.mjs is a hashed input of every unit's G2 and G3 evidence,
 * so editing it would make every review stale. This rule reads the same manifests through the
 * shared parser without touching any bound file.
 * It runs in CI through `npm test` (tests/unit/map-sources-gate.test.mjs), for the same reason.
 *
 *   node scripts/check-map-sources.mjs        (CONTENT_ROOT=<dir> for fixtures)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseManifest } from './lib/figure-manifest.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const SPEC_DIR = join(ROOT, 'specs', 'content');

// Only picture kinds can be maps; a "concept map" is a schematic, not geography.
const MAP_KINDS = new Set(['diagram', 'illustration']);
const GEO_MAP = /(?<!concept[ -])\b(?:map-style|maps? of|outline map|political map|physical map|relief map|map showing)\b/i;

const findings = [];
let rows = 0;
for (const course of existsSync(SPEC_DIR) ? readdirSync(SPEC_DIR).sort() : []) {
  const figDir = join(SPEC_DIR, course, 'figures');
  if (!existsSync(figDir)) continue;
  for (const file of readdirSync(figDir).filter((f) => /^unit-\d+\.md$/.test(f)).sort()) {
    for (const r of parseManifest(readFileSync(join(figDir, file), 'utf8')) ?? []) {
      rows += 1;
      if (r.status !== 'generated' && r.status !== 'placed') continue;
      if (!MAP_KINDS.has(r.kind) || !GEO_MAP.test(`${r.prompt} ${r.alt}`)) continue;
      if (/\bSource:/.test(r.prompt)) continue;
      findings.push(`specs/content/${course}/figures/${file}: figure "${r.id}" is a map of real territory but its Prompt cell has no "Source:" provenance`);
    }
  }
}

if (findings.length) {
  console.error(`✗ Map provenance gate failed with ${findings.length} finding(s):\n`);
  for (const f of findings) console.error(`  - ${f}`);
  console.error('\nMaps are built from sourced boundary data and signed off by the owner, never drawn freehand (ADR-0033).');
  process.exit(1);
}
console.log(`✓ Map provenance gate passed (${rows} manifest row(s) scanned; every rendered map names its source).`);
