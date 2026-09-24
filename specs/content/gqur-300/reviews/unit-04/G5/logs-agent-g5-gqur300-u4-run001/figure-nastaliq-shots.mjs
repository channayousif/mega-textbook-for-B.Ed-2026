// Nastaliq evidence shots - GQUR-300 Unit 4 G5 run001.
// Same-origin font + direction:ltr (standalone-img semantics), one screenshot
// per .ur.svg with the real Noto Nastaliq Urdu webfont applied.
import { chromium } from 'playwright-core';

const EXEC = '/home/a2ahs/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';
const BASE = 'http://localhost:3224';
const FIGS = ['fig-U4-1', 'fig-U4-2', 'fig-U4-3', 'fig-U4-4', 'fig-U4-5', 'fig-U4-6'];
const OUT = 'specs/content/gqur-300/reviews/unit-04/G5/renders-agent-g5-gqur300-u4-run001';

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 900, height: 1400 } });
await page.goto(`${BASE}/ur/semester-1/gqur-300/unit-04/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

for (const fig of FIGS) {
  const svgText = await (await page.request.get(`${BASE}/img/figures/gqur-300/unit-04/${fig}.ur.svg`)).text();
  await page.evaluate((svgText) => {
    document.querySelector('article')?.remove();
    let holder = document.getElementById('g5-holder');
    if (!holder) holder = document.body.appendChild(Object.assign(document.createElement('div'), { id: 'g5-holder' }));
    holder.setAttribute('dir', 'ltr');
    holder.style.direction = 'ltr';
    holder.innerHTML = svgText;
    holder.querySelector('svg').setAttribute('width', '780');
  }, svgText);
  await page.waitForTimeout(150);
  await page.locator('#g5-holder svg').screenshot({ path: `${OUT}/${fig}-ur-nastaliq.png` });
  console.log(`${fig}-ur-nastaliq.png saved`);
}
await browser.close();
