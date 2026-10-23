---
id: 0860
title: Fix e2e moderation shared-DB rows
stage: general
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/e2e-moderation-unique-rows
user: M Yousif Channa
command: board-direct CI fix
labels: ["board-direct", "ci", "e2e"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - tests/e2e/suggestion-moderation.spec.ts
tests:
 - CI e2e (pending on the PR)
---

## Prompt

fix, pr 314 ci failed

## Response snapshot

PR #314 itself merged green (16:17Z), but main's post-merge CI run 39985596586 (413d76ea) failed e2e: `tests/e2e/suggestion-moderation.spec.ts` "admin filters the queue..." hit a Playwright strict-mode violation, `getByTestId('moderation-row').filter({ hasText: 'Fix typo A' })` resolved to 2 elements, on all 3 retries. The admin moderation queue lists every suggestion in the shared CI Supabase, and the test seeded fixed bodies, so a row left by an earlier aborted run (PR #316's first e2e attempt failed at 16:25Z) matched twice. Fix: seed `Fix typo A <tag>` / `Fix fact B <tag>` using the run's existing `Date.now()` tag and filter on those. Unrelated to #314's tick.sh change.

## Outcome

- ✅ Impact: moderation e2e no longer collides with leftovers from aborted runs.
- 🧪 Tests: CI e2e on the PR.
- 📁 Files: tests/e2e/suggestion-moderation.spec.ts.
- 🔁 Next prompts: purge stale e2e suggestion rows from the CI database if they accumulate.
- 🧠 Reflection: e2e tests against a shared database must tag every seeded row they later match by text.

## Handoff (for CEO and agents)

- Shipped / changed: unique per-run seed bodies in the moderation e2e test.
- Decisions the team must respect: e2e seeds that are matched by text carry the run tag.
- Pending / next owner: merge on green restores main's CI and production deploys (deploy-prod only ships a green main head).
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: shared-DB leftover rows causing strict-mode duplicates.
- Graders run and results (PASS/FAIL): pending CI.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): audit other e2e specs for fixed seeded text.
