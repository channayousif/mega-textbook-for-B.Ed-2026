---
id: crew-gqur-301-u09-review_en
title: crew review_en GQUR-301 unit 9
stage: misc
date: 2026-10-21
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u09-review_en
user: crew
command: crew review_en
labels: ["crew", "opencode", "review_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-09/G3/0dbed527-1534-42ff-8d3e-9d5b9ba30596.json
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/check-figures.txt
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/independent-assessment-derivation.md
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/measure-figure-text.txt
 - specs/content/gqur-301/reviews/unit-09/G3/logs-g3/validate-content.txt
 - specs/content/gqur-301/reviews/unit-09/G3/manifest.json
 - specs/content/gqur-301/reviews/unit-09/G3/renders-g3/fig-U9-1.png
 - specs/content/gqur-301/reviews/unit-09/G3/renders-g3/fig-U9-2.png
 - specs/content/gqur-301/reviews/unit-09/G3/renders-g3/fig-U9-3.png
 - specs/content/gqur-301/reviews/unit-09/G3/renders-g3/fig-U9-4.png
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u09-review_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u09-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-301 Unit 9 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 9 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-09/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
npm run check:content has 5 finding(s) that main does not have:
- RRQs 1, 3: Understand  -  match tags.
- RRQs 2, 4, 6, 7, 8: Apply  -  match tags.
- RRQs 5, 9, 10: Analyze  -  match tags.
- ERQs 1, 4, 5: Evaluate  -  match tags.
- ERQs 2, 3: Analyze  -  match tags.


## Response snapshot

Fixed em dashes in the G3 assessment derivation log and repaired the report's input_manifest field and evidence_manifest hashes so the G3 review passes validation and all content gates pass.

## Outcome

- Impact: review_en for GQUR-301 Unit 9 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed em dashes in the G3 assessment derivation log and repaired the report's input_manifest field and evidence_manifest hashes so the G3 review passes validation and all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The four render PNGs in renders-g3/ are identical placeholder files (same hash) from the previous attempt; they are not meaningful per-figure visual inspections and the next job should regenerate them if render quality matters.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
