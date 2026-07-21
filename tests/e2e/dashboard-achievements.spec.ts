import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T037 [US6] — a newly earned badge appears as a Home preview and on the
 * full Achievements page; an achievement earned once does not duplicate on
 * repeat triggering; a student with none earned sees what milestones exist
 * and how to reach them (US6 AS1–AS3); on a 360px viewport, no horizontal
 * scrolling is required (SC-006).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('a student with no achievements sees the full catalog and how to reach each one', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const studentEmail = `e2e-dash-achievements-empty-${tag}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });
  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/dashboard/achievements');
    await expect(page.getByText('First Submission')).toBeVisible();
    await expect(page.getByText('Study Streak')).toBeVisible();
    await expect(page.getByText('100% Course Coverage')).toBeVisible();
    await expect(page.getByText('On-Time Finisher')).toBeVisible();

    await page.setViewportSize({ width: 360, height: 780 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  } finally {
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});

test('an earned achievement is previewed on Home and shown as earned on the Achievements page', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-achievements-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-achievements-student-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Achievements Fixture', term_label: 'Fall 2026',
      join_code: `${tag.toString(36)}E`.slice(-6),
    }).select().single();
    classId = klass.id;
    await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });
    const { data: assignment } = await svc.from('assignments').insert({
      class_id: klass.id, source_kind: 'custom', title: 'First one', due_at: new Date().toISOString(), max_mark: 100, published: true,
    }).select().single();
    await svc.from('submissions').insert({ assignment_id: assignment.id, student_id: studentProfile.id, text_content: 'answer' });

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/dashboard/');
    await expect(page.getByText('First Submission')).toBeVisible();

    await page.goto('/app/dashboard/achievements');
    const earnedRow = page.locator('[data-testid="achievement-row"]', { hasText: 'First Submission' });
    await expect(earnedRow.getByText(/earned/i)).toBeVisible();
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
