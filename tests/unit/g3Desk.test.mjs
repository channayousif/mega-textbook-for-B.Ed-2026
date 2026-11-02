/**
 * The G3 sign-off desk's pure half (ADR-0032): how a unit's Git state and its
 * ledger rows combine into one state, what may be batch-certified, and the
 * client-side mirror of the 0050 trigger.
 */
import { describe, it, expect } from 'vitest';
import {
  latestByUnit, deskState, decidable, batchEligible, prefillCriteria,
  signoffProblem, signoffItem, summarize, unitKey,
  laneOf, suggestion, revisionNote, rulingQuestions, questionKey, applyRulings, laneInput, OWNER_CHECKED,
} from '../../src/lib/g3Desk.ts';
import { CERTIFICATION_CRITERIA } from '../../src/lib/reviewQueue.ts';

const G3 = CERTIFICATION_CRITERIA.G3;
const DIGEST = 'a'.repeat(64);

const unit = (overrides = {}) => ({
  course_code: 'EFMP-302',
  unit_no: 1,
  title: 'Unit one',
  permalink: '/semester-1/efmp-302/unit-01/',
  publication: 'gated',
  state: 'awaiting',
  repaired: false,
  agent: {
    path: 'specs/content/efmp-302/reviews/unit-01/G3/r.json',
    disposition: 'pass',
    reviewer_id: 'agent:x',
    completed_at: '2026-10-01T00:00:00Z',
    criteria: G3.map((id) => ({ id, status: 'pass', evidence: '' })),
    findings: [{ severity: 'advisory', resolved: false, message: 'style nit' }],
    commands: [{ name: 'validate:content', exit_code: 0 }],
  },
  tracker: [],
  inputs_digest: DIGEST,
  inputs_dirty: false,
  ...overrides,
});

const row = (overrides = {}) => ({
  id: 'r1', course_code: 'EFMP-302', unit_no: 1, decision: 'certify', criteria: {}, findings: [],
  note: null, reviewer_initials: 'YM', inputs_digest: DIGEST, desk_commit: 'abc1234', agent_report: null,
  decided_by: null, decided_at: '2026-10-27T01:00:00Z', sync_status: 'queued', sync_note: null, pr_url: null, synced_at: null,
  ...overrides,
});

const allPass = () => Object.fromEntries(G3.map((id) => [id, { status: 'pass', evidence: '' }]));
const input = (overrides = {}) => ({
  decision: 'certify', criteria: allPass(), findings: [], note: '', initials: 'YM', attested: true, renderedInspected: true,
  ...overrides,
});

describe('latestByUnit', () => {
  it('keeps the newest live row per unit and ignores withdrawn ones', () => {
    const rows = [
      row({ id: 'old', decided_at: '2026-10-27T01:00:00Z', sync_status: 'synced' }),
      row({ id: 'new', decided_at: '2026-10-27T02:00:00Z', sync_status: 'withdrawn' }),
    ];
    expect(latestByUnit(rows).get(unitKey('EFMP-302', 1)).id).toBe('old');
  });
});

describe('deskState', () => {
  it('lets Git outrank the ledger: certified wins over any row', () => {
    expect(deskState(unit({ state: 'certified' }), row())).toBe('certified');
  });
  it('shows a queued decision, or "changed" when the inputs moved after it', () => {
    expect(deskState(unit(), row())).toBe('queued');
    expect(deskState(unit({ inputs_digest: 'b'.repeat(64) }), row())).toBe('changed');
  });
  it('a synced certify waits for its PR; a synced revise falls back to the Git state', () => {
    expect(deskState(unit(), row({ sync_status: 'synced', pr_url: 'https://github.com/x/y/pull/1' }))).toBe('pr_open');
    expect(deskState(unit({ state: 'in_review' }), row({ decision: 'revise', sync_status: 'synced' }))).toBe('in_review');
  });
  it('surfaces crew refusals', () => {
    expect(deskState(unit(), row({ sync_status: 'stale' }))).toBe('stale');
    expect(deskState(unit(), row({ sync_status: 'failed' }))).toBe('failed');
  });
  it('with no ledger row, is the Git state', () => {
    expect(deskState(unit(), undefined)).toBe('awaiting');
  });
});

