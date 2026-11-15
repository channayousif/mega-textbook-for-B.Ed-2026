# EFPG-401 Teaching of English - Task tracker

## Status: content spec approved (G0/G1); Units 1, 2, 4 and 7 authored; Unit 6 English draft complete

English-only authoring from the approved Unit 1, Unit 2, Unit 4, Unit 6 and Unit 7 content-specs. No publication or review certification is claimed by this tracker. Other units are outside this job.

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Four Skills of Language Learning | ✓ | ☐ | ▣ | ☐ | placed (EN+UR) | English authored 2026-11-10; eight schematic SVGs placed with dark variants; Urdu mirror drafted at G4 with 8 .ur.svg/.ur.dark.svg schematics; G3 and G5 remain open |
| 2 | Teaching of English | ▣ | ☐ | ▣ | ☐ | placed (EN+UR) | English authored; gate evidence preparation pending commit; Urdu mirror drafted at G4 with 10 .ur.svg/.ur.dark.svg schematics; G3 and G5 remain open |
| 3 | Methods of Teaching English | ☐ | ☐ | ☐ | ☐ | ☐ | not started |
| 4 | Teaching of Grammar | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-10; three schematic SVGs placed with dark variants; G3 and G5 remain open |
| 5 | Lesson Planning | ☐ | ☐ | ☐ | ☐ | ☐ | not started |
| 6 | A.V. Aids in Teaching of English | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-10; ten schematic SVGs placed with dark variants; Urdu mirror is a separate job; G3 and G5 remain open |
| 7 | Assessment | ✓ | ☐ | ▣ | ☐ | placed (EN+UR) | English authored 2026-11-10; four schematic SVGs placed with dark variants; Urdu mirror drafted at G4 with 4 .ur.svg/.ur.dark.svg schematics; G3 and G5 remain open |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efpg-401/reviews/unit-01/G2/20261109T231800734Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | Awaiting independent qualified review; author self-check is not G3 |
| Unit 1 | G4 ur-translation | ▣ | agent:agy | Six-file Urdu mirror and eight localized SVG schematics with derived dark variants prepared from English 73c0c4c73; key_terms bank-bound; check:content clean; translation_status stays draft pending independent G5. [Handoff](reviews/unit-01/G4/translation-handoff.md). |
| Unit 1 | G5 ur-review | ▢ | | Awaiting translation and independent review |
| Unit 1 | G6 assets | ▣ | | Eight English schematic SVGs placed with derived dark variants; measure-figure-text verified |
| Unit 1 | G7 publish | ▢ | | No publication or deployment performed by this job |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efpg-401/reviews/unit-02/G2/20261114T223818407Z-gates.json |
| Unit 2 | G3 en-review | ▢ | agent:agy | Advisory escalate: specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654.json; static checks clean, 25 assessments independently solved; render unperformed (deployed SHA 33d5feca != HEAD 925047c67); no certification |
| Unit 2 | G4 ur-translation | ▣ | agent:opencode | Six-file Urdu mirror and ten localized SVG schematics with derived dark variants prepared from English 07090c9d5; key_terms bank-bound; check:content clean; translation_status stays draft pending independent G5. [Handoff](reviews/unit-02/G4/translation-handoff.md). |
| Unit 2 | G5 ur-review | ☐ | | Awaiting translation and independent review |
| Unit 2 | G6 assets | ☐ | | Ten figures planned at prompt-only; rendering is a separate generate-figures job |
| Unit 2 | G7 publish | ☐ | | No publication or deployment performed by this job |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efpg-401/reviews/unit-06/G2/20261115T003029788Z-gates.json |
| Unit 6 | G3 en-review | ▢ | agent:agy | Advisory escalate: specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab.json; static checks clean, 25 assessments independently solved; render unperformed (deployed SHA 1793d493 != HEAD 3f513718); no certification |
| Unit 6 | G6 assets | ▣ | | Ten English schematic SVGs placed with derived dark variants; measure-figure-text verified. Five topic scenes and one unit banner inspected and placed in both locales as shared optimized WebP assets, with Urdu alt text; Codex built-in generation used after Gemini quota exhaustion (ADR-0029). |
| Unit 7 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efpg-401/reviews/unit-07/G2/20261115T014555852Z-gates.json |
| Unit 7 | G3 en-review | ▢ | agent:agy | Advisory escalate: specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a.json; static checks clean, 25 assessments independently solved; render unperformed (deployed SHA 1793d493 != HEAD 4afd7143); no certification |
| Unit 7 | G4 ur-translation | ▣ | agent:agy | Four-file Urdu mirror and four localized SVG schematics with derived dark variants prepared from English 0c79bb31d; key_terms bank-bound; check:content clean; translation_status stays draft pending independent G5. [Handoff](reviews/unit-07/G4/translation-handoff.md). |
| Unit 7 | G5 ur-review | ▢ | | Awaiting translation and independent review |
| Unit 7 | G6 assets | ▣ | | Four English schematic SVGs placed with derived dark variants; measure-figure-text verified. Two topic scenes and one unit banner inspected and placed in English and Urdu as shared optimized WebP assets; Codex built-in image generation used after Gemini quota exhaustion (ADR-0029). |
| Unit 7 | G7 publish | ▢ | | No publication or deployment performed by this job |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efpg-401/reviews/unit-04/G2/20261114T232941025Z-gates.json |
| Unit 4 | G3 en-review | ▢ | agent:agy | Advisory escalate: specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e.json; static checks clean, 25 assessments independently solved; render unperformed (deployed SHA 925047c6 != HEAD 1793d493); no certification |
| Unit 4 | G4 ur-translation | ▣ | agent:agy | Three-file Urdu mirror and three localized SVG schematics with derived dark variants prepared from English b43a52ced; key_terms bank-bound; check:content clean; translation_status stays draft pending independent G5. [Handoff](reviews/unit-04/G4/translation-handoff.md). |
| Unit 4 | G5 ur-review | ☐ | | Awaiting translation and independent review |
| Unit 4 | G6 assets | ✓ | | Three schematic SVG pairs with derived dark variants; topic scene fig-U4-4 and banner fig-U4-5 inspected and placed in both locales as shared optimized WebP assets. Codex built-in image generation used after Gemini quota exhaustion (ADR-0029). |
| Unit 4 | G7 publish | ☐ | | No publication or deployment performed by this job |

