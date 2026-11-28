# EFPG-402 Unit 5 Independent G3 English Review Summary

**Reviewed commit:** `e29224ece005924eae6038b8fe42c236d1c66fd4`
**Stage:** G3 English review
**Reviewer:** `agent:claude-crew` (Claude Code, model identity LongCat-2.5), run `crew-job:efpg-402-u05-review_en`
**Author run:** `crew-job:efpg-402-u05-author`. This session did not draft, translate or illustrate the unit.
**Disposition:** revise (advisory only)

## What holds

The unit covers all eight approved Lesson Planning leaves (guide section 5, `4TH SEMESTER.txt:772-778`;
content-spec U5-01 to U5-08) in five topic files, each with a Sindh classroom situation, an explanation, a
worked example, a collaborative activity, a retrieval check, a summary, a self-assessment checklist, a
practicum task and a summative task with an Analyze-or-higher mini-rubric. The 5E model (Topic 5.2) and
Rowe's wait-time (Topic 5.4) are grounded in committed bound excerpts and read accurately, except for one
sentence. The assessment meets the 10/10/5 blueprint with the required Create-level 5E lesson-plan item
(ERQ 2). I solved all ten MCQs before opening the answers section (C, B, C, C, C, B, B, C, B, C) and agree
with the key on all ten. All six mandatory deterministic checks, `check:content` (14 gates),
`check:concept-graph`, `check:bloom-bands` and `measure-figure-text` pass.

## Blocking findings (repair before a fresh review)

1. **Topic 5.4 misstates Rowe.** `topic-04.mdx:68` says increasing wait-time makes "speculative guessing
   drop". The bound excerpt (`sources/texts/rowe-1974-waittime.md:16`) says the opposite: "The incidence
   of speculative responses increased." Replace with the documented effect (for example "failures to
   respond decrease" or "speculative responses increase").
2. **The sources declaration overstates its grounding.** `sources/unit-05.md:16` states that "each
   sub-topic they are mapped to is also grounded in a source with a bound excerpt or a verifiable
   open-access reference". The coverage matrix maps U5-02 (Herbartian) and U5-07 (explanation skills) to
   `yadav-2002` alone, and U5-03/U5-08 to `mager-1962-objectives` / `wellington-2012-management`, which are
   themselves declared unverifiable. The prose attributes the lesson-plan definition (`topic-01.mdx:42`),
   the Herbartian five steps (`topic-02.mdx:44`), the ABCD framework (`topic-03.mdx:56`) and the
   management framing (`topic-05.mdx:48`) to these unread sources with no disclosure that the text was not
   read. Bind supporting text, recast these as the unit's own guidance with the limit stated, or correct
   the declaration to name the sub-topics that rest on unread sources.

## Uncertain (not verifiable in this attempt)

- **Render tool limitation.** `scripts/render-inspect.mjs` exited 1 with 10 defects, all of the form
  "fig-U5-12: variant light not served" for the five WebP classroom illustrations. Section D builds its
  geometry URL as `<id>.svg`, but those figures are `.webp`, so the URLs 404 by construction. The live
  production inspection (deployed SHA `e29224ece`, equal to the reviewed HEAD) verified all 7 pages clean
  at desktop 1280x900, narrow 360x780 and A4 print 794px, all 10 schematic SVGs clean on text geometry, and
  all five WebP images served and rendered. Accessibility is treated as unverified rather than a content
  defect.

## Advisory

- `fig-U5-4` alt text (`topic-02.mdx:76`, `figures/unit-05.md`) says "four criteria: philosophical basis,
  teacher role, student role, and ideal classroom use", but the figure's rows are Theory, Teacher Role,
  Student Role, Sequence and Explanation; "ideal classroom use" is not in the figure.
- `unit-assessment.mdx` MCQ key: A 0, B 4, C 6, D 0. Options A and D are never correct, so the position is
  predictable. Rebalance.
- `unit-assessment.mdx` ERQ 4 rubric names an "atmospheric pressure lesson" that the ERQ 4 prompt never
  sets. Align the rubric with the prompt.
- Bare-URL link text in the Further reading lists (`topic-02.mdx:133`, `topic-04.mdx:156`,
  `topic-05.mdx:139`). Use descriptive link text.
- `topic-01.mdx:65` uses "cognitive dissonance" without defining it.
- `fig-U5-7` alt text omits the metacognitive row that the figure shows.
- `topic-02.mdx:80` invites pupils to "taste small safe samples"; school laboratory safety rules usually
  prohibit tasting. Prefer observation and indicator testing, or state the food-grade context.

## Process notes

The production site was eligible for inspection because `git diff --quiet "$(cat ~/deploy/deployed-sha)"
HEAD -- docs/semester-4/efpg-402/unit-05/ static/img/figures/efpg-402/unit-05/` exited 0. No local build,
dev server or Playwright e2e run was performed. The report is advisory: it does not certify G3, sign
evidence, or authorise a tracker done state.
