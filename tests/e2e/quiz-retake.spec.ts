import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T056 [US6] — a student takes a multiple-choice quiz and sees an instant
 * score, retakes it and improves the score, and the teacher's results view
 * shows the best score (US6 AS1/AS2).
 *
 * Uses `getByRole` for every radio button, never `getByLabel` with an
 * anchored regex — a prior test in this suite (assignments-publish-submit.spec.ts)
 * hung for 30s on exactly that pattern: a wrapping `<label>{' '}Text</label>`
 * leaves a leading-space text node that `getByLabel`'s regex matching doesn't
 * trim, unlike `getByRole`'s accessible-name algorithm (found during T041/US3,
 * documented in that spec's own fix).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

function inOneHourLocalInputValue(): string {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

test('student takes a quiz, retakes it and improves, teacher sees the best score', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const teacherEmail = `e2e-quiz-teacher-${Date.now()}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const studentEmail = `e2e-quiz-student-${Date.now()}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const quizItemIds: string[] = [];
  const teacherContext = await browser.newContext();
  const studentContext = await browser.newContext();
  const teacherPage = await teacherContext.newPage();
  const studentPage = await studentContext.newPage();

  try {
    // Purge any `E2E ` items this spec leaked on an earlier run before seeding
    // its own. Playwright cuts a timed-out test off mid-`finally`, so the
    // cleanup below is NOT guaranteed to run - and a leftover item is fatal
    // rather than cosmetic: the quiz page renders every item for the unit,
    // `allAnswered` requires all of them, and this test only answers the two
    // it seeded, so "Submit quiz" stays disabled and the next run times out
    // too. One leak therefore poisons every subsequent run until cleared by
    // hand. Scoped to this spec's own `E2E ` rows so it can never touch real
    // authored content.
    await svc.from('quiz_items')
      .delete().eq('course_code', 'EFMP-301').eq('unit_no', 5).like('question_text', 'E2E %');

    const { data: item1 } = await svc
      .from('quiz_items')
      .insert({
        course_code: 'EFMP-301', unit_no: 5, question_text: 'E2E Q1: pick B',
        options: [{ key: 'A', text: 'Wrong' }, { key: 'B', text: 'Right' }], correct_option: 'B',
      })
      .select().single();
    const { data: item2 } = await svc
      .from('quiz_items')
      .insert({
        course_code: 'EFMP-301', unit_no: 5, question_text: 'E2E Q2: pick A',
        options: [{ key: 'A', text: 'Right' }, { key: 'B', text: 'Wrong' }], correct_option: 'A',
      })
      .select().single();
    quizItemIds.push(item1!.id, item2!.id);

    await teacherPage.goto('/app/login');
    await teacherPage.getByLabel(/email/i).fill(teacherEmail);
    await teacherPage.getByLabel(/password/i).fill(PASSWORD);
    await teacherPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(teacherPage).not.toHaveURL(/\/app\/login/);

    await teacherPage.goto('/app/classes');
    await teacherPage.getByLabel(/^course$/i).selectOption('EFMP-301');
    await teacherPage.getByLabel(/class name/i).fill('E2E Quiz Section');
    await teacherPage.getByLabel(/term/i).fill('Fall 2026');
    await teacherPage.getByRole('button', { name: /create class/i }).click();
    const classRow = teacherPage.locator('tr', { has: teacherPage.getByText('E2E Quiz Section') });
    await expect(classRow).toBeVisible();
    await classRow.getByRole('link', { name: /manage/i }).click();
    await expect(teacherPage).toHaveURL(/\/app\/classes\/roster\/?\?classId=/);
    const classId = new URL(teacherPage.url()).searchParams.get('classId');

    await teacherPage.goto(`/app/classes/assignment-new/?classId=${classId}`);
    await teacherPage.getByRole('radio', { name: /^quiz$/i }).check();
    await teacherPage.getByLabel(/quiz unit/i).selectOption('5');
    await teacherPage.getByLabel(/due date/i).fill(inOneHourLocalInputValue());
    await teacherPage.getByLabel(/maximum mark/i).fill('10');
    await teacherPage.getByRole('button', { name: /publish assignment/i }).click();
    await expect(teacherPage.getByText(/assignment published/i)).toBeVisible();

    await studentPage.goto('/app/login');
    await studentPage.getByLabel(/email/i).fill(studentEmail);
    await studentPage.getByLabel(/password/i).fill(PASSWORD);
    await studentPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(studentPage).not.toHaveURL(/\/app\/login/);

    const { data: klassRow } = await svc.from('classes').select('join_code').eq('id', classId!).single();
    await studentPage.goto('/app/classes');
    await studentPage.getByLabel(/join code/i).fill(klassRow!.join_code!);
    await studentPage.getByRole('button', { name: /^join$/i }).click();
    await expect(studentPage.getByText(/you joined the class/i)).toBeVisible();

    await studentPage.goto(`/app/classes/assignments/?classId=${classId}`);
    await studentPage.getByRole('link', { name: /quiz - unit 5/i }).click();
    await expect(studentPage).toHaveURL(/\/app\/classes\/quiz\/?\?/);

    // Exactly the two seeded items must be on the page. Asserted explicitly so
    // unexpected pollution fails here, loudly and in one line, instead of as an
    // opaque 30s timeout on a "Submit quiz" button that never enables.
    await expect(studentPage.getByRole('radio', { name: 'Right', exact: true })).toHaveCount(2);

    // Attempt 1: both correct -> instant score 10/10 (AS1).
    await studentPage.getByRole('radio', { name: 'Right', exact: true }).first().check();
    await studentPage.getByRole('radio', { name: 'Right', exact: true }).nth(1).check();
    await studentPage.getByRole('button', { name: /submit quiz/i }).click();
    await expect(studentPage.getByText(/score: 10 \/ 10/i)).toBeVisible();

    // Retake, deliberately worse this time -> improving the record means the
    // BEST score (10) must survive, not this attempt's lower one (AS2).
    await studentPage.getByRole('button', { name: /^retake$/i }).click();
    await studentPage.getByRole('radio', { name: 'Wrong', exact: true }).first().check();
    await studentPage.getByRole('radio', { name: 'Wrong', exact: true }).nth(1).check();
    await studentPage.getByRole('button', { name: /submit quiz/i }).click();
    await expect(studentPage.getByText(/score: 0 \/ 10/i)).toBeVisible();
    await expect(studentPage.getByText(/best score so far: 10 \/ 10/i)).toBeVisible();

    // Teacher's results view shows the best score, not the latest attempt.
    await teacherPage.goto(`/app/classes/assignments/?classId=${classId}`);
    await teacherPage.getByRole('link', { name: /^results$/i }).click();
    await expect(teacherPage).toHaveURL(/\/app\/classes\/quiz\/?\?/);
    await expect(teacherPage.getByText(/10 \/ 10/)).toBeVisible();
  } finally {
    await svc.from('classes').delete().eq('name', 'E2E Quiz Section').eq('course_code', 'EFMP-301');
    await Promise.allSettled(quizItemIds.map((id) => svc.from('quiz_items').delete().eq('id', id)));
    await teacherContext.close();
    await studentContext.close();
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
