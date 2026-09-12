# Feature 014: Independent content review

**Status**: Approved for implementation by owner instruction, 2026-09-11: "enable the agents and merge".
**Decision**: ADR-0019; Constitution v3.0.0 Articles III.2 and VII.

## Scope

Install callable G3/G5 reviewers and evidence tooling. Agent-assisted review is available
immediately; automatic completion is enabled only for a qualified, signed registry entry.
Qualification results and protected signer provisioning cannot be inferred from this approval.

## Requirements

- FR-001: Fresh independent reviewer sessions use one stage-specific rubric and frozen inputs.
- FR-002: G3 covers authority, sources, coverage, assessment, accessibility, readability and pedagogy.
- FR-003: G5 covers authority, sources, coverage, assessment, accessibility, completeness,
  semantics, terminology, register and RTL. It depends on accepted G3 for the same English inputs.
- FR-004: Reports record actual evidence, commands, identities, input digests and disposition.
- FR-005: Reports and qualification registry require detached Ed25519 signatures for automatic
  acceptance, verified against an externally configured public key. The author/reviewer never
  receives the private key. Missing provisioning or qualification fails closed.
- FR-006: The pipeline's latest agent tracker row references the signed report. Agent-like
  identities cannot satisfy ordinary draft-stage checks or masquerade as human initials.
- FR-007: New or modified inputs invalidate reports; exact manifests include dependency files.
- FR-008: Existing human reviews retain their path. No content is retroactively auto-approved.
- FR-009: Provide unit fixtures for stale evidence, signature spoofing, identity collision,
  omitted criteria, skipped commands, G3 dependency and disabled registry.
- FR-010: A skill's validity or synthetic test pass is not academic reviewer qualification.

## Success criteria

1. Both reviewer agents are discoverable and can produce independent review findings.
2. All negative evidence fixtures fail, and a complete signed fixture can pass.
3. Missing signer/qualification cannot produce an accepted agent gate.
4. Existing CI remains green and developer instructions describe real activation state.

## Out of scope

No background model scheduler, payment change, prose rewrite, automatic merge by reviewers,
or modification to existing human decisions. Live qualification requires real evaluated results.
