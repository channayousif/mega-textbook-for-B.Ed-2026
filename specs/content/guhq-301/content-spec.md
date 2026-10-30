---
course_code: GUHQ-301
status: draft
open_access_floor:
  default: 1
---

# GUHQ-301 - Fehm-e-Quran - I (Understanding of the Holy Quran I) - Content Spec

Semester 3, General Education, 1 (0-1) credit hour (Scheme). Source: `Scheme-and-Course-guides/extracted-text/3rd 2026.txt` lines 119-224; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester III row 7 ("GUHQ - 301, Fehm-e-Quran - I, 1 (0-1)").

**Identity conflicts** (for intake; Article II.3 questions the drafter does not settle): the guide block (`:123-125`) gives code **GUHQ-401**, credit hours **03 (0-1)** and semester **2nd**; the Scheme gives **GUHQ-301**, **1 (0-1)** and Semester III. The guide's description also calls the course "Understanding of Quranic Arabic" (`:127`). This spec uses the Scheme's code, credits and semester, which the catalog note treats as the final authority, and the guide for content only.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; awaiting an owner ruling): `{"code": "GUHQ-301", "title_en": "Fehm-e-Quran - I", "title_ur": "فہمِ قرآن - I", "credit_hours": "1 (0-1)", "category": "General Education"}` in Semester 3.

## Course-wide items

- **Course Outcomes (guide, verbatim, `3rd 2026.txt:128-133`)**: after finishing this course, student-teachers will be able to:
  1. Understand the basics of Quranic Arabic
  2. Learn Quranic vocabulary and grammar
  3. Develop skills in reading and understanding Quranic text
  4. Interpret Quranic verses and surahs
- **Teaching strategies**: none listed; the description names reading, translation and interpretation exercises and recitation practice (`:127`).
- **Assessment criteria**: none given beyond "final assessment / presentation" in Week 16 (`:216`); the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Practical work**: the course is practical by credit (0-1); its exercises are listed week by week.
- **Recommended resources**: see `## Reading list` below. Qur'anic text is cited by surah and ayah; translations are quoted briefly and named.

## Course Description

From the course guide (paraphrased, `:127`): the course gives students an understanding of Arabic as it is used in the Holy Qur'an, so that they can read, understand and interpret the Qur'anic text. It covers the basics of Quranic Arabic (alphabet, vocabulary and grammar: sentence types, verb conjugation and noun declension) and the features of Quranic Arabic, and explores the historical and cultural context of the Qur'an, including the life of the Prophet Muhammad (PBUH) and the early Muslim community. Students work with the text through reading, translation and interpretation exercises and practise recitation.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2.

### Guide-listed (`:218-224`)

None of the six entries gives enough to identify one work and edition; all are print and mostly Urdu. Each was searched in Open Library on 2026-10-31 without a match, so all are title-level only (`D-2026-0001`).

| Key | Citation as printed | Units | Note |
|---|---|---|---|
| muallim-ul-quran | "Muallim Ul Quran (Vol 3) & related volumes"; and "Rahman, U. (2025). Muallimul Quran (Vols. 3-5). [Course Book]." | 1, 2, 3, 7 | two lines that appear to name the same course-book series; the 2025 entry is the only one with an author and year. Not found; treated as one key pending the owner's confirmation |
| fehm-ul-quran-urdu | "Fehmul Quran Urdu translations and commentaries (various authors/editions)" | 4 | a category, not a work |
| asbab-seerah-books | "Books on Asbab al-Nuzul (reasons of revelation) and Seerah texts" | 6 | a category, not a work |
| tafseer-talim-ul-quran | "Tafseer Talim-ul-Quran (2 Vols.). Maktaba-tul-Madinah" | 5 | not found; publisher as printed |
| mafhoom-al-quran | "Mafhoom-al-Quran (2nd ed.)" | - | no author is given, and more than one Urdu work carries a similar title, so the entry does not identify a work. No unit binds it until the owner names the intended work |

