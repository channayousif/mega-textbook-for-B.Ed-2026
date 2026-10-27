---
id: crew-gsos-301-u01-fix
title: crew fix GSOS-301 unit 1
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u01-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/542-repair-gsos-unit-one-geometry.general.prompt.md
 - specs/content/gsos-301/reviews/unit-01/G2/20261027T003456620Z-gates.json
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-01/G2/logs-20261027T003456620Z/validate-content.txt
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u01-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (14 in total; PR #339 added the overlap and spill checks): fig-U1-4.svg (5), fig-U1-6.svg (9). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/gsos-301/unit-01/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GSOS-301 1, point the unit's G2 en-draft row in specs/content/gsos-301/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

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
- (gsos-301-u01-repair_en-conflict1, fix, opencode) G3 review remains unticked on GSOS-301 Unit 1; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending. Six `.ur.svg` figure variants still missing (generate-figures scope). Citation sync to Urdu topics pending English G3 citation revisions (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.).
- (gsos-301-u01-repair_en, repair_en, codex) G3 remains unticked; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending.
- (gsos-301-u01-repair_en, repair_en, codex) G3 remains unticked; independent review, mobile/print inspection, and CurriculumOwner G0/G1 closure remain pending.
- (gsos-301-u01-translate-r1, translate, agy) When English G3 citation revisions land (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.), sync the citation keys in Urdu topic prose and Further reading.
- (gsos-301-u01-translate-r1, translate, agy) Proposed sociology terms (عمرانیات، مثبتیت، فعلیت، وغیرہ) are documented in reviews/unit-01/G4/translation-handoff.md for CurriculumOwner banking in terminology.csv.


## Response snapshot

Rewrapped GSOS-301 Unit 1 table labels, regenerated dark variants, refreshed G2 evidence, and marked G3 reviews stale.

## Outcome

- Impact: fix for GSOS-301 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Rewrapped GSOS-301 Unit 1 table labels, regenerated dark variants, refreshed G2 evidence, and marked G3 reviews stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked and needs a fresh independent review.
  - G3 remains unticked and needs a fresh independent review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
