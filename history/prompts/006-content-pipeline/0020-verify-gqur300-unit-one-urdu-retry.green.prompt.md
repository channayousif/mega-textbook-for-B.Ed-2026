---
id: 0020
title: Verify GQUR300 Unit One Urdu Retry
stage: green
date: 2026-10-18
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/gqur-300-u01-translate-r1
user: board-direct
command: .crew/brief.md
labels: ["board-direct", "gqur-300", "translation", "G4"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/unit-assessment.mdx
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/reviews/unit-01/G4/handoff.md
  - specs/content/gqur-300/reviews/unit-01/G4/retry-parity.json
  - specs/content/gqur-300/reviews/unit-01/G4/retry-reviewed.log
  - specs/content/gqur-300/reviews/unit-01/G4/retry-content-gates.log
  - history/prompts/006-content-pipeline/0020-verify-gqur300-unit-one-urdu-retry.green.prompt.md
tests:
  - npm run check:content
  - npm run figures:variants:check
  - Temporary reviewed parity probe with exception-safe restoration
  - Direct six-file structural and terminology checks
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing complete six-file Urdu mirror. Restored the comparative meaning of safer in the Topic 1.3 bench example and assessment RRQ-6 model answer. Captured fresh structural parity and conditional gate results, updated the existing G4 tracker note and handoff, and kept translation_status draft. No build, dev server, push or PR.

## Outcome

- Impact: Preserved the full mirror and repaired two small losses of comparative force.
- Tests: All 13 final draft-state content gates passed; figure variants clean across 810 figures; six-file structural checks and declared bank terms conform.
- Files: Two Urdu pages, tracker note, translation handoff, three validation records and this PHR.
- Next prompts: Owner vocabulary rulings, English G3 resolution, fresh independent G5 including rendered inspection.
- Reflection: Draft gates alone do not exercise bilingual parity; the temporary reviewed probe must restore flags even after failures.

## Handoff (for CEO and agents)

- Shipped / changed: Comparative Urdu repairs and fresh G4 validation records for Unit 1.
- Decisions the team must respect: Frozen bank unchanged; unbanked terms remain proposals. Existing G4 row stays open per skill Step 7. No G3/G5 certification or publication change.
- Pending / next owner: Curriculum owner handles vocabulary and G3 dependency; independent G5 reviewer compares passages and inspects actual desktop/narrow/A4 rendering. Brief prohibits a build or dev server in this job.
- Paperclip issues affected: None supplied or modified; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Temporary reviewed flags intentionally trigger unfinished G4/G5 findings and stale ignored content-status output. Initial custom alt/description assertion failed because it assumed desc had no attributes; corrected the assertion to read desc text, then all six pairs matched.
- Graders run and results (PASS/FAIL): PASS final check:content, figures:variants:check, structural parity and bank declarations, git diff --check. Conditional probe has expected lifecycle findings only.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent G5 after the accepted G3 dependency is available.
