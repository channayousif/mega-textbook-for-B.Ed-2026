# Limitations: G3 Review of EFPG-402 Unit 2 (cycle 2)

Reviewer run ID: `681bd02b-fb43-4e03-a737-f56e7497cb33`
Date: 2026-11-28

## Render review unavailable

The crew brief permits `scripts/render-inspect.mjs` against the production build only when the
deployed SHA matches HEAD for this unit's English directory and figure assets, and prohibits a
local build, dev server or Playwright run.

- deployed SHA: `b7b7e00c9a8640158b8d336ba1215e4fcfed01e9`
- HEAD: `b2dc2715255b31026bf257e58e451ecbf983d001`
- `git diff --quiet <deployed> HEAD -- docs/semester-4/efpg-402/unit-02/ static/img/figures/efpg-402/unit-02/` exits 1.

The differing paths are exactly the cycle-1 repairs: `topic-02.mdx`, `topic-03.mdx`,
`topic-04.mdx`, `unit-assessment.mdx`, `fig-U2-3.svg`, `fig-U2-3.dark.svg`, `fig-U2-3.ur.svg`
and `fig-U2-3.ur.dark.svg`. The production build therefore does not contain the bytes under
review, so it is not a valid render input. `render-review` is recorded unavailable with
`exit_code` 1 and the identity check is logged in `logs/render-review.txt`. Visual accessibility
is `unverified`; structural accessibility was checked from source (16 `Figure` markers, all with
`alt`; heading order h1 to h3 with no skipped level; 40 SVGs measured clean).

The run-1 WebP `.svg`-variant tool limitation is unchanged and was not re-encountered because the
tool was not run.

## Provenance

No parent-prepared frozen handoff was supplied. The input manifest was prepared locally with
`node scripts/review-evidence.mjs prepare EFPG-402 2 G3 <dir>` at HEAD
`b2dc2715255b31026bf257e58e451ecbf983d001` (114 inputs). The author run identity is the reviewed
HEAD commit, which includes the cycle-1 repairs. No runtime author identity or reviewer
qualification is certified.

## Source verification

The bound excerpt `specs/content/efpg-402/sources/texts/ncp-science-2022.md` is the manifest
evidence. For this check the full published PDF was downloaded to `.crew/r1/ncp-science.pdf`
(not committed) and searched with `pdftotext -layout`; the commands and results are recorded in
`source-checks/ncp-science-2022-unit-02-search.txt`, with the two deciding pages rendered to
`source-checks/ncp-science-p17.png` and `source-checks/ncp-science-p19.png`. The Sindh DCAR
curriculum and the Kochhar, Aggarwal and Bruner monographs remain declared under
`## Unverifiable sources` (`D-2026-0001`); no blocking finding rests on them alone. The Bruner
quotation wording was checked against the bound Seifert excerpt in another course's source tree.

## Cycle limit

ADR-0019 allows at most two repair-and-review cycles per stage per submission. This is the second
G3 cycle for Unit 2. Any further cycle requires the owner's authorization recorded in
`specs/decisions/log.md`.

## Scope

EFPG-402 Unit 2 English content, its Urdu mirror, its `specs/content/efpg-402/` rows and its
figure assets. The G4/G5 stages, the figure-production pipeline and publication state are out of
scope. No content, tracker, registry, translation-status or publication state was changed.
