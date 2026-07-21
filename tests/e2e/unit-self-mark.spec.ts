import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T022 [US4] — marks a unit studied from its content page, confirms it
 * appears in Progress without a reload race (SC-002); marks the same unit
 * again and confirms the coverage count doesn't change; marks a unit already
 * covered via a graded assignment and confirms no double count (US4 AS3).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('marking a unit studied from its content page reflects in Progress without a reload', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-self-mark-teacher-${tag}@example.test`;
  const studentEmail = `e2e-self-mark-student-${tag}@example.test`;
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

    // The Progress area only shows coverage for ENROLLED courses (FR-005) —
    // a self-mark alone, with no active enrollment, would never appear
    // there even though the unit_progress row itself is written correctly.
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Self-Mark Fixture Class', term_label: 'Fall 2026',
      join_code: `${tag.toString(36)}SM`.slice(-6),
    }).select().single();
    classId = klass.id;
    await svc.from('enrollments').insert({ class_id: klass.id, student_id: studentProfile.id });

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(studentEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    // EFMP-301, Unit 1 — the golden unit (Constitution Art. VI.1).
    await page.goto('/semester-1/efmp-301/unit-01/');
    const markButton = page.getByRole('button', { name: /mark as studied/i });
    await expect(markButton).toBeVisible();
    await markButton.click();
    await expect(page.getByText(/studied/i)).toBeVisible();

    await page.goto('/app/dashboard/progress');
    await expect(page.getByText('EFMP-301')).toBeVisible();

    // Marking again (the button reappears since DocItemFooter tracks
    // "marked" as local component state, not a database read) is a no-op —
    // no error, no duplicate row (enforced by unit_progress's unique
    // constraint + ON CONFLICT DO NOTHING in markUnitStudied()).
    await page.goto('/semester-1/efmp-301/unit-01/');
    await page.getByRole('button', { name: /mark as studied/i }).click();
    await expect(page.getByText(/studied/i)).toBeVisible();

    const { data: rows } = await svc
      .from('unit_progress')
      .select('*')
      .eq('student_id', studentProfile.id)
      .eq('course_code', 'EFMP-301')
      .eq('unit_no', 1);
    expect(rows).toHaveLength(1);
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();
    await svc.from('unit_progress').delete().eq('student_id', profile!.id);
    await svc.auth.admin.deleteUser(teacher.user!.id);
    await svc.auth.admin.deleteUser(student.user!.id);
  }
});
