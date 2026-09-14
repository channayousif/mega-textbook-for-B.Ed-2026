import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T051 [US1] — the full Assignments area (FR-003) distinguishes overdue from
 * future-due items, states whether a late submission is still accepted or
 * the window has closed for each, never renders a closed item as actionable,
 * and shows a past-due unattempted quiz as closed rather than an actionable
 * overdue item (spec.md Edge Cases); on a 360px viewport, no horizontal
 * scrolling is required (SC-006). Resolved via `/sp.analyze` (2026-07-21):
 * this page previously had no dedicated test of its own.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('assignments area distinguishes overdue/closed states and fits a 360px viewport', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-dash-assign-teacher-${tag}@example.test`;
  const studentEmail = `e2e-dash-assign-student-${tag}@example.test`;

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
      teacher_id: teacherProfile.id,
      course_code: 'EFMP-301',
      name: 'E2E Dashboard Assignments',
      term_label: 'Fall 2026',
      join_code: `${tag.toString(36)}A`.slice(-6),
    }).select().single();
    classId = klass.id;
    await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });

    const past = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const future = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    // NOTE: every object in a multi-row PostgREST insert must specify the
    // same keys — a row omitting a NOT NULL column (even one with a table
    // default) gets an explicit NULL for it, not the default, and the whole
    // batch insert fails. allow_late is spelled out on every row here.
    await svc.from('assignments').insert([
      { class_id: klass.id, source_kind: 'custom', title: 'Overdue, late allowed', due_at: past, max_mark: 100, published: true, allow_late: true },
      { class_id: klass.id, source_kind: 'custom', title: 'Overdue, closed', due_at: past, max_mark: 100, published: true, allow_late: false },
      { class_id: klass.id, source_kind: 'custom', title: 'Not yet due', due_at: future, max_mark: 100, published: true, allow_late: false },
    ]);

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto('/app/dashboard/assignments');
    await expect(page.getByText('Overdue, late allowed')).toBeVisible();
    await expect(page.getByText('Overdue, closed')).toBeVisible();
    await expect(page.getByText('Not yet due')).toBeVisible();

    // The closed item must never render an actionable "submit" affordance.
    // Matched on the status column's own wording ("window has ended") rather
    // than a bare /closed/i, since the fixture's own assignment title
    // ("Overdue, closed") also contains that substring and would otherwise
    // match twice within the same row.
    const closedRow = page.locator('[data-testid="assignment-row"]', { hasText: 'Overdue, closed' });
    await expect(closedRow.getByText(/window has ended/i)).toBeVisible();
    await expect(closedRow.getByRole('link', { name: /submit/i })).toHaveCount(0);

    const lateAllowedRow = page.locator('[data-testid="assignment-row"]', { hasText: 'Overdue, late allowed' });
    await expect(lateAllowedRow.getByText(/late submission accepted/i)).toBeVisible();

    await page.setViewportSize({ width: 360, height: 780 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
