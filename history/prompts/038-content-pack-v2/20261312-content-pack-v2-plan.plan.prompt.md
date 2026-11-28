---
id: 20261312
title: Content Pack v2 plan (one topic, one teaching pack, international)
stage: plan
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 038-content-pack-v2
branch: feature/038-content-pack-v2
user: M Yousif Channa
command: board-direct session (plan mode)
labels: ["board-direct", "media-studio", "content-pack", "plan"]
links:
  spec: specs/038-content-pack-v2/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/038-content-pack-v2/spec.md
 - specs/038-content-pack-v2/PLAN-v2.md
 - specs/038-content-pack-v2/plan.md
 - specs/038-content-pack-v2/tasks.md
 - specs/decisions/log.md
 - specs/decisions/adr-proposals.md
tests:
 - none (docs only); em-dash scan of the new files
---

## Prompt

The planned shorts and teasers focus on the advertisement currently and it does not provide any value to them, so viewers ignore them, the content is underperforming on youtube and other platforms, the platform algorithms are not recommending to the viewers, only the direct audience from site reaches it. I want to revise the plan to create one comprehensive longform video per topic, the shorts will be high value clips and highlights from that long video, many shorts may be made from one long video, shorts should use motion graphics with logo, screenshots, highlights and team of consistent characters. character sheets, personas, stories and voices may be used as per need. Further, targeting only Pakistani audiences also reduce the viewer base, we should go for international audiences as well. videos made with notebook should crop the logo and initial few seconds and final loge view to remove the signature look and feel of google-notebook.

so each topic will get a video, one or more shorts, a Slide-deck, a mind-map, an infograph for quick overview. REmove any watermarks, our AI disclosure is enough.

# Claude Code Prompt — textbook.com.pk Video & Content Pipeline v2
### "One Topic → One Content Pack" (value-first, international, multi-format)

> Paste this whole file into Claude Code from the root of the textbook repo (or save it as `video-pipeline/BRIEF.md` and tell Claude Code: "Read video-pipeline/BRIEF.md and follow it").
> **This brief replaces the earlier video-pipeline plan.** Where it conflicts with older docs or code in the repo, this brief wins. Two earlier decisions are now reversed: (1) shorts were ads with a short promotional message; (2) the plan was Urdu-only.

---

## 0. Your role and how to work

You are the lead engineer and content-systems designer for the video sub-project inside the textbook.com.pk repository (Docusaurus + Supabase). Work in this order and **do not skip the first two steps**:

1. **Audit.** Read the existing video-pipeline sub-project, its one-page app, configs, templates and any docs. List what exists, what is reusable, and what conflicts with this brief.
2. **Plan.** Write `video-pipeline/docs/PLAN-v2.md`: the gap list, the file/folder changes, the data schemas, and the build order. Stop and show me the plan before large refactors.
3. **Build in stages.** Implement one pipeline stage at a time. Each stage must run on its own and have a short README section.
4. **Verify.** Run every script on one real sample topic from the site, end to end, and report what worked, what failed and what still needs a human.

Constraints that still hold:
- **Existing subscriptions only** for now (Claude Pro, Google AI Pro / Gemini, ChatGPT Plus). No pay-as-you-go APIs. Design every stage so an API can replace the manual step later (clear input/output contracts, one adapter per tool).
- **Human-in-the-loop.** Keep the **one-page app** with per-stage instructions, copy-ready prompts, upload slots and checklists. I do not want "drop files into folders" workflows.
- Local tooling is fine: `ffmpeg`, Python (`faster-whisper`, `PySceneDetect`, `moviepy`), Node/React (`Remotion` for motion graphics — check its licence terms for our team size; fall back to ffmpeg + MoviePy if needed).

---

## 1. The problem we are solving

