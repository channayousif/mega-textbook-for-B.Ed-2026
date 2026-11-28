# Limitations - EFPG-402 Unit 4 G3 review (run 2)

## Rendered input identity: unavailable

The crew brief prohibits `npm run build`, a dev server and Playwright, and permits
`scripts/render-inspect.mjs` only against `https://textbook.com.pk`. The production site is not the
reviewed input at this commit:

- Deployed SHA (`~/deploy/deployed-sha`): `b7b7e00c9a8640158b8d336ba1215e4fcfed01e9`
  (deploy.log: deployed 2026-11-28T07:15:36Z).
- HEAD: `b2dc2715255b31026bf257e58e451ecbf983d001` (merge of PR #956, 2026-11-28 12:32:18 +0500;
  deploy.log shows it still holding for CI at review time).
- `git diff --quiet b7b7e00c9a8640158b8d336ba1215e4fcfed01e9 HEAD -- docs/semester-4/efpg-402/unit-04/ static/img/figures/efpg-402/unit-04/`
  exits 1. Eight files differ: topic-01.mdx, topic-03.mdx, topic-04.mdx, unit-assessment.mdx,
  fig-U4-2.svg, fig-U4-2.dark.svg, fig-U4-2.ur.svg, fig-U4-2.ur.dark.svg.

Because the live pages and figure assets are not byte-identical to the reviewed inputs,
`render-review` is recorded as unavailable (exit 1) and no rendered PNG is claimed for this run.
Visual accessibility (narrow 360px layout, table scrolling, A4 print, figure clipping) remains
unverified for the repaired bytes. Structural accessibility and SVG text geometry pass from source:
`measure-figure-text.mjs` exits 0 on all 40 unit SVGs, and `check:figures`, `check:svg-style` and
`check:no-em-dash` exit 0.

Changed images can be served stale for up to 30 days, so a missing or mismatched asset would be
unverified rather than a content defect; here the whole unit input is stale, so no render claim is
made at all.

## Other limits

- G3 reviews the English unit only. The Urdu mirror, the `.ur.svg` labels and the UR render were
  not reviewed (G5 scope). The `.ur.svg` variants were checked only for consistency with the
  repaired English figure.
- Source checks fetched the live NCC PDF (74 pages, HTTP 200) and the Khan et al. (2019) article
  (15 pages, HTTP 200). The retrieved files are scratch under `.crew/` and are not committed; the
  evidence folder holds the extracted passages, retrieval facts and SHA-256 in `source-checks/`.
- `render-inspect.mjs` Section D still fetches `.svg` variants for raster illustrations, so even a
  matching deploy would exit 1 on fig-U4-12..16. That tooling limitation is separate from, and
  additional to, the stale-input limitation recorded here.
- This report is advisory. No protected signing host, reviewer registry entry or qualification
  record was used, so it cannot certify G3 or support a tracker done state.
