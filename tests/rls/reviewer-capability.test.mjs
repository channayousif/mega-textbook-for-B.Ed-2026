/**
 * T010-T014 - the `reviewer` capability's five database-surface assertions
 * (spec.md SC1, SC2, SC5; data-model.md `is_reviewer()`):
 *  - an admin grants and revokes, and both directions land in privilege_audit
 *  - a non-admin self-grant RAISES (the 0044 guard branch), and a non-admin
 *    grant on someone else's row is a 0-row no-op (RLS filters before the
 *    trigger runs)
 *  - is_reviewer() goes false the moment the holder is suspended or deleted,
 *    read over RPC as the holder's own client, because the review surface
 *    trusts the database's answer and not the cached profile column
 *  - holding `reviewer` grants no new write anywhere
 *  - `reviewer` keeps exactly the content_feedback insert every authenticated
 *    account already has
 *
 * Two of SC5's five originally-listed assertions are absent on purpose: the
 * queue is a build-time JSON artefact and certifications are Git files, so
 * neither is a row anybody could alter. They are covered structurally by the
 * no-new-write test and by Git history. spec.md SC5 says so directly.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, serviceClient,
  cleanupUsers, expectPermissionError,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('reviewer capability - grant, audit, suspension, and blast radius', () => {
  const created = [];
  const createdFeedbackAuthors = [];

  afterAll(async () => {
    if (createdFeedbackAuthors.length) {
      await serviceClient().from('content_feedback').delete().in('author_id', createdFeedbackAuthors);
    }
    await cleanupUsers(created);
  });

  /** An admin client, for the assertions about who MAY grant. */
  async function makeAdmin() {
    const admin = await createSignedInUser({ role: 'student' });
    created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    return admin;
  }

  async function auditRows(subjectProfileId) {
    const svc = serviceClient();
    const { data, error } = await svc
      .from('privilege_audit')
      .select('*')
      .eq('subject_id', subjectProfileId)
      .eq('change_type', 'reviewer')
      .order('created_at', { ascending: true });
    if (error) throw new Error(`auditRows: ${error.message}`);
    return data ?? [];
  }

  // T010 (SC1, FR-001)
  test('an admin grants and revokes, and both directions land in privilege_audit', async () => {
    const admin = await makeAdmin();
    const adminProfile = await getProfileByAuthId(admin.authUserId);
    const subject = await createSignedInUser({ role: 'teacher' });
    created.push(subject.authUserId);
    const subjectProfile = await getProfileByAuthId(subject.authUserId);

    const { error: grantError } = await admin.client
      .from('profiles').update({ reviewer: true }).eq('id', subjectProfile.id);
    expect(grantError).toBeNull();

    const { error: revokeError } = await admin.client
      .from('profiles').update({ reviewer: false }).eq('id', subjectProfile.id);
    expect(revokeError).toBeNull();

    const rows = await auditRows(subjectProfile.id);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ old_value: 'false', new_value: 'true', actor_id: adminProfile.id });
    expect(rows[1]).toMatchObject({ old_value: 'true', new_value: 'false', actor_id: adminProfile.id });
  });

  // T011 (SC1, FR-001) - the branch 0044 had to add. Without it this passes.
  test('a non-admin cannot self-grant, and cannot grant on another row', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);

    const { error: selfError } = await user.client
      .from('profiles').update({ reviewer: true }).eq('auth_user_id', user.authUserId);
    expectPermissionError(selfError, expect);
    expect((selfError.message ?? '').toLowerCase()).toContain('reviewer');

    const victim = await createSignedInUser({ role: 'teacher' });
    created.push(victim.authUserId);
    const victimProfile = await getProfileByAuthId(victim.authUserId);

    // A 0-row no-op, not a raise: RLS filters the row out before the trigger runs.
    const { error: otherError } = await user.client
      .from('profiles').update({ reviewer: true }).eq('id', victimProfile.id);
    expect(otherError).toBeNull();
    expect((await getProfileByAuthId(victim.authUserId)).reviewer).toBe(false);
  });

  // T012 (SC2, FR-002)
  test('is_reviewer() goes false the moment the holder is suspended or deleted', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    await adminSet(user.authUserId, { reviewer: true });

    const active = await user.client.rpc('is_reviewer');
    expect(active.error).toBeNull();
    expect(active.data).toBe(true);

    await adminSet(user.authUserId, { status: 'suspended' });
    const suspended = await user.client.rpc('is_reviewer');
    expect(suspended.error).toBeNull();
    expect(suspended.data, 'a suspended reviewer must lose the capability').toBe(false);

    await adminSet(user.authUserId, { status: 'active', deleted_at: new Date().toISOString() });
    const deleted = await user.client.rpc('is_reviewer');
    expect(deleted.error).toBeNull();
    expect(deleted.data, 'a deleted reviewer must lose the capability').toBe(false);
  });

  // T013 (FR-003, SC5) - the blast radius, asserted structurally because
  // certifications and the queue are not rows.
  test('holding reviewer grants no new write anywhere', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    await adminSet(user.authUserId, { reviewer: true });

    const victim = await createSignedInUser({ role: 'student' });
    created.push(victim.authUserId);
    const victimProfile = await getProfileByAuthId(victim.authUserId);

    // Still cannot touch another profile.
    const { error: profileError } = await user.client
      .from('profiles').update({ full_name: 'Renamed By Reviewer' }).eq('id', victimProfile.id);
    expect(profileError).toBeNull(); // invisible row, 0-row no-op
    expect((await getProfileByAuthId(victim.authUserId)).full_name).not.toBe('Renamed By Reviewer');

    // Still cannot grant a capability to themselves.
    const { error: selfGrant } = await user.client
      .from('profiles').update({ verified_teacher: true }).eq('auth_user_id', user.authUserId);
    expectPermissionError(selfGrant, expect);

    // Still cannot write the audit table.
    const { error: auditError } = await user.client
      .from('privilege_audit')
      .insert({ subject_id: victimProfile.id, change_type: 'reviewer', old_value: 'false', new_value: 'true' });
    expect(auditError, 'privilege_audit has no client INSERT policy').toBeTruthy();

    // Still not a verified teacher: the capability is orthogonal, not cumulative,
    // so it must not reach the answer-key store (Art. V.3, IX.3).
    const { error: answerKeyError } = await user.client.from('answer_keys').insert({
      course_code: 'EFMP-302', unit_no: 1, kind: 'formative', content: 'T013 must not land.',
    });
    expect(answerKeyError, 'reviewer must not reach the answer-key store').toBeTruthy();

    const { data: keys, error: keyReadError } = await user.client
      .from('answer_keys').select('id').limit(1);
    expect(keyReadError ?? null).toBeNull();
    expect(keys ?? [], 'reviewer is not verified_teacher, so reads nothing here').toHaveLength(0);
  });

  // T014 (FR-008)
  test('a reviewer keeps exactly the content_feedback insert every account has', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    await adminSet(user.authUserId, { reviewer: true });

    const profile = await getProfileByAuthId(user.authUserId);
    createdFeedbackAuthors.push(profile.id);

    const { error } = await user.client.from('content_feedback').insert({
      author_id: profile.id,
      page_kind: 'topic',
      course_code: 'EFMP-302',
      unit_no: 1,
      topic_no: 1,
      locale: 'en',
      scope: 'whole_page',
      comment: 'Spec 017 T014 - reviewer inherits the authenticated insert.',
    });
    expect(error, error ? `content_feedback insert failed: ${error.message}` : undefined).toBeNull();
  });
});
