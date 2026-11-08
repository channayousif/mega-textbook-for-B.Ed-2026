---
id: 20261183
title: Dashboard rebuild PR F, admin, reviewer and profile pages
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/admin-pages
user: M Yousif Channa
command: none
labels: [board-direct, redesign, dashboard, accessibility]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/app/admin/*.tsx
  - src/pages/app/reviewer/*.tsx
  - src/pages/app/profile.tsx
  - src/css/app.css
tests:
  - npx tsc --noEmit
  - node scripts/qa/shoot-app.mjs --roles admin,teacher (176 shots)
  - npx playwright test (11 admin, reviewer and auth specs, 17 tests)
  - npm run check:all
---

## Prompt

continue

## Response snapshot

Approved plan PR F, the last dashboard part. Every admin, reviewer and profile page title is a page header with an icon; the admin hub cards gain icon tiles and the hub lead moves into the header; every table-scroll wrapper on these pages is a focusable, named region, and a table inside one is a normal table so the region (not the table) scrolls, which fixes axe scrollable-region-focusable on the privilege audit; the profile becomes a wider page with the account facts in a card (stacking on phones) and the delete section as a marked danger zone, after the reference's account page. Admin overview and the G3 desk keep their existing panels and lanes, which the shared card styles already restyle. No query, test id, label or route changed.

## Outcome

- ✅ Impact: all six parts of the dashboard rebuild are done; every signed-in page shares one layout and component set.
- 🧪 Tests: tsc clean; 176 signed-in admin and teacher shots (EN and UR, light and dark, 1440 and 390): no overflow, no broken images, zero axe violations; 17 tests in 11 admin, reviewer and auth e2e specs PASS locally against the live Supabase; npm run check:all 20/20 PASS.
- 📁 Files: admin, reviewer and profile pages, app.css.
- 🔁 Next prompts: owner review of the live dashboards; delete the QA accounts with scripts/qa/seed-qa-accounts.mjs --delete when no longer needed.
- 🧠 Reflection: Infima makes bare tables scroll containers; inside a focusable wrapper the table must be a plain table or axe flags the unfocusable inner scroller.

## Handoff (for CEO and agents)

- Shipped / changed: admin hub icons, page headers, focusable table regions, profile facts card and danger zone.
- Decisions the team must respect: wrap wide tables in a .table-scroll region with role, name and tabIndex; never style the table itself as the scroller.
- Pending / next owner: owner review; optional admin overview stat tiles if the owner wants numbers above the panels.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the profile facts grid overflowed phones with a max-content label column; the audit table scrolled itself inside its wrapper.
- Graders run and results (PASS/FAIL): e2e PASS; shots clean.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
