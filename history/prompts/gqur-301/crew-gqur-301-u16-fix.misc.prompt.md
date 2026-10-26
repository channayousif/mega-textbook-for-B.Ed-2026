---
id: crew-gqur-301-u16-fix
title: crew fix GQUR-301 unit 16
stage: misc
date: 2026-10-26
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u16-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/542-repair-unit-sixteen-urdu-geometry.general.prompt.md
 - specs/content/gqur-301/reviews/unit-16/G2/20261026T233336232Z-gates.json
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261026T233336232Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-16/fig-U16-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-1.ur.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-2.ur.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-6.ur.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u16-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u16-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (30 in total; PR #339 added the overlap and spill checks): fig-U16-1.ur.svg (5), fig-U16-2.ur.svg (7), fig-U16-6.ur.svg (18). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gqur-301/unit-16/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GQUR-301 16, point the unit's G2 en-draft row in specs/content/gqur-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GQUR-301 Unit 16 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-16/`.

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
- (gqur-301-u16-translate, translate, codex) Urdu rendering inspection, terminology review and independent G5 remain pending; translation_status stays draft.
- (gqur-301-u16-translate, translate, codex) Urdu rendering inspection, terminology review and independent G5 remain pending; translation_status stays draft.
- (gqur-301-u16-review_en-r1, review_en, opencode) The unit content itself is sound  -  no content revision needed for authority, sources, coverage, assessment, readability, or pedagogy. Only the accessibility criterion awaits a host with build/Playwright permitted to run render-review and close the visual-inspection gap (360px layout, A4 print, reading order).
- (gqur-301-u16-author, author, codex) Urdu translation, Urdu figures and independent G3/G5 reviews remain open.
- (gqur-301-u16-author, author, codex) Urdu translation, Urdu figures and independent G3/G5 reviews remain open.


## Response snapshot

Resolved all 30 Unit 16 geometry findings, regenerated dark variants, refreshed G2 evidence and marked G3 stale.

## Outcome

- Impact: fix for GQUR-301 Unit 16 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved all 30 Unit 16 geometry findings, regenerated dark variants, refreshed G2 evidence and marked G3 stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3 and Urdu rendering/G5 reviews remain pending.
  - Fresh independent G3 and Urdu rendering/G5 reviews remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
