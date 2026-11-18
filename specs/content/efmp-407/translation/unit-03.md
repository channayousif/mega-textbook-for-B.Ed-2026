# EFMP-407 Unit 3 Urdu translation handoff

Prepared by agent:opencode (crew job `efmp-407-u03-translate-r1`) on 2026-11-10 from English baseline commit `acf1104dfa8d696f596a70bc3260794ce2f4b3db` (the last commit touching `docs/semester-3/efmp-407/unit-03/`), also `origin/main` at `82ebba988302f1213aaeb9201c7473f0183539d7`. The branch had no earlier translation work, so this is a first full draft. English content is unchanged. `translation_status` stays `draft` in both locales because no independent G5 review has happened; only an accepted G5 earns `reviewed`.

## Translation bundle

The complete same-named mirror is at `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-03/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx` and `unit-assessment.mdx`. Topic titles and H1s read `موضوع 3.1 - ...`, `موضوع 3.2 - ...` and `موضوع 3.3 - ...`. Front-matter identifiers, `clo_refs`, reading minutes and `assessment_weighting` are byte-identical to English. Heading level vectors match file by file. Component calls match: 7 `<Figure>`, 4 `<PrintHandout>`, 1 `<TranslationStatusBadge>`. The assessment keeps the 10/10/5 order, option order (A-D as الف، ب، ج، د)، marks, mark splits and the final bounded `## جوابات اور نمبر دہی کی رہنمائی` section. Each Urdu MCQ was re-answered from the Urdu alone and matched the translated key.

All six placed English schematics now have `.ur.svg` sources wired into the Urdu pages, plus `.ur.dark.svg` twins derived by `npm run figures:variants` (`--check` clean). Reading order is mirrored: table columns run right to left with the row label on the right, and the concept-map boxes swap sides. Labels use the Nastaliq-first font stack. Each SVG `<desc>` equals its Urdu page alt. The English manifest rows, prompts and lifecycle are unchanged. The banner `fig-U3-7` is wired from `specs/content/efmp-407/figures/unit-03.illustration-notes.md` with the draft Urdu alt, reusing the one WebP.

## Gate results

`npm run check:content`: 14/14 pass with both `index.mdx` files at `draft`. During the temporary `reviewed` flip (reverted and verified), the only findings were the two expected ones: the `G4 ur-translation` and `G5 ur-review` rows were not done, plus a `content-status` staleness caused by the flip itself. So `key_terms`, file-set parity and figure parity are clean.

`scripts/measure-figure-text.mjs` was run on all six `.ur.svg` files through `scripts/heavy.sh` and exits 0. The dark twins pass `figures:variants:check`.

## Terminology working set and proposals

The frozen bank was consulted without edits. The Urdu index declares accepted entries for Curriculum (نصاب)، Pedagogy (تدریسیات)، Assessment (تشخیص)، Learning Outcome (نتیجہ ہائے تعلم)، Rubric (معیارِ جانچ)، Self-Assessment (خود جائزہ)، Summative Assessment (مجموعی جائزہ)، Formative Assessment (تشکیلی تشخیص)، Environment (ماحول)، Critical Thinking (تنقیدی سوچ)، Mother Tongue (مادری زبان) and Learning (سیکھنا). The unit has no `<Glossary>` calls. The eleven concept-graph Urdu labels in `concepts/unit-03.md` were consulted; the graph is unchanged.

Proposed specialised terms for the terminology owner (translation proposals only, not bank additions):

