---
id: crew-social-2026-11-26-roundup-conflict1
title: crew fix SOCIAL unit 11260
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: social
branch: crew/social-2026-11-26-roundup
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/social/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/social/crew-social-2026-11-26-roundup-conflict1.misc.prompt.md
 - history/prompts/social/crew-social-2026-11-26-roundup.misc.prompt.md
 - specs/social/updates.json
tests:
 - npm run check:content
---

## Prompt

# Crew job social-2026-11-26-roundup-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/social-2026-11-26-roundup`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/social-2026-11-26-roundup conflicts with main (specs/social/updates.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
SOCIAL Unit 11260 only: its docs/licence and i18n files, its rows and folders under
`specs/content/social/`, and `static/img/figures/social/unit-11260/`.

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
- (social-2026-11-26-roundup, social_roundup, claude_crew) Today's per-platform social cap (3 each) is now used, so no further social post should go out until the next PKT day.
- (social-2026-11-26-roundup, social_roundup, claude_crew) The host ledger `~/studio-media/social/updates.json` is authoritative; `specs/social/updates.json` is only the git record.

## Feedback from the previous attempt
the worker committed only a PHR (history/prompts/); a job must produce its stage's work, and the crew writes the PHR itself


## Response snapshot

Re-fetched and merged the moved `origin/main` (`4994527ed`) into `crew/social-2026-11-26-roundup` as `3dc892b6d`, keeping main's six ledger entries unchanged and in order plus the branch's `2026-11-26-content`, with all 14 content gates green.

## Outcome

- Impact: fix for SOCIAL Unit 11260 by claude_crew (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Re-fetched and merged the moved `origin/main` (`4994527ed`) into `crew/social-2026-11-26-roundup` as `3dc892b6d`, keeping main's six ledger entries unchanged and in order plus the branch's `2026-11-26-content`, with all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `specs/social/updates.json` on this branch is main's six entries unchanged and in order plus the appended `2026-11-26-content`, byte-identical to `~/studio-media/social/updates.json`; a later job must not re-resolve it.
  - The earlier merge `f86e565e7` was contentless for the ledger (the branch already carried main's posted `2026-11-25-feature` values); the fresh merge `3dc892b6d` of the moved main is what gives this branch a work-file diff, so do not collapse the two merges.
  - Today's per-platform social cap (3 each) is used, so no further social post should go out until the next PKT day.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
