---
id: crew-efmp-303-u02-fix
title: crew fix EFMP-303 unit 2
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u02-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/544-repair-efmp303-unit-two-geometry.general.prompt.md
 - specs/content/efmp-303/reviews/unit-02/G2/20261027T190312511Z-gates.json
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-02/G2/logs-20261027T190312511Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - static/content-status.json
 - static/img/figures/efmp-303/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-2.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u02-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u02-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (1 in total; PR #339 added the overlap and spill checks): fig-U2-2.svg (1). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-303/unit-02/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-303 2, point the unit's G2 en-draft row in specs/content/efmp-303/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-303 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-02/`.

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
- (efmp-303-u02-translate-r1, translate, codex) Accepted G3 evidence and fresh G5 review with rendered Urdu inspection remain pending.
- (efmp-303-u02-translate-r1, translate, codex) Accepted G3 evidence and fresh G5 review with rendered Urdu inspection remain pending.
- (efmp-303-u02-translate, translate, agy) All six Urdu mirror files and six schematic figures are fully verified and pass 13/13 content gates; translation_status stays draft pending independent G5 review.
- (efmp-303-u02-translate, translate, agy) Prior G5 review 54ea2d76 escalated solely on missing accepted G3 English review dependency (U-01); accepting G3 for Unit 2 is required to close G5.


## Response snapshot

Fixed the Unit 2 figure label spacing, regenerated its dark variant, refreshed G2 evidence, and recorded G3 staleness.

## Outcome

- Impact: fix for EFMP-303 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed the Unit 2 figure label spacing, regenerated its dark variant, refreshed G2 evidence, and recorded G3 staleness.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3 review is required before G5.
  - Fresh independent G3 review is required before G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
