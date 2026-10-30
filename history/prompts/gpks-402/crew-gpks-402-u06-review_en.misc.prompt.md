---
id: crew-gpks-402-u06-review_en
title: crew review_en GPKS-402 unit 6
stage: misc
date: 2026-10-30
surface: agent
model: codex
feature: gpks-402
branch: crew/gpks-402-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261046-gpks402-unit06-advisory-g3.general.prompt.md
 - specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
 - specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.summary.md
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/assessment-review.md
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/check-content.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/check-figures.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/input-verification.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/manifest.json
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/render-limitation.txt
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/source-inspection.md
 - specs/content/gpks-402/reviews/unit-06/G3/crew-01a18ccb/validate-content.txt
 - specs/content/gpks-402/reviews/unit-06/G3/final-check-content-pass.txt
 - specs/content/gpks-402/reviews/unit-06/G3/final-check-content-stale-metadata.txt
 - specs/content/gpks-402/reviews/unit-06/G3/report-validation.txt
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GPKS-402 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Added Unit 6 independent G3 review evidence, an advisory tracker row, and the required PHR.

## Outcome

- Impact: review_en for GPKS-402 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added Unit 6 independent G3 review evidence, an advisory tracker row, and the required PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. G3/G5 remain open.
  - Author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. G3/G5 remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
