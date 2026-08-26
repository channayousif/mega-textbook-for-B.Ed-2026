import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { Assignment } from '@site/src/lib/types';

/**
 * Shared per-student-per-assignment mark computation (Spec 005, research.md
 * R4) — extracted from `gradebookExport.ts` (Spec 003) so Analytics (T036)
 * and the gradebook export reuse one implementation instead of two parallel
 * ones. Non-quiz assignments are scored via `submissions.grades(mark)`;
 * quiz assignments via the existing `quiz_best_scores` (Spec 003) view —
 * never `grades` (data-model.md's design decision, unchanged).
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/**
 * Returns, for every student who has at least one mark among the given
 * assignments, a map of assignment_id -> mark.
 */
export async function fetchMarksByStudentForAssignments(
  assignments: Pick<Assignment, 'id' | 'source_kind'>[],
): Promise<Result<Map<string, Record<string, number>>>> {
  const supabase = await client();
  const nonQuizIds = assignments.filter((a) => a.source_kind !== 'quiz').map((a) => a.id);
  const quizIds = assignments.filter((a) => a.source_kind === 'quiz').map((a) => a.id);

  const marksByStudent = new Map<string, Record<string, number>>();

  if (nonQuizIds.length > 0) {
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('student_id, assignment_id, grades(mark)')
      .in('assignment_id', nonQuizIds);
    if (error) return { data: null, error };
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
    const { data: quizScores, error } = await supabase
      .from('quiz_best_scores')
      .select('student_id, assignment_id, best_score')
      .in('assignment_id', quizIds);
    // Tolerated, not returned, matching gradebookExport.ts's precedent — a
    // failure reading quiz scores shouldn't block the rest of the marks map.
    if (!error) {
      type QuizScore = { student_id: string; assignment_id: string; best_score: number };
      for (const row of (quizScores ?? []) as unknown as QuizScore[]) {
        const bucket = marksByStudent.get(row.student_id) ?? {};
        bucket[row.assignment_id] = row.best_score;
        marksByStudent.set(row.student_id, bucket);
      }
    }
  }

  return { data: marksByStudent, error: null };
}

/** Which of the given assignments has this student submitted/attempted at all (regardless of grading)? Used for FR-010's "missed deadline" detection. */
export async function fetchAttemptedAssignmentIds(
  studentId: string,
  assignments: Pick<Assignment, 'id' | 'source_kind'>[],
): Promise<Result<Set<string>>> {
  const supabase = await client();
  const nonQuizIds = assignments.filter((a) => a.source_kind !== 'quiz').map((a) => a.id);
  const quizIds = assignments.filter((a) => a.source_kind === 'quiz').map((a) => a.id);
  const attempted = new Set<string>();

  if (nonQuizIds.length > 0) {
    const { data, error } = await supabase
      .from('submissions').select('assignment_id').eq('student_id', studentId).in('assignment_id', nonQuizIds);
    if (error) return { data: null, error };
    for (const row of (data ?? []) as { assignment_id: string }[]) attempted.add(row.assignment_id);
  }
  if (quizIds.length > 0) {
    const { data, error } = await supabase
      .from('quiz_attempts').select('assignment_id').eq('student_id', studentId).in('assignment_id', quizIds);
    if (error) return { data: null, error };
    for (const row of (data ?? []) as { assignment_id: string }[]) attempted.add(row.assignment_id);
  }

  return { data: attempted, error: null };
}
