---
id: 553
title: Author EFMP407 Unit Two
stage: general
date: 2026-11-07
surface: agent
model: GPT-6
feature: content-pipeline
branch: crew/efmp-407-u02-author
user: crew
command: crew brief execution
labels: [codex, efmp-407, unit-02, author-unit]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-02/index.mdx
  - docs/semester-3/efmp-407/unit-02/topic-01.mdx
  - docs/semester-3/efmp-407/unit-02/topic-02.mdx
  - docs/semester-3/efmp-407/unit-02/topic-03.mdx
  - docs/semester-3/efmp-407/unit-02/unit-assessment.mdx
  - docs/semester-3/efmp-407/unit-02/unit-teacher-notes.mdx
  - static/img/figures/efmp-407/unit-02/fig-U2-1.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-1.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-2.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-2.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-3.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-3.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-4.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-4.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-5.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-5.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-6.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-6.svg
  - specs/content/efmp-407/concepts/unit-02.md
  - specs/content/efmp-407/coverage/unit-02.md
  - specs/content/efmp-407/figures/unit-02.banner.md
  - specs/content/efmp-407/figures/unit-02.md
  - specs/content/efmp-407/sources/texts/maurer-bogner-2019.md
  - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
  - specs/content/efmp-407/sources/texts/unesco-2024-greening.md
  - specs/content/efmp-407/sources/unit-02.md
  - specs/content/efmp-407/tasks.md
  - history/prompts/general/553-author-efmp407-unit-two.general.prompt.md
tests:
  - origin/main baseline npm run check:content passed all 14 gates
  - MDX compilation passed for all six authored pages
  - check:depth-gate, check:figures, check:svg-style and check:source-floor passed
  - figures:variants:check passed
  - final check:content: 13 of 14 pass; pipeline blocked by missing course overview required for G2
  - prepare-gate-evidence: refused missing required course-overview.mdx; no evidence written
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored English EFMP-407 Unit 2 from the approved specification: orientation, three complete topic cycles, 10/10/5 assessment bank with bounded public guidance, and guide-supported teacher notes. Added coverage, consulted-source notes, concept graph, tracker and banner handoff. Placed six approved SVG schematics and derived dark variants because the current figure gate requires visible figures. Recorded the source verification and inspected raster previews. After the content commit, G2 preparation refused a missing course-level overview outside the Unit 2 scope. The final suite passes 13 of 14 gates, with only the open G2 pipeline row failing. No evidence or certification was fabricated.

## Outcome

- Impact: The English unit is drafted at the approved topic partition and a 48-minute reading estimate; independent review and Urdu remain open.
- Tests: Main baseline all green; draft-specific structural, source, figure and MDX checks pass. Final content-suite rerun passed 13 of 14; pipeline remains blocked because G2 requires the absent course overview.
- Files: Six MDX pages, twelve SVG assets, per-unit governance records, three bound source notes and this PHR.
- Next prompts: Independent G3 review, Urdu translation and G5, banner production, permitted browser geometry inspection.
- Reflection: Inspect current gate code when authoring-skill prose describes an older figure lifecycle; preserve the approved figure meaning while satisfying the live gate.

## Handoff (for CEO and agents)

- Shipped / changed: Complete English Unit 2 draft, original school examples, aligned bank and rubrics, six schematics with dark twins and source provenance.
- Decisions the team must respect: No G3/G5 self-certification, no Urdu parity claim, no catalog/spec/standard/gate changes, no publish step. English-only brief controls localisation scope.
- Pending / next owner: G3 reviewer must assess pedagogy and source support; Urdu job owns translation, mirrored diagrams and concept-label register; illustrate job owns the prompt-only banner; CI/inspection job must run measure-figure-text because this brief forbids Playwright. Course integration must add the required course overview before G2 can be evidenced; scope expansion was requested and has not been supplied.
- Paperclip issues affected: efmp-407-u02-author; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Older skill text allows prompt-only figures but current gates require placed figures; source notes and registry verification are also mandatory. An initial raw MDX parse included YAML; rerunning over the parsed MDX body passed all six files. Sharp previews required resolving CSS variables in scratch copies; committed SVG tokens were preserved.
- Graders run and results (PASS/FAIL): Baseline PASS; MDX and focused draft checks PASS; final suite 13/14 PASS, pipeline FAIL; G2 preparation blocked by missing course overview.
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): Run the mandated browser text-geometry check in a permitted inspection job without modifying the reviewed prose.

## Final validation and dependency

The content was committed at `ec48c1b9c`. All twelve English light/dark assets were visually inspected from Sharp scratch previews with palette variables resolved, preserving the committed token blocks. The final full content run has one new finding relative to the clean main baseline: G2 is not done. Preparing its evidence refuses the absent `docs/semester-3/efmp-407/course-overview.mdx`, which is outside the brief's explicit Unit 2 scope. The author requested a scope ruling, retained G2 as in progress and did not author unrelated course files. No browser geometry, build, development server or Playwright check ran. This job is authored and committed but cannot claim the brief's zero-new-findings acceptance condition yet.
