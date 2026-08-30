/**
 * Fixture tests for scripts/check-figures.mjs (Spec 008: T015 red-first, T018 implementation).
 * Same spawn-a-script-against-a-CONTENT_ROOT-temp-dir pattern as depth-gate.test.mjs.
 *
 * Contract: specs/008-rich-unit-pedagogy/contracts/figures-manifest.md. In scope IFF the unit
 * folder has ≥ 1 `topic-NN.mdx`. Fails unless every topic file has ≥ 1 well-formed unique marker,
 * the manifest exists, and marker-set == manifest-set with matching Topic labels.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-figures.mjs');

function runGate(root) {
  const res = spawnSync('node', [GATE], {
    env: { ...process.env, CONTENT_ROOT: root },
    encoding: 'utf8',
  });
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

const marker = (id, prompt = 'clean flat vector diagram, labelled, high contrast', alt = 'A labelled diagram.') =>
  `{/* FIGURE[${id}]: ${prompt}; alt: ${alt} */}`;

function topicBody(markerLine) {
  return `# Topic

## A real classroom situation
${markerLine}
> vignette

## Explanation
text
`;
}

const MANIFEST_HEADER = '| Figure ID | Topic | Prompt | Alt text | Status |\n|---|---|---|---|---|';

/**
 * opts:
 *   legacy         - build a 5-file legacy unit (no topic files) instead
 *   topic1Marker   - marker line for topic-01 (default a valid fig-U1-1); '' => no marker
 *   topic2Marker   - marker line for topic-02 (default a valid fig-U1-2)
 *   topic1Label / topic2Label - topic_label front matter
 *   manifestRows   - override the manifest body rows (array of '| ... |' strings); null => omit file
 */
function makeFiguresFixture(opts = {}) {
  const root = mkdtempSync(join(tmpdir(), 'bed-fig-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(unitDir, { recursive: true });

  if (opts.legacy) {
    for (const f of ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx']) {
      writeFileSync(join(unitDir, f), fm() + `\n# ${f}\n\ntext\n`);
    }
    return root;
  }

  writeFileSync(join(unitDir, 'index.mdx'), fm() + '\n# Unit\n\n## In this unit\n\n1. [t1](./topic-01)\n2. [t2](./topic-02)\n');
  const t1 = opts.topic1Marker === undefined ? marker('fig-U1-1') : opts.topic1Marker;
  const t2 = opts.topic2Marker === undefined ? marker('fig-U1-2') : opts.topic2Marker;
  writeFileSync(join(unitDir, 'topic-01.mdx'), fm({ topic_no: 1, topic_label: opts.topic1Label ?? '1.1' }) + topicBody(t1));
  writeFileSync(join(unitDir, 'topic-02.mdx'), fm({ topic_no: 2, topic_label: opts.topic2Label ?? '1.2' }) + topicBody(t2));

  const rows = opts.manifestRows ?? [
    '| fig-U1-1 | 1.1 | clean flat vector diagram, labelled, high contrast | A labelled diagram. | prompt-only |',
    '| fig-U1-2 | 1.2 | clean flat vector diagram, labelled, high contrast | A labelled diagram. | prompt-only |',
  ];
  if (opts.manifestRows !== null) {
    const figDir = join(root, 'specs', 'content', 'efmp-302', 'figures');
    mkdirSync(figDir, { recursive: true });
    writeFileSync(join(figDir, 'unit-01.md'), `# Figures — Unit 1\n\n${MANIFEST_HEADER}\n${rows.join('\n')}\n`);
  }
  return root;
}

describe('check-figures.mjs', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  it('skips a legacy unit with no topic files', () => {
    root = makeFiguresFixture({ legacy: true });
    expect(runGate(root).code).toBe(0);
  });

  it('passes the happy new-shape path', () => {
    root = makeFiguresFixture();
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  it('fails and names a topic file with no marker', () => {
    root = makeFiguresFixture({ topic2Marker: '' });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-02\.mdx/);
  });

  it('fails on a malformed figure id', () => {
    root = makeFiguresFixture({ topic1Marker: marker('fig-1-2') });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-1-2|malformed|fig-U1/);
  });

  it('fails on a duplicate id across two topics', () => {
    root = makeFiguresFixture({ topic2Marker: marker('fig-U1-1') });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/unique/i);
  });

  it('fails when a marker is absent from the manifest', () => {
    root = makeFiguresFixture({
      manifestRows: ['| fig-U1-1 | 1.1 | clean flat vector diagram, labelled | A labelled diagram. | prompt-only |'],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-2/);
  });

  it('fails when the manifest has a row with no matching marker', () => {
    root = makeFiguresFixture({
      manifestRows: [
        '| fig-U1-1 | 1.1 | clean flat vector diagram, labelled | A labelled diagram. | prompt-only |',
        '| fig-U1-2 | 1.2 | clean flat vector diagram, labelled | A labelled diagram. | prompt-only |',
        '| fig-U1-3 | 1.2 | orphan manifest row, nothing points here | An orphan. | prompt-only |',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-3/);
  });

  it('fails on empty alt text in a marker', () => {
    root = makeFiguresFixture({ topic1Marker: '{/* FIGURE[fig-U1-1]: clean flat vector diagram, labelled; alt:  */}' });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/alt/i);
  });

  it('fails on a Topic mismatch between manifest and topic file', () => {
    root = makeFiguresFixture({
      manifestRows: [
        '| fig-U1-1 | 1.9 | clean flat vector diagram, labelled | A labelled diagram. | prompt-only |',
        '| fig-U1-2 | 1.2 | clean flat vector diagram, labelled | A labelled diagram. | prompt-only |',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/1\.9|topic_label/);
  });

  it('fails on a bad Status value', () => {
    root = makeFiguresFixture({
      manifestRows: [
        '| fig-U1-1 | 1.1 | clean flat vector diagram, labelled | A labelled diagram. | draft |',
        '| fig-U1-2 | 1.2 | clean flat vector diagram, labelled | A labelled diagram. | prompt-only |',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/status/i);
  });

  it('fails when the manifest file is missing', () => {
    root = makeFiguresFixture({ manifestRows: null });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/figures\/unit-01\.md/);
  });
});
