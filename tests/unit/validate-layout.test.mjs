/**
 * Fixture tests for scripts/validate-content.mjs — Spec 008 per-topic layout branch
 * (T014 red-first, T021 implementation).
 *
 * Legacy five-file units keep validating exactly as before (covered by parity.test.mjs /
 * missing-metadata.test.mjs). These cases exercise the new-shape branch: required files,
 * contiguous topic ordinals, forbidden pooled files, topic_no/topic_label, and the optional
 * course-review.mdx front matter.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const VALIDATOR = join(REPO, 'scripts', 'validate-content.mjs');

function run(root) {
  const res = spawnSync('node', [VALIDATOR], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

function fm(extra = {}) {
  const base = {
    title: 'x',
    course_code: 'EFMP-302',
    unit_no: 1,
    clo_refs: ['SLO:EFMP-302-1-1'],
    blooms_summary: 'x',
    est_reading_minutes: 10,
    // Spec 013 FR-014 requires a description on every non-coming_soon page.
    description: 'A fixture unit used to exercise the content gates end to end, long enough to clear the length bound.',
    translation_status: 'draft',
    ...extra,
  };
  const lines = ['---'];
  for (const [k, v] of Object.entries(base)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const it of v) lines.push(`  - "${it}"`);
    } else if (typeof v === 'string') lines.push(`${k}: "${v}"`);
    else lines.push(`${k}: ${v}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

const BODY = '\n# Heading\n\n## A\n\ntext\n\n## B\n\ntext\n';

/**
 * opts:
 *   legacy            - build a legacy 5-file unit
 *   topicFiles        - topic filenames for the new-shape unit (default topic-01, topic-02)
 *   strayFile         - {name, content} written into the unit folder as well
 *   topic2Fm          - extra front matter merged into topic-02.mdx
 *   courseReviewFm    - if set, writes docs/semester-1/efmp-302/course-review.mdx with this fm
 */
function makeLayoutFixture(opts = {}) {
  const root = mkdtempSync(join(tmpdir(), 'bed-layout-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(unitDir, { recursive: true });

  if (opts.legacy) {
    for (const f of ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx']) {
      writeFileSync(join(unitDir, f), fm() + BODY);
    }
  } else {
    writeFileSync(join(unitDir, 'index.mdx'), fm() + BODY);
    writeFileSync(join(unitDir, 'unit-assessment.mdx'), fm() + BODY);
    const topicFiles = opts.topicFiles ?? ['topic-01.mdx', 'topic-02.mdx'];
    for (const tf of topicFiles) {
      const n = Number(/^topic-(\d{2})\.mdx$/.exec(tf)[1]);
      let extra = { topic_no: n, topic_label: `1.${n}` };
      if (tf === 'topic-02.mdx' && opts.topic2Fm) extra = { ...extra, ...opts.topic2Fm };
      writeFileSync(join(unitDir, tf), fm(extra) + BODY);
    }
  }

  if (opts.strayFile) {
    writeFileSync(join(unitDir, opts.strayFile.name), fm() + BODY);
  }

  if (opts.courseReviewFm) {
    const courseDir = join(root, 'docs', 'semester-1', 'efmp-302');
    const lines = ['---'];
    for (const [k, v] of Object.entries(opts.courseReviewFm)) {
      lines.push(typeof v === 'string' ? `${k}: "${v}"` : `${k}: ${v}`);
    }
    lines.push('---', '', '# Course review', '', '## Course summary', '', 'text', '');
    writeFileSync(join(courseDir, 'course-review.mdx'), lines.join('\n'));
  }

  return root;
}

describe('validate-content.mjs — per-topic layout', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  it('passes a legacy five-file unit', () => {
    root = makeLayoutFixture({ legacy: true });
    expect(run(root).code).toBe(0);
  });

  it('passes a minimal new-shape unit (index + topic-01 + topic-02 + unit-assessment)', () => {
    root = makeLayoutFixture();
    const { code, out } = run(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  it('fails and names the gap when topic ordinals are not contiguous from 01', () => {
    root = makeLayoutFixture({ topicFiles: ['topic-01.mdx', 'topic-03.mdx'] });
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/contiguous|topic-02\.mdx/);
  });

  it('fails when a pooled legacy file sits in a new-shape folder', () => {
    root = makeLayoutFixture({ strayFile: { name: 'formative.mdx' } });
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/formative\.mdx/);
  });

  it('fails when a topic file has topic_no != its filename ordinal', () => {
    root = makeLayoutFixture({ topic2Fm: { topic_no: 3 } });
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic_no/);
  });

  it('fails when a topic file has no topic_label', () => {
    root = makeLayoutFixture({ topic2Fm: { topic_label: '' } });
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic_label/);
  });

  it('fails when course-review.mdx has a course_code that does not match the folder', () => {
    root = makeLayoutFixture({ courseReviewFm: { title: 'Course review', course_code: 'EFMP-999' } });
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/course-review\.mdx/);
    expect(out).toMatch(/course_code|does not match/);
  });

  it('fails when course-review.mdx is missing its required course_code', () => {
    root = makeLayoutFixture({ courseReviewFm: { title: 'Course review' } });
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/course-review\.mdx/);
  });

  it('passes a valid course-review.mdx alongside a new-shape unit', () => {
    root = makeLayoutFixture({ courseReviewFm: { title: 'Course review', course_code: 'EFMP-302', sidebar_position: 900 } });
    expect(run(root).code).toBe(0);
  });
});
