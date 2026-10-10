---
id: 0110
title: owner-rulings-s2-intake
stage: general
date: 2026-10-10
surface: agent
model: claude-opus-5-5
feature: none
branch: governance/s2-intake-owner-rulings
user: M Yousif Channa
command: owner rulings on Semester 2 intake gaps
labels: ["board-direct", "paperclip", "governance", "intake", "tex-37"]
links:
  spec: null
  ticket: TEX-37
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/125
files:
  - specs/decisions/log.md (D-2026-0053 on main; D-2026-0047..0052 confirmed on TEX-39..44 branches)
  - specs/gaps.md (G-2026-72..74, 77..79, 82, 83, 87..89, 92..94, 97..100 resolved on their branches)
  - docs/semester-2/gpks-402/unit-0{1,2}/ and UR mirrors, specs/content/gpks-402/*/unit-0{1,2}.md (deleted, agent/TEX-44)
  - specs/content/gpks-402/tasks.md (agent/TEX-44)
  - history/prompts/general/0110-owner-rulings-s2-intake.general.prompt.md
tests:
  - validate:content, check:no-em-dash, check:docs-sync, check:figures on agent/TEX-44 after withdrawal (all exit 0)
---

## Prompt

accept the plan's grouping for all, 
1. confim
2. agreed
3. it 3 credit hours theory
4. sometimes guide lists broad topics and reading list, we have to decide subtopics from relavance to the course outcomes and referred reading material.
5. withdraw.

 proceed

## Response snapshot

Recorded owner rulings as D-2026-0053 (PR #125 to main): partitions confirmed (weeks follow guide week tables), readings posture (author-selected verified works where guide has none/print-only, open_access_floor 1 per unit; interpretation of "agreed"), EFMP-305 3 (3-0), outcome/reading-derived sub-topics permitted when the row names its derivation, GPKS-402 Units 1-2 withdrawn. On each child branch: intake D-codes confirmed, ruled gaps marked resolved. Deleted GPKS-402 Units 1-2 (EN+UR + per-unit governance) on agent/TEX-44; gates green. Posted rulings and next steps to TEX-37..44.

## Outcome

- No spec approved yet; each needs author repairs then a fresh intake.

## Handoff (for CEO and agents)

- Shipped / changed: D-2026-0053; gap and decision statuses on six branches; GPKS-402 U1-2 withdrawn.
- Decisions the team must respect: D-2026-0053 items 1-5. Only the intake evaluator moves a spec to approved; agents never edit `status:`.
- Pending / next owner: BilingualAuthor makes author repairs on TEX-39..44 and comments "repairs done"; board re-runs intake on a fresh manifest. Still open: G-2026-75 (EFMP-305 80/20 label, owner), G-2026-91 (depth-gate tooling, WebLeadAgy).
- Paperclip issues affected: TEX-37, TEX-39, TEX-40, TEX-41, TEX-42, TEX-43, TEX-44.
