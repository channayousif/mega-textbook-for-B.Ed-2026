---
id: 0006
title: Add documentation-for-audiences article
stage: constitution
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: none
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.constitution
labels: [constitution, documentation, governance, readme, student-guide, teacher-guide]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md (modified)
tests:
  - "Placeholder scan: no unresolved bracket tokens remain"
  - "Article cross-reference scan: all 'Article X'/'Article XI' references consistent (intro, gate table, new/renumbered articles)"
  - "Template scan: plan/spec/tasks templates carry no hardcoded article numbers, confirmed via grep — no propagation edits needed"
---

## Prompt

update for mantaining Project docs for different readers, mainly the main project docs as github readme, a student guide, teacher docs

## Response snapshot

Confirmed via repo scan that none of the three documentation surfaces exist yet (no `README.md`
at repo root, no student/teacher guide content anywhere). Added a new **Article X — Documentation
for Multiple Audiences** to the constitution, bumping 2.3.0 → 2.4.0 (MINOR: new article added, no
existing principle redefined/removed). The old Article X (Amendment Procedure & Versioning) was
renumbered to Article XI, with the intro's cross-reference updated to match.

Article X establishes:
1. Three distinct, purpose-built surfaces that must never merge into one generic doc: README
   (contributor-facing, technical), Student Guide (plain-English, bilingual, workflow-focused),
   Teacher Guide (pedagogical, non-technical, describes role capabilities not implementation).
2. A stay-in-sync obligation extending the existing spec-drift rule (Article IV.4): a workflow-
   changing spec must update its guide in the same feature branch.
3. A no-substitution rule: developers shouldn't need the guides; students/teachers shouldn't be
   pointed at README/specs.
4. Location/format: README at repo root; Student/Teacher Guides as bilingual Docusaurus pages
   reusing the existing content pipeline (Article V.1 content/app separation), reachable from
   in-app nav for the relevant role.

Also added a "Docs gate" row to Article VII's review-gate table, tying the sync obligation to a
concrete completion check. Verified plan/spec/tasks templates have no hardcoded article-number
references, so no downstream template edits were needed.

## Outcome

- ✅ Impact: constitution now requires and defines three audience-specific documentation
  surfaces going forward; ties their upkeep to the existing spec-drift and review-gate
  machinery rather than leaving it as an unenforced aspiration.
- 🧪 Tests: placeholder/bracket scan clean; Article X/XI cross-reference scan consistent across
  intro, gate table, and body; template grep confirmed no hardcoded article numbers elsewhere.
- 📁 Files: `.specify/memory/constitution.md` only (Sync Impact Report prepended, Article X
  inserted, old Article X renumbered to XI, Article VII gate table row added, version/date
  footer bumped to 2.4.0 / 2026-07-20).
- 🔁 Next prompts: none of the three surfaces exist yet — authoring `README.md` and deciding
  which spec owns Student/Teacher Guide content are flagged as follow-up TODOs in the Sync
  Impact Report, left for the owner to schedule (likely alongside Specs 004/005's dashboards).
- 🧠 Reflection: chose a new article over folding this into Article III (Content Quality) or VI
  (Scope Discipline) because it governs a distinct artifact class (project/usage docs, not
  curriculum content or feature scope) with its own reader-separation rule — bundling it
  elsewhere would have diluted both sections' focus.

## Evaluation notes (flywheel)

- Failure modes observed: none — repo scan for existing README/guides run before drafting,
  confirming this is genuinely new scope rather than a rename of something already present.
- Graders run and results (PASS/FAIL): placeholder scan — PASS; article cross-reference scan —
  PASS; template hardcoded-reference scan — PASS (no changes required).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none — constitution amendment complete; next step is
  implementation (README authoring) or spec assignment for the guides, both owner calls.
