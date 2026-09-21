---
course_code: EED-313
status: approved
---

# EED-313 - Classroom Management - Content Spec

Licence track, 3 credit hours, 16 weeks. Source:
`Scheme-and-Course-guides/extracted-text/course-guides-2025/ClassroomMgmt_Sept13.txt`
(HEC pre-service course guide, 56 pages; originals published at
`hec.gov.pk/english/services/universities/RevisedCurricula/Pages/Education.aspx`).

**Why this course exists outside the 2026 scheme.** `EED-313` was a Semester II Foundation course
in the 2025 B.Ed scheme. The 2026 revision restructured it away with no successor, while the
Sindh Teaching Licence (Elementary) Test still assesses it - at the weight of two sampled CRQ
items. See `specs/content/licence-blueprint.md`. This is the only STEDA Part II area with no host
course in the degree corpus, which makes it the highest licence value per unit in the project.

**Placement (owner decision, 2026-09-13):** a top-level licence tree,
`licence/eed-313/unit-NN/` (content root `licence/`, Docusaurus plugin `id: licence`,
`routeBasePath: /licence`), keeping the licence corpus separate from the degree corpus. This is
supported by Spec 015 (`scripts/lib/content-roots.mjs`, ADR-0020): `walkUnits`/`walkCourses`
already traverse both the `pre-service` and `licence` tracks, all twelve gate scripts consume
them, and `sidebars-licence.ts` + the Urdu i18n dir are in place. The blocker this note
predicted is therefore **resolved**; the tree exists and only the authored content is missing.

**Bilingual (owner decision, 2026-09-13):** English first, Urdu later. The catalogue entry carries
`bilingual: true`; the Urdu mirror is authored once the `reviewer` role exists, so the module does
not queue four G5 certifications behind a gate that currently has one person.

**Standard (owner decision, 2026-09-13):** authored at v4.0, after the standard freezes. This spec
is the G1 gate and is written to be v4.0-ready; the concept tables v4.0 adds are additive and do
not change the sub-topic checklists or topic partitions below.

## Course-wide items

- **Course outcomes (guide, verbatim)**: after completing this course, Student Teachers will be
  able to:
  1. Define classroom management as a means to maximizing student learning
  2. Identify key features of a well-managed classroom
  3. Plan lessons, activities, and assignments to maximize student learning
  4. Differentiate instruction according to student needs, interests, and levels
  5. Design and practise predictable classroom routines and structures to minimize disruptions
  6. Plan for a culture of caring and community in the classroom
- **Teaching strategies (guide)**: peer discussion, independent reflection, class lectures, and
  sustained classroom observation. The guide states the course "assumes that prospective teachers
  will develop their own plans for classroom management as a result of what they learn".
- **Assessment criteria**: the guide gives no course-specific weighting; falls back to the
  Constitution Art. III.7 default - 60% summative / 40% formative.
- **Practical work**: Unit 1 week 2 requires six hours of classroom observation, in and out of
  class. Rendered as a structured observation protocol in the text, since the reader may not have
  a placement classroom available.
- **Recommended resources**: cited by reference only, never reproduced (Constitution Art. III.5).
  The guide's own list includes Canter on assertive discipline, Evertson and Poole on norms and
  expectations, and Wong and Wong, *The First Days of School*.

## Licence coverage

All ten STEDA Classroom Management sub-topics resolve to a unit here. This is the coverage claim
the module exists to make good:

| STEDA sub-topic (licence syllabus) | Unit |
|---|---|
| Learning theories and classroom management | 1 |
| Classroom observation and data collection | 1 |
| Classroom management features: physical environment | 1 |
| Classroom management features: social environment | 1 |
| Designing an effective classroom environment | 1 |
| Physical setup of the classroom | 1 |
| Curriculum and classroom management | 2 |
| Differentiated Learning | 2 |
| Strategies for classroom management | 2, 3 |
| Routines, schedules, and time management in diverse classrooms | 3 |
| Creating shared values and community in a classroom | 4 |

## Unit 1: Learning theories and classroom management

Weeks 1-4 (12 hours). Unit Spec (G1) for `licence/eed-313/unit-01/`.

- **CLO refs**: course outcomes 1 and 2.
- **Key terms**: Behaviourism, Cognitivism, Constructivism, Classroom management, Discipline,
  Physical environment, Social environment.
