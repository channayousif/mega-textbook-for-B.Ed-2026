# EFPC-411 Unit 2 - Translator handoff

Translation delivery only, by `agy`. This is not an independent G5 report, not a
review certification, and not a claim that the Urdu is finished.

## Baseline and delivered files

- English baseline: `e547d02cf4cffb8d8c8f99b707c908598a594bf0` (the commit touching
  `docs/semester-4/efpc-411/unit-02/`).
- Complete same-named Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`,
  `topic-03.mdx`, `topic-04.mdx`, `unit-assessment.mdx` under
  `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-02/`, resolved with
  `resolveUnit()`.
- The assessment retains 10 MCQs, 10 restricted responses and 5 extended responses, every
  model answer, every mark split and all five analytic rubrics. Option ordering is unchanged;
  option letters are transliterated (`A` to `الف`, `B` to `ب`, `C` to `ج`, `D` to `د`). The
  bounded answers heading is translated (`## جوابات اور نمبر دہی کی رہنمائی`), so the file
  carries no English answer-key prose and the whole-file scan finds nothing.
- Eight localised SVGs, `fig-U2-1.ur.svg` through `fig-U2-8.ur.svg`, with derived
  `.ur.dark.svg` twins. Layout and reading direction were mirrored for right-to-left reading;
  the Nastaliq-first font stack is on each root. Figure IDs, teaching relationships and
  the English assets are unchanged. Every Urdu page `alt` and its SVG `<desc>` are the same
  string by construction (`check:figures` compares them).
- No `unit-teacher-notes.mdx` exists in the English baseline, so none was invented. The unit
  banner `fig-U2-9` in `specs/content/efpc-411/figures/unit-02.banner.md` stays `prompt-only`
  and belongs to the illustration job.

## Terminology working set and owner proposals

The frozen bank was read before translation and was **not** changed. The Urdu `index.mdx`
declares 30 `key_terms`, every one an accepted `term_en`/`term_ur` pair from
`specs/content/terminology.csv`; the temporary `reviewed` flip confirmed
`check:pipeline-gate` raises no terminology finding. Banked terms used in their banked form
include Assessment (تشخیص), Formative Assessment (تشکیلی تشخیص), Summative Assessment
(مجموعی جائزہ), Self-Assessment (خود جائزہ), Classroom Management (جماعتی انتظام),
Classroom Assessment (جماعتی تشخیص), Inclusive Education (شمولیتی تعلیم), Environment
(ماحول), Lesson Plan (سبقی منصوبہ), Teaching Strategy (حکمتِ تدریس), Learning Outcome
(نتیجہ ہائے تعلم), Student-Learning Outcome (طالب علم کا نتیجہ ہائے تعلم), Profession
(پیشہ), Professionalism (پیشہ واریت), Professional Ethics (پیشہ ورانہ اخلاقیات),
Professional Standards (پیشہ ورانہ معیارات), Individual Differences (انفرادی اختلافات),
Active Learning (فعال تعلم), Group Work (گروہی کام), Multi-grade Classroom
(کثیر درجاتی کلاس روم), Reflective Practice (تاملی مشق), Rubric (معیارِ جانچ),
Formative Feedback (تشکیلی تاثرات), Learning (سیکھنا), Development (نشوونما),
Attitude (رویہ), Attention (توجہ), Perception (ادراک), Punishment (سزا) and
Positive Reinforcement (مثبت تقویت).

The following unit-level English terms are **not** in the bank. They are translated here and
recorded as proposals for the curriculum owner; none was silently banked.

