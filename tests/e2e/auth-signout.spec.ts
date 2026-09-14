import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T047 [US4] — sign-out from a docs page ends the session on app pages too
 * (FR-012). One session spans the whole site (Root.tsx mounts <AuthProvider>
 * once, docs and app alike), so sign-out anywhere must end it everywhere —
 * this specifically checks signing out from a DOCS page (not the app page
 * where signing-in happened) still protects /app/profile afterward.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const DOCS_PAGE = '/semester-1/efmp-301/unit-01/';

test('sign-out from a docs page ends the session on app pages too', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const email = `e2e-signout-${Date.now()}@example.test`;
  const { data: created } = await svc.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    // Sign out from a DOCS page, not the app page — the whole point.
    await page.goto(DOCS_PAGE);
    await expect(page.locator('.navbar').getByText(email)).toBeVisible();
    await page.getByRole('button', { name: /sign out/i }).click();
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();

    // An app page must now treat the visitor as signed out.
    await page.goto('/app/profile');
    await expect(page).toHaveURL(/\/app\/login/);
  } finally {
    await deleteUsers(svc, created.user!.id);
  }
});
