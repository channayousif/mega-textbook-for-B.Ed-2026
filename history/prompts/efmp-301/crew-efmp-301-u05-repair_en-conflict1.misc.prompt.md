---
id: crew-efmp-301-u05-repair_en-conflict1
title: crew repair_en conflict resolution EFMP-301 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-301
branch: crew/efmp-301-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u05-repair_en-conflict1.misc.prompt.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u05-repair_en-conflict1

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
- (efmp-301-u05-repair_en, repair_en, agy) Unit 5 G2 gate evidence refreshed to 20261103T044540225Z-gates.json; any further content edit will invalidate its manifest.
- (efmp-301-u05-repair_en, repair_en, agy) All 16 Unit 5 SVGs pass measure-figure-text cleanly (fig-U5-1 widest text 768.4px in 780px viewBox); narrow-viewport and print inspection remain pending live browser run.
- (efmp-301-u05-repair_en, repair_en, agy) Shared course texts (seifert2009, spielman2020) were left unchanged to protect course-wide G2 manifest validity across units 2-12.
- (efmp-301-u05-review_en-conflict1, fix, agy) Unit 5 second-cycle G3 review is recorded with an escalation finding; authorised review cycles are exhausted, awaiting owner action.
- (efmp-301-u05-review_en, review_en, codex) Owner action required for unresolved source, blueprint, geometry and review-evidence findings; the authorised review cycles are exhausted.

## Response snapshot

Merged origin/main into crew/efmp-301-u05-repair_en, union-resolved the EFMP-301 tasks.md tracker conflict so both sides' rows survive, regenerated the gitignored content-status report, and verified all content gates pass.

## Outcome

- Impact: repair_en conflict resolution for EFMP-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed after the merge and content-status regeneration.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u05-repair_en; resolved the sole conflict in specs/content/efmp-301/tasks.md by keeping main's eight new G3 desk rows then this branch's Unit 5 advisory row, with both sides' Unit 2/Unit 5 G2 evidence updates preserved; regenerated static/content-status.json (gitignored) so check:content-status passes.
- Decisions the team must respect: the merge is a union resolve, not a content change; G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The merged tasks.md now carries main's newer Unit 5 G3 desk row (20261102T212207Z-g3-desk-99b62591.json) after this branch's older advisory row; the advisory row refers to 20261102T211054Z-g3-desk-5bdd915a.json.
  - static/content-status.json is gitignored and must be regenerated with `npm run build:content-status` after any tracker edit.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
