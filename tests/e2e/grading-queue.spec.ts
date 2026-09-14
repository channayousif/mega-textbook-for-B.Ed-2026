import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T041 [US3] — a teacher grades and returns a submission and the student
 * sees the mark/feedback immediately; the teacher edits it and the student
 * sees the update, not the original (SC-006, FR-011). Class creation and
 * assignment publish/submit are already covered by
 * assignments-publish-submit.spec.ts, so enrollment and the seed submission
 * are fixture setup here (service role) — this test's UI coverage is the
 * grading queue and the returned-result views themselves.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('teacher grades and returns a submission; student sees it, then sees a correction', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const teacherEmail = `e2e-grade-teacher-${Date.now()}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const studentEmail = `e2e-grade-student-${Date.now()}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const teacherContext = await browser.newContext();
  const studentContext = await browser.newContext();
  const teacherPage = await teacherContext.newPage();
  const studentPage = await studentContext.newPage();

  try {
    await teacherPage.goto('/app/login');
    await teacherPage.getByLabel(/email/i).fill(teacherEmail);
    await teacherPage.getByLabel(/password/i).fill(PASSWORD);
    await teacherPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(teacherPage).not.toHaveURL(/\/app\/login/);

    await teacherPage.goto('/app/classes');
    await teacherPage.getByLabel(/^course$/i).selectOption('EFMP-301');
    await teacherPage.getByLabel(/class name/i).fill('E2E Grading Section');
    await teacherPage.getByLabel(/term/i).fill('Fall 2026');
    await teacherPage.getByRole('button', { name: /create class/i }).click();
    const classRow = teacherPage.locator('tr', { has: teacherPage.getByText('E2E Grading Section') });
    await expect(classRow).toBeVisible();
    await classRow.getByRole('link', { name: /manage/i }).click();
    await expect(teacherPage).toHaveURL(/\/app\/classes\/roster\/?\?classId=/);
    const classId = new URL(teacherPage.url()).searchParams.get('classId');

    const { data: studentProfile } = await svc
      .from('profiles').select('id').eq('auth_user_id', student.user!.id).single();
    const { data: assignment } = await svc
      .from('assignments')
      .insert({
        class_id: classId,
        source_kind: 'custom',
        title: 'E2E Grading Assignment',
        due_at: new Date(Date.now() + 3600_000).toISOString(),
        max_mark: 50,
        published: true,
      })
      .select()
      .single();
    await svc.from('enrollments').insert({ class_id: classId, student_id: studentProfile!.id, status: 'active' });
    await svc
      .from('submissions')
      .insert({ assignment_id: assignment!.id, student_id: studentProfile!.id, text_content: "student's answer" });

    // Teacher grades and returns via the queue UI.
    await teacherPage.goto(`/app/classes/queue/?classId=${classId}&assignmentId=${assignment!.id}`);
    await expect(teacherPage.getByText("student's answer")).toBeVisible();
    await teacherPage.getByLabel(/mark \(out of 50\)/i).fill('40');
    await teacherPage.getByLabel(/feedback/i).fill('Solid work');
    await teacherPage.getByRole('button', { name: /grade & return/i }).click();
    await expect(teacherPage.getByText(/40 \/ 50/)).toBeVisible();

    // Student sees the result immediately (SC-006).
    await studentPage.goto('/app/login');
    await studentPage.getByLabel(/email/i).fill(studentEmail);
    await studentPage.getByLabel(/password/i).fill(PASSWORD);
    await studentPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(studentPage).not.toHaveURL(/\/app\/login/);

    await studentPage.goto(`/app/classes/assignment/?classId=${classId}&assignmentId=${assignment!.id}`);
    await expect(studentPage.getByText(/grade: 40 \/ 50/i)).toBeVisible();
    await expect(studentPage.getByText(/solid work/i)).toBeVisible();

    // Teacher edits the grade — the student sees the correction, not the original (FR-011).
    await teacherPage.getByRole('button', { name: /^edit$/i }).click();
    await teacherPage.getByLabel(/mark \(out of 50\)/i).fill('48');
    await teacherPage.getByLabel(/feedback/i).fill('Reviewed again, even better than I first thought');
    await teacherPage.getByRole('button', { name: /update grade/i }).click();
    await expect(teacherPage.getByText(/48 \/ 50/)).toBeVisible();

    await studentPage.reload();
    await expect(studentPage.getByText(/grade: 48 \/ 50/i)).toBeVisible();
    await expect(studentPage.getByText(/reviewed again/i)).toBeVisible();
  } finally {
    await svc.from('classes').delete().eq('name', 'E2E Grading Section').eq('course_code', 'EFMP-301');
    await teacherContext.close();
    await studentContext.close();
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
