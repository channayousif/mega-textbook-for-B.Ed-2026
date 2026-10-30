---
id: crew-gpks-402-u03-review_en
title: crew review_en GPKS-402 unit 3
stage: misc
date: 2026-10-31
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gpks-402/crew-gpks-402-u03-review_en.misc.prompt.md
  - specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json
  - specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.summary.md
  - specs/content/gpks-402/reviews/unit-03/G3/crew-608a5388/manifest.json
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/check-content.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/check-depth-gate.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/check-docs-sync.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/check-figures.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/check-no-answer-keys.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/check-no-em-dash.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/fig-U3-1.png
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/fig-U3-2.png
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/fig-U3-3.png
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/fig-U3-4.png
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/measure-figure-text.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/render-review.txt
  - specs/content/gpks-402/reviews/unit-03/G3/logs-608a5388/validate-content.txt
  - specs/content/gpks-402/reviews/unit-03/G3/summary.md
  - specs/content/gpks-402/tasks.md
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Brief contents (.crew/brief.md)

# Crew job gpks-402-u03-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GPKS-402 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-03/`.

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

Executed independent G3 English review of GPKS-402 Unit 3 with advisory pass disposition, recorded validated report and evidence logs, and updated tasks.md.

## Outcome

- Impact: review_en for GPKS-402 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Executed independent G3 English review of GPKS-402 Unit 3 with advisory pass disposition, recorded validated report and evidence logs, and updated tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All seven G3 criteria pass with verified evidence; 25 assessment items independently solved; all 8 SVG variants pass measure-figure-text.
  - G3 tracker row in specs/content/gpks-402/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
  - Unit 3 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
