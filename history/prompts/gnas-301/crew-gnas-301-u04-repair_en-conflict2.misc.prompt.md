---
id: crew-gnas-301-u04-repair_en-conflict2
title: Merge main into unit four
stage: misc
date: 2026-10-19
surface: agent
model: GPT-6
feature: gnas-301
branch: crew/gnas-301-u04-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["crew", "codex", "merge"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gnas-301/crew-gnas-301-u04-repair_en-conflict2.misc.prompt.md
tests:
 - scripts/heavy.sh npm run check:content (branch and origin/main)
 - npm run build:content-status (ignored local artifact)
 - git diff --check
 - Shared registries identical to origin/main
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief (verbatim):

# Crew job gnas-301-u04-repair_en-conflict2

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u04-repair_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-04/`.

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
- (gnas-301-u04-repair_en, repair_en, codex) G3 remains unticked; a third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-repair_en, repair_en, codex) G3 remains unticked; a third review cycle requires owner authorization under G-2026-31.

## Response snapshot

Merged origin/main without conflicts, preserving previous Unit 4 repairs. Shared registries match main, with no ID collisions. Branch and main both pass 12 gates and fail only check:content-status because static/content-status.json is stale on the branch and missing in the clean main worktree. Regenerated the ignored local report and reran all content gates successfully. No push or PR.

## Outcome

- Impact: Branch synchronized; no additional content-gate findings.
- Tests: Initial full check:content runs on branch and main: 12 PASS and 1 baseline FAIL each. After local report regeneration, all 13 branch gates PASS; git diff --check PASS.
- Files: Merge plus this PHR; no new unit edits required.
- Next prompts: Owner authorization for third G3 cycle remains pending.
- Reflection: Verify baseline before editing corpus-wide generated files outside unit scope.

## Handoff (for CEO and agents)

- Shipped / changed: Merged main while retaining existing Unit 4 repairs.
- Decisions the team must respect: G3/G5 remain open; shared registries unchanged; no certification or publication changes.
- Pending / next owner: The ignored content-status report must be regenerated per worktree. Curriculum owner controls third G3 cycle under G-2026-31.
- Paperclip issues affected: None supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Generated content-status report is stale locally and absent in clean main.
- Graders run and results (PASS/FAIL): Initial 12/13 content gates PASS on branch and main; final branch run 13/13 PASS after regenerating the ignored report. Whitespace PASS.
- Prompt variant (if applicable): Crew conflict2 brief.
- Next experiment (smallest change to try): None needed for this merge.
