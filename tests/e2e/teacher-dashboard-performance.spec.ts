import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T050 [Polish] — measures Overview's and Analytics' load time against Spec
 * 003 SC-005's 5-second p95 budget, distinct from T048's bundle-*size*
 * check (2026-07-24 remediation, `/sp.analyze` finding G1).
 *
 * NOTE: a single-run measurement is a smoke check, not a true p95 (which
 * needs many samples at the full 200-student scale ceiling); creating 200
 * real auth users per CI run is impractical for a fast E2E smoke test, so
 * this seeds a representative fixture (30 students, one graded assignment
 * each) and asserts the single-run time stays well under budget as a
 * regression guard — matching Spec 004's own T050 disclaimer for its
 * SC-008 measurement.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const SC005_BUDGET_MS = 5000;
const STUDENT_COUNT = 30;

test('overview and analytics load within the SC-005 budget at representative scale', async ({ page }) => {
  test.setTimeout(120_000);
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-teacher-perf-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  const studentAuthIds: string[] = [];
  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Perf Fixture Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}P`.slice(-6),
    }).select().single();
    classId = klass.id;
    const { data: assignment } = await svc.from('assignments').insert({
      class_id: classId, source_kind: 'activity', course_code: 'EFMP-301', unit_no: 1, title: 'Perf Assignment',
      due_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), max_mark: 100, published: true, allow_late: false,
    }).select().single();

    for (let i = 0; i < STUDENT_COUNT; i += 1) {
      const { data: student } = await svc.auth.admin.createUser({
        email: `e2e-teacher-perf-student-${tag}-${i}@example.test`, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
      });
      studentAuthIds.push(student.user!.id);
      const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();
      await svc.from('enrollments').insert({ class_id: classId, student_id: studentProfile.id });
      const { data: submission } = await svc.from('submissions').insert({
        assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'answer', late: false,
      }).select().single();
      await svc.from('grades').insert({ submission_id: submission.id, mark: 70 + (i % 20), graded_by: teacherProfile.id });
    }

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(teacherEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    const overviewStart = Date.now();
    await page.goto('/app/teacher/');
    await expect(page.getByTestId('ungraded-count-row').first().or(page.getByText(/caught up/i))).toBeVisible();
    const overviewElapsedMs = Date.now() - overviewStart;
    expect(overviewElapsedMs, `Overview took ${overviewElapsedMs}ms, budget is ${SC005_BUDGET_MS}ms`).toBeLessThan(SC005_BUDGET_MS);

    const analyticsStart = Date.now();
    await page.goto(`/app/teacher/analytics/?classId=${classId}`);
    await expect(page.getByTestId('distribution-row').first()).toBeVisible();
    const analyticsElapsedMs = Date.now() - analyticsStart;
    expect(analyticsElapsedMs, `Analytics took ${analyticsElapsedMs}ms, budget is ${SC005_BUDGET_MS}ms`).toBeLessThan(SC005_BUDGET_MS);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    for (const id of studentAuthIds) await svc.auth.admin.deleteUser(id);
  }
});