- **Topics**: how humans learn and the three theories that explain it; why all three have
  classroom validity; classroom management as maximising learning rather than producing
  compliance; how a teacher's philosophy shapes their management beliefs; what a well-managed
  classroom looks like; observing a real classroom and collecting evidence; the physical and
  social features of a managed classroom; the discipline/management distinction; designing the
  environment deliberately.
- **Worked-example / activity concepts**: the guide's own opening move - surface the reader's
  prior beliefs about how humans learn, then test them against the three theories. Follow with one
  lesson described three ways, each managed from a different theoretical stance.
- **Assessment blueprint**: formative 5-8 items on distinguishing the three theories and on the
  discipline/management distinction; summative includes one Analyze-or-higher item asking the
  reader to diagnose a described classroom against the physical and social features.

### Sub-topic checklist

One row per leaf item of the guide's Unit 1 weekly outline and session bodies. IDs stable once
assigned.

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | W1 S1 | 1.1 | Surfacing prior beliefs about how humans learn |
| U1-02 | W1 S2 | 1.1 | Behaviourism: learning as response to stimuli |
| U1-03 | W1 S2 | 1.1 | Cognitivism: learning as mental structure and processing |
| U1-04 | W1 S2 | 1.1 | Constructivism: learners building their own knowledge |
| U1-05 | W1 S2 | 1.1 | Why all three have classroom validity, and what that implies for teaching |
| U1-06 | W1 S3 | 1.2 | Classroom management as maximising learning, not corporate output |
| U1-07 | W1 | 1.2 | How a personal philosophy of teaching shapes management beliefs |
| U1-08 | W1 | 1.2 | What happens in a well-managed classroom |
| U1-09 | W3 | 1.2 | How classroom discipline and classroom management differ |
| U1-10 | W2 | 1.3 | Classroom observation: what to look for |
| U1-11 | W2 | 1.3 | Collecting and recording classroom data |
| U1-12 | W3 | 1.3 | Features of classroom management: the physical environment |
| U1-13 | W3 | 1.3 | Features of classroom management: the social environment |
| U1-14 | W3 | 1.3 | Challenges teachers must negotiate in managing a classroom |
| U1-15 | W3 | 1.4 | Deciding what kind of classroom environment I want |
| U1-16 | W4 | 1.4 | Identifying resources for learning |
| U1-17 | W4 | 1.4 | Using displays and visuals to enhance the learning environment |
| U1-18 | W4 | 1.4 | Arranging seating for different kinds of learning experiences |
| U1-19 | W4 | 1.4 | Employing physical facilities and building the social environment |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | How humans learn: three theories | U1-01, U1-02, U1-03, U1-04, U1-05 | 18-24 | fig-U1-1: table, fig-U1-5: concept-map |
| 1.2 | What classroom management is, and is not | U1-06, U1-07, U1-08, U1-09 | 15-21 | fig-U1-2: table, fig-U1-6: concept-map |
| 1.3 | Reading a real classroom | U1-10, U1-11, U1-12, U1-13, U1-14 | 17-23 | fig-U1-3: diagram, fig-U1-7: flowchart |
| 1.4 | Designing the environment on purpose | U1-15, U1-16, U1-17, U1-18, U1-19 | 16-22 | fig-U1-4: diagram, fig-U1-8: table |

**Depth budget**: 19 sub-topics; 4 topics; 95-125 reading-min.

**Prerequisite knowledge**: none beyond HSC-level study skills. Learners are not assumed to have
met any learning theory before.

**Common misconceptions**: "classroom management means keeping children quiet"; "discipline and
management are the same thing"; "behaviourism was disproved and constructivism replaced it"; "a
well-managed classroom is one where nothing unexpected happens".

