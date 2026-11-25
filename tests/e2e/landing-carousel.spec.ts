import { test, expect } from '@playwright/test';

// Feature 034 T016 (#803): "Learning aids" and "Features" are carousels: native scroll-snap rows
// with previous/next buttons and arrow keys, in both languages.
for (const path of ['/', '/ur/']) {
  test(`landing carousels scroll with buttons and keys on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    const carousels = page.locator('[aria-roledescription]');
    await expect(carousels).toHaveCount(2);
    for (const i of [0, 1]) {
      const region = carousels.nth(i);
      await region.scrollIntoViewIfNeeded();
      const track = region.locator('[tabindex="0"]').first();
      const pos = () => track.evaluate((el) => Math.abs(el.scrollLeft));
      const prev = region.getByRole('button').first();
      const next = region.getByRole('button').last();
      await expect(prev).toBeDisabled();
      await next.click();
      await expect.poll(pos).toBeGreaterThan(50);
      const afterClick = await pos();
      await track.focus();
      await page.keyboard.press(path === '/ur/' ? 'ArrowLeft' : 'ArrowRight');
      await expect.poll(pos).toBeGreaterThan(afterClick);
      await expect(prev).toBeEnabled();
    }
  });
}
