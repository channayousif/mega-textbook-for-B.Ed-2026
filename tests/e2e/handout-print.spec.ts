import { test, expect } from '@playwright/test';

/**
 * T027 [US3] — A4 print handout (FR-011, SC-009).
 * Verifies the PrintHandout control exists and that print media hides site chrome so the
 * handout paginates cleanly. Runs against a served site (dev or built).
 */
const HANDOUTS = [
  '/semester-1/efmp-301/unit-01/activities',
  '/semester-1/efmp-301/unit-01/formative',
  '/semester-1/efmp-301/unit-01/summative',
];

for (const path of HANDOUTS) {
  test(`handout page ${path} has a print control and hides chrome in print media`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('button', { name: /print/i })).toBeVisible();

    await page.emulateMedia({ media: 'print' });
    // Site chrome is hidden by the @media print rules (custom.css) so A4 output is clean.
    await expect(page.locator('.navbar')).toBeHidden();
    await expect(page.locator('.theme-doc-sidebar-container')).toBeHidden();
    // The article content remains present.
    await expect(page.locator('article')).toBeVisible();
  });
}
