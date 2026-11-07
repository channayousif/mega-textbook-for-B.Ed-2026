---
id: 20261172
title: Redesign PR 3 landing page from the v2 boards
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/redesign-landing
user: M Yousif Channa
command: none
labels: [board-direct, redesign, landing]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/index.tsx
  - src/components/landing/landing.module.css
  - src/components/landing/copy.ts
  - src/components/landing/scenes.ts
  - src/components/landing/StepsEdge.tsx
  - src/components/landing/ClimbArt.tsx
  - src/components/landing/climb.module.css
  - src/components/landing/Icon.tsx (removed)
  - static/img/site/
tests:
  - npx tsc --noEmit
  - npm run build
  - npm run check:all
---

## Prompt

ok good, delete the safer ones, now continue to redesign job

## Response snapshot

Rebuilt the landing page from the approved v2 boards, with the owner's canvas edits read on 2026-11-08 (version 1794080069-c80e): teal hero with the Urdu tagline, the live English and Urdu card and a stepped edge (308px tall on Urdu pages, as the owner resized it); a four-step climb (Read, Practise, Check, Apply in your school); audience tabs with photo stacks; counts on a stepped teal band; a nine-course learning-aids gallery; features, trust, access and questions; and a closing panel where the student teacher climbs once and stays on the top step. Copy edits applied: "Follows the HEC official scheme", "Expert designed structure", "final review" without "human", and "One ladder, from the page to your classroom". Seven Codex course scenes and smaller copies of eight published course figures went to static/img/site/, each under 70 KB, all lazy except the hero.

## Outcome

- ✅ Impact: the landing page takes the v2 identity; the tour, how-it-works and opportunity sections are replaced by the climb and gallery as on the boards.
- 🧪 Tests: tsc clean for changed files; npm run check:all 20/20 PASS including build; full-page screenshots EN and UR, 1440 and 390px, light and dark: no horizontal overflow, no broken images, student ends on the top step in both locales.
- 📁 Files: landing page, styles, copy, scene list, edge and climb components, site images.
- 🔁 Next prompts: PR 4 catalogue, covers, navbar with the bilingual header logo, footer and public pages.
- 🧠 Reflection: the owner changed "climb" to "ladder" on the English phone board only; the site uses "ladder" everywhere in English, and the Urdu heading keeps the board's سفر.

## Handoff (for CEO and agents)

- Shipped / changed: new landing; `SCENES` in src/components/landing/scenes.ts is the single list of landing pictures with EN and UR alt text; `StepsEdge` and `ClimbArt` components; the climb runs once via `useReveal` and shows the end pose without JavaScript or under reduced motion.
- Decisions the team must respect: landing images stay at or under 70 KB (hero under 120 KB) and lazy-load except the hero; course figures under static/img/figures are never edited for the landing, only copied smaller into static/img/site; Urdu headings use line-height 2.6.
- Pending / next owner: owner review of the new Urdu strings (climb step names, "اپنے اسکول میں لاگو کریں", تدریسی معاونات and its heading, scene alt text, the trust-card wording) and of gallery captions that name courses whose textbooks do not yet contain that picture (7 of 9). Merge after PRs 1 and 2.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: PHR ID collision with crew PHRs on main; PR 1 and 2 PHRs moved to 20261170 and 20261171.
- Graders run and results (PASS/FAIL): check:all PASS. Screenshots caught three faults, all fixed: minifier reordering equal-specificity rules (teal access card, white ticks), the RTL build negating translate() in the climb keyframes (student off canvas on Urdu pages), and a hard-coded paper fill on the hero edge in dark mode.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
