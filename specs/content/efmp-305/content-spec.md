---
course_code: EFMP-305
status: approved
# D-2026-0053 item 2: every unit binds at least one registry-verified open-access
# source, in the mapping form `check:source-floor` reads (a bare integer is not
# enforced).
open_access_floor:
  default: 1
---

# EFMP-305 - Inclusive Education - Content Spec

Semester 2, Major: Professional, 3 (3-0) theory. Source: `Scheme-and-Course-guides/2nd 2026.pdf`
(extracted text, `extracted-text/2nd 2026.txt` lines 189-362).

**Status is `draft`, deliberately.** Under Constitution Art. VII.8 this spec is submitted to an
intake evaluator for G0/G1, which is what sets `status: approved`. No unit may be authored until
that happens (Spec 006 FR-002).

**Credit hours (D-2026-0053 item 3)**: the guide states `03 (0-3)` (line 196); the revised
Scheme and `catalog/courses.json` give `3 (3-0)`. The owner ruled `3 (3-0)`, theory, and treats
the guide's split as a guide-side slip.

**Guide-silence note (Constitution Art. III.6)**: this course's guide block carries a Course
Description, five Course Outcomes, the six-unit topic list with a week-by-week schedule, a
"Teaching-Learning Framework" paragraph, a "Class Participation" paragraph and an "Assessment
Criteria" table. It carries **no** "Text Books and References" list, no "Suggested Practical
Activities", and no separate "Teaching/Instructional Strategies" section beyond the framework
paragraph. Unlike EFMP-302 and EFMP-304, whose guides do carry a reading list, this guide is
silent on readings; that silence is resolved by `D-2026-0053` item 2 (author-selected verified
readings, labelled as such). Suggested activities and detailed teaching strategies remain
guide-silent, and nothing is invented in their place.

## Course-wide items

- **Course Learning Outcomes** (guide lines 211-221, paraphrased for the spec record only, never
  reproduced into learner-facing content):
  1. Understand the concept and need for inclusive education.
  2. Identify and support diverse learners in classrooms.
  3. Apply inclusive teaching strategies and classroom adaptations.
  4. Understand Pakistan's policies on inclusive education.
  5. Promote equality, empathy, and collaboration in schools.
- **Teaching strategies**: the guide names lecture, group discussions and "lots of practice"
  as the instructional format, with active participation, quizzes and additional reading
  materials. No further strategies are listed (guide-silent).
- **Assessment criteria**: the guide **does** give a course-specific weighting (lines 312-345),
  so the Constitution Art. III.7 default of 60/40 does **not** apply here:

  | Component | Marks |
  |---|---|
  | Mid-Term | 30 |
  | Final-Term | 50 |
  | Assignment/Presentation/Sessional | 10 |
  | Attendance | 10 |
  | **Total** | **100** |

  **Owner ruling (D-2026-0053 item 6): the course assessment split is 40 formative / 60
  summative.** This is the binding classification and replaces the earlier 80/20 reading.
- **Practical work**: none listed in the guide (guide-silent). The "lots of practice" in the
  framework paragraph refers to active participation in lectures and discussions, not a
  assessed practical component, and is not recorded as such.
- **Class Participation** (guide lines 306-310): the guide encourages questions and
  discussion during class and notes that students will get more from classroom discussions.
  This is guide-silent on *assessed* practical work, not on participation expectations.
- **Recommended resources**: the guide lists no "Text Books and References" section
  (guide-silent). Readings are author-selected under `D-2026-0053` item 2; see
  `## Reading list` and each unit's `**Mapped readings**` line.

## Course Description

The guide describes inclusive education as a movement that began with integrating children with
disabilities into regular schools, evolving from segregation to inclusion, and later expanding to
embrace all learners regardless of ability, background or difference. The course is aimed at
prospective teachers and builds their capability to ensure equal learning opportunities, respect
diversity, and create classrooms where every student can succeed. It matters for teachers because
it addresses diverse learning needs, promotes equality, and builds empathy, adaptability and
effective teaching practices.

Two consequences for authoring, both load-bearing:

1. **Units 1 and 2 are the conceptual foundation**: what inclusion is, why it matters, and who
   the diverse learners are. These units establish the vocabulary and the moral and practical
   argument for inclusion. Prose must be precise about definitions (impairment vs disability
   vs handicap, integration vs inclusion, equity vs equality) without becoming a terminology
   exercise.
2. **Units 3 to 6 are the practice and policy core**: teaching strategies, classroom
   environment, legal frameworks and collaboration. Every example and scenario in these units
   must be grounded in the Pakistani public and private school context, with attention to
   resource constraints common in Sindh and beyond.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s)
each source supports. Cited by reference only, never reproduced (Constitution Art. III.5).

### Guide-required

**Empty.** The guide lists no "Text Books and References" section (guide-silent). No reading on
this course is guide-required.

### Curated-supplementary (open access)

Author-selected under `D-2026-0053` item 2, chosen for relevance to the course outcomes; **none
is guide-required**. Each URL and DOI below was opened on 2026-10-10 and the document checked
against the citation; `Verification` records how.