### Author-selected (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| quran-translation | *The Holy Qur'an*: Arabic text with English and Urdu translations and tafsir. Quran.com. | https://quran.com | 1, 4, 5, 6, 7 | open access, HTTP 200 on 2026-10-31; units name the translation they quote |
| quranic-arabic-corpus | Dukes, K., et al. *The Quranic Arabic Corpus: word by word grammar, syntax and morphology of the Holy Quran.* University of Leeds. | https://corpus.quran.com | 1, 2, 3, 4, 7 | open access, HTTP 200 on 2026-10-31; word-by-word morphology and syntax for every verse |
| dukes-2010-treebank | Dukes, K., Atwell, E., & Sharaf, A.-B. M. (2010). Syntactic annotation guidelines for the Quranic Arabic Dependency Treebank. *Proceedings of the Language Resources and Evaluation Conference (LREC 2010)*. ELRA. | https://doi.org/10.63317/5ca39mfekwbt (PDF: http://www.lrec-conf.org/proceedings/lrec2010/pdf/278_Paper.pdf) | 2, 3 | how the corpus labels Quranic grammar and sentence structure; OpenAlex W48549471 |
| kadir-2022-asbab | Abdul Kadir, N., Muhamed Ali, M. A., Md Ariffin, M. F., & Usman, A. H. (2022). The rules of interpretation: Review on asbab al-nuzul in Tafsir Al-Mishbah. *International Journal of Academic Research in Business and Social Sciences*, 12(6). | https://doi.org/10.6007/ijarbss/v12-i6/13322 | 5, 6 | asbab al-nuzul as a rule of interpretation; OpenAlex W4283369090 (diamond OA) |

## Week schedule

The guide gives seven numbered units with their weeks (`:134-217`); the schedule copies them. Following `D-2026-0070` item 1, there is one unit per guide unit. Inside each unit, **each topic is one guide week**, and the guide's numbered items (1.4, 2.1, 3.1, 5.1 and so on) are sub-topics; see `## Drafting notes for intake` for why topics are weeks here.

| Week(s) | Unit | Topics (one per week) |
|---|---|---|
| 1-2 | Unit 1 - Introduction to Quranic Arabic | 1.1 Week 1; 1.2 Week 2 |
| 3-6 | Unit 2 - Quranic Vocabulary and Grammar | 2.1 Week 3; 2.2 Week 4; 2.3 Week 5; 2.4 Week 6 |
| 7-8 | Unit 3 - Quranic Syntax and Sentence Structure | 3.1 Week 7; 3.2 Week 8 |
| 9-11 | Unit 4 - Reading and Understanding Quranic Text | 4.1 Week 9; 4.2 Week 10; 4.3 Week 11 |
| 12-13 | Unit 5 - Interpretation of Quranic Verses and Surahs | 5.1 Week 12; 5.2 Week 13 |
| 14 | Unit 6 - Historical and Cultural Context of the Quran | 6.1 Week 14 |
| 15-16 | Unit 7 - Integrated Practice and Application | 7.1 Weeks 15-16 |

## Unit 1: Introduction to Quranic Arabic