| English | Urdu used |
|---|---|
| Sustainable Development Goals | پائیدار ترقی کے اہداف |
| 2030 Agenda | ایجنڈا 2030 |
| 5 Ps framework | پانچ پی کا فریم ورک |
| People / Planet / Prosperity / Peace / Partnership | لوگ / سیارہ / خوشحالی / امن / شراکت |
| SDG Target 4.7 | پائیدار ترقی کا ہدف 4.7 |
| Education for sustainable development | پائیدار ترقی کے لیے تعلیم |
| Global citizenship education | عالمی شہریت کی تعلیم |
| Global citizenship | عالمی شہریت |
| Cognitive domain | ادراکی دائرہ کار |
| Socio-emotional domain | سماجی و جذباتی دائرہ کار |
| Behavioural domain | کرداری دائرہ کار |
| Pakistan's National SDG Framework | پاکستان کا قومی ایس ڈی جی فریم ورک |
| Three-tier priority categorisation | تین طبقاتی ترجیحی زمرہ بندی |
| Category 1 / 2 / 3 | زمرہ 1 / 2 / 3 |
| 18th Constitutional Amendment | 18ویں آئینی ترمیم |
| Provincial SDG Support Units | صوبائی ایس ڈی جی سپورٹ یونٹس |
| School Education and Literacy Department | اسکول تعلیم و خواندگی محکمہ |
| Government Elementary Colleges of Education | سرکاری ابتدائی کالج برائے تعلیم |
| Sindh Education Sector Plan | سندھ تعلیمی سیکٹر منصوبہ |
| School Management Committee | اسکول مینجمنٹ کمیٹی |
| District Education Authority | ضلعی تعلیمی اختیار |
| School development plan | اسکولی ترقیاتی منصوبہ |
| Transformative learning | تبدیلی لانے والا سیکھنا |
| Systems thinking | نظامی سوچ |
| Sustainability competencies | پائیداری کی صلاحیتیں |
| Brundtland Commission | برنٹ لینڈ کمیشن |
| Millennium Development Goals | ہزارہ ترقیاتی اہداف |
| Climate resilience | موسمیاتی صلاحیت |
| Climate vulnerability | موسمیاتی کمزوری |
| Public health | عوامی صحت |
| Economic livelihoods | معاشی روزگار |
| Intercultural dialogue | بین الثقافتی گفتگو |
| Peace-building | امن سازی |
| Structured controversy | منظم تنازعہ |
| Community action research | برادری عمل تحقیق |
| Jigsaw reading | جگسو پڑھنا |
| Stakeholder | متعلقہ فریق |
| Pastoralist | چرواہا |
| Wetland | دلدل |
| Municipal council | بلدیاتی کونسل |
| Wholesale market | تھوک منڈی |
| Biodiversity | حیاتیاتی تنوع |
| Ecological integrity | ماحولیاتی سالمیت |
| Social equity | سماجی انصاف |
| Economic prosperity | معاشی خوشحالی |
| Fair wages | منصفانہ اجرت |
| Organic | نامیاتی |
| Wall magazine | دیواری جریدہ |
| Rote learning | رٹنا |
| Civic competencies | شہری صلاحیتیں |
| Enrolment | داخلہ |
| Gender parity | جنسی مساویت |
| Out-of-school children | اسکول سے باہر بچے |
| Baseline indicators | بنیادی اشارے |
| Flood-prone | سیلاب زدہ |
| Sand-and-charcoal water filter | ریت اور کوے کا پانی فلٹر |
| Handwashing | ہاتھ دھونے |
| Water contamination | پانی کی آلودگی |
| Heatwave | گرمیوں کے لہر |
| Water scarcity | پانی کی قلت |
| Water conservation | پانی کی بچت |
| Waste reduction | فضلہ کم کرنا |
| Tree-planting | شجرکاری |
| Recycling | رسائیکلنگ |
| Marginalized community members | محروم برادری کے افراد |
| Common good | مشترکہ بھلائی |
| Peer disputes | ساتھیوں کے تنازعات |
| Perspective-taking | نقطۂ نظر سمجھنا |
| Emotional intelligence | جذباتی ذہانت |
| Shared humanity | مشترکہ انسانیت |
| Democratic participation | جمہوری حصہ لینا |
| Power structures | طاقت کے نظام |
| Supply chains | سپلائی چینیں |
| Planetary wellbeing | سیارہ کی بہبود |
| Cosmopolitan | کوسمیپولیٹن |
| Social injustice | سماجی ناانصافی |
| Environmental degradation | ماحولیاتی خرابی |
| Constitutional values | آئینی اقدار |
| International solidarity | بین الاقوامی یکجہتی |
| Climate finance | موسمیاتی مالیات |
| Vaccination campaigns | ویکسینیشن مہمات |
| Commodity markets | کمڈیٹی بازار |
| Chemical fertilizers | کیمیائی کھاد |
| Cotton pickers | کپاس چننے والی خواتین |
| Pesticide | کیڑے مار دوا |
| Whole-school | پورے اسکول |
| Student-led | شاگرد سرپرست |
| Environmental stewardship | ماحولیاتی حفاظت |
| Measurable | قابلِ پیمائش |
| Overarching theme | جامع موضوع |
| Cohesive model | ہم آہنگ ماڈل |
| Physical operations | جسمانی عمل |
| Community partnerships | برادری شراکت داری |
| Assessment plan | تشخیصی منصوبہ |
| Collaborative civic engagement | باہمی شہری مشغولیت |
| Integrative critique | یکجا تنقید |
| Chemical formulas | کیمیائی فارمولے |
| Water cycle diagrams | آبی چکر کے خاکے |
| Tripartite | تین حصوں والا |
| Lavish budgets | بھاری بجٹ |
| Foreign-dependent | غیر ملکی منحصر |
| Formative checks | تشکیلی جانچ |
| Student agency | شاگرد اختیار |
| Active listening | فعال سننا |
| Vulnerability | کمزوری |
| Voting eligibility | ووٹ ڈالنے کی اہلیت |
| National passport | قومی پاسپورٹ |
| Moral outlook | اخلاقی نقطۂ نظر |
| Ethical commitment | اخلاقی عہد |
| Planetary responsibility | سیارہ کی ذمہ داری |
| Elite | خوصوصی |
| Incisively | تنقیدی |
| Superficial | سطحی |
| Vague | مبہم |
| Nuanced | باریک |
| Rigorous | مضبوط |
| Seamlessly | بلا ناغہ |
| Inspiring | متاثر کن |
| Evidence-backed | دلیل پر مبنی |
| Actionable | قابلِ عمل |
| External funding | بیرونی مالی امداد |
| Authentic | مستند |
| Reflective journals | تاملی جریدے |
| Peer rubrics | ہم عمر معیارِ جانچ |
| Presentation feedback | پیشکش کے تاثرات |
| Conventional | روایتی |
| Multi-stage | کثیر مرحلی |
| Poster day | پوسٹر دن |
| Emerging | ناشدہ |
| Recommendations | سفارشات |
| Poorly structured | خراب ساخت |
| Coherent | ہم آہنگ |
| Realistically | حقیقت پسندانہ |
| Unrealistic | غیر حقیقت پسندانہ |