describe('decidable and batchEligible', () => {
  it('a clean agent pass is batch-eligible', () => {
    expect(batchEligible(unit(), 'awaiting')).toBe(true);
  });
  it('not while queued, PR open or certified', () => {
    for (const s of ['queued', 'pr_open', 'certified']) expect(decidable(unit(), s)).toBe(false);
  });
  it('never with dirty or unbound inputs', () => {
    expect(decidable(unit({ inputs_dirty: true }), 'awaiting')).toBe(false);
    expect(decidable(unit({ inputs_digest: null }), 'awaiting')).toBe(false);
  });
  it('escalate, a failing criterion, an open blocking finding or a failed command each need the drawer', () => {
    const a = unit().agent;
    expect(batchEligible(unit({ agent: { ...a, disposition: 'escalate' } }), 'awaiting')).toBe(false);
    expect(batchEligible(unit({ agent: { ...a, criteria: a.criteria.map((c, i) => (i ? c : { ...c, status: 'fail' })) } }), 'awaiting')).toBe(false);
    expect(batchEligible(unit({ agent: { ...a, findings: [{ severity: 'blocking', resolved: false, message: 'x' }] } }), 'awaiting')).toBe(false);
    expect(batchEligible(unit({ agent: { ...a, commands: [{ name: 'check:figures', exit_code: 1 }] } }), 'awaiting')).toBe(false);
  });
  it('a repaired revise is decidable but not batch-eligible', () => {
    const u = unit({ agent: { ...unit().agent, disposition: 'revise' }, repaired: true });
    expect(decidable(u, 'awaiting')).toBe(true);
    expect(batchEligible(u, 'awaiting')).toBe(false);
  });
});

describe('prefillCriteria', () => {
  it('starts from the agent verdicts and covers all seven G3 criteria', () => {
    const c = prefillCriteria(unit({ agent: { ...unit().agent, criteria: [{ id: 'sources', status: 'fail', evidence: '' }] } }), G3);
    expect(Object.keys(c)).toEqual(G3);
    expect(c.sources.status).toBe('fail');
    expect(c.authority.status).toBe('unverified');
  });
});

describe('signoffProblem mirrors the 0050 trigger', () => {
  it('accepts a complete certify', () => {
    expect(signoffProblem(input())).toBeNull();
  });
  it('refuses bad initials and a missing attestation', () => {
    expect(signoffProblem(input({ initials: 'ym' }))).toMatch(/initials/);
    expect(signoffProblem(input({ initials: 'agent:x' }))).toMatch(/initials/);
    expect(signoffProblem(input({ attested: false }))).toMatch(/reviewed/);
  });
  it('certify needs every criterion, every non-advisory finding and the render inspection', () => {
    expect(signoffProblem(input({ criteria: { ...allPass(), coverage: { status: 'unverified', evidence: '' } } }))).toMatch(/coverage/);
    expect(signoffProblem(input({ findings: [{ severity: 'uncertain', resolved: false, message: 'x' }] }))).toMatch(/finding/);
    expect(signoffProblem(input({ findings: [{ severity: 'advisory', resolved: false, message: 'x' }] }))).toBeNull();
    expect(signoffProblem(input({ renderedInspected: false }))).toMatch(/rendered/);
  });
  it('revise and escalate need a note but not passing criteria', () => {
    expect(signoffProblem(input({ decision: 'escalate', criteria: {} }))).toMatch(/note/);
    expect(signoffProblem(input({ decision: 'revise', criteria: {}, note: 'fix the sources' }))).toBeNull();
  });
});

describe('signoffItem', () => {
  it('binds the item to the desk digest, commit and agent report', () => {
    const item = signoffItem(unit(), input(), 'abc1234');
    expect(item).toMatchObject({ course_code: 'EFMP-302', unit_no: 1, decision: 'certify', inputs_digest: DIGEST, desk_commit: 'abc1234', agent_report: unit().agent.path });
  });
  it('throws rather than send a refusable item', () => {
    expect(() => signoffItem(unit(), input({ attested: false }), 'abc1234')).toThrow(/EFMP-302 Unit 1/);
    expect(() => signoffItem(unit({ inputs_digest: null }), input(), 'abc1234')).toThrow(/bound/);
  });
});

describe('summarize', () => {
  it('counts by state, course and the agent verdict of awaiting units', () => {
    const units = [unit(), unit({ unit_no: 2, state: 'certified' }), unit({ course_code: 'GENG-301', agent: { ...unit().agent, disposition: 'escalate' } })];
    const states = new Map(units.map((u) => [unitKey(u.course_code, u.unit_no), deskState(u, undefined)]));
    const s = summarize(units, states);
    expect(s.total).toBe(3);
    expect(s.byState.awaiting).toBe(2);
    expect(s.byState.certified).toBe(1);
    expect(s.byDisposition).toEqual({ pass: 1, escalate: 1 });
    expect(s.byCourse).toEqual([
      { course: 'EFMP-302', total: 2, certified: 1, awaiting: 1 },
      { course: 'GENG-301', total: 1, certified: 0, awaiting: 1 },
    ]);
  });
});

