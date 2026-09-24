---
id: "0037"
title: "Plan GNAS-301 authoring workflow"
stage: plan
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 019-author-gnas-301
branch: 019-author-gnas-301
user: M Yousif Channa
command: "orchestrator task assignment (sp.plan flow)"
labels: [plan, gnas-301, constitution-check, gated-workflow]
links:
  spec: specs/019-author-gnas-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/019-author-gnas-301/plan.md
tests:
  - none
---

## Prompt

Orchestrator assignment (condensed; verbatim original in PHR-0035): follow .claude/commands/sp.plan.md to produce specs/019-author-gnas-301/plan.md with the Constitution Check section, modeled on specs/018-author-geng300/plan.md.

## Response snapshot

Authored plan.md: context (guide lines 143-387, catalog 3 (2-1) credits, bilingual), implementation approach (degree track, full bilingual scope, derived six-unit partition labelled per D-2026-0012: pre-mid Weeks 1-6 -> Units 1-3, post-mid Weeks 8-15+16.1 -> Units 4-6), 22 tasks across 5 phases (content-spec, intake evaluation, tracker, per-unit authoring with figures and gates, G3 advisory per unit, G4+G5 per unit, final gates + PR), a Constitution Check table mapping Constitution v5.0.0 articles II-X to compliance measures, key authoring rules, and verification list.

## Outcome

- ✅ Impact: feature 019 plan created with Constitution Check gate passing; ready for /sp.tasks.
- 🧪 Tests: none (planning stage).
- 📁 Files: specs/019-author-gnas-301/plan.md.
- 🔁 Next prompts: /sp.tasks for feature 019.
- 🧠 Reflection: the guide's week table exists (Week 1-16), so only the week-to-unit merge is derived; stating the merge basis explicitly (contiguous whole weeks, mid-term as the pre/post boundary) is what makes the partition evaluator-checkable.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not applicable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