| Key | Citation | DOI/URL | Units | Verification and note |
|---|---|---|---|---|
| unesco2020 | UNESCO. (2020). *Global education monitoring report 2020: Inclusion and education: All means all*. UNESCO. | https://doi.org/10.54676/JJNK6989 (landing page https://www.unesco.org/gem-report/en/publication/inclusion-and-education) | 1, 2, 5 | Crossref 2026-10-10 (DOI resolves to the UNESCO record). Free to read from UNESCO, but Unpaywall and OpenAlex list no open licence, so it is **not counted** toward the open-access floor. Course-wide framing |
| unCRPD | United Nations. (2006). *Convention on the Rights of Persons with Disabilities*, Article 24 (Education). | https://social.desa.un.org/issues/disability/crpd/article-24-education | 1, 5 | UN DESA page, HTTP 200, Article 24 text checked. Public instrument, no registry record. The international rights basis for inclusive education |
| ainscow2020 | Ainscow, M. (2020). Inclusion and equity in education: Making sense of global challenges. *Prospects, 49*(3-4), 123-134. | https://doi.org/10.1007/s11125-020-09506-w | 1, 6 | Crossref and OpenAlex 2026-10-10; CC BY 4.0 (hybrid open access). Principles of inclusion and equity |
| ainscow2020b | Ainscow, M. (2020). Promoting inclusion and equity in education: Lessons from international experiences. *Nordic Journal of Studies in Educational Policy, 6*, 7-16. | https://doi.org/10.1080/20020317.2020.1729587 | 5, 6 | Crossref and OpenAlex 2026-10-10; CC BY-NC 4.0 (diamond open access). Policy-to-practice and collaboration at school and system level |
| florian2014 | Florian, L. (2014). What counts as evidence of inclusive education? *European Journal of Special Needs Education, 29*(3), 286-294. | https://doi.org/10.1080/08856257.2014.933551 | 2, 3 | Crossref and OpenAlex 2026-10-10; green open access (University of Edinburgh repository copy). Inclusive pedagogy for all learners |
| who2011 | World Health Organization & World Bank. (2011). *World report on disability*. WHO. | https://www.who.int/publications/i/item/9789241564182 | 2, 4 | WHO publication page, HTTP 200, title and date checked; free download. Disability as interaction of impairment and environment; assistive technology |
| cast2024 | CAST. (2024). *Universal Design for Learning Guidelines version 3.0*. | https://udlguidelines.cast.org/ | 3, 4 | CAST site, HTTP 200; citation follows the site's own suggested citation. UDL principles |
| unicef2014 | Meresman, S. (2014). *Parents, family and community participation in inclusive education* (Webinar 13, companion technical booklet). UNICEF. | https://www.unicef.org/northmacedonia/media/4161/file/MK_ParentsCommunityIE_Report_ENG.pdf | 6 | UNICEF-hosted PDF, HTTP 200, cover and author page checked. Parent and community partnership |
| nep2009 | Ministry of Education, Government of Pakistan. (2009). *National Education Policy 2009* (revised 1 August 2009). | https://neqmap.bangkok.unesco.org/wp-content/uploads/2019/08/National-Education-Policy-Pakistan.pdf | 5 | UNESCO NEQMAP-hosted PDF, HTTP 200, title page and inclusive-education policy actions checked. Government document, no registry record |
| sindh2018 | Provincial Assembly of Sindh. (2018). *Sindh Empowerment of 'Persons with Disabilities' Act, 2018* (Sindh Act No. XLVIII of 2018). | https://depd.sindh.gov.pk/sindh-empowerment-of-persons-with-disabilities-act-2018 | 1, 5 | Government of Sindh, Department of Empowerment of Persons with Disabilities, HTTP 200; short title, notification of 11 June 2018 and s. 9 "Equity in education" checked. **The guide's "Rights of Persons with Disabilities Act (2018)" is taught as this Act (`D-2026-0053` item 7).** Bound in `sources/unit-01.md` under the legacy key `rpwd2018` |
| ict2020 | Government of Pakistan. (2020). *ICT Rights of Persons with Disability Act, 2020* (Act No. XXXV of 2020). *Gazette of Pakistan*. | https://lpr.adb.org/sites/default/files/2024-07/pakistan-ict-rights-of-persons-with-disability-act-2020.pdf | 5 | Gazette text hosted by the ADB Law and Policy Reform portal, HTTP 200; short title, assent of 22 September 2020, extent (Islamabad Capital Territory only) and s. 9 "Equity in education" checked. Note the gazetted short title says "Disability", singular. Used only for the short federal comparison in Unit 5 |

### Open-access floor

Declared in front matter as the mapping `open_access_floor:` / `  default: 1`, the form
`check:source-floor` enforces (`D-2026-0053` item 2). A source counts toward the floor only when
its row in `sources/unit-NN.md` names the registry consulted (Crossref, OpenAlex, ERIC, DOAJ)
and the ISO date of verification. Statutes, the UN Convention and the NEP have no registry
record; they are verified by URL as recorded above but do not count toward the floor.

### Per-unit binding floor

Every unit MUST bind at least one registry-verified open-access source (the floor); the targets
below are what each unit SHOULD bind and name the curated rows that meet them.

- Unit 1: inclusive education concepts and principles. Floor met by `ainscow2020`; also
  `unesco2020`, `unCRPD`.
- Unit 2: learner diversity categories and identification. Floor met by `florian2014`; also
  `who2011`, `unesco2020`.
- Unit 3: differentiated instruction, cooperative learning or flexible assessment. Floor:
  `florian2014`; also `cast2024`.
