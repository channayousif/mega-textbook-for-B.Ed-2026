# Feature 035: Owner Decisions page

**Status**: active | **Created**: 2026-11-27 | **Owner**: curriculum owner (board-direct)

## Why

Items waiting on the owner were spread over the crew board (BOARD.md), `scripts/media/status.mjs`,
WhatsApp and Discord replies, and the YouTube channel. Each needed a typed crew command. The owner
had no single place to see what waits, why, and decide.

## What

One admin page, `/app/admin/decisions`, that lists everything waiting on the owner with what is needed
to decide (description, script lines, review notes, YouTube links), and buttons that carry the decision
out through the crew's own command path.

Covered (owner ruling 2026-11-27):
- teaser scripts awaiting approval (`crew approve-script` / `crew reject`);
- private Shorts awaiting publish (`crew publish` / `crew reject`);
- Study Studio units awaiting the owner's watch (`crew approve-studio [except ...]` / `crew reject-studio`);
- social posts awaiting approval (`crew post` / `crew reject-post`);
- crew C-### questions (`C-### <option> [note]`);
- G3 sign-offs as a count and a link to the existing desk (no second desk).

## Owner rulings (2026-11-27)

- Decide from the page, not only view.
- Scope as listed above.
- Delivered first of three PRs; second-account producers (agy2 images, gflow2, nlm2) and Cloudflare
  Workers AI follow as Features 036 and 037.

## Requirements

- FR-001: The waiting list is the crew's own view (board.json owner lists, open decisions), pushed by the
  host each tick, so an item decided over WhatsApp leaves the page at the next tick.
- FR-002: A decision is an instruction row; the crew applies it with `crew.mjs cmd ... --via web`, with
  every check that path makes (script sha256, item state, except keys, notes). The page never changes
  crew state itself.
- FR-003: A decision made on an older version of an item (digest changed) or on an item no longer waiting
  is refused, never applied.
- FR-004: Reject and remake need a note. One queued decision per item; a new one supersedes it; a queued
  decision can be withdrawn.
- FR-005: Tables are admin-read-only; owner writes go through RPCs, crew writes through service-role RPCs.
  No gate, build or status report reads them.
- FR-006: The page shows how old the list is and warns after 30 minutes.
- FR-007: WhatsApp, Discord and CLI commands keep working unchanged.
- FR-008: Nothing under `scripts/lib/gates.mjs` or the review-evidence binding imports the new scripts.
