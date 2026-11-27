/**
 * The Owner Decisions page's pure half (Feature 035): grouping, which buttons may be pressed,
 * payloads and the copy-command preview (mirror of scripts/crew/owner-queue.mjs commandFor).
 */
import { describe, it, expect } from 'vitest';
import { groupCards, actionReady, payloadFor, commandPreview, minutesSince, latestDecisions } from '../../src/lib/ownerDecisions.ts';

const item = (over) => ({
  item_key: 'short:efmp-406-ur', kind: 'short', title: 'Private Short: EFMP-406 (ur)', summary: null,
  details: { key: 'efmp-406-ur' }, links: [], actions: ['publish', 'reject'], digest: 'DQx',
  waiting_since: null, first_seen: '2026-11-27T10:00:00Z', snapshot_at: '2026-11-27T12:00:00Z', ...over,
});
const studio = item({
  item_key: 'studio:EFMP-301#4', kind: 'studio_unit', actions: ['approve', 'remake'], digest: 'd1',
  details: { course: 'EFMP-301', unit: 4, items: [{ key: 't2-ur-video' }, { key: 't3-en-audio-p1' }] },
});
const question = item({ item_key: 'crew-q:C-040', kind: 'crew_question', actions: ['answer'], details: { id: 'C-040', options: ['merge', 'hold'] } });
const dec = (over) => ({ id: 'x', item_key: 'short:efmp-406-ur', kind: 'short', action: 'publish', note: null, payload: {}, digest: 'DQx',
  title: null, decided_at: '2026-11-27T12:05:00Z', status: 'queued', command: null, result: null, synced_at: null, ...over });

describe('groupCards', () => {
  it('groups by kind in page order, oldest waiting first', () => {
    const later = item({ item_key: 'short:efmp-407-ur', details: { key: 'efmp-407-ur' }, first_seen: '2026-11-27T11:00:00Z' });
    const groups = groupCards([later, studio, item({}), question], []);
    expect(groups.map((g) => g.kind)).toEqual(['short', 'studio_unit', 'crew_question']);
    expect(groups[0].cards.map((c) => c.item.item_key)).toEqual(['short:efmp-406-ur', 'short:efmp-407-ur']);
  });
  it('a queued decision blocks a new one; an old applied decision on another version is ignored', () => {
    const [g] = groupCards([item({})], [dec({})]);
    expect(g.cards[0].canDecide).toBe(false);
    const [g2] = groupCards([item({ digest: 'NEW' })], [dec({ status: 'applied', digest: 'DQx' })]);
    expect(g2.cards[0]).toMatchObject({ canDecide: true, decision: null });
    const [g3] = groupCards([item({})], [dec({ status: 'refused', result: 'changed' })]);
    expect(g3.cards[0]).toMatchObject({ canDecide: true });
    expect(g3.cards[0].decision.status).toBe('refused');
  });
  it('information items never get buttons', () => {
    const [g] = groupCards([item({ item_key: 'g3', kind: 'g3', actions: [] })], []);
    expect(g.cards[0].canDecide).toBe(false);
  });
});

describe('actionReady and payloadFor', () => {
  const f = (over = {}) => ({ note: '', except: [], remakeKey: '', answer: '', ...over });
  it('reject and remake need a note; remake needs an item', () => {
    expect(actionReady('reject', f(), item({}))).toBe(false);
    expect(actionReady('reject', f({ note: 'too dark' }), item({}))).toBe(true);
    expect(actionReady('remake', f({ note: 'redo it' }), studio)).toBe(false);
    expect(actionReady('remake', f({ note: 'redo it', remakeKey: 't2-ur-video' }), studio)).toBe(true);
  });
  it('approving a unit cannot keep every item private', () => {
    expect(actionReady('approve', f({ except: ['t2-ur-video', 't3-en-audio-p1'] }), studio)).toBe(false);
    expect(actionReady('approve', f({ except: ['t2-ur-video'] }), studio)).toBe(true);
    expect(payloadFor('approve', f({ except: ['t2-ur-video'] }), studio)).toEqual({ except: ['t2-ur-video'] });
  });
  it('answers must be one of the options', () => {
    expect(actionReady('answer', f({ answer: 'delete' }), question)).toBe(false);
    expect(actionReady('answer', f({ answer: 'merge' }), question)).toBe(true);
    expect(payloadFor('answer', f({ answer: 'merge' }), question)).toEqual({ answer: 'merge' });
  });
});

describe('commandPreview', () => {
  const f = (over = {}) => ({ note: '', except: [], remakeKey: '', answer: '', ...over });
  it('mirrors the crew commands', () => {
    expect(commandPreview('publish', f(), item({}))).toBe('crew publish efmp-406-ur');
    expect(commandPreview('reject', f({ note: 'soft\nface' }), item({}))).toBe('crew reject efmp-406-ur soft face');
    expect(commandPreview('approve', f({ except: ['t3-en-audio-p1'] }), studio)).toBe('crew approve-studio EFMP-301 4 except t3-en-audio-p1');
    expect(commandPreview('remake', f({ note: 'register', remakeKey: 't2-ur-video' }), studio)).toBe('crew reject-studio EFMP-301 4 t2-ur-video register');
    expect(commandPreview('answer', f({ answer: 'hold' }), question)).toBe('C-040 hold');
  });
});

describe('helpers', () => {
  it('minutesSince and latestDecisions', () => {
    expect(minutesSince('2026-11-27T12:00:00Z', Date.parse('2026-11-27T12:31:00Z'))).toBe(31);
    expect(minutesSince(null)).toBeNull();
    const m = latestDecisions([dec({ id: 'a', decided_at: '2026-11-27T10:00:00Z' }), dec({ id: 'b', decided_at: '2026-11-27T11:00:00Z' })]);
    expect(m.get('short:efmp-406-ur').id).toBe('b');
  });
});
