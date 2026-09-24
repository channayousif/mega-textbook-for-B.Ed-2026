# G3 English review summary - EFMP-302 Unit 5 (feat023 cycle 1)

- **Report**: `specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json`
- **Disposition**: **pass** (advisory; not certification - no signed qualification exists)
- **Reviewer**: `agent:g3-reviewer`, run `agent-g3-efmp302-u5-feat023-r1`, model LongCat-2.0
- **Author run**: `commit:bb21d67`; inputs bound by `feat023-r1/manifest.json` (107 paths, verified
  107/107 against the recomputed bundle, zero mismatches)
- **Reviewed**: 2026-09-24, fresh session with no authorship/translation role in this content

## Criteria

All seven pass: `authority`, `sources`, `coverage`, `assessment`, `accessibility`,
`readability`, `pedagogy`.

## The three run-007 blocking findings

1. **hennessy2022 declaration - VERIFIED REPAIRED** (44bc1d7). `sources/unit-05.md` now states
   "Level of support: abstract only", names the three claims topic-03 draws, and reconciles with
   the content-spec's "Abstract read 2026-09-15". The prose draws exactly those three claims and
   states the review's scope limit at the point of use; judged per D-2026-0001 the declaration is
   honest and complete.
2. **RRQ 9 below the blueprint floor - VERIFIED REPAIRED** (44bc1d7). Now tagged (Understand)
   with an added explain clause taught directly in topic-04, rebalanced from 9 to 7 marks
   (3 names + 2 examples + 2 explanation). The RRQ floor "Understand to Analyze" is met.
3. **ERQ rubric columns unreachable at 360px - REFUTATION CONFIRMED**. Re-measured the `<table>`
   itself per the G3 reference: all five rubric tables are their own scroll containers (client
   328, scroll 473-542) with `tabindex="0"`, `role="region"` and an aria-label; scrolling brings
   the "Strong (4-5)" column fully into view in every table. Run-007 had measured the wrapping
   `div.theme-doc-markdown`.

## Figure-geometry verification (the b8f8ffe regression)

Measured independently over all 8 figures in both EN theme variants (16 SVG documents, 478 text
elements): **zero text-on-text superposition and zero wordmark collision**. No two text boxes
intersect at all; minimum clearances are 2.53px vertical (fig-U5-2), 26.06px horizontal
(fig-U5-5) and 10.44px to the wordmark (fig-U5-5), so glyph ink intersection is geometrically
impossible. The files contain zero `<tspan>` elements (the regression's vehicle) and are
byte-identical to the pre-b8f8ffe state (`git diff b8f8ffe~1 HEAD` over the figure directory is
empty). `measure-figure-text.mjs` alone passes all 16 as well, but the overlap checks above are
what close the gate blind spot it has.

## Commands (all exit 0, logs under `logs-feat023-r1/`)

`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`,
`check:no-answer-keys`, `check:docs-sync`, `check:concept-graph`, `site-build` (both locales),
`render-review` (fresh build served and inspected at desktop/360px/A4 print), and three
reviewer-authored geometry measurements (`figure-text-overlap`, `figure-gap-margins`,
`figure-a11y`). 66 evidence files hashed in the report, including rendered PNGs of every page,
every figure in both themes, and A4 print PDFs.

## Open findings: 13 advisories, nothing blocking or uncertain

Carried from runs 001-007 and re-verified live: blooms_summary understates the Apply counts;
figures manifest says "three flowcharts" but names two; the content-spec seam gloss
("first three / last three") misdescribes the owner-confirmed partition; concepts/unit-05.md
undercounts banked Urdu labels (Teacher Burnout is already banked); ten bare-URL further-reading
links; fig-U5-7's footer claim absent from prose; the teacher-notes collective-pressure
cross-reference; the no-external-source row omitting U5-07; the isore2009 U5-07 reinforcement
mapping overreach; "low student motivation" not in the bound skaalvik excerpt; RRQ 2's "where
was conducted" wording; the stale closing note in the hargreaves2000 excerpt.

New this run: **SLO:EFMP-302-5-2 is referenced by five unit files and the concept graph but is
defined nowhere in the content-spec**, whose Unit 5 section lists only SLO:EFMP-302-5-1; every
other unit defines both of its SLO IDs. Traceability metadata only - the outcome scope itself is
recorded under 5-1's parenthetical, no gate validates clo_refs, and nothing learner-facing
renders the ID.

## Boundary

This report is advisory. It does not certify the unit, mark the gate done, or change any tracker
row, `translation_status`, registry or rubric. Acceptance requires the protected signing host and
qualified registry that ADR-0019 describes, which are not provisioned.
