# Limitations: G3 Review of EFPG-402 Unit 2

Reviewer run ID: `1947560f-ec6d-49d7-86e1-0c8e0c563ccb`
Date: 2026-11-28

## Render tool false positive

The crew brief permits `scripts/render-inspect.mjs` against the production build and prohibits a
local build, dev server or Playwright run. The deployed SHA `00ac8dbb5ee318db7387243e2b3b92aed650ae8c`
matches HEAD `e29224ece005924eae6038b8fe42c236d1c66fd4` for `docs/semester-4/efpg-402/unit-02/`
and `static/img/figures/efpg-402/unit-02/`, so the live site is the reviewed input.

`render-inspect` sections A (desktop), B (narrow) and C (A4 print) are clean: no broken or
missing images, no missing alt text, no document overflow at 360px, no clipped print elements,
and the answers section renders. Section D (SVG text geometry) exited 1 with ten defects, all of
the form `fig-U2-12: variant light not served` to `fig-U2-16: variant .dark not served`. Those
five figures are `Kind: illustration` WebP rasters with no SVG variants; the script requests
`<id>.svg` for every placed figure. The defects are a tool limitation, not a content defect.
Because the contract requires `render-review` to exit 0 for a pass, visual accessibility is
recorded `unverified` and the exit code is reported as 1.

## Provenance

No parent-prepared frozen handoff was supplied. The input manifest was prepared locally with
`node scripts/review-evidence.mjs prepare EFPG-402 2 G3 <dir>` at HEAD
`e29224ece005924eae6038b8fe42c236d1c66fd4`. The author run identity is the Unit 2 authoring
commit `5d85468c72977804305edf866ba720f47fc6ccb8`; the unit was later changed by figure-placement
commits `8e4a8e10`, `5e79389e` and `128542c8`. No runtime author identity or reviewer
qualification is certified.

## Source verification

The bound excerpt `specs/content/efpg-402/sources/texts/ncp-science-2022.md` is the manifest
evidence. For the source check the full published PDF was downloaded to `.crew/ncp-science.pdf`
(not committed) and searched with `pdftotext -layout`; the commands and results are recorded in
`source-checks/ncp-science-2022-unit-02-search.txt`. The Sindh DCAR curriculum and the Kochhar,
Aggarwal and Bruner monographs remain declared under `## Unverifiable sources`
(`D-2026-0001`); no claim in this report rests on them alone.

## Scope

English Unit 2 only. The Urdu mirror, the G5 stage and the figure-production pipeline are out of
scope. No content, tracker, registry, translation-status or publication state was changed.
