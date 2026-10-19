---
id: 017
title: Repair EFMP303 Unit3 Urdu
stage: green
date: 2026-10-19
surface: agent
model: GPT-6
feature: 008-rich-unit-pedagogy
branch: crew/efmp-303-u03-translate-r1
user: board
command: execute .crew/brief.md
labels: [board-direct, translation, efmp-303, unit-03]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/unit-teacher-notes.mdx
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-03/G4/translation-handoff-r1.md
  - specs/content/efmp-303/reviews/unit-03/G4/structural-parity-r1.log
  - specs/content/efmp-303/reviews/unit-03/G4/conditional-parity-r1.log
  - specs/content/efmp-303/reviews/unit-03/G4/main-check-content-r1.log
  - specs/content/efmp-303/reviews/unit-03/G4/check-content-r1.log
  - history/prompts/008-rich-unit-pedagogy/017-repair-efmp303-unit3-urdu.green.prompt.md
tests:
  - npm run check:content (draft branch and detached origin/main)
  - npm run check:content (temporary reviewed diagnostics, restored in finally)
  - npm run figures:variants:check
  - Six-file structural and terminology self-check
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing complete Urdu draft. Repaired activity grouping, boundary-wall means, lowest-performing and lowest-enrolment qualifiers, omitted minimum requirements, register and grammar. Updated the existing open G4 row and translation handoff. Preserved draft status and all review boundaries. Committed locally without pushing or opening a PR.

## Outcome

- Impact: Six Urdu pages retain complete structure and assessment parity with English commit 3b6fa404c69a280e3056c66f74d6912c061fba6f, with targeted meaning and register repairs.
- Tests: Draft content gates pass on branch and origin/main; conditional structural/figure/terminology checks pass. Temporary reviewed diagnostics fail only for intentionally open G4/G5 and derived content-status freshness. Both flags restored. Figure variants and diff checks pass.
- Files: Six Urdu pages, one existing tracker note, handoff, validation logs and this PHR.
- Next prompts: Content owner resolves English G3 findings; render host inspects actual Urdu desktop/mobile/A4 pages; fresh independent G5 follows accepted English.
- Reflection: Passing draft gates would not detect omitted qualifiers or changed activity grouping.

## Handoff (for CEO and agents)

- Shipped / changed: Targeted translation repairs and explicit validation evidence for EFMP-303 Unit 3.
- Decisions the team must respect: G4 remains open following translate-unit Step 7; no G3/G5 certification, publication action or reviewed flag. Terminology bank and English content unchanged.
- Pending / next owner: Content owner owns English G3 repairs and terminology proposals; authorised render host owns page inspection; independent reviewer owns G5 after English acceptance.
- Paperclip issues affected: None supplied; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Existing draft changed means into cause and group size into group count; omitted minimum and superlative qualifiers. Temporary reviewed status creates expected workflow failures, never evidence of acceptance. Editing the original handoff staled G2 because its manifest binds translations metadata; restored it and placed new notes/logs under reviews/unit-03/G4 instead.
- Graders run and results (PASS/FAIL): Draft check:content PASS; conditional parity PASS with expected workflow FAIL; variants PASS; structural and terminology checks PASS; diff check PASS.
- Prompt variant (if applicable): crew efmp-303-u03-translate-r1.
- Next experiment (smallest change to try): Inspect frozen Urdu pages at 360px and A4 after English repairs.
