---
course_code: EFPC-411
status: draft
open_access_floor:
  default: 1
---

# EFPC-411 - School Observation - Content Spec

Semester 4, Major: Practical Course I, 2 (0-2) credit hours. Source: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` lines 540-712; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester IV row 6 ("EFPC-4--, School Observation, 2 (0-2), Major: Practical Course-I, All departments").

**Identity conflict** (for intake; an Article II.3 question the drafter does not settle): the Scheme leaves the number blank ("EFPC-4--"); the guide gives **EFPC-411** (`:545`). Title, credit hours (02 (0-2)) and semester agree. The Scheme cannot supply a code, so this spec uses the guide's, which the licence blueprint also uses.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "EFPC-411", "title_en": "School Observation", "title_ur": "اسکول کا مشاہدہ", "credit_hours": "2 (0-2)", "category": "Major: Practical"}` in Semester 4. The Urdu title is the drafter's proposal.

**A practical course.** EFPC-411 is the corpus's first practicum: four weeks of seminars, a 15-day school placement and a portfolio. The units are therefore the student-teacher's guide to observing well (concepts, tools, ethics, what to look for, how to record and reflect), not a substitute for the placement. The placement and portfolio are assessed by the institution against rubrics; the units' question banks serve the guide's "formal assessment during seminars" (see `## Course-wide items`).

**Licence axis.** `specs/content/licence-blueprint.md` (section C) maps "Classroom observation and data collection" to EFPC-411 at course level, the only Classroom Management objective with any 2026 host. Units 1-2 carry it; the other Classroom Management objectives stay uncovered and are not claimed here (drafting note 5).

## Course-wide items

- **Course Outcomes (guide, `:550-556`, spacing restored where the extraction ran words together)**: after finishing this course, student-teachers will be able to:
  1. Describe key concepts, principles, and models related to classroom observation, including observation techniques, tools, and protocols.
  2. Analyze classroom interactions, teaching strategies, and student behavior to identify effective instructional practices and areas for improvement.
  3. Demonstrate proficiency in conducting systematic classroom observations using standardized tools and accurately documenting findings.
  4. Reflect on classroom observation experiences to develop self-awareness and a deeper understanding of effective teaching and learning practices.
  5. Demonstrate ethical and professional behavior during classroom observations, respecting confidentiality, cultural diversity, and the integrity of the educational environment.
  6. Effectively communicate observation findings through structured reports and constructive feedback, considering both teacher performance and student learning outcomes.
- **Teaching strategies**: seminars (Weeks 1-4), supervised school placement (Weeks 5-8), portfolio work (Weeks 9-12).
- **Assessment criteria (guide, `:707-712`)**: formal assessment during seminars 20; school placement 40; portfolio 20; viva or presentation 20; total 100. This replaces the Art. III.7 default. Only the first 20 marks draw on unit question banks.
- **Ethics of observation (applies to every unit)**: observe only with the school's permission; record no pupil's full name, photograph or identifying detail; keep notes confidential; describe what was seen, not the teacher's character; share findings only with the observed teacher and supervisor.

## Course Description

From the course guide (paraphrased, `:548`): a teacher-education programme's basic task is to develop the capacity for observation and reflective practice, so that student-teachers can examine the moral, ethical, managerial and curricular sides of teaching. Through seminars, a school placement and a portfolio, this course builds that capacity.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2.

### Guide-listed (`:692-705`)

Checked on 2026-11-18. The HEC links were fetched (all HTTP 200); the books were searched in Open Library or on the web.

