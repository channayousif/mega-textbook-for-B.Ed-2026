---
id: crew-efmp-304-u06-translate-r1
title: crew translate EFMP-304 unit 6 r1 figures
stage: misc
date: 2026-10-18
surface: agent
model: longcat/LongCat-2.0
feature: efmp-304
branch: crew/efmp-304-u06-translate-r1
user: crew
command: crew translate r1
labels: ["crew","translate","figures"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-304/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-4.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-5.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-6.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-7.ur.svg
 - static/img/figures/efmp-304/unit-06/fig-U6-8.ur.svg
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-06/topic-04.mdx
 - specs/content/efmp-304/tasks.md
 - specs/content/efmp-304/translations/unit-06/handoff.md
tests:
 - npm run check:content
 - npm run figures:variants:check
 - grep em-dash over new .ur.svg
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Crew job efmp-304-u06-translate-r1: translate EFMP-304 Unit 6 into its complete Urdu mirror at G4, bound to terminology.csv. The prose translation was already merged on main; this pass completes the 8 schematic figure variants that were the G5 F3 gap. Scope includes static/img/figures/efmp-304/unit-06/. translation_status stays draft.)

## Response snapshot

Authored 8 Urdu `.ur.svg` files for fig-U6-1…8 by translating every visible label, `<title>`, and `<desc>` to Urdu; mirroring x-coordinates around the viewBox midline (new_x = 780 - old_x) and flipping text-anchor for RTL column order; setting the Nastaliq-first font stack; syncing `<desc>` to the Urdu carrier alt so check:figures parity passes. Ran `optimize:figure` (<=20 KB each) and `figures:variants` for dark twins. Repointed the Urdu `<Figure src>` in the four topic files from `.svg` to `.ur.svg`. Updated the existing G4 tracker row note and wrote a handoff file. check:content clean except pre-existing check:content-status (gitignored report, also fails on origin/main). No em dash in new SVGs. Left translation_status draft and G4 row as ▣ per the skill.

## Outcome

- Impact: closed the EFMP-304 G5 F3 figure-variant gap for Unit 6 (8 .ur.svg + 8 dark variants), completing the structural G4 mirror.
- Tests: check:content 12/13 (only pre-existing content-status, out of scope); check:figures PASS; figures:variants:check OK; no em dash.
- Files: 8 .ur.svg, 8 .ur.dark.svg, 4 topic-*.mdx src rewire, tasks.md tracker note, translations/unit-06/handoff.md.
- Next prompts: fresh independent G5 review against the new .ur.svg bytes; then G7 publish when the G5 is accepted.
- Reflection: the prose mirror was already merged, so the only G4 work left was the figure variants — which is what G5 F3 flagged. The temporary `reviewed` flip confirmed parity gates pass once figures are wired; the only `reviewed`-mode failures were the intentionally-draft tracker row and the pre-existing content-status gap.

## Handoff (for CEO and agents)

- Shipped / changed: 8 Urdu schematic variants (fig-U6-1…8) authored, optimized, dark-derived, and wired into the Urdu topic pages for EFMP-304 Unit 6. G4 tracker row note updated.
- Decisions the team must respect: translation_status stays draft (skill rule); G4 row stays ▣; no self-certification. Fresh G5 review required against the new figure bytes.
- Pending / next owner: independent G5 review of Unit 6 Urdu (prose + new figures); G7 publish after acceptance.
- Paperclip issues affected: closes G5 advisory F3 for Unit 6 (the course-wide figure-variant gap TEX-49 still spans units 1-5).

## Evaluation notes (flywheel)

- Failure modes observed: initial translated `<desc>` did not match the Urdu carrier alt, failing check:figures; fixed by syncing `<desc>` to the exact carrier alt.
- Graders run and results (PASS/FAIL): check:content PASS (excl. pre-existing content-status); check:figures PASS; no-em-dash PASS.
- Prompt variant (if applicable): crew brief v1 r1 (figure-variant completion pass)
- Next experiment (smallest change to try): none
