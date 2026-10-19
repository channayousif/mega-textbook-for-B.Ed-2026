---
id: crew-geng-300-u02-repair_en
title: crew repair_en GENG-300 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: Gemini 3.8 Flash (High)
feature: geng-300
branch: crew/geng-300-u02-repair_en
user: crew
command: execute .crew/brief.md
labels: ["crew", "agy", "repair_en", "geng-300"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/geng-300/unit-02/topic-02.mdx
  - docs/semester-1/geng-300/unit-02/topic-03.mdx
  - docs/semester-1/geng-300/unit-02/unit-assessment.mdx
  - docs/semester-1/geng-300/unit-02/unit-teacher-notes.mdx
  - static/img/figures/geng-300/unit-02/fig-U2-5.svg
  - static/img/figures/geng-300/unit-02/fig-U2-5.dark.svg
  - specs/content/geng-300/tasks.md
  - specs/content/geng-300/reviews/unit-02/G2/20261019T140746718Z-gates.json
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/validate-content.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-depth-gate.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-figures.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-concept-graph.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-bloom-bands.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-no-em-dash.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-no-answer-keys.txt
  - specs/content/geng-300/reviews/unit-02/G2/logs-20261019T140746718Z/check-docs-sync.txt
  - history/prompts/geng-300/crew-geng-300-u02-repair_en.misc.prompt.md
tests:
  - npm run check:content
  - npm run test:crew
  - npm run test:review
  - node scripts/prepare-gate-evidence.mjs GENG-300 2
  - node scripts/measure-figure-text.mjs static/img/figures/geng-300/unit-02/fig-U2-5.svg
  - node scripts/measure-figure-text.mjs static/img/figures/geng-300/unit-02/fig-U2-5.dark.svg
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied all six findings (3 blocking, 3 advisory) from the latest G3 review report `agent-g3-geng-300-u2-run24f6f754.json`:
1. Reworked ERQ 2 in `unit-assessment.mdx` to compare two contrasting passages on girls' education in Pakistan for audience, purpose, tone, and assumptions with an updated rubric.
2. Corrected RRQ 3 mark scheme arithmetic discrepancy in `unit-assessment.mdx` to 4 marks total (1 mark per strategy correctly named with use case).
3. Added explicit instruction and practice for leaf subtopic U2-05 (making predictions, questioning, summarising) under `### Reading strategies` in `topic-02.mdx`.
4. Fixed in-text figure cross-references in `topic-02.mdx` and `topic-03.mdx`, and corrected figure archetype labels in `unit-teacher-notes.mdx`.
5. Rebalanced the 10 MCQs in `unit-assessment.mdx` to distribute correct keys across options a-d (2 a, 3 b, 2 c, 3 d).
6. Adjusted table panel geometry in `fig-U2-5.svg` and `fig-U2-5.dark.svg` to clear cosmetic wordmark collision.
Refreshed G2 deterministic gate evidence via `node scripts/prepare-gate-evidence.mjs GENG-300 2` and appended the advisory repair tracker row in `specs/content/geng-300/tasks.md` leaving G3 unticked.

## Outcome

- Impact: Resolved all open findings from G3 review run `24f6f754` for GENG-300 Unit 2.
- Tests: `npm run check:content` (all 13 gates), `npm run test:crew`, `npm run test:review`, and `measure-figure-text` pass.
- Files: 17 file(s), listed above.
- Next prompts: Independent G3 re-review of repaired Unit 2 content.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all G3 advisory repairs to Unit 2 prose, assessment, teacher notes, SVGs, tasks.md tracker, and refreshed G2 gate evidence.
- Decisions the team must respect: G3 remains unticked and unsigned pending fresh independent review; GENG-300 is an English-only course with no Urdu mirror.
- Pending / next owner: Fresh independent G3 English reviewer to evaluate the repaired unit.
- Paperclip issues affected: none (Paperclip paused; work tracked by crew board).
