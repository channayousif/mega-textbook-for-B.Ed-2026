---
id: crew-geng-301-u03-repair_en-conflict3
title: crew fix GENG-301 unit 3
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/geng-301/tasks.md
 - history/prompts/geng-301/crew-geng-301-u03-repair_en-conflict3.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u03-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u03-repair_en conflicts with main (specs/content/geng-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-03/`.

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
- (geng-301-u03-repair_en-conflict2, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
- (geng-301-u03-repair_en-conflict2, fix, opencode) `static/content-status.json` is generated and untracked; run `npm run build:content-status` after any content-status edit or `check:content` will fail.
- (geng-301-u03-repair_en-conflict1, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
- (geng-301-u03-repair_en-conflict1, fix, opencode) `static/content-status.json` is generated; run `npm run build:content-status` after any content-status edit or `check:content` will fail.
- (geng-301-u03-repair_en, repair_en, codex) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification remain pending.

## Response snapshot

Merged origin/main into crew/geng-301-u03-repair_en, resolved the one conflict in specs/content/geng-301/tasks.md by keeping main's Unit 5 row then this branch's Unit 3 row, regenerated static/content-status.json, and passed all 14 content gates.

## Outcome

- Impact: fix for GENG-301 Unit 3 by opencode (attempt 3, conflict resolution).
- Tests: npm run check:content passed (14/14 gates) after regenerating static/content-status.json.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: resolved the merge conflict in specs/content/geng-301/tasks.md (main's Unit 5 row kept first, this branch's Unit 3 row kept after it), committed the merge, regenerated static/content-status.json, all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this work does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
  - `static/content-status.json` is generated and gitignored; run `npm run build:content-status` after any content-status edit or `check:content` will fail.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
