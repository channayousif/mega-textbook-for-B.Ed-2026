---
id: 0073
title: Licence topic-list platform and heading agents
stage: plan
date: 2026-09-26
surface: agent
model: claude-opus-5-5
feature: 024-licence-topic-design
branch: 024-licence-topic-design
user: M Yousif Channa
command: none
labels: ["licence-track", "semester-1", "cross-linking", "agents"]
links:
  spec: specs/024-licence-topic-design/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/69
files:
 - scripts/lib/content-roots.mjs
 - scripts/check-licence.mjs
 - scripts/lib/licence.mjs
 - scripts/build-licence-map.mjs
 - contracts/licence-page.schema.json
 - catalog/licence-objectives.json
 - catalog/licence-redirects.json
 - src/components/LicenceObjectives.tsx
 - src/components/LicenceRelevance.tsx
 - src/theme/DocItem/Footer.tsx
 - licence/index.mdx
 - licence/pedagogy/*/index.mdx
 - specs/024-licence-topic-design/*
 - SDD/ROADMAP.md
 - specs/gaps.md
tests:
 - tests/unit/content-roots.test.mjs
 - tests/unit/licence.test.mjs
---

## Prompt

check if the semester 1 is complete, move to complete the licence track. launch agent for each course. some of the courses/SLos are part of both so cross linking is the better strategy instead of repeating or duplicating

## Response snapshot

Audited Semester 1 on origin/main: 41/41 units authored and live (EN+UR, figures placed) but only 2/41 G3/G5/G7-certified, 17 owner gaps open. Owner decisions: treat Sem 1 as content-complete; restructure the licence track from course/unit/topic/assessment into a code-free list of the five STEDA Part II headings with one page per syllabus objective (57, verbatim from the SIBA 2024 syllabus); covered objectives get a summary plus degree links, residue authored; per-subtopic CRQs plus a per-heading practice page; migrate EED-313 into heading C. Built the Phase 0 platform (walker shape, check:licence gate, schema/contract, reverse-link map rendered on degree pages without editing them, redirects plugin, scaffold EN+UR), refreshed G2 evidence for 39 units whose manifests bind the changed shared inputs, opened PR #69, and launched wave 1 heading agents (C, D, A) in isolated worktrees.

## Outcome

- ✅ Impact: licence track platform ready; wave 1 authoring under way
- 🧪 Tests: vitest 298 pass, test:review 38 pass, check:content 13/13, en+ur build pass
- 📁 Files: see list above plus 39 G2 evidence records
- 🔁 Next prompts: wave 2 (headings B, E); drop --allow-missing; blueprint coverage refresh
- 🧠 Reflection: shared-input edits invalidate every G2 manifest; budget an evidence refresh into any platform change

## Evaluation notes (flywheel)

- Failure modes observed: first agent prompt omitted the shared brief (corrected by message)
- Graders run and results (PASS/FAIL): check:content PASS; pipeline gate PASS after G2 refresh
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): keep agent briefs in a file referenced by path from the start
