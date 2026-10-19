# GQUR-300 Unit 4 Urdu translation handoff

- Translator: opencode (Claude). This is a translation record, not independent review or certification.
- English baseline: `b1ef82400a57d93076cb119bbbf7deff06860840` (`origin/main`). The checkout was clean and `git log origin/main..HEAD` was empty. No English content changed.
- Refreshed and verified the existing complete six-file mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/` resolved by `resolveUnit('.', 'GQUR-300', 4)`.
- Preserved all metadata identifiers, reading minutes, heading levels and order, component calls, glossary keys, numerical quantities, assessment item count and marks.
- Translated Bloom tags inline (`*(Apply)*`, `*(Understand)*`, `*(Remember)*`, `*(Analyze)*`, `*(Evaluate)*`), matching the English tags.
- Verified all 6 figures (12 variants: `.ur.svg` and `.ur.dark.svg`), with translated alt text and `.ur.svg` src wiring in every `<Figure>` call.

## Terminology for the owner

The frozen terminology bank (`specs/content/terminology.csv`) has no entries for the twelve core measurement and geometry terms used in this unit. Their existing Urdu forms remain proposals awaiting owner decision.

| Proposed English term | Urdu form used |
|---|---|
| Area | رقبہ |
| Centimetre | سینٹی میٹر |
| Circle | دائرہ |
| Kilogram | کلوگرام |
| Millilitre | ملی لیٹر |
| Perimeter | اطراف کی پیمائش |
| Radius | نصف قطر |
| Rectangle | مستطیل |
| Square | مربع |
| Triangle | مثلث |
| Unit of measurement | پیمائش کی اکائی |
| Volume | حجم |

Additionally, the twelve concept graph labels in `specs/content/gqur-300/concepts/unit-04.md` remain authored proposals carrying G5 flags. The index `key_terms` declares all twelve core terms, which are recorded above as unbanked proposals for the curriculum owner.

## Checks and limits

- `npm run check:content`: 12 of 13 content gates pass. Only `check:content-status` fails because the generated `static/content-status.json` is missing; this file is absent on `origin/main` as well, so it is a pre-existing finding outside this job's scope.
- `check:no-em-dash`: zero em dashes across all files.
- `check:no-answer-keys`: zero answer key leaks; the bounded `## جوابات اور نشان دہی کی رہنمائی` section is the only answers block.
- `validate:content`: front matter, heading vectors, glossary references and file-set parity pass cleanly.
- Component parity confirmed across all 6 files: Figure (6), Glossary (5), PrintHandout (5), BloomTag (present inline in assessment), ObjectiveList (0), ActivityCard (0).
- Assessment bank is exactly 10 MCQ / 10 RRQ / 5 ERQ, matching the English.
- `translation_status` remains `draft` everywhere because no independent G5 review has taken place.
- No Docusaurus build or dev server was run, strictly obeying the crew brief.

## Next owner and status

`translation_status` remains `draft` in all files. G4 tracker row in `tasks.md` is in-progress (`▣`) with this handoff reference; no G4 completion or review certification is claimed per `translate-unit` Step 7 and repository governance rules.
A fresh, independent G5 review session is needed to evaluate the Urdu translation against the English baseline.
