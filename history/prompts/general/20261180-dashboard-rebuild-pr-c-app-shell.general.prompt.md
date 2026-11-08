---
id: 20261180
title: Dashboard rebuild PR C, one app shell, grouped navigation, primitives and QA tools
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/app-foundation
user: M Yousif Channa
command: none
labels: [board-direct, redesign, dashboard, accessibility]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/AppDashboardShell.tsx
  - src/lib/dashboardNav.ts
  - src/css/app.css (new), src/css/custom.css, src/css/tokens.css, docusaurus.config.ts
  - src/components/ui/ (StatTile, Panel upgraded; WelcomeCard, ListCard, Tabs, BarChart, Donut, ProgressBar new)
  - src/pages/app/classes/*, admin/*, reviewer/*, profile.tsx (wrapped in the shell)
  - scripts/qa/seed-qa-accounts.mjs, scripts/qa/shoot-app.mjs
tests:
  - npx tsc --noEmit
  - node scripts/qa/shoot-app.mjs --quick (33 signed-in pages)
  - npm run check:all
  - npx playwright test (shell-related dashboard specs)
---

## Prompt

merge on green, move on

## Response snapshot

Approved plan PR C (owner chose the full app layout inspired by the Materio template, three QA accounts, and merge on green). One AppDashboardShell now frames every /app page: a grouped sidebar whose sections come from the account's role and capabilities (Learn, Teach, Manage, Review, Account; navSections in src/lib/dashboardNav.ts with new adminNav, reviewerNav and accountNav), the current item a filled teal pill, collapsible to icons with the state remembered, and the phone drawer with the old contract (Open menu, Dashboard navigation dialog, focus trap, Escape returns focus). The site navbar stays in the DOM as the app top bar via HtmlClassNameProvider's app-page class, which hides the site links, the call to action and the footer and keeps the compact logo. Classes, admin, reviewer and profile pages, which had no menu, are wrapped and their inner main became a div. App CSS moved to src/css/app.css. The ui primitives gained a tinted-icon StatTile, a card Panel, WelcomeCard, ListCard, ARIA Tabs and SVG BarChart, Donut and ProgressBar with real-text numbers. QA: three accounts (qa-student, qa-teacher with verified teacher, qa-admin) and a sample class were created on the live Supabase by scripts/qa/seed-qa-accounts.mjs (passwords in ~/.config/textbook-qa/accounts.json, chmod 600; --delete removes them), and scripts/qa/shoot-app.mjs signs in as each and shoots every page with overflow, image and axe checks.

## Outcome

- ✅ Impact: every signed-in area shares one navigable layout; the pieces for the page redesigns exist.
- 🧪 Tests: tsc clean for changed files; 33 signed-in pages at 1440 light: no overflow, no broken images; axe found three pre-existing page-content issues (progress bar name, links in text blocks on the teacher home, a scrollable audit table) that PRs D to F fix; npm run check:all 20/20 PASS; 16 shell-related e2e tests run locally against the live Supabase: two failed on duplicate accessible names the sidebar introduced (a 'G3 sign-off desk' link and an aria-labelledby 'Account' list matching getByLabel('Account')), both fixed (sidebar label 'G3 sign-off', section labels no longer name their lists), then all 16 PASS.
- 📁 Files: shell, nav model, app.css, primitives, 24 wrapped pages, QA scripts.
- 🔁 Next prompts: PR D student pages, PR E teacher and classes, PR F admin, reviewer and profile.
- 🧠 Reflection: a build started in the same worktree while editing mixes old and new files; edit only after builds finish, or draft elsewhere.

## Handoff (for CEO and agents)

- Shipped / changed: `navSections()` decides the sidebar; `AppDashboardShell` without `role` wraps pages that bring their own guard; QA accounts exist on production for visual checks.
- Decisions the team must respect: keep `.navbar` in the DOM on app pages (e2e reads the email and Admin link there); never nest a second main inside the shell; QA scripts never run in CI; delete the QA accounts with --delete when no longer needed.
- Pending / next owner: PRs D to F.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: sidebar link and list names collided with names e2e specs select by.
- Graders run and results (PASS/FAIL): check:all PASS; e2e PASS after the two fixes.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
