#!/usr/bin/env node
/**
 * Urdu figure-internal text-geometry measurement for EFMP-302 Unit 2, G5 feat023-r1.
 *
 * WHY THIS EXISTS. The G5 rubric requires inspecting "the actual Urdu figure variants
 * and labels; correct MDX paths cannot prove a usable diagram". The G3 feat023-r2
 * cycle proved (G-2026-62) that neither check:figures nor measure-figure-text.mjs
 * can see text-on-text superposition inside an SVG, and that only a rendered-DOM
 * getBBox + canvas ink-intersection measurement can. That cycle measured the 16 EN
 * variants; this script is the same measurement over the 16 URDU variants
 * (8 figures x .ur.svg/.ur.dark.svg), which no review has yet measured.
 *
 * METHOD (per SVG file, following the G3 feat023-r2 instrument):
 *   1. The SERVED bytes are fetched from the built site and sha256-compared
 *      with the committed static/img bytes, so the measurement covers exactly
 *      what a learner's browser would paint.
 *   2. The SVG is inlined into a blank page at natural viewBox size in headless
 *      Chromium; every <text> element's getBBox() is taken in SVG user units.
 *      Nastaliq shaping is done by the browser's text stack, so measured widths
 *      are the real painted Urdu extents, not font-metric estimates.
 *   3. Pairwise bbox intersection is computed between all distinct text pairs
 *      (wordmark included).
 *   4. Every bbox-overlapping pair is pixel-tested: the SVG renders three times
 *      into a canvas (A alone, B alone, all text hidden) and the pixels inked in
 *      both A and B, relative to the empty variant, are counted. Glyph ink
 *      intersection, not box arithmetic.
 *   5. The wordmark is bbox-checked against every painted shape as well.
 *   6. A negative control runs the identical measurement over the known-bad
 *      b8f8ffe .ur.svg bytes (the G-2026-62 re-optimisation damage, reverted
 *      course-wide), proving the instrument detects the failure mode in Urdu.
 *
 * Output: a .log and .json in logs-feat023-r1, the control .json, and a 2x
 * standalone PNG of every measured current Urdu variant for visual inspection.
 * Exit 0 only when no text pair shares ink, no wordmark-text overlap occurs, the
 * served bytes match the committed bytes, and the control detects the known bad
 * geometry.
 */
import { chromium } from 'playwright-core';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const base = process.argv[2] || 'http://127.0.0.1:4601';
const unitDir = 'static/img/figures/efmp-302/unit-02';
const logsDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1');
const rendersDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G5/renders-feat023-r1');
mkdirSync(logsDir, { recursive: true });
mkdirSync(rendersDir, { recursive: true });

const FIGS = ['fig-U2-1', 'fig-U2-2', 'fig-U2-3', 'fig-U2-4', 'fig-U2-5', 'fig-U2-6', 'fig-U2-7', 'fig-U2-8'];
const VARIANTS = ['.ur', '.ur.dark'];
const CONTROL_FILES = [
  { name: 'fig-U2-1.b8f8ffe.ur.svg', path: '/tmp/g5-ur-control/fig-U2-1.b8f8ffe.ur.svg' },
  { name: 'fig-U2-2.b8f8ffe.ur.svg', path: '/tmp/g5-ur-control/fig-U2-2.b8f8ffe.ur.svg' },
  { name: 'fig-U2-5.b8f8ffe.ur.svg', path: '/tmp/g5-ur-control/fig-U2-5.b8f8ffe.ur.svg' },
];

const sha = (s) => createHash('sha256').update(s).digest('hex');
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

