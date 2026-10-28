---
id: crew-geng-300-u01-fix
title: crew fix GENG-300 unit 1
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: geng-300
branch: crew/geng-300-u01-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/geng-300/reviews/unit-01/G2/20261027T163722910Z-gates.json
 - specs/content/geng-300/reviews/unit-01/G2/20261027T165057677Z-gates.json
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T163722910Z/validate-content.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261027T165057677Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/content-status.json
 - static/img/figures/geng-300/unit-01/fig-U1-3.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-3.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u01-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (3 in total; PR #339 added the overlap and spill checks): fig-U1-3.svg (3). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/geng-300/unit-01/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs GENG-300 1, point the unit's G2 en-draft row in specs/content/geng-300/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
GENG-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-01/`.

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
- (geng-300-u01-repair_en-conflict1, fix, opencode) G3 review for GENG-300 Unit 1 remains open and unsigned  -  fresh independent review is pending (not part of this merge job).
- (geng-300-u01-repair_en-conflict1, fix, opencode) content-status.json is gitignored but regenerated on disk; gates that depend on it pass.
- (geng-300-u01-repair_en, repair_en, codex) G3 remains open and unsigned; fresh independent review is pending.
- (geng-300-u01-repair_en, repair_en, codex) G3 remains open and unsigned; fresh independent review is pending.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GENG-300 Unit 1 (docs/semester-1/geng-300/unit-01): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Fixed fig-U1-3.svg text geometry, regenerated G2 gate evidence, removed stale duplicate tracker rows, and updated tasks.md so the G2 row points at fresh gates evidence and the pipeline gate passes.

## Outcome

- Impact: fix for GENG-300 Unit 1 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed fig-U1-3.svg text geometry, regenerated G2 gate evidence, removed stale duplicate tracker rows, and updated tasks.md so the G2 row points at fresh gates evidence and the pipeline gate passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 en-review stays open and stale; a fresh independent review is needed after the figure-geometry changes. No `.ur.svg` files exist for this English-only course.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
