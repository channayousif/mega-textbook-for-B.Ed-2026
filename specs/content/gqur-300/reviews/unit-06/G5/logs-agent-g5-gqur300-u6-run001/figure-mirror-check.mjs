// Figure mirroring pixel check for GQUR-300 Unit 6 (agent-g5-gqur300-u6-run001)
// Renders each figure's EN (.svg) and UR (.ur.svg) variants and compares the
// horizontal ink centroid: a mirrored layout places the UR ink mass on the
// opposite side of the canvas centre from the EN variant.
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const BASE = 'http://127.0.0.1:4175';
const figs = ['fig-U6-1', 'fig-U6-2', 'fig-U6-3', 'fig-U6-4', 'fig-U6-5', 'fig-U6-6'];

async function inkCentroid(buf) {
  const { data, info } = await sharp(buf).greyscale().raw().toBuffer({ resolveWithObject: true });
  let sumX = 0, sumW = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const v = data[y * info.width + x];
      const w = 255 - v; // ink weight (dark pixels)
      sumX += x * w;
      sumW += w;
    }
  }
  const cx = sumX / sumW / info.width; // 0..1 normalised
  return { centroidX: +cx.toFixed(3), width: info.width, height: info.height, ink: sumW };
}

const browser = await chromium.launch();
const report = [];
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  for (const fig of figs) {
    const shot = async (variant) => {
      await page.goto(`${BASE}/img/figures/gqur-300/unit-06/${fig}${variant}.svg`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);
      return page.screenshot();
    };
    const en = await inkCentroid(await shot(''));
    const ur = await inkCentroid(await shot('.ur'));
    // mirrored => centroid distances from centre flip sign
    const enOffset = en.centroidX - 0.5;
    const urOffset = ur.centroidX - 0.5;
    report.push({
      fig,
      en: en.centroidX,
      ur: ur.centroidX,
      enOffsetFromCentre: +enOffset.toFixed(3),
      urOffsetFromCentre: +urOffset.toFixed(3),
      mirrored: enOffset * urOffset < 0 || Math.abs(enOffset) < 0.05 || Math.abs(urOffset) < 0.05,
    });
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 1));
