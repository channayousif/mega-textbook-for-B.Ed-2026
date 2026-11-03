# GISS-401 Islamic Studies - Task tracker

## Status: content spec approved (G0/G1, D-2026-0079); authoring in progress

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Introduction to Islamic Studies and the Fundamental Beliefs of Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (claude); G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |
| 2 | Sources of Islamic Knowledge: the Qur'an and the Sunnah | ☐ | ☐ | ☐ | ☐ | | |
| 3 | Worship and the Moral System of Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (agy); G2 gate evidence recorded below; G3 and Urdu remain open |
| 4 | The Social System and the State in Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (claude); G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |
| 5 | The Economic and Political Systems of Islam | ☐ | ☐ | ☐ | ☐ | | |
| 6 | Islam, Education, Civilization and Contemporary Issues | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job; G2 gate evidence recorded below; G3 (with a qualified Islamic Studies reviewer) and Urdu remain open |
| 7 | Islamic Ethics in Professional Life | ☐ | ☐ | ☐ | ☐ | | |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-01/G2/20261103T002225035Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/giss-401/reviews/unit-01/G3/fb1baf5a-8583-4edd-a5d3-bf7e01304eaf.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; 4 Sharp PNG renders verified; G3 remains open and unsigned |
| Unit 1 | G4 ur-translation | ▢ | | separate job |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 1 | G6 assets | ▣ | | four English schematics placed with dark variants; `measure-figure-text` not run (crew brief bars Chromium), CI `figure-geometry` is the first measured check |
| Unit 1 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-03/G2/20261103T012212981Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | awaiting an independent reviewer; no review performed by author |
| Unit 3 | G4 ur-translation | ▢ | | separate job |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ✅ | auto:gates | 4 schematics placed with dark variants |
| Unit 3 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-04/G2/20261103T002225277Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 4 | G4 ur-translation | ▢ | | Separate Urdu job; English pages retain translation_status: draft. |
| Unit 4 | G5 ur-review | ▢ | | Pending accepted English baseline and translated mirror. |
| Unit 4 | G6 assets | ▣ | | Four English schematics and dark variants placed to meet current figure gates; geometry validation pending; Urdu localisation is a separate job. |
| Unit 4 | G7 publish | ▢ | | Publication is outside this authoring job. |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-06/G2/20261103T011742805Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | Independent Islamic Studies reviewer required; no certification claimed |
| Unit 6 | G4 ur-translation | ▢ | | Separate job; English pages carry untranslated notices |
| Unit 6 | G5 ur-review | ▢ | | Pending translation and independent review |
| Unit 6 | G6 assets | ▣ | | Six English schematics placed with derived dark variants; Urdu localisation pending |

## Unit 6 authoring notes

### Authoring design and handoff

Enduring understandings: education joins understanding and responsibility; scholarship needs specific evidence and supporting institutions; coexistence joins respectful difference with fair protection. Each topic's retrieval questions, checklist and mini-rubric mirror these understandings. The assessment bank samples Topics 6.1/6.2/6.3 with MCQ counts 4/3/3 and RRQ counts 3/3/4. ERQs are one per topic plus two integrative items, per the approved blueprint.

| Sub-topic | Target Bloom level | Teaching subsection | Assessment evidence |
|---|---|---|---|
| U6-01 | Understand / Apply | Importance of education in Islam | Topic 6.1 check 3; MCQ-04; RRQ-01; ERQ-01 |
| U6-02 | Apply | Role of teachers and learners in Islam | Topic 6.1 check 2; MCQ-02; RRQ-02; ERQ-01 |
| U6-03 | Analyze / Evaluate | Knowledge and wisdom | Topic 6.1 task; MCQ-01; RRQ-03; ERQ-01 |
| U6-04 | Understand / Analyze | Contributions of Muslims to knowledge | Topic 6.2 check 1; MCQ-06; RRQ-04; ERQ-02 |
| U6-05 | Analyze | Islamic civilization | Topic 6.2 check 3; MCQ-05; RRQ-05; ERQ-02 |
| U6-06 | Apply / Analyze | Science and education in Islam | Topic 6.2 task; RRQ-06; ERQ-04 |
| U6-07 | Understand / Analyze | Islam and human rights | Topic 6.3 check 2; MCQ-10; RRQ-09; ERQ-03 |
| U6-08 | Apply / Evaluate | Peace, tolerance and coexistence | Topic 6.3 task; MCQ-08; RRQ-07; ERQ-03 |
| U6-09 | Analyze / Evaluate | Islam and modern challenges | Topic 6.3 check 3; MCQ-09; RRQ-08; ERQ-05 |

The guide lists no Unit 6 teaching strategies or practical-work section, so no teacher-notes file is invented. No Urdu files exist to migrate. Cases are expressly invented; scriptural paraphrases and practical inferences are separated. Bhat is identified as a book review. The title-only mapped print reading is not presented as consulted. Rights comparisons are partial and non-equivalent. Figure markers preserve the approved IDs and archetypes. G3/G5 remain open; G2 records deterministic draft evidence only.

### Validation limits for the next job

The crew brief prohibits Playwright, so `scripts/measure-figure-text.mjs` (which launches Chromium through Playwright) and browser layout checks were not run. Six light and six dark figure previews were rasterised serially through Sharp under `scripts/heavy.sh` and visually inspected. CSS variables were resolved only in the scratch preview input because the local raster renderer does not support them; committed SVGs retain the published tokens. A browser geometry run remains for the next permitted validation session.

The full UDHR text could not be fetched from official routes on this host; its indexed wording was checked but its source is explicitly declared unverifiable pending G3 retrieval. G3 must include an independent Islamic Studies subject review. Translation, Urdu figure labels and global glossary banking are separate jobs. No build, dev server, Playwright, push or PR is part of this crew run.

### Final crew validation

After merging `origin/main` (which added the course overview), `node scripts/prepare-gate-evidence.mjs GISS-401 6` passed all eight draft gates and wrote `reviews/unit-06/G2/20261103T000422959Z-gates.json`. All five authored MDX bodies compile with `@mdx-js/mdx`; six light and six dark figure variants pass the figure gate and dark freshness check. Unit 6 appended its own sections to the shared bound excerpts `quran-translation.md` and `bhat-2019-education.md`; Unit 1's entries there are unchanged.
