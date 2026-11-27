import { test, expect } from '@playwright/test';

// Feature 034 T025 (#812): GQUR-301 unit 10 topic 2 shows a data-driven bar chart after the
// heading "Building a distribution from records" (specs/studio/charts/gqur-301/unit-10.json).
// Data table: 6 values of x (0 to 5) from the worked example "absentees in Larkana".
const EN = '/semester-2/gqur-301/unit-10/topic-02/';
const UR = '/ur/semester-2/gqur-301/unit-10/topic-02/';

test('the pilot page shows an accessible chart with a data table', async ({ page }) => {
  await page.goto(EN);
  const svg = page.locator('svg[role="img"]');
  await expect(svg).toHaveAttribute('aria-label', 'Pupils absent per school day over 50 days (Larkana)');
  await expect(page.getByRole('img', { name: 'Pupils absent per school day over 50 days (Larkana)' })).toBeVisible();
  // The chart sits after the table it summarises, in that heading's section (TopicCharts.tsx).
  const slot = page.locator('[data-studio-chart="2"]');
  await expect(slot).toHaveCount(1);
  await expect(slot.locator('xpath=preceding-sibling::*[1][self::table or .//table]')).toHaveCount(1);
  const heading = page.locator('.markdown h3', { hasText: 'Building a distribution from records' });
  await expect(heading.locator('xpath=following-sibling::*[@data-studio-chart="2"]')).toHaveCount(1);
  const details = page.locator('[data-testid="studio-chart"] details');
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open', '');
  await expect(details.locator('tbody tr')).toHaveCount(6);
  await expect(details.locator('tbody tr').nth(2)).toContainText('15');
});

test('the Urdu page shows the Urdu title, right to left', async ({ page }) => {
  await page.goto(UR);
  const svg = page.locator('svg[role="img"]');
  await expect(svg).toHaveAttribute('aria-label', '50 دنوں میں روزانہ غیر حاضر طلبہ (لاڑکانہ)');
  await expect(page.locator('[data-testid="studio-chart"]')).toHaveAttribute('dir', 'rtl');
  await page.locator('[data-testid="studio-chart"] summary').click();
  await expect(page.locator('[data-testid="studio-chart"] summary')).toHaveText('ڈیٹا ٹیبل');
  await expect(page.locator('[data-testid="studio-chart"] tbody tr')).toHaveCount(6);
});
