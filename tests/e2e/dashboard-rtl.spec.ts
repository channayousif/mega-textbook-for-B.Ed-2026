import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T049 [Polish] — switches locale to Urdu and confirms all six dashboard
 * areas plus every empty state render correctly right-to-left, matching
 * Specs 002/003's own RTL-testing precedent (classes-rtl.spec.ts,
 * read-bilingual.spec.ts) (SC-007).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const AREAS = ['', 'assignments', 'grades', 'progress', 'history', 'achievements'];

test('every dashboard area renders RTL under /ur/ with no horizontal overflow', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const studentEmail = `e2e-dash-rtl-${tag}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    for (const area of AREAS) {
      await page.goto(`/ur/app/dashboard/${area}`);
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      await page.setViewportSize({ width: 360, height: 780 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflow, `horizontal overflow at /ur/app/dashboard/${area}`).toBe(false);
      await page.setViewportSize({ width: 1280, height: 800 });
    }
  } finally {
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
