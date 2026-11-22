# GCCE-400 Unit 3 Urdu translation handoff

- Translator: agent:claude (crew job `gcce-400-u03-translate`), 2026-11-22, branch `crew/gcce-400-u03-translate`.
- English baseline: `cacf4aac0` (the only commit that touches the English unit, its four schematic SVGs and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence and the English bytes are untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Four `.ur.svg` figures (`fig-U3-1` to `fig-U3-4`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals its carrier alt text byte-for-byte.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 3.1 - ...` and `موضوع 3.2 - ...`, matching the English numbering, and each topic carries an H1 that repeats its title exactly (the English topics have H1s).
- Core terms: fundamental rights بنیادی حقوق, liberty آزادی, Constitution آئینِ پاکستان, Article دفعہ, State ریاست, citizen شہری, right حق, duty فرض, responsibility ذمہ داری, law قانون, legal قانونی, civic شہری, democracy جمہوریت, democratic جمہوری, constitutional آئینی, due process مناسب قانونی طریقۂ کار, reasonable restrictions معقول پابندیاں, equality before law قانون کے سامنے مساوات.
- Constitution articles use `دفعہ` (`دفعہ 8`، `دفعہ 25A`، `دفعہ 5(1)`، `دفعہ 184(3)`)؛ `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Institutions: پارلیمنٹ (مجلسِ شوریٰ)، قومی اسمبلی، سینیٹ، وزیرِ اعظم، آئین ساز اسمبلی، اعلی عدالتیں، ہائی کورٹ، سپریم کورٹ، مجسٹریٹ، وکیل، ہیڈ ماسٹر، ہیڈ مسٹریس، بلدیاتی ادارہ.
- Legislation and history: قراردادِ مقاصد (banked)، ہندوستان کا حکومتی ایکٹ 1935، پاکستان کا عارضی آئینی حکم، مارشل لا، اسلامی جمہوریہ، یک ایوانی، دو ایوانی، بنیادی جمہوری (Basic Democrats)، پہلی آئینی ترمیم (1963)، اٹھارہویں ترمیم (2010)، فوجداری قانون، مدنی جائیداد کے قوانین، ماحولیاتی ضوابط، میونسپل ٹریفک قوانین.
- Names and places: Bushra بوشرا، Marvi ماروی، Farhana فرحانہ، Sukkur سکھر، Hyderabad حیدرآباد، Mirpurkhas میرپورخاص، Larkana لاڑکانہ، Karachi کراچی، Thatta ٹھٹھہ، Liaquat Ali Khan لیاقت علی خان، Iskander Mirza اسکندر مرزا، Ayub Khan ایوب خان، Yahya Khan یحییٰ خان. Citations keep Latin author-year forms (Glencoe/McGraw-Hill, n.d.؛ Dean, 2005؛ Ahmad, 2004؛ Government of Pakistan, 2012).
- `<Glossary>` attributes stay English (`Fundamental Rights`, `Writ petition`); wrapped surface text is translated (`بنیادی حقوق`, `درخواست`). Both resolve to bilingual `glossary.json` entries.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged. Rubric band labels use ابتدائی / میانہ / اعلی with the same numerals and ranges.
- Self-answered from the Urdu alone, the MCQ key is ب، ب، ب، ج، ج، الف، ب، ب، الف، ب, matching the English B, B, B, C, C, A, B, B, A, B.
- The bounded answers section reads `## جوابات اور نمبر دہی کی رہنمائی` and stays the file's final `##` section. It leaves no untranslated English assessment prose in the file, so `check:no-answer-keys` has no trigger.

## Terminology

The frozen bank holds five terms that occur in the unit's prose, all bound in the Urdu `key_terms`: Assessment (تشخیص)، Summative Assessment (مجموعی جائزہ)، Rubric (معیارِ جانچ)، Self-Assessment (خود جائزہ)، Practical Activity (عملی سرگرمی). The bank and `glossary.json` were not changed.

`Learning Outcome` (نتیجہ ہائے تعلم) occurs in the English heading "Unit learning outcomes" but is not declared, matching the Unit 1 and Unit 2 precedent. `Curriculum` (نصاب) occurs in the unit only inside a Latin citation title, so it is not declared, matching the Unit 4 and Unit 6 precedent. `Civic education` (شہری تعلیم) occurs twice in prose but is a `glossary.json` entry, not a `terminology.csv` row, and is not used through `<Glossary>`.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Fundamental rights | بنیادی حقوق | content-spec key term, concept label and `<Glossary>` term |
| Liberty | آزادی | content-spec key term |
| Civic duty | شہری فرض | content-spec key term |
| Constitution | آئینِ پاکستان | core term |
| Article | دفعہ | constitutional term |
| Right | حق | core term |
| Duty | فرض | core term |
| Responsibility | ذمہ داری | core term |
| Law | قانون | core term |
| Legal | قانونی | core term |
| Civic | شہری | core term |
| State | ریاست | core term (glossary.json carries a definition_ur) |
| Citizen | شہری | core term (glossary.json carries a definition_ur) |
| Democracy | جمہوریت | core term |
| Democratic | جمہوری | core term |
| Constitutional | آئینی | core term |
| Constitutional protection | آئینی تحفظ | concept label پاکستان میں آئینی تحفظات |
| Legal duty | قانونی فرض | concept label شہریوں کے قانونی فرائض |
| Civic responsibility | شہری ذمہ داری | concept label جمہوری شہری ذمہ داریاں |
| Reciprocal balance of rights and duties | حقوق اور فرائض کا باہمی توازن | concept label |
| Due process | مناسب قانونی طریقۂ کار | constitutional term |
| Reasonable restrictions | معقول پابندیاں | constitutional term |
| Equality before law | قانون کے سامنے مساوات | constitutional term |
| Freedom of speech | آزادیِ اظہار | Article 19 |
| Freedom of the press | پریس کی آزادی | Article 19 |
| Freedom of assembly | آزادیِ اجتماع | Article 16 |
| Freedom of association | آزادیِ انجمن | Article 17 |
| Freedom of movement | آزادیِ تنقل | Article 15 |
| Freedom of religion | مذہب کی آزادی | Article 20 |
| Right to information | حقِ معلومات | Article 19A |
| Right to education | تعلیم کا حق | Article 25A |
| Right to fair trial | منصفانہ مقدمے کا حق | Article 10A |
| Security of person | شخص کی حفاظت | Article 9 |
| Privacy of home | گھر کی رازداری | Article 14 |
| Inviolable | ناقابلِ شکن | constitutional adjective |
| Dignity | وقار | Article 14 |
| Torture | تشدد | Article 14 |
| Minority | اقلیت | Article 20/22 context |
| Religious denomination | مذہبی گروہ | Article 20 |
| Language, script, culture | زبان، رسم الخط، ثقافت | Article 28 |
| Affirmative provisions | فراخور تدابیر | Article 25(3) |
| Non-discrimination | عدم امتیاز | Articles 25-27 |
| Public places | عوامی مقامات | Article 26 |
| Government appointments | حکومتی تعیناتیاں | Article 27 |
| Judicial review | عدالتی نظرثانی | 1962 Constitution history |
| Superior courts | اعلی عدالتیں | Articles 199, 184(3) |
| High Court | ہائی کورٹ | Article 199 |
| Supreme Court | سپریم کورٹ | Article 184(3) |
| Writ petition | درخواست | glossary.json definition_ur uses it |
| Constituent assembly | آئین ساز اسمبلی | constitutional history |
| Martial law | مارشل لا | constitutional history |
| Republic | جمہوریہ | constitutional history |
| Parliamentary | پارلیمانی | constitutional history |
| Federal | وفاقی | constitutional history |
| Bicameral | دو ایوانی | 1973 Constitution |
| Unicameral | یک ایوانی | 1956 Constitution |
| National Assembly | قومی اسمبلی | constitutional history |
| Senate | سینیٹ | constitutional history |
| Basic Democrats | بنیادی جمہوری | 1962 Constitution |
| Government of India Act 1935 | ہندوستان کا حکومتی ایکٹ 1935 | statute name |
| Pakistan Provisional Constitution Order | پاکستان کا عارضی آئینی حکم | statute name |
| Slavery | غلامی | Article 11 |
| Forced labour | جبری مشقت | Article 11 |
| Bonded labour | بندھ مزدوری | Article 11 |
| Human trafficking | انسانی تجارت | Article 11 |
| Retrospective punishment | گزشتہ فعل کی سزا | Article 12 |
| Double jeopardy | دوہری سزا | Article 12 |
| Self-incrimination | خود الزام داری | Article 13 |
| Loyalty | وفاداری | Article 5(1) |
| Integrity | سالمیت | Article 5(1) |
| Defence | دفاع | Article 5(1) |
| Obedience | پابندی | Article 5(2); matches glossary.json |
| Inviolable obligation | ناقابلِ شکن فرض | Article 5(2) |
| Penalty | سزا | duties |
| Fine | جرمانہ | duties |
| Imprisonment | قید | duties |
| Tax | محصول | duties; matches Unit 2 usage |
| Tax evasion | محصول چوری | duties |
| Revenue | آمدنی | duties |
| Public services | عوامی خدمات | duties |
| Public goods | عوامی مصالح | duties |
| Law enforcement | قانون کے نفاذ | duties |
| Jury service | جیوری کی خدمت | duties |
| Witness service | گواہی کی خدمت | duties |
| Testimony | گواہی | duties |
| Corruption | بدعنوانی | civic responsibilities |
| Abuse of power | طاقت کا سوء استعمال | civic responsibilities |
| Ombudsman | محتسب | civic responsibilities |
| Town hall hearing | عوامی اجلاس | civic responsibilities |
| Vigilance | نگرانی | civic responsibilities |
| Grassroots | مقامی سطح | civic responsibilities |
| School Management Committee | اسکول مینجمنٹ کمیٹی | civic responsibilities; Unit 4 uses the same |
| Parent-teacher association | والدین و اساتذہ کا انجمن | civic responsibilities |
| Water user association | پانی کے صارفین کا انجمن | civic responsibilities |
| Neighbourhood dispute resolution committee | محلے کے تنازعات حل کرنے والی کمیٹی | civic responsibilities |
| Hate speech | نفرت انگیز خطاب | civic responsibilities |
| Sectarian discrimination | فرقہ وارانہ امتیاز | civic responsibilities |
| Vigilantism | خودسر کارروائی | civic responsibilities |
| Defamation | بہتان | civic responsibilities |
| Slander | بہتان | civic responsibilities |
| Social contract | سماجی معاہدہ | RRQ 10 |
| Tyranny | ظلم و جبر | RRQ 10 |
| Disorder | بے نظمی | RRQ 10 |
| Anarchy | بے حکومتی | RRQ 10 |
| Apathy | لا پروائی | topic 3.2 |
| Tolerance | رواداری | topic 3.2 |
| Civic engagement | شہری شمولیت | topic 3.2 |
| Community solidarity | برادری کی یکجہتی | topic 3.2 |
| Vote-buying | ووٹ خرید | topic 3.2 |
| Informed vote | باخبر ووٹ | topic 3.2 |
| Municipality | بلدیہ | topic 3.2 |
| Municipal | بلدیاتی / میونسپل | topic 3.2; both surface forms used |
| Canal embankment | نہر کا بند | activity card D |
| Irrigation department | آبپاشی محکمہ | activity card D |
| Executive engineer | ایگزیکٹو انجینئر | activity card D |
| Budget records | بجٹ ریکارڈ | activity card D |
| Textile mill | ٹیکسٹائل مل | scenario 2 |
| Industrialist | صنعت کار | scenario 2 |
| Corporate earnings | کارپوریٹ آمدنی | scenario 2 |
| Private wealth | نجی جائیداد | scenario 2 |
| Unverified | غیر تصدیق شدہ | scenario 3 |
| Accusation | الزام | scenario 3 |
| Stampede | ہڑپل | teacher notes |
| Dignitary | معزز شخص | activity card A |
| Municipal authority | بلدیاتی ادارہ | activity card A |
| Birth certificate | پیدائشی سرٹیفکیٹ | opening scenario |
| Civic education | شہری تعلیم | prose; glossary.json entry, not banked |

## Figures

- `fig-U3-1.ur.svg` mirrors the table so the `دفعہ` (article) column sits rightmost and the reading order runs right to left; every cell is end-anchored. The long Article 9 meaning line was re-wrapped as `کوئی شخص قانون کے بغیر جان / یا آزادی سے محروم نہ ہو گا` to keep inside the 240px column.
- `fig-U3-2.ur.svg` mirrors the timeline: the axis moves to x=672 with the arrow at the bottom, the five milestone panels run right to left (1956 rightmost, "Today" leftmost), and every label is end-anchored at the panel's right edge.
- `fig-U3-3.ur.svg` mirrors the concept map: loyalty and obedience swap corners, tax payment and democratic participation swap corners, and the four arrows flip their x positions. The central node keeps `text-anchor="middle"` at x=390.
- `fig-U3-4.ur.svg` mirrors the two-panel diagram so the `بنیادی حقوق` panel is on the right and the `شہری ذمہ داریاں` panel on the left, with both arrows reversed around the central `مساوی توازن` box.
- No `direction="rtl"` was added to any `<text>` (the v4.1 trap); the wordmark keeps `direction="ltr"` and moves to the bottom-left, matching the accepted GCCE-400 Unit 2 and Unit 4 Urdu figures.
- All four `.ur.svg` were measured with `scripts/heavy.sh node scripts/measure-figure-text.mjs` (exit 0, zero clipping, zero collisions, zero wordmark collisions) and again with `--ci-fonts` to match the CI fallback face. `check:svg-style` is clean for the four new files. `npm run figures:variants:check` reports 1547 figures OK.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check all pass. The only reported findings are the two expected incomplete G4 and G5 tracker rows for Unit 3 (`translations/unit-03/check-content-parity.txt`). Both files were then restored byte-for-byte to `draft` (verified by `diff` against a backup).
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 5 files, matching component counts (4 Figure، 2 Glossary، 3 PrintHandout، 1 TranslationStatusBadge)، matching table row counts، 45 numbered items in the assessment (10 MCQ، 10 RRQ، 5 ERQ، 10 key entries، 10 model answers)، and all four Urdu MCQ blocks use الف ب ج د in the same order as the English A B C D.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids `npm run build`, a dev server and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping، 360px and A4 print، RTL table reading order in `fig-U3-1`) is therefore unverified here and is a G5 task.
- No English unit file, figure manifest, source list, coverage file or concept file was edited. The new `translations/unit-03/` folder sits inside Unit 3's bound input manifest, so its G2 evidence was refreshed with `node scripts/prepare-gate-evidence.mjs gcce-400 3` (new evidence `reviews/unit-03/G2/20261122T190242489Z-gates.json`, all eight draft gates PASS) and the G2 tracker row was repointed at it. The older evidence dir remains on disk, matching the Unit 4 precedent.

## Open points for G3، G5 and the owner

1. The G3 en-review of the English Unit 3 is still open (constitutional currency of Articles 8-28 and Article 5). This translation follows the English text as-is; any G3 correction to the English must be mirrored here before G5.
2. The five authored concept labels in `concepts/unit-03.md` and the proposed terms table above need independent checking; none is banked.
3. The Urdu render at 360px and A4 print, and the RTL reading order of the `fig-U3-1` table and the `fig-U3-2` timeline, are unverified here.
4. `fig-U3-1`'s Article 9 meaning cell is the tightest fit in the set; a G5 render check should confirm it does not clip at the A4 page width.
5. The English assessment's ERQ 4 asks for a "School Civic Engagement Plan"; the Urdu renders it as `برادری کی شہری مشغولیت کا منصوبہ` (community civic engagement plan). G5 should confirm the scope (school plus community) survived.
