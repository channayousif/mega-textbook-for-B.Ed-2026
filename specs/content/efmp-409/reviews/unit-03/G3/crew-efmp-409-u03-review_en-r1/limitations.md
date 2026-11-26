# EFMP-409 Unit 3 G3 r1 - limitations

- Render and print inspection was not performed. The deployed SHA
  `074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD
  `895cc30bc6b9edbc87b56365f50f479c8939d049` on `docs/semester-4/efmp-409/unit-03/index.mdx` and
  `static/img/figures/efmp-409/unit-03/fig-U3-13.webp`, so the CI-built production site is not the
  reviewed input. `render-review` is recorded as unavailable (exit 1) in `logs/render-review.txt`
  and `render-verify/render-verify.txt`. The brief forbids a build, a dev server or the Playwright
  e2e suite from a review job. Narrow-viewport scrolling, A4 print clipping and visual
  accessibility of the current bytes remain unverified; the structural checks (heading order,
  figure alt text, `desc` equals `alt`, glyph geometry) pass from source. Changed images can be
  served stale for up to 30 days, so a missing or mismatched asset is treated as unverified, not as
  a content defect. The deployed build last touched the unit in `c44b5fa54` (the G4 Urdu
  translation); HEAD last touched it in `a87e56c25` (the banner placement).
- No parent-prepared frozen handoff or runtime provenance was supplied. The manifest was prepared
  locally over a clean tree with `node scripts/review-evidence.mjs prepare EFMP-409 3 G3` and
  re-verified against a fresh `inputManifest()` computation (113 inputs, 0 mismatches). The author
  identity is taken from `history/prompts/efmp-409/`: the prose was authored on
  `crew/efmp-409-u03-author` and the index banner was added on `crew/efmp-409-u03-illustrate`.
- The Urdu mirror and the `.ur.svg` variants are G5 scope and are not in the G3 manifest. This
  review did not read them as content.
- The Stanford Encyclopedia entries were re-read live on 2026-11-26. They are philosophy entries,
  not education entries, so they do not carry the curriculum, habituation and developmental-stage
  detail the unit teaches; that detail is attributed in prose to the named primary works. The
  Cheddadi article was not fetched in full; its bound note records the Crossref record and the
  Chapter 6 details, and the DOI resolves.
- `specs/gaps.md` and `specs/decisions/log.md` are not in the G3 manifest. No decision ruling is
  cited in this report, so no `rulings` block is recorded.
- This is the first G3 review of this unit. The render limitation is escalated rather than
  re-requested, because the input bytes are unchanged and a retry would seek a pass on the same
  bytes.
- Advisory only. This report does not certify the unit, sign anything, append a tracker row, change
  `translation_status`, alter the reviewer registry or publish.
