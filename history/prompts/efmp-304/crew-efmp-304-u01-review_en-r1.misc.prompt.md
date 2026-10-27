---
id: crew-efmp-304-u01-review_en-r1
title: crew review_en EFMP-304 unit 1 (second cycle)
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u01-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/crew-efmp-304-u01-review_en-r1.misc.prompt.md
 - specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-rune5024f5f.json
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/check-content.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/check-depth-gate.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/check-docs-sync.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/check-figures.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/check-no-answer-keys.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/check-no-em-dash.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/manifest.json
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/measure-figure-text.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/render-review.log
 - specs/content/efmp-304/reviews/unit-01/G3/logs-e5024f5f/validate-content.log
 - specs/content/efmp-304/reviews/unit-01/G3/summary.md
 - specs/content/efmp-304/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-304 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

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

Executed second-cycle independent G3 English review of EFMP-304 Unit 1 with advisory escalate disposition, verifying all five previous review findings resolved, recording gate and execution evidence, and adding advisory escalate tracker row with G3 unchecked.

## Outcome

- Impact: review_en for EFMP-304 Unit 1 by agy (attempt 2, final cycle under ADR-0019).
- Tests: npm run check:content passed all 13 gates cleanly in the worktree.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Executed second-cycle independent G3 review of EFMP-304 Unit 1. Verified author repairs resolved all five defects from cycle 1 report (XML syntax in fig-U1-3, wordmark viewBox overflow across five SVGs, RRQ 2-per-topic blueprint saturation, figure manifest preamble status, and descriptive link text). Recorded advisory escalate report `agent-g3-efmp-304-u1-rune5024f5f.json` and logs under `specs/content/efmp-304/reviews/unit-01/G3/`. Appended advisory tracker row to `tasks.md`.
- Decisions the team must respect: G3 stays open (`▢`); this is advisory evidence and does not certify the unit (ADR-0019).
- Pending / next owner: Curriculum owner for human G3 sign-off or visual render inspection with permitted browser tools.
- Notes for the next job on this unit:
  - All content-side defects from cycle 1 are resolved.
  - Live 360px viewport, table horizontal scrolling, and A4 print view require inspection under permitted browser tools before formal G3 certification.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
