---
id: 0146
title: TEX-101 EFMP-303 Unit 6 SDG4 target mapping baseline correction
stage: general
date: 2026-10-16
surface: agent
model: LongCat-2.0
feature: none
branch: agent/TEX-40
user: M Yousif Channa
command: paperclip-agent
labels: ["paperclip", "curriculumowner", "efmp-303", "tex-101", "unit-06"]
links:
  spec: null
  ticket: TEX-101
  adr: null
  pr: 120
files:
  - docs/semester-2/efmp-303/unit-06/topic-01.mdx
  - specs/content/efmp-303/figures/unit-06.md
  - static/img/figures/efmp-303/unit-06/fig-U6-2.svg
  - static/img/figures/efmp-303/unit-06/fig-U6-2.dark.svg
  - history/prompts/general/0146-tex101-efmp303-u6-sdg4-target-mapping-fix.general.prompt.md
tests:
  - XML well-formedness on both SVG variants (python xml.etree.ElementTree parse; pass)
  - grep: no "Target 1".."Target 7" ordinal labels remain in fig-U6-2 SVGs (pass)
  - grep: no "seven targets" / "7 targets" prose in topic-01.mdx (pass)
  - grep: topic-01.mdx now states "ten targets" with official 4.x IDs (pass)
---

## Prompt

TEX-101 (assigned, unblocks TEX-67): correct the English SDG4 target mapping in EFMP-303 Unit 6 topic-01.mdx and fig-U6-2.svg. The baseline error at a5643fa: the SVG labels targets ordinally (Target 1–7) but maps them to official IDs 4.2, 4.1, 4.4, 4.6, 4.5, 4.7, 4.c — mixing outcome and means-of-implementation targets and omitting 4.3, 4.a, 4.b without disclosure. Prose claims "SDG4 has seven targets" when the UN lists ten (4.1–4.7, 4.a–4.c). Decide explicitly whether to depict all ten or a labelled selection using official IDs. Primary source: https://sdgs.un.org/goals/goal4 (Targets and Indicators). No translation or G3/G5 certification in this task. Follow shared-worktree rules on existing agent/TEX-40 / PR #120; no new PR.

## Response snapshot

Read PHRs 0144/0145 (72h window). Confirmed PHR 0145 format precedent for baseline-correction PHRs on agent/TEX-40. Verified official UN SDG4 targets and indicators from https://sdgs.un.org/goals/goal4: 4.1 (primary/secondary completion), 4.2 (early childhood), 4.3 (TVET/tertiary access), 4.4 (skills for employment), 4.5 (gender disparities/inclusion), 4.6 (literacy/numeracy), 4.7 (sustainable development/global citizenship), 4.a (education facilities), 4.b (scholarships), 4.c (teacher supply). Ten targets total.

Decision: **labelled selection with official IDs + disclosure**, not all ten. Rationale: the 780x470 concept-map layout already places 7 target branches + 7 NEP branches + legend; adding 10 targets + 10 NEP branches would exceed the viewBox and destroy readability. The pedagogical purpose is showing SDG4-to-NEP alignment, which the 7 displayed targets serve. A visible disclosure note and corrected prose make the selection explicit.

Mapping applied to fig-U6-2.svg + fig-U6-2.dark.svg:
- "Target 1: Early childhood" → "Target 4.2: Early childhood"
- "Target 2: Universal primary and secondary" → "Target 4.1: Universal primary and secondary"
- "Target 3: Technical and vocational skills" → "Target 4.4: Technical and vocational skills"
- "Target 4: Literacy and numeracy" → "Target 4.6: Literacy and numeracy"
- "Target 5: Inclusion and equity" → "Target 4.5: Inclusion and equity"
- "Target 6: Global citizenship" → "Target 4.7: Global citizenship"
- "Target 7: Teacher training" → "Target 4.c: Teacher training"

Additional SVG changes:
- Subtitle text: "Seven targets linked to..." → "Selected SDG4 targets (official UN IDs) linked to..."
- desc text: updated to name the 7 displayed IDs and disclose that 4.3, 4.a, 4.b are not shown.
- Visible disclosure note added at y=448: "Selection: 7 of 10 SDG4 targets shown (4.3, 4.a, 4.b not shown)."

topic-01.mdx prose (line 54): replaced "SDG4 has seven targets covering early childhood, primary and secondary education, technical and vocational skills, literacy, inclusion, and global citizenship (UNESCO, 2017)" with an accurate statement naming ten targets (4.1–4.7 outcome + 4.a/4.b/4.c implementation), listing all ten topic areas, citing (United Nations, n.d.), and noting Figure 6.2 shows seven labelled by official ID with 4.3/4.a/4.b not shown.

topic-01.mdx Figure alt (line 26): updated to name the 7 displayed IDs and disclose the omission.

specs/content/efmp-303/figures/unit-06.md (manifest row for fig-U6-2): prompt and alt text updated to reflect selection + official IDs + disclosure.

## Outcome

- ✅ Impact: English baseline no longer misstates SDG4 as having seven targets; official UN IDs now label each displayed target; non-displayed targets disclosed in prose, alt, SVG desc, and SVG visible note. Assessment equivalence preserved — MCQ 2 and RRQ 8 test the overall SDG4 goal and NEP connection, not the target count.
- 🧪 Tests: XML well-formedness on both SVGs (pass); no ordinal Target 1–7 labels remain (pass); no "seven targets" prose remains (pass); prose states "ten targets" (pass).
- 📁 Files: 4 files changed on agent/TEX-40, included in draft PR #120.
- 🔁 Next prompts: frozen commit supplied back to TEX-67 (Urdu translation) to resume. Urdu mirror will need to reflect the corrected English (ten targets, selection disclosure) per translate-unit skill.
- 🧠 Reflection: A "how many targets" claim in prose is easy to skip when the figure looks complete. The real error was not just the ordinal labels but the absence of any disclosure that the figure was a selection. Fixing only the labels would have left a silent lie.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-303 Unit 6 topic-01.mdx prose and Figure alt; fig-U6-2.svg (light) + fig-U6-2.dark.svg labels, subtitle, desc, disclosure note; specs/content/efmp-303/figures/unit-06.md manifest row.
- Decisions the team must respect: SDG4 has ten targets (4.1–4.7, 4.a, 4.b, 4.c) per UN. This figure intentionally shows 7 of 10 (4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.c) — the three omitted are 4.3 (TVET/tertiary access), 4.a (education facilities), 4.b (scholarships). Do not add all 10 to this figure; the layout cannot hold them. Urdu translation must carry the same selection + disclosure.
- Pending / next owner: TEX-67 (BilingualAuthor) — resume Urdu translation with corrected English baseline; TEX-101 CurriculumOwner — mark done after commit confirmed.
- Paperclip issues affected: TEX-101, TEX-67, TEX-59 (parent).
