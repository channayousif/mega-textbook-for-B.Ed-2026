---
id: 0010
title: Implement US3 and polish
stage: green
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.implement (continue to US3 and polish)
labels: ["spec-015", "implement", "us3", "article-v4", "catalog"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - contracts/course-overview.schema.json · catalog/courses.json
 - src/lib/catalog.ts · src/lib/courseOptions.ts
 - src/pages/app/classes/index.tsx · src/pages/app/teacher/quiz-authoring.tsx
 - scripts/lib/content-roots.mjs · scripts/check-pipeline-gate.mjs · scripts/check-add-course.mjs
 - licence/eed-313/ (course-overview, coming_soon) · tests/unit/content-roots.test.mjs (21 tests)
 - README.md · specs/015-licence-content-tree/{spec,validation,tasks}.md
tests:
 - npm run check:all - 13/13 full gates including build (PASS)
 - check:add-course now proves Article V.4 for both tracks (PASS)
 - EED-313 reaches the course picker with ordinal null, hasContent false (PASS)
---

## Prompt

ok go on.

## Response snapshot

US3 and polish: T034-T041, T043, T044, T046. 46 of 47 tasks done; only T045 remains, which flips
ADR-0020 to Accepted and waits on owner approval of PR #46.

Widened `contracts/course-overview.schema.json` with a `"Licence track"` category - the blocker US2
found. Catalogued `EED-313` under an additive `tracks[]`. Added `allCourses(catalog)` and made
`CourseOptionGroup` track-keyed.

**The type change did the work of finding consumers.** Renaming `semester` to `ordinal` on the
group broke compilation in exactly the two pages that needed migrating, rather than leaving them to
be found by hand. That is the argument for the additive key plus a shared reader over a silent
per-consumer migration.

A detail the plan had not anticipated: the old group shape hardcoded "Semester N" in both locales,
so a track could not name itself. `label_en` / `label_ur` replace it.

**Article V.4 is now proven for the new track.** `check-add-course.mjs` scaffolds a throwaway
licence course beside its throwaway semester course, and `sidebars-licence.ts` joined its guarded
paths, so adding a licence course cannot silently edit the track's own sidebar.

Also closed analysis finding F2 rather than deferring it: `findDuplicateCourseCodes` now lives in
`content-roots.mjs`, so the FR-011 check is unit-testable where T040 expected while the gate calls
it.

**The polish step found a real design collision, and it falsified something I had written.**
With the probe deleted and `EED-313` catalogued but directory-less, the build failed:
`Docs version "current" has no docs! At least one doc should exist at "licence"`. A docs-plugin
instance cannot be empty, so the catalogued-but-unauthored precedent - seven degree courses with no
`docs/` directory - does not extend to the course that establishes a track. Success criterion 4, as
I remediated it during `/sp.analyze`, asserted the opposite. Corrected in the spec, and `EED-313`
now ships a `coming_soon` `course-overview.mdx` with no units.

Worth noting that failure surfaced only in `check:all`, never in `check:content`. The build is the
one gate that exercises plugin wiring, and it is the slow one a content author is least likely to
run.

## Outcome

- ✅ Impact: Feature 015 complete bar the ADR status flip. Licence content is authorable, gated, catalogued, routed and searchable, and adding a course to either track is content-only.
- 🧪 Tests: check:all 13/13 including build; 21 walker tests; EED-313 verified in the picker.
- 📁 Files: schema, catalogue, two libs, two pages, three scripts, the EED-313 landing page, README and three feature artifacts.
- 🔁 Next prompts: owner approval on PR #46, then T045. Authoring EED-313's four units waits on v4.0 and the freeze.
- 🧠 Reflection: I asserted in the analysis remediation that EED-313 would have no route, reasoning from the degree precedent. The build disproved it. Precedent is a hypothesis, not evidence.

## Evaluation notes (flywheel)

- Failure modes observed: a precedent applied one step past where it holds; a class of failure that only the slowest gate can catch.
- Graders run and results (PASS/FAIL): check:all 13/13 PASS; Article V.4 two-track probe PASS; FR-011 detector PASS; F2 closed PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): consider whether `check:content` should include a cheap plugin-wiring assertion, since the only gate that catches an empty instance takes 45 seconds.
