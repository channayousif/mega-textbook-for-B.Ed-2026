#!/usr/bin/env node
/**
 * Content depth gate for the authoring pipeline (Spec 007 T028; Spec 008 T020).
 *
 * In scope for every non-`coming_soon` EN unit under docs/ **whose course content-spec
 * `## Unit N` subsection carries a `### Sub-topic checklist` table** — a unit without that
 * table is out of scope and skipped (grandfathers EFMP-301 and any not-yet-migrated unit).
 *
 * For an in-scope unit the gate picks a layout:
 *
 *   LEGACY (Spec 007) — no `topic-*.mdx` files AND no `### Topic list` table. The five checks
 *   below run **byte-for-byte** as in Spec 007:
 *     (a) coverage/unit-NN.md exists; every checklist ID has a row with non-blank
 *         File (one of the five folding-rule files) / Section / Source;
 *     (b) index.mdx has BOTH `## Common misconceptions` AND `## Further reading`;
 *     (c) formative.mdx has >= 5 top-level numbered list items;
 *     (d) sum of the five EN files' `est_reading_minutes` is within the `**Depth budget**` band;
 *     (e) coverage matrix and sources/unit-NN.md are mutually consistent.
 *
 *   TOPIC / new-shape (Spec 008) — `topic-*.mdx` files AND a `### Topic list` table (exactly
 *   one signal present, or a row-count mismatch, is a LOUD failure, never a silent fallback).
 *   The ten checks of FR-020 run (see checkTopic()).
 *
 * Every failure pushes a per-unit message naming the unmet condition and the file (SC-004).
 * Pure Node + gray-matter, no new dependency. CONTENT_ROOT lets fixture tests point it at a
 * temp dir (same convention as check-pipeline-gate.mjs).
 */
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkUnitVerdict } from './lib/unit-depth.mjs';
import { walkUnits } from './lib/content-roots.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');

const errors = [];
const err = (label, msg) => errors.push(`${label}: ${msg}`);

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

// ---- per-unit dispatch ------------------------------------------------------
function checkUnit({ unitDir, courseCode, unitNo }) {
  const verdict = checkUnitVerdict({ root: ROOT, contentSpecDir: CONTENT_SPEC_DIR, unitDir, courseCode, unitNo });
  if (verdict.depthCheck === 'not_applicable') return; // out of scope, coming_soon, or no index.mdx yet

  const label = `${courseCode} Unit ${unitNo} (${relative(ROOT, unitDir)})`;
  for (const msg of verdict.errors) err(label, msg);
}

// ---- walk every content track (Feature 015 FR-002) --------------------------
// Was a local docs/ walk with its own grouping-directory pattern; content-roots.mjs
// is now the single
// definition of where content lives, so a new track is covered automatically.
function walk() {
  if (!existsSync(DOCS_DIR)) {
    console.error('check-unit-depth: docs/ not found — nothing to check.');
    return;
  }
  for (const { unitDir, courseCode, unitNo } of walkUnits(ROOT)) {
    checkUnit({ unitDir, courseCode, unitNo });
  }
}

walk();

if (errors.length) {
  console.error(`\n✗ Depth gate failed with ${errors.length} finding(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
} else {
  console.log('✓ Depth gate passed (concept coverage, required blocks, formative floor, reading-minutes band, coverage↔sources consistency).');
}
