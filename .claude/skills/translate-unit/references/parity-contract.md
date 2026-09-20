# The EN to UR parity contract (translate-unit)

What must match, what may differ, and which gate catches which. The short version: **the gates
check shape, G5 checks meaning**, and most of the shape checks are switched off while a unit is
`draft`.

## The file set

`validate-content.mjs` `checkParity()` compares the **union of EN and UR `.mdx` filenames** in
the unit folder. A file on either side without its twin is an error. So:

- Same names, exactly: `index.mdx`, `topic-01.mdx … topic-NN.mdx`, `unit-assessment.mdx`,
  and `unit-teacher-notes.mdx` when the English has one.
- No extra Urdu file. A `topic-03-notes.mdx` you added for your own convenience fails parity
  from the Urdu side.
- No stub. A heading-only Urdu file satisfies the filename union and fails G5 immediately:
  the rubric names "heading-only stubs" as a thing it hunts for.

## Front matter

| Key | EN to UR |
|---|---|
| `title` | translate |
| `description` | translate |
| `blooms_summary` | translate |
| `course_code`, `unit_no`, `topic_no`, `topic_label` | identical |
| `clo_refs` | identical - these are SLO identifiers, not prose |
| `est_reading_minutes` | identical - same content, not re-estimated |
| `translation_status` | identical to the English, and `draft` until G5 accepts |
| `key_terms` | **UR `index.mdx` only** - absent from the English |

`sidebar_position` follows the style guide's one sanctioned use; do not add it to make Urdu
ordering "work".

## Components

Every component call and its import crosses over 1:1. `<Figure>`, `<Glossary>`,
`<PrintHandout>`, `<BloomTag>`, `<ObjectiveList>`, `<ActivityCard>`.

No gate counts components across locales. That is exactly why they drift: EFMP-302 Unit 1's
English `topic-01.mdx` carries one `<Glossary>` and its **accepted, `reviewed`** Urdu mirror
carries none, and nothing caught it. EFMP-301 Unit 1 preserves its one `<Glossary>` correctly.
Follow EFMP-301.

A quick self-check before handoff:

```bash
for c in Figure Glossary PrintHandout BloomTag ObjectiveList ActivityCard; do
  printf '%-16s EN=%s UR=%s\n' "$c" \
    "$(grep -ho "<$c" "$EN"/*.mdx | wc -l)" "$(grep -ho "<$c" "$UR"/*.mdx | wc -l)"
done
```

## Figures

On a `<Figure>`: `id`, `kind`, `width` and `height` are identical; `src` gains `.ur`
(`fig-U2-3.svg` becomes `fig-U2-3.ur.svg`); `alt` is fully translated.

`check-figures.mjs` computes `reviewedBilingual = isBilingualCourse(courseDir) &&
translationStatus === 'reviewed'`. Only then does it require a UR `<Figure>` per placed EN
carrier and a `.ur.svg` on disk per placed `.svg`. The figure-ID sets must match both ways.

This check used to read `r.kind === 'diagram'`, so it fired for 2 of 8 placed figures and a
table, concept map, flowchart or timeline could lose its Urdu variant with CI green. It is
column-aware now, but it is still conditional on `reviewed`.

## What is enforced only when `translation_status: reviewed`

This is the trap. While the unit is `draft`, **all of the following pass silently**:

| Check | Where | What it would catch |
|---|---|---|
| File-set parity | `validate-content.mjs:192` `checkParity` | a missing Urdu file |
| Figure parity | `check-figures.mjs:278` | a missing `.ur.svg` or UR carrier |
| `key_terms` conformance | `check-pipeline-gate.mjs:211` | an Urdu term the bank rejects |
| G4/G5 tracker rows | `check-pipeline-gate.mjs:212` | a missing stage row |

Ten of eleven authored units are `draft` today, which is why EFMP-302 Units 2 to 6 have
`.svg` and `.dark.svg` but no `.ur.svg`, and no gate objects.

**The temporary flip.** Set both `index.mdx` files to `reviewed`, run `npm run check:content`,
fix what it reports, then set both back to `draft`. Verify the revert; a forgotten flip is a
false claim that G5 passed, and it also turns the student-facing banner off.

## What no gate checks, and G5 does

- Whether the Urdu says what the English says. Negation, modal force, quantities, percentages,
  dates, comparisons, causal claims, pronoun reference, instructional sequence.
- Whether an assessment item still demands the same cognitive level.
- Whether the Nastaliq actually renders legibly, wraps correctly, and survives A4 print.
- Whether a figure's Urdu labels fit the viewBox they inherited from the English.

`scripts/render-inspect.mjs <COURSE> <N> --locale ur` covers the last two mechanically. The
first two are read-and-compare work with no shortcut.

## Em dash

`check:no-em-dash` scans `i18n/` along with `docs/`, `licence/`, `guides/` and
`specs/content/`. U+2014, U+2015, U+2E3A and U+2E3B are all blocked, in Urdu prose too. Use a
comma, a full stop, parentheses, or a spaced hyphen `" - "`. En dash U+2013 remains allowed for
numeric ranges.
