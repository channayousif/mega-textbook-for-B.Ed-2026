/**
 * Fixture tests for scripts/check-figures.mjs.
 * Same spawn-a-script-against-a-CONTENT_ROOT-temp-dir pattern as depth-gate.test.mjs.
 *
 * Contracts: specs/008-rich-unit-pedagogy/contracts/figures-manifest.md (markers),
 * specs/009-figure-rendering/contracts/figure-manifest-v2.md (rendering + v3 Kind note).
 * In scope IFF the unit folder has >= 1 `topic-NN.mdx`.
 *
 * Spec 012 (Constitution III.10): every topic file carries >= 2 figure carriers; once any
 * manifest row carries a Kind, every rendered row needs one and the unit needs >= 1 schematic
 * (`concept-map` / `flowchart` / `timeline`). A fully unplanned all-prompt-only manifest with no
 * Kind cells keeps the Spec 008/009 behaviour byte-for-byte.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { LIGHT_TOKENS, DARK_TOKENS, rootBlock, WORDMARK_TEXT } from '../../scripts/lib/figure-palette.mjs';
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

/** A topic body carrying an arbitrary number of figure carriers (marker lines or <Figure> tags). */
function topicBody(carriers) {
  const block = (carriers ?? []).join('\n');
  return `# Topic

## A real classroom situation
${block}
> vignette

## Explanation
text
`;
}

const V1_HEADER = '| Figure ID | Topic | Prompt | Alt text | Status |\n|---|---|---|---|---|';
const v1Row = (id, topic, status = 'prompt-only') =>
  `| ${id} | ${topic} | clean flat vector diagram, labelled, high contrast | A labelled diagram. | ${status} |`;

