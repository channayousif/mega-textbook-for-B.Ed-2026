# GCCE-400 Unit 1 Urdu translation handoff

- Translator: agent:claude (crew job `gcce-400-u01-translate`), 2026-11-22, branch `crew/gcce-400-u01-translate`.
- English baseline: `6c04d9e21` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Six `.ur.svg` figures (`fig-U1-1` to `fig-U1-6`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 1.1 - ...`, matching the English numbering; headings follow identical level vectors.
- Civic terms: civics شہریات, citizenship شہریت, civic participation شہری شرکت, civic engagement شہری سرگرمی, active citizenship فعال شہریت, participatory citizenship شراکتی شہریت, digital citizenship ڈیجیٹل شہریت, digital divide ڈیجیٹل شکاف, franchise رأی دہی, universal adult franchise عام بالغ رأی دہی, restricted franchise محدود رأی دہی, subject تابع, voter رأی دہندہ, participant شریک, digital participant ڈیجیٹل شریک, public reasonableness عوامی معقولیت, political agency سیاسی فاعلیت.
- Constitution articles use `دفعہ` (`دفعہ 51`, `دفعہ 25A`, `دفعہ 5(1)`), matching GICP-400. `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Names: Asif اصف, Mehwish مہوش, Pushpa پوشپا, Saima سمیما, Shazia شازیہ, Faraz فراز, Bilal بلال. Citations keep Latin author-year forms (Leydet, 2023; Kamran, 2009; UNESCO, 2015; Kymlicka & Norman, 2000; Westheimer & Kahne, 2004; Mattson, 2017; Shair et al., 2022; Dean, 2005; Ahmad, 2004; Government of Pakistan, 2012; FAFEN, 2026).
- `<Glossary>` attributes stay English (`Civic education`, `Citizen`, `Digital citizenship`); wrapped surface text is translated (`شہری تعلیم`).
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ب، ج، ج، الف، ج، ب، ج، الف، ب, matching the English B, B, C, C, A, C, B, C, A, B.

## Terminology

The frozen bank holds seven terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ), Curriculum (نصاب), Pakistan Studies (پاکستان کے مطالعہ), Practical Activity (عملی سرگرمی). The bank and `glossary.json` were not changed. `Learning` (سیکھنا) and `Memory` (یادداشت) also occur in the English but are not used as terms in the Urdu prose and are not declared.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Civics | شہریات | content-spec key term and concept label |
| Citizenship | شہریت | content-spec key term and concept label |
| Civic engagement | شہری سرگرمی | content-spec key term and concept label |
| Active citizenship | فعال شہریت | content-spec key term and concept label |
| Civic participation | شہری شرکت | concept label |
| Changing role of citizens | شہریوں کا بدلتا کردار | concept label |
| Civics and citizenship relationship | شہریات اور شہریت کا تعلق | concept label |
| Participatory citizenship | شراکتی شہریت | concept label |
| Digital citizenship | ڈیجیٹل شہریت | concept label; `glossary.json` already carries a definition_ur |
| Citizenship as a foundation of modern society | جدید معاشرے کی بنیاد کے طور پر شہریت | concept label |
| Digital divide | ڈیجیٹل شکاف | Unit 6 key term |
| Franchise | رأی دہی | plain rendering; no banked term |
| Universal adult franchise | عام بالغ رأی دہی | plain rendering |
| Restricted franchise | محدود رأی دہی | plain rendering |
| Subject | تابع | role term |
| Voter | رأی دہندہ | role term |
| Participant | شریک | role term |
| Digital participant | ڈیجیٹل شریک | role term |
| Public reasonableness | عوامی معقولیت | civic quality named by Leydet |
| Political agency | سیاسی فاعلیت | dimension label |
| Personally responsible citizen | ذاتی طور پر ذمہ دار شہری | Westheimer and Kahne |
| Justice-oriented citizen | انصاف کی طرف متوجہ شہری | Westheimer and Kahne |
| Identity card | شناختی کارڈ | institutional term |
| Union council | یونین کونسل | institutional term |
| Electoral roll | رأی دہندگان کی فہرست | institutional term |
| By-election | ضمنی انتخاب | electoral term |

## Figures

- `fig-U1-1.ur.svg` mirrors the vertical timeline: the axis and the widening band sit on the right, the six dated panels on the left, panel text end-anchored, viewBox grown to 780x700 for Nastaliq line heights.
- `fig-U1-2.ur.svg` mirrors the five concept-map nodes: voting top-right, volunteering top-left, community work bottom-right, public debate bottom-left, peaceful protest bottom-centre.
- `fig-U1-3.ur.svg` mirrors the diagram: civics on the right, citizenship on the left, main arrow pointing left and the return arrow pointing right.
- `fig-U1-4.ur.svg` and `fig-U1-5.ur.svg` mirror the table column order so the row-label column sits on the right; every cell is end-anchored.
- `fig-U1-6.ur.svg` mirrors the four pillars so shared identity is leftmost and law is rightmost.
- All twelve SVGs (6 source `.ur.svg` and 6 derived `.ur.dark.svg`) were checked with `scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 1 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 6 files, matching component counts (6 Figure, 3 Glossary, 4 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server, `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping, 360px and A4 print, table scroll) is therefore unverified here and is a G5 task.

## Open points for G3, G5 and the owner

1. The eight authored concept labels in `concepts/unit-01.md` and the proposed terms table above.
2. The Urdu render at 360px and A4 print, and the RTL table reading order in `fig-U1-4` and `fig-U1-5`.
3. The `kymlicka-norman-2000` attribution and constitutional currency already flagged for G3 in `sources/unit-01.md`.
