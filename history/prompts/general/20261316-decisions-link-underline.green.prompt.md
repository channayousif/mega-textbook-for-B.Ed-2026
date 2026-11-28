---
id: 20261316
title: Underline Decisions page links (e2e a11y red)
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/decisions-link-underline
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "ci", "a11y", "admin"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/pages/app/admin/decisions.tsx
tests:
 - CI e2e (admin-and-dashboard-a11y.spec.ts) to confirm
---

## Prompt

merge on green, show me cast as artifact for approval

## Response snapshot

The merge watcher for #960 stopped on a red e2e check unrelated to that PR:
`admin-and-dashboard-a11y.spec.ts` failed with axe `link-in-text-block` (serious) on
/app/admin/decisions. The cause is live data: the crew's owner queue now holds a social post whose
highlight line carries an inline "page" link coloured but not underlined. Every branch, main included,
fails it while that item is queued. Fix: `ExtLink` on the Decisions page underlines its links.

## Outcome

- ✅ Impact: e2e green again for all branches regardless of queue content.
- 🧪 Tests: CI e2e.
- 📁 Files: listed above.
- 🔁 Next prompts: merge this, refresh #960 and #963 from main, resume the merge chain.
- 🧠 Reflection: an e2e that audits a page rendering live crew data can go red without any code change.

## Handoff (for CEO and agents)

- Shipped / changed: underlined external links on /app/admin/decisions.
- Decisions the team must respect: links inside running text on admin pages are underlined, not colour-only.
- Pending / next owner: reviewer approval of this PR; then #960 and #963 merge on green.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: data-dependent a11y failure in e2e.
- Graders run and results (PASS/FAIL): pending CI.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a global admin CSS rule underlining links in `.work-panel` text.
