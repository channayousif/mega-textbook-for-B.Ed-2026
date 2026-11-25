# EFMP-409 Unit 5: Urdu translation handoff

- Translator: claude (crew job `efmp-409-u05-translate`), 2026-11-25. Not a review; no G5 claim.
- English baseline: `63cfa5fd3` (last English Unit 5 commit; branch base `744ab1c4f`). English content, figures, manifest, sources, coverage and concepts are unchanged by this job.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-05/`, path resolved through `resolveUnit()`.
- Structural self-check: heading level vectors identical in all 6 files; numbered items, table rows, `<Figure>` (6), `<Glossary>` (3), `<PrintHandout>` (5) and imports match. The front-matter identifiers, `clo_refs`, `est_reading_minutes` and `translation_status` are byte-identical to the English. Topic titles read `موضوع 5.N - ...`.
- `<Glossary>` uses the wrapping form, so the attribute stays English (it is the `glossary.json` key) and the visible word is Urdu: تعلیمی پالیسی، قومی تعلیمی پالیسی، پالیسی کا نفاذ.
- Assessment: 10/10/5 kept in order. Option order is unchanged (A/B/C/D become الف/ب/ج/د). MCQ key: 1 ب, 2 ب, 3 الف, 4 ب, 5 ب, 6 ج, 7 الف, 8 الف, 9 الف, 10 ب. Marks and rubric ranges are unchanged. No English answer-key prose is left in the Urdu file.
- Figures: six schematic sources `static/img/figures/efmp-409/unit-05/fig-U5-{1..6}.ur.svg`, each with a derived `.ur.dark.svg`. Labels were translated, then mirrored with `scripts/mirror-figure-rtl.mjs`. The Nastaliq-first font stack is applied, and each `<desc>` equals its page alt.
- Layout changes in the figures: line spacing is opened for Nastaliq in all six, and rows are grown in fig-U5-4 (viewBox height 430 to 540) and fig-U5-5 (330 to 400) so their three-line Urdu cells do not touch. The wordmark keeps a Latin font stack.
- Bidi in the figures: Urdu labels are wrapped in RLM marks (EFMP-301 precedent). A hyphenated number after Urdu text ("1998-2010", "2026-11-25") gets an LRM inside an RTL embedding, because without it Chromium renders "2010-1998". The Latin token "PIE" in the fig-U5-3 caption is written as پی آئی ای.
- `measure-figure-text.mjs` exits 0 on all 6. Each figure was rendered to PNG in Chromium and checked by eye.
- `translation_status` stays `draft` in both locales. G3 is open, and G5 has not happened.

## Terminology working set (UR `index.mdx` `key_terms`, bound to `terminology.csv`)

Curriculum نصاب; Learning سیکھنا; Assessment تشخیص; Summative Assessment جامع تشخیص; Self-Assessment خود تشخیصی; Rubric معیارِ جانچ; Group Work گروہی کام; Profession پیشہ.

## Proposed terms for the owner and G5 (not banked)

| English | Urdu used | Notes |
|---|---|---|
| Education report | تعلیمی رپورٹ | Concept label CON:EFMP-409-5-1 uses the same |
| Education policy / National education policy | تعلیمی پالیسی / قومی تعلیمی پالیسی | Matches concept labels and glossary `definition_ur` |
| Implementation | نفاذ | Concept labels 5-3 and 5-4 use اجراء for "implementation"; this mirror uses نفاذ for implementation and اجرا for "launch", which the unit keeps distinct. G5 should rule on the concept-label wording |
| Terms of reference | دائرۂ کار (ٹرمز آف ریفرنس) | First use glossed |
| Framing (of a policy) | تیاری | |
| Finance / Governance / Capacity / Continuity / Data / Politics | مالیات / حکمرانی / استعداد / تسلسل / اعداد و شمار / سیاست | The six implementation factors |
| Baseline (rate) | ابتدائی سطح / ابتدائی شرح | |
| Gross primary enrolment | پرائمری میں مجموعی داخلہ | |
| Mosque / mohalla / village workshop schools | مسجد اسکول / محلہ اسکول / ولیج ورکشاپ اسکول | |
| Bound source | پابند ماخذ | Literal; G5 may prefer a plainer phrase |
| Structured controversy | منظم مباحثہ | |

## Validation

- Step 5 flip: both `index.mdx` set to `reviewed`, then `npm run build:content-status && npm run check:content`. 13 of 14 gates passed. `check:pipeline-gate` reported only the two expected findings (Unit 5 G4 and G5 rows not done). Both files were reverted to `draft`, and the revert was verified.
- `npm run figures:variants:check` is clean.
- Not done here: `scripts/render-inspect.mjs --locale ur` (job rules forbid a local build or server). Rendered page inspection at 360 px and in A4 is left to G5.

## Next owner

Independent G5 reviewer (fresh `g5-reviewer` session with `review-unit`). Tasks: a passage-level comparison against `63cfa5fd3`, solving the Urdu MCQs independently, checking the nine authored concept labels and the terms above, and rendered inspection on the live site once deployed.
