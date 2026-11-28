# EFPC-411 Unit 2 - G5 Urdu review findings

Reviewer: `agent:claude_crew` (Claude Code crew session `f67d0bac-a925-413a-a498-d981462563b0`).
Disposition: **revise**. Date: 2026-11-28. Skill: `review-unit` v1.1.0, G5 rubric v1.0.0.

Inputs: `docs/semester-4/efpc-411/unit-02/` and its Urdu mirror
`i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-02/`, the eight
`.ur.svg` figures and their `.ur.dark.svg` twins under `static/img/figures/efpc-411/unit-02/`,
`specs/content/efpc-411/{content-spec,coverage/unit-02,sources/unit-02,concepts/unit-02,figures/unit-02}.md`,
`specs/content/terminology.csv`, `specs/content/style-guide.md`.

English dependency: the accepted human G3 record
`specs/content/efpc-411/reviews/unit-02/G3/20261127T192751Z-g3-desk-74a8990f.json` (CMY, pass)
and the fresh agent G3 report
`specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb.json` (pass)
both carry an `input_manifest` that matches the current English inputs exactly (verified with
`inputManifest('.', 'EFPC-411', 2, 'G3')`). No `.sig` file exists for either, so the signed
automated dependency is unavailable (P1).

## Blocking findings

### F1 - "period" rendered as "hour" (گھنٹہ / گھنٹے) in prose, assessment and figures

The English word "period" (a timetabled class period, about 40 minutes) is translated as
"گھنٹہ" / "گھنٹے" (hour / hours) in at least eight places, while the same unit correctly uses
"پیریڈ" elsewhere. This changes a quantity/unit and makes the unit internally inconsistent.

| English locator | English | Urdu locator | Urdu |
|---|---|---|---|
| `docs/.../unit-02/topic-01.mdx:28` | "the teacher reads and explains from the front for the whole period" | `i18n/.../unit-02/topic-01.mdx:28` | "استاد پورے گھنٹے سامنے کھڑے ہو کر سبق پڑھاتی اور سمجھاتی رہتی ہے" |
| `docs/.../unit-02/topic-01.mdx:60` | "the printed timetable gives forty minutes to each of six periods" | `i18n/.../unit-02/topic-01.mdx:60` | "چھ گھنٹوں میں سے ہر پیریڈ کے لیے چالیس منٹ مختص ہیں" ("out of six hours") |
| `docs/.../unit-02/topic-01.mdx:83` | "the teacher explains from the front for the whole period" | `i18n/.../unit-02/topic-01.mdx:83` | "استاد پورے گھنٹے سامنے کھڑا ہو کر سمجھاتا ہے" |
| `docs/.../unit-02/topic-01.mdx:112` | "draw a classroom seating map with interaction codes for one period" | `i18n/.../unit-02/topic-01.mdx:112` | "ایک گھنٹے کے لیے" ("for one hour") |
| `docs/.../unit-02/unit-assessment.mdx:47` (MCQ 3) | "tallies 20 teacher-to-pupil moves in a period" | `i18n/.../unit-02/unit-assessment.mdx:47` | "ایک گھنٹے میں" ("in one hour") |
| `static/img/figures/efpc-411/unit-02/fig-U2-1.ur.svg` | "Arrows show who speaks to whom in the period." | same Urdu SVG | "تیر ظاہر کرتے ہیں کہ گھنٹے کے دوران کون کس سے بات کرتا ہے۔" |
| `static/img/figures/efpc-411/unit-02/fig-U2-2.ur.svg` | "Assembly, period lengths, break, attendance" / "Timetable shows 6 periods of 40 minutes." | same Urdu SVG | "اسمبلی، گھنٹوں کا دورانیہ، وقفہ، حاضری" / "ٹائم ٹیبل میں 40 منٹ کے 6 گھنٹے درج ہیں۔" |

Correct counterexamples inside the same unit: `topic-01.mdx:58` "ہر پیریڈ درحقیقت کتنی دیر چلتا ہے",
`topic-01.mdx:60` record line "40 منٹ کے 6 پیریڈز", `topic-01.mdx:108` "ایک ہی پیریڈ میں",
`unit-assessment.mdx:130` (ERQ 1) "چالیس منٹ کے چھ پیریڈز". The assessment item ERQ 1 renders the
same "six periods of 40 minutes" correctly, so MCQ 3 and the worked example are the outliers.

