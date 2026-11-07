---
id: crew-efmp-407-u06-review_en
title: crew review_en EFMP-407 unit 6
stage: misc
date: 2026-11-07
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-407/crew-efmp-407-u06-review_en.misc.prompt.md
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a.json
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/commands.json
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-content-after-tracker.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-content.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-depth-gate.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-docs-sync.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-figures.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-no-answer-keys.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/check-no-em-dash.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/input-verification.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/retrieval-limitations.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/static-accessibility.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/logs/validate-content.txt
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/manifest.json
  - specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a/summary.md
  - specs/content/efmp-407/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u06-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-407 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-06/`.

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

Recorded independent advisory G3 escalation review for EFMP-407 Unit 6 with validated evidence logs and an open advisory tracker row.

## Outcome

- Impact: review_en for EFMP-407 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the commit was made.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded independent advisory G3 escalation review for EFMP-407 Unit 6 with validated evidence logs and an open advisory tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Multiple excerpt files exist on disk under specs/content/efmp-407/sources/texts/ but were omitted from input_manifest due to citedKeysFor regex; engineering owner should bind them before final qualification.
  - Live browser rendering, 360px viewport table scrollability, and A4 print handout inspection remain uninspected under brief execution constraints.
  - Candidate English content files in docs/semester-3/efmp-407/unit-06/ remain unchanged and clean across all 14 gates.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
