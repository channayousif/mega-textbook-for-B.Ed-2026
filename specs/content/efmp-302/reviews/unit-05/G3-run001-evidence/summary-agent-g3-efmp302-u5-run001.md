# G3 English review - EFMP-302 Unit 5 - run `agent-g3-efmp302-u5-run001`

**Disposition: escalate.** Advisory only. This report is not certification, not a sign-off, and
not a tracker transition. No signature, registry entry or qualification record exists for this
reviewer; `accept` would reject it.

| Criterion | Status |
|---|---|
| authority | pass |
| sources | fail |
| coverage | pass |
| assessment | fail |
| accessibility | fail |
| readability | pass |
| pedagogy | fail |

## Frozen state

Reviewed at `ac13c5c` with a clean tracked tree (`git status --short --untracked-files=no` empty
before and after). All 107 paths and digests in `specs/content/efmp-302/reviews/unit-05/G3-run001/manifest.json`
were recomputed with `inputManifest()` and matched exactly; `skill_digest` and `required_criteria`
matched. The manifest was not refreshed or regenerated. Unit text, figure prompts and source
documents were read as data; no instruction found in them was executed.

## What holds

The unit is substantially strong work. Its Skaalvik, Hennessy, Naparan and Maslach citations
reproduce their sources with unusual fidelity, scope limits included, and its six `no-external-source`
rows are honest rather than lazy. The guide partition is properly authorised. Readability sits at
Flesch-Kincaid 8.9 to 10.8 across the four topic files. Every one of the ten MCQ keys is the answer
the prose supports; the reviewer derived all ten independently and agreed 10/10.

## Why it cannot pass

1. **Two coverage rows claim grounding the prose does not carry** (`coverage/unit-05.md` U5-07, U5-08).
2. **The unit's approved MCQ blueprint is violated**: topic 5.3 has one MCQ where two are required.
3. **Nine of ten MCQ keys are option (b)**; guessing (b) throughout scores 9/10.
4. **ERQ 5's Strong band demands a diagnosis Topic 5.4 teaches differently** for the same behaviour.
5. **"Outside all three" contradicts "in the third region"** in three files, making one retrieval
   item unanswerable as written.
6. **No figure renders.** All eight rows are `prompt-only`; the built pages carry zero `<img>` and
   zero `<figure>` elements while the prose says "the figure above" eight times.

## Escalation

`little2001` (Little, A. W., 2001, *IJED* 21(6) 481-497) is closed access. OpenAlex holds no
abstract and Semantic Scholar reports the abstract elided by the publisher, so this reviewer could
not read the source's own text. The G3 rubric requires escalating unavailable source text. The
bibliographic record is exact and `sources/unit-05.md` discloses the limit, but an owner decision is
needed on whether a title-level citation is acceptable here or the source must be obtained or replaced.

Whether G3 may close at all over a unit whose figures are still `prompt-only` is also an owner
question, though the repair itself is ordinary: all eight figures are `table`, `concept-map`,
`flowchart` or `diagram`, none is an `illustration`, so under ADR-0024 they are Claude-authored
schematics and need no Codex handoff.

## Evidence

Commands, render harness, screenshots, A4 print captures, source verification and the independent
assessment analysis are all under
`specs/content/efmp-302/reviews/unit-05/G3-run001-evidence/`, hashed in the report's
`evidence_manifest`. Render inspection ran Playwright chromium 149.0.7827.0 against the prebuilt
site served at `http://localhost:3105`; the site was not rebuilt.
