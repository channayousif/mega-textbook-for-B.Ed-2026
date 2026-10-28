---
id: crew-gqur-301-u07-review_en-r1
title: crew review_en GQUR-301 unit 7
stage: misc
date: 2026-10-28
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u07-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261035-gqur-301-unit-07-final-g3.general.prompt.md
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028.json
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/build-content-status.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-content-final.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-content-refreshed.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-content.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-depth-gate.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-docs-sync.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-figures.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-no-answer-keys.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/check-no-em-dash.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/commands.json
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/figure-source-inspection.json
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/inspected-files.json
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/manifest.json
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/render-limitation.log
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/started-at.txt
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/summary.md
 - specs/content/gqur-301/reviews/unit-07/G3/crew-final-20261028/validate-content.log
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u07-review_en-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u07-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-301 Unit 7 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-07/`.

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

Recorded the final Unit 7 G3 advisory review, verified F1-F5 repairs, and committed evidence, tracker row and PHR.

## Outcome

- Impact: review_en for GQUR-301 Unit 7 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the final Unit 7 G3 advisory review, verified F1-F5 repairs, and committed evidence, tracker row and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner must resolve ERQ 4 projection assumptions, G1/provenance, rendered evidence and answer-blind verification; further cycles require recorded authorization.
  - Owner must resolve ERQ 4 projection assumptions, G1/provenance, rendered evidence and answer-blind verification; further cycles require recorded authorization.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
