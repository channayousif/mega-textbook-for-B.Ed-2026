---
id: 0128
title: Update contact address to GECE Badin
stage: general
date: 2026-10-13
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/contact-address-badin
user: M Yousif Channa
command: none
labels: ["board-direct", "contact-page", "content"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/pages/contact.mdx
 - i18n/ur/docusaurus-plugin-content-pages/contact.mdx
 - history/prompts/general/0128-contact-address-badin.general.prompt.md
tests:
 - grep for em dash in changed files (none)
---

## Prompt

at page https://textbook.com.pk/contact/, update the address to "Government Elementary College of Education, Badin, Sindh, Pakistan"

## Response snapshot

Replaced "Faculty of Education, University of Sindh, Jamshoro, Pakistan." with
"Government Elementary College of Education, Badin, Sindh, Pakistan." on the English contact
page and its Urdu mirror (the Urdu page already kept the address in English, so the same
string is used in both). No other file carried the old address. Branch
fix/contact-address-badin off origin/main; PR opened for owner merge, which deploys via the
CI-gated cron.

## Outcome

- ✅ Impact: contact address updated in both locales once merged and deployed.
- 🧪 Tests: em-dash grep on changed files clean; no build run (two one-line text edits).
- 📁 Files: src/pages/contact.mdx, i18n/ur/docusaurus-plugin-content-pages/contact.mdx.
- 🔁 Next prompts: merge the PR, then confirm https://textbook.com.pk/contact/ after deploy.
- 🧠 Reflection: agent/TEX-51 also edits the Urdu contact page but not the address line, so no conflict expected.

## Handoff (for CEO and agents)

- Shipped / changed: contact address is now "Government Elementary College of Education, Badin, Sindh, Pakistan." in EN and UR.
- Decisions the team must respect: this is the official contact address; do not revert it to the Jamshoro address when touching contact pages (TEX-51 included).
- Pending / next owner: board to merge the PR; ProgramManager to rebase agent/TEX-51 on main before merging it.
- Paperclip issues affected: TEX-51 (touches the Urdu contact page).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): em-dash grep PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
