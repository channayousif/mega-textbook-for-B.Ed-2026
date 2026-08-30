import { describe, it, expect, afterEach } from 'vitest';
import { makeFixture, runValidator, cleanup } from './_helpers.mjs';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// T013 — EN<->UR structural parity gate (FR-001, build-enforced for reviewed units)
describe('EN<->UR parity gate', () => {
  it('passes when a reviewed unit has matching heading structure', () => {
    const { root } = makeFixture();
    const { code } = runValidator(root);
    expect(code).toBe(0);
    cleanup(root);
  });

  it('fails when the UR version drops a heading', () => {
    const { root, urDir } = makeFixture();
    // Rewrite UR index with a diverging heading vector ([1,2] instead of [1,2,2]).
    const urIndex = join(urDir, 'index.mdx');
    const withFm = readFileSync(urIndex, 'utf8').split('---\n');
    writeFileSync(urIndex, `---\n${withFm[1]}---\n\n# سرخی\n\n## ذیلی\n`);
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/heading structure diverges/);
    cleanup(root);
  });

  it('fails when a reviewed unit has no UR mirror at all', () => {
    const { root } = makeFixture({ omitUr: true });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/requires an Urdu mirror/);
    cleanup(root);
  });

  // Constitution III.2 carve-out — a course flagged `bilingual: false` (e.g. GENG-300
  // Functional English) is exempt from the parity gate even when reviewed with no UR mirror.
  it('passes when a reviewed unit has no UR mirror but its course is bilingual: false', () => {
    const { root } = makeFixture({ omitUr: true, courseOverview: { bilingual: false } });
    const { code } = runValidator(root);
    expect(code).toBe(0);
    cleanup(root);
  });
});

// T017 — parity over the dynamic EN+UR file set for a new-shape (per-topic) unit
describe('EN<->UR parity gate — per-topic layout', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  function fm(extra = {}) {
    const base = {
      title: 'x', course_code: 'EFMP-302', unit_no: 1, clo_refs: ['SLO:EFMP-302-1-1'],
      blooms_summary: 'x', est_reading_minutes: 10, translation_status: 'reviewed', ...extra,
    };
    const lines = ['---'];
    for (const [k, v] of Object.entries(base)) {
      if (Array.isArray(v)) { lines.push(`${k}:`); for (const it of v) lines.push(`  - "${it}"`); }
      else if (typeof v === 'string') lines.push(`${k}: "${v}"`);
      else lines.push(`${k}: ${v}`);
    }
    lines.push('---', '');
    return lines.join('\n');
  }
  const body = (headings = ['## A real classroom situation', '## Explanation']) =>
    `\n# Topic\n\n${headings.map((h) => `${h}\n\ntext\n`).join('\n')}`;

  function makeNewShape({ dropUrHeading = false, omitUrTopic2 = false } = {}) {
    const r = mkdtempSync(join(tmpdir(), 'bed-parity-topic-'));
    const enDir = join(r, 'docs', 'semester-1', 'efmp-302', 'unit-01');
    const urDir = join(r, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current', 'semester-1', 'efmp-302', 'unit-01');
    mkdirSync(enDir, { recursive: true });
    mkdirSync(urDir, { recursive: true });
    writeFileSync(join(r, 'glossary.json'), '[]');

    for (const dir of [enDir, urDir]) {
      writeFileSync(join(dir, 'index.mdx'), fm() + '\n# Unit\n\n## In this unit\n\n1. one\n2. two\n');
      writeFileSync(join(dir, 'unit-assessment.mdx'), fm() + body(['## Unit summary', '## Summative assessment']));
      writeFileSync(join(dir, 'topic-01.mdx'), fm({ topic_no: 1, topic_label: '1.1' }) + body());
      if (!(dir === urDir && omitUrTopic2)) {
        writeFileSync(join(dir, 'topic-02.mdx'), fm({ topic_no: 2, topic_label: '1.2' }) + body());
      }
    }
    if (dropUrHeading) {
      writeFileSync(join(urDir, 'topic-01.mdx'), fm({ topic_no: 1, topic_label: '1.1' }) + body(['## A real classroom situation']));
    }
    return r;
  }

  it('passes when EN and UR per-topic files match structurally', () => {
    root = makeNewShape();
    expect(runValidator(root).code).toBe(0);
  });

  it('fails when a UR topic file drops a heading', () => {
    root = makeNewShape({ dropUrHeading: true });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/heading structure diverges/);
    expect(out).toMatch(/topic-01\.mdx/);
  });

  it('fails when a UR topic file is missing entirely', () => {
    root = makeNewShape({ omitUrTopic2: true });
    const { code, out } = runValidator(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-02\.mdx/);
  });
});
