---
course_code: EFMP-409
status: draft
open_access_floor:
  default: 1
---

# EFMP-409 - Foundations of Education - Content Spec

Semester 4, Major: Professional Course IX, 3 (3-0) credit hours. Source: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` lines 410-538 (structure confirmed against `Scheme-and-Course-guides/4TH SEMESTER.docx`, see `## Week schedule`); Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester IV row 4 ("EFMP-409, Foundations of Education, 3 (3-0), Major: Professional Course - IX, PTGR").

**Identity**: guide and Scheme agree on code, title and semester; the guide gives credit hours "3" (`:415-416`), the Scheme 3 (3-0). No conflict.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "EFMP-409", "title_en": "Foundations of Education", "title_ur": "تعلیم کی بنیادیں", "credit_hours": "3 (3-0)", "category": "Major: Professional"}` in Semester 4. The Urdu title is the drafter's proposal.

**Why this course matters on the licence axis.** `specs/content/licence-blueprint.md` ranks EFMP-409 second among all courses (after EFMP-408): it hosts the whole STEDA Part II "Foundations of Education" heading, inherited from the 2025 course `EED-511`, and two sampled CRQ items. The 2025 HEC guide the licence examiner wrote from is available and should be read alongside the 2026 guide when authoring:

- `Scheme-and-Course-guides/extracted-text/course-guides-2025/FoundationsEd_Sept13.txt` (also public as `hec-2013-foundations`, below)

## Course-wide items

- **Course Outcomes (guide, verbatim, `:425-430`)**: this course will enable Student Teachers to:
  1. understand the basic purpose of education from the social, political, historical, economic, psychological, and philosophical perspectives
  2. relate philosophy to education
  3. highlight the role of Western and Eastern philosophers in education
  4. trace the historical development of education
  5. analyze the prevailing issues and problems of education from the disciplines that constitute the foundations of education
- **Teaching strategies (guide, `:525-528`)**: lecture, discussions, question-answer, brainstorming.
- **Practical work (guide, `:529-532`)**: group work, group assignments, individual assignment, presentations.
- **Assessment criteria (guide, `:534-538`)**: class test, mid-term test, evaluation of assignments, class attendance, class participation and performance. No weighting is given, so the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Recommended resources**: see `## Reading list`.

## Licence coverage

Every objective below is from the licence syllabus (`specs/content/licence-blueprint.md`, section A and the sample-paper tags).

| # | STEDA Part II objective / item | Blueprint mapping | Unit here |
|---|---|---|---|
| 1 | The ideological foundations of education | `EFMP-409` | 2 (U2-05, U2-06, U2-07) |
| 2 | The philosophical foundations of education | `EFMP-409`; `GARH-400` | 1 (U1-04 to U1-06), 2 (U2-01), 3 |
| 3 | The sociological foundations of education | `EFMP-409`; `GSOS-301` | 2 (U2-02) |
| 4 | The psychological foundations of education | `EFMP-409`; `EFMP-301` | 2 (U2-03) |
| 5 | The historical foundations of education | `EFMP-409` | 2 (U2-04, derived) |
| 6 | Impact of education on society (section E) | `GSOS-301`; `EFMP-409` | 2 (U2-02) |
| 7 | CRQ 2 Active Learning Principle (Dewey) | `EFMP-409`; `EFMP-301` | 3 (U3-11, derived) |
| 8 | CRQ 8 Teaching Philosophy Statement | `EFMP-302` Unit 1; `EFMP-409` | 3 (U3-19, derived) |

Rows 5, 7 and 8 need sub-topics the 2026 outline does not list; each is derived under `D-2026-0053` item 4 and names its outcome (drafting note 5).

## Course Description

From the course guide (paraphrased, `:422`): the course reflects on the philosophical, sociological, psychological, ideological and historical foundations of education, highlights the basic concepts of education, and develops student-teachers' understanding of the forces that shape educational aims, content and practice, in Pakistan and beyond.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2.

### Guide-listed (`:512-523`)

Searched in Open Library on 2026-11-18. All six are general Western foundations texts in print; none treats the Islamic or Pakistani content of Units 4-5.

