# GPKS-402 Unit 3: G4 translation handoff

- Translator: codex, crew/gpks-402-u03-translate, 2026-10-31.
- English baseline: `23c211bd6fe0b17fe3e7bcbade5c54b15b9642cb`, identical to origin/main at job start. No earlier branch commits or uncommitted work existed. English content is unchanged.
- Four complete same-named Urdu pages: index.mdx, topic-01.mdx, topic-02.mdx and unit-assessment.mdx, resolved through scripts/lib/content-roots.mjs under i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/.
- Four schematic light sources fig-U3-1.ur.svg through fig-U3-4.ur.svg, horizontally mirrored exactly once with mirror-figure-rtl.mjs, wired in the Urdu topics. Four dark twins derived through figures:variants. Localised title/desc, visible labels, captions and alt text; each desc matches its page alt. Light files are 4.4-6.5 KB after SVG optimisation, below 20 KB.
- The translated assessment retains the 10 MCQ / 10 restricted / 5 extended sequence, option order, Bloom levels, sentence and word bounds, marks, model explanations and five analytic rubrics in the final bounded guidance section.
- Both locales retain translation_status: draft. G4 has a descriptive open tracker row as required by translate-unit Step 7 and the crew brief; G3 and G5 remain open and unsigned. No self-review, certification, publication, push or PR.

## Terminology working set and proposals

The frozen bank was read without modification. Banked unit terms use قراردادِ مقاصد (Objectives Resolution), قراردادِ لاہور (Lahore Resolution), پاکستان کے مطالعہ (Pakistan Studies), تشخیص (Assessment), تشکیلی تشخیص (Formative Assessment), مجموعی جائزہ (Summative Assessment), خود جائزہ (Self-Assessment) and معیارِ جانچ (Rubric). The Urdu index declares four exact accepted key_terms pairs: Objectives Resolution, Lahore Resolution, Assessment and Self-Assessment. No English page uses a Glossary component, so no glossary key or definition required translation. glossary.json was inspected.

The unit's concept graph was read. Its authored labels inform the translation: آئین اور حکومت؛ پارلیمانی جواب دہی؛ صدارتی نظام کی جواب دہی؛ نمائندگی اور صوبائی خود مختاری؛ آئینی تسلسل میں تعطل؛ آئینی اتفاق کی تشکیل؛ دو ایوانی وفاقی نمائندگی؛ اصل دفعات اور بعد کی ترامیم؛ اسلامی دفعات اور شہریت کے تحفظات؛ کونسل کی مشاورت اور قانون سازی۔ The graph's Urdu labels remain provisional and unchanged; the mirror uses Western digits as required by translate-unit.

Unbanked constitutional vocabulary used below is proposed for owner consideration and independent G5 terminology review, not silently added to the bank:

| English | Proposed Urdu used in the mirror |
|---|---|
| Constitutional development | آئینی ارتقا |
| Constitution / Constitution of 1973 | آئین / 1973 کا آئین |
| Constituent Assembly | دستور ساز اسمبلی |
| Objectives Resolution substantive status | قراردادِ مقاصد کی نافذ العمل آئینی حیثیت |
| Sovereignty | حاکمیت |
| Representation | نمائندگی |
| Fundamental rights | بنیادی حقوق |
| Judiciary / judicial independence | عدلیہ / عدالتی آزادی |
| Federation / federalism / federal form | وفاق / وفاقیت / وفاقی ساخت |
| Provincial autonomy | صوبائی خود مختاری |
| Parliamentary / presidential responsibility | پارلیمانی / صدارتی جواب دہی |
| Head of state / head of government | سربراہِ ریاست / سربراہِ حکومت |
| Unicameral / bicameral | یک ایوانی / دو ایوانی |
| Parity (between wings) | برابری |
| Basic Democrats | بنیادی جمہوریتوں کے ارکان |
| Electoral college / indirect election | انتخابی کالج / بالواسطہ انتخاب |
| Unitary | وحدانی |
| Executive / legislature | انتظامیہ / مقننہ |
| Amendment / abrogation / suspension | ترمیم / منسوخی / معطلی |
| Adult franchise | بالغ رائے دہی |
| Interim Constitution | عبوری آئین |
| Passage / assent / authentication / commencement | منظوری / توثیق / رسمی تصدیق / نفاذ |
| Consensus | اتفاقِ رائے |
| Consolidated edition | یکجا ایڈیشن |
| Law-making competence | قانون سازی کا اختیار |
| Concurrent Legislative List | مشترکہ قانون ساز فہرست |
| Council of Common Interests | مشترکہ مفادات کونسل |
| Constitutional government / constitutional remedy | آئینی حکومت / آئینی چارہ جوئی |
| Principles of Policy | اصولِ پالیسی |
| Islamic provisions | اسلامی دفعات |
| Personal law | شخصی قانون |
| Council of Islamic Ideology | اسلامی نظریاتی کونسل |
| Theocracy (the definition used in the English lesson) | مذہبی پیشوائیت کی حکومت |
| Preamble / Schedules / Annex | دیباچہ / جدول / ضمیمہ |

Everyday words such as development, learning and memory are not automatically pedagogical bank concepts when they appear as ordinary English or in the constitutional title. No inappropriate substitution of the bank's developmental-psychology term نشوونما into constitutional development was made.

## Validation and limits

- Baseline check:content: all 13 gates PASS on the clean checkout, whose HEAD equalled origin/main. See content-baseline.log.
- File set, heading-level vectors, invariant front matter, import statements, component counts, numbered-item counts, exact alt/desc agreement and MDX compilation: PASS on all four pages. Frozen key_terms and the 10/10/5 bank: PASS. See mirror-check.log.
- Temporary reviewed check: validate:content and check:figures PASS with parity activated; no terminology findings. Pipeline failure consists only of open G4 and G5 rows. check:content-status also reports stale output because the flag is temporarily changed. See content-temporary-reviewed.log. No gate or evidence policy was weakened to suppress those expected findings. A finally block restored both indexes to draft.
- The first draft-state run overlapped the temporary flip and saw the same transient stale content report. It is superseded by the sequential final draft run, recorded in content-final.log after regenerating the ignored content report.
- An attempted update to the English figure manifest header invalidated the English G2 digest. That header edit was fully reverted; Urdu placement is documented here and in the tracker instead, preserving the settled English review inputs.
- SVG optimisation and figures:variants:check PASS. This does not establish text geometry or visual legibility.
- A translator self-check of the Urdu MCQ meanings gives ب، ج، الف، د، ج، ب، د، الف، ج، ب, matching the translated option ordering and guidance. This is not independent review.

The crew brief explicitly prohibits a build, dev server and Playwright. measure-figure-text.mjs imports playwright-core and launches Chromium, so it was not run. No geometry pass, narrow-view, desktop or A4 inspection is claimed. All four Urdu SVGs and the actual rendered Urdu still need that verification in an authorised follow-up. This is the principal unresolved G4 limitation, not a semantic uncertainty silently resolved by guessing. English review remains advisory pending qualification; a future G5 must also satisfy its exact-English G3 dependency.

## Next owner

A follow-up permitted to run browser checks must measure all four Urdu SVGs, repair any wrap/overlap, rederive dark twins after edits, and inspect every Urdu page at desktop, 360px and A4 print widths. Then hand the frozen bundle to a fresh independent G5 reviewer under ADR-0019. The owner resolves proposed terms. The translator does not certify either gate or change translation_status to reviewed.

Measured elapsed time from completion of the initial baseline check through translation and final checks: approximately 10.7 minutes; preliminary rule and source reading preceded that measurement.
