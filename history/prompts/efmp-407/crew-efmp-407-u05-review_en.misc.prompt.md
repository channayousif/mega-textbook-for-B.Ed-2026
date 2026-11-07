---
id: crew-efmp-407-u05-review_en
title: crew review_en EFMP-407 unit 5
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u05-review_en
user: crew
command: crew review_en
labels: ["crew", "opencode", "review_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u05-review_en.misc.prompt.md
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/assessment-independent.md
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-content.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-figures.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-source-floor.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/check-svg-style.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/input-verification.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/measure-figure-text.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/rasterize.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/logs/validate-content.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/manifest.json
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/render-review.txt
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-1.dark.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-1.light.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-2.dark.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-2.light.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-3.dark.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-3.light.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-4.dark.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-4.light.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-5.dark.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-5.light.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-6.dark.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/renders/fig-U5-6.light.png
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/source-verification.md
 - specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/summary.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-review_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-407 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-05/`.

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

Added the EFMP-407 Unit 5 independent G3 English advisory revise evidence (defective IUCN citation, formative-band tension, figure rasters, hashed gate logs), an open tracker row and the PHR, committed on the branch.

## Outcome

- Impact: review_en for EFMP-407 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-407 Unit 5 independent G3 English advisory revise evidence (defective IUCN citation, formative-band tension, figure rasters, hashed gate logs), an open tracker row and the PHR, committed on the branch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F1 blocking - repair the IUCN Pakistan 2004 citation (URL `.../2004-099.pdf` is a Tanzania report) or declare it under `## Unverifiable sources` with attempts, date and D-2026-0001.
  - F2 uncertain - topic-02/topic-03 `## Check your understanding` item 3 are tagged Analyze above the formative band; reword or obtain an owner ruling before the next review cycle.
  - F7 - the live site returns 404 for every unit-05 route and the brief bars build/dev-server/Playwright, so a fresh review still needs a real narrow-view and A4 print inspection when a render path is available.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
