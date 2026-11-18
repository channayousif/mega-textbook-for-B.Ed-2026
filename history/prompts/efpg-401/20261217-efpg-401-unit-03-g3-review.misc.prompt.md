---
id: 20261217
title: EFPG-401 Unit 3 G3 review
stage: misc
date: 2026-11-18
surface: agent
model: GPT-5 Codex
feature: efpg-401
branch: crew/efpg-401-u03-review_en
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely.
labels: [codex, crew, efpg-401, unit-03, g3-review]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efpg-401/reviews/unit-03/G3/crew-job-efpg-401-u03-review_en.json
  - specs/content/efpg-401/reviews/unit-03/G3/crew-job-efpg-401-u03-review_en/
  - specs/content/efpg-401/tasks.md
  - history/prompts/efpg-401/20261217-efpg-401-unit-03-g3-review.misc.prompt.md
tests:
  - node scripts/review-evidence.mjs validate specs/content/efpg-401/reviews/unit-03/G3/crew-job-efpg-401-u03-review_en.json (pass)
  - npm run build:content-status (pass)
  - npm run check:content (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Created and validated an advisory independent G3 English review for EFPG-401 Unit 3. Deterministic content checks passed. The report escalates because production does not contain the reviewed Unit 3 bytes, preventing required rendered-page and print inspection, and because the bound open-access source records do not include inspectable source passages.

## Outcome

- ✅ Impact: Added an append-only G3 review report, evidence logs, readable summary, and an advisory open G3 tracker row.
- 🧪 Tests: Review-evidence validation and all content gates passed.
- 📁 Files: Review artifacts and the EFPG-401 tracker updated; no student-facing content or gate policy changed.
- 🔁 Next prompts: After production matches the reviewed bytes and source passages are bound, prepare fresh evidence and request a fresh independent G3 review.
- 🧠 Reflection: Render and source limitations must remain visible as unverified evidence, not be converted into a pass.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory G3 review evidence for EFPG-401 Unit 3, with all required deterministic-check logs and an open advisory tracker row.
- Decisions the team must respect: G3 remains open and uncertified; the report is not a signature or publication approval. Do not treat the production site as Unit 3 review evidence until its SHA matches the reviewed input.
- Pending / next owner: Content owner must bind inspectable Ahmad and Kiran source passages, reconcile the stale figure-manifest lifecycle sentence, and arrange a fresh render-capable independent review after deployment.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: Required live render inspection was unavailable because deployment lagged the reviewed bytes; bound research records lack source passages.
- Graders run and results (PASS/FAIL): PASS - review-evidence validation; PASS - build:content-status; PASS - check:content.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Bind short source passages with locators before starting the next review attempt.
