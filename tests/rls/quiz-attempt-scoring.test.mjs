/**
 * T054 [US6] — `submit_quiz_attempt` computes the score server-side; a
 * direct client INSERT on `quiz_attempts` is rejected (FR-017, SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('quiz attempt scoring', () => {
  const createdUsers = [];
  const createdClasses = [];
  const quizItemIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    await Promise.allSettled(quizItemIds.map((id) => svc.from('quiz_items').delete().eq('id', id)));
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('score is computed server-side from the answers submitted; a direct INSERT is rejected', async () => {
    const svc = serviceClient();
    const { data: item1 } = await svc
      .from('quiz_items')
      .insert({ course_code: 'EFMP-301', unit_no: 2, question_text: 'Q1', options: [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }], correct_option: 'A' })
      .select().single();
    const { data: item2 } = await svc
      .from('quiz_items')
      .insert({ course_code: 'EFMP-301', unit_no: 2, question_text: 'Q2', options: [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }], correct_option: 'B' })
      .select().single();
    quizItemIds.push(item1.id, item2.id);

    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const { data: assignment } = await svc
      .from('assignments')
      .insert({
        class_id: klass.id, source_kind: 'quiz', course_code: 'EFMP-301', unit_no: 2,
        title: 'Quiz — Unit 2', due_at: new Date(Date.now() + 3600_000).toISOString(),
        max_mark: 10, published: true,
      })
      .select().single();

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);

    // One correct (item1: A), one incorrect (item2: A instead of B) — 1/2 * 10 = 5.
    const { data: result, error: rpcError } = await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id,
      p_answers: { [item1.id]: 'A', [item2.id]: 'A' },
    });
    expect(rpcError).toBeNull();
    expect(Number(result.score)).toBe(5);

    const studentProfile = await getProfileByAuthId(student.authUserId);
    const { data: directInsert, error: directError } = await student.client
      .from('quiz_attempts')
      .insert({ assignment_id: assignment.id, student_id: studentProfile.id, answers: {}, score: 100 })
      .select();
    expect(directError).toBeTruthy();
    expect(directInsert ?? []).toHaveLength(0);
  });
});
