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
  readdirSync, statSync, existsSync, writeFileSync, mkdirSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkUnitVerdict } from './lib/unit-depth.mjs';
import { readManifest, figureStatusFor } from './lib/figure-manifest.mjs';

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

function buildReport() {
  const courses = [];
  if (!existsSync(DOCS_DIR)) {
    return { generated_at: new Date().toISOString(), courses };
  }

  for (const sem of dirs(DOCS_DIR)) {
    if (!/^semester-\d+$/.test(sem)) continue;
    const semDir = join(DOCS_DIR, sem);
    for (const courseFolder of dirs(semDir)) {
      const courseDir = join(semDir, courseFolder);
      const courseCode = courseFolder.toUpperCase();
      const units = [];

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
          figures,
          figures_pending,
        });
      }

      units.sort((a, b) => a.unit_no - b.unit_no);
      if (units.length > 0) {
        courses.push({ course_code: courseCode, units });
      }
    }
  }

  courses.sort((a, b) => a.course_code.localeCompare(b.course_code));
  return { generated_at: new Date().toISOString(), courses };
}

const report = buildReport();
mkdirSync(join(ROOT, 'static'), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(report, null, 2));
console.log(`✓ Wrote content status for ${report.courses.length} course(s) to static/content-status.json`);
