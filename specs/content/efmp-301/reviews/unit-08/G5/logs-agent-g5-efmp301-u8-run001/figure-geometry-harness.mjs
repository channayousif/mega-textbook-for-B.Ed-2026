// G5 run001 figure geometry harness: loads each Urdu SVG variant in Chromium and
// measures (a) every text element's bounding box against the vertical grid
// dividers and the viewBox, and (b) whether the fig-U8-5 arrowhead marker
// renders any visible pixels. Conclusions for the rtl criterion rest on these
// browser measurements; the PNGs in renders/figures are the human-viewable copy.
import { chromium } from 'playwright-core';

const base = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';

const exe = '/home/a2ahs/.cache/ms-playwright/chromium-1228/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 780, height: 470 } });

const report = {};

async function measureFig(file) {
  await page.goto(`file://${base}/static/img/figures/efmp-301/unit-08/${file}`);
  await page.waitForTimeout(200);
  return page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const grid = [...svg.querySelectorAll('path.grid')].map((p) => p.getAttribute('d'));
    // vertical divider x positions from the grid path data
    const dividers = [];
    for (const d of grid) {
      for (const m of d.matchAll(/M\s*(\d+(?:\.\d+)?)\s+\d+V/g)) dividers.push(Number(m[1]));
    }
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      return { text: t.textContent.trim().slice(0, 40), x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1), right: +(b.x + b.width).toFixed(1) };
    });
    // which texts are crossed by a vertical divider?
    const crossed = [];
    for (const t of texts) {
      for (const d of dividers) {
        if (d > t.x + 1 && d < t.right - 1) crossed.push({ text: t.text, divider: d, textX: t.x, textRight: t.right, y: t.y });
      }
    }
    // any text outside the viewBox?
    const outside = texts.filter((t) => t.x < 0 || t.right > vb.width || t.y < 0 || t.y + t.h > vb.height);
    return { viewBox: `${vb.width}x${vb.height}`, dividers, textCount: texts.length, crossed, outside };
  });
}

for (const f of ['fig-U8-1.ur.svg', 'fig-U8-2.ur.svg', 'fig-U8-3.ur.svg', 'fig-U8-4.ur.svg', 'fig-U8-5.ur.svg', 'fig-U8-6.ur.svg', 'fig-U8-6.ur.dark.svg']) {
  report[f] = await measureFig(f);
}

// fig-U8-5 marker visibility: sample pixels around the top of the arrow line
// (x=660, y=95 in SVG coords) in both EN and UR variants and count dark pixels.
async function markerPixels(file, x, y) {
  await page.goto(`file://${base}/static/img/figures/efmp-301/unit-08/${file}`);
  await page.waitForTimeout(200);
  return page.evaluate(([x, y]) => {
    const svg = document.querySelector('svg');
    const r = svg.getBoundingClientRect();
    const sx = r.width / 780, sy = r.height / 470;
    const c = document.createElement('canvas');
    c.width = Math.round(r.width); c.height = Math.round(r.height);
    const ctx = c.getContext('2d');
    ctx.drawImage(svg, 0, 0);
    // sample a 30x30 box centred just below the arrow tip
    const cx = Math.round(x * sx), cy = Math.round(y * sy);
    let dark = 0, total = 0;
    const data = ctx.getImageData(cx - 15, cy - 4, 30, 26).data;
    for (let i = 0; i < data.length; i += 4) {
      total++;
      if (data[i] < 120 && data[i + 1] < 120 && data[i + 2] < 120) dark++;
    }
    return { dark, total, ratio: +(dark / total).toFixed(3) };
  }, [x, y]);
}
report['marker-en@tip'] = await markerPixels('fig-U8-5.svg', 120, 100);
report['marker-ur@tip'] = await markerPixels('fig-U8-5.ur.svg', 660, 100);

console.log(JSON.stringify(report, null, 1));
await browser.close();