Repair: replace "گھنٹہ / گھنٹے" with "پیریڈ" in the eight locations above (and re-run
`measure-figure-text.mjs` on the two edited SVGs).

### F2 - "marked a short quiz on the board" rendered as "had a quiz solved"

`docs/.../unit-02/topic-03.mdx:28`: "the teacher asked twenty-six questions, **marked** a short
quiz on the board and set a homework task." Urdu `topic-03.mdx:28`: "استاد نے چھبیس سوالات پوچھے،
**تختے پر ایک مختصر کوئز حل کروایا** اور ہوم ورک دیا۔" ("had a short quiz solved on the board").
This changes the teacher's assessment action from marking work to solving a quiz, which is the
exact confusion the paragraph is about. Repair: "تختے پر ایک مختصر کوئز کی جانچ کی" or
"نمبر دہی کی".

### F3 - "managing complexity in the classroom" rendered as "basic responsibilities of classroom management"

`docs/.../unit-02/topic-01.mdx:56`: "The HEC guide on general methods of teaching lists
establishing rules and routines as one of the first tasks of **managing complexity in the
classroom** (HEC, 2013)." Urdu `topic-01.mdx:56`: "تدریس کے عمومی طریقوں پر ایچ ای سی کی گائیڈ
قواعد اور معمولات قائم کرنے کو **کلاس روم کے انتظامی عمل کی بنیادی ذمہ داریوں** میں شمار کرتی ہے."
The bound source (`Scheme-and-Course-guides/extracted-text/course-guides-2025/MethodsTeaching_Sept13.txt:1292`)
has "Week 4: Managing complexity" with the sub-topic "Establish rules and routines", so the
English claim is supported and the Urdu drops the specific "managing complexity" framing.
Repair: "کلاس روم میں پیچیدگی کے انتظام کی بنیادی ذمہ داریوں میں".

### F4 - "the exclusion" rendered as "تفریق" (distinction) in the Topic 2.4 mini-rubric

`docs/.../unit-02/topic-04.mdx:115` (Exceeds Standard): "Explains how the effective features
and **the exclusion** interact, and justifies which change would matter most." Urdu
`topic-04.mdx:115`: "وضاحت کرتا ہے کہ مؤثر پہلو اور **تفریق** کس طرح باہم اثر انداز ہوتے ہیں".
"تفریق" means distinction/difference, not exclusion. Repair: "عدم شمولیت" or "اخراج".

### F5 - Teach Primary "stated, acknowledged and redirected" reduced to "clarifies"

`docs/.../unit-02/topic-01.mdx:66`: "positive behavioural expectations that are **stated,
acknowledged and redirected** (Molina et al., 2021)." Urdu `topic-01.mdx:66`: "مثبت رویے کی
توقعات کو **واضح کرے**" ("clarifies positive behaviour expectations"). Two of the three named
practices are dropped. The full three-part list is present in `topic-03.mdx:40`, so the unit is
inconsistent. Repair: "مثبت رویے کی توقعات کو واضح کرے، اچھے رویے کی توثیق کرے اور ناپسندیدہ
رویے کو متوقع رویے کی طرف موڑے".

## Advisory findings

- **F6** `i18n/.../unit-02/index.mdx:115`: "keep every note confidential" -> "ہر نوٹ کو **صیغہ راز**
  میں رکھیں". "صیغہ راز" is not the unit's own term; `topic-04.mdx:43` uses "راز داری" for
  confidentiality. Use "رازداری" / "خفی".
- **F7** Feedback conversation: `topic-02.mdx:98` "تعمیری نشست" ("constructive session") and
  `topic-03.mdx:97` "تاثرات کی نشست" ("feedback session") for the same English "feedback
  conversation". Use one term, e.g. "تاثرات کی گفتگو".
- **F8** `topic-01.mdx:46`: "still teach very little" -> "وہاں **برائے نام** تعلیم دی جا رہی ہو"
  ("education in name only"). The epistemic force is stronger than the English quantity.
- **F9** `topic-01.mdx:48`: "A reader can act on it" -> "قاری اس پر **ٹھوس رائے قائم** کر سکتا ہے"
  ("form a firm opinion"). Minor shift from action to opinion.
- **F10** `topic-01.mdx:76`: "groups can support a discussion that never happens" -> "دائرے یا گروہ
  ایسی باتوں کے لیے جن کا کوئی نتیجہ نہ نکلے". The irony of the English is flattened.
