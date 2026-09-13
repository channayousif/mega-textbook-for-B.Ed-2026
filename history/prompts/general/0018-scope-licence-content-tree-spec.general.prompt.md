---
id: 0018
title: Scope licence content tree spec
stage: general
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: spec/015-licence-content-tree
user: M Yousif Channa
command: merge 45 when green, then scope the licence-tree spec
labels: ["spec-015", "licence-tree", "content-architecture", "refactor", "scoping"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: null
  pr: null
tests:
 - npm run check:content (7/7)
 - surveyed 18 files touching semester paths; 6 identified as hard path assumptions
---

## Prompt

merge 45 when green, then scope the licence-tree spec

## Response snapshot

Surveyed the real change surface rather than estimating it. 18 files mention semester; six are
hard path assumptions and the rest read catalogue data. All six share one pattern: walk `docs/`
for `^semester-\d+$`, thread a numeric `semester` through the check function, then rebuild the
Urdu path as `semester-${semester}` under a hardcoded `UR_BASE`.

Two findings shaped the spec:

**There is precedent.** ADR-0009 already added a second docs-plugin instance for `guides/`, with
its own id, route, content folder and sidebar, reusing site i18n and joining `docsRouteBasePath`
for search. The licence tier is the same move a third time, so FR-005 follows it rather than
inventing an approach.

**The Urdu path is a trap.** Docusaurus derives translation directories from the plugin id, and
`i18n/ur/docusaurus-plugin-content-docs-guides/` already exists as proof. A licence unit's mirror
is therefore `docusaurus-plugin-content-docs-licence`, not the default tree the gates hardcode.
Without FR-006 the parity gate would compare a licence unit against the wrong tree and pass a unit
with no Urdu mirror at all. That is now a named risk.

Framed the work as consolidation rather than expansion: one shared content-root walker replacing
five copies of the same derivation, which is the Spec 013 move applied to paths instead of gate
lists. FR-009 makes byte-identical degree-corpus results the acceptance test, so the refactor is
provably behaviour-preserving before the licence tier is switched on.

Left three open questions genuinely open: the catalogue tier key, the route name, and whether the
licence tier appears in degree navigation at all.

## Outcome

- ✅ Impact: the blocker on the Classroom Management module is now a scoped feature with a measurable acceptance test.
- 🧪 Tests: check:content 7/7; zero em dash.
- 📁 Files: specs/015-licence-content-tree/spec.md (92 lines) plus this PHR.
- 🔁 Next prompts: owner approval and the three open questions; then plan and tasks; land before v4.0 so the two do not interleave in the same gate files.
- 🧠 Reflection: reading the guides instance's i18n directory turned a plausible assumption into a named risk. The gates would have passed a licence unit with no Urdu at all.

## Evaluation notes (flywheel)

- Failure modes observed: five scripts independently re-deriving the same path rule, which is how the semester assumption became load-bearing without anyone choosing it.
- Graders run and results (PASS/FAIL): check:content PASS; survey of semester references complete (18 files, 6 hard assumptions) PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): write the content-roots walker first and prove FR-009 on the degree corpus before any licence directory exists.
