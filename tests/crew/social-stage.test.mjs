// Feature 031: the crew's daily social roundup. When it is due, what the brief says, what the
// owner sees, and that the stage is not corpus work.
import test from 'node:test';
import assert from 'node:assert/strict';
import { socialDue, socialTask, socialOwnerLine, pkt, SOCIAL_STAGE } from '../../scripts/crew/social.mjs';
import { STAGES } from '../../scripts/crew/workers.mjs';
import { isCorpusStage } from '../../scripts/crew/planner.mjs';
import { STAGE_TASK } from '../../scripts/crew/crew.mjs';

const at = (iso) => new Date(iso);

test('the roundup is due from 13:00 PKT once a day, only with something new, and only while on', () => {
  const afternoon = at('2026-11-22T08:30:00Z'); // 13:30 PKT, inside media hours (D-2026-0100)
  assert.equal(pkt(afternoon).day, '2026-11-22');
  assert.equal(socialDue({ on: true, now: afternoon, fresh: true }), 'roundup');
  assert.equal(socialDue({ on: true, now: afternoon, fresh: false }), null);
  assert.equal(socialDue({ on: true, now: afternoon, fresh: true, lastDay: '2026-11-22' }), null);
  assert.equal(socialDue({ on: true, now: at('2026-11-22T06:00:00Z'), fresh: true }), null); // 11:00 PKT, before the roundup hour
  assert.equal(socialDue({ on: true, now: at('2026-11-22T13:30:00Z'), fresh: true }), null); // 18:30 PKT, media hours closed
  assert.equal(socialDue({ on: false, now: afternoon, fresh: true }), null);
  assert.equal(socialDue({ on: true, now: afternoon, fresh: true, inFlight: true }), null);
});

test('an approved post waiting to publish is due only in media hours', () => {
  assert.equal(socialDue({ on: true, now: at('2026-11-22T05:00:00Z'), toPublish: 1 }), 'publish'); // 10:00 PKT
  assert.equal(socialDue({ on: true, now: at('2026-11-22T03:00:00Z'), toPublish: 1 }), null); // 08:00 PKT
});

test('the brief never lets the worker approve a feature post, and keeps ledger edits to the CLI', () => {
  const roundup = socialTask({ mode: 'roundup' });
  assert.match(roundup, /never approve a feature post yourself/);
  assert.match(roundup, /updates\.mjs copy <id> <n>/);
  assert.match(roundup, /never edit the ledger file by hand/);
  assert.match(socialTask({ mode: 'publish' }), /updates\.mjs publish <id>/);
  assert.equal(STAGE_TASK[SOCIAL_STAGE], socialTask);
});

test('the owner line links the card and says how to approve', () => {
  const line = socialOwnerLine({ awaitingOwner: [{ id: '2026-11-22-feature', card_url: 'https://api.textbook.com.pk/storage/v1/object/public/social-cards/2026-11-22-feature.jpg' }], toPublish: [{ id: '2026-11-21-content' }] });
  assert.match(line, /posts to approve: 2026-11-22-feature \(https:\/\/api\.textbook\.com\.pk\/.*\.jpg\)/);
  assert.match(line, /crew post <id>/);
  assert.match(line, /approved, publishing: 2026-11-21-content/);
  assert.equal(socialOwnerLine({}), 'nothing');
});

test('the stage runs on claude with the social-updates skill and is not corpus work', () => {
  assert.deepEqual(STAGES[SOCIAL_STAGE], { chain: ['claude'], skill: 'social-updates' });
  assert.equal(isCorpusStage(SOCIAL_STAGE), false);
});