/**
 * A v1 (Spec 008, 5-column manifest, comment markers) fixture. Two topics, TWO markers each by
 * default (Constitution III.10). No Kind column, so the Spec 012 archetype/schematic rules do
 * not apply.
 *
 * opts:
 *   legacy            - build a 5-file legacy unit (no topic files) instead
 *   topic1Carriers    - array of marker lines for topic-01 (default [fig-U1-1, fig-U1-2])
 *   topic2Carriers    - array of marker lines for topic-02 (default [fig-U1-3, fig-U1-4])
 *   topic1Label / topic2Label
 *   manifestRows      - override the manifest body rows; null => omit the manifest file
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
  const t1 = opts.topic1Carriers ?? [marker('fig-U1-1'), marker('fig-U1-2')];
  const t2 = opts.topic2Carriers ?? [marker('fig-U1-3'), marker('fig-U1-4')];
  writeFileSync(join(unitDir, 'topic-01.mdx'), fm({ topic_no: 1, topic_label: opts.topic1Label ?? '1.1' }) + topicBody(t1));
  writeFileSync(join(unitDir, 'topic-02.mdx'), fm({ topic_no: 2, topic_label: opts.topic2Label ?? '1.2' }) + topicBody(t2));

  const rows = opts.manifestRows ?? [
    v1Row('fig-U1-1', '1.1'), v1Row('fig-U1-2', '1.1'),
    v1Row('fig-U1-3', '1.2'), v1Row('fig-U1-4', '1.2'),
  ];
  if (opts.manifestRows !== null) {
    const figDir = join(root, 'specs', 'content', 'efmp-302', 'figures');
    mkdirSync(figDir, { recursive: true });
    writeFileSync(join(figDir, 'unit-01.md'), `# Figures — Unit 1\n\n${V1_HEADER}\n${rows.join('\n')}\n`);
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

  // SUPERSEDED 2026-09-18. Markers alone used to satisfy the Art. III.10 density
  // floor; they no longer do, because that floor is about what the learner sees.
  // See the block comment in scripts/check-figures.mjs for the evidence that forced
  // the change. A fully placed unit passing is covered at
  // 'accepts <Figure> elements as carriers for a fully placed unit'.
  it('refuses the marker-only path: prompt-only carriers render nothing', () => {
    root = makeFiguresFixture();
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/renders 0 figure\(s\).*prompt-only marker/);
  });

  it('fails and names a topic file with fewer than two figures', () => {
    root = makeFiguresFixture({
      topic2Carriers: [marker('fig-U1-3')],
      manifestRows: [v1Row('fig-U1-1', '1.1'), v1Row('fig-U1-2', '1.1'), v1Row('fig-U1-3', '1.2')],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-02\.mdx/);
    expect(out).toMatch(/at least 2|III\.10/);
  });

  it('fails a topic file with no marker at all', () => {
    root = makeFiguresFixture({
      topic2Carriers: [],
      manifestRows: [v1Row('fig-U1-1', '1.1'), v1Row('fig-U1-2', '1.1')],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-02\.mdx/);
  });

  it('fails on a malformed figure id', () => {
    root = makeFiguresFixture({ topic1Carriers: [marker('fig-1-2'), marker('fig-U1-1')] });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-1-2|malformed|fig-U1/);
  });

  it('fails on a duplicate id across two topics', () => {
    root = makeFiguresFixture({ topic2Carriers: [marker('fig-U1-1'), marker('fig-U1-4')] });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/unique/i);
  });

  it('fails when a marker is absent from the manifest', () => {
    root = makeFiguresFixture({
      manifestRows: [v1Row('fig-U1-1', '1.1'), v1Row('fig-U1-2', '1.1'), v1Row('fig-U1-4', '1.2')],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-3/);
  });

  it('fails when the manifest has a row with no matching marker', () => {
    root = makeFiguresFixture({
      manifestRows: [
        v1Row('fig-U1-1', '1.1'), v1Row('fig-U1-2', '1.1'),
        v1Row('fig-U1-3', '1.2'), v1Row('fig-U1-4', '1.2'),
        v1Row('fig-U1-9', '1.2'), // orphan manifest row
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-9/);
  });

  it('fails on empty alt text in a marker', () => {
    root = makeFiguresFixture({
      // the empty-alt marker is placed last so the marker regex is not lured across a later `*/}`
      topic1Carriers: [marker('fig-U1-1'), '{/* FIGURE[fig-U1-2]: clean flat vector diagram, labelled; alt:  */}'],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/alt/i);
  });

  it('fails on a Topic mismatch between manifest and topic file', () => {
    root = makeFiguresFixture({
      manifestRows: [
        v1Row('fig-U1-1', '1.9'), v1Row('fig-U1-2', '1.1'),
        v1Row('fig-U1-3', '1.2'), v1Row('fig-U1-4', '1.2'),
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
        v1Row('fig-U1-1', '1.1', 'draft'), v1Row('fig-U1-2', '1.1'),
        v1Row('fig-U1-3', '1.2'), v1Row('fig-U1-4', '1.2'),
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
// Spec 009 / 012 — rendered figures: <Figure> carrier, v2 manifest, Status lifecycle,
// six-value Kind archetype, per-unit schematic rule.
// ---------------------------------------------------------------------------

const V2_HEADER =
  '| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |\n|---|---|---|---|---|---|---|';

const figureEl = (id, src, alt = 'A labelled diagram.') =>
  `<Figure id="${id}" src="${src}" alt="${alt}" />`;

const SRC = (id, ext = 'svg') => `/img/figures/efmp-302/unit-01/${id}.${ext}`;

/**
 * A rendered-unit fixture. Two topics; each carries a PRIMARY figure (fig-U1-1 / fig-U1-3,
 * driven by the t1 / t2 opts) plus a FILLER figure (fig-U1-2 / fig-U1-4) that mirrors its
 * topic's primary carrier form + status so the topic always has >= 2 carriers.
 *
 * opts:
 *   t1Carrier / t2Carrier   - 'comment' (default) | 'figure'   (applies to the primary + filler)
 *   t1Src / t2Src           - src for the primary <Figure> and its manifest row
 *   t1Status / t2Status     - prompt-only (default) | generated | placed
 *   t1Kind / t2Kind         - primary archetype; defaults: t1 'flowchart' (schematic), t2 'diagram'
 *   fillerKind              - archetype for the filler rows when rendered (default 'diagram')
 *   assets                  - [relPathUnderStatic, ...] files to create under root/static/
 *   reviewed                - index.mdx translation_status: reviewed + build the UR mirror
 *   urCarriers              - { 'topic-01.mdx': 'figure'|'comment'|'none', ... } for the UR mirror
 *   urSvg                   - [relPathUnderStatic, ...] .ur.svg assets to create
 *   headerOverride          - full manifest header (default V2_HEADER)
 */

/**
 * A minimal SVG that satisfies the Spec 013 asset lint: viewBox-only sizing,
 * role/title/desc, the published :root token block, and exactly one
 * aria-hidden wordmark. Fixtures build assets the same way the real generator
 * does, so a test failing here means the CONTRACT changed, not the stub.
 */
function validSvg({ dark = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img" aria-labelledby="t d">`
    + `<title id="t">A title</title><desc id="d">A description.</desc>`
    + `<style>${rootBlock(dark ? DARK_TOKENS : LIGHT_TOKENS)} .bg{fill:var(--bg)} .wm{fill:var(--wm);font-size:11px}</style>`
    + `<rect class="bg" x="0" y="0" width="400" height="300"/>`
    + `<text class="wm" x="388" y="290" text-anchor="end" aria-hidden="true">${WORDMARK_TEXT}</text></svg>`;
}

