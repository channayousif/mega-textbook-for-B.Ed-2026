---
id: crew-gqur-301-u03-review_en-r1
title: crew review_en GQUR-301 unit 3
stage: misc
date: 2026-10-21
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u03-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/crew-gqur-301-u03-review_en-r1.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-03/G3/0537b555-5784-429b-aaaa-e51e0af1897b.json
 - specs/content/gqur-301/reviews/unit-03/G3/0537b555-5784-429b-aaaa-e51e0af1897b.summary.md
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/check-figures.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/measure-figure-text.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/render-review.txt
 - specs/content/gqur-301/reviews/unit-03/G3/logs-0537b555/validate-content.txt
 - specs/content/gqur-301/reviews/unit-03/G3/renders-0537b555/fig-U3-1.png
 - specs/content/gqur-301/reviews/unit-03/G3/renders-0537b555/fig-U3-2.png
 - specs/content/gqur-301/reviews/unit-03/G3/renders-0537b555/fig-U3-3.png
 - specs/content/gqur-301/reviews/unit-03/G3/renders-0537b555/fig-U3-4.png
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u03-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u03-review_en-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-301 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-03/`.

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

Produced validated G3 English review evidence report and recorded advisory open tracker row for GQUR-301 Unit 3 with all content gates passing.

## Outcome

- Impact: review_en for GQUR-301 Unit 3 by agy (attempt 2 / r1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced validated G3 English review evidence report and recorded advisory open tracker row for GQUR-301 Unit 3 with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 review is advisory and unsigned (status ▢, no initials) under ADR-0019; disposition is pass with advisory finding F1 (headless render limitation).
  - All four figure SVGs pass measure-figure-text cleanly with no viewBox overflow (two cosmetic wordmark collisions reported but not failed).
  - Next lifecycle stage for Unit 3 is G4 Urdu translation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
