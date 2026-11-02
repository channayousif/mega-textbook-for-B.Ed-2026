---
id: crew-efmp-406-u05-review_en
title: crew review_en EFMP-406 unit 5
stage: misc
date: 2026-11-02
surface: agent
model: agy
feature: efmp-406
branch: crew/efmp-406-u05-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/crew-efmp-406-u05-review_en.misc.prompt.md
 - specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json
 - specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.summary.md
 - specs/content/efmp-406/reviews/unit-05/G3/crew-4df544c3/manifest.json
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/check-content.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/check-figures.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/fig-U5-1.png
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/fig-U5-2.png
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/fig-U5-3.png
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/fig-U5-4.png
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/measure-figure-text.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/render-review.txt
 - specs/content/efmp-406/reviews/unit-05/G3/logs-4df544c3/validate-content.txt
 - specs/content/efmp-406/reviews/unit-05/G3/summary.md
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u05-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-406 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-05/`.

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

Completed independent G3 English review of EFMP-406 Unit 5 with an advisory pass evidence report and execution logs, updated tasks.md, and committed all review artifacts with session PHR.

## Outcome

- Impact: review_en for EFMP-406 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed independent G3 English review of EFMP-406 Unit 5 with an advisory pass evidence report and execution logs, updated tasks.md, and committed all review artifacts with session PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All 7 G3 criteria pass, 25 assessment items independently solved, and all 8 SVG variants pass geometry; report validated with advisory pass disposition.
  - The G3 tracker row in specs/content/efmp-406/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
  - Unit 5 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
