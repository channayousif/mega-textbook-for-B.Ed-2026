/**
 * Spec 011 FR-013 / migration 0057 - editing a class's details.
 *
 * The owning, eligible teacher can change `name` and `term_label`; `course_code` and
 * `teacher_id` stay admin-only; another teacher, a student and a suspended owner are refused.
 * Before 0057 the guard refused every non-admin name/term change, so the roster page's
 * "Edit details" form failed for every teacher.
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('class details edit (FR-013)', () => {
  const createdUsers = [];
  const createdClasses = [];
  const nameOf = async (id) => (await serviceClient().from('classes').select('name, term_label, course_code').eq('id', id).single()).data;

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('the owning teacher renames a class and changes its term', async () => {
    const t = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(t.authUserId);
    const klass = await createClassFixture(t.authUserId);
    createdClasses.push(klass.id);
    const { error } = await t.client.from('classes').update({ name: 'Renamed', term_label: 'Spring 2027' }).eq('id', klass.id);
    expect(error).toBeNull();
    expect(await nameOf(klass.id)).toMatchObject({ name: 'Renamed', term_label: 'Spring 2027' });
  });

  test('the owner still cannot change the course or hand the class to someone else', async () => {
    const t = await createSignedInUser({ role: 'teacher' });
    const other = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(t.authUserId, other.authUserId);
    const klass = await createClassFixture(t.authUserId);
    createdClasses.push(klass.id);
    const { error: courseErr } = await t.client.from('classes').update({ course_code: 'EFMP-302' }).eq('id', klass.id);
    expect(courseErr).toBeTruthy();
    const otherProfile = await getProfileByAuthId(other.authUserId);
    const { error: ownerErr } = await t.client.from('classes').update({ teacher_id: otherProfile.id }).eq('id', klass.id);
    expect(ownerErr).toBeTruthy();
    expect((await nameOf(klass.id)).course_code).toBe('EFMP-301');
  });

  test('another teacher, a student and a suspended owner cannot rename it', async () => {
    const owner = await createSignedInUser({ role: 'teacher' });
    const other = await createSignedInUser({ role: 'teacher' });
    const student = await createSignedInUser({ role: 'student' });
    const admin = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(owner.authUserId, other.authUserId, student.authUserId, admin.authUserId);
    const klass = await createClassFixture(owner.authUserId, { name: 'Original' });
    createdClasses.push(klass.id);

    await other.client.from('classes').update({ name: 'Hijacked' }).eq('id', klass.id);
    await student.client.from('classes').update({ name: 'Hijacked' }).eq('id', klass.id);
    expect((await nameOf(klass.id)).name).toBe('Original');

    await adminSet(admin.authUserId, { role: 'admin' });
    const ownerProfile = await getProfileByAuthId(owner.authUserId);
    await admin.client.from('profiles').update({ status: 'suspended' }).eq('id', ownerProfile.id);
    await owner.client.from('classes').update({ name: 'After suspension' }).eq('id', klass.id);
    expect((await nameOf(klass.id)).name).toBe('Original');
  });
});
