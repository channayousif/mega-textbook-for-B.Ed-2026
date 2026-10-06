import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
const ROOT = resolve(process.cwd());
const BASE = 'http://localhost:3000';
const OUT = ROOT + '/specs/content/efmp-302/reviews/unit-05/G3/renders-feat023-r1';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const pages = {
  'topic-01': ['fig-U5-1', 'fig-U5-2'],
  'topic-02': ['fig-U5-3', 'fig-U5-4'],
  'topic-03': ['fig-U5-5', 'fig-U5-6'],
  'topic-04': ['fig-U5-7', 'fig-U5-8'],
};
for (const [p, figs] of Object.entries(pages)) {
  await page.goto(`${BASE}/semester-1/efmp-302/unit-05/${p}`, { waitUntil: 'networkidle' });
  for (const fig of figs) {
    const el = page.locator(`figure[data-figure-id="${fig}"], figure:has(img[src*="${fig}."])`).first();
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: `${OUT}/incontext-${fig}.png` });
    console.log('shot in-context ' + fig);
  }
}
await browser.close();
