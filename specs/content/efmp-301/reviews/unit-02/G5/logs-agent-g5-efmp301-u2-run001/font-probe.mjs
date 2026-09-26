// G5 figure-label font probe (fixed) - run agent-g5-efmp301-u2-run001
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const log = [];
const say = (s) => { log.push(s); console.log(s); };
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3212/ur/semester-1/efmp-301/unit-02/topic-01/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Draw helper: render an SVG string to a canvas, count ink pixels and distinct ink columns.
const drawProbe = (svgBody) => page.evaluate(async (body) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="90">${body}</svg>`;
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  return await new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 460; c.height = 90;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 460, 90);
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, 460, 90).data;
      let ink = 0; const cols = new Set(); const rows = new Set();
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] < 190 || d[i + 1] < 190 || d[i + 2] < 190) {
          ink++; const p = i / 4; cols.add(p % 460); rows.add(Math.floor(p / 460));
        }
      }
      res({ ink, distinctCols: cols.size, distinctRows: rows.size });
    };
    img.onerror = () => res({ error: 'img load failed' });
    img.src = url;
  });
}, svgBody);

const TEXT = 'نشوونما کے تین محرک';
const textEl = (stack) =>
  `<text x="450" y="58" font-family="${stack}" font-size="24" fill="#111111" text-anchor="end" direction="rtl">${TEXT}</text>`;

// A: the exact stack the committed .ur.svg figures declare
const a = await drawProbe(textEl("'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', system-ui, sans-serif"));
say('A figure-stack (img-embedded, no page webfont): ' + JSON.stringify(a));
// B: plain sans-serif
const b = await drawProbe(textEl('sans-serif'));
say('B sans-serif only: ' + JSON.stringify(b));
// C: tofu baseline - private-use glyphs that certainly have no font
const c = await drawProbe(textEl('sans-serif').replace(TEXT, ''));
say('C tofu baseline (PUA chars): ' + JSON.stringify(c));
// D: serif
const d = await drawProbe(textEl('serif'));
say('D serif only: ' + JSON.stringify(d));

// E: what does the actual committed figure look like? draw the real .ur.svg asset
const real = await page.evaluate(async () => {
  return await new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width || 700; c.height = img.height || 430;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let ink = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i] < 190 || d[i + 1] < 190 || d[i + 2] < 190) ink++;
      res({ w: c.width, h: c.height, ink });
    };
    img.onerror = () => res({ error: 'load failed' });
    img.src = '/img/figures/efmp-301/unit-02/fig-U2-1.ur.svg';
  });
});
say('E real fig-U2-1.ur.svg ink: ' + JSON.stringify(real));

await browser.close();
writeFileSync(new URL('./font-probe.log', import.meta.url).pathname, log.join('\n') + '\n');
console.log('DONE');
