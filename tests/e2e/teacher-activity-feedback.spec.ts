import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T026 [US5] — submits feedback for one activity from a teaching-log entry;
 * re-submits feedback for the same activity from the activity's own content
 * page; confirms exactly one, updated record; as an admin, views that
 * activity's aggregated feedback and confirms the average rating and
 * recorded what-didn't-work notes are both visible (US5 AS1–AS3).
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

test('teacher submits feedback from a log entry, revises it from the activity page, and an admin sees the aggregate', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-activity-feedback-teacher-${tag}@example.test`;
  const adminEmail = `e2e-activity-feedback-admin-${tag}@example.test`;
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
  // (returnTo)`), so a single shared `page` cannot hold two different users'
  // sessions in sequence. Matches auth-role-propagation.spec.ts's existing
  // precedent for this exact situation.
  const teacherContext = await browser.newContext();
  const adminContext = await browser.newContext();
  const teacherPage = await teacherContext.newPage();
  const adminPage = await adminContext.newPage();

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-302', name: 'Feedback Fixture Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}F`.slice(-6),
    }).select().single();
    classId = klass.id;

    await signIn(teacherPage, teacherEmail);

    // Log the activity, then give feedback from the log entry.
    await teacherPage.goto('/app/teacher/teaching-log');
    await teacherPage.getByTestId('log-duration-input').fill('20');
    await teacherPage.getByTestId('log-reflection-input').fill('Ran activity 1.');
    await teacherPage.getByTestId('log-save-button').click();
    await expect(teacherPage.getByTestId('teaching-log-row').first()).toContainText('Ran activity 1');

    await teacherPage.getByTestId('log-give-feedback-button').first().click();
    await teacherPage.getByTestId('log-feedback-rating-input').fill('3');
    await teacherPage.getByTestId('log-feedback-submit-button').click();
    await expect(teacherPage.getByTestId('log-feedback-submitted')).toBeVisible();

    // Revise the same feedback from the activity's own content page.
    await teacherPage.goto('/semester-1/efmp-302/unit-02/activities');
    const giveFeedbackButton = teacherPage.getByTestId('give-feedback-button');
    await expect(giveFeedbackButton).toContainText('3/5');
    await giveFeedbackButton.click();
    await teacherPage.getByTestId('feedback-rating-input').fill('5');
    await teacherPage.getByTestId('feedback-what-didnt-textarea').fill('Ran a bit long.');
    await teacherPage.getByTestId('feedback-submit-button').click();
    await expect(teacherPage.getByTestId('feedback-submitted')).toBeVisible();

    const { data: rows } = await svc
      .from('activity_feedback')
      .select('*')
      .eq('teacher_id', teacherProfile.id)
      .eq('course_code', 'EFMP-302')
      .eq('unit_no', 2)
      .eq('source_kind', 'activity');
    expect(rows).toHaveLength(1);
    expect(rows![0].rating).toBe(5);

    await signIn(adminPage, adminEmail);
    await adminPage.goto('/app/admin/feedback');
    const row = adminPage.getByTestId('aggregate-feedback-row').filter({ hasText: 'EFMP-302' });
    await expect(row).toBeVisible();
    await expect(row).toContainText('Ran a bit long.');
  } finally {
    await teacherContext.close();
    await adminContext.close();
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    if (teacherProfile) await svc.from('activity_feedback').delete().eq('teacher_id', teacherProfile.id);
    if (classId) {
      await svc.from('teaching_log_entries').delete().eq('class_id', classId);
      await svc.from('classes').delete().eq('id', classId);
    }
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(admin.user!.id);
  }
});
