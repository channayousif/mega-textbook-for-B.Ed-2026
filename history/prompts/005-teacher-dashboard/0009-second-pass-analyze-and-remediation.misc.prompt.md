---
id: 0009
title: Second-pass analyze and remediation
stage: misc
date: 2026-07-25
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.analyze (second pass) + remediation follow-up
labels: ["analysis", "remediation", "teacher-dashboard", "consistency"]
links:
  spec: specs/005-teacher-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-teacher-dashboard/contracts/teacher-dashboard-operations.md
 - specs/005-teacher-dashboard/quickstart.md
 - specs/005-teacher-dashboard/tasks.md
 - specs/005-teacher-dashboard/spec.md
tests:
 - none (documentation/planning edits; no code changes)
---

## Prompt

/sp.analyze (re-run, no additional free-text input), followed by "suggest concrete edits for all"
and then "yes" to apply.

## Response snapshot

Re-ran the full `/sp.analyze` workflow from scratch against the post-remediation state (after PHR
0008's six fixes). Re-read every artifact fresh (plan.md, tasks.md — now 51 tasks, spec.md,
data-model.md, research.md, contracts/teacher-dashboard-operations.md, quickstart.md) rather than
trusting memory of the prior pass, since several files had changed.

Verified all 6 previously-approved remediations (U1, A1, I1, I2, G1, G2) landed correctly and are
mutually consistent across every artifact that references them. Then ran a fresh full detection
pass and found two **new** findings that the U1 remediation itself had introduced as a side
effect: contracts/teacher-dashboard-operations.md and quickstart.md were never updated when
data-model.md/research.md/tasks.md were changed to make `improvement_suggestions.unit_no`
nullable — meaning the contracts doc (the intended single source of "permitted operations") still
read as if `unit_no` were always required, with no checklist item for the course-overview
acceptance case. Also reconfirmed the two LOW findings from the first pass that were never in the
approved remediation batch (I3: missing checklist-item citations on T005/T006/T033; A2: FR-009 not
naming quiz scores) were still open, as expected.

User asked for concrete edits for all four (N1, N2, I3, A2) and then approved applying them.
Applied:
- **N1**: contracts.md gained a new §C row ("File a suggestion from a course-overview page...
  accepted, not rejected") and checklist item 17 for the same scenario.
- **N2**: quickstart.md's "Suggest improvement" verification item gained a course-overview-page
  repeat-check clause.
- **I3**: T005 and T033 gained their missing "contract checklist item 13"/"item 14" citations.
- **A2**: spec.md FR-009 now says "submission/grade/quiz-score data" instead of just
  "submission/grade data."

Re-validated tasks.md after the edits: still 51 tasks, no duplicate IDs, format intact. Confirmed
each of the four edits landed via targeted grep checks (item 17's exact line, both new task
citations, the FR-009 wording, both new checklist/contract rows).

## Outcome

- ✅ Impact: Closed a self-inflicted gap from the *previous* remediation pass (contracts.md/
  quickstart.md drifting out of sync when data-model.md/research.md changed) before it could
  mislead an implementer reading contracts.md in isolation; also cleared the two LOW-severity items
  that had been deliberately left open in the first remediation batch. All artifacts for
  005-teacher-dashboard are now internally consistent with zero known CRITICAL/HIGH/MEDIUM gaps.
- 🧪 Tests: None run — planning-artifact edits only; no new test tasks were needed for these four
  (N1/N2 are documentation-completeness fixes, I3 is a citation fix, A2 is a wording fix).
- 📁 Files: `contracts/teacher-dashboard-operations.md` (new §C row, checklist item 17),
  `quickstart.md` (new checklist clause), `tasks.md` (T005, T033 citations), `spec.md` (FR-009
  wording).
- 🔁 Next prompts: `/sp.implement` — all artifacts now cross-consistent through two full
  analyze+remediate cycles.
- 🧠 Reflection: A remediation pass that edits some artifacts (data-model.md, research.md,
  tasks.md) but not their siblings (contracts.md, quickstart.md) can silently create new drift even
  while fixing the original finding — worth treating "which other docs reference this same fact"
  as a checklist item during remediation itself, not just during the next `/sp.analyze` pass.

## Evaluation notes (flywheel)

- Failure modes observed: The N1/N2 findings are themselves evidence of an earlier gap in this
  session's own remediation process (PHR 0008 fixed U1 in 3 of 5 places it appeared). No new
  failure this turn — this pass caught and closed it on the next analyze cycle, which is the
  intended safety net, but relying on a *second* analyze pass to catch cross-artifact drift from
  the first remediation is less efficient than checking all reference sites in the same edit pass.
- Graders run and results (PASS/FAIL): Task-list format validation via `grep` — PASS (51 tasks, no
  duplicates, format-compliant); targeted content checks for all 4 edits — PASS.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When remediating a finding that changes a shared fact
  (e.g., a column's nullability, an activation condition), grep the whole `specs/<feature>/`
  directory for every file mentioning the changed concept *before* declaring the remediation done,
  rather than only editing the files where the finding was originally located.
