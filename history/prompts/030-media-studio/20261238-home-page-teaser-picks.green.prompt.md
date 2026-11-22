---
id: 20261238
title: Home page "Courses in 30 seconds" (two most watched, two newest teasers)
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: feat/home-teasers
user: M Yousif Channa
command: home page teaser section
labels: [board-direct, media-studio, landing]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/notebook-studio/teaser-stats.mjs
  - scripts/notebook-studio/yt-describe.mjs
  - specs/studio/teasers/teaser-stats.json
  - scripts/build-studio-index.mjs
  - docusaurus.config.ts
  - src/components/landing/HomeTeasers.tsx
  - src/components/landing/copy.ts
  - src/components/landing/landing.module.css
  - src/pages/index.tsx
  - scripts/crew/media.mjs
  - .claude/skills/studio-teaser/SKILL.md
  - .claude/skills/media-studio/SKILL.md
  - tests/unit/studio-index-teasers.test.mjs
  - tests/e2e/course-teaser.spec.ts
tests:
  - tests/unit/studio-index-teasers.test.mjs
  - tests/e2e/course-teaser.spec.ts
---

## Prompt

i see some videos on course pages on the website, but there is nothing on the main page, i remember some of the best performing videos has to be displayed on to home page, preferably in hero section

(owner choices in plan mode: "Section under hero"; view counts "refresh when published, also show
two latest published videos alongwith two top performing")

## Response snapshot

- New `teaser-stats.mjs`: one YouTube Data API call (videos.list statistics, 1 quota unit) with
  the youtube-uploader sign-in (`accessToken`, now exported from yt-describe.mjs) writes
  `specs/studio/teasers/teaser-stats.json`. First snapshot: 7 public teasers.
- `build-studio-index.mjs`: teasers carry semester, published_at and views; new pure
  `pickHomeTeasers` (two most watched, then the two newest not already picked; ties to the newer;
  no views means the four newest) writes `homeTeasers` into `static/studio-index.json`, read by
  `homeTeasers()` in docusaurus.config.ts customFields.
- New `HomeTeasers` section right under the hero (the hero is unchanged): four cards reusing the
  Feature 030 facade player (no YouTube request until a tap, fixed 9:16 frame), a "Most watched" or
  "New" badge, the course title and an "Open the course" link; 4 columns, 2 on tablets, a swipe row
  on phones; EN and UR copy.
- Skills and the crew `media_publish` brief: refresh and commit the snapshot after publishing or
  cross-posting.

## Outcome

- ✅ Impact: the home page shows video for the first time, and it reorders whenever the snapshot is
  refreshed in a publish PR.
- 🧪 Tests: studio-index teaser tests 7/7; e2e and build results in the PR.
- 📁 Files: see front matter.
- 🔁 Next prompts: refresh the snapshot after the 15:00 batch-3 publish and the 16:00 cross-posts.
- 🧠 Reflection: the stage-5 catalogue button never reached the home page because the landing page
  does not render the catalogue; check where a "home and catalogue" requirement actually lands.

## Handoff (for CEO and agents)

- Shipped / changed: home page teaser section; `teaser-stats.mjs` and its snapshot; picks built
  at build time.
- Decisions the team must respect: owner 2026-11-22: section under the hero, two most watched plus
  two newest; counts refreshed only when teasers are published or cross-posted (no nightly job).
- Pending / next owner: Claude refreshes the snapshot once batch 3 is public (with the ledger
  `public` records the cross-post timers write); the owner may ask for more cards later.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a stage requirement ("home and catalogue cards") met only on the
  catalogue page.
- Graders run and results (PASS/FAIL): unit PASS; build and e2e in the PR.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): rank by views per day since publishing so new teasers
  are not outranked forever by old ones.
