---
id: "0542"
title: "Follow guide and link course guides"
stage: general
date: 2026-10-20
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/gqur-301-follow-guide
user: M Yousif Channa
command: none
labels: ["board-direct", "gqur-301", "course-guide", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/decisions/log.md
 - catalog/course-guides.json
 - scripts/split-course-guides.py
 - static/guides/semester-1/*.pdf (6)
 - static/guides/semester-2/*.pdf (7)
 - src/components/CourseGuideNotice.tsx
 - src/theme/DocItem/Content.tsx
tests:
 - npm run check:content (13/13 pass)
 - npm run build (EN + UR; notice on 23 overview pages, PDFs served at /guides/...)
---

## Prompt

the course https://textbook.com.pk/semester-2/gqur-301/ does not cover course guide, units and topics are mixed

(Follow-up answers: "follow the guide whenever possible, also include guide on intro page for each
course"; intro-page form: "Link to guide PDF"; "Yes, proceed" with GQUR-301 as 16 units, Units 1-2
split into 1-5, and the crew fix.)

## Response snapshot

Confirmed both complaints. Coverage: the guide has 16 chapters (one per week); the site groups them
into 6 units and only Units 1-2 (Chapters 1-5) exist, so Chapters 6-16 are missing; the crew never
plans them because `crew.mjs plan()` iterates only units on disk. Mixing: Unit 1 numbers topics
1.1-1.4 while Unit 2 uses guide chapter numbers (Topic 3.1, 3.2, 4.1, 5.1), and topics merge guide
sections. Also found every unit link on the GQUR-301 overview is broken (`./unit-0N/` resolves under
`/course-overview/`).

This first PR records the owner ruling D-2026-0070 and adds the guide link to every course intro page:
per-course PDFs cut from the two semester guide PDFs (`scripts/split-course-guides.py`, pypdf via uv,
map in `catalog/course-guides.json`) and an info box rendered by the DocItem wrapper. It is rendered
rather than written into `course-overview.mdx` because the overview, `validate-content.mjs` and
`catalog/courses.json` are bound inputs of every unit's G2/G3 evidence: the first attempt edited the
13 overviews and staled all 66 units awaiting G3 sign-off, so it was reverted.

## Outcome

- ✅ Impact: every course intro page (EN and UR) links its official course guide PDF.
- 🧪 Tests: check:content 13/13; full build passes; notice present on 23 overview pages.
- 📁 Files: decision log, guide map, split script, 13 PDFs, notice component, DocItem wrapper.
- 🔁 Next prompts: PR 2 (GQUR-301 spec to 16 units, restructure Units 1-2 into 1-5, fix overview
  links); PR 3 (crew planner authors spec'd units missing on disk).
- 🧠 Reflection: course-overview.mdx and the gate scripts are bound review inputs; render
  site-wide notices from the theme, as ReviewStatusBanner already does.

## Handoff (for CEO and agents)

- Shipped / changed: course guide PDFs under `static/guides/`; `CourseGuideNotice` on intro pages.
- Decisions the team must respect: D-2026-0070. Units follow the guide's own units or chapters
  wherever the guide names them; GQUR-301 is 16 units (supersedes D-2026-0053 item 1 for it only).
  Never edit `course-overview.mdx` just to add site-wide notices.
- Pending / next owner: PR 2 and PR 3 (board-direct session); Semester 3-8 guides are .docx, so
  add map rows and PDFs when those courses get intro pages.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: editing 13 overviews staled 66 G2 manifests; worktree reused crew
  node_modules that lacked a new dependency.
- Graders run and results (PASS/FAIL): check:content PASS; build PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): a gate that flags a guide map row whose PDF is missing.
