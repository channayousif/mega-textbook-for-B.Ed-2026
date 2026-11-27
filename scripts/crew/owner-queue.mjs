// Owner Decisions queue (Feature 035): everything that waits on the owner, in one list the admin
// Decisions page (/app/admin/decisions) shows, and the command each decision runs.
//
// Pure: callers pass the crew board, the decisions file and readers for the repository ledgers,
// so tests run on fixtures. The waiting list is the crew's own view (board.media.owner,
// board.studio.watch, board.social.owner, open C-### decisions), so an item approved over WhatsApp
// leaves the page at the next tick. Decisions run through the existing `crew.mjs cmd` path and its
// checks; `digest` only lets decisions-sync refuse a decision made on an older version of the item.
// Do not import this file from any content gate (FR-018).
import { createHash } from 'node:crypto';
import { teaserNotes } from '../media/status.mjs';

export const SITE = 'https://textbook.com.pk';
const sha = (v) => createHash('sha256').update(typeof v === 'string' ? v : JSON.stringify(v)).digest('hex');
const course = (key) => key.replace(/-(ur|en)$/, '').toUpperCase();
const shortUrl = (id) => `https://youtube.com/shorts/${id}`;
const videoUrl = (id) => `https://youtu.be/${id}`;
const KEY_RE = /^[a-z0-9-]+$/;

/** Actions each kind offers; the RPC refuses any other (record_owner_decision). */
export const ACTIONS = {
  teaser_script: ['approve', 'reject'],
  short: ['publish', 'reject'],
  studio_unit: ['approve', 'remake'],
  social_post: ['post', 'reject'],
  crew_question: ['answer'],
  studio_progress: [],
  g3: [],
};
/** Actions that need a note saying what must change. */
export const NOTE_ACTIONS = ['reject', 'remake'];

function teaserScriptItem(key, { teaserItem, script, shaOf }) {
  const item = teaserItem(key);
  const id = key.replace(/-(ur|en)$/, '');
  const s = script(id);
  const locale = item?.locale ?? 'ur';
  const narration = s?.locales?.[locale]?.narration ?? [];
  return {
    item_key: `teaser-script:${key}`, kind: 'teaser_script',
    title: `Teaser script: ${s?.title?.en ?? course(key)}`,
    summary: 'Approve the script before any Veo credits are spent, or reject it with what must change.',
    details: {
      key, locale, recipe: s?.recipe ? `${s.recipe.name}@${s.recipe.version}` : null,
      qg0: item?.gates?.qg0?.verdict ?? null,
      shots: (s?.shots ?? []).map((sh, i) => ({ n: sh.n, beat: sh.beat, visual: sh.visual, line: narration[i] ?? '' })),
      end_card: s?.locales?.[locale]?.end_card ?? null,
      sources: s?.sources ?? [],
    },
    links: [{ label: 'Script file', url: `https://github.com/channayousif/mega-textbook-for-B.Ed-2026/blob/main/specs/studio/teasers/${id}.json` }],
    actions: ACTIONS.teaser_script,
    digest: shaOf(id) ?? 'missing',
    waiting_since: item?.history?.at(-1)?.at ?? null,
  };
}

function shortItem(key, { teaserItem }) {
  const item = teaserItem(key);
  const id = item?.youtube_id;
  return {
    item_key: `short:${key}`, kind: 'short',
    title: `Private Short: ${course(key)} (${item?.locale ?? 'ur'})`,
    summary: 'Watch the private Short, then publish it or hold it with a note.',
    details: {
      key, youtube_id: id ?? null,
      notes: item ? teaserNotes(item) : [],
      qa1: item?.gates?.qa1?.notes ?? null,
      qa3: item?.gates?.qa3?.notes ?? null,
    },
    links: id ? [{ label: 'Watch on YouTube (private)', url: shortUrl(id) }] : [],
    actions: ACTIONS.short,
    digest: id ?? 'missing',
    waiting_since: item?.uploaded_at ?? null,
  };
}

