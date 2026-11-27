---
id: 20261301
title: Crew EFPG-402 Unit 2 Urdu translation (G4)
stage: green
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: efpg-402
branch: crew/efpg-402-u02-translate
user: M Yousif Channa
command: crew job efpg-402-u02-translate
labels: ["claude", "crew", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/
  - static/img/figures/efpg-402/unit-02/
  - specs/content/efpg-402/tasks.md
  - specs/content/efpg-402/translations/unit-02/handoff.md
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-02/*.ur.svg
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated EFPG-402 Unit 2 into Urdu (seven files), made ten right-to-left `.ur.svg` figures with dark twins, recorded the G4 row notes (status left not done) and a translation handoff.

## Outcome

- ✅ Impact: Unit 2 has a complete draft Urdu mirror awaiting G5.
- 🧪 Tests: parity gates run with a temporary `reviewed` flip (only the two expected tracker findings); figure geometry passes.
- 📁 Files: seven Urdu pages, twenty figure files, tracker, handoff.
- 🔁 Next prompts: independent G3, then G5 with rendered Urdu inspection.
- 🧠 Reflection: stretching SVG y coordinates before mirroring gave a clean first-pass geometry check.

## Handoff (for CEO and agents)

- Shipped / changed: draft Urdu mirror and Urdu figures for EFPG-402 Unit 2 on the crew branch; not pushed.
- Decisions the team must respect: translation_status stays draft; no G4 completion or G5 claim.
- Pending / next owner: G3 and G5 reviewers; owner on proposed terms in translations/unit-02/handoff.md.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): check:content PASS with draft status; measure-figure-text PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): promote the y-stretch plus mirror steps into a shared script.
