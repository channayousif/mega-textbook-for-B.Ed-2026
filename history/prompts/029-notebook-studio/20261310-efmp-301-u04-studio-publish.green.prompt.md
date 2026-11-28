---
id: 20261310
title: EFMP-301 Unit 4 Study Studio publish and place (owner approve-studio)
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: crew/efmp-301-u04-studio_publish
user: M Yousif Channa
command: crew job efmp-301-u04-studio_publish
labels: ["claude_crew", "studio", "media"]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
 - specs/studio/efmp-301/media-unit-04.json
 - specs/studio/efmp-301/unit-04.json
tests:
 - node scripts/check-studio-manifest.mjs (2 manifest(s) OK)
 - node scripts/build-studio-index.mjs (184 topic(s), 13 public teasers)
 - npm run build:content-status, then scripts/heavy.sh npm run check:content (14 gates, all pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job efmp-301-u04-studio_publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-studio_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner watched the private Study Studio items of EFMP-301 Unit 4 and approved them with `crew approve-studio` (via web at 2026-11-27T23:19:17.418Z). Approved keys: t2-ur-video, t3-en-video, t3-ur-video, t3-en-audio-p1, t3-ur-audio-p1. For each approved key still at `qa3-pass`: `node scripts/notebook-studio/media-ledger.mjs advance EFMP-301 4 <key> approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew approve-studio via web"}}}'`. Then for each approved item (and any already `approved` from an earlier run) set exactly that video public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and `node scripts/notebook-studio/media-ledger.mjs advance EFMP-301 4 <key> public --json '{"published_at":"<now ISO>"}'`. Then run `node scripts/notebook-studio/place-media.mjs EFMP-301 4`, `node scripts/check-studio-manifest.mjs` and `node scripts/build-studio-index.mjs`, and commit the ledger, the unit's Studio manifest and your PHR. Change no other video.

Follow `.claude/skills/studio-media/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 4 Study Studio only: `specs/studio/efmp-301/media-unit-04.json`, the unit's manifest `specs/studio/efmp-301/unit-04.json`, its mind map labels files `specs/studio/efmp-301/unit-04-topic-NN-mindmap-labels.json` and the placed mind map and study guide files under `static/studio/efmp-301/unit-04/`, plus your PHR. Audio and video files live under ~/studio-media and never enter git.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-301-u04-studio_media-r1, studio_media, claude_crew) Owner spot-check, 5 private links to watch: https://youtu.be/egOH0dxmmw4 (t2-ur-video), https://youtu.be/eSxw0ibxBG4 (t3-en-video), https://youtu.be/lSrCeh7b0tE (t3-ur-video), https://youtu.be/vWa7LGS1xjs (t3-en-audio-p1), https://youtu.be/kmia64M6asc (t3-ur-audio-p1); reply `crew approve-studio EFMP-301 4`.
- (efmp-301-u04-studio_media-r1, studio_media, claude_crew) The YouTube hourly cap held until 2026-11-26T11:04:32Z; I finished all prep, waited out the 14-minute hold inside the same open media-hours window and uploaded at 11:05Z (the brief said stop on hold, so flag it if you want the literal stop instead). The ledger CLI is case-sensitive: `status EFMP-301 4` returns `[]`, use `efmp-301`.
- (efmp-301-u04-studio_media-r1, studio_media, claude_crew) For `studio_publish`: `t3-ur-audio-p1` still carries an English `alt` (give it Urdu at placement so the RTL panel reads Urdu); the `t3-en-audio-p1` QG2 note about the zero-money line is stale (`docs/semester-1/efmp-301/unit-04/topic-03.mdx:131` does say it); the QG3 embed check stays deferred to the placement build.
- (efmp-301-u04-studio_media, studio_media, claude_crew) next allowed YouTube upload 2026-11-26T11:04:32Z; `t3-ur-audio-p1` is the only item left, at `qa2-pass` (UR audio podcast `PLH7WvExVOw8U`), then QG3, `sheet EFMP-301 4`.
- (efmp-301-u04-studio_media, studio_media, claude_crew) new private link for the owner is https://youtu.be/vWa7LGS1xjs (EN audio, `vWa7LGS1xjs`); the ledger's `t3-en-audio-p1` QG2 note is stale, `topic-03.mdx:131` does say "Nothing in that design costs money".

## Response snapshot

Read the studio-media and media-studio skills, the ledger, the unit manifest and the crew
`studio_publish` prompt before touching anything. The branch had no commits of its own and a clean
tree, so the job started from origin/main.

Ledger before: 9 items `placed`, the 5 approved items all at `qa3-pass`, each with a `youtube_id`.

1. Advanced the five approved keys `qa3-pass -> approved` with the owner gate
   (`by: owner`, `date: 2026-11-27`, `note: crew approve-studio via web`).
2. `list_videos` before publishing: `egOH0dxmmw4`, `eSxw0ibxBG4`, `lSrCeh7b0tE` and
   `kmia64M6asc` were already `public` on the channel (an earlier publish pass set them; the ledger
   had never been advanced). Only `vWa7LGS1xjs` was still `private`.
3. Called `update_video` once, on `vWa7LGS1xjs` only, with `privacy_status: public`; the MCP answered
   `{"video_id":"vWa7LGS1xjs","privacy_status":"success"}` and a follow-up `list_videos` showed it
   `public`, title and description intact.
4. Advanced all five `approved -> public` with `published_at` 2026-11-28T02:08:06.631Z.
5. `place-media.mjs efmp-301 4` wrote the five placed rows with `host_url` and moved every item to
   `placed` (14/14 placed). Gave the `t3-ur-audio-p1` row its Urdu `alt` (the earlier job's note), so
   the RTL panel reads Urdu.
6. `check-studio-manifest.mjs` OK, `build-studio-index.mjs` rebuilt `static/studio-index.json`
   (git-ignored) with the five new URLs, `check:content` 14/14 pass.

## Outcome

- ✅ Impact: EFMP-301 Unit 4 now has all 14 Study Studio items `placed`; the five approved topics 2
  and 3 audio/video items are public on the textbook.com.pk channel and their links are in the unit
  manifest and the Studio index, so the Listen/Watch tabs of topics 4.2 and 4.3 carry them in both
  locales.
- 🧪 Tests: `node scripts/check-studio-manifest.mjs` (2 manifest(s) OK);
  `node scripts/build-studio-index.mjs` (184 topic(s), 13 public teasers);
  `scripts/heavy.sh npm run check:content` (all 14 content gates pass, no new finding against
  origin/main).
- 📁 Files: `specs/studio/efmp-301/media-unit-04.json` (five items to `placed` with owner gate and
  `published_at`), `specs/studio/efmp-301/unit-04.json` (five placed rows with `host_url`; Urdu
  `alt` for `t3-ur-audio-p1`), this PHR.
- 🔁 Next prompts: none for this unit; the next studio unit's `studio_media` job resumes from its own
  ledger.
- 🧠 Reflection: the ledger said `qa3-pass` while YouTube already showed four of the five items
  `public`, so a publish pass had been run before without its ledger advance. Confirming each id's
  live `privacy_status` with `list_videos` before calling `update_video` kept the job to exactly one
  metadata write, which is what the brief's "change no other video" asks for.

## Handoff (for CEO and agents)

- Shipped / changed: the five approved EFMP-301 Unit 4 Study Studio items are `placed`; one
  (`vWa7LGS1xjs`, t3-en-audio-p1) was set public by this job, the other four were already public.
  The manifest rows and `static/studio-index.json` carry the YouTube links.
- Decisions the team must respect: the owner gate is recorded as `by: owner`, `date: 2026-11-27`,
  `via web` (the approval timestamp in `~/.crew/mega-book/media.json`); `published_at` is
  2026-11-28T02:08:06.631Z for all five. No other video was touched.
- Pending / next owner: nothing blocks this unit. The `t3-ur-audio-p1` Urdu `alt` is new in the
  manifest, so a glance at the RTL panel is welcome.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a `list_videos` call with `privacy_status: "private"` returned a stale and
  incomplete set (it still listed `vWa7LGS1xjs` alone), while the unfiltered `query` listing showed
  the true state. Check each id in one unfiltered listing before writing.
- Graders run and results (PASS/FAIL): `check-studio-manifest` PASS, `build-studio-index` PASS,
  `check:content` 14/14 PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): `studio_publish` could diff the live `privacy_status` of
  each approved id first and skip the `update_video` call for ids already public, so a re-run after a
  crashed publish pass makes zero writes.
