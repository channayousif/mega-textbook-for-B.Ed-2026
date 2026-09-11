---
course_code: EFMP-301
status: approved
---

# EFMP-301 - Educational Psychology - Content Spec

> **Unit 1 re-proof in progress (2026-09-11, style-guide v3.4).** Constitution Art. VI.1 makes
> bringing the golden unit to the current standard the immediate-next content task after the
> proving unit. Two freezes were outstanding: v3.3 (Spec 012 visual density) and v3.4 (Spec 013
> figure colour, branding and page descriptions). The unit skips straight to **v3.4**, so a
> single authoring pass discharges both rather than re-drafting twice - the same
> owner-acknowledged reasoning that let it skip the flat v2.0 re-draft earlier.
>
> The G1 blocks below (`### Sub-topic checklist

Every ID traces to a course-guide bullet. The guide's Chapter 1 spans Weeks 1-2 and names three
substantive bullets plus a discussion/assessment slot; the compound first bullet ("Nature, scope,
and importance") decomposes into its own named constituents, and the Week 2 bullet ("Role of
educational psychology in teaching and learning") decomposes into the learner side and the
teaching side. "Scientific study" is the guide's own framing in the Course Description, not an
addition (Art. II.3).

| ID | Sub-topic | Topic | Guide source |
|---|---|---|---|
| U1-1 | What psychology studies, and what makes educational psychology a distinct field | 1.1 | W1 "Nature, scope, and importance" |
| U1-2 | The scope: the learner, the learning process, and the learning situation | 1.1 | W1 "Nature, scope, and importance" |
| U1-3 | Educational psychology as a scientific study: observation, experiment, case study | 1.1 | Course Description, "scientific study of human learning" |
| U1-4 | Why a teacher needs educational psychology (importance) | 1.2 | W1 "Nature, scope, and importance" |
| U1-5 | What psychology contributes to education | 1.2 | W1 "Relationship between psychology and education" |
| U1-6 | What education contributes back to psychology | 1.2 | W1 "Relationship between psychology and education" |
| U1-7 | Applied, not pure: how educational psychology differs from general psychology | 1.2 | W1 "Relationship between psychology and education" |
| U1-8 | Differences in readiness and prior knowledge | 1.3 | W2 "Role of educational psychology in teaching and learning" |
| U1-9 | Differences in motivation and interest | 1.3 | W2 "Role of educational psychology in teaching and learning" |
| U1-10 | Differences in language, home background and support | 1.3 | W2 "Role of educational psychology in teaching and learning" |
| U1-11 | Planning: choosing method, sequence and pace | 1.4 | W2 "Role of educational psychology in teaching and learning" |
| U1-12 | Classroom management as a psychological task, not only a disciplinary one | 1.4 | W2 "Role of educational psychology in teaching and learning" |
| U1-13 | Assessment and feedback informed by psychology | 1.4 | W2 "Role of educational psychology in teaching and learning" |
| U1-14 | The reflective teacher: using evidence to improve one's own practice | 1.4 | W2 "Role ..." + "Discussion & short assessment" |

### Topic list

Row order is load-bearing: row N maps to `topic-0N.mdx`.

| Topic | Title | Sub-topic IDs | Figures (id: archetype) | Reading-min |
|---|---|---|---|---|
| 1.1 | What educational psychology is | U1-1, U1-2, U1-3 | fig-U1-1: concept-map, fig-U1-2: table, fig-U1-3: timeline | 18 |
| 1.2 | How psychology and education meet | U1-4, U1-5, U1-6, U1-7 | fig-U1-4: diagram, fig-U1-5: flowchart | 19 |
| 1.3 | The learners in front of you | U1-8, U1-9, U1-10 | fig-U1-6: concept-map, fig-U1-7: table | 17 |
| 1.4 | Shaping teaching, assessment and reflection | U1-11, U1-12, U1-13, U1-14 | fig-U1-8: flowchart, fig-U1-9: table | 19 |

**Depth budget**: index.mdx (4) + topic-01..04.mdx (18 + 19 + 17 + 19) + unit-assessment.mdx (24)
+ unit-teacher-notes.mdx (8) = 109 reading-minutes. Band: **98-120**. Baselined against the
working exemplar EFMP-302 Unit 1 (103 min over four topics).

**Figure plan** (Art. III.10: >= 2 carriers per topic file, >= 1 concept-map/flowchart/timeline
per unit; Spec 013 v3.4: palette tokens + wordmark, dark variant derived by
`npm run figures:variants`):

- `fig-U1-1` **concept-map** (1.1) - the three things educational psychology studies: the
  learner, the learning process, the learning situation, with what sits under each.
- `fig-U1-2` **table** (1.1) - general psychology vs educational psychology against the same four
  questions: what it asks, where it looks, what counts as evidence, what it is used for.
- `fig-U1-3` **timeline** (1.1) - how the field emerged, from teachers observing pupils to a
  discipline with its own methods. Satisfies the per-unit schematic requirement.
- `fig-U1-4` **diagram** (1.2) - the two-way street: what psychology gives education, and what
  real classrooms give back to psychology.
- `fig-U1-5` **flowchart** (1.2) - from a research finding to a decision in one Sindh classroom,
  with "does this hold for my pupils?" as an explicit checking step.
- `fig-U1-6` **concept-map** (1.3) - the dimensions along which learners in one class differ:
  readiness, motivation, language and home support.
- `fig-U1-7` **table** (1.3) - each dimension of difference against what it looks like in a real
  classroom and what it does NOT mean about the pupil.
- `fig-U1-8` **flowchart** (1.4) - the plan / teach / assess / reflect cycle, with the reflect
  step feeding back into the next plan.
- `fig-U1-9` **table** (1.4) - four everyday classroom problems and the psychological idea that
  helps a teacher read each one.

**Unit-end assessment blueprint**: exactly **10 MCQ / 10 RRQ / 5 ERQ** in `unit-assessment.mdx`,
every item Bloom-tagged. MCQ spread 3/3/2/2 across topics 1.1-1.4; RRQ 2/3/2/3; ERQ 1/1/1/2. At
least one ERQ rubric demands Analyze-or-higher (Art. III.3). Weighting stays the 60/40 default.

**Supersedes the flat blueprint above.** The `- **Assessment blueprint**` bullet described the
five-file layout (`formative.mdx` / `summative.mdx`), including its FR-008 two-item formative
deviation. The per-topic layout replaces those files with a `## Check your understanding` block
in each topic (>= 3 items each, so the 5-8 formative floor is met across the unit without needing
a deviation note) plus the unit-end bank above.
