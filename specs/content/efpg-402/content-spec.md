---
course_code: EFPG-402
status: approved
open_access_floor:
  default: 1
---

# EFPG-402 - Teaching of Science - Content Spec

Semester 4, Major: Pedagogy Course II, 3 (3-0) credit hours. Source: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` lines 716-833; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester IV row 7 ("MFPG-402, Teaching of Science, 3 (3-0), Major: Pedagogy Course - II, STE").

**Identity** (owner ruling, `D-2026-0093` item 5): the guide gives code **EFPG-402** (`:722`); the Scheme prints **MFPG-402**. The owner rules EFPG-402, treating "MFPG" as a Scheme-side slip: the guide's code fits the pedagogy series (`EFPG-401` Teaching of English in Semester 3; `EFPG-505`, `EFPG-506` later). Title ("Teaching of Science") and credit hours (3, "3 (3+0)" in the guide at `:720`) agree. The course directory is `docs/semester-4/efpg-402/`.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "EFPG-402", "title_en": "Teaching of Science", "title_ur": "سائنس کی تدریس", "credit_hours": "3 (3-0)", "category": "Major: Pedagogy"}` in Semester 4. The Urdu title is the drafter's proposal.

**Licence axis.** `specs/content/licence-blueprint.md` (section A) maps "Instructional approaches and strategies" to `EFPG-401`, `EFPG-402`, `EFPG-505` and `EFPG-506` at course level. Units 3 and 5 carry it; no sub-topic is added for it.

## Course-wide items

- **Course Objectives (guide, verbatim, `:729-735`)**: the student-teacher will be able to:
  1. Understand the nature, scope, and values of science
  2. Develop skills for effective science teaching at secondary level
  3. Apply modern methods and approaches of teaching science
  4. Use teaching-learning resources and ICT
  5. Plan lessons and conduct science teaching effectively
  6. Evaluate students' learning using appropriate tools
- **Teaching strategies**: none listed.
- **Practicum (guide, "Assessment criteria for B.Ed. students", `:805-810`)**: preparation of lesson plans; micro-teaching and macro-teaching; preparation of teaching aids; classroom observation and a reflective journal. These are course-level practical tasks, not unit content; see `## Practicum plan`.
- **Assessment criteria**: the guide lists the practicum tasks above but no weighting; the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Context**: this is a B.Ed (Elementary) programme, so examples and classroom cases use Pakistani Grade 4-8 General Science as set out in the National Curriculum of Pakistan 2022-23 and its Sindh adoption, while noting where the guide says "secondary" (drafting note 3).

## Course Description

From the course guide (paraphrased, `:726`): the course prepares pre-service and in-service teachers to teach General Science effectively by integrating concepts from physics, chemistry, biology and mathematics, with a focus on pedagogical content knowledge, methods and resources for science teaching, laboratory management and the evaluation of pupils' learning.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2.

### Guide-listed (`:812-833`)

All guide books are Indian teacher-education texts, and the journals and websites are Indian (NCERT, CBSE, DIKSHA, NROER) apart from Khan Academy. Searched in Open Library on 2026-11-18.

