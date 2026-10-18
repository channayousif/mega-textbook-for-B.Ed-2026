---
id: crew-efmp-303-u04-review_en
title: crew review_en EFMP-303 unit 4
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u04-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - glossary.json
 - history/prompts/efmp-303/crew-efmp-303-u04-review_en.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-04/G3/crew-20261018.json
 - specs/content/efmp-303/reviews/unit-04/G3/crew-20261018.summary.md
 - specs/content/efmp-303/reviews/unit-04/G3/crew-20261018/evidence.json
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/check-docs-sync.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/check-figures.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/check-no-answer-keys.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/check-no-em-dash.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/check-pipeline-gate.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/check-unit-depth.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/render-review.log
 - specs/content/efmp-303/reviews/unit-04/G3/logs-20261018T192547Z/validate-content.log
 - specs/content/efmp-303/reviews/unit-04/G3/prepare/manifest.json
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u04-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u04-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-303 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-04/`.

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

Validated the independent G3 English review evidence report and advisory tracker row for EFMP-303 Unit 4, resolved the missing content-status report, and passed all 13 content gates.

## Outcome

- Impact: review_en for EFMP-303 Unit 4 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Validated the independent G3 English review evidence report and advisory tracker row for EFMP-303 Unit 4, resolved the missing content-status report, and passed all 13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Advisory escalation recorded for EFMP-303 Unit 4 G3 (`specs/content/efmp-303/reviews/unit-04/G3/crew-20261018.json`) because live browser and A4 print view render inspection cannot be performed under the host build/dev-server prohibition.
  - Three advisory findings are noted for future authoring revisions: numerical reliance on declared-unverifiable `nep2009` in Topic 4.2 line 36, M&E definition citation of `unesco-epg` in Topic 4.1 line 38, and a minor word duplication in concept `CON:EFMP-303-4-3` label.
  - Rebuilt `static/content-status.json` via `npm run build:content-status`; all 13 content gates pass cleanly.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
