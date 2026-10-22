---
id: 0854
title: "GQUR-301 U09 Urdu translate"
stage: tasks
date: 2026-10-22
surface: agent
model: longcat/LongCat-2.0
feature: 006-content-pipeline
branch: crew/gqur-301-u09-translate
user: board-direct
command: "Read .crew/brief.md in the current directory and carry it out completely."
labels: ["board-direct", "translate-unit", "gqur-301", "urdu"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/unit-assessment.mdx
tests:
  - npm run check:content (12/13 pass; check:content-status is pre-existing on main)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

Translated GQUR-301 Unit 9 (Introduction to Probability) into its complete Urdu mirror at G4: index.mdx with key_terms block, topic-01.mdx (basic probability concepts), topic-02.mdx (probability rules), and unit-assessment.mdx (10 MCQ + 10 RRQ + 5 ERQ with translated answers and marking guidance). All files use .ur.svg figure references, translated alt text, and academic-plain Urdu bound to the concept graph's Urdu labels. Ran content gates: 12/13 pass (only pre-existing check:content-status failure). Verified MCQ answer-key correctness, heading parity, and PrintHandout/Figure component parity against the English baseline.

## Outcome

- ✅ Impact: Complete Urdu draft mirror for GQUR-301 Unit 9, structurally and semantically ready for independent G5 review
- 🧪 Tests: npm run check:content — 12/13 gates pass; check:content-status fails identically on origin/main (pre-existing, unrelated)
- 📁 Files: 4 new Urdu MDX files under i18n/ur/.../gqur-301/unit-09/
- 🔁 Next prompts: G5 Urdu review (independent session), figure .ur.svg generation
- 🧠 Reflection: Key terminology (احتمال، واقعہ، نمونہ فضاء، مخرج) is not in the frozen terminology.csv bank; these are mathematical terms used directly from the concept graph's author-supplied Urdu labels. A terminology bank expansion proposal for probability/statistics terms is a follow-up action.

## Handoff (for CEO and agents)

- Shipped / changed: GQUR-301 Unit 9 complete Urdu draft mirror (4 files). translation_status remains draft. No tracker row appended.
- Decisions the team must respect: Probability terms (احتمال، واقعہ، نمونہ فضاء، تکملہ، اتحاد، تقاطع، باہمی اخراج، آزاد، مخرج) are not in terminology.csv; they were used as-is from the concept graph's governance labels. Do not "fix" these to match the bank.
- Pending / next owner: G5 Urdu review by independent session; figure .ur.svg generation (4 schematics: fig-U9-1 concept-map, fig-U9-2 diagram, fig-U9-3 diagram, fig-U9-4 table)
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Initial drafts had typos (احتمل → احتمال, نمودہ → مثال, دہشتی → اعشاریہ, شماریہ → مخرج) caught and bulk-fixed via sed before gate run.
- Graders run and results (PASS/FAIL): check:content PASS (12/13, excluding pre-existing content-status failure)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
