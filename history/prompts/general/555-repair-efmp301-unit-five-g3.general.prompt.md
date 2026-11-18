---
id: 555-repair-efmp301-unit-five-g3
title: Repair EFMP-301 Unit 5 from the latest G3 report
stage: misc
date: 2026-11-09
surface: agent
model: crew
feature: none
branch: crew/efmp-301-u05-repair_en-r1
user: crew
command: opencode worker on .crew/brief.md
labels: ["crew", "opencode", "efmp-301", "unit-05", "g3-repair"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: history/adr/0019-agent-review-independence.md
  pr: null
files:
  - docs/semester-1/efmp-301/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/topic-02.mdx
  - specs/content/efmp-301/sources/texts/seifert2009.md
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-*/G2/20261109T2152*-gates.json
tests:
  - npm run check:content
  - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-05/fig-U5-1.svg
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of the latest G3 report (20261108T203238Z-g3-desk-c3af68da.json) to EFMP-301 Unit 5. Verified that most findings were already resolved on origin/main by prior repair commits (multimodal and IQ-prediction claims qualified, Thurstone/CHC restored, ERQ 5 integrative pupil profile, recognizing spelling consistent, figure geometry measured clean, measurement-independence claims softened, sources/unit-05.md practical-work attribution aligned, assessment comparison fixed). Repaired the two residual findings: the seifert2009 bound excerpt no longer claims U5-1 reinforcement, and the topic-02 Seifert citation was moved onto the accommodation claim it supports while the acceleration caution no longer cites a source that never mentions acceleration. Refreshed the G2 evidence for EFMP-301 Units 2-12 because the shared seifert2009 source edit invalidated their manifests. Appended the Unit 5 G3 tracker row and committed.

## Outcome

- ✅ Impact: Unit 5 G3 findings resolved; all content gates pass; G2 evidence fresh for all EFMP-301 units.
- 🧪 Tests: `npm run check:content` all 14 gates pass; `measure-figure-text.mjs` exits 0 for fig-U5-1.svg and .dark.svg.
- 📁 Files: 3 content/source files edited; 11 G2 evidence bundles refreshed; 1 tracker row appended.
- 🔁 Next prompts: fresh G3 review of Unit 5 after owner authorisation (ADR-0019 cycles exhausted).
- 🧠 Reflection: The latest G3 report was run against a pre-repair version of the content files; always verify each finding against current bytes before editing.

## Handoff (for CEO and agents)

- Shipped / changed: seifert2009 bound excerpt corrected (U5-1 reinforcement locator removed); topic-02 acceleration citation corrected (EN + UR); G2 evidence refreshed for EFMP-301 Units 2-12; Unit 5 G3 tracker row appended.
- Decisions the team must respect: the seifert2009 bound excerpt is a shared source file; any edit invalidates the G2 evidence of every unit that cites it and requires a `prepare-gate-evidence.mjs --refresh-stale` run.
- Pending / next owner: fresh G3 review of Unit 5 (ADR-0019 cycles exhausted, needs owner authorisation); render inspection (narrow viewport and A4 print) still unavailable in crew jobs.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: stale review reports can describe a pre-repair state; always diff the report input manifest against current bytes.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
