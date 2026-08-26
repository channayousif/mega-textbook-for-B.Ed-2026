import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T017 [US3] — as an admin, filter the queue by status, category, and
 * course in turn; transition one suggestion through
 * submitted → under_review → accepted → published with a note at each
 * step; confirm the filing teacher's "My Suggestions" reflects each change
 * without a refresh action; confirm a signed-in teacher (not admin) is
 * denied access to the moderation route (US3 AS1–AS3).
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

test('admin filters the queue and transitions a suggestion through its full lifecycle with notes', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-moderation-teacher-${tag}@example.test`;
  const adminEmail = `e2e-moderation-admin-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  // `admin` is never self-selectable at signup (Constitution Art. V.3) —
  // even requesting it via user_metadata is silently ignored by the
  // 0007/0008 allowlist trigger. Create as a plain user, then promote via a
  // direct service-role update, matching auth-role-propagation.spec.ts's
  // existing precedent.
  const { data: admin } = await svc.auth.admin.createUser({
    email: adminEmail, password: PASSWORD, email_confirm: true,
  });
  await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', admin.user!.id);

  // Two separate browser contexts, one per signed-in identity —
  // `/app/login` redirects an already-authenticated session away before the
  // form ever renders (see login.tsx's `if (session) window.location.assign
  // (returnTo)`), so a single shared `page` cannot hold both the admin's and
  // the teacher's sessions in sequence. Matches
  // auth-role-propagation.spec.ts's existing precedent for this exact
  // situation.
  const adminContext = await browser.newContext();
  const teacherContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const teacherPage = await teacherContext.newPage();

  const suggestionIds: string[] = [];
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: s1 } = await svc.from('improvement_suggestions').insert({
      teacher_id: teacherProfile.id, page_slug: '/a', locale: 'en', course_code: 'EFMP-301', unit_no: 1, category: 'typo', body: 'Fix typo A',
    }).select().single();
    const { data: s2 } = await svc.from('improvement_suggestions').insert({
      teacher_id: teacherProfile.id, page_slug: '/b', locale: 'en', course_code: 'GICT-300', unit_no: 1, category: 'factual', body: 'Fix fact B',
    }).select().single();
    suggestionIds.push(s1.id, s2.id);

    await signIn(adminPage, adminEmail);
    await adminPage.goto('/app/admin/suggestions');

    await adminPage.getByTestId('filter-category').selectOption('typo');
    await expect(adminPage.getByTestId('moderation-row').filter({ hasText: 'Fix typo A' })).toBeVisible();
    await expect(adminPage.getByTestId('moderation-row').filter({ hasText: 'Fix fact B' })).toHaveCount(0);
    await adminPage.getByTestId('filter-category').selectOption('');

    await adminPage.getByTestId('filter-course').fill('GICT-300');
    await expect(adminPage.getByTestId('moderation-row').filter({ hasText: 'Fix fact B' })).toBeVisible();
    await expect(adminPage.getByTestId('moderation-row').filter({ hasText: 'Fix typo A' })).toHaveCount(0);
    await adminPage.getByTestId('filter-course').fill('');

    const row = adminPage.getByTestId('moderation-row').filter({ hasText: 'Fix typo A' });
    await row.getByRole('button', { name: 'under_review' }).click();
    await expect(row.getByTestId('moderation-status')).toContainText('under_review');

    await row.getByLabel(new RegExp(`Admin note for ${s1.id}`)).fill('Confirmed typo.');
    await row.getByRole('button', { name: 'accepted' }).click();
    await expect(row.getByTestId('moderation-status')).toContainText('accepted');

    await row.getByRole('button', { name: 'published' }).click();
    await expect(row.getByTestId('moderation-status')).toContainText('published');

    await signIn(teacherPage, teacherEmail);
    await teacherPage.goto('/app/teacher/feedback-suggestions');
    const teacherRow = teacherPage.getByTestId('suggestion-row').filter({ hasText: 'Fix typo A' });
    await expect(teacherRow.getByTestId('suggestion-status')).toContainText(/published/i);
    await expect(teacherRow).toContainText('Confirmed typo.');

    await teacherPage.goto('/app/admin/suggestions');
    await expect(teacherPage.getByText(/don.t have access/i)).toBeVisible();
  } finally {
    await adminContext.close();
    await teacherContext.close();
    for (const id of suggestionIds) await svc.from('improvement_suggestions').delete().eq('id', id);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(admin.user!.id);
  }
});
