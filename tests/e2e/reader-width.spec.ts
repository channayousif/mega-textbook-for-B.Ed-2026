import { test, expect } from '@playwright/test';

/**
 * Owner ruling, 2026-11-04: on desktop the reader's text, headings and figures share
 * one column, so right edges line up. Before this, a 72ch text limit inside a wider
 * column left paragraphs about 224px short of the cards and images around them.
 */
const TOPIC = '/semester-1/efmp-302/unit-01/topic-01/';

for (const width of [1280, 1920]) {
  test(`reader column shares one edge at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(TOPIC);
    const result = await page.evaluate(() => {
      const article = document.querySelector('main article')!.getBoundingClientRect();
      const offsets = [...document.querySelectorAll(
        '.topic-section--explanation > p, .topic-section--explanation > ul, .topic-section--explanation > h2',
      )].map((el) => Math.abs(el.getBoundingClientRect().right - article.right));
      return {
        width: article.width,
        measured: offsets.length,
        worst: Math.max(...offsets),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    expect(result.width).toBeLessThanOrEqual(860);
    expect(result.measured).toBeGreaterThan(0);
    expect(result.worst).toBeLessThanOrEqual(1);
    expect(result.overflow).toBe(0);
  });
}