- Our current shorts and teasers are **advertisements**. They give viewers nothing, so viewers swipe away. Platforms read that as low satisfaction and stop recommending us. Almost all views come from people who already visit the site.
- We target **only Pakistani audiences**, which caps our reach.
- Videos made with NotebookLM **look and sound like NotebookLM** (its branded intro, outro and logo frames), which makes the channel feel generic.

**Diagnosis to design around:** recommendation systems reward videos that *viewers choose, keep watching and are satisfied with*. Promotional content fails all three. The fix is to **lead with real teaching value and let the brand ride along**, not the other way round.

---

## 2. The new model: one topic → one content pack

Every topic on textbook.com.pk (Mega Textbook for B.Ed, and Teaching Licence) gets a **content pack**:

| # | Asset | Format | Purpose |
|---|-------|--------|---------|
| 1 | **Long-form lesson video** | 16:9, 8–20 min, chapters | The "hub": complete, searchable, evergreen teaching on the topic |
| 2 | **Shorts (3–8 per long video)** | 9:16, 20–60 s | High-value clips/highlights cut from the long video, each standalone, each linking back to the full lesson |
| 3 | **Slide deck** | PDF + editable | For teachers to reuse in class; downloadable from the topic page |
| 4 | **Mind map** | PNG/SVG + interactive (if possible) | Structure of the topic at a glance |
| 5 | **Infographic** | Portrait PNG (also square crop) | Quick overview; shareable on Pinterest, LinkedIn, Facebook, WhatsApp |
| 6 | **Topic-page embed block** | Docusaurus MDX component | Embeds the video, shorts, deck, mind map and infographic on the site page (two-way traffic) |
| 7 | **Metadata pack** | JSON + Markdown | Titles, descriptions, chapters, tags, captions (SRT), thumbnail text, pinned comment, AI disclosure, per-platform captions |

The **content ratio is ~90% teaching value / ~10% brand.** The brand appears as a logo bug, a consistent visual identity, characters people recognise, and one soft call to action at the end, never as a sales pitch.

---

## 3. Audience strategy: go international

**Primary audiences (global):** pre-service teachers, B.Ed/M.Ed/PGCE/teaching-licence candidates, in-service teachers, teacher educators, and education students anywhere in the world.

Rules:
- **English is the primary production language** for long-form videos, titles and on-screen text. Use clear, international English (short sentences, no local idioms, no Pakistan-only acronyms unless explained).
- **Urdu goes in as a second layer, not a separate channel:** add Urdu as an additional audio track (YouTube multi-language audio) and Urdu subtitles. Also produce Urdu versions of the best-performing shorts.
- **Add subtitles** in English plus 2–4 high-reach languages (e.g. Arabic, Hindi, Spanish, Bahasa), generated from the English SRT and spot-checked.
- **Topic framing:** pick the global search phrasing ("Bloom's Taxonomy explained", "formative vs summative assessment", "classroom management strategies", "lesson plan template") and use Pakistani/South Asian classrooms as *examples*, not as the frame. Where a topic is Pakistan-specific (e.g. a Sindh syllabus requirement), say so in the title so the right people find it.
- **Authority anchor:** state clearly in each video and description that the content was written/reviewed by the platform's teacher-education faculty, with real credentials. This builds trust and matters for platform policy (see §9).

---

## 4. Long-form video: structure and best practices

**Script structure (target 8–20 min):**
1. **Hook (0–30 s):** a problem, a surprising fact, or a classroom scenario. State the promise: "By the end you'll be able to…". No logo animation before the hook.
2. **Roadmap (≤15 s):** the 3–5 parts of the lesson (these become YouTube chapters).
3. **Core teaching blocks:** one concept per block, each with *explain → example → classroom application → common mistake*. Each block should make sense on its own, because **each block is a future short**.
4. **Pattern interrupts every 60–90 s:** a character skit, a quick quiz question, a screenshot walkthrough, a visual analogy, or a change of shot.
5. **Recap (30–60 s):** the key takeaways on screen.
6. **One soft call to action (≤15 s):** "Free notes, the slide deck and the mind map for this topic are on textbook.com.pk" + an end screen pointing to the next lesson/playlist.

