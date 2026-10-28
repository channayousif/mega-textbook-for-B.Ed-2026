---
id: 20261040
title: Fix GPKS402 Urdu figure spacing
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 Codex
feature: gpks-402
branch: crew/batch-20261028-1415
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "ci-fix"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/366
files:
  - static/img/figures/gpks-402/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-2.ur.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/gpks-402/unit-01/fig-U1-3.ur.svg
  - history/prompts/general/20261040-fix-gpks402-urdu-figure-spacing.general.prompt.md
tests:
  - "npm run check:content: all 13 gates pass before and after repair"
  - "XML parsing, light/dark geometry parity and timeline anchor assertions: PASS"
  - "git diff --check: PASS"
  - "Browser geometry check: deferred under brief prohibition on Playwright; clarification requested"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief, verbatim:

# Crew job batch-20261028-1415-cifix1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261028-1415`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #366 (checks: figure-geometry, e2e). Run `gh pr checks 366` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

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
- (batch-20261027-2015-cifix2, fix, codex) Platform owner should investigate the reviewer/jobs timeout if it recurs.
- (batch-20261027-2015-cifix2, fix, codex) PR #349 still needs the G3 selector fix already merged in main via PR #348, then fresh CI.
- (batch-20261027-2015-cifix2, fix, codex) Platform owner should investigate the reviewer/jobs timeout if it recurs.
- (batch-20261027-2015-cifix1, fix, codex) Platform/test owner should fix the G3 desk hidden-row selector and investigate the flaky moderation filter test.
- (batch-20261027-2015-cifix1, fix, codex) Platform/test owner should fix the G3 desk hidden-row selector and investigate the flaky moderation filter test.


## Response snapshot

Read PR #366 checks and failed logs for run 40704247860. Wrapped the Urdu table header and centered the timeline panel labels, wrapping the 1930 entry more narrowly in both themes. All 13 content gates pass. The blocking teacher-dashboard e2e timeout concerns unchanged platform code outside the authorized content scope.

## Outcome

- ✅ Impact: Repaired the label layout responsible for four CI geometry findings across two Urdu figure pairs.
- 🧪 Tests: All 13 content gates pass; XML, theme parity, anchors and whitespace checks pass. Browser geometry remains for CI unless the requested exception is authorized.
- 📁 Files: Four Unit 1 Urdu SVGs plus this PHR. No gate, content-spec, review status or publication changes.
- 🔁 Next prompts: Platform owner should investigate the teacher-dashboard timeout; next CI should measure the repaired SVGs.
- 🧠 Reflection: Mirrored timelines retained end anchors on centered panel labels; using the panel center avoids displacement into a neighboring holder.

## Handoff (for CEO and agents)

- Shipped / changed: Table header wrapping and centered, narrower timeline label layout in light and dark Urdu SVGs.
- Decisions the team must respect: Scope remains the PR content files. G3/G5 and publication state are unchanged. No build, server, Playwright run, push or PR creation.
- Pending / next owner: Platform/test owner: tests/e2e/teacher-dashboard-performance.spec.ts:29 exceeded 120000ms on all three attempts in CI run 40704247860. Auth signup, dashboard performance and suggestion moderation were flaky. CI owner: rerun geometry on repaired SVGs; local browser check prohibited by brief, exception requested.
- Paperclip issues affected: PR #366; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Header overlap of 3.9px and timeline text assigned to an adjacent panel, spilling 84.1px, each in both themes; unrelated teacher-dashboard e2e timeout.
- Graders run and results (PASS/FAIL): PASS: 13 content gates, XML/anchor/theme parity checks, git diff --check. PENDING: browser geometry and fresh CI e2e.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run changed-figure geometry in CI, then investigate the independent platform timeout.
