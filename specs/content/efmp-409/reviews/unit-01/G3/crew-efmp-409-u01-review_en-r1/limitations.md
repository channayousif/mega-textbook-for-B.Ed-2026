# EFMP-409 Unit 1 G3 r1 - limitations

- Render and print inspection was not performed. The deployed SHA
  `074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD
  `5533bee27c33bae4cdd87405b7051d2e4ee1aa92` on `docs/semester-4/efmp-409/unit-01/index.mdx` and
  `static/img/figures/efmp-409/unit-01/fig-U1-5.webp`, so the CI-built production site is not the
  reviewed input. `render-review` is recorded as unavailable (exit 1) in `logs/render-review.txt`
  and `render-verify/render-verify.txt`. Narrow-viewport scrolling, A4 print clipping and visual
  accessibility of the current bytes remain unverified; the structural checks (heading order, alt
  text, manifest consistency, glyph geometry) pass from source. Changed images can be served stale
  for up to 30 days, so a missing or mismatched asset is treated as unverified, not as a content
  defect. The only commit in range touching the unit is `6039a0ef9` (the illustrate job that added
  the banner); the two topic pages, the assessment and the teacher notes are byte-identical to the
  deployed build.
- No parent-prepared frozen handoff or runtime provenance was supplied. The manifest was prepared
  locally over a clean tree with `node scripts/review-evidence.mjs prepare EFMP-409 1 G3` and
  re-verified against a fresh `inputManifest()` computation (95 inputs, 0 mismatches). The author
  identity is taken from `history/prompts/efmp-409/`: the prose was authored on
  `crew/efmp-409-u01-author` and the index banner was added on `crew/efmp-409-u01-illustrate`.
- The Urdu mirror and the `.ur.svg` variants are G5 scope and are not in the G3 manifest. This review
  did not read them as content.
- Etymonline served a JavaScript and cookie challenge to the reviewer's fetch, so that entry was
  verified from the bound note rather than the live page. The QMMB, Curren, OpenStax, Susanti and
  NEP 2009 sources were re-read live or from the bundled PDF.
- `specs/gaps.md` and `specs/decisions/log.md` are not in the G3 manifest. No decision ruling is
  cited in this report, so no `rulings` block is recorded.
- This is the first G3 review of this unit. The render limitation is escalated rather than
  re-requested, because the input bytes are unchanged and a retry would seek a pass on the same
  bytes.
- Advisory only. This report does not certify the unit, sign anything, append a tracker row, change
  `translation_status`, alter the reviewer registry or publish.
