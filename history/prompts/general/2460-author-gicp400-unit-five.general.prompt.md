---
id: 2460
title: Author GICP400 Unit Five
stage: general
date: 2026-11-06
surface: agent
model: claude-opus-5-5
feature: gicp-400-unit-05
branch: crew/gicp-400-u05-author
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["claude", "crew", "gicp-400"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/unit-05/index.mdx
  - docs/semester-3/gicp-400/unit-05/topic-01.mdx
  - docs/semester-3/gicp-400/unit-05/topic-02.mdx
  - docs/semester-3/gicp-400/unit-05/topic-03.mdx
  - docs/semester-3/gicp-400/unit-05/unit-assessment.mdx
  - specs/content/gicp-400/concepts/unit-05.md
  - specs/content/gicp-400/coverage/unit-05.md
  - specs/content/gicp-400/figures/unit-05.md
  - specs/content/gicp-400/figures/unit-05.banner.md
  - specs/content/gicp-400/sources/unit-05.md
  - specs/content/gicp-400/sources/texts/hussain-kokab-2012-18th.md
  - specs/content/gicp-400/sources/texts/pak-27th-amendment-2025.md
  - specs/content/gicp-400/sources/texts/sindh-rte-act-2013.md
  - specs/content/gicp-400/sources/texts/sahsol-shehla-zia.md
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-05/G2/
  - static/img/figures/gicp-400/unit-05/ (six SVGs and six dark variants)
tests:
  - npm run check:content, through scripts/heavy.sh
  - node scripts/prepare-gate-evidence.mjs GICP-400 5
  - FIGURE_ROOT=static/img/figures/gicp-400/unit-05 node scripts/build-figure-variants.mjs
  - MDX compile of all five pages with @mdx-js/mdx: PASS
  - librsvg (sharp) render of all six figures, inspected by eye; Chromium measure-figure-text NOT run (browser prohibited by the brief)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored GICP-400 Unit 5 in English from the approved spec: opening page, three nine-part topics, a 10/10/5 assessment with bounded answers, six placed schematic SVGs with derived dark variants, a banner handoff, and the coverage, sources, figures and concept governance files. Read the current constitutional text before drafting and found that the Twenty-seventh Amendment (13 November 2025) omitted Article 184, so the unit teaches Article 175E(3) and names Article 184(3) as the former provision.

## Outcome

- ✅ Impact: Unit 5 draft exists for all nine sub-topics at 71 reading minutes, inside the 55-75 band.
- 🧪 Tests: See front matter. Final check:content result is reported in the crew summary and G2 evidence.
- 📁 Files: See front matter.
- 🔁 Next prompts: Independent G3 review; Urdu translation job; raster banner job.
- 🧠 Reflection: A figure plan can go out of date faster than a spec's approval. Reading the current primary text before drawing caught it.

## Handoff (for CEO and agents)

- Shipped / changed: GICP-400 Unit 5 English draft, figures and governance files, committed on crew/gicp-400-u05-author; not pushed.
- Decisions the team must respect: fig-U5-4 and Topic 5.2 depart from the plan wording "Supreme Court (Article 184(3))" because that article no longer exists; they show Article 175E(3) and name Article 184(3) as the former provision. Unit 5 reads the current transcription, while Unit 1 says it uses the 2012 edition. The content spec, glossary and pak-constitution-1973 text note were not edited (out of scope or bound to Unit 1).
- Pending / next owner: Owner to decide whether to note the amendment in the content spec's reading list and figure plan. Glossary entry "Judiciary" omits the Federal Constitutional Court. Unit 6 (Judiciary) should make the same check. G3 reviewer should check the legal paraphrases, especially Articles 175E, 175F, 199 and 233. CI's figure-geometry job must measure the SVGs. G3, G4, G5 and G6 stay open.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: The first SVG layouts had row spill and connector lines crossing text; a width budget alone missed them, and rendering caught them. The hosted transcription refuses plain curl, so it was read through a scraper.
- Graders run and results (PASS/FAIL): see tests above.
- Prompt variant (if applicable): crew author brief.
- Next experiment (smallest change to try): Have the planner flag legal-text units for a check against the latest amendment before G1 approval.
