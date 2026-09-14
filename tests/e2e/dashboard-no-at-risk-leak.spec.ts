import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T035 [US6] — the flagged student's own dashboard (`/app/dashboard/`, Spec
 * 004) shows no at-risk flag or label of any kind, under any condition
 * (US6 AS3 — mirrors Spec 004's own FR-010 in the opposite direction).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

async function signIn(page: import('@playwright/test').Page, email: string): Promise<void> {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

test('a student meeting the at-risk criteria sees no at-risk flag anywhere on their own dashboard', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-no-leak-teacher-${tag}@example.test`;
  const studentEmail = `e2e-no-leak-student-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({ email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' } });
  const { data: student } = await svc.auth.admin.createUser({ email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' } });

  // Two separate browser contexts, one per signed-in identity —
  // `/app/login` redirects an already-authenticated session away before the
  // form ever renders (see login.tsx's `if (session) window.location.assign
  // (returnTo)`), so a single shared `page` cannot hold both the teacher's
  // and the student's sessions in sequence. Matches
  // auth-role-propagation.spec.ts's existing precedent for this exact
  // situation.
  const teacherContext = await browser.newContext();
  const studentContext = await browser.newContext();
  const teacherPage = await teacherContext.newPage();
  const studentPage = await studentContext.newPage();

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();

    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'No Leak Fixture Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}NL`.slice(-6),
    }).select().single();
    classId = klass.id;
    await svc.from('enrollments').insert({ class_id: classId, student_id: studentProfile.id });

    // Two past-due assignments the student never submits — meets the
    // >=2-missed-deadlines at-risk criterion.
    const past = (daysAgo: number) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    await svc.from('assignments').insert([
      { class_id: classId, source_kind: 'custom', title: 'Missed 1', due_at: past(3), max_mark: 100, published: true, allow_late: false },
      { class_id: classId, source_kind: 'custom', title: 'Missed 2', due_at: past(2), max_mark: 100, published: true, allow_late: false },
    ]);

    // Confirm the teacher's own Analytics does flag this student.
    await signIn(teacherPage, teacherEmail);
    await teacherPage.goto(`/app/teacher/analytics/?classId=${classId}`);
    await expect(teacherPage.getByTestId('at-risk-student-row')).toHaveCount(1);

    // The student's own dashboard must show nothing at-risk-related anywhere.
    await signIn(studentPage, studentEmail);
    await studentPage.goto('/app/dashboard/');
    await expect(studentPage.getByText(/at.risk/i)).toHaveCount(0);
    await expect(studentPage.getByText(/missed deadline/i)).toHaveCount(0);
    await expect(studentPage.getByText(/falling trend/i)).toHaveCount(0);
  } finally {
    await teacherContext.close();
    await studentContext.close();
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
