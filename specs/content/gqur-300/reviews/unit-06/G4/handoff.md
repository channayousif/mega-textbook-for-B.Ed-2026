# GQUR-300 Unit 6 Urdu translation handoff

- Translator: Antigravity (agy). This is a translation record, not independent review or certification.
- English baseline: `2976ef5eacaf3706f34614be73516323b50edd9a`, on branch `crew/gqur-300-u06-translate` starting at `243f461127c568e9f4248721880f489b9483c84e` (`origin/main`). No English content changed.
- Refreshed and completed the existing six-file mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/` resolved by `resolveUnit('.', 'GQUR-300', 6)`.
- Preserved all metadata identifiers, reading minutes, heading levels and order, component calls, glossary keys, numerical quantities, assessment item count and marks.
- Repaired literal phrasing, calques, and agreement in `index.mdx` ("جہاں اس کے طلبہ رہتے ہیں", "کے کھاتے", "سکیں گی", "گھریلو").
- Translated all Bloom tags to Urdu across all topic files and assessment: `*(یاد رکھنا)*` (Remember), `*(سمجھنا)*` (Understand), `*(اطلاق)*` (Apply), `*(تجزیہ)*` (Analyze), `*(قدر پیمائی)*` (Evaluate).
- Transliterated MCQ options to Urdu letters (`الف)`, `ب)`, `ج)`, `د)`) matching option order. Synced answer key to Urdu letters (`**ب**`, `**ج**`, `**الف**`) matching the English keys.
- Standardized bounded answers section heading to `## جوابات اور نمبر دہی کی رہنمائی`, RRQ model answer stems to `نمونہ جواب:`, and ERQ criteria tags to `**تجزیہ**:`.
- In `unit-teacher-notes.mdx`: localized `brainstorming` to `دماغی طوفان (برین اسٹارمنگ)` and aligned `کینٹن` to `کینٹین`.
- Verified all 6 figures (12 variants: `.ur.svg` and `.ur.dark.svg`), with exact `<desc>` to `<Figure alt>` correspondence.

## Terminology for the owner

The frozen terminology bank (`specs/content/terminology.csv`) has no entries for the core financial and media reasoning terms used in this unit. Their existing Urdu forms remain proposals awaiting owner decision.

| Proposed English term | Urdu form used | Context |
|---|---|---|
| Profit | منافع | Core glossary term |
| Loss | نقصان | Core glossary term |
| Interest | سود | Core glossary term |
| Simple interest | سودِ سادہ | Core glossary term |
| Budget | بجٹ | Core glossary term |

Additionally, the eleven concept graph labels in `specs/content/gqur-300/concepts/unit-06.md` remain authored proposals carrying G5 flags:
- Takings are not profit / آمدنی منافع نہیں ہوتی
- Profit and loss percent against costs / منافع اور نقصان کا فیصد لاگت کے حساب سے
- Simple interest: principal x rate x time / سودِ سادہ: اصل ضرب شرح ضرب مدت
- The budget's order: savings before spending / بجٹ کی ترتیب: بچت خرچ سے پہلے
- The four persuasion moves (axis, base, comparison, hidden rate) / چار قائل کرنے والے ہتھکنڈے
- Rebuilding the hidden rate from an instalment / قسط سے چھپی ہوئی شرح کو دوبارہ بنانا
- Correct arithmetic can still mislead / درست حساب بھی دھوکہ دے سکتا ہے
- The decision loop: question, evidence, options, trade-offs / فیصلے کا چکر: سوال، شواہد، اختیارات، مفاد و نقصان
- Rates on small bases wobble / چھوٹی بنیاد پر فیصد ڈگمگاتے ہیں
- Indicators answer one question and hide another / اشاریے ایک سوال کا جواب دیتے، دوسرا چھپاتے ہیں
- Data informs the decision, never replaces the decider / معطیات فیصلے کو آگاہ کرتے ہیں، فیصلہ کرنے والے کی جگہ کبھی نہیں لیتے

The index `key_terms` declares the five core terms (Budget, Interest, Loss, Profit, Simple interest), which are recorded above as unbanked proposals for the curriculum owner.

## Checks and limits

- `npm run check:content`: all 13 content gates pass cleanly.
- `npm run figures:variants:check`: all 772 figure variants check clean.
- `check:no-em-dash`: zero em dashes across all files.
- `check:no-answer-keys`: zero answer key leaks found; bounded answers section is compliant.
- `validate:content`: front matter, heading vectors, glossary references, and file-set parity pass cleanly.
- Component parity confirmed across all 6 files: Figure (6), Glossary (5), PrintHandout (5), BloomTag (0), ObjectiveList (0), ActivityCard (0).
- `translation_status` remains `draft` everywhere because no independent G5 review has taken place.
- No Docusaurus build or dev server was run, strictly obeying the crew brief.

## Retry review and repairs (2026-10-18, opencode / agy)

A pass-by comparison against the English baseline found semantic and phrasing issues in the mirror and repaired them:

- `topic-01.mdx:47` - "مینہ" (not a valid Urdu word) replaced with "طوفان" for EN "rainstorm". A halving of fair customers by a storm is now legible.
- `topic-02.mdx:66` and `unit-assessment.mdx:168` - the calque "انجینئر کیا گیا" (literal for "engineered") replaced with "تیار کیا گیا" (constructed/devised) in both the prose and the RRQ-7 model answer, matching academic-plain register.
- `index.mdx:33,51` - "اثر" (calque error for "expressions") replaced with "الجبری اظہارات" (algebraic expressions from Unit 3).
- `index.mdx:65` - "ہر ایک اگلے پر سیدھا مبنی ہے" improved to "ہر موضوع پچھلے موضوع پر براہِ راست مبنی ہے" for clearer academic register.
- `topic-02.mdx:94` - "کیا چھوٹا ہے" (meaning error for "what was left out") corrected to "کیا چھوڑا گیا ہے".

All 13 content gates (`npm run check:content`) pass cleanly (13/13) after running `npm run build:content-status`. Component parity 6/6/5/0/0/0, MCQ item counts 50/50, MCQ answer keys and Bloom tag counts verified to match the English baseline commit `2976ef5e`. `check:no-em-dash` clean across all six UR files.

## Next owner and status

`translation_status` remains `draft` in all files. G4 tracker row in `tasks.md` remains in-progress (`▣`) with this handoff reference; no G4 completion or review certification is claimed per `translate-unit` Step 7 and repository governance rules.
A fresh, independent G5 review session is needed to evaluate the Urdu translation against the English baseline.
