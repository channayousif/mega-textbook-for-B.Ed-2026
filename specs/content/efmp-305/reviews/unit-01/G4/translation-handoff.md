# EFMP-305 Unit 1 translation handoff

- Date: 2026-10-18. Translator: Antigravity, `crew/efmp-305-u01-translate-r1`.
- English baseline commit: `9e6da64883d6ddca99b5042617f09f582d9217be` (content(efmp-305): render bilingual schematics and place English figures).
- Resumed and reconciled the Urdu mirror; audited and polished translation quality, grammar, gender agreement, terminology consistency, and assessment answers.
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-teacher-notes.mdx`
- Figure assets verified and reconciled:
  - `static/img/figures/efmp-305/unit-01/fig-U1-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-01/fig-U1-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-01/fig-U1-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-01/fig-U1-4.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 5 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas 1:1.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د). The Urdu MCQ answer keys correspond 100% to English (c, b, b, b, b, c, c, a, b, b).
- Bounded answers section is fully translated into academic-plain Urdu with zero English prose leaks.
- Key terms declared in `index.mdx`:
  - `Inclusive Education`: `شمولیتی تعلیم` (banked in `specs/content/terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/efmp-305/concepts/unit-01.md` and `glossary.json` are not yet banked in `terminology.csv`. They are documented here as proposed terms for curriculum owner review and ratification:

| English Term | Proposed Urdu Label | Concept ID / Source |
|---|---|---|
| Segregation | علیحدگی | CON:EFMP-305-1-2 / `glossary.json` |
| Integration | یکجائی | CON:EFMP-305-1-3 / `glossary.json` |
| Inclusion spectrum | شمولیت کا سپیکٹرم | CON:EFMP-305-1-4 |
| Equality | مساوات | CON:EFMP-305-1-5 / `glossary.json` |
| Equity | انصاف | CON:EFMP-305-1-6 / `glossary.json` |
| Principles of inclusion | شمولیت کے اصول | CON:EFMP-305-1-7 |
| Importance of inclusion in Pakistan | پاکستان میں شمولیت کی ضرورت | CON:EFMP-305-1-8 |
| Common misconceptions about inclusion | شمولیت کے بارے میں عام غلط فہمیاں | CON:EFMP-305-1-9 |

**Terminology note:** The governance file `specs/content/efmp-305/concepts/unit-01.md` uses "شامل تعلیم" for "Inclusive education" while the frozen terminology bank mandates "شمولیتی تعلیم". The translation across all unit files adheres strictly to the bank mandate "شمولیتی تعلیم". The curriculum owner should reconcile `concepts/unit-01.md` before G5 review.

## Quality and Register Polish

- `index.mdx`: Naturalized introductory paragraph and outcomes; corrected grammatical construction in pre-requisites and unit overview.
- `topic-01.mdx`: Improved real classroom scenario; corrected mistranslation of "not being cruel"; standardized "شمولیتی تعلیم"; translated UNESCO 2020 definition accurately (replacing unidiomatic phrasing with "اخراج کو کم کر کے"); corrected "برنامج" to "پروگرام"; repaired typos ("معذر" -> "معذور", "نقطہ ظر" -> "نقطہ نظر", "علیحد" -> "علیحدگی"); corrected "two weeks" mistranslation to "ہفتے میں دو بار" (twice a week); aligned school levels (Grade 3 / تیسری جماعت, ground floor / گراؤنڈ فلور).
- `topic-02.mdx`: Corrected mistranslation of exclusion (replaced spurious "پردگی" with academic "اخراج"); corrected "نگرواں" to "سہولت کار"; replaced hallucinated "پرسنگری" with "محض خوش فہمی نہیں"; corrected "تیس" to "تین" in check-your-understanding; replaced transliteration "لیٹرینہ" with proper Urdu "بیت الخلا".
- `fig-U1-4.ur.svg`: Corrected carrier alt and SVG `<desc>` from "پردگی کا چکر" to "اخراج کا چکر", and regenerated `.ur.dark.svg` via `npm run figures:variants`.
- `unit-assessment.mdx`: Polished all MCQ, RRQ, and ERQ prompts; fixed hallucinated "بضدی" (mistranslation of "vs") with proper "بمقابلہ"; corrected "اسپیښ تھراپی" to "اسپیچ تھراپی" and "وسائل کمرے" to "ریسورس روم"; polished mark schemes and rubrics.
- `unit-teacher-notes.mdx`: Corrected typo "ترتیب نہ پلیٹیں" to "ترتیب نہ الٹیں"; corrected "معذری" to "معذوری"; corrected mistranslation of "favouritism" ("جان پڑھنا نہیں" to "جانبداری نہیں").

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Figure variants check (`npm run figures:variants:check`): 810 of 810 passed.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed cleanly with zero terminology errors. Both index files were immediately reverted back to `draft`.
- Zero em dashes (U+2014) verified across all files via `check:no-em-dash`.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-305/tasks.md` marked in progress (`▣`) with blank reviewer initials (no self-certification claimed).
