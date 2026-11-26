# G3 review summary - GENT-401 Unit 1

- Report: `specs/content/gent-401/reviews/unit-01/G3/crew-gent-401-u01-review_en-r1.json`
- Disposition: **escalate**
- Reviewer: `agent:claude-crew`; author run `claude:crew-gent-401-u01-author`
- Reviewed input: commit `6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e` (93 bound inputs,
  manifest prepared locally over a clean tree and re-verified, 0 mismatches)
- Deployed SHA (render input identity): `366019f8ace647e892523e553b81ab6d1832ec68`

The unit is well built: all six guide leaves are taught under real headings, the
English reads clearly for an HSC/intermediate graduate, the activities are feasible
in the stated Sindh context, and the six mandatory deterministic checks pass. Two
content defects and one unavailable render keep it from a pass.

## Criterion evidence: authority

`specs/content/gent-401/content-spec.md:74-101` carries the approved Unit 1 spec
(frontmatter `status: approved`) with six sub-topics U1-01..U1-06 traced to guide
Weeks 1-2. `specs/content/gent-401/coverage/unit-01.md:5-19` maps every leaf to a
real `###` heading that teaches it: `topic-01.mdx:34,59,87` and `topic-02.mdx:34,60,81`.
The unit's `clo_refs` are `SLO:GENT-401-1-1` and `-1-2`, matching the spec. The
course is not yet in `catalog/courses.json` (spec drafting note at
`content-spec.md:14`), an owner-ruling item outside Unit 1's content; recorded as
advisory A-2, not a Unit 1 authority failure.

## Criterion evidence: sources

All cited passages were read against the bound excerpts. The meaning, economic
role, characteristics, creativity/innovation, risk and managerial-thinking claims
are supported; the three-question test and five-step flowchart are disclosed as
author teaching devices (`sources/texts/openstax-entrepreneurship.md:26`).
`mellor-2009` is declared unverifiable and used only for its title premise, which
the G3 rubric allows.

**Fail.** `topic-01.mdx:91` claims the seven characteristics "appear in both
sources". The bound OpenStax 1.3 list and Butler p. 23 list do not both contain
confidence, problem-solving, openness to learning, persistence or curiosity as
stated; at most three rows are in both. Finding F2 (blocking). See
`source-verification.md`.

## Criterion evidence: coverage

`coverage/unit-01.md` maps all six sub-topics with exact headings; the content-spec
Topic list partitions the same IDs across the two topic files with none doubled or
unmapped. Reading minutes: index 2 + topic-01 11 + topic-02 11 + assessment 15 +
notes 2 = 41, inside the approved 32-44 band. Assessment spread: MCQ 6/4, RRQ 6/4,
ERQ 2/2 plus the integrative item; all within the blueprint bands.

## Criterion evidence: assessment

All 25 items were solved independently before the key was read; the derived MCQ key
matches the supplied key on all ten letters, and the RRQ model answers and ERQ rubrics
were checked (`assessment-solutions.md`). ERQ 4 is the blueprint's Analyze item on a
school-supplies business.

**Fail.** MCQ key distribution is A1 / B7 / C2 / D0, so an all-B answer scores 7/10
and no item keys D; the keyed option is also the longest option in 7 of 10 items.
Finding F1 (blocking).

## Criterion evidence: accessibility

**Unverified.** The deployed SHA `366019f8ace647e892523e553b81ab6d1832ec68` differs
from the reviewed HEAD `6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e` on
`docs/semester-4/gent-401/unit-01/index.mdx` and
`static/img/figures/gent-401/unit-01/fig-U1-5.webp`, so the CI-built production site
is not the reviewed input. `render-review` is recorded unavailable (exit 1) in
`logs/render-review.txt`; no browser, narrow-viewport or A4 print inspection was run.
Source-level checks only: all five `<Figure>` uses carry non-empty descriptive alt
text; headings are monotonic in all five files; every topic file carries the nine
canonical cycle headings in order; unit tables use the static
`display:block; overflow-x:auto` rule in `src/css/custom.css`, so each table is its
own scroll container. `measure-figure-text` exits 0 on all 16 bound SVGs (EN and UR),
with no glyph overflow or wordmark overprint (`logs/measure-figure-text.txt`).

## Criterion evidence: readability

An HSC/intermediate graduate can follow the explanations without prior specialist
knowledge. Each topic opens with a concrete Sukkur or Mirpurkhas classroom situation,
defines terms in plain language, gives a worked example before the activity, and
corrects a named misconception. The three-question test, five-step flowchart and
four-question risk check are simple, reusable tools. Reading estimate 41 minutes is
inside the band.

## Criterion evidence: pedagogy

Progression is sound: classroom situation to explanation, activity, retrieval,
reflection and assessment. Activities are feasible in the stated Pakistani/Sindhi
context with usable instructions and materials (groups of four, 25-30 minutes, local
cases, low-cost tests). The misconception corrections are evidence-linked, and the
teacher notes sequence the guide's teaching strategies and practical work across the
two weeks. Conceptual depth is present rather than word count alone.

## Findings

- **F1 blocking** - MCQ key and option-length giveaway (see assessment).
- **F2 blocking** - "appear in both sources" overstates the two lists (see sources).
- **F3 uncertain** - render/print inspection unavailable; accessibility unverified.
- **A-1 advisory** - `butler-iea` edition year 2020 still needs IEA confirmation
  (`sources/unit-01.md:17-19`); the unit cites 2020 throughout.
- **A-2 advisory** - the course is not yet in `catalog/courses.json`; owner ruling
  pending, outside Unit 1 content.

## Advisory only

This report is advisory. It does not certify the unit, sign anything, append a done
tracker row, change `translation_status`, alter the registry or publish. G3 remains
open.
