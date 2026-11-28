---
id: crew-efpg-402-u02-repair_en
title: Apply EFPG-402 Unit 2 G3 findings
stage: misc
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: efpg-402
branch: crew/efpg-402-u02-repair_en
user: M Yousif Channa
command: crew repair_en
labels: [claude_crew, efpg-402, g3-repair]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/efpg-402/unit-02/ (topic-02, topic-03, topic-04, unit-assessment)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/ (same four)
  - static/img/figures/efpg-402/unit-02/fig-U2-3 (EN, UR, dark twins)
  - specs/content/efpg-402/ (figures, sources, tasks, G2 evidence)
tests:
  - prepare-gate-evidence efpg-402 2 (8 gates pass)
  - measure-figure-text on fig-U2-3 variants (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of G3 report 1947560f to EFPG-402 Unit 2 in English and Urdu, refreshed G2 evidence and appended an advisory G3 tracker row. G3 left unticked.

## Outcome

- ✅ Impact: the unit no longer presents invented wording as National Curriculum quotations.
- 🧪 Tests: G2 gate set and figure text measurement pass; check:content passes (14 content gates).
- 📁 Files: see front matter.
- 🔁 Next prompts: fresh independent G3 review.
- 🧠 Reflection: quotations attributed to a curriculum need an SLO code checked against the PDF at authoring time.

## Handoff (for CEO and agents)

- Shipped / changed: real NCP SLOs (S-04-A-17, S-06-A-12, S-08-A-14, S-04-B-02, S-05-B-05, S-06-B-11), six aims framed as the unit's synthesis, RRQ 7 inclusivity, MCQ keys now A3 B2 C2 D3, fig-U2-3 column marked illustrative.
- Decisions the team must respect: do not quote the NCP without an SLO code checked against the published PDF.
- Pending / next owner: fresh G3 review; G5 for Urdu; render-inspect needs to skip non-SVG kinds. Unflagged risks: the topic-02 "thicker textbook" note says the NCP measures textbook quality; the topic-03 activity asks groups to trace the water cycle at Grades 4, 6 and 8 although the SLO seen is Grade 4; fig-U2-5 Grade 8 matter wording was not checked against the PDF.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: fabricated curriculum quotations; sharp renders CSS-variable SVGs black.
- Graders run and results (PASS/FAIL): G2 gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): a check that every quoted NCP phrase occurs in the bound source text.
