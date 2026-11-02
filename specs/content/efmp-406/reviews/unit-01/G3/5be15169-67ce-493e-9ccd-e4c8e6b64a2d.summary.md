# EFMP-406 Unit 1 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of EFMP-406 Unit 1 (Concept and Evolution of Literacy) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: EFMP-406 (Contemporary Literacies), Semester 3, Major: Professional Course VI, Unit 1: Concept and Evolution of Literacy
- Reviewed commit: `80161787` (origin/main)
- Author run identity: `commit:80161787` (crew: efmp-406-u01-author, author claude)
- Reviewer run identity: `5be15169-67ce-493e-9ccd-e4c8e6b64a2d` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-11-02T08:16:20.000Z`
- Completed at: `2026-11-02T08:26:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Course learning outcomes 1 and 2 from the course guide (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:240-246`) and Unit 1 outline (`3rd 2026.txt:249-253`) map directly to sub-topics U1-01 through U1-04 in `specs/content/efmp-406/content-spec.md:80-97`.
  - All four sub-topics are taught under dedicated `###` headings across `docs/semester-3/efmp-406/unit-01/topic-01.mdx` (U1-01, U1-02) and `topic-02.mdx` (U1-03, U1-04).
  - `SLO:EFMP-406-1-1` and `SLO:EFMP-406-1-2` trace directly to course guide outcomes 1 and 2; `clo_refs` frontmatter is consistent across all unit files.
  - Course title and code EFMP-406 conform to the University of Sindh approved Scheme of Studies (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III row 4).

- **Sources (`pass`)**:
  - The approved open-access floor of 1 is met; 3 primary and secondary works are consulted, verified, and bound in `specs/content/efmp-406/sources/unit-01.md`.
  - Uta Papen (2023) (`papen-2023-nls`, CC BY 4.0): publisher PDF verified; grounds section 2 skills view / autonomous model, section 3 New Literacy Studies / ideological model / social-practice view, section 4 multiliteracies and new illiteracies, and section 5 real literacies approach for adult learners in the Global South using authentic texts.
  - Shakir, Lone, & Zafar (2012) (`shakir-2012-literacy-pk`, diamond OA): Semantic Scholar record verified; confirms primary completion as an unreliable proxy for functional literacy in Pakistan and supports the call for Class 6 as a firmer benchmark.
  - Constitution of Pakistan 1973 (as modified up to 28 February 2012) (`pak-constitution-1973`): Article 25A right to free and compulsory education for children aged 5-16 verified as the Pakistani instance of mass schooling.
  - Guide-listed inclusive education monographs are declared under Mapped-reading limits per `G-2026-73` and `D-2026-0001` and not relied upon for any literacy claim; all factual propositions in the unit are fully grounded in verified open-access sources.

- **Coverage (`pass`)**:
  - Complete coverage of all 4 guide sub-topics: U1-01 (Meaning and nature of literacy), U1-02 (Traditional and contemporary views of literacy), U1-03 (Historical development of literacy practices), and U1-04 (Literacy as a lifelong learning process).
  - Coverage matrix at `specs/content/efmp-406/coverage/unit-01.md` accurately maps all 4 sub-topics to exact headings and source keys.
  - Reading-time budget: 58 minutes total (index 3 min, topic-01 16 min, topic-02 16 min, assessment 19 min, teacher-notes 4 min), falling strictly within the approved 55-75 minute band (`content-spec.md:105`).

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-C, 3-A, 4-B, 5-C, 6-B, 7-B, 8-A, 9-B, 10-B) match the supplied answer key 100%.
  - RRQ distribution: 5 items for Topic 1.1 and 5 items for Topic 1.2, satisfying the blueprint requirement of >= 2 RRQs per topic (`content-spec.md:121`).
  - ERQ distribution: 2 items for Topic 1.1, 2 items for Topic 1.2, and 1 integrative item across both topics, exactly matching the blueprint (`content-spec.md:122`). ERQ-01 satisfies the required item comparing skills vs social-practice view using a Pakistani classroom example.
  - All 25 items are mapped to concepts CON:EFMP-406-1-1 through CON:EFMP-406-1-10 in `specs/content/efmp-406/concepts/unit-01.md:7-16`; `check:concept-graph` exits 0.
  - ERQs feature analytic 4-criterion rubrics (3 marks each, totaling 12 marks) with explicit Analyze/Evaluate/Create cognitive demand.
  - Marking guidance and answer keys are strictly quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading progression verified across all unit MDX files with zero skipped levels.
  - Alt text on all four `<Figure>` tags matches SVG `<desc>` text and `figures/unit-01.md` manifest declarations.
  - `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins) with zero text overflow (widest text x=768.4, viewBox width 780) and zero wordmark collision (wordmark starts at x=675.7).
  - All four SVGs rasterized to PNG at 780px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 236.9 to 249.4.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts: literacy, text, decoding, encoding, comprehension, composing, numeracy, functional literacy, literacy practice, New Literacy Studies, autonomous model, ideological model, multiliteracies, manuscript, print, mass schooling, screens, lifelong learning, learn to read, read to learn, real literacies.
  - Carefully grounded in authentic Pakistani classroom and community contexts (Nadia in Tando Allahyar primary school, Sana and Imran at father's shop, Quran recitation in Arabic, Hyderabad khata credit notebook, Larkana mobile job application, Quetta mother's note, Bilal in Sukkur girls' high school, Hira's grandmother in village mosque, Ayesha's munshi grandfather, Mariam's mother's mobile banking app).
  - Clear distinction between general concepts and illustrative classroom teaching cases and analogies.
  - Appropriate vocabulary and tone for HSC/intermediate graduates without prior academic training.

- **Pedagogy (`pass`)**:
  - Full nine-part learning cycle strictly maintained across both topics (situation -> Explanation -> Activity -> Check your understanding -> Summary -> Self-assessment checklist -> Practicum -> Summative task -> Further reading).
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (Literacy practices in our town [30 min, groups of 4]; The literacy life interview [40 min, pairs]).
  - Specific misconceptions systematically identified and refuted: literacy only meaning reading and writing; signing a name proving literacy; contemporary literacy replacing reading and writing; literacy being complete after primary school.
  - Practicum school tasks provide ethical observation guidance (listing pupil texts in and out of classroom; noting learning to read vs reading to learn; asking cooperating teachers about challenging texts).
  - Comprehensive teacher notes provided (`unit-teacher-notes.mdx`) covering pedagogical sequencing, discussion prompts with likely wrong answers, misconception handling, and practical work guidelines.

## Independent assessment solutions

All 25 items in `unit-assessment.mdx` were independently solved before inspecting the answer key:

1. **MCQ 1:** B (Comprehension is understanding the meaning of what is read; A is decoding, C is copying/encoding, D is reading aloud fluency). Matches key.
2. **MCQ 2:** C ("Functional" adds that literacy is good enough to meet daily life and work demands). Matches key.
3. **MCQ 3:** A (The autonomous model views literacy as a fixed, context-independent set of cognitive skills). Matches key.
4. **MCQ 4:** B (Signing a name is a memorised pattern, but does not establish functional literacy for reading bank letters). Matches key.
5. **MCQ 5:** C (Bringing everyday timetables and bills into lessons reflects the social-practice / real-literacies view). Matches key.
6. **MCQ 6:** B (Manuscript stage made books rare hand-copied items restricted to elite scholars and scribes). Matches key.
7. **MCQ 7:** B (Printing enabled mass duplication, standardised spelling/layout, and private reading). Matches key.
8. **MCQ 8:** A (Cumulative evolution where older oral/print practices continue alongside newer tools). Matches key.
9. **MCQ 9:** B (Transition from learning to read to disciplinary reading-to-learn involves tables and specialised science texts). Matches key.
10. **MCQ 10:** B (Adopting digital payment platforms demonstrates literacy as lifelong learning triggered by new tools). Matches key.

- **RRQs 1-10:** Model answers independently reviewed against the 3-mark and 4-mark rubrics. Each prompt clearly specifies length boundaries (3-4 or 4-5 sentences), concrete Pakistani examples, and cognitive demand matching Bloom's taxonomy (Understand to Analyze).
- **ERQs 1-5:** 12-mark tasks feature explicit 4-criterion analytic rubrics (0-3 marks each). ERQ-01 directly fulfills the spec blueprint requirement for an Analyze-level item comparing skills and social-practice views using a Pakistani classroom example.

## Visual and presentation inspection

- `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins):
  - `fig-U1-1.svg` & `fig-U1-1.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U1-2.svg` & `fig-U1-2.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U1-3.svg` & `fig-U1-3.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U1-4.svg` & `fig-U1-4.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
- Sharp PNG rasterization at 780px width with `:root` CSS variables resolved:
  - `fig-U1-1.png`: 32,138 bytes, mean channel luminances [238.4, 241.1, 240.2, 255.0].
  - `fig-U1-2.png`: 48,210 bytes, mean channel luminances [236.9, 239.6, 238.7, 255.0].
  - `fig-U1-3.png`: 43,300 bytes, mean channel luminances [237.9, 240.6, 239.6, 255.0].
  - `fig-U1-4.png`: 40,056 bytes, mean channel luminances [248.8, 249.4, 249.2, 255.0].
- Heading structure: strictly monotonic heading hierarchies across all five MDX files with zero skipped levels.
- Mobile layout: content tables configured with static CSS `display: block; overflow-x: auto; width: fit-content;`. PrintHandout components embedded.

## Findings

- **Advisory (unresolved):** Teaching case illustrations and hypothetical examples: Fictional classroom scenarios (Nadia in Tando Allahyar, Bilal in Sukkur, Sana, Imran, Mariam's mother, munshi and khata cases) are original instructional examples designed for pedagogy and do not represent empirical case studies or official school inspection records.
- **Advisory (unresolved):** Headless review tooling constraint: The crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright Chromium. Visual, structural, and presentation checks were conducted via measure-figure-text.mjs (all 8 SVG variants exit 0 with zero overflow or collision), static heading and table container analysis, and Sharp PNG rasterization with CSS variables resolved.
- **Advisory (unresolved):** Abstract-level citation for Shakir et al. (2012): The publisher full text returned HTTP 403 on 2026-11-02, so citations are strictly limited to findings reported in the published abstract retrieved via Semantic Scholar.
- **Advisory (unresolved):** Catalog entry pending owner ruling: EFMP-406 is proposed for Semester 3 in `catalog/courses.json` but not yet committed pending an owner ruling, as noted in `content-spec.md`.

## Acceptance and next steps

- Advisory report stored at `specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json`.
- G3 tracker row in `specs/content/efmp-406/tasks.md` is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- Unit 1 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
