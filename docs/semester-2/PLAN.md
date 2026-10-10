# TEX-37: Author Complete Semester 2 Courses

**Created**: 2026-10-09
**Status**: Proposed
**Tier**: B (course and content work)

## Objective

Author all 7 Semester 2 B.Ed courses with full requirements: content specs,
course overviews (with guide/syllabus on intro page), units with per-topic
learning cycles, unit assessments (10/10/5 + bounded answers), teacher notes,
QC checks, SVG/raster figures, and Urdu mirrors.

## Semester 2 Course Inventory

| # | Code | Title | Credits | Category | Source Lines | Units |
|---|------|-------|---------|----------|-------------|-------|
| 1 | GQUR-301 | Quantitative Reasoning-II (Statistics) | 3 (3-0) | General Ed | 383-588 | 6 units (16 chapters) |
| 2 | GSOS-301 | Social Science (Sociology) | 2 (2-0) | General Ed | 776-972 | 6 units (15 weeks) |
| 3 | GENG-301 | Expository Writing | 3 (3-0) | General Ed | 3-180 | 6 units (6 sections) |
| 4 | EFMP-303 | Educational Policies and Plans of Pakistan | 3 (3-0) | Major Prof | 1171-1360 | 6 units (16 weeks) |
| 5 | EFMP-304 | Critical Thinking and Reflective Practices | 3 (3-0) | Major Prof | 609-756 | 6 units (3 done, 3 remain) |
| 6 | EFMP-305 | Inclusive Education | 3 (3-0) | Major Prof | 189-362 | 6 units |
| 7 | GPKS-402 | Pakistan Studies | 2 (2-0) | General Ed | 979-1156 | 6 units (16 weeks) |

**Total**: 7 courses, ~42 units, ~250+ topics, ~42 assessments, ~42 teacher notes.

## What Exists Already

- **EFMP-304**: Units 1-3 authored (index + topics + assessment each). No teacher
  notes, no figures placed, no Urdu mirror, no QC run. Content spec exists and
  is approved.
- **Content specs**: EFMP-301, EFMP-302, EFMP-304, GENG-300, GICT-300, GNAS-301,
  GQUR-300 exist (semester 1). No specs yet for GSOS-301, GENG-301, EFMP-303,
  EFMP-305, GPKS-402.

## Per-Course Deliverables

For each of the 7 courses:

1. **Content spec** (`specs/content/{code}/content-spec.md`) — G0/G1 intake
2. **Course overview** (`docs/semester-2/{code}/course-overview.mdx`) — with
   guide/syllabus content on the intro page
3. **Units** (6 per course):
   - `unit-NN/index.mdx` — unit index with learning outcomes
   - `unit-NN/topic-NN.mdx` — 9-part learning cycles
   - `unit-NN/unit-assessment.mdx` — 10 MCQ + 10 RRQ + 5 ERQ + bounded answers
   - `unit-NN/unit-teacher-notes.mdx` — teaching guidance
4. **Figures** — SVG schematics placed, raster illustrations prompt-only
5. **QC checks** — `npm run check:content` passes per course
6. **Urdu mirror** — G4 translation of all units

## Unit Partitioning

### GQUR-301 (Statistics) — 16 chapters → 6 units
- U1: Introduction to Data & Organization (Ch 1-2)
- U2: Population, Sampling & Central Tendency (Ch 3-5)
- U3: Dispersion & Counting (Ch 6-8)
- U4: Probability & Random Variables (Ch 9-11)
- U5: Bivariate Analysis & Correlation (Ch 12-13)
- U6: Estimation, Hypothesis Testing & Applications (Ch 14-16)

### GSOS-301 (Sociology) — 15 weeks → 6 units
- U1: Introduction, Origins & Perspectives (Wk 1-3)
- U2: Culture & Socialization (Wk 4-5)
- U3: Social Structure & Interaction (Wk 6-7)
- U4: Stratification & Gender (Wk 9-10)
- U5: Social Institutions (Wk 11-12)
- U6: Social Change, Problems & Contemporary Issues (Wk 13-15)

### GENG-301 (Expository Writing) — 6 sections → 6 units
- U1: Introduction to Expository Writing
- U2: The Writing Process
- U3: Essay Organization and Structure
- U4: Different Types of Expository Writing
- U5: Writing for Specific Purposes and Audiences
- U6: Ethical Considerations

### EFMP-303 (Educational Policies) — 16 weeks → 6 units
- U1: Introduction & Historical Background (Wk 1-2)
- U2: National Education Policies (Wk 3-5)
- U3: Development Plans & Planning Process (Wk 6-8)
- U4: Monitoring, Evaluation & Challenges (Wk 9-10)
- U5: Quality Assurance & Social/Economic Development (Wk 11-12)
- U6: International Comparisons, Technology & Future (Wk 13-16)

### EFMP-304 (Critical Thinking) — 6 units (3 remain)
- U1: Understanding Critical Thinking ✅
- U2: Recognizing and Analyzing Arguments ✅
- U3: Basic Logic Concepts ✅
- U4: Becoming a Reflective Teacher (new)
- U5: Engaging in Reflective Practice (new)
- U6: Creating and Maintaining Reflective Journals (new)

### EFMP-305 (Inclusive Education) — 6 units
- U1: Foundations of Inclusive Education
- U2: Understanding Learner Diversity
- U3: Inclusive Teaching Strategies
- U4: Creating an Inclusive Classroom Environment
- U5: Policies and Legal Framework in Pakistan
- U6: Collaboration and Parental Involvement

### GPKS-402 (Pakistan Studies) — 16 weeks → 6 units
- U1: Introduction & Ideological Basis (Wk 1-2)
- U2: Reform Movements & Pakistan Movement (Wk 3-4)
- U3: Constitutional Development (Wk 5-6)
- U4: Political Structure, Rights & Geography (Wk 7-10)
- U5: Economy, Society & Culture (Wk 11-12)
- U6: Foreign Policy, Contemporary Issues & Education (Wk 13-15)

## Execution Strategy

Given the scale (~42 units), this work will be delegated to child issues:

1. **Create content specs** for all 7 courses (parallel)
2. **Author course overviews** with guide/syllabus content
3. **Author units** — each course is a child issue with 6 units
4. **Run QC checks** per course
5. **Generate figures** (SVG schematics + raster illustrations)
6. **Urdu mirrors** (G4)

## Estimated Effort

- Content specs: ~2 hours each × 7 = 14 hours
- Course overviews: ~1 hour each × 7 = 7 hours
- Unit authoring: ~4 hours each × 42 = 168 hours
- QC + figures + Urdu: ~2 hours each × 42 = 84 hours
- **Total**: ~273 agent-hours

This will be executed across multiple child issues and agents.

## Success Criteria

1. All 7 courses have approved content specs
2. All 7 course overviews render on the platform with guide/syllabus
3. All 42 units have complete topic cycles, assessments, and teacher notes
4. `npm run check:content` passes for every course
5. Every unit has ≥2 figures (≥1 schematic SVG placed)
6. Every unit has a complete Urdu mirror
7. All courses render correctly on the platform in both locales
