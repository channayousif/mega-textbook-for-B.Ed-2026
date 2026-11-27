import { test, expect } from '@playwright/test';

// Feature 034 T018 (#805): the landing page invites readers to become reviewers.
test('the landing page links to the reviewer application in English and Urdu', async ({ page }) => {
  await page.goto('/');
  const en = page.locator('#review').getByRole('link', { name: /Apply to review/ });
  await expect(en).toHaveAttribute('href', '/app/reviewer/apply/');
  await page.goto('/ur/');
  const ur = page.locator('#review').getByRole('link', { name: /جائزے کے لیے درخواست دیں/ });
  await expect(ur).toHaveAttribute('href', '/ur/app/reviewer/apply/');
});
