---
id: 2447
title: EFMP-406 Unit 3 G3 desk-review repair (41db593c)
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/efmp-406-u03-repair_en
user: M Yousif Channa
command: crew job efmp-406-u03-repair_en
labels: [claude, crew, efmp-406, g3-repair]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-406/unit-03/index.mdx
  - docs/semester-3/efmp-406/unit-03/topic-01.mdx
  - docs/semester-3/efmp-406/unit-03/topic-02.mdx
  - docs/semester-3/efmp-406/unit-03/unit-assessment.mdx
  - specs/content/efmp-406/sources/unit-03.md
  - specs/content/efmp-406/sources/texts/papen-2023-nls.md
  - specs/content/efmp-406/sources/texts/ashraf-2021-multilingual.md
  - specs/content/efmp-406/coverage/unit-03.md
  - specs/content/efmp-406/glossary/unit-03.json
  - specs/content/efmp-406/tasks.md
  - specs/content/efmp-406/reviews/unit-03/G2/20261103T182710608Z-gates.json
tests:
  - npm run check:content (14 of 14 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of specs/content/efmp-406/reviews/unit-03/G3/20261102T212207Z-g3-desk-41db593c.json
(English only; no Urdu mirror exists for Unit 3):
S1/S2: re-downloaded the Papen (2023) publisher PDF and retrieved the Ashraf et al. (2021) full text
from the SAGE HTML page. Both excerpt files had Unit 3 blocks formatted as quotations that are not in
either article. These were replaced with verbatim passages, and each file now ends with a "What this
source does not support" section. The pak-constitution-1973 key (Article 25A) is bound for U3-03.
S3: Article 25-A is now quoted and kept separate from the textbook's interpretation. The four civic
dimensions are labelled a teaching framework, the Freire attribution was removed, and claims about
cognitive harm, dropout, automatic transfer, MTB-MLE and translanguaging are qualified as positions
to test. The "77 languages" figure and the policy-practice points are now quoted from Ashraf.
P3: the admission notice and water flyer are labelled fictional, the section 144 reference was
dropped, and a rule-checking step was added.
A1: MCQ 10 became an Apply scenario, both topics' retrieval item 4 moved to Apply, ERQ 3 "millions"
was removed, ERQ 4 now allows evidence-based alternatives, and observable performance anchors were
added to every ERQ rubric and both mini-rubrics.
R1: dense prose was simplified and specs/content/efmp-406/glossary/unit-03.json (14 bilingual terms)
was added.
Also refreshed Unit 3 G2 evidence, appended its G2 tracker row, and appended a G3 "advisory: revise;
repairs applied" row with G3 left unticked.

## Outcome

- ✅ Impact: all blocking G3 findings addressed in source; G3 stays open for a fresh independent review.
- 🧪 Tests: npm run check:content passes (14/14).
- 📁 Files: 4 unit MDX files, sources list, two excerpt files, coverage, new glossary, tracker, new G2 evidence.
- 🔁 Next prompts: fresh independent G3 review of EFMP-406 Unit 3 with a complete frozen bundle; G4 translation after G3.
- 🧠 Reflection: bound "excerpts" can be fabricated paraphrase in quotation marks; re-fetch the primary text before trusting any excerpt file.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 EN repaired against report 41db593c; Papen and Ashraf excerpts are now verbatim; Constitution bound for U3-03; glossary/unit-03.json added; G2 evidence refreshed.
- Decisions the team must respect: Ashraf et al. (2021) is a 29-person qualitative interview study. Cite it only for language roles, the policy-practice conflict and teacher language use, never for reading outcomes, dropout or MTB-MLE effects. The "three layers" label is the textbook's own. The event/practice and dominant/vernacular distinctions have no bound source; they are presented as working terms.
- Pending / next owner: fresh G3 reviewer (independent session) needs a complete frozen bundle including sources/texts; author conversation ID and reviewer model revision (P1) and 360px/A4 rendered evidence (P2) need a host that may build; optionally bind a Barton and Hamilton source for the event/practice terms.
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the first check:content run flagged the stale Unit 3 G2 manifest (expected) and then a stale static/content-status.json, which regenerates and is not tracked.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): crew repair_en brief.
- Next experiment (smallest change to try): a gate that checks quoted passages in sources/texts against a stored retrieval digest.
