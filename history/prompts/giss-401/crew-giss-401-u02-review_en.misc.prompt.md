---
id: crew-giss-401-u02-review_en
title: crew review_en GISS-401 unit 2
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261132-giss-401-unit-02-advisory-g3.general.prompt.md
 - specs/content/giss-401/reviews/unit-02/G3/01a1b085-18a8-79d2-8bc8-93c034c663a8.json
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/check-content.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/check-depth-gate.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/check-docs-sync.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/check-figures.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/check-no-answer-keys.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/check-no-em-dash.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/commands.json
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/completion-blocker.md
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/final-check-content.log
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/manifest.json
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/review.md
 - specs/content/giss-401/reviews/unit-02/G3/codex-20261106/validate-content.log
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u02-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GISS-401 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

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

Recorded GISS-401 Unit 2’s advisory G3 escalation and evidence, with the generated status-digest refresh awaiting scope approval.

## Outcome

- Impact: review_en for GISS-401 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded GISS-401 Unit 2’s advisory G3 escalation and evidence, with the generated status-digest refresh awaiting scope approval.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
  - Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
