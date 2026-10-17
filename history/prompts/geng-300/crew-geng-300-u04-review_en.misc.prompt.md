---
id: crew-geng-300-u04-review_en
title: crew review_en GENG-300 unit 4
stage: misc
date: 2026-10-17
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u04-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/0104-geng-300-u04-g3-review.content.prompt.md
 - specs/content/geng-300/reviews/unit-04/G3-prep/manifest.json
 - specs/content/geng-300/reviews/unit-04/G3/20261017-opencode-g3-u04.json
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/check-content.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/measure-figure-text.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/render-review.txt
 - specs/content/geng-300/reviews/unit-04/G3/logs-20261017T000000000Z/validate-content.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u04-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u04-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-04/`.

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

Generated static/content-status.json to resolve check:content-status and verified the independent G3 review evidence report and advisory tracker row for GENG-300 Unit 4.

## Outcome

- Impact: review_en for GENG-300 Unit 4 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 12 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated static/content-status.json to resolve check:content-status and verified the independent G3 review evidence report and advisory tracker row for GENG-300 Unit 4.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
