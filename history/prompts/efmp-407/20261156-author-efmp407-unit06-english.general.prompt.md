---
id: 20261156
title: Author EFMP-407 Unit 6 in English
stage: general
date: 2026-11-07
surface: agent
model: claude-opus-5-5
feature: efmp-407
branch: crew/efmp-407-u06-author
user: M Yousif Channa
command: crew job efmp-407-u06-author
labels: [claude, crew, efmp-407, authoring]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-06/
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/authoring/unit-06.md
  - specs/content/efmp-407/concepts/unit-06.md
  - specs/content/efmp-407/coverage/unit-06.md
  - specs/content/efmp-407/figures/unit-06.md
  - specs/content/efmp-407/figures/unit-06.banner.md
  - specs/content/efmp-407/sources/unit-06.md
  - specs/content/efmp-407/sources/texts/
  - specs/content/efmp-407/reviews/unit-06/G2/
  - static/img/figures/efmp-407/unit-06/
tests:
  - npm run check:content
  - npm run gates:evidence -- EFMP-407 6
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored Unit 6 of EFMP-407 (Economic Dimensions) from the approved spec: index, three nine-part topics, a 10/10/5 assessment bank, teacher notes, six placed schematic SVGs with derived dark variants, coverage, sources with bound excerpts, concept graph, banner prompt, tracker rows and G2 gate evidence.

## Outcome

- ✅ Impact: EFMP-407 Unit 6 now exists in English. G3, G4 and G5 remain open.
- 🧪 Tests: check:content and the G2 evidence run; no site build, Playwright or measure-figure-text run, as the brief forbids browser runs.
- 📁 Files: unit mdx files, governance files, figures and review evidence listed above.
- 🔁 Next prompts: independent G3 review; Urdu mirror; banner illustration.
- 🧠 Reflection: sharp cannot resolve CSS var() and renders these SVGs black, so inspection copies need the colour tokens inlined.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-407 Unit 6 English on branch crew/efmp-407-u06-author, not pushed.
- Decisions the team must respect: the unit does not decide the Ali Enterprises audit dispute and gives both parties' accounts. It does not state that the CSR bill is law, because assent was not confirmed. The fan price and tariff are labelled as assumed.
- Pending / next owner: G3 by an independent reviewer; Urdu job; illustrate job for banner fig-U6-7; glossary candidates in authoring/unit-06.md; CI figure-geometry measurement.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: check:source-floor needs a registry name and ISO date in the same sources row; check:content-status needs npm run build:content-status after adding a unit; two sources could be read only as search excerpts after direct fetches failed and Firecrawl credits ran out.
- Next experiment: none.
