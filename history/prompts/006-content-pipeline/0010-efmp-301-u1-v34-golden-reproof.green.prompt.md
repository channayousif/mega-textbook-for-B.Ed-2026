---
id: 0010
title: EFMP-301 Unit 1 v3.4 golden re-proof
stage: green
date: 2026-09-11
surface: agent
model: claude-opus-5
feature: 006-content-pipeline
branch: content-efmp-301-u1-v34
user: channayousif@gmail.com
command: author-unit
labels: ["content", "golden-unit", "art-vi-1", "efmp-301", "per-topic"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-301/content-spec.md
 - docs/semester-1/efmp-301/unit-01/
 - specs/content/efmp-301/coverage/unit-01.md
 - specs/content/efmp-301/sources/unit-01.md
 - specs/content/efmp-301/figures/unit-01.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01/
tests:
 - validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync
 - npm test (198/198), npm run build (en + ur)
---

## Prompt

now do EFMP-301 unit 1

## Response snapshot

The golden unit, re-proved at style-guide **v3.4** (Constitution Art. VI.1). Two freezes were
outstanding at once - v3.3 (Spec 012 visual density) and v3.4 (Spec 013 figure colour, branding,
descriptions) - so the unit skipped straight to v3.4 and one pass discharged both.

**G1 had to come first.** The `author-unit` skill hard-stops unless the content-spec carries a
sub-topic checklist, topic list, depth budget, figure plan and assessment blueprint. EFMP-301 had
none of them; the content-spec said so itself ("not started here - Spec 008 only queues it").
Those blocks were derived from the course guide's Chapter 1 (Weeks 1-2), every sub-topic ID traced
to a guide bullet. The compound bullet "Nature, scope, and importance" was decomposed into its own
named constituents, and "scientific study" taken from the guide's Course Description rather than
invented (Art. II.3).

The owner chose a **four-topic** split over the proposed three, which meant decomposing "role in
teaching and learning" into the learner side and the teaching side rather than leaving topic 1.3 a
one-sub-topic stub. 14 sub-topics, 4 topics, 9 figure markers.

The unit went from **608 words to ~9,900**, matching the working exemplar's density (~92 words per
declared reading-minute, measured from EFMP-302 Unit 1 rather than taken from the skill's stated
180-200 wpm, which does not match accepted practice - see Reflection).

Sources were fetched and verified, not recalled: Seifert & Sutton (2009) open textbook, Vosniadou
(2001) UNESCO IBE, Khizar et al. (2019) in Bulletin of Education and Research. One genuine gap was
escalated rather than papered over (G-2026-06): no verifiable open-access introductory treatment of
what school practice gives back to psychology.

## Outcome

- Impact: the golden unit meets the current standard for the first time since v3.0.
- Tests: six content gates PASS; 198/198 unit tests; build green in both locales.
  `check:pipeline-gate` is RED for this unit **by design** while G2/G3 sit at the in-progress mark.
- Files: 7 EN content files, 6 UR skeleton stubs, 3 governance artefacts, G1 content-spec blocks.
- Next prompts: the curriculum owner's Content-gate pass; then `generate-figures` for the 9
  markers; then G4/G5 Urdu translation.
- Reflection: two gates caught real mistakes I would otherwise have shipped - the answer-key gate
  flagged the phrase "answer key" twice in teacher notes, and the depth gate refused the
  half-migrated state until the topic files existed. Also worth recording: `author-unit` says to
  compute reading-minutes at ~180-200 wpm, but the accepted golden standard declares ~92.
  Following the skill literally would have put the unit far outside its own depth budget.

## Evaluation notes (flywheel)

- Failure modes observed: a skill's stated reading-rate contradicting the exemplar it points to;
  forbidden vocabulary ("answer key") slipping into prose that is legitimately about assessment.
- Graders run and results (PASS/FAIL): six content gates PASS; pipeline-gate RED by design; unit
  tests 198/198 PASS; build PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): reconcile the skill's wpm figure with the measured
  density of the accepted exemplar, so the next author is not pulled two ways.
