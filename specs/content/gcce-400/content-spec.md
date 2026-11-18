---
course_code: GCCE-400
status: draft
open_access_floor:
  default: 1
---

# GCCE-400 - Civics and Community Engagement - Content Spec

Semester 4, General Education, 2 (1-1) credit hours. Source: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` lines 101-192; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester IV row 1 ("GCCE- 400, Civics and Community Engagement, 2 (1-1), General Education, EC&EE").

**Identity**: the guide block gives no code, credit or title line of its own in the extracted text (`:101-109` open straight into the description); the Scheme row supplies all three. No conflict is visible, but the guide block's header could not be checked against the source `.docx` here.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "GCCE-400", "title_en": "Civics and Community Engagement", "title_ur": "شہریات اور سماجی شمولیت", "credit_hours": "2 (1-1)", "category": "General Education"}` in Semester 4. The Urdu title is the drafter's proposal.

**Origin.** The outline, outcomes and reading list match the Higher Education Commission's model general-education course "Civics and Community Engagement" (the same text appears in many Pakistani universities' published outlines, for example `https://sbbu.edu.pk/exams/Syllabus/HEC%20Civics%20and%20Community%20Engagement.pdf`, checked 2026-11-18). That explains the reading list's character (see `## Reading list`).

## Course-wide items

- **Course Outcomes (guide, verbatim, `:112-114`)**: after this course students will be able to:
  1. Demonstrate fundamental understanding of civics, government, citizenship and civil society.
  2. Understand the concept of community and recognize the significance of community engagement for individuals and groups.
  3. Recognize the importance of diversity and inclusivity for societal harmony and peaceful coexistence.
- **Teaching strategies**: none listed.
- **Practical work (the 1 practical credit)**: the guide lists four "suggested practical activities (optional)" (`:170-176`): community storytelling, community event planning, service-learning with a local organisation, and cultural exchange activities. They are course-level practical work, not unit content; each unit's teacher notes may point to the one that fits it (see `## Practical work plan`).
- **Assessment criteria (guide, `:187-192`)**: participation in discussions; short reflection papers on readings; a mid-term essay; a final paper of three to four extended essays. The guide's wording "a selected philosophical topic" and "philosophical concepts" appears to be carried over from another course's outline (drafting note 3). No weighting is given, so the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Recommended resources**: see `## Reading list`.

## Licence coverage

`specs/content/licence-blueprint.md` (section E, "School Community and Teacher") maps three STEDA Part II objectives to this course at course level, and the sample-paper item CRQ 10 "Parental Involvement Strategy":

| # | STEDA Part II objective / item | Blueprint mapping | Unit here |
|---|---|---|---|
| 1 | Structures and functions of community and schools in Pakistan | `GCCE-400` | 4 (U4-04, U4-07) and 2 (U2-02) |
| 2 | Culture and cultural elements of Pakistani communities | `GSOS-301`; `GCCE-400` | 7 (U7-01) |
| 3 | Relationship between school and community | `GCCE-400` | 4 (U4-07, derived) |
| 4 | CRQ 10 Parental Involvement Strategy | `GCCE-400` | 4 (U4-07, derived) |

The guide itself does not name schools; rows 3 and 4 are met by one derived sub-topic (U4-07) under `D-2026-0053` item 4, tagged to outcome 2. See drafting note 5.

## Course Description

From the course guide (paraphrased, `:109`): the course gives students basic knowledge of civics, citizenship and community engagement: civil society, government, civic responsibilities and inclusivity, and effective ways to take part in shaping society, so that they can apply this knowledge to real situations and make a positive difference in their communities.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2.

### Guide-listed (`:177-185`)

Each entry was searched in Open Library on 2026-11-18; the last three were also searched on the open web.