describe('lanes and suggestions', () => {
  const a = () => unit().agent;
  const withAgent = (over) => unit({ agent: { ...a(), ...over } });
  const blocking = { severity: 'blocking', resolved: false, message: 'RRQ 10 model answer asserts facts absent from the case.' };
  const uncertain = { severity: 'uncertain', resolved: false, message: 'Is the Vosniadou binding supported?' };

  it('a clean pass is ready, and an agent render-review gap does not stop it (the owner attests that)', () => {
    expect(laneOf(unit(), 'awaiting')).toBe('ready');
    expect(laneOf(withAgent({ commands: [{ name: 'validate:content', exit_code: 0 }, { name: 'render-review', exit_code: null }] }), 'awaiting')).toBe('ready');
    expect(suggestion(unit(), 'awaiting').decision).toBe('certify');
  });
  it('a failed criterion, open blocking finding, failing gate or revise verdict is send_back', () => {
    expect(laneOf(withAgent({ criteria: a().criteria.map((c, i) => (i ? c : { ...c, status: 'fail' })) }), 'awaiting')).toBe('send_back');
    expect(laneOf(withAgent({ disposition: 'escalate', findings: [blocking] }), 'awaiting')).toBe('send_back');
    expect(laneOf(withAgent({ commands: [{ name: 'check:figures', exit_code: 1 }] }), 'awaiting')).toBe('send_back');
    expect(laneOf(unit({ agent: { ...a(), disposition: 'revise' }, repaired: true }), 'awaiting')).toBe('send_back');
  });
  it('only open uncertain findings or unverified criteria make a ruling', () => {
    const u = withAgent({ disposition: 'escalate', findings: [uncertain, { ...blocking, resolved: true }],
      criteria: a().criteria.map((c) => (c.id === 'accessibility' ? { ...c, status: 'unverified' } : c)) });
    expect(laneOf(u, 'awaiting')).toBe('ruling');
    expect(rulingQuestions(u).map(questionKey)).toEqual(['f0', 'c:accessibility']);
    expect(suggestion(u, 'awaiting').decision).toBeNull();
  });
  it('nothing outside the owner\'s hands gets a lane', () => {
    for (const s of ['certified', 'queued', 'pr_open', 'in_review']) expect(laneOf(unit(), s)).toBeNull();
    expect(laneOf(unit({ agent: null }), 'awaiting')).toBeNull();
    expect(laneOf(unit({ inputs_dirty: true }), 'awaiting')).toBeNull();
  });
  it('revisionNote lists failures and open findings only, and is capped', () => {
    const u = withAgent({ criteria: a().criteria.map((c, i) => (i ? c : { ...c, status: 'fail' })),
      findings: [blocking, { ...uncertain, resolved: true }, { severity: 'advisory', resolved: false, message: 'nit' }] });
    const note = revisionNote(u);
    expect(note).toMatch(new RegExp(`Failed criteria: ${G3[0]}`));
    expect(note).toMatch(/\[blocking\] RRQ 10/);
    expect(note).not.toMatch(/Vosniadou|nit/);
    const long = withAgent({ findings: Array.from({ length: 40 }, () => ({ ...blocking, message: 'x'.repeat(500) })) });
    expect(revisionNote(long).length).toBeLessThanOrEqual(1000);
    expect(revisionNote(withAgent({ disposition: 'revise' })).length).toBeGreaterThanOrEqual(5);
  });
  it('accepting every ruling certifies with the owner as evidence; one fix makes it a revise naming only that', () => {
    const u = withAgent({ disposition: 'escalate', findings: [uncertain, { ...uncertain, message: 'Second question' }],
      criteria: a().criteria.map((c) => (c.id === 'accessibility' ? { ...c, status: 'unverified' } : c)) });
    expect(applyRulings(u, { f0: 'accept' })).toBeNull();
    const ok = applyRulings(u, { f0: 'accept', f1: 'accept', 'c:accessibility': 'accept' });
    expect(ok.decision).toBe('certify');
    expect(ok.criteria.accessibility).toEqual({ status: 'pass', evidence: OWNER_CHECKED });
    expect(ok.findings.every((f) => f.resolved)).toBe(true);
    expect(signoffProblem(input(ok))).toBeNull();
    const fix = applyRulings(u, { f0: 'accept', f1: 'fix', 'c:accessibility': 'accept' });
    expect(fix.decision).toBe('revise');
    expect(fix.note).toMatch(/Second question/);
    expect(fix.note).not.toMatch(/Vosniadou/);
    expect(signoffProblem(input(fix))).toBeNull();
  });
  it('one-click lane inputs always satisfy the 0050 trigger mirror', () => {
    expect(signoffProblem(laneInput(unit(), 'certify', 'YM', true, true))).toBeNull();
    expect(signoffProblem(laneInput(withAgent({ findings: [blocking] }), 'revise', 'YM', true, false))).toBeNull();
    expect(signoffProblem(laneInput(unit(), 'certify', 'YM', true, false))).toMatch(/rendered/);
  });
});
