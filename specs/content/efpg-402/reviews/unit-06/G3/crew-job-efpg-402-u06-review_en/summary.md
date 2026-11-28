# Summary: G3 English Review of EFPG-402 Unit 6

- **Course**: EFPG-402 (Teaching of Science)
- **Unit**: 6 (Maintenance and Organization of Science Laboratory)
- **Reviewer**: `agent:claude-crew`
- **Reviewer run ID**: `crew-job:efpg-402-u06-review_en`
- **Author run ID**: `crew-job:efpg-402-u06-author`
- **Model**: Claude Code, model identity LongCat-2.5
- **Disposition**: `escalate`

## Verdict

The unit is well built at the structural level: authority, coverage, assessment, readability and
pedagogy all pass on the bound evidence, and every deterministic content gate exits 0. Two things
prevent a pass:

1. **`sources` fails.** The unit's prose and its `sources/unit-06.md` and `coverage/unit-06.md`
   tables attribute the laboratory-management content to the *National Curriculum of Pakistan
   2022-23: Science, Grades 4-8* (`ncp-science-2022`). The bound excerpt for that source contains
   eleven science-content and SLO passages and no laboratory-management content, and the full
   74-page PDF (checked independently on 2026-11-28) contains no laboratory layout, chemical
   storage or compatibility grouping, GHS labelling elements, stock registers, waste neutralisation
   or disposal, eyewash or PPE content. The approved content-spec's reading list does not map
   `ncp-science-2022` to Unit 6 at all (it lists `cpsc-niosh-2006`, `minhas-2025-lab` and
   `kochhar-science`), so the unit's claim that every sub-topic is "also grounded in a source with
   a bound excerpt (`ncp-science-2022`)" is not borne out. The three sources that do carry the
   content are declared unretrievable, and the declaration gives no retrieval attempts or owner
   authorisation for two of the three. This is a blocking finding.
2. **Render evidence is unavailable.** The production site is built from deployed SHA
   `fb0d38996a8231c160e8d1104c7c5a6935022911`, which differs from reviewed HEAD
   `d103b2448df417cf34c30c95c362e103d962b2fc` on all seven unit MDX files and on seven new WebP
   figures. The live site is therefore not this review's input, and the brief prohibits a local
   build, dev server or browser run. `accessibility` is `unverified` for the visual checks;
   structural accessibility and figure geometry pass from source.

## What passes

- **Authority**: guide sections 6.1 to 6.6 (`4TH SEMESTER.txt:780-787`) match the approved content
  spec's nine sub-topics U6-01 to U6-09 and the six topic files; the two SLOs trace to guide
  objectives 4 and 5. The sub-topic checklist splits guide sections 6.3 and 6.4 into two leaves
  each, as the approved spec records.
- **Coverage**: all nine sub-topics map to exact `###` headings in the topic files and are taught
  there; `check:depth-gate` exits 0; nine concepts are defined and linked to the 10/10/5 bank.
- **Assessment**: independent solve of all ten MCQs matches the key 10/10; RRQ model answers and
  ERQ analytic rubrics agree with the derived answers; blueprint floors and Bloom bands are met;
  ERQ 2 is the required Analyze item.
- **Readability and pedagogy**: complete nine-part cycles, explicit misconception correction,
  feasible Sindh classroom activities, plain academic language with worked examples.

## Advisory items (non-blocking)

- MCQ correct keys are A 0, B 6, C 3, D 1. Option A is never the key and B carries 6 of 10; all
  items and distractors are unambiguous, but balancing the key across A-D is recommended.
- `topic-03.mdx:50` names "pure alkali metals (sodium, potassium)" for water-reactive storage, but
  `fig-U6-5.svg` lists "Sodium, calcium". Calcium is an alkaline-earth metal, not an alkali metal,
  and the figure's mineral-oil instruction fits sodium and potassium better than calcium. Align
  the figure row with the prose or name only sodium and potassium.
- `topic-04.mdx:58` calls the stock registers an "administrative statutory obligation" in Pakistani
  schools. No bound source establishes a statutory duty; soften to an administrative or institutional
  requirement, or ground the word "statutory".

## Process notes

`npm run check:content` was run on this branch and reports all content gates passed. The branch was
clean at the reviewed commit and equals `origin/main`, so the review introduces no finding that
`origin/main` does not also report. The report is advisory: it does not certify G3, sign evidence,
mark a tracker row done, or authorise publication. Per the acceptance boundary, certification needs
a trusted detached signature and a registered qualified reviewer.
