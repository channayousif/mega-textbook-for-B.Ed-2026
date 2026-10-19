---
id: 20261019
title: Validate GQUR300 unit five retry
stage: general
date: 2026-10-18
surface: agent
model: GPT-6
feature: none
branch: crew/gqur-300-u05-translate-r1
user: owner
command: carry out .crew/brief.md
labels: [board-direct, gqur-300, unit-05, urdu, retry]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-300/reviews/unit-05/G4/handoff.md
  - specs/content/gqur-300/reviews/unit-05/G4/retry-content-gates.log
  - history/prompts/general/20261019-validate-gqur300-unit-five-retry.general.prompt.md
tests:
  - npm run build:content-status (PASS)
  - npm run check:content (13/13 PASS)
  - npm run figures:variants:check (PASS)
  - six-file structural parity and figure-path existence comparison (PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the earlier committed translation verification. Regenerated the missing gitignored content-status report using the repository command, then passed all 13 content gates. Preserved the draft translation and G4 in-progress record, recorded validation evidence, and committed the continuation without pushing.

## Outcome

- Impact: Removed the reported local validation finding and documented reproducible checkout preparation.
- Tests: All 13 content gates, figure variants, and six-file source structure checks pass.
- Files: Updated G4 handoff, captured actual gate output, and added this PHR.
- Next prompts: Owner terminology ruling and independent G5 with rendered evidence.
- Reflection: Generated artifacts must be prepared in a new checkout even when ignored by Git.

## Handoff (for CEO and agents)

- Shipped / changed: Retry validation evidence and fresh-checkout report generation instructions.
- Decisions the team must respect: translation_status stays draft; no G3/G5 acceptance claimed; frozen terminology bank unchanged.
- Pending / next owner: Curriculum owner resolves eleven unbanked terms and Mode/عاد; independent G5 obtains desktop, narrow and A4 evidence and resolves accepted G3 dependency.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: Missing gitignored static/content-status.json caused the prior retry failure.
- Graders run and results (PASS/FAIL): check:content PASS 13/13; figures:variants:check PASS; structural comparison PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Regenerate content status before gates in each fresh checkout.
