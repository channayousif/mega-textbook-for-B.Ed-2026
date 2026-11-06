---
id: 20261025
title: Verify unit fifteen merge readiness
stage: misc
date: 2026-11-06
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
  - history/prompts/gqur-301/20261025-verify-unit-fifteen-conflict-five.misc.prompt.md
tests:
  - git fetch origin && git merge origin/main (already up to date)
  - git merge-base --is-ancestor origin/main HEAD (PASS)
  - shared registry comparison against origin/main (identical)
  - git diff --check (PASS)
  - npm run check:content (14/14 PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief executed verbatim:

# Crew job gqur-301-u15-repair_en-conflict5

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
- (gqur-301-u15-repair_en-conflict4, fix, opencode) Unit 15 G3/G5 stay open; F12 rendered accessibility, F13 source bundle and F14 G1 authority remain for the review host, and the Urdu mirror needs a G5 read of the new statistical terminology.
- (gqur-301-u15-repair_en-conflict4, fix, opencode) The merge also pulled in main's repairs for efmp-304 unit 3, gqur-301 units 11/14 and gsos-301 units 3/5; those are main's work, not this branch's.
- (gqur-301-u15-repair_en-conflict3, fix, codex) G3/G5 remain open; existing review-host follow-ups still apply.
- (gqur-301-u15-repair_en-conflict3, fix, codex) G3/G5 remain open; existing review-host follow-ups still apply.
- (gqur-301-u15-repair_en-conflict2, fix, opencode) Unit 15 G3 stays open/unticked; F12 rendered accessibility, F13 source bundle and F14 G1 authority remain for the review host, and the Urdu mirror needs a G5 read of the new statistical terminology.


## Response snapshot

Fetched origin and confirmed main already merged by commit 04c20aec8. No conflict resolution or content edits required. Preserved prior Unit 15 repairs and all main entries. All 14 content gates passed.

## Outcome

- ✅ Impact: Verified existing merge without redundant changes.
- 🧪 Tests: All 14 content gates passed.
- 📁 Files: Added this required PHR only.
- 🔁 Next prompts: Independent review host follow-up remains required.
- 🧠 Reflection: Check ancestry before attempting to resolve a conflict that an earlier job already resolved.

## Handoff (for CEO and agents)

- Shipped / changed: Merge ancestry and unchanged shared registries verified; prior Unit 15 repairs preserved.
- Decisions the team must respect: G3/G5 remain open; no signing, publication or translation status changes.
- Pending / next owner: Review host owns F12 rendered accessibility, F13 source bundle, F14 G1 authority, and G5 statistical terminology review.
- Paperclip issues affected: Crew job gqur-301-u15-repair_en-conflict5; no linked ticket.

## Evaluation notes (flywheel)

- Failure modes observed: Brief anticipated a conflict already resolved by a prior attempt.
- Graders run and results (PASS/FAIL): Ancestry, registry comparison and whitespace PASS; all 14 content gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No additional experiment needed.
