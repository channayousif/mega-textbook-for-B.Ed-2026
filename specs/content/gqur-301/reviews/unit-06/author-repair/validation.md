# Validation of author repairs

- Baseline: clean HEAD and origin/main both `20ccd090b7ce0d21b80e2162f86a44b8e4a78802`; all 14 content gates passed (content-main.log).
- Initial edited run: stale Unit 6 G2 manifest, missing bound PBS excerpt and stale derived content-status report (content-initial.log). Every failure was read and repaired within the unit's records, plus regeneration of the ignored status report.
- Fresh committed-input G2 evidence: G2/20261105T130949430Z-gates.json; all eight required draft checks passed, with individual command logs. Unit 6 G2 reference repointed; G3 remains unticked and advisory.
- Final npm run check:content: all 14 gates passed (content-final.log), no baseline or new failures remain.
- scripts/heavy.sh npm test: 31 files and 368 tests passed (unit-tests.log retains the result footer; full transient output in .crew/unit-tests.log).
- node scripts/build-figure-variants.mjs --check: 1134 figures current. Changed figure SVGs parse as XML; alt, manifest and descriptions agree. No browser geometry or render claim.
- Node calculation checked against Python Decimal working for the new assessment data; no numerical discrepancy remains.
- git diff --check and changed-file prohibited-punctuation scan passed.

No build, development server, Playwright, Chromium, push or PR was run. Under the explicit crew prohibition the required Chromium-based geometry command remains for the next authorised host, together with narrow-screen and A4 inspection. Authority and historical provenance remain owner/reviewer matters, not repaired content claims.
