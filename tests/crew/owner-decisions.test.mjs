import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOwnerQueue, commandFor } from '../../scripts/crew/owner-queue.mjs';
import { planDecision, dropDecided } from '../../scripts/crew/decisions-sync.mjs';

const SCRIPT = {
  id: 'giss-401', title: { en: 'Islamic Studies (GISS-401)' }, recipe: { name: 'teaser', version: 3 },
  sources: ['docs/semester-3/giss-401/course-overview.mdx'],
  shots: [1, 2, 3, 4, 5].map((n) => ({ n, beat: n === 1 ? 'hook' : 'beat', visual: `visual ${n}` })),
  locales: { ur: { narration: ['ایک', 'دو', 'تین', 'چار', 'پانچ'], end_card: { url: 'textbook.com.pk' } } },
};
const TEASERS = {
  'giss-401-ur': { key: 'giss-401-ur', locale: 'ur', state: 'scripted', gates: { qg0: { verdict: 'pass' } }, script_sha256: 'a'.repeat(64) },
  'efmp-406-ur': {
    key: 'efmp-406-ur', locale: 'ur', state: 'qa3-pass', youtube_id: 'DQxspPM4QmE', uploaded_at: '2026-11-25T14:00:00Z',
    gates: { qa3: { notes: 'private, processed' } },
    clips: [{ shot: 3, qa: { verdict: 'pass-with-notes', notes: 'soft face' }, precheck: { qg2_score: 0.714, missing: ['online'] } }],
  },
};
const unit = (course, n, items) => ({ course, unit: n, items });
const LEDGERS = [
  unit('EFMP-301', 4, [
    { key: 't2-ur-video', title: 'T2 video', locale: 'ur', kind: 'video', state: 'qa3-pass', youtube_id: 'egOH0dxmmw4', uploaded_at: '2026-11-26T10:00:00Z' },
    { key: 't3-en-audio-p1', title: 'T3 audio', locale: 'en', kind: 'audio', state: 'qa3-pass', youtube_id: 'vWa7LGS1xjs' },
    { key: 't1-en-video', state: 'placed', youtube_id: 'x' },
  ]),
  unit('GENG-300', 1, [
    { key: 't1-en-audio-p1', state: 'qa3-pass', youtube_id: 'Fre7sTw5_6c' },
    { key: 't2-en-video', state: 'encoded' },
  ]),
];
const BOARD = {
  media: { owner: { scripts: ['giss-401-ur'], spotCheck: ['efmp-406-ur'] } },
  studio: { watch: ['EFMP-301#4'] },
  social: { owner: { awaitingOwner: [{ id: '2026-11-27-feature', card: 'c.jpg', card_url: 'https://x/c.jpg' }] } },
  awaitingG3: { units: [{ course: 'EFMP-301', unit: 7, disposition: 'escalate' }] },
};
const DECISIONS = { items: [
  { id: 'C-040', question: 'PR #930 touches protected files. Merge it?', options: ['merge', 'hold'], status: 'open', pr: 930, askedAt: '2026-11-27T10:00:00Z' },
  { id: 'C-039', question: 'old', options: ['merge', 'hold'], status: 'closed' },
] };

const readers = (over = {}) => ({
  board: BOARD, decisions: DECISIONS,
  teaserItem: (k) => TEASERS[k], script: (id) => (id === 'giss-401' ? SCRIPT : undefined),
  shaOf: (id) => (id === 'giss-401' ? 'a'.repeat(64) : undefined),
  studioLedger: (c, u) => LEDGERS.find((L) => L.course === c && L.unit === u),
  studioLedgers: LEDGERS,
  socialPost: (id) => ({ id, kind: 'feature', headline: { en: 'New' }, highlights: [{ en: 'Notes widget', ur: 'نوٹس', link: '/app/' }] }),
  ...over,
});
const byKey = (q) => Object.fromEntries(q.map((i) => [i.item_key, i]));

test('the queue lists every kind the owner decides, from the crew view', () => {
  const q = byKey(buildOwnerQueue(readers()));
  assert.deepEqual(Object.keys(q).sort(), [
    'crew-q:C-040', 'g3', 'short:efmp-406-ur', 'social:2026-11-27-feature', 'studio-progress:GENG-300#1',
    'studio:EFMP-301#4', 'teaser-script:giss-401-ur',
  ]);
  const s = q['teaser-script:giss-401-ur'];
  assert.equal(s.details.shots.length, 5);
  assert.deepEqual(s.details.shots[2], { n: 3, beat: 'beat', visual: 'visual 3', line: 'تین' });
  assert.equal(s.details.recipe, 'teaser@3');
  assert.equal(s.digest, 'a'.repeat(64));
  const sh = q['short:efmp-406-ur'];
  assert.equal(sh.links[0].url, 'https://youtube.com/shorts/DQxspPM4QmE');
  assert.ok(sh.details.notes.some((n) => n.includes('QG2 0.714')));
  const st = q['studio:EFMP-301#4'];
  assert.deepEqual(st.details.items.map((i) => i.url), ['https://youtu.be/egOH0dxmmw4', 'https://youtu.be/vWa7LGS1xjs']);
  assert.deepEqual(q['studio-progress:GENG-300#1'].actions, []);
  assert.deepEqual(q.g3.actions, []);
  assert.equal(q['crew-q:C-040'].links[0].url.endsWith('/pull/930'), true);
});

