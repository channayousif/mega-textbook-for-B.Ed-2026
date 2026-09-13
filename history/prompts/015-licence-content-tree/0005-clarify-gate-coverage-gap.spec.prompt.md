---
id: 0005
title: Clarify gate coverage gap
stage: spec
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.clarify (second pass)
labels: ["spec-015", "clarify", "gate-coverage", "content-roots", "art-iii-9"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - specs/015-licence-content-tree/spec.md
 - specs/015-licence-content-tree/plan.md
 - specs/015-licence-content-tree/contracts/content-roots.md
tests:
 - npm run check:content (7/7 after each write)
 - enumerated every script carrying a hardcoded content-root list (2 found)
---

## Prompt

run /sp.clarify

## Response snapshot

Second pass on the spec as it now stands. The first pass had scanned the Integration category too
quickly, and re-scanning found a real gap with a security edge.

**The finding.** FR-002 ports six consumers to the walker, but two gates never consume
`UnitRecord`s at all - they scan whole trees for text patterns against hardcoded arrays:

- `check-no-em-dash.mjs`: `['docs', 'guides', 'i18n', 'specs/content']`
- `check-no-answer-keys.mjs`: `['docs', 'i18n', 'build', 'specs/content']`

Neither lists `licence/`. A licence unit would therefore bypass Article III.9's zero-em-dash rule
entirely, and bypass answer-key leakage detection at source. The answer-key gate would catch a
violation only through `build/`, which does not exist before a build runs, so `npm run check:content`
on a fresh checkout would pass a licence unit containing an answer key.

Verified the extent rather than assuming it: exactly two scripts carry such a list, and the figure
gates are course-keyed (`static/img/figures/<course>/unit-NN/`) so they need no change.

**Decision**: export `CONTENT_ROOTS` from `content-roots.mjs` beside `TRACKS` and `walkUnits`, and
have both gates consume it. FR-001 claimed to be "the single definition of where content lives"
while in fact defining only where *units* live; this makes the claim true for both gate styles.
Routing the pattern gates through `walkUnits()` was rejected because they legitimately scan
non-unit files (`course-overview.mdx`, `_category_.json`, `specs/content/**`), so a unit-shaped API
would lose coverage.

Recorded as FR-014, added to the walker contract with a note that `CONTENT_ROOTS` replaces only the
track-derived part of each gate's list (both keep non-track roots of their own), and added to the
plan's source tree. Success criterion 2 now names all six content gates rather than four, calling
out that the last two are the ones that would silently skip the track today. Success criterion 5
extends from "the semester regex and `UR_BASE` appear once" to include any hardcoded content-root
list.

Stopped at one question. Checked and dismissed three further candidates: the roadmap's
unit-sync-to-Postgres does not exist as a script, figure variants are course-keyed and unaffected,
and observability remains low-impact for a refactor.

## Outcome

- ✅ Impact: closed a gap that would have shipped a track invisible to the zero-em-dash and answer-key gates.
- 🧪 Tests: check:content 7/7; hardcoded-root-list enumeration complete (2 of 2 found).
- 📁 Files: spec.md, plan.md, contracts/content-roots.md, plus this PHR.
- 🔁 Next prompts: /sp.tasks for 015.
- 🧠 Reflection: the first pass trusted FR-001's own wording. Re-reading what it actually delivered, rather than what it claimed, is what surfaced this.

## Evaluation notes (flywheel)

- Failure modes observed: a requirement asserting single-definition status while covering only one of two access patterns; a security gate whose only coverage of a new tree is a build artefact that may not exist.
- Graders run and results (PASS/FAIL): one bullet per accepted answer PASS; asked <= 5 across session PASS (4); no contradictory text remains PASS; terminology consistent PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): after the walker lands, grep for any remaining literal 'docs' in scripts/ and confirm the count is zero outside content-roots.mjs.
