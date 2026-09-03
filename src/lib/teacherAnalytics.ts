import { getSupabase } from '@site/src/lib/supabase';
import type { Result } from '@site/src/lib/classes';
import { fetchMarksByStudentForAssignments, fetchAttemptedAssignmentIds } from '@site/src/lib/classScores';
import { fetchTotalUnitsForCourse } from '@site/src/lib/unitProgress';
import type { Assignment } from '@site/src/lib/types';

/**
 * Per-class Analytics (FR-009, FR-010) and per-student drill-down (FR-011).
 * Spec 005, T036/T040.
 *
 * COSMETIC CONVENIENCE ONLY (Constitution Art. IX.2) - real authorization is
 * Spec 003's existing RLS on classes/enrollments/assignments/submissions/
 * grades/quiz_attempts; a teacher's queries here are already scoped to
 * classes they own. FR-011's unit coverage is computed independently of
 * Spec 004's `unit_progress` (research.md R3) - this file never reads that
 * table.
 */

async function client() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('not_configured');
  return supabase;
}

type StudentInfo = { studentId: string; fullName: string | null };

async function fetchClassContext(classId: string): Promise<Result<{
  assignments: Assignment[];
  students: StudentInfo[];
}>> {
  const supabase = await client();
  const [assignmentsRes, enrollmentsRes] = await Promise.all([
    supabase.from('assignments').select('*').eq('class_id', classId).order('due_at', { ascending: true }),
    supabase.from('enrollments').select('student_id, profiles(full_name)').eq('class_id', classId).eq('status', 'active'),
  ]);
  if (assignmentsRes.error) return { data: null, error: assignmentsRes.error };
  if (enrollmentsRes.error) return { data: null, error: enrollmentsRes.error };

  type EnrollmentRow = { student_id: string; profiles: { full_name: string | null } | null };
  const students = ((enrollmentsRes.data ?? []) as unknown as EnrollmentRow[]).map((e) => ({
    studentId: e.student_id,
    fullName: e.profiles?.full_name ?? null,
  }));

  return {
    data: { assignments: (assignmentsRes.data ?? []) as Assignment[], students },
    error: null,
  };
}

export type AssignmentDistribution = {
  assignmentId: string;
  title: string;
  scores: number[]; // normalized mark/max_mark, one per student who has a mark
};

export type StudentTrendPoint = { assignmentId: string; dueAt: string; normalizedScore: number };
export type StudentTrend = { studentId: string; fullName: string | null; points: StudentTrendPoint[] };

export type UnitAverage = { courseCode: string; unitNo: number; averageScore: number };

export type AtRiskReason =
  | { kind: 'missed_deadlines'; count: number }
  | { kind: 'falling_trend'; scores: number[] };

export type AtRiskStudent = { studentId: string; fullName: string | null; reason: AtRiskReason };

export type ClassAnalytics = {
  distribution: AssignmentDistribution[];
  trends: StudentTrend[];
  unitAverages: UnitAverage[];
  atRiskStudents: AtRiskStudent[];
};

/**
 * FR-009/FR-010 - reuses `fetchMarksByStudentForAssignments`'s
 * grades+quiz_best_scores merge (research.md R4) to compute score
 * distribution per assignment, each student's chronological trend, the
 * unit-by-unit class average, and the at-risk flag (2026-07-24
 * clarification): (a) >=2 assignments past due_at with no submission/quiz
 * attempt, or (b) the student's last 3 normalized scores each strictly
 * lower than the one before.
 */
export async function fetchClassAnalytics(classId: string): Promise<Result<ClassAnalytics>> {
  const { data: context, error: contextError } = await fetchClassContext(classId);
  if (contextError || !context) return { data: null, error: contextError };
  const { assignments, students } = context;

  const { data: marksByStudent, error: marksError } = await fetchMarksByStudentForAssignments(assignments);
  if (marksError || !marksByStudent) return { data: null, error: marksError };

  const distribution: AssignmentDistribution[] = assignments.map((a) => {
    const scores: number[] = [];
    for (const student of students) {
      const mark = marksByStudent.get(student.studentId)?.[a.id];
      if (mark !== undefined) scores.push(mark / a.max_mark);
    }
    return { assignmentId: a.id, title: a.title, scores };
  });

  const trends: StudentTrend[] = students.map((student) => {
    const points: StudentTrendPoint[] = [];
    for (const a of assignments) {
      const mark = marksByStudent.get(student.studentId)?.[a.id];
      if (mark !== undefined) points.push({ assignmentId: a.id, dueAt: a.due_at, normalizedScore: mark / a.max_mark });
    }
    return { studentId: student.studentId, fullName: student.fullName, points };
  });

  const unitGroups = new Map<string, number[]>();
  for (const a of assignments) {
    if (a.course_code === null || a.unit_no === null) continue;
    const key = `${a.course_code}::${a.unit_no}`;
    const scores = distribution.find((d) => d.assignmentId === a.id)?.scores ?? [];
    const bucket = unitGroups.get(key) ?? [];
    bucket.push(...scores);
    unitGroups.set(key, bucket);
  }
  const unitAverages: UnitAverage[] = Array.from(unitGroups.entries()).map(([key, scores]) => {
    const [courseCode, unitNoStr] = key.split('::');
    return {
      courseCode,
      unitNo: Number(unitNoStr),
      averageScore: scores.length === 0 ? 0 : scores.reduce((s, v) => s + v, 0) / scores.length,
    };
  });

  // Parallelized (was a sequential per-student await) - at 30-student "representative scale"
  // (T050's e2e perf check) the sequential version issued 30 serial round-trips before the
  // page could render, alone exceeding the 5s SC-005 budget. Each student's computation is
  // independent, so Promise.all is safe and preserves student order in the result.
  const nowIso = new Date().toISOString();
  const atRiskResults = await Promise.all(students.map(async (student): Promise<AtRiskStudent | null> => {
    const { data: attempted } = await fetchAttemptedAssignmentIds(student.studentId, assignments);
    const missedCount = assignments.filter((a) => a.due_at < nowIso && !attempted?.has(a.id)).length;

    const trend = trends.find((t) => t.studentId === student.studentId);
    const lastThree = (trend?.points ?? []).slice(-3).map((p) => p.normalizedScore);
    const isFallingTrend = lastThree.length === 3
      && lastThree[1] < lastThree[0]
      && lastThree[2] < lastThree[1];

    if (missedCount >= 2) {
      return { studentId: student.studentId, fullName: student.fullName, reason: { kind: 'missed_deadlines' as const, count: missedCount } };
    }
    if (isFallingTrend) {
      return { studentId: student.studentId, fullName: student.fullName, reason: { kind: 'falling_trend' as const, scores: lastThree } };
    }
    return null;
  }));
  const atRiskStudents: AtRiskStudent[] = atRiskResults.filter((s): s is AtRiskStudent => s !== null);

  return { data: { distribution, trends, unitAverages, atRiskStudents }, error: null };
}

