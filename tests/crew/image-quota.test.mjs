import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { IMAGE_QUOTA_RE, QUOTA_RE, imageQuotaReset, imageQuotaProducer, workFiles } from '../../scripts/crew/workers.mjs';
import { activeImageQuota, recordImageQuota, clearImageQuota, availableProducers, producerStatus, FALLBACK_HOURS, PRODUCERS } from '../../scripts/lib/image-quota.mjs';

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

const tmpFile = () => join(mkdtempSync(join(tmpdir(), 'iq-')), 'sub', 'image-quota.json');
const T0 = Date.parse('2026-11-16T12:00:00Z');
const up = () => true;
const down = (p) => p !== 'gflow';

test('each producer keeps its own record, which holds until its reset and then lapses', () => {
  const file = tmpFile();
  assert.equal(activeImageQuota('agy', file, T0), null);
  recordImageQuota('agy', '2026-11-17T11:00:06Z', 'gemini-3.1-flash-image', file, T0);
  assert.equal(activeImageQuota('agy', file, T0).resetAt, '2026-11-17T11:00:06.000Z');
  assert.equal(activeImageQuota('codex', file, T0), null, 'agy running out says nothing about codex');
  assert.equal(activeImageQuota('agy', file, Date.parse('2026-11-17T11:00:07Z')), null);
  recordImageQuota('codex', null, undefined, file, T0);
  clearImageQuota('agy', file);
  assert.equal(activeImageQuota('agy', file, T0), null);
  assert.ok(activeImageQuota('codex', file, T0), 'clearing one producer keeps the others');
});

test('the single-record file written by PR #629 reads as agy', () => {
  const file = tmpFile();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ resetAt: '2026-11-17T11:00:06.000Z', model: 'gemini-3.1-flash-image' }));
  assert.equal(activeImageQuota('agy', file, T0).model, 'gemini-3.1-flash-image');
  assert.equal(activeImageQuota('gflow', file, T0), null);
});

test('an unknown or past reset time falls back to the producer hold (gflow quotas are daily)', () => {
  const file = tmpFile();
  for (const p of PRODUCERS) {
    for (const bad of [null, 'unknown', '2026-11-15T00:00:00Z']) {
      const rec = recordImageQuota(p, bad, undefined, file, T0);
      assert.equal(Date.parse(rec.resetAt), T0 + FALLBACK_HOURS[p] * 3600e3);
    }
  }
  assert.equal(FALLBACK_HOURS.gflow, 24);
});

test('producers are offered agy, gflow, codex; out of quota or offline ones drop out', () => {
  const file = tmpFile();
  assert.deepEqual(availableProducers({ file, nowMs: T0, reachable: up }), ['agy', 'gflow', 'codex']);
  assert.deepEqual(availableProducers({ file, nowMs: T0, reachable: down }), ['agy', 'codex']);
  recordImageQuota('agy', '2026-11-17T11:00:06Z', undefined, file, T0);
  assert.deepEqual(availableProducers({ file, nowMs: T0, reachable: up }), ['gflow', 'codex']);
  recordImageQuota('codex', null, undefined, file, T0);
  assert.deepEqual(availableProducers({ file, nowMs: T0, reachable: down }), []);
  assert.equal(producerStatus({ file, nowMs: T0, reachable: down }),
    `agy out until 2026-11-17T11:00:06.000Z · gflow offline · codex out until ${new Date(T0 + 6 * 3600e3).toISOString()}`);
});

test('an image-quota message is pinned on the producer it names', () => {
  assert.equal(imageQuotaProducer(HANDOFF), 'agy');
  assert.equal(imageQuotaProducer('✗ fig-U7-5: agy image quota exhausted (QUOTA_EXHAUSTED); resets at 2026-11-17T11:00:06Z'), 'agy');
  assert.equal(imageQuotaProducer('✗ fig-U7-5: gflow image quota reached: {"title":"RateLimitError"}'), 'gflow');
  assert.equal(imageQuotaProducer('Daily or per-minute model quota reached for nano2'), 'gflow');
  assert.equal(imageQuotaProducer('✗ fig-U7-5: codex image limit reached: usage limit'), 'codex');
});
