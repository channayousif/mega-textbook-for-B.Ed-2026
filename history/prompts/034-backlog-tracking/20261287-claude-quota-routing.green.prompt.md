---
id: 20261287
title: Claude quota routing - usage meter, subagents, crew per-stage models, skill
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-quota-routing
user: M Yousif Channa
command: Configure Claude for efficiency (plan part B)
labels: [board-direct, crew, ops]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/ops/claude-usage.mjs
  - tests/unit/claude-usage.test.mjs
  - scripts/crew/workers.mjs
  - scripts/crew/crew.mjs
  - tests/crew/claude-routing.test.mjs
  - ops/crew/README.md
  - .claude/agents/implementer.md
  - .claude/agents/scout.md
  - .claude/agents/content-checker.md
  - .claude/skills/quota-wise/SKILL.md
tests:
  - node --test tests/crew/*.test.mjs (204 passed)
  - vitest tests/unit/claude-usage.test.mjs (3 passed)
  - headless smoke: claude -p --model sonnet --effort medium answered on claude-sonnet-5-5
---

## Prompt

inject the chart, close #823, then do #820, Configure Claude for efficiency, use different models for different kind of tasks, for eg opus is good at planning, sonnet in economical and good at implementation. Using sub agents for efficiency. The objective is to get more out of the same weekly Claude quota. We can also explore the options for context management and create needed skills and scripts. i have another agy account and want to extend crew worker with agy2 and agy2-claude using container as agy does not support multiple profiles like calude.

## Response snapshot

Part B of the approved plan. `scripts/ops/claude-usage.mjs` reads local transcripts and totals
tokens by model, kind (interactive, crew, subagent), day and project; the baseline showed Opus at
99.9% of weighted use (interactive 70%, crew 30%). The crew `claude` worker now passes `--model`
and `--effort` per stage from `CLAUDE_ROUTING` (Opus for authoring, reviewing, surveying and
planning; Sonnet for everything that follows a brief), overridable per stage by env. New project
subagents: `implementer` (Sonnet, edits only, no heavy jobs), `scout` (Haiku, read-only),
`content-checker` (Sonnet, advisory). A `quota-wise` skill holds the routing table and the
context-management habits. Deviation from the plan: `model: opus` was NOT added to g3-reviewer.md
and g5-reviewer.md, because `scripts/lib/review-evidence.mjs` binds those files into every G3/G5
manifest; the evaluator agent was left alone too. Crew reviews still get Opus through routing.

## Outcome

- ✅ Impact: crew brief-following stages move from Opus to Sonnet; interactive work can delegate implementation to Sonnet and search to Haiku; usage is measurable.
- 🧪 Tests: crew 204/204, usage 3/3, headless smoke OK.
- 📁 Files: see list above.
- 🔁 Next prompts: owner settings (opusplan, subagent default, effort, MCP connector trim); AGENTS.md trim (B4); agy2 workers (part C); re-run the usage report after a week.
- 🧠 Reflection: check review-evidence bindings before editing anything under .claude/.

## Handoff (for CEO and agents)

- Shipped / changed: per-stage Claude routing in the crew; three subagents; quota-wise skill; usage script.
- Decisions the team must respect: never edit `.claude/agents/g3-reviewer.md` or `g5-reviewer.md` casually (bound review inputs). After merge, fast-forward the local branch in ~/crew-system so the crew uses the routing.
- Pending / next owner: owner applies the user-level settings; agent compares usage weekly.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the planned reviewer-agent model edit would have invalidated review evidence; caught by reading review-evidence.mjs.
- Graders run and results (PASS/FAIL): crew tests PASS; vitest PASS; smoke PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): one week of routing, then compare claude-usage.mjs output.
