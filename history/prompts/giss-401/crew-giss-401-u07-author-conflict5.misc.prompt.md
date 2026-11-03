---
id: crew-giss-401-u07-author-conflict5
title: crew fix GISS-401 unit 7
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u07-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/giss-401/sources/texts/quran-translation.md
 - history/prompts/giss-401/crew-giss-401-u07-author-conflict5.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u07-author-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u07-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-07/`.

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
- (giss-401-u07-author-conflict4, fix, opencode) `measure-figure-text` was never run on fig-U7-1..3 (Chromium barred); CI `figure-geometry` is the first measured check.
- (giss-401-u07-author-conflict4, fix, opencode) Urdu `.ur.svg` mirrors and the G3 Islamic Studies scholar review remain open; reading time sits at the top of the 25-40 band (40 min, 41 if rounded up).
- (giss-401-u07-author, author, claude) Reading time is 2+22+16 = 40 min, at the top of the 25-40 band only with round-to-nearest (41 if every page rounds up), so text added at G3 needs the band re-baselined.
- (giss-401-u07-author, author, claude) `sources/texts/quran-translation.md` (U7 section appended at the end) and `tasks.md` stage rows will conflict with sibling GISS-401 unit branches on merge; the hadith use the separate key `sahih-bukhari-33-893`.
- (giss-401-u07-author, author, claude) Figures fig-U7-1..3 were not measured by measure-figure-text (Chromium barred); Urdu `.ur.svg` mirrors and the G3 Islamic Studies scholar review remain open.

## Response snapshot

Merged origin/main into crew/giss-401-u07-author. The only conflict was `specs/content/giss-401/sources/texts/quran-translation.md`, where main appended a Unit 2 bound-passage section and this branch appended the U7-01..U7-03 section at the same trailing position. Resolved by keeping both, main's section first then the branch's, with no lost entries. Regenerated the gitignored `static/content-status.json` (stale after the merge). All 13 content gates pass.

## Outcome

- Impact: fix for GISS-401 Unit 7 by opencode (conflict5).
- Tests: npm run check:content passed 13/13 after regenerating the gitignored content-status report.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: resolved the quran-translation.md conflict by keeping main's Unit 2 bound-passage section and this branch's U7-01..U7-03 section (main first, branch second); regenerated the gitignored `static/content-status.json`; all 13 content gates pass.
- Decisions the team must respect: append-only resolution kept both sides with no entries removed; no ID needed reassignment (D-2026-0001 is pre-existing and identical on both sides; no branch-added G-YYYY-NN or glossary key collided).
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - `measure-figure-text` was never run on fig-U7-1..3 (Chromium barred); CI `figure-geometry` is the first measured check.
  - Urdu `.ur.svg` mirrors and the G3 Islamic Studies scholar review remain open; reading time sits at the top of the 25-40 band (40 min, 41 if rounded up).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none beyond the expected trailing-append conflict.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
