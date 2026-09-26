// Urdu figure geometry inspection for G5 run001 (EFMP-301 Unit 10).
// Fetches each .ur.svg from the served build, inlines it into an HTML wrapper
// carrying the site's Noto Nastaliq Urdu webfont (so text metrics match
// production rendering), then measures every <text> bbox against the viewBox,
// the column dividers and each other (overprint), and checks marker paths
// against their marker viewBox. Screenshots the wrapper for visual evidence.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://127.0.0.1:4599';
const DIR = 'img/figures/efmp-301/unit-10';
const OUT = 'specs/content/efmp-301/reviews/unit-10/G5/renders-agent-g5-efmp301-u10-run001';
const FIGS = ['fig-U10-1', 'fig-U10-2', 'fig-U10-3', 'fig-U10-4'];

const report = { base: BASE, fontLoaded: null, figures: [] };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 820, height: 520 }, deviceScaleFactor: 2 });

for (const fig of FIGS) {
  const svgText = await (await fetch(`${BASE}/${DIR}/${fig}.ur.svg`)).text();
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: 'Noto Nastaliq Urdu';
      src: url('/fonts/NotoNastaliqUrdu-Regular.woff2') format('woff2'); }
    body { margin: 0; }
    svg { width: 780px; height: 470px; display: block; }
    text { font-family: 'Noto Nastaliq Urdu', serif !important; }
  </style></head><body>${svgText}</body></html>`;
  // Serve the wrapper from the SAME ORIGIN as the font so the webfont is not
  // blocked by CORS (an opaque-origin setContent page cannot load it).
  const inspectUrl = `${BASE}/__g5-figure-inspect/${fig}.html`;
  await page.route(inspectUrl, (route) => route.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
  await page.goto(inspectUrl, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; });
  report.fontLoaded = await page.evaluate(() => document.fonts.check("16px 'Noto Nastaliq Urdu'"));

  const data = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      return {
        content: t.textContent.trim(),
        x: +t.getAttribute('x'), y: +t.getAttribute('y'),
        anchor: t.getAttribute('text-anchor') || 'start',
        cls: t.getAttribute('class'),
        bx: Math.round(b.x * 10) / 10, by: Math.round(b.y * 10) / 10,
        bw: Math.round(b.width * 10) / 10, bh: Math.round(b.height * 10) / 10,
      };
    });
    const dividers = [];
    for (const p of svg.querySelectorAll('path.grid')) {
      for (const m of p.getAttribute('d').matchAll(/M\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)V/g)) {
        dividers.push({ x: +m[1], y0: +m[2] });
      }
    }
    const markers = [...svg.querySelectorAll('marker')].map((mk) => {
      const mvb = mk.getAttribute('viewBox').split(/[\s,]+/).map(Number);
      const path = mk.querySelector('path');
      let pb = null;
      try { pb = path.getBBox(); } catch { /* not rendered */ }
      return {
        id: mk.id, viewBox: mvb, refX: mk.getAttribute('refX'),
        pathD: path.getAttribute('d'),
        pathBBox: pb ? { x: Math.round(pb.x), y: Math.round(pb.y), w: Math.round(pb.width), h: Math.round(pb.height) } : null,
        insideViewBox: pb ? (pb.x >= mvb[0] - 0.01 && pb.y >= mvb[1] - 0.01 &&
          pb.x + pb.width <= mvb[2] + 0.01 && pb.y + pb.height <= mvb[3] + 0.01) : null,
      };
    });
    const inkPaths = [...svg.querySelectorAll('path.ink')].map((p) => p.getAttribute('d'));
    const overlaps = [];
    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const a = texts[i], b = texts[j];
        const ox = Math.max(0, Math.min(a.bx + a.bw, b.bx + b.bw) - Math.max(a.bx, b.bx));
        const oy = Math.max(0, Math.min(a.by + a.bh, b.by + b.bh) - Math.max(a.by, b.by));
        if (ox > 1 && oy > 1) overlaps.push({ a: a.content.slice(0, 40), b: b.content.slice(0, 40), ax: a.bx, bx: b.bx, ox: Math.round(ox), oy: Math.round(oy) });
      }
    }
    const overflow = texts.filter((t) => t.bx < -0.5 || t.by < -0.5 || t.bx + t.bw > vb.width + 0.5 || t.by + t.bh > vb.height + 0.5)
      .map((t) => ({ content: t.content.slice(0, 50), bx: t.bx, by: t.by, bw: t.bw, bh: t.bh }));
    return { viewBox: { w: vb.width, h: vb.height }, texts, dividers, markers, inkPaths, overlaps, overflow };
  });

  report.figures.push({ figId: fig, ...data });
  await page.screenshot({ path: `${OUT}/figure-${fig}.ur-light.png`, clip: { x: 0, y: 0, width: 780, height: 470 } });
  console.log(`${fig}: overflow=${data.overflow.length} overlaps=${data.overlaps.length} markersInside=${JSON.stringify(data.markers.map(m => m.insideViewBox))}`);
  for (const o of data.overflow) console.log(`  OVERFLOW ${JSON.stringify(o)}`);
  for (const o of data.overlaps) console.log(`  OVERPRINT ${JSON.stringify(o)}`);
}

await browser.close();
writeFileSync(`${OUT}/figure-geometry-ur.json`, JSON.stringify(report, null, 2));
console.log('saved figure-geometry-ur.json; fontLoaded=' + report.fontLoaded);
