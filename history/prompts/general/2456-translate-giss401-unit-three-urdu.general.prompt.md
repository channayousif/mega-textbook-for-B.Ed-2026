---
id: 2456
title: Translate GISS-401 Unit 3 into Urdu
stage: general
date: 2026-11-06
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/giss-401-u03-translate
user: crew
command: carry out .crew/brief.md
labels: [claude, crew, giss-401, translation]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/unit-assessment.mdx
  - static/img/figures/giss-401/unit-03/fig-U3-1.ur.svg
  - static/img/figures/giss-401/unit-03/fig-U3-1.ur.dark.svg
  - static/img/figures/giss-401/unit-03/fig-U3-2.ur.svg
  - static/img/figures/giss-401/unit-03/fig-U3-2.ur.dark.svg
  - static/img/figures/giss-401/unit-03/fig-U3-3.ur.svg
  - static/img/figures/giss-401/unit-03/fig-U3-3.ur.dark.svg
  - static/img/figures/giss-401/unit-03/fig-U3-4.ur.svg
  - static/img/figures/giss-401/unit-03/fig-U3-4.ur.dark.svg
  - specs/content/giss-401/reviews/unit-03/G4/translation-handoff.md
  - specs/content/giss-401/reviews/unit-03/G4/content-gates.txt
  - specs/content/giss-401/reviews/unit-03/G4/conditional-parity-gates.txt
  - history/prompts/general/2456-translate-giss401-unit-three-urdu.general.prompt.md
tests:
  - npm run check:content (draft state, 14 of 14 pass)
  - npm run check:content (temporary reviewed state, only the expected G4/G5 pipeline findings and the flip-caused content-status finding)
  - npm run figures:variants:check (pass)
  - Scripted source parity for headings, quotations, items, tables, figures, verse references and numerals (pass)
  - All four Urdu MDX bodies compile with @mdx-js/mdx (pass)
  - Serial Sharp figure previews inspected under scripts/heavy.sh
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Translated all four GISS-401 Unit 3 pages, including the complete 10/10/5 assessment and marking guidance. Localised four SVGs and derived their dark variants. Content gates pass in draft state. Status remains draft and the tracker is unchanged. Browser checks were not run because the brief bars them. Work is committed locally with no push or PR.

## Outcome

- ✅ Impact: Complete Urdu source mirror and localised figures, ready for an independent G5 comparison once the English G3 is settled.
- 🧪 Tests: Draft gates 14 of 14 pass; the reviewed-state run shows only expected findings; dark variants, source parity and MDX compilation pass. Build, render-inspect and measure-figure-text not run.
- 📁 Files: Four Urdu MDX pages, eight SVG variants, the G4 handoff, two gate logs and this PHR.
- 🔁 Next prompts: Scholar check of the Urdu Qur'an and hadith renderings, browser geometry and Urdu narrow/A4 inspection in a permitted session, independent G5, English revision of the listed source issues, owner terminology banking.
- 🧠 Reflection: scripts/mirror-figure-rtl.mjs adds an end anchor to tspans inside centred text; only a rendered preview showed the off-centre labels, and no gate would have.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu index, two topics and the full assessment for English baseline 929158ac0735ddd768188fe9e2477fe3f0fdae3a; four localised figures plus derived dark twins; G4 handoff at specs/content/giss-401/reviews/unit-03/G4/translation-handoff.md.
- Decisions the team must respect: translate-unit Step 7 forbids appending a G4 tracker row, so the brief's instruction to record it as the skill says is met by the handoff and the G4 and G5 rows stay open. translation_status stays draft. No review, publication, banking or certification is claimed. No English content, bank or governing document changed. The Urdu Qur'an and hadith quotations are this translator's renderings of the English quotations and have not been checked by a scholar.
- Pending / next owner: A qualified Islamic Studies reviewer owns G3 and the check of the quotations. A fresh G5 reviewer owns semantic and assessment equivalence. A permitted validation session owns npm run build, measure-figure-text and render-inspect. An English revision job or the owner owns the six source issues in the handoff (including fig-U3-4 omitting moral feeling and the fig-U3-3 attribution of 5:8). The curriculum owner owns the proposed terms. Whoever owns scripts/mirror-figure-rtl.mjs should look at its tspan anchors; fig-U4-1.ur.svg carries the same attribute.
- Issues affected: No issue identifier supplied; crew job giss-401-u03-translate.

## Evaluation notes (flywheel)

- Failure modes observed: The mirror tool's tspan anchors pushed centred labels off-centre in the first preview; removed after mirroring. A first pass that collapsed repeated glosses also stripped the stage glosses from Sutomo's cycle; restored by hand.
- Graders run and results (PASS/FAIL): check:content PASS 14/14 in draft; conditional run FAIL only for the expected findings; figures:variants:check PASS; source parity and MDX compilation PASS. Browser checks NOT RUN per brief.
- Prompt variant (if applicable): crew brief, translate-unit workflow.
- Next experiment (smallest change to try): Stop the mirror tool adding anchors to tspans whose parent text is middle-anchored, then re-measure existing Urdu figures.
