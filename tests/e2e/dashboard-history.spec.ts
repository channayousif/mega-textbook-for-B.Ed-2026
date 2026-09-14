import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T027 [US5] — two archived semesters appear grouped separately with no
 * edit/resubmit control rendered anywhere on the page; a student with no
 * past semesters sees a plain explanation, not an empty region (US5
 * AS1–AS3); on a 360px viewport, no horizontal scrolling is required
 * (SC-006).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('a student with no past semesters sees a plain explanation', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const studentEmail = `e2e-dash-history-empty-${tag}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });
  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);
    await page.goto('/app/dashboard/history');
    await expect(page.getByText(/will appear here/i)).toBeVisible();
  } finally {
    await deleteUsers(svc, student.user!.id);
  }
});

test('two archived semesters appear grouped separately with no edit controls, and fit 360px', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-history-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-history-student-${tag}@example.test`;
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

    for (const [i, term] of ['Fall 2024', 'Spring 2025'].entries()) {
      const { data: klass } = await svc.from('classes').insert({
        // Class name deliberately does NOT contain the term label text — a
        // name like "Archived Fall 2024" would collide with the term-label
        // heading's own getByText('Fall 2024') lookup below (both contain
        // the same substring).
        teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: `History Fixture Class ${i}`, term_label: term,
        // Differentiator (`i`) goes LAST — slice(-6) takes the trailing
        // characters, so a prefix differentiator would be sliced away
        // entirely when tag's own string is already >=6 characters long.
        join_code: `${tag.toString(36)}${i}`.slice(-6), status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString(),
      }).select().single();
      classIds.push(klass.id);
      await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });
    }

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/dashboard/history');
    await expect(page.getByRole('heading', { name: 'Fall 2024', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Spring 2025', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /edit|resubmit/i })).toHaveCount(0);

    await page.setViewportSize({ width: 360, height: 780 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  } finally {
    for (const id of classIds) await svc.from('classes').delete().eq('id', id);
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
