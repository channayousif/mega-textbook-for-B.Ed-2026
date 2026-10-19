# EFMP-303 Unit 3 Urdu draft handoff

Continued commit `5ed11a58`, which already supplied the six Urdu pages. English source is unchanged from Unit 3 commit `3b6fa404c69a280e3056c66f74d6912c061fba6f` (also present in baseline `origin/main` at `409ea26269f8da06c7d75b254e29864e30abce98`).

## Changes

Completed the Urdu mirror's figure dependencies: six translated SVG sources and their generated dark variants, with right-to-left table/panel order and mirrored arrow geometry. Preserved English shapes, identifiers and numerical data. Optimised sources are 3.9–8.4 KB. Aligned each SVG description with its Urdu carrier alt text. Rendered the figures with the repository's actual Nastaliq font and inspected the contact sheet; transformed text bounds remain within the viewBoxes (`figure-font-geometry.json`, `figures-nastaliq.png`). This is figure inspection, not evidence of rendered Docusaurus pages.

Repaired corrupt Urdu spellings and a reversed scenario meaning (worst-performing schools), preserved Latin source identities and author-year citation, and supplied Urdu children to the preserved Glossary components so visible text is Urdu. All six files retain the same front-matter identifiers, reading times, heading-level vectors and component counts. Assessment retains 10 MCQs, 10 RRQs, 5 ERQs, options, marks and final bounded answers section. Urdu MCQs yield ب for items 1–9 and ج for item 10, matching the English key. This is a translator self-check, not independent blind solving.

## Terminology proposals for owner

The frozen bank has no education-planning terms for Development plan (ترقیاتی منصوبہ), Five-year plan (پنج سالہ منصوبہ), Educational planning (تعلیمی منصوبہ بندی), Micro planning (مائکرو منصوبہ بندی), Macro planning (میکرو منصوبہ بندی), Strategic planning (استراتیجی منصوبہ بندی), Needs assessment (ضروریات کا جائزہ), Resource allocation (وسائل کی تقسیم), Human capital (انسانی سرمایہ), Rational model (عقلی ماڈل), Iterative model (تکراری ماڈل) or Participatory model (شراکتی ماڈل). These are proposals, not bank amendments. Relevant existing glossary definitions and concept labels were consulted. The bank's standalone Development = نشوونما describes a different sense from economic development = معاشی ترقی; removed that misleading standalone key-term declaration without changing the bank. Eight applicable bank entries in the Urdu index match accepted spellings, including accepted pairs.

## Checks and next owners

- `main-check-content.log`: clean detached origin/main, with generated ignored content status, passes all 13 content gates.
- `check-content.log`: final draft branch run, with generated ignored content status, passes all 13 content gates. No new findings against main.
- `structural-parity.log`: file set, heading vectors, metadata, component counts and bank entries match.
- `conditional-parity.log`: temporary reviewed flags enabled the conditional checks. Content and figure parity pass; only the deliberately incomplete G4/G5 tracker rows and the temporary content-status change fail. Both flags were restored to draft. No acceptance was claimed.
- `npm run figures:variants:check` passes. `git diff --check` passes.

`translation_status` remains `draft`. The existing G4 row records preparation with its open mark retained, following translate-unit Step 7's instruction not to append a completion row or flip the tracker. G3/G5 remain open; no review evidence or publication status was changed.

The content owner must resolve the existing G3 escalation before freezing English for G5. Existing English diagram-order issues in figures 3 and 5, unverified allocation placeholders, source issues and assessment findings were preserved rather than silently corrected in Urdu. The labels and mirrored geometry inherit those source limitations. English repairs require corresponding Urdu updates.

The brief prohibits builds and dev servers, so full Urdu page inspection at desktop, 360px and A4 print remains for the permitted render host and independent G5 reviewer. A green content gate is not semantic or rendered-page acceptance. Generate `static/content-status.json` with `npm run build:content-status` in every fresh checkout before checks; it is intentionally ignored, and was the previous attempt's missing-file finding. No build or dev server ran. Work was completed in this continuation on 2026-10-18 in 4.5 minutes measured since the first content-gate log completed; earlier drafting time is unknown.
