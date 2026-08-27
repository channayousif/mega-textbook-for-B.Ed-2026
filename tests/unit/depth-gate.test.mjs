/**
 * Fixture tests for scripts/check-unit-depth.mjs (Spec 007: T027 red-first suite, T028
 * implementation). Mirrors tests/unit/pipeline-gate.test.mjs — build a minimal in-scope unit
 * under a temp CONTENT_ROOT, mutate one thing per test, assert exit code + message.
 *
 * Depth-gate contract (spec.md FR-012, contracts/{coverage-matrix,sources-consulted,content-spec-v2}.md):
 *   in scope IFF the course content-spec's `## Unit N` subsection has a `### Sub-topic checklist`
 *   table. For an in-scope, non-coming_soon EN unit the gate fails unless:
 *     (a) coverage/unit-NN.md exists and every checklist ID has a row with non-blank File/Section/Source
 *     (b) index.mdx has BOTH `## Common misconceptions` and `## Further reading`
 *     (c) formative.mdx has >= 5 top-level numbered items
 *     (d) sum of the 5 EN files' est_reading_minutes is within the `**Depth budget**` A-B band
 *     (e) coverage <-> sources are mutually consistent
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-unit-depth.mjs');

function runGate(root) {
  const res = spawnSync('node', [GATE], {
    env: { ...process.env, CONTENT_ROOT: root },
    encoding: 'utf8',
  });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

const FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];
const DEFAULT_MINUTES = { 'index.mdx': 20, 'activities.mdx': 10, 'formative.mdx': 8, 'summative.mdx': 8, 'teacher-notes.mdx': 9 }; // sum 55

function fm(file, minutes, extra = '') {
  return [
    '---',
    `title: "${file}"`,
    'course_code: EFMP-302',
    'unit_no: 1',
    'clo_refs:',
    '  - "SLO:EFMP-302-1-1"',
    'blooms_summary: "x"',
    `est_reading_minutes: ${minutes}`,
    'translation_status: reviewed',
    extra,
    '---',
    '',
  ].filter((l) => l !== '').join('\n') + '\n';
}

const DEFAULT_INDEX_BODY = `# Understanding Teaching

## What a profession is

text (U1-01)

## Profession versus occupation

text (U1-02)

## Common misconceptions

- "a profession = a well-paid job"

## Further reading

- Carr, D. (2000). *Professionalism and ethics in teaching*. Routledge.
`;

const DEFAULT_FORMATIVE_BODY = `# Formative

1. Q one
2. Q two
3. Q three
4. Q four
5. Q five
`;

const DEFAULT_CHECKLIST = `### Sub-topic checklist

| ID | Guide ref | Sub-topic |
|---|---|---|
| U1-01 | 1.1 | Concept of a profession |
| U1-02 | 1.1 | Profession vs occupation |
`;

const DEFAULT_DEPTH_BUDGET = '**Depth budget**: 2 sub-topics; 45–70 reading-min';

const DEFAULT_COVERAGE = `| Sub-topic ID | File | Section | Source |
|---|---|---|---|
| U1-01 | index.mdx | What a profession is | carr2000 |
| U1-02 | index.mdx | Profession versus occupation | carr2000 |
`;

const DEFAULT_SOURCES = `| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| carr2000 | Carr, D. (2000). Professionalism and ethics in teaching. Routledge. | (print) | U1-01, U1-02 | guide-required |
`;

/**
 * opts:
 *   comingSoon           - set coming_soon: true on index.mdx
 *   omitChecklist        - content-spec has a `## Unit 1` section but no `### Sub-topic checklist`
 *   omitContentSpec      - no content-spec.md at all
 *   indexBody            - override index.mdx body
 *   formativeBody        - override formative.mdx body
 *   minutes              - override the {file: minutes} map
 *   coverageTable        - override the coverage table body (null => omit the file)
 *   sourcesTable         - override the sources table body (null => omit the file)
 *   depthBudget          - override the **Depth budget** line ('' => omit it)
 *   checklist            - override the checklist block
 */
