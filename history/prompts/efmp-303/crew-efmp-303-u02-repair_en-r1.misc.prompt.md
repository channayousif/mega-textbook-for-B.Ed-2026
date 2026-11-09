---
id: crew-efmp-303-u02-repair_en-r1
title: crew repair_en EFMP-303 unit 2
stage: misc
date: 2026-11-09
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u02-repair_en-r1.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-02/G3/20261110-repair-notes.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u02-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-303/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-02/`.

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
From `specs/content/efmp-303/reviews/unit-02/G3/20261108T203238Z-g3-desk-0f2a9132.json` (disposition: revise). Resolve each one:
- [blocking] Figure text geometry overflow in English fig-U2-1.svg: Title text exceeds the 780px viewBox by 10.0px (right edge 790.0 > 780.0), visible in both light and dark variants. Remediation is already drafted in PR #150 under issue TEX-74. G3 cannot pass until PR #150 is merged.
- [advisory] External references: Further reading URLs in topic-02.mdx (UNESCO 2015) and topic-03.mdx (World Bank 2018) are accessible external documents; periodic link health checks are recommended.
- [uncertain] Repository-wide check:figures failure: Running check:figures exits with code 1 across the repository due to 454 pre-existing desc/alt mismatches in EFMP-301 and EFMP-304. EFMP-303 Unit 2 itself has 0 figure errors. Under the strict evidence validator, a passing command exit code is required for automated certification; disposition is set to escalate to distinguish local correctness from repository-level gate failure.

## Notes from earlier jobs on this unit
- (efmp-303-u02-repair_en, repair_en, agy) All findings from G3 report 20261102T212207Z-g3-desk-4de29bbc are confirmed resolved; Unit 2 requires a fresh independent G3 review.
- (efmp-303-u02-repair_en, repair_en, agy) Existing G4 Urdu mirror (6 files, 6 figures) remains verified and intact with translation_status set to draft pending independent G5 review.
- (efmp-303-u02-fix, fix, codex) Fresh independent G3 review is required before G5.
- (efmp-303-u02-fix, fix, codex) Fresh independent G3 review is required before G5.
- (efmp-303-u02-translate-r1, translate, codex) Accepted G3 evidence and fresh G5 review with rendered Urdu inspection remain pending.


## Response snapshot

Applied findings of Unit 2 G3 desk review 0f2a9132, recorded repair notes in specs/content/efmp-303/reviews/unit-02/G3/20261110-repair-notes.md, appended the advisory tracker row leaving G3 open in tasks.md, and verified all 14 content gates pass cleanly.

## Outcome

- Impact: repair_en for EFMP-303 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the commit was made.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied findings of Unit 2 G3 desk review 0f2a9132, recorded repair notes in specs/content/efmp-303/reviews/unit-02/G3/20261110-repair-notes.md, appended the advisory tracker row leaving G3 open in tasks.md, and verified all 14 content gates pass cleanly.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All findings from G3 report 20261108T203238Z-g3-desk-0f2a9132 are confirmed resolved; Unit 2 requires a fresh independent G3 review.
  - Existing G4 Urdu mirror (6 files, 6 figures) remains verified and intact with translation_status set to draft pending independent G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
