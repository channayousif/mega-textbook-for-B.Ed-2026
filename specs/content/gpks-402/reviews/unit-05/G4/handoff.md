# GPKS-402 Unit 5 Urdu translation handoff

- Translator: agent:agy, crew/gpks-402-u05-translate, 2026-10-28.
- English baseline: `dcb20e769f8b692c00c7ef5485b1870c1de358ab` (feat(content): author GPKS-402 unit 5 economy and society); advisory G3 report recorded in `f9649691`. English files remain unchanged.
- Complete four-page same-named mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-05/`:
  - `index.mdx`
  - `topic-01.mdx`
  - `topic-02.mdx`
  - `unit-assessment.mdx`
- Four Urdu schematic SVGs (`fig-U5-1.ur.svg`, `fig-U5-2.ur.svg`, `fig-U5-3.ur.svg`, `fig-U5-4.ur.svg`) and their four derived dark variants (`.ur.dark.svg`) wired into the Urdu topic pages. All 8 variants pass `node scripts/measure-figure-text.mjs` with 0 geometry errors.
- Structural parity: heading-level vectors match 100%; component counts match (4 Figure, 9 Glossary, 3 PrintHandout, 1 TranslationStatusBadge); 50 numbered assessment items match.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B). Urdu danda (`۔`), commas (`،`) and question marks (`؟`) used throughout.
- `translation_status` remains `draft` throughout; independent G5 review remains open.

## Terminology working set

The frozen terminology bank (`specs/content/terminology.csv`) was consulted. The unit's Urdu `index.mdx` declares the banked terms in `key_terms`:
- `Mother Tongue` = مادری زبان
- `Pakistan Studies` = پاکستان کے مطالعہ

All nine `<Glossary term="...">` occurrences retain their exact English lookup keys into `glossary.json`, with the visible child text translated into Urdu:
- `<Glossary term="Economy">معیشت</Glossary>`
- `<Glossary term="Poverty">غربت</Glossary>`
- `<Glossary term="Human capital">انسانی سرمایہ</Glossary>`
- `<Glossary term="Family">خاندان</Glossary>`
- `<Glossary term="Role">کردار</Glossary>`
- `<Glossary term="Social institution">سماجی ادارہ</Glossary>`
- `<Glossary term="Joint family">مشترکہ خاندان</Glossary>`
- `<Glossary term="Nuclear family">بنیادی خاندان</Glossary>`
- `<Glossary term="Culture">ثقافت</Glossary>`

Proposed unbanked terms for the curriculum owner and independent G5 reviewer (aligned with `specs/content/gpks-402/concepts/unit-05.md`):

| English | Urdu used |
|---|---|
| Economic sectors | معاشی شعبے |
| Production and trade links | پیداوار اور تجارت کے روابط |
| Poverty and inequality | غربت اور عدم مساوات |
| Debt and repayment pressure | قرض اور ادائیگی کا دباؤ |
| Education and productive capability | تعلیم اور پیداواری صلاحیت |
| Social structure | معاشرتی ساخت |
| Overlapping settlement and kinship | آبادی کی نوعیت اور رشتے داری کا باہمی تعلق |
| Cultural diversity | ثقافتی تنوع |
| Living traditions | زندہ روایات |
| Multilingual participation | کثیر لسانی شرکت |
| Gross domestic product (GDP) | مجموعی ملکی پیداوار (جی ڈی پی) |
| Value added | قدر کا اضافہ |
| Profit | منافع |
| Agriculture-based economy | زراعت پر مبنی معیشت |
| Intermediate product | درمیانی مصنوع |
| Domestic trade | ملکی تجارت |
| International trade | بین الاقوامی تجارت |
| Export | برآمد |
| Import | درآمد |
| Productivity | پیداواری صلاحیت |
| Inflation | افراطِ زر |
| Debt service | قرض کی خدمت |
| Authority | اختیار |
| Stereotyping | دقیانوسی تصورات |

## Validation and gates

- `npm run check:content`: All 13 content gates pass clean.
- Temporary `reviewed` probe: Setting both `index.mdx` files to `reviewed` confirmed that `validate:content` (heading parity, file-set parity), `check:figures` (Urdu figure carrier and `.ur.svg` presence), and `check:pipeline-gate` (terminology check) all pass. Both index files were immediately reverted to `draft`.
- Assessment bank: Preserved 10 MCQ, 10 RRQ and 5 ERQ items. Option order is strictly preserved with transliterated options (الف، ب، ج، د). MCQ sequence in key: ب، د، الف، ج، ب، الف، د، ج، ب، الف.
- Bounded answers section: Starts with `## جوابات اور نمبر دہی کی رہنمائی` as the final `##` section. No English answer-key patterns exist in the Urdu assessment file.
- Next lifecycle stage: Independent G5 Urdu review (`g5-reviewer`).
