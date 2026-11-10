# EFPG-401 Unit 2 translation handoff

- Date: 2026-11-10. Translator: opencode, branch `crew/efpg-401-u02-translate`.
- English checkout baseline: `07090c9d5` (`feat(efpg-401): author unit 02 teaching of english`).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/topic-05.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-02/unit-assessment.mdx`
- Figure assets localized and verified:
  - `static/img/figures/efpg-401/unit-02/fig-U2-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-8.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-9.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-02/fig-U2-10.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 7 mirror files match the English baseline structure, heading level vectors, component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas.
- Topic titles follow the required format: `موضوع 2.1 - نثر کی تدریس`, `موضوع 2.2 - شاعری کی تدریس`, `موضوع 2.3 - تحریر کی تدریس`, `موضوع 2.4 - الفاظ کی تدریس`, `موضوع 2.5 - تلفظ کی تدریس`.
- Unit assessment carries the complete 10 MCQ + 10 RRQ + 5 ERQ item bank with the bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`), identical marks and option mappings (A -> الف, B -> ب, C -> ج, D -> د).
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in all authored content and figure SVGs.
- Temporary flip of both `index.mdx` files to `reviewed` confirmed file-set parity, heading-vector parity, figure parity and `key_terms` conformance; the only findings were the expected G4/G5 tracker rows, and both files were flipped back to `draft`.

## Banked Key Terms (Declared in index.mdx)

Every `ur` value conforms to `specs/content/terminology.csv`:
- `Assessment`: `تشخیص`
- `Self-Assessment`: `خود جائزہ`
- `Rubric`: `معیارِ جانچ`
- `Mother Tongue`: `مادری زبان`
- `Teaching Strategy`: `حکمتِ تدریس`
- `Lesson Plan`: `سبقی منصوبہ`
- `Motivation`: `محرک`
- `Transfer of Learning`: `تعلم کی منتقلی`
- `Summative Assessment`: `مجموعی جائزہ`
- `Rote Learning`: `رٹا لگانا`

## Proposed Terms (Unbanked) for Curriculum Owner

The following labels are specific to this unit and not yet banked in `specs/content/terminology.csv`:

| English Term | Proposed Urdu Label | Reference |
|---|---|---|
| Prose lesson structure | نثری درس کا ڈھانچہ | CON:EFPG-401-2-1 |
| Comprehension question types | تفہیمی سوالات کی اقسام | CON:EFPG-401-2-2 |
| Poetry enjoyment and response | شاعری سے لطف اٹھانا اور جواب دینا | CON:EFPG-401-2-3 |
| Guided-to-free composition | رہنمائی سے آزاد تحریر | CON:EFPG-401-2-4 |
| Vocabulary presentation and strategies | الفاظ کی تدریس اور حکمت عملی | CON:EFPG-401-2-5 |
| Pronunciation, stress and intonation | تلفظ، زور اور لب و لہجہ | CON:EFPG-401-2-6 |
| Literal questions | صریح سوالات | Topic 2.1 |
| Inferential questions | استنباطی سوالات | Topic 2.1 |
| Personal response | ذاتی جواب | Topic 2.1 |
| Minimal pair | قریبی جوڑا | Topic 2.5 |
| Intelligibility | قابلِ فہمی | Topic 2.5 |
| Word stress | لفظی زور | Topic 2.5 |
| Sentence intonation | جملے کا لب و لہجہ | Topic 2.5 |
| Realia | حقیقی شے | Topic 2.4 |
| Mime | اشارہ | Topic 2.4 |
| Synonym | مترادف | Topic 2.4 |
| Guided writing | رہنمائی والی تحریر | Topic 2.3 |
| Free writing | آزاد تحریر | Topic 2.3 |
| Completing | مکمل کرنا | Topic 2.3 |
| Copying | کاپی کرنا | Topic 2.3 |
| Warm-up | گرم جوشی | Topic 2.1 |
| Model reading | ماڈل خوانی | Topic 2.1 |
| Silent reading | خاموش خوانی | Topic 2.1 |
| Follow-up | بعد کا کام | Topic 2.1 |
| Rhythm | تال | Topic 2.2 |
| Rhyme | قافیہ | Topic 2.2 |
| Imagery | خیالِ تصویری | Topic 2.2 |
| Literacy competence | سوادی صلاحیت | Topic 2.2 |
| Strategy training | حکمت عملی کی تربیت | Topic 2.4 |
| Word bank | الفاظی ذخیرہ | Topic 2.3 figure |
| Sentence frame | جملے کا ڈھانچہ | Topic 2.3 figure |

## Terminology Decisions to Confirm

- **Stress:** this unit uses `زور` (from the concept label `تلفظ، زور اور لب و لہجہ`). Unit 1's accepted mirror uses `دباؤ` for the same concept. The owner may want one term across the course.
- **Minimal pair:** `قریبی جوڑا` follows the Unit 1 mirror's usage.
- **Literal questions:** `صریح` (explicit) rather than `حرفی` or `حقیقی`.
- **Poem text in fig-U2-4:** the four-line English rain poem is kept in English because it is the text being taught; only the annotation labels (`تصویر`, `قافیہ`, `تال`) are Urdu. The rhyming words `street`/`feet` remain English, matching the Urdu topic file's worked example.

## Status and Handoff Note

- `translation_status` remains `draft` pending independent G5 review per constitution Article III.2 and ADR-0019.
- No certification or approval is claimed by this translation pass.
