# Validation record

Date: 2026-09-12. These are engineering and skill-behavior checks, not academic qualification.

## Evidence enforcement

`node --test tests/review/*.test.mjs`: 17 passed, 0 failed, 0 skipped.
Temporary test keys and synthetic records were used only inside disposable fixture directories.
No production key was generated or provisioned, and no reviewer registry entry was activated.

Covered: complete signed path, stale/added inputs, exact lifecycle normalization, forged
signature, tampered/revoked registry, absent trust root, altered qualification evidence,
author/reviewer collision, missing/duplicate/unverified criteria, failed commands and changed
logs, unresolved findings, G5's accepted G3 dependency, English changes, English-only scope,
and invalid tracker identities.

## Independent behavior exercise

A fresh agent loaded review-unit v1.0.0 and the two synthetic excerpt fixtures in
`tests/review/behavior-fixture/`. It received no expected answer or suspected defect.

- G3 identified that the correct exit-ticket answer is B, while the supplied key is A.
- G5 identified that the Urdu changed "does not always" to "always", reversing the meaning.
- G5 also identified the carried-over incorrect answer key.
- Both stages escalated full-unit acceptance because the manifest, authority, signed G3,
  full source materials, command outputs and rendered evidence were not supplied.
- The agent disclosed that its initial combined read exposed the answer key, so the required
  solve-before-reading-key sequence was not established. No independence claim was fabricated.

This exercise demonstrates useful defect detection and truthful limits. It does not satisfy
ADR-0019's owner-labelled held-out qualification or model/configuration approval requirement.
The registry remains empty; live agent certification is blocked.

## Post-merge hardening (2026-09-12)

Three defects found while reviewing the merged implementation, all fixed and covered by tests.
None could have produced a false pass; the first two blocked activation, the third reopened a
Spec 013 drift path.

1. **Manifest was not reproducible.** `inputManifest` walked the working tree, so any untracked
   file under a bound root entered the digest. Reproduced against the live repo: an untracked
   PDF under `Scheme-and-Course-guides/` made a local manifest 116 inputs where a clean
   checkout gives 115, so a locally prepared report could never validate in CI. Enumeration now
   reads git's index; `prepare` refuses a modified, staged or untracked bound input by name;
   a non-git checkout is rejected. Two consecutive `prepare` runs now produce byte-identical
   manifests, and the digest set is down to the 105 committed inputs.
2. **Script binding was too wide.** All 23 files under `scripts/` were hashed, so an unrelated
   edit invalidated every accepted report and re-blocked the pipeline gate for every certified
   unit. The manifest now binds the cited validators plus their transitive relative imports
   (13 files); a missing entry point is a hard error rather than a silent shrink.
3. **`test:review` ran only in CI.** `check-docs-sync.mjs` asserted FULL_GATES subset-of CI in
   one direction only, so the new step passed silently and `npm run check:all` no longer matched
   CI. The assertion is now bidirectional against an explicit `CI_ONLY` allowlist, which also
   caught `figures:variants:check`, `check:no-service-key` and `serve` as pre-existing drift.
   FULL_GATES is 13 gates and `npm run check:all` passes end to end.

`node --test tests/review/*.test.mjs`: 21 passed, 0 failed. Fixtures are now real git
repositories, and four new cases cover manifest reproducibility, committed-file coverage,
the narrowed script closure and the non-git rejection. Review skill at v1.1.0.

## Remaining activation work

Provision a protected signing host and CI public-key trust root; conduct and record actual
G3/G5 qualification for specific configurations/scopes; enable signed registry entries;
operate trusted tracker transitions and the every-fifth-unit audit schedule. These cannot be
replaced with synthetic test outcomes or inferred from permission to merge code.
