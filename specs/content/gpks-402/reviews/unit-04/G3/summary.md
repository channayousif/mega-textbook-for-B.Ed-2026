# GPKS-402 Unit 4 independent G3 advisory review

Disposition: **pass**. Independent G3 English review of GPKS-402 Unit 4 (Governance, Fundamental Rights and Geography) conducted under ADR-0019 and the Feature 014 review evidence contract. All seven evaluation criteria pass with concrete evidence and file/section locators.

- Course: GPKS-402 (Pakistan Studies), Semester 2, General Education, Unit 4: Governance, Fundamental Rights and Geography
- Reviewed commit: `6bf2c85c` (origin/main)
- Author run identity: `commit:6bf2c85c` (feat(gpks-402): author Unit 4 Governance, Fundamental Rights and Geography (EN))
- Reviewer run identity: `8e3bf462-d4af-437f-aa63-372eb41b9e7c` (agy, fresh session)
- Reviewer: `agent:g3-reviewer`
- Model: `Gemini 3.8 Flash (High)`
- Started at: `2026-10-28T17:30:00.000Z`
- Completed at: `2026-10-28T17:42:00.000Z`
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`
- Report path: `specs/content/gpks-402/reviews/unit-04/G3/8e3bf462-d4af-437f-aa63-372eb41b9e7c.json`

This is an independent advisory review. It does not certify the unit, sign evidence, mark G3 done, or modify publication state.

## Evaluation criteria summary

- **Authority (`pass`)**:
  - Week 7 (Political and Administrative Structure: federal system, legislature, executive, judiciary, civil-military relations), Week 8 (Fundamental Rights and Duties: fundamental rights, principles of policy, role of citizens), and Week 10 (Geography: physical features, climate and natural resources, strategic importance of Pakistan) from the course guide (`Scheme-and-Course-guides/extracted-text/2nd 2026.txt:1069-1094`) map one-to-one to sub-topics U4-01 through U4-11 in `specs/content/gpks-402/content-spec.md:220-230`. Week 9 is the mid-term examination (no content).
  - All 11 sub-topics are taught under dedicated `###` headings across `topic-01.mdx`, `topic-02.mdx`, and `topic-03.mdx`.
  - `SLO:GPKS-402-4-1`, `SLO:GPKS-402-4-2`, and `SLO:GPKS-402-4-3` trace directly to course guide objectives 3 and 4 (guide lines 1003-1005); `clo_refs` frontmatter is consistent across all unit files.
  - Course code GPKS-402 follows the authoritative University of Sindh scheme of studies per `G-2026-03` (`content-spec.md:12`).
  - Mapped print monographs (*Constitutional and Political History of Pakistan* and *Pakistan Studies*) are handled per `D-2026-0001` under Unverifiable sources in `sources/unit-04.md:16-19`.

- **Sources (`pass`)**:
  - The approved open-access floor of 1 is met; 7 open-access works are consulted and bound.
  - Primary constitutional provisions are verified against the National Assembly official text (`pak-constitution-1973`): Articles 1, 140A, 142, 153, 155, 160 on federalism; 50-52, 59, 70, 73, 75 on Parliament; 41, 48, 58, 90, 91 on the executive; 175, 175A, 184, 185, 189, 199 on the courts; 6, 39, 245 on the Armed Forces; 7-28 and 233 on fundamental rights; 29-40 on principles of policy; 5, 51 on citizenship; and 161 on resource revenues.
  - Abolition of the Concurrent List, repeal of Article 58(2)(b), judicial appointment procedures, and fundamental rights additions (10A, 19A, 25A) are verified against Hussain & Kokab (2012) `hussain-kokab-2012-18th`.
  - Chronology of military and civilian rule, causes of intervention, and external security factors (1950s pacts, 1979 Soviet intervention in Afghanistan) are verified against Rizvi (2004) `rizvi-2004-civil-military`.
  - The 32-year historical duration of direct military domination is verified against Taj, Shah & Ahmad (2016) `taj-2016-civil-military`.
  - Indus Basin irrigation scale, food production share (90%), storage constraints, and salinity/waterlogging pressures are verified against Qureshi (2011) `qureshi-2011-indus`.
  - The 2022 flood impacts, heavy monsoon rainfall intensification, and vulnerability dynamics are verified against Otto et al. (2023) `otto-2023-floods`.
  - CPEC strategic transport, energy corridors, and military security arrangements are verified against Wolf (2017) `wolf-2017-cpec`.
  - Print monographs Khan and Rabbani are declared under Unverifiable sources in `sources/unit-04.md:16-19` per `D-2026-0001`; all specific claims are grounded in verified open-access sources.

- **Coverage (`pass`)**:
  - Complete coverage of all 11 guide sub-topics: U4-01 (Federal system), U4-02 (Legislature), U4-03 (Executive), U4-04 (Judiciary), U4-05 (Civil-military relations), U4-06 (Fundamental rights), U4-07 (Principles of policy), U4-08 (Role of citizens), U4-09 (Physical features), U4-10 (Climate, water and natural resources), and U4-11 (Strategic importance of location).
  - Coverage matrix at `specs/content/gpks-402/coverage/unit-04.md` accurately maps all 11 sub-topics to exact headings and external sources.
  - Depth budget: 95 estimated reading minutes total (index 5, topic-01 28, topic-02 24, topic-03 21, assessment 17), strictly within the approved 95-130 minute unit budget (`content-spec.md:240`).