- Unit 4: inclusive classroom environment, accessibility or UDL. Floor: a registry-verified
  source bound at G2 (none of `cast2024`, `who2011` has a registry record); escalate to
  `specs/gaps.md` if none is found.
- Unit 5: the Sindh Empowerment of Persons with Disabilities Act, 2018, the National Education
  Policy 2009, and the federal comparison. Floor: `ainscow2020b`; statutes `sindh2018`,
  `ict2020`, `nep2009` are primary texts.
- Unit 6: parental involvement or collaboration with special educators. Floor: `ainscow2020`
  or `ainscow2020b`; also `unicef2014`.

All registry checks are recorded in `sources/unit-NN.md` with the registry and date of
verification. If a unit cannot meet its floor, that is an escalation to `specs/gaps.md`, not a
reason to fabricate a reference.

## Week schedule

**Guide-given** (the guide carries a week-by-week schedule, unlike EFMP-304). A 16-week term,
distributed 2/2/3/2/4/3 across Units 1 to 6.

| Week(s) | Unit | Sub-topics |
|---|---|---|
| 1-2 | Unit 1 - Foundations of Inclusive Education | Meaning and concept of inclusive education; Principles of inclusion; Importance of inclusive education in Pakistan |
| 3-4 | Unit 2 - Understanding Learner Diversity | Types of learner diversity (disabilities, learning difficulties, social differences); Identifying individual student needs; Promoting respect for diversity in the classroom |
| 5-7 | Unit 3 - Inclusive Teaching Strategies | Differentiated instruction; Cooperative learning; Flexible assessment methods |
| 8-9 | Unit 4 - Creating an Inclusive Classroom Environment | Classroom management for inclusion; Accessibility and classroom arrangement; Use of teaching aids and assistive tools |
| 10-13 | Unit 5 - Policies and Legal Framework in Pakistan | National Education Policy (inclusive education aspects); Rights of Persons with Disabilities Act (2018); School responsibilities under legal requirements; Teacher's role and attitude |
| 14-16 | Unit 6 - Collaboration and Parental Involvement | Building empathy and supportive classroom culture; Working with parents and collaboration with special educators; Challenges and solutions |

**Unit 6 week note:** the guide's Unit 6 header says "(2 Weeks)" but lists Weeks 14, 15 and 16 (three weeks). Under D-2026-0047 this is treated as a within-guide slip; Unit 6 is three weeks.

**Unit 5 statute note (D-2026-0053 item 7):** the Week 10-13 row above is the guide's own text.
The guide's "Rights of Persons with Disabilities Act (2018)" (line 282) does not name one enacted
statute; the owner ruled that it is taught as the **Sindh Empowerment of Persons with
Disabilities Act, 2018**, with a short comparison to the federal **ICT Rights of Persons with
Disability Act, 2020**.

## Standards & frameworks anchors

- **UNCRPD Article 24** (2006) is the international rights anchor for inclusive education and
  underpins Unit 5's policy discussion. Author-selected.
- **Sindh Empowerment of Persons with Disabilities Act, 2018** (Sindh Act No. XLVIII of 2018) is
  the law in force for Sindh teachers and the spine of Unit 5. The guide names a "Rights of
  Persons with Disabilities Act (2018)" (line 282); by owner ruling `D-2026-0053` item 7 that
  entry is taught as this Sindh Act.
- **ICT Rights of Persons with Disability Act, 2020** (Act No. XXXV of 2020) is the federal
  statute, extending to the Islamabad Capital Territory only. Unit 5 uses it for a short
  comparison, not as the primary framework (`D-2026-0053` item 7).
- **National Education Policy of Pakistan (2009)** provides the national policy language on
  inclusive education and special needs; used in Unit 5. The guide names the "National
  Education Policy" (line 280) without an edition; the 2009 edition is author-selected.
- **No external teaching standards framework** is named by this guide (unlike EFMP-302 which
  names NACTE). Nothing is substituted in their place.

## Course review plan

Seeds an eventual `docs/semester-2/efmp-305/course-review.mdx` (Spec 008 FR-016; contract:
`specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md`). Not parsed by any gate.

- **Course summary points** (the through-lines the review should recap):
  - Inclusive education is a movement from segregation to full participation of all learners,
    not only those with disabilities (Unit 1).
  - Learner diversity includes disability, learning difficulty, and social difference; teachers
    must identify individual needs without labelling (Unit 2).
  - Differentiated instruction, cooperative learning and flexible assessment are the three
    practical strategies for inclusive teaching (Unit 3).
  - An inclusive classroom is physically accessible, well-managed and equipped with appropriate
    aids (Unit 4).
  - Pakistan's legal framework (NEP 2009; for Sindh, the Sindh Empowerment of Persons with
    Disabilities Act, 2018) places specific responsibilities on schools and teachers (Unit 5).
  - Inclusion succeeds through collaboration: with parents, special educators and the wider
    school community (Unit 6).
- **Practice-question mix**: `### MCQs` ~15 (all six units, Remember to Apply); `### RRQs` ~10
  (Understand to Analyze, >= 1 per unit); `### ERQs` ~5 (Analyze to Evaluate/Create, each
  integrating two or more units).
