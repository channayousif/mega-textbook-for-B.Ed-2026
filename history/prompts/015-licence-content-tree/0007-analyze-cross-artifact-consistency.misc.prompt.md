---
id: 0007
title: Analyze cross artifact consistency
stage: misc
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.analyze
labels: ["spec-015", "analyze", "coverage", "read-only"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - (analysis was read-only; remediation of F1/C1/C2 applied on owner approval)
 - specs/015-licence-content-tree/spec.md
 - specs/015-licence-content-tree/tasks.md
tests:
 - mechanical FR-to-task coverage map (14 FRs, 44 tasks)
 - success-criteria traceability scan (5 criteria)
 - plan/tasks script-list agreement (9 of 9 match)
---

## Prompt

run /sp.analyze

## Response snapshot

Read-only pass over spec, plan and tasks. Built the coverage map mechanically rather than by eye,
which is what surfaced the two findings that matter.

**A1 (HIGH) - success criterion 4 is unachievable as written.** It requires
`/licence/eed-313/` to render in both locales, but FR-010 catalogues `EED-313` with zero units and
the rendering proof (T027, T030) uses a throwaway `zzz-998` that T040 then deletes. Nothing will
exist at that URL beyond a course-overview page. US2's own "Independent test" header repeats the
`eed-313` path while its tasks scaffold `zzz-998`, so the phase contradicts itself.

**A2 (HIGH) - FR-013 has zero task coverage.** The requirement that a third track be addable as a
`TRACKS` entry plus a content root plus a plugin instance, with no contract change, is never
verified. It was added during clarification and the task pass did not pick it up. It is also the
requirement most likely to be quietly falsified during implementation, since nothing forces anyone
to try.

**A3 (MEDIUM) - offline search is configured but never verified.** T024 adds `/licence` to
`docsRouteBasePath`; no task confirms the track is actually indexed, though SC4 demands it.

Three lower findings: FR-008's "nothing may place it in semester navigation" is covered only by a
parenthetical in T026; T038 places a duplicate-course-code test in `content-roots.test.mjs` while
the check it exercises lives in `check-pipeline-gate.mjs` (T037); and the FR block is numbered
out of order (001, 002, 003, 014, 004, 013, ...) because clarification inserted new requirements
contextually rather than appending.

**Clean passes**: zero constitution violations, zero ambiguity (no vague adjectives, no
placeholders), zero duplication, and plan-to-tasks script agreement is exact at 9 of 9. The two
residual occurrences of "tier" are both in records explaining that the term was dropped, so they
are correct rather than drift.

No files modified during analysis. On owner approval, F1, C1 and C2 were then remediated.

**Remediation.** Checking precedent settled F1's direction: `efmp-303`, `efmp-305` and `gpks-402`
are catalogued but have **no `docs/` directory at all**, so a catalogued-unauthored course has no
route by design. `EED-313` having no directory is therefore correct, and SC4 was the wrong half of
the pair. Rewrote SC4 to verify the scaffold while it exists, with an explicit note that `EED-313`
has no route and why. Fixed US2's independent-test header, which named `eed-313` while its tasks
scaffolded `zzz-998`.

C1 became T022: register a third `cpd` track pointing at a non-existent content root, confirm all
six gates still pass and no consumer needed editing, then remove it. FR-013 is now falsifiable
rather than aspirational.

C2 became T032: confirm a licence page is actually present in the generated offline search index,
proving T024's config entry took effect rather than assuming it.

Renumbered 44 tasks to 46 and verified every prose cross-reference survived the shift. Also closed
the three traceability gaps found in the same pass by citing FR-001/FR-002 on T010, success
criterion 1 on T019, and FR-008 on T027. Coverage went 13/14 FR and 3/5 SC to **14/14 and 5/5**.

F2 and S1 were left as reported, per the owner's scope.

## Outcome

- ✅ Impact: two HIGH findings caught before implementation, one of which would have produced an acceptance test nobody could pass.
- 🧪 Tests: coverage map 13/14 FRs; SC traceability 3/5 cited; script agreement 9/9.
- 📁 Files: none modified. This PHR only.
- 🔁 Next prompts: remediate A1/A2/A3, then /sp.implement.
- 🧠 Reflection: the mechanical map found what reading would not. SC4 looked fine in isolation and only failed against the task that deletes the scaffold.

## Evaluation notes (flywheel)

- Failure modes observed: an acceptance criterion naming a real course while its proof uses a throwaway one that gets deleted; a requirement added during clarification after task generation had already run.
- Graders run and results (PASS/FAIL): constitution alignment PASS; ambiguity PASS; duplication PASS; coverage FAIL (FR-013 zero, SC4 unachievable).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): re-run the coverage map after remediation and confirm 14/14 FRs and 5/5 success criteria have a citing task.
