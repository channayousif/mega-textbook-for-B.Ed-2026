---
id: 20261219
title: EFPG-401 Unit 5 G3 repair
stage: misc
date: 2026-11-19
surface: agent
model: claude-opus-5-5
feature: efpg-401
branch: crew/efpg-401-u05-repair_en
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely.
labels: [claude, crew, efpg-401, unit-05, g3-repair]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efpg-401/unit-05/topic-01.mdx
  - docs/semester-3/efpg-401/unit-05/topic-02.mdx
  - docs/semester-3/efpg-401/unit-05/topic-03.mdx
  - docs/semester-3/efpg-401/unit-05/topic-04.mdx
  - docs/semester-3/efpg-401/unit-05/topic-05.mdx
  - docs/semester-3/efpg-401/unit-05/topic-06.mdx
  - docs/semester-3/efpg-401/unit-05/topic-07.mdx
  - docs/semester-3/efpg-401/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/ (same eight files)
  - static/img/figures/efpg-401/unit-05/fig-U5-1, fig-U5-2, fig-U5-14 (EN, dark, UR, UR dark SVGs)
  - specs/content/efpg-401/figures/unit-05.md
  - specs/content/efpg-401/sources/unit-05.md
  - specs/content/efpg-401/reviews/unit-05/G2/20261118T223523116Z-gates.json (+ logs)
  - specs/content/efpg-401/tasks.md
tests:
  - scripts/heavy.sh node scripts/measure-figure-text.mjs (12 edited SVGs, exit 0)
  - node scripts/prepare-gate-evidence.mjs EFPG-401 5 (8/8 PASS)
  - npm run check:content (exit 0)
  - scripts/heavy.sh npm test (485/485)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied every finding of the advisory G3 report
`specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json` with minimal
edits, mirrored each into the Urdu files, regenerated G2 evidence, repointed the G2 row and
appended an unticked advisory G3 row beginning "advisory: revise; repairs applied".

## Outcome

- Impact: Topic 5.2 activity now has a determinate answer (the quoted plan omits the practice
  step). Celce-Murcia and Sheikh no longer carry specific in-text claims; the guidance is stated
  as the unit's own and the title-level limit is spelled out in `sources/unit-05.md`, so Topic 5.7
  no longer conflicts with the U5-10 coverage mapping. Paulsrud and Gheitasi claims (topic-01,
  topic-03) are narrowed to what the bound notes support. Topic 5.6 misconception now points at
  the taught share step instead of drafting/feedback. fig-U5-1 and fig-U5-14 alt text and SVG
  desc match the figures; fig-U5-2 "180 units" replaced by "most at the start/end". MCQ key is
  now B D C A C A D C B D (A2 B2 C3 D3). RRQ 7 uses "literal question".
- Tests: all listed above pass.
- Next prompts: fresh independent G3 review once production includes these bytes.
- Reflection: `prepare-gate-evidence.mjs` needs the uppercase course code (EFPG-401) and does not
  edit the tracker itself; it only prints the row to paste.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 5 EN and UR repairs listed above, new G2 evidence
  `20261118T223523116Z-gates.json`, tracker G2 row repointed and one advisory G3 row appended.
- Decisions the team must respect: G3 stays unticked; no signing. Print monographs are cited only
  under Further reading, never for a specific claim, until bound text exists.
- Pending, owner: fresh independent G3 review (crew); render evidence after deploy. fig-U5-1,
  fig-U5-2 and fig-U5-14 keep their file names, so the 30-day static cache can serve the old
  versions for a while. The backend quiz bank, if seeded from this assessment, has the old option order.
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: lowercase course code rejected by prepare-gate-evidence (known, C4 in
  the 2026-11-19 intelligence digest).
- Next experiment: none.