function makeDepthFixture(opts = {}) {
  const root = mkdtempSync(join(tmpdir(), 'bed-depth-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(unitDir, { recursive: true });

  const minutes = opts.minutes || DEFAULT_MINUTES;
  for (const f of FILES) {
    let body;
    if (f === 'index.mdx') body = opts.indexBody ?? DEFAULT_INDEX_BODY;
    else if (f === 'formative.mdx') body = opts.formativeBody ?? DEFAULT_FORMATIVE_BODY;
    else body = `# ${f}\n\ntext\n`;
    const extra = f === 'index.mdx' && opts.comingSoon ? 'coming_soon: true' : '';
    writeFileSync(join(unitDir, f), fm(f, minutes[f], extra) + body);
  }

  if (!opts.omitContentSpec) {
    const courseDir = join(root, 'specs', 'content', 'efmp-302');
    mkdirSync(courseDir, { recursive: true });
    const checklist = opts.omitChecklist ? '' : (opts.checklist ?? DEFAULT_CHECKLIST);
    const budget = opts.depthBudget === '' ? '' : (opts.depthBudget ?? DEFAULT_DEPTH_BUDGET);
    writeFileSync(
      join(courseDir, 'content-spec.md'),
      `---\ncourse_code: EFMP-302\nstatus: approved\n---\n\n## Course-wide items\n\ntext\n\n## Unit 1: Understanding Teaching\n\nintro\n\n${checklist}\n\n${budget}\n\n## Unit 2: Next\n\ntext\n`,
    );

    if (opts.coverageTable !== null) {
      mkdirSync(join(courseDir, 'coverage'), { recursive: true });
      writeFileSync(join(courseDir, 'coverage', 'unit-01.md'), `# Coverage — Unit 1\n\n${opts.coverageTable ?? DEFAULT_COVERAGE}`);
    }
    if (opts.sourcesTable !== null) {
      mkdirSync(join(courseDir, 'sources'), { recursive: true });
      writeFileSync(join(courseDir, 'sources', 'unit-01.md'), `# Sources — Unit 1\n\n${opts.sourcesTable ?? DEFAULT_SOURCES}`);
    }
  }
  return root;
}

describe('check-unit-depth.mjs', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  // (a) happy path
  it('passes a fully valid in-scope unit', () => {
    root = makeDepthFixture();
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  // (b) out of scope — no checklist table
  it('skips a unit whose content-spec subsection has no `### Sub-topic checklist`', () => {
    root = makeDepthFixture({ omitChecklist: true, coverageTable: null, sourcesTable: null });
    expect(runGate(root).code).toBe(0);
  });

  it('skips a unit with no content-spec.md at all', () => {
    root = makeDepthFixture({ omitContentSpec: true });
    expect(runGate(root).code).toBe(0);
  });

  // (k) coming_soon
  it('skips a coming_soon unit', () => {
    root = makeDepthFixture({ comingSoon: true, coverageTable: null, sourcesTable: null, omitChecklist: true });
    expect(runGate(root).code).toBe(0);
  });

  // (c) missing coverage file
  it('fails when coverage/unit-01.md is missing', () => {
    root = makeDepthFixture({ coverageTable: null });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/coverage\/unit-01\.md/);
  });

  // (d) unmapped checklist ID
  it('fails and names the checklist ID that has no coverage row', () => {
    root = makeDepthFixture({
      coverageTable: `| Sub-topic ID | File | Section | Source |\n|---|---|---|---|\n| U1-01 | index.mdx | What a profession is | carr2000 |\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/U1-02/);
  });

  // (e) blank coverage cell
  it('fails on a coverage row with a blank Section', () => {
    root = makeDepthFixture({
      coverageTable: `| Sub-topic ID | File | Section | Source |\n|---|---|---|---|\n| U1-01 | index.mdx | What a profession is | carr2000 |\n| U1-02 | index.mdx |  | carr2000 |\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/U1-02/);
  });

  it('fails on a coverage row whose File is not one of the five folding-rule files', () => {
    root = makeDepthFixture({
      coverageTable: `| Sub-topic ID | File | Section | Source |\n|---|---|---|---|\n| U1-01 | index.mdx | What a profession is | carr2000 |\n| U1-02 | notes.md | Somewhere | carr2000 |\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/notes\.md/);
  });

  // (f) coverage Source with no sources Key
  it('fails when a coverage Source has no matching Key in sources/unit-01.md', () => {
    root = makeDepthFixture({
      coverageTable: `| Sub-topic ID | File | Section | Source |\n|---|---|---|---|\n| U1-01 | index.mdx | What a profession is | carr2000 |\n| U1-02 | index.mdx | Profession versus occupation | hargreaves2000 |\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/hargreaves2000/);
  });

  // (g) orphan sources Key
  it('fails when a non-no-external-source sources Key is unreferenced by the coverage matrix', () => {
    root = makeDepthFixture({
      sourcesTable: `| Key | Citation | URL/DOI | Supports | Kind |\n|---|---|---|---|---|\n| carr2000 | Carr, D. (2000). Routledge. | (print) | U1-01, U1-02 | guide-required |\n| unused2020 | Unused (2020). | (print) | nothing | guide-required |\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/unused2020/);
  });

  it('missing sources/unit-01.md fails', () => {
    root = makeDepthFixture({ sourcesTable: null });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/sources\/unit-01\.md/);
  });

  // (h1) misconceptions missing
  it('fails when index.mdx lacks `## Common misconceptions` (further reading present)', () => {
    root = makeDepthFixture({
      indexBody: `# Understanding Teaching\n\n## What a profession is\n\ntext (U1-01)\n\n## Profession versus occupation\n\ntext (U1-02)\n\n## Further reading\n\n- Carr (2000)\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/Common misconceptions/i);
  });

  // (h2) further reading missing
  it('fails when index.mdx lacks `## Further reading` (misconceptions present)', () => {
    root = makeDepthFixture({
      indexBody: `# Understanding Teaching\n\n## What a profession is\n\ntext (U1-01)\n\n## Profession versus occupation\n\ntext (U1-02)\n\n## Common misconceptions\n\n- x\n`,
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/Further reading/i);
  });

  // (i) formative < 5
  it('fails when formative.mdx has fewer than 5 numbered items', () => {
    root = makeDepthFixture({ formativeBody: `# Formative\n\n1. Q one\n2. Q two\n3. Q three\n4. Q four\n` });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/formative/i);
  });

  // (j) reading-minutes band
  it('fails when the unit-total est_reading_minutes is below the budget band', () => {
    root = makeDepthFixture({ minutes: { 'index.mdx': 5, 'activities.mdx': 5, 'formative.mdx': 5, 'summative.mdx': 5, 'teacher-notes.mdx': 5 } }); // sum 25 < 45
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/reading-min|reading minutes/i);
  });

  it('fails when the unit-total est_reading_minutes is above the budget band', () => {
    root = makeDepthFixture({ minutes: { 'index.mdx': 30, 'activities.mdx': 20, 'formative.mdx': 20, 'summative.mdx': 20, 'teacher-notes.mdx': 20 } }); // sum 110 > 70
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/reading-min|reading minutes/i);
  });

  it('fails when the in-scope unit has no `**Depth budget**` line', () => {
    root = makeDepthFixture({ depthBudget: '' });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/depth budget/i);
  });
});
