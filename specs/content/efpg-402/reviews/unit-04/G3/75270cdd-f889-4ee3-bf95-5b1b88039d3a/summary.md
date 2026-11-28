# EFPG-402 Unit 4 - G3 Independent English Review Summary (run 2, final cycle)

- **Course**: EFPG-402 Teaching of Science
- **Unit**: Unit 4 - Teaching-Learning Resources
- **Stage**: G3 (English review)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer run ID**: `75270cdd-f889-4ee3-bf95-5b1b88039d3a`
- **Author run ID**: `crew-job:efpg-402-u04-repair_en`
- **Model**: `LongCat-2.5`
- **Disposition**: `escalate`
- **Rendered input**: unavailable. Deployed SHA
  `b7b7e00c9a8640158b8d336ba1215e4fcfed01e9` differs from HEAD
  `b2dc2715255b31026bf257e58e451ecbf983d001` on eight unit files, so the production build is not
  the reviewed input. No build, dev server or Playwright run is permitted by the crew brief.

## What this cycle did

Run 1 (`b389e9fb-33f5-41f9-ab56-7df8fd3419e9`) returned `revise` with three blocking findings and
five advisory/uncertain ones. Repairs landed in commit `f3815d2e9` (merge `01a517779`). This report
re-verifies every run-1 finding against the current files, carries the unresolved ones, and records
the deterministic gate evidence.

## Criteria evaluation

1. **Authority (pass)**: the guide's Unit 4 leaf subtopics 4.1-4.5
   (`Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:764-770`) are taught one-to-one in
   `topic-01.mdx`..`topic-05.mdx` and mapped in `coverage/unit-04.md`. CLO/SLO `SLO:EFPG-402-4-1`
   and `-4-2` trace to guide objective 4.
2. **Sources (pass)**: the core citations are real and the claims are supported. The NCP Science
   Grades 4-8 progression grid was retrieved in full this cycle and every curriculum-grade
   reference now matches it (`source-checks/ncp-science-2022-grade-check.txt`). Khan et al. (2019)
   was retrieved in full and supports the repaired low-cost-aid wording
   (`source-checks/khan-2019-low-cost.txt`); the article is no longer declared unverifiable and a
   bound excerpt is committed. `khan-academy-science`, `vaidya-science` and `dale-1969` remain
   honestly declared under `## Unverifiable sources` with dates and `D-2026-0001`.
3. **Coverage (pass)**: all five sub-topics U4-01..U4-05 map to a topic file and a `###`
   explanation section; `check:depth-gate` and `check:content` exit 0; the concept graph defines
   seven concepts with prerequisites and corrected assessment links.
4. **Assessment (pass)**: independent solve of MCQs 1-10 gives 10/10 to the key
   (`assessment-solutions.md`); RRQ model answers and ERQ rubrics match the taught content; ERQ 3
   now uses a named Grade 5 SLO; the 10/10/5 bank and bounded answers section satisfy
   `check:no-answer-keys`.
5. **Accessibility (unverified)**: render-review is unavailable because the production site is one
   deploy behind HEAD. Structural accessibility and figure geometry pass from source;
   `measure-figure-text.mjs` exits 0 on all 40 SVGs. Visual, narrow-screen and A4 print inspection
   could not be performed on the reviewed bytes.
6. **Readability (pass)**: plain intermediate English, terms defined on first use, authentic Sindh
   classroom contexts, zero em dashes.
7. **Pedagogy (pass)**: every topic runs the full learning cycle; the three spec-mandated
   misconceptions are explicitly addressed; activities use low-cost local materials.

## Findings

- All three run-1 blocking findings are **resolved** (Dale cone alignment, ERQ 3 Grade 5 concept,
  NCP grade references).
- Run-1 advisories resolved: MCQ key balance, concept-graph mapping swap, Khan source declaration.
- Run-1 advisory still open: content-spec figure-plan wording for fig-U4-9 (frozen spec, out of
  reviewer scope).
- **Uncertain, unresolved**: render-review unavailable (stale production input). This blocks a
  machine pass under the evidence contract.
- New advisories: figure-manifest prompt grades for fig-U4-14/fig-U4-15 still carry the pre-repair
  Grade 5 / Grade 8 labels; fig-U4-6 retains the non-NCP phrase "electrical conductivity"; MCQ 6
  retains a Grade 5 teacher scenario for a Grade 7 mechanism.

## Disposition rationale

The content is clean of blocking defects, but the evidence contract requires a successful
`render-review` for a pass, and the only rendered input available (production) is not the reviewed
input. Under the contract's definitions this is missing evidence, so the report escalates rather
than passes. This is the second and final ADR-0019 cycle; a pass requires a fresh render inspection
of the current bytes once HEAD is deployed, or an authorised local render.

## Governance boundary

This review is independent and advisory. The reviewer did not author or translate the unit, did
not tick G3, did not add reviewer initials, did not write to `tasks.md`, and does not certify or
publish. Acceptance requires a protected signing host and a qualified registry entry under
ADR-0019; no such host was used.
