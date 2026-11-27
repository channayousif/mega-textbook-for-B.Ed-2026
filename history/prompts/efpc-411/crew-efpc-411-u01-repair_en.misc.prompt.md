---
id: crew-efpc-411-u01-repair_en
title: crew repair_en EFPC-411 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpc-411
branch: crew/efpc-411-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude_crew", "repair_en"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpc-411/unit-01/index.mdx
 - docs/semester-4/efpc-411/unit-01/topic-01.mdx
 - docs/semester-4/efpc-411/unit-01/topic-02.mdx
 - docs/semester-4/efpc-411/unit-01/topic-03.mdx
 - docs/semester-4/efpc-411/unit-01/topic-04.mdx
 - docs/semester-4/efpc-411/unit-01/unit-assessment.mdx
 - history/prompts/general/20261304-efpc411-u01-repair-en.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/unit-assessment.mdx
 - specs/content/efpc-411/concepts/unit-01.md
 - specs/content/efpc-411/figures/unit-01.md
 - specs/content/efpc-411/reviews/unit-01/G2/20261127T143453751Z-gates.json
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261127T143453751Z/validate-content.txt
 - specs/content/efpc-411/sources/texts/hec-2013-practicum.md
 - specs/content/efpc-411/tasks.md
 - static/img/figures/efpc-411/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-1.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/efpc-411/unit-01/fig-U1-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u01-repair_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpc-411/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
From `specs/content/efpc-411/reviews/unit-01/G3/crew-efpc-411-u01-review_en-r1.json` (disposition: revise). Resolve each one:
- [advisory] topic-03.mdx:66 ends the observer-bias paragraph with "(HEC, 2013)", but the practicum handbook contains no discussion of observer bias; the bound Teach Primary manual discusses first impressions and central tendency (p. 16), and coverage/unit-01.md maps U1-09 to teach-primary-2021. REPAIR: re-cite Molina et al. (2021) or drop the attribution.
- [advisory] specs/content/efpc-411/sources/texts/hec-2013-practicum.md note 4 claims the handbook introduces "descriptive rating scales, episodic anecdotal records"; the handbook clearly covers checklists and reflective journals only. The unit's tools section is guide-determined, so this is a note-accuracy repair, not a prose defect.
- [advisory] topic-01.mdx:39 cites "(Higher Education Commission [HEC], 2013)" for a definition of classroom observation that the handbook does not give in those terms. The definition is a reasonable author synthesis; either mark it as such or cite a source that defines it.
- [advisory] Figure metadata mismatches (figure-metadata-check.md): fig-U1-1 prompt/alt name a tools column the figure lacks; fig-U1-3 says two questions per area but shows three; fig-U1-6 says six scenarios but shows four; fig-U1-8 prompt says five findings but shows four. The alt text is what screen-reader users hear, so the fig-U1-1 and fig-U1-6 alt texts are the material ones. REPAIR: align the manifest prompt/alt (and the content-spec plan for fig-U1-3) with the figure, or add the missing column/rows/questions.
- [advisory] specs/content/efpc-411/concepts/unit-01.md maps six item IDs to concepts they do not assess: CON-1+ERQ-01, CON-2+ERQ-01, CON-3+RRQ-01, CON-4+MCQ-04, CON-6+ERQ-03, CON-8+RRQ-10. The bank still covers every outcome through other items, but the recorded mapping is inaccurate. REPAIR: move the IDs to the concept rows whose items actually assess them.
- [advisory] unit-assessment.mdx ERQ 4 criterion 1's "Exceeds Standard" cell contains five full model rewrites rather than a performance descriptor, and RRQ 9's scheme does not state the award for four correct steps in the wrong order. Both are inside the bounded answers section, so neither is a gate failure.
- [advisory] Bare-URL link text on the Further reading lists of topic-01.mdx:138, topic-02.mdx:125-126, topic-03.mdx:149-150 and topic-04.mdx:134-135 (HEC and World Bank URLs); render log reports bareUrlLinks on all four pages. Screen-reader users hear only the URL. REPAIR: use descriptive link text with the URL in the destination.
- [advisory] The unit, course-overview and unit-assessment front matter carry assessment_weighting 60/40, while the approved content-spec.md:30 and course-overview.md record the guide's 20/40/20/20. The schema does not require a note at 60/40, but the field can mislead. REPAIR: update the field or add an assessment_weighting_note recording that the unit bank serves the 20 seminar marks.
- [uncertain] topic-04.mdx:43 states "In many traditional Pakistani classrooms, teachers lecture for 30 minutes of a 35-minute period, leaving only 5 minutes for hurried copying (HEC, 2013)". All four cited works were retrieved on 2026-11-27 and none contains this claim; the methods guide's only "30 minutes" passages describe an observed lesson lasting 30 minutes. REPAIR: remove the claim or cite a source that supports it.

## Notes from earlier jobs on this unit
- (efpc-411-u01-review_en, review_en, claude_crew) Repair `topic-04.mdx:43` (unsupported "30 minutes of a 35-minute period" claim cited to HEC 2013) and `topic-03.mdx:66` (observer bias cited to HEC 2013; the bound Teach Primary manual is the source that discusses it); figure-metadata mismatches (fig-U1-1 tools column, fig-U1-3 two-vs-three questions, fig-U1-6 six-vs-four rows, fig-U1-8 five-vs-four rows) and six concept-graph mapping errors are advisories in `figure-metadata-check.md` and finding F6.
- (efpc-411-u01-review_en, review_en, claude_crew) The deployed SHA changed mid-review (`cde64d2…` → `66a199127…`); the report cites `66a199127` as the rendered input and records the sequence in `logs/render-review-provenance.txt`.
- (efpc-411-u01-review_en, review_en, claude_crew) G3 stays unticked and unsigned; the suggested advisory row is in `advisory-tracker-row.md` for the parent to apply.
- (efpc-411-u01-illustrate, illustrate, agy) All nine Unit 1 figures (eight schematic SVGs fig-U1-1 to fig-U1-8, and banner illustration fig-U1-9) are placed and gate-clean.
- (efpc-411-u01-illustrate, illustrate, agy) Unit 1 English is ready for independent G3 review, and Urdu G4 draft mirror is ready for independent G5 review.


## Response snapshot

Applied all nine G3 report repairs to EFPC-411 Unit 1 English and Urdu (citations, source note, figure metadata, concept map, assessment rubrics, link text, weighting note), appended the advisory G3 row, refreshed G2 evidence, and left all content gates and unit tests green.

## Outcome

- Impact: repair_en for EFPC-411 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all nine G3 report repairs to EFPC-411 Unit 1 English and Urdu (citations, source note, figure metadata, concept map, assessment rubrics, link text, weighting note), appended the advisory G3 row, refreshed G2 evidence, and left all content gates and unit tests green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The approved content-spec.md Figure plan still says fig-U1-3 has "two questions an observer asks under each"; I aligned the manifest/SVG to the figure's three questions instead of editing the protected spec, so the plan needs an owner ruling.
  - course-overview.mdx front matter still carries assessment_weighting 60/40; it is outside the Unit 1 scope and is bound in the G3 evidence manifest, so it was left for a separate owner decision.
  - G3 remains unticked and unsigned; the report is one cycle, so a fresh independent G3 review needs the owner's ADR-0019 cycle check before it is commissioned.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
