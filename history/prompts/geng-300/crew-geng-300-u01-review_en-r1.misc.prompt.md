---
id: crew-geng-300-u01-review_en-r1
title: crew review_en GENG-300 unit 1
stage: misc
date: 2026-10-27
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u01-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/0898-geng-300-u01-review_en-r1.misc.prompt.md
 - specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run41b4c5ae.json
 - specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run41b4c5ae.summary.md
 - specs/content/geng-300/reviews/unit-01/G3/crew-41b4c5ae/manifest.json
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-figures.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/measure-figure-text.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/render-review.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/validate-content.txt
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-1.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-2.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-3.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-4.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-5.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-6.png
 - specs/content/geng-300/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u01-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-01/`.

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

Conducted independent G3 English review (Cycle 2) for GENG-300 Unit 1, produced validated pass evidence report and summary under specs/content/geng-300/reviews/unit-01/G3/, recorded advisory open tracker row in tasks.md, and refreshed content status with all 13 content gates passing.

## Outcome

- Impact: review_en for GENG-300 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Conducted independent G3 English review (Cycle 2) for GENG-300 Unit 1, produced validated pass evidence report and summary under specs/content/geng-300/reviews/unit-01/G3/, recorded advisory open tracker row in tasks.md, and refreshed content status with all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GENG-300 Unit 1 G3 review cycle 2 completed with disposition pass; all three prior blocking defects were confirmed resolved in commit 8a0b7828.
  - Advisory finding F1 notes minor 1.5px to 2.0px panel boundary clearance for 3 consonant labels in fig-U1-3, which remains inside the SVG canvas and does not affect readability.
  - Course is English-only (bilingual: false), so G4 Urdu translation and G5 Urdu review stages are waived; next pipeline step is G6 asset review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
