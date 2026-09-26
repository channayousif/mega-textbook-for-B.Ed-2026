#!/usr/bin/env node
// G5 feat023-r1: per-figure screenshots of the Urdu figure variants in both themes,
// served from the shared build on port 4626 (same server render-inspect used).
// Produces figure-U5-N-ur-light.png / figure-U5-N-ur-dark.png plus in-context
// element shots of the two RTL-critical diagrams (fig-U5-2 burnout path,
// fig-U5-7 three regions) at desktop width.
import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:4626';
const out = 'specs/content/efmp-302/reviews/unit-05/G5/renders-feat023-r1';
const pagesWithFigs = {
  'topic-01': [1, 2],
  'topic-02': [3, 4],
  'topic-03': [5, 6],
  'topic-04': [7, 8],
};

const browser = await chromium.launch();
for (const theme of ['light', 'dark']) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.emulateMedia({ colorScheme: theme === 'dark' ? 'dark' : 'light' });
  for (const [topic, figs] of Object.entries(pagesWithFigs)) {
    await page.goto(`${base}/ur/semester-1/efmp-302/unit-05/${topic}`, { waitUntil: 'networkidle' });
    for (const n of figs) {
      const sel = `figure:has(img[src*="fig-U5-${n}.ur"])`;
      const el = page.locator(sel).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await el.screenshot({ path: `${out}/figure-U5-${n}-ur-${theme}.png` });
      console.log(`figure-U5-${n}-ur-${theme}.png`);
    }
  }
  await page.close();
}
// In-context full-figure-region shots for the RTL-critical diagrams at desktop width.
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`${base}/ur/semester-1/efmp-302/unit-05/topic-01`, { waitUntil: 'networkidle' });
const f2 = page.locator('figure:has(img[src*="fig-U5-2.ur"])').first();
await f2.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
await f2.screenshot({ path: `${out}/incontext-fig-U5-2-ur.png` });
console.log('incontext-fig-U5-2-ur.png');
await page.goto(`${base}/ur/semester-1/efmp-302/unit-05/topic-04`, { waitUntil: 'networkidle' });
const f7 = page.locator('figure:has(img[src*="fig-U5-7.ur"])').first();
await f7.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
await f7.screenshot({ path: `${out}/incontext-fig-U5-7-ur.png` });
const f8 = page.locator('figure:has(img[src*="fig-U5-8.ur"])').first();
await f8.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
await f8.screenshot({ path: `${out}/incontext-fig-U5-8-ur.png` });
console.log('incontext-fig-U5-7-ur.png, incontext-fig-U5-8-ur.png');
await browser.close();
