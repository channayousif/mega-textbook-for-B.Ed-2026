---
id: crew-maint-2026-w44-m1-revise1
title: revise mergeAppendOnly blank-line fix for W44 M1
stage: misc
date: 2026-11-01
surface: opencode
model: LongCat-2.0
feature: crew
branch: crew/maint-2026-w44-m1
user: owner
command: Read .crew/brief.md and carry it out completely.
labels: [opencode]
links:
  spec: specs/maintenance/2026-W44/plan.md
  ticket: null
  adr: null
  pr: 393
files:
  - scripts/crew/batch.mjs
  - tests/crew/batch.test.mjs
tests:
  - node --test tests/crew/batch.test.mjs (14/14 pass, 3 new blank-line tests)
  - node --test tests/crew/*.test.mjs (94/94 pass)
---

## Prompt

Crew brief maint-2026-w44-m1-revise1: an independent reviewer (codex, openai) asked for changes to maintenance PR #393: "Revise because mergeAppendOnly can silently discard an incoming inserted blank line. Replace join-based insertion equality with exact array comparison and add tests preserving blank-line insertions from either side." Make exactly those changes and nothing else, within the original M1 task.

## Response snapshot

The bug: `mergeAppendOnly` compares each gap's insertions with `o[i].join('\n') !== t[i].join('\n')`. When one side inserts a blank line (`['']`) and the other inserts nothing (`[]`), both join to `''`, so the blank line is silently dropped. Replaced with an exact array comparison (`sameInsert`: length + every element). Added three tests: blank line on one side preserved, blank lines on both sides at different points preserved, identical blank-line insertion kept once.

## Outcome

- ✅ Impact: blank-line insertions in append-only tracker merges are no longer lost; the join-equality bug is gone.
- 🧪 Tests: 14/14 batch.test.mjs pass (3 new); 94/94 crew test suite passes.
- 📁 Files: scripts/crew/batch.mjs (3 lines changed), tests/crew/batch.test.mjs (23 lines added).
- 🔁 Next prompts: none.
- 🧠 Reflection: the join-based comparison was a subtle bug only reachable when one side's insertion was empty; exact comparison is both safer and clearer.

## Handoff (for CEO and agents)

- Shipped / changed: mergeAppendOnly now uses exact array equality; blank-line preservation tests added. PR #393 revised.
- Decisions the team must respect: no change to resolveSharedConflicts, exclusionReason, five-fix ceiling, or registry.md. M1 scope unchanged.
- Pending / next owner: none. PR #393 is ready for the reviewer to re-check.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: join-based equality drops blank-line insertions from one side silently.
- Graders run and results (PASS/FAIL): node --test PASS (0 failures).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
