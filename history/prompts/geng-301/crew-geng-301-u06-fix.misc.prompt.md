---
id: crew-geng-301-u06-fix
title: crew fix GENG-301 unit 6
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: geng-301
branch: crew/geng-301-u06-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-repair-geng301-unit-six-figure-geometry.general.prompt.md
 - specs/content/geng-301/reviews/unit-06/G2/20261027T091908412Z-gates.json
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-06/G2/logs-20261027T091908412Z/validate-content.txt
 - specs/content/geng-301/tasks.md
 - static/content-status.json
 - static/img/figures/geng-301/unit-06/fig-U6-1.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-1.svg
 - static/img/figures/geng-301/unit-06/fig-U6-2.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-2.svg
 - static/img/figures/geng-301/unit-06/fig-U6-3.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-3.svg
 - static/img/figures/geng-301/unit-06/fig-U6-4.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-4.svg
 - static/img/figures/geng-301/unit-06/fig-U6-5.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-5.svg
 - static/img/figures/geng-301/unit-06/fig-U6-6.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-6.svg
 - static/img/figures/geng-301/unit-06/fig-U6-7.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-7.svg
 - static/img/figures/geng-301/unit-06/fig-U6-8.dark.svg
 - static/img/figures/geng-301/unit-06/fig-U6-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u06-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u06-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (8 in total; PR #339 added the overlap and spill checks): fig-U6-1.svg (1), fig-U6-2.svg (1), fig-U6-3.svg (1), fig-U6-4.svg (1), fig-U6-5.svg (1), fig-U6-6.svg (1), fig-U6-7.svg (1), fig-U6-8.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/geng-301/unit-06/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GENG-301 6, point the unit's G2 en-draft row in specs/content/geng-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GENG-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-06/`.

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
- (geng-301-u06-review_en-conflict1, fix, codex) Unit 6 author repairs and fresh provenance/render review remain pending; G3 stays incomplete.
- (geng-301-u06-review_en-conflict1, fix, codex) Unit 6 author repairs and fresh provenance/render review remain pending; G3 stays incomplete.
- (geng-301-u06-review_en, review_en, codex) Author repairs and host provenance/render evidence are required before fresh review; G3 remains incomplete.
- (geng-301-u06-review_en, review_en, codex) Author repairs and host provenance/render evidence are required before fresh review; G3 remains incomplete.


## Response snapshot

Fixed all eight Unit 6 figure overflows, regenerated dark variants, refreshed G2 evidence, and marked G3 stale.

## Outcome

- Impact: fix for GENG-301 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed all eight Unit 6 figure overflows, regenerated dark variants, refreshed G2 evidence, and marked G3 stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains incomplete and explicitly stale; fresh independent review and outstanding author/provenance repairs remain pending.
  - G3 remains incomplete and explicitly stale; fresh independent review and outstanding author/provenance repairs remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
