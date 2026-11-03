---
id: 20261106
title: Repair Unit Five Translation Handoff
stage: general
date: 2026-11-02
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-406-u05-translate
user: owner
command: Read .crew/brief.md
labels: ["codex", "efmp-406-u05-translate", "G4"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-406/reviews/unit-05/G4/translation-handoff.md
  - specs/content/efmp-406/translations/unit-05/handoff.md (moved)
tests:
  - npm run check:content (initial, temporary reviewed parity, final draft)
  - npm run figures:variants:check
  - Five-file structural parity comparison
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing complete Urdu translation. Moved translation lifecycle handoff into the unit review-record folder to restore the unchanged English G2 manifest. Verified conditional parity and restored draft flags. No build, browser, push or PR.

## Outcome

- ✅ Impact: Preserved the five Urdu pages and four Urdu SVG pairs while removing the additional bound English input that broke G2.
- 🧪 Tests: Initial run reproduced one stale G2 finding. Temporary reviewed run passed parity, figures and terminology with only open G4/G5 and transient generated-status findings. Final draft check and variant check pass.
- 📁 Files: Moved and corrected the translation handoff; no learner-facing content changed in this retry.
- 🔁 Next prompts: Authorised rendering inspection and independent G5 review.
- 🧠 Reflection: Lifecycle notes belong under review records; a new course-spec folder can unexpectedly expand the English evidence manifest.

## Handoff (for CEO and agents)

- Shipped / changed: Existing complete Urdu mirror retained; handoff relocated and verification details corrected.
- Decisions the team must respect: Translation remains draft. G3/G5 remain open and unsigned. The translate-unit skill forbids a G4 completion row.
- Pending / next owner: Next authorised rendering job owns SVG geometry and desktop, narrow and A4 inspection; independent reviewer owns G5 after an accepted G3 dependency.
- Paperclip issues affected: Crew job efmp-406-u05-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: A translation lifecycle handoff under translations/unit-05 was bound as an English review input. Temporary reviewed flags also invalidate generated status until reverted.
- Graders run and results (PASS/FAIL): Initial content FAIL (one stale manifest); conditional checks PASS except expected unfinished-stage and transient-status findings; final content PASS; variants PASS; structural parity PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run actual Urdu rendering in a separately authorised browser job.