| Key | Citation as printed / as found | Units | Note |
|---|---|---|---|
| glencoe-civics-today | "Civics Today: Citizenship, Economics, & You" by McGraw-Hill Education. Found: *Civics Today: Citizenship, Economics, and You*, Glencoe/McGraw-Hill (editions 2002 onward) | 1, 2, 3 | real; a United States middle-school civics text, so its government and rights chapters describe the US system and support only general concepts here. Print; edition not named |
| kymlicka-norman-2000 | Kymlicka, W., & Norman, W. (Eds.). (2000). *Citizenship in diverse societies*. Oxford University Press. | 1, 7 | real (Open Library OL26777716W); print |
| youniss-levine-2009 | Printed as "Engaging Youth in Civic Life" by James Youniss and Peter Levine. Found: Youniss, J., & Levine, P. (Eds.). (2009). *Engaging young people in civic life*. Vanderbilt University Press. | 2, 5 | real under a slightly different title (Open Library OL18582528W); print |
| mattson-2017 | Mattson, K. (2017). *Digital citizenship in action: Empowering students to engage in online communities*. International Society for Technology in Education. | 6 | real (Open Library OL20201564W); print |
| pike-selby-globalization | "Globalization and Citizenship: In the Pursuit of a Cosmopolitan Education" by Graham Pike and David Selby | - | not found. Pike and Selby's known joint work is *Global Teacher, Global Learner* (Hodder & Stoughton, 1988). Not bound until the owner names the intended work |
| feldpausch-omilian | "Community Engagement: Principles, Strategies, and Practices" by Becky J. Feldpausch and Susan M. Omilian | - | not found in Open Library or any publisher record; the title occurs only in copies of the HEC model outline. Not bound (`D-2026-0001` does not apply to a work that cannot be shown to exist) |
| clarke-steckel | "Creating Social Change: A Blueprint for a Better World" by Matthew Clarke and Marie-Monique Steckel | - | as above: not found outside copies of the HEC model outline. Not bound |

### Author-selected (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| constitution-pakistan | *The Constitution of the Islamic Republic of Pakistan* (1973), as modified up to 28 February 2012. National Assembly of Pakistan. | https://na.gov.pk/uploads/documents/1333523681_951.pdf | 2, 3, 7 | primary text, confirmed 2026-11-18 (222 pp.). This copy stops at the Twentieth Amendment (2012): authors must check any article they quote against later amendments (for example the Twenty-sixth, 2024) before stating it as current |
| unesco-2015-gced | UNESCO. (2015). *Global citizenship education: Topics and learning objectives*. UNESCO. ISBN 978-92-3-100102-4. | https://doi.org/10.54675/DRHC3544 (record: https://unesdoc.unesco.org/ark:/48223/pf0000232993) | 1, 4, 7 | open access (CC BY-SA 3.0 IGO), confirmed 2026-11-18 |
| coe-2019-dce | Council of Europe. (2019). *Digital citizenship education handbook*. Council of Europe Publishing. ISBN 978-92-871-8734-5. | https://rm.coe.int/16809382f9 | 6 | free PDF, confirmed 2026-11-18 |
| openstax-sociology-3e | OpenStax. (2021). *Introduction to sociology 3e*. Rice University. Chapter 11 (Race and Ethnicity), Chapter 21 (Social Movements and Social Change). | https://openstax.org/details/books/introduction-sociology-3e | 5, 7 | open access (CC BY 4.0); chapter pages `11-1-racial-ethnic-and-minority-groups` and `21-2-social-movements` HTTP 200 on 2026-11-18 |
| dean-2005-citizenship | Dean, B. L. (2005). Citizenship education in Pakistani schools: Problems and possibilities. *International Journal of Citizenship and Teacher Education, 1*(2), 35-55. | https://ecommons.aku.edu/pakistan_ied_pdck/30 | 1, 3 | green OA (Aga Khan University eCommons); OpenAlex W137269803; page range to be confirmed from the PDF |
| ahmad-2004-cice | Ahmad, I. (2004). Islam, democracy and citizenship education: An examination of the social studies curriculum in Pakistan. *Current Issues in Comparative Education, 7*(1). | https://doi.org/10.52214/cice.v7i1.11389 | 1, 2, 3 | diamond OA; OpenAlex W77321979 |
| batool-2019-civil-society | Batool, S., Mahmood, A., & Ullah, A. (2019). The role of civil society in democratic consolidation in Pakistan and Turkey. *Liberal Arts and Social Sciences International Journal, 3*(1), 85-92. | https://doi.org/10.47264/idea.lassij/3.1.8 | 2, 5 | gold OA; OpenAlex W3163863933 |
| hasan-2006-orangi | Hasan, A. (2006). Orangi Pilot Project: The expansion of work beyond Orangi and the mapping of informal settlements and infrastructure. *Environment and Urbanization, 18*(2), 451-480. | https://doi.org/10.1177/0956247806069626 | 4 | free to read (bronze OA); OpenAlex W2159484449; the Pakistani case study for U4-06 |
| shair-2022-digital-divide | Shair, W., Waheed, A., Kamran, M. M., & Kubra, N. (2022). Digital divide in Pakistan: Barriers to ICT usage among the individuals of Pakistan. *Journal of Economic Impact, 4*(3), 196-204. | https://doi.org/10.52223/jei4032206 | 6 | diamond OA; OpenAlex W4313326066 |

