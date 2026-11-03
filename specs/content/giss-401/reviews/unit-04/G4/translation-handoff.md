# GISS-401 Unit 4 Urdu translation handoff

Translator: Codex. Date: 2026-11-03. This is a G4 draft handoff, not a G5 review.

## Frozen English baseline and delivered mirror

English source commit: `ee21e1a43a5fcc61ed6a96ce0b43b8020a6af12a`.
Source directory: `docs/semester-3/giss-401/unit-04/`.
Mirror resolved with `resolveUnit()` and `urPathFor()`:
`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-04/`.

Translated `index.mdx`, `topic-01.mdx`, `topic-02.mdx` and `unit-assessment.mdx`.
The English unit has no teacher-notes page. Preserved the 10/10/5 bank, option order,
scoring, source links, qualifications, component calls and heading-level sequence.
The final assessment section contains the translated public self-study answers and rubrics.

Added all four `.ur.svg` schematics and their derived `.ur.dark.svg` variants beneath
`static/img/figures/giss-401/unit-04/`. Horizontal geometry is mirrored once using the
repository RTL tool; glyphs remain upright. Each Urdu SVG description equals its page alt.
The English assets, figure prompts, manifest rows and review inputs remain unchanged.

## Terminology working set

The frozen bank was read without modification. The Urdu index declares the applicable banked
terms Learning (سیکھنا), Assessment (تشخیص), Summative Assessment (مجموعی جائزہ),
Learning Outcome (نتیجہ ہائے تعلم), Attention (توجہ), Self-Assessment (خود جائزہ)
and Rubric (معیارِ جانچ). The substring Profession occurs inside professional in the
English baseline, not as a separate technical concept in this unit.

Both Glossary keys are preserved. Equity uses the existing Urdu definition about support
according to learner need; its visible label is ضرورت کے مطابق منصفانہ مدد. Sovereignty
uses حاکمیت and the existing Urdu definition that locates final sovereignty with Allah.
The eight authored Urdu concept labels in `concepts/unit-04.md` informed the translation.
They remain proposals for independent G5 judgement, not newly banked terms.

Proposed domain terms for the curriculum owner, absent from the frozen terminology bank:

| English | Proposed Urdu used in the mirror |
|---|---|
| Family system | خاندانی نظام |
| Family care | خاندانی نگہداشت |
| Rights and responsibilities | حقوق اور ذمہ داریاں |
| Huquq ul-Ibad | حقوق العباد |
| Huquq Allah | حقوق اللہ |
| Equal dignity and fair provision | مساوی وقار اور منصفانہ فراہمی |
| Equality (equal human dignity in this context) | مساوات |
| Social justice | سماجی انصاف |
| Equity | ضرورت کے مطابق منصفانہ مدد |
| State / Government / Islamic state | ریاست / حکومت / اسلامی ریاست |
| Public trust | عوامی امانت |
| Sovereignty / Divine sovereignty | حاکمیت / اللہ کی حاکمیت |
| Khilafat / Entrusted responsibility | خلافت / سونپی ہوئی ذمہ داری |
| Divine sovereignty and human responsibility | اللہ کی حاکمیت اور انسانی ذمہ داری |
| Shura / Consultation | شوریٰ / مشاورت |
| Justice / Accountability | انصاف / جواب دہی |
| Principles, procedures and outcomes | اصول، طریقۂ کار اور نتائج |
| Participation / Democracy | شرکت / جمہوریت |
| Evaluation of a compatibility claim | مطابقت کے دعوے کی جانچ |

## Validation and limits

All four files have matching heading-level vectors, paragraph counts, URLs and component
counts against English. Both assessments have 50 numbered entries including the 25 questions
and their guidance. The translated MCQ choices and guidance preserve the sequence
ب، ج، الف، د، ب، الف، ج، د، ب، الف. This is translator checking, not independent review.
All four Urdu SVGs pass the repository optimiser at 2.8–3.8 KB each; dark variants are derived.
Static Sharp previews were inspected serially under `scripts/heavy.sh`; long labels in
figures 1 and 3 were wrapped and reinspected. These previews do not establish browser geometry.

The crew brief forbids builds, servers and Playwright. Consequently `measure-figure-text.mjs`
(which launches Chromium), locale rendering, narrow viewport and A4 print inspection remain
pending. A permitted validation session must perform these checks before any claim of rendered
Urdu readiness. No uncertainty in the source was silently resolved: the article's 2004 issue
label and 2015 online publication date, contested scholarly positions, contextual limits on
scriptural applications and the limits of school-to-state analogies are retained.

`translation_status` remains `draft` on every page. G3 is advisory and unsigned; G5 requires an
independent qualified reviewer and the accepted English dependency. The translate-unit skill
Step 7 explicitly forbids appending a G4 tracker row, so this job records the draft here and
leaves the tracker and all review certification untouched. The brief's phrase "as the skill
says" is applied according to that explicit prohibition. No publication is claimed.
