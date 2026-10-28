---
id: crew-efmp-303-u05-fix
title: crew fix EFMP-303 unit 5
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u05-fix
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-efmp-303-u05-figure-geometry.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-05/G2/20261027T164933480Z-gates.json
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-05/G2/logs-20261027T164933480Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
 - static/content-status.json
 - static/img/figures/efmp-303/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-303/unit-05/fig-U5-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u05-fix

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u05-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (2 in total; PR #339 added the overlap and spill checks): fig-U5-4.svg (2). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-303/unit-05/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-303 5, point the unit's G2 en-draft row in specs/content/efmp-303/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-303 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-05/`.

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
- (efmp-303-u05-translate-r1, translate, agy) EFMP-303 Unit 5 Urdu mirror is complete at G4 (5 files, 4 localized .ur.svg figures with dark variants, 13/13 content gates pass); translation_status stays draft pending independent G5 review.
- (efmp-303-u05-translate-r1, translate, agy) Render inspection (desktop, narrow 360px, A4 print) was omitted per brief constraints and should be run during the independent G5 review session.
- (efmp-303-u05-translate-r1, translate, agy) Prior G3 English review was an advisory escalation; closing G3 and addressing author repairs in English remain open before G5 resolution.
- (efmp-303-u05-translate, translate, agy) EFMP-303 Unit 5 Urdu mirror is complete at G4 (5 files, 4 localized .ur.svg figures with dark variants, 13/13 content gates pass); translation_status stays draft pending independent G5 review.
- (efmp-303-u05-translate, translate, agy) Prior G3 English review was an advisory escalation; closing G3 and addressing author repairs in English remain open before G5 resolution.


## Response snapshot

Repaired Unit 5 figure label geometry, regenerated its dark variant, refreshed G2 evidence, and flagged G3 as stale.

## Outcome

- Impact: fix for EFMP-303 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 5 figure label geometry, regenerated its dark variant, refreshed G2 evidence, and flagged G3 as stale.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Regenerated static/content-status.json remains uncommitted; it was already modified at task start.
  - G3 needs a fresh independent run.
  - Regenerated static/content-status.json remains uncommitted; it was already modified at task start.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
