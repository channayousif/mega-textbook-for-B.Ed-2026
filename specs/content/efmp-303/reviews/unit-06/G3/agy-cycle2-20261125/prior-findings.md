# Prior findings verified against the current files

Review input: branch `crew/efmp-303-u06-review_en-r1` at HEAD
`5a14660cb91f1f66e7f24ddceaad8e042fa64673`.
Latest prior report:
`specs/content/efmp-303/reviews/unit-06/G3/20261102T140729Z-g3-desk-218f29ab.json`
(disposition pass, reviewer CMY) based on `20261018T200000000Z.json` (LongCat-2.0).
This is the second and last ADR-0019 cycle. The placement of illustration assets
`fig-U6-7.webp`, `fig-U6-8.webp`, `fig-U6-9.webp`, and `fig-U6-10.webp` postdates that report,
so a fresh G3 run was required.

## Prior report findings (20261018T200000000Z.json & 20261102T140729Z-g3-desk-218f29ab.json)

| # | Severity | Prior state | Verification at HEAD | State now |
|---|---|---|---|---|
| 1 | advisory | fig-U6-2.svg has cosmetic wordmark collision (pre-existing on main, commit 1923d99d; not a new defect). | `node scripts/measure-figure-text.mjs` exits 0 across all SVGs. `fig-U6-2.svg` is 780x540, text ends at 768.4, wordmark at 675.7; height expansion resolved the contact. | Resolved |
| 2 | advisory | Further reading sections list Khan (2018) which content-spec replaced with gem-report2020 (unresolvable). Only in Further reading, not inline citations; does not affect source verification but is inconsistent with content-spec. | Still present at `topic-01.mdx:111`, `topic-02.mdx:123`, and `topic-03.mdx:121` under Further reading ("Khan, A. (2018). *Education Policy and Planning in Pakistan.*"). | Unresolved, carried as advisory |

## New findings and observations at HEAD

| # | Severity | Description | State now |
|---|---|---|---|
| 3 | uncertain | Render-review unavailable (exit 1): production build differs from reviewed input (deployed SHA `7ca7b21298e4f5c59211b816273bd968a9799271` vs HEAD `5a14660cb91f1f66e7f24ddceaad8e042fa64673` across unit prose and 4 illustration assets). Local build/server/browser runs prohibited by host limits and brief. Visual accessibility unverified. | Unresolved, drives escalate disposition |
| 4 | advisory | MCQ option key clustering: 9 of 10 keys are option (B) (`unit-assessment.mdx:138-147`: items 1-9 are B; item 10 is A). Advisory: shuffle distractor positions in a future maintenance pass. | Advisory observation |

## Carried forward

1. Advisory: Further reading sections list Khan (2018) which content-spec replaced with gem-report2020 (unresolvable). Supplementary reading only, does not affect inline citation verification.
2. Advisory: MCQ option key clustering (9 of 10 keys remain option B). Distractor positions should be shuffled in a future maintenance pass.
3. Uncertain: Visual accessibility unverified due to production build staleness and host execution constraints.
