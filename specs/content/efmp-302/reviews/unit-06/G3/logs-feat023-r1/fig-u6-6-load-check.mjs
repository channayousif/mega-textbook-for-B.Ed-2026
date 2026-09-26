// fig-U6-6 load verification on the real topic-03 page (feat023-r1).
// render-inspect reported "visible image did not load: fig-U6-6.svg" on topic-03.
// Hypothesis: lazy-load race (loading=lazy; image sits deep in the longest topic).
// This script loads the page, scrolls the figure into view, waits for the
// network fetch + decode, then reports naturalWidth and screenshots it in context.

import { chromium } from 'playwright-core';

const BASE = 'http://127.0.0.1:8124';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const failed = [];
page.on('requestfailed', (r) => failed.push(r.url()));
const responses = [];
page.on('response', (r) => { if (r.url().includes('fig-U6-6')) responses.push(`${r.status()} ${r.url()}`); });

await page.goto(`${BASE}/semester-1/efmp-302/unit-06/topic-03/`, { waitUntil: 'load' });
const before = await page.evaluate(() => {
  const img = [...document.querySelectorAll('img')].find((i) => i.src.includes('fig-U6-6.svg'));
  const r = img.getBoundingClientRect();
  return { natural: `${img.naturalWidth}x${img.naturalHeight}`, complete: img.complete, top: r.top + window.scrollY, vh: window.innerHeight };
});
console.log(`before scroll: natural=${before.natural} complete=${before.complete} figureTop=${Math.round(before.top)} viewportH=${before.vh} (page must scroll ${Math.round(before.top - before.vh + 100)}px before lazy fetch begins)`);

await page.evaluate(() => { const img = [...document.querySelectorAll('img')].find((i) => i.src.includes('fig-U6-6.svg')); img.scrollIntoView({ block: 'center' }); });
await page.waitForLoadState('networkidle');
await page.waitForTimeout(800);
const after = await page.evaluate(() => {
  const img = [...document.querySelectorAll('img')].find((i) => i.src.includes('fig-U6-6.svg'));
  return { natural: `${img.naturalWidth}x${img.naturalHeight}`, complete: img.complete, shown: img.getBoundingClientRect().width > 0 };
});
console.log(`after scroll + networkidle: natural=${after.natural} complete=${after.complete} shown=${after.shown}`);
console.log(`fig-U6-6 network responses: ${responses.join(' | ') || 'NONE'}`);
console.log(`failed requests: ${failed.length ? failed.join(' | ') : 'none'}`);

// Screenshot the figure in page context as render evidence.
const fig = page.locator('figure', { has: page.locator('img[src*="fig-U6-6.svg"]') });
await fig.screenshot({ path: 'specs/content/efmp-302/reviews/unit-06/G3/renders-feat023-r1/fig-U6-6-inpage-desktop.png' });
console.log('in-page screenshot: renders-feat023-r1/fig-U6-6-inpage-desktop.png');

// Also verify the other 7 figures load in context on their pages (scroll each into view).
for (const t of ['topic-01', 'topic-02', 'topic-04']) {
  await page.goto(`${BASE}/semester-1/efmp-302/unit-06/${t}/`, { waitUntil: 'load' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState('networkidle');
  const imgs = await page.evaluate(() => [...document.querySelectorAll('img')].map((i) => ({ src: i.src.split('/').pop(), natural: `${i.naturalWidth}x${i.naturalHeight}`, shown: i.getBoundingClientRect().width > 0 })));
  console.log(`${t}: ${imgs.map((i) => `${i.src}=${i.natural}${i.shown ? '' : ' (hidden)'}`).join(', ')}`);
}
const verdict = after.natural !== '0x0' ? 'FIG-U6-6 LOADS: render-inspect defect was a lazy-load measurement race, not a content defect' : 'FIG-U6-6 GENUINELY FAILS TO LOAD';
console.log(`\nVERDICT: ${verdict}`);
await browser.close();
