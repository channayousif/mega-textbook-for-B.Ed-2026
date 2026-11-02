---
id: crew-efmp-406-u03-review_en
title: crew review_en EFMP-406 unit 3
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/0001-unit-three-advisory-g3-review.misc.prompt.md
 - specs/content/efmp-406/reviews/unit-03/G3/01a19c22-e969-7f80-81b7-f2e304f416df.json
 - specs/content/efmp-406/reviews/unit-03/G3/01a19c22-e969-7f80-81b7-f2e304f416df.summary.md
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/assessment-review.md
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/build-content-status.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-content-after-status.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-content-final.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-content.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/commands.json
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/manifest.json
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/provenance.md
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/render-limitations.md
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/source-retrieval.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/source-support.md
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/started-at.txt
 - specs/content/efmp-406/reviews/unit-03/G3/crew-01a19c22/validate-content.txt
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-406 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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

Added the Unit 3 advisory G3 report, evidence logs, assessment findings, tracker note and PHR.

## Outcome

- Impact: review_en for EFMP-406 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the Unit 3 advisory G3 report, evidence logs, assessment findings, tracker note and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
  - Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
