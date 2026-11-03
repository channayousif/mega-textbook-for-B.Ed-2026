---
id: crew-geng-300-u02-repair_en-r1
title: crew repair_en-r1 GENG-300 unit 2 (G3 desk report 5d4f13a0)
stage: misc
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: geng-300
branch: crew/geng-300-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-02/topic-01.mdx
 - docs/semester-1/geng-300/unit-02/topic-02.mdx
 - docs/semester-1/geng-300/unit-02/topic-03.mdx
 - docs/semester-1/geng-300/unit-02/unit-assessment.mdx
 - static/img/figures/geng-300/unit-02/fig-U2-4.svg
 - static/img/figures/geng-300/unit-02/fig-U2-4.dark.svg
 - specs/content/geng-300/figures/unit-02.md
 - specs/content/geng-300/coverage/unit-02.md
 - specs/content/geng-300/concepts/unit-02.md
 - specs/content/geng-300/tasks.md
 - specs/content/geng-300/reviews/unit-02/G2/20261103T043450445Z-gates.json
 - history/prompts/geng-300/crew-geng-300-u02-repair_en-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(The brief, `.crew/brief.md`, asks to apply the findings of the latest G3 report under
specs/content/geng-300/reviews/unit-02/G3/ (`20261102T211054Z-g3-desk-5d4f13a0.json`, disposition
revise) with the smallest edits, append a Unit 2 G3 tracker row beginning "advisory: revise;
repairs applied" that names the report, leave G3 unticked, follow the revise-topic skill, pass
`npm run check:content` and commit without pushing.)

## Response snapshot

Resolved A1 (MCQ 8 and 10 and RRQ 5 now assess Topic 2.3 four-move skills; key distribution kept
a2 b3 c2 d3), A2 (ERQ 3 now supplies a constructed school notice as a common stimulus with
explicit parts and an aligned rubric), P1 (Topic 2.2 summary, check item 1 and RRQ 3 name the four
main strategies with predicting/questioning/summarising as supports; Topic 2.3 gains a worked
four-move example and a focused-listening activity), C1 (coverage U2-07 points at "Analysing a
complete text"; RRQ 1 now assesses stereotypes and the concept map is realigned), and S1
(constructed passages in Topic 2.1, Topic 2.3 and ERQ 3 labelled; fig-U2-4 alt/desc/manifest no
longer claim sourced Pakistani media examples). E1, E2 and U1 need a render host or the owner.
No Urdu mirror exists (English-only course), so nothing was mirrored.

## Outcome

- ✅ Impact: Unit 2 blocking G3 findings A1 and A2 repaired; advisory row appended, G3 open.
- 🧪 Tests: npm run check:content 13/13 after G2 evidence refresh and content-status rebuild.
- 📁 Files: Unit 2 topics 1-3, assessment, fig-U2-4 SVG pair, figures/coverage/concepts/tasks, G2 evidence.
- 🔁 Next prompts: fresh independent G3 of Unit 2 (needs owner authorisation; cycle limit used).
- 🧠 Reflection: fixing a governance locator sometimes needs an item change, not just a map edit.

## Handoff (for CEO and agents)

- Shipped / changed: Topic 2.3 assessment items, ERQ 3 stimulus and rubric, worked four-move example, listening activity, provenance labels, governance locators.
- Decisions the team must respect: RRQ 1 now tests stereotypes (purpose/audience stays covered by MCQ 1 and ERQ 2); fig-U2-4 patterns are labelled constructed.
- Pending / next owner: owner on E1 (render/figure measurement needs a browser host), E2 (provenance), U1 (D-2026-0019 three vs four units); content-spec figure plan still says "examples from Pakistani media" (approved spec, not edited); fresh G3 run needs owner authorisation.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: G2 manifest stale after content edit (expected; refreshed).
- Graders run and results (PASS/FAIL): check:content PASS 13/13.
- Prompt variant (if applicable): crew repair_en brief
- Next experiment (smallest change to try): none
