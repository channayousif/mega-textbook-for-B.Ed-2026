---
id: crew-efmp-406-u03-repair_en-conflict1
title: crew fix EFMP-406 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-03/index.mdx
 - docs/semester-3/efmp-406/unit-03/topic-01.mdx
 - docs/semester-3/efmp-406/unit-03/topic-02.mdx
 - docs/semester-3/efmp-406/unit-03/unit-assessment.mdx
 - history/prompts/efmp-406/crew-efmp-406-u03-repair_en.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u03-repair_en-conflict1.misc.prompt.md
 - history/prompts/general/2447-efmp-406-u03-repair-en.general.prompt.md
 - specs/content/efmp-406/coverage/unit-03.md
 - specs/content/efmp-406/glossary/unit-03.json
 - specs/content/efmp-406/reviews/unit-03/G2/20261103T182710608Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261103T182710608Z/validate-content.txt
 - specs/content/efmp-406/sources/texts/ashraf-2021-multilingual.md
 - specs/content/efmp-406/sources/texts/papen-2023-nls.md
 - specs/content/efmp-406/sources/unit-03.md
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u03-repair_en conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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
- (efmp-406-u03-repair_en, repair_en, claude) The Papen and Ashraf source files previously held invented quotes; both are now real quotes, and Ashraf must not be cited for reading outcomes, dropout or MTB-MLE effects.
- (efmp-406-u03-repair_en, repair_en, claude) No source is attached for the literacy event/practice or dominant/vernacular terms (Topic 3.1 presents them as working terms); a later job could add Barton and Hamilton.
- (efmp-406-u03-repair_en, repair_en, claude) A fresh G3 review needs a complete frozen bundle including `sources/texts`, plus rendered 360px/A4 evidence; the Urdu job (G4) should translate from these revised files.
- (efmp-406-u03-translate, translate, codex) Author must repair English/source defects before G4 resumes; G3/G5 remain open.
- (efmp-406-u03-translate, translate, codex) Author must repair English/source defects before G4 resumes; G3/G5 remain open.

## Response snapshot

Merged origin/main into the branch and found it already up to date: origin/main b7f563c7c is an ancestor of HEAD 20f9e7fae, so the reported tasks.md conflict does not reproduce against main and no merge commit was required. Ran `npm run check:content`: all 14 content gates pass. Committed this PHR as the conflict-fix record.

## Outcome

- Impact: fix for EFMP-406 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed (14 of 14 gates).
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the branch already contains origin/main (no conflict to resolve), passed all 14 content gates, and committed the conflict-fix PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). Batch PR #439 (crew/batch-20261103-1902) is open and will advance main with the Unit 2 tracker updates; a later merge of main may conflict again in specs/content/efmp-406/tasks.md and need the append-only union resolution (main's rows first, then this branch's).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
