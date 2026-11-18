---
course_code: GUHQ-400
status: approved
open_access_floor:
  default: 1
---

# GUHQ-400 - Fehm-e-Quran - II (Understanding of the Holy Quran II) - Content Spec

Semester 4, General Education, 1 (0-1) credit hour (Scheme). Source: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt` lines 1-99; Scheme of Studies `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt` Semester IV row 8 ("GUHQ- 400, Fehm-e-Quran - II, 1 (0-1), General Education, EC&EE").

**Identity** (settled): the guide block prints code **GUHQ-402** and credit hours **03 (0-1)** (`:6-8`); the Scheme gives **GUHQ-400** and **1 (0-1)**. These values were adjudicated with Fehm-e-Quran I under `G-2026-04` (resolved), which treats the guide's codes and credit values as guide-side slips; this spec follows that ruling. `specs/gaps.md:16-20` records GUHQ-400 as the Semester IV course after the 2026 revision.

**Proposed catalog entry** (not yet in `catalog/courses.json`: every G2 and G3 evidence manifest binds that file whole, so adding a course re-opens all reviewed units; the GUHQ-301 entry approved under `D-2026-0080` is likewise waiting for per-course evidence binding, `G-2026-205`): `{"code": "GUHQ-400", "title_en": "Fehm-e-Quran - II", "title_ur": "فہمِ قرآن - II", "credit_hours": "1 (0-1)", "category": "General Education"}` in Semester 4.

**Sequence.** This course continues `GUHQ-301` Fehm-e-Quran I (Semester 3), whose Units 1-3 taught the alphabet, word formation, parts of speech, gender, number, pronouns, the three verb forms and basic syntax. Unit 1 here opens with a recap of that grammar and does not reteach it.

## Course-wide items

- **Course Outcomes (guide, verbatim, `:12-15`)**: after finishing this course, student-teachers will be able to:
  1. Develop a basic understanding of Quranic Arabic
  2. Understand the Quran's significance and importance in Islam
  3. Apply Quranic teachings to personal and social conduct
- **Teaching strategies**: none listed; the schedule is built from translation practice and drills.
- **Assessment criteria**: none given beyond "final comprehension exercises and assessment" in Week 16 (`:82`); the Constitution Art. III.7 default (60% summative / 40% formative) applies.
- **Practical work**: the course is practical by credit (0-1); its translation exercises are listed week by week and are the substance of each topic.
- **Recommended resources**: see `## Reading list`. Qur'anic text is cited by surah and ayah; translations and tafsir are quoted briefly and named.

## Course Description

From the course guide (paraphrased, `:10`): the course introduces the Holy Qur'an, its significance and its relevance to everyday life, with a focus on its Arabic, so that student-teachers can read and understand the text and apply its teachings.

## Reading list

`Key` is the citation key used in each unit's `sources/unit-NN.md`. `Units` tags which unit(s) each source supports. Every unit binds >= 1 open-access source (`open_access_floor` mapping with `default: 1`), under `D-2026-0053` item 2 (applied to Semester 3 by `D-2026-0080`; see drafting note 7).

### Guide-listed (`:85-99`)

The guide repeats several entries. The first six lines match `GUHQ-301`'s guide list exactly; those keys and their status are carried over from `specs/content/guhq-301/content-spec.md` (owner-approved as drafted, `D-2026-0080`, resolving `G-2026-208`). The last three works are new to this course and were found in Open Library on 2026-11-18.

