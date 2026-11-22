# GCCE-400 Unit 2 Urdu translation handoff

- Translator: agent:claude (crew job `gcce-400-u02-translate`), 2026-11-22, branch `crew/gcce-400-u02-translate`.
- English baseline: `870144971` (the only commit that touches the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the English bytes are unchanged.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-02/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Four `.ur.svg` figures (`fig-U2-1` to `fig-U2-4`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 2.1 - ...` and `موضوع 2.2 - ...`, matching the English numbering; the topic files carry no H1, exactly like the English.
- Core terms: state ریاست, government حکومت, civil society سول سوسائٹی (transliteration, matching the concept label), democracy جمہوریت, political participation سیاسی شرکت, representation نمائندگی, sovereignty حاکمیت, federation وفاقی نظام, legislature مقننہ, executive انتظامیہ, judiciary عدلیہ, separation of powers تقسیمِ اختیار, tier سطح, federal وفاقی, province صوبہ, local government مقامی حکومت.
- Constitution articles use `دفعہ` (`دفعہ 1`، `دفعہ 140A`، `دفعہ 25A`، `دفعہ 70(3)`)؛ `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Institutions: پارلیمنٹ (مجلسِ شوریٰ)، قومی اسمبلی، سینیٹ، وزیرِ اعظم، وزیرِ اعلیٰ، گورنر، ہائی کورٹ، سپریم کورٹ، وفاقی آئینی عدالت، یونین کونسل، یونین کمیٹی، میونسپل کمیٹی، میٹروپولین کارپوریشن، پریس کلب، محلہ کمیٹی، این جی او.
- Legislation: بل (bill)، قانون (Act)، منظوری (assent)، مشترکہ اجلاس (joint sitting)، مالیاتی بل (Money Bill)، وفاقی قانون سازی فہرست (Federal Legislative List)، مشترکہ فہرست (Concurrent List)، فوجداری قانون (criminal law)، شواہد (evidence).
- Names: Sana ثنا، Kashif کاشف. Citations keep Latin author-year forms (Batool, Mahmood and Ullah, 2019؛ Business Recorder, 2024؛ Government of Pakistan, 2012؛ Ahmad, 2004؛ Youniss and Levine, 2009؛ Glencoe/McGraw-Hill, n.d.).
- `<Glossary>` attributes stay English (`State`, `Sovereignty`, `Federation`, `Legislature`, `Executive`, `Judiciary`, `Separation of Powers`, `Civil society`, `Political participation`, `Representation`); wrapped surface text is translated.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is الف، ب، ج، ج، ج، ب، ج، ب، ب، ج, matching the English A, B, C, C, C, B, C, B, B, C.

## Terminology

The frozen bank holds six terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص)، Summative Assessment (مجموعی جائزہ)، Rubric (معیارِ جانچ)، Self-Assessment (خود جائزہ)، Curriculum (نصاب)، Practical Activity (عملی سرگرمی). The bank and `glossary.json` were not changed. `Learning Outcome` (نتیجہ ہائے تعلم) also occurs in the English heading "Unit learning outcomes" but is not declared, matching the Unit 1 precedent.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| State | ریاست | content-spec key term and concept label |
| Sovereignty | حاکمیت | concept label; `glossary.json` already carries a definition_ur |
| Federation | وفاقی نظام | plain rendering |
| Legislature | مقننہ | `glossary.json` definition_ur uses it |
| Executive | انتظامیہ | `glossary.json` definition_ur uses it |
| Judiciary | عدلیہ | `glossary.json` definition_ur uses it |
| Separation of Powers | تقسیمِ اختیار | no banked term |
| Civil society | سول سوسائٹی | concept label (transliteration) |
| Political participation | سیاسی شرکت | concept label |
| Representation | نمائندگی | concept label |
| Democracy | جمہوریت | core term |
| Federal | وفاقی | core term |
| Province | صوبہ | core term |
| Local government | مقامی حکومت | core term |
| Tier | سطح | structural term |
| Constitution | آئینِ پاکستان | constitutional term |
| Article | دفعہ | constitutional term |
| Parliament | پارلیمنٹ / مجلسِ شوریٰ | institutional term |
| National Assembly | قومی اسمبلی | institutional term |
| Senate | سینیٹ | institutional term |
| Prime Minister | وزیرِ اعظم | institutional term |
| Chief Minister | وزیرِ اعلیٰ | institutional term |
| Governor | گورنر | institutional term |
| High Court | ہائی کورٹ | institutional term |
| Supreme Court | سپریم کورٹ | institutional term |
| Federal Constitutional Court | وفاقی آئینی عدالت | institutional term |
| Bill | بل | legislative term |
| Act | قانون | legislative term |
| Assent | منظوری | legislative term |
| Joint sitting | مشترکہ اجلاس | legislative term |
| Money Bill | مالیاتی بل | legislative term |
| Union council | یونین کونسل | local government term |
| Union committee | یونین کمیٹی | local government term |
| Municipal committee | میونسپل کمیٹی | local government term |
| Metropolitan Corporation | میٹروپولین کارپوریشن | local government term |
| NGO | این جی او | transliteration |
| Association | انجمن | civil-society term |
| Trade union | ٹریڈ یونین | civil-society term |
| Welfare | فلاحی | civil-society term |
| Press club | پریس کلب | media term |
| Media | ذرائع ابلاغ | media term |
| Mohalla committee | محلہ کمیٹی | community term |
| Bar association | وکلاء کی انجمن | professional body |
| Constituency | حلقۂ ووٹ دہندگی | electoral term |
| Reserved seats | مخصوص نشستیں | electoral term |
| Turnout | حضرت | electoral term |
| Registered voters | رجسٹرڈ ووٹ دہندگان | electoral term |
| Ward | وارڈ | electoral term |
| Candidate | امیدوار | electoral term |
| Polling station | پولنگ اسٹیشن | electoral term |
| Petition | درخواست | participation term |
| Peaceful protest | پُرامن احتجاج | participation term |
| Basic health unit | بنیادی صحت یونٹ | public-service term |
| Irrigation department | آبپاشی محکمہ | public-service term |
| Street lighting | گلیوں کی روشنی | public-service term |
| Drainage | نکاسی | public-service term |
| Federal Legislative List | وفاقی قانون سازی فہرست | constitutional term |
| Concurrent List | مشترکہ فہرست | constitutional term |
| Criminal law | فوجداری قانون | legal term |
| Evidence (legal) | شواہد | legal term |
| Fundamental rights | بنیادی حقوق | constitutional term |
| Free and compulsory education | مفت اور لازمی تعلیم | constitutional term |
| Practicum | پریکٹیکم | course term |
| Trainee | زیرِ تربیت استاد | course term |
| Social studies | سماجی مطالعہ | school subject |
| Misconception | عام غلط فہمی | pedagogy term |
| Worked example | حل شدہ مثال | pedagogy term |
| Service-learning | خدمتی سیکھنا | pedagogy term |

## Figures

- `fig-U2-1.ur.svg` mirrors the four element boxes so population is rightmost and sovereignty leftmost; every label is end-anchored.
- `fig-U2-2.ur.svg` mirrors Part 1 (tier label on the right, boxes ordered right to left) and Part 2 (main bill path on the right, the rejected-or-90-days branch on the left, arrows flipped).
- `fig-U2-3.ur.svg` mirrors the concept map: family right, market left, the five nodes ordered right to left, and the state/civil-society arrows and labels swapped.
- `fig-U2-4.ur.svg` mirrors the table so the row-label column sits on the right and every cell is end-anchored.
- All eight SVGs (4 source `.ur.svg` and 4 derived `.ur.dark.svg`) were checked with `scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions. `check:svg-style` is clean for the four new files.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check all pass. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 2 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 5 files, matching component counts (4 Figure، 10 Glossary، 3 PrintHandout، 1 TranslationStatusBadge)، matching table rows، and 45 numbered items in the assessment (10 MCQ، 10 RRQ، 5 ERQ، 10 key entries، 10 model answers).
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server، `npm run build` and any local render-inspect run، and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping، 360px and A4 print، table scroll) is therefore unverified here and is a G5 task.

## Open points for G3، G5 and the owner

1. The six authored concept labels in `concepts/unit-02.md` and the proposed terms table above.
2. The Urdu render at 360px and A4 print، and the RTL table reading order in `fig-U2-4`.
3. The Sindh Local Government Act example (street lighting as a local function) and the Batool 2019 abstract-only use already flagged for G3 in `sources/unit-02.md`.
