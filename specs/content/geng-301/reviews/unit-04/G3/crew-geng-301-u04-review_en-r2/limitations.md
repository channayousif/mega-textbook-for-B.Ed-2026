# GENG-301 Unit 4 G3 cycle 2 - limitations

- **Render and print inspection was not performed.** The crew brief permits
  `scripts/render-inspect.mjs` against the production host only when the production build is the
  reviewed input, which requires `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD` over the
  unit English directory and figure folder to exit 0. It exits 1:

  - deployed SHA: `366019f8ace647e892523e553b81ab6d1832ec68`
  - HEAD: `6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e`
  - changed paths: `docs/semester-2/geng-301/unit-04/index.mdx`, `topic-01.mdx`, `topic-02.mdx`,
    `topic-03.mdx`, `static/img/figures/geng-301/unit-04/fig-U4-7.webp`, `fig-U4-8.webp`,
    `fig-U4-9.webp`, `fig-U4-10.webp`

  So the CI-built production site is not this submission and was not inspected. The brief also
  forbids `npm run build`, a dev server and the Playwright e2e suite for a review job, so no local
  render was produced as a substitute. `render-review` is recorded as unavailable (exit 1) in
  `logs/render-review.txt`. Narrow-viewport scrolling, A4 print clipping and visual accessibility of
  the current bytes remain unverified. Structural checks (heading order, alt text, manifest
  consistency, SVG glyph geometry) were run from source and pass. Changed images can be served stale
  for up to 30 days, so a missing or mismatched asset is treated as unverified, not as a content
  defect.
- **No parent-prepared frozen handoff was supplied.** The manifest was prepared locally over a
  clean tree with `node scripts/review-evidence.mjs prepare GENG-301 4 G3` and re-verified against a
  fresh `inputManifest()` computation: 106 inputs, 0 only-in-either-side, 0 value mismatches,
  `dirtyInputs` 0 (`logs/input-verification.txt`). The report's `input_manifest` is that map.
- **Author identity is partial.** The reviewed bytes were authored by the GENG-301 all-units
  authoring job (`history/prompts/general/0106-author-geng-301-expository-writing-all-units.general.prompt.md`)
  and last revised by the illustration job `agy:crew-geng-301-u04-illustrate:2026-11-26`
  (`history/prompts/geng-301/crew-geng-301-u04-illustrate.misc.prompt.md`). `author_run_id` names
  the most recent of the two; no run identity is authenticated by a signature.
- **No new external retrieval was attempted.** The four print monographs (`zinsser2006`,
  `rosenwasser2012`, `axelrod2016`, `faigley2015`) remain unretrieved, and this review did not
  re-attempt them. The bound accessible source is `writing2015` (Writing for Success, chapter 10),
  whose extract is in `specs/content/geng-301/sources/texts/writing2015.md` and supports the
  classification, cause and effect, process and comparison rows. It does not verify the print
  works.
- **This is the second and final repair/review cycle under ADR-0019.** No further unchanged-input
  retry is permitted, so the render limitation is escalated rather than re-requested.
- **Advisory only.** This report does not certify the unit, sign anything, append a tracker row,
  change `translation_status`, alter the reviewer registry or publish. The advisory tracker row
  text is provided in `advisory-tracker-row.md` for the parent to append.
