---
id: 20261207
title: "More about the course" descriptions and eye-catching thumbnails
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teaser-urdu-only
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube, thumbnails]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/632
files:
  - scripts/notebook-studio/describe.mjs
  - scripts/notebook-studio/thumbnail.mjs
  - scripts/notebook-studio/text-layout.mjs
  - scripts/notebook-studio/teaser.mjs
  - scripts/notebook-studio/youtube-meta.mjs
  - scripts/notebook-studio/audio-to-video.mjs
  - scripts/notebook-studio/assemble-teaser.mjs
  - scripts/check-studio-manifest.mjs
  - specs/studio/teaser-script.schema.json
  - specs/studio/teasers/efmp-301.json
  - specs/studio/teasers/media-teasers.json
  - tests/unit/notebook-studio-describe.test.mjs
  - tests/unit/notebook-studio-thumbnail.test.mjs
  - tests/unit/notebook-studio-teaser.test.mjs
  - .claude/skills/studio-teaser/SKILL.md
  - .claude/skills/studio-media/SKILL.md
tests:
  - vitest notebook-studio suites: 73 pass
  - EFMP-301 Urdu teaser description 4,736 bytes; all 17 links return 200
  - thumbnails rendered for the teaser and 9 published Unit 4 items; phone-size check read
---

## Prompt

we can add a section in description "More about the course" from actual content the video links to, and its objectives, and links to other videos, and more in persuasive tone within the allowed limits of description.

(plan feedback) video thumbnails, are too lame, those must be eyecatching, informative and action oriented

(AskUserQuestion answers) Scope: Teasers and unit videos (Recommended). Style: Best frame + big hook (Recommended).

(plan feedback) integrate new skills into the existing workflows so that it remains reusable, and future clips follows it too

## Response snapshot

- **Descriptions.** New shared `describe.mjs`:
  - course summary and objectives from the course overview (Urdu renderings in the teaser script,
    count checked by QG0);
  - every unit with its live link from the locale's unit frontmatter;
  - a fixed "why study" list true for every course;
  - published videos in the same locale (never self).
  - `fitDescription` keeps it under 4,900 bytes, dropping unit descriptions, then extra videos,
    then unit links.
  - Teaser `shortMeta` and unit-video `buildMeta` both use it; Facebook and LinkedIn captions carry
    the objectives.
- **Thumbnails.** New `thumbnail.mjs`:
  - best-frame scoring (sharpness, exposure, colour) with letterbox trim; slide frames blurred;
  - huge hook, course badge, "مفت کورس" ribbon, action pill; 1280×720 and 1080×1920;
  - phone-grid preview for the visual check.
  - `encode()` and `assemble()` write it by default.
  - Teaser `assembled` requires `thumbnail_file`; `T meta` prints `thumbnail_path`;
    `check-studio-manifest` checks it; `T thumb` records one.
  - `backfill` rebuilds for published unit items.
- **Shared text.** `wrap` and `bidiUr` moved to `text-layout.mjs` (re-exported from the old
  modules).

## Outcome

- ✅ Impact: every future teaser and unit upload gets the richer description and the new thumbnail through the existing pipeline steps.
- 🧪 Tests: 73 pass.
- 📁 Files: two new modules, the pipelines, ledger check, schema, script, tests, both skills.
- 🔁 Next prompts: owner approves the thumbnail sheet; then update_video thumbnails on the 9 published items and a private re-upload of the teaser with the new description and thumbnail.
- 🧠 Reflection: YouTube's description limit is bytes, not characters; Urdu doubles the cost, so the guard measures bytes.

## Handoff (for CEO and agents)

- Shipped / changed: this PR; no public YouTube change yet.
- Decisions the team must respect: descriptions and thumbnails come only from repo facts; Urdu `course_summary`/`objectives` are metadata whose count QG0 checks; thumbnails are generated, never hand-made, and pass the phone-size check.
- Pending / next owner: owner approves thumbnails (contact sheet); Claude applies them and re-uploads the teaser privately.
- Paperclip issues affected: none.
