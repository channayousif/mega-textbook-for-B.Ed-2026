# GNAS-301 Unit 4 independent G3 advisory review (Cycle 2)

Disposition: **escalate**. Content repairs from round 2 were verified and confirmed resolved (Abbasi 2022 phantom mappings for U4-05, U4-08, U4-09 and in teacher notes; who-mental-health-work phantom mapping for U4-10; duplicate U4-01/khan2024 row in coverage; MCQ option redistribution balancing keys across a-d; citation scoping for Abbasi 2022 in topic-03; Karachi fire factory phrasing in topic-04; concept graph item mapping corrections in concepts/unit-04; post-fire reform claim generalization in topic-02; descriptive Markdown links in Further reading across all seven topics; and 9 figure text-geometry defects resolved across 6 SVGs with measure-figure-text.mjs exiting 0). However, visual browser and print inspection is unperformed due to job brief execution restrictions on heavy commands. This is an advisory review under ADR-0019; it does not certify the unit.

Reviewed repair commit: `commit:5a1637d3` (and figure geometry repair `commit:2886f790`). Reviewer run: `4361ffe1-f35e-49e5-877d-83d1f34398a8`. Author run: `commit:5a1637d3`. Reviewer is `agent:g3-reviewer` using model `Gemini 3.8 Flash (High)`. Fresh session; independent reviewer.

## Review findings

