---
id: 0040
title: Repair Translation Handoff Evidence
stage: green
date: 2026-10-18
surface: agent
model: GPT-6 (Codex)
feature: gict-300
branch: crew/gict-300-u03-translate
user: board
command: carry out .crew/brief.md
labels: ["board-direct", "gict-300", "translation", "G4"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gict-300/reviews/unit-03/G4/translation-handoff.md
  - specs/content/gict-300/translation/unit-03-handoff.md (moved)
  - specs/content/gict-300/tasks.md
  - history/prompts/gict-300/0040-repair-translation-handoff-evidence.green.prompt.md
tests:
  - npm run check:content
  - six G2 input manifest comparisons
  - seven-file structural parity comparison
  - npm run figures:variants:check
  - git diff --cached --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued commit 20c1490b, preserving its complete Urdu mirror and figure repairs.
Moved the translation handoff into Unit 3's G4 lifecycle-record folder and updated
its tracker link, removing the six new stale G2 findings without changing gate
code or evidence. Regenerated the ignored local content-status report.
All 13 content gates passed. Translation remains draft with G4 in progress.

## Outcome

- Impact: Restored all six GICT-300 G2 manifests to exact equality with recorded inputs.
- Tests: All 13 content gates pass; seven-file structural parity passes.
- Files: Handoff relocation, Unit 3 tracker link, and this PHR.
- Next prompts: Independent G5 after accepted G3; rendered Urdu inspection by review owner.
- Reflection: Lifecycle records belong in the excluded record tree, not shared input roots.

## Handoff (for CEO and agents)

- Shipped / changed: Existing Unit 3 translation retained; evidence freshness regression repaired.
- Decisions the team must respect: No G3/G5 certification or reviewed status; frozen bank untouched.
- Pending / next owner: Review owner resolves G3 dependency and obtains fresh G5 with desktop, narrow and A4 rendering. Curriculum owner resolves proposed terminology in handoff.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: unit-03-handoff.md was interpreted as a shared course input; stale ignored content-status report.
- Graders run and results (PASS/FAIL): check:content PASS; manifest comparison PASS; structural parity PASS; whitespace PASS.
- Prompt variant (if applicable): Continuation after prior crew attempt.
- Next experiment (smallest change to try): Keep translation records under reviews/unit-03/G4; do not alter evidence to fit administrative records.
