---
id: 0001
title: ADR blocked pending plan
stage: misc
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: spec/015-licence-content-tree
user: M Yousif Channa
command: /sp.adr licence-content-tier
labels: ["adr", "spec-015", "sdd-workflow", "blocked"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - history/prompts/015-licence-content-tree/0001-adr-blocked-pending-plan.misc.prompt.md
tests:
 - .specify/scripts/bash/check-prerequisites.sh --json (ERROR: not on a feature branch)
 - specs/015-licence-content-tree/ contains spec.md only; no plan.md
---

## Prompt

/sp.adr licence-content-tier

## Response snapshot

Step 1 aborts. `specs/015-licence-content-tree/` contains `spec.md` only, and the command
requires `plan.md`, aborting with "Run /sp.plan first" when it is missing. A second, smaller
blocker: `check-prerequisites.sh` expects a branch named like `015-feature-name` and cannot
resolve FEATURE_DIR from `spec/015-licence-content-tree`.

No ADR was created. Reported rather than forced, because the process objection and the
substantive one agree here.

**The substantive reason.** Step 4's significance test requires notable tradeoffs, and Step 5
requires filling the template's DECISION and ALTERNATIVES fields. Two of the spec's three open questions are
exactly the tradeoffs an ADR would exist to record:

- the catalogue tier key - a `tracks` array beside `semesters`, or a `tier` field on a flat list;
- the route name - `/licence/` versus a generalised `/track/` or `/exam/`, which is the
  irreversible-once-bookmarked choice ADR-0009 was written to settle for guides.

Writing the ADR now would record "decided: to be decided" on both, which fails the command's own
acceptance criteria (explicit alternatives, clear pros and cons) and produces the weak artefact
the flywheel check calls out.

The third question - whether the licence tier appears in degree navigation - is a plan-level
detail and would not block an ADR on its own.

**Recommended order:** answer the two questions or run `/sp.plan` for feature 015, then re-run
`/sp.adr`. The ADR is worth writing; it is not yet writable.

## Outcome

- ✅ Impact: no premature ADR recording undecided tradeoffs; the gap is named with a concrete path out.
- 🧪 Tests: prerequisites script errors on branch naming; feature dir has no plan.md.
- 📁 Files: this PHR only. No ADR created, no spec modified.
- 🔁 Next prompts: answer the catalogue-key and route-name questions, or run /sp.plan 015, then re-run /sp.adr.
- 🧠 Reflection: the workflow's plan-before-ADR ordering earned its keep here - the missing plan is exactly where the ADR's alternatives would have been settled.

## Evaluation notes (flywheel)

- Failure modes observed: an ADR suggested at PR time can outrun its own planning stage; branch naming outside the NNN-feature convention silently breaks the prerequisite script.
- Graders run and results (PASS/FAIL): significance test PASS (impact, alternatives, cross-cutting all true); writability check FAIL (alternatives unresolved) - correctly blocked.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): rename the branch to 015-licence-content-tree so check-prerequisites resolves, and see whether the rest of the SDD tooling then works on this feature.