**Figure plan** (>= 2 per topic; >= 1 concept-map / flowchart / timeline in the unit -
Constitution Art. III.10; seeds `specs/content/eed-313/figures/unit-01.md`):
  - fig-U1-1 - `table` - the three theories against what each says learning *is*, what the teacher
    does, and a classroom example of each (Topic 1.1)
  - fig-U1-5 - `concept-map` - one lesson at the centre, the three theoretical readings radiating
    out, each labelled with the management move it implies (Topic 1.1)
  - fig-U1-2 - `table` - management vs discipline: purpose, timing, what it acts on, what success
    looks like (Topic 1.2)
  - fig-U1-6 - `concept-map` - "well-managed classroom" linked to its observable features and to
    what it is commonly confused with (Topic 1.2)
  - fig-U1-3 - `diagram` - a classroom floor plan annotated with physical features that carry
    management weight: sightlines, traffic paths, display walls, resource corners (Topic 1.3)
  - fig-U1-7 - `flowchart` - the observation cycle: decide what to look for -> record -> separate
    observation from inference -> ask why -> plan a change (Topic 1.3; the unit's required
    schematic)
  - fig-U1-4 - `diagram` - three seating arrangements (rows, clusters, horseshoe) with the
    learning experience each serves and what each costs (Topic 1.4)
  - fig-U1-8 - `table` - a low-resource environment audit: what to look for, why it matters, what
    a Pakistani government-school teacher can change this week (Topic 1.4)

**Unit-end assessment blueprint** (`unit-assessment.mdx` - Spec 008 fixed 10/10/5 bank):
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic; each with a model answer and a
    point-by-point mark scheme in `## Answers and marking guidance`
  - ERQs (5): Analyze to Evaluate/Create; one per topic plus one integrative item asking the
    reader to design a management plan for a described low-resource classroom and justify each
    choice against a learning theory. Each ERQ carries an analytic rubric.

**Licence note**: the CRQ items sampled in STEDA's specification at this level are
`Classroom Challenges` and `Instruction Differentiation`, both `Comprehension and analysis`. The
RRQ and ERQ items here should be written in that register - scenario, then a reasoned plan - not
as recall prompts.

## Unit 2: Curriculum and classroom management

Weeks 5-8 (12 hours). Unit Spec (G1) for `licence/eed-313/unit-02/`.

- **CLO refs**: course outcomes 3 and 4.
- **Key terms**: Differentiation, Multigrade classroom, Overcrowded classroom, Lesson planning.
- **Topics**: how the curriculum itself does management work; building a teaching plan consistent
  with one's philosophy; the planning-motivating-teaching-assessing cycle; differentiating
  instruction by need, interest and level; managing multigrade and overcrowded classrooms.
- **Worked-example / activity concepts**: take one curriculum objective and plan it three ways -
  for a well-resourced single-grade class, for a multigrade class, and for a class of 60.
- **Assessment blueprint**: formative on the four-stage cycle; summative includes one
  Analyze-or-higher item on differentiating a single lesson for a described mixed-ability class.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | W5-8 | 2.1 | How curriculum supports classroom management |
| U2-02 | W5-8 | 2.1 | Creating a teaching and learning plan consistent with your philosophy |
| U2-03 | W5-8 | 2.2 | Planning the curriculum |
| U2-04 | W5-8 | 2.2 | Motivating learners within the curriculum |
| U2-05 | W5-8 | 2.2 | Teaching the curriculum |
| U2-06 | W5-8 | 2.2 | Assessing the curriculum |
| U2-07 | W5-8 | 2.3 | Differentiation of instruction by need, interest and level |
| U2-08 | W5-8 | 2.3 | Managing multigrade classrooms |
| U2-09 | W5-8 | 2.3 | Managing overcrowded classrooms |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | Curriculum as a management tool | U2-01, U2-02 | 12-17 | fig-U2-1: concept-map, fig-U2-4: table |
| 2.2 | Plan, motivate, teach, assess | U2-03, U2-04, U2-05, U2-06 | 18-24 | fig-U2-2: flowchart, fig-U2-5: table |
| 2.3 | Differentiation, multigrade and overcrowding | U2-07, U2-08, U2-09 | 16-22 | fig-U2-3: diagram, fig-U2-6: table |

**Depth budget**: 9 sub-topics; 3 topics; 70-95 reading-min.

**Common misconceptions**: "differentiation means making some children do easier work";
"multigrade teaching is just teaching two lessons at once"; "an overcrowded class cannot be
managed, only survived".

**Figure plan**: fig-U2-1 `concept-map` curriculum decisions and the management pressure each
relieves or creates (2.1); fig-U2-4 `table` two teaching plans traced back to two philosophies
(2.1); fig-U2-2 `flowchart` the plan-motivate-teach-assess cycle with the management decision at
each stage (2.2; required schematic); fig-U2-5 `table` motivation strategies against what they
cost in time and materials (2.2); fig-U2-3 `diagram` one objective differentiated three ways for
a mixed-ability class (2.3); fig-U2-6 `table` multigrade and overcrowded classroom tactics with
the constraint each addresses (2.3).

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ, >= 2 MCQ and >= 2 RRQ per topic, one
ERQ per topic plus an integrative item asking for a differentiated plan in a named constraint.

