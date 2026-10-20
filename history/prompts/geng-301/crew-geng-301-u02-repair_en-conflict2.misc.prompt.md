---
id: crew-geng-301-u02-repair_en-conflict2
title: Merge main preserving unit repairs
stage: misc
date: 2026-10-19
surface: agent
model: gpt-6
feature: geng-301
branch: crew/geng-301-u02-repair_en
user: crew
command: carry out .crew/brief.md
labels: ["board-direct", "crew", "codex", "merge"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/geng-301/tasks.md
 - history/prompts/geng-301/crew-geng-301-u02-repair_en-conflict2.misc.prompt.md
tests:
 - npm run check:content (merged branch, three runs)
 - npm run check:content (origin/main baseline)
 - npm run build:content-status (ignored local artifact)
 - git diff --check
 - git merge-base --is-ancestor origin/main HEAD
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Delegated brief (verbatim)

# Crew job geng-301-u02-repair_en-conflict2

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u02-repair_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
- (geng-301-u02-repair_en, repair_en, claude) The wordmark fix was not re-measured with `scripts/measure-figure-text.mjs`, because that script runs Chromium and this job was barred from it; the next G3 reviewer should run it on `static/img/figures/geng-301/unit-02/`.
- (geng-301-u02-repair_en, repair_en, claude) There is no Urdu mirror of Unit 2 yet, so these edits are English only. The content-spec still lists `openstax2021` as the open-access reading; changing that spec is an owner decision that affects all GENG-301 units.
- (geng-301-u02-review_en-conflict1, fix, opencode) GENG-301 Unit 2's 5 blocking G3 revise defects (SVG wordmark overflow, U2-05 summative omission, RRQ 5 mark scheme contradiction, incomplete source declarations) remain from the earlier `agy` review  -  this branch's content was not touched, only the merge and gate fix.
- (geng-301-u02-review_en, review_en, agy) GENG-301 Unit 2 G3 review recorded 5 blocking revise defects: wordmark text overflow in all 16 SVGs under static/img/figures/geng-301/unit-02/, subtopic U2-05 omitted from summative assessments, RRQ 5 mark scheme arithmetic contradiction, and incomplete unverifiable source declarations.
- (geng-301-u02-review_en, review_en, agy) Advisory tracker entry is recorded in specs/content/geng-301/tasks.md leaving G3 unticked and unsigned.

## Response snapshot

Fetched origin and merged origin/main, retaining main's Unit 1 advisory repair row before this branch's Unit 2 advisory repair row. Preserved prior Unit 2 repairs and G2 evidence. Shared registries match main exactly, so no IDs required reassignment. No G3/G5 approval or publication state was changed. No push or PR was made.

## Outcome

- Impact: Resolved the only merge conflict and preserved both repair histories.
- Tests: Initial branch runs passed 12/13 gates with a stale ignored content-status report. Main baseline also passed 12/13 with its ignored report missing. Regenerated the branch report locally; final complete suite passed 13/13.
- Files: Tracker conflict resolution and this prompt record.
- Next prompts: Fresh independent G3 review remains pending.
- Reflection: Keep unrelated generated corpus status findings with their owning jobs.

## Handoff (for CEO and agents)

- Shipped / changed: Main integration committed with both advisory repair entries retained in main-first order.
- Decisions the team must respect: G3/G5 remain open and unsigned; existing main registry entries remain unchanged.
- Pending / next owner: Independent G3 reviewer must validate the existing repairs, including Chromium wordmark measurement. Crew lead owns integration; no push or PR was requested.
- Paperclip issues affected: None identified; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: The first resolution command used unavailable python; corrected with python3 and amended the merge before final checks. Main baseline lacked the ignored generated content-status report; the branch had a stale copy. Regeneration resolves the local failure without tracked corpus changes.
- Graders run and results (PASS/FAIL): check:content PASS (13/13) after regenerating the ignored report; origin/main baseline 12/13 (missing generated report); git diff --check PASS; origin/main ancestor PASS.
- Prompt variant (if applicable): crew conflict2 brief.
- Next experiment (smallest change to try): None within this merge task.
