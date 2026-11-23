---
name: animated-figures
description: >-
  Make a silent, captioned animated video of a placed textbook figure (Feature 032, D-2026-0097):
  write a beats file that reveals the figure part by part with captions in English and Urdu,
  build a HyperFrames composition with scripts/media/animate-figure.mjs, render it under the
  host's heavy-job rules, check it, and hand it to the Media Studio for a private upload and the
  owner's approval. Use when asked to "animate a figure", "make the animated version of fig-UN-M",
  or for the Study Studio, Shorts or social animation of a unit's diagrams.
---

# Animated figures

Adapted from omkamal/animated-diagrams-skill (Apache-2.0, pinned 3de812d). Its static-figure
rules already live in `generate-figures/references/svg-authoring.md` (PR #723). Here only the
motion part is used, on our own figures, in our own look.

## Rules

- **Never edit the figure.** The placed SVG (and its `.ur.svg`) is review-bound. The animation
  reads it and inlines it; nothing is written under `static/img/figures/`.
- **Captions restate the unit.** Each caption says what that part of the figure and its topic
  text say, in plain words. No new claim, number or example. Zero em dashes.
- **Silent, captioned** (owner choice). No voice, no music.
- **Both languages.** Every beats file carries `caption.en` and `caption.ur`; the Urdu render uses
  the `.ur.svg`, with regions mirrored automatically.
- **Media stays out of git.** Output goes to `~/studio-media/animations/<id>/`.
- **Private first.** Uploads are private; public only on the owner's word (Media Studio gates).

## Steps

1. **Pick a figure that has an order to it**: a flowchart, a timeline, a cycle, a concept map
   built outward. A table or a single picture rarely gains from motion.
2. **Write the beats file** `specs/studio/animations/<course>/<fig-id>.json`:
   `course`, `unit`, `figure`, `svg` (the English path) and 4 to 9 `beats`, each with
   `region` (`[x, y, w, h]` in the figure's viewBox, or a list of them), `seconds` (3 to 6) and
   `caption: { en, ur }`. An element joins the beat whose region holds its centre; when regions
   overlap, the smallest wins (so small marks such as crosses can join a later beat). The first
   beat is usually the title; the last, the take-away line. Keep the total near 30 to 45 s.
3. **Render on Kaggle** (default; the host renders at about half a second per frame and
   froze under load before). Same pattern as video-studio's VS-ADR-0011: a hashed private
   dataset, a pinned private CPU kernel (no GPU quota), a verified fetch.
   ```bash
   node scripts/media/kaggle-animate.mjs pack <batch> specs/studio/animations/<course>/*.json \
     --langs en,ur --formats 16x9,9x16
   node scripts/media/kaggle-animate.mjs run <batch>     # waits for the kernel
   node scripts/media/kaggle-animate.mjs fetch <batch>   # files MP4 + contact sheet under ~/studio-media/animations/<id>/
   ```
   Batch many figures in one job. Urdu compositions carry the site's Nastaliq woff2, so Kaggle
   shapes Urdu exactly as the host does.
   **Local fallback** (one short render only, capped):
   ```bash
   export HYPERFRAMES_BROWSER_PATH=$HOME/.cache/ms-playwright/chromium-1228/chrome-linux/chrome
   systemd-run --user --scope --slice=development-agents.slice -p MemoryMax=3G \
     -E HYPERFRAMES_BROWSER_PATH scripts/heavy.sh \
     node scripts/media/animate-figure.mjs --beats <file> --lang en --format 16x9 --render
   ```
   Without `--render` it only writes the composition; `hyperframes snapshot <dir> --at 2,8,20
   --describe false` previews frames in seconds. Never jump-seek a composition in your own
   Playwright script: a cold seek far into the timeline can stall; step forward instead.
4. **Check** the snapshots in `<out>/snapshots/` and the MP4: every element appears, captions
   fit, Urdu reads right to left with Nastaliq shaping, nothing is cut at the edges. The page is
   `dir="rtl"` for Urdu, but the figure is pinned to `direction: ltr`: its text anchors are already
   explicit, and an inherited rtl would flip every one of them (labels slide out of their boxes).
5. **Hand off** to `media-studio` as kind `video.animation` (private upload, owner review).

## Install (once per host)

```bash
git clone https://github.com/omkamal/animated-diagrams-skill ~/.local/share/animated-diagrams
cd ~/.local/share/animated-diagrams && git checkout 3de812d && npm ci
mkdir -p assets/vendor/gsap && cp node_modules/gsap/dist/{gsap,DrawSVGPlugin,MotionPathPlugin}.min.js assets/vendor/gsap/
node_modules/.bin/hyperframes telemetry disable
```

The host is ARM64, so HyperFrames' own Chrome download does not exist; point
`HYPERFRAMES_BROWSER_PATH` at Playwright's Chromium. Do not run the upstream `setup.sh` here.