## Unit 3: Routines, schedules, and time management in diverse classrooms

Weeks 9-11 (9 hours). Unit Spec (G1) for `licence/eed-313/unit-03/`.

- **CLO refs**: course outcome 5.
- **Key terms**: Routine, Structure, Transition, Collaborative learning.
- **Topics**: what routines and structures are and how they buy instructional time; routines in
  multigrade contexts and for special needs; subject-specific routines for mathematics, science
  and literacy; routines that build co-operation and collaborative learning.
- **Worked-example / activity concepts**: time one classroom transition before and after a routine
  is introduced, and count the minutes recovered across a week.
- **Assessment blueprint**: formative on identifying where time leaks; summative includes one
  Analyze-or-higher item designing a routine set for a described multigrade class.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | W9 | 3.1 | What classroom routines and structures are |
| U3-02 | W9 | 3.1 | How routines help manage classroom time |
| U3-03 | W9 | 3.2 | Creating routines and structures in a multigrade context |
| U3-04 | W9 | 3.2 | Using routines to meet special needs and situations |
| U3-05 | W10 | 3.3 | Routines for teaching mathematics |
| U3-06 | W10 | 3.3 | Routines for teaching science |
| U3-07 | W10 | 3.3 | Routines for teaching literacy |
| U3-08 | W11 | 3.4 | Routines that promote co-operation |
| U3-09 | W11 | 3.4 | Routines that support collaborative learning |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | What routines are, and the time they buy | U3-01, U3-02 | 11-16 | fig-U3-1: concept-map, fig-U3-5: table |
| 3.2 | Routines in multigrade and mixed-need classes | U3-03, U3-04 | 12-17 | fig-U3-2: diagram, fig-U3-6: table |
| 3.3 | Subject-specific routines | U3-05, U3-06, U3-07 | 15-20 | fig-U3-3: table, fig-U3-7: diagram |
| 3.4 | Routines for co-operation and collaboration | U3-08, U3-09 | 12-17 | fig-U3-4: flowchart, fig-U3-8: table |

**Depth budget**: 9 sub-topics; 4 topics; 70-95 reading-min.

**Common misconceptions**: "routines make a classroom rigid"; "routines are for young children
only"; "group work and collaborative learning are the same thing".

**Figure plan**: fig-U3-1 `concept-map` routine, structure, procedure and rule distinguished
(3.1); fig-U3-5 `table` a week's recovered minutes, transition by transition (3.1); fig-U3-2
`diagram` a multigrade timetable showing which group is with the teacher when (3.2); fig-U3-6
`table` routines matched to specific special needs (3.2); fig-U3-3 `table` one routine per subject
with what it protects (3.3); fig-U3-7 `diagram` a literacy-block layout (3.3); fig-U3-4
`flowchart` how a collaborative task is set up, run and closed (3.4; required schematic);
fig-U3-8 `table` co-operation structures against group size and noise cost (3.4).

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ on the same pattern as Unit 2, with the
integrative ERQ asking for a full routine set for a named multigrade or overcrowded context.

## Unit 4: Creating shared values and community

Weeks 12-15 (12 hours). Unit Spec (G1) for `licence/eed-313/unit-04/`.

- **CLO refs**: course outcome 6.
- **Key terms**: Community, Community participation, Ethic of care, Personal accountability.
- **Topics**: what community means inside and outside the school; community participation and its
  typical practices; involving the community in the classroom, including in multigrade settings;
  building an ethic of care and respectful relations; growing responsible action and personal
  accountability; what to do when behaviour breaks down or the unexpected happens.
- **Worked-example / activity concepts**: one behaviour incident traced twice - once handled
  punitively, once handled inside a caring, accountable classroom culture.
- **Assessment blueprint**: formative on distinguishing participation from involvement; summative
  includes one Evaluate-level item judging a described response to a behaviour breakdown.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | W12 | 4.1 | What community means inside and outside the classroom and school |
