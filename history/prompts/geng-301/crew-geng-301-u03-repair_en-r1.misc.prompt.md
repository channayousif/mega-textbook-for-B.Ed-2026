---
id: crew-geng-301-u03-repair_en-r1
title: crew repair_en GENG-301 unit 3 round 1
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-301/crew-geng-301-u03-repair_en-r1.misc.prompt.md
 - specs/content/geng-301/reviews/unit-03/G3/20261110-repair-notes.md
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
 - scripts/heavy.sh npm test
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/geng-301/unit-03/*.svg
---

## Prompt

# Crew job geng-301-u03-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/geng-301/reviews/unit-03/G3/20261108T203238Z-g3-desk-2e68277a.json` (disposition: revise). Resolve each one:
- [blocking] Thesis scope contradicts approved spec; unsupported UNESCO claim and print attributions; coverage ID mismatch; ambiguous MCQ 5; RRQ topic floor and scoring defects; mixed conclusion misclassification; missing essay-level evaluation and worked example; disconnected activity sequence. See summary findings 1-9 for repair locators.
- [uncertain] Missing parent-frozen handoff, actual session provenance, exact model version and fresh narrow/print rendering. See summary Input and execution record.

## Notes from earlier jobs on this unit
- (geng-301-u03-repair_en-conflict3, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
- (geng-301-u03-repair_en-conflict3, fix, opencode) `static/content-status.json` is generated and gitignored; run `npm run build:content-status` after any content-status edit or `check:content` will fail.
- (geng-301-u03-repair_en-conflict2, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
- (geng-301-u03-repair_en-conflict2, fix, opencode) `static/content-status.json` is generated and untracked; run `npm run build:content-status` after any content-status edit or `check:content` will fail.
- (geng-301-u03-repair_en-conflict1, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Appended G3 advisory tracker row for report 20261108T203238Z-g3-desk-2e68277a.json, recorded repair notes in specs/content/geng-301/reviews/unit-03/G3/20261110-repair-notes.md, verified all 16 figure SVGs, and confirmed all 14 content gates and vitest unit tests pass.

## Outcome

- Impact: repair_en for GENG-301 Unit 3 by agy (round 1).
- Tests: npm run check:content, scripts/heavy.sh npm test, and figure text measurement passed.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded G3 repair notes for 20261108T203238Z-g3-desk-2e68277a.json and appended open advisory tracker row in specs/content/geng-301/tasks.md.
- Decisions the team must respect: G3 stays open/unticked; no certification or self-signing.
- Pending / next owner: crew lead (merge to main) and fresh independent G3 reviewer.
- Notes for the next job on this unit:
  - G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and browser review remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS, npm test PASS, measure-figure-text PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
