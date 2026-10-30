---
id: 20261041
title: Record PR366 e2e scope blocker
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 Codex
feature: gpks-402
branch: crew/batch-20261028-1415
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "ci-investigation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/366
files:
  - history/prompts/general/20261041-record-pr366-e2e-scope-blocker.general.prompt.md
tests:
  - "npm run check:content: PASS, all 13 gates"
  - "git diff origin/main -- tests/e2e src supabase: empty"
  - "git diff --check: PASS"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief, verbatim:

# Crew job batch-20261028-1415-cifix2

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261028-1415`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #366 (checks: e2e). Run `gh pr checks 366` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#366) changes, which belong to the crew jobs gpks-402-u04-author, gpks-402-u01-translate, gpks-402-u05-translate. Change only what the merge or CI needs.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (batch-20261028-1415-cifix1, fix, codex) Platform owner should investigate the unrelated teacher-dashboard e2e timeout.
- (batch-20261028-1415-cifix1, fix, codex) Fresh CI must verify SVG geometry; local Playwright was prohibited by the brief.
- (batch-20261028-1415-cifix1, fix, codex) Platform owner should investigate the unrelated teacher-dashboard e2e timeout.
- (batch-20261027-2015-cifix2, fix, codex) Platform owner should investigate the reviewer/jobs timeout if it recurs.
- (batch-20261027-2015-cifix2, fix, codex) PR #349 still needs the G3 selector fix already merged in main via PR #348, then fresh CI.


## Response snapshot

Inspected PR #366 checks and failed logs for CI run 40714135958 at a86943d042ad482e5d97271d39d698add7ac3bc8. Build, figure geometry and RLS passed. All 13 local content gates passed. No content repair is indicated; the blocking admin dashboard timeout is outside the authorized files. Recorded the platform-owner handoff without changing tests or weakening checks.

## Outcome

- ✅ Impact: Confirmed the previous figure repair passed CI and isolated the remaining failure to a platform e2e test. The requested e2e repair remains blocked by the content-only scope.
- 🧪 Tests: All 13 content gates pass with zero findings. CI e2e remains failed. No build, server or Playwright was run locally.
- 📁 Files: This PHR only; no content, gate, tracker or publication changes.
- 🔁 Next prompts: Platform/test owner to investigate admin dashboard timeout and rerun CI.
- 🧠 Reflection: A failing platform check does not justify modifying unrelated content or expanding the assigned scope.

## Handoff (for CEO and agents)

- Shipped / changed: Committed investigation evidence and handoff; preserved earlier fixes.
- Decisions the team must respect: Keep the assigned PR content scope and all review/publication states unchanged. No push or new PR.
- Pending / next owner: Platform/test owner: tests/e2e/admin-and-dashboard-a11y.spec.ts:20 timed out at 30000ms on the initial attempt and both retries. Logs do not identify a precise stalled step. Reviewer/jobs timed out initially, self-assessment persistence failed at line 81 initially, and moderation filtering failed at line 80 initially; all three passed on retry. These tests and src/supabase have no diff against origin/main. CI owner should rerun after the platform failure is investigated.
- Paperclip issues affected: PR #366; no issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: One persistent admin dashboard timeout and three flaky platform tests; 70 tests passed directly. Build and figure geometry passed.
- Graders run and results (PASS/FAIL): PASS: all 13 content gates, unchanged platform diff, whitespace check. FAIL in CI: e2e admin dashboard timeout.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Investigate the existing CI trace for the admin dashboard test in a platform-scoped job; do not increase timeouts without evidence.
