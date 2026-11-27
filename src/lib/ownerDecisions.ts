/**
 * The Owner Decisions page's pure half (Feature 035): groups what waits on the owner
 * (`owner_queue`, pushed by scripts/crew/decisions-sync.mjs) with the owner's latest decision on
 * each item (`owner_decisions`), decides which buttons may be pressed, and previews the crew
 * command a decision runs.
 *
 * Free of `@site/...` value imports, like `g3Desk.ts`, so vitest can import it directly. The crew
 * side (scripts/crew/owner-queue.mjs `commandFor`) is the authority on commands; the preview here
 * only mirrors it for the "Copy crew command" fallback.
 */

export type ItemKind = 'teaser_script' | 'short' | 'studio_unit' | 'studio_progress' | 'social_post' | 'crew_question' | 'g3';
export type Action = 'approve' | 'reject' | 'publish' | 'remake' | 'post' | 'answer';
export type Link = { label: string; url: string };

export type QueueItem = {
  item_key: string;
  kind: ItemKind;
  title: string;
  summary: string | null;
  details: Record<string, any>;
  links: Link[];
  actions: Action[];
  digest: string;
  waiting_since: string | null;
  first_seen: string;
  snapshot_at: string;
};

export type DecisionRow = {
  id: string;
  item_key: string;
  kind: string;
  action: Action;
  note: string | null;
  payload: Record<string, any>;
  digest: string;
  title: string | null;
  decided_at: string;
  status: 'queued' | 'applied' | 'refused' | 'withdrawn';
  command: string | null;
  result: string | null;
  synced_at: string | null;
};

export const GROUPS: { kind: ItemKind; title: string; lead: string }[] = [
  { kind: 'teaser_script', title: 'Teaser scripts', lead: 'No Veo credits are spent until you approve a script.' },
  { kind: 'short', title: 'Private Shorts', lead: 'Watch each private Short on YouTube, then publish it or hold it with a note.' },
  { kind: 'studio_unit', title: 'Study Studio units', lead: 'Watch the private audio and video of a unit, then approve it or have one item remade.' },
  { kind: 'studio_progress', title: 'Study Studio in progress', lead: 'Items you can already watch; the unit is approved once everything is ready.' },
  { kind: 'social_post', title: 'Social posts', lead: 'Feature posts wait for you before Facebook, Instagram and LinkedIn.' },
  { kind: 'crew_question', title: 'Crew questions', lead: 'The crew stopped and asked you.' },
  { kind: 'g3', title: 'G3 sign-offs', lead: 'Decided on the G3 sign-off desk.' },
];

export const ACTION_LABEL: Record<Action, string> = {
  approve: 'Approve', reject: 'Reject', publish: 'Publish', remake: 'Remake one item', post: 'Post', answer: 'Answer',
};
export const NOTE_ACTIONS: Action[] = ['reject', 'remake'];

/** Minutes since the crew last pushed the queue; the page warns after STALE_MINUTES. */
export const STALE_MINUTES = 30;
export function minutesSince(iso: string | null | undefined, now = Date.now()): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : Math.max(0, Math.round((now - t) / 60000));
}

/** The newest decision per item. */
export function latestDecisions(rows: DecisionRow[]): Map<string, DecisionRow> {
  const out = new Map<string, DecisionRow>();
  for (const r of rows) {
    const cur = out.get(r.item_key);
    if (!cur || Date.parse(r.decided_at) > Date.parse(cur.decided_at)) out.set(r.item_key, r);
  }
  return out;
}

export type Card = { item: QueueItem; decision: DecisionRow | null; canDecide: boolean };

/**
 * Cards per group, oldest waiting first. A card can be decided unless a decision on it is queued;
 * an applied or refused decision on an older version (other digest) no longer counts.
 */
export function groupCards(items: QueueItem[], rows: DecisionRow[]): { kind: ItemKind; title: string; lead: string; cards: Card[] }[] {
  const latest = latestDecisions(rows);
  const when = (i: QueueItem) => Date.parse(i.waiting_since ?? i.first_seen) || 0;
  return GROUPS.map((g) => ({
    ...g,
    cards: items.filter((i) => i.kind === g.kind).sort((a, b) => when(a) - when(b)).map((item) => {
      const d = latest.get(item.item_key) ?? null;
      const decision = d && (d.status === 'queued' || d.digest === item.digest) ? d : null;
      return { item, decision, canDecide: item.actions.length > 0 && decision?.status !== 'queued' };
    }),
  })).filter((g) => g.cards.length > 0);
}

/** Whether a button may be pressed with the current form state. */
export function actionReady(action: Action, form: { note: string; except?: string[]; remakeKey?: string; answer?: string }, item: QueueItem): boolean {
  if (NOTE_ACTIONS.includes(action) && form.note.trim().length < 3) return false;
  if (action === 'remake' && !form.remakeKey) return false;
  if (action === 'answer' && !(item.details.options ?? []).includes(form.answer)) return false;
  if (action === 'approve' && item.kind === 'studio_unit' && (form.except?.length ?? 0) >= (item.details.items ?? []).length) return false;
  return true;
}

/** The payload record_owner_decision stores for an action. */
export function payloadFor(action: Action, form: { except?: string[]; remakeKey?: string; answer?: string }, item: QueueItem): Record<string, unknown> {
  if (item.kind === 'studio_unit' && action === 'approve') return { except: form.except ?? [] };
  if (action === 'remake') return { key: form.remakeKey };
  if (action === 'answer') return { answer: form.answer };
  return {};
}

const oneLine = (s: string | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

/** Preview of the crew command (mirror of owner-queue.mjs commandFor), for the copy fallback. */
export function commandPreview(action: Action, form: { note: string; except?: string[]; remakeKey?: string; answer?: string }, item: QueueItem): string {
  const d = item.details;
  const note = oneLine(form.note) || '<what must change>';
  switch (item.kind) {
    case 'teaser_script':
    case 'short':
      if (action === 'approve') return `crew approve-script ${d.key}`;
      if (action === 'publish') return `crew publish ${d.key}`;
      return `crew reject ${d.key} ${note}`;
    case 'studio_unit':
      if (action === 'remake') return `crew reject-studio ${d.course} ${d.unit} ${form.remakeKey ?? '<item key>'} ${note}`;
      return `crew approve-studio ${d.course} ${d.unit}${form.except?.length ? ` except ${form.except.join(' ')}` : ''}`;
    case 'social_post':
      return action === 'post' ? `crew post ${d.id}` : `crew reject-post ${d.id} ${note}`;
    case 'crew_question':
      return `${d.id} ${form.answer ?? '<option>'}${oneLine(form.note) ? ` ${oneLine(form.note)}` : ''}`;
    default:
      return '';
  }
}

export const STATUS_TEXT: Record<DecisionRow['status'], string> = {
  queued: 'Queued: the crew applies it at its next tick (about 15 minutes).',
  applied: 'Applied by the crew.',
  refused: 'Refused by the crew.',
  withdrawn: 'Withdrawn.',
};
