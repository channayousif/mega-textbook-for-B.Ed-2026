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

## Remaining activation work

Provision a protected signing host and CI public-key trust root; conduct and record actual
G3/G5 qualification for specific configurations/scopes; enable signed registry entries;
operate trusted tracker transitions and the every-fifth-unit audit schedule. These cannot be
replaced with synthetic test outcomes or inferred from permission to merge code.
