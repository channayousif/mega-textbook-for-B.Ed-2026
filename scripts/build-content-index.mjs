#!/usr/bin/env node
/**
 * Content index for the assignment-creation picker (Spec 003, T034).
 *
 * No such index existed before this feature — Docusaurus's own
 * `useAllDocsData()`/`useDocById()` hooks only expose a fixed metadata shape
 * (title/permalink/id) and do NOT pass through custom front-matter keys like
 * `course_code`/`unit_no`, so they can't drive a "pick a unit item" UI.
 * Instead, this script walks `docs/` the same way `scripts/validate-content.mjs`
 * does (`dirs()` + `gray-matter`) and emits a flat JSON array to
 * `static/content-index.json`, which Docusaurus copies verbatim into the
 * build output — a page under `src/pages/app/*` can then `fetch(
 * '/content-index.json')` at runtime with no Docusaurus plugin API involved.
 *
 * LEGACY units contribute `activities.mdx`/`formative.mdx`/`summative.mdx` as the
 * three FR-004 unit-item kinds. `index.mdx` and `teacher-notes.mdx` are excluded.
 *
 * Spec 008 per-topic units (T023) instead contribute each `topic-NN.mdx`
 * (`kind: 'topic'`) and `unit-assessment.mdx` (`kind: 'assessment'`); at course
 * level, an optional `course-review.mdx` is indexed (`kind: 'course-review'`).
 *
 * Spec 010 (research.md R5): every `kind: 'topic'` record additionally carries
 * `self_assessment_count`, the number of `- [ ]` items under that topic's own
 * `## Self-assessment checklist` section - computed via the SHARED
 * `countChecklistInSection()` helper (scripts/lib/mdx-sections.mjs), the same
 * function `check-unit-depth.mjs` calls, so this can never drift from the gate's
 * own count (FR-033's "never re-derive" posture, applied here too). The Progress
 * area (Spec 010 FR-004) divides a student's distinct ticked positions by this
 * number to get a topic's completion fraction - it is not hand-maintained in
 * Postgres (Art. V.1). `null` for every non-topic record.
 */
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { walkCourses } from './lib/content-roots.mjs';
import { countChecklistInSection } from './lib/mdx-sections.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DOCS_DIR = join(REPO, 'docs');
const OUT_FILE = join(REPO, 'static', 'content-index.json');

/** kind (per AssignmentSourceKind) → source filename stem (legacy layout). */
const KIND_FILES = { activity: 'activities.mdx', formative: 'formative.mdx', summative: 'summative.mdx' };

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

const topicFilesIn = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => /^topic-\d{2}\.mdx$/.test(n)).sort() : [];

const records = [];

function push(semester, routePrefix, unitDir, filename, kind, filePath) {
  const parsed = matter(readFileSync(filePath, 'utf8'));
  const { data } = parsed;
  const self_assessment_count = kind === 'topic'
    ? (countChecklistInSection(
        parsed.content.split(/\r?\n/),
        /^##\s+Self-assessment checklist\s*$/,
      ) ?? 0)
    : null;
  records.push({
    semester,
    course_code: data.course_code,
    unit_no: data.unit_no,
    topic_no: kind === 'topic' ? (data.topic_no ?? null) : null,
    kind,
    title: data.title,
    coming_soon: Boolean(data.coming_soon),
    permalink: `${routePrefix}/${unitDir}/${filename.replace('.mdx', '')}`,
    self_assessment_count,
  });
}

// Feature 015 FR-002: content-roots.mjs is the single definition of where content
// lives. `routePrefix` comes from the course record rather than a literal
// semester directory, so a track with its own routeBasePath indexes correctly.
for (const course of walkCourses(REPO)) {
  const { ordinal: semester, trackDir, courseFolder, courseDir: coursePath } = course;
  const routePrefix = `/${[trackDir, courseFolder].filter(Boolean).join('/')}`;

  // course-level: optional course-review.mdx (Spec 008)
  const crPath = join(coursePath, 'course-review.mdx');
  if (existsSync(crPath)) {
    const { data } = matter(readFileSync(crPath, 'utf8'));
    records.push({
      semester,
      course_code: data.course_code,
      unit_no: null,
      topic_no: null,
      kind: 'course-review',
      title: data.title,
      coming_soon: Boolean(data.coming_soon),
      permalink: `${routePrefix}/course-review`,
      self_assessment_count: null,
    });
  }

  for (const unitDir of dirs(coursePath)) {
    const unitMatch = /^unit-(\d+)$/.exec(unitDir);
    if (!unitMatch) continue;
    const unitPath = join(coursePath, unitDir);
    const topicFiles = topicFilesIn(unitPath);

    if (topicFiles.length > 0) {
      // Spec 008 per-topic layout
      for (const tf of topicFiles) {
        push(semester, routePrefix, unitDir, tf, 'topic', join(unitPath, tf));
      }
      const uaPath = join(unitPath, 'unit-assessment.mdx');
      if (existsSync(uaPath)) {
        push(semester, routePrefix, unitDir, 'unit-assessment.mdx', 'assessment', uaPath);
      }
      continue;
    }

    // legacy layout
    for (const [kind, filename] of Object.entries(KIND_FILES)) {
      const filePath = join(unitPath, filename);
      if (!existsSync(filePath)) continue;
      push(semester, routePrefix, unitDir, filename, kind, filePath);
    }
  }
}

mkdirSync(join(REPO, 'static'), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(records, null, 2));
console.log(`✓ Wrote ${records.length} content-index records to static/content-index.json`);

// Spec 010, T038 (FR-029) - a public, read-only copy of the catalog, the same
// static/*.json convention as content-index.json above. The curriculum-owner
// console's catalog-edit form reads this copy and only ever produces a
// downloadable replacement file - it never writes catalog content to Postgres.
const CATALOG_FILE = join(REPO, 'catalog', 'courses.json');
if (existsSync(CATALOG_FILE)) {
  const CATALOG_OUT_FILE = join(REPO, 'static', 'catalog-courses.json');
  writeFileSync(CATALOG_OUT_FILE, readFileSync(CATALOG_FILE, 'utf8'));
  console.log('✓ Copied catalog/courses.json to static/catalog-courses.json');
}