Guide Unit 01, Weeks 1-2 (`3rd 2026.txt:135-145`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-01/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-1-1` (why understanding the Qur'an matters; features of Quranic Arabic; how it differs from Classical Arabic), `SLO:GUHQ-301-1-2` (the alphabet and pronunciation; word formation; frequent expressions) - traces to guide outcome 1.
- **Key terms**: Quranic Arabic, Classical Arabic, Root (jadhr), Word pattern.
- **Topics**: 1.1 Week 1: importance, characteristics, Classical vs Quranic Arabic; 1.2 Week 2: guide sections 1.4-1.6.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to break three Qur'anic words into root and pattern and explain how the meaning follows. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | Unit 01, Week 1 (`:138`) | 1.1 | Importance of understanding the Qur'an |
| U1-02 | Unit 01, Week 1 (`:139`) | 1.1 | Characteristics of Quranic Arabic |
| U1-03 | Unit 01, Week 1 (`:140`) | 1.1 | Difference between Classical Arabic and Quranic Arabic |
| U1-04 | 1.4 (`:143`) | 1.2 | Arabic alphabet review and pronunciation (Quranic focus) |
| U1-05 | 1.5 (`:144`) | 1.2 | Word formation in Quranic Arabic |
| U1-06 | 1.6 (`:145`) | 1.2 | Frequently occurring Quranic expressions |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | Why Quranic Arabic, and what makes it distinct | U1-01, U1-02, U1-03 | 8-12 | fig-U1-1: table, fig-U1-2: concept-map |
| 1.2 | Letters, word formation and common expressions | U1-04, U1-05, U1-06 | 8-12 | fig-U1-3: diagram, fig-U1-4: flowchart |

**Depth budget**: 6 sub-topics; 2 topics; 25-40 reading-min.

**Prerequisite knowledge**: the ability to read the Qur'anic script (nazira), which most learners bring from school. This is the opening unit of the course.

**Common misconceptions**: "Quranic Arabic is the same as the Arabic spoken today"; "memorising the Qur'an means understanding it"; "Arabic words have no system and must each be learned alone".

**Mapped readings**: quranic-arabic-corpus, quran-translation, muallim-ul-quran.

**Figure plan**:
  - fig-U1-1 - `table` - Quranic and Classical Arabic compared on vocabulary, style and usage (Topic 1.1)
  - fig-U1-2 - `concept-map` - reasons for understanding the Qur'an in its own language: guidance, prayer, reflection, teaching (Topic 1.1)
  - fig-U1-3 - `diagram` - one three-letter root growing into a family of Qur'anic words (Topic 1.2)
  - fig-U1-4 - `flowchart` - from root to word: root, pattern, word, meaning (the unit's required schematic) (Topic 1.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: Quranic Vocabulary and Grammar

Guide Unit 02, Weeks 3-6 (`:146-164`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-02/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-2-1` (high-frequency vocabulary; parts of speech; nouns, number and pronouns), `SLO:GUHQ-301-2-2` (verbs and agreement; particles, negation and emphasis; grammar-based translation) - traces to guide outcome 2.
- **Key terms**: Ism, Fi'l, Harf, Mudari'.
- **Topics**: 2.1 Week 3: guide sections 2.1-2.3; 2.2 Week 4: guide sections 2.4-2.6; 2.3 Week 5: verbs; 2.4 Week 6: particles, negation, translation practice.
- **Assessment blueprint**: formative 12 items, 3 per topic (extends D-2026-0072 to a 4-topic unit; see `## Drafting notes for intake`) (Remember/Understand/Apply); summative includes one Apply-or-higher item asking the learner to translate a short verse word by word and label each word's part of speech, gender, number and tense. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | 2.1 (`:149`) | 2.1 | Common Quranic vocabulary (high-frequency words) |
| U2-02 | 2.2 (`:150`) | 2.1 | Parts of speech: noun, verb, particle |
| U2-03 | 2.3 (`:151`) | 2.1 | Vocabulary memorization techniques |
| U2-04 | 2.4 (`:154`) | 2.2 | Nouns: gender (masculine and feminine) |
| U2-05 | 2.5 (`:155`) | 2.2 | Number: singular, dual, plural |
| U2-06 | 2.6 (`:156`) | 2.2 | Pronouns in Quranic Arabic |
| U2-07 | Unit 02, Week 5 (`:158`) | 2.3 | Verbs: past (madi), present (mudari') and imperative (amr) |
| U2-08 | Unit 02, Week 5 (`:159`) | 2.3 | Subject-verb agreement |
| U2-09 | Unit 02, Week 5 (`:160`) | 2.3 | Common Quranic verb patterns |
| U2-10 | Unit 02, Week 6 (`:162`) | 2.4 | Particles and prepositions (huruf) |
| U2-11 | Unit 02, Week 6 (`:163`) | 2.4 | Negation and emphasis |
| U2-12 | Unit 02, Week 6 (`:164`) | 2.4 | Grammar-based translation practice |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | Core vocabulary and the parts of speech | U2-01, U2-02, U2-03 | 8-12 | fig-U2-1: table, fig-U2-2: diagram |
| 2.2 | Nouns: gender, number and pronouns | U2-04, U2-05, U2-06 | 8-12 | fig-U2-3: table, fig-U2-4: table |
| 2.3 | Verbs and agreement | U2-07, U2-08, U2-09 | 8-12 | fig-U2-5: table, fig-U2-6: flowchart |
| 2.4 | Particles, negation and emphasis | U2-10, U2-11, U2-12 | 8-12 | fig-U2-7: table, fig-U2-8: diagram |

**Depth budget**: 12 sub-topics; 4 topics; 40-60 reading-min.

**Prerequisite knowledge**: Unit 1.

**Common misconceptions**: "a dual is the same as a plural"; "Arabic verbs have no tense"; "particles are too small to matter for meaning".

**Mapped readings**: quranic-arabic-corpus, dukes-2010-treebank, muallim-ul-quran.

**Figure plan**:
  - fig-U2-1 - `table` - twenty high-frequency Qur'anic words with meaning and a verse where each appears (Topic 2.1)
  - fig-U2-2 - `diagram` - the three parts of speech (ism, fi'l, harf) with signs that identify each (Topic 2.1)
  - fig-U2-3 - `table` - one noun in singular, dual and plural, masculine and feminine (Topic 2.2)
  - fig-U2-4 - `table` - detached and attached pronouns with a Qur'anic example each (Topic 2.2)
  - fig-U2-5 - `table` - one root conjugated in past, present and imperative (Topic 2.3)
  - fig-U2-6 - `flowchart` - identifying a verb's tense from its form (the unit's required schematic) (Topic 2.3)
  - fig-U2-7 - `table` - common prepositions and particles with meaning and an example (Topic 2.4)
  - fig-U2-8 - `diagram` - how la, ma, lam and lan change a verb's meaning (Topic 2.4)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: Quranic Syntax and Sentence Structure

Guide Unit 03, Weeks 7-8 (`:165-174`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-03/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-3-1` (nominal and verbal sentences; components and word order), `SLO:GUHQ-301-3-2` (conditional sentences; the passive; syntax-based comprehension) - traces to guide outcomes 2, 3.
- **Key terms**: Jumlah ismiyyah, Jumlah fi'liyyah, Conditional sentence, Passive voice.
- **Topics**: 3.1 Week 7: guide sections 3.1-3.3; 3.2 Week 8: conditional, passive, comprehension.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to identify the sentence type and components in three verses and explain how word order affects meaning. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | 3.1 (`:168`) | 3.1 | Nominal sentences (jumlah ismiyyah) |
| U3-02 | 3.2 (`:169`) | 3.1 | Verbal sentences (jumlah fi'liyyah) |
| U3-03 | 3.3 (`:170`) | 3.1 | Sentence components and word order |
| U3-04 | Unit 03, Week 8 (`:172`) | 3.2 | Conditional sentences |
| U3-05 | Unit 03, Week 8 (`:173`) | 3.2 | Passive voice in Quranic Arabic |
| U3-06 | Unit 03, Week 8 (`:174`) | 3.2 | Syntax-based comprehension exercises |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | Nominal and verbal sentences | U3-01, U3-02, U3-03 | 8-12 | fig-U3-1: diagram, fig-U3-2: table |
| 3.2 | Conditional and passive sentences | U3-04, U3-05, U3-06 | 8-12 | fig-U3-3: flowchart, fig-U3-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 25-40 reading-min.

**Prerequisite knowledge**: Unit 2.

**Common misconceptions**: "every Arabic sentence starts with a verb"; "word order never changes meaning"; "the passive is rare in the Qur'an".

**Mapped readings**: quranic-arabic-corpus, dukes-2010-treebank, muallim-ul-quran.

**Figure plan**:
  - fig-U3-1 - `diagram` - a nominal and a verbal sentence parsed into their parts (Topic 3.1)
  - fig-U3-2 - `table` - nominal and verbal sentences compared with Qur'anic examples (Topic 3.1)
  - fig-U3-3 - `flowchart` - reading a conditional sentence: find the condition word, the condition, the result (the unit's required schematic) (Topic 3.2)
  - fig-U3-4 - `table` - active and passive forms of three verbs with a verse for each (Topic 3.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: Reading and Understanding Quranic Text

Guide Unit 04, Weeks 9-11 (`:175-189`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-04/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-4-1` (accurate reading; word-by-word translation; short verses), `SLO:GUHQ-301-4-2` (meaning-based translation; key words; verse connections; rukū'-level and thematic understanding) - traces to guide outcome 3.
- **Key terms**: Word-by-word translation, Meaning-based translation, Ruku', Theme.
- **Topics**: 4.1 Week 9: reading rules, word-by-word, short verses; 4.2 Week 10: meaning-based translation, key words, connections; 4.3 Week 11: rukū', themes, selected surahs.
- **Assessment blueprint**: formative 9 items, 3 per topic (D-2026-0072) (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to compare a word-by-word and a meaning-based translation of one passage and explain the differences. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | Unit 04, Week 9 (`:178`) | 4.1 | Rules for accurate reading of Quranic text |
| U4-02 | Unit 04, Week 9 (`:179`) | 4.1 | Word-by-word translation techniques |
| U4-03 | Unit 04, Week 9 (`:180`) | 4.1 | Understanding short verses |
| U4-04 | Unit 04, Week 10 (`:182`) | 4.2 | Meaning-based translation of selected verses |
| U4-05 | Unit 04, Week 10 (`:183`) | 4.2 | Identifying key words and phrases |
| U4-06 | Unit 04, Week 10 (`:184`) | 4.2 | Understanding verse connections |
| U4-07 | Unit 04, Week 11 (`:187`) | 4.3 | Paragraph-level comprehension (ruku') |
| U4-08 | Unit 04, Week 11 (`:188`) | 4.3 | Thematic understanding of passages |
| U4-09 | Unit 04, Week 11 (`:189`) | 4.3 | Practice with selected surahs |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | Reading accurately and translating word by word | U4-01, U4-02, U4-03 | 8-12 | fig-U4-1: flowchart, fig-U4-2: table |
| 4.2 | Translating for meaning | U4-04, U4-05, U4-06 | 8-12 | fig-U4-3: table, fig-U4-4: diagram |
| 4.3 | Passages and themes | U4-07, U4-08, U4-09 | 8-12 | fig-U4-5: concept-map, fig-U4-6: table |

**Depth budget**: 9 sub-topics; 3 topics; 35-55 reading-min.

**Prerequisite knowledge**: Units 2 and 3.

**Common misconceptions**: "one translation gives the whole meaning"; "each verse can be understood alone, without its neighbours"; "word-by-word translation is always the most accurate".

**Mapped readings**: quran-translation, quranic-arabic-corpus, fehm-ul-quran-urdu.

**Figure plan**:
  - fig-U4-1 - `flowchart` - word-by-word translation: read, split, look up, order, check (the unit's required schematic) (Topic 4.1)
  - fig-U4-2 - `table` - one short verse laid out word by word with meaning and grammar (Topic 4.1)
  - fig-U4-3 - `table` - word-by-word and meaning-based translations of the same verse side by side (Topic 4.2)
  - fig-U4-4 - `diagram` - how consecutive verses connect through a shared key word or theme (Topic 4.2)
  - fig-U4-5 - `concept-map` - one short surah's themes and how its verses support them (Topic 4.3)
  - fig-U4-6 - `table` - selected short surahs with their main theme and key words (Topic 4.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 1 per topic (4.1, 4.2, 4.3) plus 2 integrative (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 5: Interpretation of Quranic Verses and Surahs

Guide Unit 05, Weeks 12-13 (`:190-199`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-05/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-5-1` (introduction to tafsir; principles of interpretation; context and language), `SLO:GUHQ-301-5-2` (interpreting selected verses and short surahs; themes; moral and practical lessons) - traces to guide outcome 4.
- **Key terms**: Tafsir, Context (siyaq), Theme, Moral lesson.
- **Topics**: 5.1 Week 12: guide sections 5.1-5.3; 5.2 Week 13: guide sections 5.4-5.6.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Evaluate-level item asking the learner to weigh two short commentaries on one verse and explain which principles of interpretation each follows. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U5-01 | 5.1 (`:193`) | 5.1 | Introduction to tafsir |
| U5-02 | 5.2 (`:194`) | 5.1 | Principles of interpreting Quranic verses |
| U5-03 | 5.3 (`:195`) | 5.1 | Role of context and language |
| U5-04 | 5.4 (`:197`) | 5.2 | Interpretation of selected verses and short surahs |
| U5-05 | 5.5 (`:198`) | 5.2 | Identifying main themes and messages |
| U5-06 | 5.6 (`:199`) | 5.2 | Moral and practical lessons |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 5.1 | Principles of tafsir | U5-01, U5-02, U5-03 | 8-12 | fig-U5-1: diagram, fig-U5-2: table |
| 5.2 | Interpreting selected verses and short surahs | U5-04, U5-05, U5-06 | 8-12 | fig-U5-3: flowchart, fig-U5-4: table |

**Depth budget**: 6 sub-topics; 2 topics; 25-40 reading-min.

**Prerequisite knowledge**: Unit 4.

**Common misconceptions**: "anyone can interpret a verse from its translation alone"; "context does not affect meaning"; "tafsir is only for scholars and has no place in a classroom".

**Mapped readings**: quran-translation, kadir-2022-asbab, tafseer-talim-ul-quran.

**Figure plan**:
  - fig-U5-1 - `diagram` - sources of tafsir in order: the Qur'an itself, the Sunnah, the Companions, language and context (Topic 5.1)
  - fig-U5-2 - `table` - principles of interpretation with an example of each (Topic 5.1)
  - fig-U5-3 - `flowchart` - from verse to lesson: read, translate, check context, consult tafsir, draw the lesson (the unit's required schematic) (Topic 5.2)
  - fig-U5-4 - `table` - selected short surahs with main message and a practical lesson for students (Topic 5.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 6: Historical and Cultural Context of the Quran

Guide Unit 06, Week 14 (`:201-207`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-06/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-6-1` (asbab al-nuzul; Makki and Madani surahs; the cultural and social background of revelation; context in interpretation) - traces to guide outcome 4 and the course description (`:127`).
- **Key terms**: Asbab al-nuzul, Makki surah, Madani surah, Revelation.
- **Topics**: 6.1 Week 14: guide sections 6.1-6.4.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Analyze-or-higher item asking the learner to explain how knowing a verse's occasion of revelation changes how it is understood. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U6-01 | 6.1 (`:204`) | 6.1 | Concept of asbab al-nuzul (reasons of revelation) |
| U6-02 | 6.2 (`:205`) | 6.1 | Makki and Madani surahs |
| U6-03 | 6.3 (`:206`) | 6.1 | Cultural and social background of revelation |
| U6-04 | 6.4 (`:207`) | 6.1 | Impact of context on interpretation |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 6.1 | Revelation in its setting | U6-01, U6-02, U6-03, U6-04 | 15-22 | fig-U6-1: timeline, fig-U6-2: table, fig-U6-3: diagram |

**Depth budget**: 4 sub-topics; 1 topic; 20-32 reading-min.

**Prerequisite knowledge**: Unit 5.

**Common misconceptions**: "every verse has a recorded occasion of revelation"; "Makki and Madani refer only to where a surah was revealed"; "knowing the context limits a verse to its time".

**Mapped readings**: kadir-2022-asbab, asbab-seerah-books, quran-translation.

**Figure plan**:
  - fig-U6-1 - `timeline` - the Makki and Madani periods with landmark events of the Prophet's life (the unit's required schematic) (Topic 6.1)
  - fig-U6-2 - `table` - Makki and Madani surahs compared on themes, length and style (Topic 6.1)
  - fig-U6-3 - `diagram` - a verse, its occasion of revelation and the lesson drawn from both (Topic 6.1)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; all on the one topic, >= 1 integrating it with earlier units (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 7: Integrated Practice and Application

Guide Unit 07, Weeks 15-16 (`:208-217`). Unit Spec (G1) for `docs/semester-3/guhq-301/unit-07/`.

- **CLO/SLO refs**: `SLO:GUHQ-301-7-1` (integrated vocabulary, grammar and syntax practice; translation and comprehension; guided recitation; reflection on practical application) - traces to guide outcomes 1-4.
- **Key terms**: Integrated practice, Recitation, Comprehension, Application.
- **Topics**: 7.1 Weeks 15-16: guide sections 7.1-7.3 and 7.6.
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create-level item asking the learner to prepare a short presentation on one surah covering vocabulary, grammar, meaning and a practical lesson. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U7-01 | 7.1 (`:211`) | 7.1 | Integrated practice: vocabulary, grammar, syntax |
| U7-02 | 7.2 (`:212`) | 7.1 | Translation and comprehension exercises |
| U7-03 | 7.3 (`:213`) | 7.1 | Guided recitation and understanding |
| U7-04 | 7.6 (`:217`) | 7.1 | Reflection on practical application of Quranic teachings |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 7.1 | Bringing it together | U7-01, U7-02, U7-03, U7-04 | 15-22 | fig-U7-1: flowchart, fig-U7-2: table, fig-U7-3: concept-map |

**Depth budget**: 4 sub-topics; 1 topic; 20-32 reading-min.

**Prerequisite knowledge**: Units 1-6.

**Common misconceptions**: "recitation and understanding are separate skills"; "a course like this ends with the exam"; "applying the Qur'an is only about rituals".

**Mapped readings**: quran-translation, quranic-arabic-corpus, muallim-ul-quran.

**Figure plan**:
  - fig-U7-1 - `flowchart` - a full study routine for one passage: recite, translate, parse, interpret, apply (the unit's required schematic) (Topic 7.1)
  - fig-U7-2 - `table` - a self-check grid for one surah: words known, grammar points, main message, lesson (Topic 7.1)
  - fig-U7-3 - `concept-map` - applying Qur'anic teaching in a teacher's life: classroom, family, community (Topic 7.1)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; all on the one topic, >= 1 integrating it with earlier units (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Identity.** Code (401 vs 301), credit hours (03 vs 1) and semester (2nd vs III) differ between the guide and the Scheme; see the top of this spec.
2. **Unit 7's heading.** The guide titles Unit 07 "Historical and Cultural Context of the Quran" (`:208`), repeating Unit 06's heading, while its contents are integrated practice and revision. The spec calls it "Integrated Practice and Application". This looks like a slip within the guide; whether it may be corrected is the evaluator's or the owner's call.
3. **Non-content items.** Items 7.4 "Revision of entire course" and 7.5 "Final assessment / presentation" (`:215-216`) are not content and have no checklist row, as review weeks are handled in other courses.
4. **Topics are weeks, not numbered items.** `D-2026-0070` makes each topic one numbered section. The guide's numbered items here are one-line sub-points (Unit 2 alone has twelve), so section-topics would give a twelve-topic unit. Weeks are used as topics instead, and every numbered item is a checklist row. Unit 2 then has four topics; its formative count (12) is beyond `D-2026-0072`, which rules only on three-topic units.
5. **Topic and guide numbers differ.** Because topics are weeks, Topic 1.2 is guide items 1.4-1.6, and so on; the `Guide ref` column gives the guide's own numbers.
6. **Reading list.** No guide entry identifies a single work. The open-access floor is met by Quran.com and the Leeds Quranic Arabic Corpus, which are primary-text and reference tools rather than scholarship. "Mafhoom-al-Quran" is not bound until the owner names it.
7. **Religious content review.** As for GISS-401, interpretation (Units 5-6) needs review by a qualified scholar at G3.