| Key | Citation as printed | Units | Note |
|---|---|---|---|
| hec-2013-practicum | Higher Education Commission. (2013). *Practicum I & II: Handbook for student teachers, ADE/B.Ed. (Hons) Elementary, Semester 3 and 4*. HEC Pakistan. https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/TeachingPrac1And2_Sept13.pdf | 1, 2, 3 | free PDF, HTTP 200 (0.8 MB); the course's core text: observation tasks, proformas and reflection prompts for exactly this stage |
| hec-2013-methods | Higher Education Commission. (2013). *General methods of teaching: Course guide for B.Ed. (Hons.) Elementary*. https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/MethodsTeaching_Sept13.pdf | 1, 2 | free PDF, HTTP 200; for the teaching strategies and questioning the observer looks for |
| hec-2013-edupsy | Higher Education Commission. (2013). *Educational psychology: Course guide for B.Ed. (Hons.) Elementary*. https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/EduPsy_Sept13.pdf | 2 | free PDF, HTTP 200; pupil engagement and behaviour |
| hec-2013-currdev | Higher Education Commission. (2013). *Curriculum development: Course guide for B.Ed. (Hons.) Elementary*. https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/CurrDevpt_Sept13.pdf | 1 | free PDF, HTTP 200; lesson objectives and planning |
| hec-2013-foundations | Higher Education Commission. (2013). *Foundations of education: Course guide for B.Ed. (Hons.) Elementary*. https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/FoundationsEd_Sept13.pdf | - | free PDF, HTTP 200; listed by the guide but matches no topic here; not bound (it is bound in `EFMP-409`) |
| hec-2013-literacy | Higher Education Commission. (2013). *Teaching literacy skills: Course guide for B.Ed. (Hons.) Elementary*. https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/TeachingLit_CG_Sept13.pdf | - | free PDF, HTTP 200; matches no topic here; not bound |
| hec-2016-practicum | Higher Education Commission. (2016). *Reading practicum (Semester 7)* and *Advanced practicum (Semester 8)*: course guides, B.Ed. (Hons) Elementary. | - | no link given; later-semester practicums, not bound here |
| mcburney-fry | McBurney-Fry, G. (2002). *Improving your practicum: A guide to better teaching practice* (2nd ed.). Social Science Press. | 2, 3 | real (cited elsewhere as 2005, Social Science Press, Australia); print; the guide's "Thomson Social Science Press" is as printed |
| richards-lockhart-1994 | Richards, J. C., & Lockhart, C. (1994). *Reflective teaching in second language classrooms*. Cambridge University Press. | 3 | real (OL15053472W); print; reflection chapters apply beyond language teaching |
| elt-methods-texts | Harmer, J. (2007). *How to teach English* (2nd ed.). Pearson Longman. Brown, H. D. (2007). *Teaching by principles* (3rd ed.). Pearson Longman. Scrivener, J. (2011). *Learning teaching* (3rd ed.). Macmillan. | 2 | real, print. English-language-teaching texts; their lesson-observation and classroom-management chapters are usable for any subject (drafting note 6) |

### Author-selected (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| teach-primary-2021 | Molina, E., Pushparatnam, A., Melo, C., Wilichowski, T., del Toro Mijares, A. T., Ding, E., Aloys, J. B., Carter, E., & Singal, N. (2021). *Teach Primary: Observer manual* (2nd ed.). World Bank. | https://documents1.worldbank.org/curated/en/872291641201520569/pdf/Teach-Primary-Observer-Manual.pdf | 1, 2 | open (CC BY 4.0 IGO), downloaded and checked 2026-11-18 (60 pp.); a standardised observation tool used in Pakistan and elsewhere (guide outcome 3) |

## Week schedule

The guide sets three blocks: "Task - 01: Introduction to the school and classroom context (four week seminars)" (Weeks 1-4, `:558-586`), "UNIT # 02 School placement observation plan (15 days internship)" (Weeks 5-8, `:587-616`), and portfolio weeks with no heading (Weeks 9-12, `:618-691`). The spec makes each block a unit (drafting note 2) and **each topic one guide week**, as in `GUHQ-301` (`D-2026-0080`). Weeks 13-16 are not scheduled in the guide; the viva or presentation (`:711`) falls there.

| Week(s) | Unit | Topics (one per week) |
|---|---|---|
| 1-4 | Unit 1 - Foundations of Classroom Observation (seminars) | 1.1 Week 1; 1.2 Week 2; 1.3 Week 3; 1.4 Week 4 |
| 5-8 | Unit 2 - School Placement Observation Tasks | 2.1 Week 5; 2.2 Week 6; 2.3 Week 7; 2.4 Week 8 |
| 9-12 | Unit 3 - The Observation Portfolio and Reflective Practice | 3.1 Week 9; 3.2 Week 10; 3.3 Week 11; 3.4 Week 12 |

