---
id: crew-efmp-305-u04-review_en
title: crew review_en EFMP-305 unit 4
stage: misc
date: 2026-10-17
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u04-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/0174-crew-efmp-305-u04-review-en.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-04/G3/agent-g3-efmp-305-u4-run750d5970.json
 - specs/content/efmp-305/reviews/unit-04/G3/agent-g3-efmp-305-u4-run750d5970.summary.md
 - specs/content/efmp-305/reviews/unit-04/G3/manifest.json
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-depth-gate.log
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-docs-sync.log
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-figures.log
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-no-answer-keys.log
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-no-em-dash.log
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/render-review.log
 - specs/content/efmp-305/reviews/unit-04/logs-750d5970/validate-content.log
 - specs/content/efmp-305/reviews/unit-04/renders-750d5970/fig-U4-1.webp
 - specs/content/efmp-305/reviews/unit-04/renders-750d5970/render-inspect.json
 - specs/content/efmp-305/reviews/unit-04/renders-750d5970/render-inspect.log
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u04-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u04-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-305 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Conducted independent G3 English review of EFMP-305 Unit 4, returning a validated passing evidence bundle, command logs, visual render, and summary report under specs/content/efmp-305/reviews/unit-04/.

## Outcome

- Impact: review_en for EFMP-305 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Conducted independent G3 English review of EFMP-305 Unit 4, returning a validated passing evidence bundle, command logs, visual render, and summary report under specs/content/efmp-305/reviews/unit-04/.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
