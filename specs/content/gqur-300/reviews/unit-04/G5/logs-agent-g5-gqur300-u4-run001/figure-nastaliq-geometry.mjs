// Figure Nastaliq geometry check - GQUR-300 Unit 4 (G5 run001)
// The Figure component embeds .ur.svg via <img>, so on-page webfonts never apply
// to figure labels; this environment has no system Urdu font either. To measure
// REAL Nastaliq fit, each .ur.svg is inlined into an HTML page that loads the
// self-hosted NotoNastaliqUrdu-Regular.woff2, then every <text> bbox is measured
// against the viewBox and its enclosing panel rect. Screenshots of the
// Nastaliq-rendered figures are saved as evidence.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const EXEC = '/home/a2ahs/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';
const BASE = 'http://localhost:3224';
const FIGS = ['fig-U4-1', 'fig-U4-2', 'fig-U4-3', 'fig-U4-4', 'fig-U4-5', 'fig-U4-6'];
const OUT = 'specs/content/gqur-300/reviews/unit-04/G5/renders-agent-g5-gqur300-u4-run001';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 900, height: 1400 } });
const report = [];

for (const fig of FIGS) {
  const svgText = await (await page.request.get(`${BASE}/img/figures/gqur-300/unit-04/${fig}.ur.svg`)).text();
  const html = `<!doctype html><html><head><style>
    @font-face { font-family: 'Noto Nastaliq Urdu'; src: url('${BASE}/fonts/NotoNastaliqUrdu-Regular.woff2') format('woff2'); }
    body { margin: 0; }
    svg { width: 780px; height: auto; display: block; }
  </style></head><body>${svgText}</body></html>`;
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  const data = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const panels = [...svg.querySelectorAll('rect')].map((r) => ({
      x: +r.getAttribute('x'), y: +r.getAttribute('y'),
      w: +r.getAttribute('width'), h: +r.getAttribute('height'),
      cls: r.getAttribute('class') || '',
    }));
    const fontOk = document.fonts.check('14px "Noto Nastaliq Urdu"', 'پیمائش');
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      const x = +t.getAttribute('x'), y = +t.getAttribute('y');
      const panel = panels.find((p) => x >= p.x - 1 && x <= p.x + p.w + 1 && y >= p.y - 1 && y <= p.y + p.h + 1 && p.w < 780);
      const insideViewBox = b.x >= -0.5 && b.y >= -0.5 && b.x + b.width <= vb.width + 0.5 && b.y + b.height <= vb.height + 0.5;
      let insidePanel = null;
      if (panel) insidePanel = b.x >= panel.x - 2 && b.y >= panel.y - 2 && b.x + b.width <= panel.x + panel.w + 2 && b.y + b.height <= panel.y + panel.h + 2;
      return {
        text: t.textContent.slice(0, 46), x, y,
        bbox: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
        insideViewBox, panel: panel ? `${panel.cls}@${panel.x},${panel.y} ${panel.w}x${panel.h}` : null, insidePanel,
      };
    });
    return { viewBox: { w: vb.width, h: vb.height }, fontOk, texts };
  });
  const shot = `${OUT}/${fig}-ur-nastaliq.png`;
  await page.locator('svg').screenshot({ path: shot });
  const bad = data.texts.filter((t) => !t.insideViewBox || t.insidePanel === false);
  report.push({ fig, fontOk: data.fontOk, viewBox: data.viewBox, textCount: data.texts.length, problems: bad, shot });
}

await browser.close();
writeFileSync(`${OUT}/figure-nastaliq-geometry.json`, JSON.stringify(report, null, 1));
for (const r of report) {
  console.log(`${r.fig}: fontOk=${r.fontOk} texts=${r.textCount} problems=${r.problems.length}`);
  for (const p of r.problems) console.log(`   ! ${p.text} bbox=${JSON.stringify(p.bbox)} inViewBox=${p.insideViewBox} inPanel=${p.insidePanel} panel=${p.panel}`);
}
