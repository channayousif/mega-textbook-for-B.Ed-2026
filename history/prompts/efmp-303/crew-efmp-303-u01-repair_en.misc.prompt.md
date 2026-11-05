---
id: crew-efmp-303-u01-repair_en
title: crew repair_en EFMP-303 unit 1
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2447-efmp-303-u01-repair-en.general.prompt.md
 - specs/content/efmp-303/reviews/unit-01/G2/20261103T183510555Z-gates.json
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261103T183510555Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-01/fig-U1-8.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.dark.svg
 - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u01-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u01-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-303/reviews/unit-01/G3/20261102T212819Z-g3-desk-140ce781.json` (disposition: revise). Resolve each one:
- [advisory] In specs/content/efmp-303/tasks.md:15, Unit 1 G1 row states "board G0/G1 intake pending", though specs/content/efmp-303/content-spec.md status is approved. CurriculumOwner should confirm G1 gate formalization.
- [advisory] In static/img/figures/efmp-303/unit-01/fig-U1-8.svg (and dark/ur variants), measure-figure-text.mjs reports a cosmetic panel overlap with the bottom wordmark ([20,475,760,505] by 84.3 x 5.5px). All text remains well within the 780x520 viewBox.
- [uncertain] Full interactive live-browser rendering (narrow 360x780 viewport and A4 print emulation) was not performed because brief constraints specify "never run npm run build or a dev server". Structural accessibility, table CSS containers, and SVG text geometry were verified from source.

## Notes from earlier jobs on this unit
- (efmp-303-u01-fix, fix, opencode) The `check:content-status` gate fails because `static/content-status.json` was already stale before this job (prestart-hook artifact, not in scope) - a later job or `npm run build:content-status` will resolve it.
- (efmp-303-u01-translate-r1, translate, opencode) G4 tracker row stays ▣; independent G5 Urdu review remains pending.
- (efmp-303-u01-translate-r1, translate, opencode) G3 escalated, board G0/G1 intake still pending.
- (efmp-303-u01-translate-r1, translate, opencode) Proposed unbanked terms (Development sense split: نشوونما vs ترقی) in translation-handoff.md for owner determination.
- (efmp-303-u01-translate, translate, agy) All 8 .ur.svg figure variants and derived dark variants are wired in topics 1-4 with matching carrier alt text and passing figures:variants:check.


## Response snapshot

Moved the fig-U1-8 wordmark clear of the last table row in all four versions, updated the out-of-date Unit 1 G1 tracker note to cite D-2026-0063, refreshed the G2 evidence, and added an unticked G3 "advisory: revise; repairs applied" row naming report 140ce781.

## Outcome

- Impact: repair_en for EFMP-303 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Moved the fig-U1-8 wordmark clear of the last table row in all four versions, updated the out-of-date Unit 1 G1 tracker note to cite D-2026-0063, refreshed the G2 evidence, and added an unticked G3 "advisory: revise; repairs applied" row naming report 140ce781.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Checking Unit 1 at 360px width and in A4 print is still not done; it needs a host that is allowed to build and run a browser.
  - The G1 row stays unticked until the CurriculumOwner formally signs off on the D-2026-0063 approval.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
