---
id: crew-gent-401-u07-repair_en
title: crew repair_en GENT-401 unit 7
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u07-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-07/topic-01.mdx
 - docs/semester-4/gent-401/unit-07/topic-02.mdx
 - docs/semester-4/gent-401/unit-07/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
 - history/prompts/gent-401/crew-gent-401-u07-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
 - specs/content/gent-401/figures/unit-07.md
 - specs/content/gent-401/reviews/unit-07/G2/20261128T043339860Z-gates.json
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261128T043339860Z/validate-content.txt
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.ur.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.ur.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u07-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u07-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gent-401/reviews/unit-07/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 7 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-07/`.

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
From `specs/content/gent-401/reviews/unit-07/G3/20261127T192818Z-g3-desk-ccff9884.json` (disposition: revise). Resolve each one:
- [blocking] F1 topic-02.mdx:38-49 Hira's 'three-minute' worked pitch: row times sum to 200 s (3 min 20 s); the ask of Rs 60,000 for four corners cannot be derived from the model row (18,000 per corner gives 72,000 total, 48,000 school share, 24,000 sponsor share), and the market row has three willing schools while the ask funds four. The same topic (line 65) tells learners to use numbers that can be checked. Repair: make times total 180 s and make the ask follow from the stated figures or explain it.
- [blocking] F2 fig-U7-2.svg node-accident circle at (620,390) sits in the high-likelihood, low-impact quadrant, but topic-01.mdx:84 reads it as 'Low on both: accept'. The quadrant list (topic-01.mdx:79-84) names a 'Medium on both' quadrant and omits high likelihood/low impact; the caption folds it into 'accept the rest'. Repair: align figure and prose and give guidance for every quadrant (OpenStax Figure 13.11 is a 3x3 grid).
- [blocking] F3 Pitch-part count is inconsistent: fig-U7-3 title 'Seven parts', topic-02.mdx:94 and :100, RRQ 8 (unit-assessment.mdx:92) and the ERQ 4 rubric say seven, but the worked table (topic-02.mdx:40-49) has eight rows including Next step and topic-02.mdx:69 says 'the eight parts above'. Repair: state once whether the next step is a part and use the same count everywhere.
- [blocking] F4 Rubric/task misalignment: ERQ 1 criterion 'Judgement on taking the chance' (unit-assessment.mdx:145, 3 of 12 marks) scores a decision ERQ 1 (line 98) does not ask for; ERQ 5 criterion 'Ask and next step' (line 180) requires a next step that ERQ 5 (line 102) does not request. Repair: align each task with its rubric.
- [blocking] F5 MCQ 3 (unit-assessment.mdx:42) asks for 'one of the three shifts as a venture's team grows' but topic-01.mdx:38 teaches that 'The shift runs in two directions'; the stem states a count the text contradicts. The MCQ 4 rationale (line 113) relies on 'market penetration', which the unit never teaches.
- [blocking] F6 topic-01.mdx:50 puts altered wording inside quotation marks: 'managing cash, delegating tasks to others, and ensuring the right people and systems are in place'. OpenStax 10.5 reads 'manage cash, delegate tasks to others, and ensure the right people and systems are in place'. Bound note 12 (sources/texts/openstax-entrepreneurship.md:61) repeats the altered form. Repair: quote exactly or paraphrase.
- [blocking] F7 topic-02.mdx:67 attributes to OpenStax 7.3 that investors value a team that can 'admit what it still has to learn'. The market half is supported ('what makes a market good'), but no 7.3 passage about admitting what the team does not know was found, and bound notes 16-18 do not record one. Repair: remove the attribution or cite a supporting passage.
- [blocking] F8 fig-U7-4: the alt text (topic-02.mdx:85) and lead-in (topic-02.mdx:83, 'links each do and don't to the skill behind it') and the content-spec figure plan say each row is linked to a communication skill, but the SVG has only Do and Don't columns and no skill names. A learner cannot recover the claimed link. Repair: add the skill per row (EN and .ur.svg) or correct the prose and alt text.
- [advisory] A1 MCQ key distribution A2/B6/C2/D0; an all-B response scores 6/10. The style guide sets no balance rule, but the skew rewards guessing.
- [advisory] A2 topic-02.mdx:81 'A honest' and 'a invented figure' should read 'An honest' and 'an invented figure'.
- [advisory] A3 topic-01.mdx:71 and :73 state the same natural/economic/human grouping twice in consecutive paragraphs.
- [advisory] A4 topic-02.mdx:36 says the pitch flowchart is built on six elements that include risk mitigation, but the seven-part structure has no risk part. The bound notes disagree on provenance: openstax-entrepreneurship.md:71 calls the structure the author's device, pitch-competition.md says it is taken from OpenStax.
- [advisory] A5 coverage/unit-07.md maps sme-risk-review (U7-03) and pitch-competition (U7-04, U7-06) to Explanation sections that do not cite them (they appear only in Further reading). unit-teacher-notes.mdx Week 14 says 'teach the lifecycle', which Topic 7.1 does not teach.
- [advisory] A6 fig-U7-2 horizontal axis has no arrowhead at its high end; strokes (100,440)-(94,452) and (100,440)-(106,452) draw a stray upward arrowhead at the origin; neither axis carries low/high labels.
- [advisory] A7 ERQs split three on Topic 7.1 (ERQ 1-3) and two on Topic 7.2 (ERQ 4-5); the blueprint asks for two per topic plus one integrative item, and ERQ 5 draws almost only on Topic 7.2.
- ...and 3 more in the report.

## Notes from earlier jobs on this unit
- (gent-401-u07-review_en, review_en, claude) Fixing F2, F3 and F8 changes figures, so the matching `.ur.svg` files and the Urdu mirror pages need the same changes, then run measure-figure-text.
- (gent-401-u07-review_en, review_en, claude) Fixing F6 also means correcting bound note 12 in `sources/texts/openstax-entrepreneurship.md:61`; any English edit then needs `prepare-gate-evidence` and a new G2 row before a fresh G3 run.
- (gent-401-u07-review_en, review_en, claude) The next G3 run can do the render check only once production is rebuilt from a commit that includes the Unit 7 banner (it is currently built from 366019f8a).
- (gent-401-u07-illustrate, illustrate, agy) Unit banner fig-U7-5 is placed and verified clean; G3 English review and G5 Urdu review remain open for independent evaluation.
- (gent-401-u07-illustrate, illustrate, agy) G4 draft translation is complete with translation_status: draft preserved.


## Response snapshot

Applied all blocking findings F1-F8 and advisories A1-A8 from the G3 review report across GENT-401 Unit 7 English and Urdu files and SVGs, generated fresh G2 gate evidence, and updated the tasks tracker.

## Outcome

- Impact: repair_en for GENT-401 Unit 7 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all blocking findings F1-F8 and advisories A1-A8 from the G3 review report across GENT-401 Unit 7 English and Urdu files and SVGs, generated fresh G2 gate evidence, and updated the tasks tracker.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open and unticked pending a fresh independent qualified review.
  - Render-review inspection was recorded unavailable in G3 evidence as production deployment differs from reviewed HEAD; can be run once deployed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
