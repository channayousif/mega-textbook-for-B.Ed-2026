// Feature 031: the crew's daily social roundup (social-updates skill). Off until the owner sends
// `crew social on`. One `social_roundup` job a day from 15:00 PKT when there is something new, and
// one, still inside media hours, when an approved post waits to be published (the owner's `crew post`).
// Content posts publish without the owner after the pilot; feature posts never do.
import { withinHours, limits as paceLimits } from '../media/pacing.mjs';

export const SOCIAL_STAGE = 'social_roundup';
// From the opening of media hours, 15:00 PKT (media hours are every hour except the owner's 09:00-15:00
// office hours; owner, 2026-11-25), so the day's deployed work is posted that afternoon and evening.
// Posting itself stays paced: 2 h gaps and 3 posts a day per platform.
export const ROUNDUP_HOUR_PKT = 15;

/** The Pakistan date and hour of an instant. */
export const pkt = (d = new Date()) => {
  const t = new Date(d.getTime() + 5 * 3600_000);
  return { day: t.toISOString().slice(0, 10), hour: t.getUTCHours() };
};

/**
 * Whether to queue a roundup now. `lastDay` is the PKT day the last scheduled roundup was queued;
 * `fresh` says the dry collect found something new; `toPublish` counts approved, unposted posts.
 */
export function socialDue({ on, now = new Date(), lastDay = null, fresh = false, toPublish = 0, inFlight = false, hours = paceLimits().hours }) {
  if (!on || inFlight) return null;
  if (!withinHours(now.getTime(), hours)) return null; // posting is paced to media hours (D-2026-0100)
  if (toPublish > 0) return 'publish';
  const { day, hour } = pkt(now);
  if (hour >= ROUNDUP_HOUR_PKT && lastDay !== day && fresh) return 'roundup';
  return null;
}

export const socialScope = () => '`specs/social/updates.json` (the ledger snapshot) and your PHR only. Cards live in ~/studio-media/social and the public social-cards bucket; they never enter git.';

export function socialTask(j) {
  const U = 'node scripts/social/updates.mjs';
  const common = `Follow the social-updates skill. Never post anything that is not approved; never approve a feature post yourself (only the owner does, with \`crew post <id>\`). When done, run \`${U} snapshot\` and commit \`specs/social/updates.json\` with your PHR.`;
  if (j.mode === 'publish') {
    return `Publish the approved social posts: for each post \`${U} show\` lists as approved, run \`${U} publish <id>\` (it posts to Facebook, Instagram and LinkedIn, retries only the platforms that failed, and records each permalink). Print each result. A platform that fails twice: print a SOCIAL-HOLD line with the error and leave it for the next run. ${common}`;
  }
  return `Make today's social roundup of deployed work. Run \`${U} collect\`. For each new draft: if it is a feature post, write the English and Urdu line for every highlight marked needs_copy from its PR (\`gh pr view <n>\`) with \`${U} copy <id> <n> --en "..." --ur "..." --card-en "..." --card-ur "..."\` (the caption line explains the change in plain words for an ordinary reader, at most 320 characters; the card line is at most 68; never edit the ledger file by hand); then \`${U} check <id>\` until it passes and \`${U} render <id>\`, and read the card image (nothing clipped, Urdu right to left, the address visible). A content draft: \`${U} approve <id> --by auto\` (the ledger refuses during the pilot; then leave it for the owner) and \`${U} publish <id>\`. A feature draft: stop at the rendered card; the owner approves it. ${common}`;
}

/** One line for the owner: posts waiting for approval (with the card link) and posts waiting to publish. */
export function socialOwnerLine({ awaitingOwner = [], toPublish = [] }) {
  const parts = [];
  if (awaitingOwner.length) parts.push(`posts to approve: ${awaitingOwner.map((p) => `${p.id} (${p.card_url ?? p.card})`).join(', ')} - reply \`crew post <id>\` or \`crew reject-post <id> <note>\``);
  if (toPublish.length) parts.push(`approved, publishing: ${toPublish.map((p) => p.id).join(', ')}`);
  return parts.join(' · ') || 'nothing';
}
