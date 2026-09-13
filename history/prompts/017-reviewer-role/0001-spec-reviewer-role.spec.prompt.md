---
id: 0001
title: Spec reviewer role
stage: spec
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role
user: M Yousif Channa
command: spec the reviewer role
labels: ["spec-017", "reviewer", "capability", "art-vii", "adr-0005"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - specs/017-reviewer-role/spec.md (new, 100 lines)
tests:
 - npm run check:content (7/7 at time of writing; 8 after v4.0 merged)
 - verified Art. VII wording and ADR-0005 role/capability split against the repository
---

## Prompt

spec the reviewer role

## Response snapshot

Two things the roadmap records turned out to be wrong, and checking rather than trusting them
changed the design.

**No constitutional amendment is needed.** The roadmap says this feature requires "an amendment to
Constitution Art. VII, which today reserves G3/G5 to the curriculum owner". That was true before
v3.0.0 and is not true now: the Content gate row already reads "Curriculum owner accountable;
**qualified human** or enabled independent agent executes G3/G5", and §1 assigns the owner review
policy, qualification and escalations rather than execution. ADR-0019 opened the human path at the
same moment it opened the agent path, and nobody noticed. The feature exercises an existing
permission instead of creating one, which removes a constitutional amendment from its scope.

**`reviewer` is a capability, not a role.** The `user_role` enum is
`('student','teacher','admin')`; `verified_teacher` is a separate boolean column because ADR-0005
split self-selectable roles from admin-granted capabilities. A reviewer is typically already a
teacher or admin - reviewing is something they are trusted to do, not something they are. Adding a
fourth enum value would also disturb `guard_privileged_columns`, whose OAuth carve-out is written
around the three-value enum.

The spec follows the `verified_teacher` pattern throughout: boolean column, admin-granted,
`is_reviewer()` mirroring `is_admin()` so suspension propagates without touching policies, and
`privilege_audit` gaining a `'reviewer'` change type so grants and revocations are both recorded.

FR-005 makes certifications append-only with input digests, because this is the first time a
person other than the curriculum owner holds a content gate and the trail is the only control.
FR-007 keeps agent review advisory and names the circularity plainly: agent certification needs a
comparator base, and this feature is what grows it.

Two open questions left open rather than guessed. How a certification reaches a Git tracker file is
a real architectural question with an existing precedent (ADR-0015's download-and-commit flow) and
a tempting wrong answer (a `reviews` table the gate reads, making Postgres authoritative for a gate
outcome against Art. V.1). And who the first reviewer is, because without a named person the
feature ships a capability nobody holds and relieves no bottleneck.

## Outcome

- ✅ Impact: the production ceiling has a scoped fix, one constitutional amendment lighter than planned.
- 🧪 Tests: gates green; Art. VII wording and the role/capability split verified in-repo rather than assumed.
- 📁 Files: specs/017-reviewer-role/spec.md plus this PHR.
- 🔁 Next prompts: answer the two open questions, then /sp.plan.
- 🧠 Reflection: both corrections came from reading the constitution and the migrations instead of trusting a roadmap line I wrote myself two days ago.

## Evaluation notes (flywheel)

- Failure modes observed: a roadmap entry that went stale the moment a constitution amendment landed, and stayed stale because nobody re-read Art. VII; the pull toward modelling a trust level as a role when the codebase already models trust as a capability.
- Graders run and results (PASS/FAIL): Art. VII permission check PASS (no amendment required); role/capability precedent PASS (ADR-0005, verified_teacher); check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): re-read the roadmap for other entries that predate Constitution v3.0.0 and may have gone stale the same way.
