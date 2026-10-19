---
id: 0346
title: GQUR300 Unit Four Translation Continuation
stage: general
date: 2026-10-18
surface: agent
model: GPT-6
feature: gqur-300
branch: crew/gqur-300-u04-translate-r1
user: crew
command: Read .crew/brief.md
labels: ["board-direct", "gqur-300", "unit-04", "G4"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/unit-assessment.mdx
  - specs/content/gqur-300/reviews/unit-04/G4/handoff.md
  - history/prompts/general/0346-gqur300-unit-four-translation-continuation.general.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
  - Temporary reviewed content check with guaranteed restoration to draft
  - Six-file metadata, heading, component, glossary and figure-path parity
  - Assessment 10/10/5 counts, 40 Urdu options, 10 answer letters and 25 Bloom labels
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing Unit 4 Urdu mirror and G4 handoff commits. Generated the missing ignored content-status artifact. Corrected untranslated assessment Bloom labels and MCQ option letters with matching answer references. Preserved draft status, existing tracker rows and review history; committed locally without pushing or opening a PR.

## Outcome

- ✅ Impact: Resolved the reported missing content-status finding and completed assessment label localisation.
- 🧪 Tests: Draft content suite passes all 13 gates. Conditional reviewed check passes structural gates and exposes exactly 14 expected pipeline blockers: two incomplete stage rows and twelve unbanked terms. Draft restored afterward.
- 📁 Files: Urdu assessment, Unit 4 G4 handoff and this PHR. Generated content status remains ignored locally.
- 🔁 Next prompts: Owner terminology banking and fresh independent review with rendered Urdu inspection.
- 🧠 Reflection: A previous handoff claimed translated Bloom labels that were still English; source verification found and corrected that discrepancy.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu assessment labels and answer references corrected, structural parity rechecked, generated content status restored and handoff corrected.
- Decisions the team must respect: Keep translation_status draft; do not change the frozen term bank or certify G3/G5. Preserve the existing in-progress G4 row as instructed by the brief. Do not force-add generated status.
- Pending / next owner: Curriculum owner banks twelve proposed terms; independent reviewer handles advisory review follow-up and rendered RTL/A4 checks on a permitted host. No build or dev server was run under this brief.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Missing ignored artifact in a fresh checkout; assessment localisation claims did not match source; reviewed terminology checks intentionally remain blocked pending owner decisions.
- Graders run and results (PASS/FAIL): Draft content suite 13/13 PASS; structural and assessment checks PASS; conditional pipeline FAIL with the expected fourteen blockers; diff check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Regenerate content status after tracker edits before running content gates in each fresh checkout.
