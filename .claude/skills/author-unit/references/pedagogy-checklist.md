# Pedagogy checklist (author-unit)

Apply while drafting. These are how a unit reads as *deep* rather than *long*. The human
Content gate judges most of them; use this list so you don't have to be told twice.

## Per-part guidance — the nine-part topic cycle

Each `topic-NN.mdx` is one learning cycle. Each part has a job; do that job, not more.

### 1. `## A real classroom situation` — the hook

- A short, concrete vignette in a **real Pakistani/Sindh setting** — a government primary in
  interior Sindh, a multi-grade rural class, a city GECE practicum. Not "imagine a teacher".
- It must **set up the topic's central tension** — the thing the Explanation resolves. A parent
  asking why a teacher needed two years' training (profession vs occupation); the same lesson
  going two ways (industrial vs inquiry).
- 3–6 sentences. A FIGURE marker usually sits here (or early in `## Explanation`).
- Does the hook *land*? (Human gate.) It lands when a trainee recognises the situation.

### 2. `## Explanation` — the teaching

- A `### …` sub-heading **per sub-topic ID** in this topic's `### Topic list` slice. The
  coverage matrix maps each ID to one of these headings.
- **Worked-example effect.** For any analytical move ("classify this against the four features"),
  show one fully worked example *before* asking the learner to do it. A worked example ≠ a
  definition.
- **Name the misconception here.** State the wrong idea a learner actually arrives with
  (`**Common misconceptions**` in the content-spec lists them), then correct it. Much of the
  depth lives here.
- ~**one concrete Pakistan-grounded example per sub-topic** (Art. III.4).
- Paraphrase-and-cite the mapped readings inline ("Hargreaves (2000) describes four 'ages'…").
- Define each new term on first use → `glossary.json` + `<Glossary term="…">`.

### 3. `## Activity: <name>` — collaborative

- A genuine **pairs / small-group** structure (think-pair-share, jigsaw, structured
  controversy) — not "reflect individually then we'll discuss".
- Pakistan classroom context; a rough time box ("Work in pairs. About 20 minutes.").
- Wire in **retrieval** — the activity should make learners *use* a concept from the Explanation
  (or an earlier topic), not just look it up.

### 4. `## Check your understanding` — formative retrieval

- **≥ 3** top-level numbered items. Bloom-tag each: Remember → Understand → Apply.
- **Retrieval, not recognition.** Ask learners to *produce*: "Define a profession in one
  sentence", "Give one example of each feature", "A friend says teaching is 'just a job' — give
  two reasons it is a profession." Never "Which of the following…".

### 5. `## Summary` — recap

- 2–4 sentences (or a short list) recapping the topic's **enduring understandings** — the thing
  a learner should still hold a year later. Not a table of contents.

### 6. `## Self-assessment checklist` — metacognition

- **≥ 3** `- [ ]` statements, each a real **"I can …"** the learner can honestly check:
  "I can explain the difference between a profession and an occupation." Mirror the enduring
  understandings, not the sub-topic list.

### 7. `## Try this at your practicum school` — transfer

- One task the trainee actually does on placement that transfers the concept to their own
  context: "Ask your cooperating teacher which of the four features they feel most strongly in
  their daily work, and note their answer with one concrete example."
- Bounded — doable in one visit, needs no special permission.

### 8. `## Summative task` — constructive alignment

- One task that requires the topic's **enduring understanding**, plus a **mini-rubric**
  (criteria × brief levels). ≥ 1 criterion demands **Analyze-or-higher** (Art. III.3).
- The rubric must actually match the task ("features identified / evidence used / judgement
  justified"), not generic "clarity / accuracy / effort".

### 9. `## Further reading` — real sources

- **≥ 1** real citation/link line, APA-ish, DOI/URL when one exists. This is where each topic's
  slice of `sources/unit-NN.md` surfaces (per-topic lists replace the single unit-level list).

## The unit-end `unit-assessment.mdx`

- `## Unit summary` — the *chapter* recap across all topics (wider than any one topic's
  `## Summary`).
- `### MCQs` (10) Remember → Apply · `### RRQs` (10) Understand → Analyze · `### ERQs` (5)
  Analyze → Evaluate/Create. Every item Bloom-tagged. See `references/item-writing.md`.
- `## Answers and marking guidance` — the final section; prose keys/rubrics only.
  See `references/answers-block-formatting.md`.

## Cognitive load (all parts)

- **Chunk.** One idea per paragraph; one concept per `###`. Introduce a term, use it, move on
  — don't stack three new terms in a sentence.
- **Manage extraneous load.** No decorative digressions. If a sentence doesn't move a checklist
  sub-topic forward, cut it.

## Making concepts land

- **Contrast pairs.** Abstract distinctions (profession vs occupation; industrial vs inquiry;
  professionalism vs professionalisation) land fastest as a side-by-side of two short concrete
  cases, then name the feature that differs — often the natural subject of the topic's FIGURE.

## Universal Design for Learning

- **Multiple representations.** Pair prose with at least one of: a short table, a labelled
  contrast, a numbered procedure, a FIGURE marker. Every non-text element gets descriptive alt
  text (Art. III.8); no meaning carried by colour alone.
- **Accessible structure.** Semantic heading hierarchy (`##` → `###`), never skipped levels.

## Explicit vocabulary

- Define every technical term on first use, in plain words. Genuinely new to the curriculum →
  `glossary.json` entry + `<Glossary term="…">`. One term per concept, consistently.

## Dialogic / inquiry stance (matches the EFMP-302 course description)

- Activities and the summative task ask learners to **analyse, compare, justify** — "collaborative
  inquiry", "case analysis", "reflective practice" are named in the guide's course description.
- `unit-teacher-notes.mdx` (if present): give the teacher one good discussion prompt and one
  likely wrong answer to work with, not just "lead a discussion".
