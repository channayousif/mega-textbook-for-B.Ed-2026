import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  decide, withinHours, nextOpen, cycleStart, limits, paceRecord, events, pace, PaceHold, DEFAULTS, CHANNELS, IMAGE_CHANNEL,
} from '../../scripts/media/pacing.mjs';
import { paced, QuotaError } from '../../scripts/media/producers/image.mjs';
import { produce } from '../../scripts/media/producers/index.mjs';
import { OUTSIDE_SERVICE_STAGES, STAGES } from '../../scripts/crew/workers.mjs';
import { socialDue, ROUNDUP_HOUR_PKT } from '../../scripts/crew/social.mjs';

// D-2026-0100: media hours 09:00-15:00 PKT (UTC+5), gaps with jitter, hourly and daily caps,
// Veo 200 credits a day until 1,000 in the cycle, then 50 a day.

const pkt = (iso) => Date.parse(`${iso}+05:00`); // a PKT wall-clock time as epoch ms
const lim = { hours: { ...DEFAULTS.hours }, cycleDay: 1, channels: { ...DEFAULTS.channels } };
const ev = (...items) => items.map(([iso, units = 1]) => ({ at: pkt(iso), units }));
const noJitter = () => 0;

test('media hours are 09:00-15:00 PKT and the next opening crosses the day boundary', () => {
  assert.equal(withinHours(pkt('2026-11-24T09:00:00')), true);
  assert.equal(withinHours(pkt('2026-11-24T14:59:00')), true);
  assert.equal(withinHours(pkt('2026-11-24T15:00:00')), false);
  assert.equal(withinHours(pkt('2026-11-24T08:59:00')), false);
  assert.equal(nextOpen(pkt('2026-11-24T07:00:00')), pkt('2026-11-24T09:00:00'));
  assert.equal(nextOpen(pkt('2026-11-24T16:00:00')), pkt('2026-11-25T09:00:00'));
  assert.equal(nextOpen(pkt('2026-11-30T23:30:00')), pkt('2026-12-01T09:00:00'));
});

test('outside hours every channel holds until 09:00', () => {
  for (const ch of CHANNELS) {
    const d = decide(ch, { nowMs: pkt('2026-11-24T20:00:00'), lim, random: noJitter });
    assert.equal(d.ok, false, ch);
    assert.equal(d.resetAt, new Date(pkt('2026-11-25T09:00:00')).toISOString());
    assert.match(d.reason, /outside media hours/);
  }
});

test('a short gap is slept, with jitter; a long one is a hold', () => {
  const now = pkt('2026-11-24T10:00:30');
  const d = decide('gflow.image', { events: ev(['2026-11-24T10:00:00']), nowMs: now, lim, random: noJitter });
  assert.deepEqual(d, { ok: true, waitMs: 60e3 }); // 90 s gap, 30 s already passed
  const j = decide('gflow.image', { events: ev(['2026-11-24T10:00:00']), nowMs: now, lim, random: () => 0.5 });
  assert.equal(j.waitMs, 90e3); // + half of the 60 s jitter
  const s = decide('social.facebook', { events: ev(['2026-11-24T10:00:00']), nowMs: pkt('2026-11-24T10:30:00'), lim, random: noJitter });
  assert.equal(s.ok, false);
  assert.equal(s.resetAt, new Date(pkt('2026-11-24T12:00:00')).toISOString());
});

test('hourly and daily caps hold until the window or the next day', () => {
  const twelve = Array.from({ length: 12 }, (_, i) => [`2026-11-24T10:${String(i * 4).padStart(2, '0')}:00`]);
  const h = decide('gflow.image', { events: ev(...twelve), nowMs: pkt('2026-11-24T10:50:00'), lim, random: noJitter });
  assert.equal(h.ok, false);
  assert.match(h.reason, /hourly cap of 12/);
  assert.equal(h.resetAt, new Date(pkt('2026-11-24T11:00:00')).toISOString());
  const forty = Array.from({ length: 40 }, (_, i) => [new Date(pkt('2026-11-24T09:00:00') + i * 8 * 60e3 + 5 * 3600e3).toISOString().slice(0, 19)]);
  const dcap = decide('gflow.image', { events: ev(...forty), nowMs: pkt('2026-11-24T14:50:00'), lim, random: noJitter });
  assert.equal(dcap.ok, false);
  assert.match(dcap.reason, /daily cap of 40/);
  assert.equal(dcap.resetAt, new Date(pkt('2026-11-25T09:00:00')).toISOString());
});

test('Veo spends credits: 200 a day while the pool lasts', () => {
  const day = Array.from({ length: 19 }, (_, i) => [`2026-11-24T09:${String(i * 3).padStart(2, '0')}:00`, 10]); // 190 credits
  assert.equal(decide('gflow.video', { units: 10, events: ev(...day), nowMs: pkt('2026-11-24T14:00:00'), lim, random: noJitter }).ok, true);
  const d = decide('gflow.video', { units: 20, events: ev(...day), nowMs: pkt('2026-11-24T14:00:00'), lim, random: noJitter });
  assert.equal(d.ok, false);
  assert.match(d.reason, /190 of 200/);
});