**Production rules:**
- Write the script first (Claude), then generate visuals. Mark each block with `[SHORT-CANDIDATE]` tags and a one-line hook, so cutting shorts is planned, not improvised.
- Burned-in or styled captions for key terms; full SRT uploaded separately.
- Chapters with timestamps in the description (start at 00:00).
- Organise into **playlists by course/unit**, which makes viewers watch more than one video per session.
- **Thumbnails:** one clear face/character expression + ≤4 words + high contrast. Make 2–3 variants for YouTube's thumbnail test feature.
- **Titles:** promise or question first, keyword early, ≤60 characters. Avoid all-caps clickbait.

---

## 5. Shorts: high-value clips, not ads

Each short must **teach one thing completely in under 60 seconds.** A viewer who never visits the site should still feel the short was worth watching.

**Short types to rotate:**
- *Concept in 30 s* (definition + one example)
- *Common mistake* ("Stop doing X in your lesson plans — do this instead")
- *Myth vs fact*
- *Quick quiz* (question → pause → answer; drives comments)
- *Classroom scenario* with the character team (mini story, 2–3 lines of dialogue)
- *Exam/licence tip* (with screenshot of the relevant site page)
- *Before/after* (bad vs good learning objective, rubric, question, etc.)

**Rules:**
- **Hook in the first 1–2 seconds**, both spoken and on screen. No logo intro.
- One idea per short. Cut the dead air. Speed up slightly if natural.
- **Design for a loop:** the last line should lead back into the first.
- **Motion-graphics template** (Remotion): logo bug (small, corner, semi-transparent), kinetic captions (word-by-word highlight), animated screenshots of the site, callout boxes, progress bar, character cut-ins. Keep text inside 9:16 **safe zones** (avoid the bottom ~20% and right edge where platform buttons sit).
- **Reframe from 16:9 to 9:16** intelligently: crop to the active speaker/character or rebuild the shot as a vertical layout (video top, captions/visual bottom). Generate vertical Flow shots natively where needed rather than cropping.
- **End:** a 2–3 s soft line ("Full lesson linked above"), and use YouTube's **Related Video** link on every short to point to its long video.
- Many shorts can come from one long video; schedule them over 1–2 weeks after the long video goes live.
- Repurpose to Instagram Reels, TikTok, Facebook Reels and **LinkedIn** (strong for teacher educators). Export without platform-specific watermarks and write per-platform captions/hashtags.

---

## 6. Character team: bible, personas, voices

Create a recurring **cast of 3–4 animated characters** (clearly stylised/animated — not photorealistic humans, see §9). Store everything in `video-pipeline/characters/`:

```
characters/
  _style-guide.md          # art style, palette (brand colours), line weight, lighting, aspect ratios
  <slug>/
    profile.yaml           # name, role, age range, personality, catchphrases, speaking style, what they never do
    voice.yaml             # voice description, pace, accent (neutral international English), Urdu voice notes
    prompt-block.txt       # the exact, reusable description pasted into every Flow/image prompt
    sheet/                 # reference images: front, 3/4, profile, full body, 6 expressions, 2 outfits
```

Suggested cast (adjust to taste):
- **The Mentor** — experienced teacher educator; explains concepts calmly.
- **The Trainee** — a pre-service teacher; asks the questions viewers have, makes the common mistakes.
- **The Skeptic / Comic relief** — challenges ideas, creates the "myth vs fact" moments.
- **The Student** (optional) — shows the classroom side of a technique.

**Consistency rules:** always reuse `prompt-block.txt` verbatim; never redescribe a character from memory; keep the same art style token, palette and lighting; one character sheet version is "locked" per season and changes are versioned.

**Stories:** keep a light running format (e.g. "Staffroom Questions", "Lesson Plan Clinic") so returning viewers recognise the series. Use the cast for pattern interrupts in long videos and for scenario shorts.

