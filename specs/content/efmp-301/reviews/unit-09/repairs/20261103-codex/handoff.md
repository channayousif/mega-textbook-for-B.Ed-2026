# Unit 9 repair handoff, 2026-11-03

This is an author repair record, not an independent review or certification.
It answers the unresolved findings in
`../G3/20261102T212207Z-g3-desk-b282fccc.json` (relative to the unit review directory).
Earlier reports and manifests remain unchanged. G3 stays unticked; translation
status stays draft. No build, server, Playwright or render inspection was run.

## Changes by finding

1. **MCQ spread and mapping:** replaced MCQ 8 with a certification-purpose item
   and moved its concept link to 9.1. Primary topic spread is 9.1: 1/2/3/8,
   9.2: 5/6/7, 9.3: 4/9/10, restoring 4/3/3 without editing the approved spec.
   RRQ spread stays 3/4/3 (1/2/10; 3/4/5/6; 7/8/9).
2. **Correct-option positions:** reordered options and matching keys in both
   languages: b/a/b/c/d/a/c/d/c/b (a:2, b:3, c:3, d:2).
3. **Bloom demand:** MCQs 3 and 9 use new science and post-test cases; RRQ 8 asks
   analysis of two uses, RRQ 10 requires an instrument and timing for a new reading
   support decision. Topic 9.3's worked-case retrieval checks are labelled Understand.
4. **Year scenario:** Topic 9.1 now introduces April, Tuesday, December and March
   instruments together. Teacher notes, topic task, ERQ 1 and its rubric treat
   next-term support as a specific decision informed by evidence from all four,
   rather than claiming there are only three instruments.
5. **Figure record:** fig-U9-1's manifest prompt now says board examination, matching
   its asset. The figure ID, source and existing alt text are preserved.
6. **Practical-work authority:** teacher notes identify double marking as an
   authored implementation within the guide's general individual/group assignment
   categories (guide lines 1181-1192). Coverage and source notes distinguish the
   measurement-quality reasoning from the guide's authority over general categories.
7. **Dual uses and motivation:** Topic 9.3, the assessment summary, ERQ 3 and
   fig-U9-6 distinguish past lessons from future learning and permit justified dual
   use of evidence. The two-room case is explicitly authored. Reactions and timing
   are qualified; assessment and feedback claims refer to the bound Chapter 11
   passages in `sources/texts/seifert2009.md:258-271`. The cycle and the
   December-to-January example are identified as teaching synthesis/application.
8. **Feasible activity:** Topic 9.2 specifies 20 minutes initially and 10 minutes
   next day, keeping first marks separate. Teacher notes schedule advance work on
   two days plus a 20-minute discussion.
9. **Reliability uncertainty:** Topic 9.2, its check/task, teacher notes, RRQ 6,
   ERQ 2 and marking guidance do not infer reliability from one score. Hypothetical
   repeat scores are labelled conditional; checks and conditional repairs are
   requested separately from a validity repair.
10. **ERQ marking:** all five tasks specify 250-300 words. Rubrics include full,
    partial and zero-credit anchors, separate organisation/terminology marks,
    and model outlines. Length feedback does not reduce content marks.

All prose/assessment repairs were mirrored into the existing Urdu files. No
passage was skipped as stale, and no translation was missing. Figure 6 has matching
locale alt/desc text and refreshed derived dark variants. Checklist positions and
counts, heading structures, bank counts, publication state and approved specs are
preserved. Historical evidence has not been rewritten.

## Verification and remaining owner work

The starting clean HEAD equalled origin/main at
`cfc41817f4da5373f350b120cc7b79dea3437429`; all 13 content gates passed there.
347 unit tests across 28 files passed with the heavy-job wrapper. All four changed
SVG variants passed `measure-figure-text.mjs`.

Content edits invalidate Unit 9's old G2 digest. Refresh only this unit's evidence
from committed inputs, retaining its existing G2 status and leaving G3/G5 open.
A clean-input manifest prepared after the content commit is a reproducible input
inventory, not authenticated author-session provenance.

- **Owner/render host:** arrange current frozen-input narrow/mobile and A4 checks,
  including English and Urdu glyph inspection. Text measurement is not render review.
- **Owner/review host:** supply authenticated author/reviewer run identities and a
  qualified independent review. This author session identifies only as Codex; an
  authenticated session identifier and exact model revision are unavailable. Commit
  identity and the manifest must not be presented as proof of either.
- **Owner:** respect ADR-0019 repair-cycle limits when arranging further review.
  No new independent review was launched by this repair job.
