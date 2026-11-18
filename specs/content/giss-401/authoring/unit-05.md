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

## G3 repair record, 2026-11-10

Applied the findings of `reviews/unit-05/G3/20261108T203238Z-g3-desk-922808a1.json` (advisory: revise) in the English files and the unit's spec records. Content-side repairs:

- F04: `sources/unit-05.md` now carries an Unverifiable sources declaration (named hadith, historical reports, Article 38(f) scope) and names the Saheeh International translation. The three source-text files remain tracked in git but were absent from the prepared review manifest; binding them is a host action.
- F05: scriptural, hadith and legal block quotations in both topics are now under 15 words or paraphrased, with citations and the translation named.
- F06: `Mudarabah` and `Musharakah` loss rules are taught and assessed distinctly, including the manager misconduct exception; the `ihtikar` retrieval item now states withholding and artificial scarcity.
- F07: contractual repayment, operational risk and default risk are distinguished; poverty and growth claims are qualified.
- F08: Articles 20, 22, 25, 36 and 38(f) are stated with their qualifications; Article 36 and 38(f) are identified as Principles of Policy, and scheduling is distinguished from the legal text.
- F09: the Ali, Umar and Charter of Madinah accounts are labelled reported traditional accounts; MCQ-08, RRQ-09 and ERQ-03 test the principles rather than the reports as fact.
- F10: secular property and democracy are no longer presented as unconstrained caricatures; RRQ-02 marking allows supported alternatives.
- F11: compressed expressions (utility maximization, macroeconomic circulation, statutory levy, executive despotism, maslahah mursalah) are rewritten in plain language with concrete examples.
- F12: every concept-to-item link in `concepts/unit-05.md` was audited against the numbered bank; stable concept IDs retained.
- F13: the Larkana and Jacobabad activities are labelled hypothetical; both practical policy tasks now state funding/authority limits and confidentiality safeguards.
- F14: the formative set is the ten "Check your understanding" retrieval items (five per topic). The spec's 5-8 formative band is exceeded because the unit teaches two topics; the MCQ/RRQ/ERQ bank is summative. Two retrieval labels were corrected after review against the blueprint (Topic 5.1 check 1 and Topic 5.2 check 1, Remember to Understand; Topic 5.2 check 5 reframed from Analyze to Apply).

Host-side findings remain open: genuine author-run provenance and a frozen source bundle (F01), a permitted narrow-screen and A4 print inspection with SVG glyph geometry (F02), and the qualified Islamic Studies scholar review required by content-spec drafting note 2 (F03). G3 remains open and unsigned.
