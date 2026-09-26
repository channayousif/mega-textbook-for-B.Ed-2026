// G5 supplementary render check: Nastaliq webfont load + dark-mode Urdu figure variant.
import { chromium } from 'playwright-core';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3217/ur/semester-1/efmp-301/unit-06/topic-02', { waitUntil: 'networkidle' });
const font = await page.evaluate(async () => {
  await document.fonts.ready;
  const el = document.querySelector('h1');
  const cs = getComputedStyle(el);
  const loaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
  return {
    family: cs.fontFamily.slice(0, 80),
    loadedFamilies: [...new Set(loaded)].slice(0, 10),
    nastaliq: [...document.fonts].some((f) => f.family.includes('Nastaliq') && f.status === 'loaded'),
  };
});
console.log('FONT:', JSON.stringify(font));
await page.evaluate(() => {
  document.documentElement.dataset.theme = 'dark';
});
await page.waitForTimeout(800);
const dark = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].filter((i) => i.src.includes('fig-U6'));
  return imgs.map((i) => ({
    src: i.src.split('/').pop(),
    visible: i.offsetParent !== null && getComputedStyle(i).display !== 'none',
    w: i.naturalWidth,
  }));
});
console.log('DARK FIGURES:', JSON.stringify(dark));
await page.screenshot({
  path: 'specs/content/efmp-301/reviews/unit-06/G5/renders-agent-g5-efmp301-u6-run001/topic-02-dark-viewport.png',
});
await browser.close();
