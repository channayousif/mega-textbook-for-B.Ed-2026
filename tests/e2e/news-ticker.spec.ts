import { test, expect } from '@playwright/test';

// Feature 028 follow-up (owner, 2026-11-17): the ticker shows up to three rows, "View all" opens
// the full list, Esc closes it and returns focus. The automatic feed always has content events.
test('the ticker shows its rows and the View all panel opens and closes from the keyboard', async ({ page }) => {
  await page.goto('/');
  const bar = page.getByRole('region', { name: 'Latest news and new content' });
  await expect(bar).toBeVisible();
  const rows = bar.locator('[data-lane]');
  expect(await rows.count()).toBeGreaterThanOrEqual(1);
  expect(await rows.count()).toBeLessThanOrEqual(3);
  await expect(bar.getByRole('button', { name: 'New content' })).toBeVisible();

  const viewAll = bar.getByRole('button', { name: 'View all' });
  await expect(viewAll).toHaveAttribute('aria-expanded', 'false');
  await viewAll.click();
  const panel = page.getByRole('region', { name: 'All news and new content' });
  await expect(panel).toBeVisible();
  await expect(viewAll).toHaveAttribute('aria-expanded', 'true');
  await expect(panel.getByRole('heading', { name: 'New content' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toHaveCount(0);
  await expect(viewAll).toBeFocused();
});

test('the Urdu ticker has Urdu row labels and no sideways scroll on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/ur/');
  const bar = page.getByRole('region', { name: 'تازہ خبریں اور نیا مواد' });
  await expect(bar).toBeVisible();
  await expect(bar.getByRole('button', { name: 'نیا مواد' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
