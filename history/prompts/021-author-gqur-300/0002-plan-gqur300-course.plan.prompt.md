---
id: "0002"
title: "Plan GQUR-300 course authoring"
stage: plan
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: /sp.plan
labels: ["course-authoring", "gqur-300", "quantitative-reasoning", "plan", "constitution-check"]
links:
  spec: specs/021-author-gqur-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/021-author-gqur-300/plan.md
tests:
  - Constitution Check table complete (no violations)
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Follow .claude/commands/sp.plan.md to produce specs/021-author-gqur-300/plan.md (include
the Constitution Check section; model on specs/018-author-geng300/plan.md). Degree-track
placement docs/semester-1/gqur-300/, full bilingual scope (G4/G5 included), G3 on every
unit, 6 units per the guide's explicit headings.

## Response snapshot

Wrote the implementation plan with a full Constitution Check table covering Articles
III.1-III.10, V.1, VI.1, and VII.8 (no violations; no complexity tracking entries).
The plan decomposes the work into 11 task groups: content-spec (G1, status draft until
evaluator approval), G0/G1 intake evaluation via prepare-intake-evidence.mjs with a FRESH
evaluator subagent bound to D-2026-0040..0049, six per-unit authoring tasks (nine-part
topic cycles, 10/10/5 banks, governance tables, figures with Urdu variants, gate evidence),
G3 advisory reviews, G4 Urdu mirrors, G5 advisory reviews, and final gates + PR. Week
schedule is derived-and-labelled per D-2026-0012 (guide is silent). Unit week split:
1-3 / 4-6 / 7-9 / 10-11 / 12-14 / 15-16 across 16 weeks.

## Outcome

- Impact: Plan ready for `/sp.tasks`
- Tests: Constitution Check table complete; all articles mapped to concrete plan items
- Files: 1 file created (plan.md)
- Next prompts: `/sp.tasks`
- Reflection: The 018 plan lacked an explicit Constitution Check heading; the task brief
  requires one, so the plan adds the table format from the plan template while keeping
  018's task-decomposition shape. The bilingual scope means every figure needs four
  variants (light/dark x en/ur labels), roughly doubling figure work vs GENG-300.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