| Key | Citation as printed / as found | Units | Note |
|---|---|---|---|
| canestrari-marlowe | Printed: Canestrari, A., & Marlowe, B. A. (eds.) (2009). *Foundations of education: An anthology of critical readings*. Sage. The editors' SAGE anthology is titled *Educational foundations: An anthology of critical readings*. | 1, 2 | real under the corrected title; edition year to be confirmed (the editors also have a 2018 Wiley handbook, OL20185385W, which is a different work) |
| goldblatt-smith-2005 | Goldblatt, P. F., & Smith, D. (Eds.). (2005). *Cases for teacher development: Preparing for the classroom*. SAGE. | 2 | real (OL21000007W); a casebook, of limited use for this outline |
| holt-kysilka-2005 | Holt, L. C., & Kysilka, M. (2005). *Instructional patterns: Strategies for maximizing student learning*. SAGE. | - | real (OL3060723W); an instruction-methods text that matches no topic here; not bound |
| murphy-2005 | Printed: Murphy, D. (2005). *Foundations: Introduction to teaching*. Prentice Hall. Found: Murphy, D. (2005). *Videoworkshop for foundations/introduction to teaching*. Pearson Education. | - | the only match is a video-workshop companion, not a textbook. Not bound until the owner confirms the work |
| provenzo-2006 | Provenzo, E. F. (Ed.). (2006). *Critical issues in education: An anthology of readings*. SAGE. | 2, 5 | real (OL18903624W); the guide gives 2005, Open Library 2006 |
| semel-2010 | Semel, S. F. (Ed.). (2010). *Foundations of education: The essential texts*. Routledge. | 1, 3 | real (OL18636574W) |
| sindh-education-web | Website: http://www.sindheducation.govt.pk | 5 | guide-listed website; to be checked by the author before use. The other listed website (`uwsp.edu/education/lwilson/curric/curtyp.htm`) is printed with broken spacing and is not bound |

