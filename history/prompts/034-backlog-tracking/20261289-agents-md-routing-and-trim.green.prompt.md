---
id: 20261289
title: AGENTS.md model routing, compact instructions and agy recipe move
stage: green
date: 2026-11-27
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-agents-trim
user: M Yousif Channa
command: context management (plan part B4)
labels: [board-direct, ops]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - AGENTS.md
  - .specify/memory/agent-reference.md
tests:
  - rule-sentence diff: 34 before, 32 in AGENTS.md after; the 2 that left (3 sentences) are verbatim in agent-reference.md behind an explicit pointer; none lost
---

## Prompt

(AskUserQuestion answer) "currently system is working fine, do it as long as quality is not compromised"

## Response snapshot

Moved the agy invocation recipe (command, required `--add-dir`, the always-proceed permission
setting, and the forbidden `--disable-slash-commands` and `--mode plan` for review) verbatim from
AGENTS.md to `.specify/memory/agent-reference.md`, with a bold pointer in AGENTS.md telling anyone
who invokes agy to read it first. Added a short "Model routing and context" section (Opus plans,
`implementer`/`scout`/`content-checker` subagents, `/clear`, pointer to the quota-wise skill) and
a `# Compact instructions` section. A rule-sentence diff confirms nothing was lost. Net size change
is small (17,208 to 17,103 bytes): AGENTS.md is almost all rules, so the quota savings come from
model routing rather than trimming.

## Outcome

- ✅ Impact: every session gets routing guidance and compaction instructions at no net context cost.
- 🧪 Tests: rule-sentence diff clean.
- 📁 Files: AGENTS.md, agent-reference.md.
- 🔁 Next prompts: owner applies user-level settings; weekly usage comparison.
- 🧠 Reflection: measure before trimming; the always-loaded file was already lean in substance.

## Handoff (for CEO and agents)

- Shipped / changed: AGENTS.md routing and compact sections; agy recipe in agent-reference.md.
- Decisions the team must respect: read agent-reference.md "Antigravity (agy) invocation" before running agy by hand.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): rule diff PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