---

## 7. Google Flow: best practices and advanced use

Build a `video-pipeline/flow/` folder with a **prompt library**, a **shot-list template**, and a one-page-app stage that walks me through Flow step by step. Features vary by subscription tier and region and change often — the app should show *what to check in the Flow UI* rather than assuming a feature exists.

**7.1 Set up the cast inside Flow**
- Use Flow's **Characters** feature: create each cast member with a name, a voice and the "character info" (personality, mannerisms) from `profile.yaml`. The Flow Agent uses that info when it writes or generates scenes, so keep it precise.
- Create the reference images first with **Nano Banana Pro** (in Flow or the Gemini app) from the style guide, then import them. Clean, neutral-background character sheets give the best consistency.

**7.2 Choosing the right generation mode**
| Need | Flow feature |
|------|--------------|
| Same character in a new scene | **Ingredients to Video** (character + location + style references) |
| Exact start/end composition (e.g. to match a motion-graphics frame or a transition) | **Frames to Video** (first frame, last frame, or both) |
| Continue an action past the clip length | **Extend** |
| New shot keeping the look/context of the previous one | **Jump to** / Scenebuilder |
| Fix one element without regenerating everything | **Video-to-video editing** / natural-language edits |
| Explore options fast | **Agent** mode ("give me 4 variations with different camera angles") |

**7.3 Prompt formula** (store as a template; fill per shot):
```
[CHARACTER prompt-block] + [ACTION, one clear beat] + [SETTING] +
[CAMERA: shot size, angle, movement] + [LIGHTING/MOOD] + [STYLE token from style guide] +
[AUDIO: ambience; DIALOGUE: Character Name says: "short line"] +
[AVOID: on-screen text, extra characters, logos, style drift]
```
- **One action per clip.** Plan in clip-length units (~8 s) and storyboard the whole scene before generating.
- **Keep dialogue short** (one line per clip, ≤ ~15 words) and attribute it to a named character.
- **Never ask Flow to render text, labels or the logo.** All text, logos, screenshots and captions are added in post (Remotion), where they stay sharp and editable.
- Generate **9:16 natively** for shorts and **16:9** for long-form; don't rely on cropping.
- **Draft on the Fast model, final on the Quality model.** Track credits per topic in a simple log so a content pack stays within the monthly allowance.
- Upscale only the final selects (1080p; higher if the plan allows).
- When using Gemini/Claude to write a sequence of Flow prompts, **repeat every essential detail in every prompt** — never write "same as before".

