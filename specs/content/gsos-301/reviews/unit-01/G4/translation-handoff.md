# GSOS-301 Unit 1 translation handoff

- Date: 2026-10-19. Translator: Antigravity, `crew/gsos-301-u01-translate-r1`.
- English checkout baseline: `94c2793b` (feat(gsos-301): author Unit 1 English draft at G2).
- Files compared and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/gsos-301/unit-01/fig-U1-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gsos-301/unit-01/fig-U1-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gsos-301/unit-01/fig-U1-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gsos-301/unit-01/fig-U1-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gsos-301/unit-01/fig-U1-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gsos-301/unit-01/fig-U1-6.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 6 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`) and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) with option order strictly preserved.
- Key terms declared in `index.mdx` frontmatter are bound to `specs/content/terminology.csv`:
  - `Assessment`: `تشخیص` (banked in `terminology.csv`)
  - `Curriculum`: `نصاب` (banked in `terminology.csv`)
  - `Socialization`: `سماجی کاری` (banked in `terminology.csv`)
  - `Rubric`: `معیارِ جانچ` (banked in `terminology.csv`)
  - `Learning`: `تدریس و تعلم` (banked in `terminology.csv`)
  - `Environment`: `ماحول` (banked in `terminology.csv`)
  - `Self-Assessment`: `خود جائزہ` (banked in `terminology.csv`)
  - `Group Work`: `گروہی کام` (banked in `terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/gsos-301/concepts/unit-01.md` and sociology literature are specific to this sociology unit and not yet banked in `specs/content/terminology.csv`:

| English Term | Proposed Urdu Label | Concept ID / Reference |
|---|---|---|
| Sociology as systematic study | عمرانیات بطور منظم مطالعہ | CON:GSOS-301-1-1 |
| Scope and nature of sociology | عمرانیات کا دائرہ اور فطرت | CON:GSOS-301-1-2 |
| Sociology vs common sense | عمرانیات اور عام شعور میں فرق | CON:GSOS-301-1-3 |
| Importance of sociology for teachers | اساتذہ کے لیے عمرانیات کی اہمیت | CON:GSOS-301-1-4 |
| Positivism (Comte) | مثبتیت (کومٹ) | CON:GSOS-301-1-5 |
| Class conflict (Marx) | طبقاتی تنازع (مارکس) | CON:GSOS-301-1-6 |
| Social facts and solidarity (Durkheim) | سماجی حقائق اور یکجہتی (دورکائم) | CON:GSOS-301-1-7 |
| Verstehen and culture (Weber) | ویرشٹین اور ثقافت (ویبر) | CON:GSOS-301-1-8 |
| Functionalism perspective | فعلیت / افعالاتی نقطہ نظر | CON:GSOS-301-1-9 |
| Conflict theory perspective | تنازعہ نظریہ | CON:GSOS-301-1-10 |
| Symbolic interactionism | علامتی باہمی تعامل | CON:GSOS-301-1-11 |
| Bureaucracy | افسر شاہی | Topic 1.2 |
| Manifest functions | ظاہری افعال | Topic 1.3 |
| Latent functions | پوشیدہ افعال | Topic 1.3 |
| Social dysfunctions | سماجی بے اعتدالیاں / خرابیاں | Topic 1.3 |

## Semantic and Register Polish

- Authored in natural, scholarly yet accessible Urdu (درسی مگر عام فہم).
- Resolved right-to-left punctuation across all topics (comma `،`, semicolon `؛`, question mark `؟`, Urdu dash `۔`).
- Zero em dashes (U+2014) throughout all files.
- Figure SVGs authored with RTL layout, accurate geometry, no text overflow, matching `<desc id="d">` alt text, and dark variants derived via `scripts/build-figure-variants.mjs`.

## Validation and Review Boundary

- Fast content gates (`npm run check:content`): all 13 gates pass.
- Figure variants check (`npm run figures:variants:check`): all 772 variants clean.
- Unit figures gate (`node scripts/check-figures.mjs`): PASS.
- Review evidence tests (`npm run test:review`): all 40 tests pass.
- `translation_status` remains `draft` across all 6 files pending fresh independent G5 review.
- G4 tracker row in `specs/content/gsos-301/tasks.md` marked in progress (`▣`) with `auto:gates` and no self-certification.
