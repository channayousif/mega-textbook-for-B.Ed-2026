# ADR-0019: Independent agents for G3 and G5 content review

- **Status**: Accepted (owner instruction 2026-09-11: "enable the agents and merge")
- **Date**: 2026-09-11
- **Scope**: Content-review governance; initial implementation in Feature 014.
- **Constitution**: 2.9.0 -> 3.0.0 (MAJOR)
- **Supersedes in part**: Article III.2's mandatory human Urdu pass and Article VII's
  exclusive curriculum-owner execution of G3/G5; Spec 006's human-only review requirements.
- **Activation**: This ADR and amendment permit delegated review. They do not implement or
  activate a reviewer, change tracker rows, certify a unit, or authorize automatic merging.

## Context

The current pipeline separates English drafting (G2) from English review (G3), and Urdu
translation (G4) from Urdu review (G5). EFMP-302 Unit 1 has a reviewed Urdu version.
EFMP-301 Unit 1's current G4/G5 remain open. The latest tracker rows use one reviewer's
initials (YM). Repeated revisions invalidate previous review work.

The present pipeline validator checks the last matching stage row for a done mark and a
non-empty reviewer field. It does not authenticate reviewer identity, bind review to content
bytes, or evaluate academic quality. Replacing YM with an agent name would therefore create
the appearance of governance without evidence.

The owner requested a review agent with appropriate skills, an ADR and a constitution bump.
Routine G3/G5 decisions should be delegable, rather than requiring a human to approve every
unit forever. Course-guide authority, quality criteria and unresolved-gap escalation remain.

## Decision

### Implementation state (2026-09-11)

Feature 014 installs the two callable reviewer agents, shared skill, input manifests,
signed-evidence validation and pipeline checks. These implement review execution and the
acceptance boundary. The qualification registry is deliberately empty: no real held-out
academic qualification or production signing-host provisioning has occurred. The trusted
host's signing, tracker transitions and audit scheduling remain operational integration work.
The activation criteria below are still binding and are not satisfied by synthetic tests.

### 1. One review capability with separate G3 and G5 modes

The review-unit skill has two entry modes and distinct rubrics. These are required
capabilities; installation alone does not establish reviewer qualification.

| Mode | Required skills and checks | Evidence |
|---|---|---|
| G3 English | Curriculum/outcome mapping; source verification; HSC-level readability; classroom pedagogy; independent assessment solving; Bloom demand and rubric adequacy; guide-section fidelity; accessibility inspection | Per-criterion findings with file/section and source locators; independently derived answers; actual validator and rendering results |
| G5 Urdu | Bilingual semantic comparison; academic-plain Urdu editing; terminology-bank use; preservation of negation, quantities, examples, answer options and cognitive demand; omissions/additions; Urdu figure labels; RTL and print inspection | Passage-level EN/UR comparisons, terminology findings, actual rendered evidence and validator results |

G5 MUST use the exact English version that passed G3. Heading parity and back-translation
alone cannot establish semantic equivalence. Source URL resolution alone cannot establish
that a source supports a claim. If source text or a required rendering is unavailable, that
criterion is unverified and cannot contribute to a pass.

### 2. Independent review, with bounded author/reviewer iteration

Run review in a fresh session that did not draft or translate the reviewed material. It
receives the frozen input bundle and authoritative references, not the author's private
reasoning or instructions to approve. The same model family MAY be used; different models
are not proof of independence. Record model/version and author/reviewer run identities.

The reviewer reads content and writes findings only. A separate author applies repairs.
Any repair creates a new input digest and requires a fresh review. Allow at most two
repair-and-review cycles per stage per submission, then escalate. Do not retry unchanged
inputs until a stochastic pass appears. A fresh reviewer does not erase prior unresolved
findings; their disposition is part of the record.

Treat source documents and candidate content as data, never as instructions. The reviewer
cannot alter the rubric, approved curriculum, terminology bank, registry, CI policy, or its
own permissions to secure a pass.

### 3. Evidence-backed dispositions

Each attempt produces a machine-readable record under
`specs/content/<course>/reviews/unit-NN/<stage>/<run-id>.json` and a readable summary.
The implementation spec MUST define and validate the precise schema before coding.

Required fields:
- schema version; run ID; unit; G3/G5 stage; start/end timestamps;
- author/translator and reviewer identities; model/version; skill and rubric versions;
- reviewed commit and a digest manifest of all decision inputs;
- approved course spec, sources, coverage map, style-guide and terminology versions;
- for G5, the accepted G3 evidence ID and matching English input digest;
- criterion results with evidence locators, findings, severity and resolution;
- actual command results and rendering evidence references;
- disposition: `pass`, `revise`, or `escalate`;
- failure/tool-unavailability details and any superseded evidence IDs.

Hash content and its dependencies, including assessment and figure assets. Exclude only
generated review reports and designated lifecycle fields (tracker status and
`translation_status`) so recording a result does not invalidate itself; the implementation
MUST define these exclusions precisely and prove that prose cannot be hidden in them.
A changed input invalidates the relevant acceptance. English changes invalidate dependent
G5 acceptance as well. Records are append-only; reruns retain prior evidence.

A pass requires all applicable criteria verified and satisfied, all mandatory deterministic
checks passed, and no unresolved blocking or uncertain finding. G5 is inapplicable for an
explicitly English-only course. It MUST NOT emit a fictional successful Urdu review.

