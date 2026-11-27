---
id: crew-efmp-301-u07-flashcards-conflict1
title: crew fix EFMP-301 unit 7
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u07-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u07-flashcards-conflict1.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u07-flashcards.misc.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-301/unit-07.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u07-flashcards-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u07-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-301-u07-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-07/`.

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
- (efmp-301-u07-flashcards, flashcards, claude) The "Slow Learner" card uses the terminology.csv term کمزور متعلم, while Urdu topic 7.2 says سست سیکھنے والا and teaches that slow is not weak; this is the conflict already escalated to the owner.
- (efmp-301-u07-flashcards, flashcards, claude) The "Individual Differences" card uses the terminology.csv term انفرادی اختلافات, which Urdu topic 7.1 shows only through the Glossary tag; a G5 review may check it.
- (efmp-301-u07-flashcards, flashcards, claude) `build-studio-index` rewrites tracked, git-ignored files under `static/studio/flashcards/` for other courses; restore them before committing.
- (efmp-301-u07-review_en-r1, review_en, agy) A permitted host must run render-inspect against a deployment matching HEAD ac3d5e2fc; the deployed SHA 98fbbb064 is stale on Unit 7 prose and 3 illustration assets.
- (efmp-301-u07-review_en-r1, review_en, agy) G3 remains open (ADR-0019 cycle 2 of 2), unticked, reviewer token agent:g3-reviewer, no certification.


## Response snapshot

Resolved the origin/main merge conflict in `specs/studio/flashcards-needed.json` by dropping both independently removed entries (`efmp-301/3` and `efmp-301/7`), committed the merge and its PHR, and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-301 Unit 7 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the origin/main merge conflict in `specs/studio/flashcards-needed.json` by dropping both independently removed entries (`efmp-301/3` and `efmp-301/7`), committed the merge and its PHR, and confirmed all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `specs/studio/flashcards-needed.json` is generated by `node scripts/build-studio-index.mjs --coverage`; a fresh run would also add `efmp-409/3`, `efmp-409/4`, `efmp-409/5` (main added those units without decks). I kept the merge diff to one line, so they are not in the list yet.
  - `build-studio-index` rewrites tracked files under `static/studio/flashcards/` for other courses; I restored them with `git checkout -- static/studio/` before committing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
