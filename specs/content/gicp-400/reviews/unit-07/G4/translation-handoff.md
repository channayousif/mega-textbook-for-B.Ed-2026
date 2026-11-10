# GICP-400 Unit 7: G4 translation handoff

## Files translated

Translated from English baseline commit `7e4b23d33` (`fix(gicp-400): apply Unit 7 G3 desk report findings`):

- `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/index.mdx`
- `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/topic-01.mdx`
- `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/unit-assessment.mdx`
- `static/img/figures/gicp-400/unit-07/fig-U7-1.ur.svg` (and derived dark `fig-U7-1.ur.dark.svg`)
- `static/img/figures/gicp-400/unit-07/fig-U7-2.ur.svg` (and derived dark `fig-U7-2.ur.dark.svg`)
- `static/img/figures/gicp-400/unit-07/fig-U7-3.ur.svg` (and derived dark `fig-U7-3.ur.dark.svg`)

## Terminology conformance and proposed terms

Declared `key_terms` in `index.mdx` all match `specs/content/terminology.csv`:
- `Pakistan Studies` -> `پاکستان کے مطالعہ`
- `Assessment` -> `تشخیص`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Curriculum` -> `نصاب`
- `Rubric` -> `معیارِ جانچ`
- `Self-Assessment` -> `خود جائزہ`
- `Mother Tongue` -> `مادری زبان`
- `Learning Outcome` -> `نتیجہ ہائے تعلم`
- `Collaborative Learning` -> `باہمی تعلم`
- `Group Work` -> `گروہی کام`
- `Problem Solving` -> `مسئلہ حل کرنا`
- `Critical Thinking` -> `تنقیدی سوچ`
- `Rote Learning` -> `رٹا لگانا`

Proposed terms for curriculum owner from `specs/content/gicp-400/concepts/unit-07.md` not currently in `terminology.csv`:
- `Civic education` -> `شہری تعلیم`
- `Active citizenship` -> `فعال شہریت`
- `National integration` -> `قومی یکجہتی`
- `Unity in diversity` -> `تنوع میں وحدت`
- `Teacher responsibility` -> `استاد کی ذمہ داری`
- `Constitutional values in the classroom` -> `کلاس روم میں آئینی اقدار`

## Parity and validation

- **Structural parity**: Heading vectors match 1:1 across all three files (`index.mdx`, `topic-01.mdx`, `unit-assessment.mdx`).
- **Component parity**: Component counts match English baseline 1:1 (`Figure`: 3, `Glossary`: 2, `PrintHandout`: 2, `TranslationStatusBadge`: 1).
- **Assessment parity**: 10 MCQs, 10 RRQs, 5 ERQs (45 numbered items total across both locales). Option letters transliterated (الف, ب, ج, د), keys and mark allocations strictly preserved.
- **Answer keys**: The bounded answers section heading is translated (`## جوابات اور نمبر دہی کی رہنمائی`) and placed at the end of `unit-assessment.mdx`. No forbidden answer-key English strings or front-matter keys leaked.
- **Em dash**: Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) across all authored files.
- **Figure text and variants**: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gicp-400/unit-07/*.ur.svg` passed with exit code 0. Dark variants generated via `npm run figures:variants` and verified clean via `npm run figures:variants:check`.
- **Parity probe**: Temporary flip probe (`translation_status: reviewed` on both index files) confirmed that parity, figure, and terminology checks pass cleanly, reporting only the expected open G4/G5 rows before reversion to `draft`.
- **Content gates**: All 14 content gates pass (`npm run check:content`).

## Next steps and G5 handoff

- `translation_status` remains `draft` pending independent G5 review.
- Independent G5 reviewer must evaluate the translated bundle using `.claude/skills/review-unit/SKILL.md`.
- Rendered Urdu inspection (desktop, narrow-width mobile 360px, and A4 print emulation) remains pending as browser/build runs are prohibited in the crew execution environment.
