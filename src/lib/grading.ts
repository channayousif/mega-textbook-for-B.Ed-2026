import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import { computeStudentStatus } from '@site/src/lib/submissions';
import type { Assignment, AssignmentStudentStatus, Grade, Submission } from '@site/src/lib/types';

/**
 * Grading queue + grade/return/edit (Spec 003, T043).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * RLS + the `enforce_max_mark()` trigger (supabase/migrations/0020); a bug
 * here would degrade UX, not security.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type QueueRow = {
  student: { id: string; full_name: string | null };
  submission: Submission | null;
  grade: Grade | null;
  status: AssignmentStudentStatus;
};

/**
 * FR-010, US3 AS4 - the teacher's grading queue for one assignment: every
 * actively enrolled student, cross-referenced against submissions (+ grades)
 * to classify each as not-yet-submitted/missing/submitted/late/graded. Two
 * RLS-scoped queries composed client-side (contracts/classes-operations.md
 * §D) rather than a single view - enrollments carries the roster (incl.
 * non-submitters), submissions carries who has actually turned work in.
 */
export async function fetchQueue(
  classId: string,
  assignment: Pick<Assignment, 'id' | 'due_at'>,
): Promise<Result<QueueRow[]>> {
  const supabase = await client();

  const [enrollmentsRes, submissionsRes] = await Promise.all([
    supabase
      .from('enrollments')
      .select('student_id, profiles(full_name)')
      .eq('class_id', classId)
      .eq('status', 'active'),
    supabase.from('submissions').select('*, grades(*)').eq('assignment_id', assignment.id),
  ]);
  if (enrollmentsRes.error) return { data: null, error: enrollmentsRes.error };
  if (submissionsRes.error) return { data: null, error: submissionsRes.error };

  type SubmissionWithGrade = Submission & { grades: Grade[] | Grade | null };
  const submissionByStudent = new Map<string, SubmissionWithGrade>();
  for (const row of (submissionsRes.data ?? []) as SubmissionWithGrade[]) {
    submissionByStudent.set(row.student_id, row);
  }

  type EnrollmentWithProfile = { student_id: string; profiles: { full_name: string | null } | null };
  const rows: QueueRow[] = ((enrollmentsRes.data ?? []) as unknown as EnrollmentWithProfile[]).map((enrollment) => {
    const submissionWithGrade = submissionByStudent.get(enrollment.student_id) ?? null;
    const { grades: gradeField, ...submission } = submissionWithGrade ?? { grades: null };
    const grade = Array.isArray(gradeField) ? (gradeField[0] ?? null) : gradeField;
    const hasSubmission = submissionWithGrade !== null;
    const status = computeStudentStatus({
      dueAtIso: assignment.due_at,
      submission: hasSubmission ? (submission as Submission) : null,
      graded: Boolean(grade),
    });
    return {
      student: { id: enrollment.student_id, full_name: enrollment.profiles?.full_name ?? null },
      submission: hasSubmission ? (submission as Submission) : null,
      grade,
      status,
    };
  });

  return { data: rows, error: null };
}

export type GradeInput = {
  submissionId: string;
  mark: number;
  feedback: string | null;
  gradedBy: string;
};

/** FR-010 - grade and return a submission in one atomic action (one `grades` row). */
export async function gradeAndReturn(input: GradeInput): Promise<Result<Grade>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('grades')
    .insert({
      submission_id: input.submissionId,
      mark: input.mark,
      feedback: input.feedback,
      graded_by: input.gradedBy,
    })
    .select()
    .single();
  return { data: (data as Grade) ?? null, error };
}

/** FR-011 - edit an already-returned grade; the student's next read reflects the correction. */
export async function editGrade(
  gradeId: string,
  patch: { mark: number; feedback: string | null },
): Promise<Result<Grade>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('grades')
    .update({ mark: patch.mark, feedback: patch.feedback })
    .eq('id', gradeId)
    .select()
    .single();
  return { data: (data as Grade) ?? null, error };
}

/** A student's own returned grade for one submission, if graded (used by the assignment detail page, T045). */
export async function fetchGradeForSubmission(submissionId: string): Promise<Result<Grade>> {
  const supabase = await client();
  const { data, error } = await supabase.from('grades').select('*').eq('submission_id', submissionId).maybeSingle();
  return { data: (data as Grade) ?? null, error };
}

/** Does a grading error come from enforce_max_mark() (FR-010 edge case)? */
export function isMaxMarkError(error: Error | null): boolean {
  return Boolean(error?.message?.toLowerCase().includes('max_mark'));
}
