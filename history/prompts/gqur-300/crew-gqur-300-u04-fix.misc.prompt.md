---
id: crew-gqur-300-u04-fix
title: crew fix GQUR-300 unit 4
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: gqur-300
branch: crew/gqur-300-u04-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-gqur300-u04-fix-figure-geometry.general.prompt.md
 - specs/content/gqur-300/reviews/unit-04/G2/20261027T162332529Z-gates.json
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-bloom-bands.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-concept-graph.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-depth-gate.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-docs-sync.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-figures.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-no-answer-keys.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/check-no-em-dash.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261027T162332529Z/validate-content.txt
 - specs/content/gqur-300/tasks.md
 - static/img/figures/gqur-300/unit-04/fig-U4-4.dark.svg
 - static/img/figures/gqur-300/unit-04/fig-U4-4.svg
 - static/img/figures/gqur-300/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gqur-300/unit-04/fig-U4-4.ur.svg
 - static/img/figures/gqur-300/unit-04/fig-U4-6.dark.svg
 - static/img/figures/gqur-300/unit-04/fig-U4-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u04-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u04-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (4 in total; PR #339 added the overlap and spill checks): fig-U4-4.svg (1), fig-U4-4.ur.svg (2), fig-U4-6.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gqur-300/unit-04/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GQUR-300 4, point the unit's G2 en-draft row in specs/content/gqur-300/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GQUR-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-300-u04-translate-r1, translate, codex) Twelve terms await owner banking; translation remains draft pending independent G5 and rendered RTL/A4 inspection.
- (gqur-300-u04-translate-r1, translate, codex) Twelve terms await owner banking; translation remains draft pending independent G5 and rendered RTL/A4 inspection.
- (gqur-300-u04-translate, translate, opencode) All 12 key_terms (Area, Centimetre, Circle, Kilogram, Millilitre, Perimeter, Radius, Rectangle, Square, Triangle, Unit of measurement, Volume) remain unbanked in terminology.csv and await curriculum owner banking before G5 review.
- (gqur-300-u04-translate, translate, opencode) The temporary reviewed flip (Step 5 parity check) was reverted; translation_status stays draft on both EN and UR index.mdx.
- (gqur-300-u04-translate, translate, opencode) Urdu mirror was already committed on origin/main from an earlier attempt; this job only verified and recorded the G4 row.


## Response snapshot

Fixed all 4 text-geometry defects in GQUR-300 Unit 4 (row shift in fig-U4-4 EN/UR, RTL caption repositioning, wrapped Unit label in fig-U4-6), regenerated dark variants, refreshed G2 evidence, and marked the G3 row stale in tasks.md.

## Outcome

- Impact: fix for GQUR-300 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed all 4 text-geometry defects in GQUR-300 Unit 4 (row shift in fig-U4-4 EN/UR, RTL caption repositioning, wrapped Unit label in fig-U4-6), regenerated dark variants, refreshed G2 evidence, and marked the G3 row stale in tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The G3 en-review row for GQUR-300 Unit 4 is stale and needs a fresh G3 run before certification.
  - `check:content-status` fails on origin/main (pre-existing, content-status.json was generated for commit d5ff559c but origin/main HEAD is 0deb05f4)  -  not in scope for this job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
