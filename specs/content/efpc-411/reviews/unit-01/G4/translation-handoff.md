# EFPC-411 Unit 1 - Translator handoff

Translation delivery only, by `claude_crew`. This is not an independent G5 report, not a
review certification, and not a claim that the Urdu is finished.

## Baseline and delivered files

- English baseline: `ff6248a98dc7ff2ac6f4c73539c82746b9bbc3df` (the last commit touching
  `docs/semester-4/efpc-411/unit-01/`). The checkout HEAD was `af68d60cc`, with no branch
  commits ahead of `origin/main` and a clean working tree before this job.
- Complete same-named Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`,
  `topic-03.mdx`, `topic-04.mdx`, `unit-assessment.mdx` under
  `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/`, resolved with
  `resolveUnit()`.
- The assessment retains 10 MCQs, 10 restricted responses and 5 extended responses, every
  model answer, every mark split and all five analytic rubrics. Option ordering is unchanged;
  option letters are transliterated (`A` to `الف`, `B` to `ب`, `C` to `ج`, `D` to `د`). The
  bounded answers heading is translated (`## جوابات اور نمبر دہی کی رہنمائی`), so the file
  carries no English answer-key prose and the whole-file scan finds nothing.
- Eight localised SVGs, `fig-U1-1.ur.svg` through `fig-U1-8.ur.svg`, with derived
  `.ur.dark.svg` twins. Layout and reading direction were mirrored with
  `scripts/mirror-figure-rtl.mjs`; the Nastaliq-first font stack is on each root. Figure IDs,
  teaching relationships and the English assets are unchanged. Every Urdu page `alt` and its
  SVG `<desc>` are the same string by construction (`check:figures` compares them).
- No `unit-teacher-notes.mdx` exists in the English baseline, so none was invented. The unit
  banner `fig-U1-9` in `specs/content/efpc-411/figures/unit-01.banner.md` stays `prompt-only`
  and belongs to the illustration job.

## Terminology working set and owner proposals

The frozen bank was read before translation and was **not** changed. The Urdu `index.mdx`
declares 28 `key_terms`, every one an accepted `term_en`/`term_ur` pair from
`specs/content/terminology.csv`; the temporary `reviewed` flip confirmed
`check:pipeline-gate` raises no terminology finding. Banked terms used in their banked form
include Assessment (تشخیص), Formative Assessment (تشکیلی تشخیص), Summative Assessment
(مجموعی جائزہ), Self-Assessment (خود جائزہ), Rubric (معیارِ جانچ), Curriculum (نصاب),
Lesson Plan (سبقی منصوبہ), Teaching Strategy (حکمتِ تدریس), Learning Outcome
(نتیجہ ہائے تعلم), Classroom Management (جماعتی انتظام), Active Learning (فعال تعلم),
Group Work (گروہی کام), Validity (صداقت), Reliability (اعتماديت), Anxiety (اضطراب),
Profession (پیشہ), Professional Ethics (پیشہ ورانہ اخلاقیات), Professional Standards
(پیشہ ورانہ معیارات), Multi-grade Classroom (کثیر درجاتی کلاس روم), Reflective Practice
(تاملی مشق) and Reflective Journal (تاملی جریدہ).

The following unit-level English terms are **not** in the bank. They are translated here and
recorded as proposals for the curriculum owner; none was silently banked.

| English term used in the unit | Urdu used | Note |
|---|---|---|
| Classroom observation | کلاس روم مشاہدہ | also مشاہداتی for the adjective |
| Observer | مشاہدہ کار | |
| Observation focus area | مشاہدے کے توجہ کے پہلو | |
| Observation checklist | مشاہدہ چیک لسٹ | چیک لسٹ is the corpus form |
| Rating scale | ریٹنگ اسکیل | |
| Anecdotal record | واقعاتی ریکارڈ | |
| Low-inference / high-inference | کم استنتاجی / زیادہ استنتاجی | |
| Observer bias | مشاہدہ کار کی جانبداری | |
| Constructive feedback | تعمیری تاثرات | |
| Pre-observation briefing | قبل از مشاہدہ بریفنگ | |
| Post-observation reflection | بعد از مشاہدہ تامل | |
| Observation cycle | مشاہداتی چکر | |
| Debriefing | دوبارہ بریفنگ | |
| Time stamping | وقت کا نشان | |
| Pupil time-on-task | طلبہ کا کام پر صرف ہونے والا وقت | |
| Off-task behaviour | اپنے کام سے باز رویہ | |
| Halo / horns effect | ہالہ اثر / سینگوں کا اثر | |
| Confirmation bias | تصدیقی جانبداری | |
| Leniency / severity bias | فیاضی / سختی کی جانبداری | |
| Cultural and contextual bias | ثقافتی اور سیاقی جانبداری | |
| Practicum placement | پریکٹیکم پلیسمنٹ | |
| Proforma | پروفارما | |
| Cooperating teacher | تعاون کرنے والا استاد | |
| School mentor | اسکول مینٹور | |
| University (practicum) supervisor | یونیورسٹی (پریکٹیکم) سپروائزر | |
| Teaching aids | تدریسی امدادات | |
| Field notebook | فیلڈ نوٹ بک | |
| Struggling learner | کمزور سیکھنے والا | |

The concept-graph Urdu labels (`Label UR` in `specs/content/efpc-411/concepts/unit-01.md`)
were consulted; they are authored labels that need independent G5 checking, as that file
itself records.

## Verification performed

- `npm run check:content` passes all 14 gates in the `draft` state.
- Reviewed-only test: both `index.mdx` files were temporarily flipped to `reviewed` and the
  derived content-status report regenerated. All gates passed except the two expected
  pipeline findings for this unit (the `G4 ur-translation` and `G5 ur-review` rows are not
  done). No terminology, structural-parity or figure-parity finding remained. Both indexes
  were then restored to `draft` and the derived report regenerated.
- `node scripts/measure-figure-text.mjs static/img/figures/efpc-411/unit-01/*.ur.svg` exits 0
  on all eight `.ur.svg` files, run under `scripts/heavy.sh`.
- `npm run figures:variants` wrote the eight `.ur.dark.svg` twins and
  `npm run figures:variants:check` is clean.
- `check:svg-style` passes with no new baseline entry: the Urdu files carry the published
  Nastaliq font stack, the 780 canvas width, only in-scale font sizes and stroke widths, and
  no undefined classes.
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
  `ff6248a9`; any English repair will require matching Urdu repairs and a fresh G5. The
  earlier advisory note that the unit is "ready for independent G3" is not an acceptance.
- The mandatory rendered inspection (`scripts/render-inspect.mjs EFPC-411 1 --locale ur`) was
  **not** run: the job brief prohibits a dev server and browser runs other than the explicitly
  sanctioned `measure-figure-text.mjs`. Nastaliq shaping at 360px, bidi punctuation at line
  ends, RTL table column order and A4-print clipping remain unverified and are the next
  authorised check. `measure-figure-text.mjs` is geometry only and says nothing about legibility.
- The unit banner `fig-U1-9` is still `prompt-only`; it is outside this job's delivery.
- Machine translation was not used. The Urdu is hand-authored and un-reviewed; a human
  quality pass is mandatory before `reviewed`.
