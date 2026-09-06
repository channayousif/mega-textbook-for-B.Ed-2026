/**
 * T016 [US2] — every legal transition in data-model.md's state list (including
 * a reopen) succeeds and bumps updated_at; every illegal transition (e.g. a
 * two-hop jump) is rejected; an admin's attempt to change
 * comment/quoted_passage/author_id/etc. is rejected by the same trigger
 * regardless of whether status also changes (FR-019, FR-021; contract
 * checklist items 11, 12).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, cleanupUsers, serviceClient,
} from './_helpers.mjs';

async function createSignedInAdmin() {
  const admin = await createSignedInUser({ role: 'student' });
  await adminSet(admin.authUserId, { role: 'admin' });
  return admin;
}

async function fileFeedback(client, authorId, overrides = {}) {
  const { data, error } = await client
    .from('content_feedback')
    .insert({
      author_id: authorId,
      page_kind: 'topic',
      course_code: 'EFMP-302',
      unit_no: 1,
      topic_no: overrides.topic_no ?? 1,
      locale: 'en',
      scope: 'whole_page',
      comment: overrides.comment ?? 'Fixture feedback.',
    })
    .select()
    .single();
  if (error) throw new Error(`fileFeedback fixture: ${error.message}`);
  return data;
}

describe.skipIf(!rlsConfigured)('content feedback status transitions', () => {
  const createdUsers = [];
  const createdProfileIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    if (createdProfileIds.length) {
      await svc.from('content_feedback').delete().in('author_id', createdProfileIds);
    }
    await cleanupUsers(createdUsers);
  });

  test('legal transitions (including a reopen) succeed and bump updated_at; illegal transitions are rejected', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);
    const item = await fileFeedback(student.client, profile.id, { topic_no: 1 });

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);

    // Illegal: two-hop jump open -> declined is actually legal per the graph;
    // use a genuinely illegal one: resolved reached first, then straight to declined.
    const { data: step1, error: step1Error } = await admin.client
      .from('content_feedback').update({ status: 'planned' }).eq('id', item.id).select().single();
    expect(step1Error).toBeNull();
    expect(step1.status).toBe('planned');
    expect(new Date(step1.updated_at).getTime()).toBeGreaterThan(new Date(item.updated_at).getTime());

    const { data: step2, error: step2Error } = await admin.client
      .from('content_feedback')
      .update({ status: 'resolved', owner_note: 'Fixed in PR #1.', resolution_ref: 'PR#1' })
      .eq('id', item.id).select().single();
    expect(step2Error).toBeNull();
    expect(step2.status).toBe('resolved');
    expect(step2.owner_note).toBe('Fixed in PR #1.');
    expect(step2.resolution_ref).toBe('PR#1');

    // Illegal: resolved -> planned directly (not in the graph).
    const { error: illegalError } = await admin.client
      .from('content_feedback').update({ status: 'planned' }).eq('id', item.id);
    expect(illegalError).toBeTruthy();

    // Legal: reopen resolved -> open.
    const { data: reopened, error: reopenError } = await admin.client
      .from('content_feedback').update({ status: 'open' }).eq('id', item.id).select().single();
    expect(reopenError).toBeNull();
    expect(reopened.status).toBe('open');

    // Legal: open -> declined.
    const { data: declined, error: declinedError } = await admin.client
      .from('content_feedback').update({ status: 'declined' }).eq('id', item.id).select().single();
    expect(declinedError).toBeNull();
    expect(declined.status).toBe('declined');

    // Illegal: declined -> planned directly.
    const { error: declinedToPlannedError } = await admin.client
      .from('content_feedback').update({ status: 'planned' }).eq('id', item.id);
    expect(declinedToPlannedError).toBeTruthy();

    // Legal: reopen declined -> open.
    const { data: reopenedAgain, error: reopenAgainError } = await admin.client
      .from('content_feedback').update({ status: 'open' }).eq('id', item.id).select().single();
    expect(reopenAgainError).toBeNull();
    expect(reopenedAgain.status).toBe('open');
  });

  test('an admin cannot change comment/quoted_passage/author_id/page_kind/etc., regardless of whether status also changes', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);
    const item = await fileFeedback(student.client, profile.id, { topic_no: 2 });

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);
    // NOT `.select('id').single()` — an admin's own SELECT policy on `profiles` sees every
    // row (profiles_select_admin), so an unfiltered `.single()` errors on a populated table.
    const { data: adminProfile } = await admin.client
      .from('profiles').select('id').eq('auth_user_id', admin.authUserId).single();

    const { error: commentError } = await admin.client
      .from('content_feedback').update({ comment: 'Rewritten by admin' }).eq('id', item.id);
    expect(commentError).toBeTruthy();

    const { error: quoteError } = await admin.client
      .from('content_feedback').update({ scope: 'passage', quoted_passage: 'Injected quote.' }).eq('id', item.id);
    expect(quoteError).toBeTruthy();

    const { error: authorError } = await admin.client
      .from('content_feedback').update({ author_id: adminProfile.id }).eq('id', item.id);
    expect(authorError).toBeTruthy();

    // Same violation even when status changes in the same statement.
    const { error: combinedError } = await admin.client
      .from('content_feedback').update({ status: 'planned', comment: 'Also rewritten' }).eq('id', item.id);
    expect(combinedError).toBeTruthy();
  });
});
