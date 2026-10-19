---
id: crew-gsos-301-u01-repair_en
title: crew repair GSOS-301 unit 1 from G3 findings
stage: misc
date: 2026-10-19
surface: agent
model: claude-opus-4-20250514
feature: gsos-301
branch: crew/gsos-301-u01-repair_en
user: crew
command: crew repair
labels: ["crew", "opencode", "repair", "g3-findings"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-01/topic-01.mdx
 - docs/semester-2/gsos-301/unit-01/topic-02.mdx
 - docs/semester-2/gsos-301/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-03.mdx
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-01/fig-U1-1.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.dark.svg
 - history/prompts/gsos-301/crew-gsos-301-u01-repair_en.misc.prompt.md
tests:
 - npm run check:content (11/13 pass; check:content-status pre-existing, check:pipeline-gate stale G2 manifest from post-G2 edits)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied all four findings from the G3 revise report (7725a4f0-f3eb-4a48-aed1-23a2605c30d8.json):

- X1 (blocking): Added text-anchor:end to the .wm CSS class in all 24 SVG variants (6 figures x 4 theme/locale variants) to fix the textbook.com.pk wordmark right-edge overflow. Re-wrapped the Durkheim legacy cell text in fig-U1-4 ("department; foundation of functionalism" split across two lines) and the Conflict theory level-of-analysis cell text in fig-U1-6 ("Social classes & power structures" split across two lines), in all 4 variants each.
- S1 (blocking): Replaced all (Henson, 2022) citations with (Hammond & Cheney, n.d.) and all (Givens & White, 2023) citations with (Conerly et al., 2021) across topic-01/02/03.mdx (EN and UR), including the Further reading bibliographic entries.
- A1 (advisory): Noted; CurriculumOwner action, no file change.
- X2 (advisory): Acknowledged; live browser inspection omitted per crew brief constraint.

Appended a new Unit 1 G3 tracker row (unticked) noting repairs applied.

## Outcome

- Impact: GSOS-301 Unit 1 now cites the registry-verified sources (Hammond & Cheney n.d., Conerly et al. 2021) instead of the banned Henson 2022 and misattributed Givens & White 2023. SVG text geometry errors resolved across all 24 figure variants.
- Tests: check:content 11/13 pass. check:content-status fails pre-existing on main (missing static/content-status.json). check:pipeline-gate fails because the G2 report's input manifest hashes no longer match the post-repair topic/SVG files (expected post-G2-edit staleness, not a content defect).
- Files: 31 files changed (6 EN/UR topic citations, 24 SVG geometry fixes, 1 tracker row).
- Next prompts: none required for this unit; G3 remains pending re-review.
- Reflection: The .wm CSS class initially got corrupted by a sed escape error (\& literal); recovered with a second sed pass.

## Handoff (for CEO and agents)

- Shipped / changed: Citation keys aligned with content-spec.md (D-2026-0057 compliant); SVG text geometry repaired; G3 tracker row appended.
- Decisions the team must respect: G3 en-review left unticked per crew brief; G2 input manifest will need re-snapshot (re-run G2) before the pipeline gate passes, since post-G2 content edits invalidate the G2 manifest hashes.
- Pending / next owner: Fresh G3 re-review after these repairs; G2 manifest re-snapshot (or new G2 run) to clear the pipeline gate.
- Paperclip issues affected: none directly named.

## Evaluation notes (flywheel)

- Failure modes observed: sed \& backreference escaping corrupted .wm CSS class; recovered with targeted second pass.
- Graders run and results: PASS for content gates in scope; pipeline gate expected-fail from manifest staleness.
- Prompt variant: n/a
- Next experiment: n/a
