# EFPG-401 Unit 5 Independent G3 English Review Summary

**Reviewed commit:** `0763fd82f89122bb83f1e488a22a0de21016a154`
**Stage:** G3 English review
**Reviewer:** `agent:claude` (Claude Opus 5.5, `claude-opus-5-5`), run `crew-job:efpg-401-u05-review_en`
**Author run:** `crew-job:efpg-401-u05-author` (opencode). This session did not draft or translate the unit.
**Disposition:** revise (advisory only)

## What holds

The unit covers all ten approved Lesson Planning leaves (guide section 5, `3rd 2026.txt:74-81`;
content-spec U5-01 to U5-10) in seven topic files, each with a Sindh classroom situation, an
explanation, a worked plan, a collaborative activity, a retrieval check, a practicum task and a
summative task with a rubric. Explanations are readable at HSC level. The assessment meets the
10/10/5 blueprint with one Create-level ERQ. I solved all ten MCQs before opening the answers
section (B, B, C, B, B, A, B, B, B, B) and agree with the key on all ten. All six mandatory
checks and the 14 content gates passed.

## Blocking findings (repair before a fresh review)

1. **Topic 5.2, Activity: The missing step** (`topic-02.mdx:71-73`). The prompt says one step is
   missing, but the quoted plan lists all seven steps (outcome, warm-up, presentation, practice,
   production, assessment, homework). The task has no determinate answer. Remove a step from the
   quoted plan (for example the warm-up or a real production task) or reword the task as
   "diagnose the weakest step".
2. **Source attributions exceed the unverifiable-source declaration.**
   `sources/unit-05.md` declares Celce-Murcia (1991) and Sheikh (1998) as title-level support only,
   with Sheikh scoped to U5-10. The prose nevertheless attributes specific claims to both:
   Sheikh at `topic-01.mdx:47` and `topic-03.mdx:71` (neither is U5-10), and Celce-Murcia
   "reminds / notes / emphasises" at `topic-01.mdx:67`, `topic-04.mdx:62`, `topic-05.mdx:65`,
   `topic-06.mdx:59` and `topic-07.mdx:55`. The grammar claim in Topic 5.7 is credited to
   Celce-Murcia although the coverage matrix maps U5-10 to Sheikh. None of these is disclosed as
   uncorroborated. Either recast them as the unit's own guidance, disclose that the source was not
   read, or bind source text that supports them, and align the coverage and declaration scope.

## Uncertain (not verifiable in this attempt)

- The bound Paulsrud and Gheitasi record is an abstract-level paraphrase. The claims at
  `topic-01.mdx:43` (teachers "read the class in front of them" and the outcomes, "not a fixed
  recipe") and `topic-03.mdx:37` (resource-stance teachers choose activities that bring in home
  languages) go beyond those notes.
- Render evidence is unavailable. Production is built from
  `331c3fc1720593a1b53c129fc71ec144d44f4f35`, and five Unit 5 English files plus five WebP
  illustrations differ from the reviewed HEAD, so under the crew brief no browser, 360px, keyboard
  or A4 print inspection was run. Accessibility stays unverified.

## Advisory

- `fig-U5-2.svg:39,41` prints "180 units" under both bars, a leaked geometry value with no meaning
  for the learner.
- Alt text drift: fig-U5-1 says "from a warm-up game to a review quiz", but the figure shows naming
  objects and writing three sentences; fig-U5-14 says form, meaning and use are labelled at each
  step, but it labels meaning, use, use.
- MCQ key: 8 of 10 items are keyed B, which makes the answer position predictable.
- RRQ 7 (`unit-assessment.mdx:107`) contrasts a "comprehension" question with an "inferential"
  one, while Topic 5.5 treats both as comprehension questions (literal to inferential). "Literal
  question" would match the teaching.
- `topic-06.mdx:59` cites process writing (drafting and feedback), but the taught guided sequence
  has no drafting or feedback step.

## Process notes

An earlier incomplete attempt under the same job left uncommitted logs and a summary with no
report JSON. That material was never committed or validated; this attempt replaced it with its own
prepared manifest, command logs and report. Its main finding (Topic 5.2) was independently
confirmed here.

This report is advisory. It does not certify G3, sign evidence or authorise a tracker done state.
