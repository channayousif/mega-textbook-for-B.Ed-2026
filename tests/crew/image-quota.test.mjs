import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { IMAGE_QUOTA_RE, QUOTA_RE, imageQuotaReset, workFiles } from '../../scripts/crew/workers.mjs';
import { activeImageQuota, recordImageQuota, clearImageQuota, UNKNOWN_RESET_HOURS } from '../../scripts/lib/image-quota.mjs';

// The handoff giss-401-u06-illustrate-r1 left on 2026-11-16 after a PHR-only run.
const HANDOFF = 'CREW-HANDOFF: Upstream image generation quota on gemini-3.1-flash-image remains exhausted until 2026-11-17T11:00:06Z; GISS-401 Unit 6 illustration manifests remain preserved at prompt-only.';

test('image quota messages are recognised and their reset time read', () => {
  assert.ok(IMAGE_QUOTA_RE.test(HANDOFF));
  assert.ok(IMAGE_QUOTA_RE.test('✗ image quota exhausted (QUOTA_EXHAUSTED); resets at 2026-11-17T11:00:06Z.'));
  assert.equal(imageQuotaReset(HANDOFF), '2026-11-17T11:00:06Z');
  assert.equal(imageQuotaReset('resets at 2026-11-17T11:00:06.123Z'), '2026-11-17T11:00:06.123Z');
  assert.equal(imageQuotaReset('no time here'), null);
  assert.ok(!IMAGE_QUOTA_RE.test('Placed fig-U2-6 and fig-U2-7; check:content passes.'));
  assert.ok(QUOTA_RE.test(HANDOFF), 'the generic worker regex also sees it, so the image check must run first');
});

test('a PHR alone is not work', () => {
  assert.deepEqual(workFiles(['history/prompts/giss-401/crew-giss-401-u06-illustrate.misc.prompt.md', '']), []);
  assert.deepEqual(workFiles(['.crew/brief.md', 'history/prompts/x.md']), []);
  assert.deepEqual(workFiles(['history/prompts/x.md', 'static/img/figures/giss-401/unit-06/fig-U6-9.webp']), ['static/img/figures/giss-401/unit-06/fig-U6-9.webp']);
});

test('the quota record holds until its reset, then lapses', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'iq-')), 'sub', 'image-quota.json');
  const t0 = Date.parse('2026-11-16T12:00:00Z');
  assert.equal(activeImageQuota(file, t0), null);
  recordImageQuota('2026-11-17T11:00:06Z', 'gemini-3.1-flash-image', file, t0);
  assert.equal(activeImageQuota(file, t0).resetAt, '2026-11-17T11:00:06.000Z');
  assert.equal(activeImageQuota(file, Date.parse('2026-11-17T11:00:07Z')), null);
  clearImageQuota(file);
  assert.equal(activeImageQuota(file, t0), null);
});

test('an unknown or past reset time falls back to a fixed hold', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'iq-')), 'image-quota.json');
  const t0 = Date.parse('2026-11-16T12:00:00Z');
  for (const bad of [null, 'unknown', '2026-11-15T00:00:00Z']) {
    const rec = recordImageQuota(bad, undefined, file, t0);
    assert.equal(Date.parse(rec.resetAt), t0 + UNKNOWN_RESET_HOURS * 3600e3);
  }
});