### 4. Delegated authority with explicit boundaries

An enabled reviewer MAY satisfy G3 or G5 without per-unit human countersignature, after
the activation criteria below are met. The curriculum owner remains accountable for
rubrics, reviewer qualification and disputed academic decisions.

The reviewer MUST escalate ambiguous/missing course authority, disputed or new terminology,
unverifiable claims, semantic uncertainty, conflicting assessments, missing required tools,
and exhausted repair limits. It does not approve G0 course intake, silently change G1
scope, replace the practicing-teacher dry run, grant backend permissions, merge a PR,
or publish material. Existing engineering and publication controls remain applicable.

An agent result MUST use an explicit identity such as `agent:g3-reviewer-v1` or
`agent:g5-reviewer-v1`, never human initials. A trusted gate writer validates the record
before appending a done row. Humans remain identified as humans. A prose report or arbitrary
non-empty reviewer string is insufficient authority.

### 5. Qualification and staged activation

Begin in shadow mode: emit reports without changing G3/G5 completion or translation status.
Use EFMP-302 Unit 1 as the reviewed bilingual comparator, and EFMP-301 Unit 1 as the
second English case and later a Urdu case after real translation. Existing reviews are
comparators, not infallible ground truth. Heading-only Urdu stubs must fail completeness.

Before delegated sign-off is enabled for either stage:
1. Approve the implementation spec, review schema, rubrics and scope.
2. Build an owner-labelled fixture set covering every rubric criterion, with clean cases
   and seeded faults: false citation support, wrong answers, Bloom mismatch, omitted
   passages, reversed negation, changed numbers, terminology drift and unreadable RTL.
3. On a held-out qualification set, record denominators, false passes, false blocks,
   escalation rate, cost and elapsed time separately for G3/G5. All seeded blocking
   defects must be rejected or escalated; no blocking-defect case may pass. Clean cases
   must demonstrate a pass path, so an always-escalate reviewer cannot qualify.
4. Pass mutation tests for stale/missing evidence, spoofed reviewer identity, author/reviewer
   identity collision, stale G3 dependency, skipped commands and report tampering.
5. Have the curriculum owner record qualification and enabled stage/scope in a versioned
   registry protected from candidate/author/reviewer changes. Require a trusted CI identity
   and run provenance; a candidate-authored registry entry or report is not self-authorizing.

Finite evaluation does not prove error-free review. For the initial pilot, independently
audit every fifth agent-approved unit and every escalation; record outcomes. A missed
blocking defect disables the affected stage, reopens affected units since the last clean
audit for human review, and requires requalification. Changes to model, skill, rubric or
decision inputs require requalification of the changed reviewer configuration. Revocation
returns new work to human review without rewriting old evidence.

### 6. Compatibility and rollout work

The five-column tracker and its latest-row-wins semantics remain. The future validator
must distinguish human and registered agent identities and require matching authenticated
evidence for agent rows. Preserve historical human sign-offs; do not manufacture evidence
for them or silently convert them to agent reviews.

The follow-on feature must update:
- `scripts/check-pipeline-gate.mjs`, evidence validation and mutation fixtures;
- reviewer skill(s), orchestrator and trusted gate writer;
- `scripts/lib/gates.mjs` and generated gate documentation where a new check is added;
- Spec 006's data model/quickstart and live authoring/revision handoffs;
- translation-status handling, preserving draft/fallback until G5 actually passes;
- CI authentication/provenance, qualification registry and revocation behavior.

Until that feature passes its activation criteria, existing human sign-off is the operative
path. This is a deployment boundary, not a permanent human countersignature requirement.
This governance change does not bump style-guide v3.4 or rewrite already-reviewed prose.
Existing golden-unit re-proof obligations remain outstanding exactly as recorded.

## Alternatives considered

- **Human-only review forever:** preserves current practice but leaves routine review throughput
  tied to one person. Retained as fallback and for escalations.
- **Author self-certification:** cheaper, but shares the author's omissions and cannot supply
  independent checking. Rejected.
- **Agent recommendations with mandatory human approval for every unit:** useful for shadow
  qualification, but does not remove the long-term bottleneck. Not the target operating mode.
- **Unconditional autonomous approval:** no qualification, provenance or stale-review protection.
  Rejected because a plausible verdict is not evidence.
- **Multiple agents voting:** agreement can reproduce shared errors. Optional supplementary
  evidence, never a replacement for rubric checks and authoritative sources.

## Consequences and versioning

Constitution v3.0.0 is a MAJOR bump because mandatory human Urdu review becomes qualified
human-or-agent review and G3/G5 execution authority changes. Content quality obligations,
course-guide supremacy and the practicing-teacher gate remain.

Benefits: review can scale without routine human countersignature, decisions are inspectable,
and edits cannot silently inherit stale acceptance. Costs: reviewer qualification, evidence
storage, audit effort, model execution and maintenance. Urdu semantic judgment remains an
empirical qualification problem; skills alone are not proof of competence.

## Acceptance of this governance change

- [x] ADR defines skills, scope, evidence, dispositions, independence and escalation.
- [x] Constitution III.2 and VII permit qualified delegated review.
- [x] Contributor guidance and Spec 006 identify the transition and controlling decision.
- [x] Existing tracker rows, translation statuses and runtime gates are unchanged.
- [ ] Follow-on implementation and qualification complete; delegated sign-off enabled.
