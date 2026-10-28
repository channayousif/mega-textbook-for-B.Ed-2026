# Independent Review Summary: GENG-300 Unit 1 (English, G3 - Cycle 2)

**Course**: GENG-300 (Functional English, B.Ed 4-Year Semester 1)  
**Unit**: Unit 1: Foundations of Functional English  
**Review Stage**: G3 (English Independent Review, ADR-0019)  
**Review Cycle**: Second and final review cycle (ADR-0019)  
**Reviewer Identity**: `agent:agy`  
**Reviewer Run ID**: `agy:41b4c5ae-ddf1-4fe4-819d-a560fddf0bdc`  
**Author Baseline Commit**: `commit:8a0b7828`  
**Review Started**: 2026-10-27T23:05:00Z  
**Review Completed**: 2026-10-27T23:12:00Z  
**Disposition**: `pass`  

---

## 1. Executive Summary

This report records the independent G3 English review (Cycle 2) of GENG-300 Unit 1 ("Foundations of Functional English") conducted in compliance with ADR-0019, `.claude/skills/review-unit/SKILL.md`, and repository review evidence governance contracts (`specs/014-agent-review-governance/contracts/review-evidence.md`).

Unit 1 covers Weeks 1 to 4 of Semester 1 Functional English across three topic files:
- Topic 1.1: Vocabulary and Communicative Grammar (vocabulary in context, register, connotation, grammatical accuracy, common errors)
- Topic 1.2: Word Formation and Sentence Structure (affixation, compounding, clipping, back formation, simple, compound, complex, compound-complex sentences)
- Topic 1.3: Sound Production and Pronunciation (English sound system, vowels, diphthongs, consonants, Urdu-influenced pronunciation challenges and teaching strategies)

All three blocking defects from the initial review cycle (report `agent-g3-geng-300-u1-run7c5e7ce2.json`) were verified against the current files and confirmed repaired in commit `8a0b7828`:
1. SVG text viewBox overflow on `fig-U1-1` and `fig-U1-3` (light and dark variants) was resolved by correcting CSS `text-anchor: end` styling on `.wm`. Text geometry across all 12 SVG variants measures within 768.4px inside the 780px viewBox.
2. RRQ 3 mark scheme arithmetic discrepancy in `unit-assessment.mdx` was resolved: allocating 0.5 mark per process name (up to 2) and 0.5 mark per example (up to 2) sums exactly to 4 marks, matching the question stem.
3. RRQ 4 grammatical classification error in `unit-assessment.mdx` was resolved: the stem sentence was revised to "After the meeting ended, the teachers went to the staffroom, and they discussed the new timetable", providing explicit subjects in both coordinate clauses to form a genuine compound-complex sentence structure matching the mark scheme.

All 13 deterministic content gates pass cleanly. All seven review commands (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, `render-review`) completed with exit code 0.

The review disposition is **`pass`** with two non-blocking advisory findings.

---

## 2. Criterion Evaluation

### Authority: Pass
- Input manifest (96 bound files) verified against the repository index.
- Curriculum alignment: `.specify/Course_guides_and_Scheme/GENG-300 Functional English Outline.docx` syllabus section "Foundations of Functional English" partitions one-to-one and disjointly into Topics 1.1, 1.2, and 1.3.
- Course Learning Outcome 1 ("Apply enhanced English communication skills through effective use of word choices, grammar and sentence structure") aligns directly with Unit 1 outcomes. No contradictory or missing G0/G1 authority found.

### Sources: Pass
- `specs/content/geng-300/sources/unit-01.md` `## Unverifiable sources` declares four print monographs (azar2005, murphy2012, swan2016, kachru2006) with retrieval attempts on 2026-09-22 and owner ruling `D-2026-0001` per Constitution Art. VII.
- The declaration is honest and complete, bounding uncorroborated grammatical frameworks and World Englishes phonological descriptions without claiming external web verification.
- Unit prose does not assert uncorroborated empirical claims beyond the scope of standard grammatical descriptions disclosed in the declaration.
- All eight sub-topic coverage rows resolve to declared source keys, and each key appears in topic prose and `## Further reading`.

### Coverage: Pass
- `specs/content/geng-300/coverage/unit-01.md` establishes a complete mapping of U1-01 through U1-05 to exact `###` headings across `topic-01.mdx`, `topic-02.mdx`, and `topic-03.mdx`.
- All five unit learning outcomes in `index.mdx` are taught in topic files and assessed in `unit-assessment.mdx`.
- Deterministic depth and structure checks pass: `check:depth-gate` exits 0; `check:concept-graph` exits 0; `check:bloom-bands` exits 0.

### Assessment Correctness & Demand: Pass
- Question bank contains 25 items: 10 MCQs, 10 RRQs, and 5 ERQs.
- All 10 MCQs independently solved prior to consulting answer key; derived answers (1b, 2c, 3c, 4a, 5c, 6b, 7c, 8d, 9d, 10c) match the supplied key with zero discrepancy.
- RRQ 3 arithmetic discrepancy repaired: 0.5 mark per process name (up to 2) + 0.5 mark per valid example (up to 2) sums exactly to 4 marks.
- RRQ 4 sentence classification repaired: addition of explicit subject "they" makes the sentence a genuine compound-complex sentence structure matching the mark scheme.
- All 10 RRQs have complete, objective mark schemes matching stem allocations (42 marks total).
- All 5 ERQs provide detailed 4-criterion analytic rubrics out of 20 with explicit Bloom classification (Analyze, Evaluate, Create).
- Answer keys and mark schemes strictly confined to the final bounded `## Answers and marking guidance` section.

