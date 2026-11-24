import { test, expect } from '@playwright/test';
import { Fixtures, configured, SKIP_REASON, signIn } from './_dashboardFixtures';

/**
 * Spec 011 T030 [US5] - a teacher edits an assignment's due date and max mark and the
 * enrolled student sees the change; deletes an empty assignment (one with a submission
 * cannot be deleted, T029); and renames the class.
 */
test.skip(!configured, SKIP_REASON);

test('edit an assignment (student sees it), delete an empty one, rename the class', async ({ page, browser }) => {
  test.setTimeout(150_000);
  const fx = new Fixtures();
  try {
    const teacher = await fx.user('manage-teacher', 'teacher');
    const student = await fx.user('manage-student', 'student');
    const klass = await fx.klass(teacher, `Manage class ${fx.tag}`, [student]);
    const due = new Date(Date.now() + 3 * 86_400_000).toISOString();
    const base = { class_id: klass.id, source_kind: 'custom', due_at: due, max_mark: 100, published: true, allow_late: false };
    const { data: rows, error } = await fx.svc.from('assignments').insert([
      { ...base, title: `Editable ${fx.tag}` },
      { ...base, title: `Empty ${fx.tag}` },
      { ...base, title: `Submitted ${fx.tag}` },
    ]).select('id, title');
    expect(error).toBeNull();
    const byTitle = Object.fromEntries(rows!.map((r) => [r.title.split(' ')[0], r.id]));
    await fx.svc.from('submissions').insert({ assignment_id: byTitle.Submitted, student_id: student.profileId, text_content: 'Done' });

    await signIn(page, teacher.email);
    await page.goto(`/app/classes/assignments/?classId=${klass.id}`);
    const row = (title: string) => page.getByRole('row').filter({ has: page.getByRole('link', { name: `${title} ${fx.tag}`, exact: true }) });

    // Edit due date and max mark.
    await row('Editable').getByRole('button', { name: 'Edit' }).click();
    await page.locator(`#ae-due-${byTitle.Editable}`).fill('2030-06-15T09:30');
    await page.locator(`#ae-max-${byTitle.Editable}`).fill('75');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(row('Editable').getByRole('cell', { name: '75', exact: true })).toBeVisible();
    const { data: after } = await fx.svc.from('assignments').select('max_mark, due_at').eq('id', byTitle.Editable).single();
    expect(after!.max_mark).toBe(75);
    expect(new Date(after!.due_at).getFullYear()).toBe(2030);

    // A submitted assignment refuses deletion with the specific reason; an empty one goes.
    page.once('dialog', (d) => d.accept());
    await row('Submitted').getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('Cannot delete: this assignment has submissions. Unpublish it instead.')).toBeVisible();
    await expect(row('Submitted')).toHaveCount(1);
    page.once('dialog', (d) => d.accept());
    await row('Empty').getByRole('button', { name: 'Delete' }).click();
    await expect(row('Empty')).toHaveCount(0);

    // Rename the class from its roster page.
    const renamed = `Renamed class ${fx.tag}`;
    await page.goto(`/app/classes/roster/?classId=${klass.id}`);
    await page.getByRole('button', { name: 'Edit details' }).click();
    await page.getByLabel('Class name').fill(renamed);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect.poll(async () => (await fx.svc.from('classes').select('name').eq('id', klass.id).single()).data?.name).toBe(renamed);

    // The student sees the new max mark and due year on the assignment page.
    const studentContext = await browser.newContext();
    const studentPage = await studentContext.newPage();
    try {
      await signIn(studentPage, student.email);
      await studentPage.goto(`/app/classes/assignment/?classId=${klass.id}&assignmentId=${byTitle.Editable}`);
      await expect(studentPage.getByText(/Max mark 75/)).toBeVisible();
      await expect(studentPage.getByText(/2030/).first()).toBeVisible();
    } finally {
      await studentContext.close();
    }
  } finally {
    await fx.teardown();
  }
});
