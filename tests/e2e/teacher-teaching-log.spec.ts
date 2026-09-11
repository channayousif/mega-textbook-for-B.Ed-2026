import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T021 [US4] — logs one activity in a single flow, timed under 30 seconds;
 * confirms several entries appear most-recent-first, each attributed to the
 * correct class, with all fields intact (US4 AS1–AS3, SC-005).
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

test('teacher logs a teaching activity in under 30 seconds and sees it most-recent-first', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-teaching-log-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-302', name: 'Teaching Log Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}L`.slice(-6),
    }).select().single();
    classId = klass.id;

    await signIn(page, teacherEmail);
    await page.goto('/app/teacher/teaching-log');

    const start = Date.now();
    await page.getByTestId('log-duration-input').fill('25');
    await page.getByTestId('log-reflection-input').fill('First entry — went well.');
    await page.getByTestId('log-save-button').click();
    await expect(page.getByTestId('teaching-log-row').first()).toContainText('First entry');
    expect(Date.now() - start).toBeLessThan(30_000);

    await page.getByTestId('log-duration-input').fill('10');
    await page.getByTestId('log-reflection-input').fill('Second entry — quick recap.');
    await page.getByTestId('log-save-button').click();

    const rows = page.getByTestId('teaching-log-row');
    await expect(rows).toHaveCount(2);
    await expect(rows.first()).toContainText('Second entry');
    await expect(rows.first()).toContainText('Teaching Log Class');
    await expect(rows.nth(1)).toContainText('First entry');
  } finally {
    if (classId) {
      await svc.from('teaching_log_entries').delete().eq('class_id', classId);
      await svc.from('classes').delete().eq('id', classId);
    }
    await svc.auth.admin.deleteUser(teacher.user!.id);
  }
});

/**
 * Regression — a course whose Unit 1 uses the Spec 008 per-topic layout
 * (EFMP-302) must never offer that unit's `topic`/`assessment` records in the
 * activity picker. They are not one of the three FR-004 activity kinds, and
 * 0028's `source_kind` CHECK refuses them, so an auto-selected `topic` made
 * the very first save fail with the generic error banner and no row.
 */
test('per-topic units are not offered as loggable activities', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-per-topic-log-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-302', name: 'Per-Topic Course Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}P`.slice(-6),
    }).select().single();
    classId = klass.id;

    await signIn(page, teacherEmail);
    await page.goto('/app/teacher/teaching-log');

    // The class list and the content index are both fetched after mount, so
    // wait for the picker to actually populate before reading it.
    const options = page.getByTestId('log-activity-select').locator('option');
    await expect.poll(() => options.count()).toBeGreaterThan(0);

    // Every offered option is one of the three kinds the database accepts.
    const optionValues = await options.evaluateAll(
      (opts) => opts.map((o) => (o as HTMLOptionElement).value),
    );
    for (const value of optionValues) {
      expect(value.split('::')[1]).toMatch(/^(activity|formative|summative)$/);
    }

    // And the default selection therefore saves rather than erroring.
    await page.getByTestId('log-duration-input').fill('15');
    await page.getByTestId('log-reflection-input').fill('Per-topic course entry.');
    await page.getByTestId('log-save-button').click();
    await expect(page.getByTestId('teaching-log-row').first()).toContainText('Per-topic course entry');
  } finally {
    if (classId) {
      await svc.from('teaching_log_entries').delete().eq('class_id', classId);
      await svc.from('classes').delete().eq('id', classId);
    }
    await svc.auth.admin.deleteUser(teacher.user!.id);
  }
});