## Unit 1: Foundations of Classroom Observation

Guide Task 01, Weeks 1-4 seminars (`:558-586`). Unit Spec (G1) for `docs/semester-4/efpc-411/unit-01/`.

- **CLO/SLO refs**: `SLO:EFPC-411-1-1` (explain the meaning, importance and types of classroom observation and the roles of supervisors, mentors and observers; apply the ethics of observation), `SLO:EFPC-411-1-2` (identify the focus areas of an observation and choose among checklists, rating scales, anecdotal records and reflective journals), `SLO:EFPC-411-1-3` (prepare for, record and reflect on an observation while avoiding bias), `SLO:EFPC-411-1-4` (analyse findings and give constructive feedback; link observation to self-improvement) - traces to guide outcomes 1, 3, 5 and 6.
- **Key terms**: Classroom observation, Observation protocol, Checklist, Rating scale, Anecdotal record, Observer bias, Constructive feedback.
- **Topics**: 1.1 Week 1 to 1.4 Week 4, one per seminar week.
- **Assessment blueprint**: formative 12 items, 3 per topic (extends `D-2026-0072` to a four-topic unit, as accepted under `D-2026-0080` and `D-2026-0077`) (Remember/Understand/Apply); summative includes one Analyze item asking the learner to rewrite five biased observation notes as objective, evidence-based notes and explain each change. Weighting: the guide's seminar assessment (20 of 100).

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | Week 1 (`:561`) | 1.1 | Meaning and importance of classroom observation |
| U1-02 | Week 1 (`:562`) | 1.1 | Types of classroom observation (formal, informal, peer, supervisor-led) |
| U1-03 | Week 1 (`:563`) | 1.1 | Roles of supervisors, mentors and observers |
| U1-04 | Week 1 (`:564`) | 1.1 | Professional ethics during observation (confidentiality, respect, objectivity) |
| U1-05 | Week 2 (`:567-571`) | 1.2 | Observation focus areas: lesson objectives and planning, teaching strategies, classroom management, pupil engagement, use of teaching aids |
| U1-06 | Week 2 (`:572-576`) | 1.2 | Observation tools: checklists, rating scales, anecdotal records, reflective journals |
| U1-07 | Week 3 (`:578`) | 1.3 | Pre-observation briefing |
| U1-08 | Week 3 (`:579`) | 1.3 | Techniques for accurate note-taking |
| U1-09 | Week 3 (`:580`) | 1.3 | Avoiding bias in observation |
| U1-10 | Week 3 (`:581`) | 1.3 | Post-observation reflection |
| U1-11 | Week 4 (`:583`) | 1.4 | Analysing observation findings |
| U1-12 | Week 4 (`:584`) | 1.4 | Giving professional and constructive feedback |
| U1-13 | Week 4 (`:585-586`) | 1.4 | Linking observation to self-improvement; the role of reflection in teaching practice |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | Why and how teachers are observed | U1-01, U1-02, U1-03, U1-04 | 10-14 | fig-U1-1: table, fig-U1-2: concept-map |
| 1.2 | What to look at, and with what tools | U1-05, U1-06 | 10-14 | fig-U1-3: concept-map, fig-U1-4: table |
| 1.3 | Conducting an observation | U1-07, U1-08, U1-09, U1-10 | 10-14 | fig-U1-5: flowchart, fig-U1-6: table |
| 1.4 | From findings to feedback and growth | U1-11, U1-12, U1-13 | 8-12 | fig-U1-7: flowchart, fig-U1-8: table |

**Depth budget**: 13 sub-topics; 4 topics; 38-54 reading-min.

**Prerequisite knowledge**: `EFMP-302` Teaching Profession (Semester 1); `EFPG-401` Teaching of English (Semester 3) for lesson structure. This is the opening unit of the course.

**Common misconceptions**: "observation means judging the teacher"; "a good observer writes down opinions"; "feedback means listing what went wrong".

