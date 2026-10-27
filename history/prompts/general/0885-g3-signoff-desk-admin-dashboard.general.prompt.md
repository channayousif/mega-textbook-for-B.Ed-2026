---
id: 0885
title: G3 sign-off desk in admin dashboard
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/g3-signoff-desk
user: M Yousif Channa
command: (board-direct) plan then implement
labels: ["board-direct", "g3", "review", "admin-dashboard", "supabase", "crew"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: null
files:
 - history/adr/0032-g3-signoff-intent-ledger.md
 - history/adr/README.md
 - specs/017-reviewer-role/spec.md
 - supabase/migrations/0050_g3_signoffs.sql
 - scripts/lib/g3-desk.mjs
 - scripts/build-g3-desk.mjs
 - scripts/crew/signoff-sync.mjs
 - scripts/crew/tick.sh
 - src/lib/g3Desk.ts
 - src/components/G3Desk.module.css
 - src/pages/app/admin/g3-signoff.tsx
 - src/pages/app/admin/index.tsx
 - src/pages/app/admin/review-queue.tsx
 - package.json
 - .gitignore
 - tests/unit/g3Desk.test.mjs
 - tests/crew/signoff-sync.test.mjs
 - tests/rls/g3-signoffs.test.mjs
 - tests/e2e/g3-signoff.spec.ts
tests:
 - npx vitest run tests/unit/g3Desk.test.mjs tests/unit/reviewQueue.test.mjs (47 pass)
 - node --test tests/crew/signoff-sync.test.mjs (9 pass)
 - npm run check:content (all pass)
 - 0050 migration applied inside a rolled-back transaction on the self-hosted DB (privileges and trigger verified)
 - npm run build
 - tests/rls/g3-signoffs.test.mjs and tests/e2e/g3-signoff.spec.ts run in CI only after 0050 is applied
---

## Prompt

add 83 units G3 sign-off management function in in admin dashboard so that all the review and signing work can be completed conveniently at one place with visible records and greater picture.

## Response snapshot

Planned, then (after the owner chose "Supabase ledger + crew sync" for the write path) built the G3 sign-off desk at `/app/admin/g3-signoff`:

- `scripts/build-g3-desk.mjs` (prebuild) writes `static/g3-desk.json`: every authored unit's G3 state, its latest agent report (verdict, 7 criteria, findings, commands), its G3 tracker history and its review-input digest. The "awaiting" rule is the crew planner's `awaitingG3`, so the count matches the board: 83 awaiting (17 pass, 34 repaired revise, 32 escalate), 1 in agent review, 2 certified.
- Migration `0050_g3_signoffs.sql`: an admin-only intent ledger. Writes go only through `record_g3_signoff` (single or batch, all-or-nothing, a new decision supersedes a queued one) and `withdraw_g3_signoff`. Only the service role can call `mark_g3_signoff_synced`. A trigger mirrors the certification pass invariant.
- The page shows overview tiles, a state bar and per-course counts. A filterable table opens a unit drawer, which holds the agent evidence, editable criteria, findings that can be marked resolved, tracker history, and the decision with attestation. "Certify selected" covers clean agent passes in batches. The Records tab lists every decision with its PR link and a withdraw action.
- `scripts/crew/signoff-sync.mjs`, run from `tick.sh` with the key in `$STATE/signoff.env` (subshell only), works through the queued rows:
  - It refuses changed or already-certified units as `stale`.
  - It writes each Spec 017 certification and tracker row with the existing `buildCertification`/`buildTrackerRow`.
  - It runs `check:pipeline-gate` and opens one PR per run, which it never merges.
- ADR-0032 records the decision and amends Spec 017 FR-009 for this page only.

## Outcome

- ✅ Impact: one admin page shows every unit's G3 position and records owner decisions individually or in batches; Git stays the only gate record.
- 🧪 Tests: unit and crew tests pass; content gates pass; build result reported in the session. RLS and e2e need 0050 applied to the live instance first.
- 📁 Files: listed above.
- 🔁 Next prompts: apply 0050 to the self-hosted Supabase; create `~/.crew/mega-book/signoff.env` with the service key and URL; start signing.
- 🧠 Reflection: the e2e deliberately records nothing, because CI's Supabase is live and a queued row would become a real sign-off PR.

## Handoff (for CEO and agents)

- Shipped / changed: the G3 sign-off desk (page, desk data, ledger migration, crew sync step) and ADR-0032.
- Decisions the team must respect:
  - `g3_signoffs` is intent only and must never be read by a gate, banner or status report. Deriving publication from it needs a new ADR.
  - The crew never merges a `crew/g3-signoff-*` PR; merging it is the owner's sign-off.
- Pending / next owner:
  - Owner: apply `0050` on production before this PR's CI `rls`/`e2e` jobs can pass.
  - Owner: add `~/.crew/mega-book/signoff.env` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) to enable the sync.
- Paperclip issues affected: none (Paperclip retired; crew board tracks the 83 units).

## Evaluation notes (flywheel)

- Failure modes observed:
  - Local main was 1,516 commits behind origin, so the work moved to a fresh worktree.
  - Symlinked `node_modules` from stale checkouts broke the build until `npm ci`.
  - `check:all` ran a site build without `flock` once.
- Graders run and results (PASS/FAIL): vitest PASS, node:test PASS, check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run the desk generator's manifest pass once per course instead of once per unit (it takes about 25 s at prebuild).
