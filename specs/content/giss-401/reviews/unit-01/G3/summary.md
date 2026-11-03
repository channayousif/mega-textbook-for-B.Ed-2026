# GISS-401 Unit 1 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of GISS-401 Unit 1 (Introduction to Islamic Studies and the Fundamental Beliefs of Islam) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: GISS-401 (Islamic Studies), Semester 3, General Education, Unit 1: Introduction to Islamic Studies and the Fundamental Beliefs of Islam
- Reviewed commit: `56904399b` (origin/main)
- Author run identity: `commit:56904399b` (crew: giss-401-u01-author, author claude)
- Reviewer run identity: `fb1baf5a-8583-4edd-a5d3-bf7e01304eaf` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-11-03T00:16:30.000Z`
- Completed at: `2026-11-03T00:26:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/giss-401/reviews/unit-01/G3/fb1baf5a-8583-4edd-a5d3-bf7e01304eaf.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Course learning objectives 1 to 5 from the course guide (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:401-406`) and Week 1 to 2 breakdown (`3rd 2026.txt:408-415`) map directly to sub-topics U1-01 through U1-06 in `specs/content/giss-401/content-spec.md:81-91`.
  - All six sub-topics are taught under dedicated sections across `docs/semester-3/giss-401/unit-01/topic-01.mdx` (U1-01, U1-02, U1-03) and `topic-02.mdx` (U1-04, U1-05, U1-06).
  - `SLO:GISS-401-1-1` and `SLO:GISS-401-1-2` trace directly to course guide objective 1; `clo_refs` frontmatter is consistent across all unit MDX files.
  - Course title and code GISS-401 conform to the University of Sindh approved Scheme of Studies (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III row 2), with D-2026-0079 confirming the syllabus partition and approved spec status.

- **Sources (`pass`)**:
  - The approved open-access floor of 1 is met; primary and secondary works are consulted, verified, and bound in `specs/content/giss-401/sources/unit-01.md`.
  - Qur'anic verses (3:19, 2:177, 96:1, 20:114, 39:9, 17:36, 2:30, 2:208, 6:162, 5:3, 112:1-4, 42:11, 1:5, 4:48, 29:61, 49:13, 16:36, 2:285, 33:40, 21:107, 33:21, 99:7-8, 23:115, 3:185, 82:10-12, 9:105, 103:2-3, 4:136, 2:97, 3:3, 4:163, 15:9, 54:49, 2:286, 13:11) are accurately cited and quoted in translation from the Saheeh International text bound in `sources/texts/quran-translation.md`.
  - Hadith of Jibril (*Sahih Muslim* 8a) is accurately cited and paraphrased in `sources/texts/sahih-bukhari-muslim.md` for the six articles of faith and five pillars distinction.
  - Bhat (2019) (`bhat-2019-education`, diamond OA, OpenAlex W3028482776): publisher PDF verified; accurately cited in Topic 1.1 as a review of Ayirur (2019) on Islamic philosophy of education, Qur'anic reflection terms, teacher as role model and heir of the prophets, human as vicegerent, and balanced personality development.
  - Constitution of Pakistan 1973 (`pak-constitution-1973`): Article 31 verified as a Principle of Policy on the Islamic way of life and compulsory teaching of the Holy Qur'an and Islamiat.
  - Maududi (1960) *Towards Understanding Islam* is declared under `## Unverifiable sources` with Open Library OL12324456W HTTP 200 per D-2026-0001 (title-level support) for general Chapter 1 cosmic submission vs human free will.

- **Coverage (`pass`)**:
  - Complete coverage of all six guide sub-topics: U1-01 (Meaning and scope of Islamic Studies), U1-02 (Importance of Islamic education), U1-03 (Islam as a complete code of life), U1-04 (Concept of Tauheed), U1-05 (Risalat and Akhirat), and U1-06 (Articles of faith).
  - Coverage matrix at `specs/content/giss-401/coverage/unit-01.md` accurately maps all six sub-topics to exact sections and source keys.
  - Concept graph at `specs/content/giss-401/concepts/unit-01.md` links 10 concepts (CON:GISS-401-1-1 to CON:GISS-401-1-10) to SLOs and assessment items; `check:concept-graph` passes with exit 0.
  - Reading-time budget: index 3 min, topic-01 16 min, topic-02 16 min, assessment 16 min, total 51 min, fitting within the approved 40-55 minute band (`content-spec.md:99`).

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-C, 3-D, 4-A, 5-B, 6-C, 7-A, 8-D, 9-B, 10-B) match the supplied answer key 100%.
  - RRQ distribution: 5 items for Topic 1.1 and 5 items for Topic 1.2, satisfying the blueprint requirement of >= 2 RRQs per topic.
  - ERQ distribution: 2 items for Topic 1.1, 2 items for Topic 1.2, and 1 integrative item across both topics, exactly matching the blueprint. ERQ-03 satisfies the required Analyze-or-higher item asking how belief in Akhirat shapes a teacher's conduct.
  - ERQs feature analytic 4-criterion rubrics (3 marks each, totaling 12 marks) with explicit Analyze/Evaluate/Create cognitive demand.
  - Marking guidance and answer keys are strictly quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading progression verified across all unit MDX files with zero skipped levels.
  - Alt text on all four `<Figure>` tags matches SVG `<desc>` text and `figures/unit-01.md` manifest declarations.
  - All four unit SVGs rasterized to PNG at 780px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 232 to 242 on white background.
  - Content tables configured with static CSS `display: block; overflow-x: auto; width: fit-content;`.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts: Islam, Muslim, din, Islamic Studies, branches, Tauheed (Rububiyyah, Asma wa al-Sifat, Uluhiyyah), shirk, Risalat, Khatm-e-Nabuwwat, Akhirat, Aqaid, Iman, Iman-e-Mujmal, Iman-e-Mufassal, taqdir.
  - Carefully grounded in authentic Pakistani classroom contexts (Ayesha in Hyderabad government girls' high school, Saleem in Larkana government boys' middle school, pupil Bilal, science teacher).
  - Clear distinction between general concepts and illustrative classroom teaching cases.
  - Appropriate vocabulary and tone for HSC/intermediate graduates without prior theological degree.

