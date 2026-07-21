import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T050 [Polish] — measures the dashboard home area's load time against
 * SC-008's budget (< 2s p95), using a fixture seeded at the 8-semester/
 * 6-class-per-semester scale. Distinct from T047's bundle-*size* check —
 * this measures load *time*.
 *
 * NOTE: a single-run measurement is a smoke check, not a true p95 (which
 * needs many samples); this test asserts the single-run time stays well
 * under budget as a regression guard, and is not a substitute for a proper
 * load-test harness if SC-008 compliance is ever in doubt at real scale.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const SC008_BUDGET_MS = 2000;
const SEMESTER_COUNT = 8;
const CLASSES_PER_SEMESTER = 6;

test('dashboard home loads within the SC-008 budget at 8-semester/6-class scale', async ({ page }) => {
  test.setTimeout(120_000);
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-perf-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-perf-student-${tag}@example.test`;
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

    for (let s = 1; s <= SEMESTER_COUNT; s += 1) {
      for (let c = 0; c < CLASSES_PER_SEMESTER; c += 1) {
        // join_code must be unique per class. `tag` is constant across the
        // whole loop, so the differentiator (s, c) must land in the
        // TRAILING characters that .slice(-6) actually keeps — a leading
        // differentiator gets sliced away when tag's own string already
        // exceeds 6 characters (found via a real production collision on
        // the first attempt at this fixture).
        const { data: klass } = await svc.from('classes').insert({
          teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: `Perf S${s}-${c}`, term_label: `Semester ${s}`,
          join_code: `${tag.toString(36)}${s}${c}`.slice(-6),
        }).select().single();
        classIds.push(klass.id);
        await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });
        await svc.from('assignments').insert({
          class_id: klass.id, source_kind: 'custom', title: `Perf assignment S${s}-${c}`,
          due_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), max_mark: 100, published: true,
        });
      }
    }

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    const start = Date.now();
    await page.goto('/app/dashboard/');
    await expect(page.getByText(/due soon/i)).toBeVisible();
    const elapsedMs = Date.now() - start;

    expect(elapsedMs, `dashboard home took ${elapsedMs}ms, budget is ${SC008_BUDGET_MS}ms`).toBeLessThan(SC008_BUDGET_MS);
  } finally {
    for (const id of classIds) await svc.from('classes').delete().eq('id', id);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
