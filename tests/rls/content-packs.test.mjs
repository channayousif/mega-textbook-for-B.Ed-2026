import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers } from './_helpers.mjs';

// Feature 038 (ADR-0040): content packs are admin-read-only and written only through the RPCs; the
// upload bucket is admin-only, refuses video and requires a real pack id and stage in the path.
const COURSE = 'zzrls-960';

describe.skipIf(!rlsConfigured)('content packs', () => {
  const created = [];
  const uploaded = [];
  const svc = () => serviceClient();
  afterAll(async () => {
    if (uploaded.length) await svc().storage.from('content-pack-uploads').remove(uploaded);
    await svc().from('content_packs').delete().eq('course', COURSE);
    await cleanupUsers(created);
  });

  test('admin-only reads, RPC-only writes, validated stages and links, audited events', async () => {
    const admin = await createSignedInUser({ role: 'student' }); created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const teacher = await createSignedInUser({ role: 'teacher' }); created.push(teacher.authUserId);

    // Only an admin creates; a second pack for the same topic is refused.
    expect((await teacher.client.rpc('create_content_pack', { p_course: COURSE, p_unit: 1, p_topic: 1, p_track: 'bed', p_title: 'Test topic' })).error).toBeTruthy();
    const made = await admin.client.rpc('create_content_pack', { p_course: COURSE, p_unit: 1, p_topic: 1, p_track: 'bed', p_title: 'Test topic' });
    expect(made.error).toBeNull();
    const id = made.data;
    expect((await admin.client.rpc('create_content_pack', { p_course: COURSE, p_unit: 1, p_topic: 1, p_track: 'bed', p_title: 'Again' })).error).toBeTruthy();
    expect((await admin.client.rpc('create_content_pack', { p_course: 'Not A Course', p_unit: 1, p_topic: 2, p_track: 'bed', p_title: 'Bad' })).error).toBeTruthy();

    // Admin reads; a teacher reads nothing. No direct client writes, even for an admin.
    expect((await admin.client.from('content_packs').select('id').eq('id', id)).data).toHaveLength(1);
    expect((await teacher.client.from('content_packs').select('id').eq('id', id)).data).toEqual([]);
    expect((await admin.client.from('content_packs').update({ title: 'x' }).eq('id', id)).error).toBeTruthy();
    expect((await admin.client.from('content_pack_events').insert({ pack_id: id, action: 'stage' })).error).toBeTruthy();
    expect((await admin.client.from('content_packs').select('title').eq('id', id)).data[0].title).toBe('Test topic');

    // Stages: known keys and statuses only; skipping needs a reason; a teacher cannot set one.
    expect((await admin.client.rpc('set_content_pack_stage', { p_pack: id, p_stage: 'script', p_status: 'done' })).error).toBeNull();
    expect((await admin.client.rpc('set_content_pack_stage', { p_pack: id, p_stage: 'teaser', p_status: 'done' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_stage', { p_pack: id, p_stage: 'qa', p_status: 'finished' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_stage', { p_pack: id, p_stage: 'flow', p_status: 'skipped' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_stage', { p_pack: id, p_stage: 'flow', p_status: 'skipped', p_note: 'no character shots in this topic' })).error).toBeNull();
    expect((await teacher.client.rpc('set_content_pack_stage', { p_pack: id, p_stage: 'qa', p_status: 'done' })).error).toBeTruthy();

    // Links: https only, shorts an array, playlist an id; null removes.
    expect((await admin.client.rpc('set_content_pack_link', { p_pack: id, p_key: 'longform', p_value: 'https://youtu.be/abcdefghijk' })).error).toBeNull();
    expect((await admin.client.rpc('set_content_pack_link', { p_pack: id, p_key: 'longform', p_value: 'http://example.com' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_link', { p_pack: id, p_key: 'shorts', p_value: ['https://youtube.com/shorts/abcdefghijk'] })).error).toBeNull();
    expect((await admin.client.rpc('set_content_pack_link', { p_pack: id, p_key: 'shorts', p_value: 'https://youtube.com/shorts/abcdefghijk' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_link', { p_pack: id, p_key: 'playlist', p_value: 'not-a-playlist' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_link', { p_pack: id, p_key: 'teaser', p_value: 'https://youtu.be/abcdefghijk' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_watermark', { p_pack: id, p_value: 'blurred' })).error).toBeTruthy();
    expect((await admin.client.rpc('set_content_pack_watermark', { p_pack: id, p_value: 'off-official' })).error).toBeNull();

    const row = (await admin.client.from('content_packs').select('stages,links,watermark_toggle').eq('id', id)).data[0];
    expect(row.stages.script.status).toBe('done');
    expect(row.stages.flow).toMatchObject({ status: 'skipped', note: 'no character shots in this topic' });
    expect(row.links).toMatchObject({ longform: 'https://youtu.be/abcdefghijk', shorts: ['https://youtube.com/shorts/abcdefghijk'] });
    expect(row.watermark_toggle).toBe('off-official');

    // Every accepted write is logged; a teacher sees no events.
    const events = (await admin.client.from('content_pack_events').select('action,stage').eq('pack_id', id)).data;
    expect(events.map((e) => e.action).sort()).toEqual(['create', 'link', 'link', 'stage', 'stage', 'watermark']);
    expect((await teacher.client.from('content_pack_events').select('id').eq('pack_id', id)).data).toEqual([]);

    // Bucket: admin uploads under {pack}/{stage}/; bad paths, video and non-admins are refused.
    const png = new Blob([new Uint8Array([137, 80, 78, 71])], { type: 'image/png' });
    const good = `${id}/static/shot-${Date.now()}.png`;
    const up = await admin.client.storage.from('content-pack-uploads').upload(good, png, { contentType: 'image/png' });
    expect(up.error).toBeNull(); uploaded.push(good);
    expect((await admin.client.storage.from('content-pack-uploads').upload(`${id}/nowhere/x.png`, png, { contentType: 'image/png' })).error).toBeTruthy();
    expect((await admin.client.storage.from('content-pack-uploads').upload(`00000000-0000-0000-0000-000000000000/static/x.png`, png, { contentType: 'image/png' })).error).toBeTruthy();
    expect((await admin.client.storage.from('content-pack-uploads').upload(`${id}/longform/x.mp4`, new Blob([new Uint8Array(8)], { type: 'video/mp4' }), { contentType: 'video/mp4' })).error).toBeTruthy();
    expect((await teacher.client.storage.from('content-pack-uploads').upload(`${id}/static/t.png`, png, { contentType: 'image/png' })).error).toBeTruthy();
    expect((await teacher.client.storage.from('content-pack-uploads').download(good)).error).toBeTruthy();
    expect((await admin.client.storage.from('content-pack-uploads').download(good)).error).toBeNull();
  });
});
