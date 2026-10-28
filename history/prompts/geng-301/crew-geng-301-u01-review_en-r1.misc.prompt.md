---
id: crew-geng-301-u01-review_en-r1
title: crew review_en GENG-301 unit 1
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: geng-301
branch: crew/geng-301-u01-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-geng301-unit-one-final-g3-review.general.prompt.md
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2.json
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-content-final.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-content.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-depth-gate.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-docs-sync.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-figures.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-no-answer-keys.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/check-no-em-dash.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/commands.json
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/identity.json
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/input-verification.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/limitations.log
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/manifest.json
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/summary.md
 - specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2/validate-content.log
 - specs/content/geng-301/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u01-review_en-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u01-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-01/`.

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

Recorded the final-cycle G3 escalation, prior-finding rechecks, evidence logs, advisory tracker row and PHR.

## Outcome

- Impact: review_en for GENG-301 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the final-cycle G3 escalation, prior-finding rechecks, evidence logs, advisory tracker row and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner action is required for remaining content defects and missing render/provenance evidence before another review cycle.
  - Owner action is required for remaining content defects and missing render/provenance evidence before another review cycle.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
