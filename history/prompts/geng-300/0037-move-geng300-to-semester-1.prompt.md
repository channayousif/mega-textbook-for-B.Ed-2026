---
id: 0037
title: "Move GENG-300 from licence track to B.Ed Semester 1"
stage: green
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: geng-300
branch: main
user: a2ahs
command: move-track
labels: ["relocation", "geng-300", "track", "semester-1", "content"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/geng-300/_category_.json (new)
  - docs/semester-1/geng-300/unit-{01..04}/_category_.json (new)
  - docs/semester-1/geng-300/ (git mv from licence/geng-300/)
  - licence/index.mdx (GENG-300 row removed)
  - licence/geng-300/ (removed)
  - specs/content/geng-300/content-spec.md (placement rewritten)
  - specs/content/geng-300/tasks.md (tracker rows updated)
  - specs/content/geng-300/reviews/unit-{01..04}/G2/ (evidence regenerated)
  - specs/018-author-geng300/{spec,plan,tasks}.md (path refs updated)
tests:
  - npm run check:content (11/11 gates pass)
  - check:pipeline-gate (PASS - no duplicate course code across tracks)
---

## Prompt

Move functional english course from license track to B.Ed Mega textbook

## Response snapshot

Relocated GENG-300 Functional English (a Semester 1 B.Ed scheme course, confirmed via 1st 2026 scheme + catalog semesters[0]) from the licence/ content track to the pre-service textbook at docs/semester-1/geng-300/. Moved 21 content files via git mv, added course + per-unit _category_.json (sidebar position 1 per catalog order), rewrote content-spec.md placement (licence -> pre-service track, docs/semester-1/ paths), removed GENG-300 from licence/index.mdx (EED-313 now sole licence course), updated path refs in specs/018-author-geng300/{spec,plan,tasks}.md, regenerated G2 gate evidence for all 4 units, rebuilt content-index. Discovered and fixed a pipeline-gate blocker: an untracked empty licence/geng-300/ directory left by git mv was being picked up by walkCourses as a duplicate course in both tracks (rmdir resolved it). All 11 content gates pass.

## Outcome

- ✅ Impact: GENG-300 now lives in the correct track (pre-service, semester 1) matching its scheme placement; renders at /semester-1/geng-300/ instead of /licence/geng-300/
- 🧪 Tests: 11/11 content gates pass; pipeline-gate confirms course code is globally unique (pre-service only)
- 📁 Files: 21 content files moved, 5 _category_.json added, 5 docs/spec files updated, G2 evidence regenerated for 4 units
- 🔁 Next prompts: none; course is correctly placed and fully gated
- 🧠 Reflection: git mv leaves empty untracked directories that content-roots walkers still count as courses — always rmdir after a track move to avoid a phantom duplicate-code pipeline failure

## Evaluation notes (flywheel)

- Failure modes observed: empty untracked licence/geng-300/ dir caused "course code appears in more than one track (licence, pre-service)" pipeline failure; fixed with rmdir
- Graders run and results (PASS/FAIL): check:content 11/11 PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
