---
id: crew-efmp-406-u05-author-conflict5
title: crew fix EFMP-406 unit 5
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u05-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-406/tasks.md
  - history/prompts/efmp-406/crew-efmp-406-u05-author-conflict5.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-406-u05-author-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u05-author conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-05/`.

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
- (efmp-406-u05-author-conflict4, fix, opencode) Unit 5's four figures still have no Urdu `.ur.svg` versions and their concept-graph Urdu labels need G5 review (they use جائزہ for "evaluation" while the terminology bank reserves it inside "Summative Assessment").
- (efmp-406-u05-author-conflict4, fix, opencode) `course-overview.mdx` still says only Unit 1 is available; it was outside this job's scope.
- (efmp-406-u05-author-conflict4, fix, opencode) `specs/content/efmp-406/sources/texts/minott-2011-critical.md` is also added on branch `crew/efmp-406-u02-author`; this branch's version keeps Unit 2 unchanged and appends a Unit 5 section.
- (efmp-406-u05-author, author, claude) `specs/content/efmp-406/sources/texts/minott-2011-critical.md` is also added on branch `crew/efmp-406-u02-author`. This branch keeps Unit 2's text unchanged and adds a Unit 5 section at the end, so if the two conflict, take this branch's version.
- (efmp-406-u05-author, author, claude) Nobody has looked at the four Unit 5 figures on the page yet, and they have no Urdu `.ur.svg` versions. The concept-graph Urdu labels are mostly my own wording and need G5 review. Note that it uses جائزہ for "evaluation", while the terminology bank uses that word inside "Summative Assessment".

## Response snapshot

Merged origin/main into `crew/efmp-406-u05-author`; the only conflict was `specs/content/efmp-406/tasks.md`. Kept main's Unit 3 G3 advisory row first, then this branch's Unit 5 G2/G3/G4/G5 rows. The four shared registries were unchanged on both sides since the merge base, so no renumbering was needed. Regenerated the gitignored `static/content-status.json` and committed the merge; all 13 content gates pass.

## Outcome

- ✅ Impact: fix for EFMP-406 Unit 5 by opencode (attempt 5).
- 🧪 Tests: `npm run check:content` passed on the merged branch (13/13).
- 📁 Files: conflict-resolved `specs/content/efmp-406/tasks.md` and this PHR.
- 🔁 Next prompts: independent G3 review and the Urdu translation job remain separate.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main; resolved the lone `tasks.md` conflict by keeping main's Unit 3 G3 advisory row plus this branch's Unit 5 rows; regenerated the gitignored content-status report; all 13 content gates pass.
- Decisions the team must respect: the four shared registries are byte-identical to origin/main, so no ID renumbering was required; G3/G5 stay open and unsigned.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5's four figures still have no Urdu `.ur.svg` versions and their concept-graph Urdu labels need G5 review (they use جائزہ for "evaluation" while the terminology bank reserves it inside "Summative Assessment").
  - `course-overview.mdx` still says only Unit 1 is available; it was outside this job's scope.
  - `specs/content/efmp-406/sources/texts/minott-2011-critical.md` is also added on branch `crew/efmp-406-u02-author`; this branch's version keeps Unit 2 unchanged and appends a Unit 5 section.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (13/13) on the merged branch.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
