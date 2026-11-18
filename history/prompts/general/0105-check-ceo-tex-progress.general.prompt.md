---
id: 0105
title: check-ceo-tex-progress
stage: general
date: 2026-10-09
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: check CEO TEX progress
labels: ["board-direct", "paperclip", "status-check", "tex-37"]
links:
  spec: null
  ticket: TEX-37
  adr: null
  pr: null
files:
  - history/prompts/general/0105-check-ceo-tex-progress.general.prompt.md
tests:
  - paperclipai agent list / issue list / issue comments TEX-37 / issue interactions TEX-37 (read-only)
---

## Prompt

check CEO TEX progress

## Response snapshot

ProgramManager (CEO) idle since 2026-10-09T11:11Z. Its only active issue, TEX-37 (author all Semester 2 courses), is in_review awaiting board confirmation card 251daffb (pending, no expiry) to create 7 child issues and author 7 courses (~42 units) in parallel. Plan on branch agent/tex-37 at docs/semester-2/PLAN.md. Flagged: the plan file sits under docs/ (rendered as a site page) and contains 17 em dashes, which fails check:no-em-dash; "parallel authoring" must respect the host one-heavy-job rule. Other open: TEX-7 and TEX-25 in_progress since 10-03/10-04 (stale), TEX-8 critical and TEX-35 high unassigned todo.

## Outcome

- Read-only status check; no Paperclip or repo state changed.

## Handoff (for CEO and agents)

- Shipped / changed: nothing.
- Decisions the team must respect: none new.
- Pending / next owner: Board to accept or decline TEX-37 card 251daffb. CEO: move PLAN.md out of docs/ and remove em dashes before any PR; serialize builds per CLAUDE.md host limits.
- Paperclip issues affected: TEX-37, TEX-7, TEX-25, TEX-8, TEX-35.