- **Pedagogy (`pass`)**:
  - Full learning cycle strictly maintained across both topics (situation -> Explanation -> Activity -> Check your understanding -> Summary -> Self-assessment checklist -> Practicum -> Summative task -> Further reading).
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (Sort the questions [30 min, groups of 4]; From belief to behaviour [30 min, groups of 3]).
  - Specific persistent misconceptions systematically identified and refuted: Islamic Studies being only about rituals; Tauheed meaning only that God exists; belief having no link to daily conduct; divine decree removing responsibility.
  - Practicum school tasks provide reflective observation guidance on the presence of Islamic values in school culture.

## Independent assessment solutions

All 25 items in `unit-assessment.mdx` were independently solved before inspecting the answer key:

1. **MCQ 1:** B (Root s-l-m conveys peace and submission. In religious context, Islam means submission to Allah, freely chosen; A and C confuse faith with custom/ethnicity, D is one ritual act). Matches key.
2. **MCQ 2:** C (Fiqh is Islamic jurisprudence dealing with rulings on worship and practical dealings; Seerah is biography, Aqidah is belief, Tafsir explains the Qur'an). Matches key.
3. **MCQ 3:** D (Surah al-Alaq 96:1 opens with the divine command "Recite in the name of your Lord who created"). Matches key.
4. **MCQ 4:** A (Ulum al-Hadith investigates the authenticity, transmission chains, and verification of prophetic traditions). Matches key.
5. **MCQ 5:** B (Refusing a monetary/gift bribe in exchange for inflated marks directly governs halal vs haram earning in economic life). Matches key.
6. **MCQ 6:** C (Tauheed al-Uluhiyyah signifies dedicating worship and absolute obedience solely to Allah; A is Rububiyyah, B is Asma wa al-Sifat). Matches key.
7. **MCQ 7:** A (Surah al-Ahzab 33:40 explicitly designates the Prophet Muhammad as the seal of the prophets). Matches key.
8. **MCQ 8:** D (Hajj is one of the five pillars of Islam, an act of worship, not one of the six articles of faith). Matches key.
9. **MCQ 9:** B (Acknowledging Allah's existence and creative power covers lordship only, leaving out worship and unconditional obedience to Him alone). Matches key.
10. **MCQ 10:** B (Belief in Akhirat and divine accounting of all deeds, even an atom's weight, provides internal motivation for integrity without external monitoring). Matches key.

- **RRQs 1-10:** Model answers independently reviewed against the 3-mark analytical mark schemes. Each prompt clearly specifies length boundaries (2-3 or 3-4 sentences), concrete references, and cognitive demand matching Bloom's taxonomy (Understand to Analyze).
- **ERQs 1-5:** 12-mark tasks feature explicit 4-criterion analytic rubrics (0-3 marks each). ERQ-03 directly fulfills the spec blueprint requirement for an Analyze-level item demonstrating how belief in Akhirat guides teacher conduct across three school situations.

## Visual and presentation inspection

- Sharp PNG rasterization at 780px width with `:root` CSS variables resolved:
  - `fig-U1-1.png` (780x540): 53,580 bytes, mean channel luminances [239, 242, 241, 255].
  - `fig-U1-2.png` (780x512): 44,792 bytes, mean channel luminances [232, 235, 234, 255].
  - `fig-U1-3.png` (780x502): 49,021 bytes, mean channel luminances [233, 236, 235, 255].
  - `fig-U1-4.png` (780x470): 36,929 bytes, mean channel luminances [232, 237, 237, 255].
- Heading structure: strictly monotonic heading hierarchies across all four unit MDX files with zero skipped levels.
- Mobile layout: content tables configured with static CSS `display: block; overflow-x: auto; width: fit-content;`. PrintHandout components embedded.

## Findings

1. **Theological content review scope (advisory)**: As noted in content-spec.md (drafting note 2) and authoring/unit-01.md, statements of belief, ritual and law in Islamic Studies should receive confirmation by a qualified scholar of Islamic Studies at G3 in addition to general independent review. This advisory review verifies general pedagogical, curricular, structural, and citation integrity without certifying theological consensus.
2. **Teaching case illustrations (advisory)**: Classroom scenarios (Ayesha in Hyderabad observing Class 9 wudu recitation vs homework copying, Saleem in Larkana with Class 8 test copying, pupil Bilal, and the science teacher) are original pedagogical teaching illustrations designed to model teacher reflection and do not represent empirical case studies or official inspection records.
3. **Headless review tooling constraint (advisory)**: The crew job brief explicitly prohibits running npm run build, a dev server, or Playwright Chromium. Visual and presentation checks were conducted via Sharp PNG rasterization with CSS variables resolved, static heading hierarchy analysis, and gate script executions.
4. **Catalog entry pending owner ruling (advisory)**: GISS-401 is proposed for Semester 3 in catalog/courses.json but not yet committed pending an owner ruling, as recorded in content-spec.md and confirmed in D-2026-0079.
5. **Title-level source support (advisory)**: Maududi (1960) Towards Understanding Islam is cited for title-level support under D-2026-0001 with Open Library catalog record OL12324456W HTTP 200, as declared in sources/unit-01.md under Unverifiable sources.
