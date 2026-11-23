import { test, expect } from '@playwright/test';

// Feature 032 phase C: the unit assessment page shows a self-check of its ten MCQs (from
// self_check_questions(), no key); a guest is asked to sign in before marking.
test('a guest sees the ten self-check questions and a sign-in link, never a key', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/unit-04/unit-assessment/');
  const sc = page.getByTestId('self-check');
  await expect(sc).toBeVisible();
  await expect(sc.locator('fieldset')).toHaveCount(10);
  await expect(sc.getByRole('link', { name: /Sign in to check your answers/ })).toBeVisible();
  expect(await sc.innerHTML()).not.toContain('correct_option');
});
