import { test, expect } from '@playwright/test';

// Feature 034 T021 (#808): a unit assessment shows its MCQs once, as cards with radios, and its
// RRQs and ERQs as cards. The duplication was reported on GENG-300 Unit 2.
for (const path of ['/semester-1/geng-300/unit-02/unit-assessment', '/ur/semester-1/geng-300/unit-02/unit-assessment']) {
  test(`question cards and a single MCQ set on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('ol.aq-list--rrq > li.aq-card')).toHaveCount(10);
    await expect(page.locator('ol.aq-list--erq > li.aq-card')).toHaveCount(5);
    const selfCheck = page.getByTestId('self-check');
    if (await selfCheck.count()) {
      // Server cards sit in the MCQ section; the plain list is hidden on screen.
      await expect(page.locator('.aq-selfcheck-slot [data-testid="self-check"]')).toBeVisible();
      await expect(page.locator('ol.aq-list--mcq')).toBeHidden();
      await expect(selfCheck.locator('input[type="radio"]').first()).toBeVisible();
      await expect(selfCheck.locator('fieldset')).toHaveCount(10);
    } else {
      await expect(page.locator('ol.aq-list--mcq > li.aq-card')).toHaveCount(10);
    }
  });
}
