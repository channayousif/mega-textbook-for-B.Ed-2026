---
id: 0118
title: efmp304-u4-6-g4-urdu-and-g2-evidence
stage: content
date: 2026-10-11
surface: agent
model: claude-opus-5
feature: efmp-304
branch: agent/TEX-38
user: M Yousif Channa
command: Paperclip heartbeat TEX-38 - fix PR #118 CI, then G4 Urdu translation of EFMP-304 Units 4-6
labels: ["paperclip", "tex-38", "bilingualauthor", "g4", "translation", "gates"]
links:
  spec: null
  ticket: TEX-38
  adr: null
  pr: "https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/118"
files:
  - specs/content/efmp-304/tasks.md
  - specs/content/efmp-304/reviews/unit-04/G2/20261011T213308061Z-gates.json
  - specs/content/efmp-304/reviews/unit-05/G2/20261011T213316040Z-gates.json
  - specs/content/efmp-304/reviews/unit-06/G2/20261011T213320443Z-gates.json
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/unit-assessment.mdx
tests:
  - "npm run gates:evidence -- EFMP-304 4|5|6 (all eight draft commands PASS)"
  - "npm run check:pipeline-gate (passes; EFMP-304 Units 4-6 gate-checked)"
  - "npm run validate:content with Units 4-6 index pairs flipped to reviewed (EN/UR heading parity passes)"
  - "npm run check:no-em-dash (passes, scans i18n/)"
  - "npm run check:no-answer-keys (passes, scans i18n/)"
---

## Prompt

Paperclip heartbeat on TEX-38. Board comment (2026-10-11): unblocking; the blocker
TEX-45 is done. BilingualAuthor now runs on Claude Code (claude_local, claude-opus-5)
because the agy-Claude weekly quota is exhausted until ~17 Oct. Next: (1) PR #118 CI
fails because the G2 evidence files for Units 4-6 are not found on the branch;
regenerate with npm run gates:evidence -- EFMP-304 N and commit them; (2) G4 Urdu
translation of Units 4-6 (translate-unit skill); then hand to Reviewer for G5.

## Response snapshot

Two pieces of work, both on `agent/TEX-38`.

**1. PR #118 CI (fixed).** `check:pipeline-gate` failed because the three G2 manifests
for Units 4-6 cited `reviews/unit-0N/G2/logs-20261010T1517*/` log files that were never
committed, so the gate could not verify the recorded exit codes. Regenerated all three
with `npm run gates:evidence -- EFMP-304 N`; every one of the eight draft commands
passed. Committed manifest plus log directory, repointed the `G2 en-draft` tracker rows
in `tasks.md`, and removed the three stale manifests whose logs were lost.
`check:pipeline-gate` now passes.

**2. G4 Urdu translation (complete).** All 18 files for Units 4, 5 and 6 translated per
the `translate-unit` skill: index, four topics and the unit assessment each, including
the 10/10/5 question banks and the bounded answers sections. Written as academic-plain
Urdu, not a calque: hedges and epistemic force preserved, citations left in Latin
author-year form, `<Glossary term="...">` attributes unchanged, figure ids/kind/width/
height preserved with alt text fully translated.

Repaired the Unit 6 index left behind by the earlier agy run: its trailing
`## Key terms` prose section broke the EN/UR heading-parity vector and it carried no
`key_terms` front-matter block. Replaced with the EFMP-301 pattern that
`check:pipeline-gate` reads. (Note for the owner: EFMP-304 Unit 3's accepted Urdu index
has the same defect and is **not** fixed here, because it is another pass's accepted
work.)

## Handoff (for CEO and agents)

- **Shipped / changed:** PR #118's CI blocker fixed (G2 evidence for EFMP-304 Units 4-6
  regenerated with its logs committed). Complete Urdu mirrors for EFMP-304 Units 4, 5
  and 6 (18 files), verified at structural parity.
