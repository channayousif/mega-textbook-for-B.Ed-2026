---
id: "0536"
title: "ADR crew self-maintenance and intelligence"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-weekly-maintenance
user: M Yousif Channa
command: /sp.adr crew-self-maintenance-and-intelligence
labels: ["board-direct", "adr", "crew", "maintenance", "intelligence"]
links:
  spec: specs/maintenance/README.md
  ticket: null
  adr: history/adr/0031-crew-self-maintenance-and-intelligence-pipeline.md
  pr: "#283"
files:
 - history/adr/0031-crew-self-maintenance-and-intelligence-pipeline.md
 - ops/crew/README.md
 - history/prompts/general/0536-adr-crew-self-maintenance-and-intelligence.general.prompt.md
tests:
 - ADR grader: clustered decision, 7 alternatives with rationale, positive and negative consequences, references
---

## Prompt

run adr

(Owner accepted the suggestion "Run `/sp.adr crew-self-maintenance-and-intelligence`" from PR #283.)

## Response snapshot

No feature plan.md exists for this work; the approved plan
(/home/a2ahs/.claude/plans/vivid-scribbling-sprout.md) and PR #283 are its planning artifacts. One
decision cluster passed all three significance tests: the crew's self-maintenance and intelligence
pipeline (tick-driven cadence 12 h harvest / daily distill / weekly promote; repo-resident registry
with measured effect; weekly SDD-RI survey and fan-out to own PRs; merge gate = green CI + passing
cross-family review + no protected path, with .claude/ added to the protected list; dispatcher-
enforced content boundary; generated ADR register, never rewriting decisions). Created ADR-0031
(Proposed; accepted when the owner merges #283) via create-adr.sh (it takes max+1, avoiding the
untracked 0028 draft in the main checkout). Related: extends ADR-0030; consistent with ADR-0019,
0021, 0026. No conflicts.

## Outcome

- Impact: the decision to let the crew merge some of its own changes after a cross-family review is
  recorded with its alternatives and risks.
- Tests: grader above.
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: ADR-0031 (Proposed) in PR #283.
- Decisions to respect: maintenance PRs need green CI + a different-family review pass; protected
  paths including .claude/ stay owner-only; ADRs are summarised, never rewritten or auto-created.
- Pending: owner merge of #283 accepts ADR-0031.
- Paperclip issues affected: none.
