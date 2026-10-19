# GICT-300 Unit 5 translation handoff

- Date: 2026-10-18. Translator: opencode, `crew/gict-300-u05-translate-r1`.
- English checkout baseline: `923cd4d7` (fix(gict-300): apply G3 Unit 3 and 4 review repairs).
- Files compared and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-05/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/gict-300/unit-05/fig-U5-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-05/fig-U5-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-05/fig-U5-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-05/fig-U5-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-05/fig-U5-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-05/fig-U5-6.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 6 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) with option order strictly preserved.
- Key terms declared in `index.mdx`: Digital citizenship / ڈیجیٹل شہریت, Netiquette / نیٹکیٹ, Intellectual property / دانشورانہ ملکیت, Copyright / کاپی رائٹ, Patent / پیٹنٹ, Trademark / ٹریڈ مارک, Fair use / منصفانہ استعمال, Public domain / پبلک ڈومین, Creative Commons / کری ایٹو کامنز, Plagiarism / سرقہ.

## Proposed Terms (Unbanked) for Curriculum Owner

All 10 terms declared in the `key_terms` block of the Urdu `index.mdx` are absent from `specs/content/terminology.csv`. They were proposed to the owner in the earlier `gict-300-u05-translate` job and remain unbanked. Agents must not bank them; the curriculum owner resolves the conflict and updates the bank.

## Repairs Applied in This Session

1. **ERQ-2 Bloom tag (G5 run 001 F1, blocking):** The Urdu ERQ-2 question tag was `*(جانچنا)*` (Evaluate), matching neither the English ERQ-2 tag `*(Analyze)*` nor the Urdu rubric's own `*(تجزیہ)*`. The earlier a7200d2 commit repaired this; verified clean in the current file.
2. **Fair-use quotation boundary (G5 run 001 F2, advisory):** The Urdu placed "مخصوص صورتوں میں" inside the quotation marks; the English keeps it outside. Moved the phrase outside the quote to match the source's verbatim boundary.

## Status

- `translation_status` stays `draft` on both `index.mdx` files. G5 review (independent, fresh session) still required to advance beyond draft.
- All 13 content gates pass on this branch, matching origin/main gate state.
