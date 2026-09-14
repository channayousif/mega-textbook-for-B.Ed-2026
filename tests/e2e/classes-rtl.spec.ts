import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T063 [Polish] — RTL layout verification for the new classes/assignments/
 * quiz pages, mirroring Spec 001's read-bilingual.spec.ts technique (`dir`
 * attribute + no-horizontal-scroll at a narrow viewport) — the first RTL
 * check written against an authenticated `/app/*` route rather than an
 * anonymous content page; no dedicated Spec 002 RTL Playwright test existed
 * to literally mirror, so this applies the same established method to this
 * feature's own pages. Spot-checks three representative pages (roster,
 * assignments list, new-assignment form) rather than all eight — Docusaurus
 * routes every `src/pages/*.tsx` file through the same locale-aware
 * rendering pipeline (confirmed via `dir` below), so per-page coverage
 * beyond a representative sample would be redundant, same reasoning
 * read-bilingual.spec.ts applied to content pages.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page): Promise<void> {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBe(false);
}

test('classes pages render RTL under /ur/ and fit a 360px viewport without horizontal scroll', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const teacherEmail = `e2e-rtl-teacher-${Date.now()}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  try {
    // Sign in on the default (English) locale — GoTrue session cookies are
    // locale-independent, so this carries over to /ur/ navigation below.
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(teacherEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/ur/app/classes');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    await page.getByLabel(/^course$/i).selectOption('EFMP-301');
    await page.getByLabel(/class name/i).fill('E2E RTL Section');
    await page.getByLabel(/term/i).fill('Fall 2026');
    await page.getByRole('button', { name: /create class/i }).click();
    const classRow = page.locator('tr', { has: page.getByText('E2E RTL Section') });
    await expect(classRow).toBeVisible();
    await classRow.getByRole('link', { name: /manage/i }).click();
    await expect(page).toHaveURL(/\/ur\/app\/classes\/roster\/?\?classId=/);
    const classId = new URL(page.url()).searchParams.get('classId');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    await page.setViewportSize({ width: 360, height: 780 });
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`/ur/app/classes/assignments/?classId=${classId}`);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.setViewportSize({ width: 360, height: 780 });
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`/ur/app/classes/assignment-new/?classId=${classId}`);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('radio', { name: /^quiz$/i })).toBeVisible();
    await page.setViewportSize({ width: 360, height: 780 });
    await expectNoHorizontalOverflow(page);
  } finally {
    await svc.from('classes').delete().eq('name', 'E2E RTL Section').eq('course_code', 'EFMP-301');
    await deleteUsers(svc, teacher.user!.id);
  }
});
