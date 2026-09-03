import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';

/**
 * Teacher Overview queries (Spec 005, T007, FR-002).
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - every function here is
 * a thin wrapper around a PostgREST call; real authorization is Spec 003's
 * existing RLS on `classes`/`assignments`/`submissions`/`quiz_attempts` (a
 * teacher's queries are already scoped to their own classes by the database,
 * not by anything in this file). No new RLS policy is introduced by this
 * feature for these reads (data-model.md's "Read-only query shapes").
 *
 * Filtering happens client-side after a broad RLS-scoped fetch, matching the
 * existing convention in `gradebookExport.ts`/`dashboardQueries.ts`, rather
 * than relying on PostgREST embedded-resource filter syntax.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

export type UngradedCount = { classId: string; className: string; ungradedCount: number };

/**
 * FR-002 - an ungraded submission count per active class, never combined.
 * Quiz-type assignments never populate `submissions` (they use
 * `quiz_attempts`, auto-scored) and are therefore naturally excluded from
 * "ungraded," consistent with Spec 003's `computeStudentStatus` precedent.
 */
export async function fetchUngradedCountsByClass(): Promise<Result<UngradedCount[]>> {
  const supabase = await client();

  const { data: classes, error: classesError } = await supabase
    .from('classes')
    .select('id, name')
    .eq('status', 'active');
  if (classesError) return { data: null, error: classesError };
  const activeClasses = (classes ?? []) as { id: string; name: string }[];
  if (activeClasses.length === 0) return { data: [], error: null };

  const { data: submissions, error: submissionsError } = await supabase
    .from('submissions')
    .select('assignment_id, grades(id), assignments(class_id)');
  if (submissionsError) return { data: null, error: submissionsError };

  type SubmissionRow = {
    assignment_id: string;
    grades: { id: string }[] | { id: string } | null;
    assignments: { class_id: string } | null;
  };
  const ungradedCountByClassId = new Map<string, number>();
  for (const row of (submissions ?? []) as unknown as SubmissionRow[]) {
    const gradeField = row.grades;
    const hasGrade = Array.isArray(gradeField) ? gradeField.length > 0 : Boolean(gradeField);
    if (hasGrade) continue;
    const classId = row.assignments?.class_id;
    if (!classId) continue;
    ungradedCountByClassId.set(classId, (ungradedCountByClassId.get(classId) ?? 0) + 1);
  }

  return {
    data: activeClasses.map((c) => ({
      classId: c.id,
      className: c.name,
      ungradedCount: ungradedCountByClassId.get(c.id) ?? 0,
    })),
    error: null,
  };
}

export type SoonestDueAssignment = {
  id: string;
  classId: string;
  className: string;
  title: string;
  dueAt: string;
};

/**
 * FR-002, 2026-07-24 clarification - the 5 soonest-due assignments across
 * all of the teacher's own active classes combined, regardless of any
 * individual student's submission state (this is the teacher's own upcoming
 * deadline awareness, not a per-student due-soon list).
 */
export async function fetchSoonestDueAssignments(limit = 5): Promise<Result<SoonestDueAssignment[]>> {
  const supabase = await client();
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from('assignments')
    .select('id, title, due_at, class_id, classes(name, status)');
  if (error) return { data: null, error };

  type AssignmentRow = {
    id: string;
    title: string;
    due_at: string;
    class_id: string;
    classes: { name: string; status: string } | null;
  };
  const upcoming = ((data ?? []) as unknown as AssignmentRow[])
    .filter((row) => row.classes?.status === 'active' && row.due_at >= nowIso)
    .sort((a, b) => a.due_at.localeCompare(b.due_at))
    .slice(0, limit)
    .map((row) => ({
      id: row.id,
      classId: row.class_id,
      className: row.classes?.name ?? '',
      title: row.title,
      dueAt: row.due_at,
    }));

  return { data: upcoming, error: null };
}

export type RecentActivityItem = {
  id: string;
  kind: 'submission' | 'quiz_attempt';
  classId: string;
  className: string;
  assignmentTitle: string;
  occurredAt: string;
};

/**
 * FR-002, 2026-07-24 clarification - a fixed 10-item feed merging assignment
 * submissions and quiz attempts across all of the teacher's own classes,
 * newest first.
 */
export async function fetchRecentActivity(limit = 10): Promise<Result<RecentActivityItem[]>> {
  const supabase = await client();

  const [submissionsRes, quizAttemptsRes] = await Promise.all([
    supabase
      .from('submissions')
      .select('id, submitted_at, assignments(id, title, class_id, classes(name))')
      .order('submitted_at', { ascending: false })
      .limit(limit),
    supabase
      .from('quiz_attempts')
      .select('id, attempted_at, assignments(id, title, class_id, classes(name))')
      .order('attempted_at', { ascending: false })
      .limit(limit),
  ]);
  if (submissionsRes.error) return { data: null, error: submissionsRes.error };
  if (quizAttemptsRes.error) return { data: null, error: quizAttemptsRes.error };

  type EmbeddedAssignment = { id: string; title: string; class_id: string; classes: { name: string } | null };
  type SubmissionRow = { id: string; submitted_at: string; assignments: EmbeddedAssignment | null };
  type QuizAttemptRow = { id: string; attempted_at: string; assignments: EmbeddedAssignment | null };

  const submissionItems: RecentActivityItem[] = ((submissionsRes.data ?? []) as unknown as SubmissionRow[])
    .filter((row) => row.assignments)
    .map((row) => ({
      id: row.id,
      kind: 'submission',
      classId: row.assignments!.class_id,
      className: row.assignments!.classes?.name ?? '',
      assignmentTitle: row.assignments!.title,
      occurredAt: row.submitted_at,
    }));

  const quizAttemptItems: RecentActivityItem[] = ((quizAttemptsRes.data ?? []) as unknown as QuizAttemptRow[])
    .filter((row) => row.assignments)
    .map((row) => ({
      id: row.id,
      kind: 'quiz_attempt',
      classId: row.assignments!.class_id,
      className: row.assignments!.classes?.name ?? '',
      assignmentTitle: row.assignments!.title,
      occurredAt: row.attempted_at,
    }));

  const merged = [...submissionItems, ...quizAttemptItems]
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
    .slice(0, limit);

  return { data: merged, error: null };
}
