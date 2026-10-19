---
id: crew-geng-301-u02-review_en
title: crew review_en GENG-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0531-geng-301-u02-independent-g3-review.general.prompt.md
 - specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.json
 - specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.md
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-content.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-depth-gate.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-docs-sync.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-figures.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-no-answer-keys.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-no-em-dash.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/measure-figure-text.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/render-review.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/validate-content.log
 - specs/content/geng-301/reviews/unit-02/G3/manifest.json
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-301 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Generated static/content-status.json to resolve check:content failure and updated G3 review evidence log to pass all 13 content gates.

## Outcome

- Impact: review_en for GENG-301 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated static/content-status.json to resolve check:content failure and updated G3 review evidence log to pass all 13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GENG-301 Unit 2 G3 review recorded 5 blocking revise defects: wordmark text overflow in all 16 SVGs under static/img/figures/geng-301/unit-02/, subtopic U2-05 omitted from summative assessments, RRQ 5 mark scheme arithmetic contradiction, and incomplete unverifiable source declarations.
  - Advisory tracker entry is recorded in specs/content/geng-301/tasks.md leaving G3 unticked and unsigned.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
