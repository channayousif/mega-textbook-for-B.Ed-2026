# EFMP-406 Unit 3 Urdu translation handoff

Translator: opencode, crew job `efmp-406-u03-translate-r1`, 2026-11-05. This records translation work and translator checks, not independent G5 evidence or certification.

## Baseline and delivered files

English baseline: `24e7302b2728eda88b886cd6ee24b06c8be5b166` (the post-G3-repair Unit 3 files), checked out at `322e0c7a61d179e92a8e4d51b8a11739e57b66bf`. The English files were not edited; `git diff` against the baseline is empty for `docs/`. G2 is green; the G3 advisory report remains open and unsigned, with repairs applied in `24e7302b2`.

The Urdu directory was resolved with `resolveUnit('.', 'EFMP-406', 3)`. Four same-named mirrors are under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/`:

- `index.mdx`: opening, outcomes, prerequisites, navigation, study guidance and the bank-bound `key_terms` block.
- `topic-01.mdx`: the complete classroom case, explanation, worked example, activity, retrieval, self-check, practicum task, summative task and mini-rubric, and reading reference.
- `topic-02.mdx`: the same complete cycle for civic literacy, multilingualism and translanguaging.
- `unit-assessment.mdx`: all 10 MCQs, 10 restricted responses, 5 extended responses, model answers, scoring and five analytic rubrics. The translated answers section remains the file's final level-two section.

There is no English `unit-teacher-notes.mdx`, so none was created. The English unit carries no `<Glossary>` components, so the Urdu unit carries none.

Four Urdu light SVGs and their four mechanically derived dark variants are under `static/img/figures/efmp-406/unit-03/`. Each topic uses its two `.ur.svg` files. The `.ur.svg` files are horizontal mirrors of the English sources (shapes transformed with `translate(780 0) scale(-0.975 1)` or the 820-width equivalent), with right-anchored Urdu labels and the Nastaliq-first font stack. The canvas width is 780 so the `check:svg-style` gate passes for new files. Text, titles and descriptions are localised. Figure IDs, English prompts and the manifest rows are unchanged. Optimised Urdu light files are 5.0-8.0 KB each, below 20 KB.

## Terminology working set

The bank was read before drafting. `key_terms` in the Urdu `index.mdx` declares only bank-approved surfaces: Assessment (تشخیص), Formative Assessment (تشکیلی تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ), Mother Tongue (مادری زبان), Scaffolding (معاونتی تدریس), Learning Outcome (نتیجہ ہائے تعلم), Pedagogy (تدریسیات), Curriculum (نصاب) and Reflective Journal (تاملی جریدہ). The temporary `reviewed` flip confirmed the bank accepts every declared pair.

The unit's conceptual vocabulary is not in `terminology.csv`. The following surfaces were used and are proposals for the curriculum owner, not approved terminology. Terms marked "glossary" have an accepted Urdu definition in `specs/content/efmp-406/glossary/unit-03.json`; the rest are translator choices.

| Proposed English term | Urdu used | Note |
|---|---|---|
| Literacy | خواندگی | glossary |
| Literacy as social practice | سماجی عمل کے طور پر خواندگی | concept label |
| Autonomous model of literacy | خواندگی کا خود مختار ماڈل | glossary |
| Ideological model of literacy | خواندگی کا نظریاتی ماڈل | glossary |
| Literacy event | خواندگی کا واقعہ | glossary |
| Literacy practice | خواندگی کا عمل | glossary |
| Dominant literacy | غالب خواندگی | glossary |
| Vernacular literacy | مقامی خواندگی | glossary |
| Learner identity | متعلم کی شناخت | glossary |
| Civic literacy | شہری خواندگی | glossary |
| Subtractive multilingualism | اخراجی کثیر لسانیت | glossary |
| Additive multilingualism | اضافی کثیر لسانیت | glossary |
| Mother-Tongue-Based Multilingual Education (MTB-MLE) | مادری زبان پر مبنی کثیر لسانی تعلیم | glossary |
| Linguistic repertoire | لسانی ذخیرہ | glossary |
| Translanguaging | بین اللسانی عمل | glossary |
| Critical literacy | تنقیدی خواندگی | proposal |
| Multimodal | کثیر نمطی | proposal |
| Decoding / Encoding | ڈیکوڈنگ / اینکوڈنگ | transliteration |
| Additive bilingualism | اضافی دو لسانیت | proposal |
| Dominant school literacy | غالب اسکولی خواندگی | proposal |
| Vernacular community literacy | مقامی برادری کی خواندگی | proposal |
| Literacy development | خواندگی کی نشوونما | proposal |
| Civic voice | شہری آواز | proposal |
| Critical evaluation | تنقیدی جائزہ | proposal |
| Access and comprehension | رسائی اور سمجھ | proposal |
| Plain-language | سادہ زبان | proposal |
| Practicum / School placement | پریکٹکم / اسکول پلیسمنٹ | transliteration |

No unresolved passage meaning has been hidden as a certification claim. The English baseline's own qualifications (for example, that the Ashraf et al. study did not measure reading scores or dropout, and that MTB-MLE is a reasoned position rather than a guaranteed outcome) are carried across.

## Checks and limits

- `npm run check:content` on the delivered draft: all 14 gates passed. See `logs/check-content-draft.txt` and `logs/check-content-final.txt`.
- Temporary flip: both `index.mdx` files were set to `reviewed` and `npm run check:content` rerun. `validate:content` (file-set parity, heading vectors, front-matter identifiers) and `check:figures` passed. `check:pipeline-gate` reported only the two expected unfinished G4/G5 rows, and `check:content-status` reported only the staleness caused by the temporary English flag change. No terminology, parity or figure findings. See `logs/check-content-temporary-reviewed.txt`. Both files were then restored to `draft` and the revert verified by grep.
- Additional source checks: identical file set, front-matter identifiers and reading times, heading-level vectors, component and import sequences, numbered-list counts, internal link destinations, figure IDs and `.ur.svg` src wiring, and the 40 MCQ option letters in original order. All pass. See `logs/parity-self-check.txt`.
- All four Urdu pages compile with `@mdx-js/mdx` without a site build. See `logs/mdx-syntax.txt`.
- Assessment source checks: 10/10/5 questions, 40 options in original order, 10 MCQ answer-key entries and 10 RRQ model answers, unchanged marks. Translator MCQ self-solve before key comparison: الف، ب، ب، الف، ب، الف، ب، ب، ب، ج؛ matches all ten translated entries. This is a translator check, not independent review.
- All four Urdu SVG sources were optimised. Scoped `figures:variants` generated four dark variants; repository-wide `npm run figures:variants:check` passed for 1138 sources.
- Build, dev server, Playwright and `render-inspect` were not run because the crew brief explicitly forbids them. `measure-figure-text.mjs` imports and launches Playwright Chromium, so its geometry measurement was also not run. SVG geometry, actual Nastaliq shaping and clipping, page RTL at 360px and desktop widths, and A4 print remain unverified. A green content gate does not establish these properties. A permitted fresh session must run geometry and render inspection and repair any findings before accepting the figures or G5.

The recorded translation/checking portion took approximately 75 minutes from the first baseline gate run; initial repository reading is excluded. This is not a full G5 or browser-inspection rate measurement.

## Next owner and state

`translation_status` remains `draft` throughout the final English and Urdu file sets because independent G5 has not occurred. No G3/G5 gate was marked done and no evidence was signed. The translate-unit skill says in Step 7, "Do not append a `G4 ur-translation` tracker row"; the brief asks for a row "as the skill says", so the existing G4 row and all tracker statuses were left unchanged. This handoff records the delivered draft without claiming a gate transition.

The next independent reviewer must compare complete bilingual passages and solve the Urdu bank independently, inspect all figure labels and actual rendered desktop/narrow/A4 output, and bind any accepted G5 to accepted G3 evidence for the same English version. Qualification/signing and the course's absent catalog entry remain owner matters. Preserve the source ledger's limitation that the English baseline is the post-repair version and that the G3 advisory remains open and unsigned.
