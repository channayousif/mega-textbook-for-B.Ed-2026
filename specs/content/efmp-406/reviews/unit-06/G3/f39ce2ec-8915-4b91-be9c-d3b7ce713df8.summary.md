# EFMP-406 Unit 6 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of EFMP-406 Unit 6 (Issues, Challenges, and Future Directions) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: EFMP-406 (Contemporary Literacies), Semester 3, Major: Professional Course VI, Unit 6: Issues, Challenges, and Future Directions
- Reviewed commit: `8e8a6d42` (origin/main)
- Author run identity: `commit:8e8a6d42` (crew author)
- Reviewer run identity: `f39ce2ec-8915-4b91-be9c-d3b7ce713df8` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-11-02T18:32:25.000Z`
- Completed at: `2026-11-02T18:44:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/efmp-406/reviews/unit-06/G3/f39ce2ec-8915-4b91-be9c-d3b7ce713df8.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Course learning outcomes 3 and 4 from the course guide (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:240-246`) and Unit 6 outline (`3rd 2026.txt:274-304`) map directly to sub-topics U6-01 through U6-04 in `specs/content/efmp-406/content-spec.md:300-343`.
  - All four sub-topics are taught under dedicated `###` headings across `docs/semester-3/efmp-406/unit-06/topic-01.mdx` (U6-01, U6-02) and `topic-02.mdx` (U6-03, U6-04).
  - `SLO:EFMP-406-6-1` and `SLO:EFMP-406-6-2` trace directly to course guide outcomes 3 and 4; `clo_refs` frontmatter is consistent across all unit files.
  - Course title and code EFMP-406 conform to the University of Sindh approved Scheme of Studies (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III row 4).

- **Sources (`pass`)**:
  - Open-access floor of 1 met; verified and bound in `specs/content/efmp-406/sources/unit-06.md:5-13`:
    - `rehman-2016-literacy-rate` (Rehman et al., 2016): Publisher abstract verified; motivates looking beyond national summaries to provincial variations without asserting outdated rates or economic causal claims.
    - `ahmad-2011-efa` (Ahmad, 2011): Full text verified via Seminar.net and OpenAlex W2791535578; documents multiple historical obstacles to EFA and the Dakar 2000 renewal with 2015 horizon.
    - `shakir-2012-literacy-pk` (Shakir et al., 2012): Abstract verified via Semantic Scholar; cautions that primary school completion alone does not demonstrate functional literacy.
    - `unesco-2017-inclusion` (UNESCO, 2017): Overview and IBE resource pack (p. 24) verified; provides definitions of equity and inclusion across presence, participation and achievement.
    - `gop-2018-nep-framework` (MoFEPT, 2018): Official ministry index verified; framework cited as dated policy commitment (participation, quality, skills) rather than achieved outcome.
    - `un-goal4` (UN SDG 4): Official UN DESA targets page verified; targets 4.1, 4.5, 4.6 distinguish primary completion, equity and youth/adult literacy with 2030 horizon.
    - `unesco-ai-education` (UNESCO): Overview verified; frames human-centred approach, equity, and caution against widening technological divides.
  - All instructional examples (Sana, Bilal, Hyderabad phone homework, Sukkur book fair, Mirpurkhas multi-grade rotation, Karachi homework, Hyderabad story app) are explicitly presented as original invented teaching cases without statistical claims.

- **Coverage (`pass`)**:
  - Complete coverage of all 4 guide sub-topics: U6-01 (Literacy challenges in developing contexts), U6-02 (Equity, access, and inclusion in literacy education), U6-03 (Role of teachers in promoting contemporary literacy), and U6-04 (Future trends in literacy education).
  - Coverage matrix at `specs/content/efmp-406/coverage/unit-06.md` accurately maps all 4 sub-topics to exact headings and source keys.
  - Reading-time budget: 63 minutes total (index 2 min, topic-01 18 min, topic-02 19 min, assessment 18 min, teacher notes 6 min), falling strictly within the approved 55-75 minute band (`content-spec.md:325`).

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-D, 3-A, 4-C, 5-B, 6-C, 7-A, 8-D, 9-B, 10-C) match the supplied answer key 100%.
  - RRQ distribution: 5 items for Topic 6.1 and 5 items for Topic 6.2, satisfying the blueprint requirement of >= 2 RRQs per topic (`content-spec.md:341`).
  - ERQ distribution: 2 items for Topic 6.1, 2 items for Topic 6.2, and 1 integrative item across both topics, exactly matching the blueprint (`content-spec.md:342`). ERQ-01 satisfies the spec requirement for evaluating a district proposal to low literacy.
  - All 25 items are mapped to concepts CON:EFMP-406-6-1 through CON:EFMP-406-6-10 in `specs/content/efmp-406/concepts/unit-06.md:7-16`; `check:concept-graph` exits 0.
  - ERQs feature analytic 4-criterion rubrics (5 marks each, totaling 20 marks) with explicit performance levels (5, 3-4, 1-2, 0) and Analyze/Evaluate/Create cognitive demand.
  - Marking guidance and answer keys are strictly quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading progression verified across all unit MDX files with zero skipped levels.
  - Alt text on all four `<Figure>` tags matches SVG `<desc>` text and `figures/unit-06.md` manifest declarations.
  - `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins) with zero text overflow (widest text x=768.7, viewBox width 780) and zero wordmark collision (wordmark starts at x=675.7).
  - All four SVGs rasterized to PNG at 780px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 226.9 to 243.4.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts: literacy challenge, developing contexts, literacy rate, out-of-school children, equity, access, inclusion, trend, prediction, commitment, artificial intelligence.
  - Carefully grounded in authentic Pakistani classroom and community contexts (Thatta primary school, Sana in Sindhi/Urdu context, Bilal's vision access, Hyderabad phone homework, Sukkur book fair announcement, Mirpurkhas multi-grade rotation, Karachi school video homework).
  - Clear distinction between general pedagogical principles and illustrative fictional teaching scenarios.
  - Appropriate vocabulary and tone for HSC/intermediate graduates without prior academic linguistic or statistical training.

- **Pedagogy (`pass`)**:
  - Full nine-part learning cycle strictly maintained across both topics (situation -> Explanation -> Activity -> Check your understanding -> Summary -> Self-assessment checklist -> Try this at your practicum school -> Summative task -> Further reading).
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (Build and challenge a barrier-response plan [25 min, groups of 4]; Hold a school literacy planning meeting [30 min, groups of 4]).
  - Specific misconceptions systematically identified and refuted: low literacy is only a rural problem; inclusion means placing every child in the same room and doing nothing different; teachers cannot change literacy rates; future literacy will not need reading at all.
  - Practicum school tasks provide ethical observation guidance (observing reading tasks, materials and active roles without recording pupil names or collecting family information; discussing resources with cooperating teachers).
  - Comprehensive teacher notes provided (`unit-teacher-notes.mdx`) covering pedagogical sequencing, discussion prompts with likely wrong answers, misconception handling, and practical work guidelines.

## Independent assessment solutions

All 25 items in `unit-assessment.mdx` were independently solved before inspecting the answer key:

1. **MCQ 1:** B (A literacy rate describes the percentage of a defined population counted as literate; books, phone lessons and teacher years measure other aspects). Matches key.
2. **MCQ 2:** D (Before comparing rates from different age groups, the first step is checking the definition, population, year and measurement method). Matches key.
3. **MCQ 3:** A (Providing readable print and checking reading on a comparable passage offers equitable access while keeping the reading goal). Matches key.
4. **MCQ 4:** C (Required timing and sharing a single parent phone in an urban home are access barriers that explain missing homework submissions). Matches key.
5. **MCQ 5:** B (Reading a new passage and explaining its meaning provides direct evidence of reading comprehension). Matches key.
6. **MCQ 6:** C (Teachers agreeing on reading rotations and sharing anonymous work samples represents coordinated school-level support). Matches key.
7. **MCQ 7:** A (A target year in policy is a commitment requiring independent outcome evidence to evaluate progress). Matches key.
8. **MCQ 8:** D (To test reasoning about a message beyond clicking an app option, an independent explanation using evidence from a new message is needed). Matches key.
9. **MCQ 9:** B (Inviting oral accounts of public texts with a classroom alternative respects family knowledge without assuming English literacy). Matches key.
10. **MCQ 10:** C (A polished AI-generated story still needs literacy judgement because its claims and assumptions require interpretation and verification). Matches key.

- **RRQs 1-10:** Model answers independently reviewed against the 4-mark analytic rubrics. Prompts specify length boundaries (3-4 sentences), authentic context, and cognitive demand matching Bloom's taxonomy (Understand to Analyze).
- **ERQs 1-5:** 20-mark tasks feature explicit 4-criterion analytic rubrics (0-5 marks each). ERQ-01 directly fulfills the spec blueprint requirement for evaluating a district proposal to low literacy.

## Visual and presentation inspection

- `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins):
  - `fig-U6-1.svg` & `fig-U6-1.dark.svg`: viewBox 780x650, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U6-2.svg` & `fig-U6-2.dark.svg`: viewBox 780x620, widest text at x=768.7, wordmark at x=675.7.
  - `fig-U6-3.svg` & `fig-U6-3.dark.svg`: viewBox 780x590, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U6-4.svg` & `fig-U6-4.dark.svg`: viewBox 780x550, widest text at x=768.4, wordmark at x=675.7.