**Mapped readings**: hec-2013-practicum, teach-primary-2021, hec-2013-methods, hec-2013-currdev.

**Figure plan**:
  - fig-U1-1 - `table` - formal, informal, peer and supervisor-led observation compared on purpose, who observes and what follows (Topic 1.1)
  - fig-U1-2 - `concept-map` - the ethics of observation: permission, confidentiality, respect, objectivity, no identifying pupils (Topic 1.1)
  - fig-U1-3 - `concept-map` - five observation focus areas with two questions an observer asks under each (Topic 1.2)
  - fig-U1-4 - `table` - checklist, rating scale, anecdotal record and reflective journal: what each captures, a sample line, strengths and limits (Topic 1.2)
  - fig-U1-5 - `flowchart` - the observation cycle: pre-observation briefing, observe and record, post-observation reflection, feedback (the unit's required schematic) (Topic 1.3)
  - fig-U1-6 - `table` - biased and objective notes on the same moment, side by side (Topic 1.3)
  - fig-U1-7 - `flowchart` - giving feedback: start with evidence, name a strength, raise one area, agree a next step (Topic 1.4)
  - fig-U1-8 - `table` - from a finding to a personal target for the student-teacher's own teaching (Topic 1.4)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: School Placement Observation Tasks

Guide UNIT # 02 "School Placement Observation Plan (15 days internship)", Weeks 5-8 (`:587-616`). Unit Spec (G1) for `docs/semester-4/efpc-411/unit-02/`.

- **CLO/SLO refs**: `SLO:EFPC-411-2-1` (observe and describe a school's environment, rules and routines and one classroom's interaction, seating and climate), `SLO:EFPC-411-2-2` (observe three to four lessons for objectives, methods, aids and participation), `SLO:EFPC-411-2-3` (observe discipline, time management, behaviour and assessment methods), `SLO:EFPC-411-2-4` (observe the teacher's professional conduct, collaboration and inclusive practice across a complete lesson) - traces to guide outcomes 2, 3 and 5.
- **Key terms**: School environment, Classroom climate, Teacher-pupil interaction, Time on task, Inclusive practice, Professional conduct.
- **Topics**: 2.1 Week 5 to 2.4 Week 8, one per placement week.
- **Assessment blueprint**: formative 12 items, 3 per topic (as Unit 1) (Remember/Understand/Apply); summative includes one Analyze item asking the learner to read a short observation record of a Grade 4 lesson and identify, with evidence, two effective practices and one area for improvement. Weighting: the guide's seminar assessment; the placement itself (40 of 100) is assessed by the supervisor's rubric, not by this bank.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | Week 5 (`:590`) | 2.1 | Observing the school environment: physical layout, resources, discipline system |
| U2-02 | Week 5 (`:591`) | 2.1 | Understanding school rules, routines and the daily schedule |
| U2-03 | Week 5 (`:592-595`) | 2.1 | Observing one classroom: teacher-pupil interaction, seating arrangement, general climate |
| U2-04 | Week 6 (`:597`) | 2.2 | Observing three to four lessons in different subjects |
| U2-05 | Week 6 (`:598-602`) | 2.2 | Lesson focus: objectives, teaching methods and strategies, teaching aids, pupil participation |
| U2-06 | Week 7 (`:606-608`) | 2.3 | Managing the class: discipline techniques, time management, pupil behaviour and engagement |
| U2-07 | Week 7 (`:609`) | 2.3 | Assessment methods in use (oral questions, quizzes, homework) |
| U2-08 | Week 8 (`:613-614`) | 2.4 | The teacher's professional conduct and interaction with colleagues and parents |
| U2-09 | Week 8 (`:615`) | 2.4 | Use of inclusive practices in the classroom |
| U2-10 | Week 8 (`:616`) | 2.4 | Observing one complete lesson from start to end |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | Reading a school and a classroom | U2-01, U2-02, U2-03 | 8-12 | fig-U2-1: diagram, fig-U2-2: table |
| 2.2 | Observing teaching | U2-04, U2-05 | 8-12 | fig-U2-3: table, fig-U2-4: flowchart |
| 2.3 | Observing management and assessment | U2-06, U2-07 | 8-12 | fig-U2-5: table, fig-U2-6: diagram |
| 2.4 | Professionalism, inclusion and the whole lesson | U2-08, U2-09, U2-10 | 8-12 | fig-U2-7: timeline, fig-U2-8: table |

**Depth budget**: 10 sub-topics; 4 topics; 32-48 reading-min.

**Prerequisite knowledge**: Unit 1; `EFMP-305` Inclusive Education (Semester 2).

**Common misconceptions**: "a quiet class is always a well-managed class"; "assessment happens only in tests"; "inclusion is only about pupils with disabilities".

**Mapped readings**: hec-2013-practicum, teach-primary-2021, hec-2013-methods, hec-2013-edupsy, mcburney-fry, elt-methods-texts.

**Figure plan**:
  - fig-U2-1 - `diagram` - a classroom seating map with the observer's codes for interaction (who speaks to whom) (Topic 2.1)
  - fig-U2-2 - `table` - a school-environment observation sheet: area, what to note, an example entry (Topic 2.1)
  - fig-U2-3 - `table` - a lesson-observation proforma: objectives, method, aids, participation, questioning (Topic 2.2)
  - fig-U2-4 - `flowchart` - the stages of a lesson an observer tracks: opening, presentation, practice, check, closure (the unit's required schematic) (Topic 2.2)
  - fig-U2-5 - `table` - a time-on-task tally across a 35-minute lesson in five-minute blocks (Topic 2.3)
  - fig-U2-6 - `diagram` - assessment methods seen in a lesson placed from informal to formal (Topic 2.3)
  - fig-U2-7 - `timeline` - one complete lesson recorded minute by minute, as a worked example (Topic 2.4)
  - fig-U2-8 - `table` - inclusive practices to look for, each with an observable sign (Topic 2.4)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: The Observation Portfolio and Reflective Practice

Guide Weeks 9-12 "Organizing portfolio" to "Reflective practice and portfolio completion" (`:618-691`), which carry no unit heading. Unit Spec (G1) for `docs/semester-4/efpc-411/unit-03/`.

- **CLO/SLO refs**: `SLO:EFPC-411-3-1` (organise a portfolio and write a school profile), `SLO:EFPC-411-3-2` (document lesson observations with proformas and analyse the strategies seen), `SLO:EFPC-411-3-3` (compile management and assessment records and compare management styles), `SLO:EFPC-411-3-4` (write a final reflective report with strengths, areas for improvement and an action plan) - traces to guide outcomes 3, 4 and 6.
- **Key terms**: Portfolio, School profile, Evidence, Reflective entry, Reflective report, Action plan.
- **Topics**: 3.1 Week 9 to 3.4 Week 12, one per portfolio week.
- **Assessment blueprint**: formative 12 items, 3 per topic (as Unit 1) (Remember/Understand/Apply); summative includes one Create item asking the learner to write a reflective entry on a described lesson using a stated reflection model (what happened, why, what it means, what next). Weighting: the guide's seminar assessment; the portfolio (20 of 100) and viva (20) are assessed by rubric, not by this bank.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | Week 9 (`:619-621`) | 3.1 | Organising a portfolio: cover page and table of contents |
| U3-02 | Week 9 (`:622-630`) | 3.1 | Writing the school profile and documenting the general school environment |
| U3-03 | Week 9 (`:631-636`) | 3.1 | First reflective entry: first impressions; evidence to include |
| U3-04 | Week 10 (`:639-647`) | 3.2 | Documenting three to four lesson observations with proformas |
| U3-05 | Week 10 (`:648-654`) | 3.2 | Reflective entry: analysing the strategies observed, what worked and why; evidence to include |
| U3-06 | Week 11 (`:657-665`) | 3.3 | Compiling classroom-management and assessment records, including feedback given to pupils |
| U3-07 | Week 11 (`:667-673`) | 3.3 | Reflective entry: comparing management styles and personal learning; evidence to include |
| U3-08 | Week 12 (`:676-683`) | 3.4 | Completing the portfolio: sequence, final documentation of professionalism, interaction and inclusion |
| U3-09 | Week 12 (`:678, 684-687`) | 3.4 | The final reflective report: overall learning, strengths, areas for improvement, action plan |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Starting the portfolio: the school profile | U3-01, U3-02, U3-03 | 8-12 | fig-U3-1: diagram, fig-U3-2: table |
| 3.2 | Recording teaching and learning | U3-04, U3-05 | 8-12 | fig-U3-3: table, fig-U3-4: flowchart |
| 3.3 | Recording management and assessment | U3-06, U3-07 | 8-12 | fig-U3-5: table, fig-U3-6: table |
| 3.4 | Completing the portfolio and reflecting | U3-08, U3-09 | 8-12 | fig-U3-7: flowchart, fig-U3-8: table |

**Depth budget**: 9 sub-topics; 4 topics; 32-48 reading-min.

**Prerequisite knowledge**: Units 1-2.

**Common misconceptions**: "a portfolio is a file of everything collected"; "reflection means describing what happened"; "an action plan is a list of good intentions".

**Mapped readings**: hec-2013-practicum, richards-lockhart-1994, mcburney-fry.

**Figure plan**:
  - fig-U3-1 - `diagram` - the portfolio's structure in order: cover, contents, school profile, observations, management and assessment records, reflections, final report, attendance verification (Topic 3.1)
  - fig-U3-2 - `table` - a school-profile template with one completed example (an invented school) (Topic 3.1)
  - fig-U3-3 - `table` - a completed lesson-observation proforma for an invented Grade 5 lesson (Topic 3.2)
  - fig-U3-4 - `flowchart` - a reflection model: describe, analyse, interpret, plan (the unit's required schematic) (Topic 3.2)
  - fig-U3-5 - `table` - a classroom-management observation sheet with sample entries (Topic 3.3)
  - fig-U3-6 - `table` - two management styles compared on rules, routines, tone and pupil response (Topic 3.3)
  - fig-U3-7 - `flowchart` - from weekly reflections to the final report: gather, find patterns, judge, plan (Topic 3.4)
  - fig-U3-8 - `table` - an action plan: target, action, evidence of progress, date (Topic 3.4)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Code.** The Scheme prints "EFPC-4--"; the guide's EFPC-411 is the only number available and is used. The owner should confirm it.
2. **Three units from two headings.** The guide names "Task - 01" (Weeks 1-4) and "UNIT # 02" (Weeks 5-8); Weeks 9-12 follow with no heading. Read literally, Weeks 9-12 belong to Unit 2, giving an eight-topic unit that mixes observing with portfolio-building. The spec makes Weeks 9-12 a third unit, because the guide's content changes from observation tasks to portfolio and reflection and its own Week 9-12 reflection entries are numbered as weeks 1-3 of a new sequence (`:636, 654, 673`). If the owner prefers the literal reading, Units 2 and 3 merge and nothing else changes.
3. **Weeks 13-16.** Not scheduled in the guide. The viva or presentation (20 marks) presumably falls there; no content is invented for them.
4. **Question banks in a practicum.** The style guide's 10/10/5 unit bank is kept so that each unit can serve the seminar assessment (20 marks). The placement (40), portfolio (20) and viva (20) are assessed by institutional rubrics; the units provide the templates and guidance, not those assessments.
5. **Licence coverage.** The blueprint maps only "Classroom observation and data collection" here. Unit 2 Topic 2.3 has student-teachers observe routines, discipline and time management, which brushes against other Classroom Management objectives, but observing is not teaching them; the spec does not claim those rows.
6. **Reading list.** Five of the guide's books are English-language-teaching texts (Richards and Lockhart; Harmer; Brown; Scrivener), apparently carried over from a language-practicum list; units use only their general observation, reflection and management chapters. Two HEC guides on the list (Foundations of Education, Teaching Literacy Skills) match no topic and are not bound. The open-access floor is met by the HEC practicum handbook and the World Bank's Teach Primary manual.
7. **Pupils' privacy.** Any example observation record, profile or proforma in the units uses an invented school and invented pupils; no real child is named or pictured.
