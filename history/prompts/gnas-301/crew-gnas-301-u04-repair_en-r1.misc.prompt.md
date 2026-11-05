---
id: crew-gnas-301-u04-repair_en-r1
title: crew repair_en GNAS-301 unit 4
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u04-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gnas-301/crew-gnas-301-u04-repair_en-r1.misc.prompt.md
 - specs/content/gnas-301/reviews/unit-04/G2/20261105T114859786Z-gates.json
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261105T114859786Z/validate-content.txt
 - specs/content/gnas-301/reviews/unit-04/G3/repair-desk-94b67cf2.md
 - specs/content/gnas-301/sources/texts/who-mental-health-work.md
 - specs/content/gnas-301/sources/texts/who-occupational-health.md
 - specs/content/gnas-301/sources/unit-04.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u04-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gnas-301/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-04/`.

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
From `specs/content/gnas-301/reviews/unit-04/G3/20261102T213139Z-g3-desk-94b67cf2.json` (disposition: revise). Resolve each one:
- [advisory] Excerpt support note section headings in shared text files: in specs/content/gnas-301/sources/texts/who-hearing-2026.md line 17 and who-occupational-health.md line 23, the section headings read "## What this supports in GNAS-301 Unit 3", though Unit 4 cites them for U4-13 and U4-01 respectively (the underlying facts support both uses). In who-mental-health-work.md lines 19-21, the support note asserts a Topic 4.5 citation that was removed. As documented under "## Unit 4 excerpt support notes" in specs/content/gnas-301/sources/unit-04.md, these shared excerpts bind multiple units; when the s...
- [uncertain] Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) pass from source, but visual accessibility remains unverified in this session until a permitted browser/print inspection can be run on a live build.

## Notes from earlier jobs on this unit
- (gnas-301-u04-review_en-conflict1, fix, agy) G3 remains open (advisory escalate); a third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-review_en-conflict1, fix, agy) Live 360px small-screen and A4 print render inspection remains unperformed due to host limits and must be verified on a live build before G3 certification.
- (gnas-301-u04-review_en-conflict1, fix, agy) Shared excerpt note headings in who-hearing-2026.md, who-occupational-health.md, and who-mental-health-work.md retain stale notes to be updated when shared texts are next refreshed.
- (gnas-301-u04-review_en, review_en, agy) Content repairs from round 2 were verified and confirmed resolved, and figure text geometry across all 56 SVG variants passes cleanly.
- (gnas-301-u04-review_en, review_en, agy) Live 360px small-screen and A4 print view render inspection remains unperformed due to host job brief limits and must be verified on a live build before G3 certification.


## Response snapshot

Aligned excerpt support notes in who-occupational-health.md and who-mental-health-work.md with unit-neutral headings, updated sources/unit-04.md, preserved who-hearing-2026.md to protect Unit 3 G2 evidence, appended the unticked G3 tracker row, and refreshed G2 gate evidence.

## Outcome

- Impact: repair_en for GNAS-301 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Aligned excerpt support notes in who-occupational-health.md and who-mental-health-work.md with unit-neutral headings, updated sources/unit-04.md, preserved who-hearing-2026.md to protect Unit 3 G2 evidence, appended the unticked G3 tracker row, and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; third review cycle requires owner authorization under G-2026-31.
  - Live 360px small-screen and A4 print view render inspection remains unperformed due to host limits and must be verified on a live build before G3 certification.
  - who-hearing-2026.md heading is retained as-is because modifying it invalidates Unit 3's bound G2 gate evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
