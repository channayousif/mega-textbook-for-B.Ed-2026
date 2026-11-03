/**
 * scripts/lib/svg-style.mjs rules and the scripts/check-svg-style.mjs ratchet.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { svgStyleViolations, FONT_STACK_EN, FONT_STACK_UR } from '../../scripts/lib/svg-style.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const GATE = join(REPO, 'scripts', 'check-svg-style.mjs');

const svg = ({ stack = FONT_STACK_EN, width = 780, style = '.ink{fill:var(--ink)}.wm{fill:var(--wm);font-size:11px}', body = '<text class="ink">x</text>' } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 400" font-family="${stack.replace(/'/g, '&#39;')}"><style>${style}</style>${body}<text class="wm">textbook.com.pk</text></svg>`;

describe('svgStyleViolations', () => {
  it('passes a boilerplate-shaped figure', () => {
    expect(svgStyleViolations(svg())).toEqual([]);
  });

  it('flags a class used but never defined (renders default black)', () => {
    expect(svgStyleViolations(svg({ body: '<rect class="panel"/>' }))).toContain('undefined-class:panel');
  });

  it('flags empty class attributes, off-scale sizes and strokes', () => {
    const v = svgStyleViolations(svg({ style: '.ink{fill:var(--ink);font-size:10.5px}.s{stroke-width:0.75}.wm{fill:var(--wm);font-size:11px}', body: '<text class="">x</text><path class="s ink"/>' }));
    expect(v).toEqual(expect.arrayContaining(['empty-class', 'font-size:10.5', 'stroke-width:0.75']));
  });

  it('checks the root font stack by language and the canvas width', () => {
    expect(svgStyleViolations(svg({ stack: FONT_STACK_UR }), { isUrdu: true })).toEqual([]);
    expect(svgStyleViolations(svg(), { isUrdu: true })).toContain('font-stack');
    expect(svgStyleViolations(svg({ width: 1200 }))).toContain('canvas-width:1200');
  });

  it('flags an arrowhead drawn outside its marker viewBox (old RTL mirror bug)', () => {
    const marker = (d) => `<defs><marker id="a" viewBox="0 0 10 10"><path class="ink" d="${d}"/></marker></defs>`;
    expect(svgStyleViolations(svg({ body: marker('M 0 0 L 10 5 L 0 10 z') }))).toEqual([]);
    expect(svgStyleViolations(svg({ body: marker('M 780 0 L 770 5 L 780 10 z') }))).toContain('marker-off-box:a');
  });
});

describe('check-svg-style ratchet', () => {
  const roots = [];
  afterEach(() => { while (roots.length) rmSync(roots.pop(), { recursive: true, force: true }); });

  function fixture(files, baseline) {
    const root = mkdtempSync(join(tmpdir(), 'svg-style-'));
    roots.push(root);
    for (const [rel, text] of Object.entries(files)) {
      mkdirSync(dirname(join(root, rel)), { recursive: true });
      writeFileSync(join(root, rel), text);
    }
    if (baseline) {
      mkdirSync(join(root, 'specs', 'content'), { recursive: true });
      writeFileSync(join(root, 'specs', 'content', 'svg-style-baseline.json'), JSON.stringify(baseline));
    }
    return (args = []) => spawnSync('node', [GATE, ...args], { env: { ...process.env, CONTENT_ROOT: root }, encoding: 'utf8' });
  }
  const F = 'static/img/figures/x/unit-01/fig-U1-1.svg';
  const wide = svg({ width: 1200 });

  it('fails a new violation and passes once it is baselined', () => {
    expect(fixture({ [F]: wide })().status).toBe(1);
    expect(fixture({ [F]: wide }, { [F]: ['canvas-width:1200'] })().status).toBe(0);
  });

  it('fails a stale baseline entry so a fix is locked in', () => {
    const run = fixture({ [F]: svg() }, { [F]: ['canvas-width:1200'] });
    expect(run().stderr).toMatch(/baseline lists fixed violation/);
  });

  it('never grandfathers an undefined class', () => {
    const bad = svg({ body: '<rect class="panel"/>' });
    const run = fixture({ [F]: bad });
    expect(run(['--write-baseline']).status).toBe(1);
  });

  it('ignores derived dark variants', () => {
    expect(fixture({ [F]: svg(), [F.replace('.svg', '.dark.svg')]: wide })().status).toBe(0);
  });
});
