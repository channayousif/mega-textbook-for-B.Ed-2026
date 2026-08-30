# Item writing — the unit-end 10/10/5 bank (author-unit)

`unit-assessment.mdx` carries a **fixed** bank: exactly **10 MCQ / 10 RRQ / 5 ERQ**, counted
**per `###` band** by `check-unit-depth.mjs`. Every item carries a Bloom tag. Model answers,
mark schemes and rubrics go **only** in the final `## Answers and marking guidance` section
(see `references/answers-block-formatting.md`).

## The blueprint (from the content-spec `**Unit-end assessment blueprint**`)

| Band | Count | Bloom range | Spread rule |
|---|---|---|---|
| `### Multiple-choice questions (MCQs)` | **10** | Remember → Apply | ≥ 2 per topic |
| `### Restricted-response questions (RRQs)` | **10** | Understand → Analyze | ≥ 2 per topic |
| `### Extended-response questions (ERQs)` | **5** | Analyze → Evaluate/Create | one per topic + one integrative across all topics |

Read the unit's own blueprint line for the exact per-topic targets; the table above is the
default shape.

## MCQ rules

- **Single best answer.** One unambiguously correct option; the other three are *plausible*
  distractors a learner with a partial grasp would pick — usually a common misconception, a
  near-synonym, or a true-but-irrelevant statement.
- **Stem carries the question.** A learner should be able to answer the stem before reading the
  options. No "Which of the following is true?" with four unrelated facts.
- **No "all of the above" / "none of the above".** No "both A and C". Four options, A–D.
- **Parallel options** — same grammatical form, similar length, no giveaway ("always"/"never"
  in a distractor, the longest option being correct).
- **Bloom-tag** each — e.g. `*(Remember)*`, `*(Apply)*`. Apply-level MCQs give a one-sentence
  scenario in the stem and ask for a classification/prediction.
- Numbered `1.`–`10.` as top-level items. Nested option lists (`   - A) …`) don't add to the
  count.

## RRQ (restricted-response) rules

- **Bounded scope** — answerable in 2–5 sentences or a short list. State the bound in the item
  ("in two sentences", "list three", "give one example and explain why").
- Understand → Analyze: "Explain the difference between…", "Give two reasons…", "Analyse which
  feature is missing from this described practice…".
- Each RRQ needs a **model answer + a point-by-point mark scheme** in the answers section
  (e.g. "2 marks: names both dimensions; 1 mark each for a correct example").
- Bloom-tag each.

## ERQ (extended-response) rules

- **Extended** — a paragraph or short essay; requires selecting, organising and justifying.
- Analyze → Evaluate/Create: "Evaluate whether a described teacher's practice shows all four
  dimensions, and justify your judgement with evidence"; "Propose and defend…".
- **One ERQ per topic** targets that topic's enduring understanding; the **integrative ERQ**
  crosses topics (e.g. classify a described teacher against all four dimensions *and* the
  industrial→inquiry frame).
- Each ERQ needs an **analytic rubric** (criteria × performance levels) in the answers section.
  **≥ 1 ERQ rubric must demand Analyze-or-higher** (Constitution Art. III.3) — a criterion like
  "judgement is justified with specific evidence from the scenario", not "answer is complete".
- Bloom-tag each.

## Coverage

- Across the 25 items, **every topic is sampled** per the spread rule, and collectively the
  bank touches the unit's enduring understandings — not just its easy-to-test facts.
- The human Content gate judges item quality (single best answer, plausible distractors,
  bounded RRQ scope, sound rubrics, whole-unit sampling) — the script only counts.

## Per-topic vs unit-end

Each `topic-NN.mdx` also has its own `## Check your understanding` (≥ 3 retrieval items,
Remember → Apply) and `## Summative task` (one task + mini-rubric, ≥ 1 Analyze-or-higher).
Those are formative/consolidation for the topic; the `unit-assessment.mdx` bank is the
summative sweep of the whole unit. Don't just copy topic items into the bank — the bank items
are broader and, for ERQs, integrative.
