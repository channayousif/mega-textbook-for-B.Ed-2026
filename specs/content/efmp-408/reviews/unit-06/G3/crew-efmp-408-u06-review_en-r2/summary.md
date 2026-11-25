# EFMP-408 Unit 6 G3 English review (r2, cycle 2)

Disposition: **escalate**. Advisory only. G3 stays open, unsigned, no gate is marked done, and
no prose was repaired by this run.

Reviewed inputs: `docs/semester-4/efmp-408/unit-06/` (7 files), the Unit 6 rows under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-06/`. Bundle prepared with
`node scripts/review-evidence.mjs prepare EFMP-408 6 G3` over a clean tree; 105 bound inputs,
all digests recomputed and matched (`logs/input-verification.txt`).

Rendered input identity: **not established.** Deployed SHA
`074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD
`83b5dd5ec49f76485d3c9b8aa6e603b2de834eb5` on the unit's English directory and figure folder,
so the production build is not the reviewed input and `render-review` is unavailable.

## Cycle-1 findings carried forward

All six findings from `crew-efmp-408-u06-review_en-r1.json` were re-checked against the current
files:

- **B-1 MCQ key design (blocking)** - resolved. The key is now A3 / B2 / C2 / D3, so the all-B
  strategy that scored 9/10 now scores 2/10, and no letter is empty. Option lengths were
  rebalanced in English and Urdu. A residual length cue remains (the keyed option is the
  longest or tied-longest in 5 of 10 items) and is recorded as an advisory.
- **B-2 undeclared missing sources (blocking)** - resolved. A `no-external-source` row now
  names every external-body fact and grounds exactly the six sub-topics that state them, with
  `G-2026-236` escalated in `specs/gaps.md`. `check:depth-gate` exit 0 includes the
  coverage-to-sources scope agreement.
- **S-2 TIMSS 2019 participation (uncertain)** - resolved. The claim is removed from
  `topic-01.mdx:96` and from `fig-U6-4.svg` and its dark and Urdu variants.
- **A-2 RRQ 6 and RRQ 9 below the RRQ floor (advisory)** - resolved. RRQ 6 is now tagged
  Understand and RRQ 9 Analyze, with their mark schemes updated to match.
- **A-3 HEC citation for absent content (advisory)** - resolved. `topic-02.mdx:56` and `:78` no
  longer cite HEC; the NPSTP citation that remains is supported.
- **A-4 fig-U6-5 title geometry (advisory)** - resolved. The title is now "Proportionate
  responses to assessment dishonesty" (48 characters against 79 before), which clears the
  780px viewBox; `measure-figure-text` exit 0.

## What passes

- **Authority.** The approved content-spec and the 2026 guide (`4TH SEMESTER.txt:266-277`)
  allot Weeks 13-15 to the twelve taught sub-topics U6-01..U6-12. Topic 6.4 carries the
  enrichment banner required by `content-spec.md:373-375`.
- **Coverage.** All twelve sub-topics are taught under mapped headings; reading minutes
  3+18+17+17+18+22+4 = 99 inside the approved 85-115 band.
- **Sources.** Every cycle-1 source finding is closed; the bound guides and excerpts support
  the remaining claims, and the one unretrievable source is declared under `D-2026-0001`.
- **Assessment.** All 10 MCQs solved independently before the key was read; the derived key
  matches the supplied key on all ten letters. RRQ and ERQ mark schemes are point-by-point,
  rubrics demand higher-order work, and no conflicting keys exist.
- **Readability and pedagogy.** The HSC register holds, all four topic files carry the
  nine-part cycle, the approved misconceptions are named and corrected, and the activities are
  feasible in the stated Pakistani/Sindhi context.

## Why the disposition is escalate

`accessibility` is **unverified**. The only admissible rendered-page and print inspection
against the current bytes is unavailable, and the brief forbids building or serving the site
from a review job. That is a required criterion for a pass, so the report cannot certify this
submission. This is the second and final cycle under ADR-0019, so the limitation is escalated
to the owner rather than retried on unchanged inputs. One advisory finding (the residual MCQ
length cue) also remains open.