Reading estimates use final visible text at 180-200 words per minute: index 3, Topic 1.1 15, Topic 1.2 15, Topic 1.3 14, Topic 1.4 15, assessment 14, total 76 minutes within the approved 55-80 depth budget band. Assessment contains 10 MCQs, 10 RRQs and 5 ERQs with self-study guidance in its final bounded section. Default weighting remains 60% summative and 40% formative. The guide supplies course-level teaching strategies and practical work, and no separate unit teacher-notes page was required.

Unit 6 reading estimates use the same 180-200 words per minute: index 3, Topic 6.1 7, Topic 6.2 8, Topic 6.3 7, Topic 6.4 7, Topic 6.5 7, assessment 15, total 54 minutes within the approved 35-55 depth budget band. Assessment contains 10 MCQs, 10 RRQs and 5 ERQs with self-study guidance in its final bounded section. Default weighting remains 60% summative and 40% formative. The guide supplies course-level teaching strategies and practical work, and no separate unit teacher-notes page was required.

Unit 7 reading estimates use the same 180-200 words per minute: index 3, Topic 7.1 9, Topic 7.2 8, assessment 13, total 33 minutes within the approved 25-40 depth budget band. Assessment contains 10 MCQs, 10 RRQs and 5 ERQs with self-study guidance in its final bounded section. Default weighting remains 60% summative and 40% formative. The guide supplies course-level teaching strategies and practical work, and no separate unit teacher-notes page was required.

Unit 4 reading estimates: index 3, Topic 4.1 19, assessment 10, total 32 minutes within the approved 25-40 depth budget band. The assessment contains 10 MCQs, 10 RRQs and 5 ERQs with self-study guidance in its final bounded section.
