import { test, expect } from '@playwright/test';

test('the catalogue lists courses by semester and every card opens', async ({ page }) => {
  await page.goto('/intro/');
  await expect(page.getByRole('button', { name: 'Semester 1', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const hrefs = await page.locator('[class*="panel"]:not([hidden]) a[class*="card"]').evaluateAll((links) => links.map((a) => (a as HTMLAnchorElement).pathname));
  expect(hrefs.length).toBeGreaterThan(3);
  const cards = page.locator('[class*="panel"]:not([hidden]) a[class*="card"]');
  await expect(cards.first()).toHaveCSS('text-decoration-line', 'none');
  const tops = await cards.evaluateAll((links) => links.slice(0, 3).map((a) => Math.round(a.getBoundingClientRect().top)));
  expect(new Set(tops).size).toBe(1);
  for (const href of hrefs) {
    const response = await page.request.get(href);
    expect(response.status(), href).toBe(200);
  }
  await page.getByRole('button', { name: 'Semester 2', exact: true }).click();
  await expect(page.getByRole('link', { name: /EFMP-303/ })).toBeVisible();
});

test('the catalogue has no internal wording', async ({ page }) => {
  await page.goto('/intro/');
  await expect(page.locator('article')).not.toContainText('MVP');
});
