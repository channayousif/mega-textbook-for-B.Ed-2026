---
id: crew-efmp-304-u02-review_en-cifix2
title: crew fix EFMP-304 unit 2
stage: misc
date: 2026-10-17
surface: agent
model: opencode
feature: efmp-304
branch: crew/efmp-304-u02-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/0124-unit-two-independent-g3-review.misc.prompt.md
 - history/prompts/efmp-304/0125-complete-g3-review-continuation.misc.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u02-review_en.misc.prompt.md
 - history/prompts/general/0334-fix-content-status-json-missing.general.prompt.md
 - specs/content/efmp-304/reviews/unit-02/G3/01a14a38-39b5-7ca3-b776-327860ede213.json
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/assessment-independent.md
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/baseline-comparison.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-content-final.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-content-resume.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-content.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-depth-gate.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-docs-sync.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-figures.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-no-answer-keys.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/check-no-em-dash.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/commands.json
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/fig-U2-2-native.png
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/fig-U2-4-native.png
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/figure-geometry.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/input-verification.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/manifest.json
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/render-figures.log
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/render-figures.mjs
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/resume-verification.md
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/summary.md
 - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/validate-content.log
 - specs/content/efmp-304/reviews/unit-02/G3/validation-01a14a38.log
 - specs/content/efmp-304/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u02-review_en-cifix2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u02-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #169 (checks: build). Run `gh pr checks 169` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
EFMP-304 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Regenerated the gitignored static/content-status.json so check:content passes (13/13 gates green), and committed the PHR recording the fix.

## Outcome

- Impact: fix for EFMP-304 Unit 2 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Regenerated the gitignored static/content-status.json so check:content passes (13/13 gates green), and committed the PHR recording the fix.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
