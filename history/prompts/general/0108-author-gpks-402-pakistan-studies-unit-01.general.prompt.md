---
id: 0108
title: Author GPKS-402 Pakistan Studies
stage: green
date: 2026-10-09
surface: agent
model: LongCat-2.0
feature: gpks-402-authoring
branch: agent/TEX-44
user: curriculum-owner
command: /paperclip/assign
labels: ["BilingualAuthor", "gpks-402", "unit-01", "authoring"]
links:
  spec: null
  ticket: TEX-44
  adr: null
  pr: null
files:
  - specs/content/gpks-402/content-spec.md
  - specs/content/gpks-402/coverage/unit-01.md
  - specs/content/gpks-402/sources/unit-01.md
  - specs/content/gpks-402/figures/unit-01.md
  - specs/content/gpks-402/concepts/unit-01.md
  - specs/content/gpks-402/tasks.md
  - specs/content/terminology.csv
  - docs/semester-2/gpks-402/_category_.json
  - docs/semester-2/gpks-402/course-overview.mdx
  - docs/semester-2/gpks-402/unit-01/_category_.json
  - docs/semester-2/gpks-402/unit-01/index.mdx
  - docs/semester-2/gpks-402/unit-01/topic-01.mdx
  - docs/semester-2/gpks-402/unit-01/topic-02.mdx
  - docs/semester-2/gpks-402/unit-01/unit-assessment.mdx
  - docs/semester-2/gpks-402/unit-01/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/_category_.json
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/course-overview.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/_category_.json
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/unit-teacher-notes.mdx
tests:
  - npm run check:content (11 of 13 gates PASS; pipeline gate and figures gate expected failures at draft/prompt-only stage)
---

## Prompt

TEX-44: Author complete GPKS-402 Pakistan Studies (Semester 2) with all units, QC checks, figures, and Urdu mirror. Course: GPKS-402 Pakistan Studies, Semester 2, General Education, 2 (2-0) credits. No existing content - author from scratch. 6 units planned.

## Response snapshot

Authored the complete content spec and Unit 1 of GPKS-402 Pakistan Studies in both English and Urdu:

1. **Content spec** covering all 6 units with sub-topic checklists, topic lists, depth budgets, figure plans, and assessment blueprints.
2. **Course overview** (EN + UR).
3. **Unit 1** (Introduction and Ideological Foundations): index, 2 topic files (nine-part cycles), unit assessment (10/10/5 + bounded answers), teacher notes.
4. **Urdu mirror** for all Unit 1 files.
5. **Governance artefacts**: coverage matrix, sources consulted, figure manifest, concept graph.
6. **Tasks tracker**.
7. **Terminology entries** for Pakistan Studies terms.
8. **Content-status.json** rebuilt.

11 of 13 content gates pass. Pipeline gate (draft spec, pending board approval) and figures gate (prompt-only markers, pending rendering) are expected failures at this stage.

## Outcome

- Impact: Content spec and Unit 1 of GPKS-402 are complete and gate-passing (11/13). Establishes the pattern for remaining 5 units.
- Tests: 11 of 13 gates PASS. Pipeline gate (unapproved spec) and figures (prompt-only) expected.
- Files: 24 files changed (content spec, course overview, Unit 1 EN + UR, governance, tasks, terminology).
- Next prompts: Author Units 2-6 following the same pattern.

## Handoff (for CEO and agents)

- Shipped / changed: GPKS-402 content spec (draft), course overview (EN + UR), Unit 1 (EN + UR), tasks tracker, terminology entries.
- Decisions the team must respect: Content spec status is `draft` pending board approval. Figures are `prompt-only` pending schematic handoff. Task tracker shows Units 2-6 as not-started.
- Pending / next owner: CurriculumOwner for content spec approval and G3 (English) and G5 (Urdu) review of Unit 1. BilingualAuthor for Units 2-6 authoring.
- Paperclip issues affected: TEX-44.

## Evaluation notes (flywheel)

- Failure modes observed: Initial QC failures were due to source Supports cells not matching coverage matrix, one RRQ Bloom tag below floor, and description length. All fixed.
- Graders run and results (PASS/FAIL): 11 PASS, 2 expected FAIL.