| Key | Citation as printed | Units | Note |
|---|---|---|---|
| muallim-ul-quran | "MuallimUl Quran (Vol 3) & related volumes"; "Rahman, U. (2025). Muallimul Quran (Vols. 3-5). [Course Book]"; "Muallim-ul-Quran (Volumes 3, 4 & 5)"; "Rahman, U. Muallim-ul-Quran, Vol. 3"; "Rahman, U. Muallim-ul-Quran (Vols. 3-5). Lahore." (`:86, 89, 92, 93, 96`) | 1, 2, 3 | five lines naming one course-book series; treated as one key, title-level, as for GUHQ-301 |
| fehm-ul-quran-urdu | "Fehmul Quran Urdu translations and commentaries (various authors/editions)" (`:87`) | 3, 4 | a category, not a work; as for GUHQ-301 |
| asbab-seerah-books | "Books on Asbab al-Nuzul (reasons of revelation) and Seerah texts" (`:88`) | 4 | a category, not a work; as for GUHQ-301 |
| tafseer-talim-ul-quran | "TafseerTalim-ul-Quran (2 Vols.). Maktaba-tul-Madinah" (`:90`) | 4 | not found; publisher as printed; as for GUHQ-301 |
| mafhoom-al-quran | "Mafhoom-al-Quran (2nd ed.)" (`:91`) | - | does not identify one work; not bound until the owner names it, as for GUHQ-301 |
| badawi-abdelhaleem-2008 | Badawi, E. M., & Abdel Haleem, M. (2008). *Arabic-English dictionary of Qur'anic usage*. Brill. (`:94, 99`) | 1, 2, 3 | real (Open Library OL16977011W); print reference for vocabulary |
| ibn-kathir-tafsir | Ibn Kathir, I. *Tafsir Ibn Kathir*. Darussalam. (`:95, 97`) | 3, 4 | real (Darussalam abridged English edition, OL10746660W); an English abridgement is also open on Quran.com (`quran-translation`) |
| maududi-tafhim | Maududi, S. A. A. *Tafhim-ul-Quran*. Islamic Publications. (`:98`) | 3, 4 | real; English translation *Towards Understanding the Qur'an* (Islamic Foundation, OL21232467W); print |

### Author-selected (open access)

Carried over from `GUHQ-301` (all re-checked 2026-11-18):

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| quran-translation | *The Holy Qur'an*: Arabic text with English and Urdu translations and tafsir. Quran.com. | https://quran.com | 1-4 | open access, HTTP 200 on 2026-11-18, including the English Tafsir Ibn Kathir (for example `quran.com/2:255/tafsirs/en-tafisr-ibn-kathir`, HTTP 200); units name the translation or tafsir they quote |
| quranic-arabic-corpus | Dukes, K., et al. *The Quranic Arabic Corpus: word by word grammar, syntax and morphology of the Holy Quran.* University of Leeds. | https://corpus.quran.com | 1, 2, 3 | open access, HTTP 200 on 2026-11-18; verb forms, voice, particles and syntax for every verse |
| dukes-2010-treebank | Dukes, K., Atwell, E., & Sharaf, A.-B. M. (2010). Syntactic annotation guidelines for the Quranic Arabic Dependency Treebank. *Proceedings of LREC 2010*. ELRA. | https://doi.org/10.63317/5ca39mfekwbt (PDF: http://www.lrec-conf.org/proceedings/lrec2010/pdf/278_Paper.pdf) | 1, 3 | conditional sentences, vocatives and particles as the corpus labels them |
| kadir-2022-asbab | Abdul Kadir, N., Muhamed Ali, M. A., Md Ariffin, M. F., & Usman, A. H. (2022). The rules of interpretation: Review on asbab al-nuzul in Tafsir Al-Mishbah. *International Journal of Academic Research in Business and Social Sciences*, 12(6). | https://doi.org/10.6007/ijarbss/v12-i6/13322 | 4 | asbab al-nuzul in interpretation; diamond OA |

## Week schedule

The guide gives four numbered units with their weeks (`:17-83`). Following `D-2026-0070` item 1 there is one unit per guide unit. As in `GUHQ-301` (approved as drafted, `D-2026-0080`, resolving `G-2026-206`), **each topic is one guide week**, because the guide's items are one-line exercises under each week and only some carry numbers. Two adjustments, both flagged: guide Weeks 9 and 10 have identical content and form one topic (drafting note 2); Week 16's review and assessment lines are not content (drafting note 3).

