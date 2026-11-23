# GCCE-400 Unit 5 Urdu translation handoff

- Translator: agent:claude (crew job `gcce-400-u05-translate`), 2026-11-22, branch `crew/gcce-400-u05-translate`.
- English baseline: `74703ca65` (the authoring commit) plus the later figure repair `2160fb24a` (fig-U5-5 `font-size` 13.5px to 14px). No English unit file, figure manifest, sources, coverage or concepts file was changed by this job, so the G2 evidence and the English bytes are untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Six `.ur.svg` figures (`fig-U5-1` to `fig-U5-6`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals its carrier alt text byte-for-byte.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 5.1 - ...`, `موضوع 5.2 - ...`, `موضوع 5.3 - ...`, matching the English numbering; headings follow identical level vectors in all six files.
- Core terms: public discourse عوامی مکالمہ, public opinion رائے عامہ, advocacy وکالت, lobbying لابی, protest احتجاج, social movement سماجی تحریک, civil society سول سوسائٹی, democratic governance جمہوری حکمرانی, digital divide ڈیجیٹل تقسیم, digital platform ڈیجیٹل پلیٹ فارم, mass media میس میڈیا, journalism صحافت, socialisation agent معاشرتی بندی کا کارجو, constituency حلقۂ ووٹ دہندگی (not used), coalition جماعت بندی, grassroots بڑے پیمانے پر / مقامی سطح پر, momentum رفتار, non-violent discipline غیر تشددية نظم, constitutional framing آئینی دارومدار, bureaucratisation انتظامی شکل, coalescence متحد ہونا, emergence ابتداؤ, decline زوال.
- Constitution articles use `دفعہ` (`دفعہ 16`، `دفعہ 17`، `دفعہ 19`، `دفعہ 25A`)، matching GCCE-400 Units 1 and 2. `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Names: Sadia سادیہ, Hina حنا, Zainab زبینہ, Tariq طارق, Master Ghulam ماسٹر غلام, Kamran کامران, Dr Razia ڈاکٹر راضیہ. Citations keep Latin author-year forms (Youniss and Levine, 2009؛ Batool, Mahmood and Ullah, 2019؛ OpenStax, 2021؛ Government of Pakistan, 2012).
- No `<Glossary>` components appear in the English unit, so none appear in the Urdu one. `<PrintHandout>` (4) and `<Figure>` (6) cross over 1:1.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ج، ب، ب، ب، الف، ب، ج، ب، ج, matching the English B, C, B, B, B, A, B, C, B, C.
- The mini-rubric heading reads `منی معیارِ جانچ` and the bounded answers section `## جوابات اور نمبر دہی کی رہنمائی`, kept as the file's final `##` section.

## Terminology

The frozen bank holds six terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص)، Summative Assessment (مجموعی جائزہ)، Rubric (معیارِ جانچ)، Self-Assessment (خود جائزہ)، Curriculum (نصاب)، Practical Activity (عملی سرگرمی). The bank and `glossary.json` were not changed. `Learning Outcome` (نتیجہ ہائے تعلم) occurs in the English heading "Unit learning outcomes" but is not declared, matching the Unit 1 and Unit 2 precedent.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Public discourse | عوامی مکالمہ | content-spec key term and concept label |
| Formation of public opinion | رائے عامہ کی تشکیل | concept label |
| Advocacy for social issues | سماجی مسائل کے لیے وکالت | concept label |
| Advocacy planning and strategies | وکالتی منصوبہ بندی اور حکمت عملیاں | concept label |
| Social action movements | سماجی تحریکیں | concept label |
| Stages of social movements | سماجی تحریکوں کے مراحل | concept label |
| Public opinion | رائے عامہ | core term; the concept label is رائے عامہ کی تشکیل |
| Advocacy | وکالت | core term; the concept label is سماجی مسائل کے لیے وکالت |
| Lobbying | لابی | core term |
| Protest | احتجاج | core term |
| Social movement | سماجی تحریک | core term |
| Civil society | سول سوسائٹی | core term (transliteration, matching Unit 2) |
| Democratic governance | جمہوری حکمرانی | core term |
| Digital divide | ڈیجیٹل تقسیم | core term |
| Digital platform | ڈیجیٹل پلیٹ فارم | core term |
| Mass media | میس میڈیا | core term |
| Journalism | صحافت | core term |
| Socialisation | معاشرتی بندی | banked as معاشرتی بندی under Socialization; surface uses the same word |
| Coalition | جماعت بندی | structural term |
| Grassroots | مقامی سطح پر | structural term |
| Momentum | رفتار | structural term |
| Non-violent discipline | غیر تشددية نظم | campaign term |
| Constitutional framing | آئینی دارومدار | campaign term |
| Bureaucratisation | انتظامی شکل | stage term |
| Coalescence | متحد ہونا | stage term |
| Emergence | ابتداؤ | stage term |
| Decline | زوال | stage term |
| Echo chamber | گونج والا خانہ | media term |
| Bot | بوٹ | media term |
| Algorithmic amplification | ایلگورڈمی وسعت | media term |
| Misinformation | غلط معلومات | media term |
| Misconception | عام غلط فہمی | pedagogy term |
| Worked example | حل شدہ مثال | pedagogy term |
| Time box | وقت کی حد | pedagogy term |
| School Management Committee | اسکول مینجمنٹ کمیٹی | institutional term |
| District Education Officer | ضلعی تعلیمی انڈرکرار | institutional term |
| Taluka Education Officer | تحصیلی تعلیمی انڈرکرار | institutional term |
| Union council | یونین کونسل | institutional term |
| Bar association | بار انجمن | institutional term |
| Bar council | بار کونسل | institutional term |
| Chief Justice | چیف جسٹس | judicial term |
| Rule of law | قانون کی حکمرانی | legal term |
| State of emergency | ایمرجنسی | constitutional term |
| Constitution | آئینِ پاکستان | constitutional term |
| Article | دفعہ | constitutional term |
| Fundamental right | بنیادی حق | constitutional term |
| Peaceful assembly | پُرامن اجتماع | constitutional term |
| Long March | لانگ مارچ | historical term |
| Lawyers' Movement | وکلاء کی تحریک | historical term |
| Ghost school | گھوسٹ اسکول | education term |
| Enrollment drive | داخلے کی مہم | education term |
| Community consultation | معاشرے کی مشورت | pedagogy term |

