---
id: 0006
title: Remediate remaining analysis findings
stage: misc
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role-tasks
user: M Yousif Channa
command: remediate the remaining
labels: ["analyze-017", "reviewer", "evidence-format", "art-vii-3", "art-vii-4", "escalation"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/52
files:
 - specs/017-reviewer-role/spec.md (FR-001, FR-003, FR-004, FR-005, FR-009, proposal 3 "What it does not do")
 - specs/017-reviewer-role/contracts/certification.md (input_manifest as map, commands, "Fields deliberately absent", narrowed preamble)
 - specs/017-reviewer-role/research.md (R3 correction, R6 two-file split)
 - specs/017-reviewer-role/plan.md (Summary, Storage, Scale/Scope, migration tree)
 - specs/017-reviewer-role/data-model.md (§4 queue derived, not owned)
 - specs/017-reviewer-role/tasks.md (39 -> 41 tasks, full renumber from Phase 5)
tests:
 - npm run check:content - 8/8 PASS
 - tasks.md: 41/41 well-formed, IDs sequential T001-T041, every ID referenced, no gaps
 - zero em dash across specs/017-reviewer-role/
---

## Prompt

remediate the remaining

## Response snapshot

**A2 (HIGH) - the evidence formats were not comparable.** R3 justified putting certifications in
Git on the grounds that one format serves both paths, but `validateReport` also requires
`skill_digest`, `model`, `author_run_id`, `reviewer_run_id`, `evidence_manifest` and `commands`, and
types `input_manifest` as the digest map while the human contract had a path string in the same
field. Three fixes: `input_manifest` now carries the map itself, copied from the `manifest.json`
`review:evidence prepare` writes, because a path cannot be compared against a freshly computed
manifest and so makes Art. VII §4's freshness rule uncheckable; `commands` records the deterministic
gate runs, which Art. VII §3 counts among the evidence; and the four genuinely agent-specific fields
are enumerated in a "Fields deliberately absent" table with the reason for each, so a comparator can
tell an omission from an oversight. The contract's preamble now states what comparability means -
field-for-field diffable, **not** a valid `validateReport` input, since that function is agent-only
by construction. T017 moves `COMMANDS` beside `CRITERIA`, T031 takes both from the reviewer through
a file input and a checklist, T030 asserts them.

**U2 - escalation had no mechanism.** FR-004 said escalation "routes to the curriculum owner" while
the feature builds no notification and no inbox. Rather than invent one, FR-004 and T024 now say
what actually happens: all three actions produce the same two artefacts, and an escalation reaches
the owner as a committed certification whose disposition leaves the gate open.

**U3** makes FR-009's "no automatic writes" a test (T033) instead of on-screen text. **U1** stops
FR-001 asserting that `guard_privileged_columns` blocks self-grant as an existing fact. **I1** puts
the two-file migration split into research R6 and plan.md with the transaction reason. **I2**
rewrites data-model §4: the queue is derived, not owned, and "which unit a reviewer has open" is
deliberately not tracked, since two simultaneous reviews produce two certifications and the later
one supersedes, which is better evidence than a lock. **I3** adds "What it does not do" to proposal
3 - granting the capability to the owner leaves both facts in the spec's own **Why** intact, so the
exit criterion is one external reviewer, and T036 now writes that into the backlog. **L2** notes
that FR-003's read half needs no code because the content is already public.

## Outcome

- ✅ Impact: every finding from the analysis is now closed; 39 tasks became 41.
- 🧪 Tests: check:content 8/8 PASS; 41/41 tasks well-formed, sequential, all IDs referenced.
- 📁 Files: all six feature artefacts plus this PHR.
- 🔁 Next prompts: /sp.implement starting at Phase 2, or merge #52 first.
- 🧠 Reflection: A2 was the one finding where the artefacts described a benefit the design did not deliver. The other six were drift or imprecision; this one was a claim, and claims are what later decisions get built on.

## Evaluation notes (flywheel)

- Failure modes observed: a rationale ("one evidence format") that read as a fact but was never checked against the validator it referenced; a requirement verb ("routes to") that implied a mechanism nobody had scoped.
- Graders run and results (PASS/FAIL): check:content PASS 8/8; task format PASS 41/41; ID continuity PASS (no gaps, no dangling refs); em dash PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): when a spec says an artefact matches an existing format, open the validator for that format and diff the field lists before the claim reaches a plan.
