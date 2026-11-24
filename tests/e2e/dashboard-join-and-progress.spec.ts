import { test, expect } from '@playwright/test';
import { Fixtures, configured, SKIP_REASON, signIn } from './_dashboardFixtures';

/**
 * Spec 011 T016 [US2] - a student joins a class from the dashboard's "My classes" item,
 * marks a unit studied on a course they are NOT enrolled in, and Progress shows both
 * courses grouped, the non-enrolled one included (FR-007).
 */
test.skip(!configured, SKIP_REASON);

test('join from the dashboard menu; Progress groups enrolled and non-enrolled courses', async ({ page }) => {
  test.setTimeout(120_000);
  const fx = new Fixtures();
  let studentProfileId: string | null = null;
  try {
    const teacher = await fx.user('join-teacher', 'teacher');
    const student = await fx.user('join-student', 'student');
    studentProfileId = student.profileId;
    const klass = await fx.klass(teacher, `Join fixture ${fx.tag}`, [], 'EFMP-301');

    await signIn(page, student.email);
    await page.goto('/app/dashboard');
    await page.getByRole('navigation', { name: 'Dashboard navigation' }).getByRole('link', { name: 'My classes' }).click();
    await expect(page).toHaveURL(/\/app\/dashboard\/classes/);

    await page.getByLabel('Join code').fill(klass.joinCode);
    await page.getByRole('button', { name: 'Join', exact: true }).click();
    await expect(page.getByText('Joined. The class is in your list below.')).toBeVisible();
    await expect(page.getByRole('cell', { name: `Join fixture ${fx.tag}` })).toBeVisible();

    // A unit studied on EFMP-302, a course with no class enrollment.
    await page.goto('/semester-1/efmp-302/unit-01/');
    await page.getByRole('button', { name: 'Mark as studied' }).click();
    await expect(page.getByText('Marked as studied ✓')).toBeVisible();
    const { data: progress } = await fx.svc.from('unit_progress')
      .select('course_code, unit_no').eq('student_id', student.profileId);
    expect(progress).toEqual(expect.arrayContaining([expect.objectContaining({ course_code: 'EFMP-302', unit_no: 1 })]));

    await page.goto('/app/dashboard/progress');
    await expect(page.getByText(/EFMP-302/).first()).toBeVisible();
    await expect(page.getByText(/EFMP-301/).first()).toBeVisible();
  } finally {
    if (studentProfileId) await fx.svc.from('unit_progress').delete().eq('student_id', studentProfileId);
    await fx.teardown();
  }
});
