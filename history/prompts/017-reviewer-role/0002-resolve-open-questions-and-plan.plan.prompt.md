---
id: 0002
title: Resolve open questions and plan
stage: plan
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role
user: M Yousif Channa
command: /sp.plan 017-reviewer-role
labels: ["plan-017", "reviewer", "capability", "adr-0015", "adr-0019", "art-v3"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0015-download-and-commit.md
  pr: https://github.com/channayousif/mega_book_for_B.Ed/pull/51
files:
 - specs/017-reviewer-role/spec.md (proposed resolutions for both open questions, +75/-19)
 - specs/017-reviewer-role/plan.md (new, 117 lines)
 - specs/017-reviewer-role/research.md (new, 82 lines, R1-R5)
 - specs/017-reviewer-role/data-model.md (new, 81 lines)
 - specs/017-reviewer-role/contracts/certification.md (new, 51 lines)
 - specs/017-reviewer-role/quickstart.md (new, 46 lines)
 - CLAUDE.md (agent context update, +3)
tests:
 - Constitution Check table evaluated against all eight relevant articles, pre- and post-Phase-1
 - verified in-repo: user_role enum values, is_admin's status-in-the-helper comment, validateAgentTrackerRow's human-initials early return
---

## Prompt

propose solutions for two questions , merge it when green, then plan 017

## Response snapshot

Both open questions turned out to need **no new mechanism**. The repository already contained each
answer, in the agent review path and in ADR-0015.

**Question 1, how a certification reaches a Git tracker file.** The agent path does not put
evidence in Postgres: it writes a report to `specs/content/<course>/reviews/unit-NN/<stage>/<run-id>.json`
and the tracker row references it as `review:<path>`. The proposal is that a human certification
produces the same two artefacts in the same places, downloaded and committed through ADR-0015's
accepted manual step. Four consequences follow for free: one evidence format for both paths, so a
human certification is directly usable as the G5 comparator that agent qualification is blocked on;
Art. V.1 unbent, because Postgres never becomes authoritative for a gate outcome; FR-005's
append-only property from Git history rather than a soft-delete column; and the bottleneck still
lifts, because committing N generated rows takes minutes where reviewing N units takes days.

**Question 2, who the first reviewer is.** `validateAgentTrackerRow` accepts any reviewer matching
`/^[A-Z]{1,5}$/` as human initials with no registry lookup, so a second human reviewer needs no
gate change at all. Qualification becomes a governance record, `specs/reviewers/human-reviewers.md`,
with ADR-0019's shape at human scale: blind review of held-out units, judged decisively on false
passes. And the first holder is the curriculum owner, which changes nothing operationally but
exercises the export and commit flow on real units before anyone external depends on it. That also
answers the spec's own objection that a capability nobody holds relieves no bottleneck.

**The plan then found the feature had shrunk.** Art. VII already permits a qualified human
executor and the pipeline gate already accepts human initials, so there is no constitutional
amendment and no gate change. What remains is one migration, one helper, RLS, one admin page, an
export, tests and a governance record. Art. V.3 turned out to be load-bearing rather than merely
satisfied: it closes the role set and names the capability as the extension point, so the design
the spec argued for on engineering grounds is the one the constitution prescribes.

## Outcome

- ✅ Impact: both questions closed with existing mechanisms; the feature lost a constitutional amendment and a gate change from its scope.
- 🧪 Tests: Constitution Check passes on all eight relevant articles, unchanged after Phase 1.
- 📁 Files: spec.md resolutions plus plan.md, research.md, data-model.md, contracts/certification.md, quickstart.md.
- 🔁 Next prompts: merge #51, then /sp.tasks.
- 🧠 Reflection: the strongest design move in this planning pass was refusing to add a `reviews` table, which would have been the obvious shape and would have quietly made Postgres authoritative for a gate outcome.

## Evaluation notes (flywheel)

- Failure modes observed: the pull toward a database table for anything that looks like workflow state, even when the artefact's whole value is being comparable to files already in Git.
- Graders run and results (PASS/FAIL): Art. V.1 PASS (no gate outcome in Postgres); Art. V.3 PASS and prescriptive; Art. VII PASS (existing permission, no amendment); ADR-0015 consistency PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): check whether any other planned feature assumes a table where a Git artefact would serve, the way this one nearly did.
