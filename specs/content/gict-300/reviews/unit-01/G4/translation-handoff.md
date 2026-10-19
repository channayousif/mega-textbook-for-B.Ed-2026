# GICT-300 Unit 1 translation handoff

- Date: 2026-10-18. Translator: Antigravity, `crew/gict-300-u01-translate-r1`.
- English checkout baseline: `ee13c3e24483e5a59d9a19c7bc1c9a626d7f9d84` (fix(gict-300): apply G3 Unit 1 review repairs (run 001, advisory)).
- Files compared and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-01/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/gict-300/unit-01/fig-U1-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-01/fig-U1-8.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 7 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) with option order strictly preserved.
- Key terms declared in `index.mdx` are bound to `terminology.csv`:
  - `Assessment`: `تشخیص` (banked in `terminology.csv`)
  - `Self-Assessment`: `خود جائزہ` (banked in `terminology.csv`)
  - `Rubric`: `معیارِ جانچ` (banked in `terminology.csv`)
  - `Lesson Plan`: `سبقی منصوبہ` (banked in `terminology.csv`)
  - `Development`: `نشوونما` (banked in `terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/gict-300/concepts/unit-01.md` are specific to this computing unit and not yet banked in `specs/content/terminology.csv`:

| English Term | Proposed Urdu Label | Concept ID |
|---|---|---|
| Computer literacy | کمپیوٹر خواندگی | CON:GICT-300-1-1 |
| Information and Communication Technology | معلومات و مواصلات کی ٹیکنالوجی (آئی سی ٹی) | CON:GICT-300-1-2 |
| Areas of digital competence | ڈیجیٹل صلاحیتوں کے شعبے | CON:GICT-300-1-3 |
| Evolution of computers | کمپیوٹر کی ارتقائی تاریخ | CON:GICT-300-1-4 |
| Stored-program concept | محفوظ پروگرام کا تصور | CON:GICT-300-1-5 |
| Five generations of computers | کمپیوٹر کی پانچ نسلیں | CON:GICT-300-1-6 |
| Classification by functionality | افادیت کے لحاظ سے درجہ بندی | CON:GICT-300-1-7 |
| Classification by size and power | حجم اور طاقت کے لحاظ سے درجہ بندی | CON:GICT-300-1-8 |
| Embedded computer | اندرونی جڑا ہوا کمپیوٹر | CON:GICT-300-1-9 |
| Digital divide | ڈیجیٹل خلا | CON:GICT-300-1-10 |
| ICT applications across fields | مختلف شعبوں میں آئی سی ٹی کے استعمالات | CON:GICT-300-1-11 |
| Balanced view of ICT impact | آئی سی ٹی کے اثرات پر متوازن نقطہ نظر | CON:GICT-300-1-12 |

## Semantic and Register Polish

- Completed noun phrase for the embedded computing class from bare adjective "اندرونی" to "اندرونی کمپیوٹر" in `topic-03.mdx` description, `topic-03.mdx` activity 2, and `unit-assessment.mdx` summary.
- Preserved restored teacher-notes clause ("اس تضاد کو اس نتیجے تک پہنچنے دیں: چھوٹا، سستا، زیادہ قابلِ اعتماد اور تیز") in misconception 3.
- Maintained correct transliteration "سلائیڈ رول" across Topic 1.3, assessment, and `fig-U1-5.ur.svg`.
- Verified dotless Urdu yeh (U+06CC) in "ارتقائی" throughout unit.
- Retained exact option ordering, marks, and Bloom levels in assessment.

## Validation and Review Boundary

- Fast content gates (`npm run check:content`): all 13 gates pass.
- Figure variants check (`npm run figures:variants:check`): all 772 sources clean.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity) and `check:figures` (bilingual figures) passed cleanly; `check:pipeline-gate` confirmed all declared `key_terms` conform to `terminology.csv`. Reverted immediately to `draft`.
- Zero em dashes (U+2014) verified across all authored files via `check:no-em-dash`.
- `translation_status` remains `draft` across all 7 files pending fresh independent G5 review.
- G4 tracker row in `specs/content/gict-300/tasks.md` marked in progress (`▣`) with no reviewer initials or self-certification.
