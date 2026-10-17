---
id: 0013
title: EFMP304 unit one translation preflight
stage: misc
date: 2026-10-17
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-304-u01-translate
user: board
command: Read .crew/brief.md and carry it out
labels: [board-direct, translation, efmp-304, blocked]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-304/translations/unit-01/handoff.md
  - specs/content/efmp-304/translations/unit-01/check-content-baseline.log
  - specs/content/efmp-304/translations/unit-01/check-content-final.log
  - history/prompts/006-content-pipeline/0013-efmp304-unit-one-translation-preflight.misc.prompt.md
tests:
  - scripts/heavy.sh npm run check:content (baseline and final)
  - Python stdlib XML parse of fig-U1-3 light and dark sources
  - SHA-256 comparison with historical G3 manifest
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read the crew brief, repository rules, translation skill and references, and the
seven-page English baseline. Stopped before translation under the skill's explicit
English-defect rule: RRQ 3 supplies a reason that its model response denies, and
topic-04 asks for two arguments where its own definitions distinguish an
explanation from an argument. Existing G3 advisory disposition is revise; its
assessment/topic-04 inputs differ from current bytes. Direct XML parsing confirms
the still-malformed fig-U1-3 pair. Recorded a concrete repair handoff without
changing authored content, tracker status, publication state or terminology.

## Outcome

- Impact: Translation blocked and unfinished; actionable source defects recorded.
- Tests: Main baseline has 12 passing content gates and one existing failure: missing static/content-status.json. XML parse fails on both fig-U1-3 variants at column 1876.
- Files: Unit 1 handoff, gate logs and this PHR only.
- Next prompts: English author settles and repairs baseline, then translation resumes.
- Reflection: A green structural gate cannot resolve contradictory assessment semantics.

## Handoff (for CEO and agents)

- Shipped / changed: Committed preflight blocker record and content-gate evidence; no Urdu mirror delivered.
- Decisions the team must respect: translate-unit explicitly forbids silently repairing wrong English in translation and says to stop. Step 7 forbids appending a G4 row. Draft status and existing tracker rows remain unchanged. Crew forbids builds and servers.
- Pending / next owner: Curriculum owner / English author owns item and instruction repairs and disposition of prior G3 findings; translator resumes against a settled baseline; independent reviewers own G3/G5 acceptance.
- Paperclip issues affected: No issue assigned in the brief; links.ticket remains null. No external service was changed.

## Evaluation notes (flywheel)

- Failure modes observed: Contradictory item and model response, activity classification conflict, malformed English SVG. Historical review evidence is not fresh for changed prose.
- Graders run and results (PASS/FAIL): check:content has the same existing content-status failure as main; no new findings. XML validation FAIL on existing English assets. git diff --check PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Repair English contradictions in an authorised authoring session before restarting G4.
