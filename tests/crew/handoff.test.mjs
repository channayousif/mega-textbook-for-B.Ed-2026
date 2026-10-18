import test from 'node:test';
import assert from 'node:assert/strict';
import { reviewFindingsSection, parseHandoff, priorHandoffsSection } from '../../scripts/crew/handoff.mjs';

const finding = (severity, message, resolved = false) => ({ severity, message, resolved });

test('reviewFindingsSection keeps only open findings, most severe first', () => {
  const report = {
    file: '/repo/specs/content/x/reviews/unit-01/G3/r.json', disposition: 'revise',
    findings: [finding('minor', 'tidy wording'), finding('blocking', 'wrong SLO', false), finding('major', 'fixed already', true), finding('major', 'missing citation')],
  };
  const out = reviewFindingsSection(report, { root: '/repo' });
  assert.match(out, /`specs\/content\/x\/reviews\/unit-01\/G3\/r\.json` \(disposition: revise\)/);
  const items = out.split('\n').slice(1);
  assert.deepEqual(items, ['- [blocking] wrong SLO', '- [major] missing citation', '- [minor] tidy wording']);
});

test('reviewFindingsSection truncates long messages and caps the list', () => {
  const findings = Array.from({ length: 20 }, (_, i) => finding('major', `${i} ${'x'.repeat(700)}`));
  const out = reviewFindingsSection({ findings }, { max: 15 });
  const items = out.split('\n').slice(1);
  assert.equal(items.length, 16);
  assert.ok(items[0].length <= '- [major] '.length + 600);
  assert.equal(items.at(-1), '- ...and 5 more in the report.');
});

test('reviewFindingsSection returns an empty string when nothing is open', () => {
  assert.equal(reviewFindingsSection(null), '');
  assert.equal(reviewFindingsSection({ findings: [finding('major', 'done', true)] }), '');
});

test('parseHandoff collects notes, caps at three and replaces em dashes', () => {
  const log = 'work\nCREW-HANDOFF: first\nCREW-HANDOFF: <note for the next stage>\nCREW-HANDOFF: second \u2014 part\nCREW-HANDOFF: third\nCREW-HANDOFF: fourth\nCREW-SUMMARY: done';
  assert.deepEqual(parseHandoff(log), ['second  -  part', 'third', 'fourth']);
  assert.deepEqual(parseHandoff('CREW-SUMMARY: done'), []);
  assert.deepEqual(parseHandoff(undefined), []);
});

const job = (over) => ({ course: 'GENG-301', unit: 1, status: 'merged', worker: 'codex', ...over });

test('priorHandoffsSection uses landed jobs on the same unit, newest first', () => {
  const jobs = [
    job({ id: 'a', stage: 'author', handoff: ['old note'], handoffAt: '2026-10-01T00:00:00Z' }),
    job({ id: 'b', stage: 'figures', handoff: ['new note'], handoffAt: '2026-10-02T00:00:00Z' }),
    job({ id: 'c', stage: 'translate', handoff: ['other unit'], unit: 2 }),
    job({ id: 'd', stage: 'translate', handoff: ['still running'], status: 'running' }),
  ];
  const out = priorHandoffsSection(jobs, job({ id: 'e', stage: 'translate', status: 'queued' }));
  assert.equal(out, '- (b, figures, codex) new note\n- (a, author, codex) old note');
});

test('priorHandoffsSection never feeds notes to a review job', () => {
  const jobs = [job({ id: 'a', stage: 'author', handoff: ['author note'] })];
  assert.equal(priorHandoffsSection(jobs, job({ id: 'r', stage: 'review_en' })), '');
  assert.equal(priorHandoffsSection(jobs, job({ id: 'r', stage: 'review_ur' })), '');
});

test('priorHandoffsSection gives a CI-fix job its parent notes and caps at five', () => {
  const parent = job({ id: 'p', stage: 'salvage', status: 'gate_red', handoff: ['check UR mirrors'] });
  const many = Array.from({ length: 6 }, (_, i) => job({ id: `m${i}`, stage: 'fix', handoff: [`n${i}`], handoffAt: `2026-09-0${i + 1}T00:00:00Z` }));
  const fix = job({ id: 'p-cifix1', stage: 'fix', parent: 'p', status: 'queued' });
  assert.match(priorHandoffsSection([parent], fix), /\(p, salvage, codex\) check UR mirrors/);
  assert.equal(priorHandoffsSection([parent, ...many], fix).split('\n').length, 5);
});
