// Element-level figure screenshots at 360px + unnamed-link identification.
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173/semester-1/gqur-300/unit-06';
const OUT = 'specs/content/gqur-300/reviews/unit-06/G3/renders-agent-g3-gqur300-u6-run001';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
const page = await ctx.newPage();

const topics = [['topic-01', 2], ['topic-02', 2], ['topic-03', 2]];
for (const [name] of topics) {
  await page.goto(`${BASE}/${name}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const figs = page.locator('figure');
  const n = await figs.count();
  for (let i = 0; i < n; i++) {
    await figs.nth(i).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await figs.nth(i).screenshot({ path: `${OUT}/${name}-fig${i + 1}-n360.png` });
    console.log(`saved ${name}-fig${i + 1}-n360.png`);
  }
  // identify unnamed links
  const unnamed = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => !a.textContent.trim()).map((a) => ({ href: a.getAttribute('href'), aria: a.getAttribute('aria-label'), cls: a.className, html: a.outerHTML.slice(0, 140) })));
  console.log(`unnamed links on ${name}:`, JSON.stringify(unnamed, null, 1));
  // first viewport screenshot (readable top of page)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${OUT}/${name}-top-n360.png` });
}
await browser.close();
console.log('DONE');
