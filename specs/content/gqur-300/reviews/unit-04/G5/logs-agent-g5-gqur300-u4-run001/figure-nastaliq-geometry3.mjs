// Figure Nastaliq geometry check v3 - GQUR-300 Unit 4 (G5 run001)
// v2教训: inlining into the RTL /ur/ page flips text-anchor start/end (svg
// inherits direction:rtl), which the real <img> render never does - a standalone
// SVG document has LTR base direction. v3 keeps the same-origin Nastaliq
// webfont but forces direction:ltr on the holder, reproducing standalone-img
// anchor semantics with the real font. English figures measured identically.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const EXEC = '/home/a2ahs/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';
const BASE = 'http://localhost:3224';
const FIGS = ['fig-U4-1', 'fig-U4-2', 'fig-U4-3', 'fig-U4-4', 'fig-U4-5', 'fig-U4-6'];
const OUT = 'specs/content/gqur-300/reviews/unit-04/G5/renders-agent-g5-gqur300-u4-run001';

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 900, height: 1400 } });
await page.goto(`${BASE}/ur/semester-1/gqur-300/unit-04/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const report = [];

for (const fig of FIGS) {
  for (const variant of ['ur', 'en']) {
    const suffix = variant === 'ur' ? '.ur.svg' : '.svg';
    const svgText = await (await page.request.get(`${BASE}/img/figures/gqur-300/unit-04/${fig}${suffix}`)).text();
    const data = await page.evaluate((svgText) => {
      document.querySelector('article')?.remove();
      let holder = document.getElementById('g5-holder');
      if (!holder) {
        holder = document.body.appendChild(Object.assign(document.createElement('div'), { id: 'g5-holder' }));
      }
      // LTR base direction, exactly like a standalone SVG document in an <img>.
      holder.setAttribute('dir', 'ltr');
      holder.style.direction = 'ltr';
      holder.innerHTML = svgText;
      const svg = holder.querySelector('svg');
      svg.setAttribute('width', '780');
      const vb = svg.viewBox.baseVal;
      const panels = [...svg.querySelectorAll('rect')].map((r) => ({
        x: +r.getAttribute('x'), y: +r.getAttribute('y'),
        w: +r.getAttribute('width'), h: +r.getAttribute('height'),
        cls: r.getAttribute('class') || '',
      })).filter((p) => p.w);
      const fontOk = document.fonts.check('14px "Noto Nastaliq Urdu"', 'پیمائش');
      const texts = [...svg.querySelectorAll('text')].map((t) => {
        const b = t.getBBox();
        const x = +t.getAttribute('x'), y = +t.getAttribute('y');
        const panel = panels.find((p) => x >= p.x - 1 && x <= p.x + p.w + 1 && y >= p.y - 1 && y <= p.y + p.h + 1 && p.w < vb.width);
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
    }, svgText);
    const bad = data.texts.filter((t) => !t.insideViewBox || t.insidePanel === false || (t.bbox.h > 40));
    report.push({ fig, variant, fontOk: data.fontOk, viewBox: data.viewBox, textCount: data.texts.length, problems: bad });
  }
  // Nastaliq-rendered evidence shot of the UR figure (ltr base, real font)
  const shot = `${OUT}/${fig}-ur-nastaliq.png`;
  await page.locator('#g5-holder svg').screenshot({ path: shot });
}

await browser.close();
writeFileSync(`${OUT}/figure-nastaliq-geometry.json`, JSON.stringify(report, null, 1));
for (const r of report) {
  console.log(`${r.fig} [${r.variant}]: fontOk=${r.fontOk} texts=${r.textCount} problems=${r.problems.length}`);
  for (const p of r.problems) console.log(`   ! "${p.text}" bbox=${JSON.stringify(p.bbox)} inViewBox=${p.insideViewBox} inPanel=${p.insidePanel} panel=${p.panel}`);
}