const studioRow = (i) => ({
  key: i.key, title: i.title ?? i.key, topic: i.topic ?? null, locale: i.locale ?? null, kind: i.kind ?? null,
  state: i.state, youtube_id: i.youtube_id ?? null, url: i.youtube_id ? videoUrl(i.youtube_id) : null,
  qa2: i.gates?.qa2?.notes ?? null, urdu_flag: i.gates?.qa2?.urdu_flag ?? null,
});

function studioUnitItem(watchKey, { studioLedger }) {
  const [C, u] = watchKey.split('#');
  const unit = Number(u);
  const items = (studioLedger(C, unit)?.items ?? []).filter((i) => i.state === 'qa3-pass' && !i.blocked);
  return {
    item_key: `studio:${C}#${unit}`, kind: 'studio_unit',
    title: `Study Studio: ${C} Unit ${unit}`,
    summary: `Watch ${items.length} private item(s). Approve the unit (optionally keeping some private), or have one remade with a note.`,
    details: { course: C, unit, items: items.map(studioRow) },
    links: [],
    actions: ACTIONS.studio_unit,
    digest: sha(items.map((i) => [i.key, i.youtube_id ?? ''])),
    waiting_since: items.map((i) => i.uploaded_at).filter(Boolean).sort().at(-1) ?? null,
  };
}

/** Units with private items whose other items are still being made: shown, not decided yet. */
function studioProgressItems(ledgers, watch) {
  const out = [];
  for (const L of ledgers) {
    const key = `${L.course.toUpperCase()}#${Number(L.unit)}`;
    if (watch.includes(key)) continue;
    const live = (L.items ?? []).filter((i) => !i.blocked);
    const ready = live.filter((i) => i.state === 'qa3-pass');
    const making = live.filter((i) => !['qa3-pass', 'approved', 'public', 'placed'].includes(i.state));
    if (!ready.length || !making.length) continue;
    out.push({
      item_key: `studio-progress:${key}`, kind: 'studio_progress',
      title: `Study Studio: ${L.course.toUpperCase()} Unit ${Number(L.unit)} (in progress)`,
      summary: `${ready.length} item(s) are private and ready to watch; ${making.length} still being made. You approve the unit once all are ready.`,
      details: { course: L.course.toUpperCase(), unit: Number(L.unit), items: ready.map(studioRow), making: making.map((i) => ({ key: i.key, state: i.state })) },
      links: [], actions: [], digest: sha(ready.map((i) => i.key)), waiting_since: null,
    });
  }
  return out;
}

function socialItem(p, post) {
  return {
    item_key: `social:${p.id}`, kind: 'social_post',
    title: `Social post: ${p.id}`,
    summary: 'Approve the post for Facebook, Instagram and LinkedIn, or reject it with a note.',
    details: {
      id: p.id, kind: post?.kind ?? null,
      headline: post?.headline?.en ?? null,
      highlights: (post?.highlights ?? []).map((h) => ({ en: h.en, ur: h.ur, link: h.link ? `${SITE}${h.link}` : null })),
    },
    links: p.card_url ? [{ label: 'Card image', url: p.card_url }] : [],
    actions: ACTIONS.social_post,
    digest: sha([p.id, p.card ?? '']),
    waiting_since: post?.collected_at ?? null,
  };
}

function questionItem(d) {
  return {
    item_key: `crew-q:${d.id}`, kind: 'crew_question',
    title: `${d.id}: crew question`,
    summary: d.question,
    details: { id: d.id, question: d.question, options: d.options, pr: d.pr ?? null, job: d.job ?? null, files: d.files ?? [] },
    links: d.pr ? [{ label: `PR #${d.pr}`, url: `https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/${d.pr}` }] : [],
    actions: ACTIONS.crew_question,
    digest: sha([d.id, d.askedAt ?? '']),
    waiting_since: d.askedAt ?? null,
  };
}

function g3Item(units) {
  return {
    item_key: 'g3', kind: 'g3',
    title: `G3 sign-offs: ${units.length} unit(s)`,
    summary: 'Units only a person can certify at G3. Decide them on the G3 sign-off desk.',
    details: { count: units.length, units: units.slice(0, 12).map((u) => ({ course: u.course, unit: u.unit, disposition: u.disposition ?? null })) },
    links: [{ label: 'Open the G3 sign-off desk', url: `${SITE}/app/admin/g3-signoff` }],
    actions: [], digest: sha(units.map((u) => `${u.course}#${u.unit}`)), waiting_since: null,
  };
}