test('after 1,000 credits in the cycle Veo drops to 50 a day until the cycle day', () => {
  const spent = ev(['2026-11-03T10:00:00', 1000], ['2026-11-24T09:00:00', 50]);
  const d = decide('gflow.video', { units: 10, events: spent, nowMs: pkt('2026-11-24T12:00:00'), lim, random: noJitter });
  assert.equal(d.ok, false);
  assert.match(d.reason, /50 of 50/);
  const nextCycle = decide('gflow.video', { units: 10, events: spent, nowMs: pkt('2026-12-01T10:00:00'), lim, random: noJitter });
  assert.equal(nextCycle.ok, true);
  assert.equal(cycleStart(pkt('2026-11-24T12:00:00'), 1), pkt('2026-11-01T00:00:00'));
  assert.equal(cycleStart(pkt('2026-11-24T12:00:00'), 28), pkt('2026-10-28T00:00:00'));
});

test('the owner override file changes one channel and keeps the rest', () => {
  const dir = mkdtempSync(join(tmpdir(), 'pacing-'));
  const f = join(dir, 'limits.json');
  writeFileSync(f, JSON.stringify({ hours: { end: 17 }, cycleDay: 15, channels: { 'gflow.image': { perDayCount: 5 } } }));
  const l = limits(f);
  assert.equal(l.hours.start, 9);
  assert.equal(l.hours.end, 17);
  assert.equal(l.cycleDay, 15);
  assert.equal(l.channels['gflow.image'].perDayCount, 5);
  assert.equal(l.channels['gflow.image'].gapMs, DEFAULTS.channels['gflow.image'].gapMs);
});

test('the ledger records events and prunes ones older than 35 days', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'pacing-')), 'ledger.json');
  paceRecord('nlm.studio', 1, { file, nowMs: pkt('2026-10-01T10:00:00') });
  paceRecord('nlm.studio', 1, { file, nowMs: pkt('2026-11-24T10:00:00') });
  assert.deepEqual(events('nlm.studio', file).map((e) => e.at), [pkt('2026-11-24T10:00:00')]);
});

test('pace() sleeps a short gap and throws PaceHold on a hold', async () => {
  const file = join(mkdtempSync(join(tmpdir(), 'pacing-')), 'ledger.json');
  paceRecord('agy.image', 1, { file, nowMs: pkt('2026-11-24T10:00:00') });
  let slept = 0;
  await pace('agy.image', 1, { file, lim, nowMs: pkt('2026-11-24T10:00:20'), random: noJitter, sleep: async (ms) => { slept = ms; } });
  assert.equal(slept, 40e3);
  await assert.rejects(pace('agy.image', 1, { file, lim, nowMs: pkt('2026-11-24T18:00:00') }), PaceHold);
});

test('a paced image producer turns a hold into a QuotaError with the reset time', async () => {
  const recorded = [];
  const hold = paced('gflow', async () => ({ model: 'x' }), { pace: async () => { throw new PaceHold('gflow.image', 'paced: test', '2026-11-25T04:00:00.000Z'); }, record: (c) => recorded.push(c) });
  await assert.rejects(hold({}), (e) => e instanceof QuotaError && e.resetAt === '2026-11-25T04:00:00.000Z' && e.producer === 'gflow');
  assert.deepEqual(recorded, []);
  const ok = paced('agy', async () => ({ model: 'm' }), { pace: async () => ({ ok: true }), record: (c) => recorded.push(c) });
  assert.deepEqual(await ok({}), { model: 'm' });
  assert.deepEqual(recorded, [IMAGE_CHANNEL.agy]);
});

test('a paced clip hold is recorded and never falls back to the manual producer', async () => {
  const quotaFile = join(mkdtempSync(join(tmpdir(), 'pacing-')), 'quota.json');
  let manualCalled = false;
  const r = await produce('clip', {}, 1, {
    quotaFile,
    impls: {
      'gflow.video': async () => ({ status: 'quota', paced: true, resetAt: '2026-11-25T04:00:00.000Z', reason: 'paced: daily cap' }),
      'manual.flow': async () => { manualCalled = true; return { status: 'held', reason: 'make it by hand' }; },
    },
  });
  assert.equal(manualCalled, false);
  assert.equal(r.status, 'quota');
  assert.equal(r.producer, 'gflow.video');
});

test('every outside-service stage exists, and the roundup runs inside media hours', () => {
  for (const s of OUTSIDE_SERVICE_STAGES) assert.ok(s in STAGES || s === 'social_roundup', s);
  assert.ok(ROUNDUP_HOUR_PKT >= DEFAULTS.hours.start && ROUNDUP_HOUR_PKT < DEFAULTS.hours.end);
  const hours = DEFAULTS.hours;
  assert.equal(socialDue({ on: true, now: new Date(pkt('2026-11-24T13:30:00')), fresh: true, hours }), 'roundup');
  assert.equal(socialDue({ on: true, now: new Date(pkt('2026-11-24T18:30:00')), fresh: true, hours }), null);
  assert.equal(socialDue({ on: true, now: new Date(pkt('2026-11-24T08:00:00')), toPublish: 1, hours }), null);
  assert.equal(socialDue({ on: true, now: new Date(pkt('2026-11-24T10:00:00')), toPublish: 1, hours }), 'publish');
});
