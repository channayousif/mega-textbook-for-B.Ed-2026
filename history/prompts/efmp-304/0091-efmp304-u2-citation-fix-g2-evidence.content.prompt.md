---
id: 0091
title: "EFMP-304 U2: fix Qin citation year, bind source excerpts, add glossary terms, G2 evidence"
stage: G2
date: 2026-10-05
surface: agent
model: claude-opus-5-5
feature: content-efmp-304
branch: agent/TEX-23
user: M Yousif Channa
command: retry (TEX-23 wake)
labels: ["bilingualauthor", "content", "efmp-304", "citation-fix", "qc-spot-check"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: TEX-23
  adr: null
  pr: 109
files:
  - docs/semester-2/efmp-304/unit-02/topic-01.mdx
  - docs/semester-2/efmp-304/unit-02/topic-02.mdx
  - docs/semester-2/efmp-304/unit-02/topic-03.mdx
  - docs/semester-2/efmp-304/unit-02/topic-04.mdx
  - specs/content/efmp-304/coverage/unit-02.md
  - specs/content/efmp-304/sources/unit-02.md
  - specs/content/efmp-304/sources/texts/malone2003.md
  - specs/content/efmp-304/sources/texts/qin2016.md
  - specs/content/efmp-304/sources/texts/yuzenker2022.md
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-02/G2/20261005T175634410Z-gates.json
  - glossary.json
  - static/img/figures/efmp-304/unit-02/fig-U2-1.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-1.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-2.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-2.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-3.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-3.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-4.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-4.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-5.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-5.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-6.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-6.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-7.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-7.dark.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-8.svg
  - static/img/figures/efmp-304/unit-02/fig-U2-8.dark.svg
tests:
  - npm run check:content (all 13 gates pass)
  - npm run check:content-status (passes after rebuild)
  - DOI verification via Crossref (malone2003, qin2016, yuzenker2022 all resolve)
  - DergiPark archive check (qin2016 published July 14, 2016, Volume 3, Issue 2)
  - Google Scholar snippet verification (qin2016: 16 students, Turkish EFL, 'almost non-existent' opposing views)
---

## Prompt

retry (TEX-23 wake after previous runs died on terminal limit failures)

## Response snapshot

Fixed EFMP-304 Unit 2 to pass all 13 content gates and generated G2 evidence.

**Citation fix (QC item D spot-check):** Qin (2019) → Qin (2016). DergiPark archive shows the paper was published July 14, 2016 (Volume 3, Issue 2). DOI metadata says 2019 (registration year). Also fixed journal name: 'Journal of Language Teaching and Learning' → 'Journal of Language Learning and Teaching' (2016 name). Renamed source key qin2019 → qin2016 across all files.

**Source excerpts:** Created bound excerpts for malone2003, qin2016, yuzenker2022. All DOIs verified via Crossref. Qin and Malone full-text verified. Yu & Zenker at title-and-abstract level (full text not retrievable).

**Glossary:** Added 7 missing terms (Conclusion, Explanation, Information question, Issue question, Premise, Rhetorical triangle, Unstated premise).

**Other fixes:** Rephrased 'correct answer' → 'single verifiable answer' in topic-02 (check:no-answer-keys false positive). Updated figure dimensions in topic-03 and topic-04. Added 8 placed SVGs with dark variants.

**G2 evidence:** All 13 gates pass. Manifest written to specs/content/efmp-304/reviews/unit-02/G2/20261005T175634410Z-gates.json. Tracker row updated.

**Draft PR:** https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/109

## Outcome

- ✅ Impact: Unit 2 EN now passes all 13 content gates with G2 evidence. Citation error caught and fixed (QC item D).
- 🧪 Tests: check:content all green. DOIs verified. DergiPark archive checked.
- 📁 Files: 26 files changed across 3 commits.
- 🔁 Next prompts: Unit 2 Urdu translation (G4), Unit 3 English authoring.
- 🧠 Reflection: The Qin year error (2019 vs 2016) is exactly the kind of factual error that passes all 13 gates but is still wrong. QC item D (factual-claim spot check) is essential. The DOI metadata year (2019) was the registration year, not the publication year. DergiPark's archive was the authoritative source.

## Handoff (for CEO and agents)

**What shipped:** EFMP-304 Unit 2 EN is G2-clear (all 13 gates pass, evidence manifest written). Draft PR #109 open.

**Decisions the team must respect:**
- Qin citation is now (2016), not (2019). Source key is qin2016. Do not revert.
- Journal name is "Journal of Language Learning and Learning" for the 2016 Qin paper.
- Yu & Zenker (2022) claims are title-and-abstract level only (full text not retrieved). Do not attribute specific quotes or page numbers to it.

**What is pending and who owns it:**
- Unit 2 Urdu translation (G4): BilingualAuthor, after Unit 3 EN
- Unit 3 English + Urdu authoring: BilingualAuthor, next deliverable
- Banner raster production (fig-U2-9): prompt-only row in figures/unit-02.banner.md, handoff to Codex/WebLeadAgy
- G3 en-review: CurriculumOwner, after PR #109 is reviewed

**Paperclip issues affected:** TEX-23 (this issue). Unit 2 EN portion complete. Unit 3 and both Urdu mirrors remain.
