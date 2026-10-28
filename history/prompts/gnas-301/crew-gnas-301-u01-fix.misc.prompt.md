---
id: crew-gnas-301-u01-fix
title: crew fix GNAS-301 unit 1
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u01-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-01/topic-03.mdx
 - history/prompts/gnas-301/544-fix-gnas-301-u01-figure-geometry.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-03.mdx
 - specs/content/gnas-301/reviews/unit-01/G2/20261027T154441214Z-gates.json
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261027T154441214Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
 - static/content-status.json
 - static/img/figures/gnas-301/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-2.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-6.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-8.dark.svg
 - static/img/figures/gnas-301/unit-01/fig-U1-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (5 in total; PR #339 added the overlap and spill checks): fig-U1-2.svg (1), fig-U1-3.ur.svg (1), fig-U1-6.svg (2), fig-U1-8.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gnas-301/unit-01/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GNAS-301 1, point the unit's G2 en-draft row in specs/content/gnas-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

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
- (gnas-301-u01-repair_en, repair_en, codex) Fresh review requires owner authorisation under G-2026-24; course overview credit split and shared source heading remain course-owner follow-ups.
- (gnas-301-u01-repair_en, repair_en, codex) Fresh review requires owner authorisation under G-2026-24; course overview credit split and shared source heading remain course-owner follow-ups.


## Response snapshot

Fixed all 5 figure text-geometry findings for GNAS-301 Unit 1 (fig-U1-2 header overflow, fig-U1-3.ur wordmark collision, fig-U1-6 overlap + column spill, fig-U1-8 sub-head overlap), refreshed G2 gate evidence, marked G3 stale, and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for GNAS-301 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed all 5 figure text-geometry findings for GNAS-301 Unit 1 (fig-U1-2 header overflow, fig-U1-3.ur wordmark collision, fig-U1-6 overlap + column spill, fig-U1-8 sub-head overlap), refreshed G2 gate evidence, marked G3 stale, and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U1-6 viewBox height is now 490 (not 470) - both Figure carriers updated; do not revert without updating them. G3 en-review for Unit 1 remains owner-gated under G-2026-24; needs a fresh review run when authorized.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
