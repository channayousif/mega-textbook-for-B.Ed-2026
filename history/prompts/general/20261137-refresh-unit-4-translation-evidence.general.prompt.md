---
id: 20261137
title: Refresh Unit 4 translation evidence
stage: general
date: 2026-11-07
surface: agent
model: GPT-6
feature: none
branch: crew/gicp-400-u04-translate
user: crew
command: Read .crew/brief.md
labels: ["codex", "gicp-400", "translation"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-04/G2/
  - specs/content/gicp-400/reviews/unit-04/translation-validation.md
tests:
  - npm run check:content
  - npm run figures:variants:check
  - temporary reviewed parity checks
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing complete Urdu mirror and refreshed stale Unit 4 deterministic G2 evidence without certifying G3 or G5.

## Outcome

- ✅ Impact: Preserved the translation and repaired its stale gate evidence reference.
- 🧪 Tests: Eight G2 draft commands passed; structural parity and figure variant freshness passed. Full content and conditional parity logs recorded in the unit validation note.
- 📁 Files: New real G2 logs and manifest, tracker reference, validation note and this PHR.
- 🔁 Next prompts: Independent G3 and G5 review with permitted rendered inspection.
- 🧠 Reflection: A translation handoff under the course directory is an English evidence input under the current binding contract.

## Handoff (for CEO and agents)

- Shipped / changed: Existing five Urdu pages and six Urdu figure pairs retained; fresh G2 evidence recorded.
- Decisions the team must respect: Both locales remain draft. G4 stays open as required by translate-unit Step 7. No push or PR.
- Pending / next owner: Qualified independent reviewers own G3/G5; rendered Urdu and print inspection remains pending under the brief browser prohibition.
- Paperclip issues affected: gicp-400-u04-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Earlier translation handoff addition invalidated the English G2 input manifest. Refreshed using the repository evidence generator rather than changing hashes manually.
- Graders run and results (PASS/FAIL): See specs/content/gicp-400/reviews/unit-04/translation-validation.md for final checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run independent review only after its accepted English dependency is available.