/** Write a figure asset plus, for an SVG, its derived dark variant. */
function writeAsset(absPath) {
  mkdirSync(dirname(absPath), { recursive: true });
  if (!absPath.endsWith('.svg')) { writeFileSync(absPath, 'RIFF....WEBP'); return; }
  writeFileSync(absPath, validSvg());
  writeFileSync(absPath.replace(/\.svg$/, '.dark.svg'), validSvg({ dark: true }));
}

function makeV2Fixture(opts = {}) {
  const root = mkdtempSync(join(tmpdir(), 'bed-fig2-'));
  const unitDir = join(root, 'docs', 'semester-1', 'efmp-302', 'unit-01');
  mkdirSync(unitDir, { recursive: true });

  const idxExtra = opts.reviewed ? { translation_status: 'reviewed' } : {};
  writeFileSync(join(unitDir, 'index.mdx'), fm(idxExtra) + '\n# Unit\n\n## In this unit\n\n1. a\n2. b\n');

  const fillerKind = opts.fillerKind ?? 'diagram';
  const primaries = [
    { n: 1, label: '1.1', id: 'fig-U1-1', carrier: opts.t1Carrier ?? 'comment', src: opts.t1Src ?? SRC('fig-U1-1'), status: opts.t1Status ?? 'prompt-only', kind: opts.t1Kind ?? 'flowchart' },
    { n: 2, label: '1.2', id: 'fig-U1-3', carrier: opts.t2Carrier ?? 'comment', src: opts.t2Src ?? SRC('fig-U1-3'), status: opts.t2Status ?? 'prompt-only', kind: opts.t2Kind ?? 'diagram' },
  ];
  const specs = [];
  for (const p of primaries) {
    specs.push(p);
    specs.push({
      n: p.n, label: p.label, id: p.n === 1 ? 'fig-U1-2' : 'fig-U1-4',
      carrier: p.carrier, src: SRC(p.n === 1 ? 'fig-U1-2' : 'fig-U1-4'),
      status: p.status, kind: p.status === 'prompt-only' ? '' : fillerKind,
    });
  }

  const rows = [];
  for (const n of [1, 2]) {
    const carriers = specs.filter((s) => s.n === n).map((s) => (s.carrier === 'figure' ? figureEl(s.id, s.src) : marker(s.id)));
    writeFileSync(join(unitDir, `topic-0${n}.mdx`), fm({ topic_no: n, topic_label: `1.${n}` }) + topicBody(carriers));
  }
  for (const s of specs) {
    const srcCell = s.status === 'prompt-only' ? '' : s.src;
    // A prompt-only row leaves Kind blank (still just a plan); once rendered it carries its archetype.
    const kindCell = s.status === 'prompt-only' ? '' : (s.kind ?? '');
    rows.push(`| ${s.id} | ${s.label} | ${kindCell} | clean flat vector diagram, labelled | A labelled diagram. | ${srcCell} | ${s.status} |`);
  }

  const figDir = join(root, 'specs', 'content', 'efmp-302', 'figures');
  mkdirSync(figDir, { recursive: true });
  writeFileSync(join(figDir, 'unit-01.md'), `# Figures — Unit 1\n\n${opts.headerOverride ?? V2_HEADER}\n${rows.join('\n')}\n`);

  for (const rel of opts.assets ?? []) writeAsset(join(root, 'static', rel));
  for (const rel of opts.urSvg ?? []) writeAsset(join(root, 'static', rel));

  if (opts.reviewed) {
    const urDir = join(root, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current', 'semester-1', 'efmp-302', 'unit-01');
    mkdirSync(urDir, { recursive: true });
    writeFileSync(join(urDir, 'index.mdx'), fm({ translation_status: 'reviewed' }) + '\n# ی\n');
    const urc = opts.urCarriers ?? {};
    for (const n of [1, 2]) {
      const mode = urc[`topic-0${n}.mdx`] ?? 'figure';
      const tSpecs = specs.filter((s) => s.n === n);
      let carriers = [];
      if (mode === 'figure') {
        carriers = tSpecs.map((s) => {
          const urSrc = s.kind === 'diagram' || s.kind === '' ? s.src.replace(/\.svg$/, '.ur.svg') : s.src.replace(/\.svg$/, '.ur.svg');
          return figureEl(s.id, urSrc, 'ایک عنوان');
        });
      } else if (mode === 'comment') {
        carriers = tSpecs.map((s) => marker(s.id));
      } // 'none' => no carriers
      writeFileSync(join(urDir, `topic-0${n}.mdx`), fm({ topic_no: n, topic_label: `1.${n}`, translation_status: 'reviewed' }) + topicBody(carriers));
    }
  }

  return root;
}

describe('check-figures.mjs — Spec 009 rendered figures + Spec 012 density', () => {
  let root;
  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
    root = undefined;
  });

  // SUPERSEDED 2026-09-18. This guard protected the Spec 009/012 staged rollout, so
  // that adding the gate would not turn existing content red. The staging is done,
  // and the guard's side effect was that EFMP-302 Units 3-6 carried 34 prompt-only
  // figures, no figure directories and zero rendered images while this gate stayed
  // green and the prose said "the figure above" ~30 times.
  it('an all-prompt-only unit under the v2 header now fails the density floor', () => {
    root = makeV2Fixture();
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/requires at least 2 rendered <Figure> elements/);
  });

  // SUPERSEDED 2026-09-18, same reason as above. The five-column Spec 008 manifest
  // is still parsed and still valid; what changed is that its comment markers no
  // longer count toward the rendered-figure floor.
  it('the Spec 008 five-column manifest + comment markers now fails the density floor', () => {
    root = makeFiguresFixture();
    expect(runGate(root).code).toBe(1);
  });

  it('regression floor: a legacy unit still passes', () => {
    root = makeFiguresFixture({ legacy: true });
    expect(runGate(root).code).toBe(0);
  });

  it('accepts <Figure> elements as carriers for a fully placed unit', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed',
      t2Carrier: 'figure', t2Status: 'placed',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
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

  it('fails a generated/placed row with a Kind not in the archetype set', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'sketch',
      assets: ['img/figures/efmp-302/unit-01/fig-U1-1.svg', 'img/figures/efmp-302/unit-01/fig-U1-2.svg'],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/kind/i);
  });

  it('fails a placed row whose EN topic file still has only the comment marker', () => {
    root = makeV2Fixture({
      t1Carrier: 'comment', t1Status: 'placed',
      assets: ['img/figures/efmp-302/unit-01/fig-U1-1.svg', 'img/figures/efmp-302/unit-01/fig-U1-2.svg'],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1/);
    expect(out).toMatch(/<Figure>|Figure element|not rendered|comment marker/i);
  });

  it('fails when Src is non-blank on a prompt-only row', () => {
    root = makeV2Fixture();
    const figFile = join(root, 'specs', 'content', 'efmp-302', 'figures', 'unit-01.md');
    let md = readFileSync(figFile, 'utf8');
    md = md.replace(
      '| fig-U1-1 | 1.1 |  | clean flat vector diagram, labelled | A labelled diagram. |  | prompt-only |',
      '| fig-U1-1 | 1.1 |  | clean flat vector diagram, labelled | A labelled diagram. | ' + SRC('fig-U1-1') + ' | prompt-only |',
    );
    expect(md).toContain(SRC('fig-U1-1') + ' | prompt-only |'); // guard: the replace actually fired
    writeFileSync(figFile, md);
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/src/i);
  });

  it('fails when Src is blank on a generated row', () => {
    root = makeV2Fixture({ t1Status: 'generated', t2Status: 'generated' });
    const figFile = join(root, 'specs', 'content', 'efmp-302', 'figures', 'unit-01.md');
    let md = readFileSync(figFile, 'utf8');
    md = md.replace(
      '| fig-U1-1 | 1.1 | flowchart | clean flat vector diagram, labelled | A labelled diagram. | /img/figures/efmp-302/unit-01/fig-U1-1.svg | generated |',
      '| fig-U1-1 | 1.1 | flowchart | clean flat vector diagram, labelled | A labelled diagram. |  | generated |',
    );
    writeFileSync(figFile, md);
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/src/i);
  });

  it('fails a reviewed unit: placed diagram with no .ur.svg', () => {
    root = makeV2Fixture({
      reviewed: true,
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'flowchart',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
      ],
      urSvg: [
        'img/figures/efmp-302/unit-01/fig-U1-1.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.ur.svg',
        // fig-U1-3.ur.svg missing
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-3/);
    expect(out).toMatch(/ur\.svg/i);
  });

  it('fails a reviewed unit: placed figure with no UR <Figure>', () => {
    root = makeV2Fixture({
      reviewed: true,
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'flowchart',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
      ],
      urSvg: [
        'img/figures/efmp-302/unit-01/fig-U1-1.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.ur.svg',
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
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'flowchart',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
      ],
      urSvg: [
        'img/figures/efmp-302/unit-01/fig-U1-1.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.ur.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.ur.svg',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  it('an incremental unit still fails while any topic renders nothing', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'flowchart',
      t2Carrier: 'comment', t2Status: 'prompt-only',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
      ],
    });
    // SUPERSEDED 2026-09-18: the still-prompt-only topic renders nothing, so it does
    // not meet the floor. Partial progress is real progress, but it is not a unit
    // that satisfies Art. III.10 yet, and the gate should say so rather than imply
    // the standard is met.
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-02\.mdx renders 0 figure/);
  });

  // --- Spec 012 (Constitution III.10) new rules ------------------------------

  it('[US1] passes a unit with >= 2 carriers per topic and a timeline somewhere', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'timeline',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(0);
    expect(out).toMatch(/passed/i);
  });

  it('[US1] fails when a topic-NN.mdx has only one carrier', () => {
    root = makeFiguresFixture({
      topic1Carriers: [marker('fig-U1-1')],
      manifestRows: [v1Row('fig-U1-1', '1.1'), v1Row('fig-U1-3', '1.2'), v1Row('fig-U1-4', '1.2')],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/topic-01\.mdx/);
    expect(out).toMatch(/1 figure\(s\)|at least 2/);
  });

  it('[US1] fails when every topic has >= 2 carriers but no figure is a concept-map / flowchart / timeline', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'table',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
      fillerKind: 'diagram',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/concept-map \/ flowchart \/ timeline|schematic/i);
  });

  it('[US1] fails when a manifest row archetype is blank or unknown once the unit is classified', () => {
    root = makeV2Fixture({
      t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'timeline',
      t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'wibble',
      assets: [
        'img/figures/efmp-302/unit-01/fig-U1-1.svg',
        'img/figures/efmp-302/unit-01/fig-U1-2.svg',
        'img/figures/efmp-302/unit-01/fig-U1-3.svg',
        'img/figures/efmp-302/unit-01/fig-U1-4.svg',
      ],
    });
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-3/);
    expect(out).toMatch(/kind|archetype/i);
  });

  it('[US1] skips the density rules for a legacy five-file unit', () => {
    root = makeFiguresFixture({ legacy: true });
    expect(runGate(root).code).toBe(0);
  });
});