- **Practicum project ideas** (briefs a trainee carries into placement):
  - *Inclusion audit* - observe one placement classroom for a week against the
    segregation-integration-inclusion spectrum (Unit 1) and the barrier-free features of Unit 4;
    bring back a one-page audit with three priority changes.
  - *Learner profile without labels* - with the class teacher's permission, build an anonymised
    needs profile of one learner from observation (Unit 2); bring back the profile and the
    adjustments it suggests.
  - *Differentiated lesson* - plan and teach one lesson using tiered tasks, one cooperative
    structure and one flexible assessment option (Unit 3); bring back the plan, learner work
    samples and a short reflection.
  - *School compliance check* - check the placement school's admission, accessibility and
    accommodation practice against s. 9 of the Sindh Empowerment of Persons with Disabilities
    Act, 2018 (Unit 5); bring back a gap list with one teacher-level action per gap.
  - *Parent communication plan* - draft a home-school communication plan for a learner with
    additional needs, in Urdu or Sindhi as appropriate (Unit 6); bring back the plan and any
    feedback from the class teacher.

## Unit 1: Foundations of Inclusive Education

Weeks 1-2. Unit Spec (G1) for `docs/semester-2/efmp-305/unit-01/`.

- **CLO/SLO refs**: `SLO:EFMP-305-1-1` (concept and meaning of inclusive education),
  `SLO:EFMP-305-1-2` (principles of inclusion and its importance in Pakistan) - traces to guide
  CLOs 1 and 5.
- **Key terms**: Inclusive education, Segregation, Integration, Equity, Equality, Diversity,
  Special educational needs, Mainstreaming.
- **Topics** (from guide Weeks 1-2): meaning and concept of inclusive education; principles of
  inclusion; importance of inclusive education in Pakistan.

### Sub-topic checklist

`Guide ref` is the guide week the row decomposes; a row marked `derived` has no guide ancestor
and names the outcome it derives from (`D-2026-0053` item 4).

| ID | Guide ref | Topic | Sub-topic | Target Bloom |
|---|---|---|---|---|
| U1-1 | Week 1 | 1.1 | Meaning and concept of inclusive education | Understand |
| U1-2 | Week 1 (course description) | 1.1 | Segregation, integration and inclusion distinguished | Analyze |
| U1-3 | Week 2 | 1.2 | Principles of inclusion | Understand |
| U1-4 | Week 2 | 1.2 | Importance of inclusive education in Pakistan | Evaluate |
| U1-5 | derived (CLO 1) | 1.2 | Common misconceptions about inclusion | Analyze |

**Added-row derivations (per D-2026-0053):** U1-5 derives from CLO 1 (understanding the concept of inclusive education includes addressing common misconceptions).

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 1.1 | Meaning, concept and the inclusion spectrum | U1-1, U1-2 | 15-20 | fig-U1-1: concept-map, fig-U1-2: table |
| 1.2 | Principles and the case for inclusion in Pakistan | U1-3, U1-4, U1-5 | 13-18 | fig-U1-3: concept-map, fig-U1-4: diagram |

### Depth budget

**Depth budget**: 5 sub-topics; 2 topics; 55-70 reading-min (A-B band). This is the
shortest unit by topic count; the two topics are concept-dense rather than content-heavy,
so the reading minutes are lower than the course average while the Bloom demand is
moderate to high.

**Prerequisite knowledge**: none beyond HSC-level general study skills. This is the opening unit;
no prior study of special education or disability is assumed.

**Common misconceptions**: "inclusive education is only about children with disabilities";
"integration and inclusion are the same thing"; "inclusion means placing every child in the same
room with no change to teaching"; "inclusion lowers standards for other learners"; "equality and
equity mean the same".

**Mapped readings**: unesco2020 (U1-1, U1-2), unCRPD (U1-4), ainscow2020 (U1-3, U1-5),
sindh2018 (U1-4; legacy key `rpwd2018` in `sources/unit-01.md`); unit-bound sources
`miles2010`, `hehir2016` per `sources/unit-01.md`. All author-selected.

**Worked-examples plan** (one Pakistan-grounded example per sub-topic group): the inclusion
spectrum - the same visually impaired child placed in a special school, a "special class" in a
mainstream school, and a fully included Grade 4 class in Hyderabad (U1-1, U1-2); principles and
importance - a government primary school head deciding whether to admit a child who uses a
wheelchair, worked against the principles of inclusion (U1-3, U1-4); misconceptions - a
staffroom claim that "inclusion pulls the class down", tested against evidence (U1-5).

**International best-practice notes**: present inclusion as a process of removing barriers to
presence, participation and achievement for all learners, the framing of the 2020 GEM Report and
Ainscow (2020), rather than as a placement decision. Keep the rights basis (UNCRPD Article 24)
distinct from the pedagogical case, so trainees can argue both.

### Figure plan

- `fig-U1-1`: concept-map - the segregation-integration-inclusion spectrum with key features
  of each (Topic 1.1)
- `fig-U1-2`: table - comparing segregation, integration and inclusion across criteria
  (Topic 1.1)
- `fig-U1-3`: concept-map - the principles of inclusion mapped to classroom practice
  (Topic 1.2)
- `fig-U1-4`: diagram - the cycle of exclusion and how inclusion breaks it, grounded in a
  Pakistani school scenario (Topic 1.2)

### Unit-end assessment blueprint

10 MCQ (Remember to Apply, spread across all topics), 10 RRQ (Understand to Analyze),
5 ERQ (Analyze to Evaluate, each drawing on both topics). Every item Bloom-tagged.

