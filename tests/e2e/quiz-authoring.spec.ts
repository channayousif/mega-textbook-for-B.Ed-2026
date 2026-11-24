import { test, expect } from '@playwright/test';
import { Fixtures, configured, SKIP_REASON, signIn } from './_dashboardFixtures';

/**
 * Spec 011 T034 [US6] - a verified teacher adds, edits and deletes a quiz item and saves an
 * answer key; the item's unit then appears in the quiz picker when creating an assignment.
 * An unverified teacher and a student get the gated notice instead of the editor. RLS
 * enforcement of every verb is in tests/rls/quiz-authoring.test.mjs (T033).
 *
 * Uses EFMP-301 Unit 3, which holds no live quiz items, and removes everything it makes.
 */
test.skip(!configured, SKIP_REASON);

const COURSE = 'EFMP-301';
const UNIT = 3;
const GATED = 'This area is for verified teachers. Ask an admin to verify your account to author quiz items and answer keys.';

test('verified teacher authors an item and key; it becomes assignable', async ({ page }) => {
  test.setTimeout(150_000);
  const fx = new Fixtures();
  const stem = `Which domain does Bloom's taxonomy describe? ${fx.tag}`;
  try {
    const teacher = await fx.user('quiz-verified', 'teacher', { verified: true });
    const klass = await fx.klass(teacher, `Quiz class ${fx.tag}`, [], COURSE);

    await signIn(page, teacher.email);
    await page.goto('/app/teacher/quiz-authoring');
    await page.getByLabel('Course').selectOption(COURSE);
    await page.getByLabel('Unit').selectOption(String(UNIT));
    await expect(page.getByText('No quiz items for this unit yet.')).toBeVisible();

    // Add.
    await page.getByRole('button', { name: 'Add item' }).click();
    await page.getByLabel('Question').fill(stem);
    const optionTexts = ['Cognitive', 'Musical', 'Spatial', 'Economic'];
    for (const [i, text] of optionTexts.entries()) {
      const key = String.fromCharCode(65 + i);
      if (await page.getByLabel(`Option ${key}`, { exact: true }).count() === 0) {
        await page.getByRole('button', { name: 'Add option' }).click();
      }
      await page.getByLabel(`Option ${key}`, { exact: true }).fill(text);
    }
    await page.getByLabel('Correct A').check();
    await page.getByRole('button', { name: 'Save', exact: true }).first().click();
    const item = page.getByTestId('quiz-item').filter({ hasText: stem });
    await expect(item).toBeVisible();

    // Edit: move the correct answer and reword the stem.
    const edited = `${stem} (edited)`;
    await item.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Question').fill(edited);
    await page.getByLabel('Correct B').check();
    await page.getByRole('button', { name: 'Save', exact: true }).first().click();
    const editedItem = page.getByTestId('quiz-item').filter({ hasText: edited });
    await expect(editedItem).toBeVisible();
    const { data: stored } = await fx.svc.from('quiz_items').select('id, correct_option')
      .eq('course_code', COURSE).eq('unit_no', UNIT).eq('question_text', edited).single();
    expect(stored!.correct_option).toBe('B');

    // Answer key. A key is unique per (course, unit, kind) on the shared live database, so
    // refuse to run rather than overwrite a real one.
    const { count: existingKeys } = await fx.svc.from('answer_keys').select('id', { count: 'exact', head: true })
      .eq('course_code', COURSE).eq('unit_no', UNIT).eq('kind', 'formative');
    expect(existingKeys, `a real ${COURSE} Unit ${UNIT} formative key exists; pick another unit`).toBe(0);
    await page.locator('#qa-key-formative').fill(`Model answer ${fx.tag}`);
    await page.locator('#qa-key-formative').locator('xpath=following-sibling::button[1]').click();
    await expect(page.getByRole('status').filter({ hasText: 'Saved ✓' })).toBeVisible();

    // Assignable: the unit shows in the quiz picker for a class on this course.
    await page.goto(`/app/classes/assignment-new/?classId=${klass.id}`);
    await page.getByRole('radio').nth(1).check();
    await expect(page.getByLabel('Quiz unit').locator(`option[value="${UNIT}"]`)).toHaveCount(1);

    // Delete.
    await page.goto('/app/teacher/quiz-authoring');
    await page.getByLabel('Course').selectOption(COURSE);
    await page.getByLabel('Unit').selectOption(String(UNIT));
    page.once('dialog', (d) => d.accept());
    await page.getByTestId('quiz-item').filter({ hasText: edited }).getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByTestId('quiz-item').filter({ hasText: edited })).toHaveCount(0);
    const { count } = await fx.svc.from('quiz_items').select('id', { count: 'exact', head: true }).eq('id', stored!.id);
    expect(count).toBe(0);
  } finally {
    await fx.svc.from('quiz_items').delete().eq('course_code', COURSE).eq('unit_no', UNIT).like('question_text', `%${fx.tag}%`);
    await fx.svc.from('answer_keys').delete().eq('course_code', COURSE).eq('unit_no', UNIT).like('content', `%${fx.tag}%`);
    await fx.teardown();
  }
});

test('unverified teacher and student see the gated notice, not the editor', async ({ page, browser }) => {
  const fx = new Fixtures();
  try {
    const teacher = await fx.user('quiz-unverified', 'teacher');
    const student = await fx.user('quiz-student', 'student');

    await signIn(page, teacher.email);
    await page.goto('/app/teacher/quiz-authoring');
    await expect(page.getByText(GATED)).toBeVisible();
    await expect(page.getByLabel('Course')).toHaveCount(0);

    const studentContext = await browser.newContext();
    const studentPage = await studentContext.newPage();
    try {
      await signIn(studentPage, student.email);
      await studentPage.goto('/app/teacher/quiz-authoring');
      await expect(studentPage.getByLabel('Course')).toHaveCount(0);
      await expect(studentPage.getByRole('button', { name: 'Add item' })).toHaveCount(0);
    } finally {
      await studentContext.close();
    }
  } finally {
    await fx.teardown();
  }
});