/** Measure one SVG source string. Returns geometry + pixel results. */
async function measureSvg(page, svgText, label) {
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

/* ---------- Phase 1: current Urdu bytes, served from the fresh build ---------- */
say(`# ur-figure-text-overlap - EFMP-302 unit-02, G5 feat023-r1 (Urdu variants)`);
say(`# started: ${new Date().toISOString()}`);
say(`# base: ${base}   browser: chromium ${browser.version()}`);
say(`# method: served bytes sha256-matched to committed bytes, inlined at viewBox size,`);
say(`#         getBBox per <text> in SVG user units (browser-shaped Nastaliq), pairwise`);
say(`#         bbox intersection, then canvas pixel ink-intersection per overlapping pair.`);
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
    const r = await measureSvg(page, servedText, `${fig}${v}.svg`);
    r.servedMatchesCommitted = matches;
    results.push(r);
    say(`${fig}${v}.svg: texts=${r.textCount} bboxPairs=${r.bboxPairs.length} collisions=${r.collisions.filter((c) => c.both > 0).length} nearMisses=${r.nearMisses.length} wmTextOverlaps=${r.wmTextOverlaps.length} wmRectHits=${r.wmRectHits.length} servedMatch=${matches}`);
    for (const c of r.collisions) say(`   INK-COLLISION: "${c.a}" vs "${c.b}" box ${c.ix}x${c.iy} sharedInkPx=${c.both} (aOnly=${c.aOnly} bOnly=${c.bOnly})`);
    for (const p of r.bboxPairs) say(`   bbox-overlap (pixel-tested): "${p.a}" vs "${p.b}" ${p.ix}x${p.iy}`);
    for (const n of r.nearMisses) say(`   near-miss <2px: "${n.a}" vs "${n.b}" gap=${n.gap}`);
    for (const w of r.wmTextOverlaps) say(`   WORDMARK-TEXT: vs "${w.other}" ${w.ix}x${w.iy}`);
    for (const w of r.wmRectHits) say(`   WORDMARK-SHAPE: vs ${w.tag}.${w.cls} ${w.ix}x${w.iy}`);
    await page.setViewportSize({ width: 1200, height: 900 });
    const el = page.locator('#host svg');
    await el.screenshot({ path: join(rendersDir, `${fig}${v}-standalone-2x.png`) });
  }
}

/* ---------- Phase 2: negative control over the known-bad b8f8ffe Urdu bytes ---------- */
say(`\n# NEGATIVE CONTROL: same measurement over the b8f8ffe .ur.svg bytes (known bad, G-2026-62)`);
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

writeFileSync(join(logsDir, 'ur-figure-text-overlap.log'), `${lines.join('\n')}\n`);
writeFileSync(join(logsDir, 'ur-figure-text-overlap.json'), `${JSON.stringify({
  schema_version: 1, generated_at: new Date().toISOString(), base, browser: `chromium ${browser.version()}`,
  method: 'served Urdu bytes sha256-matched, inlined at viewBox size, getBBox pairwise (browser-shaped Nastaliq), canvas ink-intersection per overlapping pair',
  results: results.map(({ texts, ...r }) => r), summary: { filesChecked: results.length, servedMismatch, bboxOverlapPairsTotal: bboxTotal, inkCollisionsTotal: inkTotal, nearMissTotal: nearTotal, wmTextOverlapsTotal: wmTextTotal },
}, null, 2)}\n`);
writeFileSync(join(logsDir, 'ur-figure-text-overlap-control-b8f8ffe.json'), `${JSON.stringify({
  schema_version: 1, generated_at: new Date().toISOString(),
  control: 'b8f8ffe .ur.svg bytes (known bad, G-2026-62 re-optimisation damage), extracted via git show b8f8ffe:<path>',
  files: CONTROL_FILES.map((c) => c.path),
  detectsKnownBad: controlDetects,
  results: control.map(({ texts, ...r }) => ({ ...r, inkCollisions: r.collisions.filter((x) => x.both > 0).length })),
}, null, 2)}\n`);

const ok = inkTotal === 0 && bboxTotal === 0 && wmTextTotal === 0 && servedMismatch === 0 && controlDetects;
console.log(`\nexit ${ok ? 0 : 1}: inkCollisions=${inkTotal} bboxPairs=${bboxTotal} wmTextOverlaps=${wmTextTotal} servedMismatch=${servedMismatch} controlDetects=${controlDetects}`);
process.exit(ok ? 0 : 1);
