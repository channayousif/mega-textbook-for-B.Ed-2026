---
id: 20261019-merge-main-content-status
title: Merge main and restore content status
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: efmp-305
branch: crew/efmp-305-u01-repair_en
user: crew
command: crew efmp-305-u01-repair_en-conflict1
labels: ["board-direct", "crew", "codex", "merge", "validation"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-305/20261019-merge-main-content-status.misc.prompt.md
tests:
  - npm run build:content-status (PASS)
  - npm run check:content (all 13 gates PASS)
  - git diff --check origin/main HEAD (PASS)
  - shared registries compared against origin/main (identical)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Referenced crew brief (verbatim)

# Crew job efmp-305-u01-repair_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/efmp-305-u01-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-305-u01-repair_en, repair_en, agy) Fresh independent G3 review should be scheduled for EFMP-305 Unit 1 to evaluate the repaired English text.
- (efmp-305-u01-repair_en, repair_en, agy) Independent G5 Urdu review remains pending; translation_status stays draft across all five files.
- (efmp-305-u01-translate-r1, translate, agy) G5 Urdu review by an independent reviewer is the next step; translation_status stays draft across all 5 files.
- (efmp-305-u01-translate-r1, translate, agy) Bank term 'شمولیتی تعلیم' is strictly adhered to in all files; 8 unbanked concept labels are recorded in specs/content/efmp-305/reviews/unit-01/G4/translation-handoff.md for curriculum owner review.
- (efmp-305-u01-translate-r1, translate, agy) The concept graph file (concepts/unit-01.md) still carries 'شامل تعلیم' for Inclusive Education and should be reconciled by the curriculum owner before G5 review.

## Response snapshot

Fetched origin and merged origin/main at 1d5cc65b without conflicts, preserving earlier unit repairs. Merge commit: 97aa3de3. Shared registries are identical to origin/main, so no entries needed reconciliation or renumbering. Ran npm run build:content-status to regenerate the missing ignored static/content-status.json, then npm run check:content passed every gate. No unit edits or gate-state changes were necessary. No push or PR was performed.

## Outcome

- Impact: Branch includes current main and passes all 13 content gates.
- Tests: Complete content suite PASS; diff whitespace check PASS.
- Files: This PHR is the only new tracked file; content-status.json remains generated and ignored as designed.
- Next prompts: Independent G3 review of the prior English repair, followed by G5 Urdu review.
- Reflection: A fresh checkout needs npm run build:content-status before check:content because the status report is ignored.

## Handoff (for CEO and agents)

- Shipped / changed: Committed main merge and restored the local generated status report; documented validation here.
- Decisions the team must respect: Preserve existing English and Urdu repairs. G3/G5 remain pending and translation_status stays draft. Do not commit the generated report.
- Pending / next owner: Crew lead schedules independent G3 and G5 review. Existing terminology handoff remains for the curriculum owner. Fresh checkouts must regenerate content status before validation.
- Paperclip issues affected: None identified; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Missing ignored generated report in the job checkout.
- Graders run and results (PASS/FAIL): All 13 check:content gates PASS; git diff --check PASS.
- Prompt variant (if applicable): Crew conflict1 brief.
- Next experiment (smallest change to try): None required.
