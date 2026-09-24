#!/usr/bin/env node
/**
 * Figure-internal text-geometry measurement for EFMP-302 Unit 2, G3 feat023-r2.
 *
 * WHY THIS EXISTS. G-2026-62: the b8f8ffe re-optimisation shipped overlapping
 * text inside committed SVGs, and neither check:figures (no glyph geometry) nor
 * measure-figure-text.mjs (viewBox overflow and wordmark only) can see
 * text-on-text superposition. Cycle 1 of this unit passed accessibility without
 * measuring figure-internal geometry. This script is that measurement.
 *
 * METHOD (per SVG file, following the unit-03 feat023-r2 precedent):
 *   1. The SERVED bytes are fetched from the built site and sha256-compared
 *      with the committed static/img bytes, so the measurement covers exactly
 *      what a learner's browser would paint.
 *   2. The SVG is inlined into a blank page at natural viewBox size in headless
 *      Chromium; every <text> element's getBBox() is taken in SVG user units.
 *   3. Pairwise bbox intersection is computed between all distinct text
 *      element pairs (this includes the wordmark, which is a <text class="wm">).
 *   4. Every bbox-overlapping pair is pixel-tested: the SVG is rendered three
 *      times into a canvas (element A alone, element B alone, all text hidden)
 *      and the pixels inked in both A and B, relative to the empty variant, are
 *      counted. That is glyph ink intersection, not just box arithmetic.
 *   5. The wordmark is bbox-checked against every painted shape (rect, circle,
 *      ellipse, line, path, polygon) as well, since a shape can underlap the
 *      wordmark without any text pair overlapping.
 *   6. A negative control runs the identical measurement over the known-bad
 *      b8f8ffe bytes, proving the instrument detects the failure mode.
 *
 * Output: a .log (human readable), a .json (structured), the control .json, and
 * a 2x standalone PNG of every measured current variant for visual inspection.
 * Exit 0 only when no text pair shares ink and the control detects the known
 * bad geometry.
 */
import { chromium } from 'playwright-core';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const base = process.argv[2] || 'http://127.0.0.1:4599';
const unitDir = 'static/img/figures/efmp-302/unit-02';
const outDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G3');
const logsDir = join(outDir, 'logs-feat023-r2');
const rendersDir = join(outDir, 'renders-feat023-r2');
mkdirSync(logsDir, { recursive: true });
mkdirSync(rendersDir, { recursive: true });

const FIGS = ['fig-U2-1', 'fig-U2-2', 'fig-U2-3', 'fig-U2-4', 'fig-U2-5', 'fig-U2-6', 'fig-U2-7', 'fig-U2-8'];
const VARIANTS = ['', '.dark'];
const CONTROL_FILES = [
  { name: 'fig-U2-1.b8f8ffe.svg', path: '/tmp/fig-U2-1.b8f8ffe.svg' },
  { name: 'fig-U2-2.b8f8ffe.svg', path: '/tmp/fig-U2-2.b8f8ffe.svg' },
  { name: 'fig-U2-5.b8f8ffe.svg', path: '/tmp/fig-U2-5.b8f8ffe.svg' },
];

const sha = (s) => createHash('sha256').update(s).digest('hex');
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

