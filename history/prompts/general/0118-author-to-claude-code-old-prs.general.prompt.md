---
id: 0118
title: author-to-claude-code-old-prs
stage: general
date: 2026-10-11
surface: agent
model: claude-opus-5-5
feature: none
branch: agent/TEX-16
user: M Yousif Channa
command: show ceo tex status, why still 12 open prs are showing
labels: ["board-direct", "paperclip", "agents", "merge", "tex-37", "tex-16", "tex-32"]
links:
  spec: null
  ticket: TEX-37
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/116
files:
  - /home/a2ahs/org/textbook/roles/bilingualauthor-claude.md (engine note, ADR-0019 independence, 2026-10-10 rules block; backup .bak-20261011)
  - i18n/ur/docusaurus-plugin-content-docs-licence/current/index.mdx (stray leading spaces removed)
  - history/prompts/general/0118-author-to-claude-code-old-prs.general.prompt.md
tests:
  - grep of the Urdu licence index for the retired term (0 hits) and leading-space lines (0)
  - CI on PR #116 after merging main
---

## Prompt

show ceo tex status, why still 12 open prs are showing

(Owner answers to follow-up questions: BilingualAuthor engine -> "Claude Code (Recommended)"; older PRs -> "Merge #116, fix #115".)

## Response snapshot

Status: BilingualAuthor's 12:35 UTC run hit the agy-Claude weekly quota ("Resets in 152h40m", about 2026-10-17 21:20 UTC), so TEX-38..44 had not moved. Reviewer idle (nothing to review until a G2 exists). TEX-38 showed `blocked` with a stale blocker (TEX-45, done). 11 PRs open: course drafts #117-#124 (open by design until each course passes; CI red on missing G2 evidence, #117 on unit-NN placeholder text) plus #113, #115, #116.

Actions:
- BilingualAuthor switched from the agy process adapter to `claude_local` (engine cli, model claude-opus-5, instructions `bilingualauthor-claude.md`). The role file gained the ADR-0019 independence note and the 2026-10-10 intake/gates rules block that only the agy role carried. Previous config saved in the session scratchpad.
- TEX-38 -> todo with next steps (regenerate EFMP-304 U4-6 G2 evidence for PR #118, then G4 Urdu). BilingualAuthor woken (run 2cdc4a73).
- PR #115 closed as superseded: its code, banner text and PHR 0092 were already on main via #102/#101.
- PR #116: stray leading spaces fixed, main merged in, this PHR added; merged after CI.

## Outcome

- Impact: Semester 2 authoring resumes on Claude Code instead of waiting six days.
- Risk: BilingualAuthor now draws on the owner's Claude subscription quota shared with board sessions.
- Next prompts: watch the first claude_local runs; #113 (TEX-36 rebrand) still awaits an owner decision.

## Handoff (for CEO and agents)

- Shipped: BilingualAuthor on claude_local; PR #115 closed (superseded); PR #116 merged (Urdu licence index uses معیارِ جانچ).
- Decisions to respect: BilingualAuthor must stay on a Claude model (ADR-0019; Reviewer is Gemini). The 2026-10-10 rules (no self-set spec status, G2 via auto:gates, mapping floor form, no false registry claims, flock for heavy jobs) now apply in the Claude role file too.
- Pending: TEX-38 G2 evidence fix + G4, then G5 (Reviewer); TEX-39..44 unit work; #113 owner decision.
- Paperclip issues affected: TEX-16, TEX-32, TEX-37, TEX-38, TEX-39..44.
