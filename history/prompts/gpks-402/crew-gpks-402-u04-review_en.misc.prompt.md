---
id: crew-gpks-402-u04-review_en
title: crew review_en GPKS-402 unit 4
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u04-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gpks-402/crew-gpks-402-u04-review_en.misc.prompt.md
 - specs/content/gpks-402/reviews/unit-04/G3/8e3bf462-d4af-437f-aa63-372eb41b9e7c.json
 - specs/content/gpks-402/reviews/unit-04/G3/8e3bf462-d4af-437f-aa63-372eb41b9e7c.summary.md
 - specs/content/gpks-402/reviews/unit-04/G3/crew-8e3bf462/manifest.json
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/check-content.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/check-figures.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/measure-figure-text.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/render-review.txt
 - specs/content/gpks-402/reviews/unit-04/G3/logs-8e3bf462/validate-content.txt
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-1.png
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-2.png
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-3.png
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-4.png
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-5.png
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-6.png
 - specs/content/gpks-402/reviews/unit-04/G3/renders-8e3bf462/fig-U4-7.png
 - specs/content/gpks-402/reviews/unit-04/G3/summary.md
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u04-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u04-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GPKS-402 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-04/`.

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

Executed independent G3 English review of GPKS-402 Unit 4 with advisory pass disposition, recorded validated review report and evidence logs, and updated advisory open tracker row in tasks.md.

## Outcome

- Impact: review_en for GPKS-402 Unit 4 by agy.
- Tests: node scripts/review-evidence.mjs validate passed; measure-figure-text.mjs passed for all 14 SVG variants; individual content gates passed.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Executed independent G3 English review of GPKS-402 Unit 4 with advisory pass disposition, recorded validated review report and evidence logs, and updated advisory open tracker row in tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All seven G3 evaluation criteria pass with concrete evidence locators; 25 assessment items independently solved; all 14 SVG variants pass measure-figure-text.mjs.
  - Advisory G3 tracker row recorded in specs/content/gpks-402/tasks.md with status open ▢ and unsigned per ADR-0019; G3 remains open for trusted sign-off.
  - Next lifecycle stages for Unit 4 are Urdu translation (G4 ur-translation) and independent Urdu review (G5 ur-review).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)
