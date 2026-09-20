---
id: 0023
title: Initialize repository agent guidance
stage: general
date: 2026-09-14
surface: agent
model: GPT-6
feature: none
branch: chore/comparator-base-bank-decoupling-and-en-first
user: a2ahs
command: init
labels: [initialization, agent-guidance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - AGENTS.md
  - history/prompts/general/0023-initialize-repository-agent-guidance.general.prompt.md
tests:
  - Documentation inspection and git diff --check
---

## Prompt

init

## Response snapshot

Initialized repository guidance in AGENTS.md with the project map, development commands, content safeguards, and references to existing governance.

## Outcome

- Impact: Added a repository entry point for coding agents.
- Tests: Documentation inspection and whitespace validation; runtime tests are unnecessary for these documentation additions.
- Files: AGENTS.md and this prompt history record.
- Next prompts: Follow the user's next project task.
- Reflection: Refer to existing authoritative guidance to minimize duplicated policy.

## Evaluation notes (flywheel)

- Failure modes observed: Older summaries contain superseded Node and Urdu-publication requirements.
- Graders run and results (PASS/FAIL): Documentation inspection PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
