/**
 * T015 [US2] — a signed-out request is rejected outright; a reader can insert
 * only with status='open', any other explicit status is rejected; a forged
 * author_role is silently replaced by the trigger-computed value; a
 * scope='passage' insert with quoted_passage null is rejected and vice
 * versa; an insert with comment over 4,000 characters, or
 * quoted_passage/passage_context over 2,000 characters, is rejected
 * (FR-017; `/sp.analyze` finding U1); a reader cannot SELECT another
 * reader's row nor UPDATE any row, including their own (FR-013, FR-014,
 * FR-015, FR-017; contract checklist items 6-10, 16).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, anonClient, createSignedInUser, cleanupUsers, serviceClient,
} from './_helpers.mjs';

function feedbackRow(authorId, overrides = {}) {
  return {
    author_id: authorId,
    page_kind: 'topic',
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    section_anchor: null,
    scope: 'whole_page',
    quoted_passage: null,
    comment: 'This paragraph is unclear.',
    ...overrides,
  };
}

describe.skipIf(!rlsConfigured)('content feedback isolation', () => {
  const createdUsers = [];
  // Rows are scoped by author_id (always one of createdProfileIds below, never a
  // real account) — deleting by owner avoids touching any real reader's rows on
  // a real course like EFMP-302.
  const createdProfileIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    if (createdProfileIds.length) {
      await svc.from('content_feedback').delete().in('author_id', createdProfileIds);
    }
    await cleanupUsers(createdUsers);
  });

  test('a signed-out request is rejected outright', async () => {
    const anon = anonClient();
    const { data, error } = await anon
      .from('content_feedback')
      .insert(feedbackRow('00000000-0000-0000-0000-000000000000'))
      .select();
    expect(error).toBeTruthy();
    expect(data).toBeNull();

    const { data: readData } = await anon.from('content_feedback').select('*');
    expect(readData).toHaveLength(0);
  });

  test('a reader can insert only with status=open; any other explicit status is rejected', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);

    const { data, error } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id))
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.status).toBe('open');

    const { data: forged, error: forgedError } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, { status: 'resolved', topic_no: 2 }))
      .select();
    expect(forgedError).toBeTruthy();
    expect(forged).toBeNull();
  });

  test('a forged author_role is silently replaced by the trigger-computed value', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: profile } = await teacher.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);

    const { data, error } = await teacher.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, { author_role: 'admin', topic_no: 3 }))
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.author_role).toBe('teacher');
  });

  test('scope/quoted_passage pairing is enforced by the check constraint', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);

    const { data: passageNoQuote, error: passageNoQuoteError } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, { scope: 'passage', quoted_passage: null, topic_no: 4 }))
      .select();
    expect(passageNoQuoteError).toBeTruthy();
    expect(passageNoQuote).toBeNull();

    const { data: wholePageWithQuote, error: wholePageWithQuoteError } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, { scope: 'whole_page', quoted_passage: 'A stray quote.', topic_no: 5 }))
      .select();
    expect(wholePageWithQuoteError).toBeTruthy();
    expect(wholePageWithQuote).toBeNull();
  });

  test('length-cap check constraints reject an over-limit comment or passage (FR-017)', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);

    const { data: longComment, error: longCommentError } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, { comment: 'x'.repeat(4001), topic_no: 6 }))
      .select();
    expect(longCommentError).toBeTruthy();
    expect(longComment).toBeNull();

    const { data: longPassage, error: longPassageError } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, {
        scope: 'passage', quoted_passage: 'x'.repeat(2001), topic_no: 7,
      }))
      .select();
    expect(longPassageError).toBeTruthy();
    expect(longPassage).toBeNull();

    const { data: longContext, error: longContextError } = await student.client
      .from('content_feedback')
      .insert(feedbackRow(profile.id, {
        scope: 'passage', quoted_passage: 'A short quote.', passage_context: 'x'.repeat(2001), topic_no: 8,
      }))
      .select();
    expect(longContextError).toBeTruthy();
    expect(longContext).toBeNull();
  });

  test('a reader cannot SELECT another reader\'s row, nor UPDATE any row including their own', async () => {
    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    const { data: profileA } = await studentA.client.from('profiles').select('id').single();
    createdProfileIds.push(profileA.id);
    const { data: rowA } = await studentA.client
      .from('content_feedback')
      .insert(feedbackRow(profileA.id, { topic_no: 9 }))
      .select()
      .single();

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);

    const { data: seenByB } = await studentB.client
      .from('content_feedback').select('*').eq('id', rowA.id);
    expect(seenByB).toHaveLength(0);

    // Neither B nor A (the author) may UPDATE — no reader UPDATE policy exists.
    const { data: updateByB, error: updateByBError } = await studentB.client
      .from('content_feedback').update({ comment: 'hijacked' }).eq('id', rowA.id).select();
    expect(updateByBError).toBeNull();
    expect(updateByB).toHaveLength(0);

    const { data: updateByOwner, error: updateByOwnerError } = await studentA.client
      .from('content_feedback').update({ comment: 'edited by author' }).eq('id', rowA.id).select();
    expect(updateByOwnerError).toBeNull();
    expect(updateByOwner).toHaveLength(0);
  });
});
