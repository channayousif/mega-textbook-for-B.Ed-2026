// Lazy-load reachability test: scroll each topic page to the bottom in steps and
// confirm every content figure finishes loading (naturalWidth > 0).
import { chromium } from 'playwright';

const BASE = 'http://localhost:3217';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
for (const name of ['topic-01', 'topic-02', 'topic-03']) {
  await page.goto(`${BASE}/semester-1/efmp-301/unit-04/${name}/`, { waitUntil: 'load' });
  // Scroll through the page in 400px steps, 250ms apart, to the end.
  await page.evaluate(async () => {
    const step = 400;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1200);
  const imgs = await page.evaluate(() =>
    [...document.querySelectorAll('article img')].map((i) => ({
      src: i.getAttribute('src'),
      complete: i.complete,
      naturalWidth: i.naturalWidth,
    }))
  );
  const unloaded = imgs.filter((i) => !i.complete || i.naturalWidth === 0);
  console.log(`${name}: ${imgs.length} article images, unloaded after full scroll: ${unloaded.length}`);
  for (const u of unloaded) console.log('  UNLOADED', u.src);
}
await browser.close();
console.log('DONE');
