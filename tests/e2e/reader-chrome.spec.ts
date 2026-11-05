import { test, expect } from '@playwright/test';

/** Redesign: a slim course bar and one "Aa" menu, so the title and text come first. */
const TOPIC = '/semester-1/efmp-302/unit-01/topic-01/';

test('the title sits near the top on desktop, under a one-line bar', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TOPIC);
  const bar = await page.getByTestId('course-nav-bar').boundingBox();
  const title = await page.getByRole('heading', { level: 1 }).boundingBox();
  expect(bar!.height).toBeLessThan(70);
  expect(title!.y).toBeLessThan(190);
});

test('Aa changes text size, remembers it, and closes on Escape', async ({ page }) => {
  await page.goto(TOPIC);
  const aa = page.getByRole('button', { name: /reading options/i });
  await aa.click();
  await page.getByRole('button', { name: 'Larger', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-text-size', '2');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Larger', exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-text-size', '2');
});

test('a phone gets previous, contents, Aa and next within thumb reach', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/semester-1/efmp-302/unit-01/topic-02/');
  const nav = page.getByRole('navigation', { name: 'Page navigation' });
  await expect(nav.getByRole('link', { name: 'Previous' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Next' })).toBeVisible();
  await expect(nav.getByRole('button', { name: /reading options/i })).toBeVisible();
  await nav.getByRole('button', { name: /reading options/i }).click();
  const panel = await page.getByRole('button', { name: 'Larger', exact: true }).locator('xpath=ancestor::div[3]').boundingBox();
  expect(panel!.x).toBeGreaterThanOrEqual(0);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(390);
  await page.keyboard.press('Escape');
  await nav.getByRole('button', { name: 'Contents' }).click();
  await expect(page.locator('.navbar-sidebar')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBe(0);
});

test('generated category pages render with the bar and its menu', async ({ page }) => {
  await page.goto('/licence/pedagogy/');
  await expect(page.getByTestId('course-nav-bar')).toBeVisible();
  await expect(page.getByRole('button', { name: /reading options/i })).toBeVisible();
});
