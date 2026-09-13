---
id: 0004
title: Clarify content track model
stage: spec
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 015-licence-content-tree
branch: 015-licence-content-tree
user: M Yousif Channa
command: /sp.clarify
labels: ["spec-015", "clarify", "terminology", "content-tracks", "adr-0020"]
links:
  spec: specs/015-licence-content-tree/spec.md
  ticket: null
  adr: history/adr/0020-content-tracks.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/46
files:
 - specs/015-licence-content-tree/spec.md
 - specs/015-licence-content-tree/plan.md
 - specs/015-licence-content-tree/research.md
 - specs/015-licence-content-tree/data-model.md
 - specs/015-licence-content-tree/contracts/content-roots.md
 - specs/015-licence-content-tree/quickstart.md
 - history/adr/0020-content-tracks.md (renamed from 0020-licence-content-tier.md)
tests:
 - npm run check:content (7/7 after every write)
 - zero occurrences of "tier" across feature 015 and ADR-0020
 - zero stale links to the old ADR filename
---

## Prompt

/sp.clarify

## Response snapshot

Ran out of order - the command expects to precede `/sp.plan`, and planning was already done - so
the scan treated Phase 0's decisions as answered rather than re-asking them.

Two candidate questions were **dropped after checking precedent rather than asked**: a
catalogued-but-unauthored licence course is already covered by the `coming_soon` convention, which
seven of thirteen catalogued degree courses use today; and missing-Urdu fallback was settled by
Spec 001's own clarification (EN fallback plus an "Urdu translation not yet available" banner,
parity enforced only at `translation_status: reviewed`).

Three asked, all integrated immediately:

1. **Identity** - course codes are globally unique across tracks, so `resolveUnit` needs no track
   argument and `EFMP-408` cannot be duplicated into a licence copy. New FR-011.
2. **Ordinal-free grouping** - `CourseOptionGroup` was semester-keyed while a licence course has no
   semester. Generalised to `{ trackId, label, ordinal: number | null, courses }`, so the
   no-ordinal-leakage invariant is carried by the type. New FR-012.
3. **Terminology** - the owner chose "track" over "tier", and the reason reshaped the model rather
   than just the vocabulary: further tracks are anticipated (pre-service, CPD / in-service,
   licence). The degree corpus is therefore the **`pre-service` track**, one that happens to group
   by semester, not a peer of `licence`. Semester grouping became a property of one track instead
   of a property of the content model. New FR-013 requires a third track to be a `TRACKS` entry
   plus a content root plus a plugin instance, with no contract change.

The terminology answer propagated further than a rename: ADR-0020 was retitled from "Licence
content tier" to "Content tracks, and the licence track as the first non-degree one", since the
decision is about introducing tracks rather than about the licence one specifically. File renamed,
all inbound links updated.

Also replaced the spec's now-stale "Open questions" section - all three had been decided in Phase 0
and the spec still presented them as open - and recorded a gap found while integrating R4:
`sidebars-licence.ts` must join `check-add-course.mjs`'s guarded-path list, or adding a licence
course could silently edit the track's own sidebar.

## Outcome

- ✅ Impact: the content model is now anchored on a concept that survives CPD and in-service tracks, rather than on a licence special case.
- 🧪 Tests: check:content 7/7 after each write; zero "tier" in feature 015 or ADR-0020; zero stale ADR links.
- 📁 Files: five feature artifacts, the renamed ADR, and this PHR.
- 🔁 Next prompts: /sp.tasks for 015; owner approval on PR #46 flips ADR-0020 to Accepted.
- 🧠 Reflection: the terminology question looked cosmetic and was the most valuable of the three. "Track" carried a model the owner already had in mind and the spec did not.

## Evaluation notes (flywheel)

- Failure modes observed: a spec that keeps its "Open questions" section after planning answers them, presenting decided matters as undecided to the next reader.
- Graders run and results (PASS/FAIL): one bullet per accepted answer PASS; asked <= 5 PASS (3); no contradictory text remains PASS; only permitted new headings added PASS; terminology consistent across all updated sections PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): name the CPD track in TRACKS as a disabled entry when the walker lands, and see whether FR-013's "no contract change" claim survives first contact.
