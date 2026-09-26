import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
const ROOT = resolve(process.cwd());
const BASE = 'http://localhost:3000';
const OUT = ROOT + '/specs/content/efmp-302/reviews/unit-05/G3/renders-feat023-r1';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 620 } });
for (const n of [1,2,3,4,5,6,7,8]) {
  for (const theme of ['light','dark']) {
    const f = `fig-U5-${n}${theme === 'dark' ? '.dark' : ''}.svg`;
    await page.goto(`${BASE}/img/figures/efmp-302/unit-05/${f}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/figure-U5-${n}-${theme}.png`, fullPage: false });
    console.log('shot ' + f);
  }
}
await browser.close();
