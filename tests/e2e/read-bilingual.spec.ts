import { test, expect } from '@playwright/test';

/**
 * T012 [US1] — Read any unit in English or Urdu.
 * Requires a served build (see playwright.config.ts). Verifies: EN↔UR toggle to RTL,
 * content parity (same section headings), <2s switch (SC-001), and 360px no-scroll.
 */
const UNIT_EN = '/semester-1/efmp-301/unit-01/';
const UNIT_UR = '/ur/semester-1/efmp-301/unit-01/';

test('English unit renders LTR', async ({ page }) => {
  await page.goto(UNIT_EN);
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { name: /Introduction to Educational Psychology/ })).toBeVisible();
});

test('Urdu route renders RTL and switches in under 2 seconds (SC-001)', async ({ page }) => {
  await page.goto(UNIT_EN);
  const t0 = Date.now();
  await page.goto(UNIT_UR);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  expect(Date.now() - t0).toBeLessThan(2000);
});

test('content page fits a 360px viewport without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(UNIT_EN);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBe(false);
});

test('EN and UR expose the same section headings (content parity)', async ({ page }) => {
  const headings = async (url: string) => {
    await page.goto(url);
    return page.locator('article h2').count();
  };
  expect(await headings(UNIT_EN)).toBe(await headings(UNIT_UR));
});
