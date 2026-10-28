# GPKS-402 Unit 5 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of GPKS-402 Unit 5 (Economy and Society) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: GPKS-402 (Pakistan Studies), Semester 2, General Education, Unit 5: Economy and Society
- Reviewed commit: `2eaabb21` (origin/main)
- Author run identity: `commit:fddb7a04` (crew-gpks-402-u05-author, Codex)
- Reviewer run identity: `21030998-7c55-4596-9cef-92787e7cb7aa` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-10-28T11:46:00.000Z`
- Completed at: `2026-10-28T11:58:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Week 11 (Economy) and Week 12 (Society and Culture) from the course guide (`Scheme-and-Course-guides/extracted-text/2nd 2026.txt:1087-1098`) map one-to-one to sub-topics U5-01 through U5-07 in `specs/content/gpks-402/content-spec.md:275-281`.
  - All seven sub-topics are taught under dedicated `###` headings across `topic-01.mdx` and `topic-02.mdx`.
  - `SLO:GPKS-402-5-1` and `SLO:GPKS-402-5-2` trace directly to course guide objectives 4 and 5; `clo_refs` frontmatter is consistent across all unit files.
  - Course code GPKS-402 follows the authoritative University of Sindh scheme of studies per `G-2026-03` (`content-spec.md:12`).
  - Mapped print monographs (*Pakistan: Fifty Years of Nationhood* and *Pakistan Studies*) are handled per `D-2026-0001` under Verification and limits in `sources/unit-05.md:28-32`.

- **Sources (`pass`)**:
  - The approved open-access floor of 1 is met; 6 open-access works are consulted and bound.
  - Sectoral GDP shares (agriculture 23.54%, industry 18.07%, services 58.39%) are verified against Table 1.2 of the Ministry of Finance *Pakistan Economic Survey 2024-25* (`finance-survey-2025`).
  - Export competitiveness, power, connectivity, and skills constraints are verified against Section 4 of the World Bank's *Pakistan Development Update, October 2025* (`worldbank-pdu-2025`).
  - Rural/urban tabulation and mother-tongue categories are verified against Tables 11 and 12 of the PBS *7th Population and Housing Census 2023* (`pbs-census-2023`).
  - The multilingual learning-in-understood-languages principle is verified against UNESCO (2025) `unesco-languages-2025`.
  - Living artisan heritage and livelihoods documentation is verified against UNESCO Pakistan (2026) `unesco-living-heritage-2026`.
  - The culture and society distinction is verified against OpenStax Sociology 3e (`openstax-society-2021`).
  - All monetary figures, enterprise routes, and household budgets are explicitly labelled as original fictional teaching cases.

- **Coverage (`pass`)**:
  - Complete coverage of all seven guide sub-topics: U5-01 (Agriculture), U5-02 (Industry and trade), U5-03 (Economic challenges: poverty, inequality, debt), U5-04 (Role of education), U5-05 (Social structure: rural, urban, tribal), U5-06 (Cultural diversity), and U5-07 (Languages and traditions: unity in diversity).
  - Coverage matrix at `specs/content/gpks-402/coverage/unit-05.md` accurately maps all seven sub-topics to exact headings and external sources.
  - Depth budget: 69 estimated reading minutes total (index 3, topic-01 24, topic-02 23, assessment 19), well within the approved 65-90 minute unit budget.

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-D, 3-A, 4-C, 5-B, 6-A, 7-D, 8-C, 9-B, 10-A) match the supplied answer key 100%.
  - MCQ option letters are balanced across four choices (A:3, B:3, C:2, D:2).
  - RRQ distribution: 5 items for Topic 5.1 and 5 items for Topic 5.2, satisfying the approved blueprint requirement of >= 2 RRQs per topic.
  - ERQ distribution: 2 items for Topic 5.1, 2 items for Topic 5.2, and 1 integrative item, exactly matching the blueprint.
  - All 25 items are mapped to concepts in `specs/content/gpks-402/concepts/unit-05.md:8-18`; `check:concept-graph` exits 0.
  - ERQs feature analytic 4-criterion rubrics (3 marks each, totaling 12 marks) with explicit Analyze/Evaluate/Create demand.
  - Marking guidance and answer keys are quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading hierarchy verified across all MDX files with zero skipped levels.
  - Alt text on all four `<Figure>` tags matches SVG `<desc>` text and `figures/unit-05.md` manifest declarations.
  - `node scripts/measure-figure-text.mjs static/img/figures/gpks-402/unit-05/*.svg` exits 0 across all 8 SVG variants (4 light, 4 dark twins) with zero text overflow and zero wordmark collision.
  - All four SVGs rasterized to PNG at 780px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 228.7 to 240.4.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts.
  - Grounded in authentic Pakistani classroom contexts (Hyderabad uniform shop, Sindh cotton route, Karachi practicum class, Sukkur Grade 5 math lesson, Thari and Kalasha living heritage).
  - Explicit distinction between general economic concepts and fictional teaching illustrations.
  - Vocabulary and tone appropriate for HSC/intermediate graduates without prior specialist knowledge.

- **Pedagogy (`pass`)**:
  - Full nine-part learning cycle strictly maintained in both topics (situation -> Explanation -> Activity -> Check your understanding -> Summary -> Self-assessment checklist -> Practicum -> Summative task -> Further reading).
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (Trace a uniform, Rebuild the cultural display).
  - Common misconceptions systematically identified and refuted.
  - Practicum guidance incorporates ethical observation standards prohibiting the collection of private household financial or religious data.

## Non-blocking advisory findings

1. **Fictional numerical and case illustrations**: All monetary figures, enterprise cases, household budgets, and loan illustrations across Topic 5.1, Topic 5.2, and Unit Assessment are original fictional teaching cases designed for pedagogical instruction. They are not empirical survey findings, quantified intervention effects, or official poverty statistics.
2. **Headless review tooling constraint**: The crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright Chromium. Visual and presentation checks were conducted via `measure-figure-text.mjs` (all 8 SVG variants exit 0 with zero overflow or collision), static heading and table container analysis, and Sharp PNG rasterization with CSS variables resolved.
3. **Global glossary entries**: Unit 5 tags ten key terms with `<Glossary term="...">` matching existing global entries (Economy, Poverty, Human capital, Family, Role, Social institution, Joint family, Nuclear family, Culture). New economic terms are defined inline on first use; repository-wide glossary expansion remains a separate task outside unit scope.
4. **Print monographs declared under Verification and limits**: Burki (1999) and Rabbani were unavailable in this session and are declared in `specs/content/gpks-402/sources/unit-05.md:28-32` per `D-2026-0001`. No specific proposition relies on them; verified open-access substitutes ground all unit prose.

## Deterministic gate commands

1. `validate:content` - PASS (exit code 0)
2. `check:depth-gate` - PASS (exit code 0)
3. `check:figures` - PASS (exit code 0)
4. `check:no-em-dash` - PASS (exit code 0)
5. `check:no-answer-keys` - PASS (exit code 0)
6. `check:docs-sync` - PASS (exit code 0)
7. `render-review` - PASS (exit code 0)
8. `check:content` - PASS (all 13 gates pass, exit code 0)
9. `measure-figure-text` - PASS (exit code 0, all 8 variants pass)

## Next steps and handoff

- Advisory G3 tracker row appended to `specs/content/gpks-402/tasks.md` with status `▢` (open, unsigned, ADR-0019).
- Unit 5 remains open for Urdu translation (`G4 ur-translation`) and subsequent independent Urdu review (`G5 ur-review`).
