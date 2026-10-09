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

- Plan committed and pushed to agent/tex-37 branch
- Board confirmed via interaction 251daffb (accepted)
- Created 7 child issues, all assigned to BilingualAuthor (bbc7d03f)
- All children block on TEX-37; TEX-37 is in_progress

### Child Issues Created

| ID | Course | Priority |
|---|---|---|
| 7bfd21c2 | TEX-37a: EFMP-304 Complete units 4-6 | high |
| 3966d873 | TEX-37: EFMP-305 Inclusive Education | high |
| f002912a | TEX-37: EFMP-303 Educational Policies | high |
| 11350afb | TEX-37: GQUR-301 Quantitative Reasoning | medium |
| 32bd26ad | TEX-37: GENG-301 Expository Writing | medium |
| fd2bbf04 | TEX-37: GSOS-301 Social Science | medium |
| 325ba7e1 | TEX-37: GPKS-402 Pakistan Studies | medium |

## Handoff (for CEO and agents)

7 child issues delegated to BilingualAuthor. Each child has full instructions in
its description. Children will be woken on BilingualAgent's next heartbeat. TEX-37
stays in_progress until `issue_children_completed` fires. Monitor for:
- Content specs needing G0/G1 intake (CurriculumOwner)
- QC gate failures needing escalation
- Figure generation needing Codex handoff (ADR-0024)
- Urdu mirror completion

On all children completing: run final `npm run check:all`, verify all courses
render on platform, merge child PRs, then mark TEX-37 done.
