# EFMP-408 Unit 6 G3 r2 - limitations

- Render and print inspection was not performed. The deployed SHA
  `074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD
  `83b5dd5ec49f76485d3c9b8ae6e603b2de834eb5` on `docs/semester-4/efmp-408/unit-06/topic-01.mdx`,
  `topic-02.mdx`, `unit-assessment.mdx` and five unit-06 SVGs, so the CI-built production site
  is not the reviewed input. `render-review` is recorded as unavailable (exit 1) in
  `logs/render-review.txt` and `render-verify/render-verify.txt`. Narrow-viewport scrolling,
  A4 print clipping and visual accessibility of the current bytes remain unverified; the
  structural checks (heading order, alt text, manifest consistency, glyph geometry) pass from
  source. Changed images can be served stale for up to 30 days, so a missing or mismatched
  asset is treated as unverified, not as a content defect.
- No parent-prepared frozen handoff or runtime provenance was supplied. The manifest was
  prepared locally over a clean tree with `node scripts/review-evidence.mjs prepare EFMP-408 6
  G3` and re-verified against a fresh `inputManifest()` computation (105 inputs, 0 mismatches).
  The author identity is taken from `history/prompts/efmp-408/crew-efmp-408-u06-author.green.prompt.md`.
- The Urdu mirror and the `.ur.svg` variants are G5 scope. The repair edits were spot-checked
  for parity (MCQ key, RRQ 6 and 9 demand, TIMSS removal, HEC citation removal) but were not
  reviewed as Urdu content, and they are not in the G3 manifest.
- No new external retrieval of NTS, NEAS, TIMSS, PISA, STEDA, FPSC, SEF, PEAC, CIE, IB or the
  HEC PDFs was attempted. External-body facts are accepted as declared under
  `no-external-source` and escalated in `specs/gaps.md`; they remain unverified.
- `specs/gaps.md` and `specs/decisions/log.md` are not in the G3 manifest. `specs/gaps.md`
  was read as the escalation record for `G-2026-236`; no decision ruling is cited in this
  report, so no `rulings` block is recorded.
- This is the second and final repair/review cycle under ADR-0019. No further unchanged-input
  retry is permitted, so the render limitation is escalated rather than re-requested.
- Advisory only. This report does not certify the unit, sign anything, append a tracker row,
  change `translation_status`, alter the reviewer registry or publish.
