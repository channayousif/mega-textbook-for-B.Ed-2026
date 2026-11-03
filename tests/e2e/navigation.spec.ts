import { test, expect } from '@playwright/test';

/**
 * T022 [US2]: navigate Semester → Course → Unit with an always-visible location.
 * Since 2026-11-03 the main navigation is the CourseNavBar breadcrumb dropdowns;
 * the tree sidebar is hidden until the "All topics" toggle opens it.
 * Requires a served site (dev or built). Runs in CI (see .github/workflows/ci.yml).
 */
// The site root `/` is the TEX-5 landing page (no docs sidebar); the textbook's
// entry point - and the target of the landing page's "Browse" button - is `/intro`.
const TEXTBOOK_HOME = '/intro/';
const bar = (page) => page.getByTestId('course-nav-bar');

test('the bar shows the programme and lists the semesters', async ({ page }) => {
  await page.goto(TEXTBOOK_HOME);
  await expect(bar(page)).toBeVisible();
  await expect(bar(page).getByRole('button', { name: /Programme: B\.Ed/ })).toBeVisible();
  await bar(page).getByRole('button', { name: 'Mega Textbook' }).click();
  await expect(bar(page).getByRole('link', { name: 'Semester 1' })).toBeVisible();
});

test('a unit page shows its Semester → Course → Unit path, current item marked', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/unit-01/');
  await expect(bar(page).getByRole('button', { name: 'Semester 1' })).toBeVisible();
  await expect(bar(page).getByRole('button', { name: /^EFMP-301/ })).toBeVisible();
  await bar(page).getByRole('button', { name: /^Unit 1 · / }).click();
  await expect(bar(page).locator('a[aria-current="page"]')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await expect(bar(page).locator('ul')).toHaveCount(0);
});

test('a unit is reachable within 3 navigation steps (SC-003)', async ({ page }) => {
  await page.goto(TEXTBOOK_HOME);
  // Step 1: choose Semester 1 → Step 2: choose the course → Step 3: choose the unit.
  await bar(page).getByRole('button', { name: 'Mega Textbook' }).click();
  await bar(page).getByRole('link', { name: 'Semester 1' }).click();
  await bar(page).getByRole('button', { name: /^[A-Z]{4}-\d{3} · / }).click();
  await bar(page).getByRole('link', { name: /^EFMP-301/ }).click();
  await bar(page).getByRole('button', { name: /^Course overview/ }).click();
  await bar(page).getByRole('link', { name: /^Unit 1 · / }).click();
  await expect(page).toHaveURL(/efmp-301\/unit-01/);
});

test('the tree sidebar is hidden by default and the toggle persists', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'the tree exists at desktop widths only');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/semester-1/efmp-301/unit-01/');
  await expect(page.locator('.theme-doc-sidebar-container')).toHaveCount(0);
  await bar(page).getByRole('button', { name: 'All topics' }).click();
  await expect(page.locator('.theme-doc-sidebar-menu')).toBeVisible();
  await page.reload();
  await expect(page.locator('.theme-doc-sidebar-menu')).toBeVisible();
});

test('the programme switcher reaches the teaching licence track', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/unit-01/');
  await bar(page).getByRole('button', { name: /Programme/ }).click();
  await bar(page).getByRole('link', { name: 'Teaching licence' }).click();
  await expect(page).toHaveURL(/\/licence\//);
});