// --- Spec 013: the gate now reads the committed SVG bytes -------------------
describe('check-figures.mjs - Spec 013 asset lint and bilingual parity', () => {
  let root;
  afterEach(() => { if (root) rmSync(root, { recursive: true, force: true }); root = undefined; });

  const PLACED = {
    reviewed: true,
    t1Carrier: 'figure', t1Status: 'placed', t1Kind: 'flowchart',
    t2Carrier: 'figure', t2Status: 'placed', t2Kind: 'diagram',
    assets: [
      'img/figures/efmp-302/unit-01/fig-U1-1.svg',
      'img/figures/efmp-302/unit-01/fig-U1-2.svg',
      'img/figures/efmp-302/unit-01/fig-U1-3.svg',
      'img/figures/efmp-302/unit-01/fig-U1-4.svg',
    ],
    urSvg: [
      'img/figures/efmp-302/unit-01/fig-U1-1.ur.svg',
      'img/figures/efmp-302/unit-01/fig-U1-2.ur.svg',
      'img/figures/efmp-302/unit-01/fig-U1-3.ur.svg',
      'img/figures/efmp-302/unit-01/fig-U1-4.ur.svg',
    ],
  };
  const asset = (r, name) => join(r, 'static', 'img', 'figures', 'efmp-302', 'unit-01', name);
  const edit = (file, fn) => writeFileSync(file, fn(readFileSync(file, 'utf8')));

  it('passes when every asset carries the published tokens and the wordmark', () => {
    root = makeV2Fixture(PLACED);
    expect(runGate(root).code).toBe(0);
  });

  it('rejects a colour literal outside the :root token block', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-1.svg'), (t) => t.replace('class="bg"', 'class="bg" stroke="#ff00ff"'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/colour literal\(s\) outside the :root block/);
  });

  it('rejects an asset whose :root block is not the published palette', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-1.svg'), (t) => t.replace('--ink:', '--ink:#123456;--nope:'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/does not carry the published light :root token block/);
  });

  it('rejects a figure with no wordmark', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-2.svg'), (t) => t.replace(/<text class="wm"[\s\S]*?<\/text>/, ''));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/must carry exactly one "textbook\.com\.pk" wordmark/);
  });

  it('rejects a wordmark that is exposed to assistive technology', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-2.svg'), (t) => t.replace(' aria-hidden="true"', ''));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/wordmark must be aria-hidden/);
  });

  it('rejects an em dash in a text node (Art. III.9, which no other gate scans in static/)', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-3.svg'), (t) => t.replace('A description.', 'A description \u2014 with a dash.'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/em dash in a text node/);
  });

  it('rejects a missing dark variant', () => {
    root = makeV2Fixture(PLACED);
    rmSync(asset(root, 'fig-U1-1.dark.svg'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/has no dark variant/);
  });

  it('rejects a stale dark variant', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-1.dark.svg'), (t) => t.replace('A description.', 'Drifted description.'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/is stale - run: npm run figures:variants/);
  });

  it('rejects an external reference', () => {
    root = makeV2Fixture(PLACED);
    edit(asset(root, 'fig-U1-4.svg'), (t) => t.replace('<rect', '<image href="https://example.test/x.png"/><rect'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/must not reference anything external/);
  });

  // THE Bug B regression. The predicate used to be `kind === 'diagram'`, so a
  // table, concept map, flowchart or timeline could lose its Urdu variant and
  // CI stayed green. fig-U1-1 here is a `flowchart`, which the old gate
  // ignored entirely.
  it('requires an .ur.svg for a NON-diagram schematic in a reviewed unit', () => {
    root = makeV2Fixture(PLACED);
    rmSync(asset(root, 'fig-U1-1.ur.svg'));
    rmSync(asset(root, 'fig-U1-1.ur.dark.svg'));
    const { code, out } = runGate(root);
    expect(code).toBe(1);
    expect(out).toMatch(/fig-U1-1.*placed SVG in a reviewed unit but the translated/);
  });
});
