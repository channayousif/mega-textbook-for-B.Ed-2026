---
id: 20261305
title: Crew EFPG-402 Unit 3 translation retry, G2 evidence refresh
stage: green
date: 2026-11-27
surface: agent
model: gemini-3-8-flash
feature: efpg-402
branch: crew/efpg-402-u03-translate
user: M Yousif Channa
command: crew job efpg-402-u03-translate
labels: ["agy2", "crew", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efpg-402/reviews/unit-03/G2/
  - specs/content/efpg-402/tasks.md
tests:
  - node scripts/prepare-gate-evidence.mjs --refresh-stale
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The brief reported a failure from the previous attempt: Unit 3 G2 evidence was stale. The translation handoff file is a bound input that the earlier evidence did not include. Refreshed the G2 evidence using scripts/prepare-gate-evidence.mjs --refresh-stale and repointed the Unit 3 G2 tracker row in tasks.md. Verified with measure-figure-text, figures:variants:check, and full check:content run.

## Outcome

- ✅ Impact: the stale G2 finding is cleared and all 14 content gates pass.
- 🧪 Tests: all G2 draft gates and all 14 content gates pass cleanly.
- 📁 Files: new G2 gate evidence JSON and logs directory, repointed tracker row, and this PHR.
- 🔁 Next prompts: independent G3 English review, followed by independent G5 Urdu review with rendered inspection.
- 🧠 Reflection: any newly committed translation handoff or bound input requires refreshing the G2 evidence.

## Handoff (for CEO and agents)

- Shipped / changed: refreshed Unit 3 G2 evidence and repointed tracker row on branch crew/efpg-402-u03-translate.
- Decisions the team must respect: translation_status stays draft; G3, G4 completion, and G5 remain open.
- Pending / next owner: G3 and G5 reviewers; curriculum owner on proposed terms in translations/unit-03/handoff.md.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: previous attempt added translations/unit-03/handoff.md without refreshing G2 gate evidence.
- Graders run and results (PASS/FAIL): all 14 content gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): remind translate-unit skill to refresh G2 evidence after committing handoff.md.
