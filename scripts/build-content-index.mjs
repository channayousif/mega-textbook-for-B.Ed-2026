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
 */
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

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

function push(semester, semesterDir, courseDir, unitDir, filename, kind, filePath) {
  const { data } = matter(readFileSync(filePath, 'utf8'));
  records.push({
    semester,
    course_code: data.course_code,
    unit_no: data.unit_no,
    kind,
    title: data.title,
    coming_soon: Boolean(data.coming_soon),
    permalink: `/${semesterDir}/${courseDir}/${unitDir}/${filename.replace('.mdx', '')}`,
  });
}

for (const semesterDir of dirs(DOCS_DIR)) {
  const semesterMatch = /^semester-(\d+)$/.exec(semesterDir);
  if (!semesterMatch) continue;
  const semester = Number(semesterMatch[1]);
  const semesterPath = join(DOCS_DIR, semesterDir);

  for (const courseDir of dirs(semesterPath)) {
    const coursePath = join(semesterPath, courseDir);

    // course-level: optional course-review.mdx (Spec 008)
    const crPath = join(coursePath, 'course-review.mdx');
    if (existsSync(crPath)) {
      const { data } = matter(readFileSync(crPath, 'utf8'));
      records.push({
        semester,
        course_code: data.course_code,
        unit_no: null,
        kind: 'course-review',
        title: data.title,
        coming_soon: Boolean(data.coming_soon),
        permalink: `/${semesterDir}/${courseDir}/course-review`,
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
          push(semester, semesterDir, courseDir, unitDir, tf, 'topic', join(unitPath, tf));
        }
        const uaPath = join(unitPath, 'unit-assessment.mdx');
        if (existsSync(uaPath)) {
          push(semester, semesterDir, courseDir, unitDir, 'unit-assessment.mdx', 'assessment', uaPath);
        }
        continue;
      }

      // legacy layout
      for (const [kind, filename] of Object.entries(KIND_FILES)) {
        const filePath = join(unitPath, filename);
        if (!existsSync(filePath)) continue;
        push(semester, semesterDir, courseDir, unitDir, filename, kind, filePath);
      }
    }
  }
}

mkdirSync(join(REPO, 'static'), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(records, null, 2));
console.log(`✓ Wrote ${records.length} content-index records to static/content-index.json`);
