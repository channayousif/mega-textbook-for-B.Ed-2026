import { test, expect } from '@playwright/test';

/**
 * T027 [US3] — A4 print handout (FR-011, SC-009).
 * Verifies the PrintHandout control exists and that print media hides site chrome so the
 * handout paginates cleanly. Runs against a served site (dev or built).
 *
 * Points at a unit still on the LEGACY activities/formative/summative layout.
 * A unit re-authored to the Spec 008 per-topic standard has no such pages at
 * all - they fold into unit-assessment.mdx - so pinning these routes to a unit
 * queued for re-authoring turns a content migration into three 404s here.
 * EFMP-302 Unit 2 is legacy and is not in the re-authoring queue.
 */
const HANDOUTS = [
  '/semester-1/efmp-302/unit-02/activities',
  '/semester-1/efmp-302/unit-02/formative',
  '/semester-1/efmp-302/unit-02/summative',
];

for (const path of HANDOUTS) {
  test(`handout page ${path} has a print control and hides chrome in print media`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('button', { name: /print/i })).toBeVisible();

    await page.emulateMedia({ media: 'print' });
    // Site chrome is hidden by the @media print rules (custom.css) so A4 output is clean.
    await expect(page.locator('.navbar')).toBeHidden();
    await expect(page.locator('.theme-doc-sidebar-container')).toBeHidden();
    // The article content remains present.
    await expect(page.locator('article')).toBeVisible();
  });
}

/**
 * Regression - no horizontal scroll on a phone (Art. V.5 / Spec 001 FR-016).
 *
 * The Spec 012 archetype rules set `max-width: 640px` on a schematic's <img>.
 * They share the specificity of the `.figure img { max-width: 100% }` above them
 * and come later, so they REPLACED the container cap instead of tightening it:
 * below 640px the figure could not shrink, rendered at a fixed 640px on a 390px
 * phone, and pushed the document to a 656px scrollWidth. Every unit carrying a
 * schematic scrolled sideways. Fixed with `min(100%, …)`; content tables get
 * their own scroll container for the same reason.
 */
for (const width of [390, 360, 320]) {
  test(`unit page with figures does not scroll horizontally at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/semester-1/efmp-302/unit-01/topic-01');
    await expect(page.locator('figure.figure img').first()).toBeVisible();

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // And the figure actually shrank to its column rather than being clipped.
    const figureWidth = await page.locator('figure.figure img:visible').first()
      .evaluate((el) => el.getBoundingClientRect().width);
    expect(figureWidth).toBeLessThanOrEqual(clientWidth);
  });
}
