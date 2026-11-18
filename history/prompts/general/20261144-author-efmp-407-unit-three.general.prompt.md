---
id: 20261144
title: Author EFMP-407 Unit 3
stage: general
date: 2026-11-07
surface: agent
model: gemini-3.1-pro-high
feature: efmp-407
branch: crew/efmp-407-u03-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/index.mdx
 - docs/semester-3/efmp-407/unit-03/topic-01.mdx
 - docs/semester-3/efmp-407/unit-03/topic-02.mdx
 - docs/semester-3/efmp-407/unit-03/topic-03.mdx
 - docs/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - specs/content/efmp-407/authoring/unit-03.md
 - specs/content/efmp-407/concepts/unit-03.md
 - specs/content/efmp-407/coverage/unit-03.md
 - specs/content/efmp-407/figures/unit-03.md
 - specs/content/efmp-407/figures/unit-03.banner.md
 - specs/content/efmp-407/sources/unit-03.md
 - specs/content/efmp-407/sources/texts/akkari-maleq-2020-gce.md
 - specs/content/efmp-407/sources/texts/khoo-jorgensen-2021.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.svg
 - static/img/figures/efmp-407/unit-03/fig-U3-6.dark.svg
tests:
 - npm run check:content
 - npm run figures:variants:check
 - node scripts/check-unit-depth.mjs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored EFMP-407 Unit 3 (SDGs and Education) in English from the approved content-spec (D-2026-0076): unit orientation index, Topic 3.1 (The SDGs and target 4.7), Topic 3.2 (Pakistan's National SDG Framework), Topic 3.3 (Educating global citizens), and a comprehensive 10/10/5 assessment bank. Authored six production SVGs with matching dark variants, a prompt-only banner row, concept graph, coverage matrix, source registries, and tracker rows. Unit depth satisfies all Spec 008 checks.

## Outcome

- ✅ Impact: EFMP-407 Unit 3 is authored to full pedagogical and structural depth, covering sub-topics U3-01 to U3-04 with rigorous Pakistani context, ESD-GCED linkages, and 18th Amendment localization.
- 🧪 Tests: All 14 content gates pass in npm run check:content; all figures pass svg-style and variants checks; check-unit-depth passes with 0 findings; zero em dashes repository-wide.
- 📁 Files: 5 unit content MDX files, 9 governance files in specs/content/efmp-407/, 12 SVG figure files (6 light + 6 dark variants), and 1 session PHR.
- 🔁 Next prompts: CI figure geometry validation in Chromium; G3 English review when course-overview.mdx merges from Unit 1; G4 Urdu translation.
- 🧠 Reflection: Following efmp-406 precedent, staging with coming_soon: true and G2: ▣ preserves deterministic check:pipeline-gate passes while sibling jobs finish course-overview.mdx.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-407 Unit 3 English draft committed on branch crew/efmp-407-u03-author. Not pushed, no PR opened.
- Decisions the team must respect: Topic titles follow "Topic N.M - Title" format. gop-national-sdg-framework is retained under unverifiable sources per D-2026-0001 and D-2026-0076 with policy-level claims only. Sibling branch crew/efmp-407-u01-author owns course-overview.mdx creation; Unit 3 must not create course-overview.mdx to avoid add/add merge conflicts.
- Pending / next owner: Once Unit 1 merges course-overview.mdx, remove coming_soon: true to ungate full G2 evidence generation (scripts/prepare-gate-evidence.mjs EFMP-407 3), followed by G3 review.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: check:source-floor requires both registry name and ISO date in the same table row; validate:content requires translation_status on all topic and assessment files even when coming_soon is true. Both were rectified and validated.
- Graders run and results (PASS/FAIL): All 14 content gates PASS (npm run check:content).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Automate template generation for new unit front-matter to guarantee inclusion of translation_status on every child file.
