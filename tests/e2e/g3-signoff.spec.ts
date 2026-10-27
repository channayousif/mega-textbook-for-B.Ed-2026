import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

// ADR-0032. This spec never records a decision: CI's Supabase is the live instance, and a
// queued ledger row there would become a real sign-off PR at the crew's next tick. The
// write path is covered by tests/rls/g3-signoffs.test.mjs on a fake course code.
const url = process.env.DOCUSAURUS_SUPABASE_URL;
const anon = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
test.skip(!(url && anon && service), 'requires a migrated Supabase test instance');
const password = 'Test-Passw0rd!';

async function signIn(page: Page, email: string) {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

test('the G3 sign-off desk shows the whole picture to an admin and nothing to a teacher', async ({ browser }) => {
  const svc = createClient(url!, service!, { auth: { persistSession: false } });
  const stamp = Date.now();
  const adminEmail = `admin-g3desk-${stamp}@example.test`;
  const teacherEmail = `teacher-g3desk-${stamp}@example.test`;
  const admin = await svc.auth.admin.createUser({ email: adminEmail, password, email_confirm: true, user_metadata: { role: 'student' } });
  const teacher = await svc.auth.admin.createUser({ email: teacherEmail, password, email_confirm: true, user_metadata: { role: 'teacher' } });
  const adminContext = await browser.newContext();
  const teacherContext = await browser.newContext();
  try {
    await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', admin.data.user!.id);

    const teacherPage = await teacherContext.newPage();
    await signIn(teacherPage, teacherEmail);
    await teacherPage.goto('/app/admin/g3-signoff');
    await expect(teacherPage.getByTestId('owner-console-denied')).toBeVisible();

    const page = await adminContext.newPage();
    await signIn(page, adminEmail);
    await page.goto('/app/admin/');
    await page.getByRole('link', { name: /G3 sign-off desk/ }).click();
    await expect(page.getByRole('heading', { name: 'G3 sign-off desk' })).toBeVisible();
    await expect(page.getByText('Awaiting your decision')).toBeVisible();
    await expect(page.getByRole('tab', { name: /Records/ })).toBeVisible();

    // Every unit, whatever its state, is reachable from the table.
    await page.getByLabel('State').selectOption('');
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
    await rows.first().getByRole('button', { name: 'Open' }).click();
    await expect(page.getByRole('heading', { level: 3, name: 'Criteria' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'G3 tracker history' })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();

    await page.getByRole('tab', { name: /Records/ }).click();
    await expect(page.getByRole('tab', { name: /Records/ })).toHaveAttribute('aria-selected', 'true');
  } finally {
    await adminContext.close();
    await teacherContext.close();
    await deleteUsers(svc, admin.data.user?.id, teacher.data.user?.id);
  }
});
