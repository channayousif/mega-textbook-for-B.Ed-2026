# Limitations - EFMP-408 Unit 6 G3 (r1)

1. **Manifest prepared locally.** No dispatcher-supplied frozen handoff was provided. The
   bundle was prepared with `node scripts/review-evidence.mjs prepare EFMP-408 6 G3` over a
   clean tree and independently re-verified against a fresh `inputManifest()` computation
   (105 inputs, 0 mismatches, `logs/input-verification.txt`). The author identity is taken from
   `history/prompts/efmp-408/crew-efmp-408-u06-author.green.prompt.md` (`agy`, branch
   `crew/efmp-408-u06-author`); the reviewer identity is this crew run. Exact deployment
   versions are not exposed by the host.

2. **Render input identity.** The deployed SHA equals HEAD
   (`7fb77de68f5d59bbc507e85c07a892a3cbf93eca`) and the unit English directory and figure folder
   are identical between the two, so the production build is the reviewed input. All nine
   distinct image assets were additionally fetched from `https://textbook.com.pk` and are
   byte-identical to the repository. If the deploy had differed, `render-review` would have been
   recorded as unavailable.

3. **`render-inspect` exit code is 1.** Four defects are listed. Two are the tool's documented
   lazy-load timing false positive (resolved by `logs/render-followup.txt`); two are the
   `fig-U6-5` title geometry advisory. The exit code is reported as 1 in the report's `commands`
   because that is the real exit code of the recorded run.

4. **Urdu mirror is out of G3 scope.** `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/`
   and the `.ur.svg` / `.ur.dark.svg` variants are present but are G5 inputs; this English review
   did not evaluate them. The `.ur.svg` files are not in the G3 manifest.

5. **External re-retrieval not repeated.** The bound source excerpts and the bound HEC guide
   texts were read as committed. No new HTTP retrieval of the HEC PDFs, the NPSTP record or any
   external body (NTS, NEAS, TIMSS, PISA, STEDA, FPSC) was attempted, so the external-body facts
   are recorded as unverified rather than confirmed or refuted.

6. **Deterministic gates are tree-wide.** `check:content` and the six cited gates run over the
   whole repository; their exit 0 is necessary but not sufficient for the semantic criteria,
   which were assessed by reading the unit and its bound sources. `check:content` passed on this
   tree and reported no finding in Unit 6 scope.

7. **Advisory only.** This report does not certify the unit, sign anything, append a tracker
   row, change `translation_status`, alter the reviewer registry, or publish. Acceptance needs a
   trusted detached signature and a qualified registry entry, neither of which exists here.
