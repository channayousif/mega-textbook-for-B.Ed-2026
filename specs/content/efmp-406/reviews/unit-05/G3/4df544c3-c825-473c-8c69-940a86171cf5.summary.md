# EFMP-406 Unit 5 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of EFMP-406 Unit 5 (Pedagogical Approaches to Contemporary Literacy) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: EFMP-406 (Contemporary Literacies), Semester 3, Major: Professional Course VI, Unit 5: Pedagogical Approaches to Contemporary Literacy
- Reviewed commit: `93a6ad99` (origin/main)
- Author run identity: `commit:93a6ad99` (crew: efmp-406-u05-author, author claude)
- Reviewer run identity: `4df544c3-c825-473c-8c69-940a86171cf5` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-11-02T15:00:25.000Z`
- Completed at: `2026-11-02T15:10:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Course learning outcomes 4 and 5 from the course guide (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:240-246`) and Unit 5 outline (`3rd 2026.txt:269-273`) map directly to sub-topics U5-01 through U5-04 in `specs/content/efmp-406/content-spec.md:256-299`.
  - All four sub-topics are taught under dedicated `###` headings across `docs/semester-3/efmp-406/unit-05/topic-01.mdx` (U5-01, U5-02) and `topic-02.mdx` (U5-03, U5-04).
  - `SLO:EFMP-406-5-1` and `SLO:EFMP-406-5-2` trace directly to course guide outcomes 4 and 5; `clo_refs` frontmatter is consistent across all unit files.
  - Course title and code EFMP-406 conform to the University of Sindh approved Scheme of Studies (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III row 4).

- **Sources (`pass`)**:
  - All 4 sources consulted and bound in `specs/content/efmp-406/sources/unit-05.md:5-10` verified against bound source texts:
    - `minott-2011-critical` (Minott, 2011): Used in Topic 5.1 (`topic-01.mdx:49-57`) for teacher tasks in a critical reading classroom (time for judgement, guiding evaluations, questioning, multiple viewpoints, journals); honest declaration that text was read from Semantic Scholar abstract due to repository HTTP 403.
    - `gasque-2016-inquiry` (Gasque, 2016): Full text read from SciELO Wayback Machine PDF; supports Dewey's 4 conditions (`topic-01.mdx:85-92`), research project parts adapted into 7 inquiry stages (`topic-01.mdx:94-110`), information literacy definition, Harada & Yoshina's 8 features, Yu et al. finding on ICT vs IL (`topic-02.mdx:77`), and continuous assessment in projects (`topic-02.mdx:126`).
    - `hafifah-2020-ict` (Hafifah & Sulistyo, 2020): Full text read from DergiPark PDF; accurately cites survey of 280 Indonesian lecturers, training/frequency correlations, facilities/training/support barriers (`topic-02.mdx:42-47`), and technology taking on teacher roles; notes context is Indonesian higher education with cautious application to Pakistan.
    - `rti-2016-egra` (RTI International, 2016): Full text read from USAID/RTI PDF; accurately cites assessment continuum (examinations, surveys, classroom assessments) after Kanjee (2009), low-stakes classroom purpose (`topic-02.mdx:90`), EGRA oral individual format, subtasks, and explicit warnings that no single instrument measures all reading skills and that oral assessments complement written tests (`topic-02.mdx:92, 122`).
  - All instructional examples (Mr Akbar, Ms Rubina, Mr Sajjad, Ms Hina, Zainab, Bilal) are clearly presented as original hypothetical teaching cases without statistical claims.

- **Coverage (`pass`)**:
  - Complete coverage of all 4 guide sub-topics: U5-01 (Learner-centred literacy instruction), U5-02 (Inquiry-based and project-based learning), U5-03 (Integration of ICT in literacy teaching), and U5-04 (Assessment and evaluation of literacy skills).
  - Coverage matrix at `specs/content/efmp-406/coverage/unit-05.md` accurately maps all 4 sub-topics to exact headings and source keys.
  - Reading-time budget: 58 minutes total (index 3 min, topic-01 15 min, topic-02 16 min, assessment 20 min, teacher-notes 4 min), falling strictly within the approved 55-75 minute band (`content-spec.md:281`).

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-C, 3-C, 4-A, 5-C, 6-B, 7-B, 8-C, 9-C, 10-B) match the supplied answer key 100%.
  - RRQ distribution: 5 items for Topic 5.1 and 5 items for Topic 5.2, satisfying the blueprint requirement of >= 2 RRQs per topic (`content-spec.md:297`).
  - ERQ distribution: 2 items for Topic 5.1, 2 items for Topic 5.2, and 1 integrative item across both topics, exactly matching the blueprint (`content-spec.md:298`). ERQ-05 satisfies the spec requirement for designing a Grade 5 literacy activity with an assessment plan.
  - All 25 items are mapped to concepts CON:EFMP-406-5-1 through CON:EFMP-406-5-12 in `specs/content/efmp-406/concepts/unit-05.md:7-18`; `check:concept-graph` exits 0.
  - ERQs feature analytic 4-criterion rubrics (3 marks each, totaling 12 marks) with explicit Analyze/Evaluate/Create cognitive demand.
  - Marking guidance and answer keys are strictly quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading progression verified across all unit MDX files with zero skipped levels.
  - Alt text on all four `<Figure>` tags matches SVG `<desc>` text and `figures/unit-05.md` manifest declarations.
  - `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins) with zero text overflow (widest text x=768.4, viewBox width 780) and zero wordmark collision (wordmark starts at x=675.7).
  - All four SVGs rasterized to PNG at 780px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 233.8 to 244.5.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts: learner-centred literacy instruction, teacher-centred lesson, inquiry-based learning, project-based learning, information literacy, ICT, ICT integration, ICT literacy, assessment, evaluation, formative assessment, summative assessment, examinations, assessment surveys, classroom assessments, reading record.
  - Carefully grounded in authentic Pakistani classroom and community contexts (Mr Akbar and Ms Rubina in Mirpurkhas, drinking water project with health leaflet and chowkidar interview, Sukkur bazaar notices project, Ms Hina's projector in Hyderabad, Mr Sajjad's mobile recordings in Badin village, Thatta school without internet, Zainab and Bilal reading records).
  - Clear distinction between general pedagogical principles and illustrative fictional teaching scenarios.
  - Appropriate vocabulary and tone for HSC/intermediate graduates without prior academic pedagogy training.

- **Pedagogy (`pass`)**:
  - Full nine-part learning cycle strictly maintained across both topics (situation -> Explanation -> Activity -> Check your understanding -> Summary -> Self-assessment checklist -> Practicum -> Summative task -> Further reading).
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (Redesign a lesson [35 min, groups of 3-4]; Assessment toolkit for one lesson [35 min, groups of 4]).
  - Specific misconceptions systematically identified and refuted: learner-centred means the teacher does nothing; project work is only for science; ICT integration means showing slides; a written test is the only way to assess reading.
  - Practicum school tasks provide ethical observation guidance (five-minute interval mapping of teacher vs pupil talk; conducting a 50-word reading record with cooperating teacher permission and pupil privacy respected).
  - Comprehensive teacher notes provided (`unit-teacher-notes.mdx`) covering pedagogical sequencing, discussion prompts with likely wrong answers, misconception handling, and practical work guidelines.

## Independent assessment solutions

All 25 items in `unit-assessment.mdx` were independently solved before inspecting the answer key:

1. **MCQ 1:** B (Learner-centred instruction is designed around what pupils need to do to learn, starting from what they know; A is unplanned laissez-faire, C is teacher-centred, D is isolated seatwork). Matches key.
2. **MCQ 2:** C (Dewey's third condition is raising problems that make pupils curious and send them to search for information; none requires computers, single lessons, or external examiners). Matches key.
3. **MCQ 3:** C (In the seven stages: 1 Ask, 2 Find, 3 Read, 4 Judge, 5 Make, 6 Share, 7 Reflect; "Judge the sources" directly follows reading and taking notes). Matches key.
4. **MCQ 4:** A (Investigating a community issue and producing a real product [a letter] for an authentic audience [the councillor] exemplifies project-based learning). Matches key.
5. **MCQ 5:** C (The teacher's work shifts to planning, grouping, guiding, and checking, so teacher effort changes rather than disappearing). Matches key.
6. **MCQ 6:** B (ICT integration means the tool is chosen for a specific literacy task that pupils could not do as well without it). Matches key.
7. **MCQ 7:** B (Facilities, including internet access and equipment, was the problem most frequently reported by teachers in Hafifah & Sulistyo, 2020). Matches key.
8. **MCQ 8:** C (Deciding from evidence that a pupil needs extra help with word endings is an instructional judgement, i.e., evaluation; listening, collecting, and asking questions are assessment evidence collection). Matches key.
9. **MCQ 9:** C (45 ÷ 50 × 100 = 90%). Matches key.
10. **MCQ 10:** B (A portfolio collects authentic student work across an entire term, capturing longitudinal growth; tests and initial records provide isolated snapshots). Matches key.

- **RRQs 1-10:** Model answers independently reviewed against the 3-mark, 4-mark, and 5-mark rubrics. Each prompt specifies length boundaries (3-4 or 4-5 sentences), authentic Pakistani classroom context, and cognitive demand matching Bloom's taxonomy (Understand to Analyze).
- **ERQs 1-5:** 12-mark tasks feature explicit 4-criterion analytic rubrics (0-3 marks each). ERQ-05 directly fulfills the spec blueprint requirement for a Create-level item designing a short Grade 5 literacy activity with an assessment plan.

## Visual and presentation inspection

- `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins):
  - `fig-U5-1.svg` & `fig-U5-1.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U5-2.svg` & `fig-U5-2.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U5-3.svg` & `fig-U5-3.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
  - `fig-U5-4.svg` & `fig-U5-4.dark.svg`: viewBox 780x470, widest text at x=768.4, wordmark at x=675.7.
- Sharp PNG rasterization at 780px width with `:root` CSS variables resolved:
  - `fig-U5-1.png`: 45,379 bytes, mean channel luminances [242.8, 244.5, 243.9, 255.0].
  - `fig-U5-2.png`: 66,886 bytes, mean channel luminances [233.8, 236.7, 235.8, 255.0].
  - `fig-U5-3.png`: 69,408 bytes, mean channel luminances [234.0, 236.9, 235.9, 255.0].
  - `fig-U5-4.png`: 59,138 bytes, mean channel luminances [234.4, 237.6, 236.5, 255.0].
- Heading structure: strictly monotonic heading hierarchies across all five MDX files with zero skipped levels.
- Mobile layout: content tables configured with static CSS `display: block; overflow-x: auto; width: fit-content;`. PrintHandout components embedded.

## Findings

- **Advisory (unresolved):** Teaching case illustrations and hypothetical examples: Fictional classroom scenarios (Mr Akbar, Ms Rubina, Mr Sajjad, Ms Hina, Zainab, Bilal) are original instructional examples designed for pedagogy and do not represent empirical case studies or official school inspection records.
- **Advisory (unresolved):** Headless review tooling constraint: The crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright Chromium. Visual, structural, and presentation checks were conducted within permitted host resources via measure-figure-text.mjs (all 8 SVG variants exit 0 with zero overflow or collision), static heading and table container analysis, and Sharp PNG rasterization with CSS variables resolved.
- **Advisory (unresolved):** Abstract-level citation for Minott (2011): The publisher full text returned HTTP 403 on 2026-11-02, so citations are strictly limited to findings and teacher tasks reported in the published abstract retrieved via Semantic Scholar.
- **Advisory (unresolved):** Mapped reading context for Hafifah & Sulistyo (2020): The study surveyed Indonesian higher education lecturers; lessons are cautiously applied to Pakistani primary and middle school literacy contexts with explicit recognition of contextual differences.
- **Advisory (unresolved):** Catalog entry pending owner ruling: EFMP-406 is proposed for Semester 3 in `catalog/courses.json` but not yet committed pending an owner ruling, as noted in `content-spec.md`.

## Acceptance and next steps

- Advisory report stored at `specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json`.
- G3 tracker row in `specs/content/efmp-406/tasks.md` is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- Unit 5 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
