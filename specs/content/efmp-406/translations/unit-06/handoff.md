# EFMP-406 Unit 6 Urdu translation handoff

Translator: opencode, crew job `efmp-406-u06-translate`, 2026-11-02. This records translation work and translator checks, not independent G5 evidence or certification.

## Baseline and delivered files

English baseline: `1b7a8ae05553d30307ea7ee2151b8f4cb3d472e9`, identical to `origin/main` when work began. No earlier branch commits or working-tree edits were present. G2 is green; the G3 advisory report is passing but unsigned, and its tracker row remains open. The English files are unchanged.

Resolved the Urdu directory with `resolveUnit('.', 'EFMP-406', 6)` and file paths with `urPathFor`. The five same-named mirrors are under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/`:

- `index.mdx`: opening, outcomes, prerequisites, navigation, study guidance and bank-bound `key_terms`.
- `topic-01.mdx`: complete classroom case, explanations, worked examples, activities, retrieval, self-check, practicum task, summative task and rubric, and reading references.
- `topic-02.mdx`: the same complete cycle for the teacher's role and future trends.
- `unit-assessment.mdx`: all 10 MCQs, 10 restricted responses, 5 extended responses, model answers, scoring and five analytic rubrics. The translated answers section remains the final level-two section.
- `unit-teacher-notes.mdx`: sequencing, discussion case, misconceptions and practical work.

Four Urdu light SVGs and their four mechanically derived dark variants are under `static/img/figures/efmp-406/unit-06/`. Each topic uses its two `.ur.svg` files. Text, titles and descriptions are localised, with Nastaliq-first font stacks. Shape layouts and label positions are horizontally mirrored for RTL: the comparison table starts with its barrier column on the right, the concept map places barriers on the right and learner groups on the left, the teacher-role diagram places the classroom panel on the right, and the timeline runs right to left with 2000 on the right and 2030 on the left. Every SVG description exactly matches its page alt text. Optimised Urdu light files are 4.2-6.6 KB each, below 20 KB. Figure IDs, English prompts and manifest rows are unchanged.

## Terminology working set

The bank was read before drafting. Whole-term matching against the English unit finds Assessment, Formative Assessment, Summative Assessment, Rubric, Self-Assessment, Group Work, Lesson Plan, Reflective Journal and Multi-grade Classroom. The pedagogical meanings use تشخیص، تشکیلی تشخیص، مجموعی جائزہ، معیارِ جانچ، خود جائزہ، گروہی کام، سبقی منصوبہ اور تاملی جریدہ. The word development here describes historical change and national context, not the psychological concept نشوونما; historical and contextual passages use ترقی or بدلتی according to the sentence. The three `<Glossary>` calls (Equity, Sustainable Development Goals, Artificial Intelligence) keep their English `term` attributes and use the `definition_ur` forms from `glossary.json`: انصاف، پائیدار ترقیاتی اہداف and مصنوعی ذہانت. The concept graph's nine Urdu labels were consulted and left unchanged; the prose uses their surfaces where the concept appears (شرح خواندگی، باہم جڑی رکاوٹیں، تعلیمی رسائی، اسکول سے باہر بچے، انصاف، شمولیت، استاد کے باہم مربوط کردار، وعدوں اور حاصل شدہ نتائج میں فرق، نئے ذرائع).

The Urdu index declares only bank-approved terms. The course spec's four core terms have no bank entries and are therefore proposed here, not silently added to `key_terms` or the frozen bank.

| Proposed English term | Urdu used |
|---|---|
| Literacy | خواندگی |
| Literacy rate | شرح خواندگی |
| Access | رسائی / تعلیمی رسائی |
| Equity | انصاف |
| Inclusion | شمولیت |
| Out-of-school children | اسکول سے باہر بچے |
| Linked literacy barriers | خواندگی میں باہم جڑی رکاوٹیں |
| Developing contexts | ترقی پذیر ماحول |
| Contemporary literacy | عصری خواندگی |
| Multimodal text | کثیر نمطی متن |
| Trend | رجحان |
| Prediction | پیش گوئی |
| Commitment | وعدہ |
| Fair resource decisions | وسائل کے منصفانہ فیصلے |
| Independent evidence | خود کارکردگی کا ثبوت |
| Low-resource route | کم وسائل والا راستہ |
| Peri-urban | نیم شہری |

These are proposals for the curriculum owner and independent G5 reviewer, not approved terminology. No unresolved passage meaning has been hidden as a certification claim.

## Checks and limits

- `npm run check:content` on the untouched baseline: all 13 gates passed. Because HEAD equalled origin/main, this is the requested main comparison without a second checkout. See `logs/check-content-origin-main.txt`.
- Additional source checks: identical file set, front-matter identifiers and reading times, heading-level vectors, component and import sequences, numbered-list sequences, table dimensions and internal link destinations. All pass. Alt/description equality and all declared bank terms pass. See `logs/parity-self-check.txt`.
- All five Urdu pages compile with `@mdx-js/mdx` without a site build. See `logs/mdx-syntax.txt`.
- Assessment source checks: 40 options in original order, 10/10/5 questions and 10/10 numbered guidance entries, unchanged restricted-response marks. Translator MCQ self-solve before key comparison: ب، د، الف، ج، ب، ج، الف، د، ب، ج؛ matches all ten translated entries. This is a translator check, not independent review.
- Both indexes were temporarily set to `reviewed` as the skill prescribes. File/heading parity and figure parity passed; pipeline reported only the expected unfinished G4/G5 rows, with no terminology findings. The generated content-status report also became stale solely because of the temporary English flag change. Restoring draft resolved that finding without changing publication records. See `logs/check-content-temporary-reviewed.txt`.
- Final `npm run check:content` with both indexes restored to draft: all 13 gates passed, no baseline or new findings. See `logs/check-content-draft.txt`.
- All four Urdu SVG sources were optimised. Scoped `figures:variants` generated four dark variants; repository-wide `npm run figures:variants:check` passed for 1095 sources.
- Build, dev server, Playwright and `render-inspect` were not run because the crew brief explicitly forbids them. `measure-figure-text.mjs` imports and launches Playwright Chromium, so its geometry measurement was also not run. SVG geometry, actual Nastaliq shaping and clipping, page RTL at 360px and desktop widths, and A4 print remain unverified. A green content gate does not establish these properties. A permitted fresh session must run geometry and render inspection and repair any findings before accepting the figures or G5.

The recorded translation/checking portion took approximately 40 minutes from the first baseline gate run; initial repository reading is excluded. This is not a full G5 or browser-inspection rate measurement.

## Next owner and state

`translation_status` remains `draft` throughout the final English and Urdu file sets because independent G5 has not occurred. No G3/G5 gate was marked done and no evidence was signed. The current translate-unit skill explicitly says in Step 7, "Do not append a `G4 ur-translation` tracker row"; the brief asks for a row "as the skill says", so the existing G4 row and all tracker statuses were left unchanged. This handoff records the delivered draft without claiming a gate transition.

The next independent reviewer must compare complete bilingual passages and solve the Urdu bank independently, inspect all figure labels and actual rendered desktop/narrow/A4 output, and bind any accepted G5 to accepted G3 evidence for the same English version. Qualification/signing and the course's absent catalog entry remain owner matters. Preserve the source ledger's limitation that Shakir et al. (2012) was available only as an abstract; no full-text support is claimed by this translation.
