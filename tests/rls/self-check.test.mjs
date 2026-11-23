import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, anonClient, serviceClient, cleanupUsers } from './_helpers.mjs';

// Feature 032 phase C (migration 0055): the unit self-check. Questions are public without the key;
// marking needs sign-in, returns score and wrong item numbers only, and is capped per unit per day.
// The fixture uses an impossible course code so it never collides with imported units.
const COURSE = 'ZZRL-999';
const UNIT = 1;
const rows = [1, 2, 3].map((n) => ({ course_code: COURSE, unit_no: UNIT, locale: 'en', item_no: n,
  question_text: `ZZRLS question ${n}`, options: { a: 'one', b: 'two', c: 'three' }, correct_option: ['a', 'b', 'c'][n - 1] }));

describe.skipIf(!rlsConfigured)('self_check', () => {
  const created = [];
  afterAll(async () => {
    const svc = serviceClient();
    await svc.from('self_check_attempts').delete().eq('course_code', COURSE);
    await svc.from('self_check_items').delete().eq('course_code', COURSE);
    await cleanupUsers(created);
  });

  test('questions are public without the key; the table is closed to clients', async () => {
    const svc = serviceClient();
    expect((await svc.from('self_check_items').upsert(rows, { onConflict: 'course_code,unit_no,locale,item_no' })).error).toBeNull();
    const anon = anonClient();
    const { data, error } = await anon.rpc('self_check_questions', { p_course: COURSE, p_unit: UNIT, p_locale: 'en' });
    expect(error).toBeNull();
    expect(data.map((q) => q.item_no)).toEqual([1, 2, 3]);
    expect(JSON.stringify(data)).not.toContain('correct_option');
    const learner = await createSignedInUser({ role: 'student' }); created.push(learner.authUserId);
    for (const client of [anon, learner.client]) {
      const r = await client.from('self_check_items').select('correct_option').eq('course_code', COURSE);
      expect(r.error || (r.data ?? []).length === 0).toBeTruthy();
      expect((await client.from('self_check_items').insert({ ...rows[0], item_no: 9 })).error).toBeTruthy();
    }
  });

  test('marking needs sign-in, returns score and wrong numbers only, and stops after five a day', async () => {
    const anon = anonClient();
    expect((await anon.rpc('check_self_quiz', { p_course: COURSE, p_unit: UNIT, p_locale: 'en', p_answers: { 1: 'a' } })).error).toBeTruthy();
    const learner = await createSignedInUser({ role: 'student' }); created.push(learner.authUserId);
    const first = await learner.client.rpc('check_self_quiz', { p_course: COURSE, p_unit: UNIT, p_locale: 'en', p_answers: { 1: 'a', 2: 'c', 3: 'c' } });
    expect(first.error).toBeNull();
    expect(first.data).toEqual({ score: 2, total: 3, wrong: [2], attempts_left: 4 });
    for (let i = 0; i < 4; i++) {
      expect((await learner.client.rpc('check_self_quiz', { p_course: COURSE, p_unit: UNIT, p_locale: 'en', p_answers: { 1: 'b' } })).error).toBeNull();
    }
    const sixth = await learner.client.rpc('check_self_quiz', { p_course: COURSE, p_unit: UNIT, p_locale: 'en', p_answers: { 1: 'a' } });
    expect(sixth.error?.message).toMatch(/daily limit/);
    // A learner reads only their own attempts.
    const other = await createSignedInUser({ role: 'student' }); created.push(other.authUserId);
    const { data } = await other.client.from('self_check_attempts').select('id').eq('course_code', COURSE);
    expect(data ?? []).toEqual([]);
  });
});
