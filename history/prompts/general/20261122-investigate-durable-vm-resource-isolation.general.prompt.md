---
id: 20261122
title: Investigate durable VM resource isolation
stage: general
date: 2026-11-04
surface: agent
model: GPT-6 Codex
feature: none
branch: main
user: owner
command: VM resilience investigation
labels: ["codex", "board-direct", "ops"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/2026-11-04-vm-resilience-investigation.md
tests:
  - Read-only sysstat, cgroup, memory, disk and systemd inspection
---

## Prompt

read the conversation: https://chatgpt.com/share/6aeb55c0-66fc-83ee-b54f-ed35899ab69a?ogimg=plain this machine was not responding, i fixed. find more durable solution for this vm.

## Response snapshot

Confirmed prolonged disk I/O stalls and memory pressure. Recommend isolated aggregate worker budgets, pressure-aware admission, and reuse of CI build artifacts. Shared conversation unavailable; privileged incident logs require owner access.

## Outcome

- ✅ Impact: Concrete evidence and staged resilience proposal recorded.
- 🧪 Tests: Read-only diagnostics completed; no production load tests.
- 📁 Files: Investigation report and this PHR.
- 🔁 Next prompts: Owner supplies recovery details; finalize and implement limits.
- 🧠 Reflection: Disk reads were high while swap-in was low; avoid asserting swap thrashing as sole cause.

## Handoff (for CEO and agents)

- Shipped / changed: Read-only investigation and actionable proposal. No live configuration changes.
- Decisions the team must respect: Preserve production and SSH outside worker budgets; stay within current OCI allocation. Proposed limits remain provisional.
- Pending / next owner: Owner provides recovery context and privileged logs; Codex finalizes rollout.
- Paperclip issues affected: None identified.

## Evaluation notes (flywheel)

- Failure modes observed: Cooperative locks lack aggregate resource budgets; existing outer slice permits prolonged reclaim.
- Graders run and results (PASS/FAIL): PASS: report and PHR contain no unresolved template placeholders.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): One representative job under an isolated measured resource budget.