## Week schedule

The guide names seven units with their weeks (`:116-169`); following `D-2026-0070` item 1 there is one unit per guide unit, in the guide's order. The guide covers twelve weeks; Weeks 13-16 are not scheduled in it (drafting note 2). Inside a unit that spans several weeks, **each topic is one guide week**; in a one-week unit, **each topic is one of that week's numbered sections** (drafting note 4).

| Week(s) | Unit | Topics |
|---|---|---|
| 1-3 | Unit 1 - Introduction to Civics and Citizenship | 1.1 Week 1; 1.2 Week 2; 1.3 Week 3 |
| 4-5 | Unit 2 - State, Government and Civil Society | 2.1 Week 4; 2.2 Week 5 |
| 6-7 | Unit 3 - Rights and Responsibilities | 3.1 Week 6; 3.2 Week 7 |
| 8-9 | Unit 4 - Ethics and Community Engagement | 4.1 Week 8; 4.2 Week 9 |
| 10 | Unit 5 - Advocacy and Activism | 5.1 section 10.1; 5.2 section 10.2; 5.3 section 10.3 |
| 11 | Unit 6 - Digital Citizenship and Technology | 6.1 section 11.1; 6.2 section 11.2; 6.3 section 11.3 |
| 12 | Unit 7 - Diversity, Inclusion and Social Justice | 7.1 section 12.1; 7.2 section 12.2; 7.3 section 12.3; 7.4 section 12.4 |

## Unit 1: Introduction to Civics and Citizenship

Guide Unit #1, Weeks 1-3 (`:116-127`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-01/`.

