---
course_code: GISS-401
status: draft
open_access_floor:
  default: 1
---

# GISS-401 - Islamic Studies - Content Spec

Semester 3, General Education, 2 (2-0) credit hours. Source: `Scheme-and-Course-guides/extracted-text/3rd 2026.txt` lines 389-474; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III row 2 ("GISS - 401", with GETH-401 Ethics for non-Muslims as its alternative).

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "GISS-401", "title_en": "Islamic Studies", "title_ur": "اسلامیات", "credit_hours": "2 (2-0)", "category": "General Education"}` in Semester 3. GETH-401 is the Scheme's alternative for non-Muslim students; it has its own guide block (`:476-562`) and would be a separate course entry and spec.

## Course-wide items

- **Course Objectives (guide, verbatim, `3rd 2026.txt:401-406`)**:
  1. Understand the basic beliefs and teachings of Islam
  2. Explain the sources of Islamic law and guidance
  3. Apply Islamic ethical values in daily and professional life
  4. Understand the Islamic social system and its relevance today
  5. Promote tolerance, peace, and moral development through education
- **Teaching strategies**: none listed in the guide beyond the weekly breakdown; Week 16 includes student presentations and discussions (`:469`).
- **Assessment criteria**: none given in the guide; the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Practical work**: none listed in the guide.
- **Recommended resources**: see `## Reading list` below (cited by reference only, never reproduced - Constitution Art. III.5). Qur'anic verses and hadith are cited by reference (surah:ayah; collection and number), with short quotations of the text in translation only where the unit needs them.

## Course Description

From the course guide (paraphrased, `:399-400`): the course gives students a full understanding of Islamic beliefs, teachings, moral values and social system. It stresses applying Islamic principles in personal, social and professional life, especially in education, and highlights the role of Islam in character building, social harmony and national development in Pakistan.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2; for this course the Qur'an translation online is the floor source every unit shares, and scholarly open-access articles are added where a sound one was found.

### Guide-required (`:470-474`)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| quran-translation | *The Holy Qur'an* (translation and tafseer). Text and English translations at Quran.com. | https://quran.com | 1-7 | open access, HTTP 200 on 2026-10-31. The guide names no translation or tafseer; units cite by surah and ayah and name the translation they quote |
| sahih-bukhari-muslim | *Sahih al-Bukhari* and *Sahih Muslim* (selected ahadith). Online at Sunnah.com. | https://sunnah.com/bukhari ; https://sunnah.com/muslim | 2 | the two most-cited hadith collections; Sunnah.com returned HTTP 403 to this host on 2026-10-31 (`D-2026-0001`). Units cite by collection and hadith number |
| islami-nazriya-e-hayat | *Islami Nazriya-e-Hayat* ("HEC Recommended", as printed). | (print, Urdu) | 1, 4, 6 | **not found in Open Library**; the guide gives no author or publisher. Commonly attributed to a University of Karachi textbook edited by Khurshid Ahmad; that attribution is unverified here. Title-level support only |
| maududi-towards-understanding | Maududi, S. A. A. *Towards Understanding Islam.* | (print; many editions) | 1, 2, 3 | Open Library OL12324456W (UK Islamic Mission, 1960) and OL8313410W (Kazi, 1980, ISBN 9780933511798); English rendering of *Risala-e-Diniyat*. Title-level support (`D-2026-0001`) |

### Author-selected (open access)

