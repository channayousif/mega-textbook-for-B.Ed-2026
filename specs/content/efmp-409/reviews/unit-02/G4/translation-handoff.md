# EFMP-409 Unit 2: Urdu translation handoff

- Translator: agy, crew job `efmp-409-u02-translate`, 2026-11-25.
- English baseline: `70e141423` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-02/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/efmp-409/unit-02/fig-U2-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The unit binds to the banked terms in `specs/content/terminology.csv`:
- `Learning` -> `سیکھنا`
- `Behaviorism` -> `طرزِ عمل پسندی`
- `Constructivism` -> `تعمیریت`
- `Socialization` -> `معاشرتی بندی`
- `Reinforcement` -> `تقویت`
- `Punishment` -> `سزا`
- `Zone of Proximal Development` -> `علاقہ ہائے قربی نشوونما`
- `Curriculum` -> `نصاب`
- `Assessment` -> `تشخیص`
- `Self-Assessment` -> `خود جائزہ`
- `Rubric` -> `معیارِ جانچ`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Two-Nation Theory` -> `دو قومی نظریہ`
- `Ideology of Pakistan` -> `پاکستان کے نظریے`
- `Objectives Resolution` -> `قراردادِ مقاصد`
- `Lahore Resolution` -> `قراردادِ لاہور`

## Proposed terms for the owner and G5

As documented in `specs/content/efmp-409/concepts/unit-02.md`, several concept labels and domain terms are authored and proposed for independent review:

| English | Urdu used | Notes |
|---|---|---|
| Foundations of education | تعلیم کی بنیادیں | Course title in `catalog/courses.json` and Unit 1 concept graph |
| Philosophical and ideological foundations | فلسفی اور نظریاتی بنیادیں | Authored concept label CON:EFMP-409-2-2 |
| Sociological perspectives on education | تعلیم کے سماجی نقطہ نظر | Authored concept label CON:EFMP-409-2-3 |
| Psychological perspectives on learning | سیکھنے کے نفسیاتی نقطہ نظر | Authored concept label CON:EFMP-409-2-4 |
| Historical foundations of education | تعلیم کی تاریخی بنیاد | Authored concept label CON:EFMP-409-2-5 |
| Ideology and religion distinguished | نظریہ اور مذہب کا فرق | Authored concept label CON:EFMP-409-2-6 |
| Ideological foundations of education | تعلیم کی نظریاتی بنیاد | Authored concept label CON:EFMP-409-2-7 |
| Islamic foundations of education | تعلیم کی اسلامی بنیاد | Authored concept label CON:EFMP-409-2-8 |
| Functionalist perspective | کارکردگی پسند زاویۂ نظر | Sociological perspective on education (Topic 2.1) |
| Conflict perspective | کشمکش پسند زاویۂ نظر | Sociological perspective on education (Topic 2.1) |
| Interactionist perspective | باہمی تعامل پسند زاویۂ نظر | Sociological perspective on education (Topic 2.1) |
| Social cognitivist perspective | سماجی ادراکی زاویۂ نظر | Psychological perspective on learning (Topic 2.1) |
| Humanist perspective | انسان دوست زاویۂ نظر | Psychological perspective on learning (Topic 2.1) |
| Assimilation | انجذاب | Piagetian cognitive adaptation term (Topic 2.1) |
| Accommodation | مطابقت پذیری | Piagetian cognitive adaptation term (Topic 2.1) |
| Schema | اسکیما | Piagetian mental structure term (Topic 2.1) |
| Self-efficacy | سیلف ایفیکیسی / خود اعتمادی | Bandura's concept (Topic 2.1) |
| Self-actualization | خود شناسی / خود تکمیلی | Maslow's hierarchy apex (Topic 2.1) |
| Unconditional positive regard | غیر مشروط مثبت احترام | Rogers' humanistic psychology term (Topic 2.1) |
| Tarbiyah | تربیت | Islamic term for nurturing growth (Topic 2.2) |
| Ta'lim | تعلیم | Islamic term for transmitting knowledge (Topic 2.2) |
| Ta'dib | تادیب | Islamic term for training in right conduct (Topic 2.2) |

## Validation

- Baseline: all content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-409/unit-02/*.ur.svg` passed with 0 exit code across all 4 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 4 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate:content`, `check:figures`, `check:svg-style`, `check:no-em-dash`, `check:no-answer-keys` and all other gates passed clean; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
