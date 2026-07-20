import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import type { QuizAttempt, QuizItem } from '@site/src/lib/types';

/**
 * Auto-graded practice quiz (Spec 003, T059). FR-017, 2026-07-19 clarification
 * (unlimited retakes, best score of record).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) for the read helpers —
 * real authorization is RLS (supabase/migrations/0022-0023). Scoring itself
 * is NOT a client concern at all: `submitAttempt` is a thin wrapper around
 * the `submit_quiz_attempt()` SECURITY DEFINER RPC, which computes the score
 * server-side — this file never sees `correct_option`.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

/** FR-017 — the distinct units of a course that have at least one quiz item (assignment-new.tsx's picker, T061). */
export async function fetchQuizUnitsForCourse(courseCode: string): Promise<Result<number[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_items_public')
    .select('unit_no')
    .eq('course_code', courseCode);
  if (error) return { data: null, error };
  const units = Array.from(new Set(((data ?? []) as { unit_no: number }[]).map((row) => row.unit_no))).sort((a, b) => a - b);
  return { data: units, error: null };
}

/** FR-017 — every quiz item for a unit, via `quiz_items_public` (never exposes `correct_option`). */
export async function fetchQuizItemsForUnit(courseCode: string, unitNo: number): Promise<Result<QuizItem[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_items_public')
    .select('*')
    .eq('course_code', courseCode)
    .eq('unit_no', unitNo)
    .order('created_at', { ascending: true });
  return { data: (data as QuizItem[]) ?? null, error };
}

export type QuizAttemptResult = {
  id: string;
  score: number;
  attempted_at: string;
  total_items: number;
  correct_count: number;
};

/** FR-017 — submit one attempt; the RPC computes the score server-side and returns it. */
export async function submitAttempt(
  assignmentId: string,
  answers: Record<string, string>,
): Promise<Result<QuizAttemptResult>> {
  const supabase = await client();
  const { data, error } = await supabase.rpc('submit_quiz_attempt', {
    p_assignment_id: assignmentId,
    p_answers: answers,
  });
  return { data: (data as QuizAttemptResult) ?? null, error };
}

/** A student's own attempts for one assignment, most recent first. */
export async function fetchOwnAttempts(assignmentId: string, studentId: string): Promise<Result<QuizAttempt[]>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('*')
    .eq('assignment_id', assignmentId)
    .eq('student_id', studentId)
    .order('attempted_at', { ascending: false });
  return { data: (data as QuizAttempt[]) ?? null, error };
}

/** A student's own best score for one assignment (null if no attempts yet). */
export async function fetchOwnBestScore(assignmentId: string, studentId: string): Promise<Result<number>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('quiz_best_scores')
    .select('best_score')
    .eq('assignment_id', assignmentId)
    .eq('student_id', studentId)
    .maybeSingle();
  if (error) return { data: null, error };
  return { data: data ? Number((data as { best_score: number }).best_score) : null, error: null };
}

export type ClassBestScoreRow = { student: { id: string; full_name: string | null }; bestScore: number | null };

/**
 * Teacher's results view — every actively enrolled student's best score for
 * one assignment. `quiz_best_scores` (0023) carries no FK a PostgREST embed
 * can follow, so this composes two RLS-scoped queries client-side, same
 * pattern as grading.ts's `fetchQueue`.
 */
export async function fetchClassBestScores(classId: string, assignmentId: string): Promise<Result<ClassBestScoreRow[]>> {
  const supabase = await client();
  const [enrollmentsRes, scoresRes] = await Promise.all([
    supabase.from('enrollments').select('student_id, profiles(full_name)').eq('class_id', classId).eq('status', 'active'),
    supabase.from('quiz_best_scores').select('student_id, best_score').eq('assignment_id', assignmentId),
  ]);
  if (enrollmentsRes.error) return { data: null, error: enrollmentsRes.error };
  if (scoresRes.error) return { data: null, error: scoresRes.error };

  type ScoreRow = { student_id: string; best_score: number };
  const scoreByStudent = new Map<string, number>();
  for (const row of (scoresRes.data ?? []) as unknown as ScoreRow[]) {
    scoreByStudent.set(row.student_id, Number(row.best_score));
  }

  type EnrollmentWithProfile = { student_id: string; profiles: { full_name: string | null } | null };
  const rows: ClassBestScoreRow[] = ((enrollmentsRes.data ?? []) as unknown as EnrollmentWithProfile[]).map((e) => ({
    student: { id: e.student_id, full_name: e.profiles?.full_name ?? null },
    bestScore: scoreByStudent.get(e.student_id) ?? null,
  }));

  return { data: rows, error: null };
}
