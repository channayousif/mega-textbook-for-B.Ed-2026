# G4 Urdu translation handoff - EFMP-304 Unit 6

Scope: complete the Urdu mirror for EFMP-304 Unit 6 at G4 by authoring and
wiring the eight schematic figure variants that were the G5 F3 gap (no `.ur.svg`
existed for any EFMP-304 unit). Prose translation was already complete on main
(through `276d37f8`, recorded in the G4 tracker row).

## What this pass changed

Eight `.ur.svg` files authored under `static/img/figures/efmp-304/unit-06/`
(`fig-U6-1` through `fig-U6-8`), each:
- a copy of the English `.svg` with every visible label, `<title>` and `<desc>`
  translated to Urdu,
- x-coordinates mirrored around the viewBox midline (`new_x = 780 - old_x`),
  `text-anchor` flipped start<->end, column reading order reversed for RTL,
- `font-family` set to the Nastaliq-first stack,
- `<desc>` set to the Urdu carrier alt from the matching `topic-NN.mdx` so
  `check:figures` parity passes,
- dark twin derived via `npm run figures:variants`.

Urdu `<Figure src>` in the four `topic-NN.mdx` files repointed from
`/img/figures/.../fig-U6-N.svg` to `.../fig-U6-N.ur.svg`.

## Verification

- `npm run check:content` clean except `check:content-status`, which also fails
  on origin/main (its report is gitignored; not in scope).
- Temporary `translation_status: reviewed` flip (reverted after) shows
  `check:figures`, `validate:content`, `check:no-em-dash`,
  `check:pipeline-gate` key_terms all green. The only `reviewed`-mode findings
  are the tracker row (intentionally `draft` per the skill) and the pre-existing
  content-status gap.

## English baseline

Bound to the prose already at `276d37f8` (the G3-accepted English bytes). No
English content was changed.

## Terms

All figure labels use banked terms (`Reflective Journal` = تاملی جریدہ,
`Critical Thinking` = تنقیدی سوچ, `Lesson Plan` = سبقی منصوبہ, etc.). No
non-banked term required owner registration.

## Status

`translation_status` stays `draft`. The existing `G4 ur-translation` tracker row
(already on main, `▣`) is unchanged. This pass closes the G5 F3 figure-variant
gap for Unit 6; a fresh independent G5 review against the new `.ur.svg` bytes
is still pending.

## Continuation verification (2026-10-18)

The continuation translated the six remaining English Bloom summaries and the
Topic/Unit labels in the existing Urdu prose. English content remains unchanged
from origin/main at this checkout. G2 evidence was regenerated with the repository
command to replace the stale input manifest; no G3/G5 acceptance was changed.

The temporary reviewed-mode run passed file/heading parity, figures and bank-bound
key terms. Its only findings were the deliberately open G4/G5 rows and a
content-status report made stale by the temporary flip. Both index flags were
restored to draft and the report regenerated before the final content gate run.
Figure dark-variant verification passed for all 780 repository variants.

Full-page desktop, narrow-width and A4 render inspection remains for the next
owner because this crew brief prohibits builds and dev servers. Fresh independent
G5 must include that inspection and the changed Urdu metadata and figure inputs.
The earlier G5 report does not certify these changed inputs. No new terminology
bank entries are proposed by this continuation. G4 remains in progress and unsigned.
