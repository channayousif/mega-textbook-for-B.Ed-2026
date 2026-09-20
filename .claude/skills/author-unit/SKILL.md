---
name: author-unit
description: >-
  Author or re-draft one course unit as nested per-topic learning cycles (Spec 008 v3.0 unit
  structure standard): an index opening, one nine-part topic file per topic, a unit-assessment
  file with a 10/10/5 question bank and a bounded answers section, and an optional
  unit-teacher-notes file - then emit the unit's coverage matrix (v2), sources-consulted list,
  and figure manifest. Use when asked to "author a unit", "draft unit content", "restructure a
  unit", "re-draft a unit to the per-topic standard", "write EFMP-xxx Unit N", or to bring a
  unit up to the unit structure standard / v3.0 style guide. Produces gate-passing,
  concept-complete, HSC-register bilingual-ready English content grounded in real cited sources.
---

## Independent review handoff

For G3/G5, hand a frozen bundle to a fresh `g3-reviewer` or `g5-reviewer` session using
`.claude/skills/review-unit/SKILL.md`. Do not provide the author's private reasoning or ask
for approval. Apply findings in a separate author pass and request fresh review after edits.
Review reports are advisory until the reviewer has signed qualification and scope activation
under ADR-0019. Agent tracker rows require accepted signed evidence; never reuse YM initials
for agent work. Existing human review remains available. See the Feature 014 evidence contract.


# author-unit

Turn one unit's approved content-spec subsection + its course guide into a nested per-topic
unit (Spec 008): `index.mdx` (opening) + `topic-01.mdx … topic-NN.mdx` (one nine-part learning
cycle each) + `unit-assessment.mdx` (chapter summary + 10 MCQ / 10 RRQ / 5 ERQ + a bounded
`## Answers and marking guidance` section) + an optional `unit-teacher-notes.mdx` - plus the
governance artefacts the gates read: `coverage/unit-NN.md` (v2), `sources/unit-NN.md`,
`figures/unit-NN.md`, `concepts/unit-NN.md` (v4.0).

**The concept graph (v4.0)** records what a learner must understand and in what order, where the
other three record what the unit covers, what grounds it and what it shows. See
`## Concept graph (v4.0)` in the style guide and
`specs/016-concept-graph-v4/contracts/concept-graph.md`. Two rules matter while authoring:

- `Label UR` comes from `terminology.csv` where the term is banked. Authored labels go in a list at
  the foot of the concepts file for G5 review, because a governance file never passes the parity
  gate and nothing else would catch a poor one.
- Assessment item IDs are **derived** from the existing 10/10/5 numbering (`MCQ-01`, `RRQ-07`,
  `ERQ-03`). Never add IDs to prose: leaving `unit-assessment.mdx` untouched is what keeps the
  parity gate green and every unit's `translation_status` where it was.

**One skill, no sub-agent.** The research → design → draft → self-review → run-gates loop needs
the harness's own `WebSearch`/`WebFetch` and the "run a gate, read the failure, fix, re-run"
cycle in the main loop.

**Inputs you need before starting**

- `course_code` and `unit_no` (e.g. EFMP-302, Unit 1).
- `specs/content/<course-code>/content-spec.md` - the approved content-spec. The unit's
  `## Unit N` subsection MUST already carry: a `### Sub-topic checklist` table (with a `Topic`
  column), a `### Topic list` table, a re-baselined `**Depth budget**` line, a `**Figure plan**`
  and a `**Unit-end assessment blueprint**`. Those are stage G1 / Spec 008 US2 - **not this
  skill's job**. If any is missing, stop and ask for the content-spec to be completed first.
- The course guide extract: `Scheme-and-Course-guides/extracted-text/<file>.txt`, the block for
  this course/unit.
