---
id: 20261138
title: Complete Unit 4 Urdu translation verification and gate evidence
stage: general
date: 2026-11-07
surface: agent
model: agy
feature: none
branch: crew/gicp-400-u04-translate
user: crew
command: Read .crew/brief.md
labels: ["agy", "gicp-400", "translation"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-04/G2/
  - specs/content/gicp-400/reviews/unit-04/translation-validation.md
  - specs/content/gicp-400/reviews/unit-04/translation-validation/
  - history/prompts/general/20261137-refresh-unit-4-translation-evidence.general.prompt.md
tests:
  - npm run check:content
  - npm run figures:variants:check
  - temporary reviewed parity verification
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the Urdu mirror work on GICP-400 Unit 4, verified the refreshed G2 evidence, validated all 14 content gates, confirmed structural and terminology parity under temporary reviewed flip, and recorded final validation artifacts with translation status at draft.

## Outcome

- ✅ Impact: G4 Urdu mirror for GICP-400 Unit 4 and its G2 evidence dependencies are fully verified and passing all content gates.
- 🧪 Tests: 14 content gates passed (validate:content, check:pipeline-gate, check:depth-gate, check:figures, check:svg-style, check:no-em-dash, check:no-answer-keys, check:concept-graph, check:bloom-bands, check:source-floor, check:licence, licence:map:check, check:content-status, check:docs-sync); figure variants checked (1181 figures); temporary reviewed parity verification passed with no terminology or structural divergence.
- 📁 Files: Recorded G2 gate evidence and logs, tasks.md tracker pointer, translation validation notes and execution logs, and PHRs.
- 🔁 Next prompts: Independent qualified G3 English and G5 Urdu reviews with permitted browser/A4 print inspections.
- 🧠 Reflection: Resealing deterministic gate evidence after translation handoff creation unblocks pipeline gates cleanly without manual checksum editing.

## Handoff (for CEO and agents)

- Shipped / changed: Five Urdu MDX mirror files and six Urdu figure pairs retained; fresh G2 evidence recorded in tasks.md; translation validation logs captured.
- Decisions the team must respect: Both locales remain translation_status: draft pending independent reviews; G4 row remains open per translate-unit Step 7; no push or PR.
- Pending / next owner: Independent G3 and G5 reviewers; rendered print and layout inspection.
- Paperclip issues affected: gicp-400-u04-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Input manifest mismatch resolved via prepare-gate-evidence; all gates now green.
- Graders run and results (PASS/FAIL): All 14 content gates PASS; figures:variants:check PASS; check-no-em-dash PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Exclude translations/ directory from G2 input manifest calculation in review-evidence.mjs to avoid cross-stage manifest invalidation.
