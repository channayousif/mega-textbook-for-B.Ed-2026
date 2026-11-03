# GISS-401 Islamic Studies - Task tracker

## Status: content spec approved (G0/G1); authoring in progress

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Introduction to Islamic Studies and the Fundamental Beliefs of Islam | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-03 by the crew author job (claude); G2 gate evidence recorded below; G3 (with the qualified Islamic Studies reviewer the spec asks for) and Urdu remain open |
| 2 | Sources of Islamic Knowledge: the Qur'an and the Sunnah | ☐ | ☐ | ☐ | ☐ | | |
| 3 | Worship and the Moral System of Islam | ☐ | ☐ | ☐ | ☐ | | |
| 4 | The Social System and the State in Islam | ☐ | ☐ | ☐ | ☐ | | |
| 5 | The Economic and Political Systems of Islam | ☐ | ☐ | ☐ | ☐ | | |
| 6 | Islam, Education, Civilization and Contemporary Issues | ☐ | ☐ | ☐ | ☐ | | |
| 7 | Islamic Ethics in Professional Life | ☐ | ☐ | ☐ | ☐ | | |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/giss-401/reviews/unit-01/G2/20261102T230118463Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | awaiting an independent reviewer and a qualified Islamic Studies reviewer (content spec, drafting note 2); no review performed by author |
| Unit 1 | G4 ur-translation | ▢ | | separate job |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 1 | G6 assets | ▣ | | four English schematics placed with dark variants; `measure-figure-text` not run (crew brief bars Chromium), CI `figure-geometry` is the first measured check |
| Unit 1 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 6 | G2 en-draft | ▣ | agent:codex | English draft and four governance artefacts authored; G2 evidence pending |
| Unit 6 | G3 en-review | ▢ | | Independent Islamic Studies reviewer required; no certification claimed |
| Unit 6 | G4 ur-translation | ▢ | | Separate job; English pages carry untranslated notices |
| Unit 6 | G5 ur-review | ▢ | | Pending translation and independent review |
| Unit 6 | G6 assets | ▢ | | Six English schematics placed with derived dark variants; Urdu localisation pending |

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

`npm run check:content` after refreshing the ignored status report passes 12 of 13 gates. The sole finding is this unit's incomplete G2 row. `node scripts/prepare-gate-evidence.mjs GISS-401 6` stops before running gates with `missing required input: docs/semester-3/giss-401/course-overview.mdx`. The baseline at `origin/main` passed all 13 gates, so this is a new unresolved dependency, not inherited debt. A minimal overview candidate is prepared at `.crew/course-overview.mdx`; adding the course-level file requires a scope exception from the owner. No evidence or done row is fabricated.

All five authored MDX bodies compile with `@mdx-js/mdx`. All 46 figure-palette tests pass; six light and six dark variants pass the figure gate and dark freshness check. Once the overview is authorised and committed, prepare G2 evidence, update only Unit 6's G2 row, refresh content status and rerun the content suite.
