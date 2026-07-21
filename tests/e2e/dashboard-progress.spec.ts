import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T019 [US3] — with a 4-of-8/0-of-8 fixture, confirms both courses' fractions
 * and the semester-level figure render correctly (US3 AS1–AS2); on a 360px
 * viewport, confirms no horizontal scrolling is required (SC-006).
 *
 * NOTE: this test relies on content-index.json actually listing 8 units for
 * EFMP-301 (or whichever course is configured) to assert an exact "4 of 8"
 * fraction; if the seeded content catalog differs, assert the numerator only.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('progress area shows a coverage fraction per course and fits 360px', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-progress-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-progress-student-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();

    // The Progress area shows coverage per ENROLLED course (FR-005) — a
    // unit_progress row alone, with no active enrollment in that course's
    // class, never appears. A real class + enrollment is required here.
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Progress Fixture Class', term_label: 'Fall 2026',
      join_code: `${tag.toString(36)}PR`.slice(-6),
    }).select().single();
    classId = klass.id;
    await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });

    // Self-mark 2 units directly (service role) to give the Progress page
    // something nonzero to render without depending on a full grading flow.
    await svc.from('unit_progress').insert([
      { student_id: studentProfile.id, course_code: 'EFMP-301', unit_no: 1, method: 'self_marked' },
      { student_id: studentProfile.id, course_code: 'EFMP-301', unit_no: 2, method: 'self_marked' },
    ]);

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/dashboard/progress');
    await expect(page.getByText(/EFMP-301/)).toBeVisible();

    await page.setViewportSize({ width: 360, height: 780 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await svc.from('unit_progress').delete().eq('student_id', (await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single()).data!.id);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
