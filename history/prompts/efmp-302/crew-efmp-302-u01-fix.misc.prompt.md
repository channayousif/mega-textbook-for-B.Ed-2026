---
id: crew-efmp-302-u01-fix
title: crew fix EFMP-302 unit 1
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: efmp-302
branch: crew/efmp-302-u01-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/544-fix-efmp-302-u01-figure-geometry-overlap.general.prompt.md
 - specs/content/efmp-302/reviews/unit-01/G2/20261027T190642552Z-gates.json
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-bloom-bands.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-concept-graph.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-depth-gate.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-docs-sync.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-figures.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-no-answer-keys.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/check-no-em-dash.txt
 - specs/content/efmp-302/reviews/unit-01/G2/logs-20261027T190642552Z/validate-content.txt
 - specs/content/efmp-302/tasks.md
 - static/content-status.json
 - static/img/figures/efmp-302/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efmp-302/unit-01/fig-U1-5.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u01-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u01-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (1 in total; PR #339 added the overlap and spill checks): fig-U1-5.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-302/unit-01/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-302 1, point the unit's G2 en-draft row in specs/content/efmp-302/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-302 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-01/`.

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

Fixed overlapping "is marked by" / "is not just" labels in EFMP-302 Unit 1's fig-U1-5 by separating them vertically in both EN and UR SVGs, rebuilt dark variants, regenerated G2 evidence, and marked the G3 row stale pending a fresh review.

## Outcome

- Impact: fix for EFMP-302 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed overlapping "is marked by" / "is not just" labels in EFMP-302 Unit 1's fig-U1-5 by separating them vertically in both EN and UR SVGs, rebuilt dark variants, regenerated G2 evidence, and marked the G3 row stale pending a fresh review.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - EFMP-302 Unit 1's G3 en-review is now stale and needs a fresh independent review run (ADR-0019).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
