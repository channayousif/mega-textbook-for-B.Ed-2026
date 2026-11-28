---
id: crew-efmp-409-u03-repair_en
title: crew repair_en EFMP-409 unit 3
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-409
branch: crew/efmp-409-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude_crew", "repair_en"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-409/unit-03/topic-04.mdx
 - docs/semester-4/efmp-409/unit-03/topic-05.mdx
 - docs/semester-4/efmp-409/unit-03/topic-06.mdx
 - docs/semester-4/efmp-409/unit-03/unit-assessment.mdx
 - docs/semester-4/efmp-409/unit-03/unit-teacher-notes.mdx
 - history/prompts/efmp-409/crew-efmp-409-u03-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/unit-teacher-notes.mdx
 - specs/content/efmp-409/concepts/unit-03.md
 - specs/content/efmp-409/coverage/unit-03.md
 - specs/content/efmp-409/figures/unit-03.md
 - specs/content/efmp-409/reviews/unit-03/G2/20261127T234857426Z-gates.json
 - specs/content/efmp-409/reviews/unit-03/G2/20261127T235736825Z-gates.json
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-concept-graph.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-depth-gate.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-docs-sync.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-figures.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/check-no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T234857426Z/validate-content.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-concept-graph.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-depth-gate.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-docs-sync.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-figures.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/check-no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-03/G2/logs-20261127T235736825Z/validate-content.txt
 - specs/content/efmp-409/sources/unit-03.md
 - specs/content/efmp-409/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u03-repair_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-409/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-03/`.

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
From `specs/content/efmp-409/reviews/unit-03/G3/20261127T192818Z-g3-desk-5c9d1a52.json` (disposition: revise). Resolve each one:
- [blocking] MCQ answer-key pattern (unit-assessment.mdx:37-86, key at :113-122). The key is B for 9 of the 10 items (only item 7 is A; no C or D key at all), and the keyed option is the longest option in 9 of the 10 items (item 1 tied-longest, item 7 not). The item-writing reference names "the longest option being correct" as a giveaway to avoid. A learner who always picks the longest B option scores 9/10 without reading the unit. Repair: reorder options so the key is balanced across A-D and no option-length cue remains.
- [blocking] Assessment trace mis-mapping. specs/content/efmp-409/coverage/unit-03.md:52 assigns MCQ-07 to U3-12 (Ibn Khaldun), and :54-55 assign MCQ-08 and MCQ-09 to U3-14 and U3-15 (Iqbal); specs/content/efmp-409/concepts/unit-03.md:15-17 repeats the assignments. The actual items are MCQ-07 Dewey, MCQ-08 and MCQ-09 Ibn Khaldun, and MCQ-10 Iqbal. Repair: re-map MCQ-07 to U3-11, MCQ-08 and MCQ-09 to U3-12, and MCQ-10 to U3-14 or U3-17 as the content actually supports.
- [blocking] MCQ per-topic spread. The approved blueprint (specs/content/efmp-409/content-spec.md:262) requires MCQs >= 1 per topic. As written, the ten MCQs leave one of topics 3.5 and 3.6 without an MCQ (the only candidate, MCQ-10, is assigned by the coverage matrix to U3-17 in topic 3.6, so topic 3.5 has none). Repair: reassign or add an item so every topic carries at least one MCQ.
- [blocking] Missing Bloom tags in topic 3.6. docs/semester-4/efmp-409/unit-03/topic-06.mdx:138-140 carries three ## Check your understanding items with no Bloom tag, while every other topic tags all three. Constitution Art. III.3 requires every assessment item to carry a Bloom tag, and check:bloom-bands only scans unit-assessment.mdx, so the gate passes over the omission. Repair: tag the three items.
- [advisory] Terminology inconsistency. The unit switches between at-tadrij (topic-04.mdx:71,112,119,123,129,144) and al-tadarruj (unit-teacher-notes.mdx:30; unit-assessment.mdx:79,121), and between malaka (topic-04.mdx:76) and malakah (topic-06.mdx:110; unit-assessment.mdx:29,149). The style guide asks for one term per concept within a unit.
- [advisory] Iqbal quotation presented as verbatim. topic-05.mdx:63 writes "As Iqbal wrote: "Intellect without love is demonic; intellect with love is divine."" Web and encyclopaedic sources circulate the sentence as Iqbal's, but none traces it to a named work; it reads as a paraphrase of the aql/ishq synthesis. Attribute it as a paraphrase or source the wording.
- [advisory] Sources declaration inaccurate. sources/unit-03.md:3 states "quotations are under 15 words and cited". The Emile opening at topic-03.mdx:51 is 20 words and the Dewey definition at topic-04.mdx:56 is 24 words. Both are public-domain primary works attributed to the author, so this is an inaccurate declaration rather than a copyright problem.
- [advisory] Figure manifest alt typo. specs/content/efmp-409/figures/unit-03.md:11 records the fig-U3-5 alt text as "sensORY training"; the placed SVG <desc>, the page alt (topic-03.mdx:31) and the manifest row disagree. The placed asset says "sensory".
- [advisory] Practical-work attribution. unit-teacher-notes.mdx:50 says "The HEC course guide mandates four categories of practical coursework for Unit 3". The guide's Unit 3 section lists teaching methodology only (FoundationsEd_Sept13.txt:1030-1033); the four categories are the unit's own framing of the course-level approaches at :696-706. Imprecise attribution, not a misquotation.
- [advisory] SEP scope. The SEP entries cited for U3-02, U3-03, U3-04, U3-05, U3-08 and U3-09 do not contain the educational detail the unit teaches (Plato's curriculum stages, Aristotle's habituation and public schooling, Rousseau's age stages). The detail is attributed in prose to the named primary works (The Republic, Nicomachean Ethics, Politics, Emile), which is defensible, but the sources table presents the SEP entries as the support for those leaves.
- [advisory] Stale citation years in topic-06. topic-06.mdx:183-190 cites Bertram (2020), Curren (2018), Hildebrand (2021), Kraut (2022) and Shields (2022), while topics 3.1 to 3.5, the sources table and the live SEP entries give Bertram 2010/2023, Curren 2025, Hildebrand 2018/2024, Kraut 2004/2026 and Shields 2008/2020.
- [advisory] Undefined specialised terms. topic-06.mdx:45-63 and unit-teacher-notes.mdx:23 use sociopedagogy, theocentric, anthropocentric and reconstructionism without a definition, and glossary.json has no entry for them. The surrounding prose carries the meaning, but the HSC register rule (Constitution Art. III.1) is strained.
- [uncertain] Render and print inspection unavailable. Deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 895cc30bc6b9edbc87b56365f50f479c8939d049 on docs/semester-4/efmp-409/unit-03/index.mdx and static/img/figures/efmp-409/unit-03/fig-U3-13.webp, so the CI-built production site is not the reviewed input; the brief also forbids building or serving the site from a review job. render-review is recorded as unavailable (exit 1) in logs/render-review.txt and render-verify/render-verify.txt. Narrow-viewport scrolling, A4 print clipping and visual accessibility of the current bytes remain ...

## Notes from earlier jobs on this unit
- (efmp-409-u03-review_en, review_en, claude_crew) A separate author must repair the four blocking findings, then a fresh reviewer rechecks; the MCQ key/remap work is the priority.
- (efmp-409-u03-review_en, review_en, claude_crew) Render and print evidence needs the reviewed commit deployed (or an owner-run build) before any further G3 attempt; the advisory tracker row is in `advisory-tracker-row.md` and is not yet appended to `tasks.md`.
- (efmp-409-u03-illustrate, illustrate, agy) G2 gate evidence for Unit 3 refreshed to 20261125T225553825Z-gates.json with full logs committed.
- (efmp-409-u03-illustrate, illustrate, agy) Unit banner fig-U3-13 is placed in English and Urdu index.mdx; Unit 3 G3 review and G5 review remain open for independent evaluation.
- (efmp-409-u03-illustrate, illustrate, agy) G5 must inspect rendered Urdu pages at 360 px and A4, verify proposed terms, the 13 authored Urdu concept labels, and the Islamic-content scholar check.


## Response snapshot

Applied the EFMP-409 Unit 3 G3 report's four blocking findings and its advisories in English and Urdu, redistributing the MCQ keys across A-D with no length cue, correcting the assessment traces and Bloom tags, standardising terminology, and refreshing the G2 gate evidence, with `npm run check:content` green.

## Outcome

- Impact: repair_en for EFMP-409 Unit 3 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the EFMP-409 Unit 3 G3 report's four blocking findings and its advisories in English and Urdu, redistributing the MCQ keys across A-D with no length cue, correcting the assessment traces and Bloom tags, standardising terminology, and refreshing the G2 gate evidence, with `npm run check:content` green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render and print inspection stays unverified; it needs this commit deployed (or an owner-run build) and a permitted render job.
  - The SEP bound notes under `specs/content/efmp-409/sources/texts/` still describe the curriculum and habituation detail as SEP-supported; `sources/unit-03.md` now attributes that detail to the primary works, so a fresh reviewer may reconcile the two.
  - MCQ-06 was rebuilt as a Dewey-Ibn Khaldun convergence item traced to U3-18; if a fresh reviewer prefers U3-17 for the comparative item, it is a one-line trace change.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
