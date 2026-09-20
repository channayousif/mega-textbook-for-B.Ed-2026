/**
 * T026 [US4] — fixture-driven test for scripts/report-content-status.mjs, same
 * spawn-a-script-against-a-CONTENT_ROOT-temp-dir pattern as
 * figures-gate.test.mjs/depth-gate.test.mjs. Asserts: a course with no
 * `specs/content/<course>/figures/` manifest at all contributes zero figures
 * outstanding, not an error (US4 AS2); a unit whose figures are all `placed`
 * contributes nothing to `figures_pending` (US4 AS2); the emitted JSON's
 * per-course/unit record matches a hand-built fixture's authored/planned,
 * language-completion, and depth-check verdict (FR-031).
 */
import { describe, it, expect, afterEach } from 'vitest';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SCRIPT = join(REPO, 'scripts', 'report-content-status.mjs');

function runReport(root) {
  const res = spawnSync('node', [SCRIPT], {
    env: { ...process.env, CONTENT_ROOT: root },
    encoding: 'utf8',
  });
  const jsonPath = join(root, 'static', 'content-status.json');
  return {
    code: res.status,
    out: (res.stdout || '') + (res.stderr || ''),
    report: JSON.parse(readFileSync(jsonPath, 'utf8')),
  };
}

const LEGACY_FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];
const LEGACY_MINUTES = { 'index.mdx': 20, 'activities.mdx': 10, 'formative.mdx': 8, 'summative.mdx': 8, 'teacher-notes.mdx': 9 };

function fm(courseCode, unitNo, minutes, extra = '') {
  return [
    '---',
    'title: "x"',
    `course_code: ${courseCode}`,
    `unit_no: ${unitNo}`,
    'clo_refs:',
    '  - "SLO:X-1-1"',
    'blooms_summary: "x"',
    `est_reading_minutes: ${minutes}`,
    'translation_status: reviewed',
    extra,
    '---',
    '',
  ].filter((l) => l !== '').join('\n') + '\n';
}

const LEGACY_INDEX_BODY = `# Unit

## Topic A

text (U1-01)

## Common misconceptions

- none

## Further reading

- A source.
`;

const LEGACY_FORMATIVE_BODY = '# Formative\n\n1. a\n2. b\n3. c\n4. d\n5. e\n';

/** A fully valid, in-scope LEGACY-layout unit (mirrors depth-gate.test.mjs's happy path). */
function makeLegacyUnit(root, courseCode, unitNo) {
  const unitDir = join(root, 'docs', 'semester-1', courseCode.toLowerCase(), `unit-${String(unitNo).padStart(2, '0')}`);
  mkdirSync(unitDir, { recursive: true });
  for (const f of LEGACY_FILES) {
    const body = f === 'index.mdx' ? LEGACY_INDEX_BODY : f === 'formative.mdx' ? LEGACY_FORMATIVE_BODY : `# ${f}\n\ntext\n`;
    writeFileSync(join(unitDir, f), fm(courseCode, unitNo, LEGACY_MINUTES[f]) + body);
  }

  const courseDir = join(root, 'specs', 'content', courseCode.toLowerCase());
  mkdirSync(courseDir, { recursive: true });
  writeFileSync(
    join(courseDir, 'content-spec.md'),
    `---\ncourse_code: ${courseCode}\nstatus: approved\n---\n\n## Unit ${unitNo}: X\n\n` +
    `### Sub-topic checklist\n\n| ID | Guide ref | Sub-topic |\n|---|---|---|\n| U1-01 | 1.1 | Topic A |\n\n` +
    `**Depth budget**: 1 sub-topics; 45–70 reading-min\n`,
  );
  mkdirSync(join(courseDir, 'coverage'), { recursive: true });
  writeFileSync(
    join(courseDir, 'coverage', `unit-${String(unitNo).padStart(2, '0')}.md`),
    '| Sub-topic ID | File | Section | Source |\n|---|---|---|---|\n| U1-01 | index.mdx | Topic A | src1 |\n',
  );
  mkdirSync(join(courseDir, 'sources'), { recursive: true });
  writeFileSync(
    join(courseDir, 'sources', `unit-${String(unitNo).padStart(2, '0')}.md`),
    '## Unverifiable sources\n\n- src1: synthetic test fixture, no source text bound.\n\n'
      + '| Key | Citation | URL/DOI | Supports | Kind |\n|---|---|---|---|---|\n| src1 | A source. | (print) | U1-01 | guide-required |\n',
  );
  return unitDir;
}

