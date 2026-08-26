/**
 * Fixture tests for scripts/check-pipeline-gate.mjs (Spec 006: T010 scaffold, T013 approval
 * check, T017 EN-tracker check, T023 UR-tracker + terminology checks).
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { makeFixture, cleanup } from './_helpers.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-pipeline-gate.mjs');

function runGate(root) {
  const res = spawnSync('node', [GATE], {
    env: { ...process.env, CONTENT_ROOT: root },
    encoding: 'utf8',
  });
  return { code: res.status, out: (res.stdout || '') + (res.stderr || '') };
}

const DEFAULT_TRACKER_ROWS = [
  '| Unit | Stage | Status | Reviewer | Suggestion |',
  '|---|---|---|---|---|',
  '| Unit 1 | G2 en-draft | ✅ | YM | |',
  '| Unit 1 | G3 en-review | ✅ | YM | |',
];

const UR_REVIEWED_TRACKER_ROWS = [
  ...DEFAULT_TRACKER_ROWS,
  '| Unit 1 | G4 ur-translation | ✅ | YM | |',
  '| Unit 1 | G5 ur-review | ✅ | YM | |',
];

/** Writes specs/content/<course>/{content-spec.md,tasks.md} + specs/content/terminology.csv into `root`. */
function writePipelineFixtures(
  root,
  { courseCode = 'EFMP-301', specStatus = 'approved', trackerRows = DEFAULT_TRACKER_ROWS, terminologyRow = 'Educational Psychology,تعلیمی نفسیات,\n' } = {},
) {
  const courseDir = join(root, 'specs', 'content', courseCode.toLowerCase());
  mkdirSync(courseDir, { recursive: true });
  writeFileSync(
    join(courseDir, 'content-spec.md'),
    `---\ncourse_code: ${courseCode}\nstatus: ${specStatus}\n---\n\n## Course-wide items\n`,
  );
  writeFileSync(join(courseDir, 'tasks.md'), trackerRows.join('\n') + '\n');
  writeFileSync(join(root, 'specs', 'content', 'terminology.csv'), 'term_en,term_ur,notes\n' + terminologyRow);
}

describe('check-pipeline-gate.mjs', () => {
  let root;
  afterEach(() => {
    if (root) cleanup(root);
    root = undefined;
  });

  // ---- baseline (T010) -------------------------------------------------------
  it('passes a fully valid fixture: approved content-spec, done EN+UR tracker rows, matching key_terms', () => {
    ({ root } = makeFixture({
      overrides: { 'index.mdx': { key_terms: [{ en: 'Educational Psychology', ur: 'تعلیمی نفسیات' }] } },
    }));
    writePipelineFixtures(root, { trackerRows: UR_REVIEWED_TRACKER_ROWS });
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/);
  });

  // ---- US1: approval check (T013, FR-016b) -----------------------------------
  describe('approval check', () => {
    it('passes with status: approved', () => {
      ({ root } = makeFixture({ omitUr: true }));
      writePipelineFixtures(root, { specStatus: 'approved' });
      expect(runGate(root).code).toBe(0);
    });

    it('fails with status: draft', () => {
      ({ root } = makeFixture({ omitUr: true }));
      writePipelineFixtures(root, { specStatus: 'draft' });
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/content-spec\.md is not approved/);
    });

    it('fails when content-spec.md is missing', () => {
      ({ root } = makeFixture({ omitUr: true }));
      // no content-spec.md written at all — only the tracker
      mkdirSync(join(root, 'specs', 'content', 'efmp-301'), { recursive: true });
      writeFileSync(join(root, 'specs', 'content', 'efmp-301', 'tasks.md'), DEFAULT_TRACKER_ROWS.join('\n') + '\n');
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/no content-spec\.md found/);
    });
  });

  // ---- US2: EN tracker check (T017, FR-016a EN portion) ----------------------
  describe('EN tracker check', () => {
    it('passes when G2/G3 are ✅ with initials', () => {
      ({ root } = makeFixture({ omitUr: true }));
      writePipelineFixtures(root);
      expect(runGate(root).code).toBe(0);
    });

    it('fails when G2 en-draft is in-progress (▣)', () => {
      ({ root } = makeFixture({ omitUr: true }));
      writePipelineFixtures(root, {
        trackerRows: [
          '| Unit | Stage | Status | Reviewer | Suggestion |',
          '|---|---|---|---|---|',
          '| Unit 1 | G2 en-draft | ▣ | | |',
          '| Unit 1 | G3 en-review | ✅ | YM | |',
        ],
      });
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/G2 en-draft.*is not done/);
    });

    it('fails when G3 en-review is done but has blank reviewer initials', () => {
      ({ root } = makeFixture({ omitUr: true }));
      writePipelineFixtures(root, {
        trackerRows: [
          '| Unit | Stage | Status | Reviewer | Suggestion |',
          '|---|---|---|---|---|',
          '| Unit 1 | G2 en-draft | ✅ | YM | |',
          '| Unit 1 | G3 en-review | ✅ | | |',
        ],
      });
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/G3 en-review.*no reviewer initials/);
    });
  });

  // ---- US3: UR tracker + terminology checks (T023, FR-016a UR portion / FR-016c) ----
  describe('UR tracker + terminology checks', () => {
    it('fails when UR is reviewed but G4/G5 rows are missing', () => {
      ({ root } = makeFixture()); // default fixture: UR mirror present, translation_status: reviewed
      writePipelineFixtures(root); // only G2/G3 rows — no G4/G5
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/G4 ur-translation/);
      expect(out).toMatch(/G5 ur-review/);
    });

    it('flags a key_terms entry absent from the bank', () => {
      ({ root } = makeFixture({
        overrides: { 'index.mdx': { key_terms: [{ en: 'Nonexistent Term', ur: 'کوئی اصطلاح' }] } },
      }));
      writePipelineFixtures(root, { trackerRows: UR_REVIEWED_TRACKER_ROWS });
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/'Nonexistent Term' is not in terminology\.csv/);
    });

    it('flags a key_terms ur value mismatching the bank', () => {
      ({ root } = makeFixture({
        overrides: { 'index.mdx': { key_terms: [{ en: 'Educational Psychology', ur: 'غلط ترجمہ' }] } },
      }));
      writePipelineFixtures(root, { trackerRows: UR_REVIEWED_TRACKER_ROWS });
      const { code, out } = runGate(root);
      expect(code).toBe(1);
      expect(out).toMatch(/'Educational Psychology' declares ur:'غلط ترجمہ' but terminology\.csv has/);
    });

    it('passes with a fully matching key_terms pair', () => {
      ({ root } = makeFixture({
        overrides: { 'index.mdx': { key_terms: [{ en: 'Educational Psychology', ur: 'تعلیمی نفسیات' }] } },
      }));
      writePipelineFixtures(root, { trackerRows: UR_REVIEWED_TRACKER_ROWS });
      expect(runGate(root).code).toBe(0);
    });
  });
});
