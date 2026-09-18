# ADR-0025: Provisional publication on agent review

- **Status:** Accepted (owner instruction 2026-09-18: "a review agent must be capable enough to
  decide and make the content live with final review pending status")
- **Date:** 2026-09-18
- **Feature:** none (cross-cutting; content review governance)
- **Constitution:** 4.0.0 -> 4.1.0 (MINOR). New Article VII section 7.
- **Supersedes in part:** ADR-0023 section 3. Closes ADR-0023 Alternative C.

## Context

`check:pipeline-gate` was red across EFMP-302 Units 2-6 for the whole of measurement run 002, and
the question raised was whether the review agents needed to be more capable. They did not. The
investigation found the opposite on every point.

Eight of nine gates pass. Only `check:pipeline-gate` fails, and it never inspects content; it
checks attestation. The reviewer is not weak either: both Unit 2 G3 attempts reached `escalate`
with 12 and 13 unresolved blocking findings, and caught a fabricated Ehrich et al. attribution
and a false NACTE claim, repaired in `3bdedbf`, `a377bc4` and `cc9d811`.

The blockage was plumbing, in two places.

1. `validateAgentTrackerRow` refused agent identity for draft stages outright. Five of the ten
   failing rows were `G2 en-draft`. No agent, however capable, could ever close them.
2. The other five routed through `acceptReport` -> `signedJson`, which fails on its first line:
   `CONTENT_REVIEW_PUBLIC_KEY is not provisioned`. The variable is unset, no `.sig` file exists,
   `specs/reviewers/registry.json` is `{"reviewers": []}`, and there is no qualification
   evidence. Feature 014 T007 and T008 are unstarted.

A more capable reviewer fixes zero of the ten rows. The verdict had nowhere to go.

ADR-0023 section 3 chose this state deliberately, and its Consequences section predicted the
complaint word for word: *"`check:pipeline-gate` stays red across the course for the duration, so
the gate stops being a signal and becomes noise for anything else in flight."* Its Alternative C
deferred the fix until *"the comparator base has grown, which this decision incidentally
causes."* Units 2-6 with real G3 output are that growth.

## Decision

1. **Split publication from certification.** The gate had been conflating "is this unit certified
   complete" with "may this unit be visible". The tracker already separates them - `G7 publish`
   is its own stage and the gate deliberately skips `G1`/`G6`/`G7` - so the split is recognised,
   not invented.
2. **A third tracker status, `\U0001F7E1`, meaning agent-reviewed and published, final review
   pending.** It is explicitly not a done mark, which is what keeps Article VII section 6
   literally satisfied. `stageState` reports it as `provisional`, and a provisional unit stays in
   the human review queue.
3. **`acceptProvisionalReport` accepts an unsigned report**, requiring everything the signed path
   does except the trust root: full schema validation, a `pass` disposition, a fresh input
   manifest, a matching skill digest and genuine distinct run identities. `acceptReport` is not
   modified, so the signed path keeps its exact strictness.
4. **G2 closes on deterministic gate evidence with no reviewer identity at all**, under the token
   `auto:gates`. "Does a draft exist at standard" is machine-checkable; only G3 needs judgement.
5. **Every page of a provisional unit displays "Final Review Pending"**, rendered by the theme
   from tracker-derived state so it cannot be forgotten on a file or disagree with the gate.

## Alternatives considered

**A. Make the review agents more capable.** Rejected because it fixes nothing: the G2 rows have no
agent path at any capability level, and the G3 rows fail before judgement is consulted.

**B. Finish ADR-0019 section 5 activation first.** The right long-run answer and still the target.
It needs T007, T008, a fixture set with seeded faults, a held-out qualification run and an owner
signature. Unavailable now, and this decision grows the comparator base it needs.

**C. Relax the gate to accept unsigned agent rows as done.** Rejected. It deletes the control in
Article VII section 5 at the moment it first binds, and it would make a provisional unit
indistinguishable from a certified one in every downstream consumer.

**D. Leave it red and audit once at the end (ADR-0023 status quo).** Rejected by the instruction,
and on its merits: a permanently red gate is not a gate.

**E. Chosen: publish provisionally under notice, certify later.** Content becomes useful as it
clears review; the certification bar is untouched; the reader is told exactly what they have.

## Consequences

### Positive

- The gate becomes a signal again, and goes green per unit as each earns a `pass`.
- Readers get content months earlier, with an honest statement of its status.
- `prepare-gate-evidence.mjs` is the first tooling that runs the gates and records their logs;
  that work was previously done by hand by the reviewer agent.
- Every provisional unit is a real comparator case, which is what Feature 014 T008 needs.

### Negative

- **The advisory/authoritative line erodes further.** ADR-0023 already warned that *"a reviewer
  consulted often and never overruled starts to function as an approver."* This tier gives that
  reviewer a publication button. The `\U0001F7E1`-is-not-`✅` distinction and section 5's audit
  obligation are the only things holding the line, and they hold only if kept.
- An agent reviewing units against a standard is not reviewing whether the standard is right.
  Nothing here catches a systematic error in the style guide.
- Provisional content is publicly visible. The banner discloses the risk; it does not remove it.

## References

- Owner instruction: 2026-09-18, this session
- Constitution Article VII, new section 7
- Supersedes ADR-0023 section 3; closes its Alternative C
- Related: ADR-0019 (delegated review permitted), ADR-0021 (review as primary quality mechanism),
  ADR-0022 (English-first, the untranslated-banner precedent for publishing under disclosure)
- Still blocked for certification: `specs/014-agent-review-governance/tasks.md` T007, T008
