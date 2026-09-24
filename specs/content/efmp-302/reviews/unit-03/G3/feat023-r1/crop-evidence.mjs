import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });

async function renderFig(path) {
  let svg = readFileSync(resolve(path), 'utf8');
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  const w = vb ? parseFloat(vb[1]) : 860;
  const h = vb ? parseFloat(vb[2]) : 450;
  svg = svg.replace('<svg ', `<svg width="${w}" height="${h}" `);
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;padding:0;background:#fff}</style></head><body><div id="wrap" style="display:inline-block;line-height:0">${svg}</div></body></html>`, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  return page.locator('#wrap').screenshot();
}

const outDir = 'specs/content/efmp-302/reviews/unit-03/G3/renders-feat023-r1';
const jobs = [
  { fig: 'fig-U3-7', regions: [{ name: 'row4-overprint', l: 230, t: 240, w: 620, h: 100 }, { name: 'caption-overprint', l: 10, t: 285, w: 560, h: 120 }] },
  { fig: 'fig-U3-2', regions: [{ name: 'caption-overprint', l: 300, t: 295, w: 590, h: 90 }] },
  { fig: 'fig-U3-9', regions: [{ name: 'caption-overprint', l: 30, t: 290, w: 600, h: 100 }] },
  { fig: 'fig-U3-6', regions: [{ name: 'outcome-overprint', l: 640, t: 240, w: 230, h: 90 }] },
  { fig: 'fig-U3-5', regions: [{ name: 'caption-overprint', l: 300, t: 375, w: 570, h: 60 }] },
];
for (const j of jobs) {
  const full = await renderFig(`static/img/figures/efmp-302/unit-03/${j.fig}.svg`);
  for (const r of j.regions) {
    await sharp(full).extract({ left: r.l * 2, top: r.t * 2, width: r.w * 2, height: r.h * 2 }).png().toFile(`${outDir}/crop-${j.fig}-${r.name}.png`);
    console.log(`saved crop-${j.fig}-${r.name}.png`);
  }
  await sharp(full).png().toFile(`${outDir}/${j.fig}-standalone-2x.png`);
  console.log(`saved ${j.fig}-standalone-2x.png`);
}
await browser.close();
