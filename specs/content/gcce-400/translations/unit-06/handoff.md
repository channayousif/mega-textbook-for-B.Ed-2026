# GCCE-400 Unit 6 Urdu translation handoff

- Translator: agent:antigravity (crew job `gcce-400-u06-translate`), 2026-11-22, branch `crew/gcce-400-u06-translate`.
- English baseline: `83395d029` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete six-file mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-06/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Six `.ur.svg` figures (`fig-U6-1` to `fig-U6-6`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 6.1 - ...`, `موضوع 6.2 - ...`, and `موضوع 6.3 - ...`, matching the English numbering; headings follow identical level vectors.
- Digital citizenship and media terms: digital citizenship ڈیجیٹل شہریت, digital platform ڈیجیٹل پلیٹ فارم, digital civic engagement ڈیجیٹل شہری سرگرمی, cyber ethics سائبر اخلاقیات, personal data ذاتی ڈیٹا, data protection ڈیٹا کا تحفظ, misinformation غلط معلومات, disinformation پروپیگنڈا / دانستہ غلط معلومات, digital divide ڈیجیٹل تقسیم, digital literacy ڈیجیٹل خواندگی, digital footprint ڈیجیٹل فٹ پرنٹ, e-petition آن لائن درخواست, citizen portal سٹیزن پورٹل, online campaign آن لائن مہم, community group کمیونٹی گروپ, online volunteering آن لائن رضاکارانہ خدمات, access divide رسائی کی تقسیم, usage divide استعمال کی تقسیم, socioeconomic divide سماجی و معاشی تقسیم, geographic divide جغرافیائی تقسیم, echo chambers ہم خیال حلقے.
- Constitution articles use `دفعہ` (`دفعہ 19`, `دفعہ 17`). `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Names: Viqas وقاص, Rizwana رضوانہ, Saim صائم, Hira حرا, Thatta ٹھٹھہ, Khairpur خیرپور, Sanghar سانگھڑ, Badin بدین, Karachi کراچی, Balochistan بلوچستان. Citations keep Latin author-year forms (Richardson & Milovidov, 2019; Government of Pakistan, 2012; Khalid & Ahmad, 2026; Ali & Qazi, 2023; Shair et al., 2022; Iftikhar et al., 2023; Mattson, 2017).
- `<Glossary>` attributes stay English (`Digital citizenship`, `Digital platform`, `Digital civic engagement`, `Cyber ethics`, `Personal data`, `Data protection`, `Misinformation`, `Disinformation`, `Digital divide`, `Digital literacy`); wrapped surface text is translated.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ لینا / جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، الف، ب، الف، ب، ج، ب، الف، الف، ج, matching the English B, A, B, A, B, C, B, A, A, C.

## Terminology

The frozen bank holds five terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ), Practical Activity (عملی سرگرمی). The bank and `glossary.json` were not changed.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Digital citizenship | ڈیجیٹل شہریت | concept label and glossary term |
| Digital platforms for civic engagement | شہری سرگرمی کے لیے ڈیجیٹل پلیٹ فارم | concept label |
| Opportunities and risks of digital participation | ڈیجیٹل شرکت کے مواقع اور خطرات | concept label |
| Cyber ethics | سائبر اخلاقیات | concept label and glossary term |
| Responsible sharing | ذمہ دارانہ اشتراک | concept label |
| Misinformation and information discernment | غلط معلومات اور معلوماتی تشخیص | concept label |
| Digital divide | ڈیجیٹل تقسیم | concept label and glossary term |
| Kinds of digital divide and their civic impact | ڈیجیٹل تقسیم کی اقسام اور ان کا شہری اثر | concept label |
| Digital platform | ڈیجیٹل پلیٹ فارم | glossary term |
| Digital civic engagement | ڈیجیٹل شہری سرگرمی | glossary term |
| Personal data | ذاتی ڈیٹا | glossary term |
| Data protection | ڈیٹا کا تحفظ | glossary term |
| Disinformation | دانستہ غلط معلومات / پروپیگنڈا | glossary term |
| Digital literacy | ڈیجیٹل خواندگی | glossary term |
| Digital footprint | ڈیجیٹل فٹ پرنٹ | topic term |
| E-petition | آن لائن درخواست | topic term |
| Citizen portal | سٹیزن پورٹل | topic term |
| Online campaign | آن لائن مہم | topic term |
| Access divide | رسائی کی تقسیم | divide archetype |
| Usage divide | استعمال کی تقسیم | divide archetype |
| Socioeconomic divide | سماجی و معاشی تقسیم | divide archetype |
| Geographic divide | جغرافیائی تقسیم | divide archetype |
| Echo chambers | ہم خیال حلقے | topic term |

## Figures

- `fig-U6-1.ur.svg` mirrors the concept map: central ellipse labelled ڈیجیٹل شہری سرگرمی with five linked nodes (آن لائن درخواست، سٹیزن پورٹل، آن لائن مہم، کمیونٹی گروپ، آن لائن رضاکارانہ خدمات) each with its Pakistani example.
- `fig-U6-2.ur.svg` mirrors the comparison table columns so the opportunities column (مواقع) sits on the right, and risks (خطرات) on the left.
- `fig-U6-3.ur.svg` mirrors the 5-step sharing checklist flowchart flowing vertically: post identified, check source, check date, check evidence, consider harm, then branching into sharing with a note or pausing to correct.
- `fig-U6-4.ur.svg` mirrors the table with three columns: situation (صورتحال) on the right, responsible choice (ذمہ دارانہ انتخاب) in the middle, and ethical principle (اخلاقی اصول) on the left.
- `fig-U6-5.ur.svg` mirrors the 4-branch digital divide diagram around the central label ڈیجیٹل تقسیم: access divide, usage divide, socioeconomic divide, and geographic divide.
- `fig-U6-6.ur.svg` mirrors the table of ICT barriers: barrier (رکاوٹ) on the right, and study findings (تحقیق کے نتائج) on the left.
- All twelve SVGs (6 source `.ur.svg` and 6 derived `.ur.dark.svg`) were checked with `scripts/heavy.sh node scripts/measure-figure-text.mjs` and exit 0 with zero text clipping and zero collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 6 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 6 files, matching component counts (6 Figure, 10 Glossary, 5 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server, `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping, 360px and A4 print, table scroll) is therefore unverified here and is a G5 task.

## Open points for G3, G5 and the owner

1. The eight authored concept labels in `concepts/unit-06.md` and the proposed terms table above.
2. The CoE handbook attribution, the Shair et al. (2022) figures and Pakistani examples flagged for G3 in `sources/unit-06.md`.
3. Urdu render inspection at 360px and A4 print during independent G5 review.
