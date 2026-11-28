---
id: 20261318
title: EFMP-305 Unit 2 flashcards conflict merge
stage: misc
date: 2026-11-28
surface: agent
model: LongCat-2.5
feature: efmp-305
branch: crew/efmp-305-u02-flashcards
user: crew
command: Read and execute .crew/brief.md
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/flashcards-needed.json
  - history/prompts/efmp-305/20261318-efmp-305-u02-flashcards-conflict1.misc.prompt.md
tests:
  - git merge origin/main (no-op: main still at 015e904d2)
  - git merge-tree --write-tree HEAD origin/crew/batch-20261128-1402 (clean)
  - git merge-tree --write-tree HEAD origin/main (clean)
  - node scripts/build-studio-index.mjs --coverage
  - npm run build:content-status
  - npm run check:content (14 gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The brief, verbatim:

# Crew job efmp-305-u02-flashcards-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-305-u02-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

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
- (efmp-305-u02-flashcards, flashcards, claude) Urdu deck terms copy the topic wording (خرابی, ہینڈی کیپ, لیبلنگ, داغ); if the owner rules on these terms, update `specs/studio/flashcards/efmp-305/unit-02.json` too.
- (efmp-305-u02-flashcards, flashcards, claude) `build-studio-index.mjs --coverage` rewrites other units' tracked `static/studio/flashcards/` files; run `git restore static/studio/flashcards` before committing.
- (efmp-305-u02-review_ur, review_ur, opencode) The escalation is advisory only; all six deterministic gates pass and the bilingual comparison found no material semantic defect. The two blockers are missing page-level render access (accessibility/rtl unverified, no build/dev server/Playwright) and terminology bank departures (Assessment جانچ vs تشخیص, Slow Learner سست طالب علم vs کمزور متعلم, Learning Outcome تعلیمی نتائج vs نتیجہ ہائے تعلم, unbanked Labelling لیبل/لیبلنگ/ٹھپا) needing an owner ruling.
- (efmp-305-u02-review_ur, review_ur, opencode) A human should inspect the eight committed PNGs under `reviews/unit-02/logs-abe274b8/` and run a render-capable G5 pass; the accepted G3 dependency (CMY desk report) is unsigned, so automatic acceptance is not possible.
- (efmp-305-u02-review_en, review_en, agy) G3 advisory review passed on cycle 2; next job on EFMP-305 Unit 2 is independent G5 Urdu review (unit has completed G4 translation mirror).
## Response snapshot

The brief's premise was stale: `git merge origin/main` was a no-op because main
(015e904d2) had not absorbed the change this branch conflicts with. The real
conflict is with open batch PR #967 (`crew/batch-20261128-1402`), which removes
`efmp-302/6` from `specs/studio/flashcards-needed.json` for its own deck, while
this branch removes `efmp-305/2`. The two removals are on adjacent lines, so a
plain edit cannot reconcile them: `git merge-tree` still conflicted after I
tried that. Merged the batch branch, kept both removals, and regenerated the
list with `build-studio-index.mjs --coverage` so it matches the decks present.

## Outcome

- ✅ Impact: the branch now merges cleanly into `origin/crew/batch-20261128-1402` and into `origin/main`, so EFMP-305 Unit 2 can join the next batch.
- 🧪 Tests: all 14 content gates pass; both `git merge-tree` checks clean.
- 📁 Files: one merge commit (`3d76843e0`) resolving `specs/studio/flashcards-needed.json`; the merge also carries batch 20261128-1402's 8 jobs.
- 🔁 Next prompts: crew lead to push and batch (the dispatcher pushes on reap).
- 🧠 Reflection: a conflict in a derived coverage list can only be resolved by a merge commit, never by editing the list, because git sees the two adjacent deletions as one hunk.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit `3d76843e0` on `crew/efmp-305-u02-flashcards`, resolving `specs/studio/flashcards-needed.json` (both `efmp-302/6` and `efmp-305/2` removed).
- Decisions the team must respect: the merge's second parent is `origin/crew/batch-20261128-1402` (PR #967), not `origin/main`, because main had not absorbed it yet. The branch therefore carries that batch's 8 jobs in its history.
- Pending / next owner: crew lead. If PR #967 merges before the next batch, the branch merges as just the EFMP-305 work. If the next batch runs first, it will carry batch 20261128-1402's jobs too, and #967 will already be contained in main. Do not rebase the branch to drop those commits: the merge is what makes the needed-list conflict resolvable.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the generic merge-fix brief says "merge origin/main", which is a no-op while the conflicting batch PR is still open; the worker must find the real conflicting ref.
- Graders run and results (PASS/FAIL): `git merge-tree` vs batch PASS (clean), `git merge-tree` vs main PASS (clean), `npm run check:content` PASS (14/14).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): have `exclusionReason` name the batch ref it actually conflicted with, so the merge-fix brief says "merge origin/crew/batch-<id>" when main has not moved.
