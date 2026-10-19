---
id: crew-efmp-302-u02-repair_en
title: Apply Unit 2 G3 r2 repairs
stage: misc
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: efmp-302
branch: crew/efmp-302-u02-repair_en
user: board
command: Read .crew/brief.md and carry it out
labels: ["board-direct", "crew", "repair_en", "EFMP-302", "unit-02", "G3"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-302/unit-02/topic-03.mdx
  - docs/semester-1/efmp-302/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/unit-assessment.mdx
  - specs/content/efmp-302/concepts/unit-02.md
  - specs/content/efmp-302/sources/unit-02.md
  - specs/content/efmp-302/tasks.md
  - specs/content/efmp-302/reviews/unit-02/G2/20261019T122240439Z-gates.json
  - specs/content/efmp-302/reviews/unit-02/G2/logs-20261019T122240439Z/
  - static/img/figures/efmp-302/unit-02/fig-U2-1.svg (+ .dark, .ur, .ur.dark)
tests:
  - "npm run check:content: 13/13 PASS"
  - "npm test: 26 files, 314 tests PASS"
  - "figures:variants --check: OK (816)"
  - "measure-figure-text on fig-U2-1 and fig-U2-5 (8 variants): all clean"
  - "getBBox pairwise text and wordmark-vs-shape check: EN fig-U2-1 and fig-U2-5 clean"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the findings of `agent-g3-efmp302-u2-feat023-r2.json`. B-01 (fig-U2-5 label
superposition) was already repaired at 8db9943; re-measured clean on both EN variants. Advisory
U2-12: ERQ 4 now requires a reflective-decision-making review of the decision (rubric row, Urdu
mirror and concept-graph mapping updated). Advisory bebeau1999: full text read from the
co-author-hosted copy on Narvaez's Notre Dame page; the sources register records what it
supports, and topic-03 (EN+UR) now says the authors deny a linear sequence. Advisory fig-U2-1:
table bottom raised 6px so the focus and grid rects no longer underlap the wordmark. G2 evidence
regenerated; tracker row appended; G3 left open.

## Outcome

- Impact: every finding in the r2 report is addressed except the social-media dilemma type, left formative-only because the guide lists it as an example.
- Tests: content gates, unit tests, figure variants and figure geometry all pass.
- Files: listed above.
- Next prompts: fresh independent G3 review of Unit 2 (third cycle is owner-gated per G-2026-63).
- Reflection: the bebeau1999 "unreadable" gap was a host-access problem; a co-author copy existed.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 EN+UR assessment (ERQ 4) and topic-03 edits, sources register update, fig-U2-1 geometry, fresh G2 evidence, new Unit 2 G3 tracker row.
- Decisions the team must respect: G3 and G5 stay open; no self-review. ERQ 4's wording changed in both locales, so G5 evidence for Unit 2 predates this repair.
- Pending / next owner: owner authorises the third G3 cycle; then fresh G3 and G5 reviewers. Urdu fig-U2-1/fig-U2-5 show bounding-box (not ink) overlaps from tall Nastaliq line boxes, unchanged by this job.
- Paperclip issues affected: none (crew job).

## Evaluation notes (flywheel)

- Failure modes observed: G2 manifest went stale after editing bound inputs, as expected; regenerated with `gates:evidence` after committing.
- Graders run and results (PASS/FAIL): check:content PASS, npm test PASS.
- Prompt variant (if applicable): crew/efmp-302-u02-repair_en
- Next experiment (smallest change to try): pixel ink-overlap check on the Urdu variants in the next review.
