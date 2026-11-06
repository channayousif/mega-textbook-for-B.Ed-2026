# GICP-400 Unit 1 - Translator handoff

Translation delivery only, by agent:codex. This is not an independent G5 report or review certification.

## Baseline and delivered files

- English baseline: `f4bf69fd3cd72f2ac83da70f67c914a7cea6f7b2`, the checkout HEAD at the start. No prior branch commits or uncommitted edits were present. Unit 1 has green G2 evidence; G3 is escalated and unsigned.
- Complete same-named Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/`, resolved with `resolveUnit()`.
- The assessment retains 10 MCQs, 10 restricted responses, 5 extended responses, all model responses, marks and five analytic rubrics. Option ordering is unchanged; answer letters are transliterated.
- Four localised SVGs, `fig-U1-1.ur.svg` through `fig-U1-4.ur.svg`, with generated `.ur.dark.svg` twins. Horizontal layouts and reading direction are mirrored with the repository RTL helper; Nastaliq comes first in the font stack. IDs, teaching relationships and English assets are preserved. Urdu page alt and SVG desc strings match exactly.
- No teacher-notes file exists in the English baseline, so none was invented. Banner illustration remains prompt-only and belongs to the illustration job.

## Terminology working set and owner proposals

The frozen bank was read before translation and was not changed. The Urdu index declares only exact bank entries: Two-Nation Theory (دو قومی نظریہ), Ideology of Pakistan (پاکستان کے نظریے), Quaid-e-Azam (قائدِ اعظم), Objectives Resolution (قراردادِ مقاصد), Sir Syed Ahmad Khan (سر سید احمد خان), All-India Muslim League (آل انڈیا مسلم لیگ). Pakistan Studies uses the bank form پاکستان کے مطالعہ when naming the prerequisite course. Assessment, self-assessment and rubric use تشخیص، خود جائزہ and معیارِ جانچ.

All eight English Glossary calls, their lookup keys and their imports are preserved. The existing `definition_ur` values for Ideology, Fundamental Rights, Objectives Resolution, Principles of Policy, Two-Nation Theory, Sovereignty, Theocracy and Ideology of Pakistan were consulted. All six concept-graph labels were consulted; its bank form پاکستان کے نظریے is retained, without silently correcting the bank's register.

The following unit-level technical equivalents are proposals for the owner, not additions to the bank or accepted terminology:

| English concept not banked | Proposed Urdu used |
|---|---|
| Ideology | نظریہ |
| Constitution | آئین |
| Values and constitutional force | اقدار اور آئینی قوت |
| Islamic concept of state | ریاست کا اسلامی تصور |
| Fundamental Rights | بنیادی حقوق |
| Principles of Policy | حکمتِ عملی کے اصول |
| Sovereignty | حاکمیت |
| Theocracy | مذہبی پیشوائی کی حکومت |
| Preamble | دیباچہ |
| Constituent Assembly | دستور ساز اسمبلی |
| Self-government | خود حکمرانی |
| Equal citizenship | برابر کی شہریت |
| Authority as a trust | اختیار بطور امانت |
| Consultation | مشاورت |
| Equality | مساوات |
| Justice | انصاف |
| Solidarity | یک جہتی |
| Democracy | جمہوریت |
| Constitutional amendment | آئینی ترمیم |

## Verification and remaining dependencies

- All 14 content gates passed with draft flags before figure localisation. The final draft rerun passed all 14 gates after refreshing the ignored derived report for the updated tracker note.
- Reviewed-only test: temporarily changed both indexes to reviewed and regenerated the derived content-status report for that temporary state. All checks passed except the two expected pipeline findings: Unit 1 G4 and G5 rows are not done. No terminology, structural parity or figure parity findings remained. Both indexes were then restored to draft and the original derived report restored byte for byte before the delivery note was added. Updating that tracker note changed its digest, so the ignored report was subsequently regenerated for the final draft state.
- Supplemental source comparison passed for all four files: identical file set, invariant metadata, heading-level vectors, imports, component counts, Glossary keys and numbered-item counts; all four Urdu page alt/SVG desc pairs match.
- All four SVGs were optimised, each below 20 KB. Global `figures:variants:check` passed. Supplemental non-browser Pango measurements using installed Noto Nastaliq Urdu found no canvas overflow, horizontal panel spill or normalised label-spacing findings across 109 text nodes. This is a limited font-metric check, not browser geometry evidence.
- The mandatory `node scripts/measure-figure-text.mjs` uses Chromium. It, the build, and `render-inspect.mjs --locale ur` were not run because the job brief explicitly prohibits browser runs and builds. Actual narrow-width, A4 print, bidi and rendered SVG inspection remain pending for the next authorised session. No render evidence or geometry pass is claimed.
- English G3 remains escalated: bound Hassan full text/provenance and rendered accessibility evidence are unresolved. Its existing attributions are translated faithfully, without adding corroboration or removing their attribution. A fresh reviewer must resolve those English dependencies before accepted G5 can bind to them.
- `translation_status` remains `draft` on every English and Urdu page. The existing Unit 1 G4 row remains open with a delivery-note link, in accordance with translate-unit Step 7; no row was appended and no gate was certified. G5 belongs to a fresh independent session. Any English repair will require corresponding Urdu repairs and new review inputs.
