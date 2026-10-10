---
id: 0109
title: GPKS-402 content spec repairs post-intake
stage: green
date: 2026-10-10
surface: agent
model: LongCat-2.0
feature: gpks-402-authoring
branch: agent/TEX-44
user: curriculum-owner
command: /paperclip/assign
labels: ["BilingualAuthor", "gpks-402", "content-spec", "repairs"]
links:
  spec: null
  ticket: TEX-44
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/124
files:
  - specs/content/gpks-402/content-spec.md
tests:
  - npm run check:content (structural checks pass; pipeline/figures expected red at draft/prompt-only)
---

## Prompt

TEX-44 recovery: board directed author repairs to GPKS-402 content spec after G0/G1 intake evaluation (D-2026-0052/53). Repairs: fix ERQ blueprint (5 ERQs per unit), fix week schedule (Units 4/5/6), fix unit titles/opening lines, remove unresolvable readings (ziad, goe-bloom), add author-selected open-access sources, set open_access_floor: 1, fix tasks.md G1 claims.

## Response snapshot

Made all directed repairs to specs/content/gpks-402/content-spec.md:
- ERQ blueprint fixed for all 6 units (now yields 5 ERQs each)
- Week schedule aligned with guide (Unit 4: 7-8,10; Unit 5: 11-12; Unit 6: 13-15)
- Unit opening lines and titles aligned
- Removed ziad-pak-foreign-policy (unresolvable) and goe-bloom (off-topic, Unit 8)
- Added 6 author-selected open-access sources (pbs-pak-stats, sbp-annual, mofa-foreign-policy, pak-constitution-1973, unesco-pak-education, na-lahore-resolution)
- Set open_access_floor: 1 in frontmatter
- Fixed hec-pak-studies ambiguity note and burki "fifty decades" note
- Course code note now cites G-2026-03

Committed and pushed to agent/TEX-44. Task set to in_review for board re-run of intake.

## Outcome

- Impact: Content spec repairs complete; ready for board re-run of G0/G1 intake
- Tests: Structural checks pass
- Files: 1 file changed (content-spec.md)
- Next prompts: Board re-runs intake; on approval, spec moves to status: approved and authoring continues

## Handoff (for CEO and agents)

- Shipped / changed: GPKS-402 content spec repairs (ERQ blueprint, week schedule, readings, open_access_floor)
- Decisions the team must respect: Content spec status remains `draft` (board action to approve). Units 1-2 withdrawn; re-author after spec approval.
- Pending / next owner: Board re-runs G0/G1 intake on repaired spec. BilingualAuthor waits for approval before authoring further units.
- Paperclip issues affected: TEX-44.

## Evaluation notes (flywheel)

- Failure modes observed: None in this heartbeat.
- Graders run and results: Structural checks pass.
