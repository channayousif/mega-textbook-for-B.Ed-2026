/**
 * RLS fixture helpers for Spec 005 (Teacher Dashboard, Feedback & Book
 * Improvement Loop).
 *
 * Builds on Spec 003's tests/rls/_classFixtures.mjs (createClassFixture,
 * createEnrollmentFixture, createAssignmentFixture) and Spec 004's
 * tests/rls/_dashboardFixtures.mjs (createSubmissionFixture,
 * createGradeFixture, createQuizAttemptFixture) — reused unmodified, not
 * duplicated. Uses the SERVICE ROLE to set up state directly (bypassing RLS)
 * — fixture setup only, exactly like the fixtures it builds on. Assertions
 * must always go through a real signed-in client.
 */

import {
  createClassFixture,
  createEnrollmentFixture,
  createAssignmentFixture,
} from './_classFixtures.mjs';
import {
  createSubmissionFixture,
  createGradeFixture,
  createQuizAttemptFixture,
} from './_dashboardFixtures.mjs';

/**
 * Seed one teacher with 2 active classes, one enrolled student, a mix of
 * graded/ungraded submissions, a quiz attempt, and assignments due at
 * varying times — reused by US1 (Overview), US6 (Analytics), and US7
 * (student drill-down) RLS/E2E tests (T004).
 *
 * Class A: one graded submission (past-due), one ungraded submission
 * (due soon) — exercises Overview's per-class ungraded count and
 * Analytics' distribution/trend.
 * Class B: one quiz attempt (due soon), one further-out unsubmitted
 * assignment — exercises Overview's soonest-due ordering and the merged
 * submissions+quiz_attempts recent-activity feed.
 */
export async function seedTeacherOverviewScenario(teacherAuthUserId, studentAuthUserId, overrides = {}) {
  const classA = await createClassFixture(teacherAuthUserId, {
    course_code: overrides.courseCodeA ?? 'EFMP-301',
    name: overrides.classAName ?? 'Fixture Class A',
    term_label: overrides.termLabel ?? 'Fall 2026',
  });
  const classB = await createClassFixture(teacherAuthUserId, {
    course_code: overrides.courseCodeB ?? 'EFMP-301',
    name: overrides.classBName ?? 'Fixture Class B',
    term_label: overrides.termLabel ?? 'Fall 2026',
  });
  await createEnrollmentFixture(classA.id, studentAuthUserId);
  await createEnrollmentFixture(classB.id, studentAuthUserId);

  const assignmentA1 = await createAssignmentFixture(classA.id, {
    title: 'A1 Graded',
    source_kind: 'activity',
    course_code: classA.course_code,
    unit_no: 1,
    due_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  });
  const assignmentA2 = await createAssignmentFixture(classA.id, {
    title: 'A2 Ungraded',
    source_kind: 'activity',
    course_code: classA.course_code,
    unit_no: 2,
    due_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
  const submissionA1 = await createSubmissionFixture(assignmentA1.id, studentAuthUserId);
  await createGradeFixture(submissionA1.id, teacherAuthUserId, { mark: 80 });
  const submissionA2 = await createSubmissionFixture(assignmentA2.id, studentAuthUserId);
  // A2 is deliberately left ungraded — the "ungraded count" fixture case.

  const assignmentB1 = await createAssignmentFixture(classB.id, {
    title: 'B1 Quiz',
    source_kind: 'quiz',
    course_code: classB.course_code,
    unit_no: 1,
    due_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  });
  const assignmentB2 = await createAssignmentFixture(classB.id, {
    title: 'B2 Later',
    source_kind: 'activity',
    course_code: classB.course_code,
    unit_no: 2,
    due_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
  });
  const quizAttemptB1 = await createQuizAttemptFixture(assignmentB1.id, studentAuthUserId, { score: 70 });

  return {
    classA,
    classB,
    assignments: {
      a1: assignmentA1, a2: assignmentA2, b1: assignmentB1, b2: assignmentB2,
    },
    submissions: { a1: submissionA1, a2: submissionA2 },
    quizAttempts: { b1: quizAttemptB1 },
  };
}
