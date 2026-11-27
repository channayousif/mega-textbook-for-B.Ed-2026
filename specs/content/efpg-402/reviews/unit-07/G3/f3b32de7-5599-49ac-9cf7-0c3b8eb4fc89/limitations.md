# Limitations: G3 Review of EFPG-402 Unit 7

Reviewer run ID: `f3b32de7-5599-49ac-9cf7-0c3b8eb4fc89`
Date: 2026-11-27 (UTC)

## Rendered visual inspection limitation

The crew brief and the host resource rules prohibit `npm run build`, a local development server,
and local Playwright/Chromium runs on the shared production host. The brief directs:

> "For the rendered-page and print evidence, inspect the production build (CI-built from main) and
> never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this
> unit's English dir> static/img/figures/efpg-402/unit-07/` exits 0, run
> `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 7 --base https://textbook.com.pk
> --no-pdf`, record its log and PNGs ... as the `render-review` command evidence, and cite the
> deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your
> input: record `render-review` as unavailable and name the deployed SHA and HEAD."

Facts recorded on 2026-11-27:

- Deployed commit (`~/deploy/deployed-sha`): `9d45720686522bf6f9cb5678852f14e29eb5b08f`
- Reviewed HEAD: `8a962478456e763a24f6cccfbc7961d0651300ae`
- `git diff --stat` on the unit's English directory and figure directory reports:
  - `docs/semester-4/efpg-402/unit-07/index.mdx` (2 insertions placing `fig-U7-11.webp`)
  - `static/img/figures/efpg-402/unit-07/fig-U7-11.webp` (new 129896-byte raster banner)

Because the deployed build does not contain these changes, `https://textbook.com.pk` is not the
input for this commit. `render-review` is recorded as unavailable (exit code 1). The following
visual checks remain unverified: 360px small-screen layout, content-table scrolling, A4 print
views, figure clipping, and reading order as rendered.

Structural accessibility was checked from source and passes: every `<Figure>` carries descriptive
alt text; every SVG carries `role="img"`, `aria-labelledby`, `<title>` and `<desc>`; headings and
tables are semantic. `scripts/heavy.sh node scripts/measure-figure-text.mjs
static/img/figures/efpg-402/unit-07/*.svg` exits 0 across all 40 SVGs (no viewBox overflow, no
wordmark overprint, no overlapping or spilling text).

Changed images can be served stale for up to 30 days, so a missing or mismatched asset on the live
site would be unverified rather than a content defect; no such defect is inferred here.

## Source verification limitation

The `sources` criterion rests on the bound source excerpts in
`specs/content/efpg-402/sources/texts/`. For the National Curriculum of Pakistan 2022-23 Science
progression grid, the bound excerpt contains no assessment content. To distinguish "the source has
no assessment content" from "the excerpt is incomplete", the full published PDF (74 pages,
19,606,893 bytes) was downloaded from the cited URL on 2026-11-27 and searched with `pdftotext`
and `grep`; the search log is saved under `source-checks/`. The PDF is not committed. No other
bound source in the unit's bundle covers assessment theory; `aggarwal-science` and
`dcar-science-4-8` are declared unretrievable in `specs/content/efpg-402/sources/unit-07.md`.

## Identity and independence

- Reviewer run ID: `f3b32de7-5599-49ac-9cf7-0c3b8eb4fc89` (this session).
- Author run ID: `crew-job:efpg-402-u07-author` (recorded in
  `history/prompts/efpg-402/crew-efpg-402-u07-author.green.prompt.md`).
- Model: LongCat-2.5.
- The reviewer did not author or translate the reviewed bytes. No reviewer initials, signature,
  registry entry, tracker row or acceptance is produced by this report.
