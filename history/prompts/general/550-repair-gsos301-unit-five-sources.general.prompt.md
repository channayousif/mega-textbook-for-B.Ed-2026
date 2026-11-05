---
id: 550
title: Repair GSOS301 Unit Five Sources
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/gsos-301-u05-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "gsos-301", "repair-en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gsos-301/sources/unit-05.md
  - specs/content/gsos-301/sources/texts/u05-who-lhw.md
  - specs/content/gsos-301/sources/texts/u05-andrabi2015.md
  - specs/content/gsos-301/sources/texts/u05-cii-functions.md
  - specs/content/gsos-301/coverage/unit-05.md
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-05/G3/repair-handoff-20261105.md
  - specs/content/gsos-301/reviews/unit-05/G2/20261105T173800809Z-gates.json
  - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/
tests:
  - "npm run check:content: PASS, all 14 gates; clean origin/main also PASS after generating its ignored content-status artifact"
  - "npm run check:depth-gate: PASS after source-binding repairs"
  - "scripts/heavy.sh npm test: PASS, 31 files and 368 tests"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Added source passages, citations and coverage bindings for both advisories. Recorded the prohibited render inspection as unresolved and appended the required unticked G3 repair row. Refreshed deterministic G2 evidence and its existing tracker reference. All 14 final content gates pass on both this branch and clean origin/main; 368 unit tests pass.

## Outcome

- ✅ Impact: Both source advisories addressed without learner-facing prose changes.
- 🧪 Tests: All 14 content gates pass on this branch and clean origin/main. All eight G2 draft checks and 368 unit tests pass. git diff --check passes.
- 📁 Files: Unit 5 source notes, coverage, tracker, refreshed G2 evidence and eight real command logs, repair handoff and this PHR.
- 🔁 Next prompts: Permitted render inspection, then independent review within the authorized cycle limit.
- 🧠 Reflection: New sources require explicit coverage and bound text, and source edits invalidate G2 evidence.

## Handoff (for CEO and agents)

- Shipped / changed: OpenStax religion passage plus WHO, World Bank and official Council evidence with retrieval limitations.
- Decisions the team must respect: No G3/G5 certification, publication or translation-status change. No build, server or browser run.
- Pending / next owner: G2 refresh and final gates are complete; permitted render host owns 360px/table/print/clipping checks; independent reviewer owns G3.
- Paperclip issues affected: Crew job gsos-301-u05-repair_en; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial content run overlapped source edits and is not a clean baseline; a separate clean origin/main checkout supplies comparison. Source keys initially lacked coverage/excerpts; fixed.
- Graders run and results (PASS/FAIL): Depth PASS; unit tests PASS (368); final content gates PASS (14/14), matching clean origin/main; G2 draft checks PASS (8/8).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Perform permitted 360px and A4 render inspection before an independent G3 decision.
