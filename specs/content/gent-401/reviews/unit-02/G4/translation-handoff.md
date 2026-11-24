# GENT-401 Unit 2: Urdu translation handoff

- Translator: claude, crew job `gent-401-u02-translate`, 2026-11-24.
- English baseline: `91287e81b` (branch HEAD at start; last English change `c512cbeaf`). English content, figures, manifest, sources, coverage and concepts are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-02/`, path resolved through `resolveUnit()`.
- Four schematic sources: `static/img/figures/gent-401/unit-02/fig-U2-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Labels translated, then mirrored for RTL with `scripts/mirror-figure-rtl.mjs` (table row-label columns on the right; the flowchart's "put aside" branch on the left and its "learn and try again" loop on the right). Nastaliq-first font stack; wrapped Urdu lines spaced about 22 to 24px. Each `<desc>` equals its page alt. `measure-figure-text.mjs` exits 0 on all four sources. A local ImageMagick rasterisation confirmed the mirrored shapes and connectors but could not draw the class-styled Urdu text, so the label rendering itself has not been seen by eye.
- `translation_status` remains `draft` in both locales. G3 is still open and G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

Frozen-bank terms that occur in the unit, bound in prose and in the UR `key_terms` block:

| Bank term | Urdu used |
|---|---|
| Summative Assessment | جامع تشخیص (assessment heading) |
| Self-Assessment | خود تشخیصی (checklist headings) |
| Rubric | معیارِ جانچ (mini-rubric headings) |
| Assessment | تشخیص |

The six `<Glossary>` calls (Small business, Scalable start-up, Social enterprise, Intrapreneurship, Women entrepreneurship, Business opportunity) keep their English lookup keys and imports; the wrapped surface text is Urdu. `terminology.csv` and `glossary.json` are unchanged.

## Proposed terms for the owner and G5

None of the unit's core terms is banked. Concept-graph labels (`concepts/unit-02.md`) were reused where they exist.

| English | Urdu used | Notes |
|---|---|---|
| Entrepreneurship / entrepreneur | کاروباریت / کاروباری فرد | As in Units 1 and 3 |
| Small business | چھوٹا کاروبار | Concept label |
| Scalable start-up | قابل توسیع اسٹارٹ اپ | Concept label |
| Social enterprise / social entrepreneur | سماجی کاروباری ادارہ / سماجی کاروباری فرد | Concept label |
| Charity | خیریہ ادارہ | Concept label uses خیریہ ادارے; "traditional charities" rendered روایتی خیراتی ادارے |
| Intrapreneurship / intrapreneur | اندرونی کاروباریت / اندرونی کاروباری فرد | Concept label; English given in parentheses on first use of intrapreneur |
| Women's entrepreneurship | خواتین کی کاروباریت | Concept label |
| Business opportunity | کاروباری موقع | Concept label |
| Brainstorming | ذہنی طوفان | English in parentheses on first use |
| Crowdsourcing / storyboarding | کراؤڈ سورسنگ / اسٹوری بورڈنگ | Transliterated |
| Weighted checklist | وزن والی جانچ فہرست | Total rendered وزنی مجموعہ |
| Screening | جانچ (چھانٹی in the description) | |
| Margin(s) | منافع | Criterion 3 rendered نمایاں منافع اور وسائل |
| Self-employment / gig work | خود روزگاری / آزادانہ عارضی کام (گِگ ورک) | |
| Tuck shop | کھانے پینے کی (چھوٹی) دکان | No settled Urdu term |
| Fourth sector | چوتھا شعبہ | Quoted, as in the English |

## Points for G5 and the owner

- `glossary.json` `definition_ur` for Small business reads "مقامی بازار کو اہتمام کرتا ہے", which is not idiomatic for "serves a local market" ("مقامی بازار کی خدمت کرتا ہے" is meant). Outside this job's scope; flagged for a glossary fix.
- "Head teacher" carries no gender in the English; it is rendered صدر معلم throughout with masculine agreement where the English uses "he" (Topic 2.2, where the head teacher is "he"), and without a gendered pronoun elsewhere.
- OpenStax's "four million ... more than eleven million" is rendered in lakh/crore (چالیس لاکھ، ایک کروڑ دس لاکھ), the same quantities.
- Mellor (2009) remains declared unverifiable in the sources; the Urdu keeps the English claim scope (general background only) and adds nothing.
- Further-reading entries keep the citation in Latin and translate the reading guidance, as in Units 1 and 3. OpenStax section titles stay in English inside quotation marks.

## Validation

- Heading level vectors, front-matter identifiers, `<Figure>`/`<Glossary>`/`<PrintHandout>`/badge counts, numbered-item counts (45 in the assessment), table rows and checklist items match the English exactly.
- MCQ option order is unchanged (A-D to الف-د) and every key letter maps to the same option (ب ج د د ج الف د ب ج د). Weighted-checklist arithmetic (360, 310, 340) re-checked.
- Temporary flip: both `index.mdx` files set to `reviewed`, `npm run check:content` reported only the two expected open `G4 ur-translation` and `G5 ur-review` rows for Unit 2, and zero terminology, parity or figure findings. Both reverted to `draft`.
- Final draft run: all content gates pass (`npm run build:content-status && npm run check:content`). Zero em dashes.
- Not done: `render-inspect.mjs --locale ur` (needs a local build or a deployed Urdu page; the brief forbids local builds and the unit is not deployed yet). G5 must inspect the rendered pages and the `.ur.svg` labels.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and inspect the rendered Urdu at narrow width and in A4 print.
