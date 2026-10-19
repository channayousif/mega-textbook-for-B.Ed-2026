---
id: crew-geng-301-u01-review_en
title: crew review_en GENG-301 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: geng-301
branch: crew/geng-301-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/531-geng301-u01-g3-review.general.prompt.md
 - history/prompts/general/532-geng301-review-continuation.general.prompt.md
 - specs/content/geng-301/reviews/unit-01/G3/20261019T000000000Z-g3.json
 - specs/content/geng-301/reviews/unit-01/G3/continuation-summary.md
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/measure-figure-text.txt
 - specs/content/geng-301/reviews/unit-01/G3/logs-20261019T000000000Z/validate-content.txt
 - specs/content/geng-301/reviews/unit-01/G3/manifest.json
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u01-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u01-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-01/`.

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

Preserved the existing review, added the advisory tracker note and evidence limitations, and resolved the missing content-status artifact.

## Outcome

- Impact: review_en for GENG-301 Unit 1 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved the existing review, added the advisory tracker note and evidence limitations, and resolved the missing content-status artifact.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - RRQ 5 needs correction from “sentence 3” to “sentence 1”; rendered accessibility review remains pending.
  - RRQ 5 needs correction from “sentence 3” to “sentence 1”; rendered accessibility review remains pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
