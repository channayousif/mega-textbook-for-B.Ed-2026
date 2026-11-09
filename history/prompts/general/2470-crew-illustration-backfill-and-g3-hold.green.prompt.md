---
id: 2470
title: Backfill raster illustrations and hold G3 until they are placed
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-illustration-backfill
user: M Yousif Channa
command: investigate (plan mode, then implement)
labels: [board-direct, crew, illustrations, g3-desk]
links:
  spec: null
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: null
files:
  - scripts/crew/planner.mjs
  - scripts/crew/review-facts.mjs
  - scripts/crew/crew.mjs
  - scripts/crew/workers.mjs
  - scripts/lib/g3-desk.mjs
  - scripts/build-g3-desk.mjs
  - .claude/skills/author-unit/references/figure-prompts.md
  - specs/decisions/log.md
  - ops/crew/README.md
  - tests/crew/planner.test.mjs
  - tests/crew/worker-chains.test.mjs
tests:
  - npm run test:crew (119/119 pass)
  - npm run check:docs-sync (pass)
  - crew.mjs plan --dry-run (2 plan_illustrations jobs; 17 awaiting, was 78)
  - build-g3-desk.mjs locally (GISS-401 U1 in_review; 17 awaiting)
---

## Prompt

investigate why crew is recommending for certify but render images are not there :

GISS-401 Unit 1: Introduction to Islamic Studies and the Fundamental Beliefs of Islam
Awaiting you Read the unit | Agent report

Suggested: Certify
The agent passed all 7 criteria and every gate, with no open findings. Read the unit, then certify.

(follow-up) i mean raster images/illustrations

(owner answers) Religious courses: "Yes, with limits (Recommended)". Units already on the desk with a pass: "Hold until illustrated".

## Response snapshot

Cause: GISS-401 U1 was authored at 2026-11-03 04:01 (`f2694f1b1`), 12 hours before `c74f8afb3` taught author-unit to plan an ADR-0029 banner and scenes. The approved spec's figure plan is schematic-only, so the unit has no illustration rows and no `unit-01.banner.md`. The planner queued `illustrate` only for existing rows, and neither G3 nor any gate checks for raster images, so the agent's pass was valid and the desk suggested Certify. 98 of 120 units had no banner. The pass was also stale: the unit's topic files changed after the review (`c01a4ed7b`).

Fix: new Claude-owned crew stage `plan_illustrations` (banner sidecar row plus optional per-topic scene markers and rows, prompt-only; at most two in flight). `illustrationsPending` holds `review_en` and `awaitingG3` until images are placed. A `pass` whose own unit files changed (`unitScopedChanges`, which ignores shared gate/guide churn) gets a fresh review. The desk uses the same facts through `scripts/crew/review-facts.mjs`. Sacred-figure limits were added to the author-unit prompt rule and to the illustrate rejection criteria for every course, and the rulings were recorded as D-2026-0081.

## Outcome

- ✅ Impact: units without raster images stop reaching the desk as "Certify". They get planned, illustrated, re-reviewed, and only then offered.
- 🧪 Tests: test:crew 119/119; docs-sync pass; planner dry run and local desk build agree (17 awaiting).
- 📁 Files: crew planner, facts module, crew brief/stages, desk builder/lib, author-unit figure-prompts, decision log, crew README, tests.
- 🔁 Next prompts: watch the first plan_illustrations → illustrate → review_en cycle (EFMP-301 U2/U3 are first by order).
- 🧠 Reflection: a rule added to a skill only reaches work authored afterwards; any new standard needs a backfill path in the planner.

## Handoff (for CEO and agents)

- Shipped / changed: `plan_illustrations` stage (chain claude, agy_claude); illustration hold on review and desk; stale-pass re-review; sacred-figure limits; D-2026-0081.
- Decisions the team must respect: D-2026-0081. Certified units are not backfilled. Never depict a prophet, companion, angel or sacred person, or scripture or calligraphy, in any course image. Shared-input changes (gates, style guide, course guides) do not by themselves trigger re-review.
- Pending / next owner: owner merges this PR. Expect the desk to drop from 78 to 17 awaiting while 61 units are illustrated; illustrate is serial on the agy quota, so the backfill takes many ticks. GISS/GQUR images need the owner's or an Islamic studies reviewer's look at cultural accuracy.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: skill-level rule with no backfill; desk suggestion built on a stale pass.
- Graders run and results (PASS/FAIL): test:crew PASS; docs-sync PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): if illustrate throughput is too slow, allow banner-only units to clear the hold before topic scenes.
