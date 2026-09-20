# Translating the assessment bank (translate-unit)

`unit-assessment.mdx` is the file where a careless translation does the most damage, because a
shifted option or a softened verb changes what the student is actually being tested on, and no
gate can see it. G5 answers the Urdu items independently and compares.

## The bank is fixed

10 MCQ + 10 restricted-response + 5 extended-response, the Spec 008 blueprint. Translation
never changes the count, the order, or which item is which. Item IDs (`MCQ-01`, `RRQ-07`,
`ERQ-03`) are **derived** from that numbering and are never written into prose in either
language - leaving them out is what keeps the parity gate green.

## Option letters are transliterated

The reviewed corpus maps the Latin option letters onto Urdu letters, and the answer key uses
the Urdu letter:

| EN | UR |
|---|---|
| A) | الف) |
| B) | ب) |
| C) | ج) |
| D) | د) |

So `1. **B** - the four features are the test` becomes `1. **ب** - چار خصوصیات کسوٹی ہیں`.

**Option order does not change.** The option that was B is the option that is ب. Reordering
options so the Urdu reads more naturally silently breaks the answer key, and G5 explicitly
checks "option ordering and answer-key correspondence".

## Bloom tags are translated

`*(Remember)*` becomes `*(یاد رکھنا)*`, `*(Understand)*` becomes `*(سمجھنا)*`, and so on. This
is safe: `check-bloom-bands.mjs` walks `CONTENT_ROOTS` (`docs`, `licence`) via `walkUnits()`
and never reads `i18n/`, so the Urdu tags are not matched against the declared band.

That also means **nothing checks them**. The tag must still be the same level as the English
one, because it tells the student what kind of thinking the item wants.

## The three ways a translation changes the difficulty

G5 hunts all three by name. Each is easy to do by accident:

1. **Revealing the answer.** An Urdu rendering that is more specific than the English can make
   the correct option obvious. The classic case is translating a deliberately vague distractor
   into something plainly wrong.
2. **Lowering the demand.** An *Apply* item becomes a *Remember* item when the translation
   names the framework the student was supposed to select. "Use the four features to judge
   this job" must not become "Check this job against specialised knowledge, training, a code
   and accountability".
3. **Losing preserved ambiguity.** Where the English is deliberately imprecise because the
   item is testing judgement under uncertainty, an Urdu rendering that resolves the ambiguity
   has removed the task.

## The bounded answers section

The English file ends with exactly one `## Answers and marking guidance`, and it must be the
file's final `##` section. In the Urdu file that heading **is translated** -
`## جوابات اور نمبر دہی کی رہنمائی` in the reviewed corpus - and that is fine, but understand
precisely why, because it is a coincidence of implementation rather than a designed exemption:

`check-no-answer-keys.mjs` whitelists any path matching
`(unit-assessment|course-review)\.mdx$`. In the Urdu file it then looks for the **exact
English canonical heading**, finds zero, and falls back to scanning the whole file with all
seven patterns. The three prose patterns are English strings - `answer key`, `marking scheme`,
`correct answer` - so Urdu prose matches none of them and the file passes.

The consequences for you:

- **Leave no English answer-key prose in the Urdu file.** A stray "answer key" or "correct
  answer" left untranslated in the Urdu assessment triggers a whole-file scan hit, and because
  the canonical heading is absent there is no bounded region to protect it. The gate fails on
  a file the English equivalent passes.
- The four front-matter keys (`answer_key`, `answers`, `marking_scheme`, `rubric_answers`)
  remain forbidden everywhere, in both languages, inside the block as well as outside.
- Keep the translated answers heading as the file's final `##` section anyway. The structural
  rule is not enforced on the Urdu file today, but the heading-level parity check compares the
  two files' heading vectors when the unit is `reviewed`, and G5 reads the section as the
  student would.

## Mark schemes and rubrics

- **Marks are numbers and do not change.** A 7-mark RRQ is a 7-mark RRQ. If the English
  rebalanced marks across parts, the Urdu carries the same split.
- Rubric band labels (`Strong (4-5)`) translate their words and keep their numerals and ranges.
- Model answers are translated as answers, not summarised. A shorter Urdu model answer tells
  the marker to accept less.
- Rubric tables are wide and are the usual narrow-viewport failure. `render-inspect.mjs
  --locale ur` reports whether the `<table>` itself scrolls and whether its scroller is
  keyboard reachable; check that the Urdu rubric is as reachable as the English one.

## Self-check before handoff

```bash
# item counts must match
for f in "$EN/unit-assessment.mdx" "$UR/unit-assessment.mdx"; do
  printf '%s: %s numbered items\n' "$(basename "$(dirname "$f")")" "$(grep -cE '^[0-9]+\. ' "$f")"
done
```

Then answer every Urdu MCQ yourself, from the Urdu alone, without looking at the English or
the key, and compare your answers against the translated key. A mismatch is either a
mistranslated item or a mistranslated key, and both are blocking.
