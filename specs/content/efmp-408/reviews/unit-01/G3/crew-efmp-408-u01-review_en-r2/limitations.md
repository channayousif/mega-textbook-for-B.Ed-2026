# Limitations - EFMP-408 Unit 1 G3 (cycle 2)

1. **Render and print inspection not performed.** The crew brief prohibits `npm run build`, a dev
   server and Playwright, and the production site is not the reviewed input: the deployed SHA
   `7d1ba965530b409ac8e425d07bf86ec24930310d` differs from HEAD
   `7fb77de68f5d59bbc507e85c07a892a3cbf93eca` on `docs/semester-4/efmp-408/unit-01/topic-01.mdx`,
   `topic-02.mdx`, `topic-03.mdx` and `unit-assessment.mdx`. `render-review` is recorded as
   unavailable (exit 1). Narrow-view (360px) scrolling, desktop layout, A4 print and figure
   clipping remain unverified. Changed images can be served stale for up to 30 days, so a missing
   or mismatched asset is treated as unverified, not as a content defect.

2. **No parent-prepared frozen handoff or runtime identities were supplied.** The manifest was
   prepared locally with `scripts/review-evidence.mjs prepare` over a clean tree and verified
   against a fresh `inputManifest()` computation (100 inputs, 0 missing, 0 extra, 0 digest
   mismatches, 0 dirty bound inputs). The author identity is taken from the authoring and repair
   PHRs (`agy:crew-efmp-408-u01-author`, `claude:crew-efmp-408-u01-repair_en`), not from a
   dispatcher-supplied run record. The reviewer identity is this crew run. Exact deployment
   versions are not exposed by the host.

3. **Urdu mirror is out of G3 scope.** `i18n/ur/.../efmp-408/unit-01/` (6 files) and the `.ur.svg`
   figure variants are present but are G5 inputs; this English review did not evaluate them.

4. **External re-retrieval not repeated.** The bound source excerpts were read as committed. No new
   HTTP retrieval of the HEC PDFs, the Scheerens book or the NPSTP record was attempted in this
   session; the Scheerens text remains unread under its `D-2026-0001` declaration.

5. **Deterministic gates are tree-wide.** `check:content` and the cited gates run over the whole
   repository; their exit 0 is necessary but not sufficient for the semantic criteria, which were
   assessed by reading the unit and its bound sources.

6. **The approved content-spec is frozen.** The Unit 1 `Mapped readings` line
   (`content-spec.md:100`) still omits `npstp-2009`; the repair added the key to the unit's sources
   and coverage but could not edit the approved spec. Recorded as an advisory finding for the
   owner, not repaired by this review.

7. **Second and final cycle.** ADR-0019 allows at most two repair/review cycles per stage. This is
   the second. No further unchanged-input retry is permitted, so the render limitation is
   escalated rather than re-requested.
