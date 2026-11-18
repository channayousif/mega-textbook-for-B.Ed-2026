---
id: 2477
title: Tabs primitive shows its selected state in light mode
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/tabs-light-selected
user: M Yousif Channa
command: none
labels: [board-direct, ui, css, bugfix]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/ui/ui.module.css
  - history/prompts/general/2477-tabs-light-selected-state.green.prompt.md
tests:
  - Browser check (Playwright, 390px, light): selected tab background computed as transparent before the fix; rule order traced with CDP CSS.getMatchedStylesForNode
---

## Prompt

video and audios may be hosted on youtube/music, slides may be hosted on google drive, separate pr,

## Response snapshot

During the Spec 029 Study Studio browser check, the selected tab of the shared `ui/Tabs`
primitive had no visible state in light mode. CDP showed `.tabOn` and `.tab` have equal
specificity and the bundler emits `.tab` (with `background: none`) after `.tabOn` (merged with
another module's `.on_` rule), so the base style won. Dark mode was unaffected because its
`html[data-theme='dark'] .tabOn` selector is more specific. The owner asked for the fix in a
separate PR; the selector is now `.tab.tabOn, .tab.tabOn:hover`, which wins regardless of
emitted order. No page on main renders `ui/Tabs` yet; the Study Studio panel is its first user.

## Outcome

- ✅ Impact: Selected tab is highlighted in light mode wherever `ui/Tabs` is used.
- 🧪 Tests: Browser check found the defect; no unit test covers CSS rule order.
- 📁 Files: one CSS selector line, plus this PHR.
- 🔁 Next prompts: Verify in the Study Studio panel after the feature 029 build.
- 🧠 Reflection: CSS-module rule merging can reorder equal-specificity rules; state classes should compound with their base class.

## Handoff (for CEO and agents)

- Shipped / changed: `src/components/ui/ui.module.css:130` selector raised to `.tab.tabOn`.
- Decisions the team must respect: owner ruling 2026-11-09: Study Studio audio and video host on YouTube / YouTube Music, slides on Google Drive (recorded here; implemented in feature 029).
- Pending / next owner: feature 029 PR (Study Studio) carries the same line and will merge cleanly.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: equal-specificity state class overridden after bundling.
- Graders run and results (PASS/FAIL): manual browser check FAIL before fix; post-fix check pending the feature 029 build.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): lint rule or review checklist item for `*On` state classes without a compound selector.