### 1. Visual inspection limitation (tooling restriction)
- Visual browser and print inspection (360px small-screen viewport, table scrollability, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright (`render-review` exit code 1).
- Structural accessibility checks pass from source: alt text is descriptive across all 14 figures (88-190 chars), figcaptions are present, heading hierarchy is well-formed with no skipped levels, link text is descriptive, and zero em dashes were found.
- Full G3 certification requires visual inspection on a live build under permitted browser tooling.

### 2. Excerpt support note headings in shared texts (advisory)
- In `specs/content/gnas-301/sources/texts/who-hearing-2026.md:17` and `who-occupational-health.md:23`, section headings read `## What this supports in GNAS-301 Unit 3`, though Unit 4 cites them for U4-13 and U4-01 respectively (the underlying facts support both uses). In `who-mental-health-work.md:19-21`, the note asserts a Topic 4.5 citation that was removed.
- `specs/content/gnas-301/sources/unit-04.md` explicitly documents this under `## Unit 4 excerpt support notes`. Because these shared excerpts bind multiple units, when the shared text files are next refreshed across units, the headings should be made unit-neutral and the notes aligned.

### 3. Verification of prior round-2 findings

- **Abbasi (2022) phantom mappings (RESOLVED)**: In `specs/content/gnas-301/coverage/unit-04.md`, rows U4-05, U4-08, and U4-09, as well as the reinforcement row in `unit-teacher-notes.mdx`, were re-grounded on `harrington-gill` title-level support or removed. In `specs/content/gnas-301/sources/unit-04.md`, the `Supports` cell was rewritten to the two genuine uses (topic-01.mdx U4-01 construction hazards; topic-03.mdx U4-04 community consultation method).
- **who-mental-health-work phantom mapping (RESOLVED)**: `coverage/unit-04.md` row U4-10 was re-grounded on `harrington-gill`, and `sources/unit-04.md` `Supports` cell correctly scopes to `topic-07.mdx U4-13` (12 billion working days lost).
- **Duplicate U4-01/khan2024 row (RESOLVED)**: The accidental duplicate identical row in `coverage/unit-04.md` was deleted.
- **MCQ key skew (RESOLVED)**: MCQ correct options in `unit-assessment.mdx:149-161` have been redistributed and balanced across options a-d (1-a, 2-b, 3-d, 4-b, 5-c, 6-c, 7-a, 8-b, 9-c, 10-d; 2 a, 3 b, 3 c, 2 d).
- **Abbasi citation scoping (RESOLVED)**: In `topic-03.mdx:48-51`, the sentence was split so the citation scopes strictly to the community consultation method, leaving the unit's practical inference in a separate sentence.
- **Karachi fire factory plural phrasing (RESOLVED)**: In `topic-04.mdx:74`, "the Karachi fire's factories had paperwork too" was corrected to "factories like the one in the Karachi fire may have paperwork too".
- **Concept graph item mappings (RESOLVED)**: In `concepts/unit-04.md`, RRQ-04 was removed from `CON:GNAS-301-4-4` and MCQ-08 was removed from `CON:GNAS-301-4-11`.
- **Post-fire reform claim (RESOLVED)**: In `topic-02.mdx:40-41`, the uncited post-fire reform claim was replaced with the general constitutional statement: "Pakistan's national framework rests on its factory and labour legislation and its provincial enforcement."
- **Further reading links (RESOLVED)**: Bare-URL links across all seven topics were converted to descriptive Markdown links (`[Article DOI](...)`, `[Occupational health](...)`, `[Mental health at work](...)`, `[Deafness and hearing loss](...)`).
- **Figure text-geometry defects (RESOLVED)**: All 9 text-geometry issues reported by `measure-figure-text.mjs` across 6 SVGs were repaired in commit `2886f790`. Re-measuring all 56 committed Unit 4 SVG variants exits 0 with zero text overflows and zero wordmark collisions.

## Evaluated criteria summary

- **Authority (`pass`)**: Course guide (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:143-366`) Weeks 8-10 outline covers all 15 leaf items (8.1-8.3, 9.1-9.4, 10.1-10.8) mapped 1:1 to U4-01 through U4-15. Content-spec approved (D-2026-0020, G-2026-22, G-2026-23, D-2026-0021).
- **Sources (`pass`)**: All cited excerpts verified against bound texts. Open-access floor of 2 cleared via Crossref-verified `khan2024` and `nafees2019`. Harrington & Gill declared honestly and completely under `## Unverifiable sources` per D-2026-0001 for title-level support. Karachi fire and heatwaves declared honestly.
- **Coverage (`pass`)**: All 15 sub-topics taught in depth under dedicated `###` headings. Est reading minutes total 116 (inside 95-120 spec band). All five planned misconceptions addressed. ERQs cover all seven topics.
- **Assessment (`pass`)**: Exactly 10 MCQs, 10 RRQs, and 5 ERQs. Independently solved; derived MCQ keys match supplied key with balanced distribution across a-d. RRQ marking criteria clear and objective. ERQ rubrics analytic with Bloom tags (Analyze, Evaluate, Create). Bounded answers section isolated.
- **Accessibility (`unverified`)**: Source checks pass (alt text, heading hierarchy, descriptive links, zero em dashes). Figure text measurement exits 0 across all 56 SVG variants. Live browser/print render inspection unperformed due to job brief limits.
- **Readability (`pass`)**: Accessible tone for HSC graduates; key terms wrapped with `<Glossary>` on first use; clear Pakistani examples (spinning mills, Karachi fire analysis, workshop layers, exam hall HSE plan). Zero em dashes (`check:no-em-dash` exit 0).
- **Pedagogy (`pass`)**: Full 9-part learning cycle in all seven topics; feasible classroom activities with grouping and time guidance; extensive teacher notes.

## Deterministic gate commands

1. `validate:content` - PASS (exit code 0)
2. `check:depth-gate` - PASS (exit code 0)
3. `check:figures` - PASS (exit code 0)
4. `check:no-em-dash` - PASS (exit code 0)
5. `check:no-answer-keys` - PASS (exit code 0)
6. `check:docs-sync` - PASS (exit code 0)
7. `render-review` - UNPERFORMED (exit code 1, crew host constraints)
8. `check:content` - PASS (all 13 gates pass, exit code 0)
9. `measure-figure-text` - PASS (all 56 variants clean, exit code 0)

## Handoff

- Content repairs from round 2 are completely verified and resolved; figure text geometry across all 56 SVG variants passes cleanly.
- A visual review session with browser tooling enabled should complete live 360px viewport and A4 print view inspection.
- Tasks tracker updated with advisory escalate row; G3 status remains `▢` (open, unsigned, ADR-0019).
