---
id: crew-efpg-402-u04-repair_en
title: crew repair_en EFPG-402 unit 4
stage: misc
date: 2026-11-28
surface: agent
model: agy
feature: efpg-402
branch: crew/efpg-402-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-04/topic-01.mdx
 - docs/semester-4/efpg-402/unit-04/topic-03.mdx
 - docs/semester-4/efpg-402/unit-04/topic-04.mdx
 - docs/semester-4/efpg-402/unit-04/unit-assessment.mdx
 - history/prompts/efpg-402/crew-efpg-402-u04-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/unit-assessment.mdx
 - specs/content/efpg-402/concepts/unit-04.md
 - specs/content/efpg-402/reviews/unit-04/G2/20261128T065612223Z-gates.json
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-04/G2/logs-20261128T065612223Z/validate-content.txt
 - specs/content/efpg-402/sources/texts/khan-2019-low-cost.md
 - specs/content/efpg-402/sources/unit-04.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efpg-402/unit-04/fig-U4-2.svg
 - static/img/figures/efpg-402/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/efpg-402/unit-04/fig-U4-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u04-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpg-402/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-04/`.

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
From `specs/content/efpg-402/reviews/unit-04/G3/b389e9fb-33f5-41f9-ab56-7df8fd3419e9.json` (disposition: revise). Resolve each one:
- [blocking] Dale's cone level count and naming disagree across the unit. docs/semester-4/efpg-402/unit-04/topic-01.mdx:57-61 teaches five levels (Direct purposeful experiences; Contrived experiences and models; Dramatisation and demonstrations; Visual and auditory media; Verbal and text symbols). static/img/figures/efpg-402/unit-04/fig-U4-2.svg renders four bands (Direct Purposeful Experiences; Demonstrations & Working Models; Visual & Auditory Media; Verbal & Text Symbols). docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:105 asks for "the four main levels" and its key at :154 names Direct, Contri...
- [blocking] ERQ 3 (docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:129) is required by specs/content/efpg-402/content-spec.md:268 to design a low-cost aid for a named Grade 5 concept, but it names "Closed Electric Circuits and Electrical Conductivity", which the National Curriculum of Pakistan 2022-23 places at Grade 6 (SLO S-06-B-37, Differentiate between open and closed circuits, PDF p. 56); "electrical conductivity" is not an NCP SLO (the grid names thermal conductivity at Grade 7). Repair: relabel the item to Grade 6 or substitute a Grade 5 concept such as S-05-B-16/S-05-B-17 (flow of current,...
- [blocking] Several curriculum-grade references contradict the NCP progression grid (source-checks/ncp-science-2022-grade-check.txt). topic-03.mdx:28 says Grade 5 respiration expects diaphragm mechanics, but Grade 5 SLO S-05-A-02 excludes detailed respiratory-system knowledge and the air pathway is Grade 7 SLO S-07-A-11. topic-03.mdx:94 says Grade 5 transpiration and xylem flow, but transpiration is Grade 8 (Benchmark II) and xylem/phloem role is Grade 7 SLO S-07-A-02. topic-04.mdx:28 says Grade 8 atomic structure, but atomic structure is Grade 7 SLO S-07-B-01 (chemical bonds are Grade 8). topic-04.mdx...
- [advisory] MCQ key distribution is skewed: B is the key for 7 of 10 items and A for none (docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:139-148). All items and distractors are unambiguous, but the pattern is a weak test-design convention.
- [advisory] Concept-graph assessment mappings for CON:EFPG-402-4-6 and -4-7 appear swapped: specs/content/efpg-402/concepts/unit-04.md:12 maps MCQ-09 (instructional field trip) and RRQ-09 (community resources) to Science exhibitions, and :13 maps RRQ-10 (exhibition safety inspections) to Field trips and community resources.
- [advisory] Figure-plan drift: specs/content/efpg-402/content-spec.md:307 plans fig-U4-9 as "farm, clinic, workshop, river, museum", but the placed figure and topic-05.mdx:52 use "Pottery / Brick Kiln" and no museum. The figure matches the prose; the spec plan wording is the outlier.
- [advisory] sources/unit-04.md declares khan-2019-low-cost unverifiable ("bound excerpt not committed on this host"), but the article is diamond open access and was retrieved in full for this review. Consider committing a bound excerpt or adjusting the declaration; the "superior retention" wording in topic-03.mdx:44 rests on the paper's literature review and its two-month retention test rather than a reported retention result.
- [uncertain] render-review tooling limitation: scripts/render-inspect.mjs exited 1 on ten artifacts because Section D fetches <id>.svg and <id>.dark.svg for every placed figure, including the five raster illustrations fig-U4-12..16 (Kind: illustration, .webp), which have no SVG variants. Section A loaded all five WebP files (HTTP 200, natural 1344x756 or 1200x675, shown=true), and sections A (desktop 1280x900), B (narrow 360x780) and C (A4 print 794px) otherwise found no hard defect. The exit code is a known script limitation (specs/intelligence/daily/2026-11-20.md C1), not a content defect; the command...

## Notes from earlier jobs on this unit
- (efpg-402-u04-review_en, review_en, claude_crew) Report `specs/content/efpg-402/reviews/unit-04/G3/b389e9fb-33f5-41f9-ab56-7df8fd3419e9.json`, disposition `revise`; a repair job must reconcile Dale's cone across prose/figure/RRQ 2 and fix the ERQ 3 blueprint grade before a fresh G3 bundle and reviewer.
- (efpg-402-u04-review_en, review_en, claude_crew) `render-review` is recorded exit 1 solely because `render-inspect.mjs` Section D requests `.svg` variants for the raster illustrations; the inspected desktop/narrow/A4 views were clean, so accessibility is `unverified` for a machine pass, not a content defect.
- (efpg-402-u04-review_en, review_en, claude_crew) `khan-2019-low-cost` is diamond OA and was retrieved in full (DOI 10.36902/sjesr-vol2-iss2-2019(33-47)); the `sources/unit-04.md` "unverifiable" declaration could be tightened, and the "superior retention" wording rests on the paper's literature review, not a reported retention result.
- (efpg-402-u04-illustrate, illustrate, agy) G3 English review and G5 Urdu review remain open and unsigned per ADR-0019.
- (efpg-402-u04-plan_illustrations, plan_illustrations, claude) The illustrate job should add the Urdu `<Figure>` elements for fig-U4-12 to fig-U4-16 (with Urdu alt text) to the Urdu topic files when it places the images; none exist yet.


## Response snapshot

Reconciled Dale's cone to four canonical levels across prose, SVGs, and assessments, aligned ERQ 3 and curriculum-grade references with the NCP progression grid, rebalanced MCQ keys, corrected concept-graph mappings, committed bound evidence for khan-2019-low-cost, and recorded fresh G2 gate evidence and G3 advisory tracker row.

## Outcome

- Impact: repair_en for EFPG-402 Unit 4 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Reconciled Dale's cone to four canonical levels across prose, SVGs, and assessments, aligned ERQ 3 and curriculum-grade references with the NCP progression grid, rebalanced MCQ keys, corrected concept-graph mappings, committed bound evidence for khan-2019-low-cost, and recorded fresh G2 gate evidence and G3 advisory tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open and unticked pending a fresh independent qualified review run.
  - Section D of render-inspect.mjs fails on raster illustrations due to requesting .svg extensions for .webp files; desktop, narrow, and print inspections are clean.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
