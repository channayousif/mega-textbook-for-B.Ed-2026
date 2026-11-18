---
id: crew-efmp-305-u06-repair_en-r1
title: crew repair_en EFMP-305 unit 6
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u06-repair_en-r1.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-06/G3/20261110-repair-notes.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u06-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-06/`.

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
From `specs/content/efmp-305/reviews/unit-06/G3/20261108T203238Z-g3-desk-2a3b76c3.json` (disposition: revise). Resolve each one:
- [blocking] Unit depth budget: Unit-total estimated reading time is 193 minutes, exceeding the approved depth-budget band of 140–170 minutes by 23 minutes (check:depth-gate exits with code 1). Individual topic estimates are within planning bands (topic-01: 46 min [40–50], topic-02: 53 min [45–55], topic-03: 48 min [45–55]). The unit total requires CurriculumOwner evaluation and course band reconciliation or scope trim.
- [advisory] Research context and local applicability: Empirical studies cited (Fu et al., 2022 in China; Álvarez-Couto et al., 2026 qualitative review in Spain; Khalid et al., 2021 in Punjab; Virani & Ali, 2022 in Pakistan) are appropriately caveated in authored prose regarding sample sizes, qualitative methodology, and non-causal associations.
- [uncertain] Full-text source retrieval for UNICEF (2014): Verification notes at specs/content/efmp-305/sources/texts/unicef2014.md preserve prior-run provenance and paraphrased locators, but continuation retrieval returned HTTP 403. While citations and conceptual use are sound, full-text verification remains pending accessible retrieval.

## Notes from earlier jobs on this unit
- (efmp-305-u06-repair_en-conflict1, fix, opencode) Fresh checkouts need `npm run build:content-status` before `npm run check:content` (the report is gitignored).
- (efmp-305-u06-repair_en-conflict1, fix, opencode) G3 remains unticked pending fresh independent review; Urdu translation remains draft pending independent G5 and fresh rendered inspection.
- (efmp-305-u06-repair_en, repair_en, codex) G3 remains unticked pending fresh independent review.
- (efmp-305-u06-repair_en, repair_en, codex) G3 remains unticked pending fresh independent review.
- (efmp-305-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.


## Response snapshot

Applied the 20261108 G3 report findings for EFMP-305 Unit 6 (depth stale at 149 min, advisory unchanged, UNICEF retrieval reconfirmed with matching SHA-256 and corrected locators in a new review-folder repair note) and appended the advisory tracker row with G3 left unticked.

## Outcome

- Impact: repair_en for EFMP-305 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the 20261108 G3 report findings for EFMP-305 Unit 6 (depth stale at 149 min, advisory unchanged, UNICEF retrieval reconfirmed with matching SHA-256 and corrected locators in a new review-folder repair note) and appended the advisory tracker row with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The shared source records `specs/content/efmp-305/sources/texts/unicef2014.md` and `sources/unit-06.md` stay unchanged because Unit 1 and Unit 6 G2 evidence binds them; editing them requires `node scripts/prepare-gate-evidence.mjs --refresh-stale` after committing.
  - The 20261108 report's `input_manifest` predates commit `24d5f43d7`, so its 193-minute depth finding does not reproduce against current bytes (total 149).
  - G3 stays unticked; fresh independent review, G5, and rendered Urdu inspection remain pending from earlier jobs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
