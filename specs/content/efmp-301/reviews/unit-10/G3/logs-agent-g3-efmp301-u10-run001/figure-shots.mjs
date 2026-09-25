// Element-level figure screenshots for G3 run001 (EFMP-301 Unit 10).
import { chromium } from 'playwright';

const OUT = 'specs/content/efmp-301/reviews/unit-10/G3/renders-agent-g3-efmp301-u10-run001';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });

for (const [url, figs] of [
  ['http://localhost:3210/semester-1/efmp-301/unit-10/topic-01/', ['fig-U10-1', 'fig-U10-2']],
  ['http://localhost:3210/semester-1/efmp-301/unit-10/topic-02/', ['fig-U10-3', 'fig-U10-4']],
]) {
  await page.goto(url, { waitUntil: 'networkidle' });
  for (const id of figs) {
    const el = page.locator(`#${id}`).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await el.screenshot({ path: `${OUT}/figure-${id}-light.png` });
  }
}
await browser.close();
console.log('figure shots saved');
