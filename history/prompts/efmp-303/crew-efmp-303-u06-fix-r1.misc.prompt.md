---
id: crew-efmp-303-u06-fix-r1
title: crew fix EFMP-303 unit 6
stage: misc
date: 2026-10-27
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u06-fix-r1
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/content-status.json
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u06-fix-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-fix-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Redraw the Urdu figure static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg (SDG4 targets vs Pakistan policy). Rendered, its labels sit outside the coloured boxes (the boxes are empty), right-column labels are clipped at the canvas edge, and left-column labels overprint the connector lines. The scale(-1 1) mirroring per text element is the likely cause: lay the Urdu version out directly in RTL coordinates instead, matching the English fig-U6-2.svg structure. Measure with CI fonts, not the host Nastaliq: write a fontconfig file that includes only /usr/share/fonts and /etc/fonts/conf.d, then run FONTCONFIG_FILE=<that file> node scripts/measure-figure-text.mjs <svg>. It must pass both with and without that variable. Then render each Urdu SVG to PNG with Playwright and look at it: every label inside its own box, no arrow crossing text, nothing outside the canvas. Regenerate dark variants (npm run figures:variants), keep figure IDs, alt text and the manifest row, run npm run check:content. Build on main after PR #342 merges (it touches these files).

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

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
- (efmp-303-u06-fix, fix, codex) Fresh independent G3 is required; Urdu inspection and G5 remain pending.
- (efmp-303-u06-fix, fix, codex) Fresh independent G3 is required; Urdu inspection and G5 remain pending.
- (efmp-303-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
- (efmp-303-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
- (efmp-303-u06-translate, translate, codex) Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.


## Response snapshot

Redrew fig-U6-2.ur.svg laying text out directly in RTL coordinates (text-anchor="end" for box labels) instead of the broken scale(-1 1) mirroring, fixed the desc to match the Urdu carrier alt, and regenerated the dark variant.

## Outcome

- Impact: fix for EFMP-303 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Redrew fig-U6-2.ur.svg laying text out directly in RTL coordinates (text-anchor="end" for box labels) instead of the broken scale(-1 1) mirroring, fixed the desc to match the Urdu carrier alt, and regenerated the dark variant.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U6-2 Urdu still awaits independent G5 review and rendered-Urdu visual inspection (Codex job per brief notes); confirm label placement in Nastaliq before certifying.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
