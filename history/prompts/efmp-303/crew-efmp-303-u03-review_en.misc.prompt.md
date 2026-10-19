---
id: crew-efmp-303-u03-review_en
title: crew review_en EFMP-303 unit 3
stage: misc
date: 2026-10-18
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/014-agent-review-governance/0002-efmp303-unit3-advisory-g3-review.misc.prompt.md
 - history/prompts/014-agent-review-governance/0003-complete-efmp303-review-continuation.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb.json
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/baseline-comparison.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-content-final.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-content.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-depth-gate.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-docs-sync.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-figures.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-no-answer-keys.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/check-no-em-dash.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/commands.json
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/figure-3-narrow.png
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/figure-3-print-media.png
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/figure-geometry.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/figure-render.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/figures-contact-sheet.png
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/manifest.json
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/report-validation.log
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/source-retrieval.json
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/summary.md
 - specs/content/efmp-303/reviews/unit-03/G3/01a14b3d-bdfb-7200-a7e0-06c201e5f0bb/validate-content.log
 - specs/content/efmp-303/reviews/unit-03/G3/continuation-20261018/check-content.log
 - specs/content/efmp-303/reviews/unit-03/G3/continuation-20261018/main-check-content.log
 - specs/content/efmp-303/reviews/unit-03/G3/continuation-20261018/report-validation.log
 - specs/content/efmp-303/reviews/unit-03/G3/continuation-20261018/summary.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u03-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u03-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-303 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Preserved the advisory review, synchronized upstream fixes, generated content status, and committed passing verification evidence and the PHR.

## Outcome

- Impact: review_en for EFMP-303 Unit 3 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved the advisory review, synchronized upstream fixes, generated content status, and committed passing verification evidence and the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open; recorded content repairs and fresh independent assessment/render checks are pending.
  - G3 remains open; recorded content repairs and fresh independent assessment/render checks are pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
