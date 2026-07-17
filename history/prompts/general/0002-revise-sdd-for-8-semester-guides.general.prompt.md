---
id: 0002
title: Revise SDD for 8-Semester Course Guides
stage: general
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: none
branch: main
user: channayousif@gmail.com
command: revise SDD constitution, specs, roadmap for new course guides
labels: ["sdd", "constitution", "content-pipeline", "roadmap", "curriculum"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - SDD/constitution.md
 - SDD/ROADMAP.md
 - SDD/006-content-pipeline.md
 - SDD/001-content-platform.md
 - SDD/003-classes-assignments.md
tests:
 - "grep audit for stale references (Drive, '6 courses', 'Semester I pilot') in SDD/ — only intentional references remain"
---

## Prompt

revise the @SDD/constitution.md and feature specs and roadmap @SDD/ according to the new information in @Scheme-and-Course-guides/ . Previously there were ony few subjects, now we have complete 8 semester course guides, along with recommended books and resources for each. we can benifit from the given reources for each course as starting point, and enhance our content creation pipeline (SUGGESTED PRACTICAL ACTIVITIES (OPTIONAL)
SUGGESTED INSTRUCTIONAL / READING MATERIALS
TEACHING/INSTRUCTIONAL STRATEGIES (Not Limited to what is mentioned there)
PRACTICAL WORK
The student-teachers will also complete their course with the help of following practical work.
1. Group work 2. Group assignments
3. Individual assignment 4. Presentations
ASSESSMENT CRITERIA
The students will be assessed through,
1. Class test 2. Mid Term test
3. Evaluation of assignments 4.Class attendance
5. Class participation/Performance e.g. initiative, responding, curiosity, inquiry). It is clarified that Assessment is 60% summative and 40% formative for the affiliated GECEs (colleges). Content creation Priority should be given to semester 1 to 4 initially for new scheme 2026.

## Response snapshot

Extracted the DOCX course guides (Sem III–VIII) and the board scheme via Python zipfile (Sem I/II are PDF — extraction tooling unavailable, logged as a known gap). Confirmed each guide carries Recommended Books, Teaching/Instructional Strategies, Practical Work, Assessment Criteria, and (newer 2026 guides) Suggested Practical Activities + Reading Materials.

Applied the following SDD revisions:
- **constitution.md** → v1.1 with amendment rationale. Art. II now points to the local `Scheme-and-Course-guides/` folder (all 8 semesters) as source of truth. Art. III adds guide-section fidelity, recommended-books-as-starting-point (cited, not reproduced), and the 60/40 summative/formative GECE weighting. Art. VI reframed from "Semester I 6-course pilot" to "all 8 semesters scaffolded; content priority Sems 1–4; golden unit EFMP-301 U1".
- **ROADMAP.md** → phases/decisions updated for all-8 scaffold + Sems 1–4 content priority; added a full Course Catalog appendix (all 8 semesters, codes, CH, categories).
- **006-content-pipeline.md** → G0/G1/G2 enriched; added a section→file folding-rule table; CP4a + CP8–CP10 (recommended resources, course-overview page, fold-into-5-files, 60/40 weighting); build plan + acceptance updated for Sems 1–4.
- **001-content-platform.md** → F2 generalized to `semester-{1..8}` + per-course `course-overview.mdx`; F3 adds optional `resources[]`/`teaching_strategies[]`/`assessment_weighting`; scaffold step + acceptance updated.
- **003-classes-assignments.md** → seed note now covers all 8 semesters.

User decisions during planning: (1) fold new sections into the existing 5 unit files (no new files); (2) scaffold all 8 semesters now, drive content Sems 1–4 first.

## Outcome

- ✅ Impact: SDD now reflects the full 8-semester 2026 catalog and an enriched content pipeline; consistent across constitution ↔ roadmap ↔ specs.
- 🧪 Tests: grep audit — no stale "Drive/6-course/Semester I pilot" references except intentional historical/catalog mentions.
- 📁 Files: 5 SDD files edited; 1 PHR created.
- 🔁 Next prompts: extract Sem I/II PDF guides once tooling is available; run G0 for EFMP-301 → content-spec + course-overview.
- 🧠 Reflection: PDF extraction unavailable in-env; DOCX handled via zipfile. Sem I/II per-course detail deferred to a logged gap.

## Evaluation notes (flywheel)

- Failure modes observed: PDF text extraction not possible (no poppler/pdfminer); worked around for DOCX only.
- Graders run and results (PASS/FAIL): grep consistency audit — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a `specs/gaps.md` entry for the Sem I/II PDF extraction gap.
