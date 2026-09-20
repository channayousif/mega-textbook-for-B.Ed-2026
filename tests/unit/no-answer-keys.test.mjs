/**
 * Fixture tests for scripts/check-no-answer-keys.mjs — Spec 008 bounded `## Answers and
 * marking guidance` exception (T016 red-first, T022 implementation).
 *
 * Contract: end-of-unit-assessment.md / end-of-course-review.md. The three PROSE markers are
 * allowed only inside ONE canonical, final `## Answers and marking guidance` section of a file
 * named unit-assessment.mdx / course-review.mdx. The four front-matter key patterns stay
 * forbidden everywhere. Legacy files are scanned exactly as before.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-no-answer-keys.mjs');

function run(root) {
  const res = spawnSync('node', [GATE], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

const FM = '---\ntitle: "x"\ncourse_code: EFMP-302\nunit_no: 1\n---\n';

/** Write one file under docs/semester-1/efmp-302/unit-01/ and run the gate. */
function withFile(name, contents) {
  const root = mkdtempSync(join(tmpdir(), 'bed-nak-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(join(unitDir, name), contents);
  return root;
}

describe('check-no-answer-keys.mjs — bounded answers exception', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  it('fails on "correct answer" prose in a topic file', () => {
    root = withFile('topic-01.mdx', FM + '\n# Topic\n\nThe correct answer is B.\n');
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-01\.mdx/);
  });

  it('passes "correct answer" prose inside the bounded block of unit-assessment.mdx', () => {
    root = withFile(
      'unit-assessment.mdx',
      FM + '\n# Assessment\n\n## Summative assessment\n\n1. Question.\n\n## Answers and marking guidance\n\n1. B — the correct answer, because …\n',
    );
    expect(run(root).code).toBe(0);
  });

  it('fails when a "## " section follows the bounded block', () => {
    root = withFile(
      'unit-assessment.mdx',
      FM + '\n# Assessment\n\n## Answers and marking guidance\n\n1. B — correct answer.\n\n## Notes\n\nmore\n',
    );
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/final section|## /);
  });

  it('fails on an answer_key: front-matter key even in unit-assessment.mdx', () => {
    root = withFile(
      'unit-assessment.mdx',
      '---\ntitle: "x"\nanswer_key: [B, C]\n---\n\n# Assessment\n\n## Answers and marking guidance\n\ntext\n',
    );
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/answer_key/);
  });

  it('does not open the exception for "## Answers and marking guidance (teachers)"', () => {
    root = withFile(
      'unit-assessment.mdx',
      FM + '\n# Assessment\n\n## Answers and marking guidance (teachers)\n\n1. B — the correct answer.\n',
    );
    const { code } = run(root);
    expect(code).toBe(1);
  });

  it('fails when a file has two canonical answers headings', () => {
    root = withFile(
      'unit-assessment.mdx',
      FM + '\n# Assessment\n\n## Answers and marking guidance\n\ntext\n\n## Answers and marking guidance\n\nmore\n',
    );
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/at most one|2 "## Answers/);
  });

  it('passes a course-review.mdx bounded block', () => {
    const rootDir = mkdtempSync(join(tmpdir(), 'bed-nak-'));
    const courseDir = join(rootDir, 'docs', 'semester-1', 'efmp-302');
    mkdirSync(courseDir, { recursive: true });
    writeFileSync(
      join(courseDir, 'course-review.mdx'),
      FM + '\n# Course review\n\n## Practice questions\n\n1. Q.\n\n## Answers and marking guidance\n\n1. B — the correct answer.\n',
    );
    root = rootDir;
    expect(run(root).code).toBe(0);
  });

  it('fails on "marking scheme" in a legacy summative.mdx (unchanged behaviour)', () => {
    root = withFile('summative.mdx', FM + '\n# Summative\n\nSee the marking scheme below.\n');
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/summative\.mdx/);
  });

  // The review-evidence exclusion is scoped to `specs/content/<course>/reviews/`, which is
  // unpublished G3/G5 evidence that necessarily quotes the forbidden phrases. A directory
  // that merely shares the name `reviews` elsewhere is ordinary content and stays scanned.
  it('skips specs/content/<course>/reviews/, which holds unpublished review evidence', () => {
    const rootDir = mkdtempSync(join(tmpdir(), 'bed-nak-'));
    const evidenceDir = join(rootDir, 'specs', 'content', 'efmp-302', 'reviews', 'unit-01');
    mkdirSync(evidenceDir, { recursive: true });
    writeFileSync(join(evidenceDir, 'summary.md'), '# G3\n\nThe answer key lists B as correct.\n');
    root = rootDir;
    expect(run(root).code).toBe(0);
  });

  it('still scans a reviews/ directory under a published content root', () => {
    const rootDir = mkdtempSync(join(tmpdir(), 'bed-nak-'));
    const dir = join(rootDir, 'docs', 'semester-1', 'efmp-302', 'reviews');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'notes.mdx'), FM + '\n# Notes\n\nThe correct answer is B.\n');
    root = rootDir;
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/notes\.mdx/);
  });
});
