#!/usr/bin/env node
/**
 * Content/figure status report (Spec 010, Story 4, FR-031-033).
 *
 * Walks `docs/` with the same `dirs()`/`topicFilesIn()` idiom every other content script
 * uses, and for every course/unit assembles a per-unit status record: authored vs.
 * planned, language-completion (`translation_status`), the depth-check verdict, and
 * figure counts by production state plus a "still pending" list - grouped by course,
 * unit, and topic (FR-031).
 *
 * FR-033: never re-derives the depth-check verdict or the figure-manifest parse - both
 * come from the exact same shared modules `check-unit-depth.mjs`/`check-figures.mjs`
 * themselves call (`scripts/lib/unit-depth.mjs`, `scripts/lib/figure-manifest.mjs`), so
 * this report can never drift from the gates.
 *
 * Writes `static/content-status.json` (same convention as `content-index.json`).
 * CONTENT_ROOT lets fixture tests point it at a temp dir.
 */
import {
  readdirSync, statSync, existsSync, readFileSync, writeFileSync, mkdirSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkUnitVerdict } from './lib/unit-depth.mjs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { walkCourses } from './lib/content-roots.mjs';
import { readManifest, figureStatusFor } from './lib/figure-manifest.mjs';
import { loadTracker, stageState, publicationState } from './lib/tracker-rows.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');
const OUT_FILE = join(ROOT, 'static', 'content-status.json');

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

/**
 * A course with no `specs/content/<course>/figures/` manifest at all for this unit
 * contributes zero figures outstanding and an empty pending list - never an error
 * (US4 AS2; figure-manifest.mjs's own `figureStatusFor(null)` already returns this).
 */
function figuresForUnit(courseCode, unitNo) {
  const pad = String(unitNo).padStart(2, '0');
  const manifestFile = join(CONTENT_SPEC_DIR, courseCode.toLowerCase(), 'figures', `unit-${pad}.md`);
  const rows = readManifest(manifestFile);
  const { counts, pending } = figureStatusFor(rows);
  return {
    figures: counts,
    figures_pending: pending.map((p) => ({
      course_code: courseCode, unit_no: unitNo, topic: p.topic, figure_id: p.figure_id,
    })),
  };
}

/**
 * Spec 017 T018 - per-unit G3/G5 state, read from the course tracker.
 *
 * This is what lets the review queue exist with NO database table behind it:
 * data-model.md §4 says queue state is derived, and this is where it is
 * derived. A course with no tracker file yields 'open' for both stages, which
 * is the safe direction - an un-tracked unit shows up as work to do rather
 * than silently disappearing from a reviewer's queue.
 */
function gatesForUnit(tracker, unitNo) {
  const unitLabel = `Unit ${unitNo}`;
  // G2 is reported because publication no longer waits on review (ADR-0026), so a
  // consumer must be able to see "the gates passed and nobody has reviewed it".
  if (!tracker) return { G2: 'open', G3: 'open', G5: 'open' };
  return {
    G2: stageState(tracker, unitLabel, 'G2'),
    G3: stageState(tracker, unitLabel, 'G3'),
    G5: stageState(tracker, unitLabel, 'G5'),
  };
}

function buildReport() {
  const courses = [];
  if (!existsSync(DOCS_DIR)) {
    return { generated_at: new Date().toISOString(), courses };
  }

  // Feature 015 FR-002: content-roots.mjs is the single definition of where
  // content lives, so this report covers every track rather than docs/ only.
  for (const { courseCode, courseDir } of walkCourses(ROOT)) {
    const units = [];
    const tracker = loadTracker(ROOT, courseCode);

      for (const unit of dirs(courseDir)) {
        const m = /^unit-(\d+)$/.exec(unit);
        if (!m) continue;
        const unitNo = Number(m[1]);
        const unitDir = join(courseDir, unit);

        const verdict = checkUnitVerdict({
          root: ROOT, contentSpecDir: CONTENT_SPEC_DIR, unitDir, courseCode, unitNo,
        });
        const { figures, figures_pending } = figuresForUnit(courseCode, unitNo);

        units.push({
          unit_no: unitNo,
          authored: verdict.authored,
          translation_status: verdict.translationStatus,
          depth_check: verdict.depthCheck,
          gates: gatesForUnit(tracker, unitNo),
          publication: tracker ? publicationState(tracker, `Unit ${unitNo}`) : 'unpublished',
          figures,
          figures_pending,
        });
      }

    units.sort((a, b) => a.unit_no - b.unit_no);
    if (units.length > 0) {
      courses.push({ course_code: courseCode, units });
    }
  }

  courses.sort((a, b) => a.course_code.localeCompare(b.course_code));
  return { generated_at: new Date().toISOString(), courses };
}

/**
 * Freshness fields (ADR-0026). The banner is now the only disclosure that a unit
 * is unreviewed, and `docusaurus.config.ts` reads THIS FILE to decide which
 * banners to render. A report generated two commits ago would therefore publish
 * today's units under yesterday's tiers, silently and with a green build.
 *
 * So the report records what it was generated from: the commit, and a digest of
 * every tracker it read. The config asserts those digests still match the files
 * on disk and refuses to build otherwise.
 */
function freshness() {
  let commit = null;
  try {
    commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    // Not a git checkout (the unit-test fixtures are not). Digests still bind.
  }
  const trackers = {};
  for (const course of walkCourses(ROOT)) {
    const path = join('specs', 'content', course.courseCode.toLowerCase(), 'tasks.md');
    if (!existsSync(join(ROOT, path))) continue;
    trackers[path] = createHash('sha256').update(readFileSync(join(ROOT, path))).digest('hex');
  }
  return { commit, trackers };
}

const report = { ...buildReport(), ...freshness() };
const serialized = `${JSON.stringify(report, null, 2)}\n`;

if (process.argv.includes('--check')) {
  // Recompute in memory and compare; write nothing. Same shape as
  // `figures:variants:check`. This is what makes the gate meaningful: a
  // committed report that no longer describes the tree fails CI.
  if (!existsSync(OUT_FILE)) {
    console.error('✗ static/content-status.json is missing. Run: npm run build:content-status');
    process.exit(1);
  }
  const onDisk = readFileSync(OUT_FILE, 'utf8');
  // `generated_at` and `commit` are PROVENANCE, not freshness. Comparing `commit`
  // made the report stale after every commit, including ones that touch no content
  // at all - which would have meant regenerating on each one and would quickly have
  // trained everybody to ignore the gate. What actually determines the publication
  // tiers is the tracker digests and the derived records, and those are compared.
  const strip = (text) => {
    const { generated_at, commit, ...rest } = JSON.parse(text);
    return JSON.stringify(rest);
  };
  if (strip(onDisk) !== strip(serialized)) {
    console.error('✗ static/content-status.json is stale - it no longer describes the working tree.');
    console.error('  Every publication banner is derived from this file, so a stale report');
    console.error('  publishes units under the wrong tier. Run: npm run build:content-status');
    process.exit(1);
  }
  console.log(`✓ Content status is current (${report.courses.length} course(s)).`);
} else {
  mkdirSync(join(ROOT, 'static'), { recursive: true });
  writeFileSync(OUT_FILE, serialized);
  console.log(`✓ Wrote content status for ${report.courses.length} course(s) to static/content-status.json`);
}
