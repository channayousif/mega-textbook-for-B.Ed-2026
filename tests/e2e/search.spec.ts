import { test, expect } from '@playwright/test';

/**
 * T023 [US2] — Bilingual local search (FR-006, SC-004).
 * Uses the plugin's standalone /search page (built index; no docs sidebar, so link
 * locators match search results only, not navigation). Must run against a served *build*
 * (`npm run serve`) — the index is generated at production build time. CI serves the build.
 *
 * URL MUST include the trailing slash before the query string (`/search/?q=...`, not
 * `/search?q=...`). `trailingSlash: true` (docusaurus.config.ts) means the built page is
 * `/search/index.html`; requesting the bare `/search?q=...` path 301-redirects to `/search/`
 * via docusaurus serve's static-file server, and that redirect drops the query string
 * entirely — the search box then loads empty. Confirmed directly: `curl -I` on
 * `/search?q=psychology` returns `Location: /search/` with no `q` param at all.
 */
test('searching an English term returns a result linking to the unit', async ({ page }) => {
  await page.goto('/search/?q=psychology');
  const hit = page.locator('article a[href*="efmp-301"]').first();
  await expect(hit).toBeVisible({ timeout: 15_000 });
  await hit.click();
  await expect(page).toHaveURL(/efmp-301/);
});

test('published units appear in the search index', async ({ page }) => {
  // GENG-300 is now published (no longer coming_soon). Searching its title must return
  // at least one link to a GENG-300 unit.
  await page.goto('/search/?q=Functional%20English');
  // Let the client-side search render.
  await page.waitForTimeout(2_000);
  await expect(page.locator('article a[href*="geng-300"]').first()).toBeVisible({ timeout: 15_000 });
});
