---
id: crew-gcce-400-u04-illustrate
title: crew illustrate GCCE-400 unit 4
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u04-illustrate
user: crew
command: crew illustrate
labels: ["crew", "agy", "illustrate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: history/adr/0029-local-image-generation-flow-and-agy-role.md
  pr: null
files:
  - docs/semester-4/gcce-400/unit-04/index.mdx
  - history/prompts/gcce-400/crew-gcce-400-u04-illustrate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/index.mdx
  - specs/content/gcce-400/figures/unit-04.banner.md
  - specs/content/gcce-400/reviews/unit-04/G2/20261123T172408903Z-gates.json
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-bloom-bands.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-concept-graph.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-depth-gate.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-docs-sync.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-figures.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-no-answer-keys.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/check-no-em-dash.txt
  - specs/content/gcce-400/reviews/unit-04/G2/logs-20261123T172408903Z/validate-content.txt
  - specs/content/gcce-400/tasks.md
  - static/img/figures/gcce-400/unit-04/fig-U4-6.webp
tests:
  - npm run check:content
---

## Prompt

# Crew job gcce-400-u04-illustrate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u04-illustrate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Produce the raster illustrations for GCCE-400 Unit 4 per ADR-0029. Run `scripts/heavy.sh node scripts/generate-illustration.mjs GCCE-400 4` for the topic scenes and again with `--banner` for the unit banner (unit-NN.banner.md); it picks the image producer itself (agy, then gflow while the owner's PC is reachable, then Codex; each image's producer is printed on its ✓ line), optimises to WebP and moves each row to generated. Never call an image tool (generate_image, image_gen) yourself: every image goes through that script. Then read every image, including any row already at generated: reject one with text, wrong dress or setting, any depiction of a prophet, companion, angel or other sacred person, any scripture or calligraphy, a scene that does not teach the row's point, or one that contradicts its alt text (set its Status back to prompt-only and rerun with `--id <fig>`). Never edit an approved prompt or alt text to fit an image. Place each accepted image as a <Figure> in the English topic file and its Urdu mirror (generate-figures skill), set the row to placed, and run npm run check:content. Do not draw SVGs in this job. If generate-illustration.mjs exits 3 (every image producer is out of quota), stop at once: commit nothing, not even a PHR, print one CREW-HANDOFF line with the reset time, and exit; the crew holds this job until the quota resets.

Follow `.claude/skills/generate-figures/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-04/`.

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
- (gcce-400-u04-translate, translate, agy) `translation_status` remains `draft` across English and Urdu indices pending independent G5 review.
- (gcce-400-u04-translate, translate, agy) `render-inspect.mjs` was omitted per crew brief resource restrictions; G5 should verify Nastaliq shaping at 360px and A4 print layout.
- (gcce-400-u04-translate, translate, agy) Nine authored concept labels and proposed civic terms are documented in `specs/content/gcce-400/translations/unit-04/handoff.md`.
- (gcce-400-u04-author, author, claude_crew) Five SVGs were hand-authored by Claude (AGENTS.md/ADR-0024 assigns deterministic schematics to Claude), optimised and measured; banner fig-U4-6 stays prompt-only for the illustrate job, and no `.ur.svg` exists yet because the Urdu mirror is a separate G4 job.
- (gcce-400-u04-author, author, claude_crew) G3 en-review is open; the tracker note asks the reviewer to confirm the youniss-levine-2009 title-level use, the oecd-2011-social-cohesion definition against the report, and constitutional currency of Articles 16, 19 and 25.


## Response snapshot

Generated raster banner illustration fig-U4-6 via generate-illustration.mjs using gflow (Nano Banana). Read and visually inspected the WebP image for pedagogical alignment and cultural authenticity (Sindhi village otaq setting with charpais, durrie, primary school courtyard, hand pump, fathers in shalwar kameez and Sindhi caps, mothers in shalwar kameez with dupattas/ajraks, woman teacher and trainee teacher taking notes, schoolchildren in uniforms, soft afternoon light, no readable text, no sacred depictions). Placed Figure components in English and Urdu index files, updated unit-04.banner.md manifest row to placed, recorded fresh G2 gate evidence, updated task tracker, and verified all 14 content gates pass.

## Outcome

- Impact: illustrate GCCE-400 Unit 4 raster banner illustration (fig-U4-6) and place in English and Urdu index files.
- Tests: npm run check:content passed (14/14 content gates).
- Files: 15 file(s), listed above.
- Next prompts: crew lead merges branch or schedules downstream reviews.
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: GCCE-400 Unit 4 banner illustration fig-U4-6 generated, inspected, and placed in English and Urdu index MDX files; manifest updated to placed; fresh G2 gate evidence recorded and tracked.
- Decisions the team must respect: G3 en-review and G5 ur-review remain open and independent.
- Pending / next owner: crew lead / G3 reviewer.
- Notes for the next job on this unit:
  - G3 en-review remains open (confirm youniss-levine-2009 title-level use, oecd-2011-social-cohesion definition, constitutional currency of Articles 16, 19 and 25).
  - G5 ur-review remains open (translation_status remains draft across English and Urdu indices; G5 owns 360px and A4 print layout inspection).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): check:content PASS (14/14 content gates).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
