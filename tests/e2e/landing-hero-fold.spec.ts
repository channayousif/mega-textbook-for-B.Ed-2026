import { test, expect } from '@playwright/test';

// Feature 034 T013 (#800): the hero heading, lead and buttons sit in the first viewport, below the
// navbar, on common desktop and phone sizes, in both languages. The news ticker follows the hero.
const sizes = [
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 390, height: 844 },
  { width: 360, height: 740 },
];

for (const path of ['/', '/ur/']) {
  for (const size of sizes) {
    test(`hero buttons are above the fold at ${size.width}x${size.height} on ${path}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto(path);
      const hero = page.locator('main section').first();
      await expect(hero.locator('h1')).toBeVisible();
      const ctas = hero.locator('a.button').first().locator('..');
      const box = await ctas.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(size.height);
    });
  }
}
