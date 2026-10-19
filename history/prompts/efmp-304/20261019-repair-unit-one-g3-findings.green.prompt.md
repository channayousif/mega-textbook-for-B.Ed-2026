---
id: 20261019
title: Repair Unit One G3 Findings
stage: green
date: 2026-10-19
surface: agent
model: gpt-6
feature: efmp-304
branch: crew/efmp-304-u01-repair_en
user: owner
command: crew brief
labels: ["board-direct", "efmp-304", "g3-repair"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/efmp-304/unit-01/topic-02.mdx
  - docs/semester-2/efmp-304/unit-01/topic-03.mdx
  - docs/semester-2/efmp-304/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/unit-assessment.mdx
  - specs/content/efmp-304/concepts/unit-01.md
  - specs/content/efmp-304/figures/unit-01.md
  - specs/content/efmp-304/tasks.md
  - static/img/figures/efmp-304/unit-01/fig-U1-1.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-1.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-10.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-10.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-3.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-3.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-4.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-4.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-5.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-5.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-7.dark.svg
  - static/img/figures/efmp-304/unit-01/fig-U1-7.svg
tests:
  - npm run check:content
  - scripts/heavy.sh npm test
  - scripts/heavy.sh node scripts/measure-figure-text.mjs (12 affected SVG variants)
  - Python ElementTree XML parsing (all 40 Unit 1 SVGs)
  - FIGURE_ROOT=static/img/figures/efmp-304/unit-01 npm run figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the five findings from agent-g3-efmp-304-u1-run5e4cc29c.json. Removed four malformed closing tags from Figure 3 and regenerated its dark variant. Added a wordmark CSS anchor override in five schematic sources and regenerated dark variants. Replaced RRQ 9 with a Topic 1.1 critical-thinking versus general-scepticism question, updated its two-mark model answer in English and Urdu, and mapped it in the concept graph. Corrected the placed manifest preamble and linked article titles to their DOI destinations in both locales. Appended an unsigned advisory G3 repair row; G3 stays unticked. G2 evidence refresh and final gate rerun follow the source commit because evidence preparation requires committed inputs.

## Outcome

- Impact: All five requested repairs applied with minimal edits.
- Tests: XML parsing and affected wordmark geometry pass. Initial content run exposed stale Unit 1 G2 evidence and a missing generated content-status file; final results recorded in the repair handoff.
- Files: Unit 1 English and Urdu pages, concepts, figures, tracker and SVG variants.
- Next prompts: Fresh independent G3, then dependent G5, owned by the curriculum owner.
- Reflection: SVG presentation attributes lose to CSS selectors; verify computed geometry rather than only the markup.

## Handoff (for CEO and agents)

- Shipped / changed: Five G3 findings repaired; final validation and G2 refresh recorded under Unit 1 reviews.
- Decisions the team must respect: No G3/G5 certification or translation-status changes; no push, PR, build or server.
- Pending / next owner: Curriculum owner arranges fresh independent reviews of the changed inputs.
- Paperclip issues affected: None named in the brief.

## Evaluation notes (flywheel)

- Failure modes observed: Three additional malformed XML closing tags followed the reported first error; all four were removed.
- Graders run and results: XML and affected SVG geometry PASS; final content/unit-test results in the repair handoff.
- Prompt variant: .crew/brief.md
- Next experiment: Independent review of the repaired unit.
