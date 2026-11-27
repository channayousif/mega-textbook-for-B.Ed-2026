---
name: quota-wise
description: Get more from the weekly Claude quota on this repo (Feature 034). Pick the model, subagent and effort level per task kind, keep context lean, delegate implementation to Sonnet and searches to Haiku, and measure the result with scripts/ops/claude-usage.mjs. Use when starting a multi-step task, before spawning subagents, when a session grows long, or when asked how to save quota.
---

# Quota-wise working

Baseline (2026-11-27, 7 days): Opus carried 99.9% of weighted usage; interactive sessions 70%,
crew 30%; cache reads dominate. The levers below target exactly that.

## Route the work

| Task kind | Who does it | Model / effort |
|---|---|---|
| Plan, design, decide, review judgement, owner questions | main session | Opus (plan mode) |
| Apply a written plan to code | `implementer` subagent | Sonnet, medium |
| "Where is X?", list files, summarise a long file or log | `scout` subagent (or Explore) | Haiku |
| Check content against style guide and gates (advisory) | `content-checker` subagent | Sonnet |
| G3/G5 review | independent `g3-reviewer` / `g5-reviewer` run (ADR-0019) | as configured; never edit those files (bound review inputs) |
| Course content authoring, translation, repairs | the crew (`crew add <COURSE> <unit> <stage> --task "..."`) | crew routing below |
| Builds, tests, browsers | main session only, via `scripts/heavy.sh` | n/a |

Write the plan once, with file paths and acceptance checks, then hand it to `implementer`. Review
the diff yourself and run the heavy checks; do not re-derive what the plan already settled.

## Crew routing (scripts/crew/workers.mjs `CLAUDE_ROUTING`)

The `claude` worker runs Opus (effort high) for author, review_en, review_ur, maint_survey and
maint_review, and Opus (medium) for plan_illustrations, teaser_script, intel_distill and maint_adr.
Every other stage runs Sonnet (medium). Override one stage without a code change:
`CREW_CLAUDE_MODEL_<STAGE>=opus` and `CREW_CLAUDE_EFFORT_<STAGE>=high`.

## Keep context lean

- `/clear` between unrelated tasks (use `/rename` first if you may resume). `/compact <focus>` when a
  long task must continue; keep decisions, files touched, open PRs and owner rulings.
- Read only the part of a file you need (offset/limit, `sed -n`), and grep before reading.
- Do not paste large outputs back; summarise them. Let subagents read big files and return conclusions.
- `/context` shows what fills the window; `/usage` shows plan usage with per-skill, subagent and MCP
  attribution. Disable MCP connectors this project never uses (in `/mcp`).

## Measure

`node scripts/ops/claude-usage.mjs --days 7` totals tokens by model, kind (interactive, crew,
subagent), day and project from local transcripts. Compare week over week; `/usage` stays the
authority for the plan limit.
