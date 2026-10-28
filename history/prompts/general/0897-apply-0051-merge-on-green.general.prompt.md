---
id: 0897
title: Apply 0051 and merge on green
stage: general
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/g3-desk-e2e-locator
user: M Yousif Channa
command: (board-direct) apply 0051 to production; merge #345 and #346 when green
labels: ["board-direct", "production", "supabase", "migration", "ci", "incident"]
links:
  spec: null
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: "#345, #346, and this PR"
files:
 - src/pages/app/admin/g3-signoff.tsx (aria-label="Units" on the units table)
 - tests/e2e/g3-signoff.spec.ts (row locator scoped to that table)
tests:
 - 0051 applied with psql --single-transaction ON_ERROR_STOP (exit 0)
 - live API probe after 0051: valid anon insert 201, bad locale 400, probe row deleted
 - CI e2e on #345 head a08350b5: FAIL (tbody tr matched the hidden By-course table)
---

## Prompt

apply 0051 to production and merge when green

## Response snapshot

- **0051:** applied to production in one transaction.
  - The check constraints, flood-brake trigger, admin read policy, and the INSERT-only grant for anon are all live.
  - Live probe: a valid anonymous insert returned 201 and a bad locale returned 400. I deleted the probe row.
- **#346:** watched; it merges only when green.
- **#345 incident:** it was merged while its e2e check was red.
  - The new G3 desk e2e used `page.locator('tbody tr')`, which first matched the hidden rows of the collapsed By-course table.
  - I pushed a fix to the PR branch. In the same minute, an earlier background watcher merged the PR, at head `a08350b5` without the fix. Its "all green" test (`gh pr checks | grep -v pass`) was satisfied by empty output: it treated "no checks listed" as green.
  - This PR lands the fix on main so main's e2e (and the CI-gated deploy) go green again.

## Outcome

- ✅ Impact: page_feedback is hardened on production, and main gets the e2e fix.
- 🧪 Tests: listed above.
- 📁 Files: listed above.
- 🔁 Next prompts: none.
- 🧠 Reflection: a merge-on-green watcher must require a non-empty check list with every entry passing, scoped to the PR's current head SHA.

## Handoff (for CEO and agents)

- Shipped / changed:
  - 0051 is on production.
  - #345 is on main: the G3 desk, migration 0050, and the crew sync step, which goes live on the next tick.
  - This PR fixes the desk's e2e locator.
- Decisions the team must respect: never auto-merge on an empty or stale check list. Check the head SHA and that the list is non-empty.
- Pending / next owner:
  - Until this PR merges, main's e2e is red and deploys of main are held. The desk itself works; only the test was wrong.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the watcher read an empty check list as green, and a merge raced a push.
- Graders run and results (PASS/FAIL): 0051 probe PASS; #345 e2e FAIL (test bug), fixed here.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a shared `merge-when-green` helper that pins the head SHA.
