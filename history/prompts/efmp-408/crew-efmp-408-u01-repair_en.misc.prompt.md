---
id: crew-efmp-408-u01-repair_en
title: crew repair_en EFMP-408 unit 1
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-408
branch: crew/efmp-408-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-408/unit-01/topic-01.mdx
 - docs/semester-4/efmp-408/unit-01/topic-02.mdx
 - docs/semester-4/efmp-408/unit-01/topic-03.mdx
 - docs/semester-4/efmp-408/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-01/unit-assessment.mdx
 - specs/content/efmp-408/coverage/unit-01.md
 - specs/content/efmp-408/reviews/unit-01/G2/20261125T170735977Z-gates.json
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261125T170735977Z/validate-content.txt
 - specs/content/efmp-408/sources/unit-01.md
 - specs/content/efmp-408/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u01-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u01-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-408/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-01/`.

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
From `specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json` (disposition: revise). Resolve each one:
- [advisory] unit-assessment.mdx:106 RRQ 4 is tagged *(Remember)*, below the style guide RRQ floor of Understand (specs/content/style-guide.md:248). The demand really is recall, so raise the item to Understand or record the variation.
- [advisory] MCQ answer key never uses option D (A2/B4/C4/D0 across unit-assessment.mdx:36-94). A candidate can eliminate D on all ten items; redistribute at least one key to D.
- [advisory] topic-01.mdx:55, unit-assessment.mdx:54 and :142 cite NPSTP Standard 5, but npstp-2009 is not a Key in specs/content/efmp-408/sources/unit-01.md and has no coverage row. The claim is supported by the course excerpt sources/texts/npstp-2009.md, which is scoped to Unit 6 and so is outside this G3 bundle; add the key and a U1-02 coverage row or declare the limitation.
- [advisory] sources/unit-01.md:12-14 declares scheerens-2003 unverifiable with the retrieval attempt and date, but does not record the owner authorisation that D-2026-0001 requires. Add the ruling citation to match the corpus declaration form.
- [advisory] topic-01.mdx:41 defines assessment as "gathering, documenting and interpreting information about student knowledge, skills, attitudes and beliefs"; the bound HEC note (sources/texts/hec-2013-classroom-assessment.md:8-10) supports "gathering, analysing and interpreting evidence about student learning". Either align the wording or bind a source for the exact phrasing.
- [advisory] topic-01.mdx:78 defines appraisal and adds a Pakistani teacher-education usage (holistic reviews encompassing academic performance, conduct, social interaction and motor participation). The bound note sources/texts/hec-2013-testdev.md:11 only says appraisal integrates multiple forms of evidence, and the bound HEC guides do not define the term. Align the definition with the bound note or bind a source for the usage.
- [uncertain] Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 3910d26161b35a1faf18ce848fd50ab0b4cf59f7 differs from HEAD 7bb9e4d484428859cbfe2f6e3775c0e8291b11ea on docs/semester-4/efmp-408/unit-01/index.mdx and static/img/figures/efmp-408/unit-01/fig-U1-4.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure ge...
- [uncertain] Formative blueprint breach: docs/semester-4/efmp-408/unit-01/topic-02.mdx:108 item 4 and topic-03.mdx:122 item 3 are tagged *(Analyze)*, above the approved formative band Remember/Understand/Apply (specs/content/efmp-408/content-spec.md:98; specs/content/style-guide.md:237). The unit also carries 12 formative items (4 per topic) against the approved 9 (3 per topic, D-2026-0072). The tags match the actual demand, so either reword the two items to the band or record an owner ruling that the band extends.

## Notes from earlier jobs on this unit
- (efmp-408-u01-review_en, review_en, claude_crew) render-review is unavailable because the deploy lags HEAD on `index.mdx` and `fig-U1-4.webp`; a later permitted render job should confirm the live pages once the deploy catches up.
- (efmp-408-u01-review_en, review_en, claude_crew) repair targets are the two Analyze formative items, the 12-vs-9 formative count, RRQ 4, the MCQ D-option gap, and NPSTP/Scheerens provenance; a separate author repairs, then a fresh bundle goes to a fresh reviewer.
- (efmp-408-u01-illustrate, illustrate, agy) Unit 1 G3 en-review and G5 ur-review rows remain open and require fresh independent review runs following figure placements.
- (efmp-408-u01-translate, translate, agy) All six Urdu unit files and twelve SVG variants (light and dark) passed all gates with zero text geometry errors; translation_status remains draft pending independent G5 review.
- (efmp-408-u01-translate, translate, agy) Key terms in index.mdx are bound to terminology.csv; unbanked terms (such as placement assessment / تقرری جانچ and appraisal / قدر پیمائی) are documented in the G4 translation handoff.


## Response snapshot

Applied all seven EFMP-408 Unit 1 G3 r1 content findings in English and Urdu (9 formative items within the approved band, RRQ 4 raised to Understand, two MCQ keys moved to D, NPSTP source and coverage row added, Scheerens ruling cited, assessment and appraisal definitions matched to the HEC notes), refreshed G2 evidence and added the G3 "repairs applied" tracker row; render inspection is still unverified.

## Outcome

- Impact: repair_en for EFMP-408 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all seven EFMP-408 Unit 1 G3 r1 content findings in English and Urdu (9 formative items within the approved band, RRQ 4 raised to Understand, two MCQ keys moved to D, NPSTP source and coverage row added, Scheerens ruling cited, assessment and appraisal definitions matched to the HEC notes), refreshed G2 evidence and added the G3 "repairs applied" tracker row; render inspection is still unverified.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render and print inspection is still unverified; a permitted render job should check the live pages once the deploy matches HEAD.
  - `sources/texts/npstp-2009.md` still lists only its Unit 6 use, on purpose, because Unit 6's G2 evidence includes a hash of that file; the Unit 1 use is recorded in `sources/unit-01.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
