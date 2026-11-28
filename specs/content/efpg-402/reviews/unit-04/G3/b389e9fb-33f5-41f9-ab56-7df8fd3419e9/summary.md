# EFPG-402 Unit 4 - G3 Independent English Review Summary

- **Course**: EFPG-402 Teaching of Science
- **Unit**: Unit 4 - Teaching-Learning Resources
- **Stage**: G3 (English review)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer Run ID**: `b389e9fb-33f5-41f9-ab56-7df8fd3419e9`
- **Author Run ID**: `crew-job:efpg-402-u04-author`
- **Model**: `LongCat-2.5`
- **Disposition**: `revise`
- **Rendered input**: production site `https://textbook.com.pk` at deployed SHA
  `00ac8dbb5ee318db7387243e2b3b92aed650ae8c`; `git diff --quiet 00ac8dbb5 HEAD --
  docs/semester-4/efpg-402/unit-04 static/img/figures/efpg-402/unit-04/` exits 0, so the live
  unit is the reviewed input.

## Criteria evaluation

1. **Authority (pass)**: the guide's Unit 4 leaf subtopics 4.1-4.5
   (`Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:764-770`) are taught one-to-one in
   `topic-01.mdx` to `topic-05.mdx` and mapped in `specs/content/efpg-402/coverage/unit-04.md`.
   CLO/SLO `SLO:EFPG-402-4-1` and `-4-2` trace to guide objective 4 and are referenced across the
   index, topics and assessment.
2. **Sources (fail)**: the core citations are real and the main claims are supported. Khan et al.
   (2019) was retrieved in full for this review and supports the low-cost-aid findings
   (`source-checks/khan-2019-low-cost.txt`); the NCP progression grid supports the enquiry,
   measurement and science-in-context claims. However, several curriculum-grade references
   contradict the NCP progression grid (`source-checks/ncp-science-2022-grade-check.txt`), so the
   criterion is not clean.
3. **Coverage (pass)**: all five sub-topics U4-01..U4-05 are mapped to a topic file and a `###`
   explanation section; `check:depth-gate` exits 0; the concept graph defines seven concepts with
   prerequisites and assessment links.
4. **Assessment (fail)**: MCQs 1-10 solve 10/10 to the key, and RRQs 1-10 and ERQ demand match the
   schemes. Two defects: RRQ 2 asks for "four main levels" of Dale's cone and its key names four,
   while the taught text lists five and fig-U4-2 renders four with a different second-level name;
   and ERQ 3 is required by the content-spec blueprint to use a named Grade 5 concept but names a
   Grade 6 concept.
5. **Accessibility (unverified)**: live desktop 1280x900, narrow 360x780 and A4 print 794px
   inspection found no heading jumps, no missing alt text, no document overflow, tables that
   scroll inside their own `tabindex="0"` region, no clipped figures and a rendered answers
   section. `render-review` still exits 1 because Section D of `render-inspect.mjs` fetches `.svg`
   variants for the five raster illustrations; see limitations.
6. **Readability (pass)**: plain intermediate English, terms defined on first use, authentic Sindh
   classroom contexts, zero em dashes.
7. **Pedagogy (pass)**: every topic runs classroom situation, explanation, worked example,
   misconception, activity, retrieval, summary, self-assessment, practicum and a rubric-bearing
   summative task; the three spec-mandated misconceptions are explicitly addressed.

## Findings

- Blocking: Dale's cone level count and naming disagree across `topic-01.mdx:55-63` (five),
  `fig-U4-2.svg` (four, second band "Demonstrations & Working Models") and RRQ 2
  (`unit-assessment.mdx:105,154`, four, second level "Contrived Experiences and Working Models").
- Blocking: ERQ 3 (`unit-assessment.mdx:129`) names a Grade 5 concept that the NCP places at
  Grade 6 (SLO S-06-B-37), against the blueprint at `content-spec.md:268`.
- Blocking: NCP grade-reference errors in `topic-03.mdx:28,94`, `topic-04.mdx:28,94` and
  `unit-assessment.mdx:125` (details in `source-checks/ncp-science-2022-grade-check.txt`).
- Uncertain: `render-review` tooling limitation on raster illustrations (see limitations).
- Advisory: MCQ key skew (B 7/10, A 0/10); concept-graph CON-6/CON-7 mapping swap; figure-plan
  "museum" vs delivered "Pottery / Brick Kiln"; "superior retention" wording in topic-03.

## Governance boundary

This review is independent and advisory. The reviewer did not author or translate the unit, did
not tick G3, did not add reviewer initials, did not write to `tasks.md`, and does not certify or
publish. Acceptance requires a protected signing host and a qualified registry entry under
ADR-0019; no such host was used.
