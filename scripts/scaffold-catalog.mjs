#!/usr/bin/env node
/**
 * Scaffold the 8-semester catalog from catalog/courses.json (T035, FR-014, SC-005).
 *
 * For every semester and course it generates:
 *   docs/semester-{n}/                         _category_.json
 *   docs/semester-{n}/<code>/                   _category_.json + course-overview.mdx (stub)
 *   docs/semester-{n}/<code>/unit-01/           five placeholder files (coming_soon: true)
 *
 * Idempotent: never overwrites an existing file (so authored content is safe).
 * Adding a course = one entry in courses.json + re-run — no platform code change (SC-006).
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DOCS = join(REPO, 'docs');
const catalog = JSON.parse(readFileSync(join(REPO, 'catalog', 'courses.json'), 'utf8'));

const UNIT_FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];
const SECTION = {
  'index.mdx': 'Content',
  'activities.mdx': 'Activities',
  'formative.mdx': 'Formative',
  'summative.mdx': 'Summative',
  'teacher-notes.mdx': 'Teacher Notes',
};
let created = 0;

// Explicit noindex for un-authored placeholder pages (T026, FR-006/SC-005): keeps them in
// the sidebar but out of the search index. In-content <Head> is emitted into the built HTML,
// which @easyops-cn/docusaurus-search-local honors (parse.js skips robots=noindex pages).
const NOINDEX = ["import Head from '@docusaurus/Head';", '', '<Head>', '  <meta name="robots" content="noindex" />', '</Head>', ''].join('\n');

const write = (path, content) => {
  if (existsSync(path)) return;
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, content);
  created++;
};

const placeholderFrontMatter = (course, file) =>
  [
    '---',
    `title: "${course.title_en} — Unit 1 · ${SECTION[file]} (coming soon)"`,
    `course_code: ${course.code}`,
    'unit_no: 1',
    `clo_refs:\n  - "SLO:${course.code}-1-1"`,
    'blooms_summary: "To be authored."',
    'est_reading_minutes: 1',
    'translation_status: draft',
    'coming_soon: true',
    '---',
    '',
    NOINDEX,
    `# ${course.title_en} — Unit 1 (${SECTION[file]})`,
    '',
    ':::info Coming soon',
    'This unit has not been authored yet. It is scaffolded so navigation has no dead ends.',
    ':::',
    '',
  ].join('\n');

for (const sem of catalog.semesters) {
  const semDir = join(DOCS, `semester-${sem.number}`);
  write(join(semDir, '_category_.json'), JSON.stringify({ label: `Semester ${sem.number}`, position: sem.number, collapsed: true }, null, 2) + '\n');

  sem.courses.forEach((course, i) => {
    const courseDir = join(semDir, course.code.toLowerCase());
    write(
      join(courseDir, '_category_.json'),
      JSON.stringify({ label: `${course.code} · ${course.title_en}`, position: i + 1, collapsed: true, customProps: { course_code: course.code } }, null, 2) + '\n',
    );
    write(
      join(courseDir, 'course-overview.mdx'),
      [
        '---',
        `title: "${course.title_en} — Course Overview"`,
        `course_code: ${course.code}`,
        `credit_hours: "${course.credit_hours}"`,
        `category: "${course.category}"`,
        '---',
        '',
        NOINDEX,
        `# ${course.title_en} — Course Overview`,
        '',
        ':::info Coming soon',
        'Course overview to be authored from the course guide.',
        ':::',
        '',
      ].join('\n'),
    );
    const unitDir = join(courseDir, 'unit-01');
    // Label must be unique across the whole sidebar or Docusaurus i18n produces duplicate
    // translation keys — hence the course code prefix.
    write(join(unitDir, '_category_.json'), JSON.stringify({ label: `${course.code} · Unit 1 (coming soon)`, position: 1 }, null, 2) + '\n');
    for (const f of UNIT_FILES) write(join(unitDir, f), placeholderFrontMatter(course, f));
  });
}

console.log(`✓ Scaffold complete — ${created} file(s) created (existing files left untouched).`);
