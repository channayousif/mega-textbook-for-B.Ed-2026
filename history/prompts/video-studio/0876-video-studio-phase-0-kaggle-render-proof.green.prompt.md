---
id: 0876
title: Video studio Phase 0 Kaggle render proof
stage: green
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "phase-0", "kaggle", "render-proof"]
links:
  spec: video-studio/specs/001-urdu-shorts-pipeline/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/package.json, package-lock.json, tsconfig.json
 - video-studio/remotion/src/{index.ts,Root.tsx,UrduShort.tsx,props.ts}
 - video-studio/scripts/{doctor,approve,kaggle-pack,kaggle-run,kaggle-fetch}.ts
 - video-studio/scripts/lib/{paths,hash,schema,invalidation,approvals,episode,kaggle,sample,wav}.ts
 - video-studio/kaggle/{render.py,render-job.ts}
 - video-studio/tests/integrity.test.ts + fixtures
 - video-studio/episodes/20261026-sample-positive-reinforcement/episode.json
 - video-studio/history/reviews/2026-10-26-licence-check.md
 - video-studio/specs/000-discovery/discovery.md, specs/001-urdu-shorts-pipeline/tasks.md
 - .github/workflows/ci.yml (video-studio job; video-only PRs skip rls/e2e)
tests:
 - npm test (video-studio): 12/12 pass; tsc --noEmit clean
 - npm run doctor -- --online: green (ffmpeg optional warning)
 - kaggle-pack determinism: identical bundle bytes across two builds
 - render.py --verify-only tamper tests: tarball change exit 2; manifest hash change exit 2
 - Kaggle run 3 on T4 x2: COMPLETE in 2.6 min; 10 outputs hash-verified on fetch; NVENC works
 - stills from the encoded MP4 inspected: Nastaliq shaping correct after caption-plate fix
 - check:no-media PASS (92 tracked files); em-dash scan of video-studio PASS; CI YAML parses
---

## Prompt

discovery approved, start phase 0, i have done [mkdir -p ~/.kaggle && echo KGAT_<redacted> > ~/.kaggle/access_token && chmod 600 ~/.kaggle/access_token]

(The token value in the original prompt is redacted here: secrets are never written to the repo.)

## Response snapshot

Recorded the discovery approval and built VS-001 Phase 0. Remotion 4.0.535 project installed under
the heavy-job lock; schema validation, canonical digests, dependency-graph invalidation and an
owner-only TTY `approve` with 12 unit tests; doctor with an online Kaggle check; a deterministic,
hash-manifested bundle uploaded as a private Kaggle dataset; a pinned GPU script kernel that
verifies the bundle fail-closed, renders with x264, extracts stills from the encoded file and writes
an output manifest; fetch re-verifies every hash into MEDIA_ROOT. Three runs: Kaggle auto-extracted
the `.tar.gz` (renamed to `.vsbundle`), then hollow captions (fixed with a caption plate), then
accepted: 10 s 1080x1920@30 H.264/AAC rendered in 15 s, 2.6 min wall per run.

## Outcome

- ✅ Impact: Checkpoint 0 evidence complete: doctor green, sample MP4 rendered on Kaggle and stored in MEDIA_ROOT, Urdu correct in encoded stills, no media in git, parent site untouched.
- 🧪 Tests: see `tests` above.
- 📁 Files: about 30 new files under video-studio/, CI job added.
- 🔁 Next prompts: owner reviews the sample MP4 and stills (Checkpoint 0), confirms team size for the Remotion licence, then Phase 1 (brand and cast).
- 🧠 Reflection: rendering on the remote runner surfaced two real defects (archive auto-extraction, hollow captions) that a browser preview would not have shown.

## Handoff (for CEO and agents)

- Shipped / changed: Phase 0 of the video pipeline on PR #336: `npm run doctor`, `npm test`, `npm run kaggle:pack|run|fetch`, `npm run approve` (owner TTY only), the UrduShort composition, a `video-studio` CI job.
- Decisions the team must respect: renders run on Kaggle via the three kaggle scripts, never on the production host; the bundle file is `project.vsbundle` (Kaggle unpacks archives); finals use x264 even though NVENC works; captions sit on a dark plate; agents never run `approve`.
- Pending / next owner: owner Checkpoint 0 review of `~/video-studio-media/20261026-sample-positive-reinforcement/` (final.mp4, stills/); owner confirms team size of 3 or fewer for the free Remotion licence; T042 phrase-aware caption chunking (word-count chunks split compounds like "خوش گوار"); Latin font for URLs inside Urdu lines (T044).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Kaggle dataset archive auto-extraction; white text stroke invisible on a light set; `remotion gpu` cannot load chrome://gpu headless.
- Graders run and results (PASS/FAIL): unit tests PASS; tamper tests PASS (fail closed); hash verification PASS; visual still inspection PASS after fix.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): cache the apt layer (about 60 s of the 2.6 min) in a private toolchain dataset.
