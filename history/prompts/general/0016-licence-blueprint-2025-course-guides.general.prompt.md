---
id: 0016
title: Licence blueprint from 2025 course guides
stage: general
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: none
branch: content/licence-blueprint-2025-guides
user: M Yousif Channa
command: guides are in course-guides-2025/
labels: ["licence-blueprint", "steda", "course-guides-2025", "eed-313", "sourcing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/licence-blueprint.md
 - Scheme-and-Course-guides/B.Ed (4-Year) 2025-2.docx
 - Scheme-and-Course-guides/extracted-text/course-guides-2025/ (8 files)
 - .gitignore
tests:
 - npm run check:content (7/7)
 - dirtyInputs on a bound root: 27 -> 1
---

## Prompt

guides are @Scheme-and-Course-guides/course-guides-2025/ as well as https://app.box.com/s/hrgsm9p7tpkzr7b1wbsn8bcsxlvg73xc

## Response snapshot

All eight STEDA Part II guides were present locally, so the Box link was not needed. Extracted
1,142 pages across the eight, all with clean text layers.

**The decisive finding: the STEDA syllabus is these guides' unit lists, copied verbatim in
order.** Verified on two guides:

- `ClassroomMgmt_Sept13.pdf` units 1-4 are, word for word, the four Classroom Management
  sub-topics in the licence syllabus.
- `FoundationsEd_Sept13.pdf` units 1-5 are the five Foundations sub-topics, in order.

The same pattern holds across `SchoolCommTeacher`, `ChildDevpt`, `EduPsy`, `MethodsTeaching`,
`ClassroomAssess` and `TestDevEval`. The licence syllabus is a table of contents, which turns the
blueprint's mapping from inference into an exact crosswalk.

**Classroom Management fully specified.** `EED-313` has no 2026 successor and the licence tests it
at two sampled CRQ items. Its five units are now named and sourced; recommended as a four-unit
licence-track module (Unit 5 is a course review) from the smallest guide in the set at 56 pages -
the highest licence value per unit authored, since nothing else in the corpus covers it.

**Storage.** The guides are 108 MB against a 27 MB git history, and `Scheme-and-Course-guides` is
a review-evidence manifest root, so 27 untracked files under it made `review:evidence prepare`
refuse. Committed the 152 KB scheme docx and the 2.1 MB of extracted text, gitignored the PDF/RTF
binaries with a comment saying the decision is reversible, and recorded it as an open decision in
the blueprint. Dirty bound inputs went 27 to 1, the remaining one being the long-untracked
brand-strategy PDF.

## Outcome

- ✅ Impact: the licence mapping is now exact rather than inferred, and the largest gap has a named source, a unit list and a recommended shape.
- 🧪 Tests: check:content 7/7; dirtyInputs 27 -> 1; zero em dash.
- 📁 Files: blueprint rewritten at Part II, 8 extracted guides committed, scheme docx committed, .gitignore extended.
- 🔁 Next prompts: author the Classroom Management module; scope EFMP-408 against both EED-411 and EED-624 guides; decide the binary-storage question.
- 🧠 Reflection: the whole mapping rested on inference until the guides arrived; one verbatim comparison replaced a page of hedged reasoning.

## Evaluation notes (flywheel)

- Failure modes observed: a manifest root silently blocking `prepare` when a large untracked drop lands in it - worth knowing the gate behaves this way before content work, not during.
- Graders run and results (PASS/FAIL): check:content PASS; verbatim correspondence on two guides PASS; prepare unblocked PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): extract the remaining 17 guides and check whether any covers School Community and Teacher's 2026 gap.
