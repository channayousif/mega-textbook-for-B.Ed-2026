import { test, expect } from '@playwright/test';

/**
 * T022 [US2] — Navigate Semester → Course → Unit with an always-visible location.
 * Requires a served site (dev or built). Runs in CI (see .github/workflows/ci.yml).
 */
// The site root `/` is the TEX-5 landing page (no docs sidebar); the textbook's
// entry point - and the target of the landing page's "Browse" button - is `/intro`.
const TEXTBOOK_HOME = '/intro/';

test('sidebar is organized Semester → Course → Unit', async ({ page }) => {
  await page.goto(TEXTBOOK_HOME);
  const sidebar = page.locator('.theme-doc-sidebar-menu');
  await expect(sidebar).toBeVisible();
  await expect(sidebar.getByText('Semester 1')).toBeVisible();
});

test('navigating to a unit highlights the current location and shows breadcrumbs', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/unit-01/');
  // Active trail: the current sidebar link is marked active.
  await expect(page.locator('.menu__link--active').first()).toBeVisible();
  // Breadcrumbs reflect the Semester → Course → Unit path.
  await expect(page.locator('.theme-doc-breadcrumbs')).toBeVisible();
});

test('a unit is reachable within 3 navigation steps (SC-003)', async ({ page }) => {
  await page.goto(TEXTBOOK_HOME);
  // Step 1: expand Semester 1 → Step 2: course → Step 3: unit.
  await page.getByText('Semester 1', { exact: false }).first().click();
  await page.getByText('EFMP-301', { exact: false }).first().click();
  await page.getByText('Introduction to Educational Psychology', { exact: false }).first().click();
  await expect(page).toHaveURL(/efmp-301\/unit-01/);
});
