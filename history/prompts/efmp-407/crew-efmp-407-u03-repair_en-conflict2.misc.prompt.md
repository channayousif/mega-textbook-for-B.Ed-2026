---
id: crew-efmp-407-u03-repair_en-conflict2
title: crew fix EFMP-407 unit 3
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/topic-01.mdx
 - docs/semester-3/efmp-407/unit-03/topic-02.mdx
 - docs/semester-3/efmp-407/unit-03/topic-03.mdx
 - docs/semester-3/efmp-407/unit-03/unit-assessment.mdx
 - history/prompts/efmp-407/20261160-resolve-efmp407-unit03-repair-en-conflicts.general.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-repair_en-conflict2.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-repair_en.misc.prompt.md
 - history/prompts/general/20261110-efmp-407-u03-repair-en.general.prompt.md
 - specs/content/efmp-407/coverage/unit-03.md
 - specs/content/efmp-407/reviews/unit-03/G2/20261110T021245039Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261110T021245039Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/unesco-2015-gced.md
 - specs/content/efmp-407/sources/unit-03.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u03-repair_en conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

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
- (efmp-407-u03-repair_en-conflict1, fix, opencode) The merge was clean (no manual conflicts); git's ort strategy combined both sides of specs/content/efmp-407/tasks.md correctly, preserving main's entries and the branch's G3 advisory row.
- (efmp-407-u03-repair_en-conflict1, fix, opencode) F3 (narrow-screen/print rendering) and F4 (host provenance) remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
- (efmp-407-u03-repair_en-conflict1, fix, opencode) No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from specs/content/efmp-407/figures/unit-03.illustration-notes.md.
- (efmp-407-u03-repair_en, repair_en, opencode) F3 narrow-screen/print rendering and F4 host provenance remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
- (efmp-407-u03-repair_en, repair_en, opencode) No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.


## Response snapshot

Merged origin/main into crew/efmp-407-u03-repair_en, resolved the single tasks.md conflict by keeping both sides' advisory rows, and left all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-407 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u03-repair_en, resolved the single tasks.md conflict by keeping both sides' advisory rows, and left all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F3 (narrow-screen/print rendering) and F4 (host provenance) remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
  - No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
