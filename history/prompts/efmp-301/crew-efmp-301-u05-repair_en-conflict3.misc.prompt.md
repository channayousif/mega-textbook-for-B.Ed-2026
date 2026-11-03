---
id: crew-efmp-301-u05-repair_en-conflict3
title: crew fix EFMP-301 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-301
branch: crew/efmp-301-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u05-repair_en-conflict3.misc.prompt.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u05-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u05-repair_en conflicts with main (specs/content/efmp-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-05/`.

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
- (efmp-301-u05-repair_en-conflict2, fix, opencode) Branch already carried conflict1's merge of origin/main (f02fdf6b2); I verified the tasks.md union and shared registries rather than re-merging, and added the conflict2 PHR.
- (efmp-301-u05-repair_en-conflict2, fix, opencode) Unit 5 G2 evidence is fresh at 20261103T044540225Z-gates.json; any further content edit invalidates its manifest.
- (efmp-301-u05-repair_en-conflict2, fix, opencode) Narrow-viewport and A4 print inspection remain pending a live browser run; shared course texts (seifert2009, spielman2020) were left unchanged to protect course-wide G2 manifests.
- (efmp-301-u05-repair_en-conflict1, fix, opencode) specs/content/efmp-301/tasks.md now carries main's newer Unit 5 G3 desk row (`20261102T212207Z-g3-desk-99b62591.json`) after this branch's older advisory row (`20261102T211054Z-g3-desk-5bdd915a.json`); both sides' Unit 2/Unit 5 G2 evidence updates are preserved.
- (efmp-301-u05-repair_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated with `npm run build:content-status`; regenerate it again after any tracker edit or the gate fails as stale.


## Response snapshot

Merged origin/main into crew/efmp-301-u05-repair_en, union-resolved the EFMP-301 tasks.md tracker conflict keeping main's Unit 3/Unit 12 advisory rows before this branch's Unit 5 advisory row, regenerated the gitignored content-status report, ran all 13 content gates green, and committed the PHR.

## Outcome

- Impact: fix for EFMP-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u05-repair_en, union-resolved the EFMP-301 tasks.md tracker conflict keeping main's Unit 3/Unit 12 advisory rows before this branch's Unit 5 advisory row, regenerated the gitignored content-status report, ran all 13 content gates green, and committed the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The conflict3 merge adds main's Unit 3 and Unit 12 advisory rows ahead of this branch's Unit 5 advisory row in specs/content/efmp-301/tasks.md; main's Unit 3/Unit 12 G2 evidence paths and this branch's Unit 5 G2 evidence path are all preserved.
  - Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) were identical on both sides at the merge base, so no ID rewrites were needed.
  - Unit 5 G2 evidence is fresh at 20261103T044540225Z-gates.json; any further content edit invalidates its manifest.
  - Narrow-viewport and A4 print inspection remain pending a live browser run; shared course texts (seifert2009, spielman2020) were left unchanged to protect course-wide G2 manifests.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
