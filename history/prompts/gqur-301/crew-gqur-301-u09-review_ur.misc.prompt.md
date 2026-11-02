---
id: crew-gqur-301-u09-review_ur
title: crew review_ur GQUR-301 unit 9
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u09-review_ur
user: crew
command: crew review_ur
labels: ["crew", "codex", "review_ur"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261108-gqur301-unit-nine-g5-review.general.prompt.md
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102.json
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/advisory-tracker-row.md
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/check-depth-gate.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/check-docs-sync.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/check-figures.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/check-no-answer-keys.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/check-no-em-dash.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/commands.json
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/content-after.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/content-before.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/content-final.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/input-audit.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/manifest.json
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/report-validation.log
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/summary.md
 - specs/content/gqur-301/reviews/unit-09/G5/crew-20261102/validate-content.log
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u09-review_ur

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u09-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of GQUR-301 Unit 9 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 9 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-09/`.

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

Recorded the independent Unit 9 Urdu review and validated advisory evidence without certification.

## Outcome

- Impact: review_ur for GQUR-301 Unit 9 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the independent Unit 9 Urdu review and validated advisory evidence without certification.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Tracker row awaits authorized integration with generated content-status metadata.
  - G5 remains open; translation repairs, four Urdu figures and rendered inspection are pending.
  - Tracker row awaits authorized integration with generated content-status metadata.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
