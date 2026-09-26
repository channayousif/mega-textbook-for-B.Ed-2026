#!/usr/bin/env node
// G5 feat023-r1: re-shoot the Urdu figure variants under the site's real dark theme.
// The site themes figures via html[data-theme='dark'] (Docusaurus), not
// prefers-color-scheme, so emulateMedia alone does not switch variants.
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
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.addInitScript(() => {
  try { window.localStorage.setItem('theme', 'dark'); } catch { /* ignore */ }
});
for (const [topic, figs] of Object.entries(pagesWithFigs)) {
  await page.goto(`${base}/ur/semester-1/efmp-302/unit-05/${topic}`, { waitUntil: 'networkidle' });
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  for (const n of figs) {
    const el = page.locator(`figure:has(img[src*="fig-U5-${n}.ur"])`).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await el.screenshot({ path: `${out}/figure-U5-${n}-ur-dark.png` });
    // record which variant is actually shown in this theme
    const shown = await page.evaluate((nn) => {
      const img = document.querySelector(`figure img[src*="fig-U5-${nn}.ur"]`);
      return img && getComputedStyle(img).display !== 'none' ? img.getAttribute('src') : null;
    }, n);
    console.log(`figure-U5-${n}-ur-dark.png (data-theme=${theme}, showing ${shown})`);
  }
}
await browser.close();
