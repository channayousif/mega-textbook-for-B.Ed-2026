# GISS-401 Unit 5 - Authoring record

Author: agy (crew job `giss-401-u05-author`), 2026-11-03. This is an author self-check and handoff record, not independent G3/G5 evidence. Scope: English Unit 5 only, from the approved six-item checklist and two-topic partition. No teacher-notes page: the course guide supplies no separate teaching strategies or practical work for this course.

## Backward design

Topic 5.1 enduring understandings: Absolute ownership of all wealth belongs to Allah alone (2:284) and human beings are appointed trustees (*mustakhlafin*) bound by moral law; lawful (*halal*) earning demands honesty and transparent mutual consent (4:29) while barring fraud, hoarding, and bribery; *Zakat* is an institutional financial duty and an enforceable right of the destitute (51:19, 9:60) that prevents wealth concentration (59:7) and revives grassroots purchasing power; debt-based interest (*riba*, 2:275-279) extracts unearned wealth and creates debt servitude, whereas Islamic finance mandates equitable risk-sharing partnerships (*Musharakah* and *Mudarabah*).

Topic 5.2 enduring understandings: Supreme sovereignty belongs to Allah (*Hakimiyyah*) and political leadership is an executive trust (*Amanah*); consultative governance (*Shura*, 42:38, 3:159) is an obligatory mechanism that prevents authoritarian despotism (*istibdad*) and utilizes specialized wisdom (*Ahl al-Hall wal-Aqd*) for the public good; Islamic administration requires impartial justice (*Adl*, 4:58, 5:8), absolute rule of law without executive immunity, and transparent accountability (*Muhasabah*); religious minorities enjoy sacred covenants of protection (*dhimmah*), freedom of conscience (2:256), sanctuary protection (22:40), and multi-religious civic equality (Charter of Madinah), reinforced by Articles 20, 22, 25, and 36 of Pakistan's 1973 Constitution.

| Sub-topic | Target Bloom level | Explanation heading | Evidence |
|---|---|---|---|
| U5-01 | Understand / Apply | Concept of halal and haram | Topic 5.1 retrieval 1, 2, 3; MCQ-01, MCQ-02; RRQ-01, RRQ-02, RRQ-03; ERQ-01, ERQ-05 |
| U5-02 | Understand / Analyze | Zakat and charity | Topic 5.1 retrieval 4; MCQ-03, MCQ-04; RRQ-04; ERQ-01, ERQ-02, ERQ-05 |
| U5-03 | Apply / Analyze | Prohibition of interest (riba) | Topic 5.1 retrieval 5; MCQ-05; RRQ-05; ERQ-01, ERQ-05 |
| U5-04 | Understand / Apply | Concept of Shura | Topic 5.2 retrieval 1, 2; MCQ-06, MCQ-07; RRQ-06, RRQ-07, RRQ-08; ERQ-03, ERQ-05 |
| U5-05 | Understand / Analyze | Justice and governance | Topic 5.2 retrieval 3; MCQ-08; RRQ-07, RRQ-08; ERQ-03, ERQ-05 |
| U5-06 | Understand / Evaluate | Rights of minorities | Topic 5.2 retrieval 4, 5; MCQ-09, MCQ-10; RRQ-09, RRQ-10; ERQ-04, ERQ-05 |

Unit bank: MCQ-01 to MCQ-05 and RRQ-01 to RRQ-05 sample Topic 5.1; MCQ-06 to MCQ-10 and RRQ-06 to RRQ-10 sample Topic 5.2. ERQ-01 and ERQ-02 sample Topic 5.1, ERQ-03 and ERQ-04 sample Topic 5.2, and ERQ-05 integrates both. ERQ-01 fulfills the spec's required Analyze-or-higher item asking the learner to explain how Zakat and the prohibition of riba aim at a fairer economy.

Misconceptions from the spec, each named and corrected in an Explanation: "halal and haram are only about food" (Topic 5.1, Concept of halal and haram); "any bank profit is riba" (Topic 5.1, Prohibition of interest); "Shura means majority vote on everything" (Topic 5.2, Concept of Shura); "minorities have no rights in an Islamic state" (Topic 5.2, Rights of minorities).

## Reading time

Reader-facing body words (front matter, imports, and badges excluded):

- `index.mdx`: 440 words, 3 minutes.
- `topic-01.mdx`: 4,330 words, 15 minutes.
- `topic-02.mdx`: 3,900 words, 15 minutes.
- `unit-assessment.mdx`: 4,130 words, 15 minutes.

Total: 48 reading-minutes, perfectly inside the approved 40-55 reading-min depth budget band.

## Figures

All four figures planned in the content spec are schematics (flowchart fig-U5-1, table fig-U5-2, diagram fig-U5-3, table fig-U5-4); none is an illustration. The SVGs were authored by hand with the published token set, verified against `npm run figures:variants --check` to generate `.dark.svg` variants, and placed. CI's `figure-geometry` job will run the measured text inspection.

## Religious content

Statements of Islamic economics and political jurisprudence represent mainstream Sunni Islamic scholarship and constitutional principles of Pakistan. All Quranic verses are cited from the Saheeh International text on Quran.com and bound in `sources/texts/quran-translation.md`. Hadith references cite standard sunnah collections (*Sahih Muslim*, *Sahih al-Bukhari*, *Sunan Abi Dawud*). Constitutional articles cite the official 1973 Constitution of Pakistan. Per drafting note 2 in the content spec, a qualified Islamic Studies scholar reviewer should review these texts at G3.

## Open items for later jobs

- No `glossary.json` entries were added (file is outside Unit 5 scope); key terms (Halal, Haram, Zakat, Nisab, Riba, Shura, Hakimiyyah, Adl, Muhasabah, Dhimmah) are defined in bold on first use.
- `terminology.csv` has no entries for the spec's key terms; concept graph Urdu labels are authored and flagged for G5 review.
- The Urdu mirror (G4 translation and G5 review) is a separate downstream job.
