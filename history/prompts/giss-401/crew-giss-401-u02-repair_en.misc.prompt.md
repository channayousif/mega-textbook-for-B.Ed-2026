---
id: crew-giss-401-u02-repair_en
title: crew repair_en GISS-401 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: giss-401
branch: crew/giss-401-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/unit-02/topic-01.mdx
 - docs/semester-3/giss-401/unit-02/unit-assessment.mdx
 - history/prompts/giss-401/crew-giss-401-u02-repair_en.misc.prompt.md
 - specs/content/giss-401/authoring/unit-02.md
 - specs/content/giss-401/reviews/unit-02/G2/20261110T051749123Z-gates.json
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261110T051749123Z/validate-content.txt
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/unit-02.md
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u02-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/giss-401/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

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
From `specs/content/giss-401/reviews/unit-02/G3/20261108T203238Z-g3-desk-82690fcb.json` (disposition: revise). Resolve each one:
- [blocking] F1: Approved non-direct-ruling Ijma/Qiyas summative blueprint is not fulfilled; see review.md finding 1.
- [uncertain] F2: Parent handoff and author session identity absent; authoring commit is recorded as provenance only.
- [uncertain] F3: Required browser, narrow-screen and A4 print evidence unavailable under brief restrictions.
- [uncertain] F4: Full original source contexts not independently verified; bound author excerpts inspected only.
- [uncertain] F5: Required qualified Islamic Studies scholar review not supplied.
- [uncertain] F6: Supplied answers were read before an independent solve; fresh solve-before-key review required.

## Notes from earlier jobs on this unit
- (giss-401-u02-translate, translate, codex) A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.
- (giss-401-u02-translate, translate, codex) A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.
- (giss-401-u02-review_en, review_en, codex) Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
- (giss-401-u02-review_en, review_en, codex) Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
- (giss-401-u02-author-conflict4, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs `.ur.svg` versions.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Repaired GISS-401 Unit 2 by adding classical non-direct-ruling Ijma and Qiyas worked cases to Topic 2.1, updating summative task rubrics and ERQ 1 to fulfill the assessment blueprint, binding Qur'an 62:9, refreshing G2 gate evidence, and appending the advisory revise repairs tracker row.

## Outcome

- Impact: repair_en for GISS-401 Unit 2 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired GISS-401 Unit 2 by adding classical non-direct-ruling Ijma and Qiyas worked cases to Topic 2.1, updating summative task rubrics and ERQ 1 to fulfill the assessment blueprint, binding Qur'an 62:9, refreshing G2 gate evidence, and appending the advisory revise repairs tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Resolved the non-direct-ruling Ijma/Qiyas blueprint gap in English Topic 2.1 and unit assessment so translation may resume.
  - G3 remains unticked pending independent Islamic Studies scholar review, mobile/print inspection, and fresh solve-before-key evaluation.
  - Six Unit 2 SVGs await CI figure-geometry verification and subsequent Urdu `.ur.svg` authoring during translation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
