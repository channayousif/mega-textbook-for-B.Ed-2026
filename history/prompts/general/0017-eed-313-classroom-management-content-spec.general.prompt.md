---
id: 0017
title: EED-313 Classroom Management content spec
stage: general
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: none
branch: content/eed-313-content-spec
user: M Yousif Channa
command: author the Classroom Management module
labels: ["eed-313", "licence-track", "content-spec", "g1", "classroom-management"]
links:
  spec: specs/content/licence-blueprint.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/eed-313/content-spec.md (new, 349 lines)
 - history/prompts/general/0017-eed-313-classroom-management-content-spec.general.prompt.md
tests:
 - npm run check:content (7/7)
 - topic partition total and disjoint across all 4 units (PASS)
 - 49 sub-topics, 30 figures planned, zero em dash
---

## Prompt

author the Classroom Management module

## Response snapshot

The `author-unit` skill stops at a hard prerequisite: the unit's content-spec subsection must
already carry the sub-topic checklist, topic list, depth budget, figure plan and assessment
blueprint, and it says explicitly that producing those is G1, not the skill's job. `EED-313` had
no content-spec at all, so G1 was the real first step.

Three decisions were surfaced before writing, because each changed the document materially:
a licence-track module has no semester and the pipeline hard-requires
`docs/semester-N/<course>/unit-NN/`; bilingual authoring would queue four G5 certifications behind
a one-person gate; and the roadmap sequences v4.0 before authoring. Owner chose a new top-level
licence tree, English first with Urdu later, and content-spec now with authoring after v4.0.

Read the guide properly rather than trusting its semester outline. The outline made Unit 1 look
like it skipped learning theories despite its title; the session bodies show week 1 session 2 is
behaviourism, cognitivism and constructivism, with session 3 deriving classroom management from
them. The enumeration reflects the bodies, not the outline.

Produced the G1 spec for all four content units (unit 5 of the guide is a course review, not
content): 49 sub-topics, 4/3/4/4 topic partitions verified total and disjoint, 30 figures planned
against the Art. III.10 density floor with a required schematic in each unit, and 10/10/5
assessment blueprints. Added a licence-coverage table showing all ten STEDA Classroom Management
sub-topics resolve to a unit here, which is the claim the module exists to make good, and a note
that the RRQ/ERQ register should match the `Comprehension and analysis` level STEDA samples rather
than recall prompts.

Recorded one blocker prominently: the licence tree does not exist. `validate-content.mjs`,
`check-unit-depth.mjs`, `build-content-index.mjs`, the sidebar generator, the catalogue schema and
`review-evidence.mjs`'s `inputManifest` all assume `docs/semester-N/`. Authoring cannot start until
that is built, and it should be scoped alongside v4.0.

## Outcome

- ✅ Impact: the only STEDA Part II area with no degree-corpus host now has an approved-shape G1 spec and a verified coverage claim.
- 🧪 Tests: check:content 7/7; partition total and disjoint PASS; zero em dash.
- 📁 Files: specs/content/eed-313/content-spec.md (349 lines) plus this PHR. No docs/ content written, per the v4.0 sequencing decision.
- 🔁 Next prompts: scope the licence-tree infrastructure spec; land v4.0; freeze; then author unit 1.
- 🧠 Reflection: the semester outline and the session bodies disagreed about what Unit 1 contains, and only the bodies were right. Worth reading guide bodies before enumerating sub-topics on any future course.

## Evaluation notes (flywheel)

- Failure modes observed: a course guide's own summary table understating its content; a pipeline whose path assumptions silently exclude a whole content class.
- Graders run and results (PASS/FAIL): check:content PASS; partition verification PASS; licence coverage 10/10 sub-topics mapped PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): check whether the other seven 2025 guides' semester outlines also understate their bodies, since the blueprint's unit counts were read from outlines.
