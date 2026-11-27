import { test, expect } from '@playwright/test';

// Feature 034 T035 (#822): on a phone a wide figure offers "View full size", which opens the
// figure at its natural width in a full-screen viewer; Escape closes it. Desktop shows no control.
test('wide figures open full size on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/semester-1/efmp-302/unit-01/topic-01');
  const control = page.getByRole('button', { name: 'View full size' }).first();
  await control.scrollIntoViewIfNeeded();
  await expect(control).toBeVisible();
  await control.click();
  const viewer = page.locator('dialog.figure-zoom[open]');
  await expect(viewer).toBeVisible();
  const img = viewer.locator('img');
  await expect(img).toHaveAttribute('src', /\/img\/figures\//);
  expect(await img.evaluate((el) => el.getBoundingClientRect().width)).toBeGreaterThan(390);
  await page.keyboard.press('Escape');
  await expect(viewer).toHaveCount(0);
});

test('desktop shows no full-size control', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/semester-1/efmp-302/unit-01/topic-01');
  await expect(page.getByRole('button', { name: 'View full size' }).first()).toBeHidden();
});
