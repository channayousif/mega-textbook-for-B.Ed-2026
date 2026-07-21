import { getSupabase } from '@site/src/lib/supabase';
import { fetchContentIndex } from '@site/src/lib/assignments';
import type { Result } from '@site/src/lib/classes';
import type { Assignment, Class, Enrollment } from '@site/src/lib/types';

/**
 * Read-only dashboard aggregation queries (Spec 004, T011/T016/T028) — every
 * area except Progress/Achievements is a plain RLS-scoped `SELECT` over
 * existing Spec 003 tables, composed client-side (data-model.md's "Read-only
 * query shapes" table). COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) —
 * real authorization is Spec 003's existing RLS policies; this file adds no
 * new policy.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

// ---------------------------------------------------------------------------
// US1 — Home: current semester + classes, due soon (also backs the full
// Assignments area, FR-003), recent grades.
// ---------------------------------------------------------------------------

export type CurrentSemesterResult = {
  /** Highest semester number among the student's active classes' courses — a
   * label, never a filter (resolved via `/sp.analyze`, 2026-07-21: a student
   * can hold active classes across more than one semester at once). `null`
   * when the student has no active classes at all. */
  currentSemester: number | null;
  classes: (Enrollment & { classes: Class })[];
};

/** FR-002 — every active class, unfiltered by semester, plus the highest-semester label. */
export async function fetchCurrentSemesterClasses(studentId: string): Promise<Result<CurrentSemesterResult>> {
  const supabase = await client();
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, classes(*)')
    .eq('student_id', studentId)
    .eq('status', 'active');
  if (error) return { data: null, error };

  const rows = ((data ?? []) as (Enrollment & { classes: Class })[]).filter((r) => r.classes?.status === 'active');
  const courseCodes = Array.from(new Set(rows.map((r) => r.classes.course_code)));
  const entries = await fetchContentIndex();

  let currentSemester: number | null = null;
  for (const code of courseCodes) {
    const match = entries.find((e) => e.course_code === code);
    if (match && (currentSemester === null || match.semester > currentSemester)) {
      currentSemester = match.semester;
    }
  }

  return { data: { currentSemester, classes: rows }, error: null };
}

export type DueSoonState = 'open' | 'overdue-late-allowed' | 'closed';

export type DueSoonItem = {
  assignment: Assignment;
  className: string;
  /** `open`: not yet due. `overdue-late-allowed`: past due, still acceptable.
   * `closed`: past due, no longer acceptable — never rendered as actionable
   * (FR-003). Quizzes are always `closed` once past due (no late attempts). */
  state: DueSoonState;
};

function computeDueSoonState(assignment: Assignment, now: Date): DueSoonState {
  const isPast = now.getTime() > new Date(assignment.due_at).getTime();
  if (!isPast) return 'open';
  if (assignment.source_kind === 'quiz') return 'closed';
  return assignment.allow_late ? 'overdue-late-allowed' : 'closed';
}

/**
 * FR-002, FR-003 — every published assignment/quiz not yet submitted
 * (assignments) or attempted (quizzes) across the student's active classes.
 * `windowHours` (default 48) only affects ordering, never filtering: items
 * due within the window sort first (Home's "48h-first" rule), then the rest
 * by `due_at`, with a stable class-then-title tiebreak for same-due-date
 * items (spec.md Edge Cases). The full Assignments area (T013) calls this
 * with the same default — it is "the same query, unfiltered by time window"
 * only in the sense that no item is ever excluded by the window either way.
 */
