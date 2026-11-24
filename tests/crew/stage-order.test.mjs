import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STAGES, STAGE_ORDER } from '../../scripts/crew/workers.mjs';

// A stage missing from STAGE_ORDER sorts at -1 and jumps every queue (2026-11-24 teaser starvation).

test('every stage has a launch position', () => {
  assert.deepEqual(Object.keys(STAGES).filter((s) => !STAGE_ORDER.includes(s)), []);
});

test('every listed stage exists, once', () => {
  assert.deepEqual(STAGE_ORDER.filter((s) => !(s in STAGES)), []);
  assert.equal(new Set(STAGE_ORDER).size, STAGE_ORDER.length);
});

test('owner-gated teaser clips launch before figure refresh, flashcards and slides', () => {
  for (const side of ['refresh_figures', 'flashcards', 'slides']) {
    assert.ok(STAGE_ORDER.indexOf('teaser_clips') < STAGE_ORDER.indexOf(side), side);
  }
});
