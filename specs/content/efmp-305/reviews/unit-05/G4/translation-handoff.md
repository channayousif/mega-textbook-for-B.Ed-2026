# EFMP-305 Unit 5 translation handoff

- Date: 2026-10-19. Translator: Antigravity, `crew/efmp-305-u05-translate-r1`.
- English baseline commit: `3a8a8c0e6162e865cd996a8700fcd35339d92e21` (`content(efmp-305): translate Unit 4 teaching files` incorporating Unit 5 assessment list alignment).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-305/unit-05/fig-U5-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-05/fig-U5-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-05/fig-U5-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-05/fig-U5-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-05/fig-U5-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-05/fig-U5-6.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 6 mirror files match English baseline structure, heading level vectors (6, 17, 23, 17, 8, 11), component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas 1:1.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د). The Urdu MCQ answer keys correspond 100% to English (b, b, c, b, b, b, d, c, c, c).
- Bounded answers section is fully translated into academic-plain Urdu with zero English prose leaks.
- Key terms declared in `index.mdx`:
  - `Inclusive Education`: `شمولیتی تعلیم` (banked in `specs/content/terminology.csv`)
  - `Attitude`: `رویہ` (banked in `specs/content/terminology.csv`)
  - `Accommodation (access adaptation)`: `سہولت کاری` (banked in `specs/content/terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/efmp-305/concepts/unit-05.md` are new to this course and not yet banked in `terminology.csv`:

| English Term | Proposed Urdu Label | Concept ID |
|---|---|---|
| National Education Policy | قومی تعلیمی پالیسی | CON:EFMP-305-5-1 |
| Policy statement is not a legal duty | پالیسی کا اعلان قانونی ذمہ داری نہیں | CON:EFMP-305-5-2 |
| The policy's inclusion commitments | پالیسی کے شمولیتی وعدے | CON:EFMP-305-5-3 |
| The policy's silences | پالیسی کی خاموشیاں | CON:EFMP-305-5-4 |
| Reading a policy: addressee, verb, mechanism, absence | پالیسی پڑھنے کے چار سوال | CON:EFMP-305-5-5 |
| Provincial and federal law after devolution | صوبائی اور وفاقی قانون، اختیارات کی منتقلی کے بعد | CON:EFMP-305-5-6 |
| Purpose and extent of the Sindh Act 2018 | سندھ ایکٹ 2018 کا مقصد اور دائرہ | CON:EFMP-305-5-7 |
| Statutory definition of inclusive education | شمولیتی تعلیم کی قانونی تعریف | CON:EFMP-305-5-8 |
| Statutory definition of a person with disabilities | معذور شخص کی قانونی تعریف | CON:EFMP-305-5-9 |
| Non-discrimination, purpose or effect | عدم امتیاز: مقصد ہو یا نتیجہ | CON:EFMP-305-5-10 |
| Reasonable accommodation | مناسب سہولت کاری | CON:EFMP-305-5-11 |
| Reasonable accommodation is not a budget test | مناسب سہولت کاری بجٹ کا سوال نہیں | CON:EFMP-305-5-12 |
| Limits of accommodation | سہولت کاری کی حدود | CON:EFMP-305-5-13 |
| Admission without discrimination | بغیر امتیاز داخلہ | CON:EFMP-305-5-14 |
| Accessible building and campus as a duty | قابلِ رسائی عمارت اور احاطہ بطور ذمہ داری | CON:EFMP-305-5-15 |
| Individualised support and appropriate modes of communication | انفرادی معاونت اور مناسب ذریعۂ ابلاغ | CON:EFMP-305-5-16 |
| Monitoring participation, attainment and completion | شرکت، حاصلات اور تکمیل کی نگرانی | CON:EFMP-305-5-17 |
| The federal comparison and its limits | وفاقی ایکٹ سے موازنہ اور اس کی حدود | CON:EFMP-305-5-18 |
| School responsibilities audit | اسکولی ذمہ داریوں کا جائزہ | CON:EFMP-305-5-19 |
| Teacher attitude as a pattern of decisions | استاد کا رویہ بطور فیصلوں کا سلسلہ | CON:EFMP-305-5-20 |
| Attitude-action cycle | رویہ اور عمل کا چکر | CON:EFMP-305-5-21 |
| Low expectation | کم توقع | CON:EFMP-305-5-22 |
| Interrupting the cycle: duty at the decision, contact at the evidence | چکر توڑنا: فیصلے پر ذمہ داری، شاہدی پر رابطہ | CON:EFMP-305-5-23 |
| What Pakistani teachers report about inclusion | پاکستانی اساتذہ شمولیت کے بارے میں کیا بتاتے ہیں | CON:EFMP-305-5-24 |
| Scope limits of attitude evidence | رویے کے شواہد کی حدود | CON:EFMP-305-5-25 |
| Policy-to-practice gap | پالیسی اور عمل کا فرق | CON:EFMP-305-5-26 |
| Four levels of a gap: document, system, school, classroom | فرق کی چار سطحیں: دستاویز، نظام، اسکول، جماعت | CON:EFMP-305-5-27 |
| The teacher-sized portion of the gap | فرق کا وہ حصہ جو استاد کا ہے | CON:EFMP-305-5-28 |

## Statutory Framing and Verification

- The six mandatory statutory terms (inclusive education, person with disabilities, discrimination, reasonable accommodation, non-discrimination, accessibility) retain the English terms in parentheses on first use.
- Quoted statutory clauses from the Sindh Act 2018 and the ICT Act 2020 preserve the verbatim English text alongside faithful academic-plain Urdu translations.
- All 6 SVG `<desc>` tags match carrier `alt` strings in the Urdu topic files.
- Zero em dashes (U+2014) verified across all files via `check:no-em-dash`.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Figure variants check (`npm run figures:variants:check`): 810 of 810 passed.
- Structural and heading vector parity verified across all 6 files.
- `translation_status` remains `draft` across all 6 files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-305/tasks.md` marked in progress (`▣`) with blank reviewer initials (no self-certification claimed).
