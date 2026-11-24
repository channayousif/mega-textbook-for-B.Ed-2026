# GENT-401 Unit 3: Urdu translation handoff

- Translator: claude, crew job `gent-401-u03-translate`, 2026-11-24.
- English baseline: `6581b0d35` (branch HEAD at start; last English change `7cbdfae84`). English content, figures, manifest, sources, coverage and concepts are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-03/`, path resolved through `resolveUnit()`.
- Four schematic sources: `static/img/figures/gent-401/unit-03/fig-U3-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Labels translated, then mirrored for RTL with `scripts/mirror-figure-rtl.mjs`; Nastaliq-first font stack; wrapped Urdu lines spaced about 21 to 24px. Each `<desc>` equals its page alt. `measure-figure-text.mjs` exits 0 on all eight files, and each figure was rasterised and inspected by eye.
- `translation_status` remains `draft` in both locales. G3 is still open and G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

Frozen-bank terms that occur in the unit, bound in prose and in the UR `key_terms` block:

| Bank term | Urdu used |
|---|---|
| Summative Assessment | جامع تشخیص (assessment heading) |
| Self-Assessment | خود تشخیصی (checklist headings) |
| Rubric | معیارِ جانچ (mini-rubric headings) |
| Assessment | تشخیص |

The four `<Glossary>` calls (Market research, Business model, Value proposition, Revenue stream) keep their English lookup keys and imports; the wrapped surface text is Urdu. `terminology.csv` and `glossary.json` are unchanged.

## Proposed terms for the owner and G5

None of the unit's core terms is banked. Concept-graph labels were reused where they exist.

| English | Urdu used | Notes |
|---|---|---|
| Market research | مارکیٹ ریسرچ | Concept label; transliterated |
| Market / target market | بازار / ہدفی بازار | Concept label uses ہدفی بازار |
| Target customer / customer segment | ہدفی گاہک / گاہکوں کا طبقہ | |
| Primary / secondary data | بنیادی ڈیٹا / ثانوی ڈیٹا | |
| Triangulation | تکونی تصدیق | English given in parentheses on first use |
| Competitor / competitor analysis | حریف / مسابقی تجزیہ | Concept label مسابقی تجزیہ |
| Direct / indirect competitor | براہِ راست حریف / بالواسطہ حریف | |
| Segmenting, targeting, positioning | تقسیم بندی، ہدف بندی، مقام بندی | STP kept in Latin |
| Business model / business plan | کاروباری ماڈل / کاروباری منصوبہ | |
| Business Model Canvas | کاروباری ماڈل کینوس | |
| Value proposition | قدر کی پیشکش | Concept label |
| Revenue stream | آمدنی کا ذریعہ (pl. آمدنی کے ذرائع) | Concept label |
| Channels / customer relationships | رسائی کے ذرائع / گاہکوں سے تعلق | Canvas blocks |
| Direct / multisided / marketplace model | براہِ راست / کثیر فریقی / منڈی (مارکیٹ پلیس) ماڈل | |
| Job to be done | انجام دینے والا کام | English in parentheses on first use |
| Subscription | اشتراک (سبسکرپشن) | Matches glossary.json definition_ur |
| Saturday | ہفتے کے روز | Avoids ہفتہ (week) ambiguity |

## Points for G5 and the owner

- English figure note in `fig-U3-3.svg` says "The two shaded blocks are the customer and the money", but three blocks are shaded (value propositions, customer segments, revenue streams). Translated faithfully, not corrected; the English owner should fix the note or the shading.
- `glossary.json` `definition_ur` for Business model and Value proposition read "کی" where "کیا" is meant ("کس طرح ... کی قدر پیدا کرتا ہے", "کی مسئلہ حل ہوتا ہے یا کی فائدہ ملتا ہے"). Outside this job's scope; flagged for a glossary fix.
- Spriggs (2016) is cited without a gendered verb because the English gives no pronoun; Scott is "he" in the English and keeps masculine agreement.
- In RRQ 4 the classmates take generic masculine agreement (خریدیں گے), as the English does not state their gender.
- Further-reading entries keep the citation in Latin and translate the reading guidance, as in Unit 1.

## Validation

- Heading level vectors, front-matter identifiers, `<Figure>`/`<Glossary>`/`<PrintHandout>`/badge counts, numbered-item counts (45 in the assessment), table rows and checklist items match the English exactly.
- MCQ option order is unchanged (A-D to الف-د) and every key letter maps to the same option.
- Temporary flip: both `index.mdx` files set to `reviewed`, `npm run check:content` reported only the two expected open `G4 ur-translation` and `G5 ur-review` rows for Unit 3, and zero terminology, parity or figure findings. Both reverted to `draft`.
- Final draft run: all content gates pass (`npm run build:content-status && npm run check:content`). Zero em dashes.
- Not done: `render-inspect.mjs --locale ur` (needs a local build or a deployed Urdu page; the brief forbids local builds and the unit is not deployed yet). G5 must inspect the rendered pages.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and inspect the rendered Urdu at narrow width and in A4 print.
