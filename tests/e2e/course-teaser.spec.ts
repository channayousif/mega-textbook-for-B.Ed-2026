import { test, expect } from '@playwright/test';

// Feature 030 (T042): a public teaser plays on its course overview and behind a card button; the
// youtube-nocookie iframe loads only after a tap. EFMP-301's teaser is public in the ledger.
test('the course overview shows the teaser poster and loads the player only on tap', async ({ page }) => {
  await page.goto('/semester-1/efmp-301/course-overview/');
  const block = page.getByTestId('course-teaser');
  await expect(block).toBeVisible();
  await expect(block.locator('iframe')).toHaveCount(0);
  const frame = block.getByTestId('teaser-frame');
  const box = await frame.boundingBox();
  expect(Math.abs(box!.height / box!.width - 16 / 9)).toBeLessThan(0.02);
  await block.getByRole('button', { name: /Play the course teaser/ }).click();
  await expect(block.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/[\w-]{11}\?rel=0&autoplay=1/);
  expect((await frame.boundingBox())!.height).toBeCloseTo(box!.height, 0);
});

test('the Urdu overview shows the same Urdu teaser with an Urdu label', async ({ page }) => {
  await page.goto('/ur/semester-1/efmp-301/course-overview/');
  await expect(page.getByTestId('course-teaser').getByRole('button', { name: /کورس کا تعارفی ویڈیو چلائیں/ })).toBeVisible();
});

test('a catalogue card opens the teaser in a dialog that Escape closes', async ({ page }) => {
  await page.goto('/intro/');
  const button = page.getByTestId('teaser-button-EFMP-301');
  await expect(button).toBeVisible();
  await expect(page.locator('dialog iframe')).toHaveCount(0);
  await button.click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\//);
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await expect(page.locator('dialog iframe')).toHaveCount(0);
});

test('a course without a public teaser shows neither player nor button', async ({ page }) => {
  await page.goto('/semester-1/gqur-300/course-overview/');
  await expect(page.getByTestId('course-teaser')).toHaveCount(0);
  await page.goto('/intro/');
  await expect(page.getByTestId('teaser-button-GQUR-300')).toHaveCount(0);
});

test('the home page shows the teaser picks under the hero and loads a player only on tap', async ({ page }) => {
  await page.goto('/');
  const section = page.getByTestId('home-teasers');
  await expect(section).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Courses in 30 seconds' })).toBeVisible();
  const cards = section.locator('li');
  expect(await cards.count()).toBeGreaterThanOrEqual(1);
  expect(await cards.count()).toBeLessThanOrEqual(4);
  await expect(section.locator('iframe')).toHaveCount(0);
  const frame = cards.first().getByTestId('teaser-frame');
  const box = await frame.boundingBox();
  await cards.first().getByRole('button', { name: /Play the course teaser/ }).click();
  await expect(cards.first().locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/[\w-]{11}/);
  expect((await frame.boundingBox())!.height).toBeCloseTo(box!.height, 0);
  await expect(cards.first().getByRole('link', { name: 'Open the course' })).toHaveAttribute('href', /\/semester-\d\/[a-z]{4}-\d{3}\/course-overview\/$/);
});

test('the Urdu home page shows the Urdu heading and no horizontal page scroll on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/ur/');
  await expect(page.getByTestId('home-teasers').getByRole('heading', { name: 'کورس 30 سیکنڈ میں' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
