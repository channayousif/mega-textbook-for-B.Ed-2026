import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T015 [US2] — opens Grades, confirms every mark across both classes is
 * visible and no average figure is rendered anywhere on the page; on a
 * 360px viewport, confirms no horizontal scrolling is required (SC-006).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('grades area shows every mark across classes with no average, and fits 360px', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-grades-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-grades-student-${tag}@example.test`;

  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const classIds: string[] = [];
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();

    for (const label of ['Class One', 'Class Two']) {
      const { data: klass } = await svc.from('classes').insert({
        teacher_id: teacherProfile.id,
        course_code: 'EFMP-301',
        name: label,
        term_label: 'Fall 2026',
        join_code: `${tag.toString(36)}${label[6]}`.slice(-6),
      }).select().single();
      classIds.push(klass.id);
      await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });
      const { data: assignment } = await svc.from('assignments').insert({
        class_id: klass.id, source_kind: 'custom', title: `${label} Assignment`, due_at: new Date().toISOString(), max_mark: 100, published: true,
      }).select().single();
      const { data: submission } = await svc.from('submissions').insert({
        assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'answer',
      }).select().single();
      await svc.from('grades').insert({ submission_id: submission.id, mark: 75, graded_by: teacherProfile.id });
    }

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/dashboard/grades');
    await expect(page.getByText('Class One Assignment')).toBeVisible();
    await expect(page.getByText('Class Two Assignment')).toBeVisible();
    await expect(page.getByText(/average/i)).toHaveCount(0);

    await page.setViewportSize({ width: 360, height: 780 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  } finally {
    for (const id of classIds) await svc.from('classes').delete().eq('id', id);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
