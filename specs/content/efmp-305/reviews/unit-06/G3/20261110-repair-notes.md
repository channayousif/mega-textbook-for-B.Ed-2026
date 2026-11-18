# Unit 6 G3 author-side repair notes

Report: `20261108T203238Z-g3-desk-2a3b76c3.json` (revise).
These are repair observations, not an independent review or certification.

## Depth budget

The reported 193-minute unit total does not reproduce against the current bytes. The
report's `input_manifest` binds the six English files at hashes that predate commit
`24d5f43d7` ("recompute Unit 6 reading minutes from word count at 180 wpm"), which
lowered the declared estimates to the values now on main:

| File | Reading minutes |
|---|---|
| index.mdx | 6 |
| topic-01.mdx | 33 |
| topic-02.mdx | 38 |
| topic-03.mdx | 34 |
| unit-assessment.mdx | 29 |
| unit-teacher-notes.mdx | 9 |
| Total | 149 |

`check:depth-gate` exits 0 against the approved 140-170 band. No prose trim and no
approved-band change were made. The separate topic planning ranges remain a
CurriculumOwner judgement, as already recorded in tasks.md; the gate does not enforce
them.

## Research context and local applicability

The advisory finding recognises appropriate caveats rather than requesting a repair.
The China, Punjab and Pakistan study limits, qualitative methodology and non-causal
language remain unchanged. No learner-facing edit was needed in English or Urdu.

## UNICEF retrieval

The report records a continuation retrieval returning HTTP 403. That no longer
reproduces. The full PDF was retrieved on 2026-11-03 and reconfirmed on 2026-11-10
from the recorded URL with `curl -fL`; the 36-page PDF's SHA-256 matches the
preserved checksum exactly:

```
69fa5b1d6844a5c8003ce99742f703cb11e30014603ddcd029c188f196e3d593
```

Text was extracted with `pdftotext -layout` and the passages below were read against
Unit 6's uses. The corrected printed-page locators are:

- Pages 8-9, section II: collaboration involves families, schools and communities. It
  depends on relationships and institutional conditions rather than a universal recipe.
- Page 10, section II: external help should be proportionate to need. Consider both the
  benefit of additional help and the instruction or social contact missed during withdrawal.
- Page 12, section III, Figure 1: a general participation ladder distinguishes symbolic
  involvement from shared power. It is not a Pakistan-specific measurement instrument.
- Page 13, section III: families may advocate, support learning, partner with schools,
  help other families or participate in governance. The booklet attributes these options
  to UNESCO.
- Pages 16 and 26: families know their child's learning history and can advise teaching
  adaptations.
- Page 22, section V: negative school experiences, limited options, poverty and fear of
  community stigma can obstruct involvement. Families may also have mixed views of inclusion.
- Pages 25-26, section VI: extended-family carers can be important partners; classroom
  aides should support access without becoming a permanent attachment to one pupil.

These supplement the historical record at `specs/content/efmp-305/sources/texts/unicef2014.md`.
That file is bound into the Unit 1 and Unit 6 G2 gate-evidence input manifests, so editing
it would stale both units' accepted G2 evidence and the generated content status. The
resolution therefore lives here, in the review folder, and the source record is left
unchanged to preserve those bindings.

## Unit 6 support check, 2026-11-10

Checked the participation ladder and five options against Topic 6.2, the barrier lists
against Topics 6.2/6.3 and the assessment, and the support principles against Topics
6.1/6.2. Page 26 specifically discusses parent aides; the pupil-buddy application in
Topic 6.1 is the author's analogy. The fictional specialist visit is also an application.
The cautions about families holding mixed views remain in Topic 6.2. No new empirical
or Pakistan-specific claim is inferred from this retrieval.

## Limits

This is a programming resource, not empirical evidence about Pakistani parents. The
unit's four questions, visit sequence and fictional cases are author-designed
applications. They are not tested protocols from UNICEF. No registry record or open
licence is claimed; this source does not count toward the registry-verified
open-access floor. This is author-side verification, not G3 acceptance.
