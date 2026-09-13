---
id: 0009
title: Implement US2 licence track
stage: green
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.implement (continue to US2)
labels: ["spec-015", "implement", "us2", "licence-track", "fr-013", "fr-014"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - scripts/lib/content-roots.mjs
 - docusaurus.config.ts
 - sidebars-licence.ts (new)
 - tests/unit/content-roots.test.mjs (18 tests)
 - specs/015-licence-content-tree/validation.md · tasks.md
tests:
 - FR-013 - a third track needed one TRACKS entry and zero consumer edits (PASS)
 - SC2 - all six gates report licence content, each for the right reason (PASS)
 - SC3/SC4 - resolveUnit and inputManifest cross-track; both locales render; 12 /licence/ refs in each search index (PASS)
 - npm test 224/224 · test:review 21/21 · check:content 7/7
---

## Prompt

move to next

## Response snapshot

US2 complete: T021-T033, plus T042's cleanup run early because the probe had served its proofs and
left the gates red by design.

**FR-013 proven rather than asserted.** Registered a `cpd` track pointing at a content root that
does not exist, ran the full gate set, and checked `git diff --name-only`: no file but
`content-roots.mjs` needed editing. Removed the entry. A third track really is one entry plus a
content root plus a plugin instance.

**Success criterion 2 needed more than a scaffold.** Two gates initially skipped the probe, for
reasons that apply equally to degree units - no content-spec means the depth gate skips, no topic
files means the figure gate skips. Adding a topic file and a minimal content-spec exercised both
genuinely. All six then reported, each for the right reason. The two pattern gates matter most:
they caught an em dash at an exact line and column, and an `answer_key:` front-matter key. Without
FR-014's `CONTENT_ROOTS` fix, a licence unit containing an answer key would have passed.

Three findings:

**A track-ordering regression, caught by a test.** Rebuilding `walkUnits` on `walkCourses` during
US1 silently dropped the track-order comparator. A single track cannot expose that - only once the
licence track existed did its empty `trackDir` sort ahead of `semester-1`. The test written for the
new track caught it immediately. Comparator restored, ordering now asserted.

**`"Licence track"` is not a valid course-overview category.** `validate:content` rejected it
against the schema enum, so US3's T032 must widen `contracts/course-overview.schema.json` before
`EED-313` can be catalogued.

**FR-009's baseline correctly diverges once the track exists.** `check:no-em-dash` now reports
`scanned: docs, licence, ...`. Findings unchanged, scan list grew. Exactly why the tasks carried an
explicit constraint that T021 must not precede T019 - and it held.

## Outcome

- ✅ Impact: licence content is fully governed and renders in both locales, while remaining invisible to degree navigation.
- 🧪 Tests: 224/224 vitest (18 walker tests), 21/21 review, 7/7 gates; FR-013, SC2, SC3, SC4 all verified.
- 📁 Files: licence track entry, third docs-plugin instance, sidebars-licence.ts, navbar entry, search indexing, 5 new tests.
- 🔁 Next prompts: US3 (T034-T041) - catalogue EED-313, widen the category enum, migrate CourseOptionGroup, extend check-add-course.
- 🧠 Reflection: the ordering regression is the argument for writing the new track's tests before wiring it up. One track cannot reveal a sort that only matters with two.

## Evaluation notes (flywheel)

- Failure modes observed: a comparator silently lost in a refactor that no existing test could expose; "the gate sees it" being unprovable until the gate is given something it will actually judge.
- Graders run and results (PASS/FAIL): FR-013 PASS; SC2 six-of-six PASS; SC3/SC4 PASS; suites PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): in US3, add EED-313 and confirm check-add-course's new licence probe passes without any platform edit, which is Article V.4's real test.
