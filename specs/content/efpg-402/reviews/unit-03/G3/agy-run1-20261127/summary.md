# EFPG-402 Unit 3 - G3 Independent English Review Summary

- **Course**: EFPG-402 Teaching of Science
- **Unit**: Unit 3 - Methods and Approaches of Teaching Science
- **Stage**: G3 (English Review)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer Run ID**: `3043d3cb-2c9a-4666-bb72-3769cdb90044`
- **Author Run ID**: `commit:8b58f672de81406058d75f3bc7d1557cfeef44cf`
- **Model**: `Gemini 3.8 Flash (Medium)`
- **Disposition**: `escalate`

## Criteria Evaluation

1. **Authority (Pass)**:
   - Full alignment with course guide `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:754-763` (Unit 3: Methods and Approaches of Teaching Science, sections 3.1 to 3.7) and approved content specification `specs/content/efpg-402/content-spec.md:193-260`.
   - All 13 subtopics U3-01 through U3-13 mapped and taught under dedicated section headings in topics 3.1 through 3.7.
   - Objectives trace directly to `SLO:EFPG-402-3-1` and `SLO:EFPG-402-3-2`, referenced in frontmatter `clo_refs`.

2. **Sources (Pass)**:
   - Primary open-access and canonical sources:
     - Bybee et al. (2006) *The BSCS 5E Instructional Model* (open-access report) supporting 5E inquiry cycle, guided discovery, and direct instruction.
     - National Curriculum of Pakistan 2022-23: Science Grades 4-8 progression grid supporting scientific enquiry SLOs.
     - Hepburn & Andersen (SEP 2015/2026) *Scientific Method* supporting inquiry, Dewey's problem-solving stages, and inductive/deductive reasoning.
     - Prince & Felder (2006) *Inductive Teaching and Learning Methods* supporting project, inquiry, discovery, and inductive/deductive distinctions.
     - Kilpatrick (1918) *The Project Method* supporting purposing-planning-executing-judging.
     - Behrendt & Franklin (2014) supporting field trip stages, value, and follow-up.
     - Banchi & Bell (2008) *The Many Levels of Inquiry* supporting confirmation, structured, guided, and open inquiry levels.
     - Morris (2020) supporting Kolb's experiential learning cycle.
   - Unverifiable source declaration: Das (1985) and Kochhar (*Teaching of Science*) declared under `## Unverifiable sources` with honest scope disclosure (guide-recommended print monographs; title-level support under `D-2026-0001`; unit accounts grounded in bound sources).

3. **Coverage (Pass)**:
   - All 7 topic learning cycles (Topics 3.1 through 3.7) execute complete 9-part pedagogical sequences.
   - Depth budget: 13 subtopics, 7 topics, 54-79 reading minutes target met.
   - Concept graph: 10 concepts (CON:EFPG-402-3-1 through CON:EFPG-402-3-10) mapped to assessment items; `check:concept-graph` passes exit 0.
   - Figures: 14 schematic SVGs (light and dark pairs) placed plus raster banner `fig-U3-15`; visual density >= 2 figures per topic; flowchart schematic requirement met (`fig-U3-3`, `fig-U3-5`, `fig-U3-7`, `fig-U3-13`); `check:figures` passes exit 0.

4. **Assessment (Pass)**:
   - 10 MCQs independently solved: 10/10 exact match with supplied key.
   - 10 RRQs independently solved: concise stems, rigorous mark schemes (3-4 marks each).
   - 5 ERQs independently analyzed: 3-criterion/4-criterion analytic rubrics with explicit higher-order cognitive demand (Analyze, Evaluate, Create), including integrative ERQ 5 (defending method choices for three science topics in a large class with no laboratory).
   - Answer keys strictly bounded under `## Answers and marking guidance`; `check:no-answer-keys` passes exit 0.

5. **Accessibility (Unverified)**:
   - `render-review` unavailable (exit code 1): live production site (`https://textbook.com.pk`) deployed at `0cbed86bb96f7a6a03420ad3e5d726a47e8f5513` differs from HEAD (`956c4ba9149ccc34e41e7d1dc31c624f7709d1b6`) on `docs/semester-4/efpg-402/unit-03/index.mdx` and `static/img/figures/efpg-402/unit-03/fig-U3-15.webp`.
   - Structural accessibility passes from source: all figures have informative alt text; SVGs have proper ARIA attributes, titles, and descriptions.
   - SVG text geometry passes: `scripts/heavy.sh node scripts/measure-figure-text.mjs` exits 0 across all 28 SVGs.

6. **Readability (Pass)**:
   - Accessible, clear, intermediate-level English prose suitable for B.Ed trainees without specialist prerequisite knowledge.
   - Technical terms defined inline and reinforced across topics.
   - Contextualized with authentic Pakistani and Sindhi classroom scenarios (Sukkur, Shaheed Benazirabad, Khairpur, Badin, Jacobabad, Dadu, Sanghar).
   - Zero em dashes found across all files; `check:no-em-dash` passes exit 0.

7. **Pedagogy (Pass)**:
   - Coherent instructional sequence: classroom situation -> explanation -> worked examples -> misconception corrections -> collaborative group activities -> retrieval items -> unit summary -> self-assessment -> practicum connection -> summative task.
   - Addresses spec-mandated misconceptions: "activity-based learning means no teacher input"; "the lecture method is always bad"; "discovery learning works without guidance".
   - Activities feasible in local resource-constrained classrooms (using low-cost materials like turmeric, candles, jars, seeds, cards, torches).

## Governance and Sign-Off Boundary

In accordance with ADR-0019, Feature 014 contracts, and repository rules:
- This review is advisory and independent.
- No tracker gates are marked done; no reviewer initials are added.
- Disposition is escalated due to unverified visual rendering evidence.
