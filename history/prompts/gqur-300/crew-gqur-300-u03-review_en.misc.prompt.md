---
id: crew-gqur-300-u03-review_en
title: crew review_en GQUR-300 unit 3
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-300/0900-crew-gqur-300-u03-review-en.misc.prompt.md
 - specs/content/gqur-300/reviews/unit-03/G3/agent-g3-gqur300-u3-run90e224ef.json
 - specs/content/gqur-300/reviews/unit-03/G3/agent-g3-gqur300-u3-run90e224ef.summary.md
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-depth-gate.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-docs-sync.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-figures.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-no-answer-keys.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-no-em-dash.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-1-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-2-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-3-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-4-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-5-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-6-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/independent-assessment-derivation.md
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/measure-figure-text.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/render-review.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/validate-content.log
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u03-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-300 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-03/`.

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

Delivered independent G3 English cycle 2 review for GQUR-300 Unit 3 with disposition pass and recorded advisory tracker row.

## Outcome

- Impact: review_en for GQUR-300 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Delivered independent G3 English cycle 2 review for GQUR-300 Unit 3 with disposition pass and recorded advisory tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 cycle 2 review passed; all 3 previous blocking findings (F1 grounding/gap, F2 mark scheme step alignment, F3 fare-desk arithmetic) verified resolved.
  - Unit 3 has completed Urdu translation at i18n/ur/.../gqur-300/unit-03/ and is ready for independent G5 review once G3 is certified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
