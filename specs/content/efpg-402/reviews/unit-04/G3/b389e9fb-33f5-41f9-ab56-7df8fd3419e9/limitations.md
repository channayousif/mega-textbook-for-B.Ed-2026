# Limitations - EFPG-402 Unit 4 G3 review

## Rendered input identity

The review inspected the production site, not a local build. The crew brief prohibits
`npm run build`, a dev server and Playwright e2e, and permits `scripts/render-inspect.mjs` only
with `--base https://textbook.com.pk`.

- Deployed SHA (`~/deploy/deployed-sha`): `00ac8dbb5ee318db7387243e2b3b92aed650ae8c`
- HEAD: `e29224ece005924eae6038b8fe42c236d1c66fd4`
- `git diff --quiet 00ac8dbb5 HEAD -- docs/semester-4/efpg-402/unit-04 static/img/figures/efpg-402/unit-04/`
  exits 0, so the live unit pages and figure assets are byte-identical to the reviewed inputs.
- Command: `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 4 --base https://textbook.com.pk --no-pdf --out <evidence>/renders`
- Artifacts: `renders/render-inspect.log`, `renders/render-inspect.json`, `renders/desktop-*.png`,
  `renders/narrow360-*.png` (seven pages each).

## render-review exited 1 on a tooling limitation, not a content defect

`render-inspect.mjs` exited 1 with ten defects, all of the form `fig-U4-12..16: variant light /
.dark not served`. Section D (SVG text geometry) iterates every placed figure from the manifest
and unconditionally fetches `<id>.svg` and `<id>.dark.svg`. Figures fig-U4-12 to fig-U4-16 are
`Kind: illustration` raster `.webp` files with no SVG variants, so those fetches return HTTP 404.

Section A (desktop 1280x900) loaded all five WebP illustrations successfully (HTTP 200, natural
1344x756 or 1200x675, shown=true) and reported no visible broken image and no unserved asset.
Sections A, B (narrow 360x780) and C (A4 print 794px) otherwise found no hard defect: heading
order clean, alt text present on every image, document horizontal overflow 0px, every wide table
scrolls inside its own container with `tabindex="0"` and an aria-label, no clipped element, all
figures fit the A4 width, and the answers and marking guidance section renders.

This is the known limitation recorded in `specs/intelligence/daily/2026-11-20.md` (C1) and seen in
other units with raster illustrations. The exit code is recorded as 1; accessibility is therefore
`unverified` for a machine pass even though the inspected views were clean.

## Other limits

- G3 reviews the English unit only. The Urdu mirror, the `.ur.svg` labels and the UR render were
  not reviewed (G5 scope).
- Source checks fetched the live NCC PDF and the Khan et al. (2019) article. The retrieved files
  were read for the review but are not committed; the evidence folder holds the extracted
  passages and retrieval facts in `source-checks/`.
- `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-04/*.svg`
  exited 0 across all 40 SVGs (10 English pairs and 10 Urdu pairs): no text past a viewBox, no
  wordmark overprint.
- This report is advisory. No protected signing host, reviewer registry entry or qualification
  record was used, so it cannot certify G3 or support a tracker done state.
