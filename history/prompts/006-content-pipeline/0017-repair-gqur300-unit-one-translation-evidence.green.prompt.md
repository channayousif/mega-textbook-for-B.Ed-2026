---
id: 0017
title: Repair GQUR300 Unit One Translation Evidence
stage: green
date: 2026-10-18
surface: agent
model: Gemini 3.8 Flash (High)
feature: 006-content-pipeline
branch: crew/gqur-300-u01-translate
user: board-direct
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["board-direct", "gqur-300", "translation", "G4"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gqur-300/reviews/unit-01/G4/baseline-content.log
  - specs/content/gqur-300/reviews/unit-01/G4/content-gates.log
  - specs/content/gqur-300/reviews/unit-01/G4/figure-geometry.log
  - specs/content/gqur-300/reviews/unit-01/G4/figure-variants.log
  - specs/content/gqur-300/reviews/unit-01/G4/handoff.md
  - specs/content/gqur-300/reviews/unit-01/G4/isolated-render-metrics.json
  - specs/content/gqur-300/reviews/unit-01/G4/nastaliq-geometry.json
  - specs/content/gqur-300/reviews/unit-01/G4/parity.log
  - specs/content/gqur-300/reviews/unit-01/G4/temporary-reviewed.log
  - specs/content/gqur-300/tasks.md
  - history/prompts/006-content-pipeline/0017-repair-gqur300-unit-one-translation-evidence.green.prompt.md
tests:
  - "node scripts/check-pipeline-gate.mjs: passed (58 gate-checked, GQUR-300 Unit 1 passed)"
  - "npm run check:content: all 13 content gates passed"
  - "npm run figures:variants:check: 772 figures checked, clean"
  - "Temporary reviewed probe on both index.mdx files: validate-content, check:figures, and terminology passed"
  - "git diff --check: clean"
  - "npm run check:no-em-dash: passed"
---

## Prompt

<USER_REQUEST>
Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
</USER_REQUEST>

## Response snapshot

Continued commit 450758b6, which completed the GQUR-300 Unit 1 Urdu translation mirror and localized figures. Resolved the pipeline gate regression caused by committed translation handoff logs under an unexcluded path by relocating them under `specs/content/gqur-300/reviews/unit-01/G4/`, restoring the G2 input manifest to exact agreement with recorded evidence without altering G2 evidence. All 13 content gates passed.

## Outcome

- ✅ Impact: All 13 content gates pass cleanly with zero new findings; Unit 1 G2 input manifest matches recorded evidence; complete Urdu mirror is preserved at G4 draft status.
- 🧪 Tests: `npm run check:content` passed (13 of 13 gates); `npm run figures:variants:check` passed; temporary reviewed probe verified structural parity and terminology conformance; `git diff --check` and `check:no-em-dash` passed.
- 📁 Files: Relocated handoff and log files from `translations/unit-01/` to `reviews/unit-01/G4/`, updated `specs/content/gqur-300/tasks.md` handoff pointer, appended continuation note to `handoff.md`, and added this PHR.
- 🔁 Next prompts: Owner vocabulary rulings and English G3 review dependency; fresh independent G5 session.
- 🧠 Reflection: Lifecycle records placed directly under `specs/content/<course>/translations/unit-NN/` are treated as bound course inputs by `review-evidence.mjs` unless placed under `reviews/`. Relocating to `reviews/unit-01/G4/` follows the pattern established in GICT-300 Unit 3.

## Handoff (for CEO and agents)

- Shipped / changed: Relocated GQUR-300 Unit 1 translation lifecycle files to `specs/content/gqur-300/reviews/unit-01/G4/`, updated `tasks.md` link, updated `handoff.md` with continuation details, and confirmed all 13 content gates pass.
- Decisions the team must respect: Terminology bank and English source unchanged; translation_status remains draft; G3/G5 stay open; no push or PR.
- Pending / next owner: Curriculum owner reviews terminology proposals in handoff; G3 reviewer reviews English unit; independent G5 reviewer reviews Urdu translation once G3 is resolved.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: `check:pipeline-gate` reported `G2 en-draft: stale or incomplete input manifest` because translation logs were committed under an unexcluded unit-matching path.
- Graders run and results (PASS/FAIL): PASS: `check:content` (all 13 gates), `check:pipeline-gate`, `figures:variants:check`, `check:no-em-dash`, `git diff --check`.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent G5 review on Unit 1 Urdu translation.
