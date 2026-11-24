# GENT-401 Unit 6: Urdu translation handoff

- Translator: claude, crew job `gent-401-u06-translate`, 2026-11-24.
- English baseline: `91287e81b` (branch HEAD at start, equal to `origin/main`). English content, figures and figure manifest are unchanged; the temporary `reviewed` flip on the English `index.mdx` was reverted and leaves no diff.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-06/`, path resolved through `resolveUnit()`.
- Four schematic sources: `static/img/figures/gent-401/unit-06/fig-U6-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Built by copying each English SVG, translating every label, title and desc, then running `scripts/mirror-figure-rtl.mjs` (tables put the label column on the right; the positioning map puts low price on the right; the flowchart's "no" branch exits left). Each Urdu label is wrapped in RLE/PDF embedding marks, following `efpg-401/unit-03/fig-U3-10.ur.svg`, so Latin runs (SECP, eZfile, CNIC, CUIN, IPO-Pakistan) and digits stay in Urdu reading order. No `direction` attribute is used. Each `<desc>` equals the Urdu page alt.
- `translation_status` remains `draft` on both `index.mdx` files. G3 is still open; G5 has not happened. No certification, publication action or done mark is recorded, and the G4 tracker row stays `▢` with these notes.

## Terminology working set

Frozen-bank terms that occur in the unit and are declared in the Urdu `key_terms` block:

| Bank term | Urdu used | Where |
|---|---|---|
| Perception | ادراک | brand as total perception (topic 6.1, assessment) |
| Curriculum | نصاب | curriculum-aligned kits, curriculum blueprint |
| Ethical Dilemma | اخلاقی مخمصہ | worked example and activity heading, topic 6.2 |
| Summative Assessment | جامع تشخیص | assessment section heading (`## جامع تشخیص`) |
| Rubric | معیارِ جانچ | mini-rubric headings, ERQ rubric heading |
| Self-Assessment | خود تشخیصی | self-assessment checklist headings |

Note for G5: Unit 1 titles the same assessment section `اختتامی تشخیص`, which the bank does not hold; this unit uses the bank form `جامع تشخیص`. The "Summative task" heading keeps Unit 1's `اختتامی کام`. `Professional Ethics` (پیشہ ورانہ اخلاقیات, cited in the concept file) does not occur in the English prose, so it is not declared. The unit uses no `<Glossary>` calls (the English imports `Glossary` without using it; the Urdu mirrors the import). No changes were made to `terminology.csv` or `glossary.json`.

## Proposed terms for the owner and G5

Not in the bank; translated and used consistently within the unit:

| English | Urdu used |
|---|---|
| Brand / branding | برانڈ / برانڈنگ |
| Market positioning; positioning map | مارکیٹ پوزیشننگ؛ پوزیشننگ نقشہ (perceptual map: ادراکی نقشہ) |
| Marketing / advertising | مارکیٹنگ / اشتہار بازی |
| Promotion; promotion strategies | تشہیر؛ تشہیری حکمت عملیاں |
| Bootstrap marketing | کم خرچ (بوٹ اسٹریپ) مارکیٹنگ |
| Word-of-mouth marketing | زبانی تشہیر |
| Content marketing | مواد پر مبنی مارکیٹنگ |
| Referral incentives | حوالے پر ترغیبات |
| Sole proprietorship | واحد ملکیت |
| Partnership; Partnership Deed | شراکت داری؛ شراکت نامہ |
| Private limited company | پرائیویٹ لمیٹڈ کمپنی |
| Unlimited / limited liability | لامحدود / محدود ذمہ داری |
| Joint and several liability | مشترکہ اور انفرادی ذمہ داری |
| Perpetual succession | دائمی تسلسل |
| Incorporation; Certificate of Incorporation | تشکیل (انکارپوریشن)؛ سرٹیفکیٹ آف انکارپوریشن |
| Intellectual property | دانشورانہ ملکیت |
| Trademark / copyright / patent | ٹریڈ مارک / کاپی رائٹ / پیٹنٹ (transliterated) |
| Industrial design | صنعتی ڈیزائن |
| Non-obvious (patent test) | غیر بدیہی |
| Ethics | اخلاقیات |

Statute and body names (Companies Act 2017, Partnership Act 1932, Trade Marks Ordinance 2001, Copyright Ordinance 1962, Patents Ordinance 2000, Registered Designs Ordinance 2000, SECP, IPO-Pakistan, FBR, SRB, NTN, CNIC, CUIN, CRO) are transliterated with the Latin acronym kept, so a reader can match them to official documents.

## Points for G5 and the English owner

- English inconsistency, not changed in translation: topic 6.2 says the patent example binds books "using 80 percent less wire", while `fig-U6-4` says "at half normal cost". Both are translated as written; the English owner should reconcile them.
- English ERQ 1 says "three private tutoring academies compete" but describes only Academy A and Academy B. Translated as written (اکیڈمی الف / ب); G3 may want a third academy described.
- Bloom tags map: Remember یاد رکھنا, Understand سمجھنا, Apply اطلاق, Analyze تجزیہ, Evaluate جانچنا, Create تخلیق. MCQ option letters map A-D to الف/ب/ج/د with order unchanged; the key uses the Urdu letters.
- Checklist items use the inclusive form `سکتا/سکتی ہوں`.
- Rendered pages were not inspected: this job may not build the site or run `render-inspect.mjs` against a local server, and the Urdu pages are not on production yet. The four `.ur.svg` files were rasterised locally and inspected by eye (labels inside cells, Latin runs in order). One tight spot: in `fig-U6-2` row 2, the last column's two Nastaliq lines sit close together. G5 should inspect the rendered Urdu at 360px and in A4 print once deployed.

## Validation

- Heading level vectors match in all five files; numbered items, bullets and table rows match (the Urdu `index.mdx` adds only the `key_terms` entries); `<Figure>` 4/4, `<PrintHandout>` 3/3, `<TranslationStatusBadge>` 1/1.
- `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-06/*.ur.svg` exits 0 for all four files.
- `npm run figures:variants` wrote the four `.ur.dark.svg`; `npm run figures:variants:check` is clean.
- Temporary flip: with both `index.mdx` files at `reviewed`, `npm run check:content` reported only the two expected pipeline-gate findings (Unit 6 G4 and G5 rows not done). `validate:content` parity, `check:figures` Urdu parity and the `key_terms` terminology check all passed. Both files are back at `draft`.
- Final draft run: `npm run build:content-status && npm run check:content` passed all 14 content gates.

## Next owner

Independent G5 reviewer: compare the Urdu against the English passage by passage, answer the Urdu assessment without the key, and check the rendered bundle.
