---
id: 20261209
title: Terms of Use page (EN and UR)
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/terms-page
user: M Yousif Channa
command: none
labels: [board-direct, site, legal, social]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/pages/terms.md
  - i18n/ur/docusaurus-plugin-content-pages/terms.md
  - docusaurus.config.ts
  - i18n/ur/docusaurus-theme-classic/footer.json
tests:
  - no em dash in either page; footer label added for the Urdu locale; site build left to CI
---

## Prompt

yes, add the terms page

## Response snapshot

- **Pages.** Added `/terms` (English) and its Urdu mirror. The pages cover:
  - what the site is;
  - permitted use of the content (study, teaching, short quotes with attribution; no wholesale
    copying or selling);
  - accounts and verified-only features, and contributions;
  - AI-assisted material (generated from course text, checked, labelled);
  - accuracy, with official documents taking precedence;
  - third-party services and posting only to our own social accounts;
  - limitation of liability, changes, Pakistani law, and the contact page.
  - Effective 17 November 2026.
- **Footer.** "Terms of Use" link in the About column, with its Urdu label.
- **Why.** TikTok's developer app form requires a Terms of Service URL for the cross-posting
  setup (D-2026-0084).

## Outcome

- ✅ Impact: https://textbook.com.pk/terms/ exists once deployed, unblocking the TikTok app form.
- 🧪 Tests: content checks only; CI builds the site.
- 📁 Files: two pages, footer config and its Urdu label.
- 🔁 Next prompts: owner merges; after deploy, owner fills the TikTok app form with the terms URL.
- 🧠 Reflection: the terms only state facts already true of the site (free accounts, AI labelling, official scheme); no new policy was invented.

## Handoff (for CEO and agents)

- Shipped / changed: this PR (site pages); nothing deployed until merged.
- Decisions the team must respect: the terms are owner-approved in intent; legal wording changes go through the owner.
- Pending / next owner: owner merges; deploy follows the normal CI-gated pipeline.
- Paperclip issues affected: none.
