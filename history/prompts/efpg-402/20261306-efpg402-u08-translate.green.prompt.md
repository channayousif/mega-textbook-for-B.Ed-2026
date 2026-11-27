---
id: 20261306
title: Crew EFPG-402 Unit 8 Urdu translation (G4)
stage: green
date: 2026-11-27
surface: agent
model: gemini-3.8-flash
feature: efpg-402
branch: crew/efpg-402-u08-translate
user: M Yousif Channa
command: crew job efpg-402-u08-translate
labels: ["agy", "crew", "translation"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-08/
  - static/img/figures/efpg-402/unit-08/
  - specs/content/efpg-402/tasks.md
  - specs/content/efpg-402/translations/unit-08/handoff.md
tests:
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-08/*.ur.svg
  - npm run figures:variants
  - npm run figures:variants:check
  - npm run build:content-status
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated EFPG-402 Unit 8 into academic-plain Urdu (seven files matching structure, heading level vectors, and component calls), authored ten right-to-left `.ur.svg` figures with derived dark twins, verified all figure geometry with `measure-figure-text`, recorded the G4 row notes (status left not done pending G5), wrote the translation handoff, and verified clean passes across all 14 content gates including conditional parity and terminology checks under temporary `reviewed` probe.

## Outcome

- ✅ Impact: Unit 8 has a complete draft Urdu mirror awaiting independent G5.
- 🧪 Tests: parity gates and terminology bank checks verified clean under temporary `reviewed` flip (only the two expected open G4/G5 tracker findings reported); `measure-figure-text` passes with exit code 0 on all 10 `.ur.svg` figures; dark twin check clean; 14/14 content gates PASS with draft status.
- 📁 Files: seven Urdu pages, twenty figure files (`.ur.svg` and `.ur.dark.svg`), tracker update in `tasks.md`, handoff at `translations/unit-08/handoff.md`.
- 🔁 Next prompts: independent qualified G3 English review, followed by independent G5 Urdu review with rendered Urdu page inspection.
- 🧠 Reflection: generating RTL SVG layouts with balanced vertical padding ensures Nastaliq text nodes fit comfortably within bounds without clipping or overflowing.

## Handoff (for CEO and agents)

- Shipped / changed: complete draft Urdu mirror and localized figures for EFPG-402 Unit 8 on branch `crew/efpg-402-u08-translate`; not pushed.
- Decisions the team must respect: `translation_status` remains `draft`; no G4 completion claim or G5 sign-off claimed.
- Pending / next owner: independent G3 reviewer; independent G5 reviewer; curriculum owner review of proposed terminology.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: `check:figures` validates exact string equality between carrier `alt` and figure `<desc>`; ensured strict character-for-character parity.
- Graders run and results (PASS/FAIL): `check:content` 14/14 PASS; `measure-figure-text` PASS (0 errors); `figures:variants:check` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