| U4-02 | W12 | 4.1 | Community participation and involvement |
| U4-03 | W12 | 4.1 | Typical practices of community participation |
| U4-04 | W13 | 4.2 | Involving the community in your classroom |
| U4-05 | W13 | 4.2 | Routines and structures for community involvement |
| U4-06 | W13 | 4.2 | How community involvement differs in multigrade classrooms |
| U4-07 | W14 | 4.3 | Creating an ethic of care in the classroom |
| U4-08 | W14 | 4.3 | Diverse classrooms as caring, democratic communities |
| U4-09 | W14 | 4.3 | Respectful relations between teacher and students, and among students |
| U4-10 | W15 | 4.4 | Building responsible action and personal accountability |
| U4-11 | W15 | 4.4 | What happens when behaviour breaks down |
| U4-12 | W15 | 4.4 | Dealing with unexpected events |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | What community means for a school | U4-01, U4-02, U4-03 | 14-19 | fig-U4-1: concept-map, fig-U4-5: table |
| 4.2 | Bringing the community in | U4-04, U4-05, U4-06 | 14-19 | fig-U4-2: flowchart, fig-U4-6: table |
| 4.3 | An ethic of care | U4-07, U4-08, U4-09 | 15-20 | fig-U4-3: concept-map, fig-U4-7: table |
| 4.4 | Accountability, and when things break down | U4-10, U4-11, U4-12 | 15-20 | fig-U4-4: flowchart, fig-U4-8: diagram |

**Depth budget**: 12 sub-topics; 4 topics; 80-105 reading-min.

**Common misconceptions**: "community involvement means asking parents for money"; "an ethic of
care means never correcting a child"; "a caring classroom has no consequences".

**Figure plan**: fig-U4-1 `concept-map` the circles of community around one classroom (4.1);
fig-U4-5 `table` participation vs involvement, with an example of each (4.1); fig-U4-2 `flowchart`
inviting a community member into a lesson, from first contact to follow-up (4.2); fig-U4-6 `table`
community roles matched to what each can realistically contribute (4.2); fig-U4-3 `concept-map`
what an ethic of care is built from (4.3); fig-U4-7 `table` respectful-relations moves and the
message each sends (4.3); fig-U4-4 `flowchart` a behaviour breakdown handled through a caring,
accountable response rather than a punitive one (4.4; required schematic); fig-U4-8 `diagram` an
unexpected-event decision aid for a teacher alone in a classroom (4.4).

**Unit-end assessment blueprint**: 10 MCQ / 10 RRQ / 5 ERQ on the same pattern, with the
integrative ERQ asking the reader to write the community-and-care section of their own classroom
management plan - the artefact the guide's own course review asks for.

## Unit 5: Course review

Week 16 (3 hours). Unit Spec (G1) for `licence/eed-313/unit-05/`.

- **CLO refs**: course outcomes 1, 2, 3, 4, 5 and 6 (the unit is the course synthesis and draws on
  every outcome).
- **Key terms**: Classroom management plan, Peer critique, Summary and close.
- **Topics**: pulling the four preceding units into one usable philosophy; peer critique and review
  of final classroom management plans; summary and close of the course.
- **Worked-example / activity concepts**: each student teacher presents the classroom management
  plan they have built across Units 1 to 4; peers use a structured protocol to critique it, and the
  author revises in light of the feedback, then the course closes with a whole-group synthesis.
- **Assessment blueprint**: formative on reading another's plan against the five earlier units'
  principles; summative is the **classroom management plan** itself, the course's culminating
  artefact, assessed against the sample assignment the guide specifies.

### Sub-topic checklist

One row per leaf item of the guide's Unit 5 outline (`ClassroomMgmt_Sept13.txt:244-249`,
`:256-306`).

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | W16 | 5.1 | Pulling the four units into one classroom-management philosophy |
| U5-02 | W16 | 5.2 | Peer critique and review of final projects |
| U5-03 | W16 | 5.3 | Presenting the classroom management plan |
| U5-04 | W16 | 5.3 | Giving and receiving structured peer feedback |
| U5-05 | W16 | 5.3 | Revising the plan in light of critique |
| U5-06 | W16 | 5.4 | Summary and close of the course |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | One philosophy from four units | U5-01 | 8-12 | fig-U5-1: concept-map |
| 5.2 | Peer critique of final projects | U5-02 | 6-10 | fig-U5-2: table |
| 5.3 | Presenting and improving the plan | U5-03, U5-04, U5-05 | 10-15 | fig-U5-3: flowchart |
| 5.4 | Summary and close | U5-06 | 4-8 | fig-U5-4: table |