/** Measure one SVG source string. Returns geometry + pixel results. */
async function measureSvg(page, svgText, label) {
  // Inline at natural viewBox size so 1 CSS px == 1 SVG user unit.
  const vbMatch = /viewBox="([^"]+)"/.exec(svgText);
  const nums = vbMatch[1].trim().split(/[\s,]+/).map(Number);
  const vbW = nums[2], vbH = nums[3];
  const sized = svgText.replace(/<svg /, `<svg width="${vbW}" height="${vbH}" `);
  const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0}</style><div id="host">${sized}</div>`;
  await page.setContent(html, { waitUntil: 'load' });

  const geo = await page.evaluate(() => {
    const svg = document.querySelector('#host svg');
    const texts = [...svg.querySelectorAll('text')];
    const shapes = [...svg.querySelectorAll('rect,circle,ellipse,line,path,polygon')];
    const box = (el) => { const b = el.getBBox(); return { x: b.x, y: b.y, w: b.width, h: b.height, r: b.x + b.width, b: b.y + b.height }; };
    return {
      viewBox: `${svg.viewBox.baseVal.width}x${svg.viewBox.baseVal.height}`,
      texts: texts.map((t, i) => ({ i, cls: t.getAttribute('class') || '', s: t.textContent.replace(/\s+/g, ' ').slice(0, 40), ...box(t) })),
      shapes: shapes.map((s, i) => ({ i, tag: s.tagName, cls: s.getAttribute('class') || '', ...box(s) })),
    };
  });

  const inter = (a, b) => {
    const ix = Math.min(a.r, b.r) - Math.max(a.x, b.x);
    const iy = Math.min(a.b, b.b) - Math.max(a.y, b.y);
    return { ix, iy };
  };
  const gap = (a, b) => {
    const gx = Math.max(a.x, b.x) - Math.min(a.r, b.r);
    const gy = Math.max(a.y, b.y) - Math.min(a.b, b.b);
    return Math.max(gx, gy);
  };

  const bboxPairs = [];
  const nearMisses = [];
  for (let i = 0; i < geo.texts.length; i++) {
    for (let j = i + 1; j < geo.texts.length; j++) {
      const a = geo.texts[i], b = geo.texts[j];
      const { ix, iy } = inter(a, b);
      if (ix > 0 && iy > 0) bboxPairs.push({ a: a.s, b: b.s, ix: +ix.toFixed(1), iy: +iy.toFixed(1) });
      else if (gap(a, b) < 2) nearMisses.push({ a: a.s, b: b.s, gap: +gap(a, b).toFixed(1) });
    }
  }

  // Wordmark vs text and vs painted shapes (bbox level).
  const wm = geo.texts.find((t) => /\bwm\b/.test(t.cls));
  const wmTextOverlaps = [];
  const wmRectHits = [];
  if (wm) {
    for (const t of geo.texts) {
      if (t === wm) continue;
      const { ix, iy } = inter(wm, t);
      if (ix > 0 && iy > 0) wmTextOverlaps.push({ other: t.s, ix: +ix.toFixed(1), iy: +iy.toFixed(1) });
    }
    for (const s of geo.shapes) {
      const { ix, iy } = inter(wm, s);
      if (ix > 0 && iy > 0) wmRectHits.push({ tag: s.tag, cls: s.cls, ix: +ix.toFixed(1), iy: +iy.toFixed(1) });
    }
  }

  // Pixel ink intersection for every bbox-overlapping pair, via canvas.
  const collisions = [];
  for (const pair of bboxPairs) {
    const px = await page.evaluate(async ({ textA, textB }) => {
      const svg = document.querySelector('#host svg');
      const texts = [...svg.querySelectorAll('text')];
      const norm = (t) => t.textContent.replace(/\s+/g, ' ').slice(0, 40);
      const a = texts.find((t) => norm(t) === textA);
      const b = texts.find((t) => norm(t) === textB && t !== a);
      if (!a || !b) return { error: 'element not found for pixel test' };
      const vb = svg.viewBox.baseVal;
      const render = async (keep) => {
        const clone = svg.cloneNode(true);
        const ct = [...clone.querySelectorAll('text')];
        ct.forEach((t, i) => { if (!keep.includes(i)) t.setAttribute('visibility', 'hidden'); });
        clone.setAttribute('width', vb.width); clone.setAttribute('height', vb.height);
        const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clone));
        const img = new Image();
        img.width = vb.width; img.height = vb.height;
        await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('svg image load failed')); img.src = url; });
        const cv = document.createElement('canvas');
        cv.width = vb.width; cv.height = vb.height;
        const cx = cv.getContext('2d', { willReadFrequently: true });
        cx.drawImage(img, 0, 0, vb.width, vb.height);
        return cx.getImageData(0, 0, vb.width, vb.height).data;
      };
      const ai = texts.indexOf(a), bi = texts.indexOf(b);
      const [da, db, dn] = await Promise.all([render([ai]), render([bi]), render([])]);
      let both = 0, aOnly = 0, bOnly = 0;
      for (let p = 0; p < da.length; p += 4) {
        const aInk = da[p] !== dn[p] || da[p + 1] !== dn[p + 1] || da[p + 2] !== dn[p + 2];
        const bInk = db[p] !== dn[p] || db[p + 1] !== dn[p + 1] || db[p + 2] !== dn[p + 2];
        if (aInk && bInk) both++;
        else if (aInk) aOnly++;
        else if (bInk) bOnly++;
      }
      return { both, aOnly, bOnly };
    }, { textA: pair.a, textB: pair.b });
    collisions.push({ ...pair, ...px });
  }

  return { label, viewBox: geo.viewBox, textCount: geo.texts.length, bboxPairs, nearMisses, wmTextOverlaps, wmRectHits, collisions, texts: geo.texts };
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

/* ---------- Phase 1: current bytes, served from the fresh build ---------- */
say(`# figure-text-overlap - EFMP-302 unit-02, G3 feat023-r2`);
say(`# started: ${new Date().toISOString()}`);
say(`# base: ${base}   browser: chromium ${browser.version()}`);
say(`# method: served bytes sha256-matched to committed bytes, inlined at viewBox size,`);
say(`#         getBBox per <text> in SVG user units, pairwise bbox intersection, then`);
say(`#         canvas pixel ink-intersection for every overlapping pair.`);
const results = [];
let servedMismatch = 0;
for (const fig of FIGS) {
  for (const v of VARIANTS) {
    const rel = `${unitDir}/${fig}${v}.svg`;
    const servedUrl = `${base}/img/figures/efmp-302/unit-02/${fig}${v}.svg`;
    const res = await page.request.get(servedUrl);
    const servedText = await res.text();
    const committed = readFileSync(join(root, rel), 'utf8');
    const matches = sha(servedText) === sha(committed);
    if (!matches) servedMismatch++;
    const r = await measureSvg(page, servedText, `${fig}${v || '.light'}.svg`);
    r.servedMatchesCommitted = matches;
    results.push(r);
    say(`${fig}${v || '.light'}.svg: texts=${r.textCount} bboxPairs=${r.bboxPairs.length} collisions=${r.collisions.filter((c) => c.both > 0).length} nearMisses=${r.nearMisses.length} wmTextOverlaps=${r.wmTextOverlaps.length} wmRectHits=${r.wmRectHits.length} servedMatch=${matches}`);
    for (const c of r.collisions) say(`   INK-COLLISION: "${c.a}" vs "${c.b}" box ${c.ix}x${c.iy} sharedInkPx=${c.both} (aOnly=${c.aOnly} bOnly=${c.bOnly})`);
    for (const p of r.bboxPairs) say(`   bbox-overlap (pixel-tested): "${p.a}" vs "${p.b}" ${p.ix}x${p.iy}`);
    for (const n of r.nearMisses) say(`   near-miss <2px: "${n.a}" vs "${n.b}" gap=${n.gap}`);
    for (const w of r.wmTextOverlaps) say(`   WORDMARK-TEXT: vs "${w.other}" ${w.ix}x${w.iy}`);
    for (const w of r.wmRectHits) say(`   WORDMARK-SHAPE: vs ${w.tag}.${w.cls} ${w.ix}x${w.iy}`);
    // Standalone 2x render for visual inspection.
    await page.setViewportSize({ width: 1200, height: 900 });
    const el = page.locator('#host svg');
    await el.screenshot({ path: join(rendersDir, `${fig}${v ? '.dark' : ''}-standalone-2x.png`) });
  }
}

