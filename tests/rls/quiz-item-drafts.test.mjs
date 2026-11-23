/**
 * Spec 029 / migration 0056 - quiz_items drafts.
 *
 * A draft (the owner-run Studio importer's output) is visible to a verified teacher for
 * review, but never reaches a student: not through quiz_items_public, not into the quiz
 * picker, and not into the score submit_quiz_attempt() computes. Publishing is an UPDATE
 * a verified teacher may make and an unverified teacher may not. Existing rows and
 * teacher-authored items default to published.
 *
 * Uses EFMP-301 Unit 97, which has no content, so no other spec's items share the unit
 * the scorer counts.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, cleanupClasses } from './_classFixtures.mjs';

const COURSE = 'EFMP-301';
const UNIT = 97;
const opts = [{ key: 'A', text: 'a' }, { key: 'B', text: 'b' }];

describe.skipIf(!rlsConfigured)('quiz item drafts', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await serviceClient().from('quiz_items').delete().eq('course_code', COURSE).eq('unit_no', UNIT);
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a draft is hidden from students and the scorer until a verified teacher publishes it', async () => {
    const svc = serviceClient();
    const { data: published, error: pubErr } = await svc.from('quiz_items')
      .insert({ course_code: COURSE, unit_no: UNIT, question_text: 'Published Q', options: opts, correct_option: 'A' })
      .select('id, status').single();
    expect(pubErr).toBeNull();
    expect(published.status).toBe('published'); // the default keeps today's behaviour
    const { data: draft, error: draftErr } = await svc.from('quiz_items')
      .insert({ course_code: COURSE, unit_no: UNIT, question_text: 'Draft Q', options: opts, correct_option: 'B', status: 'draft' })
      .select('id').single();
    expect(draftErr).toBeNull();

    const verified = await createSignedInUser({ role: 'teacher' });
    const unverified = await createSignedInUser({ role: 'teacher' });
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(verified.authUserId, unverified.authUserId, student.authUserId);
    await adminSet(verified.authUserId, { verified_teacher: true });

    // Students read the public view: published only, never the draft, never an answer.
    const { data: studentView, error: viewErr } = await student.client.from('quiz_items_public')
      .select('*').eq('course_code', COURSE).eq('unit_no', UNIT);
    expect(viewErr).toBeNull();
    expect(studentView.map((r) => r.id)).toEqual([published.id]);
    expect(studentView[0]).not.toHaveProperty('correct_option');
    expect(studentView[0]).not.toHaveProperty('status');

    // A verified teacher sees both in the full table, which is how a draft is reviewed.
    const { data: teacherView } = await verified.client.from('quiz_items')
      .select('id, status').eq('course_code', COURSE).eq('unit_no', UNIT);
    expect(new Set(teacherView.map((r) => r.id))).toEqual(new Set([published.id, draft.id]));

    // The scorer ignores the draft: answering only the published item correctly is full marks.
    const klass = await createClassFixture(verified.authUserId);
    createdClasses.push(klass.id);
    const { data: assignment } = await svc.from('assignments').insert({
      class_id: klass.id, source_kind: 'quiz', course_code: COURSE, unit_no: UNIT,
      title: 'Draft-isolation quiz', due_at: new Date(Date.now() + 3600_000).toISOString(),
      max_mark: 10, published: true,
    }).select().single();
    await createEnrollmentFixture(klass.id, student.authUserId);
    const { data: before, error: rpcErr } = await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id, p_answers: { [published.id]: 'A', [draft.id]: 'A' },
    });
    expect(rpcErr).toBeNull();
    expect(before.total_items).toBe(1);
    expect(Number(before.score)).toBe(10);

    // An unverified teacher cannot publish; a verified one can.
    await unverified.client.from('quiz_items').update({ status: 'published' }).eq('id', draft.id);
    const { data: still } = await svc.from('quiz_items').select('status').eq('id', draft.id).single();
    expect(still.status).toBe('draft');
    const { error: publishErr } = await verified.client.from('quiz_items').update({ status: 'published' }).eq('id', draft.id);
    expect(publishErr).toBeNull();

    // Once published it reaches students and counts toward the score.
    const { data: afterView } = await student.client.from('quiz_items_public')
      .select('id').eq('course_code', COURSE).eq('unit_no', UNIT);
    expect(afterView).toHaveLength(2);
    const { data: after } = await student.client.rpc('submit_quiz_attempt', {
      p_assignment_id: assignment.id, p_answers: { [published.id]: 'A', [draft.id]: 'A' },
    });
    expect(after.total_items).toBe(2);
    expect(Number(after.score)).toBe(5);
  });

  test('status accepts only draft or published', async () => {
    const { error } = await serviceClient().from('quiz_items')
      .insert({ course_code: COURSE, unit_no: UNIT, question_text: 'Bad status', options: opts, correct_option: 'A', status: 'archived' });
    expect(error).not.toBeNull();
    expect(error.code).toBe('23514'); // check_violation
  });
});
