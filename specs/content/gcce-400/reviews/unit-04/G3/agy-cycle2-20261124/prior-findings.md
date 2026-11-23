# Prior findings verified against the current files

Review input: branch `crew/gcce-400-u04-review_en-r1` at HEAD
`175a90b7a644bd366cf3d1d2592090a93f912bcb`.
Latest prior report:
`specs/content/gcce-400/reviews/unit-04/G3/crew-run1-20261124.json`
(disposition revise, reviewer agent:claude, author run `commit:7953d1221154467cc18254d5fdb6ab5038aae0cd`).
This is the second and last ADR-0019 review cycle. Content repairs were applied in commit
`1cfa8056c4c315af0d7abc4fc88f25b40db8ad56` (merged in `e87251710`).

## Prior report findings (crew-run1-20261124.json)

| # | Severity | Description in run 1 | Verification at current HEAD | State now |
|---|---|---|---|---|
| F1 | blocking | IAP2 table Collaborate example presents a joint decision and topic never states agency decides at Involve/Collaborate, contradicting RRQ 6 model answer | In `topic-02.mdx:71-74`, the Collaborate example is reworded to "Residents and council staff work out a shared recommendation, which the council adopts", and an explicit sentence was added: "At Involve and Collaborate the agency still makes the final decision; collaboration works towards a shared solution, it does not hand over the decision." This directly teaches what RRQ 6 model answer requires. | Resolved |
| F2 | uncertain | render-inspect reported fig-U4-2, fig-U4-4 and fig-U4-5 as not loaded on production pages (lazy images below fold) | Live site at deployed SHA `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d` differs from HEAD `175a90b7a644bd366cf3d1d2592090a93f912bcb` on Unit 4 English files (`topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`). Brief and host limits prohibit local build/server/browser runs. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified. | Unresolved (uncertain), drives escalate disposition |
| F3 | advisory | ERQ 4 rubric states "the committee only informs"; scenario has one meeting, so weak consult could also earn marks | In `unit-assessment.mdx:139`, the ERQ 4 rubric now reads: "Level of participation identified (0-2, the committee only informs; accept 'inform, at most a token consult')". | Resolved |
| F4 | advisory | MCQ key positions clustered A1/B5/C4/D0; MCQ 5 tagged Remember but requires Apply | In `unit-assessment.mdx:54-58`, MCQ 5 was retagged as `*(Apply)*` and re-keyed to option D ("Social ties and joint action"), restoring a balanced key distribution of A:1, B:4, C:4, D:1. | Resolved |
| F5 | advisory | topic-01.mdx places fig-U4-2 directly above duplicate markdown table | The duplicate markdown table in `topic-01.mdx` was removed, leaving only the placed figure `fig-U4-2.svg` and worked example text. | Resolved |
| F6 | advisory | Further-reading entries use bare URLs; youniss-levine-2009 declaration lacks owner-authorisation citation | In `topic-01.mdx:157-160`, further-reading entries now use descriptive link text ([Journal article], [Official publication], [UNESCO report]). In `sources/unit-04.md:19`, owner ruling `D-2026-0001` is cited for the unverifiable source `youniss-levine-2009`. | Resolved |

## Summary of resolution

All actionable content defects (F1, F3, F4, F5, F6) have been completely resolved in the current files.
F2 remains unresolved because the production site has not yet deployed the repaired commit, making render-review unavailable under host and brief constraints.
