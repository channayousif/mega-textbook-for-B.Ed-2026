import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  readReviewerToken, parseReviewerEnv, reviewerEnv, mergeArgs, approveArgs, crewApprovalBody, ciState,
  prsToReview, prReviewJob, prReviewId, prReviewAction, prReviewBody, MAX_PR_REVIEWS,
} from '../../scripts/crew/reviewer.mjs';
import { STAGES, WORKERS } from '../../scripts/crew/workers.mjs';

const green = [{ name: 'build', status: 'COMPLETED', conclusion: 'SUCCESS' }, { name: 'e2e', status: 'COMPLETED', conclusion: 'SKIPPED' }];
const pr = (over = {}) => ({ number: 930, title: 'fix: a thing', body: 'why', headRefName: 'fix/thing', headRefOid: 'abcdef1234567', isDraft: false, statusCheckRollup: green, ...over });

test('no reviewer.env means no reviewer: the crew keeps the --admin merge', () => {
  const dir = mkdtempSync(join(tmpdir(), 'crew-rev-'));
  assert.equal(readReviewerToken(dir), null);
  assert.deepEqual(mergeArgs(12, { reviewer: false, headSha: 'abc' }), ['pr', 'merge', '12', '--merge', '--admin']);
});

test('the token is read from the state file, never from the crew environment', () => {
  const dir = mkdtempSync(join(tmpdir(), 'crew-rev-'));
  writeFileSync(join(dir, 'reviewer.env'), '# reviewer account\nexport REVIEWER_GH_TOKEN="github_pat_x1"\n');
  assert.equal(readReviewerToken(dir), 'github_pat_x1');
  assert.equal(parseReviewerEnv('OTHER=1'), null);
  const env = reviewerEnv('github_pat_x1', { PATH: '/bin', GITHUB_TOKEN: 'owner', GH_TOKEN: 'owner' });
  assert.equal(env.GH_TOKEN, 'github_pat_x1');
  assert.equal(env.GITHUB_TOKEN, undefined);
});

test('with a reviewer the merge drops --admin and pins the approved head', () => {
  assert.deepEqual(mergeArgs(12, { reviewer: true, headSha: 'abc' }), ['pr', 'merge', '12', '--merge', '--match-head-commit', 'abc']);
  const a = approveArgs(12, 'ok', 'abc');
  assert.deepEqual(a.slice(0, 4), ['pr', 'review', '12', '--approve']);
  assert.match(a[5], /Head: abc/);
});

test('a crew approval says what was checked and that no human read it', () => {
  const body = crewApprovalBody({ id: 'crew-batch-1', members: ['a', 'b'], stage: 'fix' });
  assert.match(body, /crew batch of 2 jobs/);
  assert.match(body, /No human has read this diff/);
  assert.match(crewApprovalBody({ id: 'm1', stage: 'maint_docs', review: { verdict: 'pass', family: 'google', by: 'agy' } }), /independent google reviewer/);
});

test('CI state: skipped counts as passing, pending and failures do not', () => {
  assert.equal(ciState(green), 'green');
  assert.equal(ciState([]), 'none');
  assert.equal(ciState([...green, { name: 'rls', status: 'IN_PROGRESS' }]), 'pending');
  assert.equal(ciState([...green, { name: 'rls', status: 'COMPLETED', conclusion: 'FAILURE' }]), 'red');
  assert.equal(ciState([{ context: 'legacy', state: 'ERROR' }]), 'red');
});

test('only green, non-draft, non-crew PR heads without a review are queued', () => {
  const board = { jobs: [] };
  const prs = [pr(), pr({ number: 931, isDraft: true }), pr({ number: 932, headRefName: 'crew/batch-1' }),
    pr({ number: 933, statusCheckRollup: [{ name: 'e2e', status: 'COMPLETED', conclusion: 'FAILURE' }] })];
  assert.deepEqual(prsToReview(prs, board).map((p) => p.number), [930]);
  board.jobs.push(prReviewJob(pr(), '2026-11-27T00:00:00Z'));
  assert.deepEqual(prsToReview(prs, board), [], 'same head is reviewed once');
  assert.deepEqual(prsToReview([pr({ headRefOid: 'fff0000' })], board).map((p) => p.number), [930], 'a new push gets a new review');
});

test('a PR stops getting reviews after the cap', () => {
  const board = { jobs: Array.from({ length: MAX_PR_REVIEWS }, (_, i) => ({ id: `r${i}`, stage: 'pr_review', pr: 930 })) };
  assert.deepEqual(prsToReview([pr()], board), []);
});

test('the review job works on its own local branch based on the PR head branch', () => {
  const j = prReviewJob(pr(), 't');
  assert.equal(j.id, prReviewId(930, 'abcdef1234567'));
  assert.equal(j.id, 'pr930-review-abcdef1');
  assert.equal(j.stage, 'pr_review');
  assert.equal(j.base, 'fix/thing');
  assert.match(j.branch, /^crew\/pr930-review-/);
  assert.equal(j.headSha, 'abcdef1234567');
});

test('a verdict is posted only on the head that was reviewed', () => {
  const open = { state: 'OPEN', headRefOid: 'abc' };
  assert.equal(prReviewAction({ verdict: 'pass' }, open, 'abc'), 'approve');
  assert.equal(prReviewAction({ verdict: 'revise' }, open, 'abc'), 'comment');
  assert.equal(prReviewAction({ verdict: 'pass' }, open, 'old'), 'stale');
  assert.equal(prReviewAction({ verdict: 'pass' }, { state: 'MERGED', headRefOid: 'abc' }, 'abc'), 'skip');
  assert.equal(prReviewAction({ verdict: 'pass' }, null, 'abc'), 'skip');
  const body = prReviewBody({ family: 'google', worker: 'agy' }, { verdict: 'revise', note: 'add a test' }, 'missing test');
  assert.match(body, /Changes requested/);
  assert.match(body, /add a test/);
});

test('PR reviews never run on the authors\' model family', () => {
  assert.ok(STAGES.pr_review.chain.length > 0);
  for (const w of STAGES.pr_review.chain) assert.notEqual(WORKERS[w].family, 'anthropic', w);
});