test('nothing waiting gives an empty queue', () => {
  assert.deepEqual(buildOwnerQueue(readers({ board: {}, decisions: { items: [] }, studioLedgers: [] })), []);
});

test('commandFor builds the exact crew command', () => {
  const q = byKey(buildOwnerQueue(readers()));
  assert.equal(commandFor({ action: 'approve' }, q['teaser-script:giss-401-ur']), 'crew approve-script giss-401-ur');
  assert.equal(commandFor({ action: 'reject', note: 'shot 2:\n  no books on the desk' }, q['teaser-script:giss-401-ur']), 'crew reject giss-401-ur shot 2: no books on the desk');
  assert.equal(commandFor({ action: 'publish' }, q['short:efmp-406-ur']), 'crew publish efmp-406-ur');
  assert.equal(commandFor({ action: 'approve', payload: {} }, q['studio:EFMP-301#4']), 'crew approve-studio EFMP-301 4');
  assert.equal(commandFor({ action: 'approve', payload: { except: ['t3-en-audio-p1'] } }, q['studio:EFMP-301#4']), 'crew approve-studio EFMP-301 4 except t3-en-audio-p1');
  assert.equal(commandFor({ action: 'remake', note: 'Urdu register too formal', payload: { key: 't2-ur-video' } }, q['studio:EFMP-301#4']), 'crew reject-studio EFMP-301 4 t2-ur-video Urdu register too formal');
  assert.equal(commandFor({ action: 'post' }, q['social:2026-11-27-feature']), 'crew post 2026-11-27-feature');
  assert.equal(commandFor({ action: 'answer', payload: { answer: 'merge' } }, q['crew-q:C-040']), 'C-040 merge');
});

test('commandFor refuses decisions that do not fit the item', () => {
  const q = byKey(buildOwnerQueue(readers()));
  assert.throws(() => commandFor({ action: 'reject', note: '' }, q['short:efmp-406-ur']), /needs a note/);
  assert.throws(() => commandFor({ action: 'publish' }, q['teaser-script:giss-401-ur']), /not offered/);
  assert.throws(() => commandFor({ action: 'approve', payload: { except: ['nope'] } }, q['studio:EFMP-301#4']), /not an item/);
  assert.throws(() => commandFor({ action: 'approve', payload: { except: ['t2-ur-video', 't3-en-audio-p1'] } }, q['studio:EFMP-301#4']), /not an approval/);
  assert.throws(() => commandFor({ action: 'remake', note: 'redo it', payload: { key: 'x' } }, q['studio:EFMP-301#4']), /which item/);
  assert.throws(() => commandFor({ action: 'answer', payload: { answer: 'delete' } }, q['crew-q:C-040']), /answer one of/);
  assert.throws(() => commandFor({ action: 'approve' }, q.g3), /not offered/);
  assert.throws(() => commandFor({ action: 'approve' }, undefined), /no longer waiting/);
});

test('planDecision refuses a gone or changed item and runs the rest', () => {
  const queue = buildOwnerQueue(readers());
  const dec = { item_key: 'teaser-script:giss-401-ur', action: 'approve', digest: 'a'.repeat(64) };
  assert.deepEqual(planDecision(dec, queue), { command: 'crew approve-script giss-401-ur' });
  assert.match(planDecision({ ...dec, digest: 'b'.repeat(64) }, queue).refuse, /changed after you decided/);
  assert.match(planDecision({ ...dec, item_key: 'teaser-script:gone-ur' }, queue).refuse, /no longer waiting/);
});

test('dropDecided hides items whose current version was already decided', () => {
  const queue = buildOwnerQueue(readers());
  const out = dropDecided(queue, [{ item_key: 'short:efmp-406-ur', digest: 'DQxspPM4QmE' }, { item_key: 'teaser-script:giss-401-ur', digest: 'old' }]);
  assert.equal(out.some((i) => i.item_key === 'short:efmp-406-ur'), false);
  assert.equal(out.some((i) => i.item_key === 'teaser-script:giss-401-ur'), true);
});