- **CLO/SLO refs**: `SLO:GCCE-400-1-1` (define civics; trace how civic participation developed; describe forms of civic engagement), `SLO:GCCE-400-1-2` (define citizenship; explain the changing role of citizens and how civics and citizenship relate), `SLO:GCCE-400-1-3` (distinguish active, participatory and digital citizenship; explain citizenship as a foundation of modern society) - traces to guide outcome 1.
- **Key terms**: Civics, Citizenship, Civic engagement, Active citizenship.
- **Topics**: 1.1 Week 1: introduction to civics; 1.2 Week 2: guide sections 2.1-2.3; 1.3 Week 3: guide sections 3.1-3.2.
- **Assessment blueprint**: formative 9 items, 3 per topic (`D-2026-0072`) (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to classify five described actions by a Pakistani citizen as active, participatory or digital citizenship and justify each. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | Week 1 (`:118`) | 1.1 | Definition and concept of civics |
| U1-02 | Week 1 (`:119`) | 1.1 | Historical evolution of civic participation |
| U1-03 | Week 1 (`:120`) | 1.1 | Civic engagements |
| U1-04 | 2.1 (`:122`) | 1.2 | Definition and concept of citizenship |
| U1-05 | 2.2 (`:123`) | 1.2 | Changing role of citizens |
| U1-06 | 2.3 (`:124`) | 1.2 | Relationship between civics and citizenship |
| U1-07 | 3.1 (`:126`) | 1.3 | Active, participatory and digital citizenship |
| U1-08 | 3.2 (`:127`) | 1.3 | Foundation of modern society and citizenship |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | What civics is and how civic participation grew | U1-01, U1-02, U1-03 | 8-12 | fig-U1-1: timeline, fig-U1-2: concept-map |
| 1.2 | Citizenship and the changing role of citizens | U1-04, U1-05, U1-06 | 8-12 | fig-U1-3: diagram, fig-U1-4: table |
| 1.3 | Kinds of citizenship in a modern society | U1-07, U1-08 | 8-12 | fig-U1-5: table, fig-U1-6: diagram |

**Depth budget**: 8 sub-topics; 3 topics; 30-45 reading-min.

**Prerequisite knowledge**: `GSOS-301` Social Science (Semester 2) and `GPKS-402` Pakistan Studies (Semester 2) for society, state and Pakistan's political history. This is the opening unit of the course.

**Common misconceptions**: "citizenship is only a legal status shown by an identity card"; "civic duty means voting and nothing else"; "civics is the same subject as politics".

**Mapped readings**: unesco-2015-gced, dean-2005-citizenship, ahmad-2004-cice, glencoe-civics-today, kymlicka-norman-2000.

**Figure plan**:
  - fig-U1-1 - `timeline` - milestones of civic participation from early assemblies to universal adult franchise in Pakistan (the unit's required schematic) (Topic 1.1)
  - fig-U1-2 - `concept-map` - forms of civic engagement: voting, volunteering, community work, public debate, peaceful protest (Topic 1.1)
  - fig-U1-3 - `diagram` - civics (knowledge of how society is governed) feeding citizenship (membership, rights, duties, participation) (Topic 1.2)
  - fig-U1-4 - `table` - the citizen's role then and now: subject, voter, participant, digital participant (Topic 1.2)
  - fig-U1-5 - `table` - active, participatory and digital citizenship compared with one Pakistani example each (Topic 1.3)
  - fig-U1-6 - `diagram` - citizenship as a foundation of modern society: law, rights, participation, shared identity (Topic 1.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; at least 1 per topic plus integrative items (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: State, Government and Civil Society

Guide Unit #2, Weeks 4-5 (`:128-136`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-02/`.

- **CLO/SLO refs**: `SLO:GCCE-400-2-1` (explain the concept of the state; describe the structure and functions of government in Pakistan), `SLO:GCCE-400-2-2` (define civil society; explain how democracy and civil society depend on each other; argue the importance of political participation and representation) - traces to guide outcome 1.
- **Key terms**: State, Government, Federation, Civil society, Representation.
- **Topics**: 2.1 Week 4: guide sections 4.1-4.3; 2.2 Week 5: guide sections 5.1-5.3.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to judge, with evidence, how far a named Pakistani civil-society organisation strengthens representation. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | 4.1 (`:130`) | 2.1 | Concept of state |
| U2-02 | 4.2 (`:131`) | 2.1 | Structure of government in Pakistan (federal, provincial, local) |
| U2-03 | 4.3 (`:132`) | 2.1 | Functions of government |
| U2-04 | 5.1 (`:134`) | 2.2 | Meaning of civil society |
| U2-05 | 5.2 (`:135`) | 2.2 | Relationship between democracy and civil society |
| U2-06 | 5.3 (`:136`) | 2.2 | Importance of political participation and representation |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | The state and the government of Pakistan | U2-01, U2-02, U2-03 | 10-14 | fig-U2-1: diagram, fig-U2-2: flowchart |
| 2.2 | Civil society, democracy and participation | U2-04, U2-05, U2-06 | 10-14 | fig-U2-3: concept-map, fig-U2-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 25-40 reading-min.

**Prerequisite knowledge**: Unit 1.

**Common misconceptions**: "the state and the government are the same thing"; "civil society means only NGOs"; "one vote makes no difference, so participation does not matter".

**Mapped readings**: constitution-pakistan, batool-2019-civil-society, ahmad-2004-cice, youniss-levine-2009, glencoe-civics-today.

**Figure plan**:
  - fig-U2-1 - `diagram` - the four elements of a state: population, territory, government, sovereignty (Topic 2.1)
  - fig-U2-2 - `flowchart` - tiers of government in Pakistan (federal, provincial, local) and how a law is made, from the Constitution's Parts III and IV (the unit's required schematic) (Topic 2.1)
  - fig-U2-3 - `concept-map` - civil society between the family, the market and the state: associations, media, unions, community groups (Topic 2.2)
  - fig-U2-4 - `table` - forms of political participation with what each asks of a citizen (Topic 2.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: Rights and Responsibilities

Guide Unit #3 "Right and Responsibilities", Weeks 6-7 (`:138-144`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-03/`.

- **CLO/SLO refs**: `SLO:GCCE-400-3-1` (explain fundamental rights and liberties; locate them in the Constitution of Pakistan 1973), `SLO:GCCE-400-3-2` (describe the duties of citizens; explain responsibilities in a democratic society) - traces to guide outcome 1.
- **Key terms**: Fundamental rights, Liberty, Constitution, Civic duty.
- **Topics**: 3.1 Week 6: guide sections 6.1-6.2; 3.2 Week 7: guide sections 7.1-7.2.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze item asking the learner to identify which constitutional right is at stake in each of four short school and community scenarios and the duty that balances it. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | 6.1 (`:140`) | 3.1 | Fundamental rights and liberties |
| U3-02 | 6.2 (`:141`) | 3.1 | Constitution of Pakistan (1973) |
| U3-03 | 7.1 (`:143`) | 3.2 | Duties of citizens |
| U3-04 | 7.2 (`:144`) | 3.2 | Responsibilities in a democratic society |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Fundamental rights in the Constitution of 1973 | U3-01, U3-02 | 12-16 | fig-U3-1: table, fig-U3-2: timeline |
| 3.2 | The citizen's duties and responsibilities | U3-03, U3-04 | 10-14 | fig-U3-3: concept-map, fig-U3-4: diagram |

**Depth budget**: 4 sub-topics; 2 topics; 25-40 reading-min.

**Prerequisite knowledge**: Unit 2.

**Common misconceptions**: "rights are unlimited"; "rights come from the government's goodwill and can be withdrawn at will"; "duties apply only to government servants".

**Mapped readings**: constitution-pakistan, dean-2005-citizenship, ahmad-2004-cice, glencoe-civics-today.

**Figure plan**:
  - fig-U3-1 - `table` - selected fundamental rights (Articles 8-28) with article number and a plain-language meaning (Topic 3.1)
  - fig-U3-2 - `timeline` - Pakistan's constitutions and major amendments: 1956, 1962, 1973 and later amendments, each date checked against the current text (the unit's required schematic) (Topic 3.1)
  - fig-U3-3 - `concept-map` - duties of a citizen: loyalty to the state (Article 5), obeying the law, paying taxes, voting, respecting others' rights (Topic 3.2)
  - fig-U3-4 - `diagram` - rights and responsibilities as two sides of one balance (Topic 3.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: Ethics and Community Engagement

Guide Unit #4, Weeks 8-9 (`:145-153`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-04/`.

- **CLO/SLO refs**: `SLO:GCCE-400-4-1` (explain accountability, non-violence and the ethics of civic engagement), `SLO:GCCE-400-4-2` (describe the concept, nature and development of community; compare approaches to community engagement; analyse a community-driven initiative; explain how school and community support each other) - traces to guide outcome 2.
- **Key terms**: Accountability, Non-violence, Community, Community development, Social cohesion.
- **Topics**: 4.1 Week 8: ethics in civic engagement; 4.2 Week 9: community engagement, plus the derived school-community sub-topic.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create item asking the learner to plan a small parent-and-community engagement activity for a primary school, naming its ethical safeguards. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | Week 8 (`:147`) | 4.1 | Accountability |
| U4-02 | Week 8 (`:148`) | 4.1 | Non-violence |
| U4-03 | Week 8 (`:149`) | 4.1 | Ethical considerations in civic engagement |
| U4-04 | Week 9 (`:151`) | 4.2 | Concept, nature and characteristics of community and its development |
| U4-05 | Week 9 (`:152`) | 4.2 | Approaches to effective community engagement and social cohesion |
| U4-06 | Week 9 (`:153`) | 4.2 | Case studies of successful community-driven initiatives (Orangi Pilot Project) |
| U4-07 | derived: outcome 2; licence objectives E-1, E-3 and CRQ 10 (`D-2026-0053` item 4) | 4.2 | The school as a community institution: school-community relationship and parental involvement |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | Ethics in civic engagement | U4-01, U4-02, U4-03 | 10-14 | fig-U4-1: concept-map, fig-U4-2: table |
| 4.2 | Communities, engagement and the school | U4-04, U4-05, U4-06, U4-07 | 14-18 | fig-U4-3: flowchart, fig-U4-4: diagram, fig-U4-5: timeline |

**Depth budget**: 7 sub-topics; 2 topics; 25-40 reading-min.

**Prerequisite knowledge**: Units 1-3.

**Common misconceptions**: "a community is just the people who live in one place"; "community development is the government's job alone"; "parents in low-income areas are not interested in their children's schooling".

**Mapped readings**: hasan-2006-orangi, unesco-2015-gced, youniss-levine-2009.

**Figure plan**:
  - fig-U4-1 - `concept-map` - ethical civic engagement: accountability, non-violence, honesty, respect, inclusion (Topic 4.1)
  - fig-U4-2 - `table` - ethical and unethical ways of pursuing the same civic aim (Topic 4.1)
  - fig-U4-3 - `flowchart` - a cycle of community engagement: identify a need, mobilise, plan together, act, review (the unit's required schematic) (Topic 4.2)
  - fig-U4-4 - `diagram` - links between school and community: parents, school management committees, local organisations, local government (Topic 4.2)
  - fig-U4-5 - `timeline` - the Orangi Pilot Project from 1980 and its spread beyond Orangi, dates taken from hasan-2006-orangi (Topic 4.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 5: Advocacy and Activism

Guide Unit #5, Week 10 (`:154-158`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-05/`.

- **CLO/SLO refs**: `SLO:GCCE-400-5-1` (explain public discourse and how public opinion forms), `SLO:GCCE-400-5-2` (explain how advocacy addresses social issues), `SLO:GCCE-400-5-3` (describe social action movements and how they bring change) - traces to guide outcomes 1 and 2.
- **Key terms**: Public opinion, Public discourse, Advocacy, Social movement.
- **Topics**: one per guide section: 5.1 = 10.1; 5.2 = 10.2; 5.3 = 10.3.
- **Assessment blueprint**: formative 9 items, 3 per topic (`D-2026-0072`) (Remember/Understand/Apply); summative includes one Create item asking the learner to draft a short, non-violent advocacy plan for a local education issue (aim, audience, message, channel). Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | 10.1 (`:156`) | 5.1 | Public discourse and public opinion |
| U5-02 | 10.2 (`:157`) | 5.2 | Role of advocacy in addressing social issues |
| U5-03 | 10.3 (`:158`) | 5.3 | Social action movements |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | Public discourse and public opinion | U5-01 | 8-12 | fig-U5-1: flowchart, fig-U5-2: table |
| 5.2 | Advocacy for social issues | U5-02 | 8-12 | fig-U5-3: flowchart, fig-U5-4: table |
| 5.3 | Social action movements | U5-03 | 8-12 | fig-U5-5: diagram, fig-U5-6: timeline |

**Depth budget**: 3 sub-topics; 3 topics; 25-40 reading-min.

**Prerequisite knowledge**: Units 2 and 4.

**Common misconceptions**: "advocacy means protesting"; "public opinion is whatever trends on social media"; "social movements succeed or fail overnight".

**Mapped readings**: openstax-sociology-3e, batool-2019-civil-society, youniss-levine-2009.

**Figure plan**:
  - fig-U5-1 - `flowchart` - how public opinion forms: issue, information, discussion, opinion, influence on decisions (the unit's required schematic) (Topic 5.1)
  - fig-U5-2 - `table` - sources of public opinion (family, school, media, religious and community leaders) with strengths and risks (Topic 5.1)
  - fig-U5-3 - `flowchart` - steps of an advocacy plan: issue, evidence, audience, message, action, review (Topic 5.2)
  - fig-U5-4 - `table` - advocacy, lobbying and protest compared (Topic 5.2)
  - fig-U5-5 - `diagram` - stages of a social movement (emergence, coalescence, bureaucratisation, decline), from openstax-sociology-3e section 21.2 (Topic 5.3)
  - fig-U5-6 - `timeline` - one documented Pakistani social action movement, dates and events taken from a bound source (Topic 5.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; at least 1 per topic plus integrative items (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 6: Digital Citizenship and Technology

Guide Unit #6, Week 11 (`:159-163`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-06/`.

- **CLO/SLO refs**: `SLO:GCCE-400-6-1` (describe how digital platforms are used for civic engagement), `SLO:GCCE-400-6-2` (apply cyber ethics to responsible social-media use), `SLO:GCCE-400-6-3` (analyse the access, usage, socioeconomic and geographic digital divides in Pakistan and their effect on citizenship) - traces to guide outcomes 1 and 3.
- **Key terms**: Digital citizenship, Cyber ethics, Misinformation, Digital divide.
- **Topics**: one per guide section: 6.1 = 11.1; 6.2 = 11.2; 6.3 = 11.3.
- **Assessment blueprint**: formative 9 items, 3 per topic (`D-2026-0072`) (Remember/Understand/Apply); summative includes one Evaluate item asking the learner to judge the reliability of a social-media post about a public issue and decide whether to share it. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U6-01 | 11.1 (`:161`) | 6.1 | The use of digital platforms for civic engagement |
| U6-02 | 11.2 (`:162`) | 6.2 | Cyber ethics and responsible use of social media |
| U6-03 | 11.3 (`:163`) | 6.3 | Digital divides (access, usage, socioeconomic, geographic) and their impacts on citizenship |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 6.1 | Digital platforms and civic engagement | U6-01 | 8-12 | fig-U6-1: concept-map, fig-U6-2: table |
| 6.2 | Cyber ethics and responsible social media | U6-02 | 8-12 | fig-U6-3: flowchart, fig-U6-4: table |
| 6.3 | Digital divides and citizenship in Pakistan | U6-03 | 8-12 | fig-U6-5: diagram, fig-U6-6: table |

**Depth budget**: 3 sub-topics; 3 topics; 25-40 reading-min.

**Prerequisite knowledge**: `GICT-300` Applications of ICT (Semester 1); Units 1 and 5.

**Common misconceptions**: "anything posted online is private"; "sharing is not the same as saying it, so I am not responsible"; "everyone in Pakistan now has internet access".

**Mapped readings**: coe-2019-dce, shair-2022-digital-divide, mattson-2017.

**Figure plan**:
  - fig-U6-1 - `concept-map` - digital civic engagement: e-petitions, citizen portals, online campaigns, community groups (Topic 6.1)
  - fig-U6-2 - `table` - opportunities and risks of digital platforms for civic participation (Topic 6.1)
  - fig-U6-3 - `flowchart` - before you share: check source, check date, check evidence, consider harm, then decide (the unit's required schematic) (Topic 6.2)
  - fig-U6-4 - `table` - responsible and irresponsible online behaviour, with the ethical principle each shows (Topic 6.2)
  - fig-U6-5 - `diagram` - four kinds of digital divide: access, usage, socioeconomic, geographic (Topic 6.3)
  - fig-U6-6 - `table` - barriers to ICT use in Pakistan as reported in shair-2022-digital-divide (Topic 6.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; at least 1 per topic plus integrative items (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 7: Diversity, Inclusion and Social Justice

Guide Unit #7, Week 12 (`:164-169`). Unit Spec (G1) for `docs/semester-4/gcce-400/unit-07/`.

- **CLO/SLO refs**: `SLO:GCCE-400-7-1` (describe ethnic, cultural, economic and political diversity in Pakistani society), `SLO:GCCE-400-7-2` (explain the engagement of youth, women and minorities in social development), `SLO:GCCE-400-7-3` (analyse social inequalities and injustices in Pakistan and ways of addressing them), `SLO:GCCE-400-7-4` (propose ways to promote inclusive citizenship and equal rights) - traces to guide outcome 3.
- **Key terms**: Diversity, Inclusion, Minority, Social justice, Equal rights.
- **Topics**: one per guide section: 7.1 = 12.1; 7.2 = 12.2; 7.3 = 12.3; 7.4 = 12.4.
- **Assessment blueprint**: formative 12 items, 3 per topic (extends `D-2026-0072` to a four-topic unit; see drafting note 4) (Remember/Understand/Apply); summative includes one Create item asking the learner to design one classroom routine that makes every pupil, whatever their background, feel included, with a justification from the unit. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U7-01 | 12.1 (`:166`) | 7.1 | Understanding diversity in society (ethnic, cultural, economic, political) |
| U7-02 | 12.2 (`:167`) | 7.2 | Youth, women and minorities' engagement in social development |
| U7-03 | 12.3 (`:168`) | 7.3 | Addressing social inequalities and injustices in Pakistan |
| U7-04 | 12.4 (`:169`) | 7.4 | Promoting inclusive citizenship and equal rights for societal harmony and peaceful coexistence |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 7.1 | Diversity in Pakistani society | U7-01 | 8-12 | fig-U7-1: concept-map, fig-U7-2: table |
| 7.2 | Youth, women and minorities in social development | U7-02 | 8-12 | fig-U7-3: table, fig-U7-4: diagram |
| 7.3 | Inequality and injustice, and responses to them | U7-03 | 8-12 | fig-U7-5: table, fig-U7-6: flowchart |
| 7.4 | Inclusive citizenship and equal rights | U7-04 | 8-12 | fig-U7-7: diagram, fig-U7-8: table |

**Depth budget**: 4 sub-topics; 4 topics; 35-50 reading-min.

**Prerequisite knowledge**: `EFMP-305` Inclusive Education (Semester 2); Units 3 and 4.

**Common misconceptions**: "diversity is a threat to national unity"; "equality means treating everyone in exactly the same way"; "minority rights are a favour granted by the majority".

**Mapped readings**: openstax-sociology-3e, constitution-pakistan, unesco-2015-gced, kymlicka-norman-2000.

**Figure plan**:
  - fig-U7-1 - `concept-map` - dimensions of diversity in Pakistan: language, ethnicity, religion, region, economic class, political view (Topic 7.1)
  - fig-U7-2 - `table` - Pakistan's major language groups with the province where each is mainly spoken, from a bound source (Topic 7.1)
  - fig-U7-3 - `table` - youth, women and minorities: one form of participation and one barrier each (Topic 7.2)
  - fig-U7-4 - `diagram` - constitutional safeguards for equal participation: Articles 25, 26, 27, 36 and 37, checked against the current text (Topic 7.2)
  - fig-U7-5 - `table` - forms of social inequality in Pakistan (education, income, gender, region) with an indicator for each (Topic 7.3)
  - fig-U7-6 - `flowchart` - from noticing an injustice to a civic response: evidence, dialogue, advocacy, legal remedy (the unit's required schematic) (Topic 7.3)
  - fig-U7-7 - `diagram` - equality and equity contrasted (Topic 7.4)
  - fig-U7-8 - `table` - practices that promote inclusive citizenship at home, in school and in the community (Topic 7.4)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Practical work plan

The practical credit (1-1) is met by the guide's four optional activities (`:170-176`). They are not units and add no checklist rows. Each unit's teacher notes may suggest one: community storytelling (Units 1, 7), community event planning (Unit 4), service-learning with a local organisation (Units 4, 5), cultural exchange activities (Unit 7). Any activity involving minors or community members follows the school's consent rules; none is marked against a fixed model response.

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Identity.** The extracted guide block has no title, code or credit line; the Scheme row supplies GCCE-400, 2 (1-1), General Education. The source `.docx` should be checked for a header the extraction lost.
2. **Twelve weeks, not sixteen.** The guide schedules Weeks 1-12 only. The spec does not invent Weeks 13-16; for a 1-1 course they may be practical weeks. Whether the remaining weeks need content is the owner's call.
3. **Assessment criteria from another course.** "Mid-term essay on a selected philosophical topic" and "extended essay applying philosophical concepts" (`:190-192`) do not fit this course; they look copied from a philosophy outline. The spec reads them as essays on civic topics. The evaluator should confirm or escalate.
4. **Topics are weeks in multi-week units, sections in one-week units.** `D-2026-0070` makes each topic one numbered section. Units 1-4 span two or three weeks whose sections are one-line items, so (as in `GUHQ-301`) each topic is a week. Units 5-7 are single weeks; there each numbered section is a topic, which keeps those units within the 25-40 minute budget. Unit 7 then has four topics and 12 formative items, beyond `D-2026-0072`, which rules only on three-topic units.
5. **Derived licence sub-topic.** U4-07 (school and community, parental involvement) is not in the guide. It is added under `D-2026-0053` item 4 because the licence blueprint maps "relationship between school and community" and CRQ 10 to this course and no other course carries them. If the owner does not want licence-driven additions here, U4-07 is removed and the blueprint's row E-3 becomes uncovered.
6. **Reading list.** Three of seven guide entries (Pike and Selby; Feldpausch and Omilian; Clarke and Steckel) could not be found outside copies of the HEC model outline and are not bound. Of the four that exist, `glencoe-civics-today` is a United States school text; units use it only for general concepts, and Pakistan's own institutions are taught from the Constitution.
7. **Constitution currency.** The bound National Assembly PDF runs to the Twentieth Amendment (2012). Any article quoted must be checked against the current text; fig-U3-2 and fig-U7-4 require that check.
8. **Sensitive content.** Units 5 and 7 touch on protest, minorities and injustice in Pakistan. Content stays descriptive and sourced, presents more than one perspective where views differ, and names no living private individual.
