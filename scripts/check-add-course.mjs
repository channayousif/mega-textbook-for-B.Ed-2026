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
// Feature 015: the same guarantee must hold for every content track, not just
// the pre-service one. A track whose second course needed a platform edit would
// break Article V.4 while this gate went on passing.
const LICENCE_CODE = 'ZZZ-997';
const LICENCE_COURSE = join(ROOT, 'licence', LICENCE_CODE.toLowerCase());
const LICENCE_UNIT = join(LICENCE_COURSE, 'unit-01');
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
  scaffold(LICENCE_COURSE, LICENCE_UNIT, LICENCE_CODE);

  // Validator must accept both new courses with no code change.
  const v = spawnSync('node', [join(ROOT, 'scripts', 'validate-content.mjs')], { cwd: ROOT, encoding: 'utf8' });
  if (v.status !== 0) {
    console.error('✗ Validator rejected a valid new course (pre-service or licence track):\n' + (v.stdout || '') + (v.stderr || ''));
    failed = true;
  }

  const after = gitStatus(guarded);
  if (after !== before) {
    console.error('✗ Adding a course changed guarded platform files (must be content-only):\n' + after);
    failed = true;
  }
} finally {
  rmSync(COURSE, { recursive: true, force: true });
  rmSync(LICENCE_COURSE, { recursive: true, force: true });
}

if (failed) process.exit(1);
console.log('✓ Adding a course is content-only in every track - validator accepts a new pre-service and a new licence course, and no src/ or config files changed (SC-006, Feature 015 R4).');
