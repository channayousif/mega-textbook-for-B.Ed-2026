# EFPG-401 Unit 5 translation handoff

- Date: 2026-11-18. Translator: claude (crew job `efpg-401-u05-translate`), branch `crew/efpg-401-u05-translate`.
- English baseline: unit files and figure manifest last changed in `8d3144411`; checkout base `e359cc4bb`.
- Files translated in the Urdu mirror (`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/`):
  `index.mdx`, `topic-01.mdx` to `topic-07.mdx`, `unit-assessment.mdx` (the English unit has no teacher-notes file).
- Figure assets localized: `static/img/figures/efpg-401/unit-05/fig-U5-1.ur.svg` to `fig-U5-14.ur.svg`, each with a
  derived `.ur.dark.svg` (`npm run figures:variants`, `figures:variants:check` clean). Geometry mirrored for RTL
  (table columns run right to left, flowchart arrows reversed); every `.ur.svg` and `.ur.dark.svg` passes
  `scripts/measure-figure-text.mjs`. Each SVG `<desc>` matches its Urdu `<Figure alt>` verbatim.

## Structure and parity

- Heading level vectors, numbered items, bullets, table rows, block quotes, `<Figure>` and `<PrintHandout>` counts
  match the English file for file.
- Front matter keys `course_code`, `unit_no`, `topic_no`, `topic_label`, `clo_refs`, `est_reading_minutes` and
  `translation_status` are byte-identical to the English.
- Topic titles read `موضوع 5.N - ...`, matching the English numbering.
- The assessment keeps 10 MCQ + 10 RRQ + 5 ERQ in the same order, option letters mapped A/B/C/D to
  الف/ب/ج/د without reordering, identical marks, and the bounded answers section
  `## جوابات اور نمبر دہی کی رہنمائی` as the final `##` section.
- The temporary `reviewed` flip of both `index.mdx` files ran `npm run check:content`; the only findings were the two
  expected pipeline-gate rows (`G4 ur-translation` and `G5 ur-review` not done). Both files were reverted to `draft`.
- Zero em dashes in the Urdu files and SVGs.

## Banked key terms (declared in the Urdu `index.mdx`)

Every `ur` value is accepted by `specs/content/terminology.csv`: Lesson Plan سبقی منصوبہ, Learning Outcome
نتیجہ ہائے تعلم, Learning سیکھنا, Group Work گروہی کام, Active Learning فعال تعلم, Pedagogy تدریسیات,
Teaching Strategy حکمتِ تدریس, Assessment تشخیص, Summative Assessment مجموعی جائزہ, Self-Assessment خود جائزہ,
Rubric معیارِ جانچ.

## Proposed terms (not in the bank) for the curriculum owner

The bank was not edited. These renderings are used consistently across the unit:

| English | Urdu used | Where |
|---|---|---|
| Pupil | شاگرد | throughout |
| Warm-up | آغاز کی سرگرمی | Topics 5.1-5.4, assessment |
| Presentation / Practice / Production | پیشکش / مشق / آزادانہ استعمال | Topics 5.1-5.3 |
| Homework | گھر کا کام | Topic 5.2 |
| Teacher talk | استاد کی گفتگو | Topic 5.1 |
| Activity-based learning | سرگرمی پر مبنی تعلم | Topic 5.3 |
| Pair work | جوڑیوں میں کام | Topic 5.3 |
| Role play | کردار نگاری | Topic 5.3 |
| Set up / Monitor / Support / Report back | ترتیب دینا / نگرانی / مدد / رپورٹ پیش کرنا | Topic 5.3 |
| Structural lesson | ساختاری سبق | Topic 5.4 |
| Controlled practice / Free practice | محدود مشق / آزادانہ مشق | Topic 5.4 |
| Substitution drill | متبادلات کی مشق | Topic 5.4 (as Unit 4) |
| Pre-reading / Extension activity | پڑھنے سے پہلے / توسیعی سرگرمی | Topic 5.5 |
| Inferential question | استنباطی سوال | Topic 5.5 |
| Recitation / Appreciation | بلند خوانی / تحسین | Topic 5.5 |
| Guided writing | رہنمائی شدہ تحریر | Topic 5.6 |
| Topic sentence / Supporting sentence / Closing sentence | موضوعی جملہ / معاون جملہ / اختتامی جملہ | Topic 5.6 |
| Story map | کہانی نقشہ | Topic 5.6, RRQ 8 |
| Functional approach; form, meaning, use | فعلی طریقہ؛ صورت، معنی، استعمال | Topic 5.7 (as Unit 4) |
| Present perfect / Present continuous / Past continuous / Simple past | فعل حال مکمل / فعل حال جاری / فعل ماضی جاری / فعل ماضی مطلق | Topics 5.1, 5.2, 5.7 |
| Past participle | فعل کی تیسری حالت | Topic 5.7, MCQ 10 |

## Points for the G5 reviewer and the owner

- **Concept labels need an English-side fix.** `specs/content/efpg-401/concepts/unit-05.md` has two Urdu label
  defects I did not edit, because that file is a hashed G2 input: `سبقی منصوبے کے ساتھ مراحل` says "steps with a
  lesson plan" (ساتھ, "with") where "seven" is سات, and `شعری سبق کا سير` uses an Arabic yeh and reads oddly; the
  translation uses `نظم کے سبق کا بہاؤ`. Labels 5-5, 5-6 and 5-12 also differ from the prose (`سرگرمی پر مبنی تعلم`,
  `گروہی کام` from the bank, and `فعلی گرائمر کا سبق` to match Unit 4 rather than `کارکردگی پر مبنی`).
- **Gender of unnamed colleagues.** The English leaves several colleagues ungendered; Urdu verbs force a choice.
  Topics 5.1, 5.5 and 5.6 use feminine forms (Topic 5.6's English says "she"); Topics 5.2 and 5.7 use masculine.
  Change them if the owner prefers.
- English classroom utterances, example sentences and lesson-topic titles stay in Latin script because they are the
  English being taught, each with an Urdu gloss in parentheses where the meaning is not obvious.
- Rendered Urdu was not inspected: this crew job may not build the site or run a local server, and the unit is not yet
  deployed, so `scripts/render-inspect.mjs --locale ur` has not been run. The figure measurements ran in Chromium with
  the host's fonts; a production render pass at 360px and A4 is still owed.

## Status

- `translation_status` stays `draft` in both `index.mdx` files until an independent G5 review is accepted
  (Constitution Art. III.2, ADR-0019).
- G4 tracker row recorded as in progress (`agent:claude`) with this handoff; G5 remains open. No G5 certification is
  claimed and this session did not review its own translation.
- Rate probe: the full mirror (9 files, about 87 KB of English) plus 14 localized SVGs took one crew session.
