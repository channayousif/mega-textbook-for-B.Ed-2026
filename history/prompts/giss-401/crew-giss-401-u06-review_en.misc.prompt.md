---
id: crew-giss-401-u06-review_en
title: crew review_en GISS-401 unit 6
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: giss-401
branch: crew/giss-401-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/giss-401/crew-giss-401-u06-review_en.misc.prompt.md
 - specs/content/giss-401/reviews/unit-06/G3/ad110b4d-3d0d-4777-98c5-9930d6961900.json
 - specs/content/giss-401/reviews/unit-06/G3/ad110b4d-3d0d-4777-98c5-9930d6961900.summary.md
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/check-content.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/check-figures.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/fig-U6-1.png
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/fig-U6-2.png
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/fig-U6-3.png
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/fig-U6-4.png
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/fig-U6-5.png
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/fig-U6-6.png
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/render-review.txt
 - specs/content/giss-401/reviews/unit-06/G3/logs-ad110b4d/validate-content.txt
 - specs/content/giss-401/reviews/unit-06/G3/prep-ad110b4d/manifest.json
 - specs/content/giss-401/reviews/unit-06/G3/summary.md
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u06-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GISS-401 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-06/`.

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

Conducted independent G3 English review of GISS-401 Unit 6 with advisory pass disposition, recorded command logs and rasterized figure evidence, updated tasks.md advisory row, and committed all artifacts.

## Outcome

- Impact: review_en for GISS-401 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Conducted independent G3 English review of GISS-401 Unit 6 with advisory pass disposition, recorded command logs and rasterized figure evidence, updated tasks.md advisory row, and committed all artifacts.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GISS-401 Unit 6 English draft passed independent G3 advisory review with pass disposition; G3 tracker row remains open ▢ without certification.
  - All six unit SVG figures rasterized to PNG with verified mean luminance; geometry measurement via measure-figure-text.mjs was skipped per crew brief constraint against launching Playwright/Chromium and is deferred to CI figure-geometry check.
  - Unit 6 is ready for Urdu translation (G4 ur-translation) and Urdu figure mirror asset generation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
