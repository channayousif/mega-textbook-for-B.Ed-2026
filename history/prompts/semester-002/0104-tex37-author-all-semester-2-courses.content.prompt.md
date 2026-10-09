---
id: 0104
title: "TEX-37: Author complete Semester 2 courses (7 courses, ~42 units)"
stage: planning
date: 2026-10-09
surface: agent:claude_paperclip
feature: content-semester-2
branch: agent/tex-37
user: M Yousif Channa
command: issue_assigned (TEX-37 wake)
labels: ["ceo", "content", "semester-2", "plan", "delegation"]
links:
  spec: docs/semester-2/PLAN.md
  ticket: TEX-37
  adr: null
  pr: null
files:
  - docs/semester-2/PLAN.md
tests:
  - Plan covers all 7 courses from catalog
  - Unit partitioning derived from guide week/chapter structure
  - EFMP-304 existing work (3 units) accounted for
---

## Prompt

Author the semester 2 courses with all requirements and QC checks including
generating SVG and raster images for each unit. Include the course guide/syllabus
on course intro page.

## Response snapshot

Assessed the full scope from catalog/courses.json, the extracted course guide
(2nd 2026.txt), and existing docs/specs. Found:

- **7 courses** in Semester 2: GQUR-301, GSOS-301, GENG-301, EFMP-303, EFMP-304,
  EFMP-305, GPKS-402
- **EFMP-304** partially done: units 1-3 authored (no teacher notes, no figures, no Urdu)
- **No content specs** exist for 6 of 7 courses (only EFMP-304 has one)
- **~42 units**, ~250+ topics, ~42 assessments needed

Created plan at docs/semester-2/PLAN.md with per-course unit partitioning derived
from the guide's week/chapter structure. Posted plan comment and request_confirmation
interaction to TEX-37. Set issue to in_review pending board confirmation.

Unit partitions:
- GQUR-301: 16 chapters → 6 units (data org → hypothesis testing)
- GSOS-301: 15 weeks → 6 units (intro → contemporary issues)
- GENG-301: 6 sections → 6 units (1:1 mapping)
- EFMP-303: 16 weeks → 6 units (intro → future directions)
- EFMP-304: 6 units (3 remaining: U4-U6)
- EFMP-305: 6 units (1:1 with guide units)
- GPKS-402: 16 weeks → 6 units (intro → education role)

## Outcome

- Plan committed and pushed to agent/tex-7 branch
- Issue set to in_review with pending confirmation card
- Waiting for board authorization to create 7 child issues and begin parallel authoring

## Handoff (for CEO and agents)

Board confirmation requested via interaction 251daffb on TEX-37. On acceptance:
create 7 child issues (one per course), delegate authoring with author-unit skill,
run QC gates per course, generate figures, build Urdu mirrors. EFMP-304 child
should complete remaining units 4-6 only (units 1-3 already done).
