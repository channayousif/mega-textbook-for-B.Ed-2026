---
id: "0143"
title: "Diagnose PR 164 build failure"
stage: general
date: 2026-10-18
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: why is #164 build failing
labels: ["board-direct", "crew", "geng-301", "ci"]
links:
  spec: null
  ticket: null
  adr: null
  pr: "#164"
files: []
tests: []
---

## Prompt

why is #164 build failing

## Response snapshot

CI run 39064893267, job build: three GENG-301 EN files fail MDX compilation. unit-01/topic-02.mdx:39
`<Glossary term="Clarity">Clarity</Clarity>` (wrong closing tag, should be `</Glossary>`);
unit-05/topic-04.mdx:36 a bare `<Tone>` in prose, parsed as an unclosed JSX tag; unit-04/topic-02.mdx:70
a literal `{textbook, blackboard, ...}` set in prose, parsed as a JS expression (acorn error). The 13 content
gates do not catch MDX syntax; only the build does. Crew job geng-301-u00-salvage-cifix1 (opencode) is fixing it.

## Outcome

- Impact: read-only diagnosis; no files or jobs changed.
- Tests: none.
- Files: this PHR only.

## Handoff (for CEO and agents)

- Shipped: nothing.
- Decisions to respect: owner ruled (follow-up prompt "let the crew job fix it") that geng-301-u00-salvage-cifix1 fixes #164; no board-direct edit.
- Pending: geng-301-u00-salvage-cifix1 owns the fix on #164; check the UR mirrors of those topics for the same patterns.
- Paperclip issues affected: none.