| Key | Citation as printed / as found | Units | Note |
|---|---|---|---|
| das-1985 | Das, R. C. (1985). *Science teaching in schools*. Sterling Publishers. | 1, 3 | real (OL13678681W); print |
| yadav-2002 | Yadav, M. S. (2002). *Teaching of science*. Anmol Publications. | 1, 5, 8 | real (OL10226886W); print |
| kochhar-science | Kochhar, S. K. *Teaching of science*. Sterling Publishers. | 2, 3, 6 | not found in Open Library; title-level only (`D-2026-0001`) |
| kulshreshtha-science | Kulshreshtha, S. P. *Teaching of science*. R. Lall Book Depot. | - | not found; title-level only; not bound |
| vaidya-science | Vaidya, N. *Science teaching for secondary schools*. Orient Longman. | 4 | not found; title-level only (`D-2026-0001`) |
| aggarwal-science | Aggarwal, J. C. *Teaching of science*. Vikas Publishing House. | 2, 7 | not found (Open Library holds the author's *Teaching of Political Science and Civics*); title-level only |
| ncert-position-paper | NCERT. *Position paper: Teaching of science*. New Delhi. Also "NCERT science textbooks (Classes VI-X)". | - | Indian national documents; `ncert.nic.in` did not respond on 2026-11-18. Not bound: units use Pakistan's own curriculum (below) for curriculum content (drafting note 4) |
| khan-academy-science | Khan Academy. *Science* (videos and exercises). https://www.khanacademy.org/science | 4 | guide-listed website, open, HTTP 200 on 2026-11-18 |

### Author-selected (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| ncp-science-2022 | National Curriculum Council, Ministry of Federal Education and Professional Training. (2023). *National curriculum of Pakistan 2022-23: Science, Grades 4-8* (progression grid). | https://ncc.gov.pk/SiteImage/Misc/files/8_%20NCP%20Science%20PG%204-8.pdf | 1, 2, 3, 4, 5, 7, 8 | official PDF, HTTP 200 on 2026-11-18 (19.6 MB); the curriculum the student-teachers will teach |
| dcar-science-4-8 | Directorate of Curriculum, Assessment and Research, Sindh. *National curriculum for General Science, Grades IV-VIII*. | https://dcar.gos.pk/National_Curriculum/General%20Science%20Grades%20IV-VIII.pdf | 2, 7 | official PDF, HTTP 200 on 2026-11-18 (31 MB); year and edition to be read from the PDF |
| bscs-2006-5e | Bybee, R. W., Taylor, J. A., Gardner, A., Van Scotter, P., Carlson Powell, J., Westbrook, A., & Landes, N. (2006). *The BSCS 5E instructional model: Origins and effectiveness*. BSCS. | https://media.bscs.org/bscsmw/5es/bscs_5e_full_report.pdf | 3, 5, 7 | free PDF, confirmed 2026-11-18 (65 pp.) |
| sep-scientific-method | Hepburn, B., & Andersen, H. (2015/2026). Scientific method. In *The Stanford Encyclopedia of Philosophy*. | https://plato.stanford.edu/entries/scientific-method/ | 1, 3, 8 | open access; substantive revision 8 August 2026 |
| cpsc-niosh-2006 | U.S. Consumer Product Safety Commission & National Institute for Occupational Safety and Health. (2006). *School chemistry laboratory safety guide* (DHHS (NIOSH) Publication No. 2007-107). | https://www.cdc.gov/niosh/docs/2007-107/pdfs/2007-107.pdf | 6 | public-domain PDF, confirmed 2026-11-18 (86 pp.); US regulations it cites are context only |
| khan-2019-low-cost | Khan, S., Farooq, R. A., & Fleury, N. (2019). Effectiveness of low cost materials on diverse achievers in the teaching of physics at secondary level. *Sir Syed Journal of Education & Social Research, 2*(2), 33-47. | https://doi.org/10.36902/sjesr-vol2-iss2-2019(33-47) | 4 | diamond OA; OpenAlex W2995687045; a Pakistani study |
| minhas-2025-lab | Minhas, M. A. (2025). Evaluating laboratory conditions for science education: A comparative study of public and private secondary schools in Dera Ismail Khan. *CARC Research in Social Sciences*. | OpenAlex W7223721518 | 6 | diamond OA; no DOI; volume, issue, pages and URL to be confirmed before binding |
| unesco-2017-esd | UNESCO. (2017). *Education for Sustainable Development Goals: Learning objectives*. ISBN 978-92-3-100209-0. | https://doi.org/10.54675/CGBA9153 | 8 | open access (CC BY-SA 3.0 IGO), confirmed 2026-11-18 |

## Week schedule

The guide names eight units, each with its weeks (`:738-803`), two weeks per unit across all sixteen weeks. Following `D-2026-0070` item 1 there is one unit per guide unit, and **each topic teaches one numbered guide section** (Topic N.k = guide section N.k), as approved for `EFPG-401` (`D-2026-0077`). The guide's sections are one-line items, so a topic is short (6-9 reading-min); where a section names two methods or practices, each is its own checklist row.

| Week(s) | Unit | Topics |
|---|---|---|
| 1-2 | Unit 1 - Nature and Importance of Science | 1.1-1.5 |
| 3-4 | Unit 2 - Science Curriculum and Textbook | 2.1-2.5 |
| 5-6 | Unit 3 - Methods and Approaches of Teaching Science | 3.1-3.7 |
| 7-8 | Unit 4 - Teaching-Learning Resources | 4.1-4.5 |
| 9-10 | Unit 5 - Lesson Planning and Teaching Skills | 5.1-5.5 |
| 11-12 | Unit 6 - Maintenance and Organization of Science Laboratory | 6.1-6.6 |
| 13-14 | Unit 7 - Assessment and Evaluation in Science | 7.1-7.5 |
| 15-16 | Unit 8 - Professional Growth and Contemporary Issues | 8.1-8.5 |

## Unit 1: Nature and Importance of Science

Guide Unit 1 (Weeks 1-2, `:738-744`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-01/`.

- **CLO/SLO refs**: `SLO:EFPG-402-1-1` (explain the meaning and characteristics of science, and science as process, product and attitude), `SLO:EFPG-402-1-2` (state the aims and values of teaching science and the role of science in society) - traces to guide objective 1.
- **Key terms**: Science, Scientific attitude, Process skills, Values of science education.
- **Topics**: one per guide section, Topic 1.k teaching guide section 1.k (1.1-1.5).
- **Assessment blueprint**: formative 15 items, 3 per topic (`D-2026-0072`, extended to 5-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Analyze item asking the learner to classify ten statements about a Grade 6 lesson as science-as-process, product or attitude and justify three. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | 1.1 (`:740`) | 1.1 | Meaning and characteristics of science |
| U1-02 | 1.2 (`:741`) | 1.2 | Science as a process (process skills) |
| U1-03 | 1.2 (`:741`) | 1.2 | Science as a product (facts, concepts, laws, theories) |
| U1-04 | 1.2 (`:741`) | 1.2 | Science as an attitude (curiosity, open-mindedness, honesty) |
| U1-05 | 1.3 (`:742`) | 1.3 | Aims and objectives of teaching science (guide: secondary level; see drafting note 3) |
| U1-06 | 1.4 (`:743`) | 1.4 | Values of science education: intellectual, moral, social |
| U1-07 | 1.5 (`:744`) | 1.5 | Role of science in modern society |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | Meaning and characteristics of science | U1-01 | 6-9 | fig-U1-1: concept-map, fig-U1-2: table |
| 1.2 | Science as process, product and attitude | U1-02, U1-03, U1-04 | 6-9 | fig-U1-3: flowchart, fig-U1-4: diagram |
| 1.3 | Aims and objectives of teaching science | U1-05 | 6-9 | fig-U1-5: table, fig-U1-6: diagram |
| 1.4 | Values of science education | U1-06 | 6-9 | fig-U1-7: table, fig-U1-8: concept-map |
| 1.5 | Role of science in modern society | U1-07 | 6-9 | fig-U1-9: table, fig-U1-10: timeline |

**Depth budget**: 7 sub-topics; 5 topics; 42-61 reading-min.

**Prerequisite knowledge**: secondary-school science (Matric) as studied by every student-teacher. This is the opening unit of the course.

**Common misconceptions**: "science is a collection of facts to memorise"; "scientific theories are guesses"; "science and values have nothing to do with each other".

**Mapped readings**: ncp-science-2022, sep-scientific-method, das-1985, yadav-2002.

**Figure plan**:
  - fig-U1-1 - `concept-map` - characteristics of science: empirical, tentative, testable, cumulative, self-correcting (Topic 1.1)
  - fig-U1-2 - `table` - science contrasted with common sense and with belief (Topic 1.1)
  - fig-U1-3 - `flowchart` - the scientific method as a cycle: observe, question, hypothesise, test, conclude, communicate (the unit's required schematic) (Topic 1.2)
  - fig-U1-4 - `diagram` - process, product and attitude as three faces of science (Topic 1.2)
  - fig-U1-5 - `table` - aims of science teaching mapped to the NCP 2022-23 science standards (Topic 1.3)
  - fig-U1-6 - `diagram` - from aim to objective to classroom outcome (Topic 1.3)
  - fig-U1-7 - `table` - intellectual, moral and social values with a classroom example each (Topic 1.4)
  - fig-U1-8 - `concept-map` - values a science lesson can build (Topic 1.4)
  - fig-U1-9 - `table` - science in daily life in Pakistan: health, agriculture, energy, communication (Topic 1.5)
  - fig-U1-10 - `timeline` - selected scientific advances and their arrival in Pakistani daily life, dates from a bound source (Topic 1.5)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: Science Curriculum and Textbook

Guide Unit 2 (Weeks 3-4, `:746-752`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-02/`.

- **CLO/SLO refs**: `SLO:EFPG-402-2-1` (explain the principles of science curriculum construction and the aims of the national science curriculum), `SLO:EFPG-402-2-2` (analyse the organisation and sequencing of content; evaluate a science textbook; relate science to other subjects) - traces to guide objectives 1 and 2.
- **Key terms**: Curriculum, Spiral curriculum, Sequencing, Textbook evaluation, Correlation.
- **Topics**: one per guide section, Topic 2.k teaching guide section 2.k (2.1-2.5).
- **Assessment blueprint**: formative 15 items, 3 per topic (`D-2026-0072`, extended to 5-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to evaluate one chapter of a Sindh Grade 6 science textbook against the checklist in fig-U2-3 and the matching NCP standard. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | 2.1 (`:748`) | 2.1 | Principles of science curriculum construction |
| U2-02 | 2.2 (`:749`) | 2.2 | Aims and objectives of the secondary science curriculum (read against the national curriculum for Grades 4-8 and its Sindh adoption) |
| U2-03 | 2.3 (`:750`) | 2.3 | Organisation and sequencing of content (topical, concentric, spiral) |
| U2-04 | 2.4 (`:751`) | 2.4 | Textbook analysis and evaluation |
| U2-05 | 2.5 (`:752`) | 2.5 | Correlation of science with other subjects |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | Principles of science curriculum construction | U2-01 | 6-9 | fig-U2-1: concept-map, fig-U2-2: table |
| 2.2 | Aims and objectives of the school science curriculum | U2-02 | 6-9 | fig-U2-3: table, fig-U2-4: diagram |
| 2.3 | Organisation and sequencing of content | U2-03 | 6-9 | fig-U2-5: diagram, fig-U2-6: table |
| 2.4 | Textbook analysis and evaluation | U2-04 | 6-9 | fig-U2-7: table, fig-U2-8: flowchart |
| 2.5 | Correlation of science with other subjects | U2-05 | 6-9 | fig-U2-9: concept-map, fig-U2-10: table |

**Depth budget**: 5 sub-topics; 5 topics; 42-61 reading-min.

**Prerequisite knowledge**: Unit 1; `EFMP-303` Educational Policies and Plans of Pakistan (Semester 2) for the national curriculum framework.

**Common misconceptions**: "the textbook is the curriculum"; "a thicker textbook is a better textbook"; "science should be taught on its own, apart from other subjects".

**Mapped readings**: ncp-science-2022, dcar-science-4-8, aggarwal-science, kochhar-science.

**Figure plan**:
  - fig-U2-1 - `concept-map` - principles of curriculum construction: child-centred, activity-based, relevance, flexibility, integration (Topic 2.1)
  - fig-U2-2 - `table` - each principle with how the NCP 2022-23 science curriculum shows it (Topic 2.1)
  - fig-U2-3 - `table` - NCP 2022-23 science domains (life, physical, earth and space sciences) with a sample standard each (Topic 2.2)
  - fig-U2-4 - `diagram` - national curriculum, provincial adoption (DCAR Sindh), textbook, classroom (Topic 2.2)
  - fig-U2-5 - `diagram` - a spiral curriculum: one concept revisited in Grades 4, 6 and 8 with growing depth (the unit's required schematic) (Topic 2.3)
  - fig-U2-6 - `table` - topical, concentric and spiral organisation compared (Topic 2.3)
  - fig-U2-7 - `table` - a textbook-evaluation checklist: accuracy, alignment, language, activities, illustrations, inclusivity (Topic 2.4)
  - fig-U2-8 - `flowchart` - steps in evaluating a science textbook chapter (Topic 2.4)
  - fig-U2-9 - `concept-map` - one science topic linked to mathematics, languages, social studies and Islamiat (Topic 2.5)
  - fig-U2-10 - `table` - examples of correlation in Grade 6-8 topics (Topic 2.5)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: Methods and Approaches of Teaching Science

Guide Unit 3 (Weeks 5-6, `:754-762`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-03/`.

- **CLO/SLO refs**: `SLO:EFPG-402-3-1` (describe teacher-centred and laboratory-based methods and their uses), `SLO:EFPG-402-3-2` (plan inquiry-based, discovery, experiential and project learning; choose a method for a given topic and class) - traces to guide objective 3.
- **Key terms**: Demonstration, Laboratory method, Inductive, Deductive, Inquiry, Discovery learning.
- **Topics**: one per guide section, Topic 3.k teaching guide section 3.k (3.1-3.7).
- **Assessment blueprint**: formative 21 items, 3 per topic (`D-2026-0072`, extended to 7-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to choose and defend the best method for three given topics and class conditions (large class, no laboratory). Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | 3.1 (`:756`) | 3.1 | Lecture method |
| U3-02 | 3.1 (`:756`) | 3.1 | Discussion method |
| U3-03 | 3.2 (`:757`) | 3.2 | Laboratory method |
| U3-04 | 3.2 (`:757`) | 3.2 | Demonstration method |
| U3-05 | 3.3 (`:758`) | 3.3 | Scientific method |
| U3-06 | 3.3 (`:758`) | 3.3 | Problem-solving method |
| U3-07 | 3.4 (`:759`) | 3.4 | Project method |
| U3-08 | 3.4 (`:759`) | 3.4 | Field-trip method |
| U3-09 | 3.5 (`:760`) | 3.5 | Inductive method |
| U3-10 | 3.5 (`:760`) | 3.5 | Deductive method |
| U3-11 | 3.6 (`:761`) | 3.6 | Inquiry-based learning |
| U3-12 | 3.6 (`:761`) | 3.6 | Discovery learning |
| U3-13 | 3.7 (`:762`) | 3.7 | Experiential and activity-based learning |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Lecture and discussion methods | U3-01, U3-02 | 6-9 | fig-U3-1: table, fig-U3-2: diagram |
| 3.2 | Laboratory and demonstration methods | U3-03, U3-04 | 6-9 | fig-U3-3: flowchart, fig-U3-4: table |
| 3.3 | Scientific and problem-solving methods | U3-05, U3-06 | 6-9 | fig-U3-5: flowchart, fig-U3-6: table |
| 3.4 | Project and field-trip methods | U3-07, U3-08 | 6-9 | fig-U3-7: flowchart, fig-U3-8: table |
| 3.5 | Inductive and deductive methods | U3-09, U3-10 | 6-9 | fig-U3-9: diagram, fig-U3-10: table |
| 3.6 | Inquiry-based and discovery learning | U3-11, U3-12 | 6-9 | fig-U3-11: diagram, fig-U3-12: table |
| 3.7 | Experiential and activity-based learning | U3-13 | 6-9 | fig-U3-13: flowchart, fig-U3-14: table |

**Depth budget**: 13 sub-topics; 7 topics; 54-79 reading-min.

**Prerequisite knowledge**: Units 1-2; `EFPG-401` Teaching of English (Semester 3) for general methods vocabulary.

**Common misconceptions**: "activity-based learning means no teacher input"; "the lecture method is always bad"; "discovery learning works without guidance".

**Mapped readings**: bscs-2006-5e, ncp-science-2022, sep-scientific-method, kochhar-science, das-1985.

**Figure plan**:
  - fig-U3-1 - `table` - lecture and discussion compared: when to use, strengths, limits (Topic 3.1)
  - fig-U3-2 - `diagram` - a lecture-demonstration-discussion sequence in one 40-minute lesson (Topic 3.1)
  - fig-U3-3 - `flowchart` - planning a safe classroom demonstration: aim, apparatus, trial run, show, question, conclude (Topic 3.2)
  - fig-U3-4 - `table` - laboratory and demonstration methods compared (Topic 3.2)
  - fig-U3-5 - `flowchart` - problem-solving steps applied to a Grade 7 question (the unit's required schematic) (Topic 3.3)
  - fig-U3-6 - `table` - scientific method and problem-solving method compared (Topic 3.3)
  - fig-U3-7 - `flowchart` - stages of a school science project from choosing to presenting (Topic 3.4)
  - fig-U3-8 - `table` - a field-trip plan: purpose, permissions, safety, tasks, follow-up (Topic 3.4)
  - fig-U3-9 - `diagram` - inductive (examples to rule) and deductive (rule to examples) as two arrows (Topic 3.5)
  - fig-U3-10 - `table` - the same concept taught inductively and deductively (Topic 3.5)
  - fig-U3-11 - `diagram` - levels of inquiry: confirmation, structured, guided, open (Topic 3.6)
  - fig-U3-12 - `table` - inquiry and discovery compared with a Grade 6 example (Topic 3.6)
  - fig-U3-13 - `flowchart` - Kolb's experiential cycle applied to a science activity, from a bound source (Topic 3.7)
  - fig-U3-14 - `table` - low-cost activities for common Grade 4-8 topics (Topic 3.7)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: Teaching-Learning Resources

Guide Unit 4 (Weeks 7-8, `:764-770`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-04/`.

- **CLO/SLO refs**: `SLO:EFPG-402-4-1` (explain the importance of teaching aids; use laboratory equipment correctly), `SLO:EFPG-402-4-2` (prepare low-cost aids; use ICT, exhibitions, field trips and community resources in science teaching) - traces to guide objective 4.
- **Key terms**: Teaching aid, Low-cost material, ICT, Science exhibition, Community resource.
- **Topics**: one per guide section, Topic 4.k teaching guide section 4.k (4.1-4.5).
- **Assessment blueprint**: formative 15 items, 3 per topic (`D-2026-0072`, extended to 5-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Create item asking the learner to design a low-cost aid for a named Grade 5 concept and explain how it will be used and checked. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | 4.1 (`:766`) | 4.1 | Importance of teaching aids in science |
| U4-02 | 4.2 (`:767`) | 4.2 | Use of laboratory equipment |
| U4-03 | 4.3 (`:768`) | 4.3 | Preparation and use of low-cost teaching aids |
| U4-04 | 4.4 (`:769`) | 4.4 | Use of ICT in science teaching |
| U4-05 | 4.5 (`:770`) | 4.5 | Science exhibitions, field trips and community resources |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | Importance of teaching aids in science | U4-01 | 6-9 | fig-U4-1: concept-map, fig-U4-2: diagram |
| 4.2 | Use of laboratory equipment | U4-02 | 6-9 | fig-U4-3: table, fig-U4-4: diagram |
| 4.3 | Preparation and use of low-cost teaching aids | U4-03 | 6-9 | fig-U4-5: flowchart, fig-U4-6: table |
| 4.4 | Use of ICT in science teaching | U4-04 | 6-9 | fig-U4-7: table, fig-U4-8: diagram |
| 4.5 | Exhibitions, field trips and community resources | U4-05 | 6-9 | fig-U4-9: concept-map, fig-U4-10: table |

**Depth budget**: 5 sub-topics; 5 topics; 42-61 reading-min.

**Prerequisite knowledge**: Unit 3; `GICT-300` Applications of ICT (Semester 1).

**Common misconceptions**: "good teaching aids must be expensive"; "ICT replaces practical work"; "field trips are only outings".

**Mapped readings**: khan-2019-low-cost, khan-academy-science, ncp-science-2022, vaidya-science.

**Figure plan**:
  - fig-U4-1 - `concept-map` - why teaching aids matter: attention, understanding, retention, inclusion (Topic 4.1)
  - fig-U4-2 - `diagram` - Dale's cone of experience as a guide to choosing aids, from a bound source (Topic 4.1)
  - fig-U4-3 - `table` - common apparatus with its use and one handling rule (Topic 4.2)
  - fig-U4-4 - `diagram` - labelled diagram of a basic Grade 6-8 apparatus set-up (Topic 4.2)
  - fig-U4-5 - `flowchart` - making a low-cost aid: concept, materials, build, test, use (the unit's required schematic) (Topic 4.3)
  - fig-U4-6 - `table` - five low-cost aids from household materials with the concept each teaches (Topic 4.3)
  - fig-U4-7 - `table` - ICT tools (simulations, videos, data loggers, mobile apps) with offline alternatives (Topic 4.4)
  - fig-U4-8 - `diagram` - when ICT adds value and when a real object is better (Topic 4.4)
  - fig-U4-9 - `concept-map` - community resources for science: farm, clinic, workshop, river, museum (Topic 4.5)
  - fig-U4-10 - `table` - planning a school science exhibition (Topic 4.5)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 5: Lesson Planning and Teaching Skills

Guide Unit 5 (Weeks 9-10, `:772-778`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-05/`.

- **CLO/SLO refs**: `SLO:EFPG-402-5-1` (explain the importance and types of lesson plans; write instructional objectives), `SLO:EFPG-402-5-2` (use questioning, explanation and classroom-management skills in a science lesson) - traces to guide objective 5.
- **Key terms**: Lesson plan, Herbartian steps, 5E model, Instructional objective, Questioning.
- **Topics**: one per guide section, Topic 5.k teaching guide section 5.k (5.1-5.5).
- **Assessment blueprint**: formative 15 items, 3 per topic (`D-2026-0072`, extended to 5-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Create item asking the learner to write a 5E lesson plan for a named Grade 7 topic with three measurable objectives. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | 5.1 (`:774`) | 5.1 | Importance of lesson planning |
| U5-02 | 5.2 (`:775`) | 5.2 | Herbartian lesson plan |
| U5-03 | 5.2 (`:775`) | 5.2 | Bloom's (objective-based) lesson plan |
| U5-04 | 5.2 (`:775`) | 5.2 | 5E model lesson plan |
| U5-05 | 5.3 (`:776`) | 5.3 | Writing instructional objectives |
| U5-06 | 5.4 (`:777`) | 5.4 | Questioning skills |
| U5-07 | 5.4 (`:777`) | 5.4 | Explanation skills |
| U5-08 | 5.5 (`:778`) | 5.5 | Classroom management in science teaching |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | Importance of lesson planning | U5-01 | 6-9 | fig-U5-1: concept-map, fig-U5-2: table |
| 5.2 | Types of lesson plans | U5-02, U5-03, U5-04 | 6-9 | fig-U5-3: flowchart, fig-U5-4: table |
| 5.3 | Writing instructional objectives | U5-05 | 6-9 | fig-U5-5: table, fig-U5-6: diagram |
| 5.4 | Questioning and explanation skills | U5-06, U5-07 | 6-9 | fig-U5-7: table, fig-U5-8: flowchart |
| 5.5 | Classroom management in science teaching | U5-08 | 6-9 | fig-U5-9: table, fig-U5-10: diagram |

**Depth budget**: 8 sub-topics; 5 topics; 42-61 reading-min.

**Prerequisite knowledge**: Units 3-4; `EFMP-408` Educational Assessment and Evaluation (this semester) for objectives and Bloom's taxonomy.

**Common misconceptions**: "a lesson plan is paperwork for the head teacher"; "good questions have one right answer"; "a practical lesson cannot be orderly".

**Mapped readings**: bscs-2006-5e, ncp-science-2022, yadav-2002.

**Figure plan**:
  - fig-U5-1 - `concept-map` - what a lesson plan does for teacher and pupils (Topic 5.1)
  - fig-U5-2 - `table` - unplanned and planned lessons compared (Topic 5.1)
  - fig-U5-3 - `flowchart` - the 5E model: engage, explore, explain, elaborate, evaluate (the unit's required schematic) (Topic 5.2)
  - fig-U5-4 - `table` - Herbartian, Bloom's and 5E plans compared step by step (Topic 5.2)
  - fig-U5-5 - `table` - weak and strong science objectives with measurable verbs (Topic 5.3)
  - fig-U5-6 - `diagram` - an objective's parts: condition, behaviour, criterion (Topic 5.3)
  - fig-U5-7 - `table` - question types (recall, process, open) with science examples (Topic 5.4)
  - fig-U5-8 - `flowchart` - a good explanation: link to prior knowledge, example, check, summarise (Topic 5.4)
  - fig-U5-9 - `table` - management routines for practical work: groups, materials, signals, clean-up (Topic 5.5)
  - fig-U5-10 - `diagram` - a science classroom layout for group practical work (Topic 5.5)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 6: Maintenance and Organization of Science Laboratory

Guide Unit 6 (Weeks 11-12, `:780-787`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-06/`.

- **CLO/SLO refs**: `SLO:EFPG-402-6-1` (explain the laboratory's role; plan its layout and storage; dispose of chemicals safely; keep labels, inventory and stock registers), `SLO:EFPG-402-6-2` (apply laboratory safety rules and first aid; describe the science teacher's responsibilities in the laboratory) - traces to guide objectives 4 and 5.
- **Key terms**: Laboratory layout, Inventory, Stock register, Hazard symbol, First aid.
- **Topics**: one per guide section, Topic 6.k teaching guide section 6.k (6.1-6.6).
- **Assessment blueprint**: formative 18 items, 3 per topic (`D-2026-0072`, extended to 6-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Analyze item asking the learner to identify the hazards in a described school laboratory and rank the corrective actions. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U6-01 | 6.1 (`:782`) | 6.1 | Importance of the science laboratory in school education |
| U6-02 | 6.2 (`:783`) | 6.2 | Layout and organisation of a science laboratory |
| U6-03 | 6.3 (`:784`) | 6.3 | Arrangement and storage of materials |
| U6-04 | 6.3 (`:784`) | 6.3 | Disposal of chemicals |
| U6-05 | 6.4 (`:785`) | 6.4 | Proper labelling |
| U6-06 | 6.4 (`:785`) | 6.4 | Inventory and stock registers |
| U6-07 | 6.5 (`:786`) | 6.5 | Laboratory safety rules |
| U6-08 | 6.5 (`:786`) | 6.5 | First-aid measures |
| U6-09 | 6.6 (`:787`) | 6.6 | Role and responsibilities of the science teacher in laboratory management |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 6.1 | Importance of the science laboratory | U6-01 | 6-9 | fig-U6-1: concept-map, fig-U6-2: table |
| 6.2 | Layout and organisation of a science laboratory | U6-02 | 6-9 | fig-U6-3: diagram, fig-U6-4: table |
| 6.3 | Storage of materials and disposal of chemicals | U6-03, U6-04 | 6-9 | fig-U6-5: table, fig-U6-6: flowchart |
| 6.4 | Labelling, inventory and stock registers | U6-05, U6-06 | 6-9 | fig-U6-7: table, fig-U6-8: diagram |
| 6.5 | Laboratory safety rules and first aid | U6-07, U6-08 | 6-9 | fig-U6-9: table, fig-U6-10: diagram |
| 6.6 | The science teacher's role in laboratory management | U6-09 | 6-9 | fig-U6-11: concept-map, fig-U6-12: table |

**Depth budget**: 9 sub-topics; 6 topics; 48-70 reading-min.

**Prerequisite knowledge**: Units 3-4.

**Common misconceptions**: "safety rules are only for chemistry"; "labels can be added later"; "any chemical can be poured down the sink in small amounts".

**Mapped readings**: cpsc-niosh-2006, minhas-2025-lab, kochhar-science.

**Figure plan**:
  - fig-U6-1 - `concept-map` - what a laboratory develops: skills, attitudes, understanding (Topic 6.1)
  - fig-U6-2 - `table` - what schools without a laboratory can do instead, from a bound source (Topic 6.1)
  - fig-U6-3 - `diagram` - a model school laboratory plan: benches, sinks, storage, exits, safety station (the unit's required schematic) (Topic 6.2)
  - fig-U6-4 - `table` - layout features and the safety reason for each (Topic 6.2)
  - fig-U6-5 - `table` - chemical storage by compatibility group, from cpsc-niosh-2006 (Topic 6.3)
  - fig-U6-6 - `flowchart` - deciding how to dispose of a used chemical (Topic 6.3)
  - fig-U6-7 - `table` - a sample stock register page (Topic 6.4)
  - fig-U6-8 - `diagram` - a correct chemical label with its required parts (Topic 6.4)
  - fig-U6-9 - `table` - common laboratory accidents with immediate first-aid response (Topic 6.5)
  - fig-U6-10 - `diagram` - common hazard symbols and their meanings (Topic 6.5)
  - fig-U6-11 - `concept-map` - the teacher's laboratory duties before, during and after practical work (Topic 6.6)
  - fig-U6-12 - `table` - a weekly laboratory-management checklist (Topic 6.6)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 7: Assessment and Evaluation in Science

Guide Unit 7 (Weeks 13-14, `:789-795`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-07/`.

- **CLO/SLO refs**: `SLO:EFPG-402-7-1` (explain the purpose of evaluation; distinguish formative and summative assessment; choose tools and techniques), `SLO:EFPG-402-7-2` (construct an achievement test; plan diagnostic and remedial teaching) - traces to guide objective 6.
- **Key terms**: Evaluation, Formative assessment, Summative assessment, Achievement test, Diagnostic test, Remedial teaching.
- **Topics**: one per guide section, Topic 7.k teaching guide section 7.k (7.1-7.5).
- **Assessment blueprint**: formative 15 items, 3 per topic (`D-2026-0072`, extended to 5-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Create item asking the learner to build a table of specification and five items for a short Grade 6 science unit. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U7-01 | 7.1 (`:791`) | 7.1 | Meaning and purpose of evaluation |
| U7-02 | 7.2 (`:792`) | 7.2 | Formative and summative assessment |
| U7-03 | 7.3 (`:793`) | 7.3 | Tools and techniques of assessment (including practical and performance assessment) |
| U7-04 | 7.4 (`:794`) | 7.4 | Achievement tests in science |
| U7-05 | 7.5 (`:795`) | 7.5 | Diagnostic testing |
| U7-06 | 7.5 (`:795`) | 7.5 | Remedial teaching |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 7.1 | Meaning and purpose of evaluation | U7-01 | 6-9 | fig-U7-1: concept-map, fig-U7-2: table |
| 7.2 | Formative and summative assessment | U7-02 | 6-9 | fig-U7-3: table, fig-U7-4: flowchart |
| 7.3 | Tools and techniques of assessment | U7-03 | 6-9 | fig-U7-5: table, fig-U7-6: diagram |
| 7.4 | Achievement tests in science | U7-04 | 6-9 | fig-U7-7: flowchart, fig-U7-8: table |
| 7.5 | Diagnostic and remedial teaching | U7-05, U7-06 | 6-9 | fig-U7-9: flowchart, fig-U7-10: table |

**Depth budget**: 6 sub-topics; 5 topics; 42-61 reading-min.

**Prerequisite knowledge**: Unit 5; `EFMP-408` Educational Assessment and Evaluation (this semester), which this unit applies to science rather than repeats.

**Common misconceptions**: "assessment means the end-of-term exam"; "remedial teaching means repeating the same lesson more slowly"; "practical skills cannot be assessed fairly".

**Mapped readings**: ncp-science-2022, dcar-science-4-8, bscs-2006-5e, aggarwal-science.

**Figure plan**:
  - fig-U7-1 - `concept-map` - purposes of evaluation in science: placement, feedback, grading, improvement (Topic 7.1)
  - fig-U7-2 - `table` - measurement, assessment and evaluation distinguished (Topic 7.1)
  - fig-U7-3 - `table` - formative and summative compared with science examples (Topic 7.2)
  - fig-U7-4 - `flowchart` - a formative loop: teach, check, feedback, adjust (Topic 7.2)
  - fig-U7-5 - `table` - tools (tests, practical tasks, observation, rubrics, portfolios) and what each measures (Topic 7.3)
  - fig-U7-6 - `diagram` - a practical-skills rubric with four criteria (Topic 7.3)
  - fig-U7-7 - `flowchart` - constructing an achievement test: objectives, table of specification, items, review, try-out (the unit's required schematic) (Topic 7.4)
  - fig-U7-8 - `table` - a table of specification for a Grade 7 unit (Topic 7.4)
  - fig-U7-9 - `flowchart` - diagnose, find the misconception, reteach, recheck (Topic 7.5)
  - fig-U7-10 - `table` - common science misconceptions with a remedial activity for each (Topic 7.5)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 8: Professional Growth and Contemporary Issues

Guide Unit 8 (Weeks 15-16, `:797-803`). Unit Spec (G1) for `docs/semester-4/efpg-402/unit-08/`.

- **CLO/SLO refs**: `SLO:EFPG-402-8-1` (describe the science teacher's role in society and the qualities of a good science teacher), `SLO:EFPG-402-8-2` (plan a small action-research cycle; explain environmental education, sustainable development and recent trends in science teaching) - traces to guide objectives 2 and 3.
- **Key terms**: Professional growth, Action research, Environmental education, Sustainable development, STEM.
- **Topics**: one per guide section, Topic 8.k teaching guide section 8.k (8.1-8.5).
- **Assessment blueprint**: formative 15 items, 3 per topic (`D-2026-0072`, extended to 5-topic units as for EFPG-401 under `D-2026-0077`) (Remember/Understand/Apply); summative includes one Create item asking the learner to plan one action-research cycle on a science-classroom problem they observed in school placement. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U8-01 | 8.1 (`:799`) | 8.1 | Role of the science teacher in society |
| U8-02 | 8.2 (`:800`) | 8.2 | Qualities of a good science teacher |
| U8-03 | 8.3 (`:801`) | 8.3 | Action research in science education |
| U8-04 | 8.4 (`:802`) | 8.4 | Environmental education and sustainable development |
| U8-05 | 8.5 (`:803`) | 8.5 | Recent trends and innovations in science teaching |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 8.1 | Role of the science teacher in society | U8-01 | 6-9 | fig-U8-1: concept-map, fig-U8-2: table |
| 8.2 | Qualities of a good science teacher | U8-02 | 6-9 | fig-U8-3: table, fig-U8-4: diagram |
| 8.3 | Action research in science education | U8-03 | 6-9 | fig-U8-5: flowchart, fig-U8-6: table |
| 8.4 | Environmental education and sustainable development | U8-04 | 6-9 | fig-U8-7: concept-map, fig-U8-8: table |
| 8.5 | Recent trends and innovations in science teaching | U8-05 | 6-9 | fig-U8-9: table, fig-U8-10: timeline |

**Depth budget**: 5 sub-topics; 5 topics; 42-61 reading-min.

**Prerequisite knowledge**: Units 1-7.

**Common misconceptions**: "professional growth ends with the degree"; "action research is only for university researchers"; "environmental education is a separate subject".

**Mapped readings**: unesco-2017-esd, ncp-science-2022, sep-scientific-method, yadav-2002.

**Figure plan**:
  - fig-U8-1 - `concept-map` - the science teacher in school and community: health awareness, environment, careers, scientific attitude (Topic 8.1)
  - fig-U8-2 - `table` - community issues a science teacher can address (Topic 8.1)
  - fig-U8-3 - `table` - qualities grouped as knowledge, skills and dispositions (Topic 8.2)
  - fig-U8-4 - `diagram` - a professional-growth plan for a beginning science teacher (Topic 8.2)
  - fig-U8-5 - `flowchart` - the action-research cycle: plan, act, observe, reflect (the unit's required schematic) (Topic 8.3)
  - fig-U8-6 - `table` - a worked action-research plan for a Grade 6 class (Topic 8.3)
  - fig-U8-7 - `concept-map` - SDGs most linked to school science, from unesco-2017-esd (Topic 8.4)
  - fig-U8-8 - `table` - environmental issues in Pakistan with a classroom activity for each (Topic 8.4)
  - fig-U8-9 - `table` - trends (STEM/STEAM, inquiry, digital labs, citizen science) with an example each (Topic 8.5)
  - fig-U8-10 - `timeline` - how science teaching approaches changed over the last century, from a bound source (Topic 8.5)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than two topics go without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Practicum plan

The guide's practicum tasks (`:805-810`) are course-level work done alongside the units and add no checklist rows: lesson plans (after Unit 5), micro- and macro-teaching (after Unit 5, in the school placement of `EFPC-411` School Observation this semester where the timetable allows), teaching aids (after Unit 4), and classroom observation with a reflective journal (linked to `EFPC-411`). Each carries a rubric, not a model response.

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Code.** Guide EFPG-402, Scheme MFPG-402; ruled EFPG-402 by the owner (`D-2026-0093` item 5). The spec moved from `specs/content/mfpg-402/` to `specs/content/efpg-402/`; the licence blueprint and roadmap rows were updated. The intake record in `intake/` predates the ruling and keeps the old code.
2. **One topic per numbered section.** As for `EFPG-401` (`D-2026-0077`), each guide section is a topic, so units have 5-7 short topics and 15-21 formative items (3 per topic). The unit-end bank floors drop to ">= 1 per topic" because 10 MCQs cannot give two to each of seven topics.
3. **"Secondary level".** Objective 2 and section 1.3 say "secondary level", but the programme is B.Ed (Elementary) and its graduates teach Grades 1-8. The spec keeps the guide's wording in the checklist and uses Grade 4-8 General Science (the National Curriculum's science band) for examples. The owner may prefer otherwise.
4. **Indian sources.** Every guide book, journal and website except Khan Academy is Indian; NCERT documents describe India's curriculum. The spec binds Pakistan's National Curriculum 2022-23 and the Sindh DCAR curriculum for curriculum content and leaves the NCERT items unbound. Four of the six books could not be found in Open Library and are title-level only.
5. **Overlaps.** Unit 7 overlaps `EFMP-408` (this semester) and Unit 5's objectives overlap it too; Units 3 and 5 overlap general methods in `EFPG-401`. Each unit applies the shared ideas to science teaching and links rather than repeats.
6. **Laboratory safety source.** `cpsc-niosh-2006` is a US guide; units use its general practice (storage, labelling, first aid) and do not present US regulations as Pakistani law.
7. **`D-2026-0053` item 2 in Semester 4.** That ruling (author-selected readings and the open-access floor) was made for Semester 2 and accepted for Semester 3 under `D-2026-0080`; whether it extends to Semester 4 is the same question again.
