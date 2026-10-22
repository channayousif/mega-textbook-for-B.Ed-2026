---
id: crew-gsos-301-u04-review_en
title: crew review_en GSOS-301 unit 4
stage: misc
date: 2026-10-22
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u04-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/014-agent-review-governance/0007-review-gsos-unit-four-english.misc.prompt.md
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex.json
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/check-content.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/check-depth-gate.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/check-docs-sync.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/check-figures.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/check-no-answer-keys.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/check-no-em-dash.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/commands.json
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/final-check-content.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/main-check-content.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/manifest-verification.log
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/manifest.json
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/review.md
 - specs/content/gsos-301/reviews/unit-04/G3/20261022-codex/validate-content.log
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u04-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u04-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-04/`.

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

Added the independent Unit 4 G3 escalation report, hashed evidence, advisory tracker row and PHR without certifying G3.

## Outcome

- Impact: review_en for GSOS-301 Unit 4 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the independent Unit 4 G3 escalation report, hashed evidence, advisory tracker row and PHR without certifying G3.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Separate author must repair assessment guidance, rubric tables, RRQ demand and coverage mappings; fresh review needs provenance and browser/print evidence.
  - Separate author must repair assessment guidance, rubric tables, RRQ demand and coverage mappings; fresh review needs provenance and browser/print evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
