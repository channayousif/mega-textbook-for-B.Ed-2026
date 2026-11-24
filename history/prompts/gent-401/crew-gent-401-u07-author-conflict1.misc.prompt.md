---
id: crew-gent-401-u07-author-conflict1
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
 - history/prompts/gent-401/crew-gent-401-u07-author-conflict1.misc.prompt.md
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u07-author-conflict1

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
- (gent-401-u07-author, author, claude_crew) the unit banner fig-U7-5 is still prompt-only for the illustrate job; G3 en-review and G4/G5 Urdu are separate jobs, and all six concept Urdu labels are authored (not banked in terminology.csv).
- (gent-401-u07-author, author, claude_crew) `specs/content/gent-401/sources/texts/openstax-entrepreneurship.md` is shared by key across units, so Unit 1's accepted G2 input manifest may now read as stale; `--refresh-stale` is the intended repair and belongs to whichever job touches Unit 1 next.

## Response snapshot

Merged origin/main into crew/gent-401-u07-author and resolved both conflicts. glossary.json auto-merged cleanly (575 entries, no duplicates). In the shared OpenStax source text, main's new Unit 3 evidence block keeps its note numbers 8-11 and this branch's Unit 7 notes move to the next free numbers 12-20 under their own heading, with the Unit 7 use paragraph's references updated. In tasks.md the status header and stage rows combine both sides (main's Unit 2 and Unit 3 rows first, then this branch's Unit 7 rows) and the reading-estimate paragraphs are kept, with the Unit 7 ERQ 4 clause corrected. `npm run check:content` is fully green.

## Outcome

- Impact: fix for GENT-401 Unit 7 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree (all 14 content gates).
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u07-author; resolved the openstax-entrepreneurship.md and tasks.md conflicts by keeping both sides' entries, renumbering this branch's Unit 7 notes 8-16 to 12-20 because main already used 8-11 for Unit 3, and combining the tracker rows and reading estimates.
- Decisions the team must respect: main's Unit 3 notes keep 8-11 and its section heading is untouched; this branch's Unit 7 notes are 12-20. The Unit 7 tracker prose no longer repeats Unit 1's ERQ 4 wording: Unit 7 ERQ 4 is the Evaluate item on a failed pitch and ERQ 5 is the integrative course-project pitch. G3/G5 stay advisory; nothing is certified.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 7 G2 evidence at reviews/unit-07/G2/20261124T060041498Z-gates.json is still fresh at the merge commit: `sources/texts/openstax-entrepreneurship.md` is not in the unit's bound input manifest (its key matches no cited-key pattern), and no Unit 7 bound input changed, so no re-run was needed.
  - Unit 7 remains English-only (no `.ur.svg`, no Urdu mirror); banner `fig-U7-5` is still a prompt-only row for the illustrate job, and G3/G5 are unticked.
  - The shared OpenStax text now carries three evidence blocks (Unit 1 notes 1-7, Unit 3 notes 8-11, Unit 7 notes 12-20); the `Consulted:` line still lists only the Unit 1 and Unit 7 sections, so a future job may add main's Unit 3 sections (5.2, 8.2, 11.1, 11.2) for completeness.
  - glossary.json will keep conflicting for every sibling gent-401 job; the fix is always main's entries first, then the branch's, with no duplicate terms.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
