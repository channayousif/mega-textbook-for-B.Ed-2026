// G3 run005: targeted re-measurement of the run-004 figure-crop finding (fig-U4-4)
// and keyboard reachability of the figure scroll regions at 360px.
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const OUT = 'specs/content/efmp-302/reviews/unit-04/renders-agent-g3-efmp302-u4-run005';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:3104/semester-1/efmp-302/unit-04/topic-02', { waitUntil: 'networkidle' });

const region = page.locator('[role="region"][aria-label*="Scrollable figure"]').nth(1); // fig-U4-4
await region.scrollIntoViewIfNeeded();
await region.screenshot({ path: `${OUT}/fig-U4-4-narrow-360-scroll0.png` });
const before = await region.evaluate((el) => ({ scrollLeft: el.scrollLeft, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));

// keyboard: focus the region and drive it with the End key, as a keyboard-only learner would
await region.focus();
const focused = await page.evaluate(() => {
  const a = document.activeElement;
  return { tag: a.tagName, role: a.getAttribute('role'), label: a.getAttribute('aria-label') };
});
// ArrowRight is the keyboard gesture that scrolls a focused scroll container;
// End is recorded too because it does NOT move a horizontal scroller.
for (const k of ['ArrowRight', 'ArrowRight', 'ArrowRight']) { await page.keyboard.press(k); await page.waitForTimeout(150); }
const afterArrows = await region.evaluate((el) => el.scrollLeft);
await page.keyboard.press('End');
await page.waitForTimeout(400);
const after = await region.evaluate((el) => ({ scrollLeft: el.scrollLeft, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
await region.screenshot({ path: `${OUT}/fig-U4-4-narrow-360-scrolled-end.png` });

// the caveat lines live in the SVG at x=32,y=516/532 - confirm they are inside the rendered box
const caveat = await page.evaluate(() => {
  const img = document.querySelector('img[src*="fig-U4-4.svg"]');
  const r = img.getBoundingClientRect();
  return { imgW: Math.round(r.width), imgH: Math.round(r.height), alt: img.getAttribute('alt') };
});

// also record the same for fig-U4-1 (topic-01) as a control
await page.goto('http://localhost:3104/semester-1/efmp-302/unit-04/topic-01', { waitUntil: 'networkidle' });
const r1 = page.locator('[role="region"][aria-label*="Scrollable figure"]').first();
await r1.scrollIntoViewIfNeeded();
await r1.screenshot({ path: `${OUT}/fig-U4-1-narrow-360-region.png` });

const out = { before, focused, afterArrows, after, caveat, keyboard_scroll_worked: afterArrows > before.scrollLeft, note: 'ArrowRight scrolls the focused region; End does not move a horizontal scroller.' };
writeFileSync(`${OUT}/fig-crop-measurement-run005.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
