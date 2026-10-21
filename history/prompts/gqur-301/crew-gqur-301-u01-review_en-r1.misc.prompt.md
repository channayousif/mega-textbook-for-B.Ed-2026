---
id: crew-gqur-301-u01-review_en-r1
title: crew review_en GQUR-301 unit 1
stage: misc
date: 2026-10-21
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u01-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/0544-gqur-301-u01-review_en-r1.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-01/G3/72bd253b-1d1d-4ae1-b165-24f04c3d5ce7.json
 - specs/content/gqur-301/reviews/unit-01/G3/72bd253b-1d1d-4ae1-b165-24f04c3d5ce7.summary.md
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/check-figures.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/measure-figure-text.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/render-review.txt
 - specs/content/gqur-301/reviews/unit-01/G3/logs-72bd253b/validate-content.txt
 - specs/content/gqur-301/reviews/unit-01/G3/manifest.json
 - specs/content/gqur-301/reviews/unit-01/G3/renders-72bd253b/fig-U1-1.png
 - specs/content/gqur-301/reviews/unit-01/G3/renders-72bd253b/fig-U1-2.png
 - specs/content/gqur-301/reviews/unit-01/G3/renders-72bd253b/fig-U1-3.png
 - specs/content/gqur-301/reviews/unit-01/G3/renders-72bd253b/fig-U1-4.png
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u01-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u01-review_en-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-01/`.

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

Produced validated G3 English review evidence report and recorded advisory open tracker row for GQUR-301 Unit 1 with all content gates passing.

## Outcome

- Impact: review_en for GQUR-301 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced validated G3 English review evidence report and recorded advisory open tracker row for GQUR-301 Unit 1 with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 review is advisory and unsigned (status ▢, no initials) under ADR-0019; disposition is pass with advisory finding F1 (headless render limitation).
  - All four figure SVGs pass measure-figure-text cleanly with no wordmark or viewBox overflow.
  - Next lifecycle stage for Unit 1 is G4 Urdu translation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