/**
 * Every item waiting on the owner.
 * @param {object} p
 * @param {object} p.board            crew board.json
 * @param {object} p.decisions        crew decisions.json
 * @param {(key: string) => object|undefined} p.teaserItem   teaser ledger item by key
 * @param {(id: string) => object|undefined} p.script        teaser script by id
 * @param {(id: string) => string|undefined} p.shaOf         current script sha256
 * @param {(course: string, unit: number) => object|undefined} p.studioLedger
 * @param {object[]} [p.studioLedgers]  every Study Studio ledger ({course, unit, items})
 * @param {(id: string) => object|undefined} [p.socialPost]  social ledger post by id
 */
export function buildOwnerQueue({ board, decisions, teaserItem, script, shaOf, studioLedger, studioLedgers = [], socialPost = () => undefined }) {
  const owner = board?.media?.owner ?? {};
  const watch = board?.studio?.watch ?? owner.watch ?? [];
  const items = [
    ...(owner.scripts ?? []).map((k) => teaserScriptItem(k, { teaserItem, script, shaOf })),
    ...(owner.spotCheck ?? []).map((k) => shortItem(k, { teaserItem })),
    ...watch.map((k) => studioUnitItem(k, { studioLedger })),
    ...studioProgressItems(studioLedgers, watch),
    ...(board?.social?.owner?.awaitingOwner ?? []).map((p) => socialItem(p, socialPost(p.id))),
    ...(decisions?.items ?? []).filter((d) => d.status === 'open').map(questionItem),
  ];
  const g3 = board?.awaitingG3?.units ?? [];
  if (g3.length) items.push(g3Item(g3));
  return items;
}

const oneLine = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

/**
 * The crew command a decision runs (`crew.mjs cmd`), or throws when the decision does not fit the
 * item. Keys are checked against the item, never taken from the page as free text.
 * @param {{action: string, note?: string, payload?: object}} decision
 * @param {object} item   the current queue item
 */
export function commandFor(decision, item) {
  const { action } = decision;
  const note = oneLine(decision.note);
  const payload = decision.payload ?? {};
  if (!item) throw new Error('no longer waiting on you');
  if (!item.actions.includes(action)) throw new Error(`${action} is not offered for ${item.item_key}`);
  if (NOTE_ACTIONS.includes(action) && note.length < 3) throw new Error(`${action} needs a note saying what must change`);
  const d = item.details;
  switch (item.kind) {
    case 'teaser_script':
    case 'short':
      if (!KEY_RE.test(d.key)) throw new Error(`bad key ${d.key}`);
      if (action === 'approve') return `crew approve-script ${d.key}`;
      if (action === 'publish') return `crew publish ${d.key}`;
      return `crew reject ${d.key} ${note}`;
    case 'studio_unit': {
      const keys = new Set(d.items.map((i) => i.key));
      if (action === 'approve') {
        const except = (payload.except ?? []).filter(Boolean);
        const bad = except.filter((k) => !keys.has(k));
        if (bad.length) throw new Error(`not an item of this unit: ${bad.join(', ')}`);
        if (except.length >= keys.size) throw new Error('keeping every item private is not an approval; remake them instead');
        return `crew approve-studio ${d.course} ${d.unit}${except.length ? ` except ${except.join(' ')}` : ''}`;
      }
      if (!keys.has(payload.key)) throw new Error('choose which item to remake');
      return `crew reject-studio ${d.course} ${d.unit} ${payload.key} ${note}`;
    }
    case 'social_post':
      if (!/^[\w-]+$/.test(d.id)) throw new Error(`bad post id ${d.id}`);
      return action === 'post' ? `crew post ${d.id}` : `crew reject-post ${d.id} ${note}`;
    case 'crew_question': {
      const answer = String(payload.answer ?? '').toLowerCase();
      if (!d.options.includes(answer)) throw new Error(`answer one of: ${d.options.join(', ')}`);
      return `${d.id} ${answer}${note ? ` ${note}` : ''}`;
    }
    default:
      throw new Error(`${item.kind} has no decision`);
  }
}
