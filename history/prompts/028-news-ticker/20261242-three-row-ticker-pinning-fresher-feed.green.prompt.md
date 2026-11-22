---
id: 20261242
title: Three-row news ticker, full list, pinning and a fresher feed
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 028-news-ticker
branch: feat/028-news-ticker-v2
user: M Yousif Channa
command: news-ticker
labels: [board-direct, news-ticker]
links:
  spec: specs/028-news-ticker/spec.md
  ticket: null
  adr: history/adr/0034-news-feed-sources-and-public-news-table.md
  pr: null
files:
  - scripts/build-news-feed.mjs
  - supabase/migrations/0054_news_pins.sql
  - src/lib/newsMerge.ts
  - src/lib/news.ts
  - src/lib/types.ts
  - src/components/NewsTicker/index.tsx
  - src/components/NewsTicker/styles.module.css
  - src/components/icons/paths.ts
  - src/pages/app/admin/news.tsx
  - supabase/functions/_shared/digestEmail.ts
  - docusaurus.config.ts
  - i18n/ur/code.json
  - tests/unit/news-feed.test.mjs
  - tests/unit/news-merge.test.mjs
  - tests/unit/digest-email.test.mjs
  - tests/rls/news-items.test.mjs
  - tests/profile-dependents.mjs
  - tests/e2e/news-ticker.spec.ts
  - specs/028-news-ticker/spec.md
  - specs/028-news-ticker/tasks.md
  - history/adr/0034-news-feed-sources-and-public-news-table.md
tests:
  - tests/unit/news-feed.test.mjs (16)
  - tests/unit/news-merge.test.mjs
  - tests/unit/digest-email.test.mjs (13)
  - tests/unit/icon-pack.test.mjs
  - tests/e2e/news-ticker.spec.ts
  - 0054 on stubs in a disposable supabase/postgres:17.6.1.136 container
---

## Prompt

approve, posted all to tiktok, news-ticker

(owner choosing the news-ticker follow-up from the unfinished-plans inventory; the plan and the
owner's design choices date from 2026-11-17: three rows by type, grouped bursts plus revision and
illustration events, a "View all" drop-down, admin pinning of any item)

## Response snapshot

- Feed (`scripts/build-news-feed.mjs`): `updated`, `figures` and `provisional` events from git.
  Deviation from the plan, on the data: skipping revisions of any unit first published in the
  60-day window left one `updated` event, because most units are that new; now only edits in a
  unit's first week are skipped, and the same week rule stops figures that come with a new unit
  from flooding the feed. Current feed: 34 units, 37 Urdu, 33 figure batches, 10 revisions.
- `provisional` has no source today (no unit is in that state; the content-status report has no
  such units), so it stays dormant until one is.
- Pins: migration 0054 `news_pins`, keyed by feed event id; verified on stubs in a disposable
  container (non-admin and anon refused, bad id and past date refused, active-only public read,
  audit rows, set null on profile delete).
- Ticker: rows with label buttons (aria-label so phones, where the text is hidden, keep a name),
  still pinned chips with a pin mark, one Pause, a "View all" panel. Admin page: Pin/Unpin with
  an optional end date. Weekly email: Updated units and New illustrations.
- A test that only allowed database icons as defaults was narrowed: automatic events are never
  stored, so their icons need only exist in the pack.

## Outcome

- ✅ Impact: the ticker reads as three tidy rows, announces revisions and new illustrations, and
  admins can pin.
- 🧪 Tests: news feed, merge, email and icon tests pass; e2e and build in the PR.
- 📁 Files: see front matter.
- 🔁 Next prompts: owner approves applying 0054 to the shared Supabase (CI's RLS job needs it).
- 🧠 Reflection: check a plan's rule against today's data before trusting it; the "skip new units"
  rule from 17 Nov hid almost every revision.

## Handoff (for CEO and agents)

- Shipped / changed: three-row ticker, panel, pins, new feed events, email sections, ADR-0034 amendment.
- Decisions the team must respect: owner 2026-11-17 design; news_pins writes only through set_news_pin.
- Pending / next owner: T026 rollout (owner approval): apply 0054 live and `notify pgrst`, copy
  `_shared/digestEmail.ts` to the edge volume after merge; T017 Gmail check still open.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a dedupe rule written before the data was checked.
- Graders run and results (PASS/FAIL): unit PASS; disposable-DB checks PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): rank lanes by recency per course so one course cannot fill a row.
