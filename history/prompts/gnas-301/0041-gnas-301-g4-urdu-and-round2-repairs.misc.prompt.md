---
id: "0041"
title: "GNAS-301 G4 Urdu complete and round-2 repairs applied"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 019-author-gnas-301
branch: 019-author-gnas-301
user: M Yousif Channa
command: "orchestrator task assignment (Phases 4-5: G4 translation, G5 review launch)"
labels: [gnas-301, g4, urdu, g3-repairs, two-cycle, g5]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/
  - docs/semester-1/gnas-301/unit-05/topic-01.mdx
  - docs/semester-1/gnas-301/unit-05/unit-assessment.mdx
  - docs/semester-1/gnas-301/unit-06/topic-06.mdx
  - docs/semester-1/gnas-301/unit-06/unit-assessment.mdx
  - specs/content/gnas-301/coverage/unit-05.md
  - specs/content/gnas-301/sources/unit-05.md
  - specs/content/gnas-301/concepts/unit-06.md
  - specs/content/gnas-301/sources/texts/anwar2026.md
  - static/img/figures/gnas-301/unit-05/
  - specs/gaps.md
  - specs/content/gnas-301/tasks.md
tests:
  - npm run check:content (11/11 PASS at ce23481 + refreshed G2 evidence)
  - npm run figures:variants:check (268 figures OK)
  - node scripts/measure-figure-text.mjs (fig-U5-2, fig-U5-3 all variants pass)
---

## Prompt

Orchestrator assignment (condensed; verbatim original in PHR-0035): complete G4 Urdu mirrors for Units 3-6 (Units 1-2 already done), apply the outstanding G3 round-2 repairs for Units 5-6, record the two-cycle gap entries, then launch G5 Urdu reviews (max 2 concurrent reviewer subagents), and finish with fetch origin/main, check:all, push and PR.

## Response snapshot

G4: translated the remaining 19 Urdu files (Unit 3: 5 files; Unit 4: 10; Unit 5: 7; Unit 6: 9) to i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/, academic-plain register, terminology-bank-driven, .ur.svg figure variants referenced, heading parity exact; all 46 Urdu mirror files for the six units now exist and check:content passes.

Round-2 repairs: audit against the U5/U6 round-02 reports found the prior repair commit c21c2d8 overclaimed - it listed repairs never written to disk (the recurring silent-replacement failure). Applied the full missing set at ce23481: U5 second 5.1 RRQ (RRQ-02 reworked to the emission-to-effect chain walk, bank rebalanced 2/2/3/3), PM2.5 claims reworded to WHO-2024-fact-sheet scope across topic-01, unit-assessment summary, sources registry and all four fig-U5-2 variants, fig-U5-3 arrows moved into the panel gaps in .svg/.dark.svg and the .ur.svg/.ur.dark.svg geometry fully re-spaced with re-centred labels, coverage U5-07/haines-frumkin row corrected to the environmental-laws heading; U6 ERQ-04 rewritten to integrate 6.4 greenhouse + 6.5 smog with a matching rubric, RRQ-08 re-keyed to 6.6 mitigation/adaptation and MCQ-03 re-keyed to the 6.6 mitigation/adaptation distinction (blueprint surplus 2/2/2/1/1/2 now honoured), concept-graph item mappings updated, topic-06 WHO framing reworded to the fact sheet's actual words, anwar2026 excerpt verification claim corrected. Urdu mirrors updated for every changed passage. G2 evidence for Units 3/5/6 regenerated at the repaired commit (Unit 3 staled only via the shared anwar2026 excerpt) and the tracker rows committed together with the gates files.

Governance: G-2026-32 (Unit 5) and G-2026-33 (Unit 6) two-cycle gap entries recorded in specs/gaps.md; tracker G4 rows marked auto:g4 for all six units (no human initials used for agent work); G3 rows annotated with round reports and repair status. G5 bundles prepared for all six units (prepare GNAS-301 1..6 G5); reviewers for Units 1-2 launched (2-concurrent cap respected), 3-6 queued.

## Outcome

- ✅ Impact: G4 complete for the whole course; the Units 5-6 G3 round-2 repairs actually on disk this time; two-cycle limit recorded for owner gating; G5 under way.
- 🧪 Tests: check:content 11/11 PASS; figures:variants:check 268 OK; measure-figure-text passes for every touched figure variant; manifest diff script confirmed zero drift between G2 evidence and the working tree after the refresh.
- 📁 Files: 19 new Urdu files + 6 updated Urdu files; 4 English content files; 4 governance files; 8 SVG variants; specs/gaps.md (+G-2026-32, +G-2026-33); specs/content/gnas-301/tasks.md (G3 notes + G4 rows); 3 regenerated G2 gates files.
- 🔁 Next prompts: collect the six G5 reports (apply repairs for any revise dispositions, two-cycle limit applies), then fetch origin/main, npm run check:all, push -u origin HEAD and open the PR.