Verified real works chosen for relevance to the guide's objectives (`D-2026-0053` item 2), each checked against Crossref and OpenAlex on 2026-10-31.

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| mudawam-2021-usul | Mudawam, S. (2021). The usul al-fiqh approach on the understanding of Islamic law in contemporary era: Source and contextualization. *Asy-Syir'ah: Jurnal Ilmu Syari'ah dan Hukum*, 55(2), 315. | https://doi.org/10.14421/ajish.v55i2.1004 | 2 | the sources of Islamic law and how they are applied; OpenAlex W4380674929 (diamond OA) |
| sutomo-2014-akhlaq | Sutomo, I. (2014). Modification of character education into akhlaq education for the global community life. *Indonesian Journal of Islam and Muslim Societies*, 4(2), 291-316. | https://doi.org/10.18326/ijims.v4i2.291-316 | 3 | akhlaq as character education; OpenAlex W2596245887 (gold OA) |
| abdel-salam-2015-democracy | Abdel Salam, E. F. (2015). The questions of compatibility between Islam, democracy and secularism. *TAFHIM: IKIM Journal of Islam and the Contemporary World*, 1(3), 107-127. | https://doi.org/10.56389/tafhim.vol1no3.6 | 4, 5 | the scholarly debate on Islam and democracy; OpenAlex W2621401696 (diamond OA) |
| rahman-2020-zakat | Rahman, A., & Siradjuddin, S. (2020). Islamic economic concept in poverty alleviation. *Journal of Asian Multicultural Research for Economy and Management Study*, 1(2), 67-74. | https://doi.org/10.47616/jamrems.v1i2.68 | 5 | zakat and the Islamic economic approach to poverty; OpenAlex W3115899813 (diamond OA) |
| bhat-2019-education | Bhat, A. M. (2019). Islamic philosophy of education. *Journal of Culture and Values in Education*, 2(2), 73-76. | https://doi.org/10.46303/jcve.02.02.5 | 6 | knowledge and education in Islam; OpenAlex W3028482776 (diamond OA) |
| tambak-2020-teachers | Tambak, S., & Sukenti, D. (2020). Strengthening Islamic behavior and Islamic psychosocial in developing professional madrasah teachers. *Jurnal Cakrawala Pendidikan*, 39(1), 65-78. | https://doi.org/10.21831/cp.v39i1.26001 | 7 | Islamic values in teachers' professional conduct; OpenAlex W3003291306 (gold OA) |

## Week schedule

The guide gives a 16-week table with a title for each week (`:407-469`) and no unit headings. Units below group consecutive weeks; each topic is one guide week. The grouping is the drafter's construction, as for GPKS-402 (`D-2026-0053` item 1; `D-2026-0070` item 1 permits grouping where the guide gives only weeks).

| Week(s) | Unit | Topics (one per week) |
|---|---|---|
| 1-2 | Unit 1 - Introduction to Islamic Studies and the Fundamental Beliefs of Islam | 1.1 Week 1; 1.2 Week 2 |
| 3-5 | Unit 2 - Sources of Islamic Knowledge: the Qur'an and the Sunnah | 2.1 Week 3; 2.2 Week 4; 2.3 Week 5 |
| 6-7 | Unit 3 - Worship and the Moral System of Islam | 3.1 Week 6; 3.2 Week 7 |
| 8-9 | Unit 4 - The Social System and the State in Islam | 4.1 Week 8; 4.2 Week 9 |
| 10-11 | Unit 5 - The Economic and Political Systems of Islam | 5.1 Week 10; 5.2 Week 11 |
| 12-14 | Unit 6 - Islam, Education, Civilization and Contemporary Issues | 6.1 Week 12; 6.2 Week 13; 6.3 Week 14 |
| 15 | Unit 7 - Islamic Ethics in Professional Life | 7.1 Week 15 |
| 16 | (review and final assessment; no content) | - |

## Unit 1: Introduction to Islamic Studies and the Fundamental Beliefs of Islam

Weeks 1-2 (`3rd 2026.txt:408-415`). Unit Spec (G1) for `docs/semester-3/giss-401/unit-01/`.

- **CLO/SLO refs**: `SLO:GISS-401-1-1` (meaning and scope of Islamic Studies; importance of Islamic education; Islam as a complete code of life), `SLO:GISS-401-1-2` (Tauheed, Risalat, Akhirat and the articles of faith) - traces to guide objective 1.
- **Key terms**: Islamic Studies, Tauheed, Risalat, Akhirat.
- **Topics**: 1.1 Introduction to Islamic Studies (Week 1); 1.2 Fundamental beliefs of Islam (Aqaid) (Week 2).
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to explain how belief in Akhirat shapes a Muslim teacher's everyday conduct. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | Week 1 (`:409`) | 1.1 | Meaning and scope of Islamic Studies |
| U1-02 | Week 1 (`:410`) | 1.1 | Importance of Islamic education |
| U1-03 | Week 1 (`:411`) | 1.1 | Islam as a complete code of life |
| U1-04 | Week 2 (`:413`) | 1.2 | Concept of Tauheed |
| U1-05 | Week 2 (`:414`) | 1.2 | Risalat and Akhirat |
| U1-06 | Week 2 (`:415`) | 1.2 | Articles of faith |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | What Islamic Studies is | U1-01, U1-02, U1-03 | 12-17 | fig-U1-1: concept-map, fig-U1-2: table |
| 1.2 | The fundamental beliefs of Islam | U1-04, U1-05, U1-06 | 12-17 | fig-U1-3: table, fig-U1-4: diagram |

