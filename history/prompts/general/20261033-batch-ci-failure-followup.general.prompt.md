---
id: "20261033"
title: Batch CI failure followup
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/batch-20261027-2015
user: channayousif
command: crew brief execution
labels: [codex, crew, cifix]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/349
files:
  - history/prompts/general/20261033-batch-ci-failure-followup.general.prompt.md
tests:
  - "npm run check:content: PASS, all 13 gates"
  - "gh pr checks 349: build, geometry and RLS pass; e2e fails"
  - "gh run view 40589467737 --log-failed: inspected both failures"
  - "gh run view 40590223226 --json conclusion,jobs: main CI passes including e2e and RLS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued from commits 27b1b5ec and 072109c0 with a clean worktree. PR #349 run 40589467737 has two platform e2e failures, not a content build failure. The G3 test at tests/e2e/g3-signoff.spec.ts:50 selects hidden rows from the collapsed By-course table using an unscoped tbody tr locator. PR #348 already fixes this on origin/main (6423af89) by labelling the Units table and scoping the locator. The other failure is a 30-second timeout ending in context cleanup at tests/e2e/reviewer-and-jobs.spec.ts:102 on all retries; that test is identical to origin/main, whose latest run passes. This does not establish the timeout root cause. No platform files are in the batch PR file list, so no out-of-scope test or application edits were made. All 13 content gates pass. Recorded the integration handoff instead of duplicating an upstream platform fix.

## Outcome

- ✅ Impact: Verified the content batch is clean and identified an already merged upstream fix for the persistent selector failure. PR e2e remains red on its tested head.
- 🧪 Tests: All 13 content gates pass with exit code 0. No main baseline run needed because there are no local content findings. No local build, browser, server, or RLS run.
- 📁 Files: Only this PHR is added; scratch evidence stays under ignored .crew/.
- 🔁 Next prompts: PR integrator should bring PR #348 into the batch and obtain fresh CI; platform owner should investigate reviewer/jobs timeout if it recurs.
- 🧠 Reflection: A content repair cannot fix an unrelated platform selector. Check current main before repeating an already merged fix.

## Handoff (for CEO and agents)

- Shipped / changed: Committed CI diagnosis and clean content-gate result. Earlier figure repairs preserved.
- Decisions the team must respect: Respect batch file scope. No G3/G5 certification, publication-state changes, pushes or PR creation.
- Pending / next owner: PR integrator owns incorporation of main PR #348 and fresh CI. Platform/test owner owns any recurring reviewer/jobs timeout; its root cause remains unknown.
- Paperclip issues affected: PR #349; upstream fix PR #348.

## Evaluation notes (flywheel)

- Failure modes observed: Hidden summary rows selected before Units rows; separate reviewer/jobs timeout with cleanup error masking the underlying stall.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates. FAIL: existing PR e2e run. PASS: latest main CI run 40590223226.
- Prompt variant (if applicable): crew batch-20261027-2015-cifix2
- Next experiment (smallest change to try): Incorporate the existing PR #348 fix through the PR integration workflow, then inspect fresh e2e results.
