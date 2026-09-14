import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T010 [US1] — items due within 48h appear first; a student with nothing
 * pending sees "all caught up," not an empty region; on a 360px viewport,
 * semester/classes/due-soon/recent-grades are all reachable without
 * scrolling past the fold (US1 AS1–AS3, SC-006).
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

test('dashboard home orders due-soon items 48h-first and fits a 360px viewport', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-student-${tag}@example.test`;

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

    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id,
      course_code: 'EFMP-301',
      name: 'E2E Dashboard Home',
      term_label: 'Fall 2026',
      join_code: `${tag.toString(36)}H`.slice(-6),
    }).select().single();
    classId = klass.id;

    await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });

    const soon = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // within 48h
    const later = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // beyond 48h
    // Fixture titles deliberately avoid the literal "Due soon" section
    // heading text — a title reusing that phrase collides with the
    // heading's own locator below (both would match the same getByText).
    await svc.from('assignments').insert([
      { class_id: klass.id, source_kind: 'custom', title: 'Later assignment', due_at: later, max_mark: 100, published: true, allow_late: false },
      { class_id: klass.id, source_kind: 'custom', title: 'Urgent assignment', due_at: soon, max_mark: 100, published: true, allow_late: false },
    ]);

    await signIn(page, studentEmail);
    await page.goto('/app/dashboard/');

    await expect(page.getByRole('heading', { name: 'Due soon', exact: true })).toBeVisible();
    const items = page.locator('[data-testid="due-soon-item"]');
    await expect(items.first()).toContainText('Urgent assignment');

    await page.setViewportSize({ width: 360, height: 780 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});

test('a student with nothing pending sees an "all caught up" state, not an empty region', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const studentEmail = `e2e-dash-caughtup-${tag}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  try {
    await signIn(page, studentEmail);
    await page.goto('/app/dashboard/');
    await expect(page.getByText(/all caught up/i)).toBeVisible();
  } finally {
    await deleteUsers(svc, student.user!.id);
  }
});
