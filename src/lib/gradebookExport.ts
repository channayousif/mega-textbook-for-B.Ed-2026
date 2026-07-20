import { getSupabase } from '@site/src/lib/supabase';
import type { Assignment } from '@site/src/lib/types';

/**
 * Gradebook `.xlsx` export (Spec 003, T051). FR-014, FR-018, FR-019, SC-007.
 *
 * `exceljs` (research.md R5) is imported dynamically here, inside the
 * function body, so it never lands in the base app bundle — only pulled in
 * when a teacher actually triggers an export (Constitution Art. V.5).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) for the query shape —
 * real authorization is RLS on classes/enrollments/assignments/submissions/
 * grades (already covering "own class only"); a bug here would produce a
 * wrong-looking spreadsheet, never leak another teacher's data.
 */

const ANONYMIZED_LABEL = '(no name set)'; // same convention as roster.tsx/queue.tsx — covers tombstoned students (FR-019)

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/**
 * FR-014 — every student (active AND removed, per FR-018/FR-019 — a removed
 * or tombstoned student's marks stay in the gradebook) x every assignment x
 * every mark, as one matrix sheet. Quiz-sourced assignments are scored via
 * `quiz_best_scores` (0023, US6), never `grades` (data-model.md's design
 * decision) — the query for it is skipped entirely when the class has no
 * quiz assignments, and any other failure there is tolerated (treated as "no
 * scores yet") rather than blocking the rest of the export — originally a
 * soft dependency written before US6 existed, kept soft even now that it
 * does (contracts/classes-operations.md §G).
 */
export async function exportGradebook(classId: string): Promise<{ error: Error | null }> {
  const supabase = await client();

  const [classRes, assignmentsRes, enrollmentsRes] = await Promise.all([
    supabase.from('classes').select('*').eq('id', classId).single(),
    supabase.from('assignments').select('*').eq('class_id', classId).order('due_at', { ascending: true }),
    supabase.from('enrollments').select('student_id, profiles(full_name)').eq('class_id', classId),
  ]);
  if (classRes.error || !classRes.data) return { error: classRes.error ?? new Error('class_not_found') };
  if (assignmentsRes.error) return { error: assignmentsRes.error };
  if (enrollmentsRes.error) return { error: enrollmentsRes.error };

  const klass = classRes.data as { id: string; course_code: string; name: string };
  const assignments = (assignmentsRes.data ?? []) as Assignment[];
  const nonQuizIds = assignments.filter((a) => a.source_kind !== 'quiz').map((a) => a.id);
  const quizIds = assignments.filter((a) => a.source_kind === 'quiz').map((a) => a.id);

  const marksByStudent = new Map<string, Record<string, number>>();

  if (nonQuizIds.length > 0) {
    const { data: submissions, error: submissionsError } = await supabase
      .from('submissions')
      .select('student_id, assignment_id, grades(mark)')
      .in('assignment_id', nonQuizIds);
    if (submissionsError) return { error: submissionsError };
    type SubmissionWithGrade = { student_id: string; assignment_id: string; grades: { mark: number }[] | { mark: number } | null };
    for (const row of (submissions ?? []) as unknown as SubmissionWithGrade[]) {
      const gradeField = row.grades;
      const grade = Array.isArray(gradeField) ? (gradeField[0] ?? null) : gradeField;
      if (!grade) continue;
      const bucket = marksByStudent.get(row.student_id) ?? {};
      bucket[row.assignment_id] = grade.mark;
      marksByStudent.set(row.student_id, bucket);
    }
  }

  if (quizIds.length > 0) {
    const { data: quizScores, error: quizError } = await supabase
      .from('quiz_best_scores')
      .select('student_id, assignment_id, best_score')
      .in('assignment_id', quizIds);
    if (!quizError) {
      type QuizScore = { student_id: string; assignment_id: string; best_score: number };
      for (const row of (quizScores ?? []) as unknown as QuizScore[]) {
        const bucket = marksByStudent.get(row.student_id) ?? {};
        bucket[row.assignment_id] = row.best_score;
        marksByStudent.set(row.student_id, bucket);
      }
    }
    // quizError is tolerated (not returned) — a failure reading quiz scores
    // shouldn't block the rest of the gradebook export.
  }

  type EnrollmentWithProfile = { student_id: string; profiles: { full_name: string | null } | null };
  const rows = ((enrollmentsRes.data ?? []) as unknown as EnrollmentWithProfile[]).map((e) => ({
    displayName: e.profiles?.full_name ?? ANONYMIZED_LABEL,
    marks: marksByStudent.get(e.student_id) ?? {},
  }));

  const ExcelJS = (await import('exceljs')).default;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Gradebook');
  sheet.columns = [
    { header: 'Student', key: 'student', width: 28 },
    ...assignments.map((a) => ({ header: a.title, key: a.id, width: 16 })),
  ];
  for (const row of rows) {
    const rowData: Record<string, string | number> = { student: row.displayName };
    for (const a of assignments) {
      const mark = row.marks[a.id];
      if (mark !== undefined) rowData[a.id] = mark;
    }
    sheet.addRow(rowData);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const safeName = `${klass.course_code}-${klass.name}`.replace(/[^\w.-]+/g, '_');
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeName}-gradebook.xlsx`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  return { error: null };
}
