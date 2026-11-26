---
id: 20261286
title: Inject the GQUR-301 chart; close #823; queue #820; quota and agy2 plan
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-chart-injection
user: M Yousif Channa
command: inject the chart, close #823, #820, quota efficiency, agy2
labels: [board-direct, figures, crew, ops]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#812, #823, #820"
  adr: null
  pr: null
files:
  - specs/studio/charts/gqur-301/unit-10.json
  - scripts/build-studio-index.mjs
  - src/components/Studio/Chart.tsx
  - src/components/Studio/chart.module.css
  - src/components/Studio/TopicCharts.tsx
  - src/components/Studio/useStudioIndex.ts
  - src/theme/DocItem/Content.tsx
  - tests/unit/charts.test.mjs
  - tests/e2e/chart.spec.ts
  - specs/034-backlog-tracking/tasks.md
tests:
  - vitest charts + studio (17 passed)
  - tsc (no errors in changed files)
  - node scripts/build-studio-index.mjs puts the chart under gqur-301/10/2
---

## Prompt

inject the chart, close #823, then do #820, Configure Claude for efficiency, use different models for different kind of tasks, for eg opus is good at planning, sonnet in economical and good at implementation. Using sub agents for efficiency. The objective is to get more out of the same weekly Claude quota. We can also explore the options for context management and create needed skills and scripts. i have another agy account and want to extend crew worker with agy2 and agy2-claude using container as agy does not support multiple profiles like calude.

## Response snapshot

Planned in plan mode (owner rulings: agy2 via a separate HOME first, Docker only as fallback; #820
queued to the crew; trim AGENTS.md only where quality is kept). This PR is part A2: a data-driven
`<Chart>` injected at render time from `specs/studio/charts/<course>/unit-NN.json` through
`static/studio-index.json`, with no MDX edits. The pilot is GQUR-301 Topic 10.2, a bar chart of the
"absentees in Larkana" worked example (values copied from the topic's own table), placed after that
table, with a data table in `<details>` (printed) and Urdu labels on the Urdu page. The
implementation was delegated to a Sonnet subagent under a written brief and reviewed here (one fix:
place the chart after the table, not straight after the heading). #823 was closed as not planned
(the #822 viewer covers it). #820 was queued as crew job `efmp-302-u00-salvage`. Baseline from the
new usage script (written, to land with part B): last 7 days, Opus carried 99.9% of the weighted
usage, interactive sessions 70% and crew 30%. Mid-session the disk filled (100%, 1.5 GB free)
because each full worktree is about 2.7 GB; ten merged worktrees were removed (86%, 28 GB free).

## Outcome

- ✅ Impact: #812 done without touching reviewed content; #823 closed; #820 with the crew.
- 🧪 Tests: unit 17/17, tsc clean; e2e on CI.
- 📁 Files: see list above.
- 🔁 Next prompts: part B (usage script, subagents, crew per-stage models, skill, AGENTS.md trim), part C (agy2).
- 🧠 Reflection: full worktrees are 2.7 GB each; remove them as soon as a PR merges, or use sparse checkouts.

## Handoff (for CEO and agents)

- Shipped / changed: #812 PR; #823 closed; crew job efmp-302-u00-salvage for #820.
- Decisions the team must respect: charts are data in specs/studio/charts (outside review manifests), values copied from the topic text with a source line; never invented.
- Pending / next owner: an independent review of the #820 PR when the crew opens it; parts B and C of the plan.
- Paperclip issues affected: none; GitHub #812, #823, #820.

## Evaluation notes (flywheel)

- Failure modes observed: disk exhaustion from accumulated full worktrees.
- Graders run and results (PASS/FAIL): vitest PASS; tsc PASS
- Prompt variant (if applicable): Sonnet subagent for implementation under an Opus-written brief
- Next experiment (smallest change to try): compare the usage report after one week of routing.