export type StudentDrilldown = {
  submissions: { assignmentId: string; assignmentTitle: string; submittedAt: string; late: boolean }[];
  grades: { assignmentId: string; assignmentTitle: string; mark: number; maxMark: number }[];
  quizAttempts: { assignmentId: string; assignmentTitle: string; score: number; attemptedAt: string }[];
  unitCoverageFraction: number; // 0..1
};

/**
 * FR-011 - one student's submissions/grades/quiz attempts within one class,
 * plus a unit-coverage fraction derived independently from `submissions`/
 * `quiz_attempts` (never Spec 004's `unit_progress`, research.md R3),
 * reusing Spec 004's existing `fetchTotalUnitsForCourse()` unmodified.
 */
export async function fetchStudentDrilldown(classId: string, studentId: string): Promise<Result<StudentDrilldown>> {
  const supabase = await client();
  const { data: klass, error: classError } = await supabase.from('classes').select('course_code').eq('id', classId).single();
  if (classError || !klass) return { data: null, error: classError };

  const { data: assignments, error: assignmentsError } = await supabase
    .from('assignments').select('*').eq('class_id', classId);
  if (assignmentsError) return { data: null, error: assignmentsError };
  const assignmentList = (assignments ?? []) as Assignment[];
  const assignmentById = new Map(assignmentList.map((a) => [a.id, a]));

  const { data: submissionRows, error: submissionsError } = await supabase
    .from('submissions')
    .select('assignment_id, submitted_at, late, grades(mark)')
    .eq('student_id', studentId)
    .in('assignment_id', assignmentList.map((a) => a.id));
  if (submissionsError) return { data: null, error: submissionsError };

  type SubmissionRow = { assignment_id: string; submitted_at: string; late: boolean; grades: { mark: number }[] | { mark: number } | null };
  const submissions = ((submissionRows ?? []) as unknown as SubmissionRow[]).map((row) => ({
    assignmentId: row.assignment_id,
    assignmentTitle: assignmentById.get(row.assignment_id)?.title ?? '',
    submittedAt: row.submitted_at,
    late: row.late,
  }));
  const grades = ((submissionRows ?? []) as unknown as SubmissionRow[])
    .map((row) => {
      const gradeField = row.grades;
      const grade = Array.isArray(gradeField) ? (gradeField[0] ?? null) : gradeField;
      if (!grade) return null;
      const assignment = assignmentById.get(row.assignment_id);
      return {
        assignmentId: row.assignment_id,
        assignmentTitle: assignment?.title ?? '',
        mark: grade.mark,
        maxMark: assignment?.max_mark ?? 0,
      };
    })
    .filter((g): g is NonNullable<typeof g> => g !== null);

  const { data: quizAttemptRows, error: quizError } = await supabase
    .from('quiz_attempts')
    .select('assignment_id, score, attempted_at')
    .eq('student_id', studentId)
    .in('assignment_id', assignmentList.map((a) => a.id));
  if (quizError) return { data: null, error: quizError };
  const quizAttempts = ((quizAttemptRows ?? []) as { assignment_id: string; score: number; attempted_at: string }[]).map((row) => ({
    assignmentId: row.assignment_id,
    assignmentTitle: assignmentById.get(row.assignment_id)?.title ?? '',
    score: row.score,
    attemptedAt: row.attempted_at,
  }));

  const coveredUnits = new Set<number>();
  for (const g of grades) {
    const assignment = assignmentById.get(g.assignmentId);
    if (assignment?.unit_no !== null && assignment?.unit_no !== undefined) coveredUnits.add(assignment.unit_no);
  }
  for (const qa of quizAttempts) {
    const assignment = assignmentById.get(qa.assignmentId);
    if (assignment?.unit_no !== null && assignment?.unit_no !== undefined) coveredUnits.add(assignment.unit_no);
  }
  const totalUnits = await fetchTotalUnitsForCourse(klass.course_code as string);
  const unitCoverageFraction = totalUnits === 0 ? 0 : coveredUnits.size / totalUnits;

  return {
    data: { submissions, grades, quizAttempts, unitCoverageFraction },
    error: null,
  };
}
