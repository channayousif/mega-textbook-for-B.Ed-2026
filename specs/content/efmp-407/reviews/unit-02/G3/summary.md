# G3 English Independent Review Summary - EFMP-407 Unit 2

- Course: EFMP-407 (Education for Sustainable Development)
- Unit: Unit 2 (Principles and Frameworks of ESD)
- Stage: G3 English review
- Reviewer: `agent:agy`
- Reviewer run ID: `fa119959-1e9c-4a6e-a37c-5c0336b92ab6`
- Author run ID: `crew/efmp-407-u02-author`
- Model: `Gemini 3.8 Flash (High)`
- Disposition: `escalate` (advisory; unsigned; visual rendering uninspected under brief restrictions; G3 remains open)

---

## Executive Summary

EFMP-407 Unit 2 ("Principles and Frameworks of ESD") was independently evaluated by `agent:agy` at Stage G3 against the G3 English rubric and governance standards. The authoring quality is exceptionally high: authority traces 1:1 to the official Semester 3 course guide; coverage fully implements all 4 leaf subtopics across three comprehensive 9-part learning cycles; sources are verified, relevant, open-access and carefully bounded; assessment items (10 MCQs, 10 RRQs, 5 ERQs) were independently solved and validated; readability is accessible for intermediate graduates with zero em dashes; and pedagogical guidance in teacher notes is practical and culturally situated in Sindh classrooms.

The disposition is **escalate** solely due to the operational constraints imposed by the execution brief (`.crew/brief.md`), which strictly prohibits executing `npm run build`, a local development server, or Playwright/Chromium browser tools. Consequently, dynamic small-screen (360px viewport), table scroll reachability, desktop layout, and A4 print view inspections could not be conducted in a live browser, leaving the visual presentation dimension of the accessibility criterion `unverified`.

---

## Criterion-by-Criterion Evaluation

### 1. Authority (`pass`)
- Directly implements the approved course guide for Semester 3 (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt` lines 345-348), matching Unit 2 Weeks 3-4 topics:
  - 2.1 UNESCO framework of ESD (`U2-01`)
  - 2.2 Comparison: ESD vs. Environmental Education (`U2-02`)
  - 2.3 Transformative learning and systems thinking (`U2-03`, `U2-04`)
- Connects directly to Course Objective 2 ("Explain the philosophy and global frameworks of ESD") and Learning Outcome (b) ("Analyze environmental and social challenges using systems and critical thinking").
- Frontmatter binds `SLO:EFMP-407-2-1` and `SLO:EFMP-407-2-2`.

### 2. Sources (`pass`)
- Examines three verified open-access sources:
  - `unesco-2017-esd-objectives`: UNESCO (2017) defines 3 learning domains and 8 cross-cutting sustainability competencies; grounds U2-01 and U2-04.
  - `maurer-bogner-2019`: Maurer & Bogner (2019, PLOS ONE, CC BY 4.0) provides theoretical grounding on the evolution, overlap, and boundaries of EE and ESD; grounds U2-02.
  - `unesco-2024-greening`: UNESCO (2024) grounds transformative learning, critical reflection on assumptions, and agency; grounds U2-03.
- All three sources are bound in `specs/content/efmp-407/sources/texts/`.
- Clear disclosure is maintained separating authentic scholarship from author-created classroom cases, role cards, and arithmetic models.
- Open-access floor (≥ 1 OA source) is satisfied.

### 3. Coverage (`pass`)
- Leaf subtopics U2-01, U2-02, U2-03, and U2-04 are comprehensively addressed under dedicated H3 headings across `topic-01.mdx`, `topic-02.mdx`, and `topic-03.mdx`.
- Each topic features a complete 9-part Spec 008 learning cycle.
- Depth budget: 48 estimated reading minutes (within approved 35-55 minute band).
- All outcomes are systematically reinforced through the unit assessment.

### 4. Assessment (`pass`)
- Assessment bank features exactly 10 MCQs, 10 RRQs, and 5 ERQs (100 raw marks).
- Independent solve of all 10 MCQs yielded 100% agreement with the author key (1:B, 2:C, 3:A, 4:D, 5:B, 6:C, 7:A, 8:D, 9:B, 10:C). Options are evenly balanced across all choices (A:2, B:3, C:3, D:2). No ambiguous items or flawed distractors.
- 10 RRQs assess cognitive recall, systemic understanding, and analytical reasoning with transparent 4-mark marking schemes.
- 5 ERQs demand higher-order analysis, evaluation, and creation with multi-level analytic rubrics.
- Answers and marking guidance are strictly confined to the final bounded `## Answers and marking guidance` section. `check:no-answer-keys` passes.

### 5. Accessibility (`unverified`)
- Static accessibility checks pass:
  - All 6 figures carry descriptive alternative text detailing instructional meaning.
  - All 12 SVGs (6 light + 6 dark) contain `role="img"`, `aria-labelledby`, `<title>`, `<desc>`, and `aria-hidden="true"` on wordmarks.
  - `node scripts/measure-figure-text.mjs` exits 0 with zero text clipping across all 12 SVG files.
  - Markdown heading hierarchy is strictly well-formed (H1 -> H2 -> H3).
  - Links use descriptive anchors.
- Visual dynamic checks unperformed:
  - Visual inspection at 360px viewport, keyboard-navigable table scrolling, and A4 print stylesheet formatting could not be performed because `.crew/brief.md` forbids `npm run build`, a dev server, and Playwright.
  - `render-review` exited with code 1.

### 6. Readability (`pass`)
- Prose register is plain, clear, accessible, and suitable for intermediate graduates without unnecessary academic jargon.
- Technical concepts (ESD, competencies, trade-offs, transformative learning, assumptions, stocks, flows, feedback loops, delays) are explicitly defined in plain English before use.
- Cultural examples are authentic to Sindh (Hyderabad, Sukkur, Karachi, Mirpurkhas, Khairpur).
- `check:no-em-dash` passes with zero em dashes.

### 7. Pedagogy (`pass`)
- 9-part learning cycle consistently applied across all three topics.
- Practical activities and school tasks are feasible in resource-constrained Sindh classrooms without specialized equipment or family expense.
- Strong ethical safeguarding: explicitly instructs student-teachers not to collect private income data, photograph pupils, judge home habits, handle waste, or attempt plumbing repairs.
- Misconception callouts directly address persistent trainee traps.
- `unit-teacher-notes.mdx` provides rich guidance for teacher educators on instructional pacing, discussion prompts, inclusion, and separating pupil reasoning from adult-controlled maintenance outcomes.

---

## Findings

1. **Uncertain (Accessibility / Render)**:
   Visual browser and print inspection (360px small-screen viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because `.crew/brief.md` strictly prohibits running `npm run build`, a dev server, or Playwright (`render-review` exit code 1). While structural accessibility passes from source, visual presentation remains unverified until inspected on an authorized host.

2. **Advisory (Tasks / Backward Design Table Formatting)**:
   In `specs/content/efmp-407/tasks.md` under `## Unit 2 backward-design alignment`, lines 24-28 contain 5 duplicated tracker rows for Unit 1 ("| Unit 1 | G2 en-draft | ✅ | ...") which were inadvertently copied into the backward-design alignment table. While harmless to gate scripts, this should be cleaned up during the next task maintenance.

3. **Advisory (Course Overview Status Note)**:
   In `docs/semester-3/efmp-407/course-overview.mdx` line 46, the text currently states: "Units are published as they are written. Unit 1 is available now." Once Unit 2 progresses toward publication, the course overview should be updated to reflect that Unit 2 is also available.
