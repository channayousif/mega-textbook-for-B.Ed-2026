import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T028 [US2] — a teacher publishes a custom assignment, a student sees it
 * and submits text before the deadline, and sees an on-time confirmation
 * (SC-001, SC-006). Uses "Custom" mode rather than the unit-item picker so
 * this test does not depend on which course/unit content happens to exist
 * in `docs/` at test time.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

function inOneHourLocalInputValue(): string {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

test('teacher publishes a custom assignment, student submits, sees on-time confirmation', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const teacherEmail = `e2e-assign-teacher-${Date.now()}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const studentEmail = `e2e-assign-student-${Date.now()}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const teacherContext = await browser.newContext();
  const studentContext = await browser.newContext();
  const teacherPage = await teacherContext.newPage();
  const studentPage = await studentContext.newPage();

  try {
    await teacherPage.goto('/app/login');
    await teacherPage.getByLabel(/email/i).fill(teacherEmail);
    await teacherPage.getByLabel(/password/i).fill(PASSWORD);
    await teacherPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(teacherPage).not.toHaveURL(/\/app\/login/);

    await teacherPage.goto('/app/classes');
    await teacherPage.getByLabel(/^course$/i).selectOption('EFMP-301');
    await teacherPage.getByLabel(/class name/i).fill('E2E Assign Section');
    await teacherPage.getByLabel(/term/i).fill('Fall 2026');
    await teacherPage.getByRole('button', { name: /create class/i }).click();
    const classRow = teacherPage.locator('tr', { has: teacherPage.getByText('E2E Assign Section') });
    await expect(classRow).toBeVisible();
    await classRow.getByRole('link', { name: /manage/i }).click();
    await expect(teacherPage).toHaveURL(/\/app\/classes\/roster\/?\?classId=/);
    const classId = new URL(teacherPage.url()).searchParams.get('classId');

    // SC-001 spot-check: create + publish a custom assignment in a few fields/clicks.
    await teacherPage.goto(`/app/classes/assignment-new/?classId=${classId}`);
    // getByRole, not getByLabel — the radio's wrapping <label> has a leading
    // space text node (`{' '}Custom` in JSX), which getByLabel's regex
    // matching doesn't trim, so an anchored `/^custom$/i` never matches it;
    // getByRole uses the accessible-name algorithm, which does trim (found
    // during T042 — this test had never actually been executed before).
    await teacherPage.getByRole('radio', { name: /^custom$/i }).check();
    await teacherPage.getByLabel(/^title$/i).fill('E2E Custom Assignment');
    await teacherPage.getByLabel(/due date/i).fill(inOneHourLocalInputValue());
    await teacherPage.getByLabel(/maximum mark/i).fill('50');
    await teacherPage.getByRole('button', { name: /publish assignment/i }).click();
    await expect(teacherPage.getByText(/assignment published/i)).toBeVisible();

    // Student joins the class, then submits before the deadline (SC-006).
    await studentPage.goto('/app/login');
    await studentPage.getByLabel(/email/i).fill(studentEmail);
    await studentPage.getByLabel(/password/i).fill(PASSWORD);
    await studentPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(studentPage).not.toHaveURL(/\/app\/login/);

    const { data: klassRow } = await svc.from('classes').select('join_code').eq('id', classId!).single();
    await studentPage.goto('/app/classes');
    await studentPage.getByLabel(/join code/i).fill(klassRow!.join_code!);
    await studentPage.getByRole('button', { name: /^join$/i }).click();
    await expect(studentPage.getByText(/you joined the class/i)).toBeVisible();

    await studentPage.goto(`/app/classes/assignments/?classId=${classId}`);
    await studentPage.getByRole('link', { name: 'E2E Custom Assignment' }).click();
    await expect(studentPage).toHaveURL(/\/app\/classes\/assignment\/?\?/);
    await studentPage.getByLabel(/your answer/i).fill('My submitted answer');
    await studentPage.getByRole('button', { name: /^submit$/i }).click();
    await expect(studentPage.getByText(/submitted on time/i)).toBeVisible();
  } finally {
    await svc.from('classes').delete().eq('name', 'E2E Assign Section').eq('course_code', 'EFMP-301');
    await teacherContext.close();
    await studentContext.close();
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
