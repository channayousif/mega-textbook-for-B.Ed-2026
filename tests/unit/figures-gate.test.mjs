/**
 * Fixture tests for scripts/check-figures.mjs (Spec 008: T015 red-first, T018 implementation).
 * Same spawn-a-script-against-a-CONTENT_ROOT-temp-dir pattern as depth-gate.test.mjs.
 *
 * Contract: specs/008-rich-unit-pedagogy/contracts/figures-manifest.md. In scope IFF the unit
 * folder has ≥ 1 `topic-NN.mdx`. Fails unless every topic file has ≥ 1 well-formed unique marker,
 * the manifest exists, and marker-set == manifest-set with matching Topic labels.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
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

// ---------------------------------------------------------------------------
// Spec 009 — rendered figures: <Figure> carrier, v2 manifest, Status lifecycle
// ---------------------------------------------------------------------------

const V2_HEADER =
  '| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |\n|---|---|---|---|---|---|---|';

const figureEl = (id, src, alt = 'A labelled diagram.') =>
  `<Figure id="${id}" src="${src}" alt="${alt}" />`;

/**
 * A rendered-unit fixture. Two topics; each carries either a comment marker or a <Figure>.
 * opts:
 *   t1Carrier / t2Carrier   - 'comment' (default) | 'figure'
 *   t1Src / t2Src           - src for the <Figure> and the manifest row
 *   t1Status / t2Status     - prompt-only (default) | generated | placed
 *   t1Kind / t2Kind         - diagram (default) | illustration | '' (omit)
 *   assets                  - [relPathUnderStatic, ...] files to create under root/static/
 *   reviewed                - set index.mdx translation_status: reviewed + build UR mirror
 *   urCarriers              - { 'topic-01.mdx': 'figure'|'comment'|'none', ... } for the UR mirror
 *   urSvg                   - [relPathUnderStatic, ...] .ur.svg assets to create
 *   headerOverride          - full manifest header (default V2_HEADER)
 */
