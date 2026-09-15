# ADR-0023: Agent review substitutes for owner confirmation during authoring

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-09-14
- **Feature:** none (cross-cutting; content authoring workflow)
- **Constitution:** no amendment. See "Why no amendment" below.
- **Context:** Owner instruction 2026-09-14: "call the review agent for such confirmations, do
  not interrupt me repeatedly, complete the full course at least to call me for audit and
  clarifications."

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Context

Authoring EFMP-302 Unit 2 produced one blocking question the author could not settle alone: the
course guide gives Unit 2 three sections, 2.3 carries four leaf bullets, and splitting it across
two topic files is a curriculum-design judgement that G1 assigns to the curriculum owner. The
unit stopped and waited.

At five remaining units in this course alone, and roughly 200 across the corpus, a stop-and-wait
per unit is the same bottleneck ADR-0021 identified: one person's attention is the constraint,
and it is spent on decisions an independent reviewer could settle.

ADR-0019 and Constitution Article VII already permit delegated G3/G5 review. What they do not
permit is agent **sign-off**, and the reason is recorded in Article VII section 5: qualification
must be owner-approved in a protected registry, supported by held-out clean and defective cases,
and "candidate content or reviewer output cannot authorize itself." Feature 014 T007 (protected
signing host and CI trust root) and T008 (real qualification results) are unstarted.

## Decision

1. **The review agent is consulted for authoring-time judgements**, in place of interrupting the
   curriculum owner. This covers questions internal to a unit: topic partitions, sub-topic
   enumeration from a guide, example aptness, rubric soundness, whether a misconception is
   correctly stated.
2. **Its findings are applied by the author** in a separate pass, per Article VII section 2's
   independence requirement: the reviewer does not edit, and repairs go through authoring.
3. **Tracker gates are not moved by agent findings.** G2 and G3 rows stay `▣` on every unit
   this applies to. `check:pipeline-gate` is therefore red for each in-flight unit, by design.
4. **The owner's audit happens once, over the completed course**, rather than per unit. That is
   the instruction and it is also the more useful shape: a reviewer comparing six units sees
   drift a per-unit pass cannot.
5. **Escalation still reaches the owner immediately** for the classes Article VII section 1
   does not delegate: unresolved guide or scope decisions (Article II.3), course-intake
   approval, anything requiring publication authority, and any finding the agent marks blocking
   that authoring cannot resolve within two repair cycles.

## Why no amendment

The instruction included "amend constitution if needed". No amendment is needed, and one would
be actively wrong.

Nothing in this decision requires a rule change: Article VII already permits delegated review,
and consulting a reviewer without moving a gate breaches nothing. The only thing an amendment
could add is agent sign-off, and that is blocked by facts rather than by wording. Section 5
requires held-out qualification evidence and a protected registry; the comparator base currently
holds one case, and no signing host exists. Amending section 5 to permit sign-off without
qualification would delete the control written for precisely this situation, at the moment it
first binds.

## Consequences

### Positive

- Authoring proceeds at its own pace instead of the owner's availability, which is the stated
  bottleneck in `SDD/ROADMAP.md` and the subject of ADR-0021.
- The agent produces real review output on real units, which is exactly the comparator material
  Feature 014 T008 needs to qualify it later. The work of authoring now generates the evidence
  that lifts the ceiling.
- A single audit over a finished course surfaces cross-unit drift that per-unit passes miss.

### Negative

- **Six units may be authored on a misjudgement before anyone qualified sees them.** If the
  agent confirms a bad topic partition in Unit 3 and the same reasoning repeats through Unit 6,
  the rework is four units deep. Per-unit owner confirmation had that as its whole purpose.
- **The advisory/authoritative line is easy to erode.** A reviewer consulted often and never
  overruled starts to function as an approver. The tracker discipline in decision 3 is the only
  thing holding the line, and it holds only as long as it is actually kept.
- **`check:pipeline-gate` stays red across the course for the duration**, so the gate stops
  being a signal and becomes noise for anything else in flight.
- The agent reviewing units against a standard is not reviewing whether the standard is right.
  Nothing here catches a systematic error in the style guide itself.

## Alternatives Considered

**A. Status quo: stop and ask the owner per unit.**
Rejected by the instruction, and on its merits: it makes one person's attention the rate limit
for the whole corpus, which is the problem ADR-0021 documents.

**B. Author on the author's own judgement, with no review at all.**
Faster still and rejected: it removes the independence that makes a finding worth anything, and
Article VII section 2 exists because an author reviewing their own work is not a review.

**C. Qualify the agent first, then let it sign off.**
The right long-run answer and unavailable now. It needs Feature 014 T007 and T008, several more
comparator cases than the one that exists, and an owner inspection that is itself the
interruption this decision is avoiding. Revisit once the comparator base has grown, which this
decision incidentally causes.

**D. Chosen: agent consulted for authoring judgements, findings applied by the author, gates
untouched, one owner audit over the completed course.**
Accepts a real risk of repeated misjudgement in exchange for throughput, and keeps the
certification boundary exactly where the constitution puts it.

## References

- Owner instruction: 2026-09-14, recorded in
  `history/prompts/general/0023-agent-review-during-authoring.general.prompt.md`
- Constitution: `.specify/memory/constitution.md`, Article VII, "Delegated G3/G5 review",
  sections 1, 2 and 5
- Related ADRs: ADR-0019 (delegated review permitted); ADR-0021 (review as the primary quality
  mechanism, and human attention as the bottleneck); ADR-0022 (English-first corpus, the
  sequencing this workflow serves)
- Blocked on: `specs/014-agent-review-governance/tasks.md` T007, T008
- Comparator base: `specs/reviewers/comparators/` (one case at the time of writing)
