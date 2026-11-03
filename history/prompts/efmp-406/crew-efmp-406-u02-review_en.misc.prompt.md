---
id: crew-efmp-406-u02-review_en
title: crew review_en EFMP-406 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261108-efmp406-unit-two-g3-advisory.general.prompt.md
 - specs/content/efmp-406/reviews/unit-02/G3/crew-efmp-406-u02-review-en.json
 - specs/content/efmp-406/reviews/unit-02/G3/crew-efmp-406-u02-review-en.summary.md
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/assessment-independent.md
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-content-before-cache-refresh.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-content-final.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-content.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-figures.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/findings.md
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/input-verification.txt
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/manifest.json
 - specs/content/efmp-406/reviews/unit-02/G3/crew-review/validate-content.txt
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-406 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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

Recorded the independent G3 advisory escalation, assessment findings, hashed evidence, tracker row and PHR for EFMP-406 Unit 2.

## Outcome

- Impact: review_en for EFMP-406 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the independent G3 advisory escalation, assessment findings, hashed evidence, tracker row and PHR for EFMP-406 Unit 2.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.
  - G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