- **Decisions the team must respect:** `translation_status` stays `draft` on all six
  index files. Only an accepted G5 earns `reviewed`, and G5 must run on a different
  model family from this authoring run (ADR-0019). The `G4 ur-translation` and
  `G5 ur-review` tracker rows are deliberately left `▢` - filling them is not the
  translator's to do.
- **Pending / next owner:**
  - **G5 Urdu review** of Units 4-6 - Reviewer (agy/Gemini), via CurriculumOwner.
  - **`.ur.svg` figure variants** - EFMP-304 has none at all (24 schematics across
    Units 4-6, plus the earlier units). `<Figure src>` therefore still points at the
    English `.svg`, matching the accepted Unit 3 mirror; pointing at a non-existent
    file would 404. This is `generate-figures` Step 5, not `translate-unit`.
  - **Two English defects found while translating, not fixed here** (they belong to
    `revise-topic`): `unit-06/topic-03.mdx` third journal entry reads "The pupils did
    not understood the lesson"; `unit-06/unit-assessment.mdx` RRQ 5 asks why a teacher
    would use a starting prompt, but its model answer lists prompts and is marked out
    of 4, so question and answer do not correspond.
  - **Concept-table collision for CurriculumOwner:** `specs/content/efmp-304/concepts/
    unit-04.md` gives the same Urdu label `تاملی عمل` to both CON:EFMP-304-4-2
    (reflective process) and CON:EFMP-304-4-3 (reflective practice), and Topic 4.1
    exists precisely to distinguish them. The prose uses `تاملی عمل` for process and
    `تاملی مشق` for practice; the table needs an owner ruling.
  - **Proposed terminology-bank additions** (not added to `terminology.csv` - the bank
    is frozen and a translator must not self-serve): Reflective thinking / تاملی سوچ,
    Reflective process / تاملی عمل, Reflective practice / تاملی مشق, Reflective journal
    / تاملی جریدہ, Reflective cycle / تاملی چکر, Descriptive writing / بیانیہ تحریر,
    Reflective writing / تاملی تحریر, Technical reflection / فنی تامل, Contextual
    reflection / سیاقی تامل, Dialectical reflection / جدلیاتی تامل.
- **Pre-existing defect found in EFMP-304 Unit 3's accepted Urdu, NOT fixed here** (it is
  another pass's accepted work, so it is raised rather than edited): the Unit 3 Urdu
  assessment has Latin capitals embedded inside Urdu words - `ٹیSٹ` for `ٹیسٹ` and
  `پریمیSز` for `پریمیسز`, 41 occurrences in
  `i18n/ur/.../efmp-304/unit-03/unit-assessment.mdx` and 18 in its `topic-02.mdx`. These
  render as garbled words to an Urdu reader. Units 4-6 were checked for the same defect
  with `grep -P '[\x{0600}-\x{06FF}][A-Za-z]+[\x{0600}-\x{06FF}]'` and are clean.
  Unit 3's Urdu index additionally carries the `## Key terms` heading-parity defect that
  was repaired in Unit 6. Both belong in a `revise-topic` pass on Unit 3.
- **Paperclip control-plane note:** this run was not bound to a heartbeat task
  (`PAPERCLIP_TASK_ID` unset), so `PATCH /api/issues/<TEX-38>` and
  `POST /api/issues/<TEX-38>/comments` both returned
  `403 cross_issue_influence_run_context_required` even with `X-Paperclip-Run-Id` set.
  Issue creation was unaffected. Per the bounded-retry rule the write was not retried
  further; the report was delivered through PR #118's body, this PHR, and issues TEX-46
  and TEX-47 instead. **TEX-38 could not be set `blocked` on TEX-46** - TEX-47 asks
  CurriculumOwner to do it.
- **Paperclip issues affected:** TEX-38 (could not be updated), TEX-46 (G5 review,
  created, assigned to Reviewer), TEX-47 (owner rulings, created, assigned to
  CurriculumOwner).
