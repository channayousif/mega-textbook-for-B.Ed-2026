# Contract: End-of-Unit Matter (`unit-assessment.mdx`)

**File**: `docs/semester-N/<course>/unit-NN/unit-assessment.mdx` in a new-shape unit
**Read by**: `scripts/check-unit-depth.mjs` (FR-005, FR-020) and `scripts/check-no-answer-keys.mjs`
(FR-008–010)
**Format**: MDX. Front matter per `contracts/unit-frontmatter.schema.json` (no `topic_no` /
`topic_label`). The answer-key **front-matter key** ban (`answer_key` / `answers` /
`marking_scheme` / `rubric_answers`) applies — only *prose* answer material is permitted, and only
inside the bounded section below.

## Body skeleton (headings the gate checks in **bold**)

```mdx
<PrintHandout />

# <Unit title> — assessment and review

**## Unit summary**
<the chapter summary — prose and/or bullets; recaps the unit's enduring understandings>

**## Summative assessment**

**### Multiple-choice questions (MCQs)**
1. … *(Remember)*
2. …
   …
10. … *(Apply)*        ← EXACTLY 10 top-level numbered items

**### Restricted-response questions (RRQs)**
1. …
   …
10. …                  ← EXACTLY 10 top-level numbered items

**### Extended-response questions (ERQs)**
1. …
   …
5. …                   ← EXACTLY 5 top-level numbered items

**## Answers and marking guidance**        ← MUST be the file's FINAL top-level (##) section
### MCQ answer key
1. B — <one-line justification>
   …
### RRQ model answers and mark schemes
1. <model response>; marks: <point-by-point allocation>
   …
### ERQ rubrics
1. <analytic rubric: criteria x performance levels; at least one demands Analyze-or-higher>
   …
```

## Rules

| Rule | Gate | Failure if… |
|---|---|---|
| `## Unit summary` present | depth gate | missing |
| `### Multiple-choice questions (MCQs)` present with **exactly 10** top-level numbered items | depth gate | heading missing, or count ≠ 10 (message names the count) |
| `### Restricted-response questions (RRQs)` present with **exactly 10** | depth gate | missing, or count ≠ 10 |
| `### Extended-response questions (ERQs)` present with **exactly 5** | depth gate | missing, or count ≠ 5 |
| `## Answers and marking guidance` present, **exactly one**, and the **last** `##` section | depth gate + answer-key gate | missing; more than one; any `##` heading after it |
| No answer-key front-matter key anywhere in the file | validator + answer-key gate | any of the four keys present |
| The prose patterns (`answer key`, `marking scheme`, `correct answer`) appear only **below** the `## Answers and marking guidance` line | answer-key gate | any such phrase above that line |

- "Top-level numbered item" = a line matching `/^\s*\d+\.\s+\S/` in the file body (front matter
  stripped), same counter as Spec 007's formative floor. Nested/renumbered lists inside an item do
  not add to the count.
- **Counting is scoped per sub-heading section.** The gate counts numbered items **only between a
  `### …questions …` heading and the next `##` or `###` heading** — so the 10 / 10 / 5 checks are
  per-band, not a single file-wide total. A numbered line under `## Answers and marking guidance`
  (e.g. a numbered MCQ key) is **not** counted toward any question band.
- The canonical answers heading is matched **case-sensitive, exact, no trailing text**, after
  `.trimEnd()`: `## Answers and marking guidance`. `## Answers and marking guidance (teachers)` does
  **not** open the exception (and would then trip the gate on its own answer prose).

## Bloom spread (human Content gate, not the script)

MCQs skew Remember→Apply; RRQs Understand→Analyze; ERQs Analyze→Evaluate/Create. Every item still
carries a Bloom tag (Constitution Art. III.3).

## Not checked by the gate

Whether the questions are well-constructed (single best answer, plausible distractors, bounded RRQ
scope); whether the model answers and rubrics are correct and sufficient; whether the bank samples
the whole unit; whether the summary is complete. All human Content gate.
