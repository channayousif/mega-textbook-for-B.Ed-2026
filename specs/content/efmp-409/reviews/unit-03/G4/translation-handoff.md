# EFMP-409 Unit 3: Urdu translation handoff

- Translator: Claude (claude-opus-5-5), crew job `efmp-409-u03-translate`, 2026-11-25. Rate probe: one session, about 2.5 hours end to end for 9 pages and 12 SVGs.
- English baseline: `b7417e1e0` (branch HEAD at start; last English unit commit `69d54ce9f`). English content, figures, manifest, sources, coverage and concepts are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx` to `topic-06.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/`, resolved through `resolveUnit()`.
- Structural self-check: heading level vectors identical in all 9 files; numbered items, bullets, table rows and component calls (`<Figure>` 12, `<PrintHandout>` 8, `<TranslationStatusBadge>` 1) match; front-matter identifiers, `clo_refs`, `est_reading_minutes` and `translation_status` byte-identical. Option order and answer letters unchanged (A/B/C/D to الف/ب/ج/د; keys 1-6 and 8-10 ب, 7 الف).
- Twelve schematic sources: `static/img/figures/efmp-409/unit-03/fig-U3-{1..12}.ur.svg`, with derived `.ur.dark.svg` twins. Copied from English, labels translated, coordinates mirrored with `scripts/mirror-figure-rtl.mjs`, Nastaliq-first font stack, every Urdu label wrapped in U+200F (RLM) so edge punctuation and split parentheses resolve right to left (EFMP-301 Unit 2 precedent). Wrapped lines were respaced to about 20 px (tables) and 22 to 28 px (cards) because Nastaliq at 17 px touched. Each `<desc>` equals its page alt. `measure-figure-text.mjs` exits 0 on all 12; every figure was also rendered once in headless Chromium and read by eye.
- `translation_status` remains `draft` in both locales. G3 is still open, and a later English edit would invalidate this translation's G5 dependency. G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

Bound to `specs/content/terminology.csv` and listed in the UR `index.mdx` `key_terms`: Curriculum نصاب, Pedagogy تدریسیات, Active Learning فعال تعلم, Experiential Learning تجرباتی تعلم, Rote Learning رٹا لگانا, Critical Thinking تنقیدی سوچ, Reflective Thinking تاملی سوچ, Problem Solving مسئلہ حل کرنا, Punishment سزا, Childhood بچپن, Adolescence مراہقت, Readiness آمادگی, Intrinsic Motivation باطنی محرک, Personality شخصیت, Formative Assessment تشکیلی تشخیص, Summative Assessment مجموعی جائزہ, Self-Assessment خود جائزہ, Rubric معیارِ جانچ, Reflective Journal تاملی جریدہ, Shah Waliullah شاہ ولی اللہ, Sir Syed Ahmad Khan سر سید احمد خان. With the temporary `reviewed` flip, `check:pipeline-gate` reported zero terminology findings.

## Proposed terms for the owner and G5 (not banked)

| English | Urdu used | Notes |
|---|---|---|
| Idealism | مثالیات | Follows the authored concept label CON:EFMP-409-3-1. Common alternatives: تصوریت, مثالیت پسندی |
| Realism | واقعیت | Follows CON:EFMP-409-3-3. Alternative: حقیقت پسندی |
| Naturalism | فطریت | Follows CON:EFMP-409-3-5. Alternative: فطرت پسندی |
| Pragmatism | افادیت پسندی | Follows CON:EFMP-409-3-7. Alternatives: عملیت پسندی, نتائجیت. افادیت پسندی can be confused with utilitarianism; owner ruling advised |
| Metaphysics / Epistemology / Axiology | مابعدالطبیعیات / علمیات / اقداریات | Standard Urdu philosophy terms; check against Unit 1 usage |
| Instrumentalism | آلیت | English kept in parentheses at first use |
| Negative education | منفی تعلیم | Literal; standard in Urdu B.Ed texts |
| Habituation | عادت سازی | Concept label uses تشکیل عادات; prose uses عادت سازی |
| Theory of Forms / Form of the Good | نظریۂ امثال / خیرِ مطلق | |
| Allegory of the Cave | تمثیلِ غار | |
| Correspondence theory of truth | نظریۂ مطابقتِ صداقت | |
| Hylomorphism | ہیولیٰ اور صورت کا نظریہ | |
| Eudaimonia | یودیمونیا | Transliterated, glossed as انسانی فلاح |
| Teaching philosophy statement | تدریسی فلسفے کا بیانیہ | Follows CON:EFMP-409-3-13 |

Arabic and Persian technical words (*ملکہ*, *التدریج*/*التدرج*, *صناعہ*, *عمران*, *خودی*, *تگ و دو*, *مرشد*, *مؤدب*, *مربی*, *خلافت*) are written in Urdu script instead of the English transliteration. The Iqbal couplets are given in their original Urdu text, not back-translated from the English romanisation.

## English-side issues found while translating (not fixed here; for author/G3)

1. Topic 3.4 student prose cites "the content specification drafting note 7", an authoring artefact. Translated faithfully.
2. Topic 3.4 uses *at-tadrij* while the assessment and teacher notes use *al-tadarruj*. The Urdu mirrors this as التدریج / التدرج.
3. Topic 3.5 quotes Iqbal as "Intellect without love is demonic; intellect with love is divine" with no source. Translated as a prose quotation, not presented as a verse.
4. Topic 3.6's activity says Figure 3.11 has five dimensions (Aim, Knowledge, Curriculum, Method, Teacher Role), but fig-U3-11 shows four (aim, knowledge, teacher, morals).
5. Topic 3.2's worked example calls one water sample "clear canal water containing visible sediment"; the Urdu reads it as water that looks clear but shows sediment and bacteria under the microscope.
6. Topic 3.6's Further reading dates differ from the earlier topics (e.g. Curren 2018 vs 2025; Kraut 2022 vs 2004/2026). Kept verbatim.

## Validation

- Temporary flip: both `index.mdx` files set to `reviewed`, then `npm run build:content-status && npm run check:content`. Every gate passed except `check:pipeline-gate`, which reported only the two expected rows ('G4 ur-translation' and 'G5 ur-review' for Unit 3 not done). Both files reverted to `draft`, and the revert was confirmed by grep.
- Final draft run: see the commit's check output; no finding beyond those on `origin/main`.
- `npm run figures:variants` wrote the 12 `.ur.dark.svg` files; `npm run figures:variants:check` OK.
- Not done: `scripts/render-inspect.mjs --locale ur` (needs a build or the production base, and this unit is not deployed yet). G5 must inspect the rendered Urdu pages at 360 px and A4.

## Next owner

Independent G5 reviewer (fresh session, `g5-reviewer` with `review-unit`): passage-level comparison against the English baseline, independent solving of the Urdu assessment, the 13 authored concept labels and the proposed terms above, and rendered inspection. A qualified scholar should also check the Ibn Khaldun and Iqbal material (content-spec drafting note 8).