**7.4 Asset management**
- Naming: `<topic-slug>_<scene##>_<shot##>_<character>_<v#>.mp4`.
- Keep a `shots.csv` per topic: prompt used, mode, model, seed/notes, credits, keep/reject, where used (long/short #).
- Save the best prompts back into the prompt library with a one-line "why it worked".

---

## 8. NotebookLM: use it, then de-brand it

NotebookLM produces the **slide deck, mind map, infographic** and a first-pass **Explainer video** from the topic's site content.

**8.1 Generation settings** (put these in the app as copy-ready text):
- Sources: only the topic page(s) and approved references.
- Video Overview: **Explainer** format for long-form drafts; use **Custom style** with a description matching our style guide (palette, illustration style) rather than default styles; write a **steering prompt** giving audience (international pre-service teachers), learning objectives, the block structure from our script, and "no promotional content".
- Generate the slide deck, mind map and infographic with the same steering notes so the pack looks unified.

**8.2 De-branding pipeline (script: `scripts/debrand_notebooklm.py`)**
- **Trim the NotebookLM intro and outro/logo frames.** Detect cut points automatically (scene-change + black-frame detection with `PySceneDetect`/ffmpeg `blackdetect`, plus a configurable fallback of N seconds at start/end). Show me the detected cut points in the app for a one-click confirm before rendering.
- Replace them with **our own 2–3 s branded opener/closer** (Remotion), placed *after* the hook, never before it.
- Re-wrap the trimmed video in our **brand frame** (lower-thirds, logo bug, chapter cards, captions), and intercut Flow character shots and site screenshots so the result reads as *our* production.
- Better option for flagship topics: **rebuild** the video from NotebookLM's slide images + our own script/narration in Remotion, using NotebookLM only as raw material.
- Export the mind map and infographic at full resolution; re-crop/re-layout the infographic to portrait and square, and add our logo and URL in the footer.

---

## 9. Watermarks, AI disclosure and platform policy

What we do:
- **Flow / Gemini visible watermark:** turn it off with the official **Media Watermark** setting (Flow settings), where our plan and region allow it. If the toggle isn't available, use the clips as they are or regenerate on a plan that allows it — record the status in the app.
- **NotebookLM branding:** trimmed and replaced as described in §8.2.
- **AI disclosure (our standard):** turn on YouTube Studio's AI/altered-content disclosure on every upload where it applies, add one line in every description ("Created with AI-assisted tools; written and reviewed by textbook.com.pk teacher-education faculty"), and use the equivalent AI-label settings on Instagram, TikTok and Facebook.

What the pipeline must **not** do (hard rules for code):
- Do not try to remove, blur, inpaint, or defeat **SynthID** or **C2PA Content Credentials**, and do not add any processing step whose purpose is to make AI content undetectable. Those invisible marks stay; our disclosure and the platform provenance labels work together.
- Do not blur or paint over visible watermarks; use the official toggle or regenerate.

Platform-policy guardrails (YouTube clarified its "inauthentic content" monetisation guidance in July 2026):
- **Avoid generic/repetitive mass production.** Each video must have a distinct script, real examples and real teaching value; templates control *look*, never *content*. Vary short formats.
- **Characters must be clearly animated/stylised and never presented as real credentialed experts.** The authority is the real faculty, credited by name/role.
- Every factual claim in a script must trace to the topic page or a cited source; keep sources in the metadata pack.

---

## 10. Pipeline stages (one-page app)

Each stage = one panel in the app with: inputs, a copy-ready prompt, what to upload/download, a checklist, and a "mark done" button. Status saved per topic (Supabase table `content_packs` or local JSON, whichever the current app uses).

| Stage | What happens | Tool | Output |
|-------|-------------|------|--------|
| 1. Topic intake | Pick topic page; pull its MDX content and learning objectives | script | `topic.json` |
| 2. Research & keyword framing | Global search phrasing, competitor gaps, title options | Claude | `angle.md` |
| 3. Script | Long-form script with blocks, `[SHORT-CANDIDATE]` tags, character skits, on-screen text list | Claude | `script.md` |
| 4. NotebookLM pack | Explainer video draft, slide deck, mind map, infographic | NotebookLM (manual) | raw files |
| 5. Flow shots | Shot list → prompts → generate → select | Flow (manual) | `shots/`, `shots.csv` |
| 6. De-brand & assemble long-form | Trim, brand frame, intercut, captions, chapters | ffmpeg + Remotion | `longform.mp4` |
| 7. Shorts factory | Transcribe (faster-whisper) → rank highlight candidates (hook strength, standalone clarity, length) → I approve → auto-reframe + motion graphics → render | Python + Remotion | `shorts/*.mp4` |
| 8. Static assets | Polish deck, mind map, infographic; add brand footer | script/manual | `assets/` |
| 9. Metadata | Titles (3 options), description with chapters, tags, SRT + translations, thumbnail text, pinned comment, per-platform captions, AI disclosure line | Claude + script | `metadata.json` |
| 10. QA | Checklist below | human | pass/fail |
| 11. Publish & site embed | Upload schedule; generate MDX embed block for the topic page | manual + script | live links, `embed.mdx` |
| 12. Learn | Paste analytics after 7 and 28 days; flag winners for Urdu versions and follow-up shorts | manual | `performance.csv` |

**QA checklist (stage 10):** hook in first 2 s (shorts) / 30 s (long) · no NotebookLM intro/outro left · no visible third-party watermark · logo bug present but small · captions accurate and within safe zones · character looks match the locked sheet · every claim sourced · AI disclosure set · related-video link set on shorts · chapters correct · end screen set · audio levels consistent (target around −14 LUFS).

---

## 11. Metrics that define success

Track per content pack (stage 12):
- **Long-form:** impressions CTR, average view duration and % viewed, returning viewers, traffic from YouTube search/browse/suggested (not just external/site).
- **Shorts:** "viewed vs swiped away" rate, average % viewed (aim for >70%), loops, shares, and clicks through to the long video.
- **Site:** visits from YouTube/social, downloads of decks/mind maps, sign-ups.
- **Reach:** share of views from outside Pakistan (target: steadily rising month over month).

Review monthly: double down on formats and topics with the best retention; retire short formats that underperform twice.

---

## 12. Deliverables I expect from you (Claude Code)

1. `video-pipeline/docs/PLAN-v2.md` (audit + plan) — **show me before refactoring.**
2. Updated one-page app with the 12 stages above.
3. `characters/` bible scaffold with templates and the style guide.
4. `flow/` prompt library, shot-list template and credit log.
5. Scripts: `debrand_notebooklm.py`, `transcribe.py`, `find_highlights.py`, `reframe_vertical.py`, `make_metadata.py`, `make_embed.py`.
6. Remotion project with templates: `LongformFrame`, `ShortVertical` (kinetic captions, logo bug, screenshot callouts, progress bar, character cut-ins), `Opener`, `Closer`, `ChapterCard`, `Infographic footer`.
7. Prompt templates (Markdown, copy-ready) for: script writing, NotebookLM steering, Flow shots, metadata, translations.
8. One complete sample content pack produced end to end from a real topic, with a short report of time taken, credits used and manual steps remaining.

Ask me before: deleting existing pipeline code, changing Supabase schemas, or adding any paid service.

Owner answers to plan-mode questions: "Extend Media Studio (Recommended)", "New cast for v2", "Admin page on the site".

## Response snapshot

Audited both video systems: the live Media Studio (`scripts/media`, `scripts/notebook-studio`, ledgers,
crew stages, uploader, StudioPanel) and the video-studio sub-project (Remotion 4, Urdu puppet shorts,
console mock only). Nothing trims NotebookLM branding, finds highlights or reframes lesson video;
there is no infographic, long-form or short manifest kind and no media table in Supabase. Wrote
Feature 038 (spec, PLAN-v2 with audit, gaps, schemas and a 10-stage build order, tasks), decision
D-2026-0104 and an ADR proposal. Stopped before any refactor, as the brief requires.

## Outcome

- ✅ Impact: the pack model, international audience and provenance rules are recorded; implementation is staged behind owner checkpoints.
- 🧪 Tests: none (docs only).
- 📁 Files: listed above.
- 🔁 Next prompts: owner reviews PLAN-v2 and approves the Stage 1 migration; then Stage 1.
- 🧠 Reflection: the repo already holds most of the plumbing; v2 is mainly new kinds, three scripts and a page.

## Handoff (for CEO and agents)

- Shipped / changed: Feature 038 docs; D-2026-0104; ADR proposal in `specs/decisions/adr-proposals.md`.
- Decisions the team must respect: no new course teasers; new video work is packs (English first, Urdu as a second track); trim NotebookLM intro/outro only; never touch SynthID or C2PA; watermarks only through official toggles; the new cast replaces the puppets for new packs.
- Pending / next owner: owner approval of PLAN-v2 and of the `content_packs` migration; ADR consent.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the brief named a `video-pipeline/` tree that does not exist; resolved by owner choice to extend Media Studio.
- Graders run and results (PASS/FAIL): em-dash scan of new files PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): run the debrand cut detector on one existing EFMP-301 U4 overview before building the page.
