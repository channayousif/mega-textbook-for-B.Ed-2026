# Limitations - EFMP-301 Unit 4 G3 cycle 2

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, a dev server and Playwright, and permits
`scripts/render-inspect.mjs` only against the production site. The reviewed input is
HEAD `98fbbb0647d5e2c6040059edcaaccc1317b620a1`; the deployed SHA is
`dc60264d97702a5e9488670b1802651e21ee91eb`. The unit's English directory and five
figure assets differ between the two, so the live site is stale and is not this
review's input. `render-review` is recorded as unavailable (exit 1); no browser or
print inspection was run. Consequences:

- Visual accessibility (360px layout, table scrolling, A4 print, figure clipping) is
  unverified. Structural accessibility (heading order, descriptive Figure alt text,
  SVG `role="img"` with `aria-labelledby`, `<title>` and `<desc>`) passes from source.
- The five changed raster figures (fig-U4-1, 7, 8, 9, 10 `.webp`) are unverified as
  served; a missing or mismatched asset would be a deployment staleness matter, not a
  content defect.

## Deterministic figure geometry

`node scripts/measure-figure-text.mjs` exits 0 on all 24 SVGs in the unit directory.
It reports two cosmetic wordmark collisions on `fig-U4-5.ur.svg` and
`fig-U4-5.ur.dark.svg` (a panel edge overlaps the wordmark by 86.3 x 3.0 px). The
tool classifies these as reported, not failed. Recorded as advisory; the English
variants are clean.

## Identity

The reviewer is a fresh Claude crew session that did not author or translate the
reviewed bytes. The authoring run is identified by the latest commit that changed
the English unit, `commit:d212d7590`. No reviewer initials are used and no signature
is applied.
