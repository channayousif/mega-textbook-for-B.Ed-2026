import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T034 [US6] — with a seeded fixture, confirms score distribution,
 * per-student trend, and unit-by-unit average all match a manual
 * calculation; confirms only the student(s) meeting either at-risk
 * criterion (≥2 missed deadlines, or last-3-scores-declining) are flagged,
 * each with a tooltip naming the specific reason (US6 AS1–AS2).
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

test('analytics shows correct distribution/unit average and flags only at-risk students', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-analytics-teacher-${tag}@example.test`;
  const studentXEmail = `e2e-analytics-x-${tag}@example.test`;
  const studentYEmail = `e2e-analytics-y-${tag}@example.test`;
  const studentZEmail = `e2e-analytics-z-${tag}@example.test`;

  const { data: teacher } = await svc.auth.admin.createUser({ email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' } });
  const { data: studentX } = await svc.auth.admin.createUser({ email: studentXEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student', full_name: 'Student X' } });
  const { data: studentY } = await svc.auth.admin.createUser({ email: studentYEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student', full_name: 'Student Y' } });
  const { data: studentZ } = await svc.auth.admin.createUser({ email: studentZEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student', full_name: 'Student Z' } });

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: xProfile } = await svc.from('profiles').select('id').eq('auth_user_id', studentX.user!.id).single();
    const { data: yProfile } = await svc.from('profiles').select('id').eq('auth_user_id', studentY.user!.id).single();
    const { data: zProfile } = await svc.from('profiles').select('id').eq('auth_user_id', studentZ.user!.id).single();

    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Analytics Fixture Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}AN`.slice(-6),
    }).select().single();
    classId = klass.id;

    await svc.from('enrollments').insert([
      { class_id: classId, student_id: xProfile.id },
      { class_id: classId, student_id: yProfile.id },
      { class_id: classId, student_id: zProfile.id },
    ]);

    const past = (daysAgo: number) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    const { data: a1 } = await svc.from('assignments').insert({ class_id: classId, source_kind: 'activity', course_code: 'EFMP-301', unit_no: 1, title: 'A1', due_at: past(3), max_mark: 100, published: true, allow_late: false }).select().single();
    const { data: a2 } = await svc.from('assignments').insert({ class_id: classId, source_kind: 'activity', course_code: 'EFMP-301', unit_no: 1, title: 'A2', due_at: past(2), max_mark: 100, published: true, allow_late: false }).select().single();
    const { data: a3 } = await svc.from('assignments').insert({ class_id: classId, source_kind: 'activity', course_code: 'EFMP-301', unit_no: 1, title: 'A3', due_at: past(1), max_mark: 100, published: true, allow_late: false }).select().single();

    // Student X: submits all three, declining scores 90 -> 70 -> 50 (falling trend).
    for (const [assignment, mark] of [[a1, 90], [a2, 70], [a3, 50]] as const) {
      const { data: sub } = await svc.from('submissions').insert({ assignment_id: assignment.id, student_id: xProfile.id, text_content: 'x', late: false }).select().single();
      await svc.from('grades').insert({ submission_id: sub.id, mark, graded_by: teacherProfile.id });
    }

    // Student Y: submits none of the three past-due assignments (3 missed deadlines).

    // Student Z: submits all three, stable/improving scores 60 -> 70 -> 80 (not at-risk).
    for (const [assignment, mark] of [[a1, 60], [a2, 70], [a3, 80]] as const) {
      const { data: sub } = await svc.from('submissions').insert({ assignment_id: assignment.id, student_id: zProfile.id, text_content: 'z', late: false }).select().single();
      await svc.from('grades').insert({ submission_id: sub.id, mark, graded_by: teacherProfile.id });
    }

    await signIn(page, teacherEmail);
    await page.goto(`/app/teacher/analytics/?classId=${classId}`);

    // Distribution: A1 avg (90+60)/2=75%, A2 (70+70)/2=70%, A3 (50+80)/2=65%.
    await expect(page.getByTestId('distribution-row').filter({ hasText: 'A1' })).toContainText('75%');
    await expect(page.getByTestId('distribution-row').filter({ hasText: 'A2' })).toContainText('70%');
    await expect(page.getByTestId('distribution-row').filter({ hasText: 'A3' })).toContainText('65%');

    // Unit average across all 6 graded scores: (90+70+50+60+70+80)/6 = 70%.
    await expect(page.getByTestId('unit-average-row')).toContainText('70%');

    // At-risk: Student X (falling trend) and Student Y (missed deadlines) flagged; Student Z not.
    const atRiskRows = page.getByTestId('at-risk-student-row');
    await expect(atRiskRows.filter({ hasText: 'Student X' })).toContainText(/falling trend/i);
    await expect(atRiskRows.filter({ hasText: 'Student Y' })).toContainText(/missed deadlines/i);
    await expect(atRiskRows.filter({ hasText: 'Student Z' })).toHaveCount(0);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await deleteUsers(svc, teacher.user!.id, studentX.user!.id, studentY.user!.id, studentZ.user!.id);
  }
});
