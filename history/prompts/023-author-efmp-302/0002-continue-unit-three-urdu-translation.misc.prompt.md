---
id: 0002
title: Continue Unit Three Urdu Translation
stage: misc
date: 2026-10-17
surface: agent
model: Codex
feature: 023-author-efmp-302
branch: crew/efmp-302-u03-translate
user: board
command: .crew/brief.md
labels: [board-direct, translation, efmp-302, G4]
links:
  spec: specs/023-author-efmp-302/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-05.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/unit-teacher-notes.mdx
  - specs/content/efmp-302/tasks.md
  - static/img/figures/efmp-302/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-1.ur.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-10.ur.dark.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-10.ur.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-3.ur.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-8.ur.dark.svg
  - static/img/figures/efmp-302/unit-03/fig-U3-8.ur.svg
  - specs/content/efmp-302/reviews/unit-03/g4-translation-handoff-20261017.md
tests:
  - npm run check:content (unchanged origin/main baseline)
  - npm run check:content (temporary reviewed parity run and repaired rerun)
  - npm run figures:variants:check
  - Explicit file, heading, metadata, component, figure and assessment source parity assertions
  - npm run check:content (final draft state)
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing eight-page Urdu mirror against English baseline
65d2428e170574f474b50d20cefdf722ef389d19. Corrected mistranslations, awkward wording,
untranslated prose words and spelling. Updated four Urdu SVG descriptions with their MDX alt
text and regenerated dark twins. Recorded the continuation in the existing G4 row and a handoff.
Translation status stays draft and G3/G5 remain open. No push or PR.

## Outcome

- Impact: Improved the existing complete Unit 3 draft without restarting prior translation work.
- Tests: Baseline has only missing ignored content-status artifact; generated locally. Temporary
  parity rerun passes every check except expected uncertified G4/G5 rows. Final draft run: all 13 content gates PASS.
- Files: Eight Urdu pages, four light/dark description pairs, tracker, handoff and this PHR.
- Next prompts: Independent G5 acceptance and rendered Urdu inspection after the G3 dependency.
- Reflection: Source parity is useful but does not certify semantic equivalence or rendering.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 Urdu wording repairs and synchronized accessible figure descriptions;
  all eight files and sixteen figure carriers retained.
- Decisions the team must respect: Frozen terminology unchanged. Retain draft status. The brief
  overrides the skill's build/server steps and prohibits push/PR. Updated the existing G4 note;
  did not append a new row or claim completion, following translate-unit Step 7.
- Pending / next owner: Curriculum owner for seventeen existing unbanked concept-label proposals
  and G3 dependency. Independent G5 reviewer for current semantic and desktop/narrow/A4 rendered
  inspection. No current rendered evidence exists in this checkout; historic tracker render
  claims apply only to earlier bytes. No new proposed terms were introduced.
- Paperclip issues affected: None supplied; existing G-2026-65/G-2026-70 dependency context remains.

## Evaluation notes (flywheel)

- Failure modes observed: Draft status hides parity checks. Temporary activation exposed SVG
  description drift after punctuation repairs; synchronized descriptions and regenerated variants.
  Baseline checkout lacked ignored static/content-status.json.
- Graders run and results: Source parity PASS; variants freshness PASS; temporary parity PASS
  except G4/G5 open-row assertions, deliberately retained. Final draft content gates: all 13 PASS; git diff --check PASS.
- Prompt variant: crew/efmp-302-u03-translate
- Next experiment: Inspect current Urdu in a permitted build/render session before independent G5.