- **F11** Concept-graph Urdu labels drift from the prose: `concepts/unit-02.md` CON-2 "روزانہ کا
  پروگرام" vs prose "روزانہ کا نظام الاوقات"; CON-5 "شاملیت" vs prose "شرکت"; CON-6 "وقت کا
  بندوبست" vs prose "وقت کا انتظام"; CON-9 "شمولیتی طریقہ کار" vs prose "شمولیتی طریقہ تدریس".
- **F12** `fig-U2-6.ur.svg`: "marked and returned" -> "جانچ اور واپسی"; `topic-03.mdx:61` "marked"
  -> "جانچ". "Marked" is better as "نمبر دہی" / "چیک".
- **F13** Inherited, not a translation defect: the MCQ key distribution is A:0, B:7, C:3, D:0 in
  both English and Urdu. The G3 human and agent reports both carry this as an unresolved
  advisory. The Urdu preserves the English balance and the answer keys correspond item for item.

## Uncertain findings

- **P1** No signed G3 report exists for Unit 2. The tracker row is the human desk record
  `20261127T192751Z-g3-desk-74a8990f.json` (reviewer `CMY`, pass, no model/run ids, no
  `skill_digest`), which is outside the report schema; the fresh agent G3 report is unsigned.
  Automatic G5 dependency binding therefore cannot be verified. The English inputs are unchanged
  since both G3 records (manifests match current `G3` inputs).
- **P2** The translator's run identity (agy conversation id) was not supplied; the Urdu mirror is
  bound by commit `6f359eefd` ("translate Unit 2 into Urdu draft mirror with localised figures").
  Independence holds: the translator was `agy` (Gemini), this review is Claude.

## Command results

| Command | Exit | Log |
|---|---|---|
| `npm run validate:content` | 0 | `validate_content.log` |
| `npm run check:depth-gate` | 0 | `check_depth-gate.log` |
| `npm run check:figures` | 0 | `check_figures.log` |
| `npm run check:no-em-dash` | 0 | `check_no-em-dash.log` |
| `npm run check:no-answer-keys` | 0 | `check_no-answer-keys.log` |
| `npm run check:docs-sync` | 0 | `check_docs-sync.log` |
| `npm run check:content` | 0 (14/14 gates) | `check-content.log` |
| `scripts/heavy.sh node scripts/render-inspect.mjs EFPC-411 2 --locale ur --base https://textbook.com.pk --no-pdf` | 1 | `render-review.log` |
| `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpc-411/unit-02/*.ur.svg` | 0 | `measure-figure-text.log` |

### Render inspection (deployed SHA `e29224ece005924eae6038b8fe42c236d1c66fd4`)

`git diff --quiet e29224ece HEAD -- <EN dir> <UR dir> static/img/figures/efpc-411/unit-02/` is empty,
so the production build is the reviewed input. Six pages rendered at 1280x900, 360x780 and A4
794px print. Results: `docHorizontalOverflow=0` on every page; the Topic 2.1 and 2.3 mini-rubric
tables scroll inside a `tabindex=0` container with an Urdu `aria-label`; no element is clipped in
A4 print and every figure fits; the Urdu answers and marking headings render in the assessment.
Nastaliq shaping, bidi punctuation and RTL table order are correct in the captured PNGs.

`render-inspect.mjs` exits 1 with 16 "text overlaps the wordmark" defects, one per `.ur.svg` and
its dark twin. These are **false positives**: the script's wordmark test is one-sided
(`rec.r > wmB.x - 2 && vertical overlap`) and does not test the other horizontal edge. In the
mirrored Urdu figures the wordmark sits bottom-left (`x=12`) and the caption bottom-right
(right edge 756), so they do not intersect. `measure-figure-text.mjs`, whose test is the full
rectangle intersection (`a.x2 > wm.x1 && a.x1 < wm.x2 && ...`), exits 0 on all eight `.ur.svg`
and reports "widest text ends at 756, wordmark at 12". The cropped render
`renders/crop-fig-U2-1b.png` shows the caption and wordmark clearly separated. Treated as a tool
limitation, not a content defect.

### Assessment equivalence

All 10 MCQ keys correspond (EN B B C C B B B C B B; UR ب ب ج ج ب ب ب ج ب ب). Option letters are
transliterated A->الف, B->ب, C->ج, D->د with unchanged ordering. The 10 RRQ mark splits and the
five ERQ analytic rubrics match item for item. The only assessment-text defect is F1 in the MCQ 3
stem. See `assessment-solutions.md` for the independent re-solve.