function makeComingSoonUnit(root, courseCode, unitNo) {
  const unitDir = join(root, 'docs', 'semester-1', courseCode.toLowerCase(), `unit-${String(unitNo).padStart(2, '0')}`);
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(join(unitDir, 'index.mdx'), fm(courseCode, unitNo, 5, 'coming_soon: true') + '# Coming soon\n');
  return unitDir;
}

const marker = (id) => `{/* FIGURE[${id}]: clean flat vector diagram, labelled, high contrast; alt: A labelled diagram. */}`;
const TOPIC_HEADINGS = `
## A real classroom situation
vignette

## Explanation
text

## Activity: Try it
text

## Check your understanding
1. q1
2. q2
3. q3

## Summary
text

## Self-assessment checklist
- [ ] item 1
- [ ] item 2
- [ ] item 3

## Try this at your practicum school
text

## Summative task
text

## Further reading
- A source.
`;

/** A minimal topic-layout unit (not necessarily depth-gate-valid) carrying two placed figures. */
function makeTopicUnitWithPlacedFigures(root, courseCode, unitNo) {
  const unitDir = join(root, 'docs', 'semester-1', courseCode.toLowerCase(), `unit-${String(unitNo).padStart(2, '0')}`);
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(join(unitDir, 'index.mdx'), fm(courseCode, unitNo, 10) + '# Unit\n\n## In this unit\n\n1. t1\n2. t2\n');
  writeFileSync(join(unitDir, 'topic-01.mdx'), fm(courseCode, unitNo, 20, 'topic_no: 1\ntopic_label: "1.1"') + `# T1\n${TOPIC_HEADINGS}${marker('fig-U1-1')}\n`);
  writeFileSync(join(unitDir, 'topic-02.mdx'), fm(courseCode, unitNo, 20, 'topic_no: 2\ntopic_label: "1.2"') + `# T2\n${TOPIC_HEADINGS}${marker('fig-U1-2')}\n`);

  const figDir = join(root, 'specs', 'content', courseCode.toLowerCase(), 'figures');
  mkdirSync(figDir, { recursive: true });
  writeFileSync(
    join(figDir, `unit-${String(unitNo).padStart(2, '0')}.md`),
    '# Figures\n\n| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |\n|---|---|---|---|---|---|---|\n' +
    '| fig-U1-1 | 1.1 | diagram | clean flat vector diagram | A labelled diagram. | /img/f1.svg | placed |\n' +
    '| fig-U1-2 | 1.2 | diagram | clean flat vector diagram | A labelled diagram. | /img/f2.svg | placed |\n',
  );
  return unitDir;
}

function makeUnitWithNoFigureManifest(root, courseCode, unitNo) {
  const unitDir = join(root, 'docs', 'semester-1', courseCode.toLowerCase(), `unit-${String(unitNo).padStart(2, '0')}`);
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(join(unitDir, 'index.mdx'), fm(courseCode, unitNo, 10) + '# Unit\n\n## In this unit\n\n1. t1\n');
  writeFileSync(join(unitDir, 'topic-01.mdx'), fm(courseCode, unitNo, 20, 'topic_no: 1\ntopic_label: "1.1"') + `# T1\n${TOPIC_HEADINGS}${marker('fig-U1-1')}\n`);
  return unitDir;
}

