---
id: 20261117
title: Repair EFMP-304 Unit 2 review findings
stage: general
date: 2026-11-03
surface: agent
model: Codex (exact deployed revision not exposed)
feature: 008-rich-unit-pedagogy
branch: crew/efmp-304-u02-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "repair_en"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-304/unit-02/topic-01.mdx
  - docs/semester-2/efmp-304/unit-02/topic-02.mdx
  - docs/semester-2/efmp-304/unit-02/topic-03.mdx
  - docs/semester-2/efmp-304/unit-02/topic-04.mdx
  - docs/semester-2/efmp-304/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-02/unit-assessment.mdx
  - specs/content/efmp-304/coverage/unit-02.md
  - specs/content/efmp-304/sources/unit-02.md
  - specs/content/efmp-304/tasks.md
  - static/img/figures/efmp-304/unit-02/fig-U2-2.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-2.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-4.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-4.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-4.ur.svg
  - specs/content/efmp-304/sources/texts/vancleave2016.md
  - specs/content/efmp-304/reviews/unit-02/repair-handoff-20261103.md
tests:
  - npm run check:content (iterative repair and origin/main comparison)
  - scripts/heavy.sh npm test (28 files, 347 tests passed)
  - Native SVG previews; browser geometry deferred by brief
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the latest Unit 2 G3 findings to English and Urdu prose, assessments, source bindings and SVG labels. Appended an advisory G3 row and documented independent review and rendering dependencies.

## Outcome

- ✅ Impact: Removed contradictory support rules and mismatched marking requirements.
- 🧪 Tests: 347 unit tests pass; final content gates pass 13/13 after refreshing deterministic G2 evidence.
- 📁 Files: Unit 2 EN/UR topics and assessment; source/coverage records, figures, tracker and handoff.
- 🔁 Next prompts: Host supplies permitted geometry/rendering and frozen independent G3/G5 review.
- 🧠 Reflection: Keep source summaries distinct from passage-level evidence and support patterns distinct from conclusion topics.

## Handoff (for CEO and agents)

- Shipped / changed: Bilingual G3 repairs and reproducible source locators.
- Decisions the team must respect: No G3/G5 certification; translation remains draft; shared Yu/Zenker note is not an active Unit 2 binding.
- Pending / next owner: Host: geometry, full-page rendering and provenance; course owner: overview weighting and Unit 3 source audit.
- Paperclip issues affected: Crew job efmp-304-u02-repair_en; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Stale G2 input manifest after repairs; original source claims exceeded bound evidence; SVG clipping.
- Graders run and results (PASS/FAIL): npm test PASS (347); origin/main check:content PASS after ignored index generation; final check:content PASS (13/13), fresh G2 evidence recorded.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of frozen repaired inputs.