## Unit 2: Understanding Learner Diversity

Weeks 3-4. Unit Spec (G1) for `docs/semester-2/efmp-305/unit-02/`.

- **CLO/SLO refs**: `SLO:EFMP-305-2-1` (types of learner diversity),
  `SLO:EFMP-305-2-2` (identifying individual needs; promoting respect for diversity) - traces
  to guide CLOs 2 and 5.
- **Key terms**: Learner diversity, Impairment, Disability, Handicap, Learning difficulty,
  Social difference, Individual educational needs, Labelling, Stigma.
- **Topics** (from guide Weeks 3-4): types of learner diversity (disabilities, learning
  difficulties, social differences); identifying individual student needs; promoting respect for
  diversity in the classroom.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic | Target Bloom |
|---|---|---|---|---|
| U2-1 | Week 3 | 2.1 | Types of learner diversity: sensory, physical, intellectual disabilities | Remember |
| U2-2 | Week 3 | 2.1 | Learning difficulties (dyslexia, dyscalculia, ADHD) | Understand |
| U2-3 | Week 3 | 2.1 | Social differences (gender, ethnicity, poverty, language) | Understand |
| U2-4 | Week 4 | 2.2 | Identifying individual student needs through observation and assessment | Apply |
| U2-5 | Week 4 | 2.2 | Promoting respect for diversity; avoiding stigma and labelling | Evaluate |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 2.1 | The many faces of learner diversity | U2-1, U2-2, U2-3 | 14-18 | fig-U2-1: concept-map, fig-U2-2: table |
| 2.2 | Identifying needs and building respect | U2-4, U2-5 | 13-17 | fig-U2-3: flowchart, fig-U2-4: diagram |

### Depth budget

**Depth budget**: 5 sub-topics; 2 topics; 40-55 reading-min (A-B band).

**Prerequisite knowledge**: Unit 1 (the meaning of inclusion, equity vs equality).

**Common misconceptions**: "disability and impairment are the same"; "a learning difficulty means
low intelligence"; "diversity means disability only"; "identifying a need means giving a
learner a label"; "treating every child the same is fair".

**Mapped readings**: unesco2020 (U2-1, U2-3), florian2014 (U2-5), who2011 (U2-1; author-selected
target, to be bound at G2); unit-bound source `westwood2018` per `sources/unit-02.md`. All
author-selected.

**Worked-examples plan**: categories of diversity - one Grade 5 class in rural Sindh profiled
by disability, learning difficulty and social difference (U2-1 to U2-3); identification - a
teacher's observation log for a child who avoids reading aloud (U2-4); respect - rewriting a
classroom conversation that labels a child "slow" (U2-5).

**International best-practice notes**: use the WHO/World Bank framing of disability as the
interaction between impairment and environment, which moves the teacher's question from "what
is wrong with the child" to "what barrier can I remove". Identification is for planning support,
not for sorting learners (Florian, 2014).

### Figure plan

- `fig-U2-1`: concept-map - the categories of learner diversity (disability, learning difficulty,
  social difference) with examples (Topic 2.1)
- `fig-U2-2`: table - common disabilities and their classroom implications (Topic 2.1)
- `fig-U2-3`: flowchart - a teacher's decision path for identifying and responding to a learner's
  individual needs (Topic 2.2)
- `fig-U2-4`: diagram - the labelling cycle and how respect breaks it (Topic 2.2)

### Unit-end assessment blueprint

10 MCQ / 10 RRQ / 5 ERQ. Every item Bloom-tagged.

## Unit 3: Inclusive Teaching Strategies

Weeks 5-7. Unit Spec (G1) for `docs/semester-2/efmp-305/unit-03/`.

- **CLO/SLO refs**: `SLO:EFMP-305-3-1` (differentiated instruction),
  `SLO:EFMP-305-3-2` (cooperative learning), `SLO:EFMP-305-3-3` (flexible assessment) -
  traces to guide CLO 3.
- **Key terms**: Differentiated instruction, Cooperative learning, Flexible assessment,
  Scaffolding, Tiered activities, Peer support, Formative assessment, Accommodation,
  Modification, Universal Design for Learning (UDL).
- **Topics** (from guide Weeks 5-7): differentiated instruction; cooperative learning; flexible
  assessment methods.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic | Target Bloom |
|---|---|---|---|---|
| U3-1 | Week 5 | 3.1 | What differentiated instruction is and why it matters for inclusion | Understand |
| U3-2 | Week 5 | 3.1 | Differentiating content, process and product | Apply |
| U3-3 | Week 6 | 3.2 | Cooperative learning: structures and their inclusive value | Understand |
| U3-4 | Week 7 | 3.2 | Flexible assessment: accommodations and alternatives to standard testing | Apply |
| U3-5 | derived (CLO 3) | 3.3 | Putting the three strategies together in one lesson | Create |

**Added-row derivation (per D-2026-0053):** U3-5 derives from CLO 3 (apply inclusive teaching strategies): combining the three strategies into one lesson is the highest form of application.

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 3.1 | Differentiating for every learner | U3-1, U3-2 | 45-55 | fig-U3-1: flowchart, fig-U3-2: table |
| 3.2 | Cooperative learning and flexible assessment | U3-3, U3-4 | 45-55 | fig-U3-3: concept-map, fig-U3-4: table |
| 3.3 | Planning an inclusive lesson | U3-5 | 40-50 | fig-U3-5: flowchart, fig-U3-6: table |