### Author-selected (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| hec-2013-foundations | Higher Education Commission. (2012). *Foundations of education: Course guide, B.Ed. (Hons) Elementary* (revised September 2013). HEC, Islamabad. | https://www.hec.gov.pk/english/services/universities/RevisedCurricula/Documents/2011-2012/Education/FoundationsEd_Sept13.pdf | 1, 2, 3 | free PDF, HTTP 200 on 2026-11-18; the guide the licence was written from (identical to the bundled 2025 extraction). Supplies the sociological perspectives (functionalist, conflict, interactionist) and the four psychological perspectives |
| sep-curren-education | Curren, R. (2025). Philosophy of education. In *The Stanford Encyclopedia of Philosophy*. | https://plato.stanford.edu/entries/education-philosophy/ | 1, 2, 3 | open access, HTTP 200 on 2026-11-18 (first published 11 February 2025) |
| sep-kraut-plato | Kraut, R. (2004/2026). Plato. In *The Stanford Encyclopedia of Philosophy*. | https://plato.stanford.edu/entries/plato/ | 3 | open access; substantive revision 24 April 2026 |
| sep-shields-aristotle | Shields, C. (2008/2020). Aristotle. In *The Stanford Encyclopedia of Philosophy*. | https://plato.stanford.edu/entries/aristotle/ | 3 | open access; substantive revision 25 August 2020 |
| sep-bertram-rousseau | Bertram, C. (2010/2023). Jean Jacques Rousseau. In *The Stanford Encyclopedia of Philosophy*. | https://plato.stanford.edu/entries/rousseau/ | 3 | open access; substantive revision 21 April 2023 |
| sep-hildebrand-dewey | Hildebrand, D. (2018/2024). John Dewey. In *The Stanford Encyclopedia of Philosophy*. | https://plato.stanford.edu/entries/dewey/ | 3 | open access; substantive revision 31 March 2024; for pragmatism and the derived Dewey sub-topic |
| gutenberg-primary | Plato, *The Republic* (trans. B. Jowett), Project Gutenberg eBook #1497; Rousseau, J.-J., *Emile* (trans. B. Foxley), eBook #5427; Dewey, J. (1916), *Democracy and Education*, eBook #852. | https://www.gutenberg.org/ebooks/1497 ; /5427 ; /852 | 3 | public domain. **Recheck needed:** Project Gutenberg showed a maintenance page on 2026-11-18, so these three records were not confirmed; the author confirms each before binding |
| iqbal-cyber-library | Iqbal Academy Pakistan. *Iqbal Cyber Library* (Iqbal's works in Urdu, Persian and English). | https://www.iqbalcyberlibrary.net/ | 3 | open, HTTP 200 on 2026-11-18; units cite the specific work and page used |
| quran-translation | *The Holy Qur'an*: Arabic text with English and Urdu translations. Quran.com. | https://quran.com/96 | 4 | open access, HTTP 200 on 2026-11-18; Surah Al-Alaq (96) and the other verses quoted; units name the translation |
| pie-1959-commission | Government of Pakistan. (1959). *Report of the Commission on National Education* (the Sharif Commission). Ministry of Education. Copy hosted by the Pakistan Institute of Education. | https://drive.google.com/file/d/1OV8jX7stKz6WyuY5ysAoriH6OmwQ9yGn/view (listed at https://pie.gov.pk/Detail/ZTcwZDc5ODMtMWQ2My00MGY5LTk3MDktZWZhYzgyOGMyMzM1) | 5 | official copy listed on the PIE "National Education Policies" page, confirmed 2026-11-18 |
| pie-1979-policy | Government of Pakistan. (1979). *National Education Policy 1979*. Ministry of Education. Copy hosted by PIE. | https://drive.google.com/file/d/1w0BY3bjsDABvZYF_mqzQ_czCzqu_Xr5I/view | 5 | as above; the guide's "1978-80 policy" (drafting note 6) |
| pie-1998-policy | Government of Pakistan. (1998). *National Education Policy 1998-2010*. Ministry of Education. Copy hosted by PIE. | https://drive.google.com/file/d/1wgok27S1TekT8JJMFSutDE3MFLcSoZO2/view | 5 | as above |
| saiyid-nihcr | Saiyid, D. H. An evaluation of the Sharif, Hamoodur Rehman and Nur Khan reports on education in Pakistan. *Pakistan Journal of History and Culture*. National Institute of Historical and Cultural Research. | http://pjhc.nihcr.edu.pk/wp-content/uploads/2020/09/3-An_Evaluation_of_the_SharifHamoodur_Rehman_and_Nur_Khan_reports_on_Edudcation_in_PakistanDushka_H._Saiyid.pdf | 5 | open PDF found 2026-11-18; volume, issue and year to be taken from the PDF before citing |

## Week schedule

The guide names five units (`:434-510`). In the source `.docx`, each unit's items are numbered list paragraphs divided by empty numbered paragraphs into groups of three (`:434-510`; groups lost their labels in extraction). There are exactly **16 groups**, one per week of a 16-week semester, so each group is read as a week. Following `D-2026-0070` item 1 there is one unit per guide unit; **each topic is one group (week)**. The guide schedules no review or examination week (drafting note 2).

| Week(s) | Unit | Topics (one per group) |
|---|---|---|
| 1-2 | Unit 1 - Philosophy of Education | 1.1 group 1; 1.2 group 2 |
| 3-4 | Unit 2 - The Foundations of Education | 2.1 group 3; 2.2 group 4 |
| 5-10 | Unit 3 - The History of Education (schools of thought and educationists) | 3.1 to 3.6, groups 5-10 |
| 11-13 | Unit 4 - Islamic Perspectives on Education | 4.1 group 11; 4.2 group 12; 4.3 group 13 |
| 14-16 | Unit 5 - Education Reports and Policies | 5.1 group 14; 5.2 group 15; 5.3 group 16 |

## Unit 1: Philosophy of Education

Guide UNIT 1 (`:434-442`). Unit Spec (G1) for `docs/semester-4/efmp-409/unit-01/`.

- **CLO/SLO refs**: `SLO:EFMP-409-1-1` (define education and philosophy from several standpoints), `SLO:EFMP-409-1-2` (explain how education and philosophy relate; describe their scope and importance; compare stated aims of education) - traces to guide outcomes 1 and 2.
- **Key terms**: Education, Philosophy, Philosophy of education, Aims of education.
- **Topics**: 1.1 group 1: meanings of education and philosophy; 1.2 group 2: relationship, scope and aims.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze item asking the learner to identify the aim of education implied in three short statements by Pakistani policy-makers or educationists. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | group 1 (`:436`) | 1.1 | Introduction to the course |
| U1-02 | group 1 (`:437`) | 1.1 | The meaning and definitions of education |
| U1-03 | group 1 (`:438`) | 1.1 | The meaning and definitions of philosophy (branches: metaphysics, epistemology, axiology) |
| U1-04 | group 2 (`:440`) | 1.2 | The relationship between education and philosophy |
| U1-05 | group 2 (`:441`) | 1.2 | The scope and importance of education and philosophy |
| U1-06 | group 2 (`:442`) | 1.2 | The aims of education |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | What we mean by education and by philosophy | U1-01, U1-02, U1-03 | 12-16 | fig-U1-1: table, fig-U1-2: concept-map |
| 1.2 | How philosophy shapes education and its aims | U1-04, U1-05, U1-06 | 12-16 | fig-U1-3: flowchart, fig-U1-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 36-48 reading-min.

**Prerequisite knowledge**: `EFMP-302` Teaching Profession (Semester 1). This is the opening unit of the course.

**Common misconceptions**: "education means schooling"; "philosophy is abstract and has nothing to do with the classroom"; "the aim of education is to pass examinations".

**Mapped readings**: sep-curren-education, hec-2013-foundations, canestrari-marlowe, semel-2010.

**Figure plan**:
  - fig-U1-1 - `table` - definitions of education (etymological, narrow, broad; Western and Muslim thinkers) compared (Topic 1.1)
  - fig-U1-2 - `concept-map` - branches of philosophy and the educational question each answers: what is real, what is true, what is good (Topic 1.1)
  - fig-U1-3 - `flowchart` - from a philosophy to the classroom: view of reality and knowledge, aims, curriculum, method, role of teacher (the unit's required schematic) (Topic 1.2)
  - fig-U1-4 - `table` - individual, social, vocational, moral and spiritual aims of education with an example of each (Topic 1.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: The Foundations of Education

Guide UNIT 2 (`:444-452`). Unit Spec (G1) for `docs/semester-4/efmp-409/unit-02/`.

- **CLO/SLO refs**: `SLO:EFMP-409-2-1` (compare the philosophical and ideological foundations; explain the sociological, psychological and historical foundations and how each bears on schooling), `SLO:EFMP-409-2-2` (distinguish ideology from religion; explain the ideological and Islamic foundations of education in Pakistan) - traces to guide outcomes 1, 4 and 5.
- **Key terms**: Foundation of education, Ideology, Sociology of education, Educational psychology, Ideology of Pakistan.
- **Topics**: 2.1 group 3: philosophical, sociological, psychological (and derived historical) foundations; 2.2 group 4: ideology, religion and the ideological and Islamic foundations.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze item asking the learner to sort ten features of a Pakistani school (for example, its timetable, its uniform rule, its morning assembly, its examination system) by the foundation each reflects and explain two. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | group 3 (`:446`) | 2.1 | Comparing the philosophical and ideological foundations of education |
| U2-02 | group 3 (`:447`) | 2.1 | The sociological foundations of education (functionalist, conflict and interactionist views, from hec-2013-foundations; education's impact on society) |
| U2-03 | group 3 (`:448`) | 2.1 | The psychological foundations of education (the four perspectives in hec-2013-foundations) |
| U2-04 | derived: outcome 4; licence objective 5 (`D-2026-0053` item 4) | 2.1 | The historical foundations of education |
| U2-05 | group 4 (`:450`) | 2.2 | Ideology versus religion |
| U2-06 | group 4 (`:451`) | 2.2 | The ideological foundations of education |
| U2-07 | group 4 (`:452`) | 2.2 | The Islamic foundations of education |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | Philosophical, sociological, psychological and historical foundations | U2-01, U2-02, U2-03, U2-04 | 16-20 | fig-U2-1: concept-map, fig-U2-2: table |
| 2.2 | Ideology, religion and the Islamic foundations | U2-05, U2-06, U2-07 | 12-16 | fig-U2-3: table, fig-U2-4: diagram |

**Depth budget**: 7 sub-topics; 2 topics; 40-52 reading-min.

**Prerequisite knowledge**: Unit 1; `EFMP-301` Educational Psychology (Semester 1) and `GSOS-301` Social Science (Semester 2).

**Common misconceptions**: "ideology and religion are the same thing"; "sociology of education is only about social problems"; "psychology matters in education only for pupils with difficulties".

**Mapped readings**: hec-2013-foundations, sep-curren-education, canestrari-marlowe, provenzo-2006, goldblatt-smith-2005.

**Figure plan**:
  - fig-U2-1 - `concept-map` - the five foundations (philosophical, ideological, sociological, psychological, historical) around education, each with the question it asks (the unit's required schematic) (Topic 2.1)
  - fig-U2-2 - `table` - functionalist, conflict and interactionist views of schooling with a Pakistani school example each (Topic 2.1)
  - fig-U2-3 - `table` - ideology and religion compared on source, scope and role in education (Topic 2.2)
  - fig-U2-4 - `diagram` - how the Ideology of Pakistan and Islamic teachings appear in national curriculum aims, sourced to a named policy (Topic 2.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: The History of Education

Guide UNIT 3 "The history of education" (`:454-482`): six groups covering schools of thought and educationists. Unit Spec (G1) for `docs/semester-4/efmp-409/unit-03/`.

- **CLO/SLO refs**: `SLO:EFMP-409-3-1` (explain idealism, realism, naturalism and pragmatism and their application in education), `SLO:EFMP-409-3-2` (describe the educational views of Plato, Aristotle, Rousseau, Dewey, Ibn Khaldun and Iqbal), `SLO:EFMP-409-3-3` (compare Western and Muslim scholars' views; write a personal teaching philosophy) - traces to guide outcomes 2 and 3.
- **Key terms**: Idealism, Realism, Naturalism, Pragmatism, Active learning, Khudi.
- **Topics**: 3.1 group 5: idealism and Plato; 3.2 group 6: Aristotle and realism; 3.3 group 7: naturalism and Rousseau; 3.4 group 8: pragmatism (with Ibn Khaldun, as the guide pairs them, and Dewey, derived); 3.5 group 9: Iqbal; 3.6 group 10: Western and Muslim scholars compared.
- **Assessment blueprint**: formative 18 items, 3 per topic (extends `D-2026-0072` to a six-topic unit, as accepted for EFPG-401 under `D-2026-0077`; see drafting note 4) (Remember/Understand/Apply); summative includes one Create item asking the learner to write a 250-word teaching philosophy statement that names the school of thought it draws on (the licence's CRQ 8 form). Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | group 5 (`:456`) | 3.1 | What is idealism? |
| U3-02 | group 5 (`:457`) | 3.1 | Plato as the major exponent of idealism |
| U3-03 | group 5 (`:458`) | 3.1 | The application of idealism in education |
| U3-04 | group 6 (`:461`) | 3.2 | Aristotle as an educationist |
| U3-05 | group 6 (`:462`) | 3.2 | What is realism? |
| U3-06 | group 6 (`:463`) | 3.2 | The application of realism in education |
| U3-07 | group 7 (`:466`) | 3.3 | What is naturalism? |
| U3-08 | group 7 (`:467`) | 3.3 | Rousseau's views on naturalism |
| U3-09 | group 7 (`:468`) | 3.3 | The application of naturalism in education |
| U3-10 | group 8 (`:470`) | 3.4 | What is pragmatism? |
| U3-11 | derived: outcome 3; licence CRQ 2 (`D-2026-0053` item 4) | 3.4 | Dewey and the active-learning principle |
| U3-12 | group 8 (`:471`) | 3.4 | Ibn-e-Khaldun's views on education |
| U3-13 | group 8 (`:472`) | 3.4 | Applications of pragmatism in education |
| U3-14 | group 9 (`:475`) | 3.5 | Iqbal as an educationist |
| U3-15 | group 9 (`:476`) | 3.5 | The contribution of Iqbal's poetry to education |
| U3-16 | group 9 (`:477`) | 3.5 | Iqbal's views on the teacher, the curriculum and pedagogy |
| U3-17 | group 10 (`:480-481`) | 3.6 | Western scholars' and Muslim scholars' views on education |
| U3-18 | group 10 (`:482`) | 3.6 | Comparison of Western and Muslim scholars |
| U3-19 | derived: outcome 2; licence CRQ 8 (`D-2026-0053` item 4) | 3.6 | Writing a personal teaching philosophy statement |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Idealism and Plato | U3-01, U3-02, U3-03 | 10-14 | fig-U3-1: table, fig-U3-2: diagram |
| 3.2 | Aristotle and realism | U3-04, U3-05, U3-06 | 10-14 | fig-U3-3: table, fig-U3-4: diagram |
| 3.3 | Naturalism and Rousseau | U3-07, U3-08, U3-09 | 10-14 | fig-U3-5: table, fig-U3-6: timeline |
| 3.4 | Pragmatism, Dewey and Ibn Khaldun | U3-10, U3-11, U3-12, U3-13 | 12-16 | fig-U3-7: flowchart, fig-U3-8: table |
| 3.5 | Iqbal as an educationist | U3-14, U3-15, U3-16 | 10-14 | fig-U3-9: concept-map, fig-U3-10: table |
| 3.6 | Western and Muslim thinkers compared | U3-17, U3-18, U3-19 | 10-14 | fig-U3-11: table, fig-U3-12: timeline |

**Depth budget**: 19 sub-topics; 6 topics; 74-102 reading-min.

**Prerequisite knowledge**: Units 1 and 2.

**Common misconceptions**: "idealism means being unrealistic"; "naturalism means letting children do whatever they like"; "Islamic and Western educational thought have nothing in common"; "Ibn Khaldun was a pragmatist in Dewey's sense" (see drafting note 7).

**Mapped readings**: sep-kraut-plato, sep-shields-aristotle, sep-bertram-rousseau, sep-hildebrand-dewey, gutenberg-primary, iqbal-cyber-library, sep-curren-education, hec-2013-foundations, semel-2010.

**Figure plan**:
  - fig-U3-1 - `table` - idealism in education: aims, curriculum, method, teacher's role, with Plato's views (Topic 3.1)
  - fig-U3-2 - `diagram` - Plato's stages of education in *The Republic* by age, from sep-kraut-plato (Topic 3.1)
  - fig-U3-3 - `table` - realism in education: aims, curriculum, method, teacher's role (Topic 3.2)
  - fig-U3-4 - `diagram` - idealism and realism contrasted on where knowledge comes from (Topic 3.2)
  - fig-U3-5 - `table` - naturalism in education with Rousseau's stages of development in *Emile* (Topic 3.3)
  - fig-U3-6 - `timeline` - lifetimes and major works of Plato, Aristotle, Ibn Khaldun, Rousseau, Dewey and Iqbal, dates from the bound sources (the unit's required schematic) (Topic 3.3)
  - fig-U3-7 - `flowchart` - Dewey's learning by experience: problem, inquiry, action, reflection, new problem (Topic 3.4)
  - fig-U3-8 - `table` - pragmatism in education with Ibn Khaldun's educational advice placed beside it, showing likenesses and differences (Topic 3.4)
  - fig-U3-9 - `concept-map` - Iqbal's educational ideas: khudi (selfhood), action, freedom, the ideal teacher, curriculum (Topic 3.5)
  - fig-U3-10 - `table` - three Iqbal verses on education, each with its source and a plain-language meaning (Topic 3.5)
  - fig-U3-11 - `table` - Western and Muslim scholars compared on aims, knowledge, the teacher and moral education (Topic 3.6)
  - fig-U3-12 - `timeline` - Muslim scholars of education (for example al-Ghazali, Ibn Khaldun, Shah Waliullah, Sir Syed, Iqbal), dates from bound sources (Topic 3.6)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: Islamic Perspectives on Education

Guide UNIT 4 (`:484-496`). Unit Spec (G1) for `docs/semester-4/efmp-409/unit-04/`.

- **CLO/SLO refs**: `SLO:EFMP-409-4-1` (explain Surah Al-Alaq's emphasis on reading and knowledge; describe the place of education in the Qur'an and Hadith), `SLO:EFMP-409-4-2` (explain the educational relevance of the Charter of Medina and the Last Sermon), `SLO:EFMP-409-4-3` (describe As-Suffa, its method of teaching and its curriculum) - traces to guide outcomes 1 and 3.
- **Key terms**: Ilm (knowledge), Iqra, Charter of Medina (Meesaq-e-Madina), Khutbat-ul-Wida (Last Sermon), As-Suffa.
- **Topics**: 4.1 group 11: Qur'an and Hadith; 4.2 group 12: the Charter of Medina and the Last Sermon; 4.3 group 13: As-Suffa.
- **Assessment blueprint**: formative 9 items, 3 per topic (`D-2026-0072`) (Remember/Understand/Apply); summative includes one Apply item asking the learner to plan how a primary teacher could use one principle from the As-Suffa model (for example, small study circles) in a present-day classroom. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | group 11 (`:486`) | 4.1 | Explanation of Surah Al-Alaq |
| U4-02 | group 11 (`:487`) | 4.1 | The emphasis on the acquisition of education in the Qur'an |
| U4-03 | group 11 (`:488`) | 4.1 | The emphasis on the acquisition of education in the Hadith |
| U4-04 | group 12 (`:490`) | 4.2 | Meesaq-e-Madina (Charter of Medina): the foundation stone of education |
| U4-05 | group 12 (`:491`) | 4.2 | The Last Sermon: its relevance to education |
| U4-06 | group 12 (`:492`) | 4.2 | An analysis of the Last Sermon's educational principles (guide: "a critical analysis"; drafting note 8) |
| U4-07 | group 13 (`:494`) | 4.3 | As-Suffa: the first institute in Islam |
| U4-08 | group 13 (`:495`) | 4.3 | The method of teaching in As-Suffa |
| U4-09 | group 13 (`:496`) | 4.3 | The curriculum of the As-Suffa institute |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | Knowledge in the Qur'an and Hadith | U4-01, U4-02, U4-03 | 10-14 | fig-U4-1: table, fig-U4-2: concept-map |
| 4.2 | The Charter of Medina and the Last Sermon | U4-04, U4-05, U4-06 | 10-14 | fig-U4-3: timeline, fig-U4-4: table |
| 4.3 | As-Suffa, the first institution of learning | U4-07, U4-08, U4-09 | 10-14 | fig-U4-5: diagram, fig-U4-6: table |

**Depth budget**: 9 sub-topics; 3 topics; 42-58 reading-min.

**Prerequisite knowledge**: Unit 2 (Topic 2.2); `GISS-401` Islamic Studies (Semester 3).

**Common misconceptions**: "Islam values only religious knowledge"; "the Charter of Medina was only a military treaty"; "As-Suffa was a place of shelter, not of learning".

**Mapped readings**: quran-translation, hec-2013-foundations, sep-curren-education.

**Figure plan**:
  - fig-U4-1 - `table` - Surah Al-Alaq verses 1-5 with translation and the educational idea in each (Topic 4.1)
  - fig-U4-2 - `concept-map` - knowledge in the Qur'an and Hadith: seeking, reflecting, teaching, acting, sharing (Topic 4.1)
  - fig-U4-3 - `timeline` - first revelation, Hijrah and the Charter of Medina, the founding of As-Suffa and the Last Sermon, with dates from a bound source (the unit's required schematic) (Topic 4.2)
  - fig-U4-4 - `table` - principles in the Charter of Medina and the Last Sermon and the educational value each carries (Topic 4.2)
  - fig-U4-5 - `diagram` - the As-Suffa model: teacher, study circle, learners, practice, outreach (Topic 4.3)
  - fig-U4-6 - `table` - subjects and methods at As-Suffa with present-day classroom parallels (Topic 4.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; at least 1 per topic plus integrative items (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 5: Education Reports and Policies

Guide UNIT 5 (`:498-510`). Unit Spec (G1) for `docs/semester-4/efmp-409/unit-05/`.

- **CLO/SLO refs**: `SLO:EFMP-409-5-1` (distinguish education reports from policies; explain how they are framed, launched and applied), `SLO:EFMP-409-5-2` (identify factors that hinder implementation; summarise the Sharif Commission; review the 1979 policy), `SLO:EFMP-409-5-3` (summarise and analyse the 1998-2010 policy; argue whether a new policy is needed) - traces to guide outcomes 4 and 5.
- **Key terms**: Education report, Education policy, Implementation, Sharif Commission, National Education Policy.
- **Topics**: 5.1 group 14: reports and policies; 5.2 group 15: hindrances, the Sharif Commission and the 1979 policy; 5.3 group 16: the 1998-2010 policy and the case for a new one.
- **Assessment blueprint**: formative 9 items, 3 per topic (`D-2026-0072`) (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to judge why one stated target of the 1998-2010 policy was or was not met, using evidence from a bound source. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | group 14 (`:500`) | 5.1 | The difference between reports and policies |
| U5-02 | group 14 (`:501`) | 5.1 | How reports and policies are framed |
| U5-03 | group 14 (`:502`) | 5.1 | How reports and policies are launched and applied |
| U5-04 | group 15 (`:504`) | 5.2 | Factors that hinder the application of reports and policies |
| U5-05 | group 15 (`:505`) | 5.2 | The main points of the Sharif Commission (1959) |
| U5-06 | group 15 (`:506`) | 5.2 | A critical review of the 1978-80 policy (National Education Policy 1979) |
| U5-07 | group 16 (`:508`) | 5.3 | The main points of the 1998-2010 policy |
| U5-08 | group 16 (`:509`) | 5.3 | An analysis of the 1998-2010 policy |
| U5-09 | group 16 (`:510`) | 5.3 | Is there any need for a new policy? |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | Reports and policies: how they are made and applied | U5-01, U5-02, U5-03 | 10-14 | fig-U5-1: flowchart, fig-U5-2: table |
| 5.2 | Why policies falter; the Sharif Commission and the 1979 policy | U5-04, U5-05, U5-06 | 12-16 | fig-U5-3: timeline, fig-U5-4: table |
| 5.3 | The 1998-2010 policy and the case for a new one | U5-07, U5-08, U5-09 | 12-16 | fig-U5-5: table, fig-U5-6: concept-map |

**Depth budget**: 9 sub-topics; 3 topics; 46-62 reading-min.

**Prerequisite knowledge**: `EFMP-303` Educational Policies and Plans of Pakistan (Semester 2), which this unit must reference rather than repeat (drafting note 9).

**Common misconceptions**: "a report and a policy are the same document"; "policies fail only because of too little money"; "a new policy will solve problems the old one could not".

**Mapped readings**: pie-1959-commission, pie-1979-policy, pie-1998-policy, saiyid-nihcr, provenzo-2006, sindh-education-web.

**Figure plan**:
  - fig-U5-1 - `flowchart` - the policy cycle: problem, commission or report, draft policy, approval, implementation, review (Topic 5.1)
  - fig-U5-2 - `table` - education reports and education policies compared on who writes them, authority and purpose (Topic 5.1)
  - fig-U5-3 - `timeline` - Pakistan's education conference, commissions and policies from 1947 to 2009, dates from the PIE list (the unit's required schematic) (Topic 5.2)
  - fig-U5-4 - `table` - main recommendations of the Sharif Commission and of the 1979 policy side by side (Topic 5.2)
  - fig-U5-5 - `table` - selected 1998-2010 targets against what was achieved, each figure from a bound source (Topic 5.3)
  - fig-U5-6 - `concept-map` - factors that hinder implementation: finance, governance, capacity, continuity, data, politics (Topic 5.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; at least 1 per topic plus integrative items (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Identity.** No conflict: EFMP-409, Foundations of Education, 3 (3-0), Semester IV in both guide and Scheme.
2. **Weeks read from list structure.** The guide gives no week labels. The `.docx` divides each unit's list into groups of three with empty numbered paragraphs; there are exactly 16 groups, read as 16 weeks. That leaves no review or examination week, so the schedule may run two weeks long in practice. The evaluator should confirm this reading against the source document.
3. **Unit 3's heading.** The guide calls Unit 3 "The history of education", but its contents are schools of thought and educationists. The spec keeps the guide's heading and adds a descriptive subtitle; the historical development of education itself is placed in U2-04 (note 5).
4. **Six-topic unit.** Unit 3 has six groups, so six topics and 18 formative items, beyond `D-2026-0072`, which rules only on three-topic units. Splitting Unit 3 in two would break `D-2026-0070` item 1 (one unit per guide unit).
5. **Derived sub-topics.** U2-04 (historical foundations), U3-11 (Dewey and active learning) and U3-19 (teaching philosophy statement) are not in the outline. Each is added under `D-2026-0053` item 4, tied to a stated outcome (4, 3 and 2) and to the licence blueprint (objective 5, CRQ 2, CRQ 8). Without them those licence rows have no host in the 2026 corpus.
6. **"1978-80 policy".** The official document on the PIE list is the "National Education Policy 1979"; PIE also lists a separate "National Education Policy 1972-1980". The spec reads the guide's "1978-80 policy" as the 1979 policy. The owner should confirm.
7. **Ibn Khaldun under pragmatism.** The guide places "Ibn-e-Khaldun's views on education" in the pragmatism group and names no pragmatist philosopher. Ibn Khaldun (d. 1406) predates pragmatism by five centuries. The spec teaches pragmatism through Dewey (derived), presents Ibn Khaldun's educational views in their own right, and asks learners to compare them, rather than calling him a pragmatist. The evaluator may prefer to escalate.
8. **"A critical analysis of the Last Sermon".** The spec reads this as an analysis of the Sermon's educational principles and their application, not a critique of the text. Units 4 and the Islamic material in Units 2-3 need review by a qualified scholar at G3, as for `GISS-401` and `GUHQ-301`.
9. **Overlap with EFMP-303.** Unit 5 overlaps `EFMP-303` Educational Policies and Plans of Pakistan (Semester 2). Unit 5 keeps the guide's foundations angle (how policies reflect aims, why they falter) and links to EFMP-303 for detail rather than repeating it.
10. **Reading list.** None of the guide's six books treats Units 4-5, and two entries are problematic (`murphy-2005` matches only a video companion; `holt-kysilka-2005` fits no topic); neither is bound. The open-access floor is met by the HEC course guide, Stanford Encyclopedia entries, Quran.com and PIE's official policy copies. Project Gutenberg was in maintenance on 2026-11-18, so `gutenberg-primary` must be rechecked.
11. **`D-2026-0053` item 2 in Semester 4.** That ruling (author-selected readings and the open-access floor) was made for Semester 2 and accepted for Semester 3 under `D-2026-0080`; whether it extends to Semester 4 is the same question again.
