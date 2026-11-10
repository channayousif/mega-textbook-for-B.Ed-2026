---
id: 20261192
title: Add Ahrefs analytics snippet to site head
stage: general
date: 2026-11-11
surface: agent
model: longcat/LongCat-2.5-Preview
feature: none
branch: feat/ahrefs-analytics
user: M Yousif Channa
command: (chat)
labels: ["board-direct", "analytics", "ahrefs", "config"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/537
files:
  - docusaurus.config.ts
  - history/prompts/general/20261192-ahrefs-analytics-head-snippet.general.prompt.md
tests:
  - CI build + e2e green on PR #537 head
---

## Prompt

SETup GSC, copy the snippet into head section of the site : <script src="https://analytics.ahrefs.com/analytics.js" data-key="ij+YRkZRrZobEWUujGJjDQ" async></script>

## Response snapshot

The Ahrefs analytics snippet was added to `docusaurus.config.ts` via the Docusaurus `scripts`
array, which injects `<script>` tags into the HTML `<head>` (verified against the installed
`@docusaurus/types` config schema, where `scripts` accepts arbitrary attribute maps). The
provided `data-key` replaced the previously staged key.

Google Search Console is a separate verification mechanism (`<meta name="google-site-verification"
content="TOKEN" />`), not this analytics script. The owner confirmed GSC is deferred for now.

## Outcome

- ✅ Impact: Ahrefs analytics loads on every page of textbook.com.pk once deployed.
- 🧪 Tests: CI build + e2e green on PR #537.
- 📁 Files: `docusaurus.config.ts` (scripts array), this PHR.
- 🔁 Next prompts: GSC verification when the owner supplies the token.
- 🧠 Reflection: Docusaurus `scripts` is the idiomatic head-injection path; `headTags` would also
  work but `scripts` matches the snippet exactly and keeps the config conventional.

## Handoff (for CEO and agents)

- Shipped / changed: Ahrefs analytics script added to the site head with the owner's key.
- Decisions the team must respect: GSC verification is deferred; this snippet is analytics, not
  Search Console verification. Do not treat it as a GSC substitute.
- Pending / next owner: Owner to supply a `google-site-verification` token when GSC is wanted.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): CI build PASS, CI e2e PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