- **Assessment (`pass`)**:
  - Independent solution of all 25 assessment items prior to consulting the answer key.
  - Derived MCQ answers (1-B, 2-B, 3-C, 4-B, 5-A, 6-B, 7-C, 8-B, 9-C, 10-B) match the supplied answer key 100%.
  - RRQ distribution: 4 items for Topic 4.1, 3 items for Topic 4.2, and 3 items for Topic 4.3, satisfying the approved blueprint requirement of >= 2 RRQs per topic (`content-spec.md:259`).
  - ERQ distribution: 1 item for Topic 4.1, 1 item for Topic 4.2, 1 item for Topic 4.3, and 2 integrative items (geography/governance and lesson design), exactly matching the blueprint (`content-spec.md:260`).
  - All 25 items are mapped to concepts in `specs/content/gpks-402/concepts/unit-04.md:7-21`; `check:concept-graph` exits 0.
  - ERQs feature analytic 4-criterion rubrics (3 marks each, totaling 12 marks) with explicit Analyze/Evaluate/Create demand.
  - Marking guidance and answer keys are quarantined within the bounded final section; `check:no-answer-keys` exits 0.

- **Accessibility (`pass`)**:
  - Monotonic heading hierarchy verified across all MDX files with zero skipped levels.
  - Alt text on all seven `<Figure>` tags matches SVG `<desc>` text and `figures/unit-04.md` manifest declarations.
  - `node scripts/measure-figure-text.mjs static/img/figures/gpks-402/unit-04/*.svg` exits 0 across all 14 SVG variants (7 light, 7 dark twins) with zero text overflow (widest text x=768.4) and zero wordmark collision (wordmark starts at x=675.7).
  - All seven SVGs rasterized to PNG at 780px width via Sharp with `:root` CSS variables resolved, verified non-blank with mean channel luminances 226.8 to 242.6.
  - Zero em dashes across all unit files; `check:no-em-dash` exits 0.

- **Readability (`pass`)**:
  - Clear plain-language definitions on first use for all core concepts (Federalism, Legislature, Executive, Judiciary, Separation of powers, Civil-military relations, Martial law, Fundamental rights, Writ petition, Principles of policy, Citizen, Indus River system, Climate, Natural resources, Strategic importance, CPEC).
  - Grounded in authentic Pakistani classroom contexts (Sukkur Class 10 civics with Bilal, Hyderabad girls' school with Ayesha and Rukhsana's sister, Mithi Social Studies with Zainab and Thar geography, Thatta school maintenance, Khairpur textbook logistics).
  - Explicit distinction between general concepts and illustrative classroom teaching cases.
  - Vocabulary and tone appropriate for HSC/intermediate graduates without prior specialist knowledge.

- **Pedagogy (`pass`)**:
  - Full nine-part learning cycle strictly maintained across all three topics (situation -> Explanation -> Activity -> Check your understanding -> Summary -> Self-assessment checklist -> Practicum -> Summative task -> Further reading).
  - Feasible, zero-cost classroom activities with explicit time and grouping guidance (Which branch, which level? [30 min, groups of 4]; Rights in our school [30 min, groups of 3]; Map, resource and problem [35 min, groups of 4]).
  - Specific misconceptions systematically identified and refuted (PM makes laws; military has always governed; civil-military relations cannot be studied; fundamental rights identical to US Bill of Rights; citizenship means only obedience; Pakistan is only desert).
  - Practicum school tasks provide ethical observation guidance (investigating administrative reporting chains, out-of-school children, school water sources and flood impacts).

## Non-blocking advisory findings

1. **Teaching case illustrations and hypothetical examples**: Fictional cases (Bilal in Sukkur, Ayesha in Hyderabad, Zainab in Mithi, school bus safety bill, Khairpur textbook delivery, Thatta school toilets, Badin village school) are original instructional cases designed for pedagogy and do not represent judicial records or official government audit findings.
2. **Headless review tooling constraint**: The crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright Chromium. Visual and presentation checks were conducted via `measure-figure-text.mjs` (all 14 SVG variants exit 0 with zero overflow or collision), static heading and table container analysis, and Sharp PNG rasterization with CSS variables resolved.
3. **Global glossary entries**: Unit 4 tags 15 key terms with `<Glossary term="...">`. All 15 terms are mapped in `glossary.json` and `concepts/unit-04.md`.
4. **Print monographs declared under Unverifiable sources**: Hamid Khan and Ikram Rabbani were unavailable as open access and are declared in `specs/content/gpks-402/sources/unit-04.md:16-19` per `D-2026-0001`. No specific proposition relies on them; verified open-access substitutes ground all unit prose.

## Deterministic gate commands

1. `validate:content` - PASS (exit code 0)
2. `check:depth-gate` - PASS (exit code 0)
3. `check:figures` - PASS (exit code 0)
4. `check:no-em-dash` - PASS (exit code 0)
5. `check:no-answer-keys` - PASS (exit code 0)
6. `check:docs-sync` - PASS (exit code 0)
7. `render-review` - PASS (exit code 0)
8. `check:content` - PASS (all 13 gates pass, exit code 0)
9. `measure-figure-text` - PASS (exit code 0, all 14 variants pass)

## Next steps and handoff

- Advisory G3 tracker row appended to `specs/content/gpks-402/tasks.md` with status `▢` (open, unsigned, ADR-0019).
- Unit 4 remains open for Urdu translation (`G4 ur-translation`) and subsequent independent Urdu review (`G5 ur-review`).
