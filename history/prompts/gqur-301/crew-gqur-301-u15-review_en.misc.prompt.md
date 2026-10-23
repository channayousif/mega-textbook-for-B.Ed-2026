---
id: crew-gqur-301-u15-review_en
title: crew review_en GQUR-301 unit 15
stage: misc
date: 2026-10-23
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u15-review_en
user: crew
command: crew review_en
labels: ["crew", "claude", "review_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023.json
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023.md
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/assessment-solutions.md
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/check-content-before.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/check-depth-gate.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/check-docs-sync.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/check-figures.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/check-no-answer-keys.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/check-no-em-dash.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/manifest.json
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/numeric-verification.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/render-limitation.md
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/report-validation.log
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/source-inspection.md
 - specs/content/gqur-301/reviews/unit-15/G3/crew-20261023/validate-content.log
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u15-review_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-301 Unit 15 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

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

Added an advisory G3 escalation report for GQUR-301 Unit 15 (6 blocking findings: missing figures, figures that contradict the worked examples, two wrong answer keys, broken citations) with its evidence and an in-progress tracker row, committed without signing or ticking G3.

## Outcome

- Impact: review_en for GQUR-301 Unit 15 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added an advisory G3 escalation report for GQUR-301 Unit 15 (6 blocking findings: missing figures, figures that contradict the worked examples, two wrong answer keys, broken citations) with its evidence and an in-progress tracker row, committed without signing or ticking G3.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The author repair must add SVGs for fig-U15-2 to fig-U15-6, or turn them back into FIGURE markers, because `check:figures` passes even though the files are missing.
  - Fix fig-U15-3 to match the z = 1.84 right-tailed reject, fix the fig-U15-2 alt text (75 is inside the 75.31 cutoff), and rewrite the ERQ 2 and RRQ 10 keys.
  - Replace the 6 broken citation links with real pages (e.g. onlinestatbook.com/2/logic_of_hypothesis_testing/significance.html, /2/tests_of_means/single_mean.html, OpenStax 9.3), correct sources/unit-15.md, and store the source passages so the next review can check them offline.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
