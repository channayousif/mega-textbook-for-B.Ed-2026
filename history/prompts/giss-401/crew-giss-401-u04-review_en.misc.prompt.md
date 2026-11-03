---
id: crew-giss-401-u04-review_en
title: crew review_en GISS-401 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: giss-401
branch: crew/giss-401-u04-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/giss-401/crew-giss-401-u04-review_en.misc.prompt.md
 - specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json
 - specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.summary.md
 - specs/content/giss-401/reviews/unit-04/G3/crew-a5031c12/manifest.json
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/check-content.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/check-figures.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/fig-U4-1.png
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/fig-U4-2.png
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/fig-U4-3.png
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/fig-U4-4.png
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/measure-figure-text.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/render-review.txt
 - specs/content/giss-401/reviews/unit-04/G3/logs-a5031c12/validate-content.txt
 - specs/content/giss-401/reviews/unit-04/G3/summary.md
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u04-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u04-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GISS-401 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-04/`.

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

Completed independent G3 English review for GISS-401 Unit 4 with advisory pass disposition, recorded command logs and rasterized figure evidence, updated tasks.md advisory row, and committed all review artifacts.

## Outcome

- Impact: review_en for GISS-401 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed independent G3 English review for GISS-401 Unit 4 with advisory pass disposition, recorded command logs and rasterized figure evidence, updated tasks.md advisory row, and committed all review artifacts.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GISS-401 Unit 4 English draft passes independent G3 evaluation with advisory report at specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json.
  - G3 tracker row remains open ▢ per ADR-0019 pending trusted qualification and the specialized Islamic Studies reviewer sign-off noted in the course spec.
  - Unit 4 is ready for the subsequent Urdu translation job (G4 ur-translation) and mirrored figures.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
