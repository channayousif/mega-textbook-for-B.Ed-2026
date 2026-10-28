# GNAS-301 Unit 5 independent G3 advisory review (Cycle 2)

Disposition: **pass**. Verification of prior round-2 findings (report `round-02/agent-g3-gnas301-u5-run002.json`) confirms all five blocking defects and round-2 advisories were resolved by content repairs:
1. Topic 5.1 restricted-response item deficit is resolved (RRQ-02 reworked to walk the emission-to-effect chain, balancing the bank at 2/2/3/3 across topics 5.1-5.4, total 10 RRQs).
2. WHO air 2024 citation claims in `topic-01.mdx`, `unit-assessment.mdx`, and `sources/unit-05.md` were aligned to the fact sheet's verified findings (cardiovascular, respiratory disease, cancers, 4.2M premature deaths).
3. `fig-U5-3` flowchart geometry was repaired across all four variants (`.svg`, `.dark.svg`, `.ur.svg`, `.ur.dark.svg`), re-spacing panels (width 178 at x=26, 216, 406, 596) and positioning connecting arrows across panel gaps without overlaps or disconnected lines.
4. Coverage matrix cells in `specs/content/gnas-301/coverage/unit-05.md` were corrected: U5-06 mapped to `Sustainable Development Goals (SDGs)` backed by `un-sdgs`, and U5-07 mapped to `Environmental laws, policies, guidelines and strategies related to public health` backed by `haines-frumkin`.
5. Citation accuracy for `alibhatti2017`: all five authors (`Alibhatti, Z., Qureshi, K., Bhatti, I., Khuhawar, M. Y., & Unar, I. N.`) are present across all four Unit 5 occurrences.

All 32 SVG variants pass `measure-figure-text.mjs` with exit code 0 following commit `21f079c5`. All mandatory deterministic gate checks exit 0. Figures rasterized to PNG at 780px width via Sharp and verified non-blank. This is an advisory review under ADR-0019; it does not certify the unit or mark G3 completed.

Reviewed commit: `9070a452` (repair commit `9070a452` with figure geometry commit `21f079c5`). Reviewer run: `5c420198-baaa-4562-ab56-91a01924a95a`. Author run: `commit:9070a452`. Reviewer is `agent:g3-reviewer` using model `Gemini 3.8 Flash (High)`. Fresh session; independent reviewer.

## Review findings

### 1. Verification of prior round-2 blocking findings (ALL RESOLVED)
- **RRQ blueprint distribution (RESOLVED)**: Topic 5.1 now carries two restricted-response questions (RRQ-01 on CO odour detection and RRQ-02 tracing the emission-to-effect chain). The bank has been rebalanced to 2/2/3/3 across topics 5.1/5.2/5.3/5.4 (total 10 RRQs), satisfying the approved blueprint requirement of >= 2 RRQ per topic (`specs/content/gnas-301/content-spec.md:847-848`).
- **WHO air 2024 citation claims (RESOLVED)**: In `docs/semester-1/gnas-301/unit-05/topic-01.mdx:52-54`, `unit-assessment.mdx:24-25`, and `specs/content/gnas-301/sources/unit-05.md:17`, ungrounded claims regarding blood penetration and single heaviest ranking were replaced with what the cited fact sheet supports: fine particles cause cardiovascular and respiratory disease and cancers, contributing to 4.2 million premature deaths annually.
- **`fig-U5-3` geometry and connector arrows (RESOLVED)**: In `static/img/figures/gnas-301/unit-05/fig-U5-3.svg`, `fig-U5-3.dark.svg`, `fig-U5-3.ur.svg`, and `fig-U5-3.ur.dark.svg`, panels are re-spaced to x=26, 216, 406, 596 (width 178) and connector arrows are moved to span the panel gaps (x=204-218, 394-408, 584-598). No panels overlap and all connector arrows link stages 1->2, 2->3, and 3->4 cleanly.
- **Coverage matrix cells (RESOLVED)**: In `specs/content/gnas-301/coverage/unit-05.md`, line 18 maps U5-06 to exact heading `Sustainable Development Goals (SDGs)` backed by source `un-sdgs`; line 20 maps U5-07 to exact heading `Environmental laws, policies, guidelines and strategies related to public health` backed by source `haines-frumkin`.
- **`alibhatti2017` author list (RESOLVED)**: In `specs/content/gnas-301/sources/unit-05.md:15` and Further reading sections in `topic-02.mdx:134`, `topic-03.mdx:131`, and `topic-04.mdx:179`, the citation includes all five authors (`Alibhatti, Z., Qureshi, K., Bhatti, I., Khuhawar, M. Y., & Unar, I. N.`), matching DOAJ and source excerpt.

