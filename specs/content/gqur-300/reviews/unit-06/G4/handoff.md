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

## Next owner and status

`translation_status` remains `draft` in all files. G4 tracker row in `tasks.md` is updated to in-progress (`▣`) with this handoff reference; no G4 completion or review certification is claimed per `translate-unit` Step 7 and repository governance rules.
A fresh, independent G5 review session is needed to evaluate the Urdu translation against the English baseline.
