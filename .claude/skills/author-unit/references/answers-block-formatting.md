# The `## Answers and marking guidance` section (author-unit)

Self-study answer material is permitted in **published content** — but only inside one
tightly-bounded section, so the `check-no-answer-keys.mjs` safety gate stays meaningful
everywhere else. Get the delimiter exactly right and the gate never trips you.

## The five rules (verbatim — contract: `end-of-unit-assessment.md` / `end-of-course-review.md`)

1. **One canonical heading**, case-sensitive, exact, no trailing text, after `.trimEnd()`:

   ```
   ## Answers and marking guidance
   ```

   `## Answers and marking guidance (teachers)` does **NOT** open the exception — and the gate
   then flags its own answer prose. Do not add a parenthetical, a colon, or an emoji.

2. **Two file types only** — a file whose path matches
   `/(?:^|\/)(unit-assessment|course-review)\.mdx$/`. Nowhere else. A `topic-NN.mdx` may not
   contain the phrases "answer key", "marking scheme", or "correct answer" **anywhere**.

3. **The file's final `##` section.** No `## ` heading may follow it. `###` sub-headings under
   it are fine (`### MCQ answer key`, `### RRQ model answers and mark schemes`, `### ERQ
   rubrics`) — they are `###`, not `##`.

4. **At most one** such heading per file. Two → failure.

5. **Prose only.** The four front-matter keys — `answer_key:` / `answers:` / `marking_scheme:`
   / `rubric_answers:` — are forbidden **everywhere in the file, including inside this
   section** (schema + gate). Put keys/rubrics in the body as prose.

## Layout that passes

```mdx
## Summative assessment

### Multiple-choice questions (MCQs)
1. … *(Remember)*
   …
10. … *(Apply)*

### Restricted-response questions (RRQs)
1. …
   …
10. …

### Extended-response questions (ERQs)
1. …
   …
5. …

## Answers and marking guidance      ← the file's LAST `##`

### MCQ answer key
1. B — a profession needs a specialised knowledge base; option A describes an occupation.
2. C — …
   …

### RRQ model answers and mark schemes
1. Model: names autonomy and collegiality; example of each. **Marks (3):** 1 — names both;
   1 — example of autonomy; 1 — example of collegiality.
   …

### ERQ rubrics
1. Analytic rubric — *Identifies dimensions* (0–2) · *Uses scenario evidence* (0–3) ·
   *Judgement justified* (0–3, **Analyze**: cites specific evidence for the verdict) ·
   *Clarity* (0–2).
   …
```

## Why the gate won't trip

`check-no-answer-keys.mjs` locates the exact `## Answers and marking guidance` line, checks
nothing follows it at `##` level, then scans everything **before** it with all seven patterns
and everything **from** it with only the four front-matter-key patterns. So the prose keys
below the line are allowed; a stray "the correct answer is B" **above** the line (e.g. inside
an MCQ) still fails — keep answer language out of the question bands.

In the built site, the same suppression applies to the two route names
(`…/unit-assessment/` and `…/course-review/`, plus `/ur/` mirrors) — nothing else.
