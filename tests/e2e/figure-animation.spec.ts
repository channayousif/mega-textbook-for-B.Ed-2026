import { test, expect } from '@playwright/test';

// Feature 032 (T007): a figure with an approved, public animation shows "Watch it animate"; the
// youtube-nocookie frame loads only after a click, in a dialog that Escape closes. Figures without
// one show no button. Data: specs/studio/animations/placed.json -> customFields.figureAnimations.
test('fig-U4-3 offers its animation and loads the player only on click', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/unit-04/topic-02/');
  const figure = page.locator('figure#fig-U4-3');
  const button = figure.getByTestId('figure-animate');
  await expect(button).toBeVisible();
  await expect(button).toHaveText(/Watch it animate/);
  await expect(page.locator('dialog iframe')).toHaveCount(0);
  await button.click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/lcHh3qG3L3E\?rel=0&autoplay=1/);
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await expect(page.locator('dialog iframe')).toHaveCount(0);
});

test('the Urdu page plays the Urdu animation with an Urdu label', async ({ page }) => {
  await page.goto('/ur/semester-1/efmp-301/unit-04/topic-02/');
  const button = page.locator('figure#fig-U4-3').getByTestId('figure-animate');
  await expect(button).toHaveText(/متحرک دیکھیں/);
  await button.click();
  await expect(page.locator('dialog[open] iframe')).toHaveAttribute('src', /embed\/0xoCN70ARgg/);
});

test('a figure without an animation shows no button', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/unit-04/topic-02/');
  const others = page.locator('figure:not(#fig-U4-3)');
  const n = await others.count();
  for (let i = 0; i < n; i++) await expect(others.nth(i).getByTestId('figure-animate')).toHaveCount(0);
});
