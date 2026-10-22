---
id: crew-gsos-301-u04-translate
title: Record Unit 4 translation blocker
stage: misc
date: 2026-10-22
surface: agent
model: GPT-6
feature: gsos-301
branch: crew/gsos-301-u04-translate
user: owner
command: Read .crew/brief.md
labels: [board-direct, gsos-301, translation, blocked]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-04/G4/translation-handoff.md
  - specs/content/gsos-301/reviews/unit-04/G4/main-content.log
  - specs/content/gsos-301/reviews/unit-04/G4/content.log
  - history/prompts/gsos-301/crew-gsos-301-u04-translate.misc.prompt.md
tests:
  - scripts/heavy.sh npm run check:content (clean origin/main baseline)
  - scripts/heavy.sh npm run check:content (final working tree)
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read the crew brief and required translate-unit skill. Confirmed the English MCQ guidance contradiction, malformed rubric rows and below-band RRQs identified by G3. The skill explicitly requires stopping when English is wrong, so recorded a blocked G4 handoff and existing-row note instead of copying known errors or repairing English outside the translation workflow. Translation is not complete.

## Outcome

- Impact: Preserved the explicit translation stop boundary and documented resumption requirements.
- Tests: Baseline and final content checks logged in the unit G4 folder; final results in the handoff.
- Files: Handoff, gate logs, G4 row note and this PHR only.
- Next prompts: Separate author repairs English; resume translation against corrected baseline.
- Reflection: A green G2 record does not remove known semantic baseline errors.

## Handoff (for CEO and agents)

- Shipped / changed: Blocker documentation only; no Urdu content authored.
- Decisions the team must respect: G4 remains incomplete; translation_status stays draft; no G3/G5 certification; no prohibited browser/build work.
- Pending / next owner: Separate English author owns G3 repairs; host owns provenance/render access; subsequent translator owns full G4 mirror.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Known English defects conflict with the required settled-baseline translation workflow.
- Graders run and results (PASS/FAIL): Both content runs: 12/13 PASS; identical pre-existing stale content-status failure after normalising timings. git diff --check PASS.
- Prompt variant (if applicable): Crew translation brief.
- Next experiment (smallest change to try): Correct English in a separate author job before resuming G4.
