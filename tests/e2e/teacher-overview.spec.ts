import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T006 [US1] — two classes each show their own ungraded count (not
 * combined); the soonest-due list is ordered correctly across both classes;
 * the recent-activity feed merges submissions and quiz attempts; a teacher
 * with nothing pending sees an explicit "caught up" state, not a blank
 * region (US1 AS1–AS3).
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

test('overview shows separate per-class ungraded counts, cross-class soonest-due ordering, and a merged recent-activity feed', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-teacher-overview-${tag}@example.test`;
  const studentEmail = `e2e-teacher-overview-student-${tag}@example.test`;

  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const classIds: string[] = [];
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc.from('profiles').select('id').eq('auth_user_id', student.user!.id).single();

    const { data: classA } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Overview Class A',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}A`.slice(-6),
    }).select().single();
    const { data: classB } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Overview Class B',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}B`.slice(-6),
    }).select().single();
    classIds.push(classA.id, classB.id);

    await svc.from('enrollments').insert([
      { class_id: classA.id, student_id: studentProfile.id },
      { class_id: classB.id, student_id: studentProfile.id },
    ]);

    const past = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const soon = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    const mid = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const later = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

    const { data: a1 } = await svc.from('assignments').insert({
      class_id: classA.id, source_kind: 'custom', title: 'A1 Graded', due_at: past, max_mark: 100, published: true, allow_late: false,
    }).select().single();
    const { data: a2 } = await svc.from('assignments').insert({
      class_id: classA.id, source_kind: 'custom', title: 'A2 Ungraded', due_at: mid, max_mark: 100, published: true, allow_late: false,
    }).select().single();
    const { data: b1 } = await svc.from('assignments').insert({
      class_id: classB.id, source_kind: 'quiz', course_code: 'EFMP-301', unit_no: 1, title: 'B1 Quiz', due_at: soon, max_mark: 100, published: true, allow_late: false,
    }).select().single();
    const { data: b2 } = await svc.from('assignments').insert({
      class_id: classB.id, source_kind: 'custom', title: 'B2 Ungraded', due_at: later, max_mark: 100, published: true, allow_late: false,
    }).select().single();

    const { data: subA1 } = await svc.from('submissions').insert({
      assignment_id: a1.id, student_id: studentProfile.id, text_content: 'answer', late: false,
    }).select().single();
    await svc.from('grades').insert({ submission_id: subA1.id, mark: 80, graded_by: teacherProfile.id });

    await svc.from('submissions').insert({
      assignment_id: a2.id, student_id: studentProfile.id, text_content: 'answer', late: false,
    });
    await svc.from('submissions').insert({
      assignment_id: b2.id, student_id: studentProfile.id, text_content: 'answer', late: false,
    });
    await svc.from('quiz_attempts').insert({
      assignment_id: b1.id, student_id: studentProfile.id, answers: {}, score: 70,
    });

    await signIn(page, teacherEmail);
    await page.goto('/app/teacher/');

    const ungradedRows = page.locator('[data-testid="ungraded-count-row"]');
    await expect(ungradedRows.filter({ hasText: 'Overview Class A' })).toContainText('1');
    await expect(ungradedRows.filter({ hasText: 'Overview Class B' })).toContainText('1');

    const soonestDue = page.locator('[data-testid="soonest-due-item"]');
    await expect(soonestDue).toHaveCount(3); // A1 is past-due, excluded
    await expect(soonestDue.nth(0)).toContainText('B1 Quiz');
    await expect(soonestDue.nth(1)).toContainText('A2 Ungraded');
    await expect(soonestDue.nth(2)).toContainText('B2 Ungraded');

    const recentActivity = page.locator('[data-testid="recent-activity-item"]');
    await expect(recentActivity).toContainText(['B1 Quiz']);
  } finally {
    for (const id of classIds) await svc.from('classes').delete().eq('id', id);
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});

test('a teacher with nothing pending sees an explicit "caught up" state, not a blank region', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const teacherEmail = `e2e-teacher-overview-caughtup-${tag}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });

  let classId: string | null = null;
  try {
    const { data: teacherProfile } = await svc.from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: klass } = await svc.from('classes').insert({
      teacher_id: teacherProfile.id, course_code: 'EFMP-301', name: 'Empty Class',
      term_label: 'Fall 2026', join_code: `${tag.toString(36)}E`.slice(-6),
    }).select().single();
    classId = klass.id;

    await signIn(page, teacherEmail);
    await page.goto('/app/teacher/');
    await expect(page.getByText(/caught up/i)).toBeVisible();
  } finally {
    if (classId) await svc.from('classes').delete().eq('id', classId);
    await deleteUsers(svc, teacher.user!.id);
  }
});
