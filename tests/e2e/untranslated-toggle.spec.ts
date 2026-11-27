import { test, expect } from '@playwright/test';

// Feature 034 T020 (#807): a page with no Urdu file greys out the Urdu segment of the language
// toggle; tapping it shows a callout. The Urdu route of such a page shows the callout directly.
const PAGE = '/semester-1/efmp-302/course-overview';

test('English page without Urdu greys out the Urdu toggle and explains on tap', async ({ page }) => {
  await page.goto(PAGE);
  const urdu = page.locator('.navbar').getByRole('button', { name: /Urdu translation not available yet/ }).first();
  await expect(urdu).toBeVisible();
  await expect(urdu).toHaveAttribute('aria-disabled', 'true');
  await expect(page.locator('.urdu-unavailable')).toHaveCount(0);
  // aria-disabled makes Playwright treat the button as not clickable; readers can still tap it.
  await urdu.click({ force: true });
  await expect(page.locator('.urdu-unavailable')).toBeVisible();
});

test('the Urdu route of an untranslated page shows the callout', async ({ page }) => {
  await page.goto(`/ur${PAGE}`);
  await expect(page.locator('.urdu-unavailable')).toBeVisible();
});

test('a translated page keeps a working Urdu link', async ({ page }) => {
  await page.goto('/semester-1/efmp-302/unit-01/topic-01');
  await expect(page.locator('.navbar').getByRole('link', { name: 'اردو میں پڑھیں' }).first()).toBeVisible();
});
