---
id: 0125
title: tex51-urdu-mirrors-rebrand-alignment
stage: general
date: 2026-10-13
surface: agent
model: LongCat-2.0
feature: none
branch: agent/TEX-51
user: M Yousif Channa
command: "TEX-51: align Urdu mirrors for landing, contact, and intro with new branding"
labels: ["ProgramManager", "paperclip", "tex-51", "rebranding", "i18n", "urdu"]
links:
  spec: null
  ticket: TEX-51
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/137
files:
  - i18n/ur/code.json
  - i18n/ur/docusaurus-plugin-content-pages/contact.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/intro.mdx
tests:
  - python3 json.load(i18n/ur/code.json) — valid
  - grep em-dash U+2014/U+2015/U+2E3A/U+2E3B across modified files — 0 hits
---

## Prompt

TEX-51: align Urdu mirrors for landing, contact, and intro with new branding. Follow-up from TEX-36 (PR #113). The English landing page (src/pages/index.tsx), contact page (src/pages/contact.mdx), and docs intro (docs/intro.mdx) were rebranded to Mega Textbook / platform vision. Their Urdu mirrors (i18n/ur/...) are still aligned with the old B.Ed-only messaging. Bound by the terminology bank. After PR #113 merges.

## Response snapshot

PR #113 confirmed merged (commit 8c82ee78). Read the English-vs-Urdu gap from the PR diff:

- Landing (code.json `home.*`): five strings still B.Ed-scoped.
- Contact (contact.mdx): description + lead paragraph still B.Ed-scoped.
- Docs intro: Urdu mirror file did not exist at all.

Made three edits bound by the terminology bank (specs/content/terminology.csv):

1. `i18n/ur/code.json` — home.title → "میگا ٹیکسٹ بک"; home.subtitle reframed to platform vision (ADE, B.Ed(H), STEDA, Govt of Sindh); home.textbookTitle → "نصابی کتابوں کا مجموعہ"; home.textbookDesc mirrored English breadth; home.textbookAction pluralised.
2. `i18n/ur/docusaurus-plugin-content-pages/contact.mdx` — description + lead paragraph reframed to platform audiences.
3. `i18n/ur/docusaurus-plugin-content-docs/current/intro.mdx` — created new Urdu mirror matching rebranded English docs/intro.mdx.

Em-dash rule verified clean. code.json re-parsed as valid JSON.

## Outcome

- ✅ Impact: Urdu landing/contact/intro now read consistently with the English Mega Textbook rebrand; Urdu docs intro mirror no longer missing.
- 🧪 Tests: JSON valid; 0 em-dash hits across modified files.
- 📁 Files: 3 (1 modified JSON, 1 modified MDX, 1 new MDX).
- 🔁 Next prompts: none.
- 🧠 Reflection: Previous run (cec869a5) failed on a transient KVTransfer GPU-decode error before any file writes; resumed cleanly in a fresh heartbeat with the worktree already staged.

## Handoff (for CEO and agents)

- Shipped / changed: Draft PR #137 (agent/TEX-51 → main). Urdu landing/contact/intro aligned to Mega Textbook branding; Urdu docs intro mirror added.
- Decisions the team must respect: MVP acronym rendered as Latin "MVP" in Urdu (matches existing about.mdx Urdu convention); "STEDA teacher-licence aspirants" rendered as "STEDA تیچنگ لاسنس کے متمنیوں"; terminology bank terms reused where applicable.
- Pending / next owner: PR #137 requires board review/merge. No migration or deploy step.
- Paperclip issues affected: TEX-51 (this task).