### Accessibility: Pass
- Wordmark SVG viewBox overflow defect from run 7c5e7ce2 is resolved: text-anchor attribute and class definitions corrected in `fig-U1-1.svg`, `fig-U1-1.dark.svg`, `fig-U1-3.svg`, `fig-U1-3.dark.svg`; text geometry measures within 768.4px inside 780px viewBox.
- All 6 figures carry descriptive alt text matching SVG `<desc>` elements and manifest descriptions.
- Single `#` title per page and strictly monotonic heading progressions across index, all 3 topics, unit-assessment, and unit-teacher-notes.
- All 6 unit figures rasterized to PNG with CSS variables resolved via Sharp into `specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/`.
- No clipped tables or text: wide comparison tables delivered as responsive inline SVG figures.

### Readability: Pass
- Tone and vocabulary target HSC / intermediate graduates (Constitution Art. III.1). Prose is direct, clear, and accessible.
- Key concepts defined on first use with clear definitions and worked examples.
- Zero em dashes (U+2014) in authored content; `check:no-em-dash` exits 0.
- Common misconceptions explicitly identified and reframed across all three topics.

### Pedagogy: Pass
- Complete nine-part learning cycle implemented across all three topics: classroom situation, explanation, activity, check your understanding, summary, self-assessment checklist, practicum trial, summative task with mini-rubric, and further reading.
- Authentic contextualization in Pakistani school environments (Class 9 in Karachi, Class 6 in Islamabad, textbook sentence variety observation, pupil error analysis).
- Progressive scaffolding: moves from word and grammar foundations (1.1) to morphological and syntactic construction (1.2) to phonology and pronunciation contrast (1.3).

---

## 3. Findings

### Resolved Defects from Previous Cycle (run 7c5e7ce2)
1. **SVG text viewBox overflow**: Resolved in commit `8a0b7828`. Site wordmark `textbook.com.pk` now ends at x=768.4 inside 780px viewBox across all 12 SVG variants.
2. **RRQ 3 mark scheme arithmetic**: Resolved in commit `8a0b7828`. Allocated 0.5 per process (up to 2) and 0.5 per example (up to 2), totaling 4 marks.
3. **RRQ 4 grammatical classification**: Resolved in commit `8a0b7828`. Added explicit subject "they" to form a genuine compound-complex sentence.
4. **Figure manifest preamble**: Resolved in commit `8a0b7828`. Updated to state all 6 figures placed.
5. **Topic 1.2 Check understanding item 3**: Resolved in commit `8a0b7828`. Added explicit subject "they".
6. **Cosmetic wordmark collisions**: Resolved in commit `8a0b7828`. Panel repositioning cleared overlaps.

### Advisory Finding F1: Consonant Label Boundary Clearance
- **Severity**: advisory
- **Status**: unresolved (recorded)
- **Description**: In `fig-U1-3.svg` and `fig-U1-3.dark.svg`, `measure-figure-text.mjs` notes that 3 labels in column 6 ("zoo", "wet", "yes") centered at x=757 extend rightward to x=766.6, slightly exceeding the 765px right border of `.panel-c` by 1.5px to 2.0px. The labels remain well inside the 780px SVG canvas (13.4px margin remains) and do not collide with any other text or wordmark, so instructional meaning and readability are unaffected.

### Advisory Finding F2: Headless Render Limitation
- **Severity**: advisory
- **Status**: unresolved (recorded)
- **Description**: Full browser render inspection across desktop (1280x900), mobile (360x780), and A4 print was not re-run via Playwright Chromium due to the crew job constraint forbidding `npm run build`, dev servers, and Playwright. Static analysis, Sharp PNG rasterization, and SVG text measurement confirmed no unhandled overflow, accessible alt text, correct heading hierarchy, and zero viewBox overflow.

---

## 4. Assessment Verification Log

### MCQs (10 items)
1. Register definition: **b** (the level of formality a situation demands). Matches key.
2. Subject-verb agreement error: **c** ("The pupils in Class 7 reads quietly"). Matches key.
3. Clipping word-formation process: **c** ("exam" from "examination"). Matches key.
4. Continuous for possession L1 transfer: **a** ("I am having two brothers"). Matches key.
5. English phonemes count: **c** (approximately 44 phonemes). Matches key.
6. Dangling modifier error: **b** ("Walking to school, the rain started suddenly"). Matches key.
7. Sound causing difficulty: **c** (/θ/ in "think" as "tink"). Matches key.
8. Compound-complex sentence: **d** (two independent clauses and one dependent clause). Matches key.
9. Back formation process: **d** ("edit" from "editor"). Matches key.
10. Ship vs sheep difference: **c** (vowel length). Matches key.

### RRQs (10 items)
- Items 1 to 10 verified against pedagogical standards, prompt clarity, and mark scheme allocations. Model answers and rubrics are mathematically and grammatically sound.

### ERQs (5 items)
- Items 1 to 5 verified against Bloom taxonomy demand (Analyze, Evaluate, Create). 4-criterion analytic rubrics (0 to 5 per criterion, 20 marks total) provide rigorous assessment criteria.

---

## 5. Advisory Tracker Recommendation

In accordance with ADR-0019 and Constitution Art. VII.7:
- Stage `G3 en-review` remains open (`▢`).
- No reviewer initials are added.
- Advisory tracker note references validated report `specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run41b4c5ae.json`.