export async function fetchDueSoon(studentId: string, windowHours = 48): Promise<Result<DueSoonItem[]>> {
  const supabase = await client();

  const { data: enrollments, error: enrollError } = await supabase
    .from('enrollments')
    .select('class_id, classes(id, name, status)')
    .eq('student_id', studentId)
    .eq('status', 'active');
  if (enrollError) return { data: null, error: enrollError };

  type EnrollmentRow = { class_id: string; classes: { id: string; name: string; status: string } | null };
  const activeRows = ((enrollments ?? []) as unknown as EnrollmentRow[]).filter((r) => r.classes?.status === 'active');
  const classIds = activeRows.map((r) => r.class_id);
  const classNameById = new Map(activeRows.map((r) => [r.class_id, r.classes!.name]));
  if (classIds.length === 0) return { data: [], error: null };

  const { data: assignments, error: assignError } = await supabase
    .from('assignments')
    .select('*')
    .in('class_id', classIds)
    .eq('published', true);
  if (assignError) return { data: null, error: assignError };

  const all = (assignments ?? []) as Assignment[];
  const nonQuizIds = all.filter((a) => a.source_kind !== 'quiz').map((a) => a.id);
  const quizIds = all.filter((a) => a.source_kind === 'quiz').map((a) => a.id);

  const submittedOrAttemptedIds = new Set<string>();
  if (nonQuizIds.length > 0) {
    const { data: submissions } = await supabase
      .from('submissions').select('assignment_id').eq('student_id', studentId).in('assignment_id', nonQuizIds);
    for (const s of (submissions ?? []) as { assignment_id: string }[]) submittedOrAttemptedIds.add(s.assignment_id);
  }
  if (quizIds.length > 0) {
    const { data: attempts } = await supabase
      .from('quiz_attempts').select('assignment_id').eq('student_id', studentId).in('assignment_id', quizIds);
    for (const a of (attempts ?? []) as { assignment_id: string }[]) submittedOrAttemptedIds.add(a.assignment_id);
  }

  const now = new Date();
  const items: DueSoonItem[] = all
    .filter((a) => !submittedOrAttemptedIds.has(a.id))
    .map((a) => ({ assignment: a, className: classNameById.get(a.class_id) ?? '', state: computeDueSoonState(a, now) }));

  const windowMs = windowHours * 60 * 60 * 1000;
  items.sort((a, b) => {
    const aWithin = new Date(a.assignment.due_at).getTime() - now.getTime() <= windowMs;
    const bWithin = new Date(b.assignment.due_at).getTime() - now.getTime() <= windowMs;
    if (aWithin !== bWithin) return aWithin ? -1 : 1;
    const dueDiff = new Date(a.assignment.due_at).getTime() - new Date(b.assignment.due_at).getTime();
    if (dueDiff !== 0) return dueDiff;
    const classDiff = a.className.localeCompare(b.className);
    if (classDiff !== 0) return classDiff;
    return a.assignment.title.localeCompare(b.assignment.title);
  });

  return { data: items, error: null };
}

export type GradeItem = {
  kind: 'assignment' | 'quiz';
  title: string;
  className: string;
  mark: number;
  maxMark: number;
  dateIso: string;
};

type GradedSubmissionRow = {
  mark: number;
  graded_at: string;
  submissions: { assignments: { title: string; max_mark: number; classes: { name: string } | null } | null } | null;
};

async function fetchGradedAssignmentItems(studentId: string): Promise<GradeItem[]> {
  const supabase = await client();
  const { data } = await supabase
    .from('grades')
    .select('mark, graded_at, submissions!inner(student_id, assignments(title, max_mark, classes(name)))')
    .eq('submissions.student_id', studentId);
  return ((data ?? []) as unknown as GradedSubmissionRow[])
    .filter((r) => r.submissions?.assignments)
    .map((r) => ({
      kind: 'assignment' as const,
      title: r.submissions!.assignments!.title,
      className: r.submissions!.assignments!.classes?.name ?? '',
      mark: Number(r.mark),
      maxMark: Number(r.submissions!.assignments!.max_mark),
      dateIso: r.graded_at,
    }));
}

type QuizAttemptRow = {
  assignment_id: string;
  score: number;
  attempted_at: string;
  assignments: { title: string; max_mark: number; classes: { name: string } | null } | null;
};

