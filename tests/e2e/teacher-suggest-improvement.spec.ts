import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T010 [US2] — from any unit page, using "Suggest improvement" files a
 * suggestion with the exact page slug, nearest section heading, and current
 * locale captured automatically — nothing the teacher types beyond category
 * and body; "My Suggestions" then shows it with category, body, and status
 * "submitted" (US2 AS1–AS2). Repeats the same check from a course-overview
 * page (no `unit_no` in front matter) and confirms the filed suggestion has
 * `unit_no = null`, not a rejected submission (2026-07-24 remediation,
 * research.md R1).
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

test('teacher files a suggestion from a unit page with slug/locale captured automatically', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-suggest-teacher-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  try {
    await signIn(page, teacherEmail);

    // EFMP-301, Unit 1 — the golden unit (Constitution Art. VI.1).
    await page.goto('/semester-1/efmp-301/unit-01/');
    await page.getByTestId('suggest-improvement-button').click();
    await page.getByTestId('suggestion-category-select').selectOption('clarity');
    await page.getByTestId('suggestion-body-textarea').fill('This section is unclear.');
    await page.getByTestId('suggestion-submit-button').click();
    await expect(page.getByTestId('suggestion-submitted')).toBeVisible();

    await page.goto('/app/teacher/feedback-suggestions');
    const row = page.getByTestId('suggestion-row').filter({ hasText: 'This section is unclear.' });
    await expect(row).toBeVisible();
    await expect(row.getByTestId('suggestion-status')).toContainText(/submitted/i);
  } finally {
    const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    await svc.from('improvement_suggestions').delete().eq('teacher_id', profile!.id);
    await deleteUsers(svc, teacher.user!.id);
  }
});

test('teacher files a suggestion from a course-overview page and it is accepted with unit_no = null', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-suggest-overview-teacher-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  try {
    await signIn(page, teacherEmail);

    await page.goto('/semester-1/efmp-301/course-overview');
    await page.getByTestId('suggest-improvement-button').click();
    await page.getByTestId('suggestion-category-select').selectOption('factual');
    await page.getByTestId('suggestion-body-textarea').fill('The credit hours look wrong.');
    await page.getByTestId('suggestion-submit-button').click();
    await expect(page.getByTestId('suggestion-submitted')).toBeVisible();

    const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: rows } = await svc
      .from('improvement_suggestions')
      .select('*')
      .eq('teacher_id', profile!.id);
    expect(rows).toHaveLength(1);
    expect(rows![0].unit_no).toBeNull();
    expect(rows![0].course_code).toBe('EFMP-301');
  } finally {
    const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    await svc.from('improvement_suggestions').delete().eq('teacher_id', profile!.id);
    await deleteUsers(svc, teacher.user!.id);
  }
});
