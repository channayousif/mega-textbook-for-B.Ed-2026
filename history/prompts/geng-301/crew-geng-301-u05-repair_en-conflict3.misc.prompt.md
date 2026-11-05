---
id: crew-geng-301-u05-repair_en-conflict3
title: crew fix GENG-301 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-301/crew-geng-301-u05-repair_en-conflict3.misc.prompt.md
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u05-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u05-repair_en conflicts with main (specs/content/geng-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-05/`.

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
- (geng-301-u05-repair_en-conflict2, fix, codex) Unit 5 still needs fresh independent G3 review and provenance/render inspection.
- (geng-301-u05-repair_en-conflict2, fix, codex) Unit 5 still needs fresh independent G3 review and provenance/render inspection.
- (geng-301-u05-repair_en-conflict1, fix, opencode) Merge was clean (no overlapping files with origin/main); branch content intact and all 14 content gates pass.
- (geng-301-u05-repair_en-conflict1, fix, opencode) G3 remains open for Unit 5; a fresh independent G3 review is still required after the figure-geometry repair.
- (geng-301-u05-repair_en, repair_en, codex) G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.

## Response snapshot

Merged origin/main, resolved the single tasks.md conflict by keeping both sides' G3 rows, regenerated the gitignored content-status report, and committed the merge.

## Outcome

- Impact: fix for GENG-301 Unit 5 by opencode (attempt 3).
- Tests: npm run check:content passed (14/14 content gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into the branch; resolved the tasks.md conflict by keeping main's Unit 2 G3 row then this branch's Unit 5 G3 row; regenerated static/content-status.json (gitignored) so check:content-status passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 still needs fresh independent G3 review and provenance/render inspection.
  - The merge brought in main's changes to efmp-305 unit-05, efmp-406 unit-03, geng-301 unit-02 and gict-300; they are outside this job's scope but now sit on the branch.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
