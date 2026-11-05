---
id: 20261130
title: Repair GSOS301 Unit Three
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (Codex)
feature: none
branch: crew/gsos-301-u03-repair_en
user: crew
command: Read .crew/brief.md
labels: ["codex", "crew", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gsos-301/unit-03/index.mdx
  - docs/semester-2/gsos-301/unit-03/topic-01.mdx
  - docs/semester-2/gsos-301/unit-03/topic-02.mdx
  - docs/semester-2/gsos-301/unit-03/unit-assessment.mdx
  - docs/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
  - specs/content/gsos-301/concepts/unit-03.md
  - specs/content/gsos-301/coverage/unit-03.md
  - specs/content/gsos-301/figures/unit-03.md
  - specs/content/gsos-301/sources/unit-03.md
  - specs/content/gsos-301/tasks.md
  - static/img/figures/gsos-301/unit-03/fig-U3-1.dark.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-1.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-4.dark.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-4.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.dark.svg
  - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.svg
  - specs/content/gsos-301/reviews/unit-03/repair-20261105.md
  - specs/content/gsos-301/reviews/unit-03/repair-source-binding.sha256
  - history/prompts/general/20261130-repair-gsos301-unit-three.general.prompt.md
tests:
  - "scripts/heavy.sh npm test: 368 tests passed, 31 files"
  - "measure-figure-text: all 16 Unit 3 SVG variants passed"
  - "npm run check:content: baseline comparison and G2 refresh pending final record"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Completed the English author repairs and mirrored core changes into Urdu. Corrected figures, assessments, rubric scales, source locators and mappings; left G3/G5 open.

## Outcome

- ✅ Impact: Repaired Unit 3 findings without editing approved authority or certifying review.
- 🧪 Tests: 368 tests passed; 16 figure measurements passed; final gate comparison follows.
- 📁 Files: Unit 3 EN/UR content, figures, governance records and this PHR.
- 🔁 Next prompts: Owner spec correction, independent review with source scrutiny, permitted rendered review.
- 🧠 Reflection: Earlier partial edits were completed; historic source and identity limitations remain explicit.

## Handoff (for CEO and agents)

- Shipped / changed: Role conflict/strain distinction, 5/5 RRQ blueprint, aligned scoring, explicit rubric quality bands, bounded illustrations, repaired mappings and figures.
- Decisions the team must respect: G3/G5 remain unticked; no change to approved spec, translation_status or publication authority.
- Pending / next owner: Curriculum owner owns bounded approved-spec conflation correction and original provenance; independent reviewers own academic and Urdu checks; permitted host owns rendered review.
- Paperclip issues affected: gsos-301-u03-repair_en; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Stale G2 evidence after content edits; old source declarations lacked dated support; global status failure reproduced separately.
- Graders run and results (PASS/FAIL): PASS: unit tests and SVG text measurement. Final content results recorded below.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of the committed repaired inputs, subject to review-cycle authority.
