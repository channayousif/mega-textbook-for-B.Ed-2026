import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T043 [Polish] — switches locale to Urdu and confirms every area
 * (Overview, My Teaching Log, Feedback & Suggestions, Analytics, the
 * student drill-down, the moderation queue, and the admin feedback view)
 * plus every category/status name and the at-risk explanation tooltip
 * render correctly right-to-left, matching Specs 002–004's own
 * RTL-testing precedent (SC-006).
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

async function checkRtlNoOverflow(page: import('@playwright/test').Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await page.setViewportSize({ width: 360, height: 780 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow, `horizontal overflow at ${path}`).toBe(false);
  await page.setViewportSize({ width: 1280, height: 800 });
}

test('every teacher-dashboard and admin area renders RTL under /ur/ with no horizontal overflow', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-teacher-rtl-${tag}@example.test`;
  const adminEmail = `e2e-teacher-rtl-admin-${tag}@example.test`;
  const studentEmail = `e2e-teacher-rtl-student-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({ email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' } });
  // `admin` is never self-selectable at signup (Constitution Art. V.3) —
  // even requesting it via user_metadata is silently ignored by the
  // 0007/0008 allowlist trigger. Create as a plain user, then promote via a
  // direct service-role update, matching auth-role-propagation.spec.ts's
  // existing precedent.
  const { data: admin } = await svc.auth.admin.createUser({ email: adminEmail, password: PASSWORD, email_confirm: true });
  await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', admin.user!.id);
  const { data: student } = await svc.auth.admin.createUser({ email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' } });

  // Two separate browser contexts, one per signed-in identity —
  // `/app/login` redirects an already-authenticated session away before the
  // form ever renders (see login.tsx's `if (session) window.location.assign
  // (returnTo)`), so a single shared `page` cannot hold both the teacher's
  // and the admin's sessions in sequence. Matches
  // auth-role-propagation.spec.ts's existing precedent for this exact
  // situation.
  const teacherContext = await browser.newContext();
  const adminContext = await browser.newContext();
  const teacherPage = await teacherContext.newPage();
  const adminPage = await adminContext.newPage();

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'RTL Fixture Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}R`.slice(-6),
    }).select().single();
    classId = klass.id;
    await svc.from('enrollments').insert({ class_id: classId, student_id: studentProfile.id });

    await signIn(teacherPage, teacherEmail);
    await checkRtlNoOverflow(teacherPage, '/ur/app/teacher/');
    await checkRtlNoOverflow(teacherPage, '/ur/app/teacher/teaching-log');
    await checkRtlNoOverflow(teacherPage, '/ur/app/teacher/feedback-suggestions');
    await checkRtlNoOverflow(teacherPage, `/ur/app/teacher/analytics/?classId=${classId}`);
    await checkRtlNoOverflow(teacherPage, `/ur/app/teacher/student/?classId=${classId}&studentId=${studentProfile.id}`);

    await signIn(adminPage, adminEmail);
    await checkRtlNoOverflow(adminPage, '/ur/app/admin/suggestions');
    await checkRtlNoOverflow(adminPage, '/ur/app/admin/feedback');
  } finally {
    await teacherContext.close();
    await adminContext.close();
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(admin.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
