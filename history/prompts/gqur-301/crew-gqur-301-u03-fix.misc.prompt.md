---
id: crew-gqur-301-u03-fix
title: crew fix GQUR-301 unit 3
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u03-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-03/G2/20261027T195341319Z-gates.json
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261027T195341319Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u03-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u03-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (1 in total; PR #339 added the overlap and spill checks): fig-U3-2.ur.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gqur-301/unit-03/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GQUR-301 3, point the unit's G2 en-draft row in specs/content/gqur-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GQUR-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-03/`.

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
- (gqur-301-u03-translate, translate, codex) Translation remains draft; independent G3/G5 review and browser inspection remain pending.
- (gqur-301-u03-translate, translate, codex) Translation remains draft; independent G3/G5 review and browser inspection remain pending.
- (gqur-301-u03-review_en-r1, review_en, agy) G3 review is advisory and unsigned (status ▢, no initials) under ADR-0019; disposition is pass with advisory finding F1 (headless render limitation).
- (gqur-301-u03-review_en-r1, review_en, agy) All four figure SVGs pass measure-figure-text cleanly with no viewBox overflow (two cosmetic wordmark collisions reported in fig-U3-2 but not failed).
- (gqur-301-u03-review_en-r1, review_en, agy) Next lifecycle stage for Unit 3 is G4 Urdu translation.


## Response snapshot

Fixed fig-U3-2.ur.svg Urdu caption overprinting the wordmark by moving caption lines up 13-16px, then refreshed G2 gate evidence and flagged stale G3.

## Outcome

- Impact: fix for GQUR-301 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 12 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed fig-U3-2.ur.svg Urdu caption overprinting the wordmark by moving caption lines up 13-16px, then refreshed G2 gate evidence and flagged stale G3.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 review is stale after the figure-geometry repair and needs a fresh independent run; cosmetic rect/wordmark collision (82.3x11px) in the caption panel remains pre-existing on main.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
