---
id: 0555
title: Re-review repaired G3 revise verdicts
stage: green
date: 2026-10-25
surface: agent
model: claude-opus-5-5
feature: crew
branch: crew/lead-g3-rereview
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "g3", "adr-0019"]
links:
  spec: null
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - scripts/crew/planner.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/workers.mjs
 - tests/crew/planner.test.mjs
tests:
 - npm run test:crew (64 pass, 1 pre-existing fail in workers.test.mjs, fixed by PR #329)
---

## Prompt

help me 83 units sign-off

(Owner chose all three follow-ups: a sign-off packet for the 14 current passes, a crew fix so repaired
units get re-reviewed, and a rulings brief for the escalations.)

## Response snapshot

Triage of the 83 "awaiting G3" units: 14 current passes, 3 passes made stale by later English edits,
34 `revise` verdicts whose repairs no reviewer had verified, 32 escalations. 31 of the repaired
revises are on their first review cycle, so ADR-0019 (at most two repair/review cycles per stage)
allows the crew one more independent review. The planner now plans `review_en` for a repaired
`revise` while fewer than two G3 reports exist, and lists the unit for the owner only once the cycles
are used up. `pickLatestReport` returns `cycles` (the number of reports). The re-review excludes the
families of both the author and the repairer, and its brief tells the reviewer to verify the prior
report's findings.

## Outcome

- ✅ Impact: about 31 units move from the owner's sign-off list to crew re-review; escalations the owner sends back for repair (`crew.mjs add <COURSE> <unit> repair_en`) are re-reviewed too
- 🧪 Tests: test:crew 64/65; the one failure predates this change
- 📁 Files: planner.mjs, crew.mjs, workers.mjs, planner.test.mjs
- 🔁 Next prompts: owner approves the PR (protected scripts/crew)
- 🧠 Reflection: "awaiting sign-off" mixed verified passes with unverified repairs

## Handoff (for CEO and agents)

- Shipped / changed: planner re-reviews repaired G3 revises within the ADR-0019 cycle limit
- Decisions the team must respect: a G3 re-review never uses the author's or the repairer's model family; a unit with two or more G3 reports goes to the owner, never to a third review
- Pending / next owner: owner merge approval; it touches stagesFor, as #327 (M2) does, so whichever merges second needs a rebase
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: owner queue inflated by units that still had crew work left
- Graders run and results (PASS/FAIL): test:crew PASS except the pre-existing workers.test failure
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): show the cycle count on the board's awaiting list
