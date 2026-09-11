/**
 * T055 [US6] — multiple attempts before the due date leave
 * `quiz_best_scores` reflecting the highest score, not the latest; an
 * attempt after the due date is rejected (2026-07-19 clarification).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('quiz retake — best score is the record', () => {
  const createdUsers = [];
  const createdClasses = [];
  const quizItemIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    await Promise.allSettled(quizItemIds.map((id) => svc.from('quiz_items').delete().eq('id', id)));
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('quiz_best_scores reflects max(score), not the latest attempt', async () => {
    const svc = serviceClient();
    const { data: item1 } = await svc
      .from('quiz_items')
      .insert({ course_code: 'EFMP-301', unit_no: 3, question_text: 'Q1', options: [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }], correct_option: 'A' })
      .select().single();
    const { data: item2 } = await svc
      .from('quiz_items')
      .insert({ course_code: 'EFMP-301', unit_no: 3, question_text: 'Q2', options: [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }], correct_option: 'B' })
      .select().single();
    quizItemIds.push(item1.id, item2.id);

    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const { data: assignment } = await svc
      .from('assignments')
      .insert({
        class_id: klass.id, source_kind: 'quiz', course_code: 'EFMP-301', unit_no: 3,
        title: 'Quiz — Unit 3', due_at: new Date(Date.now() + 3600_000).toISOString(),
        max_mark: 10, published: true,
      })
      .select().single();

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);

    // Attempt 1: half correct -> 5.
    await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id, p_answers: { [item1.id]: 'A', [item2.id]: 'A' },
    });
    // Attempt 2: all correct -> 10 (the best).
    await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id, p_answers: { [item1.id]: 'A', [item2.id]: 'B' },
    });
    // Attempt 3 (latest): all wrong -> 0.
    await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id, p_answers: { [item1.id]: 'B', [item2.id]: 'A' },
    });

    const { data: best, error: bestError } = await student.client
      .from('quiz_best_scores')
      .select('*')
      .eq('assignment_id', assignment.id)
      .single();
    expect(bestError).toBeNull();
    expect(Number(best.best_score)).toBe(10);
  });

  test('an attempt after the due date is rejected', async () => {
    const svc = serviceClient();
    const { data: item1 } = await svc
      .from('quiz_items')
      .insert({ course_code: 'EFMP-301', unit_no: 3, question_text: 'Q1', options: [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }], correct_option: 'A' })
      .select().single();
    quizItemIds.push(item1.id);

    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    const { data: assignment } = await svc
      .from('assignments')
      .insert({
        class_id: klass.id, source_kind: 'quiz', course_code: 'EFMP-301', unit_no: 3,
        title: 'Past-due quiz', due_at: new Date(Date.now() - 3600_000).toISOString(),
        max_mark: 10, published: true,
      })
      .select().single();

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);

    const { data, error } = await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id, p_answers: { [item1.id]: 'A' },
    });
    expect(error).toBeTruthy();
    expect(data).toBeNull();
  });
});
