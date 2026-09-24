// Corrected pixel check of the RENDERED fig-U5-5 image element.
// The first pass sampled the <figure> (image + caption), so vertical mapping
// was wrong. This pass screenshots the <img> itself (uniform SVG scaling) and
// samples the dot row and the stacked dots.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const BASE = 'http://127.0.0.1:4311';
const OUT = 'specs/content/gqur-300/reviews/unit-05/G3/renders-agent-g3-gqur300-u5-run001';
const report = { generated: new Date().toISOString() };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + '/semester-1/gqur-300/unit-05/topic-03', { waitUntil: 'networkidle' });
  const img = page.locator('#fig-U5-5 img').first();
  const box = await img.boundingBox();
  const png = await img.screenshot();
  writeFileSync(`${OUT}/fig-U5-5-img-verify.png`, png);
  const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const o = (Math.round(y) * info.width + Math.round(x)) * info.channels;
    return [data[o], data[o + 1], data[o + 2]];
  };
  const sx = info.width / 780, sy = info.height / 470;
  const isDark = ([r, g, b]) => r + g + b < 300;
  const valueX = (v) => 60 + (v - 20) * 7.5;
  const dotAt = (v, cy) => {
    // sample a 3x3 neighborhood around the mapped center; dot radius 7 svg-units
    const cx = valueX(v) * sx, cyy = cy * sy;
    for (const dx of [-2, 0, 2]) for (const dy of [-2, 0, 2]) {
      if (isDark(px(cx + dx, cyy + dy))) return true;
    }
    return false;
  };
  const samples = {};
  // stated data values and where they SHOULD appear
  for (const v of [20, 45, 50, 55, 60, 62, 70, 96]) samples[`stated_${v}_baseRow`] = dotAt(v, 316);
  // spurious values the SVG source actually plots
  for (const v of [35, 40, 52, 100]) samples[`plotted_${v}_baseRow`] = dotAt(v, 316);
  // stacks: 62 twice (svg cy 316+294) SHOULD be at x(62); actually plotted at x(52)
  samples.stated_62_stackSecond = dotAt(62, 294);
  samples.plotted_52_stackSecond = dotAt(52, 294);
  // 70 three times SHOULD be at x(70) cy 316/294/272; actually plotted at x(60)
  samples.stated_70_stackBase = dotAt(70, 316);
  samples.plotted_60_stackBase = dotAt(60, 316);
  samples.plotted_60_stackSecond = dotAt(60, 294);
  samples.plotted_60_stackThird = dotAt(60, 272);
  report.imgBox = box;
  report.renderSize = `${info.width}x${info.height}`;
  report.scale = { sx, sy };
  report.samples = samples;
} finally {
  await browser.close();
}
writeFileSync(`${OUT}/fig-U5-5-pixel-check.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
