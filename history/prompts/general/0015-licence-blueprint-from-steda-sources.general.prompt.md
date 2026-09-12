---
id: 0015
title: Licence blueprint from STEDA sources
stage: general
date: 2026-09-12
surface: agent
model: claude-opus-5
feature: none
branch: content/licence-blueprint
user: M Yousif Channa
command: start the licence blueprint from STEDA sources
labels: ["licence-blueprint", "steda", "content-priority", "sourcing", "primary-sources"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/licence-blueprint.md (new)
 - history/prompts/general/0015-licence-blueprint-from-steda-sources.general.prompt.md
tests:
 - npm run check:content (7/7 gates pass)
 - zero em dash
---

## Prompt

start the licence blueprint from STEDA sources

## Response snapshot

Built `specs/content/licence-blueprint.md` from three primary sources, under the Art. II.3
no-invented-mappings discipline.

**Sourcing.** The policy page (S3) named a syllabus document; the downloads index gave its path;
`Teaching_Licence_Test_2024.pdf` (S1) extracted cleanly and carries the complete Part II topic
list. The specification itself lives in `model_papers_iba.pdf` (S2), a 12-page scan with no text
layer - rendered at 150 dpi with pymupdf and read visually, since no OCR was available.

**Three corrections to prior assumptions, all evidenced:**

1. The repositioning plan's "Pedagogical Content 50% / Content Knowledge 30% / Psychometric &
   Analytical Reasoning 20%" is **unsupported**. S2's Summary of Test Division gives ERQ 25 /
   CRQ 50 / MCQ 25 across 61 items, 300 marks, 150 minutes. There is no psychometric or
   analytical-reasoning section at any weight. A secondary summary claiming 40/60 cites a now-404
   STEDA FAQ and is also unsupported.
2. **75% of the paper is constructed response.** Every sampled CRQ and the ERQ carries a published
   points rubric; only the 25% MCQ block is tagged `Content knowledge`. The pipeline's existing
   10 RRQ + 5 ERQ with rubrics is the format that addresses the 75%, which is also the part a
   printed MCQ guide serves worst.
3. **Part I is out of scope for the B.Ed corpus.** S1 assesses it from the "School Curriculum of
   Class one to eight (available at DCAR)", not from the B.Ed scheme. GQUR and GENG are
   university-level and mapping them would be invented. The dual-outcome claim is precise for
   Part II only: the corpus can serve 75% of the paper.

**Mapping.** 46 Part II objectives mapped: 5 to authored units, 32 at course level, 9 uncovered.
Classroom Management is the largest gap - no core course covers it and it carries at least two
sampled CRQ items. `EFMP-408` alone carries 16 objectives, the largest single block.

**Consequence for sequencing.** The licence-axis priority ranking puts `EFMP-408` first and
`EFMP-409` second, both Semester IV courses absent from the repositioning plan's Tier 1, which was
built on the incorrect 50% pedagogy figure. Flagged for reconciliation before content sequencing.

## Outcome

- ✅ Impact: the dual-outcome claim is now checkable, and three load-bearing figures were corrected against primary sources before they reached pricing or marketing.
- 🧪 Tests: check:content 7/7; zero em dash.
- 📁 Files: specs/content/licence-blueprint.md (237 lines), plus this PHR.
- 🔁 Next prompts: enumerate the 34 EFSP elective titles to close the Classroom Management gap; decide the Part I positioning; reconcile the plan's Tier 1 against the licence-axis ranking.
- 🧠 Reflection: the specification was in a scanned PDF that both the text extractor and the web fetcher failed on. Rendering to images and reading them directly was what turned an unsourced assumption into an evidenced table.

## Evaluation notes (flywheel)

- Failure modes observed: a strategy document's headline figures propagated unverified into a plan and nearly into pricing; scanned primary sources defeat text-only extraction and need a render-and-read path.
- Graders run and results (PASS/FAIL): check:content PASS; every blueprint row traceable to S1/S2/S3 or marked uncovered PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): re-verify the S2 transcription against the PDF at higher dpi, since every downstream figure rests on a hand-read scan.
