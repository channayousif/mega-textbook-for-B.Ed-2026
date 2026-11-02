# Independent Review Summary: GQUR-300 Unit 5 (English, G3 - Cycle 2)

**Course**: GQUR-300 (Quantitative Reasoning-I, B.Ed 4-Year Semester 1)  
**Unit**: Unit 5: Data Analysis and Statistics  
**Review Stage**: G3 (English Independent Review, ADR-0019, Cycle 2)  
**Reviewer Identity**: `agent:agy`  
**Reviewer Run ID**: `bcf4c106-56d7-4b58-bea6-638d45ca4538`  
**Author Baseline Commit**: `commit:1cc68c7f` (repaired baseline; G3 repairs applied in `1cc68c7f` / `2d5cd6a`)  
**Review Started**: 2026-10-28T03:46:00Z  
**Review Completed**: 2026-10-28T03:58:00Z  
**Disposition**: `pass`  

---

## 1. Executive Summary

This report documents the second-cycle independent G3 review of GQUR-300 Unit 5 ("Data Analysis and Statistics") conducted on Antigravity in compliance with ADR-0019, the `review-unit` skill, and repository content gates. This is the second and final review cycle permitted under ADR-0019.

The unit covers essential data handling and statistical reasoning for elementary school teacher candidates:
- The data cycle (question, collection via observation/survey/records, organization with tallies and frequency tables, summarization, and context-bound interpretation).
- Data displays (bar charts for comparing categories, pie charts for shares of a whole, line graphs for change over time, and pictographs with explicit keys) alongside their construction principles and common pitfalls.
- Measures of central tendency (fair-share mean, resistant midpoint median, most frequent mode) and how distribution shape governs the honest average.
- Critical evaluation of published statistics through five core questions (who collected it, how, compared to what, on what base, and what is missing), anchored on verified 2023 Sindh Census data from the Pakistan Bureau of Statistics.

All five blocking findings from Cycle 1 (`agent-g3-gqur300-u5-run001.json`, disposition `revise`) have been verified as resolved against the current files:
1. **fig-U5-5 data plot repaired**: In commit `1cc68c7f`, all 11 dot coordinates were rescaled to exact linear values ($x = 60 + (\text{mark} - 20) \times 7.5$), positioning the dots at 20, 45, 50, 55, 60, 62 (pair), 70 (triple), and 96; the median line was placed at $x=375$ (mark 62) and the mode circle was centered on the mark 70 stack at $x=435$. All 4 variants (`fig-U5-5.svg`, `fig-U5-5.dark.svg`, `fig-U5-5.ur.svg`, `fig-U5-5.ur.dark.svg`) pass geometry checks.
2. **Flagship gender gap figure corrected**: In `topic-03.mdx:79-81` and `unit-assessment.mdx:188-190` (RRQ-9 model answer), the literacy gap between males and females was corrected to about 14 percentage points ($64.23 - 50.21 = 14.02\text{ pp}$), resolving the earlier "nearly 10 percentage points" discrepancy with the ERQ-3 rubric and teacher notes.
3. **OpenStax Prealgebra 2e mapping re-scoped**: In `coverage/unit-05.md`, sub-topic U5-02 was re-scoped to `oecd-pisa` only, since OpenStax Prealgebra 2e contains no data displays chapter. The excerpt `sources/texts/openstax-prealgebra.md` was updated with Section 5.5 learning objectives covering frequency tables and averages, and `topic-01.mdx:141-143` Further reading was scoped to Section 5.5.
4. **Prose citation traceability restored**: Explicit citations to Marecek, Anthony-Smith and Mathis (2020, Section 5.5) were added to body prose at `topic-01.mdx:63-66` (frequency tables) and `topic-03.mdx:41-44` (averages side-by-side).
5. **Census conduct documentation grounded**: `specs/content/gqur-300/sources/texts/pbs.md` was extended with Section "## Census conduct (from the report's foreword)" supporting the digital census, tablet enumeration, March-May 2023 timeframe, and Council of Common Interests (CCI) approval cited in `topic-03.mdx:70-74`.

The review disposition is **`pass`**. All seven required criteria are satisfied with verified evidence, all seven review commands exited with code 0, and no unresolved blocking or uncertain findings exist.

---

## 2. Criterion Evaluation