| Week(s) | Unit | Topics |
|---|---|---|
| 1-6 | Unit 1 - Quranic Arabic Grammar and Advanced Structures | 1.1 Week 1; 1.2 Week 2; 1.3 Week 3; 1.4 Week 4; 1.5 Week 5; 1.6 Week 6 |
| 7-10 | Unit 2 - Past Tense and Complex Structures | 2.1 Week 7; 2.2 Week 8; 2.3 Weeks 9-10 |
| 11-14 | Unit 3 - Advanced Quranic Linguistics and Interpretation | 3.1 Week 11; 3.2 Week 12; 3.3 Week 13; 3.4 Week 14 |
| 15-16 | Unit 4 - Application, Tafsir and Review | 4.1 Week 15; 4.2 Week 16 |

## Unit 1: Quranic Arabic Grammar and Advanced Structures

Guide UNIT #01, Weeks 1-6 (`:17-42`). Unit Spec (G1) for `docs/semester-4/guhq-400/unit-01/`.

- **CLO/SLO refs**: `SLO:GUHQ-400-1-1` (recall GUHQ-301 grammar; identify and translate present-tense forms by person, number and gender), `SLO:GUHQ-400-1-2` (identify and translate negative imperatives, conditional patterns, the masdar mu'awwal and the lam of denial and of purpose), `SLO:GUHQ-400-1-3` (translate present-tense verses with objects, attached pronouns and the passive voice) - traces to guide outcome 1.
- **Key terms**: Mudari' (present-imperfect), Nahy (negative imperative), Shart (condition), Masdar mu'awwal, Lam al-juhud, Lam al-ta'lil, Majhul (passive).
- **Topics**: 1.1 Week 1 to 1.6 Week 6, one per week.
- **Assessment blueprint**: formative 18 items, 3 per topic (extends `D-2026-0072` to a six-topic unit, as `D-2026-0080` accepted for GUHQ-301's four-topic unit and `D-2026-0077` for EFPG-401's) (Remember/Understand/Apply); summative includes one Analyze item asking the learner to parse a short verse word by word (form, person, number, gender, voice) and justify the translation from the parse. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | Week 1 (`:20`) | 1.1 | Recap of the basics of Quranic Arabic grammar (from GUHQ-301) |
| U1-02 | Week 1 (`:21`) | 1.1 | Introduction to advanced verb forms: present-tense variations |
| U1-03 | Week 1 (`:22`) | 1.1 | Translating simple present-tense phrases |
| U1-04 | Week 2 (`:24`) | 1.2 | Present-tense forms by number and gender (singular, plural; masculine, feminine) |
| U1-05 | 1.5, Week 2 (`:25`) | 1.2 | Translation practice of selected verses |
| U1-06 | Week 3 (`:29`) | 1.3 | Negative imperative forms (nahy) in Qur'anic context |
| U1-07 | Week 3 (`:30`) | 1.3 | Translation and meaning-extraction exercises |
| U1-08 | Week 4 (`:33`) | 1.4 | Conditional sentence patterns and their translation |
| U1-09 | Week 4 (`:34`) | 1.4 | The masdar mu'awwal (interpreted verbal noun) and its semantic role |
| U1-10 | Week 5 (`:37`) | 1.5 | Varieties of lam: lam al-juhud (denial) and lam al-ta'lil (purpose) |
| U1-11 | Week 5 (`:38`) | 1.5 | Translation practice |
| U1-12 | 1.12, Week 6 (`:41`) | 1.6 | Present tense with objects, attached pronouns and the passive voice |
| U1-13 | 1.13, Week 6 (`:42`) | 1.6 | Practical translation session |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 1.1 | Grammar recap and present-tense variations | U1-01, U1-02, U1-03 | 6-9 | fig-U1-1: table, fig-U1-2: concept-map |
| 1.2 | The present tense by number and gender | U1-04, U1-05 | 6-9 | fig-U1-3: table, fig-U1-4: diagram |
| 1.3 | The negative imperative | U1-06, U1-07 | 6-9 | fig-U1-5: table, fig-U1-6: flowchart |
| 1.4 | Conditions and the interpreted verbal noun | U1-08, U1-09 | 6-9 | fig-U1-7: diagram, fig-U1-8: table |
| 1.5 | Two kinds of lam | U1-10, U1-11 | 6-9 | fig-U1-9: table, fig-U1-10: diagram |
| 1.6 | Objects, pronouns and the passive in the present | U1-12, U1-13 | 6-9 | fig-U1-11: table, fig-U1-12: flowchart |

**Depth budget**: 13 sub-topics; 6 topics; 48-70 reading-min.

**Prerequisite knowledge**: `GUHQ-301` Fehm-e-Quran I (Semester 3), Units 1-3.

**Common misconceptions**: "the present tense in Qur'anic Arabic only describes the present moment"; "every la before a verb means the same thing"; "the passive voice changes the meaning but not the form".

**Mapped readings**: quranic-arabic-corpus, quran-translation, dukes-2010-treebank, muallim-ul-quran, badawi-abdelhaleem-2008.

**Figure plan**:
  - fig-U1-1 - `table` - a one-page recap of GUHQ-301 grammar: parts of speech, gender, number, pronouns, the three verb forms (Topic 1.1)
  - fig-U1-2 - `concept-map` - what a present-tense form signals: person, number, gender, mood (Topic 1.1)
  - fig-U1-3 - `table` - one root conjugated in the present tense across all persons, numbers and genders, with a Qur'anic instance where one exists (Topic 1.2)
  - fig-U1-4 - `diagram` - the prefixes and suffixes that mark person and number in the present tense (Topic 1.2)
  - fig-U1-5 - `table` - command and negative command (amr and nahy) side by side, with Qur'anic examples (Topic 1.3)
  - fig-U1-6 - `flowchart` - recognising a negative imperative: la + jussive form, then translate "do not" (the unit's required schematic) (Topic 1.3)
  - fig-U1-7 - `diagram` - a conditional sentence: particle, condition clause, answer clause, in one Qur'anic verse (Topic 1.4)
  - fig-U1-8 - `table` - an + verb as an interpreted verbal noun, with its noun equivalent (Topic 1.4)
  - fig-U1-9 - `table` - lam al-juhud and lam al-ta'lil compared: form, meaning, Qur'anic example (Topic 1.5)
  - fig-U1-10 - `diagram` - the lams a learner meets in Qur'anic Arabic and how to tell them apart (Topic 1.5)
  - fig-U1-11 - `table` - active and passive present forms of one root with a Qur'anic instance of each (Topic 1.6)
  - fig-U1-12 - `flowchart` - translating a verb with attached object pronouns: find the verb, find the subject marker, find the object pronoun, translate (Topic 1.6)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 1 per topic
  - RRQs (10): Understand to Analyze; >= 1 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 2: Past Tense and Complex Structures

Guide UNIT #02, Weeks 7-10 (`:43-57`). Unit Spec (G1) for `docs/semester-4/guhq-400/unit-02/`.

- **CLO/SLO refs**: `SLO:GUHQ-400-2-1` (identify and translate past-tense forms in the third person singular, plural and dual), `SLO:GUHQ-400-2-2` (identify and translate first- and second-person past forms; translate verses from Surahs Al-Baqarah and Al-Imran with grammatical justification) - traces to guide outcomes 1 and 2.
- **Key terms**: Madi (past-perfect), Third person, Dual, First person, Second person.
- **Topics**: 2.1 Week 7; 2.2 Week 8; 2.3 Weeks 9-10.
- **Assessment blueprint**: formative 9 items, 3 per topic (`D-2026-0072`) (Remember/Understand/Apply); summative includes one Apply-then-Analyze item asking the learner to translate two verses from Surah Al-Baqarah or Al-Imran and identify every past-tense verb's person, number and gender. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U2-01 | 2.1, Week 7 (`:46`) | 2.1 | Past tense: simple past, third person singular |
| U2-02 | 2.2, Week 7 (`:47`) | 2.1 | Translation of verses from Surahs Al-Baqarah and Al-Imran |
| U2-03 | Week 8 (`:49`) | 2.2 | Past tense: extended forms, third person plural and dual |
| U2-04 | Week 8 (`:50`) | 2.2 | Translation and grammar drills |
| U2-05 | Week 9 (`:53`) and 2.7, Week 10 (`:56`) | 2.3 | Past tense: first- and second-person forms |
| U2-06 | Week 9 (`:54`) and 2.8, Week 10 (`:57`) | 2.3 | Translation practice and comprehension check |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 2.1 | The past tense in the third person singular | U2-01, U2-02 | 8-12 | fig-U2-1: table, fig-U2-2: diagram |
| 2.2 | Third person plural and dual | U2-03, U2-04 | 8-12 | fig-U2-3: table, fig-U2-4: flowchart |
| 2.3 | First and second person, and putting it together | U2-05, U2-06 | 10-14 | fig-U2-5: table, fig-U2-6: diagram |

**Depth budget**: 6 sub-topics; 3 topics; 38-54 reading-min.

**Prerequisite knowledge**: Unit 1; GUHQ-301 Topic 2.3 (the three verb forms).

**Common misconceptions**: "the past tense always means a finished event in the past"; "the dual is just a plural"; "the verb's ending tells the gender only in the third person".

**Mapped readings**: quranic-arabic-corpus, quran-translation, muallim-ul-quran, badawi-abdelhaleem-2008.

**Figure plan**:
  - fig-U2-1 - `table` - the past-tense third person singular, masculine and feminine, with a verse from Al-Baqarah (Topic 2.1)
  - fig-U2-2 - `diagram` - past and present stems of one root and how each is built (Topic 2.1)
  - fig-U2-3 - `table` - third person singular, dual and plural in the past tense, both genders (Topic 2.2)
  - fig-U2-4 - `flowchart` - identifying person, number and gender from a past-tense ending (the unit's required schematic) (Topic 2.2)
  - fig-U2-5 - `table` - the complete past-tense paradigm of one root (all fourteen forms) (Topic 2.3)
  - fig-U2-6 - `diagram` - a parsed verse from Al-Imran with each past-tense verb labelled (Topic 2.3)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; at least 1 per topic plus integrative items (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 3: Advanced Quranic Linguistics and Interpretation

Guide UNIT #03, Weeks 11-14 (`:58-71`). Unit Spec (G1) for `docs/semester-4/guhq-400/unit-03/`.

- **CLO/SLO refs**: `SLO:GUHQ-400-3-1` (identify and translate the past passive and longer passive verses; identify and translate imperatives in Qur'anic usage), `SLO:GUHQ-400-3-2` (identify conditional clauses, vocatives and advanced particles; expand theme-based vocabulary), `SLO:GUHQ-400-3-3` (translate short passages in context and analyse them for the themes of Tawhid, Nubuwwah, Akhirah and Adab) - traces to guide outcomes 1, 2 and 3.
- **Key terms**: Fi'l majhul (passive verb), Amr (imperative), Nida' (vocative), Tawhid, Nubuwwah, Akhirah, Adab.
- **Topics**: 3.1 Week 11; 3.2 Week 12; 3.3 Week 13; 3.4 Week 14.
- **Assessment blueprint**: formative 12 items, 3 per topic (extends `D-2026-0072` to a four-topic unit, as accepted for GUHQ-301 Unit 2 under `D-2026-0080`) (Remember/Understand/Apply); summative includes one Analyze item asking the learner to translate a short passage and show, with the words that carry it, which of the four themes it expresses. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U3-01 | Week 11 (`:61`) | 3.1 | The passive voice in the past tense (guide: "maf'ul bih / maf'ul lahu"; see drafting note 4) |
| U3-02 | Week 11 (`:62`) | 3.1 | Translating longer verses with passive structures |
| U3-03 | Week 12 (`:64`) | 3.2 | Imperative verbs (singular and plural) in Qur'anic usage |
| U3-04 | Week 12 (`:65`) | 3.2 | Translation activities |
| U3-05 | Week 13 (`:67`) | 3.3 | Conditional clauses, vocatives and advanced particles |
| U3-06 | Week 13 (`:68`) | 3.3 | Vocabulary expansion (theme-based) |
| U3-07 | Week 14 (`:70`) | 3.4 | Translation with contextual interpretation (short passages) |
| U3-08 | Week 14 (`:71`) | 3.4 | Thematic analysis: Tawhid, Nubuwwah, Akhirah, Adab (morals) |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 3.1 | The passive in the past tense | U3-01, U3-02 | 6-9 | fig-U3-1: table, fig-U3-2: flowchart |
| 3.2 | Imperatives in Qur'anic usage | U3-03, U3-04 | 6-9 | fig-U3-3: table, fig-U3-4: diagram |
| 3.3 | Conditions, vocatives, particles and themed vocabulary | U3-05, U3-06 | 6-9 | fig-U3-5: table, fig-U3-6: concept-map |
| 3.4 | Reading passages for their themes | U3-07, U3-08 | 8-12 | fig-U3-7: concept-map, fig-U3-8: table |

**Depth budget**: 8 sub-topics; 4 topics; 38-55 reading-min.

**Prerequisite knowledge**: Units 1-2.

**Common misconceptions**: "a Qur'anic imperative is always addressed to the Prophet alone"; "ya (O) is the only vocative"; "the four themes appear in separate surahs".

**Mapped readings**: quranic-arabic-corpus, dukes-2010-treebank, quran-translation, ibn-kathir-tafsir, maududi-tafhim, fehm-ul-quran-urdu, badawi-abdelhaleem-2008.

**Figure plan**:
  - fig-U3-1 - `table` - active and passive past forms of three roots, with a Qur'anic passive instance each (Topic 3.1)
  - fig-U3-2 - `flowchart` - recognising a past passive from its vowel pattern (u-i) and finding the deputy subject (the unit's required schematic) (Topic 3.1)
  - fig-U3-3 - `table` - imperative forms (singular, dual, plural; masculine, feminine) with Qur'anic examples (Topic 3.2)
  - fig-U3-4 - `diagram` - who is addressed: imperatives to the Prophet, to believers, to all people, with an example each (Topic 3.2)
  - fig-U3-5 - `table` - vocative and advanced particles (ya, ayyuha, inna, lakin, hatta) with meaning and an example (Topic 3.3)
  - fig-U3-6 - `concept-map` - theme-based vocabulary clusters for Tawhid, Nubuwwah, Akhirah and Adab (Topic 3.3)
  - fig-U3-7 - `concept-map` - the four themes and the key words that signal each (Topic 3.4)
  - fig-U3-8 - `table` - three short passages, each with its translation, theme and the tafsir consulted (Topic 3.4)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; spread so that no more than one topic goes without an ERQ, >= 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Unit 4: Application, Tafsir and Review

Guide UNIT #04, Weeks 15-16 (`:73-83`). Unit Spec (G1) for `docs/semester-4/guhq-400/unit-04/`.

- **CLO/SLO refs**: `SLO:GUHQ-400-4-1` (interpret longer selected ayat with reference to tafsir and context), `SLO:GUHQ-400-4-2` (relate Qur'anic teachings studied in the course to personal and social conduct and to a teacher's life) - traces to guide outcomes 2 and 3.
- **Key terms**: Tafsir, Asbab al-nuzul, Context, Application.
- **Topics**: 4.1 Week 15: theme-based tafsir; 4.2 Week 16: real-life application (the week's review and assessment lines are not content).
- **Assessment blueprint**: formative 5-8 items (Remember/Understand/Apply); summative includes one Create item asking the learner to prepare a five-minute classroom reflection that connects one passage studied in the course to a practical lesson for pupils, citing the tafsir used. Weighting: 60/40 default.

### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U4-01 | Week 15 (`:76`) | 4.1 | Continuing theme-based tafsir |
| U4-02 | Week 15 (`:77`) | 4.1 | Practical interpretation of longer selected ayat or a surah excerpt |
| U4-03 | Week 16 (`:83`) | 4.2 | Discussion of real-life application and practical lessons |

### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures (id: archetype) |
|---|---|---|---|---|
| 4.1 | Theme-based tafsir of longer passages | U4-01, U4-02 | 10-14 | fig-U4-1: flowchart, fig-U4-2: table |
| 4.2 | From understanding to conduct | U4-03 | 8-12 | fig-U4-3: concept-map, fig-U4-4: table |

**Depth budget**: 3 sub-topics; 2 topics; 30-42 reading-min.

**Prerequisite knowledge**: Units 1-3; `GISS-401` Islamic Studies (Semester 3).

**Common misconceptions**: "anyone can interpret a verse from its translation alone"; "tafsir is only for scholars, not for teachers"; "knowing the meaning is the same as acting on it".

**Mapped readings**: quran-translation, ibn-kathir-tafsir, maududi-tafhim, kadir-2022-asbab, asbab-seerah-books, tafseer-talim-ul-quran.

**Figure plan**:
  - fig-U4-1 - `flowchart` - steps of careful interpretation: read the text, check the translation, consult tafsir, consider context and asbab al-nuzul, draw the lesson (the unit's required schematic) (Topic 4.1)
  - fig-U4-2 - `table` - one longer passage with its translation, the tafsir point used and the lesson drawn (Topic 4.1)
  - fig-U4-3 - `concept-map` - Qur'anic teachings from the course linked to conduct at home, in school and in society (Topic 4.2)
  - fig-U4-4 - `table` - practical lessons for a teacher from the passages studied, each with its surah and ayah (Topic 4.2)

**Unit-end assessment blueprint**:
  - MCQs (10): Remember to Apply; >= 2 per topic
  - RRQs (10): Understand to Analyze; >= 2 per topic
  - ERQs (5): Analyze to Evaluate/Create; 2 per topic plus 1 integrative item (total 5); each ERQ carries an analytic rubric, >= 1 demanding Analyze-or-higher

## Drafting notes for intake

Recorded by the drafter so the intake evaluator can test them; none is settled here.

1. **Identity.** Settled by `G-2026-04` (resolved): GUHQ-400, 1 (0-1), Semester IV, as for GUHQ-301.
2. **Weeks 9 and 10 are identical.** Both read "Past tense: first & second person forms" and "Translation practice & comprehension assessment" (`:53-57`); Week 10's items carry the numbers 2.7-2.8. The spec makes them one two-week topic (2.3) rather than repeat it. If the guide meant different content for Week 10, the owner should say what.
3. **Week 16.** "Review of all major grammatical categories" and "Final comprehension exercises and assessment" (`:81-82`) are not content and have no checklist row; "Discussion on real-life application & practical lessons" (`:83`) is content and forms Topic 4.2.
4. **Grammar labels in Week 11.** The guide gives "Passive voice in past tense ('maf'ul bih / maf'ul lahu')" (`:61`). In Arabic grammar *maf'ul bihi* is the direct object and *maf'ul lahu* the object of purpose; the passive verb is *fi'l majhul* and its subject the *na'ib al-fa'il*. The spec teaches the passive in the past tense and treats the guide's labels as a slip, noting that the direct object of an active verb becomes the deputy subject of the passive. A qualified reviewer should confirm.
5. **Topic order.** The guide teaches the present tense (Unit 1) before the past (Unit 2), the reverse of the usual order, and GUHQ-301 introduced both. The spec keeps the guide's order.
6. **Topics are weeks.** As in GUHQ-301 (`D-2026-0080`), topics are weeks; Unit 1 then has six short topics and 18 formative items.
7. **Readings and the open-access floor.** `D-2026-0053` item 2 was ruled for Semester 2 and accepted for Semester 3 under `D-2026-0080`; its application to Semester 4 is the same question again. The guide's own new entries (Badawi and Abdel Haleem, Ibn Kathir, Maududi) are real works.
8. **Religious content review.** Interpretation (Units 3-4) needs review by a qualified scholar at G3, as for GUHQ-301 and GISS-401.
