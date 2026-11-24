---
id: crew-gent-401-u07-author-conflict2
title: crew fix GENT-401 unit 7
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u07-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u07-author-conflict2.misc.prompt.md
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u07-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u07-author conflicts with main (specs/content/gent-401/sources/texts/openstax-entrepreneurship.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-07/`.

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
- (gent-401-u07-author-conflict1, fix, claude_crew) origin/main advanced mid-run to 6f358f0eb (a concurrent Unit 4 job); this branch merged dc10363e9, so a later conflict2 merge against 6f358f0eb will be needed.
- (gent-401-u07-author-conflict1, fix, claude_crew) the merged OpenStax text now has three blocks (Unit 1 notes 1-7, Unit 3 notes 8-11, Unit 7 notes 12-20); its `Consulted:` line still lists only the Unit 1 and Unit 7 sections, so a future job may add main's Unit 3 sections.
- (gent-401-u07-author-conflict1, fix, claude_crew) Unit 7 stays English-only with banner fig-U7-5 prompt-only and G3/G5 unticked; the next job is G3 en-review.
- (gent-401-u07-author, author, claude_crew) the unit banner fig-U7-5 is still prompt-only for the illustrate job; G3 en-review and G4/G5 Urdu are separate jobs, and all six concept Urdu labels are authored (not banked in terminology.csv).
- (gent-401-u07-author, author, claude_crew) `specs/content/gent-401/sources/texts/openstax-entrepreneurship.md` is shared by key across units, so Unit 1's accepted G2 input manifest may now read as stale; `--refresh-stale` is the intended repair and belongs to whichever job touches Unit 1 next.

## Response snapshot

Merged origin/main (6f358f0eb) into crew/gent-401-u07-author. In the shared OpenStax source text, kept main's Unit 4 notes 8-12 and Unit 3 block, kept this branch's Unit 7 notes 12-20, and unioned the `Consulted:` section list (main's sections first, then this branch's additions). In tasks.md, kept main's Units 1-4 status, table row and stage rows and re-added this branch's Unit 7 table row, six stage rows and reading estimate. All 14 content gates pass.

## Outcome

- Impact: fix for GENT-401 Unit 7 by claude_crew (attempt 2).
- Tests: npm run check:content passed (14/14 gates) in the job worktree after the merge commit.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 3a2336bba on crew/gent-401-u07-author resolving the two conflicts against origin/main; no content files touched.
- Decisions the team must respect: the OpenStax evidence file keeps three per-unit note blocks whose numbering restarts (Unit 1 notes 1-7, Unit 3 notes 8-11, Unit 4 notes 8-12, Unit 7 notes 12-20); later jobs should append rather than renumber. G3/G5 stay unticked and advisory.
- Pending / next owner: crew lead (auto-merge when CI is green); next content job on Unit 7 is the G3 en-review.
- Notes for the next job on this unit:
  - `specs/content/gent-401/glossary.json` is absent from this sparse checkout and from both parents, so the branch's Unit 7 glossary keys could not be re-verified against main; check them in a full checkout before relying on them.
  - Unit 7 stays English-only with banner fig-U7-5 prompt-only; Unit 1's accepted G2 input manifest may still read as stale after the shared source text changed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
