/**
 * Spec 011 US6 / FR-014 - quiz_items + answer_keys WRITE policies (migration 0040).
 *
 * A verified teacher can INSERT/UPDATE/DELETE quiz_items and answer_keys; an unverified
 * teacher and a student are refused every verb. quiz_items_public still hides
 * correct_option (unchanged from Spec 003).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('quiz authoring write policies', () => {
  const createdUsers = [];
  const createdItemIds = [];
  const createdKeyIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    if (createdItemIds.length) await svc.from('quiz_items').delete().in('id', createdItemIds);
    if (createdKeyIds.length) await svc.from('answer_keys').delete().in('id', createdKeyIds);
    await cleanupUsers(createdUsers);
  });

  test('a verified teacher can create, edit, and delete a quiz item', async () => {
    const t = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(t.authUserId);
    await adminSet(t.authUserId, { verified_teacher: true });

    const { data: item, error: insErr } = await t.client
      .from('quiz_items')
      .insert({
        course_code: 'EFMP-302', unit_no: 1,
        question_text: 'Which is a feature of a profession?',
        options: [{ key: 'A', text: 'A code of conduct' }, { key: 'B', text: 'A uniform' }],
        correct_option: 'A',
      })
      .select()
      .single();
    expect(insErr).toBeNull();
    createdItemIds.push(item.id);

    const { error: updErr } = await t.client
      .from('quiz_items').update({ correct_option: 'B' }).eq('id', item.id);
    expect(updErr).toBeNull();

    const { error: delErr } = await t.client.from('quiz_items').delete().eq('id', item.id);
    expect(delErr).toBeNull();
  });

  test('a verified teacher can upsert an answer key', async () => {
    const t = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(t.authUserId);
    await adminSet(t.authUserId, { verified_teacher: true });

    const { data: key, error } = await t.client
      .from('answer_keys')
      .insert({ course_code: 'EFMP-302', unit_no: 1, kind: 'summative', content: 'Model answers…' })
      .select()
      .single();
    expect(error).toBeNull();
    createdKeyIds.push(key.id);

    const { error: updErr } = await t.client
      .from('answer_keys').update({ content: 'Revised model answers…' }).eq('id', key.id);
    expect(updErr).toBeNull();
  });

  test('an unverified teacher cannot write quiz_items or answer_keys', async () => {
    const t = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(t.authUserId);

    const { error: qi } = await t.client
      .from('quiz_items')
      .insert({ course_code: 'EFMP-302', unit_no: 2, question_text: 'x', options: [], correct_option: 'A' })
      .select();
    expect(qi).toBeTruthy();

    const { error: ak } = await t.client
      .from('answer_keys')
      .insert({ course_code: 'EFMP-302', unit_no: 2, kind: 'formative', content: 'x' })
      .select();
    expect(ak).toBeTruthy();
  });

  test('a student cannot write quiz_items or answer_keys', async () => {
    const s = await createSignedInUser({ role: 'student' });
    createdUsers.push(s.authUserId);

    const { error: qi } = await s.client
      .from('quiz_items')
      .insert({ course_code: 'EFMP-302', unit_no: 3, question_text: 'x', options: [], correct_option: 'A' })
      .select();
    expect(qi).toBeTruthy();

    const { error: ak } = await s.client
      .from('answer_keys')
      .insert({ course_code: 'EFMP-302', unit_no: 3, kind: 'formative', content: 'x' })
      .select();
    expect(ak).toBeTruthy();
  });

  test('quiz_items_public still hides correct_option', async () => {
    const svc = serviceClient();
    const { data: item } = await svc
      .from('quiz_items')
      .insert({
        course_code: 'EFMP-302', unit_no: 4, question_text: 'hidden?',
        options: [{ key: 'A', text: 'a' }], correct_option: 'A',
      })
      .select()
      .single();
    createdItemIds.push(item.id);

    const s = await createSignedInUser({ role: 'student' });
    createdUsers.push(s.authUserId);
    const { data: pub } = await s.client
      .from('quiz_items_public').select('*').eq('id', item.id).single();
    expect(pub).toBeTruthy();
    expect(pub.correct_option).toBeUndefined();
  });
});
