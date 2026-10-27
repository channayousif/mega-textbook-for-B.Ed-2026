---
id: 0893
title: Ship the G3 sign-off desk PR
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/g3-signoff-desk
user: M Yousif Channa
command: (board-direct) rebase on main, re-test, commit, open PR
labels: ["board-direct", "g3", "admin-dashboard", "crew"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/345
files:
 - scripts/lib/g3-desk.mjs (pass g3Cycles to awaitingG3)
 - tests/crew/signoff-sync.test.mjs
 - every file listed in PHR 0885 (ADR renumbered 0031 to 0032)
tests:
 - npm run test:crew (80 pass)
 - npx vitest run tests/unit/g3Desk.test.mjs tests/unit/reviewQueue.test.mjs (47 pass)
 - node scripts/build-g3-desk.mjs (51 awaiting, equal to the crew board)
---

## Prompt

next

## Response snapshot

I moved the uncommitted desk work onto main, which now includes #334, #336 and #342.
- **ADR number:** the desk's ADR is now 0032, because #336 took 0031.
- **Re-review rule:** after #334, a repaired first-cycle G3 revise is re-reviewed before it reaches the owner. `deskUnit` was calling `awaitingG3` without `g3Cycles`, so I now pass `report.cycles`, as `crew.mjs` `unitFacts` does.
- **Count check:** the desk shows 51 units awaiting sign-off, equal to the crew board's 51.
- **PR:** committed and opened. Migration 0050 is NOT applied to production.

## Outcome

- ✅ Impact: the desk PR is open and its awaiting rule matches the crew after #334.
- 🧪 Tests: listed above.
- 📁 Files: listed above.
- 🔁 Next prompts: the owner approves applying 0050 to production, then CI's rls and e2e jobs can pass.
- 🧠 Reflection: the desk imports the planner rule, but it builds its own facts object. A new fact added to the planner has to reach the desk too, and the crew test now pins this.

## Handoff (for CEO and agents)

- Shipped / changed: the G3 sign-off desk PR (see PHR 0885 and ADR-0032).
- Decisions the team must respect: the facts `deskUnit` passes to `awaitingG3` must match what `crew.mjs` `unitFacts` passes.
- Pending / next owner:
  - Owner: apply `0050` on production.
  - Owner: add `~/.crew/mega-book/signoff.env`.
  - Owner: merge the PR.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: new planner facts silently diverge from the desk.
- Graders run and results (PASS/FAIL): test:crew PASS, vitest PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): export a shared `g3Facts()` helper from the planner.
