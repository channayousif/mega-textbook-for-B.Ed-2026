---
id: 0174
title: Repair Unit One G3 Findings
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: geng-300
branch: crew/geng-300-u01-repair_en
user: owner
command: .crew/brief.md
labels: [board-direct, crew, repair]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/geng-300/unit-01/topic-02.mdx
  - docs/semester-1/geng-300/unit-01/unit-assessment.mdx
  - specs/content/geng-300/figures/unit-01.md
  - specs/content/geng-300/tasks.md
  - static/img/figures/geng-300/unit-01/fig-U1-1.dark.svg
  - static/img/figures/geng-300/unit-01/fig-U1-1.svg
  - static/img/figures/geng-300/unit-01/fig-U1-2.dark.svg
  - static/img/figures/geng-300/unit-01/fig-U1-2.svg
  - static/img/figures/geng-300/unit-01/fig-U1-3.dark.svg
  - static/img/figures/geng-300/unit-01/fig-U1-3.svg
  - static/img/figures/geng-300/unit-01/fig-U1-6.dark.svg
  - static/img/figures/geng-300/unit-01/fig-U1-6.svg
tests:
  - npm run check:content (branch and origin/main comparison)
  - scripts/heavy.sh npm test
  - scripts/heavy.sh node scripts/measure-figure-text.mjs (eight edited SVGs)
  - FIGURE_ROOT=static/img/figures/geng-300/unit-01 node scripts/build-figure-variants.mjs --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied all six open findings from agent-g3-geng-300-u1-run7c5e7ce2.json with minimal edits. Corrected RRQ 3 allocation to 0.5 per process and 0.5 per example (4 total); added explicit second-clause subjects in RRQ 4 and topic 1.2 and aligned the RRQ 4 scheme. Fixed wordmark CSS specificity in figures 1 and 3 and moved wordmarks below panels in figures 2 and 6, including dark variants. Updated manifest preamble and appended an unsigned advisory G3 repair row.

## Outcome

- Impact: Six open report findings addressed; no review certification claimed.
- Tests: Geometry and unit-local dark-variant freshness pass; content and unit-suite results recorded after completion.
- Files: Unit 1 assessment, topic 1.2, figure manifest, tracker row, eight SVG variants and this PHR.
- Next prompts: Fresh independent G3 review by the review owner.
- Reflection: Explicit subjects distinguish coordinated independent clauses from a compound predicate.

## Handoff (for CEO and agents)

- Shipped / changed: All six G3 findings repaired; no stale passage skipped.
- Decisions the team must respect: G3 remains open, unsigned and advisory. GENG-300 is explicitly English-only; no Urdu mirror exists or is required.
- Pending / next owner: Review owner arranges fresh independent G3 review of changed inputs.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Global SVG text-anchor CSS overrides presentation attributes; mark allocations must sum to their declared total.
- Graders run and results (PASS/FAIL): Geometry PASS (eight files), dark-variant freshness PASS (six figures); remaining checks recorded after completion.
- Prompt variant (if applicable): Crew brief repair_en.
- Next experiment (smallest change to try): Fresh independent review with updated input digests.
