---
id: 0008
title: Implement US1 content roots walker
stage: green
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.implement
labels: ["spec-015", "implement", "us1", "refactor", "fr-009"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - scripts/lib/content-roots.mjs (new)
 - tests/unit/content-roots.test.mjs (new, 13 tests)
 - scripts/validate-content.mjs · check-unit-depth.mjs · check-figures.mjs · check-pipeline-gate.mjs
 - scripts/build-content-index.mjs · report-content-status.mjs · check-no-em-dash.mjs · check-no-answer-keys.mjs
 - scripts/lib/review-evidence.mjs
 - specs/015-licence-content-tree/validation.md (new) · tasks.md · contracts/content-roots.md
 - .gitignore
tests:
 - FR-009 byte-identical on all 7 gates (PASS)
 - success criterion 5 - grouping regex appears once, 0 UR_BASE joins, 0 hardcoded root arrays (PASS)
 - npm test 219/219 (18 files) · test:review 21/21 · check:content 7/7
---

## Prompt

run /sp.implement

## Response snapshot

No `checklists/` directory, so the step-2 gate was skipped. `.gitignore` present and complete for
a Node project. Executed Phases 1-3, stopping at the US1 checkpoint that tasks.md itself marks
"safe to stop here and ship".

**Method.** T001 captured all seven gates' output to disk before touching anything, so FR-009 was a
`diff` rather than a judgement. Each consumer was ported and compared against its baseline
immediately, one at a time, so a regression would be attributable to a single file.

**Result: all seven gates byte-identical**, plus `content-index.json` and `content-status.json`
identical as parsed JSON. Success criterion 5 holds: the grouping-directory regex appears exactly
once, in the library; zero `join(UR_BASE, ...)` outside it; zero hardcoded root arrays.

Three findings worth keeping:

1. **A ninth consumer nobody had listed.** `report-content-status.mjs` carries its own semester
   walk and would have under-reported licence content. It appears in neither plan.md nor tasks.md,
   and the analysis pass missed it too, because it is a soft CI step in `CI_ONLY` rather than a
   member of `FULL_GATES`. Found by T020's grep, not by reading. Ported as T017a.
2. **The contract under-specified course-level access.** It exposed units only, but three consumers
   emit or check per course. Each would have kept its own grouping walk, defeating the whole point.
   Added `walkCourses` and rebuilt `walkUnits` on it; contract updated.
3. **Ordering was incidental and is now deliberate.** The prior walks relied on unsorted
   `readdirSync`. Measured before porting rather than assumed: that order already equals sorted
   order throughout `docs/`, so the contract's sort is a no-op today. Byte-identical output is
   preserved and the walk stops depending on filesystem iteration order.

One self-inflicted error, caught and fixed: collapsing two nested loops in
`report-content-status.mjs` left an orphan closing brace. `node --check` flagged it, and the JSON
diff had passed only because the failing script was writing to `/dev/null`. Worth noting that the
diff alone would have hidden it.

## Outcome

- ✅ Impact: nine consumers now share one definition of where content lives, with byte-identical behaviour proven rather than asserted. The licence track can be added as data.
- 🧪 Tests: 7/7 gates identical to baseline; check:content 7/7; npm test 219/219; test:review 21/21.
- 📁 Files: 1 new module, 1 new test file (13 tests), 9 consumers ported, validation record, contract and tasks updated.
- 🔁 Next prompts: US2 (T021-T033) adds the licence track itself; US3 (T034-T042) makes it catalogued and user-visible.
- 🧠 Reflection: capturing the baseline to disk first turned the riskiest part of the feature into a mechanical check. Every port was either identical or obviously wrong within seconds.

## Evaluation notes (flywheel)

- Failure modes observed: a survey that counted consumers by reading rather than grepping missed one; a JSON diff that passed because the producing script had failed silently behind a redirect.
- Graders run and results (PASS/FAIL): FR-009 byte-identical PASS (7/7); success criterion 5 PASS; existing suites PASS (219 + 21).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): before US2, re-run T020's grep over `src/` as well, in case a page carries its own semester assumption the survey also missed.
