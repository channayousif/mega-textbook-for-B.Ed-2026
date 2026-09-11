import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T012 [US1] — a teacher creates a class, shares the join code, a student
 * joins, and the roster updates immediately (FR-001, FR-003; spot-checks
 * SC-001/SC-002 timing).
 *
 * Two browser contexts, real UI throughout — mirrors
 * auth-role-propagation.spec.ts's two-actor pattern. Users are seeded via the
 * service role (fast, reliable) but the class-creation/join flow itself goes
 * through the real product pages, not a service-role shortcut.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('teacher creates a class, student joins by code, roster updates immediately', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const teacherEmail = `e2e-classes-teacher-${Date.now()}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  const studentEmail = `e2e-classes-student-${Date.now()}@example.test`;
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

    // SC-001 spot-check: a few clicks/fields to create a class.
    await teacherPage.goto('/app/classes');
    await teacherPage.getByLabel(/^course$/i).selectOption('EFMP-301');
    await teacherPage.getByLabel(/class name/i).fill('E2E Section');
    await teacherPage.getByLabel(/term/i).fill('Fall 2026');
    await teacherPage.getByRole('button', { name: /create class/i }).click();

    const classRow = teacherPage.locator('tr', { has: teacherPage.getByText('E2E Section') });
    await expect(classRow).toBeVisible();
    const joinCode = (await classRow.locator('td').nth(3).textContent())?.trim();
    expect(joinCode).toMatch(/^[A-Z0-9]{6}$/);

    // SC-002 spot-check: student joins within a minute of receiving the code.
    await studentPage.goto('/app/login');
    await studentPage.getByLabel(/email/i).fill(studentEmail);
    await studentPage.getByLabel(/password/i).fill(PASSWORD);
    await studentPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(studentPage).not.toHaveURL(/\/app\/login/);

    await studentPage.goto('/app/classes');
    await studentPage.getByLabel(/join code/i).fill(joinCode!);
    await studentPage.getByRole('button', { name: /^join$/i }).click();
    await expect(studentPage.getByText(/you joined the class/i)).toBeVisible();
    await expect(studentPage.getByText('E2E Section')).toBeVisible();

    // Roster updates immediately on the teacher's side (FR-003).
    await classRow.getByRole('link', { name: /manage/i }).click();
    await expect(teacherPage).toHaveURL(/\/app\/classes\/roster\/?\?classId=/);
    await expect(teacherPage.getByRole('heading', { name: 'Roster (1)' })).toBeVisible();
  } finally {
    await svc.from('classes').delete().eq('name', 'E2E Section').eq('course_code', 'EFMP-301');
    await teacherContext.close();
    await studentContext.close();
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
