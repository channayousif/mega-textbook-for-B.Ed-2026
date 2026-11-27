---
id: 20261304
title: Crew EFPG-402 Unit 5 Urdu translation (G4)
stage: green
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: efpg-402
branch: crew/efpg-402-u05-translate
user: M Yousif Channa
command: crew job efpg-402-u05-translate
labels: ["claude", "crew", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-05/
  - static/img/figures/efpg-402/unit-05/
  - specs/content/efpg-402/tasks.md
  - specs/content/efpg-402/translations/unit-05/handoff.md
  - specs/content/efpg-402/reviews/unit-05/G2/
tests:
  - scripts/heavy.sh npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-05/*.ur.svg
  - scripts/heavy.sh node scripts/prepare-gate-evidence.mjs EFPG-402 5
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated EFPG-402 Unit 5 into Urdu (seven files), made ten right-to-left `.ur.svg` figures with dark twins, recorded the G4 row notes (status left not done), wrote a translation handoff and refreshed the G2 evidence.

## Outcome

- ✅ Impact: Unit 5 has a complete draft Urdu mirror awaiting G5.
- 🧪 Tests: parity gates run with a temporary `reviewed` flip (only the two expected tracker findings); figure geometry passes with local and CI fonts.
- 📁 Files: seven Urdu pages, twenty figure files, tracker, handoff, G2 evidence.
- 🔁 Next prompts: independent G3, then G5 with rendered Urdu inspection.
- 🧠 Reflection: a scripted y-stretch plus mirror with an ordered label list kept the figure work short.

## Handoff (for CEO and agents)

- Shipped / changed: draft Urdu mirror and Urdu figures for EFPG-402 Unit 5 on the crew branch; not pushed.
- Decisions the team must respect: translation_status stays draft; no G4 completion or G5 claim.
- Pending / next owner: G3 reviewer (English points in translations/unit-05/handoff.md, including a tasting-safety problem in Topic 5.2); G5 reviewer; owner on proposed terms.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: rotated text in an RTL SVG fails the geometry check; set it horizontally.
- Graders run and results (PASS/FAIL): check:content PASS with draft status; measure-figure-text PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): promote the y-stretch plus mirror script into scripts/.
