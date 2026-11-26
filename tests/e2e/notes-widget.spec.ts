import { test, expect } from '@playwright/test';

// Feature 034 T019 (#806): every textbook page has a floating Notes button. Signed out, the panel
// asks the reader to sign in; Escape closes it and returns focus to the button.
test('signed-out reader sees the notes button and a sign-in prompt', async ({ page }) => {
  await page.goto('/semester-1/efmp-302/unit-01/topic-01');
  const fab = page.getByTestId('notes-fab');
  await expect(fab).toBeVisible();
  await fab.click();
  const panel = page.getByRole('dialog', { name: 'My notes on this page' });
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Sign in' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(fab).toBeFocused();
});
