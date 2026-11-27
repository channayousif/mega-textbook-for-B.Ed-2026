---
id: 20261305
title: Crew EFPG-402 Unit 7 translation retry, G2 evidence refresh
stage: green
date: 2026-11-27
surface: agent
model: gemini-flash
feature: efpg-402
branch: crew/efpg-402-u07-translate
user: M Yousif Channa
command: crew job efpg-402-u07-translate
labels: ["agy", "crew", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efpg-402/reviews/unit-07/G2/
  - specs/content/efpg-402/tasks.md
tests:
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-07/*.ur.svg
  - node scripts/prepare-gate-evidence.mjs EFPG-402 7
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

The brief reported a failure from the previous attempt: Unit 7 G2 evidence was stale because the translation handoff file under specs/content/efpg-402/translations/unit-07/ is a bound input that the previous evidence manifest did not include. Verified all ten .ur.svg figures with measure-figure-text, confirmed parity and terminology bank binding, regenerated the G2 gate evidence via prepare-gate-evidence, repointed the Unit 7 G2 tracker row in tasks.md, and ran check:content with all 14 gates passing.

## Outcome

- ✅ Impact: the stale G2 finding is cleared; all 14 content gates pass cleanly.
- 🧪 Tests: figure text measurement passed (0 errors); G2 draft gates passed; check:content 14/14 passed.
- 📁 Files: one new gate evidence JSON with its command logs, tracker row update in tasks.md, this PHR record.
- 🔁 Next prompts: independent qualified G3 English review, and independent G5 Urdu review with rendered inspection.
- 🧠 Reflection: adding a translation handoff file to specs/content/<course>/translations/<unit>/ mutates the G2 input manifest and requires a G2 evidence refresh.

## Handoff (for CEO and agents)

- Shipped / changed: refreshed Unit 7 G2 evidence on the crew branch; not pushed.
- Decisions the team must respect: translation_status stays draft; G3 review, G4 completion, and G5 review remain open.
- Pending / next owner: independent G3 and G5 reviewers; curriculum owner on proposed terminology in translations/unit-07/handoff.md.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: previous attempt committed handoff.md without refreshing G2 gate evidence.
- Graders run and results (PASS/FAIL): G2 draft gates PASS, check:content 14/14 PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): translate-unit skill should automatically refresh G2 evidence after writing handoff.md.