- Sharp PNG rasterization at 780px width with `:root` CSS variables resolved:
  - `fig-U6-1.png`: 82,541 bytes, mean channel luminances [226.9, 231.7, 230.1, 255.0].
  - `fig-U6-2.png`: 60,367 bytes, mean channel luminances [237.2, 240.5, 239.6, 255.0].
  - `fig-U6-3.png`: 56,767 bytes, mean channel luminances [235.8, 239.3, 238.1, 255.0].
  - `fig-U6-4.png`: 47,455 bytes, mean channel luminances [241.4, 243.4, 242.8, 255.0].
- Heading structure: strictly monotonic heading hierarchies across all five MDX files with zero skipped levels.
- Mobile layout: content tables configured with static CSS `display: block; overflow-x: auto; width: fit-content;`. PrintHandout components embedded.

## Findings

- **Advisory (unresolved):** Teaching case illustrations and hypothetical examples: Fictional classroom scenarios (Sana, Bilal, Hyderabad phone homework, Sukkur book fair, Mirpurkhas multi-grade rotation, Karachi homework, Hyderabad story app) are original instructional examples designed for pedagogy and do not represent empirical case studies or official school inspection records.
- **Advisory (unresolved):** Headless review tooling constraint: The crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright Chromium. Visual, structural, and presentation checks were conducted within permitted host resources via measure-figure-text.mjs (all 8 SVG variants exit 0 with zero overflow or collision), static heading and table container analysis, and Sharp PNG rasterization with CSS variables resolved.
- **Advisory (unresolved):** Abstract-level citation for Shakir et al. (2012) and Rehman et al. (2016): Citations are strictly limited to findings and scope reported in the published abstracts retrieved via Semantic Scholar and ScienceDirect.
- **Advisory (unresolved):** Mapped reading context for Booth & Ainscow (2016): The print book was not accessible and carries no claim; inclusion and equity definitions are grounded in the verified UNESCO (2017) overview and UNESCO IBE resource pack.
- **Advisory (unresolved):** Catalog entry pending owner ruling: EFMP-406 is proposed for Semester 3 in `catalog/courses.json` but not yet committed pending an owner ruling, as noted in `content-spec.md`.

## Acceptance and next steps

- Advisory report stored at `specs/content/efmp-406/reviews/unit-06/G3/f39ce2ec-8915-4b91-be9c-d3b7ce713df8.json`.
- G3 tracker row in `specs/content/efmp-406/tasks.md` is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- Unit 6 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
