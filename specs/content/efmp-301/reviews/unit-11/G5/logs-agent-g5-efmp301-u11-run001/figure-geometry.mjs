// G5 figure geometry inspection - agent-g5-efmp301-u11-run001
// Loads each unit-11 SVG (EN and UR) into a DOM with the site Nastaliq webfont
// and measures, per <text> element, the rendered bounding box (getBBox) against
// the viewBox edges, the table column dividers and the panel rectangles, so
// clipping / overflow / overprint can be verified without host image display.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FIGDIR = 'static/img/figures/efmp-301/unit-11';
const OUTLOG = 'specs/content/efmp-301/reviews/unit-11/G5/logs-agent-g5-efmp301-u11-run001/figure-geometry.log';
const fontCss = readFileSync('src/css/custom.css', 'utf8');
const fontFace = /@font-face\s*\{[^}]*NotoNastaliq[^}]*\}/.exec(fontCss)?.[0] ?? '';
const lines = [];
const log = (m) => { lines.push(m); console.log(m); };

const MEASURE = () => {
  const svg = document.querySelector('svg');
  const vb = svg.viewBox.baseVal;
  const out = { viewBox: `${vb.x} ${vb.y} ${vb.width} ${vb.height}`, texts: [], paths: [] };
  // column dividers from the .grid path (verticals only)
  const grid = svg.querySelector('path.grid');
  const dividers = [];
  if (grid) {
    const d = grid.getAttribute('d');
    for (const m of d.matchAll(/M\s*(\d+(?:\.\d+)?)\s+\d+(?:\.\d+)?V/g)) dividers.push(Number(m[1]));
  }
  out.dividers = dividers;
  for (const t of svg.querySelectorAll('text')) {
    const b = t.getBBox();
    out.texts.push({
      text: t.textContent.slice(0, 40),
      x: Math.round(b.x * 10) / 10, y: Math.round(b.y * 10) / 10,
      w: Math.round(b.width * 10) / 10, h: Math.round(b.height * 10) / 10,
      right: Math.round((b.x + b.width) * 10) / 10,
      anchor: t.getAttribute('text-anchor') ?? 'start',
    });
  }
  for (const p of svg.querySelectorAll('path.ink')) {
    const b = p.getBBox();
    out.paths.push({ d: p.getAttribute('d'), x: b.x, y: b.y, w: b.width, h: b.height });
  }
  return out;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
for (const fig of ['fig-U11-1', 'fig-U11-2', 'fig-U11-3', 'fig-U11-4']) {
  for (const variant of ['svg', 'ur.svg']) {
    const svg = readFileSync(join(FIGDIR, `${fig}.${variant}`), 'utf8');
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${fontFace}
      body{margin:0}svg{width:780px;height:470px;font-synthesis:none}</style></head><body>${svg}</body></html>`;
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600); // webfont settle before measuring
    const r = await page.evaluate(MEASURE);
    log(`\n===== ${fig}.${variant} (viewBox ${r.viewBox}) dividers=${JSON.stringify(r.dividers)} =====`);
    for (const p of r.paths) log(`  ink path: ${JSON.stringify(p)}`);
    const issues = [];
    for (const t of r.texts) {
      let flag = '';
      if (t.x < 0) flag += ` LEFT-PAST-VIEWBOX(${t.x})`;
      if (t.right > 780) flag += ` RIGHT-PAST-VIEWBOX(${t.right})`;
      if (t.y < 0) flag += ' TOP-PAST-VIEWBOX';
      if (t.y + t.h > 470) flag += ' BOTTOM-PAST-VIEWBOX';
      // overprint: text crossing a vertical divider (tables only)
      for (const dv of r.dividers) {
        if (t.x < dv - 1 && t.right > dv + 1) flag += ` CROSSES-DIVIDER@${dv}`;
      }
      log(`  [${t.w}x${t.h} @${t.x},${t.y} anchor=${t.anchor}] "${t.text}"${flag}`);
      if (flag) issues.push(`"${t.text}"${flag}`);
    }
    if (issues.length) log(`  !! ISSUES: ${issues.join(' | ')}`);
  }
}
await browser.close();
writeFileSync(OUTLOG, `G5 figure geometry inspection - agent-g5-efmp301-u11-run001\nMethod: Chromium (Playwright 1.61.1) getBBox() per <text>, site Nastaliq webfont inlined\n\n${lines.join('\n')}\n`);
console.log('DONE');
