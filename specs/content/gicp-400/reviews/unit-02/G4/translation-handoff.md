# GICP-400 Unit 2 - Translator handoff

Translation delivery only, by agent:opencode. This is not an independent G5 report or review certification.

## Baseline and delivered files

- English baseline: `fa7d7fa89ec3e27127534c9dde467a0c30f13b0a` (origin/main HEAD, unchanged). No prior branch commits or uncommitted edits were present. Unit 2 has green G2 evidence; G3 is escalated and unsigned.
- Complete same-named Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/`, resolved with `resolveUnit()`.
- Topic titles read `موضوع 2.1 - ...` and `موضوع 2.2 - ...`, matching the English numbering and `topic_label`.
- The assessment retains 10 MCQs, 10 restricted responses, 5 extended responses, all model responses, marks and five analytic rubrics. Option ordering is unchanged; answer letters are transliterated (`A` to `الف`, `B` to `ب`, `C` to `ج`, `D` to `د`). The bounded final section is `## جوابات اور نمبر دہی کی رہنمائی`.
- Four localised SVGs, `fig-U2-1.ur.svg` through `fig-U2-4.ur.svg`, with generated `.ur.dark.svg` twins. Layout and reading direction are mirrored with `scripts/mirror-figure-rtl.mjs`; Nastaliq comes first in the font stack. IDs, teaching relationships and English assets are preserved. Urdu page alt and SVG desc strings match exactly.
- No teacher-notes file exists in the English baseline, so none was invented. The banner illustration remains prompt-only and belongs to the illustration job.

## Terminology working set and owner proposals

The frozen bank was read before translation and was not changed. The Urdu index declares only exact bank entries: Aligarh Movement (تحریکِ الی گڑھ), All-India Muslim League (آل انڈیا مسلم لیگ), Lahore Resolution (قراردادِ لاہور), Sir Syed Ahmad Khan (سر سید احمد خان), Quaid-e-Azam (قائدِ اعظم).

The single English `<Glossary term="Quaid-e-Azam" />` call, its lookup key and its import are preserved; the existing `definition_ur` was consulted. All eight concept-graph labels were consulted; the five authored Urdu labels (Responsible selfhood, Muslim collective self-government, Equal citizenship, Electoral mandate and negotiation, State creation and continuing responsibilities) are used as authored, without claiming bank acceptance.

The following unit-level technical equivalents are proposals for the owner, not additions to the bank or accepted terminology:

| English concept not banked | Proposed Urdu used |
|---|---|
| Muslim political thought | مسلم سیاسی فکر |
| Pakistan Movement | تحریکِ پاکستان |
| Selfhood | خودی |
| Self-government | خود حکمرانی |
| Responsible selfhood | ذمہ دار خودی |
| Equal citizenship | مساوی شہریت |
| Representation | نمائندگی |
| Safeguard | تحفظ |
| Constituent Assembly | دستور ساز اسمبلی |
| Separate electorates | الگ انتخابات |
| Dominion | ڈومینین |
| Cabinet Mission | کابینہ مشن |
| Lucknow Pact | لکھنؤ معاہدہ |
| Fourteen Points | چودہ نکات |
| Allahabad Address | الٰہ آباد خطاب |
| North-West Frontier Province | شمال مغربی سرحدی صوبہ |
| Partition | تقسیم |
| Voting rights | حق رائے |
| Mandate | تائید |
| Proposal | تجویز |
| Legal change | قانونی تبدیلی |
| Chronology | سلسلہ وار ترتیب |
| Turning point | رخ کا موڑ |
| Agency | عملی صلاحیت |
| Mechanism | طریقہ کار |
| Solidarity | یک جہتی |
| Boundary award | سرحدی فیصلہ |
| Territorial arrangement | علاقائی انتظام |
| Independence Act | آزادی ایکٹ |
| Governor-General | گورنر جنرل |
| MAO College | ایم اے او کالج |

## Verification and remaining dependencies

- All 14 content gates passed with draft flags. The final draft rerun passed all 14 gates after the temporary reviewed test and revert.
- Reviewed-only test: temporarily changed both indexes to `reviewed` and regenerated the derived content-status report for that temporary state. All checks passed except the two expected pipeline findings: Unit 2 `G4 ur-translation` and `G5 ur-review` rows are not done. No terminology, structural parity or figure parity findings remained. Both indexes were then restored to `draft` and the derived report regenerated for the final draft state.
- Supplemental source comparison passed for all four files: identical file set, invariant metadata, heading-level vectors, imports, component counts (Figure 4/4, Glossary 1/1, PrintHandout 3/3), Glossary keys and numbered-item counts (50/50); all four Urdu page alt/SVG desc pairs match.
- All four Urdu SVGs were authored by copy-then-translate, mirrored with `scripts/mirror-figure-rtl.mjs` and optimised, each below 20 KB. Global `figures:variants:check` passed. Supplemental non-browser Pango measurement was not available in this environment, so text geometry was checked by hand against each viewBox rather than measured.
- The mandatory `node scripts/measure-figure-text.mjs` uses Chromium. It, the build, and `render-inspect.mjs --locale ur` were not run because the job brief explicitly prohibits browser runs, builds and dev servers. Actual narrow-width, A4 print, bidi and rendered SVG inspection remain pending for the next authorised session. No render evidence or geometry pass is claimed.
- English G3 remains escalated: bound Hassan full text/provenance and rendered accessibility evidence are unresolved. Its existing attributions are translated faithfully, without adding corroboration or removing their attribution. A fresh reviewer must resolve those English dependencies before accepted G5 can bind to them.
- `translation_status` remains `draft` on every English and Urdu page. The existing Unit 2 G4 row remains open and unchanged, in accordance with translate-unit Step 7; no row was appended and no gate was certified. G5 belongs to a fresh independent session. Any English repair will require corresponding Urdu repairs and new review inputs.
