# GICP-400 Unit 5 - Translator handoff

Translation delivery only, by agent:opencode. This is not an independent G5 report or review certification.

## Baseline and delivered files

- English baseline: `6bf119a031e292f38e34c878bff9f1f795fcbd1e` (the last commit touching `docs/semester-3/gicp-400/unit-05/`). The checkout HEAD was `fa7d7fa89`, with no branch commits ahead of `origin/main` and a clean working tree before this job.
- Complete same-named Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/`, resolved with `resolveUnit()`.
- The assessment retains 10 MCQs, 10 restricted responses, 5 extended responses, all model responses, marks and five analytic rubrics. Option ordering is unchanged; answer letters are transliterated (`A` to `الف`, `B` to `ب`, `C` to `ج`, `D` to `د`). The bounded answers heading is translated, so the file carries no English answer-key prose.
- Six localised SVGs, `fig-U5-1.ur.svg` through `fig-U5-6.ur.svg`, with generated `.ur.dark.svg` twins. Horizontal layouts and reading direction are mirrored with `scripts/mirror-figure-rtl.mjs`; Nastaliq comes first in the font stack. IDs, teaching relationships and English assets are preserved. Urdu page alt and SVG desc strings match exactly.
- No teacher-notes file exists in the English baseline, so none was invented. The banner illustration remains prompt-only and belongs to the illustration job.

## Terminology working set and owner proposals

The frozen bank was read before translation and was not changed. The Urdu index declares `key_terms: []`: none of the unit's key concepts is banked, so declaring any of them would fail `check:pipeline-gate`. The banked terms that do appear in the unit are used in their banked form: Curriculum (نصاب), Assessment (تشخیص), Self-Assessment (خود جائزہ), Rubric (معیارِ جانچ), Summative Assessment (مجموعی جائزہ) and Learning Outcome (نتیجہ ہائے تعلم).

All eight English Glossary calls, their lookup keys and their imports are preserved. The existing `definition_ur` values for Federalism, Separation of Powers, Legislature, Executive, Judiciary, Fundamental Rights, Writ petition and Principles of Policy were consulted. All thirteen concept-graph labels were consulted; their Urdu labels are authored labels requiring independent G5 review.

The following unit-level technical equivalents are proposals for the owner, not additions to the bank or accepted terminology:

| English concept not banked | Proposed Urdu used |
|---|---|
| Constitution | آئین |
| Federalism | وفاقیت |
| Division of law-making power | قانون سازی کے اختیارات کی تقسیم |
| Parliamentary system | پارلیمانی نظام |
| Separation of powers and checks | اختیارات کی علیحدگی اور باہمی نگرانی |
| Federal Legislative List | وفاقی قانون سازی کی فہرست |
| Concurrent Legislative List | مشترکہ قانون سازی کی فہرست |
| Council of Common Interests | مشترکہ مفادات کونسل |
| Fundamental rights | بنیادی حقوق |
| Limits on rights | حقوق کی حدود |
| Rights guaranteed by the Constitution | آئین میں دیے گئے حقوق |
| Enforcement of rights | حقوق کا نفاذ |
| Writ petition | رٹ درخواست |
| Aggrieved person | متاثرہ شخص |
| Adequate remedy | مناسب قانونی علاج |
| Void | کالعدم |
| Abridge | کم کرنا |
| Federal Constitutional Court | وفاقی آئینی عدالت |
| Judicial Commission | جوڈیشل کمیشن |
| No-confidence vote | عدم اعتماد کی رأی |
| Question of public importance | عوامی اہمیت کا سوال |
| Proclamation of Emergency | اعلانِ طارئی حالت |
| Principles of Policy | حکمتِ عملی کے اصول |
| Islamic way of life | اسلامی طرزِ زندگی |
| Social justice and equality | سماجی انصاف اور مساوات |
| Promotion of education | فروغِ تعلیم |
| Right and Principle distinguished | حق اور اصول میں فرق |
| Check (noun) | نگرانی |
| Corporal punishment | جسمانی سزا |
| Mental harassment | ذہنی اذیت |
| Caste | ذات |
| Sect | مذہبی فرقہ |
| Public order | عوامی نظم |
| Decency | حیا |
| Contempt of court | عدالت کی بے حرمتی |
| Incitement to an offence | جرم کی ترغیب |

## Verification and remaining dependencies

- `npm run check:content` passes all 14 gates in the draft state.
- Reviewed-only test: both `index.mdx` files were temporarily flipped to `reviewed` and the derived content-status report regenerated. All gates passed except the two expected pipeline findings: Unit 5 G4 and G5 rows are not done. No terminology, structural parity or figure parity findings remained. Both indexes were then restored to `draft` and the derived report regenerated for the final draft state.
- Supplemental source comparison passed for all five files: identical file set, invariant metadata, heading-level vectors, imports, component counts, Glossary keys, figure IDs, numbered-item counts; all six Urdu page alt/SVG desc pairs match.
- Non-browser geometry: a Pillow + Raqm pass (Noto Nastaliq Urdu) approximated `scripts/measure-figure-text.mjs` and found no viewBox right/bottom overflow, wordmark collision, label overlap or panel spill across the six `.ur.svg` files. One row label (`22(3)(b)`) was set to an inline 12px to keep it inside its column. This is a font-metric check, not browser geometry evidence.
- `npm run figures:variants:check` passes.
- The mandatory `node scripts/measure-figure-text.mjs` uses Chromium. It, the build, and `render-inspect.mjs --locale ur` were not run because the job brief explicitly prohibits browser runs and builds. Actual narrow-width, A4 print, bidi and rendered SVG inspection remain pending for the next authorised session. No render evidence or browser geometry pass is claimed.
- English G3 remains escalated: the existing advisory report at `specs/content/gicp-400/reviews/unit-05/G3/` records source, alt-text and incomplete render/provenance evidence. Its attributions are translated faithfully, without adding corroboration or removing their attribution. A fresh reviewer must resolve those English dependencies before accepted G5 can bind to them.
- `translation_status` remains `draft` on every English and Urdu page. The existing Unit 5 G4 row remains open with a delivery-note link, in accordance with translate-unit Step 7; no row was appended and no gate was certified. G5 belongs to a fresh independent session. Any English repair will require corresponding Urdu repairs and new review inputs.
