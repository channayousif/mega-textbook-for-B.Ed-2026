---
id: crew-efmp-304-u05-fix
title: crew fix EFMP-304 unit 5
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: efmp-304
branch: crew/efmp-304-u05-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2430-efmp-304-u05-fix-figure-text-geometry.general.prompt.md
 - specs/content/efmp-304/reviews/unit-05/G2/20261027T085730956Z-gates.json
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-05/G2/logs-20261027T085730956Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-05/fig-U5-7.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-7.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-7.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-7.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u05-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u05-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (9 in total; PR #339 added the overlap and spill checks): fig-U5-7.svg (9). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-304/unit-05/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-304 5, point the unit's G2 en-draft row in specs/content/efmp-304/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-304 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Repaired fig-U5-7.svg/.ur.svg text-geometry by widening Stages (100→140px) and Misses (100→120px) columns, narrowing Time cost and From to compensate, growing row heights, and wrapping six over-long labels; mirrored into the Urdu twin with RTL wordmark placement; re-certified G2 and flagged G3 as stale.

## Outcome

- Impact: fix for EFMP-304 Unit 5 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired fig-U5-7.svg/.ur.svg text-geometry by widening Stages (100→140px) and Misses (100→120px) columns, narrowing Time cost and From to compensate, growing row heights, and wrapping six over-long labels; mirrored into the Urdu twin with RTL wordmark placement; re-certified G2 and flagged G3 as stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review row for EFMP-304 Unit 5 is now stale and needs a fresh independent review before the unit can advance to G4/G5 re-verification.
  - Column widths for fig-U5-7 are now 90/140/130/100/120/140 (not the original 90/100/130/120/100/180)  -  any future edit to this figure must preserve the new geometry.
  - No further figure work is owed on EFMP-304 Unit 5; `check:content` 13/13 pass and `measure-figure-text.mjs` exits 0 for both locales.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
