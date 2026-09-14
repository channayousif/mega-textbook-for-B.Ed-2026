---
id: 0005
title: Remediate G1 G2 and A1
stage: misc
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role-tasks
user: M Yousif Channa
command: /sp.analyze 017-reviewer-role, then remediate
labels: ["analyze-017", "reviewer", "art-vii-4", "art-x", "docs-gate", "enforcement-posture"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/52
files:
 - specs/017-reviewer-role/spec.md (FR-002, FR-005, FR-011 new, SC2/SC3/SC5, new Enforcement posture section)
 - specs/017-reviewer-role/plan.md (Constitution Check: Art. X row, Docs gate row, corrected V.2 row; Project Structure; Phase 2 step 5)
 - specs/017-reviewer-role/data-model.md (who calls is_reviewer, and why no policy does)
 - specs/017-reviewer-role/contracts/certification.md (g3_report field, "The G5 binding" section)
 - specs/017-reviewer-role/quickstart.md (G3-before-G5 in step 3; what the capability does and does not control)
 - specs/017-reviewer-role/tasks.md (36 -> 39 tasks, three new findings, full renumber)
tests:
 - npm run check:content - 8/8 PASS
 - tasks.md checklist format: 39/39 well-formed, IDs sequential T001-T039, all cross-references resolve
 - zero em dash across specs/017-reviewer-role/
---

## Prompt

remediate G1 and G2, and for A1 go with option a

## Response snapshot

**G1 - the G5 binding was missing everywhere.** Art. VII §4 requires G5 to bind to accepted G3
evidence for the same English version, and success criterion 3 said so, but the certification
contract had no `g3_report` field and no task enforced the precondition. The agent path enforces it;
the human path would have let a G5 certify past a G3 that was never accepted, with
`check:pipeline-gate` returning early for human initials and catching nothing. Now enforced in three
places: the queue offers G3 only on a G3-open unit (T020), `buildCertification` throws on a G5 with
a missing or mismatched `g3_report` (T028), and the referenced file's `disposition` becomes readable
at the reviewer's own commit. `contracts/certification.md` gained the field and a "The G5 binding"
section; FR-005, SC3 and the quickstart say it too.

**G2 - the Docs gate had no task.** Art. X is non-negotiable, X.1 makes the Teacher Guide the home
for what a capability unlocks, and Art. VII's Docs gate names the feature author as its owner. A
reviewer is typically already a teacher, so this is a teacher-facing capability, and the guide is
bilingual. New FR-011, new T035 and T036 (English page plus Urdu mirror, following
`verified-teacher-material.mdx`), and plan.md's Constitution Check gained the two rows whose absence
is exactly how the feature reached `/sp.tasks` with no guide task at all.

**A1 option (a) - state the posture rather than build enforcement.** The feature creates no policy,
because certifying produces a file rather than a row, so `is_reviewer()` would have been dead code
and SC2 was unsatisfiable as worded. spec.md gained an **Enforcement posture** section saying
plainly that `reviewer` is an authorization record and the pull request is the control, that Art.
V.2 and IX.2 are not engaged and why, and which two alternatives were rejected. The helper is kept
alive with a real caller: `ReviewerGuard` calls it over RPC rather than reading the cached profile
column, so a suspension is the database's answer. SC2 and T012 test that instead of a policy that
does not exist, and plan.md's false V.2 verdict is corrected.

Not remediated, by scope: A2 (the human and agent evidence formats are not actually comparable -
`validateReport` requires `skill_digest`, `evidence_manifest`, `commands`, `author_run_id`,
`reviewer_run_id`, `model`, and types `input_manifest` as a map rather than a path), plus the four
MEDIUM findings I1, I2, U1, U2, U3 and I3.

## Outcome

- ✅ Impact: two CRITICAL findings closed, one HIGH resolved by decision; 36 tasks became 39.
- 🧪 Tests: check:content 8/8 PASS; 39/39 tasks well-formed and sequential; zero em dash.
- 📁 Files: all six feature artefacts plus this PHR.
- 🔁 Next prompts: remediate A2, or /sp.implement starting at Phase 2.
- 🧠 Reflection: the Constitution Check table is only as good as the articles someone remembers to put in it. Art. X was not argued away, it was simply never listed, and nothing downstream could have caught that.

## Evaluation notes (flywheel)

- Failure modes observed: a Constitution Check that omits an article rather than failing it, which looks identical to compliance; a success criterion written as though enforcement existed, which survived spec, plan and tasks unchallenged.
- Graders run and results (PASS/FAIL): check:content PASS 8/8; task format PASS 39/39; cross-reference resolution PASS; em dash PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): make the Constitution Check enumerate every article and mark the non-applicable ones explicitly, so an omission is visible as a blank rather than invisible as an absence.
