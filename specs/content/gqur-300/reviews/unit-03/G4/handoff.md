# GQUR-300 Unit 3 Urdu translation handoff

- Translator: Antigravity (agy). This is a translation record, not independent review or certification.
- English baseline: `86531818bd4b68154f3c9fd57457c8b8f9586b17`. No English content changed.
- Refreshed and completed the existing six-file mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/` resolved by `resolveUnit('.', 'GQUR-300', 3)`.
- Preserved all metadata identifiers, reading minutes, heading levels and order, component calls, glossary keys, numerical quantities, assessment item count and marks.
- Translated all Bloom tags to Urdu across all topic files and assessment: `*(یاد رکھنا)*` (Remember), `*(سمجھنا)*` (Understand), `*(اطلاق)*` (Apply), `*(تجزیہ)*` (Analyze), `*(تشخیص)*` (Evaluate).
- Transliterated MCQ options to Urdu letters (`الف)`, `ب)`, `ج)`, `د)`) matching option order. Synced answer key to Urdu letters (`**الف**`, `**ب**`) matching the English keys.
- Standardized ERQ criteria tags to `**تجزیہ**:`.
- In `unit-teacher-notes.mdx`: localized `brainstorming` to `دماغی طوفان (برین اسٹارمنگ)`.
- Verified all 6 figures (12 variants: `.ur.svg` and `.ur.dark.svg`), with exact `<desc>` to `<Figure alt>` correspondence.

## Terminology for the owner

The frozen terminology bank (`specs/content/terminology.csv`) has no entries for the core algebra terms used in this unit. Their existing Urdu forms remain proposals awaiting owner decision.

| Proposed English term | Urdu form used | Context |
|---|---|---|
| Algebraic expression | الجبرائی اثر | Core glossary / key_terms |
| Balance model | ترازو ماڈل | Core glossary / key_terms |
| Coefficient | عددِ ضرب | Core glossary / key_terms |
| Linear equation | لکیری مساوات | Core glossary / key_terms |
| Linear inequality | لکیری نابرابری | Core glossary / key_terms |
| Pattern | نمونہ | Core glossary / key_terms |
| Sequence | تسلسل | Core glossary / key_terms |
| Variable | متغیر | Core glossary / key_terms |

Additionally, the thirteen concept graph labels in `specs/content/gqur-300/concepts/unit-03.md` remain authored proposals carrying G5 flags:
- Patterns as growing rules / نمونے بطور بڑھتے ہوئے قاعدے
- Sequences as the pattern's outputs / تسلسل بطور نمونے کے نتیجے
- Growth type points to the rule's shape / بڑھوٹر کی قسم قاعدے کی شکل بتاتی ہے
- Variable as a named, changing quantity / متغیر بطور نامزد اور بدلتی ہوئی مقدار
- Expression as a machine, not a riddle / اثر بطور مشین، پہیلی نہیں
- Algebra vocabulary: coefficient, term, equation / الجبرا کی اصطلاحات: عددِ ضرب، رکن، مساوات
- Equation as balance / مساوات بطور ترازو
- The solve-and-check method / حل اور جانچ کا طریقہ
- The equals sign means balance, not "answer next" / برابر کا نشان ترازو کا مطلب رکھتا ہے
- Inequality as a range / نابرابری بطور حد
- The sign flip on negative multiplication / منفی سے ضرب دینے پر علامت کا پلٹنا
- The translate-solve-interpret-decide loop / ترجمہ، حل، تشریح، فیصلہ کا چکر
- Comparing two expressions settles a family of questions / دو اثروں کا موازنہ پورے خاندان کے سوالات حل کرتا ہے

The index `key_terms` declares the eight core terms listed above, which remain unbanked proposals for the curriculum owner.

## Checks and limits

- `npm run check:content`: all 13 content gates pass cleanly.
- `npm run figures:variants:check`: all 810 figure variants check clean.
- `check:no-em-dash`: zero em dashes across all files.
- `check:no-answer-keys`: zero answer key leaks found; bounded answers section is compliant.
- `validate:content`: front matter, heading vectors, glossary references, and file-set parity pass cleanly.
- Component parity confirmed across all 6 files: Figure (6), Glossary (0), PrintHandout (2), BloomTag (0), ObjectiveList (0), ActivityCard (0), TranslationStatusBadge (1).
- `translation_status` remains `draft` everywhere because no independent G5 review has taken place.
- No Docusaurus build or dev server was run, strictly obeying the crew brief.

## Next owner and status

`translation_status` remains `draft` in all files. G4 tracker row in `tasks.md` is updated to in-progress (`▣`) with this handoff reference; no G4 completion or review certification is claimed per `translate-unit` Step 7 and repository governance rules.
A fresh, independent G5 review session is needed to evaluate the Urdu translation against the English baseline.
