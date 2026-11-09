---
id: crew-efmp-301-u03-repair_en-r1
title: crew repair_en EFMP-301 unit 3
stage: misc
date: 2026-11-09
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u03-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u03-repair_en-r1.misc.prompt.md
 - specs/content/efmp-301/reviews/unit-03/G3/20261110-repair-notes.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u03-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u03-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-03/`.

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
From `specs/content/efmp-301/reviews/unit-03/G3/20261108T203238Z-g3-desk-abd7d7ca.json` (disposition: revise). Resolve each one:
- [blocking] Carry-forward prior finding 9: unit-assessment.mdx RRQ 10 model treats reward for copying, observed failed attempts and writing beyond assisted reach as facts absent from Amjad description. Use conditional hypotheses, explicit evidence checks and credit for defensible alternatives; oral competence alone does not prove performance with help.
- [blocking] unit-assessment.mdx ERQ rubrics 1-5 award four marks partly for writing within the word count, but none of the five unit-end prompts specifies a count. State the applicable length requirement or remove the scoring condition; topic-task counts do not automatically govern this bank.
- [blocking] topic-03 Summary and fig-U3-6 note collapse observational learning and its performance by requiring reproduction and motivation for any learning; topic-01 corridor account treats an ambiguous silence response as necessarily involuntary. Distinguish acquiring/retaining knowledge from performing it, and present classroom mechanisms as hypotheses where consequences may also explain silence.
- [advisory] coverage/unit-03.md Reinforcement mislabels Bandura under Pavlov U3-2 and Bruner modes under ZPD U3-11; inspect the intended concept when correcting mappings. index.mdx How to use this unit also claims Topic 3.1 begins a refusal case, while that topic opens with footsteps and a star chart.
- [uncertain] Carry-forward prior finding 5: unsupported Vosniadou coverage bindings remain for U3-5/U3-6/U3-10 in coverage/unit-03.md despite corrected sources registry. Bound vosniadou2001.md contains only developmental differences, not the claimed cognitive/schema/constructivist passages. Parent must reconcile the coverage rows with actual bound source support.
- [uncertain] Current rendered desktop, narrow and A4 print evidence plus glyph geometry are unavailable because the brief forbids builds, servers and Playwright. Accessibility remains unverified, including prior finding 12 cosmetic contact. Do not infer success from gates or old screenshots.
- [uncertain] Actual author-run identity, parent frozen handoff and exact model build not supplied. Commit provenance and local manifest are recorded transparently in limitations.md; reviewer did not author candidate bytes. Owner must resolve provenance before any acceptance.

## Notes from earlier jobs on this unit
- (efmp-301-u03-repair_en-conflict1, fix, agy) Owner must resolve render/glyph and provenance evidence before acceptance.
- (efmp-301-u03-repair_en-conflict1, fix, agy) Unit 3 G3 remains open pending a fresh independent review cycle.
- (efmp-301-u03-repair_en, repair_en, codex) Owner must resolve render/glyph and provenance evidence before acceptance.
- (efmp-301-u03-repair_en, repair_en, codex) Owner must resolve render/glyph and provenance evidence before acceptance.
- (efmp-301-u03-review_en, review_en, codex) Advisory tracker row is supplied as an artifact for parent insertion.


## Response snapshot

Applied findings of Unit 3 G3 desk review abd7d7ca, recorded repair notes in specs/content/efmp-301/reviews/unit-03/G3/20261110-repair-notes.md, appended the advisory tracker row leaving G3 open in tasks.md, and verified all 14 content gates pass cleanly.

## Outcome

- Impact: repair_en for EFMP-301 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied findings of Unit 3 G3 desk review abd7d7ca, recorded repair notes in specs/content/efmp-301/reviews/unit-03/G3/20261110-repair-notes.md, appended the advisory tracker row leaving G3 open in tasks.md, and verified all 14 content gates pass cleanly.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner must resolve render/glyph accessibility and model provenance evidence before final acceptance.
  - Unit 3 G3 remains open and unticked pending a fresh independent review cycle.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