function makeV2Fixture(opts = {}) {
  const root = mkdtempSync(join(tmpdir(), 'bed-fig2-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(unitDir, { recursive: true });

  const idxExtra = opts.reviewed ? { translation_status: 'reviewed' } : {};
  writeFileSync(join(unitDir, 'index.mdx'), fm(idxExtra) + '\n# Unit\n\n## In this unit\n\n1. a\n2. b\n');

  const specs = [
    { n: 1, label: '1.1', id: 'fig-U1-1', carrier: opts.t1Carrier ?? 'comment', src: opts.t1Src ?? '/img/figures/efmp-302/unit-01/fig-U1-1.svg', status: opts.t1Status ?? 'prompt-only', kind: opts.t1Kind ?? 'diagram' },
    { n: 2, label: '1.2', id: 'fig-U1-2', carrier: opts.t2Carrier ?? 'comment', src: opts.t2Src ?? '/img/figures/efmp-302/unit-01/fig-U1-2.svg', status: opts.t2Status ?? 'prompt-only', kind: opts.t2Kind ?? 'diagram' },
  ];

  const rows = [];
  for (const s of specs) {
    const body =
      s.carrier === 'figure'
        ? topicBody(figureEl(s.id, s.src))
        : topicBody(marker(s.id));
    writeFileSync(join(unitDir, `topic-0${s.n}.mdx`), fm({ topic_no: s.n, topic_label: s.label }) + body);
    const srcCell = s.status === 'prompt-only' ? '' : s.src;
    const kindCell = s.status === 'prompt-only' ? '' : (s.kind ?? '');
    rows.push(`| ${s.id} | ${s.label} | ${kindCell} | clean flat vector diagram, labelled | A labelled diagram. | ${srcCell} | ${s.status} |`);
  }

  const figDir = join(root, 'specs', 'content', 'efmp-302', 'figures');
  mkdirSync(figDir, { recursive: true });
  writeFileSync(join(figDir, 'unit-01.md'), `# Figures — Unit 1\n\n${opts.headerOverride ?? V2_HEADER}\n${rows.join('\n')}\n`);

  for (const rel of opts.assets ?? []) {
    const p = join(root, 'static', rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, rel.endsWith('.svg') ? '<svg xmlns="http://www.w3.org/2000/svg"><title>x</title></svg>' : 'RIFF....WEBP');
  }
  for (const rel of opts.urSvg ?? []) {
    const p = join(root, 'static', rel);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, '<svg xmlns="http://www.w3.org/2000/svg"><title>x</title></svg>');
  }

  if (opts.reviewed) {
    const urDir = join(root, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current', 'semester-1', 'efmp-302', 'unit-01');
    mkdirSync(urDir, { recursive: true });
    writeFileSync(join(urDir, 'index.mdx'), fm({ translation_status: 'reviewed' }) + '\n# ی\n');
    const urc = opts.urCarriers ?? {};
    for (const s of specs) {
      const mode = urc[`topic-0${s.n}.mdx`] ?? 'figure';
      let body = topicBody('');
      if (mode === 'figure') {
        const urSrc = s.kind === 'diagram' ? s.src.replace(/\.svg$/, '.ur.svg') : s.src;
        body = topicBody(figureEl(s.id, urSrc, 'ایک عنوان'));
      } else if (mode === 'comment') {
        body = topicBody(marker(s.id));
      }
      writeFileSync(join(urDir, `topic-0${s.n}.mdx`), fm({ topic_no: s.n, topic_label: s.label, translation_status: 'reviewed' }) + body);
    }
  }

  return root;
}

describe('check-figures.mjs — Spec 009 rendered figures', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  it('regression floor: an all-prompt-only unit under the v2 header still passes', () => {
    root = makeV2Fixture();
    const { code } = runGate(root);
    expect(code).toBe(0);
  });

  it('regression floor: the Spec 008 five-column manifest + comment markers still passes', () => {
    root = makeFiguresFixture();
    expect(runGate(root).code).toBe(0);
  });

  it('regression floor: a legacy unit still passes', () => {
    root = makeFiguresFixture({ legacy: true });
    expect(runGate(root).code).toBe(0);
  });

  it('accepts a <Figure> element as the carrier for a placed figure', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed',
      t2Carrier: 'figure', t2Status: 'placed',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  it('fails a placed row whose Src file is missing under static/', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed',
      assets: [], // fig-U1-1.svg not written
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/fig-U1-1\.svg|does not exist|missing/i);
  });

  it('fails a generated/placed row with a Kind not in the enum', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'sketch',
      assets: ['img/figures/efmp-302/unit-01/fig-U1-1.svg'],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/kind/i);
  });

  it('fails a placed row whose EN topic file still has only the comment marker', () => {
    root = makeV2Fixture({
      t1Carrier: 'comment', t1Status: 'placed',
      assets: ['img/figures/efmp-302/unit-01/fig-U1-1.svg'],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/<Figure>|Figure element|not rendered/i);
  });

  it('fails when Src is non-blank on a prompt-only row', () => {
    root = makeV2Fixture({
      headerOverride: V2_HEADER,
      t1Status: 'prompt-only', t1Src: '/img/figures/efmp-302/unit-01/fig-U1-1.svg',
    });
    // force a non-blank src cell on a prompt-only row
    const figFile = join(root, 'specs', 'content', 'efmp-302', 'figures', 'unit-01.md');
    let md = readFileSync(figFile, 'utf8');
    md = md.replace(
      '| fig-U1-1 | 1.1 |  | clean flat vector diagram, labelled | A labelled diagram. |  | prompt-only |',
      '| fig-U1-1 | 1.1 |  | clean flat vector diagram, labelled | A labelled diagram. | /img/figures/efmp-302/unit-01/fig-U1-1.svg | prompt-only |',
    );
    writeFileSync(figFile, md);
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/src/i);
  });

  it('fails when Src is blank on a generated row', () => {
    root = makeV2Fixture({ t1Status: 'generated', t2Status: 'generated' });
    const figFile = join(root, 'specs', 'content', 'efmp-302', 'figures', 'unit-01.md');
    let md = readFileSync(figFile, 'utf8');
    // blank the Src cell of the fig-U1-1 generated row
    md = md.replace(
      '| fig-U1-1 | 1.1 | diagram | clean flat vector diagram, labelled | A labelled diagram. | /img/figures/efmp-302/unit-01/fig-U1-1.svg | generated |',
      '| fig-U1-1 | 1.1 | diagram | clean flat vector diagram, labelled | A labelled diagram. |  | generated |',
    );
    writeFileSync(figFile, md);
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/src/i);
  });

  it('fails a reviewed unit: placed diagram with no .ur.svg', () => {
    root = makeV2Fixture({
      reviewed: true,
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'diagram',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
      ],
      urSvg: ['img/figures/efmp-302/unit-01/fig-U1-2.ur.svg'], // fig-U1-1.ur.svg missing
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/ur\.svg/i);
  });

  it('fails a reviewed unit: placed figure with no UR <Figure>', () => {
    root = makeV2Fixture({
      reviewed: true,
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'diagram',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
      ],
      urSvg: [
        'img/figures/efmp-302/unit-01/fig-U1-1.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.ur.svg',
      ],
      urCarriers: { 'topic-01.mdx': 'none', 'topic-02.mdx': 'figure' },
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/urdu|ur |UR/i);
  });

  it('passes a fully rendered reviewed bilingual unit', () => {
    root = makeV2Fixture({
      reviewed: true,
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'diagram',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
      ],
      urSvg: [
        'img/figures/efmp-302/unit-01/fig-U1-1.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.ur.svg',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  it('accepts an incremental unit: one placed, one still prompt-only', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed',
      t2Carrier: 'comment', t2Status: 'prompt-only',
      assets: ['img/figures/efmp-302/unit-01/fig-U1-1.svg'],
    });
    expect(runGate(root).code).toBe(0);
  });
});
