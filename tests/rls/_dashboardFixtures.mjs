/**
 * RLS fixture helpers for Spec 004 (Student Dashboard).
 *
 * Builds on Spec 003's tests/rls/_classFixtures.mjs (createClassFixture,
 * createEnrollmentFixture, createAssignmentFixture) and Spec 002's
 * tests/rls/_helpers.mjs (serviceClient, getProfileByAuthId). Uses the
 * SERVICE ROLE to set up state directly (bypassing RLS) — fixture setup only,
 * exactly like _classFixtures.mjs's own convention. Assertions must always go
 * through a real signed-in client.
 */

import { serviceClient, getProfileByAuthId } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture } from './_classFixtures.mjs';

/** Insert a submission directly (service role — fixture setup, bypasses the due-date/enrollment checks a real client insert would face). */
export async function createSubmissionFixture(assignmentId, studentAuthUserId, overrides = {}) {
  const svc = serviceClient();
  const studentProfile = await getProfileByAuthId(studentAuthUserId);
  const { data, error } = await svc
    .from('submissions')
    .insert({
      assignment_id: assignmentId,
      student_id: studentProfile.id,
      text_content: overrides.text_content ?? 'Fixture answer',
      late: overrides.late ?? false,
    })
    .select()
    .single();
  if (error) throw new Error(`createSubmissionFixture: ${error.message}`);
  return data;
}

/** Insert a grade for an existing submission (service role — fires the grades_sync_unit_progress and achievement triggers exactly as a real teacher grading would). */
export async function createGradeFixture(submissionId, graderAuthUserId, overrides = {}) {
  const svc = serviceClient();
  const graderProfile = await getProfileByAuthId(graderAuthUserId);
  const { data, error } = await svc
    .from('grades')
    .insert({
      submission_id: submissionId,
      mark: overrides.mark ?? 80,
      feedback: overrides.feedback ?? null,
      graded_by: graderProfile.id,
    })
    .select()
    .single();
  if (error) throw new Error(`createGradeFixture: ${error.message}`);
  return data;
}

/** Insert a quiz_attempts row directly (service role — bypasses submit_quiz_attempt(), fires quiz_attempts_sync_unit_progress the same as a real attempt). */
export async function createQuizAttemptFixture(assignmentId, studentAuthUserId, overrides = {}) {
  const svc = serviceClient();
  const studentProfile = await getProfileByAuthId(studentAuthUserId);
  const { data, error } = await svc
    .from('quiz_attempts')
    .insert({
      assignment_id: assignmentId,
      student_id: studentProfile.id,
      answers: overrides.answers ?? {},
      score: overrides.score ?? 50,
    })
    .select()
    .single();
  if (error) throw new Error(`createQuizAttemptFixture: ${error.message}`);
  return data;
}

/** Insert a unit_progress row directly (service role — fixture setup for read-path tests that don't need to exercise the insert policy itself). */
export async function createUnitProgressFixture(studentAuthUserId, overrides = {}) {
  const svc = serviceClient();
  const studentProfile = await getProfileByAuthId(studentAuthUserId);
  const { data, error } = await svc
    .from('unit_progress')
    .insert({
      student_id: studentProfile.id,
      course_code: overrides.course_code ?? 'EFMP-301',
      unit_no: overrides.unit_no ?? 1,
      method: overrides.method ?? 'self_marked',
      occurred_at: overrides.occurred_at ?? new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw new Error(`createUnitProgressFixture: ${error.message}`);
  return data;
}

/**
 * Seed a student across `semesterCount` distinct term_labels, `classesPerSemester`
 * active classes each, with one published assignment per class — the
 * SC-008 8-semester/6-class scale used by the performance fixture (T008,
 * T050) and reused by any story's test needing multi-semester data.
 */
export async function seedMultiSemesterScenario(teacherAuthUserId, studentAuthUserId, {
  semesterCount = 8,
  classesPerSemester = 6,
} = {}) {
  const classes = [];
  for (let s = 1; s <= semesterCount; s += 1) {
    for (let c = 0; c < classesPerSemester; c += 1) {
      const klass = await createClassFixture(teacherAuthUserId, {
        course_code: 'EFMP-301',
        name: `Fixture Class S${s}-${c}`,
        term_label: `Semester ${s}`,
      });
      await createEnrollmentFixture(klass.id, studentAuthUserId);
      const assignment = await createAssignmentFixture(klass.id, {
        title: `Fixture Assignment S${s}-${c}`,
        published: true,
        due_at: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString(),
      });
      classes.push({ klass, assignment });
    }
  }
  return classes;
}

/** Delete fixture rows created directly (submissions/grades/quiz_attempts/unit_progress) — enrollments/assignments/classes cascade via cleanupClasses. */
export async function cleanupDashboardRows({ unitProgressIds = [] } = {}) {
  const svc = serviceClient();
  await Promise.allSettled(
    unitProgressIds.filter(Boolean).map((id) => svc.from('unit_progress').delete().eq('id', id)),
  );
}
