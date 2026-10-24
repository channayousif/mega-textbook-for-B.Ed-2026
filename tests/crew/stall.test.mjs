import test from 'node:test';
import assert from 'node:assert/strict';
import { noteStall, clearStall, stallAlertDue, heldFor, stallLine } from '../../scripts/crew/stall.mjs';

const at = (iso) => Date.parse(iso);

test('noteStall: keeps the start time while the reason holds, restarts it on a new reason', () => {
  const control = { diskAlertAt: '2026-10-22T00:00:00Z' };
  noteStall(control, 'disk', '6.5 GB free', at('2026-10-22T10:00:00Z'));
  noteStall(control, 'disk', '6.4 GB free', at('2026-10-23T10:00:00Z'));
  assert.equal(control.launchStall.since, '2026-10-22T10:00:00.000Z');
  assert.equal(control.launchStall.detail, '6.4 GB free');
  assert.equal(control.diskAlertAt, undefined, 'the old disk alert key is dropped');
  noteStall(control, 'memory', '2000 MB available', at('2026-10-23T11:00:00Z'));
  assert.equal(control.launchStall.since, '2026-10-23T11:00:00.000Z');
});

test('stallAlertDue: disk alerts at once, memory only after an hour, both repeat every 6 h', () => {
  const disk = { reason: 'disk', since: '2026-10-22T10:00:00Z' };
  assert.equal(stallAlertDue(disk, at('2026-10-22T10:00:00Z')), true);
  disk.alertedAt = '2026-10-22T10:00:00Z';
  assert.equal(stallAlertDue(disk, at('2026-10-22T15:59:00Z')), false);
  assert.equal(stallAlertDue(disk, at('2026-10-22T16:00:00Z')), true);
  const mem = { reason: 'memory', since: '2026-10-22T10:00:00Z' };
  assert.equal(stallAlertDue(mem, at('2026-10-22T10:30:00Z')), false);
  assert.equal(stallAlertDue(mem, at('2026-10-22T11:00:00Z')), true);
  assert.equal(stallAlertDue(null), false);
});

test('clearStall returns the ended hold; stallLine reports how long launches were held', () => {
  const control = {};
  noteStall(control, 'disk', '6.5 GB free, floor 8 GB', at('2026-10-22T22:00:00Z'));
  assert.equal(stallLine(control.launchStall, at('2026-10-24T11:00:00Z')), 'launches held 37h (disk: 6.5 GB free, floor 8 GB)');
  assert.equal(heldFor(control.launchStall, at('2026-10-22T22:45:00Z')), '45m');
  const ended = clearStall(control);
  assert.equal(ended.reason, 'disk');
  assert.equal(control.launchStall, undefined);
  assert.equal(clearStall(control), null);
  assert.equal(stallLine(undefined), '');
});