/** Quiz "grades" — one entry per quiz assignment, from the student's most recent attempt (not necessarily the best score, since "recent" is a recency view, not the score-of-record shown elsewhere). */
async function fetchQuizGradeItems(studentId: string): Promise<GradeItem[]> {
  const supabase = await client();
  const { data } = await supabase
    .from('quiz_attempts')
    .select('assignment_id, score, attempted_at, assignments(title, max_mark, classes(name))')
    .eq('student_id', studentId)
    .order('attempted_at', { ascending: false });
  const rows = (data ?? []) as unknown as QuizAttemptRow[];
  const seen = new Set<string>();
  const items: GradeItem[] = [];
  for (const r of rows) {
    if (seen.has(r.assignment_id) || !r.assignments) continue;
    seen.add(r.assignment_id);
    items.push({
      kind: 'quiz',
      title: r.assignments.title,
      className: r.assignments.classes?.name ?? '',
      mark: Number(r.score),
      maxMark: Number(r.assignments.max_mark),
      dateIso: r.attempted_at,
    });
  }
  return items;
}

/** FR-002 — the student's `limit` most recent results (assignment + quiz), newest first. */
export async function fetchRecentGrades(studentId: string, limit = 5): Promise<Result<GradeItem[]>> {
  try {
    const [assignmentItems, quizItems] = await Promise.all([
      fetchGradedAssignmentItems(studentId),
      fetchQuizGradeItems(studentId),
    ]);
    const merged = [...assignmentItems, ...quizItems]
      .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())
      .slice(0, limit);
    return { data: merged, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// ---------------------------------------------------------------------------
// US2 — Grades area: every returned grade, no average anywhere.
// ---------------------------------------------------------------------------

/**
 * FR-004 — every returned assignment/quiz score, full list, no
 * average/aggregate computed anywhere in this function.
 */
export async function fetchAllGrades(studentId: string): Promise<Result<GradeItem[]>> {
  try {
    const [assignmentItems, quizItems] = await Promise.all([
      fetchGradedAssignmentItems(studentId),
      fetchQuizGradeItems(studentId),
    ]);
    const merged = [...assignmentItems, ...quizItems]
      .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());
    return { data: merged, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// ---------------------------------------------------------------------------
// US5 — History: past (archived) semesters, frozen and grouped.
// ---------------------------------------------------------------------------

export type PastSemesterGroup = {
  termLabel: string;
  classes: {
    klass: Class;
    grades: GradeItem[];
  }[];
};

/**
 * FR-007 — the student's archived classes, grouped by `term_label`, each with
 * its own grades exactly as they stood at archive time. Archived classes are
 * already read-only in Spec 003 (assignments/submissions/grades cannot be
 * written once `status='archived'`) — this function only composes reads.
 */
export async function fetchPastSemesters(studentId: string): Promise<Result<PastSemesterGroup[]>> {
  const supabase = await client();
  const { data: enrollments, error: enrollError } = await supabase
    .from('enrollments')
    .select('class_id, classes(*)')
    .eq('student_id', studentId);
  if (enrollError) return { data: null, error: enrollError };

  type Row = { class_id: string; classes: Class | null };
  const archivedRows = ((enrollments ?? []) as unknown as Row[]).filter((r) => r.classes?.status === 'archived');
  if (archivedRows.length === 0) return { data: [], error: null };

  const groupsByTerm = new Map<string, Class[]>();
  for (const row of archivedRows) {
    const klass = row.classes!;
    const list = groupsByTerm.get(klass.term_label) ?? [];
    list.push(klass);
    groupsByTerm.set(klass.term_label, list);
  }

  const [assignmentItems, quizItems] = await Promise.all([
    fetchGradedAssignmentItems(studentId),
    fetchQuizGradeItems(studentId),
  ]);
  const allGrades = [...assignmentItems, ...quizItems];
  const gradesByClassName = new Map<string, GradeItem[]>();
  for (const g of allGrades) {
    const list = gradesByClassName.get(g.className) ?? [];
    list.push(g);
    gradesByClassName.set(g.className, list);
  }

  const groups: PastSemesterGroup[] = Array.from(groupsByTerm.entries()).map(([termLabel, classes]) => ({
    termLabel,
    classes: classes.map((klass) => ({ klass, grades: gradesByClassName.get(klass.name) ?? [] })),
  }));

  return { data: groups, error: null };
}
