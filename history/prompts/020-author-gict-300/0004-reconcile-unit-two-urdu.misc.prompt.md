---
id: 0004
title: Reconcile Unit Two Urdu
stage: misc
date: 2026-10-18
surface: agent
model: GPT-6
feature: 020-author-gict-300
branch: crew/gict-300-u02-translate-r1
user: board
command: execute crew brief
labels: [board-direct, translation, gict-300, unit-02]
links:
  spec: specs/020-author-gict-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/
  - static/img/figures/gict-300/unit-02/
  - specs/content/gict-300/tasks.md
  - specs/content/gict-300/reviews/unit-02/G4/
tests:
  - npm run check:content
  - temporary reviewed parity check with draft restoration
  - npm run figures:variants:check
  - seven-file source parity comparison
  - origin/main content-gate baseline
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing seven-file GICT-300 Unit 2 Urdu mirror from English 37fcef38.
Repaired register, citations, rubric wording, and Urdu figure labels, regenerated dark
variants, and declared frozen-bank assessment terms while retaining computing terms as
owner proposals in the handoff. Recorded the existing G4 row in progress, without changing
G3/G5 or draft status. Ran content gates and conditional parity checks. No push or PR.

## Outcome

- Impact: Urdu source and figure repairs ready for independent review.
- Tests: Final results retained in specs/content/gict-300/reviews/unit-02/G4/content-gates.log.
- Files: Seven Urdu MDX files, eight Urdu SVG pairs, G4 tracker, handoff, validation log and PHR.
- Next prompts: Shared glossary repair, terminology intake and fresh independent G5 rendering.
- Reflection: Conditional parity checks must not be confused with reviewed status.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 translation repairs and explicit owner proposals with validation.
- Decisions the team must respect: Frozen terminology bank unchanged; translation stays draft;
  G4 remains in progress and G3/G5 are not certified. Crew brief forbids build/server use.
- Pending / next owner: Curriculum owner must repair the shared Random Access Memory Urdu
  definition that reverses saved/unsaved, bank computing terminology, and reconcile concept
  labels with refreshed G2 evidence. Independent reviewer owns fresh G5 and rendering checks.
- Paperclip issues affected: None supplied; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Missing ignored content-status report; temporary reviewed status
  intentionally invalidates G2 and unfinished G4/G5. A trial concept-label edit invalidated
  G2, so its original bytes were restored and the proposed alignment recorded for the owner.
  One draft gate run overlapped the temporary flip; it was discarded and rerun sequentially.
- Graders run and results (PASS/FAIL): See final gate log; source shape comparison passed;
  all 780 figure variants current. Render validation not run under crew capacity restriction.
- Prompt variant (if applicable): crew/gict-300-u02-translate-r1
- Next experiment (smallest change to try): Repair shared glossary in an authorized broader job,
  then inspect this exact Urdu bundle at desktop, 360px and A4 in an independent session.
