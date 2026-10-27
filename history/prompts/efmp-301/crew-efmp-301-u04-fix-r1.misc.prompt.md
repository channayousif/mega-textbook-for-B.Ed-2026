---
id: crew-efmp-301-u04-fix-r1
title: crew fix EFMP-301 unit 4
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: efmp-301
branch: crew/efmp-301-u04-fix-r1
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-repair-urdu-memory-flowchart.general.prompt.md
 - static/content-status.json
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u04-fix-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-fix-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Redraw the Urdu figure static/img/figures/efmp-301/unit-04/fig-U4-3.ur.svg (how information travels through memory). Rendered, the forward arrows run through the panel text, a large black wedge/path crosses the encoding and working-memory panels, labels overlap inside the encoding panel, and the two-line caption under the bin icon collides. Match the English fig-U4-3.svg layout, mirrored for RTL. Measure with CI fonts, not the host Nastaliq: write a fontconfig file that includes only /usr/share/fonts and /etc/fonts/conf.d, then run FONTCONFIG_FILE=<that file> node scripts/measure-figure-text.mjs <svg>. It must pass both with and without that variable. Then render each Urdu SVG to PNG with Playwright and look at it: every label inside its own box, no arrow crossing text, nothing outside the canvas. Regenerate dark variants (npm run figures:variants), keep figure IDs, alt text and the manifest row, run npm run check:content. Build on main after PR #342 merges (it touches these files).

## Scope
EFMP-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-04/`.

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
- (efmp-301-u04-fix, fix, codex) G3 is marked stale and needs a fresh independent review.
- (efmp-301-u04-fix, fix, codex) G3 is marked stale and needs a fresh independent review.


## Response snapshot

Repaired the Urdu memory flowchart’s RTL arrows, malformed paths and label spacing, regenerated its dark variant, and committed validation records.

## Outcome

- Impact: fix for EFMP-301 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired the Urdu memory flowchart’s RTL arrows, malformed paths and label spacing, regenerated its dark variant, and committed validation records.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Pre-existing static/content-status.json changes remain unstaged.
  - Other Urdu figures retain existing label spills, especially fig-U4-4; independent G3/G5 review remains pending.
  - Pre-existing static/content-status.json changes remain unstaged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
