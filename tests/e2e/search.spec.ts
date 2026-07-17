import { test, expect } from '@playwright/test';

/**
 * T023 [US2] — Bilingual local search (FR-006, SC-004).
 * The @easyops-cn/docusaurus-search-local index is built at production build time, so this
 * spec must run against a served *build* (`npm run serve`), not the dev server. CI sets
 * PW_WEBSERVER='npm run serve -- --port 3000' before running e2e.
 */
test('searching an English term returns a result that opens the page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.navbar__search-input, input[type="search"]').first().fill('psychology');
  // Result dropdown / hits appear and lead to the unit.
  const hit = page.locator('a[href*="efmp-301"]').first();
  await expect(hit).toBeVisible({ timeout: 10_000 });
  await hit.click();
  await expect(page).toHaveURL(/efmp-301/);
});

test('coming_soon placeholder units do not appear as search results', async ({ page }) => {
  await page.goto('/');
  await page.locator('.navbar__search-input, input[type="search"]').first().fill('coming soon');
  // The scaffolded placeholders carry <meta robots noindex> and are excluded from the index.
  await expect(page.locator('a[href$="/unit-01/"]:has-text("coming soon")')).toHaveCount(0);
});
