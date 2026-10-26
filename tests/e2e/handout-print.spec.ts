import { test, expect } from '@playwright/test';

/**
 * T027 [US3] — A4 print handout (FR-011, SC-009).
 * Verifies the PrintHandout control exists and that print media hides site chrome so the
 * handout paginates cleanly. Runs against a served site (dev or built).
 *
 * Points at the Spec 008 PER-TOPIC layout, which is now the only published shape.
 *
 * This previously pinned EFMP-302 Unit 2's legacy activities/formative/summative
 * routes, with a comment reasoning that Unit 2 "is legacy and is not in the
 * re-authoring queue". It was re-authored, those three pages folded into
 * unit-assessment.mdx, and the tests became three 404s - the exact failure the
 * comment set out to avoid, caused by the assumption behind it rather than by the
 * routes. The remaining legacy files in the repo are all `coming_soon: true`
 * scaffolds that render no print control at all, so there is nothing legacy left
 * worth pinning to.
 *
 * These three cover the layout's distinct page kinds - a topic, the assessment and
 * the teacher notes - so a regression in any one of them is visible.
 */
const HANDOUTS = [
  '/semester-1/efmp-302/unit-02/topic-01',
  '/semester-1/efmp-302/unit-02/unit-assessment',
  '/semester-1/efmp-302/unit-02/unit-teacher-notes',
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

    // The <figure> box stays inside the column; the schematic inside it is
    // deliberately allowed to be wider and to scroll, because scaling a
    // 640-900px diagram down to a phone column renders its 11px labels at
    // roughly 4.5px. Legibility is bought with an internal scroll, never with
    // a document that scrolls sideways.
    const figureBox = await page.locator('figure.figure').first()
      .evaluate((el) => el.getBoundingClientRect().width);
    expect(figureBox).toBeLessThanOrEqual(clientWidth);

    const schematic = page.locator('figure.figure--concept-map, figure.figure--timeline, figure.figure--flowchart').first();
    if (await schematic.count()) {
      const scrolls = await schematic.evaluate((el) => el.scrollWidth > el.clientWidth);
      const imgWidth = await schematic.locator('img:visible').first()
        .evaluate((el) => el.getBoundingClientRect().width);
      // Rendered at its authored width, not squeezed into the column.
      expect(scrolls).toBe(true);
      expect(imgWidth).toBeGreaterThan(clientWidth);
    }
  });
}

/**
 * Regression - printed handouts had empty figure boxes and grey text (2026-10-19).
 *
 * Figures are `loading="lazy"`, so those below the fold (and the light copy a
 * dark-mode reader never saw) were not fetched when the print snapshot was taken.
 * And print kept the dark theme's light-grey text on white paper. The print
 * button now loads every image before opening the dialog, and print media
 * always uses the light palette with black body text.
 */
test('print button loads every figure and prints black text from dark mode', async ({ page }) => {
  await page.addInitScript(() => {
    try { localStorage.setItem('theme', 'dark'); } catch { /* storage blocked */ }
    (window as unknown as { printed: number }).printed = 0;
    window.print = () => { (window as unknown as { printed: number }).printed += 1; };
  });
  await page.goto('/semester-1/efmp-302/unit-02/topic-01');
  await page.getByRole('button', { name: /print/i }).click();
  await expect.poll(() => page.evaluate(() => (window as unknown as { printed: number }).printed)).toBe(1);

  await page.emulateMedia({ media: 'print' });
  const result = await page.evaluate(() => {
    const shown = [...document.querySelectorAll<HTMLImageElement>('.figure img')]
      .filter((img) => getComputedStyle(img).display !== 'none');
    const p = document.querySelector('.markdown p');
    return {
      shown: shown.length,
      loaded: shown.filter((img) => img.complete && img.naturalWidth > 0).length,
      color: p ? getComputedStyle(p).color : null,
    };
  });
  expect(result.shown).toBeGreaterThan(0);
  expect(result.loaded).toBe(result.shown);
  expect(result.color).toBe('rgb(0, 0, 0)');
});

