import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// Ink-collision proof: for a named pair of text lines in an SVG, render the SVG
// twice - once with only line A visible, once with only line B visible - and
// test whether any pixel inside the pair's overlap box is inked in BOTH
// renders. Pixel intersection proves the two lines' glyphs physically collide.
const [svgPath, selA, selB] = process.argv.slice(2);
let svg = readFileSync(resolve(svgPath), 'utf8');
const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
const w = vb ? parseFloat(vb[1]) : 860;
const h = vb ? parseFloat(vb[2]) : 450;
svg = svg.replace('<svg ', `<svg width="${w}" height="${h}" `);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1100 }, deviceScaleFactor: 2 });
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
const html = (mode) => `<!doctype html><html><head><style>html,body{margin:0;padding:0;background:#fff}
.hide-others text{visibility:hidden}</style></head>
<body><div id="wrap" style="display:inline-block;line-height:0">${svg}</div>
<script>
(() => {
  const __inkMode = ${JSON.stringify(mode)};
  const texts = [...document.querySelectorAll('#wrap text')];
  for (const t of texts) {
    if (!t.textContent.includes(__inkMode)) t.style.visibility = 'hidden';
  }
})();
</script></body></html>`;

async function crop(mode, box) {
  await page.setContent(html(mode), { waitUntil: 'load' });
  await page.waitForTimeout(250);
  const visCount = await page.evaluate(() => [...document.querySelectorAll('#wrap text')].filter((t) => t.style.visibility !== 'hidden').length);
  console.log(`  [render mode="${mode.slice(0, 30)}" visible texts=${visCount}]`);
  const full = await page.locator('#wrap').screenshot();
  const { default: sharp } = await import('sharp');
  return sharp(full)
    .extract({ left: Math.round(box.x * 2), top: Math.round(box.y * 2), width: Math.round(box.w * 2), height: Math.round(box.h * 2) })
    .png()
    .toBuffer();
}

// find the two lines' rects in the fully rendered svg
await page.setContent(html('§none§'), { waitUntil: 'load' });
await page.waitForTimeout(250);
const info = await page.evaluate(() => {
  const wrap = document.querySelector('#wrap');
  const wb = wrap.getBoundingClientRect();
  const out = [];
  for (const t of wrap.querySelectorAll('text')) {
    for (const el of [t, ...t.querySelectorAll('tspan')]) {
      const r = el.getBoundingClientRect();
      out.push({ text: el.textContent, x: r.x - wb.x, y: r.y - wb.y, w: r.width, h: r.height });
    }
  }
  return out;
});
const lineA = info.find((l) => l.text.includes(selA));
const lineB = info.find((l) => l.text.includes(selB));
if (!lineA || !lineB) { console.error('lines not found'); process.exit(2); }
const ox = Math.max(lineA.x, lineB.x), oy = Math.max(lineA.y, lineB.y);
const ow = Math.min(lineA.x + lineA.w, lineB.x + lineB.w) - ox;
const oh = Math.min(lineA.y + lineA.h, lineB.y + lineB.h) - oy;
console.log(`A="${lineA.text.trim().slice(0, 40)}" B="${lineB.text.trim().slice(0, 40)}" overlapBox=${Math.round(ox)},${Math.round(oy)} ${Math.round(ow)}x${Math.round(oh)}`);
if (ow <= 0 || oh <= 0) { console.log('NO RECT OVERLAP'); process.exit(0); }
const box = { x: ox, y: oy, w: ow, h: oh };
const bufA = await crop(selA, box);
const bufB = await crop(selB, box);
const { default: sharp } = await import('sharp');
const rawA = await sharp(bufA).greyscale().raw().toBuffer({ resolveWithObject: true });
const rawB = await sharp(bufB).greyscale().raw().toBuffer({ resolveWithObject: true });
let both = 0, aOnly = 0, bOnly = 0;
for (let i = 0; i < rawA.data.length; i++) {
  const a = rawA.data[i] < 160, b = rawB.data[i] < 160;
  if (a && b) both++; else if (a) aOnly++; else if (b) bOnly++;
}
const total = rawA.data.length;
console.log(`ink pixels: A=${aOnly} B=${bOnly} BOTH=${both} (${(100 * both / total).toFixed(2)}% of overlap box)`);
console.log(both > 20 ? `INK COLLISION CONFIRMED: ${both} pixels carry ink from both lines` : 'no meaningful ink collision');
await browser.close();
