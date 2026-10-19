---
id: 0021
title: Repair EFMP303 unit two Urdu
stage: green
date: 2026-10-19
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-303-u02-translate-r1
user: owner
command: crew brief execution
labels: [board-direct, codex, translation, efmp-303]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/unit-assessment.mdx
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-02/G4/translation-handoff.md
  - history/prompts/006-content-pipeline/0021-repair-efmp303-unit-two-urdu.green.prompt.md
tests:
  - npm run check:content (clean baseline and final draft)
  - npm run check:content (temporary reviewed flags, reverted)
  - npm run figures:variants:check
  - Direct six-file metadata, headings, imports, components, glossary and figure parity checks
  - Direct 10/10/5 assessment and ten MCQ key mapping checks
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing six-file Urdu mirror against English baseline 5ea0764c.
Repaired policy vision wording and the bank-bound Rubric heading, updated the existing
G4 in-progress note, and recorded current checks and remaining review dependencies.
Both indexes remain draft. No build, server, push, PR, G3/G5 completion or certification.

## Outcome

- Impact: Focused Urdu register repairs; preserved the complete existing mirror and figures.
- Tests: Baseline 13/13; reviewed flip exposed only open G4/G5 and stale generated status metadata; final draft 13/13 PASS after metadata regeneration.
- Files: Four Urdu MDX files, G4 handoff, tracker note and this PHR.
- Next prompts: Independent G3 acceptance and fresh G5 with rendered Urdu inspection.
- Reflection: A prior review summary lists minutes and marks unlike current content; use current files.

## Handoff (for CEO and agents)

- Shipped / changed: Vision now uses تصور; ERQ heading uses معیارِ جانچ from the frozen bank; continuation evidence recorded.
- Decisions the team must respect: Draft status, no certification, no changes to English baseline or frozen bank. The brief explicitly requests a G4 record, so updated the existing in-progress row without appending or marking done despite skill Step 7's no-row instruction.
- Pending / next owner: Curriculum owner resolves unbanked Vision proposal; independent reviewers own accepted G3, fresh G5 and current desktop/narrow/A4 evidence. Preserve historical reports without inheriting their claims.
- Paperclip issues affected: No Paperclip action; historical G5 handoff references TEX-72 and TEX-74 only.

## Evaluation notes (flywheel)

- Failure modes observed: Conditional parity gates require temporary reviewed flags. Tracker-note edits invalidate generated status digests. Historical summary metadata differs from current content.
- Graders run and results (PASS/FAIL): Content parity, figure variants, assessment bank counts and key mappings passed; temporary reviewed governance failures expected. Final draft gate results recorded in translation handoff.
- Prompt variant (if applicable): Crew retry r1.
- Next experiment (smallest change to try): Independent review of current bytes with accepted G3 dependency and actual Urdu renders.
