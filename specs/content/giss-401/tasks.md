# GISS-401 Islamic Studies - Task tracker

## Status: content spec approved (G0/G1, D-2026-0079); authoring in progress

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Introduction to Islamic Studies and the Fundamental Beliefs of Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (claude); G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |
| 2 | Sources of Islamic Knowledge: the Qur'an and the Sunnah | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job; G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |
| 3 | Worship and the Moral System of Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (agy); G2 gate evidence recorded below; G3 and Urdu remain open |
| 4 | The Social System and the State in Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (claude); G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |
| 5 | The Economic and Political Systems of Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (agy); G2 gate evidence recorded below; G3 and Urdu remain open |
| 6 | Islam, Education, Civilization and Contemporary Issues | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job; G2 gate evidence recorded below; G3 (with a qualified Islamic Studies reviewer) and Urdu remain open |
| 7 | Islamic Ethics in Professional Life | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (claude); G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-01/G2/20261103T141632446Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/giss-401/reviews/unit-01/G3/fb1baf5a-8583-4edd-a5d3-bf7e01304eaf.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; 4 Sharp PNG renders verified; G3 remains open and unsigned |
| Unit 1 | G4 ur-translation | ▢ | | separate job |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 1 | G6 assets | ▣ | | four English schematics placed with dark variants; `measure-figure-text` not run (crew brief bars Chromium), CI `figure-geometry` is the first measured check |
| Unit 1 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-03/G2/20261103T112249231Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory: escalate (agent:codex-g3-reviewer); report at specs/content/giss-401/reviews/unit-03/G3/01a19f68-d755-7131-a30e-d230853e3b7a.json; author-run provenance and parent-prepared handoff absent; required browser/print inspection barred by crew brief; qualified Islamic Studies scholar review pending; G3 remains open and unsigned |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-03/G2/20261103T141632847Z-gates.json |
| Unit 3 | G4 ur-translation | ▢ | | separate job |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ✅ | auto:gates | 4 schematics placed with dark variants |
| Unit 3 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-04/G2/20261103T141633054Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 4 | G4 ur-translation | ▢ | | Separate Urdu job; English pages retain translation_status: draft. |
| Unit 4 | G5 ur-review | ▢ | | Pending accepted English baseline and translated mirror. |
| Unit 4 | G6 assets | ▣ | | Four English schematics and dark variants placed to meet current figure gates; geometry validation pending; Urdu localisation is a separate job. |
| Unit 4 | G7 publish | ▢ | | Publication is outside this authoring job. |
| Unit 2 | G1 unit-spec | ✅ | auto:gates | Approved spec and owner ruling D-2026-0079, 2026-11-02; not a new intake evaluation |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-02/G2/20261110T051749123Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | Fresh independent review needed, including qualified Islamic Studies scholar review of belief and law |
| Unit 2 | G4 ur-translation | ▢ | | Separate job; no Urdu mirror authored here |
| Unit 2 | G5 ur-review | ▢ | | Pending G3 and Urdu translation; authored concept labels also need review |
| Unit 2 | G6 assets | ▣ | | Six original English SVG schematics placed with derived dark variants; Urdu `.ur.svg` assets belong to the translation job; browser text-geometry measurement not run (crew bars Chromium), CI figure-geometry job pending |
| Unit 2 | G7 publish | ▢ | | No publication claimed; catalog integration and owner authority remain separate |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-06/G2/20261103T112249582Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/giss-401/reviews/unit-06/G3/ad110b4d-3d0d-4777-98c5-9930d6961900.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; 6 Sharp PNG renders verified; G3 remains open and unsigned |
| Unit 5 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-05/G2/20261110T045015770Z-gates.json |
| Unit 5 | G3 en-review | ▢ | | awaiting an independent reviewer; no review performed by author |
| Unit 5 | G3 en-review | ▢ | | advisory: escalate (agent:codex-g3-reviewer); report at specs/content/giss-401/reviews/unit-05/G3/01a1b0a0-8bb6-7fa3-8dbd-f1262f8137cd.json; source binding, provenance, scholar review and browser/print evidence incomplete; actionable F04-F14 recorded; G3 remains open and unsigned |
| Unit 5 | G4 ur-translation | ▣ | agent:agy | Four Urdu pages and four RTL schematic variants with derived dark twins prepared from English baseline; translation_status stays draft pending independent G5; handoff at reviews/unit-05/G4/translation-handoff.md. No completion or review certification claimed. |
| Unit 5 | G5 ur-review | ▢ | | |
| Unit 5 | G6 assets | ✅ | auto:gates | 4 schematics placed with dark variants |
| Unit 5 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-06/G2/20261103T141633410Z-gates.json |
| Unit 6 | G4 ur-translation | ▢ | | Separate job; English pages carry untranslated notices |
| Unit 6 | G5 ur-review | ▢ | | Pending translation and independent review |
| Unit 6 | G6 assets | ▣ | | Six English schematics placed with derived dark variants; Urdu localisation pending |
| Unit 7 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-07/G2/20261110T051317873Z-gates.json |
| Unit 7 | G3 en-review | ▢ | | advisory: escalate (agent:codex-g3-reviewer); report at specs/content/giss-401/reviews/unit-07/G3/01a1b093-4435-7a02-a21d-e78212bba060.json; ERQ 2 question/rubric mismatch, MCQ 10 Bloom tag and private family circumstances need author repair; parent provenance, source bundle, qualified Islamic Studies scholar and browser/print evidence pending; G3 remains open and unsigned |
| Unit 7 | G4 ur-translation | ▢ | | separate job |
| Unit 7 | G5 ur-review | ▢ | | |
| Unit 7 | G6 assets | ▣ | | three English schematics placed with dark variants; `measure-figure-text` not run (crew brief bars Chromium), CI `figure-geometry` is the first measured check |
| Unit 7 | G7 publish | ▢ | | no publication requested by this authoring job |

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

