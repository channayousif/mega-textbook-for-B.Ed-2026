import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T041 [US3] — non-admin reaching `/app/admin/users` is denied (FR-015).
 *
 * ⚠️ Scoped down from the task's full description ("self-selected teacher
 * sees peer-teaching UI but no restricted material"): peer-teaching UI and
 * restricted-material pages don't exist yet — FR-005 explicitly says
 * peer-teaching capabilities "are implemented by Spec 003." This test covers
 * exactly what Spec 002 builds: AuthGuard denying admin-only pages to
 * non-admins. Same pattern as T023/T040's scoped-narrowing, confirmed
 * necessary while writing this test, not assumed up front.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('a signed-out visitor reaching /app/admin/users is redirected to sign in', async ({ page }) => {
  await page.goto('/app/admin/users');
  await expect(page).toHaveURL(/\/app\/login/);
});

test('a signed-in non-admin (student) reaching /app/admin/users is denied, not shown the list', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const email = `e2e-roles-student-${Date.now()}@example.test`;
  const { data: created } = await svc.auth.admin.createUser({
    email, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/admin/users');
    await expect(page.getByText(/don't have access/i)).toBeVisible();
    await expect(page.locator('table')).toHaveCount(0);
  } finally {
    await svc.auth.admin.deleteUser(created.user!.id);
  }
});

test('a self-selected teacher (not admin) is also denied /app/admin/users', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const email = `e2e-roles-teacher-${Date.now()}@example.test`;
  const { data: created } = await svc.auth.admin.createUser({
    email, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/admin/users');
    await expect(page.getByText(/don't have access/i)).toBeVisible();
  } finally {
    await svc.auth.admin.deleteUser(created.user!.id);
  }
});

test('an admin CAN reach /app/admin/users and sees the user table', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const email = `e2e-roles-admin-${Date.now()}@example.test`;
  const { data: created } = await svc.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
  await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', created.user!.id);

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/admin/users');
    await expect(page.locator('table')).toBeVisible();
    // Scoped to the table — the navbar also shows the admin's own email.
    await expect(page.locator('table').getByText(email)).toBeVisible();
  } finally {
    await svc.auth.admin.deleteUser(created.user!.id);
  }
});
