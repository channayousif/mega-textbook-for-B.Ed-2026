---
id: "0042"
title: "GNAS-301 G5 round 1 complete with repairs"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 019-author-gnas-301
branch: 019-author-gnas-301
user: M Yousif Channa
command: "orchestrator task assignment (Phase 5: G5 Urdu reviews; Phase 6: merge, check:all, push, PR)"
labels: [gnas-301, g5, urdu, repairs, rtl, two-cycle]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/
  - specs/content/gnas-301/reviews/unit-01/G5/
  - specs/content/gnas-301/reviews/unit-02/G5/
  - specs/content/gnas-301/reviews/unit-03/G5/
  - specs/content/gnas-301/reviews/unit-04/G5/
  - specs/content/gnas-301/reviews/unit-05/G5/
  - specs/content/gnas-301/reviews/unit-06/G5/
  - src/css/custom.css
  - glossary.json
  - specs/gaps.md
  - specs/content/gnas-301/tasks.md
tests:
  - npm run check:content (11/11 PASS at each repair commit)
  - npm run figures:variants:check (268 figures OK)
  - node scripts/measure-figure-text.mjs (all touched variants pass)
---

## Prompt

Orchestrator assignment (condensed; verbatim original in PHR-0035): run G5 Urdu reviews for all six units (max 2 concurrent reviewers), apply repairs for content findings, record escalations, then fetch origin/main, npm run check:all, push -u origin HEAD and open the PR.

## Response snapshot

Six G5 round-1 reviews ran as fresh g5-reviewer agents against manifests bound at the repaired commits. Dispositions: Unit 1 escalate (5 blocking, 11 advisory), Unit 2 escalate (6+12), Unit 3 revise (1+11), Unit 4 escalate (6+8), Unit 5 escalate (7+12), Unit 6 escalate (7+9). Every Urdu-side content finding was repaired post-report across five repair commits: the render-blocking MDX errors (PrintOut import, unit-06 </Gloss>); the summative/formative inversion (36 occurrences, bank-aligned to مجموعی); the systematic register and bank-term alignment (worked example, term, صحتی, rubric, teaching strategies, group work, self-assessment, Evaluate tag, Indus naming, arsenic spelling, trainee teacher); the semantic inversions (90/70 dB comparison, near-miss modal, clear/clean hook, toothless negation, activity referents, per-person, million-fold, WHO modal hedge); the figure-label regeneration in Units 4-6 (all .ur.svg variants relabelled against the prose, garbled words fixed, the fig-U5-1 invalid y attributes and the fig-U5-4 duplication repaired); and the concept-graph label alignment for Units 4-6. English-side repairs the reviews surfaced: the Unit 3 Anwar author list and tank-likelihood reconciliation, the Unit 5 and 6 MCQ key de-skews (6 and 8 of 10 were option b), the SDG half->seven precision, the Karachi heat-plan claim softened to the bound sources, five missing glossary terms appended, and the fig-U6-3 manifest row count. Platform: the production RTL alignment defect in src/css/custom.css fixed (physical text-align:right was flipped to left by Docusaurus's RTL pass, inverting Urdu alignment live at textbook.com.pk; now logical text-align:start).

The recurring dependency finding (no accepted G3 evidence for the current English bytes, because post-report repairs are the ADR-0019 two-cycle pattern recorded as G-2026-24 and G-2026-31..33) is recorded as G-2026-34 for the owner: accept the repaired English states or authorise fresh G3 rounds, then fresh G5 rounds re-run with working renders. G2 evidence was regenerated for every unit whose bound inputs changed, committed together with the tracker rows. Gap codes were renumbered into the assigned G-2026-31..40 block per the coordinator's correction (G-2026-25..28 collided with siblings' allocations).

## Outcome

- ✅ Impact: all six units carry a G5 round-1 report with every Urdu-side content finding repaired; the course is gate-green with the owner questions precisely recorded.
- 🧪 Tests: check:content 11/11 and figures:variants:check 268 OK at every repair commit; measure-figure-text passes for every touched variant.
- 📁 Files: 6 G5 report/log/render trees; ~60 Urdu files repaired; 4 English content files; 3 concept graphs; ~50 SVG variants; src/css/custom.css; glossary.json (+5); specs/gaps.md (+G-2026-34, renumbered 31-33); tracker (G5 rows, refreshed G2 rows).
- 🔁 Next prompts: merge origin/main, npm run check:all, push and open the PR; the owner's G-2026-24/31..34 decisions gate G3/G5 acceptance, not publication of the gate-checked tier (D-2026-0014).
