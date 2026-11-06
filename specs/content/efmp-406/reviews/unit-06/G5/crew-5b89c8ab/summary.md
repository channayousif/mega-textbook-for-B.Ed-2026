# EFMP-406 Unit 6, G5 Urdu review (advisory)

- Report: `specs/content/efmp-406/reviews/unit-06/G5/5b89c8ab-b21b-47d8-a039-009f638815d0.json` (validated structurally; unsigned; advisory only)
- Reviewer: `agent:g5-reviewer` (Gemini 3.8 Flash (High)), crew job `efmp-406-u06-review_ur`, run `5b89c8ab-b21b-47d8-a039-009f638815d0`
- Translation reviewed: commit `1f0067249` (opencode). This session did not author or translate the unit.
- G3 dependency: human desk record CMY `20261102T210705Z-g3-desk-d3bd5a8a.json`.
- Input manifest: `crew-5b89c8ab/manifest.json` (114 inputs, skill digest `02797f90adddd8f4bc50c6e80c6e68d8f6f0219d68d297aabcc8b5443bace5a8`)
- Disposition: **escalate**. G5 stays open. Nothing is signed and no gate is marked done.

## Criteria

| Criterion | Status | Note |
|---|---|---|
| authority | pass | Both SLOs (SLO:EFMP-406-6-1, SLO:EFMP-406-6-2) and guide Scheme-and-Course-guides/extracted-text/3rd 2026.txt:274-304 match approved spec |
| sources | pass | All 7 sources cited with identical attribution boundaries and qualifications; abstract-only and overview limits preserved |
| coverage | pass | Sub-topics 6.1 and 6.2 taught in full across topic-01 and topic-02, and reinforced across 10 MCQs, 10 RRQs, and 5 ERQs |
| assessment | pass | Independent blind solve 10/10 MCQs matches Urdu key and English key 100%; RRQ 4-mark breakdown and ERQ 20-mark rubrics equivalent |
| accessibility | unverified | No real browser visual rendering (desktop, 360px mobile, A4 print) possible under crew brief constraints (F2) |
| completeness | fail | Truncated sentence in topic-02.mdx:46 drops clause translation; topic-01.mdx:76 omits clause in question list (F1) |
| semantics | pass | Core literacy, equity, inclusion, and teacher-role concepts, quantitative metrics, and scenario logic faithfully preserved |
| terminology | pass | All 8 declared bank terms in key_terms conform to terminology.csv; Glossary tags have proper Urdu children; F4 records unbanked terms |
| register | pass | Natural, academic-plain Urdu suitable for pre-service B.Ed teachers; appropriate pedagogical tone |
| rtl | unverified | Visual Nastaliq shaping, bidi layout, and print layout unverified in browser (F2); SVG source coordinates mirrored |

## Findings

1. **F1 (completeness - blocking, unresolved)**:
   In `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-02.mdx:46`:
   Sentence truncation drops the translation of "the next move may be supported word reading", producing broken punctuation and an incomplete thought: `اگر بچہ اس جملے کو پڑھ نہیں سکتا، ۔ اگر بچہ اسے پڑھ سکتا ہے مگر دعویٰ سے جوڑ نہیں سکتا، تو اگلا قدم استدلال سے متعلق ہے۔`. Action required for author: restore the missing clause (e.g. `اگر بچہ اس جملے کو پڑھ نہیں سکتا، تو اگلا قدم الفاظ خوانی کی معاونت ہو سکتا ہے۔`). In addition, in `topic-01.mdx:76`, the second question in the three-question list was translated as a bare `کردار ہے؟` instead of `کیا متعلم کا کام میں فعال کردار ہے؟` for "Does the learner have an active role in the work?".

2. **F2 (accessibility / rtl - uncertain, unresolved)**:
   No real browser visual inspection (1280px desktop, 360px mobile viewport, A4 print layout) was possible in this crew job. The task brief strictly forbids `npm run build`, dev/preview servers, and Playwright/Chromium. Neither chromium, google-chrome, nor rsvg-convert is installed on the host, and ImageMagick MSVG cannot resolve CSS variables or perform HarfBuzz Nastaliq shaping. Text geometry was measured statically with `scripts/measure-figure-text.mjs` (exit 0 across all 8 SVG variants in G3 review), but visual verification of Nastaliq shaping, bidi layout, punctuation rendering, and print wrapping remains unverified and requires browser access before final certification.

3. **F3 (authority - uncertain, unresolved)**:
   The G3 English dependency is recorded in `specs/content/efmp-406/tasks.md` row 67 pointing to `specs/content/efmp-406/reviews/unit-06/G3/20261102T210705Z-g3-desk-d3bd5a8a.json` from the owner sign-off desk (CMY). All bound English inputs match the current manifest. However, this is a human desk report without an Ed25519 detached signature (`.sig`). Meanwhile, the automated G3 report at `specs/content/efmp-406/reviews/unit-06/G3/f39ce2ec-8915-4b91-be9c-d3b7ce713df8.json` has a stale input manifest following post-review commits to topic-01.mdx, topic-02.mdx, and gates.mjs. Automatic G5 verification requires an accepted, qualified G3 report.

4. **F4 (terminology - advisory, unresolved)**:
   Core course terms introduced in EFMP-406 Unit 6:
   - Literacy: خواندگی
   - Literacy rate: شرح خواندگی
   - Access: رسائی / تعلیمی رسائی
   - Inclusion: شمولیت
   - Out-of-school children: اسکول سے باہر بچے
   - Multimodal text: کثیر نمطی متن
   - Trend: رجحان
   - Prediction: پیش گوئی
   These are applied consistently across prose, figures, and assessment, but have no entries in `specs/content/terminology.csv`. The curriculum owner should review and bank these terms in a future governance update.

5. **F5 (register - advisory, unresolved)**:
   Minor typographical and lexical items noted for translation polish:
   - `topic-02.mdx:44`: Typo `بدلرتے` instead of `بدلتے` (`وہ نئے مثال پر انفرادی جواب دینے سے پہلے کردار بدلرتے ہیں`).
   - `topic-01.mdx:88`: Typo `ڈسپے سازی` instead of `ڈسپلے سازی`.
   - `topic-01.mdx:44` and `topic-02.mdx:44`: English "practices" translated as `ساتوں` rather than `طریقوں / عملی مشقوں`.
   - `topic-02.mdx:80` and `unit-assessment.mdx:98, 109`: Transliteration of EFA as `ایف ای اے` (FEA) rather than `ای ایف اے` (EFA) or `تعلیم برائے سب`.
   - `تلیل` used for justification/rationale (`تعلیل / دلیل`).

## Commands

The six mandatory content gates (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`) exited 0. `render-review` was not performed (exit 1) due to environment restrictions. Logs are preserved in `specs/content/efmp-406/reviews/unit-06/G5/crew-5b89c8ab/`.
