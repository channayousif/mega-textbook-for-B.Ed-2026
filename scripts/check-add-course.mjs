#!/usr/bin/env node
/**
 * T034 (FR-005, SC-006): adding a course must be a content-only change — new folders +
 * metadata, zero platform-code edits. This check adds a throwaway course, runs the content
 * validator, asserts that nothing under src/ or the config files changed, then cleans up.
 * Browser-free, so it runs anywhere (unlike the Playwright specs).
 */
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const CODE = 'ZZZ-999';
const COURSE = join(ROOT, 'docs', 'semester-8', CODE.toLowerCase());
const UNIT = join(COURSE, 'unit-01');
// Feature 024: the licence track no longer holds courses (it is a code-free STEDA
// topic list, gated by check-licence.mjs), so only the course-shaped track is
// exercised here. Feature 015 had a second, licence-course fixture.
const UNIT_FILES = ['index', 'activities', 'formative', 'summative', 'teacher-notes'];
const guarded = ['src', 'docusaurus.config.ts', 'sidebars.ts', 'sidebars-licence.ts', 'tsconfig.json'];

const unitFrontMatter = (code, f) =>
  `---\ntitle: "Check ${f}"\ncourse_code: ${code}\nunit_no: 1\nclo_refs:\n  - "SLO:${code}-1-1"\nblooms_summary: "n/a"\nest_reading_minutes: 1\ntranslation_status: draft\ncoming_soon: true\n---\n\n# Check\n`;

function scaffold(courseDir, unitDir, code) {
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(
    join(courseDir, '_category_.json'),
    JSON.stringify({ label: `${code} · Check`, position: 99, customProps: { course_code: code } }, null, 2),
  );
  for (const f of UNIT_FILES) writeFileSync(join(unitDir, `${f}.mdx`), unitFrontMatter(code, f));
}

function gitStatus(paths) {
  return execFileSync('git', ['status', '--porcelain', '--', ...paths], { cwd: ROOT, encoding: 'utf8' }).trim();
}

const before = gitStatus(guarded);
let failed = false;
try {
  scaffold(COURSE, UNIT, CODE);

  // Validator must accept both new courses with no code change.
  const v = spawnSync('node', [join(ROOT, 'scripts', 'validate-content.mjs')], { cwd: ROOT, encoding: 'utf8' });
  if (v.status !== 0) {
    console.error('✗ Validator rejected a valid new course (pre-service track):\n' + (v.stdout || '') + (v.stderr || ''));
    failed = true;
  }

  const after = gitStatus(guarded);
  if (after !== before) {
    console.error('✗ Adding a course changed guarded platform files (must be content-only):\n' + after);
    failed = true;
  }
} finally {
  rmSync(COURSE, { recursive: true, force: true });
}

if (failed) process.exit(1);
console.log('✓ Adding a course is content-only - validator accepts a new pre-service course, and no src/ or config files changed (SC-006; licence track is course-free since Feature 024).');
