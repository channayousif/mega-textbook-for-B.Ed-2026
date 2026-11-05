---
id: 20261024
title: Verify unit fifteen merge and gates
stage: misc
date: 2026-11-05
surface: agent
model: gpt-6
feature: gqur-301
branch: crew/gqur-301-u15-repair_en
user: crew
command: carry out .crew/brief.md
labels: ["codex", "crew", "merge-verification"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gqur-301/20261024-verify-unit15-merge-content.misc.prompt.md
tests:
  - git fetch origin && git merge origin/main (already up to date)
  - npm run check:content (14/14 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief executed:

# Crew job gqur-301-u15-repair_en-conflict3

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u15-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

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
- (gqur-301-u15-repair_en-conflict2, fix, opencode) Unit 15 G3 stays open/unticked; F12 rendered accessibility, F13 source bundle and F14 G1 authority remain for the review host, and the Urdu mirror needs a G5 read of the new statistical terminology.
- (gqur-301-u15-repair_en-conflict2, fix, opencode) The merge pulled in main's repairs for efmp-304 unit 2 and gqur-301 units 12/13; those are main's work, not this branch's.
- (gqur-301-u15-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally after the merge.
- (gqur-301-u15-repair_en-conflict1, fix, opencode) `static/content-status.json` is a gitignored build artifact; regenerate it (`npm run build:content-status`) after any content-affecting merge or `check:content-status` fails.
- (gqur-301-u15-repair_en-conflict1, fix, opencode) The merge pulled in main's repairs for other courses (geng-301 unit 3, gqur-301 unit 8, gsos-301 unit 2); those are main's work, not this branch's.


## Response snapshot

Fetched origin and attempted the requested merge. Current origin/main (9574a8a85) is already an ancestor of HEAD; the earlier merge resolution is preserved. No conflict or registry collision requires changes. All 14 content gates passed; no further repairs were necessary.

## Outcome

- ✅ Impact: Verified existing merge state without unnecessary content changes.
- 🧪 Tests: All 14 content gates passed.
- 📁 Files: This required PHR only.
- 🔁 Next prompts: Independent review host owns remaining Unit 15 review work.
- 🧠 Reflection: Check ancestry before attempting to repeat an already committed conflict resolution.

## Handoff (for CEO and agents)

- Shipped / changed: Verified that current main is already merged; retained earlier repairs.
- Decisions the team must respect: No G3/G5 certification, registry changes, push or PR.
- Pending / next owner: Review host: F12 rendered accessibility, F13 source bundle, F14 G1 authority; Urdu G5 terminology review remains pending.
- Paperclip issues affected: No ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: None in merge: already up to date.
- Graders run and results (PASS/FAIL): PASS: all 14 content gates; origin/main is an ancestor of HEAD.
- Prompt variant (if applicable): gqur-301-u15-repair_en-conflict3
- Next experiment (smallest change to try): None required.
