/**
 * Fixture tests for scripts/check-bloom-bands.mjs.
 *
 * The gate shipped without tests and a cloud review found why that mattered: its
 * item splitter terminated on `(?=^\d+\.|\Z)`, and JavaScript has no `\Z` anchor -
 * it is an Annex-B identity escape matching a literal capital Z. The last item of
 * every bank section therefore never satisfied the lookahead and was dropped, so
 * MCQ 10, RRQ 10 and ERQ 5 went unchecked in every unit while the gate reported a
 * pass. The first test below is that bug.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-bloom-bands.mjs');

function run(root) {
  const res = spawnSync('node', [GATE], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

const SPEC = (band) => `---
course_code: EFMP-999
status: approved
---

# Spec

## Unit 1: Fixture

- **Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply
  - RRQs (10): ${band}
  - ERQs (5): Analyze to Evaluate/Create
`;

/** Build a fixture course with one unit whose RRQ list is `items`. */
function fixture(items, band = 'Understand to Analyze') {
  const root = mkdtempSync(join(tmpdir(), 'bed-bloom-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-999', 'unit-01');
  mkdirSync(unitDir, { recursive: true });
  writeFileSync(join(unitDir, 'index.mdx'), '---\ntitle: "u"\n---\n\n# Unit\n');
  const body = items.map((lvl, i) => `${i + 1}. Question ${i + 1}. *(${lvl})*`).join('\n');
  writeFileSync(join(unitDir, 'unit-assessment.mdx'),
    `---\ntitle: "a"\ncourse_code: EFMP-999\nunit_no: 1\n---\n\n## Summative assessment\n\n### Restricted-response questions (RRQs)\n\n${body}\n\n## Answers and marking guidance\n\n### RRQ model answers\n\n1. x\n`);
  const specDir = join(root, 'specs', 'content', 'efmp-999');
  mkdirSync(specDir, { recursive: true });
  writeFileSync(join(specDir, 'content-spec.md'), SPEC(band));
  return root;
}

describe('check-bloom-bands.mjs', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  // The regression. A violation in the FINAL item must be caught; the `\Z` splitter
  // dropped it and the gate exited 0.
  it('checks the last item of a section, not just the ones before it', () => {
    root = fixture(['Understand', 'Understand', 'Remember']);
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/RRQ 3 is \(Remember\), below the spec's Understand to Analyze floor/);
  });

  it('passes when every tag sits inside the declared band', () => {
    root = fixture(['Understand', 'Analyze', 'Understand']);
    const { code, out } = run(root);
    expect(code).toBe(0);
    expect(out).toMatch(/3 items checked/);
  });

  it('fails an item above the declared ceiling', () => {
    root = fixture(['Understand', 'Evaluate']);
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/RRQ 2 is \(Evaluate\), above the spec's Understand to Analyze ceiling/);
  });

  it('honours a band the unit spec sets deliberately, rather than a house default', () => {
    // Same items that fail above, against a spec that declares the wider band.
    root = fixture(['Understand', 'Understand', 'Remember'], 'Remember to Analyze');
    expect(run(root).code).toBe(0);
  });

  it('accepts a compound tag when every level it names is inside the band', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-bloom-'));
    const unitDir = join(root, 'docs', 'semester-1', 'efmp-999', 'unit-01');
    mkdirSync(unitDir, { recursive: true });
    writeFileSync(join(unitDir, 'index.mdx'), '---\ntitle: "u"\n---\n\n# Unit\n');
    writeFileSync(join(unitDir, 'unit-assessment.mdx'),
      '---\ntitle: "a"\ncourse_code: EFMP-999\nunit_no: 1\n---\n\n### Extended-response questions (ERQs)\n\n1. Q. *(Analyze / Create)*\n');
    const specDir = join(root, 'specs', 'content', 'efmp-999');
    mkdirSync(specDir, { recursive: true });
    writeFileSync(join(specDir, 'content-spec.md'), SPEC('Understand to Analyze'));
    expect(run(root).code).toBe(0);
  });

  it('fails an item carrying no Bloom tag at all', () => {
    root = mkdtempSync(join(tmpdir(), 'bed-bloom-'));
    const unitDir = join(root, 'docs', 'semester-1', 'efmp-999', 'unit-01');
    mkdirSync(unitDir, { recursive: true });
    writeFileSync(join(unitDir, 'index.mdx'), '---\ntitle: "u"\n---\n\n# Unit\n');
    writeFileSync(join(unitDir, 'unit-assessment.mdx'),
      '---\ntitle: "a"\ncourse_code: EFMP-999\nunit_no: 1\n---\n\n### Restricted-response questions (RRQs)\n\n1. Q one. *(Understand)*\n2. Q two, untagged.\n');
    const specDir = join(root, 'specs', 'content', 'efmp-999');
    mkdirSync(specDir, { recursive: true });
    writeFileSync(join(specDir, 'content-spec.md'), SPEC('Understand to Analyze'));
    const { code, out } = run(root);
    expect(code).toBe(1);
    expect(out).toMatch(/RRQ 2 carries no Bloom tag/);
  });
});
