---
id: 2446
title: EFMP-301 Unit 4 G3 desk-review repair (147d237b)
stage: general
date: 2026-11-03
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/efmp-301-u04-repair_en
user: M Yousif Channa
command: crew job efmp-301-u04-repair_en
labels: [claude, crew, efmp-301, g3-repair]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-301/unit-04/topic-01.mdx
  - docs/semester-1/efmp-301/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/unit-assessment.mdx
  - specs/content/efmp-301/coverage/unit-04.md
  - specs/content/efmp-301/sources/unit-04.md
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-04/G2/20261103T174846654Z-gates.json
tests:
  - npm run check:content (14 of 14 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the four findings of specs/content/efmp-301/reviews/unit-04/G3/20261102T213456Z-g3-desk-147d237b.json:
(1) Topic 4.1 capture-factor prose now matches fig-U4-2 (novelty, contrast, meaning, emotion pull the
beam; task demand and expectation shape where it settles; "movement" dropped), EN and UR;
(2) MCQ keyed positions rebalanced from b8/c2 to a3/b2/c2/d3 by swapping option text in Q1, Q3, Q5,
Q7, Q9, Q10, with answer keys updated, EN and UR;
(3) vosniadou2001 U4-4/U4-5 coverage rows removed and its sources-table row replaced by a
"Further reading only" note (depth gate requires every table key to have a coverage row);
(4) visual 360px/print inspection remains unperformed because the crew brief forbids build/browser.
Appended a G3 advisory repair row (G3 unticked), refreshed Unit 4 G2 evidence and its tracker row.

## Outcome

- ✅ Impact: all four G3 findings addressed in source; G3 stays open for a fresh review.
- 🧪 Tests: npm run check:content passes (14/14).
- 📁 Files: 4 unit files (EN+UR), coverage, sources, tracker, new G2 evidence.
- 🔁 Next prompts: fresh independent G3 review of EFMP-301 Unit 4; visual/print inspection on an authorised host.
- 🧠 Reflection: removing a source's coverage rows forces removal of its sources-table row too (depth gate).

## Handoff (for CEO and agents)

- Shipped / changed: Unit 4 capture-factor alignment, MCQ key rebalance, vosniadou2001 unbound, G2 evidence refreshed.
- Decisions the team must respect: MCQ keys are now 1a 2b 3d 4b 5d 6c 7a 8c 9a 10d in both locales; vosniadou2001 is Further Reading only for Unit 4.
- Pending / next owner: fresh G3 reviewer (independent session); visual 360px and A4 print check on a host that may build; G5 re-review must note the changed UR option order.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: first check:content run flagged stale G2 manifest and an orphan sources key; static/content-status.json is gitignored and regenerates.
- Graders run and results (PASS/FAIL): check:content PASS.
- Prompt variant (if applicable): crew repair_en brief.
- Next experiment (smallest change to try): none.
