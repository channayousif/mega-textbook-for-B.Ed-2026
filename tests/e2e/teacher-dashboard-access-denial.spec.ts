import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T051 [Polish] — a signed-in student reaching `/app/teacher/` sees
 * `TeacherDashboardGuard`'s denial notice; reaching `/app/admin/suggestions`
 * and `/app/admin/feedback` is denied by the existing `AuthGuard` (FR-013,
 * SC-007, 2026-07-24 remediation, `/sp.analyze` finding G2).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('a signed-in student is denied access to every teacher-dashboard and admin route in this feature', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const studentEmail = `e2e-access-denial-student-${tag}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/teacher/');
    await expect(page.getByText(/this view is for teachers/i)).toBeVisible();
    await expect(page.getByTestId('ungraded-count-row')).toHaveCount(0);

    await page.goto('/app/admin/suggestions');
    await expect(page.getByText(/don.t have access/i)).toBeVisible();
    await expect(page.getByTestId('moderation-row')).toHaveCount(0);

    await page.goto('/app/admin/feedback');
    await expect(page.getByText(/don.t have access/i)).toBeVisible();
    await expect(page.getByTestId('aggregate-feedback-row')).toHaveCount(0);
  } finally {
    await deleteUsers(svc, student.user!.id);
  }
});
