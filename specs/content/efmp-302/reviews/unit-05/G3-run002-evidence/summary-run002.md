# G3 English review - EFMP-302 Unit 5 - run 002 (readable summary)

- Reviewer run: `agent-g3-efmp302-u5-run002` (`agent:g3-reviewer`, model `claude-opus-5`)
- Author run reviewed: `commit:ec81c77`; frozen bundle commit `4ae0952`
- Supersedes nothing; run 001 (`agent-g3-efmp302-u5-run001.json`) stands and is preserved.
- **Disposition: escalate**

## Bundle integrity

All 137 bound inputs and the skill digest were recomputed with the contract's own
`inputManifest`/`skillDigest` and match the prepared manifest exactly. Seven `.mdx` files
differ at raw-byte level only because the contract normalizes the `translation_status` line;
under the contract's rule there are zero mismatches. `git status --short` was empty before
and after the review.

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | fail |
| coverage | pass |
| assessment | fail |
| accessibility | pass |
| readability | pass |
| pedagogy | pass |

## What run 001's repairs actually fixed

- **The three-regions contradiction is genuinely resolved.** Every occurrence now reads
  "the third region", including the `fig-U5-7` alt text and the figure-manifest alt column,
  and `fig-U5-7.svg` carries a new panel, "The three regions exhaust the situation ... There
  is no fourth place to stand." Retrieval item 2 on `topic-04.mdx` is now answerable.
- **All eight figures render.** Verified in a real browser at 1280 px, 360 px and A4 print
  media; none clipped, all with meaningful alt text and a dark variant.
- **MCQ key distribution is fixed** (a3 / b2 / c2 / d3). This reviewer derived all ten answers
  from the prose before reading the key and agrees with all ten.
- **`demirkasimoglu2010` now genuinely supports U5-08.** `topic-02.mdx` line 107 paraphrases
  the bound record summary accurately.

## What is still wrong

Five blocking defects and three owner questions remain; see the report's `findings`. The
headline items are that `topic-02.mdx` cites Demirkasimoglu (2010) with no bibliographic entry
anywhere on the page, that `sources/unit-05.md` and `coverage/unit-05.md` now contradict each
other about `hargreaves2000`, that the approved MCQ blueprint's "at least 2 per topic" is still
violated for topic 5.3, and that the ERQ 5 / Mr Bilal rubric conflict was carried unrepaired
across both cycles.

## Why escalate rather than revise

Two required coverage rows (U5-05 via `little2001`, U5-09 via `hennessy2022`) are grounded in
sources whose text could not be obtained at all - the G3 rubric requires escalating unavailable
source text, and this is an owner decision about whether record-level citation is acceptable.
Separately, the review skill allows at most two repair/review cycles per stage; run 002 is the
second, and blocking defects survive it. Further repair needs owner authorisation rather than
another reviewer round.

## Boundary

This report is advisory. No signature, registry entry, qualification record or tracker row was
created, and none is implied.