Bloom tags follow the corpus forms: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جانچنا، تخلیق.

## Known English issues carried over, not fixed in translation

The translation follows the English faithfully. It does not repair the open G3 findings, which belong to an English revision job. Each needs a mirrored Urdu edit when the English changes:

- **F1 (source note):** the "A note on the source" paragraph at `topic-02.mdx` is translated as written. The framework's stable digital copy is disclosed as not currently retrievable.
- **F2 (SDG 5 category guidance):** reconciled in the English repair (`topic-02.mdx` places SDG 5 in Category 2; the assessment guidance and ERQ 4 rubric agree). The Urdu mirrors the reconciled text.
- **F3/F4 (render and provenance):** remain unverified under the crew prohibition; the Urdu rendering is likewise uninspected.
- **F5/F6/F7:** the English repairs are mirrored (Target 4.1/ESD-GCED wording, specialist-term definitions, fictional-case and water-safety safeguards).

One English line is now stale in both locales: `index.mdx` ends with "This unit is an English draft awaiting independent expert review and Urdu translation". The Urdu mirror translates it faithfully, so the Urdu reader sees a note that the Urdu translation is still awaited. This is a content defect for the English revision job, not something a translation should silently improve.

## Not done here

- No G5 review, no `reviewed` flip, and no G4 tracker row marked done. The G4 row is marked ▣ (prepared) with this note, as for Units 4 and 8.
- Builds, dev servers, Playwright and Chromium were prohibited by the crew brief, so `render-inspect.mjs --locale ur` was not run. Narrow-view (360 px) and A4 print inspection of the rendered Urdu pages remain outstanding for G5. The six `.ur.svg` files passed `measure-figure-text.mjs`, which is the permitted geometry check.
- Rate probe: this draft took one session of about 90 minutes, covering 5 pages and 6 figures.

## English baseline digests

SHA-256 of the unchanged English source files at handoff:

- `index.mdx`: `bcbf7ad04a473324e789b85ebe9c76a9cbd68c12c6ef0f283df0e11249780c43`
- `topic-01.mdx`: `35ee7f7b72a7fe9c1c7cd33ee36f9cbd1b791f2da6fbdcbdcaf403fc80600439`
- `topic-02.mdx`: `1ea923719b8e8ac48490a6da28547ea4e1f505b4b677ff88b2ddf694c1c9055d`
- `topic-03.mdx`: `00b55eccb66048f39a4ee1f31019994a6e19edcffc94c60a1a649b91f5366580`
- `unit-assessment.mdx`: `b36dda081b4d89679ce1ca2552d8bc06716be103334678b03414f57f3c17d724`
