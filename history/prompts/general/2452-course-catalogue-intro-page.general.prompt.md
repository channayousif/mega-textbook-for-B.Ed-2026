---
id: 2452
title: Course catalogue on the intro page
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/catalogue
user: M Yousif Channa
command: none
labels: [board-direct, ui, ux, redesign, catalogue]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/CourseCatalog/index.tsx
  - docs/intro.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/intro.mdx
  - docusaurus.config.ts
tests:
  - tests/e2e/catalogue.spec.ts
  - npm run check:all
---

## Prompt

remove REEC logo for now, i'll add later, carousel on only first page, continue

## Response snapshot

Replaced the /intro page with a course catalogue in English and Urdu: semester tabs and a card for each course, with a cover generated from its code plus unit and Urdu counts from the build.

## Outcome

- ✅ Impact: Start reading now leads to a clear course choice, and the page's "MVP" wording is gone.
- 🧪 Tests: check:all passes 20 of 20; 17 e2e tests pass, including every Semester 1 card opening its page.
- 📁 Files: catalogue component, intro pages, config, tests.
- 🔁 Next prompts: final polish.
- 🧠 Reflection: a site-wide link underline rule also hit card links, which only showed up in a screenshot, so a test now covers it.

## Handoff (for CEO and agents)

- Shipped / changed: /intro is titled "B.Ed courses" (بی ایڈ کورسز), which also changes its label in the course bar. New courses appear with no artwork work: covers come from the course code.
- Decisions the team must respect: docs/intro.mdx and its Urdu mirror now only hold a short line and `<CourseCatalog />`. Counts come from the build.
- Pending / next owner: owner to merge #442, #443, then this PR. Not built: the visual topic path on unit pages.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: global `.markdown a` underline and `li + li` margins leak into components placed in MDX.
- Graders run and results (PASS/FAIL): check:all PASS; Playwright PASS. Not run: full e2e suite, real device.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
