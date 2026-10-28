# GNAS-301 Unit 1 independent G3 advisory review (Cycle 2)

Disposition: **escalate**. Content repairs from round 2 were verified and confirmed resolved (mangrove forest world ranking claim in `abbas2012.md`, teacher notes sequencing cross-reference in `unit-teacher-notes.mdx`, UN Decade paraphrase in `topic-02.mdx`, descriptive Further reading links across all four topics, course overview credit hours split, and topic-01 figure deixis). However, visual browser and print inspection is unperformed due to job brief execution restrictions, and 10 figure text geometry defects were identified across four SVG figures requiring graphics adjustment. This is an advisory review under ADR-0019; it does not certify the unit.

Reviewed commit: `f88db171eafda4e13966a5f5aa8c69f139faefef` (repair commit `fd9f857a`). Reviewer run: `12ce2621-624d-4c79-bf71-dbaccdf17ac2`. Author run: `commit:fd9f857a` (repair author). Reviewer is `agent:g3-reviewer` using model `Gemini 3.8 Flash (High)`. Fresh session; independent reviewer.

## Review findings

### 1. Visual inspection limitation (tooling restriction)
- Visual browser and print inspection (360px small-screen viewport, table scrollability, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright (`render-review` exit code 1).
- Structural accessibility checks pass from source: alt text is descriptive across all 8 figures, heading hierarchy is well-formed, link text is descriptive, and zero em dashes were found.
- Full G3 certification requires visual inspection on a live build under permitted browser tooling.

### 2. SVG figure text geometry defects (uncertain / advisory)
- Running `node scripts/measure-figure-text.mjs static/img/figures/gnas-301/unit-01/*.svg` identifies 10 text geometry issues across 4 SVGs (light and dark variants of `fig-U1-2`, `fig-U1-3.ur`, `fig-U1-6`, and `fig-U1-8`):
  1. `fig-U1-2.dark.svg` and `fig-U1-2.svg`: text "One Sindh classroom example" spills 21.4px out of panel `[30,56,750,96]`.
  2. `fig-U1-3.ur.dark.svg` and `fig-U1-3.ur.svg`: text "مسائل (رنگین تیر)" overprints the wordmark (ends at x=180, wordmark starts at x=12).
  3. `fig-U1-6.dark.svg` and `fig-U1-6.svg`: text "withdrawals already highly stressed" / "stay below renewal: quotas" overlaps by 11.2px; text "Management response" spills 7.7px out of panel `[26,50,754,88]`.
  4. `fig-U1-8.dark.svg` and `fig-U1-8.svg`: text "In the community" / "name the local issue and its" overlaps by 4.8px.
- These defects require SVG text adjustments in a separate graphics repair job before certification.

### 3. Excerpt support note heading (advisory)
- In `specs/content/gnas-301/sources/texts/who-water-2023.md:18`, the heading reads `## What this supports in GNAS-301 Unit 2`, though lines 23-25 explicitly document Unit 1's Topic 1.3 (U1-06) usage for the over-2-billion water-stressed population figure. The heading was retained to avoid invalidating Unit 2's G2 evidence closure. When Unit 2 evidence is refreshed, the heading should be made unit-neutral.

### 4. Verification of prior round-2 findings
- **Mangrove forest ranking claim (RESOLVED)**: In `specs/content/gnas-301/sources/texts/abbas2012.md:22-23`, the abstract excerpt now includes "The Indus delta region contains the world's fifth-largest mangrove forest", and lines 27-30 explicitly declare that Topic 1.3 (U1-05) cites this source for the fifth-largest ranking claim. Verified against `topic-03.mdx:50-53`.
- **Teacher notes sequencing (RESOLVED)**: `unit-teacher-notes.mdx:21-23` now accurately connects Topic 1.3's ecosystem map and resource-rate debate to Topic 1.4's opening situation without self-referential or invalid practicum claims.
- **UN Decade paraphrase (RESOLVED)**: `topic-02.mdx:68-69` aligns with the bound excerpt ("revive damaged ecosystems").
- **Descriptive links in Further reading (RESOLVED)**: Bare-URL link texts across all four topics have been replaced with descriptive Markdown links.
- **Course overview credit split (RESOLVED)**: `docs/semester-1/gnas-301/course-overview.mdx:5,15` aligns with catalog and spec `3 (2-1)`.
- **Figure deixis (RESOLVED)**: `topic-01.mdx:89` correctly reads "The figure above gathers the four spheres...".

## Evaluated criteria summary

- **Authority (`pass`)**: Course guide (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:193-231`) Weeks 1-2 outline covers all seven subtopics (1.1-1.4, 2.1-2.3) mapped 1:1 to U1-01 through U1-07. Content-spec approved (D-2026-0020, G-2026-22, G-2026-23, D-2026-0021). Assessment weighting follows course-specific 30/50/10/10 distribution.
- **Sources (`pass`)**: All cited excerpts verified against bound texts. Key claims (99% air pollution WHO 2024, 2 billion water-stress WHO 2023, 1 million species biodiversity WHO 2025, Indus Delta mangroves Abbas 2012, Indus Basin water management Archer 2010) are faithfully bound. Haines & Frumkin and Clark & Henderson declared under `## Unverifiable sources` per D-2026-0001.
- **Coverage (`pass`)**: All 7 subtopics taught in depth under dedicated ### headings. Est reading minutes total 81 (inside 65-85 depth budget). All 5 planned misconceptions addressed.
- **Assessment (`pass`)**: Exactly 10 MCQs, 10 RRQs, and 5 ERQs. Independently solved; derived MCQ keys (1-b, 2-c, 3-a, 4-d, 5-c, 6-b, 7-b, 8-d, 9-a, 10-a) match supplied key with balanced distribution. RRQ marking criteria clear and objective. ERQ rubrics analytic with Bloom tags (Analyze, Evaluate, Create). Bounded answers section isolated.
- **Accessibility (`unverified`)**: Source checks pass (alt text, heading hierarchy, descriptive links, zero em dashes). Live browser/print render inspection unperformed due to job brief limits. Measure-figure-text reports 10 text geometry issues across 4 figures.
- **Readability (`pass`)**: Accessible tone for HSC graduates; key terms wrapped with `<Glossary>` on first use; clear Pakistani examples (cup of tea, Karachi air, Keenjhar Lake, Thar coal, Sindh groundwater).
- **Pedagogy (`pass`)**: Full 9-part learning cycle in all four topics; feasible classroom activities with grouping and time guidance; extensive teacher notes.

## Deterministic gate commands

1. `validate:content` - PASS (exit code 0)
2. `check:depth-gate` - PASS (exit code 0)
3. `check:figures` - PASS (exit code 0)
4. `check:no-em-dash` - PASS (exit code 0)
5. `check:no-answer-keys` - PASS (exit code 0)
6. `check:docs-sync` - PASS (exit code 0)
7. `render-review` - UNPERFORMED (exit code 1, crew host constraints)
8. `check:content` - PASS (all 13 gates pass, exit code 0)
9. `measure-figure-text` - FAIL (exit code 1, 10 text-geometry issues across 4 SVGs)

## Handoff

- An SVG figure repair pass is required to adjust text positioning in `fig-U1-2`, `fig-U1-3.ur`, `fig-U1-6`, and `fig-U1-8` so that `measure-figure-text.mjs` exits 0.
- A visual review session with browser tooling enabled should complete live 360px viewport and A4 print view inspection.
- Tasks tracker updated with advisory escalate row; G3 status remains `▢` (open, unsigned, ADR-0019).