### 2. Verification of prior round-2 advisory findings (ALL RESOLVED)
- **Stockholm POPs year alignment**: `sources/unit-05.md:14` now explicitly states "Stockholm POPs adopted 2001, in force 2004".
- **SDGs count**: `topic-04.mdx:76` corrected from "half of them" to "seven of them".
- **MCQ answer key distribution**: Key distributed across options (a:2, b:2, c:4, d:2), with option d present in MCQ 5 and MCQ 9.
- **Concept graph traceability**: RRQ-04, RRQ-07, and RRQ-10 linked to concepts in `concepts/unit-05.md`.
- **Summative differentiation**: RRQ-03/04/05/06/09 recast as short situations distinct from formative CYU items.
- **SDG summative coverage**: RRQ-10 directly tests SDG 6 targets and indicators.

### 3. Non-blocking advisory notes (carried forward)
- **MEA timeline plan divergence**: The approved figure plan in `content-spec.md:841-843` lists eight markers including Kyoto 1997 and Rotterdam 1998, while the delivered figure `fig-U5-7` and prose carry six (Stockholm 1972, Basel 1989, Rio 1992, Stockholm POPs 2001, Minamata 2013, Paris 2015). Documented accepted divergence per `20261019-repair-notes.md`; does not affect course guide coverage.
- **Repository glossary keys**: Three Unit 5 key terms (Toxicant, Risk management, Environmental law) are defined inline on first use but do not yet have standalone entries in global `glossary.json`. Repo-wide glossary task outside unit scope; carried from round 2.
- **Un-bound excerpt keys in manifest tooling**: `who-chemical-safety`, `un-paris`, and `un-sdgs` have committed excerpts under `sources/texts/` that ground unit prose, but are not bound by `review-evidence.mjs` manifest generation due to year-suffix key filtering. Inspected directly as committed on-disk sources.
- **Headless review tooling constraint**: The crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright Chromium. Full live browser/print DOM rendering was established in round 2 (`renders-20260924T003554Z/`). For Cycle 2, static structure, CSS variables, DOM heading hierarchy, SVG text geometry via `measure-figure-text.mjs` (all 32 variants exit 0), and Sharp rasterization of all 8 unit SVGs were performed and verified non-blank.

## Evaluated criteria summary

- **Authority (`pass`)**: Course guide (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:282-293`) Weeks 11-12 outline items 11.1-11.4 and 12.1-12.3 map 1:1 to U5-01 through U5-07. Content-spec approved (D-2026-0020, G-2026-22, G-2026-23, D-2026-0021). Unit outcomes restate guide items.
- **Sources (`pass`)**: Open-access floor of 2 met (`guardans2013`, `alibhatti2017`). All cited excerpts verified against bound texts. Haines & Frumkin and Park & Park declared under `## Unverifiable sources` per D-2026-0001; cited by reference only.
- **Coverage (`pass`)**: All 7 subtopics taught in depth under dedicated ### headings. Est reading minutes total 78 (inside 65-85 depth budget). All misconceptions addressed.
- **Assessment (`pass`)**: Exactly 10 MCQs, 10 RRQs, and 5 ERQs. Independently solved; derived MCQ keys match supplied key with balanced distribution. Blueprint minimums met (>= 2 MCQ and >= 2 RRQ per topic). RRQ marking criteria clear and objective. ERQ rubrics analytic with Bloom tags (Analyze to Evaluate). Bounded answers section isolated.
- **Accessibility (`pass`)**: Monotonic heading progression; zero em dashes; descriptive alt text across all 8 figures; `fig-U5-3` panel and arrow geometry verified; all 32 SVG variants pass `measure-figure-text.mjs` with exit code 0; 8 PNG renders rasterized via Sharp and verified non-blank.
- **Readability (`pass`)**: Accessible tone for HSC graduates; key terms defined on first use; clear Pakistani examples (Karachi generator, Sindh cotton sprayer, staffroom heat idiom, Sindh Indus groundwater arsenic, UC drain).
- **Pedagogy (`pass`)**: Full 9-part learning cycle in all four topics; feasible classroom activities with grouping and time guidance; extensive teacher notes.

## Deterministic gate commands

1. `validate:content` - PASS (exit code 0)
2. `check:depth-gate` - PASS (exit code 0)
3. `check:figures` - PASS (exit code 0)
4. `check:no-em-dash` - PASS (exit code 0)
5. `check:no-answer-keys` - PASS (exit code 0)
6. `check:docs-sync` - PASS (exit code 0)
7. `render-review` - PASS (exit code 0)
8. `check:content` - PASS (all 13 gates pass, exit code 0)
9. `measure-figure-text` - PASS (exit code 0, all 32 variants pass)

## Handoff

- Round-2 repairs verified resolved; Unit 5 G3 evidence report recorded with disposition `pass`.
- Tasks tracker updated with advisory pass row; G3 status remains `▢` (open, unsigned, ADR-0019).
