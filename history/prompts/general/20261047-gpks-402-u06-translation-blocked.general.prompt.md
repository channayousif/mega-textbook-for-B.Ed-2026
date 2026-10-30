---
id: 20261047
title: GPKS-402 Unit 6 translation blocked by source assessment
stage: general
date: 2026-10-30
surface: agent
model: GPT-6
feature: none
branch: crew/gpks-402-u06-translate
user: crew
command: Read .crew/brief.md
labels: ["codex", "gpks-402", "translation-blocked"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gpks-402/reviews/unit-06/G4/translation-blocked.md
  - history/prompts/general/20261047-gpks-402-u06-translation-blocked.general.prompt.md
tests:
  - npm run check:content (13 gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translation stopped under the mandatory translate-unit source-defect rule after confirming ERQ 2 and RRQ 8 scoring mismatches. Recorded a concrete repair handoff.

## Outcome

- ✅ Impact: Recorded why translation cannot proceed on the defective English baseline.
- 🧪 Tests: All 13 content gates passed.
- 📁 Files: Blocker handoff and this PHR.
- 🔁 Next prompts: English author repairs baseline; translator resumes G4.
- 🧠 Reflection: Passing structural gates does not establish assessment equivalence.

## Handoff (for CEO and agents)

- Shipped / changed: Committed a Unit 6 G4 blocker handoff; no translation authored.
- Decisions the team must respect: Follow the skill stop rule; translation_status stays draft; no G3/G5 certification or G4 row.
- Pending / next owner: English author owns source and scoring repair; translator owns subsequent mirror; host owns permitted rendered evidence.
- Paperclip issues affected: GPKS-402 Unit 6 crew job; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: English stems and scoring demands disagree despite green content gates.
- Graders run and results (PASS/FAIL): PASS: npm run check:content, all 13 gates.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Repair the English scoring demands before translation.
