# Limitations - EFMP-408 Unit 3 G3 (cycle 2)

1. **Render and print inspection not performed.** The crew brief prohibits
   `npm run build`, a dev server and Playwright, and the production site is not
   the reviewed input: the deployed SHA
   `7fb77de68f5d59bbc507e85c07a892a3cbf93eca` differs from HEAD
   `467e2a0876a783e4c8649e4aad7f476f0ccf330a` on `topic-01.mdx`, `topic-02.mdx`,
   `topic-03.mdx`, `topic-04.mdx` and `unit-assessment.mdx`. `render-review` is
   recorded as unavailable (exit 1). Narrow-view (360px) scrolling, desktop
   layout, A4 print and figure clipping remain unverified. Changed images can be
   served stale for up to 30 days, so a missing or mismatched asset is treated as
   unverified, not as a content defect.

2. **No parent-prepared frozen handoff or runtime identities were supplied.** The
   manifest was prepared locally with `scripts/review-evidence.mjs prepare` over a
   clean tree and verified against a fresh `inputManifest()` computation (104
   inputs, 0 missing, 0 extra, 0 digest mismatches). The author identity is taken
   from the repair PHR (`claude:crew-efmp-408-u03-repair_en`), not from a
   dispatcher-supplied run record. The reviewer identity is this crew run. Exact
   deployment versions are not exposed by the host.

3. **Urdu mirror is out of G3 scope.** `i18n/ur/.../efmp-408/unit-03/` (7 files)
   and the `.ur.svg` figure variants are present but are G5 inputs. The repair's
   Urdu edits were spot-checked for parity (3 formative items per topic, the RRQ
   band line, the rebuilt MCQ 10) but not reviewed.

4. **External re-retrieval not repeated.** The bound source excerpts were read as
   committed. No new HTTP retrieval of the HEC PDF or the Seifert textbook was
   attempted in this session.

5. **Deterministic gates are tree-wide.** `check:content` and the cited gates run
   over the whole repository; their exit 0 is necessary but not sufficient for the
   semantic criteria, which were assessed by reading the unit and its bound
   sources.

6. **The approved content-spec is frozen.** No spec edit was made or proposed by
   this review.

7. **Second and final cycle.** ADR-0019 allows at most two repair/review cycles
   per stage. This is the second. No further unchanged-input retry is permitted,
   so the render limitation is escalated rather than re-requested.
