import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

// Rendered-DOM geometry measurement for committed SVG figures.
// For each SVG: embed at natural size in Chromium, then measure every text
// line (text element or tspan) with getBoundingClientRect. Report:
//  (a) overprint: rects of distinct text lines that overlap by more than 2px
//      in BOTH axes (lines from the same <text> parent that are adjacent
//      tspans are the designed stacking and are excluded only when they do
//      not actually overlap),
//  (b) viewBox overflow: any text rect outside the SVG viewBox,
//  (c) wordmark overlap: any non-wm text rect intersecting the .wm rect,
//  (d) painted-shape overlap with the wordmark: any rect/path box intersecting it.
const files = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });
const report = {};
for (const f of files) {
  const abs = resolve(f);
  let svg = readFileSync(abs, 'utf8');
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  const w = vb ? parseFloat(vb[1]) : 860;
  const h = vb ? parseFloat(vb[2]) : 450;
  svg = svg.replace('<svg ', `<svg width="${w}" height="${h}" `);
  const html = `<!doctype html><html><head><style>html,body{margin:0;padding:0;background:#fff}</style></head>
<body><div id="wrap" style="display:inline-block;line-height:0;position:relative;top:0;left:0">${svg}</div></body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(250);
  const data = await page.evaluate(() => {
    const wrap = document.querySelector('#wrap');
    const wrapBox = wrap.getBoundingClientRect();
    const lines = [];
    for (const t of wrap.querySelectorAll('text')) {
      const cls = t.getAttribute('class') || '';
      const tspans = [...t.children].filter((c) => c.tagName === 'tspan');
      if (tspans.length === 0) {
        const r = t.getBoundingClientRect();
        lines.push({ cls, text: t.textContent.trim().slice(0, 60), x: r.x - wrapBox.x, y: r.y - wrapBox.y, w: r.width, h: r.height, parent: t });
      } else {
        for (const ts of tspans) {
          const r = ts.getBoundingClientRect();
          lines.push({ cls, text: ts.textContent.trim().slice(0, 60), x: r.x - wrapBox.x, y: r.y - wrapBox.y, w: r.width, h: r.height, parent: t });
        }
      }
    }
    // serialise parent identity
    const parentIds = new Map();
    let i = 0;
    for (const l of lines) {
      if (!parentIds.has(l.parent)) parentIds.set(l.parent, i++);
      l.parentId = parentIds.get(l.parent);
      delete l.parent;
    }
    const shapes = [];
    for (const el of wrap.querySelectorAll('rect, path, circle, ellipse, polygon')) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      shapes.push({ tag: el.tagName, cls: el.getAttribute('class') || '', x: r.x - wrapBox.x, y: r.y - wrapBox.y, w: r.width, h: r.height });
    }
    const svgEl = wrap.querySelector('svg');
    return { lines, shapes, svgW: svgEl.clientWidth, svgH: svgEl.clientHeight };
  });
  const out = { svgW: data.svgW, svgH: data.svgH, overprints: [], viewBoxOverflow: [], wordmarkOverlaps: [], shapeWordmarkOverlaps: [] };
  const overlap = (a, b) => {
    const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return ox > 2 && oy > 2 ? { ox: Math.round(ox), oy: Math.round(oy) } : null;
  };
  for (let i = 0; i < data.lines.length; i++) {
    for (let j = i + 1; j < data.lines.length; j++) {
      const a = data.lines[i], b = data.lines[j];
      const o = overlap(a, b);
      if (o) out.overprints.push({ a: `${a.cls}:"${a.text}" [${Math.round(a.x)},${Math.round(a.y)},${Math.round(a.w)}x${Math.round(a.h)}]`, b: `${b.cls}:"${b.text}" [${Math.round(b.x)},${Math.round(b.y)},${Math.round(b.w)}x${Math.round(b.h)}]`, overlap: `${o.ox}x${o.oy}px` });
    }
  }
  for (const l of data.lines) {
    if (l.x < -1 || l.y < -1 || l.x + l.w > data.svgW + 1 || l.y + l.h > data.svgH + 1) {
      out.viewBoxOverflow.push({ line: `${l.cls}:"${l.text}"`, rect: `[${Math.round(l.x)},${Math.round(l.y)},${Math.round(l.w)}x${Math.round(l.h)}] svg ${data.svgW}x${data.svgH}` });
    }
  }
  const wm = data.lines.find((l) => l.cls === 'wm');
  if (wm) {
    for (const l of data.lines) {
      if (l === wm || l.cls === 'wm') continue;
      const o = overlap(l, wm);
      if (o) out.wordmarkOverlaps.push({ line: `${l.cls}:"${l.text}"`, overlap: `${o.ox}x${o.oy}px` });
    }
    for (const s of data.shapes) {
      const o = overlap(s, wm);
      if (o && s.cls !== 'bg') out.shapeWordmarkOverlaps.push({ shape: `${s.tag}.${s.cls} [${Math.round(s.x)},${Math.round(s.y)},${Math.round(s.w)}x${Math.round(s.h)}]`, overlap: `${o.ox}x${o.oy}px` });
    }
  }
  report[abs.split('/').pop()] = out;
  const counts = `overprints=${out.overprints.length} vbOverflow=${out.viewBoxOverflow.length} wmText=${out.wordmarkOverlaps.length} wmShape=${out.shapeWordmarkOverlaps.length}`;
  console.log(`${abs.split('/').pop()}: ${counts}`);
}
writeFileSync(process.env.OUT_JSON || '/tmp/fig-geometry.json', JSON.stringify(report, null, 2));
await browser.close();
