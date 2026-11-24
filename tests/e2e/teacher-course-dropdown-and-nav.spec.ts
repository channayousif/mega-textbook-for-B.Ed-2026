import { test, expect } from '@playwright/test';
import { Fixtures, configured, SKIP_REASON, signIn } from './_dashboardFixtures';

/**
 * Spec 011 T025 [US4] - a teacher creates a class by picking its course from a grouped
 * dropdown (there is no free-text course box), then reaches Analytics and a student
 * drill-down from the overview by links alone, never by typing a URL (T024).
 */
test.skip(!configured, SKIP_REASON);

test('create a class from the course dropdown; reach analytics and a student by link', async ({ page }) => {
  test.setTimeout(120_000);
  const fx = new Fixtures();
  try {
    const teacher = await fx.user('nav-teacher', 'teacher');
    const student = await fx.user('nav-student', 'student');
    const className = `Dropdown class ${fx.tag}`;

    await signIn(page, teacher.email);
    await page.goto('/app/teacher');
    await page.getByRole('navigation', { name: 'Dashboard navigation' }).getByRole('link', { name: 'Classes', exact: true }).click();
    await expect(page).toHaveURL(/\/app\/classes\/?$/);

    const course = page.getByLabel('Course');
    await expect(course).toHaveJSProperty('tagName', 'SELECT');
    // Grouped by semester or track, and a course without content cannot be chosen.
    expect(await course.locator('optgroup').count()).toBeGreaterThan(0);
    for (const disabled of await course.locator('option[disabled]:not([value=""])').allTextContents()) {
      expect(disabled).toContain('(no content)');
    }
    await course.selectOption('EFMP-301');
    await page.getByLabel('Class name').fill(className);
    await page.getByLabel('Term').fill('Fall 2026');
    await page.getByRole('button', { name: 'Create class' }).click();
    await expect(page.getByRole('cell', { name: className })).toBeVisible();

    const { data: created } = await fx.svc.from('classes').select('id, course_code')
      .eq('teacher_id', teacher.profileId).eq('name', className).single();
    expect(created!.course_code).toBe('EFMP-301');
    fx.track('class', created!.id);

    // Give the class one student with one submission so the overview has an activity row.
    await fx.svc.from('enrollments').insert({ class_id: created!.id, student_id: student.profileId });
    const { data: assignment } = await fx.svc.from('assignments').insert({
      class_id: created!.id, source_kind: 'custom', title: `Activity ${fx.tag}`,
      due_at: new Date(Date.now() + 86_400_000).toISOString(), max_mark: 10, published: true, allow_late: false,
    }).select('id').single();
    const { error: subErr } = await fx.svc.from('submissions').insert({
      assignment_id: assignment!.id, student_id: student.profileId, text_content: 'My answer',
    });
    expect(subErr).toBeNull();

    // Analytics by link: the class's chip on the overview.
    await page.goto('/app/teacher');
    await page.locator(`main a.chip-link[href*="/app/teacher/analytics/?classId=${created!.id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/app/teacher/analytics/?\\?classId=${created!.id}`));
    await expect(page.getByRole('heading', { name: 'Class analytics' })).toBeVisible();

    // Student drill-down by link: the recent-activity row.
    await page.goto('/app/teacher');
    await page.getByTestId('recent-activity-item').filter({ hasText: `Activity ${fx.tag}` }).click();
    await expect(page).toHaveURL(new RegExp(`/app/teacher/student/?\\?classId=${created!.id}&studentId=${student.profileId}`));
  } finally {
    await fx.teardown();
  }
});