**Depth budget**: 6 sub-topics; 4 topics; 40-55 reading-min. Reading load is deliberately the
lightest in the course: the work here is synthesis and application of material already covered in
Units 1 to 4, not new content.

**Prerequisite knowledge**: the full content of Units 1, 2, 3 and 4. Unit 5 is the capstone that
assumes the reader has worked through the theories, the curriculum and differentiation, the
routines, and the community and care units.

**Common misconceptions**: these are the guide's own closing misconceptions
(`ClassroomMgmt_Sept13.txt:286-306`); they are re-stated here because the review unit is where a
teacher examines and corrects the beliefs they held at the start of the course:
- the best-managed classroom is one where the teacher, not the student, is in control of learning
- the quietest classrooms are the best managed
- the goal of classroom management is peace and discipline
- classroom management relies on threats and punishment
- classrooms are homogeneous
- each class has fixed content that must be taught
- the same content must be taught to every student in one class

**Figure plan** (>= 2 per topic; >= 1 concept-map / flowchart / timeline in the unit -
Constitution Art. III.10; seeds `specs/content/eed-313/figures/unit-05.md`):
  - fig-U5-1 - `concept-map` - the five units of the course as inputs into one classroom-management
    philosophy, with the through-line from theory to plan labelled (Topic 5.1; the unit's required
    schematic)
  - fig-U5-2 - `table` - a peer-critique protocol: what to look for, what to ask, what to suggest,
    and what is out of scope (Topic 5.2)
  - fig-U5-3 - `flowchart` - the critique-and-receive cycle: present -> peers probe -> author
    clarifies -> author revises -> final plan submitted (Topic 5.3)
  - fig-U5-4 - `table` - the classroom management plan rubric distilled from the guide's sample
    assignment: philosophy, physical layout, rules and responsibilities, routines and procedures,
    community and caring activities, disruption methods (Topic 5.4)

**Unit-end assessment blueprint** (`unit-assessment.mdx` - Spec 008 fixed 10/10/5 bank):
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; the integrative item is the **classroom management
    plan** - the course's culminating artefact, assessed against the sample assignment the guide
    specifies (`ClassroomMgmt_Sept13.txt:315-324`). Each ERQ carries an analytic rubric.

**Licence note**: the classroom management plan is the artefact the guide's own course review asks
for (`ClassroomMgmt_Sept13.txt:315-318`); it is also the natural response to the sampled CRQ items
at this level, so it serves both the degree module and the licence test.

## Reading list

Cited by reference only (Constitution Art. III.5). Guide-required (all six suggested
resources, `ClassroomMgmt_Sept13.txt:250-274`). Under `D-2026-0001`, unretrievable print
monographs bind the author to title-level support at point of use; a DOI/URL is recorded
where the guide supplies one.

- L. Canter, "Assertive Discipline: More than Names on the Board and Marbles in a Jar".
- C. Evertson and I. Poole, *Norms and Expectations*, IRIS Center, Vanderbilt.
- C. M. Evertson and E. T. Emmer, *Classroom Management for Elementary Teachers*, 8th edn.,
  Upper Saddle River, NJ: Pearson, 2009.
- M. R. Henley, "Introduction to Proactive Classroom Management", in *Classroom Management: A
  Proactive Approach*, Upper Saddle River, NJ: Pearson, 2009.
- R. J. Marzano, J. S. Marzano, and D. Pickering, *Classroom Management That Works:
  Research-Based Strategies for Every Teacher*, Alexandria, VA: ASCD, 2003.
- S. Vincent, *The Multigrade Classroom: A Resource Handbook for Small, Rural Schools, Book 3:
  Classroom Management and Discipline*, Portland, OR: Northwest Regional Educational Laboratory.
- H. K. Wong and R. T. Wong, "The Well-Managed Classroom", in *The First Days of School: How to Be
  an Effective Teacher*, rev. edn., Mountain View, CA: Harry K. Wong Publications, 1998.

Additional sources are gathered per unit at authoring time into
`specs/content/eed-313/sources/unit-NN.md`, under Constitution Art. II.3.
