---
id: crew-efmp-304-u03-fix
title: crew fix EFMP-304 unit 3
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: efmp-304
branch: crew/efmp-304-u03-fix
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u03-fix

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u03-fix`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (6 in total; PR #339 added the overlap and spill checks): fig-U3-1.svg (2), fig-U3-3.svg (1), fig-U3-5.svg (3). Follow .claude/skills/generate-figures/references/svg-authoring.md section "Fit and spacing": re-wrap or reposition labels, widen columns, grow rows or the viewBox height; never shrink text below 12px; do not change wording or meaning beyond line breaks (keep the Urdu wording in .ur.svg files). Edit only the light .svg and .ur.svg sources. Measure with: scripts/heavy.sh node scripts/measure-figure-text.mjs $(ls static/img/figures/efmp-304/unit-03/*.svg | grep -v dark) (this Chromium check is allowed; it is not a build, dev server or e2e run) and repeat until it exits 0, then npm run figures:variants. If you change a viewBox height, update that figure's height attribute in both the English and Urdu <Figure> carriers. Do not edit prose. After committing, run node scripts/prepare-gate-evidence.mjs EFMP-304 3, point the unit's G2 en-draft row in specs/content/efmp-304/tasks.md at the new gates file, append to its G3 row "Stale since the figure-geometry repair; needs a fresh G3 run", and commit that too.

## Scope
EFMP-304 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-03/`.

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
- (efmp-304-u03-translate-r1, translate, codex) Translation remains draft pending independent G5; full-page RTL/print inspection and English G3 follow-up remain open.
- (efmp-304-u03-translate-r1, translate, codex) Translation remains draft pending independent G5; full-page RTL/print inspection and English G3 follow-up remain open.
- (efmp-304-u03-translate, translate, agy) English G3 for EFMP-304 Unit 3 remains open with an advisory escalate, so any future English prose repair may require updating this Urdu mirror.
- (efmp-304-u03-translate, translate, agy) Full-page desktop, 360 px, and A4 print rendering inspection via `render-inspect.mjs` was deferred under the crew build/server restriction and remains to be verified by independent G5.


## Response snapshot

fix for EFMP-304 Unit 3

## Outcome

- Impact: fix for EFMP-304 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: fix for EFMP-304 Unit 3
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
