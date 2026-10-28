---
id: crew-gsos-301-u02-fix
title: crew fix GSOS-301 unit 2
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u02-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-02/topic-02.mdx
 - history/prompts/general/543-gsos301-u02-fix-figure-geometry.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
 - specs/content/gsos-301/reviews/unit-02/G2/20261027T055052042Z-gates.json
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-02/G2/logs-20261027T055052042Z/validate-content.txt
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-02/fig-U2-1.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-1.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-2.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-2.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-3.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-3.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u02-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (10 in total; PR #339 added the overlap and spill checks): fig-U2-1.svg (1), fig-U2-1.ur.svg (1), fig-U2-2.svg (1), fig-U2-2.ur.svg (1), fig-U2-3.svg (1), fig-U2-3.ur.svg (1), fig-U2-4.svg (4). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gsos-301/unit-02/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GSOS-301 2, point the unit's G2 en-draft row in specs/content/gsos-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GSOS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-02/`.

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
- (gsos-301-u02-translate-r1, translate, codex) Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- (gsos-301-u02-translate-r1, translate, codex) Translation remains draft; English review findings and rendered Urdu inspection remain pending before independent G5 review.
- (gsos-301-u02-translate, translate, agy) translation_status remains draft pending independent G5 review; G4 tracker row recorded with auto:gates.
- (gsos-301-u02-translate, translate, agy) If English source citations or Mead stage age boundaries are later adjusted per G3 review notes, fig-U2-4.ur.svg and topic-02.mdx should be aligned accordingly.
- (gsos-301-u02-review_en, review_en, agy) Reconcile topic-01 and topic-02 citations (Givens & White, Henson, Lindsey) against approved sources (Conerly et al. 2021, Lindsey & Beach 2001).


## Response snapshot

Fixed 10 figure text-geometry defects across GSOS-301 Unit 2's eight SVGs (wordmark overflow in six via CSS text-anchor fix, table label overlaps in fig-U2-4.svg via re-wrapping and viewBox growth to 780x490), regenerated dark variants, refreshed G2 gate evidence, and marked G3 stale.

## Outcome

- Impact: fix for GSOS-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed 10 figure text-geometry defects across GSOS-301 Unit 2's eight SVGs (wordmark overflow in six via CSS text-anchor fix, table label overlaps in fig-U2-4.svg via re-wrapping and viewBox growth to 780x490), regenerated dark variants, refreshed G2 gate evidence, and marked G3 stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
