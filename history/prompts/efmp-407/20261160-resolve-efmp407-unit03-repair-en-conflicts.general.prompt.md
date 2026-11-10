---
id: 20261160
title: Resolve EFMP-407 Unit 3 repair_en merge conflicts
stage: general
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u03-repair_en
user: crew
command: crew job efmp-407-u03-repair_en-conflict1
labels: [opencode, crew, efmp-407, conflict]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-407/tasks.md
  - history/prompts/efmp-407/crew-efmp-407-u03-repair_en.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-repair_en-conflict1

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
- (efmp-407-u03-repair_en, repair_en, opencode) F3 narrow-screen/print rendering and F4 host provenance remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
- (efmp-407-u03-repair_en, repair_en, opencode) No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.
- (efmp-407-u03-illustrate, illustrate, agy) Placed banner fig-U3-7.webp in English index.mdx; when translation creates the Urdu mirror, wire the banner using the draft snippet in specs/content/efmp-407/figures/unit-03.illustration-notes.md.
- (efmp-407-u03-illustrate, illustrate, agy) English author repairs remain prerequisite for G4 translation to reconcile SDG 5 category guidance and resolve open G3 findings.
- (efmp-407-u03-translate, translate, codex) English author must reconcile SDG 5 category guidance before G4 resumes; draft status remains unchanged.

## Response snapshot

Merged origin/main into crew/efmp-407-u03-repair_en. The merge was clean: git's ort strategy auto-resolved specs/content/efmp-407/tasks.md, keeping main's Unit 3 G2 gates path and the branch's appended G3 advisory row. No conflict markers remain. Regenerated static/content-status.json, then all 14 content gates passed.

## Outcome

- Impact: crew/efmp-407-u03-repair_en now merges cleanly with origin/main; the branch's Unit 3 repair_en work and tracker row are preserved alongside main's.
- Tests: npm run check:content 14/14 PASS after regenerating static/content-status.json.
- Files: merge commit on specs/content/efmp-407/tasks.md and main's incoming changes.
- Next prompts: downstream G3 verification, G4 Urdu translation, G5 Urdu review.
- Reflection: the anticipated tasks.md conflict did not materialize as a manual conflict; the ort strategy combined both sides correctly.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 2f19da614 on crew/efmp-407-u03-repair_en; main's incoming changes integrated with the branch's Unit 3 repair_en work.
- Decisions the team must respect: main's entries were preserved; the branch's Unit 3 content was added alongside, not instead of, main's.
- Pending / next owner: downstream G3 verification, G4 Urdu translation, G5 Urdu review.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; the merge was clean.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): crew conflict brief v1.
- Next experiment (smallest change to try): none.
