import { test, expect } from '@playwright/test';

test('a missing page explains itself and offers a way back', async ({ page }) => {
  await page.goto('/no-such-page/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("We can't find that page");
  await page.getByRole('main').getByRole('link', { name: 'Browse B.Ed courses' }).click();
  await expect(page).toHaveURL(/\/intro/);
});

test('self-assessment checkboxes have accessible names', async ({ page }) => {
  await page.goto('/semester-1/efmp-302/unit-01/topic-01/');
  const box = page.getByTestId('self-assessment-checkbox-1');
  await expect(box).toBeEnabled();
  await expect(box).toHaveAttribute('aria-label', /.{10,}/);
});
