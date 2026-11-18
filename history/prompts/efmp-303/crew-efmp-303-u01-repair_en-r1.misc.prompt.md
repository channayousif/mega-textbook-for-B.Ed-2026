---
id: crew-efmp-303-u01-repair_en-r1
title: crew repair_en EFMP-303 unit 1
stage: misc
date: 2026-11-09
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u01-repair_en-r1.misc.prompt.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u01-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-303/reviews/unit-01/G3/20261108T203238Z-g3-desk-727e527b.json` (disposition: revise). Resolve each one:
- [advisory] In specs/content/efmp-303/tasks.md:15, Unit 1 G1 row states "board G0/G1 intake pending", though specs/content/efmp-303/content-spec.md status is approved. CurriculumOwner should confirm G1 gate formalization.
- [advisory] In static/img/figures/efmp-303/unit-01/fig-U1-8.svg (and dark/ur variants), measure-figure-text.mjs reports a cosmetic panel overlap with the bottom wordmark ([20,475,760,505] by 84.3 x 5.5px). All text remains well within the 780x520 viewBox.
- [uncertain] Full interactive live-browser rendering (narrow 360x780 viewport and A4 print emulation) was not performed because brief constraints specify "never run npm run build or a dev server". Structural accessibility, table CSS containers, and SVG text geometry were verified from source.

## Notes from earlier jobs on this unit
- (efmp-303-u01-repair_en, repair_en, claude) Checking Unit 1 at 360px width and in A4 print is still not done; it needs a host that is allowed to build and run a browser.
- (efmp-303-u01-repair_en, repair_en, claude) The G1 row stays unticked until the CurriculumOwner formally signs off on the D-2026-0063 approval.
- (efmp-303-u01-fix, fix, opencode) The `check:content-status` gate fails because `static/content-status.json` was already stale before this job (prestart-hook artifact, not in scope) - a later job or `npm run build:content-status` will resolve it.
- (efmp-303-u01-translate-r1, translate, opencode) G4 tracker row stays ▣; independent G5 Urdu review remains pending.
- (efmp-303-u01-translate-r1, translate, opencode) G3 escalated, board G0/G1 intake still pending.


## Response snapshot

Appended an unticked Unit 1 G3 advisory-repair tracker row naming report 20261108T203238Z-g3-desk-727e527b and verified the G1 note and fig-U1-8 geometry were already repaired on main.

## Outcome

- Impact: repair_en for EFMP-303 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Appended an unticked Unit 1 G3 advisory-repair tracker row naming report 20261108T203238Z-g3-desk-727e527b and verified the G1 note and fig-U1-8 geometry were already repaired on main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Latest G3 report 20261108T203238Z repeats the previous report's findings verbatim; the fig-U1-8 wordmark and G1 note were already repaired on main (4f36f05ad), so a fresh G3 run should re-measure rather than re-apply.
  - Narrow 360px and A4 print render inspection remains undone; it needs a host allowed to build and run a browser.
  - G1 row stays unticked until the CurriculumOwner formally signs off on D-2026-0063.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
