---
id: 0344
title: Complete Unit Six Urdu Continuation
stage: misc
date: 2026-10-18
surface: agent
model: GPT-6
feature: efmp-303
branch: crew/efmp-303-u06-translate
user: board
command: crew brief continuation
labels: [board-direct, translation, G4]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/
  - static/img/figures/efmp-303/unit-06/
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-06/G4/translation-handoff.md
tests:
  - npm run build:content-status
  - npm run check:content
  - temporary reviewed content checks with draft restoration
  - npm run figures:variants:check
  - six-pair metadata, heading and component comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing Urdu translation commit, completed six missing Urdu figure assets with derived dark variants, repaired translation errors, regenerated content status and validated the draft. Kept G3/G5 open and all translation statuses draft.

## Outcome

- Impact: complete Urdu draft assets and corrected meaning-changing translation defects.
- Tests: all 13 draft content gates pass; figure variants and six-file structural comparison pass.
- Files: six Urdu pages, twelve figure assets, tracker, handoff and this record.
- Next prompts: independent G5 review and rendered inspection.
- Reflection: draft gates silently omit parity; temporary reviewed checks must distinguish expected certification failures from content defects.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu figure variants, translation repairs and accurate verification notes.
- Decisions the team must respect: translation_status remains draft; no G3/G5 certification; no build or server under the crew brief.
- Pending / next owner: fresh independent G5 reviewer must inspect semantic parity and desktop, narrow and A4 rendering; curriculum owner owns proposed terminology.
- Paperclip issues affected: none specified.

## Evaluation notes (flywheel)

- Failure modes observed: missing ignored content-status artifact; missing Urdu figures; incorrect earlier all-green temporary-reviewed claim; developing/developed-country mistranslation.
- Graders run and results (PASS/FAIL): draft content gates PASS; figure variants PASS; structural comparison PASS. Temporary reviewed pipeline FAIL for unfinished G4/G5, as expected.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): independent rendered Urdu review when builds are permitted.