### Depth budget

**Depth budget**: 5 sub-topics; 3 topics; 150-180 reading-min (A-B band). Most practice-dense unit.

**Prerequisite knowledge**: Units 1 and 2 (the principles of inclusion; the range of learner
needs a teacher must plan for).

**Common misconceptions**: "differentiation means writing a separate lesson for every child";
"group work and cooperative learning are the same"; "accommodations give some learners an unfair
advantage"; "flexible assessment means easier assessment"; "UDL is only about technology".

**Mapped readings**: cast2024 (U3-1, U3-2, U3-5), florian2014 (U3-1, U3-3); further
open-access sources on cooperative learning and assessment accommodations bound at G2. All
author-selected.

**Worked-examples plan**: differentiation - one Grade 6 science lesson on plants tiered three
ways for a class of 50 (U3-1, U3-2); cooperative learning - a think-pair-share and a jigsaw run
in a crowded classroom with fixed benches (U3-3); flexible assessment - an oral alternative to a
written test for a learner with dysgraphia, with the marking criteria unchanged (U3-4); the
integrated lesson - one complete lesson plan annotated for all three strategies (U3-5).

**International best-practice notes**: plan for the range of learners from the start (the UDL
principle of multiple means of engagement, representation and action/expression, CAST 2024)
rather than retrofitting adaptations for individuals. Distinguish accommodation (same standard,
different access) from modification (different standard).

### Figure plan

- `fig-U3-1`: flowchart - the differentiated instruction decision process (content / process /
  product) (Topic 3.1)
- `fig-U3-2`: table - examples of differentiation for different learner profiles (Topic 3.1)
- `fig-U3-3`: concept-map - cooperative learning structures and their inclusive benefits
  (Topic 3.2)
- `fig-U3-4`: table - assessment accommodations matched to learner needs (Topic 3.2)
- `fig-U3-5`: flowchart - the inclusive lesson planning cycle integrating all three strategies
   (Topic 3.3)
- `fig-U3-6`: table - a lesson plan template showing where differentiation, cooperative learning
   and flexible assessment appear in a single lesson (Topic 3.3)

### Unit-end assessment blueprint

10 MCQ / 10 RRQ / 5 ERQ. Every item Bloom-tagged.

## Unit 4: Creating an Inclusive Classroom Environment

Weeks 8-9. Unit Spec (G1) for `docs/semester-2/efmp-305/unit-04/`.

- **CLO/SLO refs**: `SLO:EFMP-305-4-1` (classroom management for inclusion),
  `SLO:EFMP-305-4-2` (accessibility and classroom arrangement),
  `SLO:EFMP-305-4-3` (teaching aids and assistive tools) - traces to guide CLOs 2 and 3.
- **Key terms**: Inclusive classroom, Classroom arrangement, Accessibility, Assistive technology,
  Teaching aids, Learning corners, Barrier-free environment, Positive behaviour support.
- **Topics** (from guide Weeks 8-9): classroom management for inclusion; accessibility and
  classroom arrangement; use of teaching aids and assistive tools.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic | Target Bloom |
|---|---|---|---|---|
| U4-1 | Week 8 | 4.1 | Classroom management practices that support inclusion | Understand |
| U4-2 | Week 8 | 4.2 | Physical accessibility: seating, movement, safety | Apply |
| U4-3 | Week 9 | 4.2 | Teaching aids for diverse learners | Apply |
| U4-4 | Week 9 | 4.2 | Low-cost and no-cost assistive solutions for Pakistani schools | Create |
| U4-5 | Week 8 | 4.1 | Arranging the classroom for participation | Apply |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 4.1 | Managing an inclusive classroom | U4-1, U4-5 | 45-55 | fig-U4-1: concept-map, fig-U4-2: table |
| 4.2 | Accessibility, aids and arrangement | U4-2, U4-3, U4-4 | 55-70 | fig-U4-3: diagram, fig-U4-4: table |

### Depth budget

**Depth budget**: 5 sub-topics; 2 topics; 120-150 reading-min (A-B band).

**Prerequisite knowledge**: Unit 2 (learner needs) and Unit 3 (UDL and differentiation, which
the environment must support).

**Common misconceptions**: "classroom management means keeping everyone quiet"; "accessibility
is only about ramps"; "assistive technology is always expensive and electronic"; "seating the
child with a disability at the front is always the right answer".

**Mapped readings**: who2011 (U4-3, U4-4; assistive technology), cast2024 (U4-1, U4-5); a
registry-verified open-access source on inclusive classroom environments is to be bound at G2
to meet the floor. All author-selected.

**Worked-examples plan**: management - a positive-behaviour routine for a Grade 3 class of 60
(U4-1); arrangement and accessibility - redesigning one government school classroom with fixed
desks for a learner who uses crutches (U4-2, U4-5); aids - a tactile number line and enlarged
print made from local materials (U4-3, U4-4).

**International best-practice notes**: treat the environment as part of the pedagogy, not a
backdrop; WHO/World Bank (2011) present appropriate assistive products as a precondition for
participation, and simple low-cost products are within reach of most schools.

### Figure plan

