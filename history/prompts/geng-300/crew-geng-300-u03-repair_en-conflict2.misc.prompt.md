---
id: crew-geng-300-u03-repair_en-conflict2
title: crew fix GENG-300 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: geng-300
branch: crew/geng-300-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/crew-geng-300-u03-repair_en-conflict2.misc.prompt.md
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u03-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-300-u03-repair_en conflicts with main (specs/content/geng-300/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-03/`.

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
- (geng-300-u03-repair_en-conflict1, fix, agy) All three desk-report findings are owner/host handoff items; no author-repairable content defects exist in Unit 3.
- (geng-300-u03-repair_en-conflict1, fix, agy) Fresh independent G3 review requires owner authorisation under ADR-0019 (cycle limit); G3 remains unticked.
- (geng-300-u03-repair_en-conflict1, fix, agy) Branch is level with origin/main and passes all 13 content gates.
- (geng-300-u03-repair_en, repair_en, opencode) All three desk-report findings are owner/host handoff, not author-repairable: author-run identity and parent frozen-bundle handoff unavailable; the D-2026-0019 three-vs-four-unit conflict and the D-2026-00XX intake placeholder need owner clarification; fresh narrow-view/A4 render inspection needs a permitted render host.
- (geng-300-u03-repair_en, repair_en, opencode) No content edit was made because the desk report contains no author-repairable content finding; check:content passes 13/13 and the figure geometry measure exits 0 on all Unit 3 SVGs.

## Response snapshot

Merged origin/main into crew/geng-300-u03-repair_en, union-resolved the one tracker conflict (specs/content/geng-300/tasks.md) with main's Unit 4 row first and this branch's Unit 3 row last, and verified all 13 content gates pass.

## Outcome

- Impact: fix for GENG-300 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed (13/13) after regenerating the git-ignored static/content-status.json.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main into crew/geng-300-u03-repair_en with the append-only tracker conflict resolved; PHR recorded.
- Decisions the team must respect: tracker rows are append-only; on conflict keep both sides, main's rows first, the incoming rows last. G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All three desk-report findings are owner/host handoff items; no author-repairable content defects exist in Unit 3.
  - Fresh independent G3 review requires owner authorisation under ADR-0019 (cycle limit); G3 remains unticked.
  - check:content-status reads the git-ignored static/content-status.json; regenerate it with `npm run build:content-status` in a fresh worktree before judging that gate.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