## Figures

- `fig-U5-1.ur.svg` keeps the five-step vertical order (unchanged by RTL); every label is end-anchored at its panel's right inset and the font stack is Nastaliq-first.
- `fig-U5-2.ur.svg` mirrors the table so the row-label column (ماخذ) is rightmost and the sequence runs right to left; all four columns re-laid with the published token block and the EN class set.
- `fig-U5-3.ur.svg` mirrors the six-step cycle: steps 1 to 3 run right to left across the top, steps 4 to 6 right to left across the bottom, arrows reversed, plus the loop-back into step 1.
- `fig-U5-4.ur.svg` mirrors the comparison table so the row-label column (طریقہ) is rightmost.
- `fig-U5-5.ur.svg` mirrors the four stage panels so stage 1 (ابتداؤ) is rightmost.
- `fig-U5-6.ur.svg` mirrors the timeline so the axis sits on the right and the five dated panels hang off it to the left.
- All twelve SVGs (6 source `.ur.svg` and 6 derived `.ur.dark.svg`) were checked with `scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions. `check:svg-style` and `figures:variants:check` are clean for the twelve new files.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: `validate:content` parity, `check:figures` Urdu parity, `check:svg-style` and the `key_terms` bank check all pass. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 5 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 6 files, matching component counts (6 Figure، 4 PrintHandout، 0 Glossary), matching file sets, and 35 numbered items in the assessment (10 MCQ، 10 RRQ، 5 ERQ، 10 key entries، 10 model answers).
- The MCQ option sequence is unchanged (الف، ب، ج، د in the same positions) and the Urdu key ب، ج، ب، ب، ب، الف، ب، ج، ب، ج matches the English B, C, B, B, B, A, B, C, B, C.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server، `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping، 360px and A4 print، table scroll) is therefore unverified here and is a G5 task.

## Open points for G3، G5 and the owner

1. The six authored concept labels in `concepts/unit-05.md` and the proposed terms table above.
2. The Urdu render at 360px and A4 print، and the RTL table reading order in `fig-U5-2` and `fig-U5-4`.
3. The Lawyers' Movement timeline against Batool et al. (2019) and the constitutional articles against the current text, already flagged for G3 in `sources/unit-05.md`.
4. The unit banner `fig-U5-7` is still `prompt-only` for the illustrate job; it is out of this job's scope.
