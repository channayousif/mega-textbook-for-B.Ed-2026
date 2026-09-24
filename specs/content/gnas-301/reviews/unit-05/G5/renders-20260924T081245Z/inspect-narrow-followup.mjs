// Follow-up narrow-viewport screenshots for GNAS-301 Unit 5 G5 (run 001).
// The first pass captured both narrow PNGs on the final page (unit-teacher-notes)
// because it did not navigate before each screenshot; this script re-takes them
// correctly and adds topic-04 and index narrow views.
import { chromium } from 'playwright';

const BASE = 'http://localhost:3459/ur/semester-1/gnas-301/unit-05';
const DIR = 'specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 640 } });
const page = await ctx.newPage();
for (const p of ['topic-01', 'topic-02', 'topic-03', 'topic-04', 'unit-assessment', 'index']) {
  await page.goto(`${BASE}/${p}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${DIR}/narrow-360-${p}.png`, fullPage: false });
}
await ctx.close();
await browser.close();
console.log('narrow follow-up screenshots complete');
