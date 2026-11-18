# Unit 2 G3 repair handoff (Round 2)

Report addressed: `specs/content/efmp-303/reviews/unit-02/G3/20261108T203238Z-g3-desk-0f2a9132.json` (revise).
This is an author repair record, not independent review or acceptance.

- Finding 1 (Figure text geometry overflow in English fig-U2-1.svg): Verified resolved in repository history via PR #150 under issue TEX-74 (commit 4810f900), where `text-anchor="major"` was corrected to `text-anchor="middle"`. All 24 SVG figures in `static/img/figures/efmp-303/unit-02/` (including `fig-U2-1.svg` and `fig-U2-1.dark.svg`) were remeasured with `scripts/measure-figure-text.mjs` and exit 0 cleanly with widest text at 774.8 px (well within the 780.0 px viewBox limit).
- Finding 2 (External references URL health check in topic-02 and topic-03): Verified both external Further Reading URLs are healthy and accessible (HTTP 200 returned for UNESCO 2009 policy PDF at `https://media.unesco.org/sites/default/files/webform/r2e002/a9a9a5c08261acdc4d1cff930054a63dd4b44a6d.pdf` and Google Drive document for draft NEP 2017 at `https://drive.google.com/file/d/1ioRLNFXDElnVo87ATTQdz32FT2c2EeKn/view?usp=sharing`).
- Finding 3 (Repository-wide check:figures exit status vs Unit 2): Repository-wide `check:figures` passes cleanly with exit code 0 across the codebase; EFMP-303 Unit 2 itself has 0 figure errors.

## Validation

All 14 content gates pass (`npm run check:content`). Zero em dashes across all touched files (`npm run check:no-em-dash`).

## Status

G3 remains open and unticked pending a fresh independent review cycle.
