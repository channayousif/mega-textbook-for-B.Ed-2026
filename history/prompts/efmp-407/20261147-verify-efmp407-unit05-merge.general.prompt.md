---
id: 20261147
title: Verify EFMP-407 Unit 5 merge already resolved
stage: general
date: 2026-11-07
surface: agent
model: longcat-2.0
feature: efmp-407
branch: crew/efmp-407-u05-author
user: M Yousif Channa
command: crew job efmp-407-u05-author-conflict2
labels: [opencode, crew, efmp-407, conflict]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-407/20261147-verify-efmp407-unit05-merge.general.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u05-author conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-05/`.

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
- (efmp-407-u05-author-conflict1, fix, opencode) Banner fig-U5-7 is still prompt-only in specs/content/efmp-407/figures/unit-05.banner.md and needs an illustrate job; G3/G4/G5 remain open.
- (efmp-407-u05-author-conflict1, fix, opencode) The shared UNESCO 2017 source note now serves both Unit 2 and Unit 5; future merges must preserve both units' passages.
- (efmp-407-u05-author-conflict1, fix, opencode) tasks.md's "Unit 2 backward-design alignment" table still contains Unit 1 rows from main (pre-existing copy-paste, preserved verbatim per the brief, not fixed here).
- (efmp-407-u05-author, author, agy) Banner illustration fig-U5-7 is planned in specs/content/efmp-407/figures/unit-05.banner.md as prompt-only; requires an illustrate job.
- (efmp-407-u05-author, author, agy) Stages G3 (English review), G4 (Urdu translation), and G5 (Urdu review) remain open for downstream reviewer and translation sessions.

## Response snapshot

Checked the branch against origin/main. HEAD already contains origin/main (dceb57979) through the conflict1 merge commit 50b12e167, so `git merge origin/main` reports "Already up to date" and no conflicts remain. Verified the existing resolutions: the UNESCO 2017 source note carries both the Unit 2 support/limits and the Unit 5 passages, tasks.md keeps main's Unit 1 and Unit 2 rows and sections plus the branch's Unit 5 rows, the colliding PHR was renumbered 20261144 -> 20261145 with its references updated, and the shared registries are unchanged from main. All 14 content gates pass.

## Outcome

- Impact: confirmed crew/efmp-407-u05-author is fully merged with origin/main and clean; no new content changes were needed.
- Tests: npm run check:content 14/14 PASS.
- Files: one PHR recording the verification.
- Next prompts: G3 English review, G4 Urdu translation, G5 Urdu review, banner illustration for fig-U5-7.
- Reflection: conflict2 was dispatched after conflict1 had already resolved the same collision; the branch was already up to date.

## Handoff (for CEO and agents)

- Shipped / changed: verified the existing merge and recorded this PHR.
- Decisions the team must respect: no content changes were made; main's entries remain untouched.
- Pending / next owner: downstream G3/G4/G5 jobs and the banner illustrate job for fig-U5-7.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a duplicate conflict job can be dispatched when the first merge already resolved the collision.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): crew conflict brief v1.
- Next experiment (smallest change to try): have the dispatcher check whether the branch already contains origin/main before spawning a conflict job.
