import { test, expect } from '@playwright/test';

// Feature 034 T014 (#801): on a phone the top bar shows the profile as an icon, not a text pill,
// so the logo has room. Signed out, the icon links to sign-in and keeps the accessible name.
test('signed-out phone top bar shows a sign-in icon, not text', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const signIn = page.locator('.navbar').getByRole('link', { name: 'Sign in' }).first();
  await expect(signIn).toBeVisible();
  expect((await signIn.innerText()).trim()).toBe('');
  const box = await signIn.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.width).toBeLessThanOrEqual(48);
});