## Unit 2 advisory English review, 2026-11-06

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 2 | G3 en-review | ▢ | | advisory: escalate (agent:codex-g3-reviewer); report at specs/content/giss-401/reviews/unit-02/G3/01a1b085-18a8-79d2-8bc8-93c034c663a8.json; non-direct-ruling Ijma/Qiyas blueprint unmet; author-run provenance, qualified scholar review, full source verification, independent solve and browser/print evidence pending; G3 remains open and unsigned |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/giss-401/reviews/unit-02/G3/20261108T203238Z-g3-desk-82690fcb.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/giss-401/reviews/unit-05/G3/20261108T203238Z-g3-desk-922808a1.json |
| Unit 7 | G3 en-review | ⏳ | CMY | review:specs/content/giss-401/reviews/unit-07/G3/20261108T203238Z-g3-desk-750f7524.json |
| Unit 5 | G3 en-review | ▢ | | advisory: revise; repairs applied for report specs/content/giss-401/reviews/unit-05/G3/20261108T203238Z-g3-desk-922808a1.json (opencode crew giss-401-u05-repair_en, 2026-11-10). F04-F14: Unverifiable sources declared and translation named; over-15-word quotations shortened or paraphrased; Mudarabah/Musharakah loss rules and ihtikar item repaired; risk-transfer and poverty claims qualified; Articles 20/22/25/36/38(f) stated with their qualifications; Ali, Umar and Charter accounts labelled reported; secular caricatures removed; plain-language rewrites; concept-item audit; hypothetical labels and funding/authority/confidentiality limits; formative set clarified. See authoring/unit-05.md. G3 remains open and unsigned; host provenance, frozen source bundle, render inspection and qualified scholar review pending. |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/giss-401/reviews/unit-02/G3/20261108T203238Z-g3-desk-82690fcb.json |
| Unit 7 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/giss-401/reviews/unit-07/G3/20261108T203238Z-g3-desk-750f7524.json; ERQ 2 practical-advice deliverable added to the question and Urdu mirror, MCQ 10 retagged Remember (EN/UR), private family detail removed from the roster table and fig-U7-2 light/dark/Urdu schematics, role-modelling claims qualified as contextual, fig-U7-2 text equivalent added (EN/UR); parent provenance, source bundle, qualified Islamic Studies scholar and browser/print evidence pending; G3 remains open and unsigned |
