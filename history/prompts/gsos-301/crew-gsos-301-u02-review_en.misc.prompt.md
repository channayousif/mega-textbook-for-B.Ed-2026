---
id: crew-gsos-301-u02-review_en
title: crew review_en GSOS-301 unit 2
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0337-gsos-unit-two-english-review.general.prompt.md
 - specs/content/gsos-301/reviews/unit-02/G3/01a150d2-88d4-7793-864c-89e5aeafc08d.json
 - specs/content/gsos-301/reviews/unit-02/G3/01a150d2-88d4-7793-864c-89e5aeafc08d.md
 - specs/content/gsos-301/reviews/unit-02/G3/logs/baseline.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-content-final.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-content-initial.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-figures.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/render-limitation.txt
 - specs/content/gsos-301/reviews/unit-02/G3/logs/validate-content.txt
 - specs/content/gsos-301/reviews/unit-02/G3/manifest.json
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u02-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-02/`.

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

Built static/content-status.json to clear the gate finding, confirming all 13 content gates pass with the committed advisory G3 review evidence.

## Outcome

- Impact: review_en for GSOS-301 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Built static/content-status.json to clear the gate finding, confirming all 13 content gates pass with the committed advisory G3 review evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Reconcile topic-01 and topic-02 citations (Givens & White, Henson, Lindsey) against approved sources (Conerly et al. 2021, Lindsey & Beach 2001).
  - Reconcile Mead socialization stages and ages across topic-02, fig-U2-4, and assessment items against OpenStax 5.1.
  - Recalculate Bloom cognitive demand on MCQ-07, MCQ-08, RRQ-06, and refine ERQ-02/03/04 rubrics and coverage mappings.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
