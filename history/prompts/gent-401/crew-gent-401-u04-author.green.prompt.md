---
id: crew-gent-401-u04-author
title: crew author GENT-401 unit 4
stage: green
date: 2026-11-24
surface: agent
model: gemini
feature: gent-401
branch: crew/gent-401-u04-author
user: crew
command: crew author
labels: ["crew", "gemini", "author"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-04/index.mdx
 - docs/semester-4/gent-401/unit-04/topic-01.mdx
 - docs/semester-4/gent-401/unit-04/topic-02.mdx
 - docs/semester-4/gent-401/unit-04/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-04/unit-teacher-notes.mdx
 - specs/content/gent-401/concepts/unit-04.md
 - specs/content/gent-401/coverage/unit-04.md
 - specs/content/gent-401/figures/unit-04.banner.md
 - specs/content/gent-401/figures/unit-04.md
 - specs/content/gent-401/reviews/unit-04/G2/20261124T050053741Z-gates.json
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T050053741Z/validate-content.txt
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/sources/unit-04.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-04/fig-U4-1.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-1.svg
 - static/img/figures/gent-401/unit-04/fig-U4-2.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-2.svg
 - static/img/figures/gent-401/unit-04/fig-U4-3.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-3.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.svg
tests:
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored GENT-401 Unit 4 in English (index, two topic cycles, 10/10/5 assessment, teacher notes, four placed schematic SVGs with derived dark variants, coverage matrix v2, sources consulted, concept graph v4, task tracker stage rows and G2 gate evidence) with all content gates passing.

## Outcome

- Impact: author for GENT-401 Unit 4 by gemini (crew job gent-401-u04-author).
- Tests: npm run check:content passed in the job worktree before completing the run.
- Files: 30 file(s), listed above.
- Next prompts: downstream G3 independent review and Urdu translation jobs.
- Reflection: none.

## Handoff (for CEO and agents)

### What shipped
- English draft for GENT-401 Unit 4 (Developing a Business Plan) comprising:
  - `index.mdx` (unit opening with learning outcomes, prerequisites, topic links, and untranslated notice)
  - `topic-01.mdx` (Topic 4.1: The plan's frame: components, summary, vision and mission)
  - `topic-02.mdx` (Topic 4.2: Marketing, operations and organisation)
  - `unit-assessment.mdx` (10 MCQs, 10 RRQs, 5 ERQs and bounded answers section)
  - `unit-teacher-notes.mdx` (instructional strategies, sequencing, misconception management, and practical workshop)
- Four placed schematic SVGs with derived dark variants:
  - `fig-U4-1.svg` / `fig-U4-1.dark.svg`: diagram of business plan sections in sequence
  - `fig-U4-2.svg` / `fig-U4-2.dark.svg`: table comparing vision and mission statements
  - `fig-U4-3.svg` / `fig-U4-3.dark.svg`: flowchart of daily operations from order to delivery
  - `fig-U4-4.svg` / `fig-U4-4.dark.svg`: diagram of organizational structures across scaling stages
- Sidecar banner prompt at `specs/content/gent-401/figures/unit-04.banner.md` (fig-U4-5)
- Governance matrices and source notes:
  - `coverage/unit-04.md`
  - `sources/unit-04.md`
  - `sources/texts/scott-2017-efmd.md`
  - `sources/texts/openstax-entrepreneurship.md` updated with Chapter 11 notes
  - `concepts/unit-04.md`
  - `tasks.md` updated with Unit 4 stage rows and G2 evidence pointer
- Gate evidence generated and recorded under `specs/content/gent-401/reviews/unit-04/G2/`

### Decisions the team must respect
- Reading minutes total 41 minutes (index 2, topic-01 11, topic-02 11, assessment 15, teacher notes 2), within the approved 32-44 depth budget band.
- Bounded answers section is the final section of `unit-assessment.mdx` with zero front-matter answer leaks.
- Zero em dashes across all files.

### Pending and ownership
- G3 English independent review: open (needs fresh independent reviewer session).
- G4 Urdu translation: open (separate job).
- fig-U4-5 banner illustration: prompt-only in `unit-04.banner.md` for the illustrate job.
