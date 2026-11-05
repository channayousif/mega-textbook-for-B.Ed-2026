---
id: 20261125
title: Verify GICT Unit Four Repairs
stage: general
date: 2026-11-05
surface: agent
model: GPT-6
feature: none
branch: crew/gict-300-u04-repair_en-r1
user: crew
command: Read .crew/brief.md
labels: ["codex", "gict-300", "repair_en"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gict-300/tasks.md
  - history/prompts/general/20261125-verify-gict-unit-four-repairs.general.prompt.md
tests:
  - npm run check:content
  - scripts/heavy.sh npm test
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified existing Unit 4 repairs against the latest G3 report and appended the requested advisory tracker row.

## Outcome

- ✅ Impact: Traceable continuation without duplicating baseline repairs.
- 🧪 Tests: All 14 content gates passed on rerun; 31 test files and 368 tests passed; git diff --check passed.
- 📁 Files: Tracker and this PHR only.
- 🔁 Next prompts: Owner reconciliation of A3 and tooling repair for A6; independent review after cycle-limit authorisation.
- 🧠 Reflection: The checkout equals origin/main at 2a92a9f7c and already contains all permitted content repairs.

## Handoff (for CEO and agents)

- Shipped / changed: Verified B1/B2 and A1/A2/A4/A5/A7; appended an unticked G3 row naming 20261102T212207Z-g3-desk-3326366e.json.
- Decisions the team must respect: Do not edit approved content-spec or tooling in this unit job; do not certify G3/G5.
- Pending / next owner: Curriculum owner owns A3 reading-list mismatch; tooling owner owns A6 camelCase dependency binding; owner must handle ADR-0019 cycle limit.
- Paperclip issues affected: gict-300-u04-repair_en-r1; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Review findings predate repairs already present on main; avoided unnecessary content rewrites.
- Graders run and results (PASS/FAIL): PASS: all 14 content gates, 368 unit tests, git diff --check. Initial content-status failure was resolved by npm run build:content-status (ignored generated output).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of frozen inputs after owner resolves outstanding dependencies.
