# Limitations - EFMP-408 Unit 1 G3 (r1)

1. **Render and print inspection not performed.** The crew brief prohibits `npm run build`, a dev
   server and Playwright, and the production site is not the reviewed input: the deployed SHA
   `3910d26161b35a1faf18ce848fd50ab0b4cf59f7` differs from HEAD
   `7bb9e4d484428859cbfe2f6e3775c0e8291b11ea` on `docs/semester-4/efmp-408/unit-01/index.mdx` and
   `static/img/figures/efmp-408/unit-01/fig-U1-4.webp`. `render-review` is recorded as unavailable
   (exit 1). Narrow-view (360px) scrolling, desktop layout, A4 print and figure clipping remain
   unverified. Changed images can be served stale for up to 30 days, so a missing or mismatched
   asset is treated as unverified, not as a content defect.

2. **No parent-prepared frozen handoff or runtime identities were supplied.** The manifest was
   prepared locally with `scripts/review-evidence.mjs prepare` over a clean tree and verified against
   a fresh `inputManifest()` computation (99 inputs, 0 mismatches). The author identity is taken from
   the authoring PHR `history/prompts/efmp-408/crew-efmp-408-u01-author.green.prompt.md`
   (`agy`, branch `crew/efmp-408-u01-author`), not from a dispatcher-supplied run record. The
   reviewer identity is this crew run. Exact deployment versions are not exposed by the host.

3. **Urdu mirror is out of G3 scope.** `i18n/ur/.../efmp-408/unit-01/` (6 files) and the `.ur.svg`
   figure variants are present but are G5 inputs; this English review did not evaluate them.

4. **External re-retrieval not repeated.** The bound source excerpts were read as committed. No new
   HTTP retrieval of the HEC PDFs, the Scheerens book or the NPSTP record was attempted in this
   session; the Scheerens text remains unread under its `D-2026-0001` declaration.

5. **Deterministic gates are tree-wide.** `check:content` and the six cited gates run over the whole
   repository; their exit 0 is necessary but not sufficient for the semantic criteria, which were
   assessed by reading the unit and its bound sources.
