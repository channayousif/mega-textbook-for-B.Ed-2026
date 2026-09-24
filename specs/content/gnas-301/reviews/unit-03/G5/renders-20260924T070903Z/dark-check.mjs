import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4617/ur/semester-1/gnas-301/unit-03/topic-01', { waitUntil: 'networkidle' });
await page.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
await page.waitForTimeout(800);
const res = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('article figure img')].map((i) => {
    const cs = getComputedStyle(i);
    return { src: i.getAttribute('src'), displayed: cs.display !== 'none' && cs.visibility !== 'hidden', w: i.naturalWidth };
  });
  return { theme: document.documentElement.getAttribute('data-theme'), imgs };
});
console.log(JSON.stringify(res, null, 1));
await page.screenshot({ path: 'specs/content/gnas-301/reviews/unit-03/G5/renders-20260924T070903Z/dark-topic-01.png' });
await browser.close();