| English term used in the unit | Urdu used | Note |
|---|---|---|
| School environment | اسکول کا ماحول | |
| School placement | اسکول پلیسمنٹ | |
| Observation task | مشاہداتی کام | |
| Low-inference observation | کم استنتاجی مشاہدہ | |
| High-inference observation | زیادہ استنتاجی مشاہدہ | |
| Daily schedule | روزانہ کا نظام الاوقات | |
| Timetable | ٹائم ٹیبل | |
| Seating map / Seating arrangement | بٹھک کا نقشہ / بٹھک کا انتظام | |
| Classroom climate | کلاس روم کا تعلیمی ماحول | |
| Teacher-to-pupil interaction (T-P) | استاد سے شاگرد تعامل | |
| Pupil-to-pupil interaction (P-P) | شاگرد سے شاگرد تعامل | |
| Pupil-to-teacher interaction (P-T) | شاگرد سے استاد تعامل | |
| Interaction code | تعاملی کوڈ | |
| Structured proforma | منظم پروفارما | |
| Teaching aids | تدریسی معاونات | |
| Concrete objects | ٹھوس اشیاء | |
| Slate paper | سلیٹ پیپر | |
| Wait time | وقفہ تامل | |
| Open-ended question | آزادانہ / کھلا سوال | |
| Closed question | بند سوال | |
| Time on task | کام پر صرف ہونے والا وقت | |
| Off task | کام سے لاتعلق | |
| Discipline technique | نظم و ضبط کی تکنیک | |
| Positive behavioural expectation | مثبت طرزِ عمل کی توقع | |
| Redirect misbehaviour | نامناسب رویے کی اصلاح / رخ موڑنا | |
| Snapshot scan | جھلک جائزہ | |
| Oral questions | زبانی سوالات / شفاہی سوالات | |
| Short quizzes | مختصر کوئزز | |
| Homework check | ہوم ورک کی جانچ | |
| Written test | تحریری امتحان | |
| Professional conduct | پیشہ ورانہ رویہ | |
| Collegiality | رفاقت / ہم کاری | |
| Confidentiality | راز داری | |
| Inclusive practice | شمولیتی طریقہ تدریس | |
| Cooperating teacher | نگران استاد | |
| School mentor | اسکول مینٹور | |
| Whole lesson | مکمل سبق | |
| Lesson stages | سبق کے مراحل | |
| Opening | آغاز | |
| Presentation | پیشکش | |
| Practice | مشق | |
| Check | جانچ | |
| Closure | اختتام | |
| Exit ticket | ایگزٹ ٹکٹ | |
| Timeline | ٹائم لائن | |

The concept-graph Urdu labels (`Label UR` in `specs/content/efpc-411/concepts/unit-02.md`)
were consulted; they are authored labels that need independent G5 checking, as that file
itself records.

## Verification performed

- `npm run check:content` passes all 14 gates in the `draft` state.
- Reviewed-only test: both `index.mdx` files were temporarily flipped to `reviewed` and the
  derived content-status report regenerated. All gates passed except the two expected
  pipeline findings for this unit (the `G4 ur-translation` and `G5 ur-review` rows are not
  done). No terminology, structural-parity or figure-parity finding remained. Both indexes
  were then restored to `draft` and the derived report regenerated.
- `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpc-411/unit-02/*.ur.svg`
  exits 0 on all eight `.ur.svg` files.
- `npm run figures:variants` wrote the eight `.ur.dark.svg` twins and
  `npm run figures:variants:check` is clean.
- `node scripts/check-svg-style.mjs` passes with no new baseline entry: the Urdu files carry the
  published Nastaliq font stack, the 780 canvas width, only in-scale font sizes and stroke widths,
  and no undefined classes.
- Structural self-check: file set, heading-level vectors, imports, component counts
  (`Figure` 8, `PrintHandout` 5, `TranslationStatusBadge` 1, no `Glossary`), figure-ID sets,
  MCQ/RRQ/ERQ counts and the alt/desc pairs all match between English and Urdu.
- Every Urdu MCQ was answered from the Urdu alone and checked against the translated key
  (10/10 agree); the mark splits and rubric bands were compared item by item.

## Remaining dependencies and risks

- `translation_status` is still `draft` on all six Urdu pages and on the English `index.mdx`.
  Only an accepted G5 may set it to `reviewed`.
- **English G3 is not accepted.** The tracker's `G3 en-review` row is still `▢` (awaiting an
  independent qualified review). This translation is bound to the English at
  `e547d02c`; any English repair will require matching Urdu repairs and a fresh G5.
- The mandatory rendered inspection (`scripts/render-inspect.mjs EFPC-411 2 --locale ur`) was
  **not** run: the job brief prohibits a dev server and browser runs other than the explicitly
  sanctioned `measure-figure-text.mjs`. Nastaliq shaping at 360px, bidi punctuation at line
  ends, RTL table column order and A4-print clipping remain unverified and are the next
  authorised check. `measure-figure-text.mjs` is geometry only and says nothing about legibility.
- The unit banner `fig-U2-9` is still `prompt-only`; it is outside this job's delivery.
- Machine translation was not used. The Urdu is hand-authored and un-reviewed; a human
  quality pass is mandatory before `reviewed`.
