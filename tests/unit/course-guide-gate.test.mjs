/**
 * validate-content.mjs: every B.Ed course overview must have a course-guide entry
 * whose PDF exists (D-2026-0070 item 3). Semester 3 shipped without one because
 * CourseGuideNotice silently renders nothing for an unlisted course.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const VALIDATOR = join(REPO, 'scripts', 'validate-content.mjs');
const roots = [];

function fixture({ entry, pdf, overviewIn = 'docs/semester-3/efmp-406' }) {
  const root = mkdtempSync(join(tmpdir(), 'guide-gate-'));
  roots.push(root);
  mkdirSync(join(root, overviewIn), { recursive: true });
  writeFileSync(join(root, overviewIn, 'course-overview.mdx'), '---\ntitle: x\n---\n');
  mkdirSync(join(root, 'catalog'), { recursive: true });
  const courses = entry ? { 'EFMP-406': { source: 'x.pdf', pages: [1, 2], pdf: 'guides/semester-3/efmp-406.pdf' } } : {};
  writeFileSync(join(root, 'catalog', 'course-guides.json'), JSON.stringify({ courses }));
  if (pdf) {
    mkdirSync(join(root, 'static', 'guides', 'semester-3'), { recursive: true });
    writeFileSync(join(root, 'static', 'guides', 'semester-3', 'efmp-406.pdf'), '%PDF-1.4');
  }
  return root;
}

function run(root) {
  const res = spawnSync('node', [VALIDATOR], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  return (res.stdout || '') + (res.stderr || '');
}

afterEach(() => { while (roots.length) rmSync(roots.pop(), { recursive: true, force: true }); });

describe('course guide gate', () => {
  it('fails a B.Ed overview with no course-guides.json entry', () => {
    expect(run(fixture({ entry: false }))).toMatch(/no entry for EFMP-406 in catalog\/course-guides\.json/);
  });

  it('fails when the entry points at a PDF that does not exist', () => {
    expect(run(fixture({ entry: true, pdf: false }))).toMatch(/static\/guides\/semester-3\/efmp-406\.pdf does not exist/);
  });

  it('passes the guide check when the entry and PDF both exist', () => {
    expect(run(fixture({ entry: true, pdf: true }))).not.toMatch(/course-guides\.json|does not exist/);
  });

  it('does not require a guide for licence-track courses', () => {
    expect(run(fixture({ entry: false, overviewIn: 'licence/eed-313' }))).not.toMatch(/course-guides\.json/);
  });
});
