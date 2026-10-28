---
id: crew-gnas-301-u04-fix
title: crew fix GNAS-301 unit 4
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u04-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-04/topic-01.mdx
 - docs/semester-1/gnas-301/unit-04/topic-04.mdx
 - docs/semester-1/gnas-301/unit-04/topic-05.mdx
 - docs/semester-1/gnas-301/unit-04/topic-06.mdx
 - docs/semester-1/gnas-301/unit-04/topic-07.mdx
 - history/prompts/gnas-301/crew-gnas-301-u04-fix-figure-geometry.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-07.mdx
 - specs/content/gnas-301/reviews/unit-04/G2/20261027T085833746Z-gates.json
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
 - static/img/figures/gnas-301/unit-04/fig-U4-10.dark.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-10.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-12.dark.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-12.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-12.ur.dark.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-12.ur.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-13.dark.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-13.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-2.dark.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-2.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-7.dark.svg
 - static/img/figures/gnas-301/unit-04/fig-U4-7.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u04-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (9 in total; PR #339 added the overlap and spill checks): fig-U4-10.svg (1), fig-U4-12.svg (1), fig-U4-12.ur.svg (1), fig-U4-13.svg (3), fig-U4-2.svg (2), fig-U4-7.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gnas-301/unit-04/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GNAS-301 4, point the unit's G2 en-draft row in specs/content/gnas-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

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

## Notes from earlier jobs on this unit
- (gnas-301-u04-repair_en-conflict3, fix, codex) G3 remains open; a third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-repair_en-conflict3, fix, codex) G3 remains open; a third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-repair_en-conflict2, fix, codex) G3 remains open; a third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-repair_en-conflict2, fix, codex) G3 remains open; a third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-repair_en, repair_en, codex) G3 remains unticked; a third review cycle requires owner authorization under G-2026-31.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

** Fixed 9 figure text-geometry findings across 6 GNAS-301 Unit 4 SVGs by wrapping overflowing labels, growing panels/viewBox, regenerating dark variants, updating 10 Figure carrier heights, refreshing G2 evidence, and marking G3 stale.

## Outcome

- Impact: fix for GNAS-301 Unit 4 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: ** Fixed 9 figure text-geometry findings across 6 GNAS-301 Unit 4 SVGs by wrapping overflowing labels, growing panels/viewBox, regenerating dark variants, updating 10 Figure carrier heights, refreshing G2 evidence, and marking G3 stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - ** Unit 4 G3 rows are marked stale; a fresh G3 review run needs owner authorization (G-2026-31, two-cycle limit already reached). The `pipeline-gate` "G2 en-draft: stale" finding is expected after the figure-geometry repair, not a new defect.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