/* ---------- Phase 2: negative control over the known-bad b8f8ffe bytes ---------- */
say(`\n# NEGATIVE CONTROL: same measurement over the b8f8ffe bytes (known bad)`);
const control = [];
for (const c of CONTROL_FILES) {
  const text = readFileSync(c.path, 'utf8');
  const r = await measureSvg(page, text, c.name);
  control.push(r);
  say(`${c.name}: texts=${r.textCount} bboxOverlapPairs=${r.bboxPairs.length} inkCollisions=${r.collisions.filter((x) => x.both > 0).length}`);
  for (const p of r.bboxPairs.slice(0, 12)) say(`   OVERLAP: "${p.a}" vs "${p.b}" (${p.ix}x${p.iy})`);
  if (r.bboxPairs.length > 12) say(`   ... and ${r.bboxPairs.length - 12} more`);
}
const controlDetects = control.every((r) => r.bboxPairs.length > 0);
say(`control detects known-bad geometry: ${controlDetects}`);

await ctx.close();
await browser.close();

const inkTotal = results.reduce((n, r) => n + r.collisions.filter((c) => c.both > 0).length, 0);
const bboxTotal = results.reduce((n, r) => n + r.bboxPairs.length, 0);
const nearTotal = results.reduce((n, r) => n + r.nearMisses.length, 0);
const wmTextTotal = results.reduce((n, r) => n + r.wmTextOverlaps.length, 0);
say(`\nSUMMARY {"filesChecked":${results.length},"servedMismatch":${servedMismatch},"bboxOverlapPairsTotal":${bboxTotal},"inkCollisionsTotal":${inkTotal},"nearMissTotal":${nearTotal},"wmTextOverlapsTotal":${wmTextTotal}}`);
say(`# finished: ${new Date().toISOString()}`);

writeFileSync(join(logsDir, 'figure-text-overlap.log'), `${lines.join('\n')}\n`);
writeFileSync(join(logsDir, 'figure-text-overlap.json'), `${JSON.stringify({
  schema_version: 1, generated_at: new Date().toISOString(), base, browser: `chromium ${browser.version()}`,
  method: 'served bytes sha256-matched, inlined at viewBox size, getBBox pairwise, canvas ink-intersection per overlapping pair',
  results: results.map(({ texts, ...r }) => r), summary: { filesChecked: results.length, servedMismatch, bboxOverlapPairsTotal: bboxTotal, inkCollisionsTotal: inkTotal, nearMissTotal: nearTotal, wmTextOverlapsTotal: wmTextTotal },
}, null, 2)}\n`);
writeFileSync(join(logsDir, 'figure-text-overlap-control-b8f8ffe.json'), `${JSON.stringify({
  schema_version: 1, generated_at: new Date().toISOString(),
  control: 'b8f8ffe bytes (known bad, G-2026-62), extracted via git show b8f8ffe:<path>',
  files: CONTROL_FILES.map((c) => c.path),
  detectsKnownBad: controlDetects,
  results: control.map(({ texts, ...r }) => ({ ...r, inkCollisions: r.collisions.filter((x) => x.both > 0).length })),
}, null, 2)}\n`);

const ok = inkTotal === 0 && bboxTotal === 0 && wmTextTotal === 0 && servedMismatch === 0 && controlDetects;
console.log(`\nexit ${ok ? 0 : 1}: inkCollisions=${inkTotal} bboxPairs=${bboxTotal} wmTextOverlaps=${wmTextTotal} servedMismatch=${servedMismatch} controlDetects=${controlDetects}`);
process.exit(ok ? 0 : 1);
