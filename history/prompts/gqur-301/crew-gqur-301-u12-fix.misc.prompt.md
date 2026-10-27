---
id: crew-gqur-301-u12-fix
title: crew fix GQUR-301 unit 12
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u12-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/544-repair-gqur-unit-twelve-geometry.general.prompt.md
 - specs/content/gqur-301/reviews/unit-12/G2/20261027T153755706Z-gates.json
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261027T153755706Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - static/content-status.json
 - static/img/figures/gqur-301/unit-12/fig-U12-1.dark.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-1.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-4.dark.svg
 - static/img/figures/gqur-301/unit-12/fig-U12-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u12-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u12-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (5 in total; PR #339 added the overlap and spill checks): fig-U12-1.svg (4), fig-U12-4.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gqur-301/unit-12/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GQUR-301 12, point the unit's G2 en-draft row in specs/content/gqur-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GQUR-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-12/`.

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
- (gqur-301-u12-translate-r1, translate, opencode) `.ur.svg` figure variants for all 4 figures (fig-U12-1 concept-map, fig-U12-2 table, fig-U12-3 diagram, fig-U12-4 table) need a `generate-figures` Step 5 run before the unit can be flipped to `reviewed`  -  `<Figure src>` already points at the `.ur.svg` paths.
- (gqur-301-u12-translate-r1, translate, opencode) G3 English review remains open (advisory escalation F1-F6); translation proceeded on the existing English baseline.
- (gqur-301-u12-translate, translate, codex) A separate author must repair F1-F6 before translation resumes; draft status and G3/G5 remain unchanged.
- (gqur-301-u12-translate, translate, codex) A separate author must repair F1-F6 before translation resumes; draft status and G3/G5 remain unchanged.
- (gqur-301-u12-review_en, review_en, codex) A separate author must resolve F1-F6, followed by a fresh independent review with provenance and browser/print evidence; G3 remains open.


## Response snapshot

Fixed all five Unit 12 figure geometry problems, regenerated dark variants, and committed refreshed gate evidence and tracker records.

## Outcome

- Impact: fix for GQUR-301 Unit 12 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed all five Unit 12 figure geometry problems, regenerated dark variants, and committed refreshed gate evidence and tracker records.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open; F1-F6 need separate author repair and fresh independent review.
  - G3 remains open; F1-F6 need separate author repair and fresh independent review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
