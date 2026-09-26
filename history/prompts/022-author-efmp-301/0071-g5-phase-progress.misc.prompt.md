---
id: "0071"
title: "G5 phase: Units 2 and 12 repaired"
stage: misc
date: 2026-09-25
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "coordinator RESUME (G5 phase, post-outage)"
labels: [efmp-301, g5, urdu, repair, outage-recovery]
links:
  spec: null
  ticket: null
  adr: ADR-0019
  pr: null
files:
  - specs/content/efmp-301/reviews/unit-02/G5/ (run001 report + evidence; manifest re-bind after mid-review drift)
  - specs/content/efmp-301/reviews/unit-12/G5/ (run001 report + evidence)
  - i18n/ur/.../unit-02/ (50 G5 repairs: restored citations, meaning reversals, terminology, orthography)
  - i18n/ur/.../unit-12/ (G5 repairs: 2 blocking semantic reversals, corridors, جواز والا, spelling)
  - static/img/figures/efmp-301/unit-12/fig-U12-2/3/5/6.*.ur*.svg (label conformance)
  - specs/content/efmp-301/tasks.md (G5 advisory dispositions for Units 2 and 12)
tests:
  - "node scripts/run-gates.mjs content - all gates PASS after each repair round"
  - "node scripts/measure-figure-text.mjs (6 Unit 12 Urdu figure variants) - PASS"
  - "node scripts/check-pipeline-gate.mjs - PASS at aa3fa503"
---

## Prompt

Coordinator RESUME (twice): first the G5 phase launch, then recovery from the API auth
outage (~14:40) that killed the session mid-patch; the orchestrator committed the
in-flight work as 12dfb47f. Continue the remaining pipeline: G5 for Units 3-11, tracker,
check:all, push, PR.

## Response snapshot

G5 advisory reviews delivered for Units 2 and 12, both disposition REVISE, all blocking
findings repaired. Unit 2 (22 blocking): restored the three dropped cited passages in
topic-03 (Seifert & Sutton social-development definition, Erikson trust/mistrust,
peer-group sentence with school-age crises + Maslow), fixed the meaning reversals
(babble sequence, prodigies, subtraction, fit-the-page-to-the-fingers,
nothing-you-can-measure, readiness-never-worth, counter-example, two-levels-at-once,
bundles of sticks, cannot-follow-instructions, Government Girls school, underline,
crossover years), conformed terminology to the bank (روبرک -> معیارِ جانچ, صورت بہبود
-> تشکیلی, انفرادی فرق -> اختلافات), and repaired register/orthography (شاگرڈ x11,
Arabic yeh, gender agreements). Unit 12 (2 blocking): the activity-step negation
reversal and the fairness-duty valence reversal, plus corridors (گلیوں -> برآمدوں),
جواز والا unification, the RRQ-2 causal clause, the counselor-escalates phrase,
figure-label conformance (کاؤنسلر -> مشیر, سچی -> ایماندار رپورٹنگ, شہادت -> ثبوت,
گچھے -> جھرمٹ, fig-U12-6's نما fragment and dangling کے), and the same spelling family.
Both units' G2 evidence refreshed and advisory dispositions recorded with the G3
dependency and terminology rulings escalated to the owner. The outage killed the Unit 3
reviewer mid-run; its partial artifacts are preserved and a fresh run002 reviewer was
dispatched alongside Unit 4's run001.

## Outcome

- ✅ Impact: Units 2 and 12 Urdu now mirror their English with banked terminology;
  2 of 11 G5 rounds complete.
- 🧪 Tests: all content gates PASS at aa3fa503; both G5 reports validate.
- 📁 Files: 11 Urdu MDX files, 8 Urdu SVG variants, tracker.
- 🔁 Next prompts: G5 Units 3-11, final check:all, push, PR.
- 🧠 Reflection: the G4 translation's failure modes cluster into three families -
  dropped cited passages (Unit 2's topic-03), clause-level negation/valence reversals,
  and orthography (شاگرڈ, Arabic yeh, بازخرد). The G3-mirror Urdu I authored myself
  carried the same orthography slips, which confirms the fix belongs in a mechanical
  pre-flight scan rather than reviewer time.

## Evaluation notes (flywheel)

- Failure modes observed: translation drift on cited passages; بغیر binding to the
  wrong clause; false friends (جائز والا for "justified"); transliterations where the
  bank has a term.
- Graders run and results (PASS/FAIL): all gates PASS after each repair; reports
  validate.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add a pre-G5 Urdu lint (شاگرڈ/Arabic
  yeh/بازخرد/روبرک regex scan) to the authoring checklist so reviewers find only
  semantic issues.
