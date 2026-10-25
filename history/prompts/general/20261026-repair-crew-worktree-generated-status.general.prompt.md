---
id: 20261026
title: Repair crew worktree generated status
stage: general
date: 2026-10-25
surface: agent
model: gpt-6
feature: none
branch: crew/maint-2026-w43-m1
user: crew dispatcher
command: Read .crew/brief.md and carry out M1
labels: ["codex", "maintenance", "2026-W43", "M1"]
links:
  spec: null
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
  - scripts/crew/crew.mjs
  - specs/intelligence/registry.md
  - static/content-status.json (untracked)
  - tests/crew/worktrees.test.mjs
tests:
  - node --test tests/crew/*.test.mjs
  - node --test tests/crew/worktrees.test.mjs
  - npm run check:content (compared with origin/main)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Implemented M1: untrack the generated report, regenerate on all worktree preparation paths, resolve legacy report conflicts by removing index entries, and keep worker scratch files in the worktree. Promoted intelligence candidates and added regression coverage.

## Outcome

- ✅ Impact: Generated status no longer creates tracked drift; reused and new workers receive fresh reports.
- 🧪 Tests: Four new tests pass; full crew suite has the same pre-existing workers.test.mjs fallback failure. All 13 content gates pass on this branch and origin/main, with no new findings.
- 📁 Files: Crew orchestration, intelligence registry, generated-file removal, regression tests and this PHR.
- 🔁 Next prompts: Independent maintenance review and owner review of protected scripts.
- 🧠 Reflection: Test real modify/delete merges in both directions; never checkout ours when that stage may be deleted.

## Handoff (for CEO and agents)

- Shipped / changed: M1 implementation and regression coverage committed together.
- Decisions the team must respect: The generated report stays ignored and untracked; scratch files stay within job worktrees. Registry entries remain proposed until merged.
- Pending / next owner: Dispatcher owns independent review and PR creation; owner reviews protected script changes. Existing worker fallback test failure is outside M1.
- Paperclip issues affected: No issue number supplied; maintenance 2026-W43 M1.

## Evaluation notes (flywheel)

- Failure modes observed: Baseline crew suite expects codex after avoiding claude but the configured chain selects agy_claude.
- Graders run and results (PASS/FAIL): New worktree regression tests PASS; full crew suite 63 PASS / 1 pre-existing FAIL; all 13 content gates PASS on both this branch and origin/main; syntax and whitespace checks PASS.
- Prompt variant (if applicable): crew brief M1 2026-W43
- Next experiment (smallest change to try): Measure missing and stale report signatures after deployment.
