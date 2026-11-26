---
id: crew-social-2026-11-26-roundup-conflict1
title: crew social_roundup conflict resolution SOCIAL unit 11260
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: social
branch: crew/social-2026-11-26-roundup
user: crew
command: crew social_roundup
labels: ["crew", "claude_crew", "social_roundup"]
links:
  spec: specs/content/social/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/social/crew-social-2026-11-26-roundup-conflict1.misc.prompt.md
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

## Response snapshot

Merged origin/main into `crew/social-2026-11-26-roundup` and resolved the single conflict in `specs/social/updates.json`: main's `2026-11-25-feature` platforms fix is byte-identical to this branch's, so the resolution keeps that and retains this branch's appended `2026-11-26-content` entry. Committed the merge, rebuilt `static/content-status.json`, and all 14 content gates pass.

## Outcome

- Impact: social_roundup merge-conflict resolution for SOCIAL Unit 11260 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14/14 gates) after `npm run build:content-status`.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit `f86e565e7` resolving the `specs/social/updates.json` conflict (main's posted platforms for `2026-11-25-feature` plus this branch's `2026-11-26-content` entry), and the PHR for this prompt.
- Decisions the team must respect: the merged ledger keeps main's entry order and adds `2026-11-26-content` last; no entry was removed or renumbered, and no ID on main was reused.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Today's per-platform social cap (3 each) is used, so no further social post should go out until the next PKT day.
  - The host ledger `~/studio-media/social/updates.json` is authoritative; `specs/social/updates.json` is only the git record.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1 (conflict variant)
- Next experiment (smallest change to try): none