**Depth budget**: 6 sub-topics; 2 topics; 40-55 reading-min.

**Prerequisite knowledge**: HSC-level Islamiat. This is the opening unit of the course.

**Common misconceptions**: "Islamic Studies is only about rituals"; "Tauheed only means believing that God exists"; "belief has no link to daily conduct".

**Mapped readings**: quran-translation, maududi-towards-understanding, islami-nazriya-e-hayat.

**Figure plan**:
  - fig-U1-1 - `concept-map` - Islam as a complete code of life: belief, worship, morals, society, economy, state (the unit's required schematic) (Topic 1.1)
  - fig-U1-2 - `table` - branches of Islamic Studies with what each studies (Topic 1.1)
  - fig-U1-3 - `table` - the articles of faith, each with its meaning and a Qur'anic reference (Topic 1.2)
  - fig-U1-4 - `diagram` - Tauheed, Risalat and Akhirat as the three foundations of belief (Topic 1.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: Sources of Islamic Knowledge: the Qur'an and the Sunnah

Weeks 3-5 (`:416-427`). Unit Spec (G1) for `docs/semester-3/giss-401/unit-02/`.

- **CLO/SLO refs**: `SLO:GISS-401-2-1` (the sources of Islamic knowledge: Qur'an, Hadith and Sunnah, Ijma and Qiyas), `SLO:GISS-401-2-2` (the Qur'an as guidance; the importance, classification and role of Hadith and Sunnah) - traces to guide objective 2.
- **Key terms**: Qur'an, Sunnah, Ijma, Qiyas.
- **Topics**: 2.1 Sources of Islamic knowledge (Week 3); 2.2 The Holy Qur'an (Week 4); 2.3 Hadith and Sunnah (Week 5).
- **Assessment blueprint**: formative 9 items, 3 per topic (D-2026-0072) (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to show how Ijma or Qiyas is used when the Qur'an and Sunnah do not state a ruling directly. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | Week 3 (`:417`) | 2.1 | The Holy Qur'an as a source |
| U2-02 | Week 3 (`:418`) | 2.1 | Hadith and Sunnah as a source |
| U2-03 | Week 3 (`:419`) | 2.1 | Ijma and Qiyas |
| U2-04 | Week 4 (`:421`) | 2.2 | Introduction to the Qur'an |
| U2-05 | Week 4 (`:422`) | 2.2 | The Qur'an as a source of guidance |
| U2-06 | Week 4 (`:423`) | 2.2 | Selected Qur'anic verses (theme-based study) |
| U2-07 | Week 5 (`:425`) | 2.3 | Importance of Hadith |
| U2-08 | Week 5 (`:426`) | 2.3 | Classification of Hadith |
| U2-09 | Week 5 (`:427`) | 2.3 | Role of Sunnah in Islamic life |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | The sources of Islamic knowledge | U2-01, U2-02, U2-03 | 12-17 | fig-U2-1: diagram, fig-U2-2: table |
| 2.2 | The Holy Qur'an | U2-04, U2-05, U2-06 | 12-17 | fig-U2-3: table, fig-U2-4: diagram |
| 2.3 | Hadith and Sunnah | U2-07, U2-08, U2-09 | 12-17 | fig-U2-5: flowchart, fig-U2-6: table |

**Depth budget**: 9 sub-topics; 3 topics; 55-75 reading-min.

**Prerequisite knowledge**: Unit 1.

**Common misconceptions**: "Hadith and Sunnah are exactly the same thing"; "every reported hadith carries equal authority"; "Ijma and Qiyas can override the Qur'an".

**Mapped readings**: quran-translation, sahih-bukhari-muslim, mudawam-2021-usul, maududi-towards-understanding.

**Figure plan**:
  - fig-U2-1 - `diagram` - the four sources in order of authority: Qur'an, Sunnah, Ijma, Qiyas (Topic 2.1)
  - fig-U2-2 - `table` - each source with its definition and an example of its use (Topic 2.1)
  - fig-U2-3 - `table` - selected verses by theme (knowledge, justice, kindness, honesty) with their references (Topic 2.2)
  - fig-U2-4 - `diagram` - structure of the Qur'an: surahs, ayat, Makki and Madani (Topic 2.2)
  - fig-U2-5 - `flowchart` - how a hadith is assessed: chain (isnad), text (matn), grade (sahih, hasan, daif) (the unit's required schematic) (Topic 2.3)
  - fig-U2-6 - `table` - hadith grades with what each means for use (Topic 2.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 1 per topic (2.1, 2.2, 2.3) plus 2 integrative (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: Worship and the Moral System of Islam

Weeks 6-7 (`:428-434`). Unit Spec (G1) for `docs/semester-3/giss-401/unit-03/`.

- **CLO/SLO refs**: `SLO:GISS-401-3-1` (Salat, Zakat, Saum and Hajj, their objectives and social significance), `SLO:GISS-401-3-2` (moral values; truthfulness, justice, honesty, patience; character building) - traces to guide objectives 3, 5.
- **Key terms**: Ibadat, Akhlaq, Sabr, Character building.
- **Topics**: 3.1 Islamic worship (Ibadat) (Week 6); 3.2 Islamic moral and ethical system (Akhlaq) (Week 7).
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to analyse how one act of worship builds a moral quality useful in the classroom. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | Week 6 (`:429`) | 3.1 | Salat, Zakat, Saum and Hajj |
| U3-02 | Week 6 (`:430`) | 3.1 | Objectives and social significance of Ibadat |
| U3-03 | Week 7 (`:432`) | 3.2 | Moral values in Islam |
| U3-04 | Week 7 (`:433`) | 3.2 | Truthfulness, justice, honesty and patience |
| U3-05 | Week 7 (`:434`) | 3.2 | Character building |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Islamic worship | U3-01, U3-02 | 12-17 | fig-U3-1: table, fig-U3-2: concept-map |
| 3.2 | The moral and ethical system of Islam | U3-03, U3-04, U3-05 | 12-17 | fig-U3-3: table, fig-U3-4: diagram |

**Depth budget**: 5 sub-topics; 2 topics; 40-55 reading-min.

**Prerequisite knowledge**: Unit 2.

**Common misconceptions**: "worship is a private matter with no social side"; "Zakat is the same as voluntary charity"; "good character comes only from knowing rules".

**Mapped readings**: quran-translation, sutomo-2014-akhlaq, maududi-towards-understanding.

**Figure plan**:
  - fig-U3-1 - `table` - the four acts of worship with their requirement, objective and social benefit (Topic 3.1)
  - fig-U3-2 - `concept-map` - Ibadat linking the individual, the family and society (the unit's required schematic) (Topic 3.1)
  - fig-U3-3 - `table` - four virtues with a Qur'anic or hadith basis and a school example (Topic 3.2)
  - fig-U3-4 - `diagram` - character building as a cycle: knowledge, practice, habit, character (Topic 3.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: The Social System and the State in Islam

Weeks 8-9 (`:435-441`). Unit Spec (G1) for `docs/semester-3/giss-401/unit-04/`.

- **CLO/SLO refs**: `SLO:GISS-401-4-1` (family system; rights and responsibilities; social justice and equality), `SLO:GISS-401-4-2` (the state system in Islam; the concept of democracy in Islam) - traces to guide objective 4.
- **Key terms**: Family system, Huquq ul-Ibad, Social justice, Islamic state.
- **Topics**: 4.1 Islamic social system (Week 8); 4.2 Concept of state and democracy in Islam (Week 9).
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Evaluate-level item asking the learner to assess one argument about Islam and democracy using the unit's sources. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | Week 8 (`:436`) | 4.1 | Family system in Islam |
| U4-02 | Week 8 (`:437`) | 4.1 | Rights and responsibilities |
| U4-03 | Week 8 (`:438`) | 4.1 | Social justice and equality |
| U4-04 | Week 9 (`:440`) | 4.2 | State system in Islam |
| U4-05 | Week 9 (`:441`) | 4.2 | Concept of democracy in Islam |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | The Islamic social system | U4-01, U4-02, U4-03 | 12-17 | fig-U4-1: concept-map, fig-U4-2: table |
| 4.2 | The state and democracy in Islam | U4-04, U4-05 | 12-17 | fig-U4-3: diagram, fig-U4-4: table |

**Depth budget**: 5 sub-topics; 2 topics; 40-55 reading-min.

**Prerequisite knowledge**: Unit 3.

**Common misconceptions**: "rights in Islam belong only to men"; "Islam and democracy are always in conflict"; "social justice means everyone gets the same".

**Mapped readings**: quran-translation, abdel-salam-2015-democracy, islami-nazriya-e-hayat.

**Figure plan**:
  - fig-U4-1 - `concept-map` - the family in Islam: rights and duties of parents, children, spouses and relatives (the unit's required schematic) (Topic 4.1)
  - fig-U4-2 - `table` - rights of Allah and rights of people with examples (Topic 4.1)
  - fig-U4-3 - `diagram` - foundations of the Islamic state: sovereignty of Allah, khilafat, consultation, justice (Topic 4.2)
  - fig-U4-4 - `table` - points where scholars see Islamic governance and democracy agree and differ (Topic 4.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 5: The Economic and Political Systems of Islam

Weeks 10-11 (`:442-450`). Unit Spec (G1) for `docs/semester-3/giss-401/unit-05/`.

- **CLO/SLO refs**: `SLO:GISS-401-5-1` (halal and haram; zakat and charity; prohibition of riba), `SLO:GISS-401-5-2` (Shura; justice and governance; rights of minorities) - traces to guide objectives 4, 5.
- **Key terms**: Halal, Riba, Shura, Rights of minorities.
- **Topics**: 5.1 Economic system of Islam (Week 10); 5.2 Political and administrative system of Islam (Week 11).
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to explain how Zakat and the prohibition of riba aim at a fairer economy. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | Week 10 (`:443`) | 5.1 | Concept of halal and haram |
| U5-02 | Week 10 (`:444`) | 5.1 | Zakat and charity |
| U5-03 | Week 10 (`:445`) | 5.1 | Prohibition of interest (riba) |
| U5-04 | Week 11 (`:448`) | 5.2 | Concept of Shura |
| U5-05 | Week 11 (`:449`) | 5.2 | Justice and governance |
| U5-06 | Week 11 (`:450`) | 5.2 | Rights of minorities |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | The economic system of Islam | U5-01, U5-02, U5-03 | 12-17 | fig-U5-1: flowchart, fig-U5-2: table |
| 5.2 | The political and administrative system of Islam | U5-04, U5-05, U5-06 | 12-17 | fig-U5-3: diagram, fig-U5-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 40-55 reading-min.

**Prerequisite knowledge**: Unit 4.

**Common misconceptions**: "halal and haram are only about food"; "any bank profit is riba"; "Shura means majority vote on everything"; "minorities have no rights in an Islamic state".

**Mapped readings**: quran-translation, rahman-2020-zakat, abdel-salam-2015-democracy.

**Figure plan**:
  - fig-U5-1 - `flowchart` - how Zakat moves wealth: who pays, how much, who receives (the unit's required schematic) (Topic 5.1)
  - fig-U5-2 - `table` - Zakat and voluntary charity (sadaqah) compared (Topic 5.1)
  - fig-U5-3 - `diagram` - Shura: the ruler consulting people of knowledge and the community (Topic 5.2)
  - fig-U5-4 - `table` - rights of minorities in Islamic teaching and in Pakistan's Constitution (Articles 20, 22, 36) (Topic 5.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 6: Islam, Education, Civilization and Contemporary Issues

Weeks 12-14 (`:451-462`). Unit Spec (G1) for `docs/semester-3/giss-401/unit-06/`.

- **CLO/SLO refs**: `SLO:GISS-401-6-1` (education in Islam; roles of teachers and learners; knowledge and wisdom), `SLO:GISS-401-6-2` (Muslim contributions to knowledge; Islamic civilization; Islam and human rights, peace, tolerance and modern challenges) - traces to guide objectives 4, 5.
- **Key terms**: Ilm, Hikmah, Islamic civilization, Tolerance.
- **Topics**: 6.1 Islam and education (Week 12); 6.2 Islam, culture and civilization (Week 13); 6.3 Islam and contemporary issues (Week 14).
- **Assessment blueprint**: formative 9 items, 3 per topic (D-2026-0072) (Remember/Understand/Apply); summative includes one Evaluate-level item asking the learner to judge how a teacher can use Islamic teaching on tolerance to address one modern challenge in school. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U6-01 | Week 12 (`:452`) | 6.1 | Importance of education in Islam |
| U6-02 | Week 12 (`:453`) | 6.1 | Role of teachers and learners in Islam |
| U6-03 | Week 12 (`:454`) | 6.1 | Knowledge and wisdom |
| U6-04 | Week 13 (`:456`) | 6.2 | Contributions of Muslims to knowledge |
| U6-05 | Week 13 (`:457`) | 6.2 | Islamic civilization |
| U6-06 | Week 13 (`:458`) | 6.2 | Science and education in Islam |
| U6-07 | Week 14 (`:460`) | 6.3 | Islam and human rights |
| U6-08 | Week 14 (`:461`) | 6.3 | Peace, tolerance and coexistence |
| U6-09 | Week 14 (`:462`) | 6.3 | Islam and modern challenges |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 6.1 | Islam and education | U6-01, U6-02, U6-03 | 12-17 | fig-U6-1: concept-map, fig-U6-2: table |
| 6.2 | Islamic culture and civilization | U6-04, U6-05, U6-06 | 12-17 | fig-U6-3: timeline, fig-U6-4: table |
| 6.3 | Islam and contemporary issues | U6-07, U6-08, U6-09 | 12-17 | fig-U6-5: table, fig-U6-6: diagram |

**Depth budget**: 9 sub-topics; 3 topics; 55-75 reading-min.

**Prerequisite knowledge**: Units 1-5.

**Common misconceptions**: "Islam discourages worldly knowledge"; "Muslim scholarship ended centuries ago"; "tolerance means giving up one's own beliefs".

**Mapped readings**: quran-translation, bhat-2019-education, islami-nazriya-e-hayat.

**Figure plan**:
  - fig-U6-1 - `concept-map` - knowledge in Islam: seeking, teaching, acting on and sharing it (the unit's required schematic) (Topic 6.1)
  - fig-U6-2 - `table` - duties of the teacher and the learner with a Qur'anic or hadith basis (Topic 6.1)
  - fig-U6-3 - `timeline` - landmarks of Muslim scholarship and learning centres from the 8th to the 15th century (Topic 6.2)
  - fig-U6-4 - `table` - Muslim scholars with their field and contribution (Topic 6.2)
  - fig-U6-5 - `table` - human rights in the Farewell Sermon and their modern counterparts (Topic 6.3)
  - fig-U6-6 - `diagram` - peaceful coexistence in a diverse Pakistani school (Topic 6.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 1 per topic (6.1, 6.2, 6.3) plus 2 integrative (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 7: Islamic Ethics in Professional Life

Week 15 (`:463-466`). Week 16 is review and final assessment (no content). Unit Spec (G1) for `docs/semester-3/giss-401/unit-07/`.

- **CLO/SLO refs**: `SLO:GISS-401-7-1` (ethical responsibilities of teachers; Islamic values in educational leadership; role modelling) - traces to guide objectives 3, 5.
- **Key terms**: Amanah, Professional ethics, Educational leadership, Role model.
- **Topics**: 7.1 Islamic ethics in professional life (Week 15).
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create-level item asking the learner to write a short personal code of professional conduct grounded in Islamic values. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U7-01 | Week 15 (`:464`) | 7.1 | Ethical responsibilities of teachers |
| U7-02 | Week 15 (`:465`) | 7.1 | Islamic values in educational leadership |
| U7-03 | Week 15 (`:466`) | 7.1 | Role modelling in education |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 7.1 | The Muslim teacher's professional ethics | U7-01, U7-02, U7-03 | 18-26 | fig-U7-1: concept-map, fig-U7-2: table, fig-U7-3: flowchart |

**Depth budget**: 3 sub-topics; 1 topic; 25-40 reading-min.

**Prerequisite knowledge**: Units 3 and 6.

**Common misconceptions**: "professional ethics is separate from religious ethics"; "leadership means authority, not service"; "pupils learn from what teachers say, not what they do".

**Mapped readings**: tambak-2020-teachers, quran-translation.

**Figure plan**:
  - fig-U7-1 - `concept-map` - the teacher's amanah: towards learners, colleagues, parents and the institution (the unit's required schematic) (Topic 7.1)
  - fig-U7-2 - `table` - Islamic values in leadership with a school decision that shows each (Topic 7.1)
  - fig-U7-3 - `flowchart` - an ethical decision in school: identify, consult principles, consult people, act, reflect (Topic 7.1)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; all on the one topic, >= 1 integrating it with earlier units (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Partition.** The guide gives weeks, not units; the seven-unit grouping is the drafter's (see `## Week schedule`). Every week is one topic and keeps its guide title.
2. **Religious content review.** Statements of belief, ritual and law in this course need review by a qualified scholar of Islamic Studies at G3, beyond the general reviewer; the spec flags this so the owner can arrange it.
3. **Reading list.** *Islami Nazriya-e-Hayat* has no author or publisher in the guide and was not found; the Qur'an is bound through an open online text because the guide names no translation.
4. **Open-access sources.** The scholarly open-access articles found for this course are mostly in smaller journals. They support context, not doctrine; doctrine is taken from the Qur'an and the hadith collections the guide names.
5. **GETH-401** is the Scheme's alternative to this course and needs its own spec.
6. **Single-topic Unit 7**, as Week 16 is review.
