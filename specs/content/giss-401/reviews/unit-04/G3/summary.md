# GISS-401 Unit 4 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of GISS-401 Unit 4 (The Social System and the State in Islam) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: GISS-401 (Islamic Studies / Ethics), Semester 3, General: Interdisciplinary/Social Sciences, Unit 4: The Social System and the State in Islam
- Reviewed commit: `684a2e7c` (origin/main)
- Author run identity: `commit:684a2e7c` (crew author)
- Reviewer run identity: `a5031c12-2079-4b0e-b718-bb161d2381bc` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-11-03T01:46:50.000Z`
- Completed at: `2026-11-03T01:56:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Scheme of Studies and course outline (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:435-441`): Week 8 (Islamic Social System: Family system in Islam, Rights and responsibilities, Social justice and equality) and Week 9 (Concept of State and Democracy in Islam: State System in Islam, Concept of Democracy in Islam) match the unit structure and course guide objectives.
  - Course title and code GISS-401 conform to the University of Sindh approved Scheme of Studies (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III).
  - Unit specification and sub-topic checklist mapping U4-01 through U4-05 to Topics 4.1 and 4.2 with matching CLO/SLO references `SLO:GISS-401-4-1` and `SLO:GISS-401-4-2` in `specs/content/giss-401/content-spec.md:215-259`.
  - All five sub-topics are explicitly taught under dedicated `###` headings in `docs/semester-3/giss-401/unit-04/topic-01.mdx` (U4-01, U4-02, U4-03) and `topic-02.mdx` (U4-04, U4-05).

- **Sources (`pass`)**:
  - Open-access floor of 1 met; verified and bound in `specs/content/giss-401/sources/unit-04.md`.
  - Qur'an translation consulted (Mustafa Khattab, The Clear Quran, via Quran.com; verified and bound in `specs/content/giss-401/sources/texts/quran-translation.md`): all passages cited (30:21, 17:23-24, 2:233, 4:36, 4:7, 4:135, 49:13, 5:8, 4:58, 12:40, 2:30, 42:38, 3:159) verified against Arabic text and English translation; cited by exact surah:ayah; paraphrased rather than quoted; applications to school situations clearly distinguished from scriptural text.
  - Abdel Salam (2015) (`abdel-salam-2015-democracy`, open-access journal article): verified via TAFHIM: IKIM Journal of Islam and the Contemporary World, DOI 10.56389/tafhim.vol1no3.6; full text read at publisher repository; accurately cites Ghannouchi's arguments for democratic mechanisms and representation (pp. 112-115) and Qutb's critique based on divine sovereignty (p. 118) as reported scholarly perspectives rather than universal consensus; bound in `specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md`.
  - Mapped reading availability: guide's *Islami Nazriya-e-Hayat* was title-level only in the spec with no accessible edition; properly disclosed in `sources/unit-04.md` as unread and not relied upon per D-2026-0001 and D-2026-0079; existing intake escalation G-2026-197 noted.
  - All classroom situations, school councils, library allocations, and reading group examples are original invented teaching cases and explicitly labelled as such; no uncorroborated empirical claims asserted.

- **Coverage (`pass`)**:
  - Complete coverage of all 5 guide sub-topics: U4-01 (Family system in Islam), U4-02 (Rights and responsibilities), U4-03 (Social justice and equality), U4-04 (State system in Islam), U4-05 (Concept of democracy in Islam).
  - Coverage matrix at `specs/content/giss-401/coverage/unit-04.md` accurately maps all sub-topics to exact headings, files, and source keys.
  - Reading-time budget: 47 minutes total (index 2 min, topic-01 14 min, topic-02 15 min, assessment 16 min), falling strictly within the approved 40-55 minute band (`content-spec.md:241`).

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-C, 3-A, 4-D, 5-B, 6-A, 7-C, 8-D, 9-B, 10-A) match the supplied answer key 100%.
  - RRQ distribution: 5 items for Topic 4.1 and 5 items for Topic 4.2, satisfying the blueprint requirement of >= 2 RRQs per topic (`content-spec.md:257`).
  - ERQ distribution: 2 items for Topic 4.1, 2 items for Topic 4.2, and 1 integrative item across both topics, exactly matching the blueprint (`content-spec.md:258`). ERQ-03 satisfies the spec requirement for evaluating an argument about Islam and democracy using sources.
  - All 25 items are mapped to concepts CON:GISS-401-4-1 through CON:GISS-401-4-8 in `specs/content/giss-401/concepts/unit-04.md`; `check:concept-graph` exits 0.
  - ERQs feature analytic 4-criterion rubrics (0-3 marks each, totaling 12 marks) with explicit performance levels (0, 1, 2, 3) and Analyze/Create/Evaluate cognitive demand.
  - Marking guidance and answer keys are strictly quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading progression verified across all unit MDX files with zero skipped levels.
  - Alt text on all four `<Figure>` tags matches SVG `<desc>` text and `figures/unit-04.md` manifest declarations.
  - `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins) with zero text overflow (widest text x=620.2, viewBox width 640) and zero wordmark collision (wordmark at x=527.7).
  - All four SVGs rasterized to PNG at 640px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 226.1 to 243.9.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts: family system, right, responsibility, Huquq ul-Ibad, Huquq Allah, equality, equity, social justice, state, government, Islamic state, public trust, sovereignty, khilafat, shura, justice, accountability, democracy.
  - Carefully grounded in authentic Pakistani classroom and community contexts (Badin reading afternoon, Hyderabad teacher-education classroom, school library budget, borrowed classroom ruler).
  - Clear distinction between general principles and illustrative fictional teaching scenarios.
  - Appropriate vocabulary and tone for HSC/intermediate graduates without prior academic theological or political theory training.

- **Pedagogy (`pass`)**:
  - Full pedagogical cycle maintained across both topics: real classroom situation -> Explanation with sub-topic headings -> Worked examples -> Activity with group roles and time allocation -> Check your understanding with Bloom labels -> Summary -> Self-assessment checklist -> Try this at your practicum school (ethical, observation-only, no personal data collection) -> Summative task with rubric -> Further reading.
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (A fair invitation and support plan [20 min, groups of 4]; Test the claim, then revise it [25 min, groups of 3]).
  - Specific misconceptions systematically identified and refuted: rights in Islam belong only to men; social justice means everyone gets the same; Islam and democracy are always in conflict.
  - Practicum school tasks provide ethical observation guidance (examining a routine invitation or public notice for accessible communication; discussing with cooperating teachers without promising changes or requesting private family records).

## Independent assessment solutions

All 25 items in `unit-assessment.mdx` were independently solved before inspecting the answer key:

1. **MCQ 1:** B (A family system is a network of care and responsibilities among related people across generations; residence, property or school lists do not define it). Matches key.
2. **MCQ 2:** C (Huquq ul-Ibad refers to the rights of people, contrasted with Huquq Allah which refers to duties owed to Allah). Matches key.
3. **MCQ 3:** A (A damaged borrowed ruler requires arranging fair repair or replacement to address the remaining responsibility of harm). Matches key.
4. **MCQ 4:** D (Providing large print for a low-vision pupil responds to a relevant access need to ensure fair participation, exemplifying equity). Matches key.
5. **MCQ 5:** B (Inviting recorded carers and offering clarification respects actual care arrangements across diverse family situations). Matches key.
6. **MCQ 6:** A (Shura means consultation about shared affairs). Matches key.
7. **MCQ 7:** C (The state is a continuing public order over territory, while government is the institutions/officeholders administering it at a given time). Matches key.
8. **MCQ 8:** D (Consultation is strengthened when affected groups are heard while feasible choices remain open, rather than announcing a fait accompli). Matches key.
9. **MCQ 9:** B (In the Islamic governance conception studied, ultimate sovereignty belongs to Allah, placing moral limits on human authority). Matches key.
10. **MCQ 10:** A (Exclusion by vote requires examining both the voting procedure and the substantive justice of the outcome, rather than treating procedural vote count as guaranteeing justice). Matches key.

- **RRQs 1-10:** Model answers independently reviewed against the 4-mark analytic rubrics. Prompts specify length boundaries (3-4 sentences), authentic context, and cognitive demand matching Bloom's taxonomy (Understand to Analyze).
- **ERQs 1-5:** 12-mark tasks feature explicit 4-criterion analytic rubrics (0-3 marks each). ERQ-03 directly fulfills the spec blueprint requirement for evaluating an argument about Islam and democracy using sources.

## Visual and presentation inspection

- `scripts/measure-figure-text.mjs` exits 0 across all 8 SVG variants (4 light, 4 dark twins):
  - `fig-U4-1.svg` & `fig-U4-1.dark.svg`: viewBox 640x498, widest text at x=620.2, wordmark at x=527.7.
  - `fig-U4-2.svg` & `fig-U4-2.dark.svg`: viewBox 640x502, widest text at x=620.2, wordmark at x=527.7.
  - `fig-U4-3.svg` & `fig-U4-3.dark.svg`: viewBox 640x534, widest text at x=620.2, wordmark at x=527.7.
  - `fig-U4-4.svg` & `fig-U4-4.dark.svg`: viewBox 640x626, widest text at x=620.2, wordmark at x=527.7.
- Sharp PNG rasterization at 640px native width with `:root` CSS variables resolved:
  - `fig-U4-1.png`: 32,852 bytes, mean channel luminances [239.9, 243.9, 243.0, 255.0].
  - `fig-U4-2.png`: 40,515 bytes, mean channel luminances [229.1, 236.5, 234.8, 255.0].
  - `fig-U4-3.png`: 38,377 bytes, mean channel luminances [233.5, 239.7, 238.3, 255.0].
  - `fig-U4-4.png`: 46,735 bytes, mean channel luminances [226.1, 234.8, 232.8, 255.0].

## Status and handoff

- Advisory report stored at `specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json`.
- The task tracker row in `specs/content/giss-401/tasks.md` is updated with an advisory pass note; G3 remains open (`▢`) and unsigned per ADR-0019.
- Content is ready for Urdu translation (`G4 ur-translation`).
