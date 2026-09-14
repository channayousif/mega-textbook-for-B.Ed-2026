import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import ExcelJS from 'exceljs';
import { deleteUsers } from './_cleanup';

/**
 * T050 [US5] — the exported `.xlsx` for a class with an Urdu-named student
 * opens with the name intact: not garbled, not a `.csv` fallback (FR-014,
 * SC-007). Reads the real downloaded file back with `exceljs` (the same
 * library the export itself uses) rather than just asserting a download
 * happened, since a garbled-encoding bug would still "successfully" download
 * a file — the content is the actual thing SC-007 is about.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const URDU_NAME = 'محمد علی';

test('exported gradebook .xlsx has the Urdu student name and mark intact', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const teacherEmail = `e2e-gb-teacher-${Date.now()}@example.test`;
  const { data: teacher } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const studentEmail = `e2e-gb-student-${Date.now()}@example.test`;
  const { data: student } = await svc.auth.admin.createUser({
    email: studentEmail, password: PASSWORD, email_confirm: true,
    user_metadata: { role: 'student', full_name: URDU_NAME },
  });

  try {
    const { data: teacherProfile } = await svc
      .from('profiles').select('id').eq('auth_user_id', teacher.user!.id).single();
    const { data: studentProfile } = await svc
      .from('profiles').select('id').eq('auth_user_id', student.user!.id).single();

    const { data: klass } = await svc
      .from('classes')
      .insert({
        teacher_id: teacherProfile!.id, course_code: 'EFMP-301', name: 'E2E Gradebook Section',
        term_label: 'Fall 2026', join_code: 'GBEXP1', status: 'active',
      })
      .select()
      .single();
    await svc.from('enrollments').insert({ class_id: klass!.id, student_id: studentProfile!.id, status: 'active' });
    const { data: assignment } = await svc
      .from('assignments')
      .insert({
        class_id: klass!.id, source_kind: 'custom', title: 'E2E Gradebook Assignment',
        due_at: new Date(Date.now() + 3600_000).toISOString(), max_mark: 20, published: true,
      })
      .select()
      .single();
    const { data: submission } = await svc
      .from('submissions')
      .insert({ assignment_id: assignment!.id, student_id: studentProfile!.id, text_content: 'answer' })
      .select()
      .single();
    await svc.from('grades').insert({ submission_id: submission!.id, mark: 17, graded_by: teacherProfile!.id });

    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(teacherEmail);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    await page.goto(`/app/classes/gradebook/?classId=${klass!.id}`);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export gradebook/i }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.xlsx$/);
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(downloadPath!);
    const sheet = workbook.worksheets[0];
    const cellValues: string[] = [];
    sheet.eachRow((row) => {
      row.eachCell((cell) => cellValues.push(String(cell.value ?? '')));
    });

    expect(cellValues).toContain(URDU_NAME);
    expect(cellValues.some((v) => v === '17')).toBe(true);
  } finally {
    await svc.from('classes').delete().eq('name', 'E2E Gradebook Section').eq('course_code', 'EFMP-301');
    await deleteUsers(svc, teacher.user!.id, student.user!.id);
  }
});