### Authority: Pass
- All 97 bound input files in the prepared review manifest match exact current hashes.
- Curriculum alignment: The Scheme and Course Guide outline for GQUR-300 Unit 5 (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:620-627`) specifies four leaf subtopics ("Collection and organization of data", "Tables, graphs, and charts", "Measures of central tendency", "Interpretation of statistical information"). All four are taught and assessed at the exact headings mapped in `specs/content/gqur-300/coverage/unit-05.md`.
- Course learning outcomes: `specs/content/gqur-300/content-spec.md:420-486` specifies CLO refs to course outcomes 2 and 5 (`SLO:GQUR-300-2-2`, `SLO:GQUR-300-5-5`), matching `course-overview.mdx:56-58`. Reading minute bands (12-16/14-18/14-18 vs delivered 13/15/15), figure plan (6 placed figures matching manifest archetypes), and 10/10/5 question bank blueprint all align with delivered content.
- Practical teaching strategies: Group work, real-life case studies, and presentations recommended by the guide are operationalized in `unit-teacher-notes.mdx`.

### Sources: Pass
- Verified PBS Sindh Census 2023 figures: `specs/content/gqur-300/sources/texts/pbs.md` supports all quoted census statistics across the unit (population 55,696,147; literacy 10+ 57.54% overall, male 64.23%, female 50.21%; out-of-school 5-16 46.29%; household size 5.65; annual growth 2.57%; Karachi 20,382,881; Hyderabad 11,659,246; Larkana 7,093,706) across `topic-03.mdx`, `unit-assessment.mdx`, `index.mdx`, and `unit-teacher-notes.mdx`.
- Gender-gap repair verified: `topic-03.mdx:79-81` and `unit-assessment.mdx:188-190` (RRQ-9 model answer) now correctly compute and state the gap as about 14 percentage points ($64.23 - 50.21 = 14.02\text{ pp}$).
- Census conduct and structure: `specs/content/gqur-300/sources/texts/pbs.md` Section "## Census conduct (from the report's foreword)" verifies the digital tablet enumeration, March-May 2023 timeframe, and CCI approval cited in `topic-03.mdx:70-74`.
- OpenStax Prealgebra 2e: `specs/content/gqur-300/sources/texts/openstax-prealgebra.md` verifies Section 5.5 for frequency tables and averages. Coverage matrix row U5-02 is re-scoped to `oecd-pisa` only. Citations in `topic-01.mdx:63-66`, `141-143` and `topic-03.mdx:41-44` ground the concepts in both prose and Further reading.
- Tout (2020) at ERIC record level: `topic-03.mdx:83-87` matches `specs/content/gqur-300/sources/texts/tout2020.md` summary without overstatement.
- OECD PISA: declared unverifiable under `## Unverifiable sources` (`sources/unit-05.md:16-18`) resting on owner ruling `D-2026-0001`.

### Coverage: Pass
- Taught-passage mapping verified 4/4: Every subtopic row in `specs/content/gqur-300/coverage/unit-05.md` maps to an exact MDX file and verbatim `###` heading (U5-01: `topic-01.mdx` ### Collection and organization of data; U5-02: `topic-02.mdx` ### Tables, graphs, and charts; U5-03: `topic-03.mdx` ### Measures of central tendency; U5-04: `topic-03.mdx` ### Interpretation of statistical information).
- Assessment mapping complete across all sub-topics: U5-01 -> MCQ 1-3, RRQ 1-2, ERQ 1; U5-02 -> MCQ 4-7, RRQ 4/6/7, ERQ 2; U5-03 -> MCQ 8-9, RRQ 3/5/8, ERQ 4; U5-04 -> MCQ 10, RRQ 9-10, ERQ 3/5.
- Depth budget respected: `est_reading_minutes` 13, 15, 15 within spec bands 12-16, 14-18, 14-18; `check:depth-gate` exits 0; complete guide leaf coverage with no scope drift.

### Assessment: Pass
- Independent blind solve recorded in `specs/content/gqur-300/reviews/unit-05/logs-bcf4c106/independent-assessment-derivation.md`: MCQ key agreement 10/10 (1-b, 2-b, 3-b, 4-c, 5-b, 6-c, 7-b, 8-b, 9-c, 10-b).
- All 10 RRQ model answers match independent solutions with mathematically and pedagogically sound mark allocations (3, 2, 3, 2, 2, 2, 2, 2, 2, 5; total 25 marks).
- RRQ-9 model answer (`unit-assessment.mdx:188-190`) consistently computes 14.02 percentage points and cites the 14-point divide, fully aligned with ERQ-3 rubric (:204) and `unit-teacher-notes.mdx:71-73`.
- All 5 ERQs provide analytic marking rubrics with distinct assessment criteria adding up correctly (6, 6, 6, 7, 10; total 35 marks); ERQs assess Analyze (ERQ 1-4) and Evaluate (ERQ 5).
- Blueprint fully satisfied: 10 MCQ, 10 RRQ, 5 ERQ; at least 2 MCQ and 2 RRQ per topic; MCQs Remember to Apply, RRQs Understand to Analyze, ERQs Analyze to Evaluate; `check:bloom-bands` and `check:concept-graph` exit 0.

### Accessibility: Pass
- Deterministic gates `validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, and `check:docs-sync` all exit 0.
- fig-U5-5 data plot verified: In commit `1cc68c7f`, all 11 dot coordinates were rescaled to exact linear values ($x = 60 + (\text{mark} - 20) \times 7.5$), placing dots at 20, 45, 50, 55, 60, 62 (pair), 70 (triple), and 96; median line placed at $x=375$ (mark 62) and mode circle centered on the 70 stack at $x=435$; all 4 variants (`.svg`, `.dark.svg`, `.ur.svg`, `.ur.dark.svg`) pass text geometry (exit 0).
- Raster renders: All 6 placed SVG figures rasterised to PNG with resolved palette tokens (`fig-U5-1` through `fig-U5-6`, sizes 31k-55k bytes) and verified non-blank and visually sound; log at `specs/content/gqur-300/reviews/unit-05/logs-bcf4c106/render-review.log`.
- Semantic HTML & A11y: Single H1 per MDX file, hierarchical H2/H3 nesting with 0 skipped heading levels; non-empty descriptive alt text on all placed `<Figure>` components matching `specs/content/gqur-300/figures/unit-05.md`; zero em dashes; answers strictly isolated in `## Answers and marking guidance`.
- Responsive layout: Content tables use `display: block; width: fit-content; overflow-x: auto`, reporting 0px document overflow on 360px viewport; `<PrintHandout />` component present in all pages.

### Readability: Pass
- Appropriate register for HSC graduates and prospective elementary teachers: clear active sentences, short paragraphs, everyday Pakistani/Sindhi contexts (Sindh census figures, travel modes, Khairpur primary school, shop rupee takings).
- Technical terms defined in plain language at first use: data, frequency table, tally, bar chart, pie chart, line graph, pictograph, measures of central tendency, mean, median, mode; glossary tags link valid entries in `glossary.json`.
- Zero em dashes (`check:no-em-dash` exit 0); every page carries frontmatter description and single H1 (`validate:content` exit 0); `est_reading_minutes` 13/15/15 within spec bands.

### Pedagogy: Pass
- Nine-part learning cycle complete and ordered across all three topic files: classroom situation with placed figure -> explanation with worked example and misconception -> activity -> retrieval -> summary -> self-assessment -> practicum -> summative task with rubric -> further reading.
- Misconceptions explicitly countered in dedicated blocks: "data means numbers" (`topic-01.mdx:67-72`), "a graph's impression is the data" (`topic-02.mdx:66-71`), "the mean is the average" (`topic-03.mdx:49-55`).
- Realistic Pakistani classroom context: Activities use accessible low-cost materials with explicit timings (travel survey in groups of four, 25 min; display-swap in pairs, 25 min; marksheet clinic in trios, 25 min); local references (Khairpur, Sindh census, Pakistani currency).
- Teacher notes provide actionable sequencing, debrief guidance, misconception probing prompts, and practicum artefact handling feeding unit assessments.

---

## 3. Findings Register

| # | Severity | Status | Description |
|---|---|---|---|
| 1 | blocking | resolved | CYCLE 1 BLOCKING 1 (ACCESSIBILITY / figure data plot): fig-U5-5 did not plot the stated dataset (20, 45, 50, 55, 60, 62, 62, 70, 70, 70, 96), misplacing median and mode. REPAIRED AND VERIFIED: All 11 dot positions rescaled to exact linear coordinates x = 60 + (mark - 20) * 7.5 across all 4 variants; median line at x=375 (62) and mode circle at x=435 (70); scripts/measure-figure-text.mjs verifies 0 text overflows/collisions (exit 0). |
| 2 | blocking | resolved | CYCLE 1 BLOCKING 2 (SOURCES / flagship interpretation example): topic-03.mdx:79-80 stated gender gap as "nearly 10 percentage points" and RRQ-9 model answer had "near-10-point-plus divide" instead of 14.02 pp. REPAIRED AND VERIFIED: topic-03.mdx:79-81 and unit-assessment.mdx:188-190 corrected to state the 14-point divide (64.23 - 50.21 = 14.02 pp), matching ERQ-3 rubric and teacher notes. |
| 3 | blocking | resolved | CYCLE 1 BLOCKING 3 (SOURCES / coverage mapping): coverage/unit-05.md mapped U5-01, U5-02, U5-03 to openstax-prealgebra, but Prealgebra 2e has no data displays chapter. REPAIRED AND VERIFIED: U5-02 row re-scoped to oecd-pisa; openstax-prealgebra.md excerpt updated with Section 5.5 objectives (frequency tables and averages); topic-01.mdx:141-143 Further reading scoped to Section 5.5. |
| 4 | blocking | resolved | CYCLE 1 BLOCKING 4 (SOURCES / citation traceability): openstax-prealgebra appeared only in Further reading and not in unit prose. REPAIRED AND VERIFIED: Prose citations added at topic-01.mdx:63-66 (frequency tables) and topic-03.mdx:41-44 (averages). |
| 5 | blocking | resolved | CYCLE 1 BLOCKING 5 (SOURCES / census conduct support): Census conduct claims (tablets, digital census, March-May 2023, CCI approval) exceeded bound excerpt. REPAIRED AND VERIFIED: specs/content/gqur-300/sources/texts/pbs.md extended with Section "## Census conduct (from the report's foreword)" supporting all conduct details. |
| 6 | advisory | unresolved | OECD PISA attribution: topic-02.mdx:70-71 attributes display framing to the PISA framework; source is declared unverifiable under D-2026-0001 (sources/unit-05.md:16-18) based on public summary. Retained as advisory finding. |
| 7 | advisory | unresolved | Tout (2020) record-level disclosure: sources/texts/tout2020.md discloses record-level support; prose matches record summary without overstatement. Sources file could mirror the record-level note in a future cycle. Retained as advisory finding. |
| 8 | advisory | unresolved | PBS Kind label in sources/unit-05.md: Marked "guide-required", though pbs is Curated-supplementary in content-spec.md:102. Retained as advisory finding. |
| 9 | advisory | unresolved | Tooling citation-key binding rule: sources/texts/pbs.md and sources/texts/openstax-prealgebra.md are cited in coverage/sources tables but omitted from the prepared input manifest because scripts/lib/review-evidence.mjs citedKeysFor only recognises keys containing a 4-digit year. Digits verified clean in checkout. Retained as advisory finding. |
| 10 | advisory | unresolved | Declared key term "Average": content-spec.md ## Unit 5 declares "Average" among key terms; the unit uses the concept heavily but "Average" is unbanked in glossary.json (183 entries). Retained as advisory finding. |
| 11 | advisory | unresolved | Concept-graph mapping granularity: concepts/unit-05.md maps ERQ-04 only to CON:GQUR-300-5-12 rather than individual mean/median/mode concepts. Retained as advisory finding. |
| 12 | advisory | unresolved | Figure text geometry margins: While all 12 unit SVGs pass viewBox width bounds (780px) and wordmark clearance without clipping, newer inner-box containment and text-overlap heuristics in measure-figure-text.mjs flag tight column margins in fig-U5-4.svg and border containment in fig-U5-2.svg/fig-U5-6.svg. CI figure-geometry gate measures --changed origin/main and exits 0; recommended for future figure aesthetic polish. |
| 13 | advisory | unresolved | Host resource limits: AGENTS.md and crew brief prohibited running npm run build, background dev servers, and Playwright. Small-screen (360px), print view, and figure presentation were verified via static layout inspection, DOM/geometry evaluation, CSS display-block container evaluation, and sharp PNG rasterization with resolved palette variables. |
