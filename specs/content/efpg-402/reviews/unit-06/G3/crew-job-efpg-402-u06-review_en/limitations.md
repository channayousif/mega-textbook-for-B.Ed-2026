# Limitations: G3 Review of EFPG-402 Unit 6

Reviewer run ID: `crew-job:efpg-402-u06-review_en`
Date: 2026-11-28 (UTC)

## Rendered visual inspection limitation

The crew brief and the host resource rules prohibit `npm run build`, a local development server,
and local Playwright/Chromium runs on the shared production host. The brief directs:

> "For the rendered-page and print evidence, inspect the production build (CI-built from main) and
> never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this
> unit's English dir> static/img/figures/efpg-402/unit-06/` exits 0, run
> `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 6 --base https://textbook.com.pk
> --no-pdf`, record its log and PNGs ... as the `render-review` command evidence, and cite the
> deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your
> input: record `render-review` as unavailable and name the deployed SHA and HEAD."

Facts recorded on 2026-11-28:

- Deployed commit (`~/deploy/deployed-sha`): `fb0d38996a8231c160e8d1104c7c5a6935022911`
- Reviewed HEAD: `d103b2448df417cf34c30c95c362e103d962b2fc`
- `git diff --stat` on the unit's English directory and figure directory reports:
  - `docs/semester-4/efpg-402/unit-06/index.mdx` (2 insertions placing `fig-U6-13.webp`)
  - `docs/semester-4/efpg-402/unit-06/topic-01.mdx` to `topic-06.mdx` (each replaces an
    `{/* FIGURE[...] */}` prompt marker with a `<Figure>` element for `fig-U6-14` to `fig-U6-19`)
  - `static/img/figures/efpg-402/unit-06/fig-U6-13.webp` to `fig-U6-19.webp` (seven new rasters)

Because the deployed build does not contain these changes, `https://textbook.com.pk` is not the
input for this commit. `render-review` is recorded as unavailable (exit code 1). The following
visual checks remain unverified: 360px small-screen layout, content-table scrolling, A4 print
views, figure clipping, and reading order as rendered.

Structural accessibility was checked from source and passes: every `<Figure>` carries descriptive
alt text; every SVG carries `role="img"`, `aria-labelledby`, `<title>` and `<desc>`; headings and
tables are semantic; the index uses descriptive link text. `scripts/heavy.sh node
scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-06/*.svg` exits 0 across all 48
SVG variants in the unit figure directory (24 English light/dark and 24 Urdu light/dark), with no
viewBox overflow, no wordmark overprint and no overlapping or spilling text.

Changed images can be served stale for up to 30 days, so a missing or mismatched asset on the live
site would be unverified rather than a content defect; no such defect is inferred here.

## Source verification limitation

The `sources` criterion rests on the bound source excerpt in
`specs/content/efpg-402/sources/texts/ncp-science-2022.md` and on the three sources declared under
`## Unverifiable sources` in `specs/content/efpg-402/sources/unit-06.md`. To distinguish "the source
has no laboratory-management content" from "the excerpt is incomplete", the full published PDF
(74 pages, 19,606,893 bytes) was downloaded from the cited URL on 2026-11-28 and searched with
`pdftotext` and `grep`; the search log is saved under `source-checks/`. The PDF is not committed.
No bound excerpt exists for `cpsc-niosh-2006`, `minhas-2025-lab` or `kochhar-science`, so their
claims remain unverified.

## Identity and independence

- Reviewer run ID: `crew-job:efpg-402-u06-review_en` (this session).
- Author run ID: `crew-job:efpg-402-u06-author` (recorded in
  `history/prompts/efpg-402/crew-efpg-402-u06-author.green.prompt.md`).
- Model: Claude Code, model identity LongCat-2.5; exact deployment version unavailable.
- The reviewer did not author, translate or illustrate the reviewed bytes. No reviewer initials,
  signature, registry entry, tracker row or acceptance is produced by this report.
