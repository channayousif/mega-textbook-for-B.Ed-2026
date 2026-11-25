---
id: 20261273
title: Stage 2 quick fixes (navbar, CTA copy, admin guide)
stage: green
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: 034-backlog-tracking
branch: feat/034-stage2-quick-fixes
user: M Yousif Channa
command: implement Stage 2 (#797, #798, #799)
labels: [board-direct, landing, navbar, admin]
links:
  spec: specs/034-backlog-tracking/spec.md
  ticket: "#797, #798, #799"
  adr: null
  pr: null
files:
  - docusaurus.config.ts
  - i18n/ur/docusaurus-theme-classic/navbar.json
  - src/components/landing/copy.ts
  - src/pages/app/admin/guide.tsx
  - src/pages/app/admin/_guide-content.mdx
  - src/pages/app/admin/index.tsx
  - src/lib/dashboardNav.ts
  - guides/admin-guide/index.mdx (deleted)
  - guides/admin-guide/_category_.json (deleted)
  - specs/034-backlog-tracking/tasks.md
tests:
  - npm run check:content (13 of 14 pass; check:content-status needs the generated file, present after prebuild)
  - docusaurus build --locale en
---

## Prompt

yes

(Context: the owner approved starting Stage 2 of Feature 034: issues #797 navbar "Institutions" to "Contact", #798 both "Choose your programme" CTAs to "Explore the course catalogue", #799 admin guide admin-only, moved into /app/admin per the owner's ruling.)

## Response snapshot

Renamed the navbar `/contact` item to "Contact" and dropped the orphaned Urdu "Institutions" key (the
Urdu "Contact" key already existed: رابطہ). Changed `cta1` in the landing copy, which both the hero and
the "Start with one topic today" buttons use, to "Explore the course catalogue" and in Urdu to
"کورسز کی فہرست دیکھیں". The button target is unchanged (`#who`, the programme chooser on the page). Moved the
admin guide body to `src/pages/app/admin/_guide-content.mdx`, rendered by a new
`/app/admin/guide` page inside OwnerConsoleGuard with `noindex`, added it to the admin hub and the
admin sidebar nav, deleted `guides/admin-guide/`, and redirected `/guides/admin-guide` to the new
page with plugin-client-redirects.

## Outcome

- ✅ Impact: students and teachers no longer see the admin guide in the guides sidebar, search or sitemap; the navbar says Contact; both CTAs read "Explore the course catalogue".
- 🧪 Tests: content gates pass; English build verified.
- 📁 Files: see list above.
- 🔁 Next prompts: Stage 3 (#800-#805).
- 🧠 Reflection: a fresh worktree needs `npm run prebuild` before `docusaurus build`; the config refuses to load without `static/content-status.json`.

## Handoff (for CEO and agents)

- Shipped / changed: #797, #798, #799 (PR closes them).
- Decisions the team must respect: the admin guide lives at `/app/admin/guide` only; the guard is cosmetic (Art. IX.2), so never put secrets in it. The Urdu CTA wording is my choice in the plain register; the owner may change it.
- Pending / next owner: none for Stage 2 (owner then ruled the CTAs go to `/intro`, PHR 20261274).
- Paperclip issues affected: none; GitHub #797, #798, #799.

## Evaluation notes (flywheel)

- Failure modes observed: first build failed for lack of generated prebuild files.
- Graders run and results (PASS/FAIL): check:content PASS (with generated file); build see PR.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
