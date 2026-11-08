---
id: 20261181
title: Correct crew worker gate instructions
stage: general
date: 2026-11-08
surface: agent
model: GPT-6
feature: none
branch: crew/maint-2026-w45-m1
user: a2ahs
command: crew brief maint-2026-w45-m1
labels: ["codex", "maintenance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/brief.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/workers.mjs
 - tests/crew/brief.test.mjs
 - tests/crew/worker-chains.test.mjs
 - tests/crew/worktrees.test.mjs
tests:
 - node --test tests/crew/*.test.mjs
 - npm run build:content-status
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Extracted briefRules, required SVG geometry checks through heavy.sh and fresh content status before content gates, narrowed the browser restriction to the Playwright e2e suite, and removed opencode only from intel_distill.

## Outcome

- ✅ Impact: Worker briefs now permit the required geometry checks and explain ignored content-status regeneration.
- 🧪 Tests: Original 98 tests passed; updated 101 tests passed. All 14 content gates passed.
- 📁 Files: Focused helper extraction, worker-chain change and regression tests, plus this required PHR.
- 🔁 Next prompts: None.
- 🧠 Reflection: An existing source-extraction test needed conversion to the exported helper.

## Handoff (for CEO and agents)

- Shipped / changed: 2026-W45 M1 implementation and regression coverage.
- Decisions the team must respect: Other worker chains and variant-specific restrictions remain unchanged; intelligence registry untouched.
- Pending / next owner: Owner review required for protected scripts. Dispatcher owns job PHR processing.
- Paperclip issues affected: No linked issue.

## Evaluation notes (flywheel)

- Failure modes observed: Initial post-change test run exposed the old inline helper test; corrected the import.
- Graders run and results (PASS/FAIL): Crew tests PASS (101/101); content gates PASS (14/14).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Observe figure-geometry CI failures after brief deployment.
