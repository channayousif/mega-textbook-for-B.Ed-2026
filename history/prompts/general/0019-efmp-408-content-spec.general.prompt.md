---
id: 0019
title: EFMP-408 content spec
stage: general
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: none
branch: content/efmp-408-content-spec
user: M Yousif Channa
command: now author EFMP-408, it carries most licence objectives
labels: ["efmp-408", "content-spec", "g1", "licence-blueprint", "assessment"]
links:
  spec: specs/content/licence-blueprint.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/content-spec.md (new, 353 lines)
 - catalog/courses.json (EFMP-408 catalogued in Semester 4)
tests:
 - npm run check:content (7/7)
 - topic partitions total and disjoint across all 6 units (PASS)
 - 52 sub-topics, 16 licence objectives mapped, zero em dash
---

## Prompt

now author EFMP-408, it carries most licence objectives

## Response snapshot

Did not re-ask the v4.0 sequencing question. The owner answered it for `EED-313` on 2026-09-13 -
content-spec now, author after the standard freezes - and this is the same question, so the
precedent was applied and stated rather than re-litigated. The `author-unit` skill also stops at
the same hard prerequisite: no content-spec, no authoring.

Built the G1 spec from the approved 2026 guide, which is the authority for a degree course under
Art. II. Sixteen weeks, six CLOs; weeks 8 and 16 are review and examination, so six units
partition the 14 content weeks. 52 sub-topics, partitions verified total and disjoint, figure plans
against the Art. III.10 density floor with a required schematic per unit, 10/10/5 blueprints.

**Why this course carries 16 objectives is now recorded in the spec**: the 2026 revision merged two
2025 courses into it, `EED-411` Classroom Assessment and `EED-624` Test Development and Evaluation.
Both guides are in the repository and are named at the top of the spec as required reading for
authoring, because the licence examiner wrote its syllabus from them. Every one of the 16
objectives is mapped to a unit in a table.

**One genuine gap found, and left open rather than papered over.** Licence objective 5, "assessment
policies and practices in Pakistani schools", appears in the licence syllabus and the `EED-411`
guide but **not** in the 2026 `EFMP-408` outline. Authoring strictly to the degree guide would
leave one of the sixteen uncovered. Two options are recorded for decision before Unit 6 is
authored: carry it as an enrichment sub-topic sourced from the `EED-411` guide and cited as such,
or map it to `EFMP-303` and record the objective as served there. It must not be invented into
Unit 6 without a source (Art. II.3).

Also catalogued `EFMP-408` in Semester 4, which had been empty.

## Outcome

- ✅ Impact: the highest-value course on the licence axis has an approved-shape G1 spec with all 16 objectives mapped, ready to author the moment the standard freezes.
- 🧪 Tests: check:content 7/7; partitions PASS; zero em dash.
- 📁 Files: content-spec (353 lines), catalogue entry, this PHR.
- 🔁 Next prompts: decide licence objective 5's home; land v4.0 and freeze; then author Unit 1.
- 🧠 Reflection: the merge of two 2025 courses is not incidental trivia - it is the reason this course outranks every Semester I and II course on the licence axis, so it belongs in the spec where an author will see it.

## Evaluation notes (flywheel)

- Failure modes observed: a degree guide that does not cover everything the licence tests, which only a per-objective mapping reveals.
- Graders run and results (PASS/FAIL): partition total+disjoint 6/6 PASS; 16/16 objectives mapped PASS; check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run the same objective-by-objective check against EFMP-409, the second-ranked course, and see whether it also has an uncovered objective.
