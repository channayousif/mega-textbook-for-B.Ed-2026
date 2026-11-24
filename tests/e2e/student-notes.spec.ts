import { test, expect } from '@playwright/test';
import { Fixtures, configured, SKIP_REASON, signIn } from './_dashboardFixtures';

/**
 * Spec 011 T021 [US3] - personal notes: create one on the Notes page and one from each of
 * two content pages, edit one, delete one, filter by course; a second student sees none.
 * RLS isolation itself is proven in tests/rls/student-notes.test.mjs (T020); this checks
 * the UI end to end.
 */
test.skip(!configured, SKIP_REASON);

test('create, edit, delete and filter notes; another student sees none', async ({ page, browser }) => {
  test.setTimeout(120_000);
  const fx = new Fixtures();
  try {
    const student = await fx.user('notes-a', 'student');
    const other = await fx.user('notes-b', 'student');
    const general = `General note ${fx.tag}`;
    const fromUnit301 = `EFMP-301 page note ${fx.tag}`;
    const fromUnit302 = `EFMP-302 page note ${fx.tag}`;

    await signIn(page, student.email);

    // 1. From the Notes page (a general note with no course).
    await page.goto('/app/dashboard/notes');
    await expect(page.getByText('No notes yet.')).toBeVisible();
    await page.locator('#note-body').fill(general);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(page.getByTestId('note-item').filter({ hasText: general })).toBeVisible();

    // 2-3. From two content pages, tagged to their course and unit.
    for (const [path, body] of [
      ['/semester-1/efmp-301/unit-01/', fromUnit301],
      ['/semester-1/efmp-302/unit-01/', fromUnit302],
    ] as const) {
      await page.goto(path);
      await page.getByTestId('add-note-button').click();
      await page.getByTestId('note-body-textarea').fill(body);
      await page.getByTestId('note-save-button').click();
      await expect(page.getByTestId('note-saved')).toBeVisible();
    }

    await page.goto('/app/dashboard/notes');
    const notes = page.getByTestId('note-item');
    await expect(notes).toHaveCount(3);

    // Edit the EFMP-301 note.
    const edited = `${fromUnit301} (edited)`;
    const card301 = notes.filter({ hasText: fromUnit301 });
    await card301.getByRole('button', { name: 'Edit' }).click();
    await card301.getByLabel('Note', { exact: true }).fill(edited);
    await card301.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(notes.filter({ hasText: edited })).toBeVisible();

    // Delete the general note (the page confirms first).
    page.once('dialog', (d) => d.accept());
    await notes.filter({ hasText: general }).getByRole('button', { name: 'Delete' }).click();
    await expect(notes.filter({ hasText: general })).toHaveCount(0);
    await expect(notes).toHaveCount(2);

    // Filter by course.
    await page.getByLabel('Filter by course').selectOption('EFMP-302');
    await expect(notes).toHaveCount(1);
    await expect(notes.first()).toContainText(fromUnit302);
    await page.getByLabel('Filter by course').selectOption('EFMP-301');
    await expect(notes).toHaveCount(1);
    await expect(notes.first()).toContainText(edited);
    await page.getByLabel('Filter by course').selectOption('');
    await expect(notes).toHaveCount(2);

    // A second student sees none of them.
    const otherContext = await browser.newContext();
    const otherPage = await otherContext.newPage();
    try {
      await signIn(otherPage, other.email);
      await otherPage.goto('/app/dashboard/notes');
      await expect(otherPage.getByText('No notes yet.')).toBeVisible();
      await expect(otherPage.getByTestId('note-item')).toHaveCount(0);
    } finally {
      await otherContext.close();
    }
  } finally {
    await fx.teardown();
  }
});