describe('report-content-status.mjs', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  it('emits a per-course/unit record matching a fully valid legacy unit\'s authored/language/depth-check verdict', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeLegacyUnit(root, 'EFMP-302', 1);

    const { code, report } = runReport(root);
    expect(code).toBe(0);

    const course = report.courses.find((c) => c.course_code === 'EFMP-302');
    expect(course).toBeTruthy();
    const unit = course.units.find((u) => u.unit_no === 1);
    expect(unit).toEqual({
      unit_no: 1,
      authored: true,
      translation_status: 'reviewed',
      depth_check: 'pass',
      // Spec 017 T018 - all open, because this fixture has no tracker file.
      // Open is the safe direction: an untracked unit is work to do, not a
      // unit that quietly vanishes from a reviewer's queue. `publication` follows:
      // with no tracker there is no G2 evidence, so nothing is published (ADR-0026).
      gates: { G2: 'open', G3: 'open', G5: 'open' },
      publication: 'unpublished',
      figures: { prompt_only: 0, generated: 0, placed: 0 },
      figures_pending: [],
    });
  });

  // Spec 017 T018 - the queue's whole data source. A tracker row is 'done' only
  // when it is ticked AND attributed; an unattributed tick is not evidence that
  // anyone reviewed anything.
  it('derives per-unit G3/G5 gate state from the course tracker', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeLegacyUnit(root, 'EFMP-302', 1);
    const specDir = join(root, 'specs', 'content', 'efmp-302');
    mkdirSync(specDir, { recursive: true });
    writeFileSync(join(specDir, 'tasks.md'), [
      '| Unit | Stage | Status | Reviewer | Suggestion |',
      '|---|---|---|---|---|',
      '| Unit 1 | G3 en-review | \u2705 | MY | - |',
      '| Unit 1 | G5 ur-review | \u23f3 | | - |',
      '',
    ].join('\n'));

    const { report } = runReport(root);
    const unit = report.courses.find((c) => c.course_code === 'EFMP-302').units.find((u) => u.unit_no === 1);
    // G2 is reported now that publication rests on it rather than on G3 (ADR-0026).
    expect(unit.gates).toEqual({ G2: 'open', G3: 'done', G5: 'open' });
    // A certified G3 outranks a missing G2: the unit is certified, not unpublished.
    expect(unit.publication).toBe('certified');
  });

  it('treats a ticked but unattributed tracker row as still open', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeLegacyUnit(root, 'EFMP-302', 1);
    const specDir = join(root, 'specs', 'content', 'efmp-302');
    mkdirSync(specDir, { recursive: true });
    writeFileSync(join(specDir, 'tasks.md'), [
      '| Unit | Stage | Status | Reviewer | Suggestion |',
      '|---|---|---|---|---|',
      '| Unit 1 | G3 en-review | \u2705 | | - |',
      '',
    ].join('\n'));

    const { report } = runReport(root);
    const unit = report.courses.find((c) => c.course_code === 'EFMP-302').units.find((u) => u.unit_no === 1);
    expect(unit.gates.G3).toBe('open');
  });

  it('takes the LAST row for a stage, so a revision row re-opens a done gate', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeLegacyUnit(root, 'EFMP-302', 1);
    const specDir = join(root, 'specs', 'content', 'efmp-302');
    mkdirSync(specDir, { recursive: true });
    writeFileSync(join(specDir, 'tasks.md'), [
      '| Unit | Stage | Status | Reviewer | Suggestion |',
      '|---|---|---|---|---|',
      '| Unit 1 | G3 en-review | \u2705 | MY | - |',
      '| Unit 1 | G3 en-review (revision) | \u23f3 | | rework topic 1.2 |',
      '',
    ].join('\n'));

    const { report } = runReport(root);
    const unit = report.courses.find((c) => c.course_code === 'EFMP-302').units.find((u) => u.unit_no === 1);
    expect(unit.gates.G3).toBe('open');
  });

  it('marks a coming_soon unit as not authored, with depth_check not_applicable', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeComingSoonUnit(root, 'EFMP-303', 1);

    const { report } = runReport(root);
    const unit = report.courses.find((c) => c.course_code === 'EFMP-303').units.find((u) => u.unit_no === 1);
    expect(unit.authored).toBe(false);
    expect(unit.depth_check).toBe('not_applicable');
    expect(unit.figures).toEqual({ prompt_only: 0, generated: 0, placed: 0 });
    expect(unit.figures_pending).toEqual([]);
  });

  it('a unit whose figures are all placed contributes nothing to figures_pending (US4 AS2)', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeTopicUnitWithPlacedFigures(root, 'EFMP-304', 1);

    const { report } = runReport(root);
    const unit = report.courses.find((c) => c.course_code === 'EFMP-304').units.find((u) => u.unit_no === 1);
    expect(unit.authored).toBe(true);
    expect(unit.figures).toEqual({ prompt_only: 0, generated: 0, placed: 2 });
    expect(unit.figures_pending).toEqual([]);
  });

  it('a course with no figure manifest at all contributes zero figures outstanding, not an error (US4 AS2)', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeUnitWithNoFigureManifest(root, 'EFMP-305', 1);

    const { code, report } = runReport(root);
    expect(code).toBe(0);
    const unit = report.courses.find((c) => c.course_code === 'EFMP-305').units.find((u) => u.unit_no === 1);
    expect(unit.figures).toEqual({ prompt_only: 0, generated: 0, placed: 0 });
    expect(unit.figures_pending).toEqual([]);
  });

  it('writes a top-level generated_at timestamp', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-status-'));
    makeLegacyUnit(root, 'EFMP-302', 1);
    const { report } = runReport(root);
    expect(typeof report.generated_at).toBe('string');
    expect(Number.isNaN(Date.parse(report.generated_at))).toBe(false);
  });
});
