---
id: 20261188
title: Repair GICP-400 Unit 7 from the latest G3 report
stage: general
date: 2026-11-10
surface: agent
model: gemini-3.8-flash
feature: gicp-400
branch: crew/gicp-400-u07-repair_en
user: crew
command: agy worker on .crew/brief.md
labels: ["crew", "agy", "gicp-400", "unit-07", "g3-repair"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: history/adr/0019-agent-review-independence.md
  pr: null
files:
  - docs/semester-3/gicp-400/unit-07/index.mdx
  - docs/semester-3/gicp-400/unit-07/topic-01.mdx
  - docs/semester-3/gicp-400/unit-07/unit-assessment.mdx
  - specs/content/gicp-400/concepts/unit-07.md
  - specs/content/gicp-400/coverage/unit-07.md
  - specs/content/gicp-400/figures/unit-07.banner.md
  - specs/content/gicp-400/figures/unit-07.md
  - specs/content/gicp-400/sources/texts/dean-2005-citizenship.md
  - specs/content/gicp-400/sources/texts/kennedy-2012-civic.md
  - specs/content/gicp-400/sources/unit-07.md
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-07/G2/20261110T042755938Z-gates.json
  - static/img/figures/gicp-400/unit-07/fig-U7-1.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-1.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-3.dark.svg
  - static/img/figures/gicp-400/unit-07/fig-U7-3.svg
  - history/prompts/general/20261188-repair-gicp400-unit-seven-g3.general.prompt.md
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gicp-400/unit-07/fig-U7-1.svg static/img/figures/gicp-400/unit-07/fig-U7-1.dark.svg static/img/figures/gicp-400/unit-07/fig-U7-3.svg static/img/figures/gicp-400/unit-07/fig-U7-3.dark.svg
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of the latest G3 report (specs/content/gicp-400/reviews/unit-07/G3/20261108T203238Z-g3-desk-8314fbc3.json) to GICP-400 Unit 7:
1. Restated Dean (2005) claims to match verified full text (rote transmission critique, passive citizenship, necessity of knowledge, skills, values and dispositions, and teacher as essential to reconceptualizing democratic citizenship education); removed invented dimension lists and fabricated quotations.
2. Re-grounded Kennedy (2012) to nation state responsibility in cultivating active citizenship from an international comparative perspective; removed unsupported mapping of assimilation to Kennedy.
3. Re-bound source excerpts in `specs/content/gicp-400/sources/texts/dean-2005-citizenship.md` and `kennedy-2012-civic.md`, verified against full texts.
4. Corrected constitutional provisions: taught Article 251(3) as permissive for provincial legislation, added Article 28 for linguistic/cultural preservation right, distinguished justiciable Fundamental Rights from non-justiciable Principles of Policy under Article 30(2), and cited Article 4 and 10A alongside Article 5(2) for procedural fairness and due process.
5. Excised contested causal claim regarding 1971 in national integration section.
6. Cohered the anchor scenario: Zainab is a Class 9 pupil in a co-educational government high school in Khairpur, Sindh.
7. Defined "Constitutional values" in prose and mapped values to Articles 4, 10A, 25, 28, 33 and 25A.
8. Aligned ERQ 2 and ERQ 3 stems with rubric criteria, updated MCQ distractors, and clarified RRQ 2 mark breakdown.
9. Corrected pedagogy in worked examples: replaced public theft accusation with learning materials sharing dispute; resolved harvest attendance problem through catch-up packets; included Balochistan in the national water systems example.
10. Resolved figure issues: moved fig-U7-1 label clear of dashed path and passed measure-figure-text; landed fig-U7-3 arrows on flat edges; updated language node to reflect Article 28 and 251(3); created specs/content/gicp-400/figures/unit-07.banner.md at prompt-only.
11. Reconciled coverage matrix and concept graph assessment traces.
12. Appended G3 review advisory repair row to specs/content/gicp-400/tasks.md leaving G3 unticked.
13. Refreshed G2 gate evidence via prepare-gate-evidence.

## Outcome

- ✅ Impact: GICP-400 Unit 7 G3 desk report findings fully resolved; all 14 content gates pass cleanly.
- 🧪 Tests: `npm run check:content` passed (14/14); `scripts/heavy.sh node scripts/measure-figure-text.mjs` passed on all modified SVGs.
- 📁 Files: Unit 7 MDX files, specs files, SVGs, G2 evidence and logs, banner manifest, tracker, and this PHR.
- 🔁 Next prompts: Fresh independent G3 review of Unit 7 after owner authorization (ADR-0019).
- 🧠 Reflection: Verified academic texts must anchor authoring; unverified secondary paraphrases compound errors across assessment and figures.

## Handoff (for CEO and agents)

- Shipped / changed: GICP-400 Unit 7 text, assessments, sources, coverage, concepts, figures and tracker repaired to resolve all open findings from G3 report 20261108T203238Z-g3-desk-8314fbc3.json; G2 evidence refreshed.
- Decisions the team must respect: Dean (2005) claims follow AKU eCommons full text (knowledge, skills, values and dispositions; transmission model; teacher essential to reconceptualization); Article 251(3) is permissive, Article 28 protects linguistic rights; ideology strand remains pending owner ruling.
- Pending / next owner: Fresh independent G3 review round 2 under ADR-0019; owner ruling on ideology strand before translation (G4).
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: G2 input manifest became stale after content edits; refreshed using `node scripts/prepare-gate-evidence.mjs --refresh-stale`.
- Graders run and results (PASS/FAIL): validate:content PASS, check:pipeline-gate PASS, check:depth-gate PASS, check:figures PASS, check:svg-style PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:concept-graph PASS, check:bloom-bands PASS, check:source-floor PASS, check:licence PASS, licence:map:check PASS, check:content-status PASS, check:docs-sync PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Run fresh independent G3 reviewer session.