- References: `references/structure-standard.md` (the shape + every gate rule),
  `references/pedagogy-checklist.md` (how to make each of the nine parts land),
  `references/item-writing.md` (MCQ/RRQ/ERQ rules + the 10/10/5 blueprint),
  `references/answers-block-formatting.md` (the bounded answers section),
  `references/figure-prompts.md` (FIGURE markers + the manifest),
  `references/citation-and-register.md` (citation form + register).

**Out of scope**: generating/optimising/placing images (a later pass); the graded LMS quiz
bank (Spec 003, RLS-protected - different from this file's public self-study answers).

---

## Step 1 - Gather sources, per topic

1. Read the guide's unit block **verbatim**. List every leaf sub-topic; confirm it matches the
   `### Sub-topic checklist` IDs. If the guide says something the checklist misses, stop and
   flag it to the curriculum owner - the checklist is authoritative; fixing it is a G1 action.
2. Read the `### Topic list`. For **each topic row**, note its `Sub-topic IDs` - that is the
   slice of the checklist this topic file must teach.
3. For each `**Mapped readings**` key, get the full reference from the content-spec
   `## Reading list`. For any fact/claim you need to cite and don't already have a source for:
   use `WebSearch` / `WebFetch` to find a **topically-related** open-access source (UNESCO,
   OECD, ERIC, a government standards document, an established open textbook). Verify the title,
   authors, year, and DOI/URL resolve. **Never invent a citation, DOI, or quotation.**
4. If a sub-topic has no mapped reading and no verifiable topically-related open-access source:
   cover it from the guide text + general knowledge, add a `no-external-source` row to
   `sources/unit-NN.md`, and escalate the gap in `specs/gaps.md`.
5. Keep a running list `{key, full citation, url/doi, what it supports, kind}` - becomes
   `sources/unit-NN.md`. Each topic's `## Further reading` will cite a subset of it.

## Step 2 - Design backward, per topic (Understanding by Design)

For **each topic** in the `### Topic list`:

1. Write 1–3 **enduring understandings** for that topic (what a learner still grasps a year on).
2. Decide the topic's **assessment evidence**:
   - `## Check your understanding` - ≥ 3 retrieval items, Remember → Apply, that actually test
     those understandings (produce/define/classify/justify, not recognise);
   - `## Self-assessment checklist` - ≥ 3 "I can …" statements mirroring the understandings;
   - `## Summative task` - one task + a mini-rubric; **≥ 1 rubric criterion demands
     Analyze-or-higher** (Constitution Art. III.3).
3. Build a small **Bloom mini-table** over that topic's sub-topic IDs: sub-topic → target Bloom
   level → the `### …` heading under `## Explanation` that teaches it → where it is assessed.
   Every sub-topic ID in the topic's slice must appear.

Then, for the **whole unit**, plan the `unit-assessment.mdx` bank from the content-spec
`**Unit-end assessment blueprint**`: exactly **10 MCQ / 10 RRQ / 5 ERQ**, every item Bloom-
tagged, spread across all topics per the blueprint (see `references/item-writing.md`).

## Step 3 - Draft the files

Apply `references/pedagogy-checklist.md` throughout. Register: **plain English for a fresh
HSC/intermediate graduate (Art. III.1)** - deeper concepts, not harder words
(`references/citation-and-register.md`).

### `index.mdx` - the unit opening (orientation only, no exposition body)

Required `##` sections, in this order: `## Unit learning outcomes`; `## Prerequisite
knowledge`; `## In this unit` (an **ordered list, one item per topic file**, each linking
`./topic-NN`); `## How to use this unit`. Keep `<TranslationStatusBadge status="…" />` at the
top. **No `<PrintHandout />`. No exposition.** The Spec 007 `## Common misconceptions` /
`## Further reading` requirement does **not** apply here - it moves into each topic file.

### `topic-01.mdx … topic-NN.mdx` - one nine-part cycle each

Front matter = the unit schema **plus** `topic_no` (== the filename ordinal) and `topic_label`
(the `### Topic list` label, e.g. `"1.1"`). `clo_refs` = the subset the topic serves. Add
`<PrintHandout />` at the top (a topic cycle is a self-contained printable lesson).

The nine canonical `##` headings, **in this exact order** (contract: `contracts/topic-cycle.md`):

1. `## A real classroom situation` - a short, concrete, Pakistan/Sindh-grounded vignette that
   sets up the topic. Put `{/* FIGURE[fig-U<n>-<seq>]: …; alt: … */}` markers here and in
   `## Explanation` - **≥ 2 markers per topic file**, and the unit as a whole needs **≥ 1
   `concept-map` / `flowchart` / `timeline`** (Constitution Art. III.10). Name the archetype for
   each in the content-spec `**Figure plan**` - see `references/figure-prompts.md`.
2. `## Explanation` - the teaching. A `### …` sub-heading per sub-topic ID in this topic's
   slice; ~one concrete Pakistan-grounded example per sub-topic; paraphrase-and-cite the mapped
   readings; **name and correct this topic's misconception here**. Define new terms on first
   use (`glossary.json` + `<Glossary>`). Show a **worked example before** asking the learner to
   perform the move.
3. `## Activity: <name>` - one genuinely collaborative task (pairs/groups), Pakistan classroom
   context, with a rough time box.
4. `## Check your understanding` - **≥ 3** top-level numbered items, Remember → Apply, retrieval
   not recognition. Bloom-tag each `*(Apply)*`.
5. `## Summary` - a short recap of the topic's enduring understandings.
6. `## Self-assessment checklist` - **≥ 3** `- [ ]` "I can …" statements.
7. `## Try this at your practicum school` - a transfer task the trainee does on placement.
8. `## Summative task` - one task + a **mini-rubric**; ≥ 1 criterion demands Analyze-or-higher.
9. `## Further reading` - **≥ 1** real citation/link line (APA-ish; DOI/URL when one exists).

### `unit-assessment.mdx`

Front matter = the unit schema (no `topic_no`/`topic_label`). `<PrintHandout />` at the top.
Sections, in order:

- `## Unit summary` - the chapter summary; recaps the unit's enduring understandings.
- `## Summative assessment` containing `### Multiple-choice questions (MCQs)` (**exactly 10**
  top-level numbered items), `### Restricted-response questions (RRQs)` (**exactly 10**),
  `### Extended-response questions (ERQs)` (**exactly 5**). Every item Bloom-tagged.
- `## Answers and marking guidance` - **MUST be the file's final `##` section**, exactly this
  heading (case-sensitive, no trailing text). `### MCQ answer key` (letter + one-line
  justification); `### RRQ model answers and mark schemes`; `### ERQ rubrics` (analytic; ≥ 1
  demands Analyze-or-higher). Prose only - **no** `answer_key:` / `answers:` / `marking_scheme:`
  / `rubric_answers:` front-matter keys anywhere. See `references/answers-block-formatting.md`.

### `unit-teacher-notes.mdx` - OPTIONAL

Include only where the course guide supplies teaching strategies / practical work (Art. III.6).
Front matter = the unit schema; `blooms_summary` notes "no assessment items". Body: teaching
strategies, sequencing, likely misconceptions and how to handle them, a "Practical work" block.
**No assessment items.**

### Reading-minutes

Recompute `est_reading_minutes` on every file from its final word count (~180–200 wpm). The
**sum** across `index.mdx` + every `topic-*.mdx` + `unit-assessment.mdx` (+
`unit-teacher-notes.mdx` if present) must land inside the content-spec `**Depth budget**` `A–B`
band. If the draft lands outside, tell the curriculum owner the actual total so the band can be
re-baselined (T049) - do **not** pad or trim prose to hit a number.

## Step 4 - Self-review, then emit the artefacts

Run the checklist in `references/structure-standard.md`. Then write:

- **`specs/content/<course-code>/coverage/unit-NN.md`** - per
  `contracts/coverage-matrix-v2.md`: `| Sub-topic ID | File | Section | Source |`. `File` ∈
  `{index.mdx, topic-01.mdx … topic-NN.mdx, unit-assessment.mdx, unit-teacher-notes.mdx}`;
  `Section` = the exact heading (normally the `###` under a topic's `## Explanation`). Every
  checklist ID mapped; **every `topic-NN.mdx` named by ≥ 1 row**; for every checklist ID, ≥ 1
  row names the exact `topic-NN.mdx` its `### Topic list` row assigns it to. A second
  `## Reinforcement` table is allowed.
- **`specs/content/<course-code>/sources/unit-NN.md`** - per
  `contracts/sources-consulted.md`: `| Key | Citation | URL/DOI | Supports | Kind |`. Every key
  cited in the coverage matrix appears here; no unused non-`no-external-source` keys.
- **`specs/content/<course-code>/figures/unit-NN.md`** - per
  `specs/009-figure-rendering/contracts/figure-manifest-v2.md` (v3 `Kind` vocabulary):
  `| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`. One row per FIGURE marker
  (**≥ 2 per topic**); `Topic` = the marker file's `topic_label`; `Kind` = the planned archetype
  (`table` \| `concept-map` \| `flowchart` \| `timeline` \| `diagram` \| `illustration`), with
  **≥ 1 `concept-map` / `flowchart` / `timeline` in the unit**; `Prompt` / `Alt text` match the
  marker; `Src` blank; `Status` = `prompt-only`. Marker-ID set **==** manifest-ID set, both ways.

Then run, and fix every finding:

<!-- BEGIN GENERATED gate-commands -->
```bash
# after every edit (fast)
npm run check:content

# before opening a PR (adds check:add-course, tests and a full build)
npm run check:all
```

`check:content` runs, in order: `validate:content` -> `check:pipeline-gate` -> `check:depth-gate` -> `check:figures` -> `check:no-em-dash` -> `check:no-answer-keys` -> `check:concept-graph` -> `check:bloom-bands` -> `check:docs-sync`.
<!-- END GENERATED gate-commands -->

`check:pipeline-gate` may be **red** for this unit until its `tasks.md` G2/G3 rows re-clear the
human Content gate - that is expected during a re-restructure, not a defect. A green
`check:depth-gate` is **structural only**; the curriculum owner's Content-gate pass
(traceability, register, example aptness, source relevance, topic grouping, figure-prompt
aptness, rubric soundness, whether the hooks land) is the real acceptance.

## If this is a re-draft / re-restructure of an already-reviewed unit

The English re-restructure invalidates the reviewed Urdu mirror and changes its file set.
After Step 4, in `i18n/ur/docusaurus-plugin-content-docs/current/…/unit-NN/`:

- delete orphan UR files that no longer have an EN counterpart (`activities.mdx`,
  `formative.mdx`, `summative.mdx`);
- `git mv` UR `teacher-notes.mdx` → `unit-teacher-notes.mdx` if a teacher-notes file is kept;
- rewrite UR `index.mdx` to the new opening skeleton;
- add UR `topic-01.mdx … topic-NN.mdx` + `unit-assessment.mdx` as **heading-only skeleton
  stubs** mirroring the EN heading vectors, each carrying the **same** FIGURE marker IDs as its
  EN counterpart, all `translation_status: draft`;
- set `<TranslationStatusBadge status="draft" />` in the UR `index.mdx`;
- in the course `tasks.md`, re-open `Unit N | G2 en-draft` / `G3 en-review` to `▣` and note
  that `G4 ur-translation` / `G5 ur-review` scope changed to the per-topic layout.

The parity gate skips `draft`; the `ur` route falls back to English behind Spec 001 FR-003's
"translation in progress" banner until the downstream G4/G5 re-review - expected, not a breach.
**Do not merge the branch** between this `tasks.md` edit and the human Content-gate pass -
`check:pipeline-gate` is red for the unit by design in that window.
