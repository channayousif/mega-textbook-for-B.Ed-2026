---
id: crew-efmp-301-u03-repair_en-conflict1
title: crew repair_en-conflict1 EFMP-301 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u03-repair_en
user: crew
command: crew repair_en-conflict1
labels: ["crew", "agy", "repair_en", "conflict"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u03-repair_en-conflict1.misc.prompt.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u03-repair_en-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u03-repair_en conflicts with main (specs/content/efmp-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-03/`.

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
- (efmp-301-u03-repair_en, repair_en, codex) Owner must resolve render/glyph and provenance evidence before acceptance.
- (efmp-301-u03-repair_en, repair_en, codex) Owner must resolve render/glyph and provenance evidence before acceptance.
- (efmp-301-u03-review_en, review_en, codex) Advisory tracker row is supplied as an artifact for parent insertion.
- (efmp-301-u03-review_en, review_en, codex) Owner must resolve remaining findings and unavailable render/provenance evidence; G3 stays open.
- (efmp-301-u03-review_en, review_en, codex) Advisory tracker row is supplied as an artifact for parent insertion.


## Response snapshot

Merged origin/main into crew/efmp-301-u03-repair_en, resolved tracker conflict in specs/content/efmp-301/tasks.md by keeping main rows followed by branch advisory row, refreshed content status, and verified all 13 content gates pass.

## Outcome

- Impact: repair_en-conflict1 for EFMP-301 Unit 3 by agy.
- Tests: npm run check:content passed in the job worktree before completing.
- Files: specs/content/efmp-301/tasks.md, history/prompts/efmp-301/crew-efmp-301-u03-repair_en-conflict1.misc.prompt.md.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u03-repair_en, union-resolved tasks.md G3 tracker rows, refreshed content-status, and verified content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - Owner must resolve render/glyph and provenance evidence before acceptance.
  - Unit 3 G3 remains open pending fresh independent review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