/**
 * Printed pages carry a QR code beside each link that leads off the page, and the
 * browser's page header reads "subject | unit | topic" (owner request, 2026-10-19).
 * Both exist only while printing: afterprint restores the title and removes the codes.
 */
test('printing adds link QR codes and a subject | unit | topic title, then restores the page', async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { printed: number }).printed = 0;
    window.print = () => { (window as unknown as { printed: number }).printed += 1; };
  });
  await page.goto('/semester-1/efmp-302/unit-01/topic-01');
  await page.waitForLoadState('networkidle'); // the Ctrl+P handler exists only once React has hydrated
  const pageTitle = await page.title();

  await page.keyboard.press('Control+KeyP');
  await expect.poll(() => page.evaluate(() => (window as unknown as { printed: number }).printed)).toBe(1);
  const codes = page.locator('.print-qr');
  await expect(codes.filter({ hasText: 'doi.org/10.1016/j.sbspro.2010.12.444' })).toHaveCount(1);
  await expect(page.locator('.print-qr svg path').first()).toHaveAttribute('d', /^M/);

  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  await expect(page).toHaveTitle(/^EFMP-302 .+ \| Unit 1 .+ \| Topic 1\.1 /);

  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(page).toHaveTitle(pageTitle);
  await expect(codes).toHaveCount(0);
});

/**
 * The browser's own Print / Save as PDF menu fires beforeprint, which cannot wait for
 * anything. The codes are drawn when the page settles, so beforeprint serves them at
 * once; after a navigation the stored codes expire and the new page gets its own.
 */
test('the browser print menu gets the link QR codes stored when the page settled', async ({ page }) => {
  // The codes are drawn in an idle callback (3 s timeout), then the encoder chunk loads.
  const settle = async () => { await page.waitForTimeout(3500); await page.waitForLoadState('networkidle'); };
  const codesAtBeforePrint = () => page.evaluate(() => {
    window.dispatchEvent(new Event('beforeprint'));
    const n = document.querySelectorAll('.print-qr').length;
    const label = document.querySelector('.print-qr__url')?.textContent ?? '';
    window.dispatchEvent(new Event('afterprint'));
    return { n, label };
  });

  await page.goto('/semester-1/efmp-302/unit-01/topic-01');
  await settle();
  expect(await codesAtBeforePrint()).toEqual({ n: 1, label: 'doi.org/10.1016/j.sbspro.2010.12.444' });

  await page.locator('a[href^="/semester-1/efmp-302/unit-01/topic-02"]').first().click(); // client-side navigation
  await page.waitForURL(/topic-02/);
  await settle();
  expect(await codesAtBeforePrint()).toEqual({ n: 1, label: 'doi.org/10.1080/713698714' });
});

/**
 * Wide figures were cut off on Print / Save as PDF (owner report, 2026-10-26,
 * EFMP-304 fig-U4-1). The phone rule that lets a 780px figure scroll sideways
 * also matched the A4 page box (about 680px wide), and paper cannot scroll.
 * Every printed figure must now fit its column.
 */
test('every figure fits the A4 column in print media', async ({ page }) => {
  await page.setViewportSize({ width: 680, height: 960 });
  await page.goto('/semester-2/efmp-304/unit-04/topic-01');
  await page.emulateMedia({ media: 'print' });
  // Lazy images load as they near the viewport; walk the page so each one does.
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll<HTMLImageElement>('.figure img')) {
      img.loading = 'eager';
    }
  });
  const shown = page.locator('.figure img:visible');
  await expect.poll(() => shown.evaluateAll((imgs) => imgs.every((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0))).toBe(true);
  const overflow = await shown.evaluateAll((imgs) => imgs.flatMap((img) => {
    const fig = img.closest('.figure');
    if (!fig) return [];
    const a = img.getBoundingClientRect();
    const b = fig.getBoundingClientRect();
    return a.right > b.right + 1 || a.left < b.left - 1 ? [`${img.getAttribute('src')}: ${Math.round(a.width)}px in ${Math.round(b.width)}px`] : [];
  }));
  expect(await shown.count()).toBeGreaterThan(0);
  expect(overflow).toEqual([]);
});
