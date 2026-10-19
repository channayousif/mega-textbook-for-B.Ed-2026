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

- Continuation verification (2026-10-18): generated the ignored `static/content-status.json` with `npm run build:content-status`. All 13 draft content gates pass. Keep this generated artifact in the checkout; regenerate it after tracker edits and before checking content. Do not force-add it to Git.
- `check:no-em-dash`: zero em dashes across all files.
- `check:no-answer-keys`: zero answer key leaks; the bounded `## جوابات اور نشان دہی کی رہنمائی` section is the only answers block.
- `validate:content`: front matter, heading vectors, glossary references and file-set parity pass cleanly.
- Component parity confirmed across all 6 files: Figure (6), Glossary (5), PrintHandout (5), BloomTag (present inline in assessment), ObjectiveList (0), ActivityCard (0).
- Assessment bank is exactly 10 MCQ / 10 RRQ / 5 ERQ, matching the English.
- `translation_status` remains `draft` everywhere because no accepted independent G5 certification exists. The tracker already records an advisory G5 revise report and subsequent repairs; that history remains unchanged.
- No Docusaurus build or dev server was run, strictly obeying the crew brief.

## Continuation repairs and conditional checks

- Codex continued the existing commits rather than retranslating the mirror. The English unit is unchanged from `origin/main` at `8330b2b685c986759087af43940bc8c961c950a1`; its latest English-unit commit is `86531818bd4b68154f3c9fd57457c8b8f9586b17`.
- Corrected the Urdu assessment's previously untranslated Bloom labels and MCQ option letters, including matching answer letters and the option reference in answer 7. Option order, quantities, marks and the 10/10/5 bank remain unchanged. The earlier statement that Bloom labels were already translated was inaccurate before this continuation.
- Rechecked all six files for matching identifier metadata, heading vectors, component counts, ordered Figure IDs and Glossary keys, and existing figure paths. All twelve Urdu SVG variants are present.
- Temporary `reviewed` content check: 12/13 gates pass, including file-set, heading and figure parity. Pipeline reports exactly 14 expected blockers: open G4/G5 rows and the twelve unbanked terms listed above. These require owner banking and independent review, not changes to the frozen bank or fabricated completion rows. Both index files were restored byte-for-byte to `draft` after the check, and content status regenerated.
- No new build, server, browser, or rendered RTL/A4 inspection was run because this crew brief prohibits a build and dev server. Source checks do not establish rendered usability; the next permitted independent review must inspect it.

## Next owner and status

`translation_status` remains `draft` in all files. G4 tracker row in `tasks.md` is in-progress (`▣`) with this handoff reference; no G4 completion or review certification is claimed per `translate-unit` Step 7 and repository governance rules.
A fresh, independent G5 review session is needed to evaluate the Urdu translation against the English baseline.
