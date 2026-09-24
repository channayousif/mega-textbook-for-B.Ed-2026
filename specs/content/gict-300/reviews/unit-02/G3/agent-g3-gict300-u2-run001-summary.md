# G3 English review summary - GICT-300 Unit 2 (Computer Hardware and Software Fundamentals)

- **Report:** `agent-g3-gict300-u2-run001.json` (this directory)
- **Reviewer:** `agent:g3-reviewer`, fresh session (LongCat-2.0), 2026-09-23
- **Author run:** `claude-code:64e8d03:gict-300-u2` - derived from the unit's single
  authoring commit `64e8d03` (2026-09-23, "feat(gict-300): author Units 2 and 3",
  Co-Authored-By: Claude Code); the parent's handoff stated the bundle but not an explicit
  author run string, so the git record is cited instead of inventing one.
- **Disposition:** **pass** (advisory findings only; nothing blocking or uncertain)
- **Bundle:** `manifest.json` in this directory, prepared by the parent; all 101 bound
  inputs re-verified by digest in this session (twice: at start and at end), skill digest
  matching. Rulings cited: D-2026-0001 (unverifiable sources), D-2026-0030 (intake
  approval), both digest-bound in the report.

## What was reviewed and how

- **Authority:** guide Unit 2 bullets (`1st 2026.txt:447-457`) against the approved spec
  (`content-spec.md` `## Unit 2`, D-2026-0030), the coverage matrix, the concept graph and
  the actual topic files. All five guide bullets decompose into U2-01..U2-08 and every row
  has a named taught section; CLO 3 is traced consistently (SLO:GICT-300-2-3 on all files).
- **Sources:** every in-prose citation checked passage-by-passage against the bound
  excerpts. All 13 Bourgeois et al. (2019) citations match (including the verbatim
  application-software quote and the OS's three functions); both Wallace & Clariana (2005)
  citations match (60 percent below passing; 36 percent could exempt). The five
  D-2026-0001-unverifiable keys appear only at bibliographic level in Further reading;
  no prose claim rests on them.
- **Coverage:** all 8 sub-topics taught and assessed; 8 placed figures (2 per topic,
  concept-map + flowchart present); reading minutes 83 of the 65-95 budget; concept graph
  15 concepts, gate-verified.
- **Assessment:** the full 10/10/5 bank was solved independently before the answer key
  was read. All 10 MCQ keys match (1-b, 2-c, 3-b, 4-b, 5-a, 6-b, 7-b, 8-b, 9-c, 10-b); no
  ambiguous stems; all 10 RRQ model answers match derived expectations; each ERQ rubric
  totals 10 marks with an Analyse-or-higher criterion. Per-topic minimums and Bloom bands
  conform to the approved blueprint.
- **Accessibility (rendered inspection):** production build served and inspected at
  1280x900, 360x780 (mobile/touch) and A4 print (794px, PDFs emitted), plus SVG text
  geometry on all 16 locale-relevant figure variants. All 7 pages load; no skipped
  headings; every figure served with descriptive alt text; no horizontal overflow at any
  width; nothing clipped in A4 print; the answers section renders in print.
- **Deterministic gates:** validate:content, check:depth-gate, check:figures,
  check:no-em-dash, check:no-answer-keys, check:docs-sync (plus check:concept-graph)
  all exit 0. See "Environment" below for where they ran.

## Advisory findings (none blocking; details in the report JSON)

1. **ERQ-5 vs blueprint wording.** The integrative ERQ evaluates the "layered system"
   statement; the approved blueprint words the integrative item as "requiring a
   hardware/software plan for a described school need". The plan demand is present in
   ERQ-1/2/4 (per-topic items) and every structural constraint holds. Owner may accept or
   request a cycle-2 recast.
2. **Storage-hierarchy rungs not text-bound.** The registers and cloud rungs of the
   pyramid (topic-02, fig-U2-3) are standard content presented without citation; the
   bound Bourgeois excerpt carries the RAM/disk core, not the full pyramid. The sources
   declaration's "independently carries" phrase is generous for the full pyramid.
3. **"exactly these concepts"** (topic-03) slightly overstates the Wallace & Clariana
   excerpt (the study tested intro-course concepts broadly); the numbers are exact.
4. **Bare-URL link text** in the Further reading sections (render-inspect advisory).
5. **ERQs 1-4 restate the topic Summative task scenarios** - rehearsal-then-assess
   design; no bound standard forbids it.
6. **Concept-graph linkage looseness:** MCQ-08 sits under "The boot sequence"; RRQ-05
   under application software; RRQ-04 under ROM. Governance-table data quality only.
7. **fig-U2-3 geometry flags - investigated, overruled (resolved).** render-inspect's two
   DEFECT lines are a getBBox() pre-rotation artifact on the rotated arrow labels;
   measured as rendered (getBoundingClientRect) both labels sit fully inside the viewBox,
   and 3x visual crops show unclipped text. Evidence: `render-review.log`,
   `fig-U2-3-svg.png`, `fig-U2-3-right-label.png`.
8. **Environment note (resolved).** Repo-wide gates fail as-is in this worktree solely
   from pre-existing, out-of-scope geng-300 defects (stale `docs/semester-1/geng-300/`
   tree; em dashes in `specs/content/geng-300/intake/evaluation.md`), already fixed on the
   unmerged branch `018-author-geng300`. Gates were re-run in an overlay whose 101 bound
   inputs were verified byte-identical to the prepared manifest (same normalization);
   every log discloses this, and the as-is worktree runs are retained as `worktree-*.txt`
   with each failure attributed to geng-300 only. Zero GICT-300 findings in any as-is run.

## Boundary

This report is advisory evidence. It does not certify the unit, sign anything, write a
tracker row, or authorize publication; acceptance requires the protected qualification and
signing path (ADR-0019, Constitution Art. VII).
