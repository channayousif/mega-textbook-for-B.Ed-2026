---
id: crew-efmp-408-u06-author-conflict1
title: Merge main and repair EFMP-408 Unit 6 G2 evidence
stage: misc
date: 2026-11-25
surface: agent
model: longcat-2.5
feature: efmp-408
branch: crew/efmp-408-u06-author
user: crew
command: Read .crew/brief.md and carry it out
labels: ["claude_crew", "crew", "efmp-408", "u06", "merge", "g2"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/tasks.md
 - specs/content/efmp-408/reviews/unit-06/G2/20261124T203715644Z-gates.json
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-06/G2/logs-20261124T203715644Z/validate-content.txt
tests:
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Brief (verbatim)

# Crew job efmp-408-u06-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Merged onto main's latest state, crew/efmp-408-u06-author fails npm run check:content (it could not join the hourly batch):
✗ Pipeline gate failed with 1 finding(s):
- EFMP-408 Unit 6 (docs/semester-4/efmp-408/unit-06): G2 en-draft: stale or incomplete input manifest Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-06/`.

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
- (efmp-408-u06-author, author, agy) Topic 6.4 is marked as curriculum enrichment (covering Licensing Objective 5 and NPSTP Standard 5, derived from EED-411).
- (efmp-408-u06-author, author, agy) Eight schematic SVGs are placed with derived dark variants; the unit banner fig-U6-9 remains prompt-only in figures/unit-06.banner.md for the illustrate job.

## Response snapshot

Merged origin/main into crew/efmp-408-u06-author. The only conflict was specs/content/efmp-408/tasks.md; I kept both sides' entries (Unit 1 and Unit 3 from main, Unit 6 from this branch) in main's order then the branch's, with one combined status line and reading estimates for Units 1, 3 and 6. I checked the shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv): neither side changed them since the merge base, so there was nothing to reconcile and no ID collisions. I then diagnosed the remaining pipeline-gate finding: the merge updated the bound source text specs/content/efmp-408/sources/texts/seifert-sutton-2009.md, which changed Unit 6's G2 input manifest (104 keys, one digest changed). I regenerated the G2 gate evidence at the merged HEAD, committed the JSON and its logs, repointed the Unit 6 G2 en-draft tracker row, and reran the gates.

## Outcome

- ✅ Impact: crew/efmp-408-u06-author now merges cleanly onto origin/main and `npm run check:content` passes all 14 gates with no findings.
- 🧪 Tests: `npm run build:content-status` then `npm run check:content` (14 gates, all PASS).
- 📁 Files: specs/content/efmp-408/tasks.md (merge resolution plus G2 row repoint); new specs/content/efmp-408/reviews/unit-06/G2/20261124T203715644Z-gates.json and its logs-20261124T203715644Z/ directory.
- 🔁 Next prompts: the Urdu mirror job (G4) and an independent G3 review of Unit 6; the banner figure fig-U6-9 is still prompt-only.
- 🧠 Reflection: a merge can invalidate gate evidence without touching the unit's own prose, because the bound input set reaches shared source texts. Re-evidence after merging, not just after editing the unit.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main committed; Unit 6 G2 evidence regenerated and tracker row repointed; all content gates green.
- Decisions the team must respect: tasks.md keeps Unit 1, Unit 3 and Unit 6 rows and reading estimates together; the old Unit 6 G2 evidence file 20261124T193548727Z-gates.json is superseded but left in place as history.
- Pending / next owner: G3 independent review and the G4 Urdu mirror for Unit 6; the illustrate job owns banner fig-U6-9.
- Paperclip issues affected: none (links.ticket null).

## Evaluation notes (flywheel)

- Failure modes observed: bound shared source texts changing on main silently stale a unit's G2 manifest; the pipeline gate names the unit but not the changed file.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have prepare-gate-evidence emit the differing manifest keys, so the next merge repair names the cause without a manual diff.
