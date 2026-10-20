---
id: "0543"
title: "GQUR-301 sixteen units and crew fix"
stage: general
date: 2026-10-20
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/gqur-301-sixteen-units
user: M Yousif Channa
command: none
labels: ["board-direct", "gqur-301", "restructure", "crew", "figures"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/content-spec.md (16 unit blocks, guide-determined)
 - specs/content/gqur-301/tasks.md (16 units; G2 evidence for Units 1-5)
 - specs/content/gqur-301/{coverage,sources,figures,concepts}/unit-01..05.md
 - specs/content/gqur-301/reviews/superseded-six-unit/ (archived old G3 reports and blockers)
 - specs/content/gqur-301/reviews/unit-01..05/G2/ (new gate evidence)
 - docs/semester-2/gqur-301/course-overview.mdx (16-chapter syllabus, working links)
 - docs/semester-2/gqur-301/unit-01..05/ (index, topics, assessment, teacher notes)
 - static/img/figures/gqur-301/unit-01..05/ (11 repaired, 4 redrawn, 7 new; dark variants)
 - scripts/crew/crew.mjs, scripts/crew/planner.mjs, tests/crew/planner.test.mjs
tests:
 - npm run check:content (13/13 pass)
 - npm run build (EN + UR, no broken links)
 - npm run test:crew (47 pass)
 - node scripts/crew/crew.mjs plan --dry-run (23 jobs incl. GQUR-301 U6-16 and GSOS-301 U3-6 author)
---

## Prompt

the course https://textbook.com.pk/semester-2/gqur-301/ does not cover course guide, units and topics are mixed

(Follow-up: "follow the guide whenever possible, also include guide on intro page for each course";
"Yes, proceed" with GQUR-301 as 16 units, Units 1-2 split into 1-5, and the crew fix.)

## Response snapshot

Second PR of three, combined with the third because the planner fix must not reach main before
the 16-unit spec. The GQUR-301 content-spec is rewritten so each of the guide's 16 chapters is a
unit and each topic is a guide section. Units 1-2 were split into Units 1-5: Chapters 1-3 moved
whole; Topic 4.1 Mean, 4.2 Median, 5.1 Mode, 5.2 Comparison and 5.3 Applications were rewritten
from the two combined topics; five new indexes, five 10/10/5 assessments, five teacher-notes
pages and the four governance tables per unit were written.

Found and fixed while doing it: every reused figure except three rendered as black blocks on the
live site (undefined CSS classes behind `<img>`); fig-U4-3 plotted marks at wrong values; LaTeX
showed as raw source (no math plugin); all six overview links were broken; plus the open G3 and
translator blockers (frequency counts, RRQ 5, MCQ 10, RRQ 10, the symmetry rule, missing modes in
two tasks). The crew planner only walked units on disk, so it never authored specified units; it
now does, which also unblocks GSOS-301 Units 3-6.

## Outcome

- ✅ Impact: GQUR-301 follows its guide chapter by chapter; Units 1-5 live and corrected; the crew
  will author GQUR-301 Units 6-16 and GSOS-301 Units 3-6 after merge.
- 🧪 Tests: content gates 13/13, build clean, crew tests 47/47, planner dry run as expected.
- 📁 Files: see front matter.
- 🔁 Next prompts: independent G3 for GQUR-301 Units 1-5; intake re-evaluation of the rewritten
  spec; G5 review of the authored Urdu concept labels.
- 🧠 Reflection: render every reused SVG before trusting it; the gates passed while 11 figures
  were black on the live site.

## Handoff (for CEO and agents)

- Shipped / changed: GQUR-301 restructured to the guide's 16 chapters (Units 1-5 authored); crew
  planner authors spec'd-but-missing units.
- Decisions the team must respect: D-2026-0070 (one unit per guide chapter where the guide names
  them; topic N.k = guide section N.k). Old six-unit G3 reports are archived, not reusable.
- Pending / next owner: crew picks up review_en for GQUR-301 U1-5 and author for U6-16 and
  GSOS-301 U3-6 once merged; a person's G3 sign-off remains required (ADR-0019). The Da Vinci crew
  copy does not need this planner change (no content-specs there).
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: figures passing every gate while rendering black; LaTeX in MDX without a
  math plugin; a wrapped line starting "58." parsed as a list item.
- Graders run and results (PASS/FAIL): check:content PASS; build PASS; test:crew PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): a check:figures rule that fails an SVG using a class its
  own stylesheet does not define.
