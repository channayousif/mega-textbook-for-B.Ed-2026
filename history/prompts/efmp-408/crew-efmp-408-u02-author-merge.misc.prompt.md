---
id: crew-efmp-408-u02-author-merge
title: merge main into EFMP-408 Unit 2 author branch
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u02-author
user: crew
command: .crew/brief.md
labels: ["crew", "claude_crew", "merge", "efmp-408", "unit-02"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/tasks.md
 - history/prompts/efmp-408/crew-efmp-408-u02-author-merge.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u02-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-408-u02-author conflicts with main (specs/content/efmp-408/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-02/`.

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
- (efmp-408-u02-author, author, claude_crew) Six figures are placed with measured-clean light and dark variants; banner fig-U2-7 stays prompt-only for the illustrate job.
- (efmp-408-u02-author, author, claude_crew) Unit 2 evidence notes live in sources/unit-02.md, not the shared sources/texts excerpts, so Unit 1's G2 evidence stays valid.
- (efmp-408-u02-author, author, claude_crew) Urdu concept labels in concepts/unit-02.md are authored (Validity, Reliability, Bloom's Taxonomy are banked); G4/G5 is the next job.

## Response snapshot

Fetched origin and merged origin/main into the branch. The anticipated conflict did not materialize as a textual clash: main's seven new commits only added EFMP-301 studio files, and both sides' edits to specs/content/efmp-408/tasks.md landed in separate hunks, so the ort strategy merged them cleanly. Verified the merged tracker keeps main's Unit 1 rows and this branch's Unit 2 rows, plus both reading-estimate sentences. Regenerated the ignored content-status report and reran the content gates. No push and no PR.

## Outcome

- Impact: merge of origin/main into crew/efmp-408-u02-author with both sides' tracker entries preserved.
- Tests: npm run build:content-status wrote static/content-status.json; npm run check:content passed all 14 content gates.
- Files: specs/content/efmp-408/tasks.md (merged result); this PHR.
- Next prompts: G4 Urdu translation and independent G3/G5 review for Unit 2 remain open.
- Reflection: the brief predicted a tasks.md conflict, but main had not touched EFMP-408, so the merge was clean.

## Handoff (for CEO and agents)

- Shipped / changed: local merge commit 18754c69c bringing origin/main into the branch, plus this PHR. No publication changes.
- Decisions the team must respect: main's entries are preserved unchanged; no glossary, decision-log, gaps or terminology entries were altered. G3/G5 remain open and unsigned.
- Pending / next owner: G4 Urdu translation, then independent G3 English and G5 Urdu review. Banner figure fig-U2-7 stays prompt-only for the illustrate job.
- Paperclip issues affected: none; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: none. The brief's predicted conflict was stale; main had not modified EFMP-408.
- Graders run and results (PASS/FAIL): PASS: all 14 content gates; git status clean; no conflict markers in the tree.
- Prompt variant (if applicable): crew brief v1 (conflict-resolution variant)
- Next experiment (smallest change to try): none.
