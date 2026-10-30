---
id: crew-batch-20261028-1200-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-10-28
surface: agent
model: codex
feature: crew
branch: crew/batch-20261028-1200
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-02/index.mdx
 - docs/semester-2/gpks-402/unit-02/topic-01.mdx
 - docs/semester-2/gpks-402/unit-02/topic-02.mdx
 - docs/semester-2/gpks-402/unit-02/unit-assessment.mdx
 - docs/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx
 - history/prompts/gpks-402/20261038-fix-unit-two-figure-geometry.green.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u01-review_en.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u02-author-conflict1.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u02-author.green.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u02-author.misc.prompt.md
 - specs/content/gpks-402/concepts/unit-02.md
 - specs/content/gpks-402/coverage/unit-02.md
 - specs/content/gpks-402/figures/unit-02.md
 - specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json
 - specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.summary.md
 - specs/content/gpks-402/reviews/unit-01/G3/crew-b35aebba/manifest.json
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/check-content.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/check-figures.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/fig-U1-1.png
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/fig-U1-2.png
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/fig-U1-3.png
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/fig-U1-4.png
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/independent-assessment.md
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/measure-figure-text.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/render-review.txt
 - specs/content/gpks-402/reviews/unit-01/G3/logs-b35aebba/validate-content.txt
 - specs/content/gpks-402/reviews/unit-02/G2/20261028T094524432Z-gates.json
 - specs/content/gpks-402/reviews/unit-02/G2/20261028T121740498Z-gates.json
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/validate-content.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T121740498Z/validate-content.txt
 - specs/content/gpks-402/sources/unit-02.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-02/fig-U2-1.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-1.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-2.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-2.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-3.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-3.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261028-1200-cifix1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261028-1200`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #364 (checks: figure-geometry). Run `gh pr checks 364` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#364) changes, which belong to the crew jobs gpks-402-u02-author, gpks-402-u01-review_en. Change only what the merge or CI needs.

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

Repaired Unit 2 figure geometry and refreshed its gate evidence, with all required checks passing.

## Outcome

- Impact: fix for CREW Unit 0 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 58 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 2 figure geometry and refreshed its gate evidence, with all required checks passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
