/**
 * T005 [US1] — a teacher's ungraded-count/soonest-due/recent-activity
 * queries never return another teacher's classes or submissions, even when
 * the fixture contains other teachers' classes (FR-002, SC-004; contract
 * checklist item 13).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import { cleanupClasses } from './_classFixtures.mjs';
import { seedTeacherOverviewScenario } from './_teacherFixtures.mjs';

describe.skipIf(!rlsConfigured)('teacher overview isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a teacher only sees their own classes\' assignments and submissions', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    const scenarioA = await seedTeacherOverviewScenario(teacherA.authUserId, studentA.authUserId);
    createdClasses.push(scenarioA.classA.id, scenarioA.classB.id);

    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);
    const scenarioB = await seedTeacherOverviewScenario(teacherB.authUserId, studentB.authUserId);
    createdClasses.push(scenarioB.classA.id, scenarioB.classB.id);

    // Teacher A's own classes are visible.
    const teacherAProfile = await getProfileByAuthId(teacherA.authUserId);
    const { data: ownClasses } = await teacherA.client
      .from('classes').select('*').eq('teacher_id', teacherAProfile.id);
    expect(ownClasses.map((c) => c.id).sort()).toEqual([scenarioA.classA.id, scenarioA.classB.id].sort());

    // Teacher A cannot see Teacher B's classes.
    const { data: bClassesFromA } = await teacherA.client
      .from('classes').select('*').in('id', [scenarioB.classA.id, scenarioB.classB.id]);
    expect(bClassesFromA).toHaveLength(0);

    // Teacher A cannot see Teacher B's assignments (soonest-due query shape).
    const { data: bAssignmentsFromA } = await teacherA.client
      .from('assignments').select('*').in('class_id', [scenarioB.classA.id, scenarioB.classB.id]);
    expect(bAssignmentsFromA).toHaveLength(0);

    // Teacher A cannot see Teacher B's submissions (ungraded-count / recent-activity query shape).
    const { data: bSubmissionsFromA } = await teacherA.client
      .from('submissions').select('*').in('assignment_id', [
        scenarioB.assignments.a1.id, scenarioB.assignments.a2.id,
      ]);
    expect(bSubmissionsFromA).toHaveLength(0);

    // Teacher A cannot see Teacher B's quiz attempts (recent-activity query shape).
    const { data: bQuizAttemptsFromA } = await teacherA.client
      .from('quiz_attempts').select('*').eq('assignment_id', scenarioB.assignments.b1.id);
    expect(bQuizAttemptsFromA).toHaveLength(0);

    // Teacher A's own ungraded submission (A2) and graded submission (A1) are both visible.
    const { data: ownSubmissions } = await teacherA.client
      .from('submissions').select('*').in('assignment_id', [
        scenarioA.assignments.a1.id, scenarioA.assignments.a2.id,
      ]);
    expect(ownSubmissions).toHaveLength(2);
  });
});
