# EFPC-411 Unit 3 - Translator handoff

Translation delivery only, by `agy2` (`crew`). This is not an independent G5 report, not a
review certification, and not a claim that the Urdu is finished.

## Baseline and delivered files

- English baseline: `472f8107f` (feat(efpc-411): author Unit 3 English draft, figures and governance artifacts).
- Complete same-named Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`,
  `topic-03.mdx`, `topic-04.mdx`, `unit-assessment.mdx` under
  `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-03/`, resolved with
  `resolveUnit()`.
- The assessment retains 10 MCQs, 10 restricted responses and 5 extended responses, every
  model answer, every mark split and all five analytic rubrics. Option ordering is unchanged;
  option letters are transliterated (`A` to `الف`, `B` to `ب`, `C` to `ج`, `D` to `د`). The
  bounded answers heading is translated (`## جوابات اور نمبر دہی کی رہنمائی`), so the file
  carries no English answer-key prose and the whole-file scan finds nothing.
- Eight localised SVGs, `fig-U3-1.ur.svg` through `fig-U3-8.ur.svg`, with derived
  `.ur.dark.svg` twins. Layout and reading direction are mirrored for RTL; the Nastaliq-first font stack is on each root. Figure IDs,
  teaching relationships and the English assets are unchanged. Every Urdu page `alt` and its
  SVG `<desc>` are the same string by construction (`check:figures` compares them).
- No `unit-teacher-notes.mdx` exists in the English baseline, so none was invented.

## Terminology working set and owner proposals

The frozen bank was read before translation and was **not** changed. The Urdu `index.mdx`
declares 42 `key_terms`, every one an accepted `term_en`/`term_ur` pair from
`specs/content/terminology.csv`; the temporary `reviewed` flip confirmed
`check:pipeline-gate` raises no terminology finding. Banked terms used in their banked form
include Assessment (تشخیص), Formative Assessment (تشکیلی تشخیص), Summative Assessment
(مجموعی جائزہ), Self-Assessment (خود جائزہ), Portfolio Assessment (پورٹ فولیو تشخیص),
Rubric (معیارِ جانچ), Curriculum (نصاب), Pedagogy (تدریسیات), Lesson Plan (سبقی منصوبہ),
Teaching Strategy (حکمتِ تدریس), Learning Outcome (نتیجہ ہائے تعلم), Student-Learning
Outcome (طالب علم کا نتیجہ ہائے تعلم), Classroom Management (جماعتی انتظام),
Active Learning (فعال تعلم), Group Work (گروہی کام), Critical Thinking (تنقیدی سوچ),
Validity (صداقت), Reliability (اعتماديت), Anxiety (اضطراب), Profession (پیشہ),
Professional Ethics (پیشہ ورانہ اخلاقیات), Professional Standards (پیشہ ورانہ معیارات),
Multi-grade Classroom (کثیر درجاتی کلاس روم), Reflective Thinking (تاملی سوچ),
Reflective Process (تاملی عمل), Reflective Practice (تاملی مشق), Reflective Journal
(تاملی جریدہ), Reflective Cycle (تاملی چکر), Descriptive Writing (بیانیہ تحریر),
Reflective Writing (تاملی تحریر), Learning (سیکھنا), Environment (ماحول), Attention
(توجہ), Attitude (رویہ), Motivation (محرک), Reinforcement (تقویت), Positive
Reinforcement (مثبت تقویت), Negative Reinforcement (منفی تقویت), Punishment (سزا),
Scaffolding (معاونتی تدریس), Formative Feedback (تشکیلی تاثرات) and Continuous
Professional Development (مسلسل پیشہ ورانہ ترقی).

The following unit-level English terms are **not** in the bank. They are translated here and
recorded as proposals for the curriculum owner; none was silently banked.

| English term used in the unit | Urdu used | Note |
|---|---|---|
| Observation portfolio | مشاہداتی پورٹ فولیو | also تدریسی پورٹ فولیو for teaching portfolio |
| School profile | اسکول پروفائل | contextual report of placement school |
| Lesson observation | سبقی مشاہدہ | also کلاس روم مشاہدہ |
| Proforma | پروفارما | observation proforma |
| Withitness | کلاس روم پر نظر / ہمہ وقتی احاطہ | proactive classroom awareness |
| Authoritative management | بااختیار جماعتی انتظام | structured and supportive |
| Authoritarian management | آمرانہ جماعتی انتظام | coercive / fear-based |
| Permissive management | غیر پابند جماعتی انتظام | laissez-faire / unstructured |
| Time on task | کام پر صرف ہونے والا وقت | pupil active learning time |
| Pacing | تدریسی رفتار | lesson pacing |
| Transition | سرگرمیوں کی منتقلی | activity transitions |
| Evaluative feedback | قدری تاثرات | grade or letter mark only |
| Descriptive feedback | وضاحتی تاثرات | actionable error correction |
| Pupil impact | طلبہ پر اثر | observational outcome |
| Realia | حقیقی اشیاء | concrete real objects |
| Action plan | عملی منصوبہ | SMART developmental plan |
| Attendance verification | حاضری کی تصدیق | placement completion sheet |
| Exit ticket / slip | ایگزٹ سلپ / ٹکٹ | closure assessment check |
| School Management Committee (SMC) | اسکول مینجمنٹ کمیٹی | community oversight body |
| Education Management Information System (EMIS) | ایجوکیشن مینجمنٹ انفارمیشن سسٹم | school registration code |
| Headteacher | ہیڈ ٹیچر | also ہیڈ مسٹریس |
| Mentor | مینٹور | school cooperating mentor |
| Viva voce | زبانی امتحان | university portfolio oral defense |

The concept-graph Urdu labels (`Label UR` in `specs/content/efpc-411/concepts/unit-03.md`)
were consulted; they are authored labels that need independent G5 checking, as that file
itself records.

## Verification performed

- `npm run check:content` passes all 14 gates in the `draft` state.
- Reviewed-only test: both `index.mdx` files were temporarily flipped to `reviewed` and the
  derived content-status report regenerated. All gates passed except the two expected
  pipeline findings for this unit (the `G4 ur-translation` and `G5 ur-review` rows are not
  done). No terminology, structural-parity or figure-parity finding remained. Both indexes
  were then restored to `draft` and the derived report regenerated.
- `node scripts/measure-figure-text.mjs static/img/figures/efpc-411/unit-03/*.ur.svg` exits 0
  on all eight `.ur.svg` files, run under `scripts/heavy.sh`.
- `npm run figures:variants` wrote the eight `.ur.dark.svg` twins and
  `npm run figures:variants:check` is clean.
- `check:svg-style` passes with no new baseline entry: the Urdu files carry the published
  Nastaliq font stack, the 780 canvas width, only in-scale font sizes and stroke widths, and
  no undefined classes.
- Structural self-check: file set, heading-level vectors, imports, component counts
  (`Figure` 8, `PrintHandout` 5, `TranslationStatusBadge` 1, no `Glossary`), figure-ID sets,
  MCQ/RRQ/ERQ counts and the alt/desc pairs all match between English and Urdu.
- Every Urdu MCQ was answered from the Urdu alone and checked against the translated key.