- `fig-U4-1`: concept-map - the elements of an inclusive classroom environment (Topic 4.1)
- `fig-U4-2`: table - classroom management strategies for inclusion matched to common challenges
  (Topic 4.1)
- `fig-U4-3`: diagram - an inclusive classroom layout showing accessible seating, learning
  corners and movement paths (Topic 4.2)
- `fig-U4-4`: table - teaching aids and assistive tools matched to learner needs, with cost
   indicators (Topic 4.2)

### Unit-end assessment blueprint

10 MCQ / 10 RRQ / 5 ERQ. Every item Bloom-tagged.

## Unit 5: Policies and Legal Framework in Pakistan

Weeks 10-13. Unit Spec (G1) for `docs/semester-2/efmp-305/unit-05/`.

- **CLO/SLO refs**: `SLO:EFMP-305-5-1` (National Education Policy and inclusive education),
  `SLO:EFMP-305-5-2` (the Sindh Empowerment of Persons with Disabilities Act, 2018, taught as the
  guide's 2018 Act, with a short comparison to the federal ICT Rights of Persons with Disability
  Act, 2020),
  `SLO:EFMP-305-5-3` (school responsibilities under legal requirements),
  `SLO:EFMP-305-5-4` (teacher's role and attitude toward inclusion) - traces to guide CLOs 4
  and 5.
- **Key terms**: National Education Policy (NEP), Sindh Empowerment of Persons with Disabilities
  Act 2018, ICT Rights of Persons with Disability Act 2020, Provincial and federal law,
  Legal framework, School responsibility, Teacher attitude, Inclusive policy, Disability law,
  Reasonable accommodation, Non-discrimination.
- **Topics** (from guide Weeks 10-13): National Education Policy (inclusive education aspects);
  Rights of Persons with Disabilities Act (2018), taught as the Sindh Act per `D-2026-0053`
  item 7; school responsibilities under legal requirements; teacher's role and attitude.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic | Target Bloom |
|---|---|---|---|---|
| U5-1 | Week 10 | 5.1 | National Education Policy: what it says about inclusive education and special needs | Understand |
| U5-2 | Week 11 | 5.2 | Sindh Empowerment of Persons with Disabilities Act, 2018 (the guide's 2018 Act): purpose and key provisions for education, with a short comparison to the federal ICT Rights of Persons with Disability Act, 2020 | Understand |
| U5-3 | Week 12 | 5.2 | School responsibilities under the Sindh Act: admission without discrimination, accessibility, reasonable accommodation | Apply |
| U5-4 | Week 13 | 5.3 | Teacher's role: developing a positive attitude toward inclusion | Evaluate |
| U5-5 | derived (CLO 4) | 5.3 | From policy to practice: closing the gap | Analyze |

**Added-row derivation (per D-2026-0053):** U5-5 derives from CLO 4 (understand Pakistan's policies on inclusive education): closing the policy-to-practice gap is a core analytical skill for policy understanding.

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 5.1 | Pakistan's inclusive-education policy | U5-1 | 40-50 | fig-U5-1: timeline, fig-U5-2: table |
| 5.2 | The Sindh Act 2018 and school responsibilities | U5-2, U5-3 | 55-65 | fig-U5-3: table, fig-U5-4: concept-map |
| 5.3 | The teacher's attitude and the policy-to-practice gap | U5-4, U5-5 | 45-55 | fig-U5-5: diagram, fig-U5-6: table |

### Depth budget

**Depth budget**: 5 sub-topics; 3 topics; 150-180 reading-min (A-B band). Most content-heavy unit.

**Prerequisite knowledge**: Unit 1 (the rights basis of inclusion, UNCRPD Article 24) and
Unit 4 (accessibility), which Topic 5.2 turns into legal duties.

**Common misconceptions**: "Pakistan has one national disability law that applies everywhere"
(the federal 2020 Act extends to the Islamabad Capital Territory only; Sindh teachers work under
the Sindh Act, 2018); "the law only concerns special schools"; "a policy statement is the same
as a legal duty"; "inclusion is the government's job, not the teacher's".

**Mapped readings**: nep2009 (U5-1), sindh2018 (U5-2, U5-3), ict2020 (U5-2, comparison only),
unCRPD (U5-2), ainscow2020b (U5-5), unesco2020 (U5-1, U5-5); a registry-verified open-access
study of teacher attitudes in Pakistan to be bound at G2 for U5-4. All author-selected.

**Worked-examples plan**: policy - NEP 2009's inclusive-education policy actions read against
one Sindh government school's practice (U5-1); the Sindh Act - a parent seeking admission for a
deaf child, worked through s. 9 duties, then the same case asked again under the ICT Act, 2020
for an Islamabad school (U5-2); school responsibilities - a head teacher's checklist for
admission, building access and reasonable accommodation (U5-3); attitude and the gap - a
teacher who agrees with inclusion in principle but resists it in a class of 70 (U5-4, U5-5).

**International best-practice notes**: teach the statute as duties a school can check itself
against, not as a list of sections to memorise. Keep the provincial/federal distinction
explicit and the federal comparison short, as the owner ruling requires. Ainscow (2020) frames
the policy-to-practice gap as a matter of school culture and collaboration as well as resources.

### Figure plan

- `fig-U5-1`: timeline - Pakistan's disability and inclusive-education milestones: the Disabled
   Persons (Employment and Rehabilitation) Ordinance, 1981; UNCRPD (2006); NEP 2009; the Sindh
   Empowerment of Persons with Disabilities Act, 2018; the federal ICT Rights of Persons with
   Disability Act, 2020 (Topic 5.1)
- `fig-U5-2`: table - comparing the NEP 2009 inclusive-education provisions with the education
   duties of the Sindh Act, 2018 (s. 9) (Topic 5.1)
- `fig-U5-3`: table - key provisions of the Sindh Empowerment of Persons with Disabilities Act,
   2018 relevant to schools, with a short comparison column for the ICT Act, 2020 (Topic 5.2)
- `fig-U5-4`: concept-map - school responsibilities under the Sindh Act, 2018: admission without
   discrimination, accessible buildings, reasonable accommodation, individual support,
   monitoring progress (Topic 5.2)
- `fig-U5-5`: diagram - the attitude-action cycle: how teacher attitudes shape inclusion outcomes
   (Topic 5.3)
- `fig-U5-6`: table - common policy-to-practice gaps in Pakistani schools and teacher-level
   responses (Topic 5.3)

### Unit-end assessment blueprint

10 MCQ / 10 RRQ / 5 ERQ. Every item Bloom-tagged.

## Unit 6: Collaboration and Parental Involvement

Weeks 14-16. Unit Spec (G1) for `docs/semester-2/efmp-305/unit-06/`.

- **CLO/SLO refs**: `SLO:EFMP-305-6-1` (building empathy and supportive classroom culture),
  `SLO:EFMP-305-6-2` (working with parents and collaboration with special educators),
  `SLO:EFMP-305-6-3` (challenges and practical solutions) - traces to guide CLOs 2, 5 and the
  course description's emphasis on empathy and collaboration.
- **Key terms**: Collaboration, Parental involvement, Special educator, Empathy, Classroom culture,
  Supportive environment, Barrier, Communication, Individualized Education Programme (IEP),
  Multi-disciplinary team.
- **Topics** (from guide Weeks 14-16): building empathy and supportive classroom culture; working
  with parents and collaboration with special educators; challenges and solutions.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic | Target Bloom |
|---|---|---|---|---|
| U6-1 | Week 14 | 6.1 | Empathy and supportive classroom culture: what they look like in practice | Understand |
| U6-2 | Week 15 | 6.2 | Working with parents: communication, trust and partnership | Apply |
| U6-3 | Week 15 | 6.2 | Collaborating with special educators and support staff | Apply |
| U6-4 | Week 16 | 6.3 | Common challenges in Pakistani schools (large classes, limited resources, stigma) | Analyze |
| U6-5 | Week 16 | 6.3 | Practical solutions and strategies to overcome barriers | Create |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 6.1 | Empathy and a supportive classroom culture | U6-1 | 40-50 | fig-U6-1: concept-map, fig-U6-2: table |
| 6.2 | Parents, special educators and the school team | U6-2, U6-3 | 45-55 | fig-U6-3: flowchart, fig-U6-6: table |
| 6.3 | Challenges and practical solutions | U6-4, U6-5 | 45-55 | fig-U6-4: table, fig-U6-5: diagram |

### Depth budget

**Depth budget**: 5 sub-topics; 3 topics; 140-170 reading-min (A-B band).

**Prerequisite knowledge**: Units 1 to 5; this is the closing unit and draws on all of them,
especially Unit 2 (labelling and stigma) and Unit 5 (school responsibilities).

**Common misconceptions**: "parents of children with disabilities do not want to be involved";
"collaboration means handing the child over to the special educator"; "empathy is a personality
trait that cannot be taught"; "large classes make inclusion impossible".

**Mapped readings**: unicef2014 (U6-2), ainscow2020 (U6-3, U6-5), ainscow2020b (U6-4, U6-5); an
open-access source on empathy and classroom culture to be bound at G2 for U6-1. All
author-selected.

**Worked-examples plan**: classroom culture - a buddy system and class charter in a Grade 4
class (U6-1); parents - a first meeting with the mother of a child with a hearing impairment,
held in Sindhi (U6-2); special educators - a shared support plan agreed with a visiting
itinerant teacher (U6-3); challenges and solutions - a school with 80 pupils per class building
a low-cost peer-support scheme (U6-4, U6-5).

**International best-practice notes**: treat parents as partners who hold knowledge about the
child, not as recipients of school decisions (UNICEF, 2014). Collaboration between general and
special educators works best as shared planning, not withdrawal of the child (Ainscow, 2020).

### Figure plan

- `fig-U6-1`: concept-map - the elements of an empathetic, supportive classroom culture
   (Topic 6.1)
- `fig-U6-2`: table - empathy-building activities for Pakistani classrooms with time and
   resource requirements (Topic 6.1)
- `fig-U6-3`: flowchart - the collaboration cycle between teacher, parent and special educator
   (Topic 6.2)
- `fig-U6-6`: table - roles and responsibilities of teacher, parent and special educator in a
   shared support plan, with a communication channel for each (Topic 6.2)
- `fig-U6-4`: table - common inclusion barriers in Pakistani schools and practical solutions
   (Topic 6.3)
- `fig-U6-5`: diagram - a whole-school inclusion model showing all stakeholders (Topic 6.3)

### Unit-end assessment blueprint

10 MCQ / 10 RRQ / 5 ERQ. Every item Bloom-tagged.
